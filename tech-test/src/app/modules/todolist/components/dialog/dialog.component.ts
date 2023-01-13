import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Task } from '../../../../core/interfaces/task.interface';
import { DialogService } from '../../services/dialog.service';
import { DialogFormData } from '../../../../core/interfaces/dialog-form-data.interface';
import { eNames } from '../../../../core/enums/names.enum';
import { ButtonData} from '../../../../core/interfaces/button-data.interface';
import { CLOSE_BUTTON } from '../../../../core/constants/buttons.constant';
import { FormData } from '../../../../core/interfaces/formData.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit, OnDestroy{

  public taskData: Task;
  public task$: Observable<Task>
  public isNew: boolean;
  public names = eNames;
  public closeButtonData: ButtonData = CLOSE_BUTTON;
  private _destroy$ = new Subject<void>()
  @Output() public dialogSubmitted = new EventEmitter<DialogFormData>();

  constructor(private _dialogService: DialogService) { }

  ngOnInit() {
    this.task$ = this._dialogService.task.asObservable();
    this.task$
      .pipe(takeUntil(this._destroy$))
      .subscribe(task => {
      this.taskData = task;
      this.isNew = !task.label
    })
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public buttonClicked(formData: FormData): void {
    const { label, description, category } = formData
    const newTask: Task = { ...this.taskData,label,description,category }
    this.dialogSubmitted.emit({task: newTask, isNew: this.isNew})
    this._dialogService.task.next(null);
  }

  public clickCloseButton(): void {
    this._dialogService.task.next(null);
  }

}

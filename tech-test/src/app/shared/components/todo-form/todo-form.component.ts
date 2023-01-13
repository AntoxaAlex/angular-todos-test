import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Task } from '../../../core/interfaces/task.interface';
import { FormData } from '../../../core/interfaces/formData.interface';
import { ButtonData } from '../../../core/interfaces/button-data.interface';
import { SUBMIT_BUTTON } from '../../../core/constants/buttons.constant';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public submitButtonData: ButtonData = SUBMIT_BUTTON
  private _destroy$ = new Subject<void>()
  @Input() public task$: Observable<Task>;
  @Output() public formSubmitted = new EventEmitter<FormData>()


  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.task$
      .pipe(takeUntil(this._destroy$))
      .subscribe((task: Task) => {
        const { label, description, category } = task;
        this.form = this._fb.group({
          label,
          description,
          category
        })
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public clickButton():void {
    this.formSubmitted.emit(this.form.value);
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Task } from '../../core/interfaces/task.interface';
import { ButtonData } from '../../core/interfaces/button-data.interface';
import { ADD_BUTTON } from '../../core/constants/buttons.constant';
import { TodoService } from './services/todo.service';
import { EditDeleteButtonType } from '../../core/types/edit-delete-button.type';
import { DialogFormData } from '../../core/interfaces/dialog-form-data.interface';
import { DialogService } from './services/dialog.service';
import { eNames } from '../../core/enums/names.enum';
import { TaskDoneType } from '../../core/types/task-done.type';
import { FILTER_SELECTORS } from '../../core/constants/filter-selecrors.constant';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistComponent implements OnInit,OnDestroy {

  public addButtonData: ButtonData = ADD_BUTTON;
  public filterSelectors = FILTER_SELECTORS;
  public tasks$: Observable<Task[]>;
  public nextTaskId: number;
  public isDialogOpened: Observable<boolean>;
  private _destroy$ = new Subject<void>();

  constructor(
    private _todoService: TodoService,
    private _cdr: ChangeDetectorRef,
    private _dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this._todoService.getTodoList().pipe(takeUntil(this._destroy$)).subscribe()
    this.tasks$ = this._todoService.tasks.asObservable();
    this.tasks$.subscribe((tasks: Task[]) => {
      this.nextTaskId = tasks[tasks.length - 1].id + 1;
    })
    this.isDialogOpened = this._dialogService.task.asObservable()
      .pipe(
        takeUntil(this._destroy$),
        map(data => !!data)
      )
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public clickAddTodoButton(): void {
    this._dialogService.task.next({
      id: this.nextTaskId,
      label: '',
      category: '',
      description: '',
      done: false
    })
  }

  public clickEditDeleteButton(buttonType: EditDeleteButtonType,selectedTask: Task): void {
    if(buttonType === eNames.edit) this._dialogService.task.next(selectedTask)
    else this._todoService.changeTodo(eNames.delete,selectedTask)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.nextTaskId--)
  }

  public setTodo(dialogData: DialogFormData): void {
    const { isNew, task } = dialogData
    if(isNew) {
      this._todoService.addNewTodo(task)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this.nextTaskId++)
    } else {
      this._todoService.changeTodo(eNames.edit,task)
        .pipe(takeUntil(this._destroy$))
    }
  }

  public toggleTaskCompletion(data: TaskDoneType,task: Task): void {
    task = {...task,done: data}
    this._todoService.changeTodo(eNames.edit,task)
      .pipe(takeUntil(this._destroy$))
  }

  public filterSelectorClick(selector: string): void {
    this._todoService.sortTasks(selector)
  }

}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '../../../../core/interfaces/task.interface';
import { TaskDoneType } from '../../../../core/types/task-done.type';
import { EditDeleteButtonType } from '../../../../core/types/edit-delete-button.type';
import { ButtonData } from '../../../../core/interfaces/button-data.interface';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../../../core/constants/buttons.constant';
import { eNames } from '../../../../core/enums/names.enum';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {

  public names = eNames
  public editButtonData: ButtonData = EDIT_BUTTON;
  public deleteButtonData: ButtonData = DELETE_BUTTON;
  @Input() public task: Task;
  @Output() public onEditDeleteTask = new EventEmitter<EditDeleteButtonType>();
  @Output() public onToggleTaskCompletion = new EventEmitter<TaskDoneType>();

  constructor() {
  }

  public buttonClicked(buttonType: EditDeleteButtonType) {
    this.onEditDeleteTask.emit(buttonType);
  }

  public taskClicked(isDone: boolean): void {
    this.onToggleTaskCompletion.emit(isDone ? false : new Date().toDateString());
  }

}

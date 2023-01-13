import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import { ButtonData } from '../../../core/interfaces/button-data.interface';

@Component({
  selector: 'app-todo-button',
  templateUrl: './todo-button.component.html',
  styleUrls: ['./todo-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoButtonComponent {

  @Input() public buttonData: ButtonData
  @Output() public onButtonClick = new EventEmitter<void>();

  public clickAddTodoButton(): void {
    this.onButtonClick.emit();
  }
}

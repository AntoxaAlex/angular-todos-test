import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { TodoIconType } from '../../../core/types/todo-icon.type';
import { TODO_ICONS } from '../../../core/constants/todo-icons.constant';

@Component({
  selector: 'app-todo-icon',
  templateUrl: './todo-icon.component.html',
  styleUrls: ['./todo-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoIconComponent implements OnInit {

  public icon: string;
  @Input() public type: TodoIconType;

  constructor() { }

  ngOnInit(): void {
    this.icon = TODO_ICONS[this.type as keyof typeof TODO_ICONS];
  }

}

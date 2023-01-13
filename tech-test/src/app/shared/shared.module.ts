import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoButtonComponent } from './components/todo-button/todo-button.component';
import { TodoIconComponent } from './components/todo-icon/todo-icon.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';



@NgModule({
  declarations: [
    TodoButtonComponent,
    TodoIconComponent,
    TodoFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TodoButtonComponent,
    TodoIconComponent,
    TodoFormComponent
  ]
})
export class SharedModule { }

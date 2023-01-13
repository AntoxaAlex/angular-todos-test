import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { TodolistRoutingModule } from './todolist-routing.module';
import { TodolistComponent } from './todolist.component';
import { TodoComponent } from './components/todo/todo.component';
import { SharedModule } from '../../shared/shared.module';
import { TodoService } from './services/todo.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogService } from './services/dialog.service';


@NgModule({
  declarations: [
    TodolistComponent,
    TodoComponent,
    DialogComponent
  ],
    imports: [
        CommonModule,
        TodolistRoutingModule,
        SharedModule
    ],
  providers: [
    HttpClient,
    TodoService,
    DialogService,
  ]
})
export class TodolistModule { }

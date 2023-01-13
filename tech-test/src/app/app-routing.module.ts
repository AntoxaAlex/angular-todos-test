import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/todolist',
    pathMatch: 'full'
  },
  {
    path: 'todolist',
    loadChildren: () => import('./modules/todolist/todolist.module')
      .then(m => m.TodolistModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap }  from 'rxjs/operators';

import { eNames } from '../../../core/enums/names.enum';
import { Task } from '../../../core/interfaces/task.interface';
import { EditDeleteButtonType } from '../../../core/types/edit-delete-button.type';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public tasks = new BehaviorSubject<Task[]>(null);
  public savedTasks: Task[];

  private headers = { headers:{ 'Content-Type': 'application/json' } }
  constructor(private _http: HttpClient) { }

  public getTodoList(): Observable<Task[]> {
    return this._http.get<Task[]>(`${eNames.serverPath}`)
      .pipe(
        tap((tasks: Task[]) => {
          this.savedTasks = tasks;
          this.tasks.next(tasks)
        })
      )
  }

  public getTodo(id: number): Observable<any> {
    return this._http.get<Task>(`${eNames.serverPath}/${id}`)
  }

  public addNewTodo(task): Observable<Task> {
    return this._http.post<Task>(`${eNames.serverPath}`,JSON.stringify(task),this.headers)
      .pipe(
        tap((task: Task) => this.tasks.next([...this.savedTasks,task]))
      );
  }

  public changeTodo(buttonType: EditDeleteButtonType, task: Task): Observable<Task> {
    return buttonType === eNames.edit
      ? this.editTodo(task)
      : this.deleteTodo(task.id);
  }

  public editTodo(task: Task): Observable<Task> {
    const savedTaskIndex = this.savedTasks.findIndex(saveTask => saveTask.id === task.id);
    this.savedTasks.splice(savedTaskIndex,1,task);
    this.tasks.next([...this.savedTasks]);
    return this._http.patch<Task>(`${eNames.serverPath}/${task.id}`,JSON.stringify(task),this.headers)
  }

  public deleteTodo(taskId: number): Observable<Task> {
    return this._http.delete<Task>(`${eNames.serverPath}/${taskId}`)
      .pipe(
        tap((()=> this.tasks.next([...this.savedTasks].filter(task => task.id !== taskId))))
      );
  }

  public sortTasks(selector: string): void {
    this.tasks.next([...this.savedTasks].sort((a,b) => {
      if(typeof a[selector] === 'string'){
       return  a[selector].toLowerCase().localeCompare(b[selector].toLowerCase())
      }
      return a[selector]-b[selector]
    }))
  }
}

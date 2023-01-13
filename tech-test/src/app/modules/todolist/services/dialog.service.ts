import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Task } from '../../../core/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public task = new BehaviorSubject<Task>(null)

  constructor() { }

  public setTask(task: Task): void {
    this.task.next(task);
  }

}

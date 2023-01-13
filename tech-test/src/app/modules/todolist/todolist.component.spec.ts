import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of} from 'rxjs';

import { TodolistComponent } from './todolist.component';
import { Task } from '../../core/interfaces/task.interface';
import { TodoService } from './services/todo.service';
import { DialogService } from './services/dialog.service';

const todoServiceStub = {
  getTodoList():Observable<Task[]> {
    return of([
      {
        id: 1,
        label: 'Kitchen Cleanup',
        description:  "Clean my dirty kitchen",
        category: "house",
        done: false
      },
      {
        id: 2,
        label: 'Taxes',
        description:  "Start doing my taxes and contact my accountant jhon for advice",
        category: "bureaucracy",
        done: "22-10-2019"
      }
    ])
  },
}

const dialogServiceStub = {
  task: new BehaviorSubject<Task>({id:1,label:'label',description: 'description',category: 'sport',done: false})
}

describe('TodolistComponent', () => {
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistComponent ],
      providers: [
        { provide: TodoService, useValue: todoServiceStub },
        { provide: DialogService, useValue: dialogServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 2 todos', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('.todo-list__container__content__task').length).toEqual(2)
  });

  it('should display dialog', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('.dialog-container').length).toEqual(1)
  });

});

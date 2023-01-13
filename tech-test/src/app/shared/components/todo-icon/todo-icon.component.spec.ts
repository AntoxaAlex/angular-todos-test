import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoIconComponent } from './todo-icon.component';

describe('TodoIconComponent', () => {
  let component: TodoIconComponent;
  let fixture: ComponentFixture<TodoIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

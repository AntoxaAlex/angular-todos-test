import { TaskDoneType } from '../types/task-done.type';
import { TodoIconType } from '../types/todo-icon.type';

export interface Task {
  id: number,
  label: string,
  description: string,
  category: TodoIconType,
  done: TaskDoneType
}

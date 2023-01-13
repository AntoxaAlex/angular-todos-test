import { ButtonData } from '../interfaces/button-data.interface';

export const ADD_BUTTON: ButtonData = {
  type: 'add',
  text: 'Add todo',
  icon: 'add'
}

export const EDIT_BUTTON: ButtonData = {
  type: 'edit',
  icon: 'edit'
}

export const DELETE_BUTTON: ButtonData = {
  type: 'delete',
  icon: 'delete'
}

export const SUBMIT_BUTTON: ButtonData = {
  type: 'submit',
  text: 'Send'
}

export const CLOSE_BUTTON: ButtonData = {
  type: 'close',
  icon: 'close'
}

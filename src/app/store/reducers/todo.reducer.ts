import { Action, createReducer, on } from '@ngrx/store';
import { addTodo, checkedTodo, deleteTodo } from '../actions/todo.actions';
import { v4 as uuidv4 } from 'uuid'


export const todoFeatureKey = 'todo';

export interface Todo {
  id: string
  title: string
  checked: boolean
}

export interface State {
  todos: Todo[]
}

export const initialState: State = {
  todos: []
};


export const reducer = createReducer(
  initialState,
  on(addTodo, (state, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    newState.todos.unshift({
      id: uuidv4(),
      title: action.title,
      checked: false,
    })
    return newState
  }),
  on(checkedTodo, (state, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    const index = newState.todos.findIndex(todo => todo.id === action.id)
    newState.todos[index].checked = action.checked
    return newState
  }),
  on(deleteTodo, (state, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    const index = newState.todos.findIndex(todo => todo.id === action.id)
    newState.todos.splice(index, 1)
    return newState
  })
);


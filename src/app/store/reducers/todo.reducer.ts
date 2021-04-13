import { Action, createReducer, on } from '@ngrx/store';
import { addTodo, deleteTodo } from '../actions/todo.actions';
import { v4 as uuidv4 } from 'uuid'


export const todoFeatureKey = 'todo';

export interface Todo {
  id: string
  title: string
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
      title: action.title
    })
    return newState
  }),
  on(deleteTodo, (state, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    const index = newState.todos.findIndex(todo => todo.id === action.id)
    newState.todos.splice(index, 1)
    return newState
  })
);


import { createAction, props } from '@ngrx/store';

export const addTodo = createAction('addTodo', props<{title: string}>())
export const checkedTodo = createAction('checkedTodo', props<{id: string, checked: boolean}>())
export const deleteTodo = createAction('deleteTodo', props<{id: string}>())





import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';
import { State, todoFeatureKey } from '../reducers/todo.reducer';

export const selectTodo = createFeatureSelector<AppState, State>(todoFeatureKey)
export const selectTodos = createSelector(selectTodo, state => state.todos)
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators'
import { AppState } from './store';
import { addTodo, deleteTodo, checkedTodo } from './store/actions/todo.actions';
import { Todo } from './store/reducers/todo.reducer';
import { selectTodos } from './store/selector/todo.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements AfterViewInit{
  title = 'todos-angular';
  @ViewChild('AddTodoInput') AddTodoInput!: ElementRef // ！表示一定存在
  todos: Observable<Todo[]>
  constructor(private store: Store<AppState>) {
    this.todos = this.store.pipe(select(selectTodos))
  }
  
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    fromEvent<KeyboardEvent>(this.AddTodoInput.nativeElement, 'keyup')
    .pipe(
      filter(event => event.key === 'Enter'),
      map(event => (<HTMLInputElement>event.target).value),
      map(title => title.trim()),
      filter(title => title !== '')
    )
    .subscribe(title => {
      this.store.dispatch(addTodo({title}))
      this.AddTodoInput.nativeElement.value = ''
    })
  }

  addTodo() {
    const title: string = this.AddTodoInput.nativeElement.value
    if (!title.trim()) return
    this.store.dispatch(addTodo({title}))
    this.AddTodoInput.nativeElement.value = ''
  }

  checkChange(target: any, id: string) {
    // console.log(target.checked, id)
    this.store.dispatch(checkedTodo({id, checked: target.checked}))
  }

  deleteTodo(id: string) {
    this.store.dispatch(deleteTodo({id}))
  }
}

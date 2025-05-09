import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import TasksListComponent from './components/tasks-list/tasks-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const routes: Routes = [
  {
    path: '',
    component: TasksListComponent
  },
  {
    path: 'tasks-list',
    component: TasksListComponent
  },
  {
    path: 'task-form',
    component: TaskFormComponent
  }
];

import { Routes } from '@angular/router';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const routes: Routes = [
  {
    path: '',
    component: TasksPageComponent
  },
  {
    path: 'tasks-list',
    component: TasksPageComponent
  },
  {
    path: 'task-form',
    component: TaskFormComponent
  },
  {
    path: 'task-form/:id',
    component: TaskFormComponent
  }
];

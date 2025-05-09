import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../interface/task';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule],
  templateUrl: './tasks-list.component.html',
  })
export default class TasksListComponent {
  @Input() tasks: Task[] = [];

  readonly displayedColumns = ['id', 'title', 'description', 'completed', 'priority', 'actions'];
}

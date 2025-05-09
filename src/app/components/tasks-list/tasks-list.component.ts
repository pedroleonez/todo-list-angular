import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../interface/task';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule],
  templateUrl: './tasks-list.component.html',
  })
export default class TasksListComponent {
  @Input() tasks: Task[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['id', 'title', 'description', 'completed', 'priority', 'actions'];

  onAdd() {
    this.add.emit(true);
  }

  onEdit(task: Task) {
    this.edit.emit(task);
  }

  onDelete(task: Task) {
    this.delete.emit(task);
  }
}

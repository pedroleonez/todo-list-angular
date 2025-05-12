import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interface/task';
import TasksListComponent from '../../components/tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks-page',
  imports: [CommonModule, TasksListComponent],
  templateUrl: './tasks-page.component.html',
})
export class TasksPageComponent implements OnInit {
  private readonly _taskService = inject(TasksService);
  private readonly _router = inject(Router);

  tasks: Task[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this._taskService.list().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas:', error);
        this.loading = false;
      }
    });
  }

  navigateToAdd(): void {
    this._router.navigate(['/task-form']);
  }
  onEdit(task: Task): void {
    this._router.navigate([`/task-form/${task.id}`]);
  }

  onDelete(task: Task): void {
    if (confirm(`Deseja realmente excluir a tarefa "${task.title}"?`)) {
      this._taskService.delete(String(task.id)).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        },
        error: (error) => console.error('Erro ao excluir tarefa:', error)
      });
    }
  }
}

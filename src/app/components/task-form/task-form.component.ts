import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Task } from '../../interface/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  providers: [TasksService],
})
export class TaskFormComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _taskService = inject(TasksService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  taskId: number | null = null;
  isEditMode = signal(false);
  pageTitle = signal('Adicionar Tarefa');
  loading = signal(false);

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control('', Validators.required),
    priority: this._formBuilder.control('1', Validators.required),
    completed: this._formBuilder.control(false),
  });

  ngOnInit(): void {
    const idParam = this._route.snapshot.paramMap.get('id');
    if (idParam) {
      this.taskId = parseInt(idParam, 10);
      this.isEditMode.set(true);
      this.pageTitle.set('Editar Tarefa');
      this.loadTaskData(this.taskId);
    }
  }

  loadTaskData(id: number): void {
    this.loading.set(true);
    this._taskService.loadById(String(id)).subscribe({
      next: (task) => {
        this.form.patchValue({
          title: task.title,
          description: task.description,
          priority: String(task.priority),
          completed: task.completed
        });
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar tarefa:', error);
        toast.error('Erro ao carregar tarefa. Redirecionando...');
        this.loading.set(false);
        this._router.navigate(['/tasks-list']);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading.set(true);

      const task: Partial<Task> = {
        title: this.form.get('title')?.value ?? '',
        description: this.form.get('description')?.value ?? '',
        priority: Number(this.form.get('priority')?.value ?? 1),
        completed: this.form.get('completed')?.value || false,
      };

      // Add ID if in edit mode
      if (this.isEditMode() && this.taskId) {
        task.id = this.taskId;
      }

      this._taskService.save(task).subscribe({
        next: () => {
          const message = this.isEditMode() ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!';
          toast.success(message);
          this._router.navigate(['/tasks-list']);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Erro ao salvar tarefa:', error);
          const errorMsg = this.isEditMode() ? 'Erro ao atualizar tarefa' : 'Erro ao criar tarefa';
          toast.error(`${errorMsg}. Tente novamente.`);
          this.loading.set(false);
        },
      });
    } else {
      this.form.markAllAsTouched();
      toast.error('Preencha todos os campos obrigatórios');
    }
  }
}

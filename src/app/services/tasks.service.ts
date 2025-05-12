import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interface/task';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly API = 'http://localhost:8080/api/tasks';

  constructor(private readonly httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Task[]>(`${this.API}`)
    .pipe(
      first(),
      delay(1000)
    );
  }

  loadById(id: string) {
    return this.httpClient.get<Task>(`${this.API}/${id}`)
    .pipe(
      first()
    );
  }

  private create(record: Partial<Task>) {
    return this.httpClient.post<Task>(`${this.API}`, record)
    .pipe(
      first()
    );
  }

  private update(record: Partial<Task>) {
    return this.httpClient.put<Task>(`${this.API}/${record.id}`, record)
    .pipe(
      first()
    );
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`)
    .pipe(
      first()
    );
  }

  save(record: Partial<Task>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }
}

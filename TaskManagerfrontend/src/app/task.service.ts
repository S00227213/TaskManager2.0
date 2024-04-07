import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://76v3f1gp1d.execute-api.eu-west-1.amazonaws.com/dev';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  createTask(newTask: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, newTask);
  }

  getTaskById(taskId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/${taskId}`);
  }

  updateTask(taskId: string, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}`);
  }
}

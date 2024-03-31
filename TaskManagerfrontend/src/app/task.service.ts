import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Amplify from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://127.0.0.1:5000'; 

  constructor(private http: HttpClient) {}

  // Get a list of tasks from the API
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  // Create a new task by sending a POST request to the API
  createTask(newTask: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, newTask);
  }

  // Get a specific task by its ID from the API
  getTaskById(taskId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/${taskId}`);
  }

  // Update a task by sending a PUT request to the API
  updateTask(taskId: string, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${taskId}`, task);
  }

  // Delete a task by sending a DELETE request to the API
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}`);
  }

  // Get a list of tasks filtered by priority
  getTasksFilteredByPriority(priority: string): Observable<any[]> {
    const filterUrl = `${this.apiUrl}/tasks/filter`;
    const queryParams = priority ? `?priority=${priority}` : '';
    return this.http.get<any[]>(`${filterUrl}${queryParams}`);
  }
}

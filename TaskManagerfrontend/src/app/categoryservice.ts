import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://76v3f1gp1d.execute-api.eu-west-1.amazonaws.com/dev/tasks';

  constructor(private http: HttpClient) {}

  // Get all categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single category by ID
  getCategoryById(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${categoryId}`);
  }

  // Create a new category
  createCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoryData);
  }
// Update an existing category
updateCategory(categoryId: string, categoryData: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${categoryId}`, categoryData);
}

// Delete a category
deleteCategory(categoryId: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${categoryId}`);
}
}
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskFormService {

  constructor(private fb: FormBuilder) {}

  initTaskForm(task?: any): FormGroup {
    return this.fb.group({
      title: [task ? task.title : '', Validators.required],
      description: [task ? task.description : '', Validators.maxLength(1000)],
      dueDate: [task ? new Date(task.dueDate).toISOString().split('T')[0] : '', Validators.required],
      priority: [task ? task.priority : '', Validators.required],
      status: [task ? task.status : 'Pending', Validators.required],
      category: [task ? task.category : '', Validators.required], 
    });
  }
  
}
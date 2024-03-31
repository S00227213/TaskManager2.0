import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../task.service';
import { TaskFormService } from '../../task-form.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'], 
})
export class TaskDetailsComponent implements OnInit {
  taskForm!: FormGroup; 
  today: Date = new Date(); 
  errorMessage: string = '';

  constructor(
    private taskFormService: TaskFormService, 
    private taskService: TaskService, 
    private formBuilder: FormBuilder, 
    private router: Router 
  ) {}

  ngOnInit() {
    // Initialize the task form with validation
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(1000)]],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  // Function to create a new task
  createTask() {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe(
        (data: any) => {
          console.log('New task created successfully:', data);
          this.router.navigate(['/tasklist']); // Navigate back to the task list upon success
        },
        (error: any) => {
          console.error('Error creating task:', error);
          this.errorMessage = `Error creating task: ${error.status} ${error.statusText}`;
          if (error.error && error.error.message) {
            this.errorMessage += ` - ${error.error.message}`;
          }
        }
      );
    } else {
      // Display an error message if the form is invalid
      this.errorMessage = 'Please fill in the form correctly before submitting.';
    }
  }
}

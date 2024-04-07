import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskForm!: FormGroup;
  today: Date = new Date();
  errorMessage: string = '';
  formSubmitted: boolean = false; 

  categories = [
    { id: 'Work', name: 'Work' },
    { id: 'Free Time', name: 'Free Time' }
  ];

  priorities = [
    { value: 'High', viewValue: 'High' },
    { value: 'Medium', viewValue: 'Medium' },
    { value: 'Low', viewValue: 'Low' }
  ];

  statuses = [
    { value: 'Pending', viewValue: 'Pending' },
    { value: 'Ongoing', viewValue: 'Ongoing' },
    { value: 'Completed', viewValue: 'Completed' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(65535)]],
      due_date: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      user_id: ['', Validators.required],
      category_id: ['', Validators.required],
      completed: [false]
    });
  }

  createTask() {
    console.log('Form Validity:', this.taskForm.valid);
    console.log('Form Values:', this.taskForm.value);

    if (!this.taskForm.valid) {
      Object.keys(this.taskForm.controls).forEach(key => {
        const controlErrors = this.taskForm.get(key)?.errors; 
        if (controlErrors) {
          console.log(`Form control '${key}' has errors:`, controlErrors);
        }
      });
      this.errorMessage = 'Please fill in the form correctly before submitting.';
      return;
    }
    
    this.formSubmitted = true; // Set to true when form is submitted

    let formData = { ...this.taskForm.value };
    formData.category_id = this.categories.find(c => c.name === formData.category_id)?.id || formData.category_id;
    
    this.taskService.createTask(formData).subscribe({
      next: (response) => {
        console.log('Task created:', response);
        this.snackBar.open('Task created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/tasklist']);
      },
      error: (error) => {
        console.error('Error creating task:', error);
        this.errorMessage = 'Error creating task. Please try again.';
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.taskForm.dirty && !this.formSubmitted) {
      $event.returnValue = true;
    }
  }
}

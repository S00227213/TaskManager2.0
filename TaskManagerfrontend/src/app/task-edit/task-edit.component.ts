import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskForm!: FormGroup;
  taskId: string | null = null;
  isAuthenticated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private cognitoService: CognitoService
  ) {}

  async ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    if (this.taskId) {
      this.loadTaskData(this.taskId);
    }
    this.checkAuthentication();
  }

  private async checkAuthentication() {
    const currentUser = await this.cognitoService.getCurrentUser();
    this.isAuthenticated = !!currentUser;
  }

  private initializeForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  private loadTaskData(taskId: string) {
    this.taskService.getTaskById(taskId).subscribe(
      (task) => {
        if (task.dueDate) {
          task.dueDate = new Date(task.dueDate).toISOString().split('T')[0];
        }
        this.taskForm.patchValue(task);
      },
      (error) => console.error('Error fetching task data:', error)
    );
  }

  onSubmit() {
    if (this.taskForm.valid && this.taskId) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe(
        () => {
          this.snackBar.open('Task updated successfully', 'OK', { duration: 3000 });
          this.router.navigate(['/tasklist']);
        },
        (error) => console.error('Error updating task:', error)
      );
    }
  }

  cancelEdit() {
    this.router.navigate(['/tasklist']);
  }

  logout() {
    this.cognitoService.signOut();
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}

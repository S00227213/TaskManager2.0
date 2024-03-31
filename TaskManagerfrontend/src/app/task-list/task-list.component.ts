import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  priorities: string[] = ['All', 'High', 'Medium', 'Low'];
  selectedPriority: string = 'All';
  isAuthenticated: boolean = false;
  userEmail: string | undefined;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cognitoService: CognitoService
  ) {}

  async ngOnInit() {
    await this.checkAuthentication();
    this.loadTaskList();
  }

  private loadTaskList() {
    this.taskService.getTasks().subscribe(
      (data: any[]) => {
        this.tasks = data;
        this.applyFilter();
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  applyFilter() {
    if (this.selectedPriority === 'All') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.priority === this.selectedPriority);
    }
  }

  onPriorityChange() {
    this.applyFilter();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.snackBar.open('Task deleted successfully', 'OK', { duration: 3000 });
        this.loadTaskList(); // Reload task list to reflect the deletion
      },
      (error) => {
        this.snackBar.open('Error deleting task', 'OK', { duration: 3000 });
        console.error('Error deleting task:', error);
      }
    );
  }

  private async checkAuthentication() {
    const currentUser = await this.cognitoService.getCurrentUser();
    this.isAuthenticated = !!currentUser;
    if (currentUser) {
      this.userEmail = currentUser.getUsername();
    }
  }

  logout() {
    this.cognitoService.signOut();
    this.router.navigate(['/home']).then(() => window.location.reload());
  }
}

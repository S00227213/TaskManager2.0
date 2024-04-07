import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CognitoService } from '../cognito.service';
import { HttpClient } from '@angular/common/http';

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
  categories: any[] = [];
  selectedCategory: string = 'All';
  isAuthenticated: boolean = false;
  userEmail: string | undefined;
  apiEndpoint: string = 'https://76v3f1gp1d.execute-api.eu-west-1.amazonaws.com/dev/tasks';

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cognitoService: CognitoService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    await this.checkAuthentication();
    this.loadTaskList();
  }

  private loadTaskList() {
    this.taskService.getTasks().subscribe(
      (data: any[]) => {
        this.tasks = data.map(task => ({
          ...task,
          id: task.task_id  
        }));
        this.applyFilter();
        console.log('Tasks loaded:', this.tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
  


  applyFilter() {
    this.filteredTasks = this.tasks.filter(task => 
      (this.selectedPriority === 'All' || task.priority === this.selectedPriority) &&
      (this.selectedCategory === 'All' || task.category === this.selectedCategory)
    );
    console.log('Filtered tasks:', this.filteredTasks);
  }

  onPriorityChange() {
    this.applyFilter();
  }

  onCategoryChange() {
    this.applyFilter();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.snackBar.open('Task deleted successfully', 'OK', { duration: 3000 });
        this.loadTaskList(); // Reload task list to reflect the deletion
        console.log('Task deleted:', taskId);
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
      console.log('Current user:', currentUser);
    } else {
      console.log('No authenticated user.');
    }
  }

  logout() {
    this.cognitoService.signOut();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
      console.log('User logged out.');
    });
  }

}
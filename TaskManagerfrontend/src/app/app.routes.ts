import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { HomeComponent } from './home/home.component';
import { SignInComponentComponent } from './sign-in-component/sign-in-component.component';
import { SignUpComponentComponent } from './sign-up-component/sign-up-component.component'; 
import { CognitoAuthGuard } from './cognito-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tasklist', component: TaskListComponent, canActivate: [CognitoAuthGuard] },
  { path: 'task-edit/:id', component: TaskEditComponent, canActivate: [CognitoAuthGuard] },
  { path: 'create-task', component: TaskDetailsComponent, canActivate: [CognitoAuthGuard] },
  { path: 'sign-in', component: SignInComponentComponent },
  { path: 'sign-up', component: SignUpComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
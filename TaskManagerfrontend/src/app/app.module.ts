import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { MaterialModule } from './material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { ConfirmSignUpComponent } from './confirm-sign-up-component/confirm-sign-up-component.component';
import { ConfirmationCodeDialogComponent } from './confirmation-code-dialog-component/confirmation-code-dialog-component.component';
import { SignUpComponentComponent } from './sign-up-component/sign-up-component.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskListComponent,
    TaskEditComponent,
    TaskDetailsComponent,
    ConfirmSignUpComponent,
    ConfirmationCodeDialogComponent,
    SignUpComponentComponent,
    
    NavbarComponent, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule, 
    MatMenuModule, 
  ],
  providers: [  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
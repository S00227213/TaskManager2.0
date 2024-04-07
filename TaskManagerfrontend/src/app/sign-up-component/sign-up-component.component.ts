import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CognitoService } from '../cognito.service';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { ConfirmationCodeDialogComponent } from '../confirmation-code-dialog-component/confirmation-code-dialog-component.component';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.css']
})
export class SignUpComponentComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  givenName: string = '';
  familyName: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private cognitoService: CognitoService 
  ) {}

  onSignUp(): void {
    if (!this.username || !this.email || !this.password || !this.givenName || !this.familyName) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    const attributes = [
      new CognitoUserAttribute({ Name: 'email', Value: this.email }),
      new CognitoUserAttribute({ Name: 'given_name', Value: this.givenName }),
      new CognitoUserAttribute({ Name: 'family_name', Value: this.familyName }),
    ];

    this.cognitoService.signUp(this.username, this.password, attributes).then(result => {
      console.log('User registration successful:', result);
      // Open the confirmation dialog passing both code and username
      this.dialog.open(ConfirmationCodeDialogComponent, {
        width: '250px',
        data: { code: '', username: this.username } 
      }).afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.router.navigate(['/sign-in']);
        }
      });
    }).catch(error => {
      console.error('Registration error:', error);
      this.errorMessage = error.message || 'Registration failed. Please try again.';
    });
  }
}

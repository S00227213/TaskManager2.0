import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router'; 
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-confirmation-code-dialog',
  templateUrl: './confirmation-code-dialog-component.component.html',
})
export class ConfirmationCodeDialogComponent {
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmationCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { code: string, username: string },
    private cognitoService: CognitoService,
    private router: Router 
  ) {}

  confirmCode(): void {
    if (!this.data.code) {
      this.errorMessage = 'Please enter the confirmation code.';
      return;
    }

    this.cognitoService.confirmSignUp(this.data.username, this.data.code).then(() => {
      this.dialogRef.close();
      this.router.navigate(['/sign-in']);
    }).catch((error: Error) => {
      this.errorMessage = 'Wrong verification code. Try again.';
      console.error('Confirmation error:', error);
    });
  }

}

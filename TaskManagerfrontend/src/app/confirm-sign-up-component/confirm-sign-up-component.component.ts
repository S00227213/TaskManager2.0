import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-confirm-sign-up',
  templateUrl: './confirm-sign-up-component.component.html',
  styleUrls: ['./confirm-sign-up-component.component.css']
})
export class ConfirmSignUpComponent {
  confirmForm: FormGroup;
  errorMessage: string = ''; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cognitoService: CognitoService
  ) {
    // Initialize the form group with form controls and their validators
    this.confirmForm = this.fb.group({
      username: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  // This method is called when the user submits the form
  async onSubmit() {
    // Check if the form is valid before attempting to sign up
    if (this.confirmForm.valid) {
      // Extract the username and code from the form's value
      const { username, code } = this.confirmForm.value;
      try {
        // Call the confirmSignUp method from the CognitoService
        await this.cognitoService.confirmSignUp(username, code);
        // Navigate to the sign-in page if the sign-up was successful
        this.router.navigate(['/sign-in']);
      } catch (error: any) { // Use a type assertion for the error object
        // If there's an error, log it and set the errorMessage to be displayed
        console.error('Error confirming sign-up:', error);
        this.errorMessage = error?.message || 'An unexpected error occurred during sign up.';
      }
    }
  }
}

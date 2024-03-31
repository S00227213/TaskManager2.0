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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cognitoService: CognitoService 
  ) {
    this.confirmForm = this.fb.group({
      username: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.confirmForm.valid) {
      const { username, code } = this.confirmForm.value;
      try {
        const result = await this.cognitoService.confirmSignUp(username, code);
        // Check result or directly navigate to sign-in on success
        this.router.navigate(['/sign-in']);
      } catch (error) {
        console.error('error confirming sign up', error);
      }
    }
  }
}

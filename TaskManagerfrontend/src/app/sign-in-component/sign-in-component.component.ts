import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { CognitoService } from '../cognito.service'; 

@Component({
  selector: 'app-sign-in-component',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './sign-in-component.component.html',
  styleUrls: ['./sign-in-component.component.css']
})
export class SignInComponentComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(private router: Router, private cognitoService: CognitoService) {}

  async onSignIn(): Promise<void> {
    this.errorMessage = ''; // Reset the error message on each sign-in attempt
    try {
      const session = await this.cognitoService.signIn(this.email, this.password);
      console.log('Sign in success:', session);
      this.router.navigate(['/home']); // Navigate to the home page on successful sign-in
    } catch (error) {
      console.error('Error signing in:', error);
      this.errorMessage = 'Login failed. Please try again.'; 
    }
  }
}

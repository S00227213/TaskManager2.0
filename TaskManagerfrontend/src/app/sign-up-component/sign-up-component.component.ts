import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CognitoService } from '../cognito.service'; 

@Component({
  selector: 'app-sign-up-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.css']
})
export class SignUpComponentComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private cognitoService: CognitoService) {}

  async onSignUp(): Promise<void> {
    try {
      const signUpResponse = await this.cognitoService.signUp(this.email, this.password);
      console.log(signUpResponse);
      this.router.navigate(['/confirm-sign-up'], { queryParams: { username: this.email } });
    } catch (error) {
      console.log('Error signing up:', error);
    }
  }
}

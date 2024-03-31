import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean = false;
  userEmail: string | undefined;

  constructor(
    private cognitoService: CognitoService, 
    private router: Router, 
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    const user = await this.cognitoService.getCurrentUser();
    this.isAuthenticated = !!user;
    if (user) {
      // Optionally load the user's email if needed
      this.userEmail = user.getUsername();
    }
  }

  login(): void {
    // Redirect to sign-in page
    this.router.navigate(['/sign-in']);
  }

  async logout(): Promise<void> {
    this.cognitoService.signOut();
    this.snackBar.open('You have been logged out', '', { duration: 3000 });
    this.router.navigate(['/home']);
  }

  async navigateTo(path: string): Promise<void> {
    const user = await this.cognitoService.getCurrentUser();
    if (user) {
      this.router.navigate([path]);
    } else {
      this.snackBar.open('Please log in first', '', { duration: 3000 });
    }
  }

  // Optionally, implement loadUserProfile using Cognito attributes
  private async loadUserProfile(): Promise<void> {
    const user = await this.cognitoService.getCurrentUser();
    if (user) {
      user.getUserAttributes((err, attributes) => {
        if (err) {
          console.error(err);
          return;
        }
        this.userEmail = attributes?.find(attr => attr.getName() === 'email')?.getValue();
      });
    }
  }
}

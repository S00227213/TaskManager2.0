import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth'; 

@Component({
  selector: 'app-sign-out-component',
  standalone: true,
  templateUrl: './sign-out-component.component.html',
  styleUrls: ['./sign-out-component.component.css']
})
export class SignOutComponentComponent {
  constructor(private router: Router) {}

  onSignOut(): void {
    Auth.signOut()
      .then(() => {
        this.router.navigate(['/sign-in']); // Redirect to sign-in page after sign out
      })
      .catch((err: any) => console.log(err));
  }
}
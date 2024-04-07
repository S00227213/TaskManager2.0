
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  username: string = '';
  private authSubscription!: Subscription;
  private usernameSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });

    this.usernameSubscription = this.authService.getUsername().subscribe((username) => {
      this.username = username;
    });
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Logout error:', error);
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.usernameSubscription) { 
      this.usernameSubscription.unsubscribe();
    }
  }
}

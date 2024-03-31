import { Component, OnInit } from '@angular/core';
import { CognitoService } from './cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  title = 'frontend';

  constructor(
    private cognitoService: CognitoService,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = await this.cognitoService.getCurrentUser();
    this.isAuthenticated = !!user;
  }

  logout(): void {
    this.cognitoService.signOut();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  fetchData(): void {
    this.cognitoService.getSession().then((session: any) => {
      const token = session.getIdToken().getJwtToken();
      console.log('Token for secure data fetching:', token);  
    }).catch((error: any) => {
      console.error('Error fetching secure data:', error);
    });
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CognitoService } from './cognito.service'; 

@Injectable({
  providedIn: 'root'
})
export class CognitoAuthGuard implements CanActivate {
  constructor(private router: Router, private cognitoService: CognitoService) {}

  async canActivate(): Promise<boolean> {
    const currentUser = await this.cognitoService.getCurrentUser();
    if (currentUser) {
      return true;
    } else {
      this.router.navigate(['/sign-in']); 
      return false;
    }
  }
}

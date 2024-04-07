import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-1_45yUFXA2P', 
  ClientId: '77gmidt9ljuuqvn7rs0srolkl7', 
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private usernameSubject = new BehaviorSubject<string>('');

  constructor() {}

  getCurrentUser(): Promise<CognitoUser | null> {
    const user = userPool.getCurrentUser();
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.resolve(null);
    }
  }

  updateAuthenticationStatus(status: boolean, username: string = ''): void {
    this.isAuthenticatedSubject.next(status);
    this.usernameSubject.next(username); 
  }

  signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => {
        if (user) {
          user.signOut();
          this.updateAuthenticationStatus(false);
          resolve();
        } else {
          reject("No user currently signed in.");
        }
      }).catch(error => reject(error));
    });
  }

  signIn(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          const username = session.getIdToken().decodePayload()['cognito:username'];
          this.updateAuthenticationStatus(true, username);
          resolve();
        },
        onFailure: (err) => {
          this.updateAuthenticationStatus(false);
          reject(err);
        },
      });
    });
  }

  getUsername(): BehaviorSubject<string> {
    return this.usernameSubject;
  }
}

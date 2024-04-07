import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser, CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
import { AuthService } from './auth.service';

const poolData = {
  UserPoolId: 'eu-west-1_45yUFXA2P',
  ClientId: '77gmidt9ljuuqvn7rs0srolkl7',
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  constructor(private snackBar: MatSnackBar, private authService: AuthService) {} 

  getCurrentUser(): Promise<CognitoUser | null> {
    return new Promise((resolve) => {
      const currentUser = userPool.getCurrentUser();
      if (currentUser) {
        currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
          if (err) {
            resolve(null);
          } else if (session && session.isValid()) {
            resolve(currentUser);
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    });
  }

  signUp(email: string, password: string, attributes: CognitoUserAttribute[]): Promise<ISignUpResult | Error> {
    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributes, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result as ISignUpResult);
        }
      });
    });
  }

  confirmSignUp(username: string, code: string): Promise<string | Error> {
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          this.snackBar.open('Account verified successfully!', 'Close', {
            duration: 3000,
          });
          resolve(result);
        }
      });
    });
  }

  signIn(username: string, password: string): Promise<CognitoUserSession | Error> {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          // Update global auth status upon successful sign-in
          this.authService.updateAuthenticationStatus(true, username);
          resolve(session);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  signOut(): void {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      // Update global auth status upon sign-out
      this.authService.updateAuthenticationStatus(false, '');
    }
  }

  getSession(): Promise<CognitoUserSession | Error> {
    return this.getCurrentUser().then((user) => {
      return new Promise((resolve, reject) => {
        if (user) {
          user.getSession((err: Error | null, session: CognitoUserSession | null) => {
            if (err) {
              reject(err);
            } else {
              resolve(session as CognitoUserSession);
            }
          });
        } else {
          reject(new Error('No current user'));
        }
      });
    });
  }
}

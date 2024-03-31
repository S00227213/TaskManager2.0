Simport { Injectable } from '@angular/core';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-1_45yUFXA2P', //  User Pool ID
  ClientId: '77gmidt9ljuuqvn7rs0srolkl7', // Client ID
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  constructor() {}

  getCurrentUser(): Promise<CognitoUser | null> {
    return new Promise((resolve, reject) => {
      const currentUser = userPool.getCurrentUser();
      if (currentUser != null) {
        currentUser.getSession((err: any, session: CognitoUserSession) => {
          if (err) {
            reject(err);
          } else if (session.isValid()) {
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
  signUp(email: string, password: string, attributes: CognitoUserAttribute[] = []): Promise<CognitoUser | any> {
    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributes, [], (err, result) => { 
            if (err) {
                reject(err);
                return;
            }
            if (result) { 
                resolve(result.user);
            } else {
                reject(new Error('Sign up failed without an error message.'));
            }
        });
    });
}

  confirmSignUp(username: string, code: string): Promise<string> {
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  signIn(username: string, password: string): Promise<CognitoUserSession> {
    const authenticationDetails = new AuthenticationDetails({ Username: username, Password: password });
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
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
    }
  }

  getSession(): Promise<CognitoUserSession | null> {
    return this.getCurrentUser().then((user) => {
      return new Promise((resolve, reject) => {
        if (user) {
          user.getSession((err: any, session: CognitoUserSession) => {
            if (err) {
              reject(err);
            } else {
              resolve(session);
            }
          });
        } else {
          reject('No current user');
        }
      });
    });
  }
}

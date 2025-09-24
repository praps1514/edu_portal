// lib/auth.ts
import {
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
import { userPool } from './cognito';

export const login = (email: string, password: string) => {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: email, Password: password });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: session => {
        const idToken = session.getIdToken().getJwtToken();
        resolve({ user, idToken });
      },
      onFailure: err => reject(err)
    });
  });
};
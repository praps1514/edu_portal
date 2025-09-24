import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  ISignUpResult,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-northeast-1_KjE5qvk6Y',
  ClientId: '1pa58tm5q7b6c5bsds22k2hu3a'
};

export const userPool = new CognitoUserPool(poolData);

export const signUp = (email: string, password: string): Promise<CognitoUser | undefined> => {
  const attributes = [new CognitoUserAttribute({ Name: 'email', Value: email })];

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributes, [], (err, result: ISignUpResult | undefined) => {
      if (err) {
        reject(err);
      } else {
        resolve(result?.user);
      }
    });
  });
};

export const login = (email: string, password: string): Promise<string> => {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: email, Password: password });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (session: CognitoUserSession) => {
        const idToken = session.getIdToken().getJwtToken();
        resolve(idToken);
      },
      onFailure: err => reject(err)
    });
  });
};

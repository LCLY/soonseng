import { TReceivedUserInfoObj } from '../types/auth';
import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';

/* ============================================================================================ */
//  Authentication
/* ============================================================================================ */

export const clearAuthState = () => {
  return {
    type: actionTypes.CLEAR_AUTH_STATE,
  };
};

// Sign in
export const signIn = (email: string, password: string): AppActions => {
  return {
    type: actionTypes.SIGN_IN,
    email: email,
    password: password,
  };
};

export const signInStart = (): AppActions => {
  return {
    type: actionTypes.SIGN_IN_START,
  };
};

export const signInSucceed = (): AppActions => {
  return {
    type: actionTypes.SIGN_IN_SUCCEED,
  };
};
export const signInFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
    errorMessage: errorMessage,
  };
};

// Get User Info
export const getUserInfo = (): AppActions => {
  return {
    type: actionTypes.GET_USER_INFO,
  };
};

export const getUserInfoStart = (): AppActions => {
  return {
    type: actionTypes.GET_USER_INFO_START,
  };
};

export const getUserInfoSucceed = (userInfoObj: TReceivedUserInfoObj): AppActions => {
  return {
    type: actionTypes.GET_USER_INFO_SUCCEED,
    userInfoObj: userInfoObj,
  };
};
export const getUserInfoFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_USER_INFO_FAILED,
    errorMessage: errorMessage,
  };
};

import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import { TReceivedUserInfoObj, TUserAccess } from '../types/auth';

/* ============================================================================================ */
//  Authentication
/* ============================================================================================ */

/* ------------------- */
// clear state
/* ------------------- */
export const clearAuthState = (): AppActions => {
  return {
    type: actionTypes.CLEAR_AUTH_STATE,
  };
};

/* ------------------- */
// Assign Access
/* ------------------- */
export const assignAccess = (accessObj: TUserAccess): AppActions => {
  return {
    type: actionTypes.ASSIGN_ACCESS,
    accessObj: accessObj,
  };
};

/* ------------------------------------------- */
// Sign in
/* ------------------------------------------- */
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

export const signInSucceed = (auth_token: string): AppActions => {
  return {
    type: actionTypes.SIGN_IN_SUCCEED,
    auth_token: auth_token,
  };
};
export const signInFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------------------- */
// Sign out
/* ------------------------------------------- */
export const signOut = (): AppActions => {
  return {
    type: actionTypes.SIGN_OUT,
  };
};

/* ------------------------------------------- */
// Get User Info
/* ------------------------------------------- */
export const getUserInfo = (auth_token: string | null): AppActions => {
  return {
    type: actionTypes.GET_USER_INFO,
    auth_token: auth_token,
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

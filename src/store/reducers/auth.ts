import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { AuthActionTypes, AuthInitialState } from 'src/store/types/auth';
import { AppActions } from 'src/store/types';

const initialState: AuthInitialState = {
  loading: false,
  errorMessage: null,
  successMessage: null,
  // user info
  userInfoObj: null,
};

/* ============================================================================================ */
// Clear Auth State - reset the states
/* ============================================================================================ */
const clearAuthState = (state: AuthInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: false,
    errorMessage: null,
    successMessage: null,
  });
};

/* ============================================================================================ */
/* Sign in
/* ============================================================================================ */
const signInStart = (state: AuthInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const signInSucceed = (state: AuthInitialState, _action: AppActions) => {
  return updateObject(state, {
    errorMessage: null,
    loading: false,
  });
};
const signInFailed = (state: AuthInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* Get User Info
/* ============================================================================================ */
const getUserInfoStart = (state: AuthInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getUserInfoSucceed = (state: AuthInitialState, action: AppActions) => {
  if ('userInfoObj' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      userInfoObj: action.userInfoObj,
    });
  }
};
const getUserInfoFailed = (state: AuthInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* ============================================================================================ */
const reducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case actionTypes.CLEAR_AUTH_STATE:
      return clearAuthState(state, action);
    //  Sign In
    case actionTypes.SIGN_IN_START:
      return signInStart(state, action);
    case actionTypes.SIGN_IN_SUCCEED:
      return signInSucceed(state, action);
    case actionTypes.SIGN_IN_FAILED:
      return signInFailed(state, action);
    /* =================================== */
    //  Get User Info
    case actionTypes.GET_USER_INFO_START:
      return getUserInfoStart(state, action);
    case actionTypes.GET_USER_INFO_SUCCEED:
      return getUserInfoSucceed(state, action);
    case actionTypes.GET_USER_INFO_FAILED:
      return getUserInfoFailed(state, action);

    default:
      return state;
  }
};

export default reducer;

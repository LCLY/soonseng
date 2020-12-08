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
  // auth token
  auth_token: null,
  // access
  accessObj: {
    showAdminDashboard: false,
    allowEditSalesDashboard: false,
    showFullSalesPage: false,
    showPriceSalesPage: false,
    showSalesmenDashboard: false,
    showSalesDashboard: false,
  },
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
// Assign Access
/* ============================================================================================ */
const assignAccess = (state: AuthInitialState, action: AppActions) => {
  if ('accessObj' in action) {
    return updateObject(state, {
      accessObj: action.accessObj,
    });
  }
};

/* ============================================================================================ */
/* Sign in
/* ============================================================================================ */
const signInStart = (state: AuthInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const signInSucceed = (state: AuthInitialState, action: AppActions) => {
  if ('auth_token' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      auth_token: action.auth_token,
    });
  }
};
const signInFailed = (state: AuthInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* Sign out
/* ============================================================================================ */
// remove the auth token and resets the access obj all back to false
const signOut = (state: AuthInitialState, _action: AppActions) => {
  return updateObject(state, {
    auth_token: null,
    accessObj: {
      showAdminDashboard: false,
      allowEditSalesDashboard: false,
      showFullSalesPage: false,
      showPriceSalesPage: false,
      showSalesmenDashboard: false,
      showSalesDashboard: false,
    },
  });
};

/* ============================================================================================ */
/* Get User Info
/* ============================================================================================ */
const getUserInfoStart = (state: AuthInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null });
};
const getUserInfoSucceed = (state: AuthInitialState, action: AppActions) => {
  if ('userInfoObj' in action) {
    return updateObject(state, {
      errorMessage: null,
      userInfoObj: action.userInfoObj,
    });
  }
};
const getUserInfoFailed = (state: AuthInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage });
  }
};

/* ============================================================================================ */
/* ============================================================================================ */
const reducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    /* ---------------------- */
    //  Clear state
    /* ---------------------- */
    case actionTypes.CLEAR_AUTH_STATE:
      return clearAuthState(state, action);
    /* ---------------------- */
    //  Assign Access
    /* ---------------------- */
    case actionTypes.ASSIGN_ACCESS:
      return assignAccess(state, action);
    /* ---------------------- */
    //  Sign In
    /* ---------------------- */
    case actionTypes.SIGN_IN_START:
      return signInStart(state, action);
    case actionTypes.SIGN_IN_SUCCEED:
      return signInSucceed(state, action);
    case actionTypes.SIGN_IN_FAILED:
      return signInFailed(state, action);
    /* ---------------------- */
    //  Sign Out
    /* ---------------------- */
    case actionTypes.SIGN_OUT:
      return signOut(state, action);
    /* ---------------------- */
    //  Get User Info
    /* ---------------------- */
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

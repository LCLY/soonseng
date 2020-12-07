import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface AuthInitialState {
  readonly loading: boolean;
  readonly errorMessage: string | null;
  readonly successMessage: string | null;
  // user info
  readonly userInfoObj: TReceivedUserInfoObj | null;
}

// to further breakdown the state, use in mapStateToProps
export interface IAuthMapStateToProps {
  readonly auth: AuthInitialState;
}

/* ============================================================== */
// Sign in
/* ============================================================== */
/* Api call */
export interface SignInAction {
  type: typeof actionTypes.SIGN_IN;
  email: string;
  password: string;
}

export interface SignInStartAction {
  type: typeof actionTypes.SIGN_IN_START;
}

export interface SignInSucceedAction {
  type: typeof actionTypes.SIGN_IN_SUCCEED;
}

export interface SignInFailedAction {
  type: typeof actionTypes.SIGN_IN_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Get User Info
/* ============================================================== */
// Type
export type TReceivedUserInfoObj = {
  email: string;
  first_name: string;
  last_name: string;
  roles: {
    id: number;
    title: string;
    priceSalesPage: boolean;
    fullSalesPage: boolean;
    viewSalesDashboard: boolean;
    editSalesDashboard: boolean;
    salesmenDashboard: boolean;
    adminDashboard: boolean;
  };
};
/* Api call */
export interface GetUserInfoAction {
  type: typeof actionTypes.GET_USER_INFO;
}

export interface GetUserInfoStartAction {
  type: typeof actionTypes.GET_USER_INFO_START;
}

export interface GetUserInfoSucceedAction {
  type: typeof actionTypes.GET_USER_INFO_SUCCEED;
  userInfoObj: TReceivedUserInfoObj;
}

export interface GetUserInfoFailedAction {
  type: typeof actionTypes.GET_USER_INFO_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type AuthActionTypes =
  /* -------------------- */
  // Sign in
  /* -------------------- */
  | SignInAction
  | SignInStartAction
  | SignInSucceedAction
  | SignInFailedAction
  /* -------------------- */
  // User Info
  /* -------------------- */
  | GetUserInfoAction
  | GetUserInfoStartAction
  | GetUserInfoSucceedAction
  | GetUserInfoFailedAction;

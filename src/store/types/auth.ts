import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface AuthInitialState {
  readonly loading?: boolean;
  readonly errorMessage?: string | null;
  readonly successMessage?: string | null;
  // user info
  readonly userInfoObj?: TReceivedUserInfoObj | null;
  // auth token
  readonly auth_token?: string | null;
  // access
  readonly accessObj?: TUserAccess;
}

// to further breakdown the state, use in mapStateToProps
export interface IAuthMapStateToProps {
  readonly auth: AuthInitialState;
}

/* ============================================================== */
// Clear all the auth state
/* ============================================================== */
export interface ClearAuthStateAction {
  type: typeof actionTypes.CLEAR_AUTH_STATE;
}

/* ============================================================== */
// Assign access
/* ============================================================== */

export type TUserAccess = {
  showAdminDashboard: false;
  allowEditSalesDashboard: false;
  showFullSalesPage: false;
  showPriceSalesPage: false;
  showSalesmenDashboard: false;
  showSalesDashboard: false;
};

export interface AssignAccessAction {
  type: typeof actionTypes.ASSIGN_ACCESS;
  accessObj: TUserAccess;
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
  auth_token: string;
}

export interface SignInFailedAction {
  type: typeof actionTypes.SIGN_IN_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Sign out
/* ============================================================== */
export interface SignOutAction {
  type: typeof actionTypes.SIGN_OUT;
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
  auth_token: string | null;
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
  // Clear state
  /* -------------------- */
  | ClearAuthStateAction
  /* -------------------- */
  // Assign Access
  /* -------------------- */
  | AssignAccessAction
  /* -------------------- */
  // Sign in
  /* -------------------- */
  | SignInAction
  | SignInStartAction
  | SignInSucceedAction
  | SignInFailedAction
  /* -------------------- */
  // Sign in
  /* -------------------- */
  | SignOutAction
  /* -------------------- */
  // User Info
  /* -------------------- */
  | GetUserInfoAction
  | GetUserInfoStartAction
  | GetUserInfoSucceedAction
  | GetUserInfoFailedAction;

import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface SalesInitialState {
  readonly loading: boolean;
  readonly errorMessage: string | null;
  readonly successMessage: string | null;
  readonly brandObject: TBrandObject | null;
}

// to further breakdown the state, use in mapStateToProps
export interface ISalesMapStateToProps {
  readonly sales: SalesInitialState;
}

/* ============================================================== */
// Clear all the sales state
/* ============================================================== */
export interface ClearSalesStateAction {
  type: typeof actionTypes.CLEAR_SALES_STATE;
}

// All the actiontypes with their payload
/* ============================================================== */
// Get All Brands (Head)
/* ============================================================== */
export interface GetBrandsHeadAction {
  type: typeof actionTypes.GET_BRANDS_HEAD;
}
export interface GetBrandsHeadStartAction {
  type: typeof actionTypes.GET_BRANDS_HEAD_START;
}
export interface GetBrandsHeadSucceedAction {
  type: typeof actionTypes.GET_BRANDS_HEAD_SUCCEED;
}
export interface GetBrandsHeadFailedAction {
  type: typeof actionTypes.GET_BRANDS_HEAD_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Create Brand (Head)
/* ============================================================== */
export interface CreateBrandHeadAction {
  type: typeof actionTypes.CREATE_BRAND_HEAD;
  title: string;
  description: string;
}
export interface CreateBrandHeadStartAction {
  type: typeof actionTypes.CREATE_BRAND_HEAD_START;
}

export type TBrandObject = { id: string; title: string; description: string; available: boolean };

export interface CreateBrandHeadSucceedAction {
  type: typeof actionTypes.CREATE_BRAND_HEAD_SUCCEED;
  brandObject: TBrandObject;
  successMessage: string;
}
export interface CreateBrandHeadFailedAction {
  type: typeof actionTypes.CREATE_BRAND_HEAD_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type SalesActionTypes =
  | GetBrandsHeadAction
  | GetBrandsHeadStartAction
  | GetBrandsHeadSucceedAction
  | GetBrandsHeadFailedAction
  /* ------------------------ */
  | CreateBrandHeadAction
  | CreateBrandHeadStartAction
  | CreateBrandHeadSucceedAction
  | CreateBrandHeadFailedAction
  /* ------------------------ */
  | ClearSalesStateAction;

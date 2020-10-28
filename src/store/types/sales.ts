import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface SalesInitialState {
  readonly error: string | null;
  readonly loading: boolean;
}

// to further breakdown the state, use in mapStateToProps
export interface ISalesMapStateToProps {
  readonly sales: SalesInitialState;
}

/* ============================================================== */
// Clear all the sales state
export interface ClearSalesStateAction {
  type: typeof actionTypes.CLEAR_SALES_STATE;
}

/* ============================================================== */
// All the actiontypes with their payload
export interface GetHeadBrandsAction {
  type: typeof actionTypes.GET_BRANDS_HEAD;
}
export interface GetHeadBrandsStartAction {
  type: typeof actionTypes.GET_BRANDS_HEAD_START;
}
export interface GetHeadBrandsSucceedAction {
  type: typeof actionTypes.GET_BRANDS_HEAD_SUCCEED;
}
export interface GetHeadBrandsFailedAction {
  type: typeof actionTypes.GET_BRANDS_HEAD_FAILED;
  error: string;
}

/* ============================================================== */
// combine and export all action types
export type SalesActionTypes =
  | GetHeadBrandsAction
  | GetHeadBrandsStartAction
  | GetHeadBrandsSucceedAction
  | GetHeadBrandsFailedAction
  | ClearSalesStateAction;

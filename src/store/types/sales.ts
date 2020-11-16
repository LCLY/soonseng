import * as actionTypes from '../actions/actionTypes';
import { TReceivedBodyLengthObj, TReceivedLengthObj } from './dashboard';

// initialState for reducers
export interface SalesInitialState {
  readonly loading: boolean;
  readonly errorMessage: string | null;
  readonly successMessage: string | null;
  // length
  readonly lengthObj: TReceivedLengthObj | null;
  readonly lengthsArray: TReceivedLengthObj[] | null;
  // body
  readonly bodyLengthObj: TReceivedBodyLengthObj | null;
  readonly bodyLengthsArray: TReceivedBodyLengthObj[] | null;
}

// to further breakdown the state, use in mapStateToProps
export interface ISalesMapStateToProps {
  readonly sales: SalesInitialState;
}

/* ============================================================== */
// Sales
/* ============================================================== */

/* ------------------ */
// Get Lengths
/* ------------------ */
export interface GetSalesLengthsAction {
  type: typeof actionTypes.GET_SALES_LENGTHS;
}
export interface GetSalesLengthsStartAction {
  type: typeof actionTypes.GET_SALES_LENGTHS_START;
}
export interface GetSalesLengthsSucceedAction {
  type: typeof actionTypes.GET_SALES_LENGTHS_SUCCEED;
  lengthsArray: TReceivedLengthObj[];
}
export interface GetSalesLengthsFailedAction {
  type: typeof actionTypes.GET_SALES_LENGTHS_FAILED;
  errorMessage: string;
}

/* ------------------ */
// Get Bodies
/* ------------------ */
export interface GetSalesBodiesAction {
  type: typeof actionTypes.GET_SALES_BODIES;
  length_id: number;
}
export interface GetSalesBodiesStartAction {
  type: typeof actionTypes.GET_SALES_BODIES_START;
}
export interface GetSalesBodiesSucceedAction {
  type: typeof actionTypes.GET_SALES_BODIES_SUCCEED;
  bodyLengthsArray: TReceivedBodyLengthObj[];
}
export interface GetSalesBodiesFailedAction {
  type: typeof actionTypes.GET_SALES_BODIES_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type SalesActionTypes =
  /* ------------------------ */
  // Lengths
  /* ------------------------ */
  | GetSalesLengthsAction
  | GetSalesLengthsStartAction
  | GetSalesLengthsSucceedAction
  | GetSalesLengthsFailedAction
  /* ------------------------- */
  // Bodies
  /* ------------------------- */
  | GetSalesBodiesAction
  | GetSalesBodiesStartAction
  | GetSalesBodiesSucceedAction
  | GetSalesBodiesFailedAction;

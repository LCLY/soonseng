import * as actionTypes from '../actions/actionTypes';
import {
  TReceivedAccessoryObj,
  TReceivedBodyLengthObj,
  TReceivedBrandObj,
  TReceivedImageObj,
  TReceivedWheelbaseObj,
} from './dashboard';

// initialState for reducers
export interface SalesInitialState {
  readonly loading: boolean;
  readonly errorMessage: string | null;
  readonly successMessage: string | null;
  // length
  readonly lengthsCategoriesArray: TReceivedSalesLengthCategoryObj[] | null;
  // body
  readonly bodyLengthObj: TReceivedBodyLengthObj | null;
  readonly bodyLengthsArray: TReceivedBodyLengthObj[] | null;
  // accessory
  readonly generalAccessoriesArray: TReceivedAccessoryObj[] | null;
  readonly dimensionRelatedAccessoriesArray: TReceivedAccessoryObj[] | null;
  readonly bodyRelatedAccessoriesArray: TReceivedAccessoryObj[] | null;
  // brands
  readonly salesBrandObj: TReceivedSalesMakesObj | null;
  readonly salesBrandsArray: TReceivedSalesMakesObj[] | null;

  // boolean to know whether fetch successful
  readonly getSalesLengthsSucceed: boolean | null;
  readonly getSalesBodyLengthsSucceed: boolean | null;
  readonly getSalesBodyAccessoriesSucceed: boolean | null;
  readonly getSalesMakesSucceed: boolean | null;
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

/* ============================================================== */
// Sales
/* ============================================================== */

/* ------------------ */
// Get Lengths
/* ------------------ */
// Types
// array of length objs
export type TReceivedSalesLengthObj = {
  id: number;
  title: string;
  description: string;
};

export type TReceivedSalesLengthCategoryObj = {
  title: string;
  lengths: TReceivedSalesLengthObj[];
};

export interface GetSalesLengthsAction {
  type: typeof actionTypes.GET_SALES_LENGTHS;
  tire: number;
}
export interface GetSalesLengthsStartAction {
  type: typeof actionTypes.GET_SALES_LENGTHS_START;
}
export interface GetSalesLengthsSucceedAction {
  type: typeof actionTypes.GET_SALES_LENGTHS_SUCCEED;
  lengthsCategoriesArray: TReceivedSalesLengthCategoryObj[];
}
export interface GetSalesLengthsFailedAction {
  type: typeof actionTypes.GET_SALES_LENGTHS_FAILED;
  errorMessage: string;
}

/* ------------------ */
// Get Bodies
/* ------------------ */
export interface GetSalesBodyLengthsAction {
  type: typeof actionTypes.GET_SALES_BODYLENGTHS;
  length_id: number;
}
export interface GetSalesBodyLengthsStartAction {
  type: typeof actionTypes.GET_SALES_BODYLENGTHS_START;
}
export interface GetSalesBodyLengthsSucceedAction {
  type: typeof actionTypes.GET_SALES_BODYLENGTHS_SUCCEED;
  bodyLengthsArray: TReceivedBodyLengthObj[];
}
export interface GetSalesBodyLengthsFailedAction {
  type: typeof actionTypes.GET_SALES_BODYLENGTHS_FAILED;
  errorMessage: string;
}

/* ------------------ */
// Get Body length Accessories
/* ------------------ */
export interface GetSalesBodyAccessoriesAction {
  type: typeof actionTypes.GET_SALES_BODYACCESSORIES;
  body_length_id: number;
}
export interface GetSalesBodyAccessoriesStartAction {
  type: typeof actionTypes.GET_SALES_BODYACCESSORIES_START;
}
export interface GetSalesBodyAccessoriesSucceedAction {
  type: typeof actionTypes.GET_SALES_BODYACCESSORIES_SUCCEED;
  generalAccessoriesArray: TReceivedAccessoryObj[];
  dimensionRelatedAccessoriesArray: TReceivedAccessoryObj[];
  bodyRelatedAccessoriesArray: TReceivedAccessoryObj[];
}
export interface GetSalesBodyAccessoriesFailedAction {
  type: typeof actionTypes.GET_SALES_BODYACCESSORIES_FAILED;
  errorMessage: string;
}

/* ------------------ */
// Get Makes
/* ------------------ */

// Types
export type TReceivedSalesMakeSeriesObj = {
  brandObj: TReceivedBrandObj;
  wheelbaseOBj: TReceivedWheelbaseObj;
  id: number;
  gvw: string;
  year: string;
  tire: string;
  abs: boolean;
  title: string;
  series: string;
  length: number;
  torque: string;
  config: string;
  price: number;
  available: true;
  emission: string;
  horsepower: string;
  engine_cap: string;
  transmission: string;
  images: TReceivedImageObj[];
};

export type TReceivedSalesMakeBrandsObj = {
  // [key:string] here is for example, "300 SERIES", the name of the series
  [key: string]: TReceivedSalesMakeSeriesObj[];
};

export type TReceivedSalesMakesObj = {
  // [key:string] here is foe example, "HINO", the name of the brands
  [key: string]: TReceivedSalesMakeBrandsObj[];
};

export interface GetSalesMakesAction {
  type: typeof actionTypes.GET_SALES_MAKES;
  length_id: number;
  tire: number;
}
export interface GetSalesMakesStartAction {
  type: typeof actionTypes.GET_SALES_MAKES_START;
}
export interface GetSalesMakesSucceedAction {
  type: typeof actionTypes.GET_SALES_MAKES_SUCCEED;
  salesBrandsArray: TReceivedSalesMakesObj[];
}
export interface GetSalesMakesFailedAction {
  type: typeof actionTypes.GET_SALES_MAKES_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type SalesActionTypes =
  /* -------------------------- */
  // Clear sales state
  /* -------------------------- */
  | ClearSalesStateAction
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
  | GetSalesBodyLengthsAction
  | GetSalesBodyLengthsStartAction
  | GetSalesBodyLengthsSucceedAction
  | GetSalesBodyLengthsFailedAction
  /* ------------------------- */
  // Body Accessories
  /* ------------------------- */
  | GetSalesBodyAccessoriesAction
  | GetSalesBodyAccessoriesStartAction
  | GetSalesBodyAccessoriesSucceedAction
  | GetSalesBodyAccessoriesFailedAction
  /* ------------------------- */
  // Makes
  /* ------------------------- */
  | GetSalesMakesAction
  | GetSalesMakesStartAction
  | GetSalesMakesSucceedAction
  | GetSalesMakesFailedAction;

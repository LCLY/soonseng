import * as actionTypes from '../actions/actionTypes';
import {
  TReceivedAccessoryObj,
  TReceivedBodyAccessoryObj,
  TReceivedBodyMakeObj,
  TReceivedBodyObj,
  TReceivedBrandObj,
  TReceivedChargesFeesObj,
  TReceivedMakeObj,
} from './dashboard';

// initialState for reducers
export interface SalesInitialState {
  readonly loading?: boolean;
  readonly errorMessage?: string | null;
  readonly successMessage?: string | null;
  // length
  readonly lengthsCategoriesArray?: TReceivedSalesLengthCategoryObj[] | null;
  // body
  readonly bodyObj?: TReceivedBodyObj | null;
  readonly bodiesArray?: TReceivedBodyObj[] | null;
  // body makes
  readonly bodyMakeObj?: TReceivedSalesBodyMakeObj | null;
  readonly bodyMakesArray?: TReceivedSalesBodyMakeObj[] | null;
  // accessory
  readonly generalAccessoriesArray?: TReceivedAccessoryObj[] | null;
  readonly dimensionRelatedAccessoriesArray?: TReceivedDimensionAccessoryObj[] | null;
  readonly bodyRelatedAccessoriesArray?: TReceivedAccessoryObj[] | null;
  // brands
  readonly salesBrandObj?: TReceivedSalesMakesObj | null;
  readonly salesBrandsArray?: TReceivedSalesMakesObj[] | null;
  // local orders array / quotation objects array
  readonly localOrdersDict?: { [key: string]: TLocalOrderObj };
  // boolean to know whether fetch successful
  readonly getSalesLengthsSucceed?: boolean | null;
  readonly getSalesBodiesSucceed?: boolean | null;
  readonly getSalesBodyMakesSucceed?: boolean | null;
  readonly getSalesAccessoriesSucceed?: boolean | null;
  readonly getSalesMakesSucceed?: boolean | null;
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
/* ---------------------------- */
// Create Local Quotation
/* ---------------------------- */
// Quotation object should contain as much info as possible about a product
export type TLocalOrderObj = {
  id: string;
  currentDate: string;
  tireCount: number;
  hpNumber: string;
  discount: number | null;
  standardAccessories: string[];
  afterSalesStrings: IAfterSales;
  bodyObj: TReceivedBodyObj | null;
  insuranceDict: TInsuranceDict | null;
  bodyMakeObj: TReceivedBodyMakeObj | null;
  lengthObj: TReceivedSalesLengthObj | null;
  chargesFeesDict: { [id: string]: TReceivedChargesFeesObj };
  generalAccessoriesArray: { [id: string]: TReceivedAccessoryObj };
  bodyRelatedAccessoriesArray: { [id: string]: TReceivedAccessoryObj };
  dimensionRelatedAccessoriesArray: { [id: string]: TReceivedDimensionAccessoryObj };
};

export interface IAfterSales {
  line_1: string;
  line_2: string;
  line_3: string;
}

export interface IInsurance {
  id: string;
  title: string;
  price: number;
}
export type TInsuranceDict = {
  insurance_roadtax: IInsurance;
  insurance_jpj: IInsurance;
  insurance_premium: IInsurance;
};

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
export interface GetSalesBodiesAction {
  type: typeof actionTypes.GET_SALES_BODIES;
  length_id: number;
  tire: number;
}
export interface GetSalesBodiesStartAction {
  type: typeof actionTypes.GET_SALES_BODIES_START;
}
export interface GetSalesBodiesSucceedAction {
  type: typeof actionTypes.GET_SALES_BODIES_SUCCEED;
  bodiesArray: TReceivedBodyObj[];
}
export interface GetSalesBodiesFailedAction {
  type: typeof actionTypes.GET_SALES_BODIES_FAILED;
  errorMessage: string;
}

/* ------------------ */
// Get Sales Body Makes
/* ------------------ */

export type TReceivedSeriesObj = {
  title: string;
  body_makes: TReceivedBodyMakeObj[];
};

export type TReceivedSalesBodyMakeObj = {
  brand: TReceivedBrandObj;
  series: TReceivedSeriesObj[];
};

export interface GetSalesBodyMakesAction {
  type: typeof actionTypes.GET_SALES_BODYMAKES;
  length_id: number;
  tire: number;
  body_id: number;
}
export interface GetSalesBodyMakesStartAction {
  type: typeof actionTypes.GET_SALES_BODYMAKES_START;
}
export interface GetSalesBodyMakesSucceedAction {
  type: typeof actionTypes.GET_SALES_BODYMAKES_SUCCEED;
  bodyMakesArray: TReceivedSalesBodyMakeObj[];
}
export interface GetSalesBodyMakesFailedAction {
  type: typeof actionTypes.GET_SALES_BODYMAKES_FAILED;
  errorMessage: string;
}

/* ------------------ */
// Get Accessories
/* ------------------ */
// Types
export type TReceivedDimensionAccessoryObj = {
  id: number;
  price: number;
  available: boolean;
  accessory: TReceivedAccessoryObj;
  body_make: TReceivedBodyMakeObj;
};

export interface GetSalesAccessoriesAction {
  type: typeof actionTypes.GET_SALES_ACCESSORIES;
  body_make_id: number;
}
export interface GetSalesAccessoriesStartAction {
  type: typeof actionTypes.GET_SALES_ACCESSORIES_START;
}
export interface GetSalesAccessoriesSucceedAction {
  type: typeof actionTypes.GET_SALES_ACCESSORIES_SUCCEED;
  generalAccessoriesArray: TReceivedAccessoryObj[];
  bodyRelatedAccessoriesArray: TReceivedBodyAccessoryObj[];
  dimensionRelatedAccessoriesArray: TReceivedDimensionAccessoryObj[];
}
export interface GetSalesAccessoriesFailedAction {
  type: typeof actionTypes.GET_SALES_ACCESSORIES_FAILED;
  errorMessage: string;
}

/* ------------------ */
// Get Makes
/* ------------------ */

// Types
export type TReceivedSalesMakeBrandsObj = {
  // [key:string] here is for example, "300 SERIES", the name of the series
  [key: string]: TReceivedMakeObj[];
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

/* ============================================ */
// Set Local Orders Dictionary
/* ============================================ */
export interface SetLocalOrdersDictAction {
  type: typeof actionTypes.SET_LOCAL_ORDERS_DICT;
  localOrdersDict: { [key: string]: TLocalOrderObj };
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type SalesActionTypes =
  /* -------------------------- */
  // Clear sales state
  /* -------------------------- */
  | ClearSalesStateAction
  /* -------------------------- */
  // Local quotation/ orders
  /* -------------------------- */
  // Store Local Orders
  | SetLocalOrdersDictAction
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
  | GetSalesBodiesFailedAction
  /* ------------------------- */
  // Body Makes
  /* ------------------------- */
  | GetSalesBodyMakesAction
  | GetSalesBodyMakesStartAction
  | GetSalesBodyMakesSucceedAction
  | GetSalesBodyMakesFailedAction
  /* ------------------------- */
  // Accessories
  /* ------------------------- */
  | GetSalesAccessoriesAction
  | GetSalesAccessoriesStartAction
  | GetSalesAccessoriesSucceedAction
  | GetSalesAccessoriesFailedAction
  /* ------------------------- */
  // Makes
  /* ------------------------- */
  | GetSalesMakesAction
  | GetSalesMakesStartAction
  | GetSalesMakesSucceedAction
  | GetSalesMakesFailedAction;

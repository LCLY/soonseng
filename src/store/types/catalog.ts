import * as actionTypes from '../actions/actionTypes';
import { TReceivedBodyMakeObj, TReceivedBrandObj, TReceivedMakeObj, TReceivedWheelbaseObj } from './dashboard';

// initialState for reducers
export interface CatalogInitialState {
  readonly loading?: boolean;
  readonly errorMessage?: string | null;
  readonly successMessage?: string | null;
  // catalogMake
  readonly catalogMakeObj?: TReceivedCatalogMakeObj | null;
  readonly catalogMakesArray?: TReceivedCatalogMakeObj[] | null;
  // catalogBodyMakeArray
  readonly catalogBodyMake?: TReceivedCatalogBodyMake | null;
  readonly catalogBodyMakesArray?: TReceivedCatalogBodyMake[] | null;
  readonly makeFromCatalogBodyMake?: TReceivedMakeObj | null;
}

export interface ClearCatalogStateAction {
  type: typeof actionTypes.CLEAR_CATALOG_STATE;
}

/* ------------------ */
// Get Catalog Make
/* ------------------ */

type TCatalogSeries = {
  title: string;
  makes: TReceivedMakeObj[];
};
export type TReceivedCatalogMakeObj = {
  brand: TReceivedBrandObj;
  series: TCatalogSeries[];
};

export interface GetCatalogMakesAction {
  type: typeof actionTypes.GET_CATALOG_MAKES;
  auth_token: string | null;
}
export interface GetCatalogMakesStartAction {
  type: typeof actionTypes.GET_CATALOG_MAKES_START;
}
export interface GetCatalogMakesSucceedAction {
  type: typeof actionTypes.GET_CATALOG_MAKES_SUCCEED;
  catalogMakesArray: TReceivedCatalogMakeObj[];
}
export interface GetCatalogMakesFailedAction {
  type: typeof actionTypes.GET_CATALOG_MAKES_FAILED;
  errorMessage: string;
}

/* ------------------ */
// Get Catalog Body Make
/* ------------------ */

// catalog body make array contains a main wheelbase object and a body make array
export type TReceivedCatalogBodyMake = {
  wheelbase: TReceivedWheelbaseObj;
  body_makes: TReceivedBodyMakeObj[];
};

export interface GetCatalogBodyMakesAction {
  type: typeof actionTypes.GET_CATALOG_BODYMAKES;
  make_id: number;
}
export interface GetCatalogBodyMakesStartAction {
  type: typeof actionTypes.GET_CATALOG_BODYMAKES_START;
}
export interface GetCatalogBodyMakesSucceedAction {
  type: typeof actionTypes.GET_CATALOG_BODYMAKES_SUCCEED;
  makeFromCatalogBodyMake: TReceivedMakeObj;
  catalogBodyMakesArray: TReceivedCatalogBodyMake[];
}
export interface GetCatalogBodyMakesFailedAction {
  type: typeof actionTypes.GET_CATALOG_BODYMAKES_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type CatalogActionTypes =
  /* -------------------------- */
  // Clear Catalog State
  /* -------------------------- */
  | ClearCatalogStateAction
  /* -------------------------- */
  // Catalog Make
  /* -------------------------- */
  | GetCatalogMakesAction
  | GetCatalogMakesStartAction
  | GetCatalogMakesSucceedAction
  | GetCatalogMakesFailedAction
  /* -------------------------- */
  // Catalog Body Make
  /* -------------------------- */
  | GetCatalogBodyMakesAction
  | GetCatalogBodyMakesStartAction
  | GetCatalogBodyMakesSucceedAction
  | GetCatalogBodyMakesFailedAction;

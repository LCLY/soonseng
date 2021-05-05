import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import { TReceivedMakeObj } from '../types/dashboard';
import { TReceivedCatalogBodyMake, TReceivedCatalogMakeObj } from '../types/catalog';

/* ============================================================================================ */
//  Catalog
/* ============================================================================================ */

/* ------------------------------------------- */
// Clear state
/* ------------------------------------------- */
export const clearCatalogState = (): AppActions => {
  return {
    type: actionTypes.CLEAR_CATALOG_STATE,
  };
};
/* ------------------------------------------- */
// Make
/* ------------------------------------------- */
export const getCatalogMakes = (auth_token: string | null): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_MAKES,
    auth_token: auth_token,
  };
};

export const getCatalogMakesStart = (): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_MAKES_START,
  };
};

export const getCatalogMakesSucceed = (catalogMakesArray: TReceivedCatalogMakeObj[]): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_MAKES_SUCCEED,
    catalogMakesArray: catalogMakesArray,
  };
};
export const getCatalogMakesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_MAKES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------------------- */
// Body Make
/* ------------------------------------------- */
export const getCatalogBodyMakes = (make_id: number): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_BODYMAKES,
    make_id: make_id,
  };
};

export const getCatalogBodyMakesStart = (): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_BODYMAKES_START,
  };
};

export const getCatalogBodyMakesSucceed = (
  makeFromCatalogBodyMake: TReceivedMakeObj,
  catalogBodyMakesArray: TReceivedCatalogBodyMake[],
): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_BODYMAKES_SUCCEED,
    makeFromCatalogBodyMake: makeFromCatalogBodyMake,
    catalogBodyMakesArray: catalogBodyMakesArray,
  };
};
export const getCatalogBodyMakesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_BODYMAKES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------------------- */
// Set Accessory Type
/* ------------------------------------------- */
export const setAccessoryType = (accessoryType: string): AppActions => {
  return {
    type: actionTypes.SET_ACCESSORY_TYPE,
    accessoryType: accessoryType,
  };
};

import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import { TReceivedBodyMakeObj } from '../types/dashboard';
import { TReceivedCatalogMakeObj } from '../types/catalog';

/* ============================================================================================ */
//  Catalog
/* ============================================================================================ */

/* ------------------------------------------- */
// Make
/* ------------------------------------------- */
export const getCatalogMakes = (): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_MAKES,
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

export const getCatalogBodyMakesSucceed = (catalogBodyMakesArray: TReceivedBodyMakeObj[]): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_BODYMAKES_SUCCEED,
    catalogBodyMakesArray: catalogBodyMakesArray,
  };
};
export const getCatalogBodyMakesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_CATALOG_BODYMAKES_FAILED,
    errorMessage: errorMessage,
  };
};

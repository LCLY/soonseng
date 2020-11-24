import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import { TReceivedAccessoryObj, TReceivedBodyAccessoryObj, TReceivedBodyLengthObj } from '../types/dashboard';
import {
  TReceivedSalesMakesObj,
  TReceivedSalesLengthCategoryObj,
  TReceivedDimensionAccessoryObj,
  TLocalOrderObj,
} from '../types/sales';

/* ============================================================================================ */
//  Sales
/* ============================================================================================ */

/* ------------------------------- */
// Clear Sales States
/* ------------------------------- */
export const clearSalesState = (): AppActions => {
  return {
    type: actionTypes.CLEAR_SALES_STATE,
  };
};

/* ------------------------------- */
// Store local orders
/* ------------------------------- */
export const storeLocalorders = (localOrdersArray: TLocalOrderObj[]): AppActions => {
  return {
    type: actionTypes.STORE_LOCAL_ORDERS,
    localOrdersArray: localOrdersArray,
  };
};

/* ----------------------------- */
// Get Lengths
/* ---------------------------- */
export const getSalesLengths = (tire: number): AppActions => {
  return {
    type: actionTypes.GET_SALES_LENGTHS,
    tire: tire,
  };
};

export const getSalesLengthsStart = (): AppActions => {
  return {
    type: actionTypes.GET_SALES_LENGTHS_START,
  };
};

export const getSalesLengthsSucceed = (lengthsCategoriesArray: TReceivedSalesLengthCategoryObj[]): AppActions => {
  return {
    type: actionTypes.GET_SALES_LENGTHS_SUCCEED,
    lengthsCategoriesArray: lengthsCategoriesArray,
  };
};
export const getSalesLengthsFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SALES_LENGTHS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ----------------------------- */
// Get Body Lengths
/* ---------------------------- */
export const getSalesBodyLengths = (length_id: number, tire: number): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYLENGTHS,
    length_id: length_id,
    tire: tire,
  };
};

export const getSalesBodyLengthsStart = (): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYLENGTHS_START,
  };
};

export const getSalesBodyLengthsSucceed = (bodyLengthsArray: TReceivedBodyLengthObj[]): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYLENGTHS_SUCCEED,
    bodyLengthsArray: bodyLengthsArray,
  };
};
export const getSalesBodyLengthsFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYLENGTHS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ----------------------------- */
// Get Body Accessories
/* ---------------------------- */
export const getSalesBodyAccessories = (body_length_id: number): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYACCESSORIES,
    body_length_id: body_length_id,
  };
};

export const getSalesBodyAccessoriesStart = (): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYACCESSORIES_START,
  };
};

export const getSalesBodyAccessoriesSucceed = (
  generalAccessoriesArray: TReceivedAccessoryObj[],
  dimensionRelatedAccessoriesArray: TReceivedDimensionAccessoryObj[],
  bodyRelatedAccessoriesArray: TReceivedBodyAccessoryObj[],
): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYACCESSORIES_SUCCEED,
    generalAccessoriesArray: generalAccessoriesArray,
    dimensionRelatedAccessoriesArray: dimensionRelatedAccessoriesArray,
    bodyRelatedAccessoriesArray: bodyRelatedAccessoriesArray,
  };
};
export const getSalesBodyAccessoriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYACCESSORIES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ----------------------------- */
// Get Makes
/* ---------------------------- */
export const getSalesMakes = (length_id: number, tire: number): AppActions => {
  return {
    type: actionTypes.GET_SALES_MAKES,
    length_id: length_id,
    tire: tire,
  };
};

export const getSalesMakesStart = (): AppActions => {
  return {
    type: actionTypes.GET_SALES_MAKES_START,
  };
};

export const getSalesMakesSucceed = (salesBrandsArray: TReceivedSalesMakesObj[]): AppActions => {
  return {
    type: actionTypes.GET_SALES_MAKES_SUCCEED,
    salesBrandsArray: salesBrandsArray,
  };
};
export const getSalesMakesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SALES_MAKES_FAILED,
    errorMessage: errorMessage,
  };
};

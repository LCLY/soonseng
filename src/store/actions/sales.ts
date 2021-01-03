import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import { TReceivedAccessoryObj, TReceivedBodyAccessoryObj, TReceivedBodyObj } from '../types/dashboard';
import {
  TLocalOrderObj,
  TReceivedSalesMakesObj,
  TReceivedSalesLengthCategoryObj,
  TReceivedDimensionAccessoryObj,
  TReceivedSalesBodyMakeObj,
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
export const storeLocalOrders = (localOrdersArray: TLocalOrderObj[]): AppActions => {
  return {
    type: actionTypes.STORE_LOCAL_ORDERS,
    localOrdersArray: localOrdersArray,
  };
};
/* ------------------------------- */
// Remove a local order
/* ------------------------------- */
export const removeAnOrder = (orderId: string, localOrdersArray: TLocalOrderObj[]): AppActions => {
  return {
    type: actionTypes.REMOVE_AN_ORDER,
    orderId: orderId,
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
// Get Body Types
/* ---------------------------- */
export const getSalesBodies = (length_id: number, tire: number): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODIES,
    length_id: length_id,
    tire: tire,
  };
};

export const getSalesBodiesStart = (): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODIES_START,
  };
};

export const getSalesBodiesSucceed = (bodiesArray: TReceivedBodyObj[]): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODIES_SUCCEED,
    bodiesArray: bodiesArray,
  };
};
export const getSalesBodiesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODIES_FAILED,
    errorMessage: errorMessage,
  };
};
/* ----------------------------- */
// Get Body Makes
/* ---------------------------- */
export const getSalesBodyMakes = (
  length_id: number,
  tire: number,
  body_id: number,
  auth_token: string | null,
): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYMAKES,
    length_id: length_id,
    tire: tire,
    body_id: body_id,
    auth_token: auth_token,
  };
};

export const getSalesBodyMakesStart = (): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYMAKES_START,
  };
};

export const getSalesBodyMakesSucceed = (bodyMakesArray: TReceivedSalesBodyMakeObj[]): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYMAKES_SUCCEED,
    bodyMakesArray: bodyMakesArray,
  };
};
export const getSalesBodyMakesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYMAKES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ----------------------------- */
// Get Body Accessories
/* ---------------------------- */
export const getSalesAccessories = (body_make_id: number): AppActions => {
  return {
    type: actionTypes.GET_SALES_ACCESSORIES,
    body_make_id: body_make_id,
  };
};

export const getSalesAccessoriesStart = (): AppActions => {
  return {
    type: actionTypes.GET_SALES_ACCESSORIES_START,
  };
};

export const getSalesAccessoriesSucceed = (
  generalAccessoriesArray: TReceivedAccessoryObj[],
  dimensionRelatedAccessoriesArray: TReceivedDimensionAccessoryObj[],
  bodyRelatedAccessoriesArray: TReceivedBodyAccessoryObj[],
): AppActions => {
  return {
    type: actionTypes.GET_SALES_ACCESSORIES_SUCCEED,
    generalAccessoriesArray: generalAccessoriesArray,
    dimensionRelatedAccessoriesArray: dimensionRelatedAccessoriesArray,
    bodyRelatedAccessoriesArray: bodyRelatedAccessoriesArray,
  };
};
export const getSalesAccessoriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SALES_ACCESSORIES_FAILED,
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

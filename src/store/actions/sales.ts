import { TReceivedBodyAccessoryObj, TReceivedBodyLengthObj, TReceivedLengthObj } from '../types/dashboard';
import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';

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

/* ----------------------------- */
// Get Lengths
/* ---------------------------- */
export const getSalesLengths = (): AppActions => {
  return {
    type: actionTypes.GET_SALES_LENGTHS,
  };
};

export const getSalesLengthsStart = (): AppActions => {
  return {
    type: actionTypes.GET_SALES_LENGTHS_START,
  };
};

export const getSalesLengthsSucceed = (lengthsArray: TReceivedLengthObj[]): AppActions => {
  return {
    type: actionTypes.GET_SALES_LENGTHS_SUCCEED,
    lengthsArray: lengthsArray,
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
export const getSalesBodyLengths = (length_id: number): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYLENGTHS,
    length_id: length_id,
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

export const getSalesBodyAccessoriesSucceed = (bodyAccessoriesArray: TReceivedBodyAccessoryObj[]): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYACCESSORIES_SUCCEED,
    bodyAccessoriesArray: bodyAccessoriesArray,
  };
};
export const getSalesBodyAccessoriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODYACCESSORIES_FAILED,
    errorMessage: errorMessage,
  };
};

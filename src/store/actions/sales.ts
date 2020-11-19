import { TReceivedBodyLengthObj, TReceivedLengthObj } from '../types/dashboard';
import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';

/* ============================================================================================ */
//  Sales
/* ============================================================================================ */

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

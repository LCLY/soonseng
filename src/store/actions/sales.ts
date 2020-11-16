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
// Get Bodies
/* ---------------------------- */
export const getSalesBodies = (length_id: number): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODIES,
    length_id: length_id,
  };
};

export const getSalesBodiesStart = (): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODIES_START,
  };
};

export const getSalesBodiesSucceed = (bodyLengthsArray: TReceivedBodyLengthObj[]): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODIES_SUCCEED,
    bodyLengthsArray: bodyLengthsArray,
  };
};
export const getSalesBodiesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SALES_BODIES_FAILED,
    errorMessage: errorMessage,
  };
};

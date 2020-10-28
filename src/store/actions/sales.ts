import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';

/* ============================================================================================ */
/* ============================================================================================ */
// Clear Sales state
export const clearSalesState = () => {
  return {
    type: actionTypes.CLEAR_SALES_STATE,
  };
};

/* ============================================================================================ */
/* ============================================================================================ */
// Get Brands (head)
export const getBrandsHead = (): AppActions => {
  return {
    type: actionTypes.GET_BRANDS_HEAD,
  };
};

export const getBrandsHeadStart = (): AppActions => {
  return {
    type: actionTypes.GET_BRANDS_HEAD_START,
  };
};

export const getBrandsHeadSucceed = (): AppActions => {
  return {
    type: actionTypes.GET_BRANDS_HEAD_SUCCEED,
  };
};
export const getBrandsHeadFailed = (error: string): AppActions => {
  return {
    type: actionTypes.GET_BRANDS_HEAD_FAILED,
    error: error,
  };
};
/* ============================================================================================ */
/* ============================================================================================ */

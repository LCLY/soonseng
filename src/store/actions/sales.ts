import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import { TBrandObject } from 'src/store/types/sales';

/* ============================================================================================ */
// Clear Sales state
/* ============================================================================================ */
export /**
 *
 * To clear or reset all states in reducer
 * @return {*}
 */
const clearSalesState = () => {
  return {
    type: actionTypes.CLEAR_SALES_STATE,
  };
};

/* ============================================================================================ */
// Get Brands (head)
/* ============================================================================================ */
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
export const getBrandsHeadFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_BRANDS_HEAD_FAILED,
    errorMessage: errorMessage,
  };
};
/* ============================================================================================ */
// Create Brand (head)
/* ============================================================================================ */
export const createBrandHead = (title: string, description: string): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND_HEAD,
    title: title,
    description: description,
  };
};

export const createBrandHeadStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND_HEAD_START,
  };
};

export const createBrandHeadSucceed = (brandObject: TBrandObject, successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND_HEAD_SUCCEED,
    brandObject: brandObject,
    successMessage: successMessage,
  };
};
export const createBrandHeadFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND_HEAD_FAILED,
    errorMessage: errorMessage,
  };
};

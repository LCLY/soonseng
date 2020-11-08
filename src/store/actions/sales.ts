import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import { TBrandReceivedObj, TMakeSubmitData, TMakeReceivedObj, TWheelbaseReceivedObj } from 'src/store/types/sales';

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
// Brand (head)
/* ============================================================================================ */

/* ----------------------------- */
// Get Brands (head)
/* ---------------------------- */
export const getBrands = (): AppActions => {
  return {
    type: actionTypes.GET_BRANDS,
  };
};

export const getBrandsStart = (): AppActions => {
  return {
    type: actionTypes.GET_BRANDS_START,
  };
};

export const getBrandsSucceed = (brandsArray: TBrandReceivedObj[]): AppActions => {
  return {
    type: actionTypes.GET_BRANDS_SUCCEED,
    brandsArray: brandsArray,
  };
};
export const getBrandsFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_BRANDS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------ */
// Create Brand (head)
/* ------------------------------ */
export const createBrand = (title: string, description: string): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND,
    title: title,
    description: description,
  };
};

export const createBrandStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND_START,
  };
};

export const createBrandSucceed = (brandsArray: TBrandReceivedObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND_SUCCEED,
    brandsArray: brandsArray,
    successMessage: successMessage,
  };
};
export const createBrandFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------ */
// Update Brand (head)
/* ------------------------------ */
export const updateBrand = (id: number, title: string, description: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BRAND,
    id: id,
    title: title,
    description: description,
  };
};

export const updateBrandStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_BRAND_START,
  };
};

export const updateBrandSucceed = (brandsArray: TBrandReceivedObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BRAND_SUCCEED,
    brandsArray: brandsArray,
    successMessage: successMessage,
  };
};
export const updateBrandFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BRAND_FAILED,
    errorMessage: errorMessage,
  };
};
/* ============================================================================================ */
/* Wheelbase (head) */
/* ============================================================================================ */

/* ------------------------ */
// Create Wheelbase (head)
/* ------------------------ */
export const createWheelbase = (title: string, description: string): AppActions => {
  return {
    type: actionTypes.CREATE_WHEELBASE,
    title: title,
    description: description,
  };
};

export const createWheelbaseStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_WHEELBASE_START,
  };
};

export const createWheelbaseSucceed = (wheelbaseObj: TWheelbaseReceivedObj, successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_WHEELBASE_SUCCEED,
    wheelbaseObj: wheelbaseObj,
    successMessage: successMessage,
  };
};
export const createWheelbaseFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_WHEELBASE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------ */
// Get Wheelbases (head)
/* ------------------------ */
export const getWheelbases = (): AppActions => {
  return {
    type: actionTypes.GET_WHEELBASES,
  };
};

export const getWheelbasesStart = (): AppActions => {
  return {
    type: actionTypes.GET_WHEELBASES_START,
  };
};

export const getWheelbasesSucceed = (wheelbasesArray: TWheelbaseReceivedObj[]): AppActions => {
  return {
    type: actionTypes.GET_WHEELBASES_SUCCEED,
    wheelbasesArray: wheelbasesArray,
  };
};
export const getWheelbasesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_WHEELBASES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Make (head)
/* ============================================================================================ */

/* ------------------ */
// Create Make (head)
/* ------------------ */
export const createMake = (createMakeSubmitData: TMakeSubmitData): AppActions => {
  return {
    type: actionTypes.CREATE_MAKE,
    createMakeSubmitData: createMakeSubmitData,
  };
};

export const createMakeStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_MAKE_START,
  };
};

export const createMakeSucceed = (makeObj: TMakeReceivedObj, successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_MAKE_SUCCEED,
    makeObj: makeObj,
    successMessage: successMessage,
  };
};
export const createMakeFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_MAKE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Get Makes (head)
/* ------------------ */
export const getMakes = (): AppActions => {
  return {
    type: actionTypes.GET_MAKES,
  };
};

export const getMakesStart = (): AppActions => {
  return {
    type: actionTypes.GET_MAKES_START,
  };
};

export const getMakesSucceed = (makesArray: TMakeReceivedObj[]): AppActions => {
  return {
    type: actionTypes.GET_MAKES_SUCCEED,
    makesArray: makesArray,
  };
};
export const getMakesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_MAKES_FAILED,
    errorMessage: errorMessage,
  };
};

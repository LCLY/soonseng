import { AppActions } from '../../types/index';
import * as actionTypes from '../actionTypes';
import {
  TReceivedBrandObj,
  TCreateMakeData,
  TReceivedMakeObj,
  TReceivedWheelbaseObj,
  TUpdateMakeData,
  TReceivedSeriesObj,
  TReceivedMakeWheelbaseObj,
} from 'src/store/types/dashboard';

/* ============================================================================================ */
// Brand
/* ============================================================================================ */

/* ----------------------------- */
// Get Brands
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

export const getBrandsSucceed = (brandsArray: TReceivedBrandObj[]): AppActions => {
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
// Create Brand
/* ------------------------------ */
export const createBrand = (
  title: string,
  description: string,
  imageTag: string | null,
  imageFiles: FileList | null,
): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND,
    title: title,
    description: description,
    imageTag: imageTag,
    imageFiles: imageFiles,
  };
};

export const createBrandStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND_START,
  };
};

export const createBrandSucceed = (brandsArray: TReceivedBrandObj[], successMessage: string): AppActions => {
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
// Update Brand
/* ------------------------------ */
export const updateBrand = (
  brand_id: number,
  title: string,
  description: string,
  imageTag: string | null,
  imageFiles: FileList | null,
): AppActions => {
  return {
    type: actionTypes.UPDATE_BRAND,
    brand_id: brand_id,
    title: title,
    description: description,
    imageTag: imageTag, //for upload images
    imageFiles: imageFiles, //for upload images
  };
};

export const updateBrandStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_BRAND_START,
  };
};

export const updateBrandSucceed = (brandsArray: TReceivedBrandObj[], successMessage: string): AppActions => {
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
/* ------------------------------ */
// Delete Brand
/* ------------------------------ */
export const deleteBrand = (brand_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_BRAND,
    brand_id: brand_id,
  };
};

export const deleteBrandStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_BRAND_START,
  };
};

export const deleteBrandSucceed = (brandsArray: TReceivedBrandObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_BRAND_SUCCEED,
    brandsArray: brandsArray,
    successMessage: successMessage,
  };
};
export const deleteBrandFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_BRAND_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
/* Wheelbase  */
/* ============================================================================================ */

/* ------------------------ */
// Create Wheelbase
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

export const createWheelbaseSucceed = (
  wheelbasesArray: TReceivedWheelbaseObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_WHEELBASE_SUCCEED,
    wheelbasesArray: wheelbasesArray,
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
// Get Wheelbases
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

export const getWheelbasesSucceed = (wheelbasesArray: TReceivedWheelbaseObj[]): AppActions => {
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

/* ------------------------ */
// Update Wheelbase
/* ------------------------ */
export const updateWheelbase = (wheelbase_id: number, title: string, description: string): AppActions => {
  return {
    type: actionTypes.UPDATE_WHEELBASE,
    wheelbase_id: wheelbase_id,
    title: title,
    description: description,
  };
};

export const updateWheelbaseStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_WHEELBASE_START,
  };
};

export const updateWheelbaseSucceed = (
  wheelbasesArray: TReceivedWheelbaseObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_WHEELBASE_SUCCEED,
    wheelbasesArray: wheelbasesArray,
    successMessage: successMessage,
  };
};
export const updateWheelbaseFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_WHEELBASE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Make / Model
/* ============================================================================================ */

/* ------------------ */
// Create Make
/* ------------------ */
export const createMake = (
  createMakeData: TCreateMakeData,
  imageTag: string | null,
  imageFiles: FileList | null,
): AppActions => {
  return {
    type: actionTypes.CREATE_MAKE,
    createMakeData: createMakeData,
    imageTag: imageTag,
    imageFiles: imageFiles,
  };
};

export const createMakeStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_MAKE_START,
  };
};

export const createMakeSucceed = (makesArray: TReceivedMakeObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_MAKE_SUCCEED,
    makesArray: makesArray,
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
// Get Makes
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

export const getMakesSucceed = (makesArray: TReceivedMakeObj[]): AppActions => {
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

/* ------------------ */
// Update Make
/* ------------------ */
export const updateMake = (
  updateMakeData: TUpdateMakeData,
  imageTag: string | null,
  imageFiles: FileList | null,
): AppActions => {
  return {
    type: actionTypes.UPDATE_MAKE,
    updateMakeData: updateMakeData,
    imageTag: imageTag,
    imageFiles: imageFiles,
  };
};

export const updateMakeStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_MAKE_START,
  };
};

export const updateMakeSucceed = (makesArray: TReceivedMakeObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_MAKE_SUCCEED,
    makesArray: makesArray,
    successMessage: successMessage,
  };
};
export const updateMakeFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_MAKE_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Delete Make
/* ------------------ */
export const deleteMake = (make_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_MAKE,
    make_id: make_id,
  };
};

export const deleteMakeStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_MAKE_START,
  };
};

export const deleteMakeSucceed = (makesArray: TReceivedMakeObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_MAKE_SUCCEED,
    makesArray: makesArray,
    successMessage: successMessage,
  };
};
export const deleteMakeFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_MAKE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Series
/* ============================================================================================ */
/* ------------------ */
// Get Series (for make)
/* ------------------ */
export const getSeries = (brand_id: number): AppActions => {
  return {
    type: actionTypes.GET_SERIES,
    brand_id: brand_id,
  };
};

export const getSeriesStart = (): AppActions => {
  return {
    type: actionTypes.GET_SERIES_START,
  };
};

export const getSeriesSucceed = (seriesArray: TReceivedSeriesObj[]): AppActions => {
  return {
    type: actionTypes.GET_SERIES_SUCCEED,
    seriesArray: seriesArray,
  };
};
export const getSeriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SERIES_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Create Series (for make)
/* ------------------ */
export const createSeries = (brand_id: number, title: string): AppActions => {
  return {
    type: actionTypes.CREATE_SERIES,
    brand_id: brand_id,
    title: title,
  };
};

export const createSeriesStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_SERIES_START,
  };
};

export const createSeriesSucceed = (seriesArray: TReceivedSeriesObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_SERIES_SUCCEED,
    seriesArray: seriesArray,
    successMessage: successMessage,
  };
};
export const createSeriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_SERIES_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Update Series (for make)
/* ------------------ */
export const updateSeries = (brand_id: number, series_id: number, title: string): AppActions => {
  return {
    type: actionTypes.UPDATE_SERIES,
    brand_id: brand_id,
    series_id: series_id,
    title: title,
  };
};

export const updateSeriesStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_SERIES_START,
  };
};

export const updateSeriesSucceed = (seriesArray: TReceivedSeriesObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_SERIES_SUCCEED,
    seriesArray: seriesArray,
    successMessage: successMessage,
  };
};
export const updateSeriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_SERIES_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Delete Series (for make)
/* ------------------ */
export const deleteSeries = (brand_id: number, series_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_SERIES,
    brand_id: brand_id,
    series_id: series_id,
  };
};

export const deleteSeriesStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_SERIES_START,
  };
};

export const deleteSeriesSucceed = (seriesArray: TReceivedSeriesObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_SERIES_SUCCEED,
    seriesArray: seriesArray,
    successMessage: successMessage,
  };
};
export const deleteSeriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_SERIES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Make Wheelbase
/* ============================================================================================ */
export const clearMakeWheelbase = (): AppActions => {
  return {
    type: actionTypes.CLEAR_MAKEWHEELBASE,
  };
};

/* ----------------------------- */
// Create Make Wheelbase(head)
/* ----------------------------- */
export const createMakeWheelbase = (make_id: number, wheelbase_id: number): AppActions => {
  return {
    type: actionTypes.CREATE_MAKEWHEELBASE,
    make_id: make_id,
    wheelbase_id: wheelbase_id,
  };
};

export const createMakeWheelbaseStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_MAKEWHEELBASE_START,
  };
};

export const createMakeWheelbaseSucceed = (
  makeWheelbasesArray: TReceivedMakeWheelbaseObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_MAKEWHEELBASE_SUCCEED,
    makeWheelbasesArray: makeWheelbasesArray,
    successMessage: successMessage,
  };
};
export const createMakeWheelbaseFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_MAKEWHEELBASE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------- */
// Get Make Wheelbases
/* ------------------------- */
export const getMakeWheelbases = (make_id: number): AppActions => {
  return {
    type: actionTypes.GET_MAKEWHEELBASES,
    make_id: make_id,
  };
};

export const getMakeWheelbasesStart = (): AppActions => {
  return {
    type: actionTypes.GET_MAKEWHEELBASES_START,
  };
};

export const getMakeWheelbasesSucceed = (makeWheelbasesArray: TReceivedMakeWheelbaseObj[]): AppActions => {
  return {
    type: actionTypes.GET_MAKEWHEELBASES_SUCCEED,
    makeWheelbasesArray: makeWheelbasesArray,
  };
};
export const getMakeWheelbasesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_MAKEWHEELBASES_FAILED,
    errorMessage: errorMessage,
  };
};

/* -------------------------- */
// Update Make Wheelbase
/* -------------------------- */
export const updateMakeWheelbase = (make_wheelbase_id: number, make_id: number, wheelbase_id: number): AppActions => {
  return {
    type: actionTypes.UPDATE_MAKEWHEELBASE,
    make_wheelbase_id: make_wheelbase_id,
    make_id: make_id,
    wheelbase_id: wheelbase_id,
  };
};

export const updateMakeWheelbaseStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_MAKEWHEELBASE_START,
  };
};

export const updateMakeWheelbaseSucceed = (
  makeWheelbasesArray: TReceivedMakeWheelbaseObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_MAKEWHEELBASE_SUCCEED,
    makeWheelbasesArray: makeWheelbasesArray,
    successMessage: successMessage,
  };
};
export const updateMakeWheelbaseFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_MAKEWHEELBASE_FAILED,
    errorMessage: errorMessage,
  };
};

/* -------------------------- */
// Delete Make Wheelbase
/* -------------------------- */
export const deleteMakeWheelbase = (make_id: number, make_wheelbase_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_MAKEWHEELBASE,
    make_id: make_id,
    make_wheelbase_id: make_wheelbase_id,
  };
};

export const deleteMakeWheelbaseStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_MAKEWHEELBASE_START,
  };
};

export const deleteMakeWheelbaseSucceed = (
  makeWheelbasesArray: TReceivedMakeWheelbaseObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.DELETE_MAKEWHEELBASE_SUCCEED,
    makeWheelbasesArray: makeWheelbasesArray,
    successMessage: successMessage,
  };
};
export const deleteMakeWheelbaseFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_MAKEWHEELBASE_FAILED,
    errorMessage: errorMessage,
  };
};

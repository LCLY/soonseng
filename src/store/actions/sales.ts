import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import {
  TReceivedBrandObj,
  TCreateMakeData,
  TReceivedMakeObj,
  TReceivedWheelbaseObj,
  TUpdateMakeData,
  TReceivedBodyObj,
  TReceivedBodyLengthObj,
  TCreateBodyLengthData,
  TUpdateBodyLengthData,
  TReceivedLengthObj,
} from 'src/store/types/sales';

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
// Upload Image(s)
/* ============================================================================================ */
export const uploadImage = (brandId: number, model: string, tag: string, imageFile: FileList): AppActions => {
  return {
    type: actionTypes.UPLOAD_IMAGE,
    brandId: brandId,
    model: model,
    tag: tag,
    imageFile: imageFile,
  };
};

export const uploadImageStart = (): AppActions => {
  return {
    type: actionTypes.UPLOAD_IMAGE_START,
  };
};

export const uploadImageSucceed = (successMessage: string): AppActions => {
  return {
    type: actionTypes.UPLOAD_IMAGE_SUCCEED,
    successMessage: successMessage,
  };
};
export const uploadImageFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPLOAD_IMAGE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ******************************************************************************************** */
/* ******************************************************************************************** */
/* ******************************************************************************************** */

/* ============================================================================================ */
// Make Page - Brand (head)
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
// Create Brand (head)
/* ------------------------------ */
export const createBrand = (title: string, description: string, tag?: string, imageFiles?: FileList): AppActions => {
  return {
    type: actionTypes.CREATE_BRAND,
    title: title,
    description: description,
    tag: tag,
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
// Update Brand (head)
/* ------------------------------ */
export const updateBrand = (brand_id: number, title: string, description: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BRAND,
    brand_id: brand_id,
    title: title,
    description: description,
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
/* ============================================================================================ */
/* Make Page - Wheelbase (head) */
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
// Update Wheelbase (head)
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
// Make Page - Make (head)
/* ============================================================================================ */

/* ------------------ */
// Create Make (head)
/* ------------------ */
export const createMake = (createMakeData: TCreateMakeData): AppActions => {
  return {
    type: actionTypes.CREATE_MAKE,
    createMakeData: createMakeData,
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
// Update Make (head)
/* ------------------ */
export const updateMake = (updateMakeData: TUpdateMakeData): AppActions => {
  return {
    type: actionTypes.UPDATE_MAKE,
    updateMakeData: updateMakeData,
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

/* ******************************************************************************************** */
/* ******************************************************************************************** */
/* ******************************************************************************************** */

/* ============================================================================================ */
// Body Page - Body (tail)
/* ============================================================================================ */

/* ------------------ */
// Create Body (tail)
/* ------------------ */
export const createBody = (title: string, description: string): AppActions => {
  return {
    type: actionTypes.CREATE_BODY,
    title: title,
    description: description,
  };
};

export const createBodyStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_BODY_START,
  };
};

export const createBodySucceed = (bodiesArray: TReceivedBodyObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BODY_SUCCEED,
    bodiesArray: bodiesArray,
    successMessage: successMessage,
  };
};
export const createBodyFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BODY_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Get Bodies (tail)
/* ------------------ */
export const getBodies = (): AppActions => {
  return {
    type: actionTypes.GET_BODIES,
  };
};

export const getBodiesStart = (): AppActions => {
  return {
    type: actionTypes.GET_BODIES_START,
  };
};

export const getBodiesSucceed = (bodiesArray: TReceivedBodyObj[]): AppActions => {
  return {
    type: actionTypes.GET_BODIES_SUCCEED,
    bodiesArray: bodiesArray,
  };
};
export const getBodiesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_BODIES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Update Body (tail)
/* ------------------ */
export const updateBody = (body_id: number, title: string, description: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BODY,
    body_id: body_id,
    title: title,
    description: description,
  };
};

export const updateBodyStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_BODY_START,
  };
};

export const updateBodySucceed = (bodiesArray: TReceivedBodyObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BODY_SUCCEED,
    bodiesArray: bodiesArray,
    successMessage: successMessage,
  };
};
export const updateBodyFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BODY_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Body Page - Length (tail)
/* ============================================================================================ */

/* ------------------ */
// Create Length (tail)
/* ------------------ */
export const createLength = (title: string, description: string): AppActions => {
  return {
    type: actionTypes.CREATE_LENGTH,
    title: title,
    description: description,
  };
};

export const createLengthStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_LENGTH_START,
  };
};

export const createLengthSucceed = (lengthsArray: TReceivedLengthObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_LENGTH_SUCCEED,
    lengthsArray: lengthsArray,
    successMessage: successMessage,
  };
};
export const createLengthFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_LENGTH_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Get Lengths (tail)
/* ------------------ */
export const getLengths = (): AppActions => {
  return {
    type: actionTypes.GET_LENGTHS,
  };
};

export const getLengthsStart = (): AppActions => {
  return {
    type: actionTypes.GET_LENGTHS_START,
  };
};

export const getLengthsSucceed = (lengthsArray: TReceivedLengthObj[]): AppActions => {
  return {
    type: actionTypes.GET_LENGTHS_SUCCEED,
    lengthsArray: lengthsArray,
  };
};
export const getLengthsFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_LENGTHS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Update Length (tail)
/* ------------------ */
export const updateLength = (length_id: number, title: string, description: string): AppActions => {
  return {
    type: actionTypes.UPDATE_LENGTH,
    length_id: length_id,
    title: title,
    description: description,
  };
};

export const updateLengthStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_LENGTH_START,
  };
};

export const updateLengthSucceed = (lengthsArray: TReceivedLengthObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_LENGTH_SUCCEED,
    lengthsArray: lengthsArray,
    successMessage: successMessage,
  };
};
export const updateLengthFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_LENGTH_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Body Page - Body Length (tail)
/* ============================================================================================ */

/* ------------------ */
// Create Body Length (tail)
/* ------------------ */
export const createBodyLength = (createBodyLengthData: TCreateBodyLengthData): AppActions => {
  return {
    type: actionTypes.CREATE_BODYLENGTH,
    createBodyLengthData: createBodyLengthData,
  };
};

export const createBodyLengthStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_BODYLENGTH_START,
  };
};

export const createBodyLengthSucceed = (
  bodyLengthsArray: TReceivedBodyLengthObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_BODYLENGTH_SUCCEED,
    bodyLengthsArray: bodyLengthsArray,
    successMessage: successMessage,
  };
};
export const createBodyLengthFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BODYLENGTH_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Get Body Lengths (tail)
/* ------------------ */
export const getBodyLengths = (): AppActions => {
  return {
    type: actionTypes.GET_BODYLENGTHS,
  };
};

export const getBodyLengthsStart = (): AppActions => {
  return {
    type: actionTypes.GET_BODYLENGTHS_START,
  };
};

export const getBodyLengthsSucceed = (bodyLengthsArray: TReceivedBodyLengthObj[]): AppActions => {
  return {
    type: actionTypes.GET_BODYLENGTHS_SUCCEED,
    bodyLengthsArray: bodyLengthsArray,
  };
};
export const getBodyLengthsFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_BODYLENGTHS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Update Body Length (tail)
/* ------------------ */
export const updateBodyLength = (updateBodyLengthData: TUpdateBodyLengthData): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYLENGTH,
    updateBodyLengthData: updateBodyLengthData,
  };
};

export const updateBodyLengthStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYLENGTH_START,
  };
};

export const updateBodyLengthSucceed = (
  bodyLengthsArray: TReceivedBodyLengthObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYLENGTH_SUCCEED,
    bodyLengthsArray: bodyLengthsArray,
    successMessage: successMessage,
  };
};
export const updateBodyLengthFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYLENGTH_FAILED,
    errorMessage: errorMessage,
  };
};

import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import {
  TReceivedBrandObj,
  TCreateMakeData,
  TReceivedImageObj,
  TReceivedMakeObj,
  TReceivedWheelbaseObj,
  TUpdateMakeData,
  TReceivedBodyObj,
  TReceivedBodyMakeObj,
  TCreateBodyMakeData,
  TUpdateBodyMakeData,
  TReceivedLengthObj,
  TReceivedAccessoryObj,
  TCreateAccessoryData,
  TUpdateAccessoryData,
  TReceivedBodyAccessoryObj,
  TReceivedSeriesObj,
} from 'src/store/types/dashboard';

/* ============================================================================================ */
// Clear Dashboard state
/* ============================================================================================ */
/**
 * To clear or reset all states in reducer
 * @return {*}
 */
export const clearDashboardState = () => {
  return {
    type: actionTypes.CLEAR_DASHBOARD_STATE,
  };
};

/* ============================================================================================ */
// Upload Image(s)
/* ============================================================================================ */
export const uploadImage = (model: string, model_id: number, imageTag: string, imageFiles: FileList): AppActions => {
  return {
    type: actionTypes.UPLOAD_IMAGE,
    model: model,
    model_id: model_id,
    imageTag: imageTag,
    imageFiles: imageFiles,
  };
};

export const uploadImageStart = (): AppActions => {
  return {
    type: actionTypes.UPLOAD_IMAGE_START,
  };
};

export const uploadImageSucceed = (imagesArray: TReceivedImageObj[]): AppActions => {
  return {
    type: actionTypes.UPLOAD_IMAGE_SUCCEED,
    imagesArray: imagesArray,
  };
};
export const uploadImageFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPLOAD_IMAGE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Delete Image(s)
/* ============================================================================================ */
export const deleteUploadImage = (ids: number[]): AppActions => {
  return {
    type: actionTypes.DELETE_UPLOAD_IMAGE,
    ids: ids,
  };
};

export const deleteUploadImageStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_UPLOAD_IMAGE_START,
  };
};

export const deleteUploadImageSucceed = (successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_UPLOAD_IMAGE_SUCCEED,
    successMessage: successMessage,
  };
};
export const deleteUploadImageFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_UPLOAD_IMAGE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Dashboard
/* ============================================================================================ */

/* ============================================================================================ */
// Brand (Make Page) (head)
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
// Update Brand (head)
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
/* ============================================================================================ */
/* Wheelbase (Make Page) (head) */
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
// Make (Make Page) (head)
/* ============================================================================================ */

/* ------------------ */
// Create Make (head)
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
// Update Make (head)
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

/* ******************************************************************************************** */
/* ******************************************************************************************** */
/* ******************************************************************************************** */

/* ============================================================================================ */
// Body (Body Page)(tail)
/* ============================================================================================ */

/* ------------------ */
// Create Body (tail)
/* ------------------ */
export const createBody = (
  title: string,
  description: string,
  imageTag: string | null,
  imageFiles: FileList | null,
): AppActions => {
  return {
    type: actionTypes.CREATE_BODY,
    title: title,
    description: description,
    imageTag: imageTag, //for upload images
    imageFiles: imageFiles, //for upload images
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
export const updateBody = (
  body_id: number,
  title: string,
  description: string,
  imageTag: string | null,
  imageFiles: FileList | null,
): AppActions => {
  return {
    type: actionTypes.UPDATE_BODY,
    body_id: body_id,
    title: title,
    description: description,
    imageTag: imageTag,
    imageFiles: imageFiles,
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

/* ------------------ */
// Delete Body (tail)
/* ------------------ */
export const deleteBody = (body_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_BODY,
    body_id: body_id,
  };
};

export const deleteBodyStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_BODY_START,
  };
};

export const deleteBodySucceed = (bodiesArray: TReceivedBodyObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_BODY_SUCCEED,
    bodiesArray: bodiesArray,
    successMessage: successMessage,
  };
};
export const deleteBodyFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_BODY_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Length (Body Page) (tail)
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

/* ------------------ */
// Delete Length (tail)
/* ------------------ */
export const deleteLength = (length_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_LENGTH,
    length_id: length_id,
  };
};

export const deleteLengthStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_LENGTH_START,
  };
};

export const deleteLengthSucceed = (lengthsArray: TReceivedLengthObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_LENGTH_SUCCEED,
    lengthsArray: lengthsArray,
    successMessage: successMessage,
  };
};
export const deleteLengthFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_LENGTH_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Body Make (Body Page) (tail)
/* ============================================================================================ */

/* ------------------ */
// Create Body Make (tail)
/* ------------------ */
export const createBodyMake = (
  createBodyMakeData: TCreateBodyMakeData,
  imageTag: string | null,
  imageFiles: FileList | null,
): AppActions => {
  return {
    type: actionTypes.CREATE_BODYMAKE,
    createBodyMakeData: createBodyMakeData,
    imageTag: imageTag,
    imageFiles: imageFiles,
  };
};

export const createBodyMakeStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_BODYMAKE_START,
  };
};

export const createBodyMakeSucceed = (bodyMakesArray: TReceivedBodyMakeObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BODYMAKE_SUCCEED,
    bodyMakesArray: bodyMakesArray,
    successMessage: successMessage,
  };
};
export const createBodyMakeFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BODYMAKE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Get Body makes (tail)
/* ------------------ */
export const getBodyMakes = (): AppActions => {
  return {
    type: actionTypes.GET_BODYMAKES,
  };
};

export const getBodyMakesStart = (): AppActions => {
  return {
    type: actionTypes.GET_BODYMAKES_START,
  };
};

export const getBodyMakesSucceed = (bodyMakesArray: TReceivedBodyMakeObj[]): AppActions => {
  return {
    type: actionTypes.GET_BODYMAKES_SUCCEED,
    bodyMakesArray: bodyMakesArray,
  };
};
export const getBodyMakesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_BODYMAKES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Update Body Make (tail)
/* ------------------ */
export const updateBodyMake = (
  updateBodyMakeData: TUpdateBodyMakeData,
  imageTag: string | null,
  imageFiles: FileList | null,
): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYMAKE,
    updateBodyMakeData: updateBodyMakeData,
    imageTag: imageTag,
    imageFiles: imageFiles,
  };
};

export const updateBodyMakeStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYMAKE_START,
  };
};

export const updateBodyMakeSucceed = (bodyMakesArray: TReceivedBodyMakeObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYMAKE_SUCCEED,
    bodyMakesArray: bodyMakesArray,
    successMessage: successMessage,
  };
};
export const updateBodyMakeFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYMAKE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Delete Body Make (tail)
/* ------------------ */
export const deleteBodyMake = (body_make_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_BODYMAKE,
    body_make_id: body_make_id,
  };
};

export const deleteBodyMakeStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_BODYMAKE_START,
  };
};

export const deleteBodyMakeSucceed = (bodyMakesArray: TReceivedBodyMakeObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_BODYMAKE_SUCCEED,
    bodyMakesArray: bodyMakesArray,
    successMessage: successMessage,
  };
};
export const deleteBodyMakeFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_BODYMAKE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Body Accessory (Body Page) (tail)
/* ============================================================================================ */

/* ------------------ */
// Create Body Accessory (tail)
/* ------------------ */
export const createBodyAccessory = (
  body_id: number,
  accessory_id: number,
  imageTag: string | null,
  imageFiles: FileList | null,
): AppActions => {
  return {
    type: actionTypes.CREATE_BODYACCESSORY,
    body_id: body_id,
    accessory_id: accessory_id,
    imageTag: imageTag,
    imageFiles: imageFiles,
  };
};

export const createBodyAccessoryStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_BODYACCESSORY_START,
  };
};

export const createBodyAccessorySucceed = (
  bodyAccessoriesArray: TReceivedBodyAccessoryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_BODYACCESSORY_SUCCEED,
    bodyAccessoriesArray: bodyAccessoriesArray,
    successMessage: successMessage,
  };
};
export const createBodyAccessoryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BODYACCESSORY_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Get Body Accessories (tail)
/* ------------------ */
export const getBodyAccessories = (body_id: number): AppActions => {
  return {
    type: actionTypes.GET_BODYACCESSORIES,
    body_id: body_id,
  };
};

export const getBodyAccessoriesStart = (): AppActions => {
  return {
    type: actionTypes.GET_BODYACCESSORIES_START,
  };
};

export const getBodyAccessoriesSucceed = (bodyAccessoriesArray: TReceivedBodyAccessoryObj[]): AppActions => {
  return {
    type: actionTypes.GET_BODYACCESSORIES_SUCCEED,
    bodyAccessoriesArray: bodyAccessoriesArray,
  };
};
export const getBodyAccessoriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_BODYACCESSORIES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Update Body Accessories (tail)
/* ------------------ */
export const updateBodyAccessory = (
  body_id: number,
  accessory_id: number,
  imageTag: string | null,
  imageFiles: FileList | null,
): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYACCESSORY,
    body_id: body_id,
    accessory_id: accessory_id,
    imageTag: imageTag,
    imageFiles: imageFiles,
  };
};

export const updateBodyAccessoryStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYACCESSORY_START,
  };
};

export const updateBodyAccessorySucceed = (
  bodyAccessoriesArray: TReceivedBodyAccessoryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYACCESSORY_SUCCEED,
    bodyAccessoriesArray: bodyAccessoriesArray,
    successMessage: successMessage,
  };
};
export const updateBodyAccessoryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYACCESSORY_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Delete  Body Accessories (tail)
/* ------------------ */
export const deleteBodyAccessory = (body_id: number, body_accessory_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_BODYACCESSORY,
    body_id: body_id,
    body_accessory_id: body_accessory_id,
  };
};

export const deleteBodyAccessoryStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_BODYACCESSORY_START,
  };
};

export const deleteBodyAccessorySucceed = (
  bodyAccessoriesArray: TReceivedBodyAccessoryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.DELETE_BODYACCESSORY_SUCCEED,
    bodyAccessoriesArray: bodyAccessoriesArray,
    successMessage: successMessage,
  };
};
export const deleteBodyAccessoryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_BODYACCESSORY_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------------------------------------------------------------------- */
// Clear body accessory
/* ------------------------------------------------------------------------------------------- */

export const clearBodyAccessoryArray = (): AppActions => {
  return {
    type: actionTypes.CLEAR_BODYACCESSORY_ARRAY,
  };
};

/* ------------------------------------------------------------------------------------------- */
// Get body associated accessories
/* ------------------------------------------------------------------------------------------- */

export const getBodyAssociatedAccessories = (): AppActions => {
  return {
    type: actionTypes.GET_BODYASSOCIATED_ACCESSORIES,
  };
};

export const getBodyAssociatedAccessoriesStart = (): AppActions => {
  return {
    type: actionTypes.GET_BODYASSOCIATED_ACCESSORIES_START,
  };
};

export const getBodyAssociatedAccessoriesSucceed = (
  bodyAssociatedAccessoriesArray: TReceivedAccessoryObj[],
): AppActions => {
  return {
    type: actionTypes.GET_BODYASSOCIATED_ACCESSORIES_SUCCEED,
    bodyAssociatedAccessoriesArray: bodyAssociatedAccessoriesArray,
  };
};
export const getBodyAssociatedAccessoriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_BODYASSOCIATED_ACCESSORIES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------------------------------------------------------------------- */
// Clear body associated accessories
/* ------------------------------------------------------------------------------------------- */

export const clearBodyAssociatedAccessoriesArray = (): AppActions => {
  return {
    type: actionTypes.CLEAR_BODYASSOCIATED_ACCESSORIES_ARRAY,
  };
};

/* ============================================================================================ */
// Accessory (Accessory Page) (tail)
/* ============================================================================================ */

/* ------------------ */
// Create Accessory (tail)
/* ------------------ */
export const createAccessory = (createAccessoryData: TCreateAccessoryData): AppActions => {
  return {
    type: actionTypes.CREATE_ACCESSORY,
    createAccessoryData: createAccessoryData,
  };
};

export const createAccessoryStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_ACCESSORY_START,
  };
};

export const createAccessorySucceed = (
  accessoriesArray: TReceivedAccessoryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_ACCESSORY_SUCCEED,
    accessoriesArray: accessoriesArray,
    successMessage: successMessage,
  };
};
export const createAccessoryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_ACCESSORY_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Get Accessories (tail)
/* ------------------ */
export const getAccessories = (): AppActions => {
  return {
    type: actionTypes.GET_ACCESSORIES,
  };
};

export const getAccessoriesStart = (): AppActions => {
  return {
    type: actionTypes.GET_ACCESSORIES_START,
  };
};

export const getAccessoriesSucceed = (accessoriesArray: TReceivedAccessoryObj[]): AppActions => {
  return {
    type: actionTypes.GET_ACCESSORIES_SUCCEED,
    accessoriesArray: accessoriesArray,
  };
};
export const getAccessoriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_ACCESSORIES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Update Accessory (tail)
/* ------------------ */
export const updateAccessory = (updateAccessoryData: TUpdateAccessoryData): AppActions => {
  return {
    type: actionTypes.UPDATE_ACCESSORY,
    updateAccessoryData: updateAccessoryData,
  };
};

export const updateAccessoryStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_ACCESSORY_START,
  };
};

export const updateAccessorySucceed = (
  accessoriesArray: TReceivedAccessoryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_ACCESSORY_SUCCEED,
    accessoriesArray: accessoriesArray,
    successMessage: successMessage,
  };
};
export const updateAccessoryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_ACCESSORY_FAILED,
    errorMessage: errorMessage,
  };
};

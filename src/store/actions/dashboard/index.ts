import { AppActions } from '../../types/index';
import * as actionTypes from '../actionTypes';
import { TReceivedImageObj } from 'src/store/types/dashboard';

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

export {
  /* ---------------- */
  // Brands
  /* ---------------- */
  getBrands,
  getBrandsFailed,
  getBrandsStart,
  getBrandsSucceed,
  createBrand,
  createBrandStart,
  createBrandFailed,
  createBrandSucceed,
  updateBrand,
  updateBrandStart,
  updateBrandSucceed,
  updateBrandFailed,
  deleteBrand,
  deleteBrandStart,
  deleteBrandSucceed,
  deleteBrandFailed,
  /* ---------------- */
  // Wheelbase
  /* ---------------- */
  getWheelbases,
  getWheelbasesFailed,
  getWheelbasesStart,
  getWheelbasesSucceed,
  createWheelbase,
  createWheelbaseStart,
  createWheelbaseFailed,
  createWheelbaseSucceed,
  updateWheelbase,
  updateWheelbaseStart,
  updateWheelbaseFailed,
  updateWheelbaseSucceed,
  /* ---------------- */
  // Model/Make
  /* ---------------- */
  createMake,
  createMakeStart,
  createMakeFailed,
  createMakeSucceed,
  getMakes,
  getMakesFailed,
  getMakesStart,
  getMakesSucceed,
  updateMake,
  updateMakeStart,
  updateMakeFailed,
  updateMakeSucceed,
  /* ---------------- */
  // Series
  /* ---------------- */
  getSeries,
  getSeriesStart,
  getSeriesFailed,
  getSeriesSucceed,
  /* ---------------- */
  // Make Wheelbase
  /* ---------------- */
  createMakeWheelbase,
  createMakeWheelbaseStart,
  createMakeWheelbaseFailed,
  createMakeWheelbaseSucceed,
  getMakeWheelbases,
  getMakeWheelbasesStart,
  getMakeWheelbasesFailed,
  getMakeWheelbasesSucceed,
  updateMakeWheelbase,
  updateMakeWheelbaseStart,
  updateMakeWheelbaseFailed,
  updateMakeWheelbaseSucceed,
  deleteMakeWheelbase,
  deleteMakeWheelbaseStart,
  deleteMakeWheelbaseFailed,
  deleteMakeWheelbaseSucceed,
} from './make';

export {
  // Length
  createLength,
  createLengthStart,
  createLengthFailed,
  createLengthSucceed,
  getLengths,
  getLengthsStart,
  getLengthsFailed,
  getLengthsSucceed,
  updateLength,
  updateLengthStart,
  updateLengthFailed,
  updateLengthSucceed,
  deleteLength,
  deleteLengthStart,
  deleteLengthFailed,
  deleteLengthSucceed,
  // Body
  createBody,
  createBodyStart,
  createBodyFailed,
  createBodySucceed,
  getBodies,
  getBodiesStart,
  getBodiesFailed,
  getBodiesSucceed,
  updateBody,
  updateBodyStart,
  updateBodyFailed,
  updateBodySucceed,
  deleteBody,
  deleteBodyStart,
  deleteBodyFailed,
  deleteBodySucceed,
} from './body';

export {
  // Body Make
  createBodyMake,
  createBodyMakeStart,
  createBodyMakeFailed,
  createBodyMakeSucceed,
  getBodyMakes,
  getBodyMakesStart,
  getBodyMakesFailed,
  getBodyMakesSucceed,
  updateBodyMake,
  updateBodyMakeStart,
  updateBodyMakeFailed,
  updateBodyMakeSucceed,
  deleteBodyMake,
  deleteBodyMakeStart,
  deleteBodyMakeFailed,
  deleteBodyMakeSucceed,
} from './bodymake';
export {
  // Accessory
  createAccessory,
  createAccessoryStart,
  createAccessoryFailed,
  createAccessorySucceed,
  getAccessories,
  getAccessoriesStart,
  getAccessoriesFailed,
  getAccessoriesSucceed,
  updateAccessory,
  updateAccessoryStart,
  updateAccessoryFailed,
  updateAccessorySucceed,
  // Body Accessory
  createBodyAccessory,
  createBodyAccessoryStart,
  createBodyAccessoryFailed,
  createBodyAccessorySucceed,
  getBodyAccessories,
  getBodyAccessoriesStart,
  getBodyAccessoriesFailed,
  getBodyAccessoriesSucceed,
  updateBodyAccessory,
  updateBodyAccessoryStart,
  updateBodyAccessoryFailed,
  updateBodyAccessorySucceed,
  deleteBodyAccessory,
  deleteBodyAccessoryStart,
  deleteBodyAccessoryFailed,
  deleteBodyAccessorySucceed,
  clearBodyAccessoryArray,
  // Body Associated Accessories
  getBodyAssociatedAccessories,
  getBodyAssociatedAccessoriesStart,
  getBodyAssociatedAccessoriesSucceed,
  getBodyAssociatedAccessoriesFailed,
  // Body Make Accessory
  createBodyMakeAccessory,
  createBodyMakeAccessoryFailed,
  createBodyMakeAccessoryStart,
  createBodyMakeAccessorySucceed,
  getBodyMakeAccessories,
  getBodyMakeAccessoriesFailed,
  getBodyMakeAccessoriesStart,
  getBodyMakeAccessoriesSucceed,
  updateBodyMakeAccessory,
  updateBodyMakeAccessoryFailed,
  updateBodyMakeAccessoryStart,
  updateBodyMakeAccessorySucceed,
  deleteBodyMakeAccessory,
  deleteBodyMakeAccessoryFailed,
  deleteBodyMakeAccessoryStart,
  deleteBodyMakeAccessorySucceed,
  // Dimension Associated Accessories
  getDimensionAssociatedAccessories,
  getDimensionAssociatedAccessoriesStart,
  getDimensionAssociatedAccessoriesSucceed,
  getDimensionAssociatedAccessoriesFailed,
} from './accessory';

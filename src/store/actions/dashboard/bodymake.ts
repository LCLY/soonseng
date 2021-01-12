import { AppActions } from '../../types/index';
import * as actionTypes from '../actionTypes';
import { TReceivedBodyMakeObj, TCreateBodyMakeData, TUpdateBodyMakeData } from 'src/store/types/dashboard';

/* ============================================================================================ */
// Body Make
/* ============================================================================================ */

/* ------------------ */
// Create Body Make
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
// Get Body makes
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
// Update Body Make
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
// Delete Body Make
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

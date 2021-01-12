import { AppActions } from '../../types/index';
import * as actionTypes from '../actionTypes';
import { TReceivedBodyObj, TReceivedLengthObj } from 'src/store/types/dashboard';

/* ============================================================================================ */
// Length
/* ============================================================================================ */

/* ------------------ */
// Create Length
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
// Get Lengths
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
// Update Length
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
// Delete Length
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
// Body
/* ============================================================================================ */

/* ------------------ */
// Create Body
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
// Get Bodies
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
// Update Body
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
// Delete Body
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

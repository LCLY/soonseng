import { AppActions } from '../../types/index';
import * as actionTypes from '../actionTypes';
import {
  TReceivedAccessoryObj,
  TCreateAccessoryData,
  TUpdateAccessoryData,
  TReceivedBodyAccessoryObj,
  TReceivedBodyMakeAccessoryObj,
} from 'src/store/types/dashboard';

/* ============================================================================================ */
// Accessory
/* ============================================================================================ */

/* ------------------ */
// Create Accessory
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
// Get Accessories
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
// Update Accessory
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

/* ------------------ */
// Delete Accessory
/* ------------------ */
export const deleteAccessory = (accessory_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_ACCESSORY,
    accessory_id: accessory_id,
  };
};

export const deleteAccessoryStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_ACCESSORY_START,
  };
};

export const deleteAccessorySucceed = (
  accessoriesArray: TReceivedAccessoryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.DELETE_ACCESSORY_SUCCEED,
    accessoriesArray: accessoriesArray,
    successMessage: successMessage,
  };
};
export const deleteAccessoryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_ACCESSORY_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Body Accessory
/* ============================================================================================ */

/* ---------------------------------- */
// Create Body Accessory
/* ---------------------------------- */
export const createBodyAccessory = (body_id: number, accessory_id: number): AppActions => {
  return {
    type: actionTypes.CREATE_BODYACCESSORY,
    body_id: body_id,
    accessory_id: accessory_id,
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

/* ---------------------------------- */
// Get Body Accessories
/* ---------------------------------- */
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

/* ---------------------------------- */
// Update Body Accessories
/* ---------------------------------- */
export const updateBodyAccessory = (body_id: number, accessory_id: number): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYACCESSORY,
    body_id: body_id,
    accessory_id: accessory_id,
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
/* ---------------------------------- */
// Delete  Body Accessories
/* ---------------------------------- */
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

/* ------------------------------------- */
// Clear body accessory
/* ------------------------------------- */

export const clearBodyAccessoryArray = (): AppActions => {
  return {
    type: actionTypes.CLEAR_BODYACCESSORY_ARRAY,
  };
};

/* ------------------------------------- */
// Get body associated accessories
/* ------------------------------------- */

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

/* ============================================================================================ */
// Body Make Accessory
/* ============================================================================================ */

/* ---------------------------------- */
// Create Body Make Accessory
/* ---------------------------------- */
export const createBodyMakeAccessory = (price: number, body_make_id: number, accessory_id: number): AppActions => {
  return {
    type: actionTypes.CREATE_BODYMAKE_ACCESSORY,
    price: price,
    accessory_id: accessory_id,
    body_make_id: body_make_id,
  };
};

export const createBodyMakeAccessoryStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_BODYMAKE_ACCESSORY_START,
  };
};

export const createBodyMakeAccessorySucceed = (
  bodyMakeAccessoriesArray: TReceivedBodyMakeAccessoryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_BODYMAKE_ACCESSORY_SUCCEED,
    bodyMakeAccessoriesArray: bodyMakeAccessoriesArray,
    successMessage: successMessage,
  };
};
export const createBodyMakeAccessoryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_BODYMAKE_ACCESSORY_FAILED,
    errorMessage: errorMessage,
  };
};

/* ---------------------------------- */
// Get Body Make Accessories
/* ---------------------------------- */
export const getBodyMakeAccessories = (body_make_id: number): AppActions => {
  return {
    type: actionTypes.GET_BODYMAKE_ACCESSORIES,
    body_make_id: body_make_id,
  };
};

export const getBodyMakeAccessoriesStart = (): AppActions => {
  return {
    type: actionTypes.GET_BODYMAKE_ACCESSORIES_START,
  };
};

export const getBodyMakeAccessoriesSucceed = (
  bodyMakeAccessoriesArray: TReceivedBodyMakeAccessoryObj[],
): AppActions => {
  return {
    type: actionTypes.GET_BODYMAKE_ACCESSORIES_SUCCEED,
    bodyMakeAccessoriesArray: bodyMakeAccessoriesArray,
  };
};
export const getBodyMakeAccessoriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_BODYMAKE_ACCESSORIES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ---------------------------------- */
// Update Body Make Accessories
/* ---------------------------------- */
export const updateBodyMakeAccessory = (
  body_make_id: number,
  // accessory_id: number,
  body_make_accessory_id: number,
  price: number,
): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYMAKE_ACCESSORY,
    price: price,
    // accessory_id: accessory_id,
    body_make_id: body_make_id,
    body_make_accessory_id: body_make_accessory_id,
  };
};

export const updateBodyMakeAccessoryStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYMAKE_ACCESSORY_START,
  };
};

export const updateBodyMakeAccessorySucceed = (
  bodyMakeAccessoriesArray: TReceivedBodyMakeAccessoryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYMAKE_ACCESSORY_SUCCEED,
    bodyMakeAccessoriesArray: bodyMakeAccessoriesArray,
    successMessage: successMessage,
  };
};
export const updateBodyMakeAccessoryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_BODYMAKE_ACCESSORY_FAILED,
    errorMessage: errorMessage,
  };
};
/* ---------------------------------- */
// Delete Body Make Accessories
/* ---------------------------------- */
export const deleteBodyMakeAccessory = (body_make_id: number, body_make_accessory_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_BODYMAKE_ACCESSORY,
    body_make_id: body_make_id,
    body_make_accessory_id: body_make_accessory_id,
  };
};

export const deleteBodyMakeAccessoryStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_BODYMAKE_ACCESSORY_START,
  };
};

export const deleteBodyMakeAccessorySucceed = (
  bodyMakeAccessoriesArray: TReceivedBodyMakeAccessoryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.DELETE_BODYMAKE_ACCESSORY_SUCCEED,
    bodyMakeAccessoriesArray: bodyMakeAccessoriesArray,
    successMessage: successMessage,
  };
};
export const deleteBodyMakeAccessoryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_BODYMAKE_ACCESSORY_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------------- */
// Get dimension associated accessories
/* ------------------------------------- */

export const getDimensionAssociatedAccessories = (): AppActions => {
  return {
    type: actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES,
  };
};

export const getDimensionAssociatedAccessoriesStart = (): AppActions => {
  return {
    type: actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES_START,
  };
};

export const getDimensionAssociatedAccessoriesSucceed = (
  dimensionAssociatedAccessoriesArray: TReceivedAccessoryObj[],
): AppActions => {
  return {
    type: actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES_SUCCEED,
    dimensionAssociatedAccessoriesArray: dimensionAssociatedAccessoriesArray,
  };
};
export const getDimensionAssociatedAccessoriesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES_FAILED,
    errorMessage: errorMessage,
  };
};

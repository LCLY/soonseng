import { TReceivedChargesFeesObj } from 'src/store/types/dashboard';
import { AppActions } from '../../types/index';
import * as actionTypes from '../actionTypes';
/* ============================================================================================ */
// Standard Charges and fees
/* ============================================================================================ */
/* ------------------ */
// Create fees
/* ------------------ */
export const createChargesFees = (title: string, price: number): AppActions => {
  return {
    type: actionTypes.CREATE_CHARGES_FEES,
    title: title,
    price: price,
  };
};

export const createChargesFeesStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_CHARGES_FEES_START,
  };
};

export const createChargesFeesSucceed = (
  chargesFeesArray: TReceivedChargesFeesObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_CHARGES_FEES_SUCCEED,
    chargesFeesArray: chargesFeesArray,
    successMessage: successMessage,
  };
};
export const createChargesFeesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_CHARGES_FEES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Get fees
/* ------------------ */
export const getChargesFees = (): AppActions => {
  return {
    type: actionTypes.GET_CHARGES_FEES,
  };
};

export const getChargesFeesStart = (): AppActions => {
  return {
    type: actionTypes.GET_CHARGES_FEES_START,
  };
};

export const getChargesFeesSucceed = (chargesFeesArray: TReceivedChargesFeesObj[]): AppActions => {
  return {
    type: actionTypes.GET_CHARGES_FEES_SUCCEED,
    chargesFeesArray: chargesFeesArray,
  };
};
export const getChargesFeesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_CHARGES_FEES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Update fees
/* ------------------ */
export const updateChargesFees = (fee_id: number, title: string, price: number): AppActions => {
  return {
    type: actionTypes.UPDATE_CHARGES_FEES,
    fee_id: fee_id,
    title: title,
    price: price,
  };
};

export const updateChargesFeesStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_CHARGES_FEES_START,
  };
};

export const updateChargesFeesSucceed = (
  chargesFeesArray: TReceivedChargesFeesObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_CHARGES_FEES_SUCCEED,
    chargesFeesArray: chargesFeesArray,
    successMessage: successMessage,
  };
};
export const updateChargesFeesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_CHARGES_FEES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------ */
// Delete fees
/* ------------------ */
export const deleteChargesFees = (fee_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_CHARGES_FEES,
    fee_id: fee_id,
  };
};

export const deleteChargesFeesStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_CHARGES_FEES_START,
  };
};

export const deleteChargesFeesSucceed = (
  chargesFeesArray: TReceivedChargesFeesObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.DELETE_CHARGES_FEES_SUCCEED,
    chargesFeesArray: chargesFeesArray,
    successMessage: successMessage,
  };
};
export const deleteChargesFeesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_CHARGES_FEES_FAILED,
    errorMessage: errorMessage,
  };
};

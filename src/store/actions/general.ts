import { INotification } from '../types/general';
import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';

/* ============================================================================================ */
//  General
/* ============================================================================================ */

/* ------------------- */
// Save project version
/* ------------------- */
export const saveProjectVersion = (projectVersion: string): AppActions => {
  return {
    type: actionTypes.SAVE_PROJECT_VERSION,
    projectVersion: projectVersion,
  };
};
/* ------------------- */
// Clear local storage
/* ------------------- */
export const clearLocalStorage = (projectVersion: string): AppActions => {
  return {
    type: actionTypes.CLEAR_LOCALSTORAGE,
    projectVersion: projectVersion,
  };
};
/* ------------------- */
// set discount for quotation
/* ------------------- */
export const setQuotationDiscount = (quotationDiscount: number): AppActions => {
  return {
    type: actionTypes.SET_QUOTATION_DISCOUNT,
    quotationDiscount: quotationDiscount,
  };
};
/* ------------------- */
// set Notification
/* ------------------- */
export const setNotification = (notification: INotification): AppActions => {
  return {
    type: actionTypes.SET_NOTIFICATION,
    notification: notification,
  };
};

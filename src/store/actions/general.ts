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

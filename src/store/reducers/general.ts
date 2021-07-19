import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { GeneralInitialState } from 'src/store/types/general';
import { AppActions } from 'src/store/types';
import { Reducer } from 'redux';

const initialState: GeneralInitialState = {
  projectVersion: '',
  quotationDiscount: 0,
  notification: { notificationArray: [], notificationNumber: 0 },
};

/* ============================================================================================================ */
// Save project version - only apply this when something significant related to localstorage needs to be changed
/* ============================================================================================================ */
const saveProjectVersion = (state: GeneralInitialState, action: AppActions) => {
  if ('projectVersion' in action) {
    // also save in localstorage, just in case somewhere else that needs the state but cant access this reducer's state
    localStorage.setItem('projectVersion', action.projectVersion);
    return updateObject(state, {
      projectVersion: action.projectVersion,
    });
  }
  return state;
};

/* ============================================================================================ */
// Clear Local Storage
/* ============================================================================================ */
const clearLocalStorage = (state: GeneralInitialState, action: AppActions) => {
  if ('projectVersion' in action) {
    // update the latest version
    localStorage.clear();
    localStorage.setItem('projectVersion', action.projectVersion);

    return updateObject(state, {
      projectVersion: action.projectVersion,
    });
  }
  return state;
};
/* ============================================================================================ */
// Set quotation discount
/* ============================================================================================ */
const setQuotationDiscount = (state: GeneralInitialState, action: AppActions) => {
  if ('quotationDiscount' in action) {
    return updateObject(state, {
      quotationDiscount: action.quotationDiscount,
    });
  }
  return state;
};
/* ============================================================================================ */
// Set notification
/* ============================================================================================ */
const setNotification = (state: GeneralInitialState, action: AppActions) => {
  if ('notification' in action) {
    return updateObject(state, {
      notification: action.notification,
    });
  }
  return state;
};

/* ============================================================================================ */
/* ============================================================================================ */
const reducer: Reducer<GeneralInitialState, AppActions> = (state = initialState, action) => {
  switch (action.type) {
    /* ---------------------- */
    //  Save Project version
    /* ---------------------- */
    case actionTypes.SAVE_PROJECT_VERSION:
      return saveProjectVersion(state, action);
    /* ---------------------- */
    //  Clear out localstorage
    /* ---------------------- */
    case actionTypes.CLEAR_LOCALSTORAGE:
      return clearLocalStorage(state, action);
    /* ---------------------- */
    //  Set quotation discount
    /* ---------------------- */
    case actionTypes.SET_QUOTATION_DISCOUNT:
      return setQuotationDiscount(state, action);
    /* ---------------------- */
    //  Set notification
    /* ---------------------- */
    case actionTypes.SET_NOTIFICATION:
      return setNotification(state, action);

    default:
      return state;
  }
};

export default reducer;

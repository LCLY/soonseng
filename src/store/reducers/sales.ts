import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { SalesActionTypes, SalesInitialState } from 'src/store/types/sales';
import { AppActions } from 'src/store/types';

const initialState: SalesInitialState = {
  loading: false,
  // makes
  makeObj: null,
  makesArray: null,
  // brand
  brandObj: null,
  brandsArray: null,
  // wheel
  wheelbaseObj: null,
  wheelbasesArray: null,
  // others
  errorMessage: null,
  successMessage: null,
};

/* ============================================================================================ */
// Clear Sales State - reset the states
/* ============================================================================================ */
const clearSalesState = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { loading: false, errorMessage: null, successMessage: null });
};

/* ============================================================================================ */
/* Make - Brand (head) */
/* ============================================================================================ */

/* -------------------------- */
/* Create Brand */
/* -------------------------- */
const createBrandStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBrandSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'brandsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      brandsArray: action.brandsArray,
      successMessage: action.successMessage,
    });
  }
};
const createBrandFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Get all Brands  */
/* -------------------------- */
const getBrandsStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBrandsSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('brandsArray' in action) {
    return updateObject(state, { errorMessage: null, loading: false, brandsArray: action.brandsArray });
  }
};
const getBrandsFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Brand  */
/* -------------------------- */
const updateBrandStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateBrandSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('brandsArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      brandsArray: action.brandsArray,
      successMessage: action.successMessage,
    });
  }
};
const updateBrandFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* Make - Wheelbase (head) */
/* ============================================================================================ */
/* -------------------------- */
/* Create Wheelbase */
/* -------------------------- */
const createWheelbaseStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createWheelbaseSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'wheelbasesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      wheelbasesArray: action.wheelbasesArray,
      successMessage: action.successMessage,
    });
  }
};
const createWheelbaseFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Get Wheelbases */
/* -------------------------- */
const getWheelbasesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getWheelbasesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('wheelbasesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      wheelbasesArray: action.wheelbasesArray,
    });
  }
};
const getWheelbasesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Wheelbase  */
/* -------------------------- */
const updateWheelbaseStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateWheelbaseSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('wheelbasesArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      wheelbasesArray: action.wheelbasesArray,
      successMessage: action.successMessage,
    });
  }
};
const updateWheelbaseFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* Make - Make (head) */
/* ============================================================================================ */

/* -------------------------- */
/* Create Make  */
/* -------------------------- */
const updateMakeStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateMakeSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'makesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makesArray: action.makesArray,
      successMessage: action.successMessage,
    });
  }
};
const updateMakeFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};
/* -------------------------- */
/* Get Makes  */
/* -------------------------- */
const getMakesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getMakesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('makesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makesArray: action.makesArray,
    });
  }
};
const getMakesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Make  */
/* -------------------------- */
const createMakeStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createMakeSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'makesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makesArray: action.makesArray,
      successMessage: action.successMessage,
    });
  }
};
const createMakeFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* ============================================================================================ */

const reducer = (state = initialState, action: SalesActionTypes) => {
  switch (action.type) {
    // Clear Sales State
    case actionTypes.CLEAR_SALES_STATE:
      return clearSalesState(state, action);

    /* =================================== */
    // Brand (head)
    /* =================================== */
    // Get all brands (head)
    case actionTypes.GET_BRANDS_START:
      return getBrandsStart(state, action);
    case actionTypes.GET_BRANDS_SUCCEED:
      return getBrandsSucceed(state, action);
    case actionTypes.GET_BRANDS_FAILED:
      return getBrandsFailed(state, action);
    // Create brand (head)
    case actionTypes.CREATE_BRAND_START:
      return createBrandStart(state, action);
    case actionTypes.CREATE_BRAND_SUCCEED:
      return createBrandSucceed(state, action);
    case actionTypes.CREATE_BRAND_FAILED:
      return createBrandFailed(state, action);
    // Update brand (head)
    case actionTypes.UPDATE_BRAND_START:
      return updateBrandStart(state, action);
    case actionTypes.UPDATE_BRAND_SUCCEED:
      return updateBrandSucceed(state, action);
    case actionTypes.UPDATE_BRAND_FAILED:
      return updateBrandFailed(state, action);

    /* =================================== */
    // Wheelbase (head)
    /* =================================== */
    // Create wheelbase (head)
    case actionTypes.CREATE_WHEELBASE_START:
      return createWheelbaseStart(state, action);
    case actionTypes.CREATE_WHEELBASE_SUCCEED:
      return createWheelbaseSucceed(state, action);
    case actionTypes.CREATE_WHEELBASE_FAILED:
      return createWheelbaseFailed(state, action);
    // Get wheelbase (head)
    case actionTypes.GET_WHEELBASES_START:
      return getWheelbasesStart(state, action);
    case actionTypes.GET_WHEELBASES_SUCCEED:
      return getWheelbasesSucceed(state, action);
    case actionTypes.GET_WHEELBASES_FAILED:
      return getWheelbasesFailed(state, action);
    // Update wheelbase (head)
    case actionTypes.UPDATE_WHEELBASE_START:
      return updateWheelbaseStart(state, action);
    case actionTypes.UPDATE_WHEELBASE_SUCCEED:
      return updateWheelbaseSucceed(state, action);
    case actionTypes.UPDATE_WHEELBASE_FAILED:
      return updateWheelbaseFailed(state, action);

    /* =================================== */
    // Make (head)
    /* =================================== */
    // Create make (head)
    case actionTypes.CREATE_MAKE_START:
      return createMakeStart(state, action);
    case actionTypes.CREATE_MAKE_SUCCEED:
      return createMakeSucceed(state, action);
    case actionTypes.CREATE_MAKE_FAILED:
      return createMakeFailed(state, action);
    // Get makes (head)
    case actionTypes.GET_MAKES_START:
      return getMakesStart(state, action);
    case actionTypes.GET_MAKES_SUCCEED:
      return getMakesSucceed(state, action);
    case actionTypes.GET_MAKES_FAILED:
      return getMakesFailed(state, action);
    // Update make (head)
    case actionTypes.UPDATE_MAKE_START:
      return updateMakeStart(state, action);
    case actionTypes.UPDATE_MAKE_SUCCEED:
      return updateMakeSucceed(state, action);
    case actionTypes.UPDATE_MAKE_FAILED:
      return updateMakeFailed(state, action);

    default:
      return state;
  }
};

export default reducer;

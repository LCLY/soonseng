import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { SalesActionTypes, SalesInitialState } from 'src/store/types/sales';
import { AppActions } from 'src/store/types';

const initialState: SalesInitialState = {
  loading: false,
  makeObject: null,
  brandsArray: null,
  brandObject: null,
  errorMessage: null,
  successMessage: null,
  wheelbaseObject: null,
};

/* ============================================================================================ */
// Clear Sales State - reset the states
/* ============================================================================================ */
const clearSalesState = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { loading: false, errorMessage: null, successMessage: null });
};

/* ============================================================================================ */
/* Get all Brands (head) */
/* ============================================================================================ */
const getBrandsHeadStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBrandsHeadSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('brandsArray' in action) {
    return updateObject(state, { errorMessage: null, loading: false, brandsArray: action.brandsArray });
  }
};
const getBrandsHeadFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* Create Brand (head) */
/* ============================================================================================ */
const createBrandHeadStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBrandHeadSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action) {
    return updateObject(state, { errorMessage: null, loading: false, successMessage: action.successMessage });
  }
};
const createBrandHeadFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* Create Wheelbase (head) */
/* ============================================================================================ */
const createWheelbaseHeadStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createWheelbaseHeadSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action) {
    return updateObject(state, { errorMessage: null, loading: false, successMessage: action.successMessage });
  }
};
const createWheelbaseHeadFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* Create Make (head) */
/* ============================================================================================ */
const createMakeHeadStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createMakeHeadSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action) {
    return updateObject(state, { errorMessage: null, loading: false, successMessage: action.successMessage });
  }
};
const createMakeHeadFailed = (state: SalesInitialState, action: AppActions) => {
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

    // Get all brands (head)
    case actionTypes.GET_BRANDS_HEAD_START:
      return getBrandsHeadStart(state, action);
    case actionTypes.GET_BRANDS_HEAD_SUCCEED:
      return getBrandsHeadSucceed(state, action);
    case actionTypes.GET_BRANDS_HEAD_FAILED:
      return getBrandsHeadFailed(state, action);

    // Create brand (head)
    case actionTypes.CREATE_BRAND_HEAD_START:
      return createBrandHeadStart(state, action);
    case actionTypes.CREATE_BRAND_HEAD_SUCCEED:
      return createBrandHeadSucceed(state, action);
    case actionTypes.CREATE_BRAND_HEAD_FAILED:
      return createBrandHeadFailed(state, action);

    // Create wheelbase (head)
    case actionTypes.CREATE_WHEELBASE_HEAD_START:
      return createWheelbaseHeadStart(state, action);
    case actionTypes.CREATE_WHEELBASE_HEAD_SUCCEED:
      return createWheelbaseHeadSucceed(state, action);
    case actionTypes.CREATE_WHEELBASE_HEAD_FAILED:
      return createWheelbaseHeadFailed(state, action);

    // Create make (head)
    case actionTypes.CREATE_MAKE_HEAD_START:
      return createMakeHeadStart(state, action);
    case actionTypes.CREATE_MAKE_HEAD_SUCCEED:
      return createMakeHeadSucceed(state, action);
    case actionTypes.CREATE_MAKE_HEAD_FAILED:
      return createMakeHeadFailed(state, action);

    default:
      return state;
  }
};

export default reducer;

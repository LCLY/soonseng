import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utils';
import { SalesActionTypes, SalesInitialState } from '../types/sales';

const initialState: SalesInitialState = {
  loading: false,
  brandObject: null,
  errorMessage: null,
  successMessage: null,
};

/* ============================================================================================ */
// Clear Sales State - reset the states
/* ============================================================================================ */
const clearSalesState = (state: SalesInitialState, _action: any) => {
  return updateObject(state, { loading: false, errorMessage: null, successMessage: null });
};

/* ============================================================================================ */
/* Get all Brands (head) */
/* ============================================================================================ */
const getBrandsHeadStart = (state: SalesInitialState, _action: any) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBrandsHeadSucceed = (state: SalesInitialState, _action: any) => {
  return updateObject(state, { errorMessage: null, loading: false });
};
const getBrandsHeadFailed = (state: SalesInitialState, action: any) => {
  return updateObject(state, { errorMessage: action.error, loading: false });
};

/* ============================================================================================ */
/* Create Brand (head) */
/* ============================================================================================ */
const createBrandHeadStart = (state: SalesInitialState, _action: any) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBrandHeadSucceed = (state: SalesInitialState, action: any) => {
  return updateObject(state, { errorMessage: null, loading: false, successMessage: action.successMessage });
};
const createBrandHeadFailed = (state: SalesInitialState, action: any) => {
  return updateObject(state, { errorMessage: action.errorMessage, loading: false });
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

    default:
      return state;
  }
};

export default reducer;

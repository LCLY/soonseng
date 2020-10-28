import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utils';
import { SalesActionTypes, SalesInitialState } from '../types/sales';

const initialState: SalesInitialState = {
  error: null,
  loading: false,
};

/* ============================================================================================ */
/* ============================================================================================ */
// Clear Sales State - reset the states
const clearSalesState = (state: SalesInitialState, _action: any) => {
  return updateObject(state, { error: null, loading: false });
};
/* ============================================================================================ */
/* ============================================================================================ */

/* Get all Brands (head) */
const getBrandsHeadStart = (state: SalesInitialState, _action: any) => {
  return updateObject(state, { error: null, loading: true });
};
const getBrandsHeadSucceed = (state: SalesInitialState, _action: any) => {
  return updateObject(state, { error: null, loading: false });
};
const getBrandsHeadFailed = (state: SalesInitialState, action: any) => {
  return updateObject(state, { error: action.error, loading: false });
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

    default:
      return state;
  }
};

export default reducer;

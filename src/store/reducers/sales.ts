import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { SalesActionTypes, SalesInitialState } from 'src/store/types/sales';
import { AppActions } from 'src/store/types';

const initialState: SalesInitialState = {
  loading: false,
  // length
  lengthObj: null,
  lengthsArray: null,
  // body
  bodyLengthObj: null,
  bodyLengthsArray: null,
  // accessories
  bodyAccessoryObj: null,
  bodyAccessoriesArray: null,
  // others
  errorMessage: null,
  successMessage: null,
};

/* -------------------------- */
/* Get all sales Lengths  */
/* -------------------------- */
const clearSalesState = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: false, successMessage: null, bodyLengthsArray: null });
};

/* -------------------------- */
/* Get all sales Lengths  */
/* -------------------------- */
const getSalesLengthsStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getSalesLengthsSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('lengthsArray' in action) {
    return updateObject(state, { errorMessage: null, loading: false, lengthsArray: action.lengthsArray });
  }
};
const getSalesLengthsFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Get all sales body Lengths  */
/* -------------------------- */
const getSalesBodyLengthsStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getSalesBodyLengthsSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('bodyLengthsArray' in action) {
    return updateObject(state, { errorMessage: null, loading: false, bodyLengthsArray: action.bodyLengthsArray });
  }
};
const getSalesBodyLengthsFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Get all Body Accessories  */
/* -------------------------- */
const getSalesBodyAccessoriesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getSalesBodyAccessoriesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('bodyAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAccessoriesArray: action.bodyAccessoriesArray,
    });
  }
};
const getSalesBodyAccessoriesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

const reducer = (state = initialState, action: SalesActionTypes) => {
  switch (action.type) {
    /* =================================== */
    //  Clear state
    /* =================================== */
    case actionTypes.CLEAR_SALES_STATE:
      return clearSalesState(state, action);
    /* =================================== */
    //  Lengths
    /* =================================== */
    // Get all lengths
    case actionTypes.GET_SALES_LENGTHS_START:
      return getSalesLengthsStart(state, action);
    case actionTypes.GET_SALES_LENGTHS_SUCCEED:
      return getSalesLengthsSucceed(state, action);
    case actionTypes.GET_SALES_LENGTHS_FAILED:
      return getSalesLengthsFailed(state, action);
    /* =================================== */
    //  Bodies
    /* =================================== */
    // Get all bodies
    case actionTypes.GET_SALES_BODYLENGTHS_START:
      return getSalesBodyLengthsStart(state, action);
    case actionTypes.GET_SALES_BODYLENGTHS_SUCCEED:
      return getSalesBodyLengthsSucceed(state, action);
    case actionTypes.GET_SALES_BODYLENGTHS_FAILED:
      return getSalesBodyLengthsFailed(state, action);
    /* =================================== */
    //  Accessories
    /* =================================== */
    // Get all accessories
    case actionTypes.GET_SALES_BODYACCESSORIES_START:
      return getSalesBodyAccessoriesStart(state, action);
    case actionTypes.GET_SALES_BODYACCESSORIES_SUCCEED:
      return getSalesBodyAccessoriesSucceed(state, action);
    case actionTypes.GET_SALES_BODYACCESSORIES_FAILED:
      return getSalesBodyAccessoriesFailed(state, action);

    default:
      return state;
  }
};

export default reducer;

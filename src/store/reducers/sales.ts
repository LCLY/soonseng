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
  // others
  errorMessage: null,
  successMessage: null,
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
/* Get all sales Lengths  */
/* -------------------------- */
const getSalesBodiesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getSalesBodiesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('bodyLengthsArray' in action) {
    return updateObject(state, { errorMessage: null, loading: false, bodyLengthsArray: action.bodyLengthsArray });
  }
};
const getSalesBodiesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

const reducer = (state = initialState, action: SalesActionTypes) => {
  switch (action.type) {
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
    case actionTypes.GET_SALES_BODIES_START:
      return getSalesBodiesStart(state, action);
    case actionTypes.GET_SALES_BODIES_SUCCEED:
      return getSalesBodiesSucceed(state, action);
    case actionTypes.GET_SALES_BODIES_FAILED:
      return getSalesBodiesFailed(state, action);

    default:
      return state;
  }
};

export default reducer;

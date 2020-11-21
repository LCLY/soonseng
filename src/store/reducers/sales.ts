import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { SalesActionTypes, SalesInitialState } from 'src/store/types/sales';
import { AppActions } from 'src/store/types';

const initialState: SalesInitialState = {
  loading: false,
  // length
  lengthsCategoriesArray: null,
  // body
  bodyLengthObj: null,
  bodyLengthsArray: null,
  // accessories
  bodyAccessoryObj: null,
  bodyAccessoriesArray: null,
  // brands/makes
  salesBrandObj: null,
  salesBrandsArray: null,
  // others
  errorMessage: null,
  successMessage: null,
  getSalesLengthsSucceed: null,
  getSalesBodyLengthsSucceed: null,
  getSalesBodyAccessoriesSucceed: null,
  getSalesMakesSucceed: null,
};

/* -------------------------- */
/* Get all sales Lengths  */
/* -------------------------- */
const clearSalesState = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, {
    errorMessage: null,
    loading: false,
    successMessage: null,
    // bodyLengthsArray: null,
    getSalesLengthsSucceed: null,
    getSalesBodyLengthsSucceed: null,
    getSalesBodyAccessoriesSucceed: null,
    getSalesMakesSucceed: null,
  });
};

/* -------------------------- */
/* Get all sales Lengths  */
/* -------------------------- */
const getSalesLengthsStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, getSalesLengthsSucceed: null });
};
const getSalesLengthsSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('lengthsCategoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      getSalesLengthsSucceed: true,
      lengthsCategoriesArray: action.lengthsCategoriesArray,
    });
  }
};
const getSalesLengthsFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false, getSalesLengthsSucceed: false });
  }
};

/* -------------------------- */
/* Get all sales body Lengths  */
/* -------------------------- */
const getSalesBodyLengthsStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, getSalesBodyLengthsSucceed: null });
};
const getSalesBodyLengthsSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('bodyLengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      getSalesBodyLengthsSucceed: true,
      bodyLengthsArray: action.bodyLengthsArray,
    });
  }
};
const getSalesBodyLengthsFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      errorMessage: action.errorMessage,
      loading: false,
      getSalesBodyLengthsSucceed: false,
    });
  }
};

/* -------------------------- */
/* Get all Body Accessories  */
/* -------------------------- */
const getSalesBodyAccessoriesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, getSalesBodyAccessoriesSucceed: null });
};
const getSalesBodyAccessoriesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('bodyAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAccessoriesArray: action.bodyAccessoriesArray,
      getSalesBodyAccessoriesSucceed: true,
    });
  }
};
const getSalesBodyAccessoriesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      errorMessage: action.errorMessage,
      loading: false,
      getSalesBodyAccessoriesSucceed: false,
    });
  }
};

/* -------------------------- */
/* Get all Makes  */
/* -------------------------- */
const getSalesMakesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, getSalesMakesSucceed: null });
};
const getSalesMakesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('salesBrandsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      getSalesMakesSucceed: true,
      salesBrandsArray: action.salesBrandsArray,
    });
  }
};
const getSalesMakesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      errorMessage: action.errorMessage,
      loading: false,
      getSalesMakesSucceed: false,
    });
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
    //  Body Accessories
    /* =================================== */
    // Get all body accessories
    case actionTypes.GET_SALES_BODYACCESSORIES_START:
      return getSalesBodyAccessoriesStart(state, action);
    case actionTypes.GET_SALES_BODYACCESSORIES_SUCCEED:
      return getSalesBodyAccessoriesSucceed(state, action);
    case actionTypes.GET_SALES_BODYACCESSORIES_FAILED:
      return getSalesBodyAccessoriesFailed(state, action);
    /* =================================== */
    //  Makes
    /* =================================== */
    // Get all makes
    case actionTypes.GET_SALES_MAKES_START:
      return getSalesMakesStart(state, action);
    case actionTypes.GET_SALES_MAKES_SUCCEED:
      return getSalesMakesSucceed(state, action);
    case actionTypes.GET_SALES_MAKES_FAILED:
      return getSalesMakesFailed(state, action);

    default:
      return state;
  }
};

export default reducer;

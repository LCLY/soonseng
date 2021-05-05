import { Reducer } from 'redux';
import { PURGE } from 'redux-persist';
import { AppActions } from 'src/store/types';
import { updateObject } from 'src/shared/Utils';
import { SalesInitialState } from 'src/store/types/sales';
import * as actionTypes from 'src/store/actions/actionTypes';

const initialState: SalesInitialState = {
  loading: false,
  // length
  lengthsCategoriesArray: null,
  // body
  bodyObj: null,
  bodiesArray: null,
  // body makes
  bodyMakeObj: null,
  bodyMakesArray: null,
  // accssories
  generalAccessoriesArray: null,
  dimensionRelatedAccessoriesArray: null,
  bodyRelatedAccessoriesArray: null,
  // brands/makes
  salesBrandObj: null,
  salesBrandsArray: null,
  // local orders dict containing multiple objects inside
  localOrdersDict: {},
  // others
  errorMessage: null,
  successMessage: null,
  getSalesLengthsSucceed: null,
  getSalesBodiesSucceed: null,
  getSalesBodyMakesSucceed: null,
  getSalesAccessoriesSucceed: null,
  getSalesMakesSucceed: null,
};

/* -------------------------- */
/* Clear some sales states  */
/* -------------------------- */
const clearSalesState = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, {
    errorMessage: null,
    loading: false,
    successMessage: null,
    getSalesLengthsSucceed: null,
    getSalesBodiesSucceed: null,
    getSalesBodyMakesSucceed: null,
    getSalesAccessoriesSucceed: null,
    getSalesMakesSucceed: null,
  });
};

/* ================================= */
/* Local Quotation / Orders */
/* ================================= */
/* ------------------------------- */
// Store local orders
/* ------------------------------- */

export const setLocalOrdersDict = (state: SalesInitialState, action: AppActions) => {
  if ('localOrdersDict' in action) {
    return updateObject(state, {
      localOrdersDict: action.localOrdersDict,
    });
  }
  return state;
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
  return state;
};
const getSalesLengthsFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false, getSalesLengthsSucceed: false });
  }
  return state;
};

/* -------------------------- */
/* Get all sales body  */
/* -------------------------- */
const getSalesBodiesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, getSalesBodiesSucceed: null });
};
const getSalesBodiesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('bodiesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      getSalesBodiesSucceed: true,
      bodiesArray: action.bodiesArray,
    });
  }
  return state;
};
const getSalesBodiesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      errorMessage: action.errorMessage,
      loading: false,
      getSalesBodyLengthsSucceed: false,
    });
  }
  return state;
};

/* -------------------------- */
/* Get all sales body makes  */
/* -------------------------- */
const getSalesBodyMakesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, getSalesBodyMakesSucceed: null });
};
const getSalesBodyMakesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('bodyMakesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      getSalesBodyMakesSucceed: true,
      bodyMakesArray: action.bodyMakesArray,
    });
  }
  return state;
};
const getSalesBodyMakesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
      getSalesBodyLengthsSucceed: false,
    });
  }
  return state;
};

/* -------------------------- */
/* Get all Body Accessories  */
/* -------------------------- */
const getSalesAccessoriesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, {
    errorMessage: null,
    loading: true,
    generalAccessoriesArray: null,
    bodyRelatedAccessoriesArray: null,
    dimensionRelatedAccessoriesArray: null,
    getSalesAccessoriesSucceed: null,
  });
};
const getSalesAccessoriesSucceed = (state: SalesInitialState, action: AppActions) => {
  if (
    'generalAccessoriesArray' in action &&
    'dimensionRelatedAccessoriesArray' in action &&
    'bodyRelatedAccessoriesArray' in action
  ) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      getSalesAccessoriesSucceed: true,
      generalAccessoriesArray: action.generalAccessoriesArray,
      bodyRelatedAccessoriesArray: action.bodyRelatedAccessoriesArray,
      dimensionRelatedAccessoriesArray: action.dimensionRelatedAccessoriesArray,
    });
  }
  return state;
};
const getSalesAccessoriesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      errorMessage: action.errorMessage,
      loading: false,
      getSalesAccessoriesSucceed: false,
    });
  }
  return state;
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
  return state;
};
const getSalesMakesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      errorMessage: action.errorMessage,
      loading: false,
      getSalesMakesSucceed: false,
    });
  }
  return state;
};

const reducer: Reducer<SalesInitialState, AppActions> = (state = initialState, action) => {
  switch (action.type) {
    case PURGE:
      return initialState;
    /* =================================== */
    //  Clear state
    /* =================================== */
    case actionTypes.CLEAR_SALES_STATE:
      return clearSalesState(state, action);
    /* =================================== */
    // Local Quotation/Orders
    /* =================================== */
    //  Store local orders
    case actionTypes.SET_LOCAL_ORDERS_DICT:
      return setLocalOrdersDict(state, action);

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
    /* =================================== */
    //  Body Makes
    /* =================================== */
    // Get all body makes
    case actionTypes.GET_SALES_BODYMAKES_START:
      return getSalesBodyMakesStart(state, action);
    case actionTypes.GET_SALES_BODYMAKES_SUCCEED:
      return getSalesBodyMakesSucceed(state, action);
    case actionTypes.GET_SALES_BODYMAKES_FAILED:
      return getSalesBodyMakesFailed(state, action);
    /* =================================== */
    //  Body Accessories
    /* =================================== */
    // Get all body accessories
    case actionTypes.GET_SALES_ACCESSORIES_START:
      return getSalesAccessoriesStart(state, action);
    case actionTypes.GET_SALES_ACCESSORIES_SUCCEED:
      return getSalesAccessoriesSucceed(state, action);
    case actionTypes.GET_SALES_ACCESSORIES_FAILED:
      return getSalesAccessoriesFailed(state, action);
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

import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { CatalogInitialState } from 'src/store/types/catalog';
import { AppActions } from 'src/store/types';
import { Reducer } from 'redux';

const initialState: CatalogInitialState = {
  loading: false,
  errorMessage: null,
  successMessage: null,
  // catalogMake
  catalogMakeObj: null,
  catalogMakesArray: null,
  // catalogBodyMakeArray
  catalogBodyMake: null,
  catalogBodyMakesArray: null,
  makeFromCatalogBodyMake: null,
};

/* ============================================================================================ */
/* Clear Catalog State
/* ============================================================================================ */
const clearCatalogState = (state: CatalogInitialState, _action: AppActions) => {
  return updateObject(state, {
    errorMessage: null,
    loading: false,
    catalogMakesArray: null,
    catalogBodyMakeArray: null,
  });
};

/* ============================================================================================ */
/* Get Catalog Makes
/* ============================================================================================ */
const getCatalogMakesStart = (state: CatalogInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getCatalogMakesSucceed = (state: CatalogInitialState, action: AppActions) => {
  if ('catalogMakesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      catalogMakesArray: action.catalogMakesArray,
    });
  }
  return state;
};
const getCatalogMakesFailed = (state: CatalogInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Get Catalog Body Makes
/* ============================================================================================ */
const getCatalogBodyMakesStart = (state: CatalogInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getCatalogBodyMakesSucceed = (state: CatalogInitialState, action: AppActions) => {
  if ('catalogBodyMakesArray' in action && 'makeFromCatalogBodyMake' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makeFromCatalogBodyMake: action.makeFromCatalogBodyMake,
      catalogBodyMakesArray: action.catalogBodyMakesArray,
    });
  }
  return state;
};
const getCatalogBodyMakesFailed = (state: CatalogInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Set Accessory Type
/* ============================================================================================ */
const setAccessoryType = (state: CatalogInitialState, action: AppActions) => {
  if ('accessoryType' in action) {
    return updateObject(state, { accessoryType: action.accessoryType });
  }
  return state;
};

/* ============================================================================================ */
/* ============================================================================================ */
const reducer: Reducer<CatalogInitialState, AppActions> = (state = initialState, action) => {
  switch (action.type) {
    /* ---------------------- */
    //  Catalog Make
    /* ---------------------- */
    case actionTypes.CLEAR_CATALOG_STATE:
      return clearCatalogState(state, action);
    /* ---------------------- */
    //  Catalog Make
    /* ---------------------- */
    case actionTypes.GET_CATALOG_MAKES_START:
      return getCatalogMakesStart(state, action);
    case actionTypes.GET_CATALOG_MAKES_SUCCEED:
      return getCatalogMakesSucceed(state, action);
    case actionTypes.GET_CATALOG_MAKES_FAILED:
      return getCatalogMakesFailed(state, action);
    /* ---------------------- */
    //  Catalog Body Make
    /* ---------------------- */
    case actionTypes.GET_CATALOG_BODYMAKES_START:
      return getCatalogBodyMakesStart(state, action);
    case actionTypes.GET_CATALOG_BODYMAKES_SUCCEED:
      return getCatalogBodyMakesSucceed(state, action);
    case actionTypes.GET_CATALOG_BODYMAKES_FAILED:
      return getCatalogBodyMakesFailed(state, action);
    /* ---------------------- */
    //  Set Accessory Type
    /* ---------------------- */
    case actionTypes.SET_ACCESSORY_TYPE:
      return setAccessoryType(state, action);

    default:
      return state;
  }
};

export default reducer;

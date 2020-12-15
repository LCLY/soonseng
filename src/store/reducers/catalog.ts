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
};

/* ============================================================================================ */
/* Get Catalog Makes
/* ============================================================================================ */
const getCatalogMakesStart = (state: CatalogInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, catalogMakesArray: null });
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
  return updateObject(state, { errorMessage: null, loading: true, catalogBodyMakesArray: null });
};
const getCatalogBodyMakesSucceed = (state: CatalogInitialState, action: AppActions) => {
  if ('catalogBodyMakesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
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
/* ============================================================================================ */
const reducer: Reducer<CatalogInitialState, AppActions> = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default reducer;

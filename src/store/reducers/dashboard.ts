import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { DashboardInitialState } from 'src/store/types/dashboard';
import { AppActions } from 'src/store/types';
import { Reducer } from 'redux';

const initialState: DashboardInitialState = {
  loading: false,
  // others
  errorMessage: null,
  successMessage: null,
  // fees
  chargesFeesObj: null,
  chargesFeesArray: null,
  // makes
  makeObj: null,
  makesArray: null,
  // makes
  makeWheelbaseObj: null,
  makeWheelbasesArray: null,
  // series
  seriesObj: null,
  seriesArray: null,
  // brand
  brandObj: null,
  brandsArray: null,
  // wheel
  wheelbaseObj: null,
  wheelbasesArray: null,
  // body
  bodyObj: null,
  bodiesArray: null,
  // length
  lengthObj: null,
  lengthsArray: null,
  // body make
  bodyMakeObj: null,
  bodyMakesArray: null,
  // body accessory
  bodyAccessoryObj: null,
  bodyAccessoriesArray: null,
  bodyAssociatedAccessoriesArray: null,
  // body make accessory
  bodyMakeAccessoryObj: null,
  bodyMakeAccessoriesArray: null,
  // accessory
  accessoryObj: null,
  accessoriesArray: null,
  // images array
  imagesArray: null,
  imagesUploaded: false, //boolean to keep track of whether the image has uploaded successful
  // job status array
  jobStatusArray: null,
  // service types array
  serviceTypesArray: null,
  // task title array
  serviceTasksArray: null,
};

/* ============================================================================================ */
// Clear Dashboard State - reset the states
/* ============================================================================================ */
const clearDashboardState = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: false,
    errorMessage: null,
    successMessage: null,
    imagesUploaded: false,
  });
};

/* ============================================================================================ */
/*   Upload Image(s)
/* ============================================================================================ */

const uploadImageStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, imagesUploaded: false });
};
const uploadImageSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('imagesArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      imagesUploaded: true,
      imagesArray: action.imagesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const uploadImageFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false, imagesUploaded: false });
  }
  return state;
};
/* ============================================================================================ */
/*   Delete Image(s)
/* ============================================================================================ */

const deleteUploadImageStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteUploadImageSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteUploadImageFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Fees 
/* ============================================================================================ */
/* -------------------------- */
/* Create fees */
/* -------------------------- */
const createChargesFeesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createChargesFeesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'chargesFeesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      chargesFeesArray: action.chargesFeesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createChargesFeesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Get all fees  */
/* -------------------------- */
const getChargesFeesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getChargesFeesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('chargesFeesArray' in action) {
    return updateObject(state, { errorMessage: null, loading: false, chargesFeesArray: action.chargesFeesArray });
  }
  return state;
};
const getChargesFeesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update fees  */
/* -------------------------- */
const updateChargesFeesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateChargesFeesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('chargesFeesArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      chargesFeesArray: action.chargesFeesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateChargesFeesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete fees  */
/* -------------------------- */
const deleteChargesFeesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteChargesFeesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('chargesFeesArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      chargesFeesArray: action.chargesFeesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteChargesFeesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Brand (Make Page) (head) */
/* ============================================================================================ */

/* -------------------------- */
/* Create Brand */
/* -------------------------- */
const createBrandStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBrandSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'brandsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      brandsArray: action.brandsArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createBrandFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Get all Brands  */
/* -------------------------- */
const getBrandsStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBrandsSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('brandsArray' in action) {
    return updateObject(state, { errorMessage: null, loading: false, brandsArray: action.brandsArray });
  }
  return state;
};
const getBrandsFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Brand  */
/* -------------------------- */
const updateBrandStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateBrandSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('brandsArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      brandsArray: action.brandsArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateBrandFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete Brand  */
/* -------------------------- */
const deleteBrandStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteBrandSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('brandsArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      brandsArray: action.brandsArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteBrandFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/*  Wheelbase (Make Page) (head) */
/* ============================================================================================ */
/* -------------------------- */
/* Create Wheelbase */
/* -------------------------- */
const createWheelbaseStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createWheelbaseSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'wheelbasesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      wheelbasesArray: action.wheelbasesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createWheelbaseFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Get Wheelbases */
/* -------------------------- */
const getWheelbasesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getWheelbasesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('wheelbasesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      wheelbasesArray: action.wheelbasesArray,
    });
  }
  return state;
};
const getWheelbasesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Wheelbase  */
/* -------------------------- */
const updateWheelbaseStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateWheelbaseSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('wheelbasesArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      wheelbasesArray: action.wheelbasesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateWheelbaseFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Delete Brand  */
/* -------------------------- */
const deleteWheelbaseStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteWheelbaseSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('wheelbasesArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      wheelbasesArray: action.wheelbasesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteWheelbaseFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* ============================================================================================ */
/* Make (Make Page) (head) */
/* ============================================================================================ */

/* -------------------------- */
/* Get Makes  */
/* -------------------------- */
const getMakesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getMakesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('makesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makesArray: action.makesArray,
    });
  }
  return state;
};
const getMakesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Create Make  */
/* -------------------------- */
const createMakeStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createMakeSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'makesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makesArray: action.makesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Make  */
/* -------------------------- */
const updateMakeStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateMakeSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'makesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makesArray: action.makesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete Make  */
/* -------------------------- */
const deleteMakeStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteMakeSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'makesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makesArray: action.makesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/*  Series (Make Page) */
/* ============================================================================================ */

/* -------------------------- */
/* Get Series  */
/* -------------------------- */
const getSeriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { seriesArray: null, errorMessage: null });
};
const getSeriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('seriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      seriesArray: action.seriesArray,
    });
  }
  return state;
};
const getSeriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage });
  }
  return state;
};

/* -------------------------- */
/* Create Series  */
/* -------------------------- */
const createSeriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createSeriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('seriesArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      loading: false,
      seriesArray: action.seriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createSeriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Series  */
/* -------------------------- */
const updateSeriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateSeriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('seriesArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      loading: false,
      seriesArray: action.seriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateSeriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Delete Series  */
/* -------------------------- */
const deleteSeriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteSeriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('seriesArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      loading: false,
      seriesArray: action.seriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteSeriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Make Wheelbase (Make Page) (head) */
/* ============================================================================================ */

/* -------------------------- */
/* Get Make Wheelbases  */
/* -------------------------- */
const getMakeWheelbasesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, makeWheelbasesArray: null });
};
const getMakeWheelbasesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('makeWheelbasesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makeWheelbasesArray: action.makeWheelbasesArray,
    });
  }
  return state;
};
const getMakeWheelbasesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Clear Make Wheelbase Array */
/* -------------------------- */
const clearMakeWheelbase = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { makeWheelbasesArray: null });
};
/* -------------------------- */
/* Create Make Wheelbase */
/* -------------------------- */
const createMakeWheelbaseStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createMakeWheelbaseSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'makeWheelbasesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makeWheelbasesArray: action.makeWheelbasesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createMakeWheelbaseFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Make Wheelbase */
/* -------------------------- */
const updateMakeWheelbaseStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateMakeWheelbaseSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'makeWheelbasesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makeWheelbasesArray: action.makeWheelbasesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateMakeWheelbaseFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete Make Wheelbase */
/* -------------------------- */
const deleteMakeWheelbaseStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteMakeWheelbaseSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'makeWheelbasesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makeWheelbasesArray: action.makeWheelbasesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteMakeWheelbaseFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/*  Body (Make Page) (tail) */
/* ============================================================================================ */

/* -------------------------- */
/* Create Body  */
/* -------------------------- */
const createBodyStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBodySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodiesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodiesArray: action.bodiesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createBodyFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Get Bodies  */
/* -------------------------- */
const getBodiesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBodiesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('bodiesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodiesArray: action.bodiesArray,
    });
  }
  return state;
};
const getBodiesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Body  */
/* -------------------------- */
const updateBodyStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateBodySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodiesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodiesArray: action.bodiesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateBodyFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete Body  */
/* -------------------------- */
const deleteBodyStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteBodySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodiesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodiesArray: action.bodiesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteBodyFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Length (Body Page) (tail) */
/* ============================================================================================ */

/* -------------------------- */
/* Create Length  */
/* -------------------------- */
const createLengthStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createLengthSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'lengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      lengthsArray: action.lengthsArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createLengthFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Get Lengths  */
/* -------------------------- */
const getLengthsStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getLengthsSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('lengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      lengthsArray: action.lengthsArray,
    });
  }
  return state;
};
const getLengthsFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Length  */
/* -------------------------- */
const updateLengthStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateLengthSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'lengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      lengthsArray: action.lengthsArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateLengthFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete Length  */
/* -------------------------- */
const deleteLengthStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteLengthSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'lengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      lengthsArray: action.lengthsArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteLengthFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Body Make (Body Page) (tail) */
/* ============================================================================================ */
/* -------------------------- */
/* Create Body Make  */
/* -------------------------- */
const createBodyMakeStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBodyMakeSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyMakesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyMakesArray: action.bodyMakesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createBodyMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Get Body Makes  */
/* -------------------------- */
const getBodyMakesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBodyMakesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('bodyMakesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyMakesArray: action.bodyMakesArray,
    });
  }
  return state;
};
const getBodyMakesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Body Make  */
/* -------------------------- */
const updateBodyMakeStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateBodyMakeSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyMakesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyMakesArray: action.bodyMakesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateBodyMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete Body Make  */
/* -------------------------- */
const deleteBodyMakeStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteBodyMakeSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyMakesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyMakesArray: action.bodyMakesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteBodyMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Body Accessory (Body Page) (tail) */
/* ============================================================================================ */
/* -------------------------- */
/* Create Body Accessory  */
/* -------------------------- */
const createBodyAccessoryStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBodyAccessorySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAccessoriesArray: action.bodyAccessoriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createBodyAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Get Body Accessories  */
/* -------------------------- */
const getBodyAccessoriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, bodyAccessoriesArray: null });
};
const getBodyAccessoriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('bodyAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAccessoriesArray: action.bodyAccessoriesArray,
    });
  }
  return state;
};
const getBodyAccessoriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Body Accessory  */
/* -------------------------- */
const updateBodyAccessoryStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateBodyAccessorySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAccessoriesArray: action.bodyAccessoriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateBodyAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete Body Accessory  */
/* -------------------------- */
const deleteBodyAccessoryStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteBodyAccessorySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAccessoriesArray: action.bodyAccessoriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteBodyAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ------------------------ */
// Clear body accessory array
/* ------------------------ */
const clearBodyAccessoryArray = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { bodyAccessoriesArray: null });
};

/* ------------------------ */
// Get body associated accessories
/* ------------------------ */

const getBodyAssociatedAccessoriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBodyAssociatedAccessoriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('bodyAssociatedAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAssociatedAccessoriesArray: action.bodyAssociatedAccessoriesArray,
    });
  }
  return state;
};
const getBodyAssociatedAccessoriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Accessory (Accessory Page) (tail) */
/* ============================================================================================ */
/* -------------------------- */
/* Create Accessory  */
/* -------------------------- */
const createAccessoryStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createAccessorySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'accessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      accessoriesArray: action.accessoriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Get Accessories  */
/* -------------------------- */
const getAccessoriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getAccessoriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('accessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      accessoriesArray: action.accessoriesArray,
    });
  }
  return state;
};
const getAccessoriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Accessory  */
/* -------------------------- */
const updateAccessoryStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateAccessorySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'accessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      accessoriesArray: action.accessoriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete Accessory  */
/* -------------------------- */
const deleteAccessoryStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteAccessorySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'accessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      accessoriesArray: action.accessoriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Body Make Accessory */
/* ============================================================================================ */
/* -------------------------- */
/* Create Body Make Accessory  */
/* -------------------------- */
const createBodyMakeAccessoryStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBodyMakeAccessorySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyMakeAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyMakeAccessoriesArray: action.bodyMakeAccessoriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createBodyMakeAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Get Body Make Accessories  */
/* -------------------------- */
const getBodyMakeAccessoriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, bodyMakeAccessoriesArray: null });
};
const getBodyMakeAccessoriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('bodyMakeAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyMakeAccessoriesArray: action.bodyMakeAccessoriesArray,
    });
  }
  return state;
};
const getBodyMakeAccessoriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Update Body Make Accessory  */
/* -------------------------- */
const updateBodyMakeAccessoryStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateBodyMakeAccessorySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyMakeAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyMakeAccessoriesArray: action.bodyMakeAccessoriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateBodyMakeAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete Body Make Accessory  */
/* -------------------------- */
const deleteBodyMakeAccessoryStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteBodyMakeAccessorySucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyMakeAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyMakeAccessoriesArray: action.bodyMakeAccessoriesArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteBodyMakeAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* --------------------------------------- */
// Get dimension associated accessories
/* --------------------------------------- */
const getDimensionAssociatedAccessoriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getDimensionAssociatedAccessoriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('dimensionAssociatedAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      dimensionAssociatedAccessoriesArray: action.dimensionAssociatedAccessoriesArray,
    });
  }
  return state;
};
const getDimensionAssociatedAccessoriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* Job Status
/* ============================================================================================ */

/* -------------------------- */
/* Create Job Status  */
/* -------------------------- */
const createJobStatusStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const createJobStatusSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'jobStatusArray' in action) {
    return updateObject(state, {
      loading: false,
      jobStatusArray: action.jobStatusArray,
      successMessage: action.successMessage,
      errorMessage: null,
    });
  }
  return state;
};

const createJobStatusFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* Get Job Status  */
/* -------------------------- */
const getJobStatusStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const getJobStatusSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('jobStatusArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      jobStatusArray: action.jobStatusArray,
    });
  }
  return state;
};

const getJobStatusFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* Update Job Status  */
/* -------------------------- */
const updateJobStatusStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const updateJobStatusSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('jobStatusArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      jobStatusArray: action.jobStatusArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};

const updateJobStatusFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* Delete Job Status  */
/* -------------------------- */
const deleteJobStatusStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const deleteJobStatusSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('jobStatusArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      jobStatusArray: action.jobStatusArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};

const deleteJobStatusFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* Service Types  */
/* -------------------------- */

/* -------------------------- */
/* Create Service Types  */
/* -------------------------- */
const createServiceTypeStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const createServiceTypeSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'serviceTypesArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      successMessage: action.successMessage,
      serviceTypesArray: action.serviceTypesArray,
    });
  }
  return state;
};

const createServiceTypeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* Get Service Types  */
/* -------------------------- */
const getServiceTypesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const getServiceTypesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('serviceTypesArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      serviceTypesArray: action.serviceTypesArray,
    });
  }
  return state;
};

const getServiceTypesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* Update Service Types  */
/* -------------------------- */
const updateServiceTypeStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const updateServiceTypeSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'serviceTypesArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      successMessage: action.successMessage,
      serviceTypesArray: action.serviceTypesArray,
    });
  }
  return state;
};

const updateServiceTypeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* delete Service Types  */
/* -------------------------- */
const deleteServiceTypeStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const deleteServiceTypeSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'serviceTypesArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      successMessage: action.successMessage,
      serviceTypesArray: action.serviceTypesArray,
    });
  }
  return state;
};

const deleteServiceTypeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* Service Task Titles  */
/* -------------------------- */
/* -------------------------- */
/* Create Service Task  */
/* -------------------------- */
const createServiceTaskStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const createServiceTaskSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'serviceTasksArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      successMessage: action.successMessage,
      serviceTasksArray: action.serviceTasksArray,
    });
  }
  return state;
};

const createServiceTaskFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* Get Service Titles  */
/* -------------------------- */
const getServiceTasksStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
    serviceTasksArray: null,
  });
};

const getServiceTasksSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('serviceTasksArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      serviceTasksArray: action.serviceTasksArray,
    });
  }
  return state;
};

const getServiceTasksFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* Update Service Task  */
/* -------------------------- */
const updateServiceTaskStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const updateServiceTaskSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'serviceTasksArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      successMessage: action.successMessage,
      serviceTasksArray: action.serviceTasksArray,
    });
  }
  return state;
};

const updateServiceTaskFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* -------------------------- */
/* delete Service Task  */
/* -------------------------- */
const deleteServiceTaskStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
    errorMessage: null,
  });
};

const deleteServiceTaskSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('successMessage' in action && 'serviceTasksArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      successMessage: action.successMessage,
      serviceTasksArray: action.serviceTasksArray,
    });
  }
  return state;
};

const deleteServiceTaskFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: action.errorMessage,
    });
  }
  return state;
};

/* ============================================================================================ */
/* ============================================================================================ */

const reducer: Reducer<DashboardInitialState, AppActions> = (state = initialState, action) => {
  switch (action.type) {
    // Clear Dashboard State
    case actionTypes.CLEAR_DASHBOARD_STATE:
      return clearDashboardState(state, action);
    /* =================================== */
    // Upload Image(s)
    /* =================================== */
    case actionTypes.UPLOAD_IMAGE_START:
      return uploadImageStart(state, action);
    case actionTypes.UPLOAD_IMAGE_SUCCEED:
      return uploadImageSucceed(state, action);
    case actionTypes.UPLOAD_IMAGE_FAILED:
      return uploadImageFailed(state, action);
    /* =================================== */
    // Delete Image(s)
    /* =================================== */
    case actionTypes.DELETE_UPLOAD_IMAGE_START:
      return deleteUploadImageStart(state, action);
    case actionTypes.DELETE_UPLOAD_IMAGE_SUCCEED:
      return deleteUploadImageSucceed(state, action);
    case actionTypes.DELETE_UPLOAD_IMAGE_FAILED:
      return deleteUploadImageFailed(state, action);

    /* =================================== */
    // Standard charges and fees
    /* =================================== */
    // Get all fees
    case actionTypes.GET_CHARGES_FEES_START:
      return getChargesFeesStart(state, action);
    case actionTypes.GET_CHARGES_FEES_SUCCEED:
      return getChargesFeesSucceed(state, action);
    case actionTypes.GET_CHARGES_FEES_FAILED:
      return getChargesFeesFailed(state, action);
    // Create fees
    case actionTypes.CREATE_CHARGES_FEES_START:
      return createChargesFeesStart(state, action);
    case actionTypes.CREATE_CHARGES_FEES_SUCCEED:
      return createChargesFeesSucceed(state, action);
    case actionTypes.CREATE_CHARGES_FEES_FAILED:
      return createChargesFeesFailed(state, action);
    // Update fees
    case actionTypes.UPDATE_CHARGES_FEES_START:
      return updateChargesFeesStart(state, action);
    case actionTypes.UPDATE_CHARGES_FEES_SUCCEED:
      return updateChargesFeesSucceed(state, action);
    case actionTypes.UPDATE_CHARGES_FEES_FAILED:
      return updateChargesFeesFailed(state, action);
    // Delete fees
    case actionTypes.DELETE_CHARGES_FEES_START:
      return deleteChargesFeesStart(state, action);
    case actionTypes.DELETE_CHARGES_FEES_SUCCEED:
      return deleteChargesFeesSucceed(state, action);
    case actionTypes.DELETE_CHARGES_FEES_FAILED:
      return deleteChargesFeesFailed(state, action);

    /* =================================== */
    // Brand (Make Page) (head)
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
    // Delete brand (head)
    case actionTypes.DELETE_BRAND_START:
      return deleteBrandStart(state, action);
    case actionTypes.DELETE_BRAND_SUCCEED:
      return deleteBrandSucceed(state, action);
    case actionTypes.DELETE_BRAND_FAILED:
      return deleteBrandFailed(state, action);

    /* =================================== */
    // Wheelbase (Make Page) (head)
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
    // Delete wheelbase (head)
    case actionTypes.DELETE_WHEELBASE_START:
      return deleteWheelbaseStart(state, action);
    case actionTypes.DELETE_WHEELBASE_SUCCEED:
      return deleteWheelbaseSucceed(state, action);
    case actionTypes.DELETE_WHEELBASE_FAILED:
      return deleteWheelbaseFailed(state, action);

    /* =================================== */
    // Make  (Make Page) (head)
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
    // Delete make (head)
    case actionTypes.DELETE_MAKE_START:
      return deleteMakeStart(state, action);
    case actionTypes.DELETE_MAKE_SUCCEED:
      return deleteMakeSucceed(state, action);
    case actionTypes.DELETE_MAKE_FAILED:
      return deleteMakeFailed(state, action);

    /* =================================== */
    // Series (Make Page) (head)
    /* =================================== */
    // Get series (make)
    case actionTypes.GET_SERIES_START:
      return getSeriesStart(state, action);
    case actionTypes.GET_SERIES_SUCCEED:
      return getSeriesSucceed(state, action);
    case actionTypes.GET_SERIES_FAILED:
      return getSeriesFailed(state, action);
    // Create series (make)
    case actionTypes.CREATE_SERIES_START:
      return createSeriesStart(state, action);
    case actionTypes.CREATE_SERIES_SUCCEED:
      return createSeriesSucceed(state, action);
    case actionTypes.CREATE_SERIES_FAILED:
      return createSeriesFailed(state, action);
    // Update series (make)
    case actionTypes.UPDATE_SERIES_START:
      return updateSeriesStart(state, action);
    case actionTypes.UPDATE_SERIES_SUCCEED:
      return updateSeriesSucceed(state, action);
    case actionTypes.UPDATE_SERIES_FAILED:
      return updateSeriesFailed(state, action);
    // Delete series (make)
    case actionTypes.DELETE_SERIES_START:
      return deleteSeriesStart(state, action);
    case actionTypes.DELETE_SERIES_SUCCEED:
      return deleteSeriesSucceed(state, action);
    case actionTypes.DELETE_SERIES_FAILED:
      return deleteSeriesFailed(state, action);

    /* =================================== */
    // Make Wheelbase (Make Page) (head)
    /* =================================== */
    // Clear Make wheelbase array
    case actionTypes.CLEAR_MAKEWHEELBASE:
      return clearMakeWheelbase(state, action);
    // Create make Wheelbase (head)
    case actionTypes.CREATE_MAKEWHEELBASE_START:
      return createMakeWheelbaseStart(state, action);
    case actionTypes.CREATE_MAKEWHEELBASE_SUCCEED:
      return createMakeWheelbaseSucceed(state, action);
    case actionTypes.CREATE_MAKEWHEELBASE_FAILED:
      return createMakeWheelbaseFailed(state, action);
    // Get make Wheelbases (head)
    case actionTypes.GET_MAKEWHEELBASES_START:
      return getMakeWheelbasesStart(state, action);
    case actionTypes.GET_MAKEWHEELBASES_SUCCEED:
      return getMakeWheelbasesSucceed(state, action);
    case actionTypes.GET_MAKEWHEELBASES_FAILED:
      return getMakeWheelbasesFailed(state, action);
    // Update make Wheelbase (head)
    case actionTypes.UPDATE_MAKEWHEELBASE_START:
      return updateMakeWheelbaseStart(state, action);
    case actionTypes.UPDATE_MAKEWHEELBASE_SUCCEED:
      return updateMakeWheelbaseSucceed(state, action);
    case actionTypes.UPDATE_MAKEWHEELBASE_FAILED:
      return updateMakeWheelbaseFailed(state, action);
    // Delete make Wheelbase (head)
    case actionTypes.DELETE_MAKEWHEELBASE_START:
      return deleteMakeWheelbaseStart(state, action);
    case actionTypes.DELETE_MAKEWHEELBASE_SUCCEED:
      return deleteMakeWheelbaseSucceed(state, action);
    case actionTypes.DELETE_MAKEWHEELBASE_FAILED:
      return deleteMakeWheelbaseFailed(state, action);

    /* =================================== */
    // Body (Body Page) (tail)
    /* =================================== */
    // Get all bodies (tail)
    case actionTypes.GET_BODIES_START:
      return getBodiesStart(state, action);
    case actionTypes.GET_BODIES_SUCCEED:
      return getBodiesSucceed(state, action);
    case actionTypes.GET_BODIES_FAILED:
      return getBodiesFailed(state, action);
    // Create body (tail)
    case actionTypes.CREATE_BODY_START:
      return createBodyStart(state, action);
    case actionTypes.CREATE_BODY_SUCCEED:
      return createBodySucceed(state, action);
    case actionTypes.CREATE_BODY_FAILED:
      return createBodyFailed(state, action);
    // Update body (tail)
    case actionTypes.UPDATE_BODY_START:
      return updateBodyStart(state, action);
    case actionTypes.UPDATE_BODY_SUCCEED:
      return updateBodySucceed(state, action);
    case actionTypes.UPDATE_BODY_FAILED:
      return updateBodyFailed(state, action);
    // Delete body (tail)
    case actionTypes.DELETE_BODY_START:
      return deleteBodyStart(state, action);
    case actionTypes.DELETE_BODY_SUCCEED:
      return deleteBodySucceed(state, action);
    case actionTypes.DELETE_BODY_FAILED:
      return deleteBodyFailed(state, action);

    /* =================================== */
    //  Body Accessory (Body Page)(tail)
    /* =================================== */
    // Get all Accessories (tail)
    case actionTypes.GET_BODYACCESSORIES_START:
      return getBodyAccessoriesStart(state, action);
    case actionTypes.GET_BODYACCESSORIES_SUCCEED:
      return getBodyAccessoriesSucceed(state, action);
    case actionTypes.GET_BODYACCESSORIES_FAILED:
      return getBodyAccessoriesFailed(state, action);
    // Create body Accessory (tail)
    case actionTypes.CREATE_BODYACCESSORY_START:
      return createBodyAccessoryStart(state, action);
    case actionTypes.CREATE_BODYACCESSORY_SUCCEED:
      return createBodyAccessorySucceed(state, action);
    case actionTypes.CREATE_BODYACCESSORY_FAILED:
      return createBodyAccessoryFailed(state, action);
    // Update body Accessory (tail)
    case actionTypes.UPDATE_BODYACCESSORY_START:
      return updateBodyAccessoryStart(state, action);
    case actionTypes.UPDATE_BODYACCESSORY_SUCCEED:
      return updateBodyAccessorySucceed(state, action);
    case actionTypes.UPDATE_BODYACCESSORY_FAILED:
      return updateBodyAccessoryFailed(state, action);
    // Delete body Accessory (tail)
    case actionTypes.DELETE_BODYACCESSORY_START:
      return deleteBodyAccessoryStart(state, action);
    case actionTypes.DELETE_BODYACCESSORY_SUCCEED:
      return deleteBodyAccessorySucceed(state, action);
    case actionTypes.DELETE_BODYACCESSORY_FAILED:
      return deleteBodyAccessoryFailed(state, action);
    // clear body accessory array
    case actionTypes.CLEAR_BODYACCESSORY_ARRAY:
      return clearBodyAccessoryArray(state, action);
    // Get body associated accessories (tail)
    case actionTypes.GET_BODYASSOCIATED_ACCESSORIES_START:
      return getBodyAssociatedAccessoriesStart(state, action);
    case actionTypes.GET_BODYASSOCIATED_ACCESSORIES_SUCCEED:
      return getBodyAssociatedAccessoriesSucceed(state, action);
    case actionTypes.GET_BODYASSOCIATED_ACCESSORIES_FAILED:
      return getBodyAssociatedAccessoriesFailed(state, action);

    /* =================================== */
    // Length (Body Page) (tail)
    /* =================================== */
    // Get all lengths (tail)
    case actionTypes.GET_LENGTHS_START:
      return getLengthsStart(state, action);
    case actionTypes.GET_LENGTHS_SUCCEED:
      return getLengthsSucceed(state, action);
    case actionTypes.GET_LENGTHS_FAILED:
      return getLengthsFailed(state, action);
    // Create length (tail)
    case actionTypes.CREATE_LENGTH_START:
      return createLengthStart(state, action);
    case actionTypes.CREATE_LENGTH_SUCCEED:
      return createLengthSucceed(state, action);
    case actionTypes.CREATE_LENGTH_FAILED:
      return createLengthFailed(state, action);
    // Update length (tail)
    case actionTypes.UPDATE_LENGTH_START:
      return updateLengthStart(state, action);
    case actionTypes.UPDATE_LENGTH_SUCCEED:
      return updateLengthSucceed(state, action);
    case actionTypes.UPDATE_LENGTH_FAILED:
      return updateLengthFailed(state, action);
    // Delete length (tail)
    case actionTypes.DELETE_LENGTH_START:
      return deleteLengthStart(state, action);
    case actionTypes.DELETE_LENGTH_SUCCEED:
      return deleteLengthSucceed(state, action);
    case actionTypes.DELETE_LENGTH_FAILED:
      return deleteLengthFailed(state, action);

    /* =================================== */
    //  Body Make (Body Page)(tail)
    /* =================================== */
    // Get all body makes (tail)
    case actionTypes.GET_BODYMAKES_START:
      return getBodyMakesStart(state, action);
    case actionTypes.GET_BODYMAKES_SUCCEED:
      return getBodyMakesSucceed(state, action);
    case actionTypes.GET_BODYMAKES_FAILED:
      return getBodyMakesFailed(state, action);
    // Create body make (tail)
    case actionTypes.CREATE_BODYMAKE_START:
      return createBodyMakeStart(state, action);
    case actionTypes.CREATE_BODYMAKE_SUCCEED:
      return createBodyMakeSucceed(state, action);
    case actionTypes.CREATE_BODYMAKE_FAILED:
      return createBodyMakeFailed(state, action);
    // Update body make (tail)
    case actionTypes.UPDATE_BODYMAKE_START:
      return updateBodyMakeStart(state, action);
    case actionTypes.UPDATE_BODYMAKE_SUCCEED:
      return updateBodyMakeSucceed(state, action);
    case actionTypes.UPDATE_BODYMAKE_FAILED:
      return updateBodyMakeFailed(state, action);
    // Delete body make (tail)
    case actionTypes.DELETE_BODYMAKE_START:
      return deleteBodyMakeStart(state, action);
    case actionTypes.DELETE_BODYMAKE_SUCCEED:
      return deleteBodyMakeSucceed(state, action);
    case actionTypes.DELETE_BODYMAKE_FAILED:
      return deleteBodyMakeFailed(state, action);

    /* =================================== */
    //  Body Make Accessory
    /* =================================== */
    // Get all body make accessories
    case actionTypes.GET_BODYMAKE_ACCESSORIES_START:
      return getBodyMakeAccessoriesStart(state, action);
    case actionTypes.GET_BODYMAKE_ACCESSORIES_SUCCEED:
      return getBodyMakeAccessoriesSucceed(state, action);
    case actionTypes.GET_BODYMAKE_ACCESSORIES_FAILED:
      return getBodyMakeAccessoriesFailed(state, action);
    // Create body make accessory
    case actionTypes.CREATE_BODYMAKE_ACCESSORY_START:
      return createBodyMakeAccessoryStart(state, action);
    case actionTypes.CREATE_BODYMAKE_ACCESSORY_SUCCEED:
      return createBodyMakeAccessorySucceed(state, action);
    case actionTypes.CREATE_BODYMAKE_ACCESSORY_FAILED:
      return createBodyMakeAccessoryFailed(state, action);
    // Update body make accessory
    case actionTypes.UPDATE_BODYMAKE_ACCESSORY_START:
      return updateBodyMakeAccessoryStart(state, action);
    case actionTypes.UPDATE_BODYMAKE_ACCESSORY_SUCCEED:
      return updateBodyMakeAccessorySucceed(state, action);
    case actionTypes.UPDATE_BODYMAKE_ACCESSORY_FAILED:
      return updateBodyMakeAccessoryFailed(state, action);
    // Delete body make accessory
    case actionTypes.DELETE_BODYMAKE_ACCESSORY_START:
      return deleteBodyMakeAccessoryStart(state, action);
    case actionTypes.DELETE_BODYMAKE_ACCESSORY_SUCCEED:
      return deleteBodyMakeAccessorySucceed(state, action);
    case actionTypes.DELETE_BODYMAKE_ACCESSORY_FAILED:
      return deleteBodyMakeAccessoryFailed(state, action);
    // Get dimension associated accessories
    case actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES_START:
      return getDimensionAssociatedAccessoriesStart(state, action);
    case actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES_SUCCEED:
      return getDimensionAssociatedAccessoriesSucceed(state, action);
    case actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES_FAILED:
      return getDimensionAssociatedAccessoriesFailed(state, action);

    /* =================================== */
    //  Accessory (Accessory Page)(tail)
    /* =================================== */
    // Get all accessories (tail)
    case actionTypes.GET_ACCESSORIES_START:
      return getAccessoriesStart(state, action);
    case actionTypes.GET_ACCESSORIES_SUCCEED:
      return getAccessoriesSucceed(state, action);
    case actionTypes.GET_ACCESSORIES_FAILED:
      return getAccessoriesFailed(state, action);
    // Create accessory (tail)
    case actionTypes.CREATE_ACCESSORY_START:
      return createAccessoryStart(state, action);
    case actionTypes.CREATE_ACCESSORY_SUCCEED:
      return createAccessorySucceed(state, action);
    case actionTypes.CREATE_ACCESSORY_FAILED:
      return createAccessoryFailed(state, action);
    // Update accessory (tail)
    case actionTypes.UPDATE_ACCESSORY_START:
      return updateAccessoryStart(state, action);
    case actionTypes.UPDATE_ACCESSORY_SUCCEED:
      return updateAccessorySucceed(state, action);
    case actionTypes.UPDATE_ACCESSORY_FAILED:
      return updateAccessoryFailed(state, action);
    // Delete accessory (tail)
    case actionTypes.DELETE_ACCESSORY_START:
      return deleteAccessoryStart(state, action);
    case actionTypes.DELETE_ACCESSORY_SUCCEED:
      return deleteAccessorySucceed(state, action);
    case actionTypes.DELETE_ACCESSORY_FAILED:
      return deleteAccessoryFailed(state, action);

    /* =================================== */
    //  Job Status
    /* =================================== */
    // Get all Job Status
    case actionTypes.GET_JOBSTATUS_START:
      return getJobStatusStart(state, action);
    case actionTypes.GET_JOBSTATUS_SUCCEED:
      return getJobStatusSucceed(state, action);
    case actionTypes.GET_JOBSTATUS_FAILED:
      return getJobStatusFailed(state, action);
    // Create Job Status
    case actionTypes.CREATE_JOBSTATUS_START:
      return createJobStatusStart(state, action);
    case actionTypes.CREATE_JOBSTATUS_SUCCEED:
      return createJobStatusSucceed(state, action);
    case actionTypes.CREATE_JOBSTATUS_FAILED:
      return createJobStatusFailed(state, action);
    // Update JobStatus
    case actionTypes.UPDATE_JOBSTATUS_START:
      return updateJobStatusStart(state, action);
    case actionTypes.UPDATE_JOBSTATUS_SUCCEED:
      return updateJobStatusSucceed(state, action);
    case actionTypes.UPDATE_JOBSTATUS_FAILED:
      return updateJobStatusFailed(state, action);
    // Delete JobStatus
    case actionTypes.DELETE_JOBSTATUS_START:
      return deleteJobStatusStart(state, action);
    case actionTypes.DELETE_JOBSTATUS_SUCCEED:
      return deleteJobStatusSucceed(state, action);
    case actionTypes.DELETE_JOBSTATUS_FAILED:
      return deleteJobStatusFailed(state, action);

    /* =================================== */
    //  Service types
    /* =================================== */
    // Get all ServiceTypes
    case actionTypes.GET_SERVICETYPES_START:
      return getServiceTypesStart(state, action);
    case actionTypes.GET_SERVICETYPES_SUCCEED:
      return getServiceTypesSucceed(state, action);
    case actionTypes.GET_SERVICETYPES_FAILED:
      return getServiceTypesFailed(state, action);
    // Create ServiceTypes
    case actionTypes.CREATE_SERVICETYPE_START:
      return createServiceTypeStart(state, action);
    case actionTypes.CREATE_SERVICETYPE_SUCCEED:
      return createServiceTypeSucceed(state, action);
    case actionTypes.CREATE_SERVICETYPE_FAILED:
      return createServiceTypeFailed(state, action);
    // Update ServiceTypes
    case actionTypes.UPDATE_SERVICETYPE_START:
      return updateServiceTypeStart(state, action);
    case actionTypes.UPDATE_SERVICETYPE_SUCCEED:
      return updateServiceTypeSucceed(state, action);
    case actionTypes.UPDATE_SERVICETYPE_FAILED:
      return updateServiceTypeFailed(state, action);
    // Delete ServiceTypes
    case actionTypes.DELETE_SERVICETYPE_START:
      return deleteServiceTypeStart(state, action);
    case actionTypes.DELETE_SERVICETYPE_SUCCEED:
      return deleteServiceTypeSucceed(state, action);
    case actionTypes.DELETE_SERVICETYPE_FAILED:
      return deleteServiceTypeFailed(state, action);

    /* =================================== */
    //  Task Title
    /* =================================== */
    // Get all task title
    case actionTypes.GET_SERVICE_TASKS_START:
      return getServiceTasksStart(state, action);
    case actionTypes.GET_SERVICE_TASKS_SUCCEED:
      return getServiceTasksSucceed(state, action);
    case actionTypes.GET_SERVICE_TASKS_FAILED:
      return getServiceTasksFailed(state, action);
    // Create task title
    case actionTypes.CREATE_SERVICE_TASK_START:
      return createServiceTaskStart(state, action);
    case actionTypes.CREATE_SERVICE_TASK_SUCCEED:
      return createServiceTaskSucceed(state, action);
    case actionTypes.CREATE_SERVICE_TASK_FAILED:
      return createServiceTaskFailed(state, action);
    // Update task title
    case actionTypes.UPDATE_SERVICE_TASK_START:
      return updateServiceTaskStart(state, action);
    case actionTypes.UPDATE_SERVICE_TASK_SUCCEED:
      return updateServiceTaskSucceed(state, action);
    case actionTypes.UPDATE_SERVICE_TASK_FAILED:
      return updateServiceTaskFailed(state, action);
    // Delete task title
    case actionTypes.DELETE_SERVICE_TASK_START:
      return deleteServiceTaskStart(state, action);
    case actionTypes.DELETE_SERVICE_TASK_SUCCEED:
      return deleteServiceTaskSucceed(state, action);
    case actionTypes.DELETE_SERVICE_TASK_FAILED:
      return deleteServiceTaskFailed(state, action);
    default:
      return state;
  }
};

export default reducer;

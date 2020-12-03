import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { DashboardActionTypes, DashboardInitialState } from 'src/store/types/dashboard';
import { AppActions } from 'src/store/types';

const initialState: DashboardInitialState = {
  loading: false,
  // makes
  makeObj: null,
  makesArray: null,
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
  // body accessory length
  bodyAccessoryObj: null,
  bodyAccessoriesArray: null,
  // accessory
  accessoryObj: null,
  accessoriesArray: null,
  // images array
  imagesArray: null,
  imagesUploaded: false, //boolean to keep track of whether the image has uploaded successful
  // others
  errorMessage: null,
  successMessage: null,
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
  if ('imagesArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      imagesArray: action.imagesArray,
      imagesUploaded: true,
    });
  }
};
const uploadImageFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false, imagesUploaded: false });
  }
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
};
const deleteUploadImageFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const createBrandFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const getBrandsFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const updateBrandFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const createWheelbaseFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const getWheelbasesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const updateWheelbaseFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const getMakesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const createMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const updateMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/*  Series (Make Page) */
/* ============================================================================================ */

/* -------------------------- */
/* Get Series  */
/* -------------------------- */
const getSeriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null });
};
const getSeriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('seriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,

      seriesArray: action.seriesArray,
    });
  }
};
const getSeriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage });
  }
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
};
const createBodyFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const getBodiesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const updateBodyFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const deleteBodyFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const createLengthFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const getLengthsFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const updateLengthFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const deleteLengthFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const createBodyMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const getBodyMakesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const updateBodyMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const deleteBodyMakeFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const createBodyAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Get Body Accessories  */
/* -------------------------- */
const getBodyAccessoriesStart = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBodyAccessoriesSucceed = (state: DashboardInitialState, action: AppActions) => {
  if ('bodyAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAccessoriesArray: action.bodyAccessoriesArray,
    });
  }
};
const getBodyAccessoriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const updateBodyAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const deleteBodyAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ------------------------ */
// Clear body accessory array
/* ------------------------ */
const clearBodyAccessoryArray = (state: DashboardInitialState, _action: AppActions) => {
  return updateObject(state, { bodyAccessoriesArray: null });
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
};
const createAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const getAccessoriesFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
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
};
const updateAccessoryFailed = (state: DashboardInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* ============================================================================================ */

const reducer = (state = initialState, action: DashboardActionTypes) => {
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
    // Get series (make)
    case actionTypes.GET_SERIES_START:
      return getSeriesStart(state, action);
    case actionTypes.GET_SERIES_SUCCEED:
      return getSeriesSucceed(state, action);
    case actionTypes.GET_SERIES_FAILED:
      return getSeriesFailed(state, action);
    // Update make (head)
    case actionTypes.UPDATE_MAKE_START:
      return updateMakeStart(state, action);
    case actionTypes.UPDATE_MAKE_SUCCEED:
      return updateMakeSucceed(state, action);
    case actionTypes.UPDATE_MAKE_FAILED:
      return updateMakeFailed(state, action);

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

    default:
      return state;
  }
};

export default reducer;

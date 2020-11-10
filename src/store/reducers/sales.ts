import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { SalesActionTypes, SalesInitialState } from 'src/store/types/sales';
import { AppActions } from 'src/store/types';

const initialState: SalesInitialState = {
  loading: false,
  // makes
  makeObj: null,
  makesArray: null,
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
  // body length
  bodyLengthObj: null,
  bodyLengthsArray: null,
  // body accessory length
  bodyAccessoryObj: null,
  bodyAccessoriesArray: null,
  // accessory
  accessoryObj: null,
  accessoriesArray: null,
  // others
  errorMessage: null,
  successMessage: null,
};

/* ============================================================================================ */
// Clear Sales State - reset the states
/* ============================================================================================ */
const clearSalesState = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { loading: false, errorMessage: null, successMessage: null });
};

/* ============================================================================================ */
/*   Upload Image(s)
/* ============================================================================================ */

const uploadImageStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const uploadImageSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'brandsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      brandsArray: action.brandsArray,
      successMessage: action.successMessage,
    });
  }
};
const uploadImageFailed = (state: SalesInitialState, action: AppActions) => {
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
const createBrandStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBrandSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'brandsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      brandsArray: action.brandsArray,
      successMessage: action.successMessage,
    });
  }
};
const createBrandFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Get all Brands  */
/* -------------------------- */
const getBrandsStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBrandsSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('brandsArray' in action) {
    return updateObject(state, { errorMessage: null, loading: false, brandsArray: action.brandsArray });
  }
};
const getBrandsFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Brand  */
/* -------------------------- */
const updateBrandStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateBrandSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('brandsArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      brandsArray: action.brandsArray,
      successMessage: action.successMessage,
    });
  }
};
const updateBrandFailed = (state: SalesInitialState, action: AppActions) => {
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
const createWheelbaseStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createWheelbaseSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'wheelbasesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      wheelbasesArray: action.wheelbasesArray,
      successMessage: action.successMessage,
    });
  }
};
const createWheelbaseFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Get Wheelbases */
/* -------------------------- */
const getWheelbasesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getWheelbasesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('wheelbasesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      wheelbasesArray: action.wheelbasesArray,
    });
  }
};
const getWheelbasesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Wheelbase  */
/* -------------------------- */
const updateWheelbaseStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateWheelbaseSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('wheelbasesArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      wheelbasesArray: action.wheelbasesArray,
      successMessage: action.successMessage,
    });
  }
};
const updateWheelbaseFailed = (state: SalesInitialState, action: AppActions) => {
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
const getMakesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getMakesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('makesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makesArray: action.makesArray,
    });
  }
};
const getMakesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Create Make  */
/* -------------------------- */
const createMakeStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createMakeSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'makesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makesArray: action.makesArray,
      successMessage: action.successMessage,
    });
  }
};
const createMakeFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Make  */
/* -------------------------- */
const updateMakeStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateMakeSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'makesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      makesArray: action.makesArray,
      successMessage: action.successMessage,
    });
  }
};
const updateMakeFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/*  Body (Make Page) (tail) */
/* ============================================================================================ */

/* -------------------------- */
/* Create Body  */
/* -------------------------- */
const createBodyStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBodySucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodiesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodiesArray: action.bodiesArray,
      successMessage: action.successMessage,
    });
  }
};
const createBodyFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};
/* -------------------------- */
/* Get Bodies  */
/* -------------------------- */
const getBodiesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBodiesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('bodiesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodiesArray: action.bodiesArray,
    });
  }
};
const getBodiesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Body  */
/* -------------------------- */
const updateBodyStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateBodySucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodiesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodiesArray: action.bodiesArray,
      successMessage: action.successMessage,
    });
  }
};
const updateBodyFailed = (state: SalesInitialState, action: AppActions) => {
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
const createLengthStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createLengthSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'lengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      lengthsArray: action.lengthsArray,
      successMessage: action.successMessage,
    });
  }
};
const createLengthFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};
/* -------------------------- */
/* Get Lengths  */
/* -------------------------- */
const getLengthsStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getLengthsSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('lengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      lengthsArray: action.lengthsArray,
    });
  }
};
const getLengthsFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Length  */
/* -------------------------- */
const updateLengthStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateLengthSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'lengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      lengthsArray: action.lengthsArray,
      successMessage: action.successMessage,
    });
  }
};
const updateLengthFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* Body Length (Body Page) (tail) */
/* ============================================================================================ */
/* -------------------------- */
/* Create Body Length  */
/* -------------------------- */
const createBodyLengthStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBodyLengthSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyLengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyLengthsArray: action.bodyLengthsArray,
      successMessage: action.successMessage,
    });
  }
};
const createBodyLengthFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Get Body Lengths  */
/* -------------------------- */
const getBodyLengthsStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBodyLengthsSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('bodyLengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyLengthsArray: action.bodyLengthsArray,
    });
  }
};
const getBodyLengthsFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Body Length  */
/* -------------------------- */
const updateBodyLengthStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateBodyLengthSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyLengthsArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyLengthsArray: action.bodyLengthsArray,
      successMessage: action.successMessage,
    });
  }
};
const updateBodyLengthFailed = (state: SalesInitialState, action: AppActions) => {
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
const createBodyAccessoryStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createBodyAccessorySucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAccessoriesArray: action.bodyAccessoriesArray,
      successMessage: action.successMessage,
    });
  }
};
const createBodyAccessoryFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Get Body Accessories  */
/* -------------------------- */
const getBodyAccessoriesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getBodyAccessoriesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('bodyAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAccessoriesArray: action.bodyAccessoriesArray,
    });
  }
};
const getBodyAccessoriesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Body Accessory  */
/* -------------------------- */
const updateBodyAccessoryStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateBodyAccessorySucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'bodyAccessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      bodyAccessoriesArray: action.bodyAccessoriesArray,
      successMessage: action.successMessage,
    });
  }
};
const updateBodyAccessoryFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* Accessory (Accessory Page) (tail) */
/* ============================================================================================ */
/* -------------------------- */
/* Create Accessory  */
/* -------------------------- */
const createAccessoryStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createAccessorySucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'accessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      accessoriesArray: action.accessoriesArray,
      successMessage: action.successMessage,
    });
  }
};
const createAccessoryFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Get Accessories  */
/* -------------------------- */
const getAccessoriesStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getAccessoriesSucceed = (state: SalesInitialState, action: AppActions) => {
  if ('accessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      accessoriesArray: action.accessoriesArray,
    });
  }
};
const getAccessoriesFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* -------------------------- */
/* Update Accessory  */
/* -------------------------- */
const updateAccessoryStart = (state: SalesInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateAccessorySucceed = (state: SalesInitialState, action: AppActions) => {
  if ('successMessage' in action && 'accessoriesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      accessoriesArray: action.accessoriesArray,
      successMessage: action.successMessage,
    });
  }
};
const updateAccessoryFailed = (state: SalesInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
};

/* ============================================================================================ */
/* ============================================================================================ */

const reducer = (state = initialState, action: SalesActionTypes) => {
  switch (action.type) {
    // Clear Sales State
    case actionTypes.CLEAR_SALES_STATE:
      return clearSalesState(state, action);
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

    /* =================================== */
    //  Body Length (Body Page)(tail)
    /* =================================== */
    // Get all body lengths (tail)
    case actionTypes.GET_BODYLENGTHS_START:
      return getBodyLengthsStart(state, action);
    case actionTypes.GET_BODYLENGTHS_SUCCEED:
      return getBodyLengthsSucceed(state, action);
    case actionTypes.GET_BODYLENGTHS_FAILED:
      return getBodyLengthsFailed(state, action);
    // Create body length (tail)
    case actionTypes.CREATE_BODYLENGTH_START:
      return createBodyLengthStart(state, action);
    case actionTypes.CREATE_BODYLENGTH_SUCCEED:
      return createBodyLengthSucceed(state, action);
    case actionTypes.CREATE_BODYLENGTH_FAILED:
      return createBodyLengthFailed(state, action);
    // Update body length (tail)
    case actionTypes.UPDATE_BODYLENGTH_START:
      return updateBodyLengthStart(state, action);
    case actionTypes.UPDATE_BODYLENGTH_SUCCEED:
      return updateBodyLengthSucceed(state, action);
    case actionTypes.UPDATE_BODYLENGTH_FAILED:
      return updateBodyLengthFailed(state, action);

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

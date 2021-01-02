import * as actionTypes from 'src/store/actions/actionTypes';
import {
  TCreateMakeData,
  TReceivedBrandObj,
  TReceivedMakeObj,
  TReceivedMakeWheelbaseObj,
  TReceivedSeriesObj,
  TReceivedWheelbaseObj,
  TUpdateMakeData,
} from 'src/store/types/dashboard';

/* =============================================================================================== */
// Brand (Make Page)
/* =============================================================================================== */
/* --------------------------------------------------------- */
// Create Brand
/* --------------------------------------------------------- */
/*  Api call */
export interface CreateBrandAction {
  type: typeof actionTypes.CREATE_BRAND;
  title: string;
  description: string;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/*  States */
export interface CreateBrandStartAction {
  type: typeof actionTypes.CREATE_BRAND_START;
}
export interface CreateBrandSucceedAction {
  type: typeof actionTypes.CREATE_BRAND_SUCCEED;
  brandsArray: TReceivedBrandObj[];
  successMessage: string;
}
export interface CreateBrandFailedAction {
  type: typeof actionTypes.CREATE_BRAND_FAILED;
  errorMessage: string;
}
/* --------------------------------------------------------- */
// Update Brand
/* --------------------------------------------------------- */
/*  Api call */
export interface UpdateBrandAction {
  type: typeof actionTypes.UPDATE_BRAND;
  brand_id: number;
  title: string;
  description: string;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/*  States */
export interface UpdateBrandStartAction {
  type: typeof actionTypes.UPDATE_BRAND_START;
}
export interface UpdateBrandSucceedAction {
  type: typeof actionTypes.UPDATE_BRAND_SUCCEED;
  brandsArray: TReceivedBrandObj[];
  successMessage: string;
}
export interface UpdateBrandFailedAction {
  type: typeof actionTypes.UPDATE_BRAND_FAILED;
  errorMessage: string;
}

/* --------------------------------------------------------- */
// Delete Brand
/* --------------------------------------------------------- */

/* Api call */
export interface DeleteBrandAction {
  type: typeof actionTypes.DELETE_BRAND;
  brand_id: number;
}
/* States */
export interface DeleteBrandStartAction {
  type: typeof actionTypes.DELETE_BRAND_START;
}
export interface DeleteBrandSucceedAction {
  type: typeof actionTypes.DELETE_BRAND_SUCCEED;
  brandsArray: TReceivedBrandObj[];
  successMessage: string;
}
export interface DeleteBrandFailedAction {
  type: typeof actionTypes.DELETE_BRAND_FAILED;
  errorMessage: string;
}

/* --------------------------------------------------------- */
// Get All Brands
/* --------------------------------------------------------- */

/* Api call */
export interface GetBrandsAction {
  type: typeof actionTypes.GET_BRANDS;
}
/* States */
export interface GetBrandsStartAction {
  type: typeof actionTypes.GET_BRANDS_START;
}
export interface GetBrandsSucceedAction {
  type: typeof actionTypes.GET_BRANDS_SUCCEED;
  brandsArray: TReceivedBrandObj[];
}
export interface GetBrandsFailedAction {
  type: typeof actionTypes.GET_BRANDS_FAILED;
  errorMessage: string;
}

/* =============================================================================================== */
// Wheelbase (Make Page)
/* =============================================================================================== */
/* --------------------------------------------------------- */
// Create Wheelbase
/* --------------------------------------------------------- */
/* Api call */
export interface CreateWheelbaseAction {
  type: typeof actionTypes.CREATE_WHEELBASE;
  title: string;
  description: string;
}

/* States */
export interface CreateWheelbaseStartAction {
  type: typeof actionTypes.CREATE_WHEELBASE_START;
}

export interface CreateWheelbaseSucceedAction {
  type: typeof actionTypes.CREATE_WHEELBASE_SUCCEED;
  wheelbasesArray: TReceivedWheelbaseObj[];
  successMessage: string;
}
export interface CreateWheelbaseFailedAction {
  type: typeof actionTypes.CREATE_WHEELBASE_FAILED;
  errorMessage: string;
}

/* --------------------------------------------------------- */
// Get Wheelbases
/* --------------------------------------------------------- */
/* Api call */
export interface GetWheelbasesAction {
  type: typeof actionTypes.GET_WHEELBASES;
}

/* States */
export interface GetWheelbasesStartAction {
  type: typeof actionTypes.GET_WHEELBASES_START;
}

export interface GetWheelbasesSucceedAction {
  type: typeof actionTypes.GET_WHEELBASES_SUCCEED;
  wheelbasesArray: TReceivedWheelbaseObj[];
}
export interface GetWheelbasesFailedAction {
  type: typeof actionTypes.GET_WHEELBASES_FAILED;
  errorMessage: string;
}

/* --------------------------------------------------------- */
// Update Wheelbase
/* --------------------------------------------------------- */
/* Api call */
export interface UpdateWheelbaseAction {
  type: typeof actionTypes.UPDATE_WHEELBASE;
  wheelbase_id: number;
  title: string;
  description: string;
}

/* States */
export interface UpdateWheelbaseStartAction {
  type: typeof actionTypes.UPDATE_WHEELBASE_START;
}

export interface UpdateWheelbaseSucceedAction {
  type: typeof actionTypes.UPDATE_WHEELBASE_SUCCEED;
  wheelbasesArray: TReceivedWheelbaseObj[];
  successMessage: string;
}
export interface UpdateWheelbaseFailedAction {
  type: typeof actionTypes.UPDATE_WHEELBASE_FAILED;
  errorMessage: string;
}

/* ================================================================================================= */
//  Make (Make Page)
/* ================================================================================================= */

/* --------------------------------------------------------- */
// Create Make
/* --------------------------------------------------------- */
/*  Api call */
export interface CreateMakeAction {
  type: typeof actionTypes.CREATE_MAKE;
  createMakeData: TCreateMakeData;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/*  States */
export interface CreateMakeStartAction {
  type: typeof actionTypes.CREATE_MAKE_START;
}
export interface CreateMakeSucceedAction {
  type: typeof actionTypes.CREATE_MAKE_SUCCEED;
  makesArray: TReceivedMakeObj[];
  successMessage: string;
}
export interface CreateMakeFailedAction {
  type: typeof actionTypes.CREATE_MAKE_FAILED;
  errorMessage: string;
}
/* --------------------------------------------------------- */
// Get Makes
/* --------------------------------------------------------- */

/*  Api call */
export interface GetMakesAction {
  type: typeof actionTypes.GET_MAKES;
}
/*  States */
export interface GetMakesStartAction {
  type: typeof actionTypes.GET_MAKES_START;
}
export interface GetMakesSucceedAction {
  type: typeof actionTypes.GET_MAKES_SUCCEED;
  makesArray: TReceivedMakeObj[];
}
export interface GetMakesFailedAction {
  type: typeof actionTypes.GET_MAKES_FAILED;
  errorMessage: string;
}
/* --------------------------------------------------------- */
// Update Make
/* --------------------------------------------------------- */
/*  Api call */
export interface UpdateMakeAction {
  type: typeof actionTypes.UPDATE_MAKE;
  updateMakeData: TUpdateMakeData;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/*  States */
export interface UpdateMakeStartAction {
  type: typeof actionTypes.UPDATE_MAKE_START;
}
export interface UpdateMakeSucceedAction {
  type: typeof actionTypes.UPDATE_MAKE_SUCCEED;
  makesArray: TReceivedMakeObj[];
  successMessage: string;
}
export interface UpdateMakeFailedAction {
  type: typeof actionTypes.UPDATE_MAKE_FAILED;
  errorMessage: string;
}

/* ============================================================================================== */
//  Series (Make Page)
/* ============================================================================================== */
/* --------------------------------------------------------- */
// Get Series (Make)
/* --------------------------------------------------------- */

/*  Api call */
export interface GetSeriesAction {
  type: typeof actionTypes.GET_SERIES;
  brand_id: number;
}
/*  States */
export interface GetSeriesStartAction {
  type: typeof actionTypes.GET_SERIES_START;
}
export interface GetSeriesSucceedAction {
  type: typeof actionTypes.GET_SERIES_SUCCEED;
  seriesArray: TReceivedSeriesObj[];
}
export interface GetSeriesFailedAction {
  type: typeof actionTypes.GET_SERIES_FAILED;
  errorMessage: string;
}

/* ============================================================================================== */
//  Make Wheelbase (Make Page)
/* ============================================================================================== */
/* --------------------------------------------------------- */
// Create Make Wheelbase
/* --------------------------------------------------------- */
/*  Api call */
export interface CreateMakeWheelbaseAction {
  type: typeof actionTypes.CREATE_MAKEWHEELBASE;
  make_id: number;
  wheelbase_id: number;
}
/*  States */
export interface CreateMakeWheelbaseStartAction {
  type: typeof actionTypes.CREATE_MAKEWHEELBASE_START;
}
export interface CreateMakeWheelbaseSucceedAction {
  type: typeof actionTypes.CREATE_MAKEWHEELBASE_SUCCEED;
  makeWheelbasesArray: TReceivedMakeWheelbaseObj[];
  successMessage: string;
}
export interface CreateMakeWheelbaseFailedAction {
  type: typeof actionTypes.CREATE_MAKEWHEELBASE_FAILED;
  errorMessage: string;
}
/* --------------------------------------------------------- */
// Get Make Wheelbases
/* --------------------------------------------------------- */
/*  Api call */
export interface GetMakeWheelbasesAction {
  type: typeof actionTypes.GET_MAKEWHEELBASES;
  make_id: number;
}
/*  States */
export interface GetMakeWheelbasesStartAction {
  type: typeof actionTypes.GET_MAKEWHEELBASES_START;
}
export interface GetMakeWheelbasesSucceedAction {
  type: typeof actionTypes.GET_MAKEWHEELBASES_SUCCEED;
  makeWheelbasesArray: TReceivedMakeWheelbaseObj[];
}
export interface GetMakeWheelbasesFailedAction {
  type: typeof actionTypes.GET_MAKEWHEELBASES_FAILED;
  errorMessage: string;
}
/* --------------------------------------------------------- */
// Update Make Wheelbase
/* --------------------------------------------------------- */
/*  Api call */
export interface UpdateMakeWheelbaseAction {
  type: typeof actionTypes.UPDATE_MAKEWHEELBASE;
  make_wheelbase_id: number;
  make_id: number;
  wheelbase_id: number;
}
/*  States */
export interface UpdateMakeWheelbaseStartAction {
  type: typeof actionTypes.UPDATE_MAKEWHEELBASE_START;
}
export interface UpdateMakeWheelbaseSucceedAction {
  type: typeof actionTypes.UPDATE_MAKEWHEELBASE_SUCCEED;
  makeWheelbasesArray: TReceivedMakeWheelbaseObj[];
  successMessage: string;
}
export interface UpdateMakeWheelbaseFailedAction {
  type: typeof actionTypes.UPDATE_MAKEWHEELBASE_FAILED;
  errorMessage: string;
}
/* --------------------------------------------------------- */
// Delete Make Wheelbase
/* --------------------------------------------------------- */
/*  Api call */
export interface DeleteMakeWheelbaseAction {
  type: typeof actionTypes.DELETE_MAKEWHEELBASE;
  make_id: number;
  make_wheelbase_id: number;
}
/*  States */
export interface DeleteMakeWheelbaseStartAction {
  type: typeof actionTypes.DELETE_MAKEWHEELBASE_START;
}
export interface DeleteMakeWheelbaseSucceedAction {
  type: typeof actionTypes.DELETE_MAKEWHEELBASE_SUCCEED;
  makeWheelbasesArray: TReceivedMakeWheelbaseObj[];
  successMessage: string;
}
export interface DeleteMakeWheelbaseFailedAction {
  type: typeof actionTypes.DELETE_MAKEWHEELBASE_FAILED;
  errorMessage: string;
}

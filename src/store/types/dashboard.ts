import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface DashboardInitialState {
  readonly loading?: boolean;
  readonly errorMessage?: string | null;
  readonly successMessage?: string | null;
  // make
  readonly makeObj?: TReceivedMakeObj | null;
  readonly makesArray?: TReceivedMakeObj[] | null;
  // make
  readonly makeWheelbaseObj?: TReceivedMakeWheelbaseObj | null;
  readonly makeWheelbasesArray?: TReceivedMakeWheelbaseObj[] | null;
  // series
  readonly seriesObj?: TReceivedSeriesObj | null;
  readonly seriesArray?: TReceivedSeriesObj[] | null;
  // brand
  readonly brandObj?: TReceivedBrandObj | null;
  readonly brandsArray?: TReceivedBrandObj[] | null;
  // wheelbase
  readonly wheelbaseObj?: TReceivedWheelbaseObj | null;
  readonly wheelbasesArray?: TReceivedWheelbaseObj[] | null;
  // body
  readonly bodyObj?: TReceivedBodyObj | null;
  readonly bodiesArray?: TReceivedBodyObj[] | null;
  // length
  readonly lengthObj?: TReceivedLengthObj | null;
  readonly lengthsArray?: TReceivedLengthObj[] | null;
  // body length
  readonly bodyMakeObj?: TReceivedBodyMakeObj | null;
  readonly bodyMakesArray?: TReceivedBodyMakeObj[] | null;
  // body accessory
  readonly bodyAccessoryObj?: TReceivedBodyAccessoryObj | null;
  readonly bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
  readonly bodyAssociatedAccessoriesArray?: TReceivedAccessoryObj[] | null;
  // accessory
  readonly accessoryObj?: TReceivedAccessoryObj | null;
  readonly accessoriesArray?: TReceivedAccessoryObj[] | null;
  // images array
  readonly imagesUploaded?: boolean;
  readonly imagesArray?: TReceivedImageObj[] | null;
}

// to further breakdown the state, use in mapStateToProps
export interface IDashboardMapStateToProps {
  readonly dashboard: DashboardInitialState;
}

/* ============================================================== */
// Clear all the dashboard state
/* ============================================================== */
export interface ClearDashboardStateAction {
  type: typeof actionTypes.CLEAR_DASHBOARD_STATE;
}

/* ============================================================== */
// Upload Image(s)
/* ============================================================== */

export type TReceivedImageObj = {
  id: number;
  filename: string;
  tag: string;
  url: string;
};

/* Api call */
export interface UploadImageAction {
  type: typeof actionTypes.UPLOAD_IMAGE;
  /** To determine which model/table its targetting e.g. Brand, Make, Body Accessory */
  model: string;
  /** The id of the specific model to choose to upload to */
  model_id: number; //
  /** Tag for future filter use */
  imageTag: string;
  /** The images prepare to be uploaded */
  imageFiles: FileList;
}
/* States */

export interface UploadImageStartAction {
  type: typeof actionTypes.UPLOAD_IMAGE_START;
}

export interface UploadImageSucceedAction {
  type: typeof actionTypes.UPLOAD_IMAGE_SUCCEED;
  imagesArray: TReceivedImageObj[];
}

export interface UploadImageFailedAction {
  type: typeof actionTypes.UPLOAD_IMAGE_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Delete Upload Image(s)
/* ============================================================== */

/* Api call */
export interface DeleteUploadImageAction {
  type: typeof actionTypes.DELETE_UPLOAD_IMAGE;
  /** Array of ids to send to backend */
  ids: number[];
}
/* States */
export interface DeleteUploadImageStartAction {
  type: typeof actionTypes.DELETE_UPLOAD_IMAGE_START;
}

export interface DeleteUploadImageSucceedAction {
  type: typeof actionTypes.DELETE_UPLOAD_IMAGE_SUCCEED;
  successMessage: string;
}

export interface DeleteUploadImageFailedAction {
  type: typeof actionTypes.DELETE_UPLOAD_IMAGE_FAILED;
  errorMessage: string;
}

/* ========================================================================================= */

// All the actiontypes with their payload
/* ============================================================== */
// Brand (Make Page) (Head)
/* ============================================================== */

/* types */
export type TReceivedBrandObj = {
  id: number;
  title: string;
  description: string;
  available: boolean;
  images: TReceivedImageObj[];
};

/* --------------------------- */
// Create Brand (Head)
/* --------------------------- */
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

/* --------------------------- */
// Update Brand (Head)
/* --------------------------- */

/* Api call */
export interface UpdateBrandAction {
  type: typeof actionTypes.UPDATE_BRAND;
  brand_id: number;
  title: string;
  description: string;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/* States */
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

/* --------------------------- */
// Get All Brands (Head)
/* --------------------------- */

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

/* ============================================================== */
// Wheelbase (Make Page)(Head)
/* ============================================================== */

/* types */
export type TReceivedWheelbaseObj = {
  id: number;
  title: string;
  description: string;
  value: number | null;
  available: boolean;
};

/* --------------------------- */
// Create Wheelbase (Head)
/* --------------------------- */

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

/* --------------------------- */
// Get Wheelbases (Head)
/* --------------------------- */
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

/* --------------------------- */
// Update Wheelbase (Head)
/* --------------------------- */
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

/* ============================================================== */
//  Make (Make Page) (Head)
/* ============================================================== */

/* types */
// Type of Objs being submitted
export type TCreateMakeData = {
  title: string;
  brand_id: number;
  series_id: number;
  tire: string;
  horsepower: string;
  year: string;
  transmission: string;
  engine_cap: string;
  gvw: string;
  abs: string;
  torque: string;
  config: string;
  emission: string;
  price: number;
};

// for updating, it requires a extra make_id key
export type TUpdateMakeData = {
  make_id: number;
  title: string;
  brand_id: number;
  series_id: number;
  tire: string;
  horsepower: string;
  year: string;
  transmission: string;
  engine_cap: string;
  gvw: string;
  abs: string;
  torque: string;
  config: string;
  emission: string;
  price: number;
};

// type of Objs received on succees
export type TReceivedMakeObj = {
  id: number;
  abs: any;
  torque: any;
  tire: string;
  config: string;
  emission: any;
  gvw: string;
  year: string;
  title: string;
  price: number;
  series: string;
  available: boolean;
  engine_cap: string;
  horsepower: string;
  transmission: string;
  brand: TReceivedBrandObj;
  images: TReceivedImageObj[];
};

/* --------------------------- */
// Create Make (Head)
/* --------------------------- */
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
/* --------------------------- */
// Get Makes (Head)
/* --------------------------- */

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
/* --------------------------- */
// Get Series (Make)
/* --------------------------- */

// type
export type TReceivedSeriesObj = {
  id: number;
  brand_id: number;
  title: string;
  available: boolean;
};
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

/* --------------------------- */
// Update Make (Head)
/* --------------------------- */
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

/* ================================================================================ */
//  Make Wheelbase (Make Page) (Head)
/* ================================================================================ */
// type
export type TReceivedMakeWheelbaseObj = {
  id: number;
  make: TReceivedMakeObj;
  wheelbase: TReceivedWheelbaseObj;
  length: number;
};

/* --------------------------- */
// Create Make Wheelbase (Head)
/* --------------------------- */
/*  Api call */
export interface CreateMakeWheelbaseAction {
  type: typeof actionTypes.CREATE_MAKEWHEELBASE;
  make_id: number;
  wheelbase_id: number;
  length: string;
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
/* --------------------------- */
// Get Make Wheelbases (Head)
/* --------------------------- */

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

/* --------------------------- */
// Update Make Wheelbase (Head)
/* --------------------------- */
/*  Api call */
export interface UpdateMakeWheelbaseAction {
  type: typeof actionTypes.UPDATE_MAKEWHEELBASE;
  make_wheelbase_id: number;
  make_id: number;
  wheelbase_id: number;
  length: string;
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

/* --------------------------- */
// Delete Make Wheelbase (Head)
/* --------------------------- */
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

/* ========================================================================================= */

/* ============================================================== */
//  Body  (Body Page) (tail)
/* ============================================================== */

/* types */
export type TReceivedBodyObj = {
  id: number;
  title: string;
  description: string;
  available: boolean;
  accessories: TReceivedAccessoryObj[];
  images: TReceivedImageObj[];
};

/* --------------------------- */
// Create Body (tail)
/* --------------------------- */
/*  Api call */
export interface CreateBodyAction {
  type: typeof actionTypes.CREATE_BODY;
  title: string;
  description: string;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/*  States */
export interface CreateBodyStartAction {
  type: typeof actionTypes.CREATE_BODY_START;
}
export interface CreateBodySucceedAction {
  type: typeof actionTypes.CREATE_BODY_SUCCEED;
  bodiesArray: TReceivedBodyObj[];
  successMessage: string;
}
export interface CreateBodyFailedAction {
  type: typeof actionTypes.CREATE_BODY_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Body (Tail)
/* --------------------------- */

/* Api call */
export interface UpdateBodyAction {
  type: typeof actionTypes.UPDATE_BODY;
  body_id: number;
  title: string;
  description: string;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/* States */
export interface UpdateBodyStartAction {
  type: typeof actionTypes.UPDATE_BODY_START;
}
export interface UpdateBodySucceedAction {
  type: typeof actionTypes.UPDATE_BODY_SUCCEED;
  bodiesArray: TReceivedBodyObj[];
  successMessage: string;
}
export interface UpdateBodyFailedAction {
  type: typeof actionTypes.UPDATE_BODY_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Bodies (tail)
/* --------------------------- */

/* Api call */
export interface GetBodiesAction {
  type: typeof actionTypes.GET_BODIES;
}
/* States */
export interface GetBodiesStartAction {
  type: typeof actionTypes.GET_BODIES_START;
}
export interface GetBodiesSucceedAction {
  type: typeof actionTypes.GET_BODIES_SUCCEED;
  bodiesArray: TReceivedBodyObj[];
}
export interface GetBodiesFailedAction {
  type: typeof actionTypes.GET_BODIES_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Delete Body (Tail)
/* --------------------------- */

/* Api call */
export interface DeleteBodyAction {
  type: typeof actionTypes.DELETE_BODY;
  body_id: number;
}
/* States */
export interface DeleteBodyStartAction {
  type: typeof actionTypes.DELETE_BODY_START;
}
export interface DeleteBodySucceedAction {
  type: typeof actionTypes.DELETE_BODY_SUCCEED;
  bodiesArray: TReceivedBodyObj[];
  successMessage: string;
}
export interface DeleteBodyFailedAction {
  type: typeof actionTypes.DELETE_BODY_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Body Accessory (Body Page) (tail)
/* ============================================================== */
/* types */
// Body accessory data when creating
export type TReceivedBodyAccessoryObj = {
  id: number;
  available: boolean;
  body: TReceivedBodyObj;
  images: TReceivedImageObj[];
  accessory: TReceivedAccessoryObj;
};

/* --------------------------- */
// Create Body Accessory (tail)
/* --------------------------- */
/*  Api call */
export interface CreateBodyAccessoryAction {
  type: typeof actionTypes.CREATE_BODYACCESSORY;
  body_id: number;
  accessory_id: number;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/*  States */
export interface CreateBodyAccessoryStartAction {
  type: typeof actionTypes.CREATE_BODYACCESSORY_START;
}
export interface CreateBodyAccessorySucceedAction {
  type: typeof actionTypes.CREATE_BODYACCESSORY_SUCCEED;
  bodyAccessoriesArray: TReceivedBodyAccessoryObj[];
  successMessage: string;
}
export interface CreateBodyAccessoryFailedAction {
  type: typeof actionTypes.CREATE_BODYACCESSORY_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Body Accessory (Tail)
/* --------------------------- */

/* Api call */
export interface UpdateBodyAccessoryAction {
  type: typeof actionTypes.UPDATE_BODYACCESSORY;
  body_id: number;
  accessory_id: number;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/* States */
export interface UpdateBodyAccessoryStartAction {
  type: typeof actionTypes.UPDATE_BODYACCESSORY_START;
}
export interface UpdateBodyAccessorySucceedAction {
  type: typeof actionTypes.UPDATE_BODYACCESSORY_SUCCEED;
  bodyAccessoriesArray: TReceivedBodyAccessoryObj[];
  successMessage: string;
}
export interface UpdateBodyAccessoryFailedAction {
  type: typeof actionTypes.UPDATE_BODYACCESSORY_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Body Accessories (tail)
/* --------------------------- */

/* Api call */
export interface GetBodyAccessoriesAction {
  type: typeof actionTypes.GET_BODYACCESSORIES;
  body_id: number;
}
/* States */
export interface GetBodyAccessoriesStartAction {
  type: typeof actionTypes.GET_BODYACCESSORIES_START;
}
export interface GetBodyAccessoriesSucceedAction {
  type: typeof actionTypes.GET_BODYACCESSORIES_SUCCEED;
  bodyAccessoriesArray: TReceivedBodyAccessoryObj[];
}
export interface GetBodyAccessoriesFailedAction {
  type: typeof actionTypes.GET_BODYACCESSORIES_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Delete body Accessory (tail)
/* --------------------------- */

/* Api call */
export interface DeleteBodyAccessoryAction {
  type: typeof actionTypes.DELETE_BODYACCESSORY;
  body_id: number;
  body_accessory_id: number;
}
/* States */
export interface DeleteBodyAccessoryStartAction {
  type: typeof actionTypes.DELETE_BODYACCESSORY_START;
}
export interface DeleteBodyAccessorySucceedAction {
  type: typeof actionTypes.DELETE_BODYACCESSORY_SUCCEED;
  bodyAccessoriesArray: TReceivedBodyAccessoryObj[];
  successMessage: string;
}
export interface DeleteBodyAccessoryFailedAction {
  type: typeof actionTypes.DELETE_BODYACCESSORY_FAILED;
  errorMessage: string;
}

/* ---------------------------- */
// Clear body accessory array
/* ---------------------------- */
export interface ClearBodyAccessoryArrayAction {
  type: typeof actionTypes.CLEAR_BODYACCESSORY_ARRAY;
}

/* --------------------------- */
// Get body associated Accessories (tail)
/* --------------------------- */

/* Api call */
export interface GetBodyAssociatedAccessoriesAction {
  type: typeof actionTypes.GET_BODYASSOCIATED_ACCESSORIES;
}
/* States */
export interface GetBodyAssociatedAccessoriesStartAction {
  type: typeof actionTypes.GET_BODYASSOCIATED_ACCESSORIES_START;
}
export interface GetBodyAssociatedAccessoriesSucceedAction {
  type: typeof actionTypes.GET_BODYASSOCIATED_ACCESSORIES_SUCCEED;
  bodyAssociatedAccessoriesArray: TReceivedAccessoryObj[];
}
export interface GetBodyAssociatedAccessoriesFailedAction {
  type: typeof actionTypes.GET_BODYASSOCIATED_ACCESSORIES_FAILED;
  errorMessage: string;
}

/* ---------------------------- */
// Clear body associated accessories array
/* ---------------------------- */
export interface ClearBodyAssociatedAccessoriesArrayAction {
  type: typeof actionTypes.CLEAR_BODYASSOCIATED_ACCESSORIES_ARRAY;
}

/* ============================================================== */
//  Length (Body Page) (tail)
/* ============================================================== */
// type
export type TReceivedLengthObj = { id: number; title: string; description: string; available: boolean };

/* --------------------------- */
// Create Length (tail)
/* --------------------------- */
/*  Api call */
export interface CreateLengthAction {
  type: typeof actionTypes.CREATE_LENGTH;
  title: string;
  description: string;
}
/*  States */
export interface CreateLengthStartAction {
  type: typeof actionTypes.CREATE_LENGTH_START;
}
export interface CreateLengthSucceedAction {
  type: typeof actionTypes.CREATE_LENGTH_SUCCEED;
  lengthsArray: TReceivedLengthObj[];
  successMessage: string;
}
export interface CreateLengthFailedAction {
  type: typeof actionTypes.CREATE_LENGTH_FAILED;
  errorMessage: string;
}
/* --------------------------- */
// Get Lengths (tail)
/* --------------------------- */
export interface GetLengthsAction {
  type: typeof actionTypes.GET_LENGTHS;
}
/*  States */
export interface GetLengthsStartAction {
  type: typeof actionTypes.GET_LENGTHS_START;
}
export interface GetLengthsSucceedAction {
  type: typeof actionTypes.GET_LENGTHS_SUCCEED;
  lengthsArray: TReceivedLengthObj[];
}
export interface GetLengthsFailedAction {
  type: typeof actionTypes.GET_LENGTHS_FAILED;
  errorMessage: string;
}
/* --------------------------- */
// Update Length (tail)
/* --------------------------- */
export interface UpdateLengthAction {
  type: typeof actionTypes.UPDATE_LENGTH;
  length_id: number;
  title: string;
  description: string;
}
/*  States */
export interface UpdateLengthStartAction {
  type: typeof actionTypes.UPDATE_LENGTH_START;
}
export interface UpdateLengthSucceedAction {
  type: typeof actionTypes.UPDATE_LENGTH_SUCCEED;
  lengthsArray: TReceivedLengthObj[];
  successMessage: string;
}
export interface UpdateLengthFailedAction {
  type: typeof actionTypes.UPDATE_LENGTH_FAILED;
  errorMessage: string;
}
/* --------------------------- */
// Delete Length (tail)
/* --------------------------- */
export interface DeleteLengthAction {
  type: typeof actionTypes.DELETE_LENGTH;
  length_id: number;
}
/*  States */
export interface DeleteLengthStartAction {
  type: typeof actionTypes.DELETE_LENGTH_START;
}
export interface DeleteLengthSucceedAction {
  type: typeof actionTypes.DELETE_LENGTH_SUCCEED;
  lengthsArray: TReceivedLengthObj[];
  successMessage: string;
}
export interface DeleteLengthFailedAction {
  type: typeof actionTypes.DELETE_LENGTH_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Body Make (Body Page) (tail)
/* ============================================================== */
/* types */
// Body make data when creating
export type TCreateBodyMakeData = {
  body_id: number;
  length_id: number;
  make_id: number;
  depth: string;
  width: string;
  height: string;
  price: number;
};
export type TUpdateBodyMakeData = {
  body_make_id: number;
  body_id: number;
  make_id: number;
  depth: string;
  width: string;
  height: string;
  price: number;
};
// Received body make object when action success
// Types
export type TReceivedBodyMakeObj = {
  id: number;
  make_wheelbase: TReceivedMakeWheelbaseObj;
  body: TReceivedBodyObj;
  width: string;
  depth: string;
  height: string | null;
  price: number;
  body_make_accessories: TReceivedAccessoryObj[];
  images: TReceivedImageObj[];
  available: true;
};

/* --------------------------- */
// Create Body Make (tail)
/* --------------------------- */
/*  Api call */
export interface CreateBodyMakeAction {
  type: typeof actionTypes.CREATE_BODYMAKE;
  createBodyMakeData: TCreateBodyMakeData;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/*  States */
export interface CreateBodyMakeStartAction {
  type: typeof actionTypes.CREATE_BODYMAKE_START;
}
export interface CreateBodyMakeSucceedAction {
  type: typeof actionTypes.CREATE_BODYMAKE_SUCCEED;
  bodyMakesArray: TReceivedBodyMakeObj[];
  successMessage: string;
}
export interface CreateBodyMakeFailedAction {
  type: typeof actionTypes.CREATE_BODYMAKE_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Body Make (Tail)
/* --------------------------- */

/* Api call */
export interface UpdateBodyMakeAction {
  type: typeof actionTypes.UPDATE_BODYMAKE;
  updateBodyMakeData: TUpdateBodyMakeData;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/* States */
export interface UpdateBodyMakeStartAction {
  type: typeof actionTypes.UPDATE_BODYMAKE_START;
}
export interface UpdateBodyMakeSucceedAction {
  type: typeof actionTypes.UPDATE_BODYMAKE_SUCCEED;
  bodyMakesArray: TReceivedBodyMakeObj[];
  successMessage: string;
}
export interface UpdateBodyMakeFailedAction {
  type: typeof actionTypes.UPDATE_BODYMAKE_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Body Makes (tail)
/* --------------------------- */

/* Api call */
export interface GetBodyMakesAction {
  type: typeof actionTypes.GET_BODYMAKES;
}
/* States */
export interface GetBodyMakesStartAction {
  type: typeof actionTypes.GET_BODYMAKES_START;
}
export interface GetBodyMakesSucceedAction {
  type: typeof actionTypes.GET_BODYMAKES_SUCCEED;
  bodyMakesArray: TReceivedBodyMakeObj[];
}
export interface GetBodyMakesFailedAction {
  type: typeof actionTypes.GET_BODYMAKES_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Delete Body Make (tail)
/* --------------------------- */

/* Api call */
export interface DeleteBodyMakeAction {
  type: typeof actionTypes.DELETE_BODYMAKE;
  body_make_id: number;
}
/* States */
export interface DeleteBodyMakeStartAction {
  type: typeof actionTypes.DELETE_BODYMAKE_START;
}
export interface DeleteBodyMakeSucceedAction {
  type: typeof actionTypes.DELETE_BODYMAKE_SUCCEED;
  bodyMakesArray: TReceivedBodyMakeObj[];
  successMessage: string;
}
export interface DeleteBodyMakeFailedAction {
  type: typeof actionTypes.DELETE_BODYMAKE_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Accessory (Accessory Page) (tail)
/* ============================================================== */
/* types */
// Received accessory length object when action success
export type TReceivedAccessoryObj = {
  id: 1;
  title: string;
  price: number;
  general: boolean;
  description: string;
  dimension_associated: boolean;
  available: boolean;
  images: TReceivedImageObj[];
};

/* --------------------------- */
// Create Accessory (tail)
/* --------------------------- */
export type TCreateAccessoryData = {
  title: string;
  description: string;
  price: number;
  general: boolean;
  dimension_associated: boolean;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
};
export type TUpdateAccessoryData = {
  id: number;
  title: string;
  description: string;
  price: number;
  general: boolean;
  dimension_associated: boolean;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
};

/*  Api call */
export interface CreateAccessoryAction {
  type: typeof actionTypes.CREATE_ACCESSORY;
  createAccessoryData: TCreateAccessoryData;
}
/*  States */
export interface CreateAccessoryStartAction {
  type: typeof actionTypes.CREATE_ACCESSORY_START;
}
export interface CreateAccessorySucceedAction {
  type: typeof actionTypes.CREATE_ACCESSORY_SUCCEED;
  accessoriesArray: TReceivedAccessoryObj[];
  successMessage: string;
}
export interface CreateAccessoryFailedAction {
  type: typeof actionTypes.CREATE_ACCESSORY_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Accessory (Tail)
/* --------------------------- */

/* Api call */
export interface UpdateAccessoryAction {
  type: typeof actionTypes.UPDATE_ACCESSORY;
  updateAccessoryData: TUpdateAccessoryData;
}
/* States */
export interface UpdateAccessoryStartAction {
  type: typeof actionTypes.UPDATE_ACCESSORY_START;
}
export interface UpdateAccessorySucceedAction {
  type: typeof actionTypes.UPDATE_ACCESSORY_SUCCEED;
  accessoriesArray: TReceivedAccessoryObj[];
  successMessage: string;
}
export interface UpdateAccessoryFailedAction {
  type: typeof actionTypes.UPDATE_ACCESSORY_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Accessories (tail)
/* --------------------------- */
/* Api call */
export interface GetAccessoriesAction {
  type: typeof actionTypes.GET_ACCESSORIES;
}
/* States */
export interface GetAccessoriesStartAction {
  type: typeof actionTypes.GET_ACCESSORIES_START;
}
export interface GetAccessoriesSucceedAction {
  type: typeof actionTypes.GET_ACCESSORIES_SUCCEED;
  accessoriesArray: TReceivedAccessoryObj[];
}
export interface GetAccessoriesFailedAction {
  type: typeof actionTypes.GET_ACCESSORIES_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type DashboardActionTypes =
  // Miscellaneous
  /* ------------------------ */
  | ClearDashboardStateAction
  /* ------------------------ */
  // Upload Image(s)
  /* ------------------------ */
  | UploadImageAction
  | UploadImageStartAction
  | UploadImageSucceedAction
  | UploadImageFailedAction
  /* ------------------------ */
  // Delete Image(s)
  /* ------------------------ */
  | DeleteUploadImageAction
  | DeleteUploadImageStartAction
  | DeleteUploadImageSucceedAction
  | DeleteUploadImageFailedAction
  /* ------------------------ */
  /* ======================================================================= */
  /* ------------------------ */
  // Brand (Make Page)
  /* ------------------------ */
  /* Get */
  | GetBrandsAction
  | GetBrandsStartAction
  | GetBrandsSucceedAction
  | GetBrandsFailedAction
  /* Create */
  | CreateBrandAction
  | CreateBrandStartAction
  | CreateBrandSucceedAction
  | CreateBrandFailedAction
  /* Update */
  | UpdateBrandAction
  | UpdateBrandStartAction
  | UpdateBrandSucceedAction
  | UpdateBrandFailedAction
  /* ------------------------ */
  // Wheelbase (Make Page)
  /* ------------------------ */
  /* Create */
  | CreateWheelbaseAction
  | CreateWheelbaseStartAction
  | CreateWheelbaseSucceedAction
  | CreateWheelbaseFailedAction
  /* Get */
  | GetWheelbasesAction
  | GetWheelbasesStartAction
  | GetWheelbasesSucceedAction
  | GetWheelbasesFailedAction
  /* Update */
  | UpdateWheelbaseAction
  | UpdateWheelbaseStartAction
  | UpdateWheelbaseSucceedAction
  | UpdateWheelbaseFailedAction
  /* ------------------------ */
  // Make (Make Page)
  /* ------------------------ */
  /* Create */
  | CreateMakeAction
  | CreateMakeStartAction
  | CreateMakeSucceedAction
  | CreateMakeFailedAction
  /* Get */
  | GetMakesAction
  | GetMakesStartAction
  | GetMakesSucceedAction
  | GetMakesFailedAction
  /* Update */
  | UpdateMakeAction
  | UpdateMakeStartAction
  | UpdateMakeSucceedAction
  | UpdateMakeFailedAction
  /* ----------------------- */
  // Series (make)
  /* ----------------------- */
  /* Get */
  | GetSeriesAction
  | GetSeriesStartAction
  | GetSeriesSucceedAction
  | GetSeriesFailedAction
  /* ------------------------ */
  // Make Wheelbase (Make Page)
  /* ------------------------ */
  /* Create */
  | CreateMakeWheelbaseAction
  | CreateMakeWheelbaseStartAction
  | CreateMakeWheelbaseSucceedAction
  | CreateMakeWheelbaseFailedAction
  /* Get */
  | GetMakeWheelbasesAction
  | GetMakeWheelbasesStartAction
  | GetMakeWheelbasesSucceedAction
  | GetMakeWheelbasesFailedAction
  /* Update */
  | UpdateMakeWheelbaseAction
  | UpdateMakeWheelbaseStartAction
  | UpdateMakeWheelbaseSucceedAction
  | UpdateMakeWheelbaseFailedAction
  /* Delete */
  | DeleteMakeWheelbaseAction
  | DeleteMakeWheelbaseStartAction
  | DeleteMakeWheelbaseSucceedAction
  | DeleteMakeWheelbaseFailedAction
  /* ------------------------ */
  /* ======================================================================= */
  /* ------------------------ */
  // Body (Body Page)
  /* ------------------------ */
  /* Create */
  | CreateBodyAction
  | CreateBodyStartAction
  | CreateBodySucceedAction
  | CreateBodyFailedAction
  /* Get */
  | GetBodiesAction
  | GetBodiesStartAction
  | GetBodiesSucceedAction
  | GetBodiesFailedAction
  /* Update */
  | UpdateBodyAction
  | UpdateBodyStartAction
  | UpdateBodySucceedAction
  | UpdateBodyFailedAction
  /* Delete */
  | DeleteBodyAction
  | DeleteBodyStartAction
  | DeleteBodySucceedAction
  | DeleteBodyFailedAction
  /* ------------------------ */
  // Body Accessory (Body Page)
  /* ------------------------ */
  /* Create */
  | CreateBodyAccessoryAction
  | CreateBodyAccessoryStartAction
  | CreateBodyAccessorySucceedAction
  | CreateBodyAccessoryFailedAction
  /* Get */
  | GetBodyAccessoriesAction
  | GetBodyAccessoriesStartAction
  | GetBodyAccessoriesSucceedAction
  | GetBodyAccessoriesFailedAction
  /* Update */
  | UpdateBodyAccessoryAction
  | UpdateBodyAccessoryStartAction
  | UpdateBodyAccessorySucceedAction
  | UpdateBodyAccessoryFailedAction
  /* Delete */
  | DeleteBodyAccessoryAction
  | DeleteBodyAccessoryStartAction
  | DeleteBodyAccessorySucceedAction
  | DeleteBodyAccessoryFailedAction
  // Clear body accessory array
  | ClearBodyAccessoryArrayAction
  /* body associated accessories */
  | GetBodyAssociatedAccessoriesAction
  | GetBodyAssociatedAccessoriesStartAction
  | GetBodyAssociatedAccessoriesSucceedAction
  | GetBodyAssociatedAccessoriesFailedAction
  // Clear body associated accessories array
  | ClearBodyAssociatedAccessoriesArrayAction
  /* ------------------------ */
  // Length (Body Page)
  /* ------------------------ */
  /* Create */
  | CreateLengthAction
  | CreateLengthStartAction
  | CreateLengthSucceedAction
  | CreateLengthFailedAction
  /* Get */
  | GetLengthsAction
  | GetLengthsStartAction
  | GetLengthsSucceedAction
  | GetLengthsFailedAction
  /* Update */
  | UpdateLengthAction
  | UpdateLengthStartAction
  | UpdateLengthSucceedAction
  | UpdateLengthFailedAction
  /* Delete */
  | DeleteLengthAction
  | DeleteLengthStartAction
  | DeleteLengthSucceedAction
  | DeleteLengthFailedAction
  /* ------------------------ */
  // Body Length (Body Page)
  /* ------------------------ */
  /* Create */
  | CreateBodyMakeAction
  | CreateBodyMakeStartAction
  | CreateBodyMakeSucceedAction
  | CreateBodyMakeFailedAction
  /* Get */
  | GetBodyMakesAction
  | GetBodyMakesStartAction
  | GetBodyMakesSucceedAction
  | GetBodyMakesFailedAction
  /* Update */
  | UpdateBodyMakeAction
  | UpdateBodyMakeStartAction
  | UpdateBodyMakeSucceedAction
  | UpdateBodyMakeFailedAction
  /* Delete */
  | DeleteBodyMakeAction
  | DeleteBodyMakeStartAction
  | DeleteBodyMakeSucceedAction
  | DeleteBodyMakeFailedAction

  /* ======================================================================= */
  /* ------------------------ */
  // Accessory (Accessory Page)
  /* ------------------------ */
  /* Create */
  | CreateAccessoryAction
  | CreateAccessoryStartAction
  | CreateAccessorySucceedAction
  | CreateAccessoryFailedAction
  /* Get */
  | GetAccessoriesAction
  | GetAccessoriesStartAction
  | GetAccessoriesSucceedAction
  | GetAccessoriesFailedAction
  /* Update */
  | UpdateAccessoryAction
  | UpdateAccessoryStartAction
  | UpdateAccessorySucceedAction
  | UpdateAccessoryFailedAction;

import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface DashboardInitialState {
  readonly loading: boolean;
  readonly errorMessage: string | null;
  readonly successMessage: string | null;
  // make
  readonly makeObj: TReceivedMakeObj | null;
  readonly makesArray: TReceivedMakeObj[] | null;
  // brand
  readonly brandsArray: TReceivedBrandObj[] | null;
  readonly brandObj: TReceivedBrandObj | null;
  // wheelbase
  readonly wheelbaseObj: TReceivedWheelbaseObj | null;
  readonly wheelbasesArray: TReceivedWheelbaseObj[] | null;
  // body
  readonly bodyObj: TReceivedBodyObj | null;
  readonly bodiesArray: TReceivedBodyObj[] | null;
  // length
  readonly lengthObj: TReceivedLengthObj | null;
  readonly lengthsArray: TReceivedLengthObj[] | null;
  // body length
  readonly bodyLengthObj: TReceivedBodyLengthObj | null;
  readonly bodyLengthsArray: TReceivedBodyLengthObj[] | null;
  // body accessory
  readonly bodyAccessoryObj: TReceivedBodyAccessoryObj | null;
  readonly bodyAccessoriesArray: TReceivedBodyAccessoryObj[] | null;
  // accessory
  readonly accessoryObj: TReceivedAccessoryObj | null;
  readonly accessoriesArray: TReceivedAccessoryObj[] | null;
  // images array
  readonly imagesUploaded: boolean;
  readonly imagesArray: TReceivedImageObj[] | null;
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
  gvw: string;
  year: string;
  price: string;
  title: string;
  length: string;
  brand_id: string;
  engine_cap: string;
  horsepower: string;
  wheelbase_id: string;
  transmission: string;
};

// for updating, it requires a extra make_id key
export type TUpdateMakeData = {
  make_id: number;
  gvw: string;
  year: string;
  price: string;
  title: string;
  length: string;
  brand_id: string;
  engine_cap: string;
  horsepower: string;
  wheelbase_id: string;
  transmission: string;
};

// type of Objs received on succees
export type TReceivedMakeObj = {
  abs: any;
  torque: any;
  tire: number;
  config: any;
  series: any;
  emission: any;
  id: number;
  gvw: string;
  year: string;
  title: string;
  price: number;
  length: number;
  available: boolean;
  engine_cap: string;
  horsepower: string;
  transmission: string;
  brand: TReceivedBrandObj;
  wheelbase: TReceivedWheelbaseObj;
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

/* ============================================================== */
// Body Length (Body Page) (tail)
/* ============================================================== */
/* types */
// Body length data when creating
export type TCreateBodyLengthData = {
  body_id: number;
  length_id: number;
  depth: string;
  width: string;
  height: string;
  price: number;
};
export type TUpdateBodyLengthData = {
  body_length_id: number;
  body_id: number;
  length_id: number;
  depth: string;
  width: string;
  height: string;
  price: number;
};
// Received body length object when action success
export type TReceivedBodyLengthObj = {
  id: number;
  length: TReceivedLengthObj;
  body: TReceivedBodyObj;
  depth: string;
  width: string;
  height: string;
  price: number;
  available: boolean;
  images: TReceivedImageObj[];
  body_accessories: TReceivedBodyAccessoryObj[];
};

/* --------------------------- */
// Create Body Length (tail)
/* --------------------------- */
/*  Api call */
export interface CreateBodyLengthAction {
  type: typeof actionTypes.CREATE_BODYLENGTH;
  createBodyLengthData: TCreateBodyLengthData;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/*  States */
export interface CreateBodyLengthStartAction {
  type: typeof actionTypes.CREATE_BODYLENGTH_START;
}
export interface CreateBodyLengthSucceedAction {
  type: typeof actionTypes.CREATE_BODYLENGTH_SUCCEED;
  bodyLengthsArray: TReceivedBodyLengthObj[];
  successMessage: string;
}
export interface CreateBodyLengthFailedAction {
  type: typeof actionTypes.CREATE_BODYLENGTH_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Body Length (Tail)
/* --------------------------- */

/* Api call */
export interface UpdateBodyLengthAction {
  type: typeof actionTypes.UPDATE_BODYLENGTH;
  updateBodyLengthData: TUpdateBodyLengthData;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
}
/* States */
export interface UpdateBodyLengthStartAction {
  type: typeof actionTypes.UPDATE_BODYLENGTH_START;
}
export interface UpdateBodyLengthSucceedAction {
  type: typeof actionTypes.UPDATE_BODYLENGTH_SUCCEED;
  bodyLengthsArray: TReceivedBodyLengthObj[];
  successMessage: string;
}
export interface UpdateBodyLengthFailedAction {
  type: typeof actionTypes.UPDATE_BODYLENGTH_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Body Lengths (tail)
/* --------------------------- */

/* Api call */
export interface GetBodyLengthsAction {
  type: typeof actionTypes.GET_BODYLENGTHS;
}
/* States */
export interface GetBodyLengthsStartAction {
  type: typeof actionTypes.GET_BODYLENGTHS_START;
}
export interface GetBodyLengthsSucceedAction {
  type: typeof actionTypes.GET_BODYLENGTHS_SUCCEED;
  bodyLengthsArray: TReceivedBodyLengthObj[];
}
export interface GetBodyLengthsFailedAction {
  type: typeof actionTypes.GET_BODYLENGTHS_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Body Accessory (Body Page) (tail)
/* ============================================================== */
/* types */
// Body length data when creating
export type TCreateBodyAccessoryData = {
  body_length_id: number;
  accessory_id: number;
  description: string;
  price: number;
};
export type TUpdateBodyAccessoryData = {
  body_accessory_id: number;
  accessory_id: number;
  body_length_id: number;
  description: string;
  price: number;
};
export type TReceivedBodyAccessoryObj = {
  id: number;
  title: string;
  accessory: TReceivedAccessoryObj;
  body_length: TReceivedBodyLengthObj;
  description: string;
  price: number;
  available: boolean;
  images: TReceivedImageObj[];
};

/* --------------------------- */
// Create Body Accessory (tail)
/* --------------------------- */
/*  Api call */
export interface CreateBodyAccessoryAction {
  type: typeof actionTypes.CREATE_BODYACCESSORY;
  createBodyAccessoryData: TCreateBodyAccessoryData;
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
  /** Need this array so within the body lengths table, the body accessory can be updated smoothly */
  bodyLengthsArray: TReceivedBodyLengthObj[];
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
  updateBodyAccessoryData: TUpdateBodyAccessoryData;
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
// Get All Body Lengths (tail)
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
/*  Api call */
export interface CreateAccessoryAction {
  type: typeof actionTypes.CREATE_ACCESSORY;
  title: string;
  description: string;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
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
  id: number;
  title: string;
  description: string;
  imageTag: string | null; //for upload images
  imageFiles: FileList | null; //for upload images
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
  /* ------------------------ */
  // Body Length (Body Page)
  /* ------------------------ */
  /* Create */
  | CreateBodyLengthAction
  | CreateBodyLengthStartAction
  | CreateBodyLengthSucceedAction
  | CreateBodyLengthFailedAction
  /* Get */
  | GetBodyLengthsAction
  | GetBodyLengthsStartAction
  | GetBodyLengthsSucceedAction
  | GetBodyLengthsFailedAction
  /* Update */
  | UpdateBodyLengthAction
  | UpdateBodyLengthStartAction
  | UpdateBodyLengthSucceedAction
  | UpdateBodyLengthFailedAction
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

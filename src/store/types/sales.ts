import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface SalesInitialState {
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
}

// to further breakdown the state, use in mapStateToProps
export interface ISalesMapStateToProps {
  readonly sales: SalesInitialState;
}

/* ============================================================== */
// Clear all the sales state
/* ============================================================== */
export interface ClearSalesStateAction {
  type: typeof actionTypes.CLEAR_SALES_STATE;
}

/* ============================================================== */
// Upload Image(s)
/* ============================================================== */

/* Api call */
export interface UploadImageAction {
  type: typeof actionTypes.UPLOAD_IMAGE;
  brandId: number;
  model: string;
  tag: string;
  imageFile: FileList;
}
/* States */
export interface UploadImageStartAction {
  type: typeof actionTypes.UPLOAD_IMAGE_START;
}
export interface UploadImageSucceedAction {
  type: typeof actionTypes.UPLOAD_IMAGE_SUCCEED;
  successMessage: string;
}
export interface UploadImageFailedAction {
  type: typeof actionTypes.UPLOAD_IMAGE_FAILED;
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
};

/* --------------------------- */
// Create Brand (Head)
/* --------------------------- */
/*  Api call */
export interface CreateBrandAction {
  type: typeof actionTypes.CREATE_BRAND;
  title: string;
  description: string;
  tag?: string;
  imageFiles?: FileList | null;
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
  id: number;
  gvw: string;
  year: string;
  title: string;
  price: number;
  length: string;
  available: boolean;
  engine_cap: string;
  horsepower: string;
  transmission: string;
  brand: TReceivedBrandObj;
  wheelbase: TReceivedWheelbaseObj;
  images: string[];
};

/* --------------------------- */
// Create Make (Head)
/* --------------------------- */
/*  Api call */
export interface CreateMakeAction {
  type: typeof actionTypes.CREATE_MAKE;
  createMakeData: TCreateMakeData;
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
};

/* --------------------------- */
// Create Body (tail)
/* --------------------------- */
/*  Api call */
export interface CreateBodyAction {
  type: typeof actionTypes.CREATE_BODY;
  title: string;
  description: string;
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
  images: string[];
};

/* --------------------------- */
// Create Body Length (tail)
/* --------------------------- */
/*  Api call */
export interface CreateBodyLengthAction {
  type: typeof actionTypes.CREATE_BODYLENGTH;
  createBodyLengthData: TCreateBodyLengthData;
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
// Combine and export all action types
/* ============================================================== */
export type SalesActionTypes =
  // Miscellaneous
  /* ------------------------ */
  | ClearSalesStateAction
  /* ------------------------ */
  // Upload Image(s)
  /* ------------------------ */
  | UploadImageAction
  | UploadImageStartAction
  | UploadImageSucceedAction
  | UploadImageFailedAction
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
  | UpdateBodyLengthFailedAction;

import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface SalesInitialState {
  readonly loading: boolean;
  readonly errorMessage: string | null;
  readonly successMessage: string | null;
  readonly makeObj: TReceivedMakeObj | null;
  readonly makesArray: TReceivedMakeObj[] | null;
  readonly brandsArray: TReceivedBrandObj[] | null;
  readonly brandObj: TReceivedBrandObj | null;
  readonly wheelbaseObj: TReceivedWheelbaseObj | null;
  readonly wheelbasesArray: TReceivedWheelbaseObj[] | null;
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

// All the actiontypes with their payload
/* ============================================================== */
// Brand (Head)
/* ============================================================== */

/* --------------------------- */
// Create Brands (Head)
/* --------------------------- */

/* types */
export type TReceivedBrandObj = {
  id: number;
  title: string;
  description: string;
  available: boolean;
};

/*  Api call */
export interface CreateBrandAction {
  type: typeof actionTypes.CREATE_BRAND;
  title: string;
  description: string;
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
// Wheelbase (Head)
/* ============================================================== */

/* --------------------------- */
// Create Wheelbase (Head)
/* --------------------------- */
/* types */
export type TReceivedWheelbaseObj = {
  id: number;
  title: string;
  description: string;
  value: number | null;
  available: boolean;
};

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
//  Make (Head)
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

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type SalesActionTypes =
  // Miscellaneous
  /* ------------------------ */
  | ClearSalesStateAction
  /* ------------------------ */
  // Brand
  /* ------------------------ */
  | GetBrandsAction
  | GetBrandsStartAction
  | GetBrandsSucceedAction
  | GetBrandsFailedAction
  /* ------------------------ */
  | CreateBrandAction
  | CreateBrandStartAction
  | CreateBrandSucceedAction
  | CreateBrandFailedAction
  /* ------------------------ */
  | UpdateBrandAction
  | UpdateBrandStartAction
  | UpdateBrandSucceedAction
  | UpdateBrandFailedAction
  /* ------------------------ */
  // Wheelbase
  /* ------------------------ */
  | CreateWheelbaseAction
  | CreateWheelbaseStartAction
  | CreateWheelbaseSucceedAction
  | CreateWheelbaseFailedAction
  /* ------------------------ */
  | GetWheelbasesAction
  | GetWheelbasesStartAction
  | GetWheelbasesSucceedAction
  | GetWheelbasesFailedAction
  /* ------------------------ */
  | UpdateWheelbaseAction
  | UpdateWheelbaseStartAction
  | UpdateWheelbaseSucceedAction
  | UpdateWheelbaseFailedAction
  /* ------------------------ */
  // Make
  /* ------------------------ */
  | CreateMakeAction
  | CreateMakeStartAction
  | CreateMakeSucceedAction
  | CreateMakeFailedAction
  /* ------------------------ */
  | GetMakesAction
  | GetMakesStartAction
  | GetMakesSucceedAction
  | GetMakesFailedAction
  /* ------------------------ */
  | UpdateMakeAction
  | UpdateMakeStartAction
  | UpdateMakeSucceedAction
  | UpdateMakeFailedAction;

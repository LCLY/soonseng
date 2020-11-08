import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface SalesInitialState {
  readonly loading: boolean;
  readonly errorMessage: string | null;
  readonly successMessage: string | null;
  readonly makeObj: TMakeReceivedObj | null;
  readonly makesArray: TMakeReceivedObj[] | null;
  readonly brandsArray: TBrandReceivedObj[] | null;
  readonly brandObj: TBrandReceivedObj | null;
  readonly wheelbaseObj: TWheelbaseReceivedObj | null;
  readonly wheelbasesArray: TWheelbaseReceivedObj[] | null;
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
export type TBrandReceivedObj = { id: number; title: string; description: string; available: boolean };

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
  brandsArray: TBrandReceivedObj[];
  successMessage: string;
}
export interface CreateBrandFailedAction {
  type: typeof actionTypes.CREATE_BRAND_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Brands (Head)
/* --------------------------- */

/* Api call */
export interface UpdateBrandAction {
  type: typeof actionTypes.UPDATE_BRAND;
  id: number;
  title: string;
  description: string;
}
/* States */
export interface UpdateBrandStartAction {
  type: typeof actionTypes.UPDATE_BRAND_START;
}
export interface UpdateBrandSucceedAction {
  type: typeof actionTypes.UPDATE_BRAND_SUCCEED;
  brandsArray: TBrandReceivedObj[];
  successMessage: string;
}
export interface UpdateBrandFailedAction {
  type: typeof actionTypes.UPDATE_BRAND_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Brand (Head)
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
  brandsArray: TBrandReceivedObj[];
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
export type TWheelbaseReceivedObj = {
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
  wheelbaseObj: TWheelbaseReceivedObj;
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
  wheelbasesArray: TWheelbaseReceivedObj[];
}
export interface GetWheelbasesFailedAction {
  type: typeof actionTypes.GET_WHEELBASES_FAILED;
  errorMessage: string;
}

/* ============================================================== */
//  Make (Head)
/* ============================================================== */

/* --------------------------- */
// Create Make (Head)
/* --------------------------- */
/* types */
// Type of Objs being submitted
export type TMakeSubmitData = {
  gvw: string;
  year: string;
  price: string;
  title: string;
  length: string;
  brand_id: string;
  engine_cap: string;
  horsepower: string;
  description: string;
  wheelbase_id: string;
  transmission: string;
};

// type of Objs received on succees
export type TMakeReceivedObj = {
  id: number;
  gvw: string;
  year: string;
  title: string;
  price: number;
  length: string;
  available: boolean;
  engine_cap: string;
  horsepower: string;
  description: string;
  transmission: string;
  brand: TBrandReceivedObj;
  wheelbase: TWheelbaseReceivedObj;
};

/*  Api call */
export interface CreateMakeAction {
  type: typeof actionTypes.CREATE_MAKE;
  createMakeSubmitData: TMakeSubmitData;
}
/*  States */
export interface CreateMakeStartAction {
  type: typeof actionTypes.CREATE_MAKE_START;
}
export interface CreateMakeSucceedAction {
  type: typeof actionTypes.CREATE_MAKE_SUCCEED;
  makeObj: TMakeReceivedObj;
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
  makesArray: TMakeReceivedObj[];
}
export interface GetMakesFailedAction {
  type: typeof actionTypes.GET_MAKES_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type SalesActionTypes =
  /* ------------------------ */
  | ClearSalesStateAction
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
  | CreateMakeAction
  | CreateMakeStartAction
  | CreateMakeSucceedAction
  | CreateMakeFailedAction
  /* ------------------------ */
  | GetMakesAction
  | GetMakesStartAction
  | GetMakesSucceedAction
  | GetMakesFailedAction;

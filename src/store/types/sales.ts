import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface SalesInitialState {
  readonly loading: boolean;
  readonly errorMessage: string | null;
  readonly successMessage: string | null;
  readonly makeObject: TMakeObject | null;
  readonly brandObject: TBrandObject | null;
  readonly wheelbaseObject: TWheelbaseObject | null;
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
// Get All Brands (Head)
/* ============================================================== */

/* Api call */
export interface GetBrandsHeadAction {
  type: typeof actionTypes.GET_BRANDS_HEAD;
}
/* States */
export interface GetBrandsHeadStartAction {
  type: typeof actionTypes.GET_BRANDS_HEAD_START;
}
export interface GetBrandsHeadSucceedAction {
  type: typeof actionTypes.GET_BRANDS_HEAD_SUCCEED;
}
export interface GetBrandsHeadFailedAction {
  type: typeof actionTypes.GET_BRANDS_HEAD_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Create Brand (Head)
/* ============================================================== */

/* types */
export type TBrandObject = { id: string; title: string; description: string; available: boolean };

/*  Api call */
export interface CreateBrandHeadAction {
  type: typeof actionTypes.CREATE_BRAND_HEAD;
  title: string;
  description: string;
}
/*  States */
export interface CreateBrandHeadStartAction {
  type: typeof actionTypes.CREATE_BRAND_HEAD_START;
}
export interface CreateBrandHeadSucceedAction {
  type: typeof actionTypes.CREATE_BRAND_HEAD_SUCCEED;
  brandObject: TBrandObject;
  successMessage: string;
}
export interface CreateBrandHeadFailedAction {
  type: typeof actionTypes.CREATE_BRAND_HEAD_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Create Wheelbase (Head)
/* ============================================================== */

/* types */
export type TWheelbaseObject = {
  id: string;
  title: string;
  description: string;
  value: number | null;
  available: boolean;
};

/* Api call */
export interface CreateWheelbaseHeadAction {
  type: typeof actionTypes.CREATE_WHEELBASE_HEAD;
  title: string;
  description: string;
}

/* States */
export interface CreateWheelbaseHeadStartAction {
  type: typeof actionTypes.CREATE_WHEELBASE_HEAD_START;
}

export interface CreateWheelbaseHeadSucceedAction {
  type: typeof actionTypes.CREATE_WHEELBASE_HEAD_SUCCEED;
  wheelbaseObject: TWheelbaseObject;
  successMessage: string;
}
export interface CreateWheelbaseHeadFailedAction {
  type: typeof actionTypes.CREATE_WHEELBASE_HEAD_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Create Make (Head)
/* ============================================================== */

/* types */
// Type of objects being submitted
export type TMakeHeadSubmit = {
  gvw: string;
  year: number;
  price: number;
  title: string;
  length: string;
  brand_id: number;
  engine_cap: string;
  horsepower: string;
  description: string;
  wheelbase_id: number;
  transmission: string;
};

// type of objects received on succees
export type TMakeObject = {
  id: number;
  gvw: string;
  year: string;
  title: string;
  price: number;
  length: string;
  brand_id: number;
  available: boolean;
  engine_cap: string;
  horsepower: string;
  description: string;
  wheelbase_id: number;
  transmission: string;
};

/*  Api call */
export interface CreateMakeHeadAction {
  type: typeof actionTypes.CREATE_MAKE_HEAD;
  createMakeSubmitData: TMakeHeadSubmit;
}
/*  States */
export interface CreateMakeHeadStartAction {
  type: typeof actionTypes.CREATE_MAKE_HEAD_START;
}
export interface CreateMakeHeadSucceedAction {
  type: typeof actionTypes.CREATE_MAKE_HEAD_SUCCEED;
  makeObject: TMakeObject;
  successMessage: string;
}
export interface CreateMakeHeadFailedAction {
  type: typeof actionTypes.CREATE_MAKE_HEAD_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type SalesActionTypes =
  /* ------------------------ */
  | ClearSalesStateAction
  /* ------------------------ */
  | GetBrandsHeadAction
  | GetBrandsHeadStartAction
  | GetBrandsHeadSucceedAction
  | GetBrandsHeadFailedAction
  /* ------------------------ */
  | CreateBrandHeadAction
  | CreateBrandHeadStartAction
  | CreateBrandHeadSucceedAction
  | CreateBrandHeadFailedAction
  /* ------------------------ */
  | CreateWheelbaseHeadAction
  | CreateWheelbaseHeadStartAction
  | CreateWheelbaseHeadSucceedAction
  | CreateWheelbaseHeadFailedAction
  /* ------------------------ */
  | CreateMakeHeadAction
  | CreateMakeHeadStartAction
  | CreateMakeHeadSucceedAction
  | CreateMakeHeadFailedAction;

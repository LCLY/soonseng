import * as actionTypes from 'src/store/actions/actionTypes';
// Central hub for all the types and actionTypes

import {
  CreateRoleAction,
  CreateRoleFailedAction,
  CreateRoleStartAction,
  CreateRoleSucceedAction,
  CreateUserAction,
  CreateUserFailedAction,
  CreateUserStartAction,
  CreateUserSucceedAction,
  DeleteRoleAction,
  DeleteRoleFailedAction,
  DeleteRoleStartAction,
  DeleteRoleSucceedAction,
  DeleteUserAction,
  DeleteUserFailedAction,
  DeleteUserStartAction,
  DeleteUserSucceedAction,
  GetRolesAction,
  GetRolesFailedAction,
  GetRolesStartAction,
  GetRolesSucceedAction,
  GetUsersAction,
  GetUsersFailedAction,
  GetUsersStartAction,
  GetUsersSucceedAction,
  UpdateRoleAction,
  UpdateRoleFailedAction,
  UpdateRoleStartAction,
  UpdateRoleSucceedAction,
  UpdateUserAction,
  UpdateUserFailedAction,
  UpdateUserStartAction,
  UpdateUserSucceedAction,
} from 'src/store/types/dashboard/users';

import {
  CreateChargesFeesAction,
  CreateChargesFeesFailedAction,
  CreateChargesFeesStartAction,
  CreateChargesFeesSucceedAction,
  DeleteChargesFeesAction,
  DeleteChargesFeesFailedAction,
  DeleteChargesFeesStartAction,
  DeleteChargesFeesSucceedAction,
  GetChargesFeesAction,
  GetChargesFeesFailedAction,
  GetChargesFeesStartAction,
  GetChargesFeesSucceedAction,
  UpdateChargesFeesAction,
  UpdateChargesFeesFailedAction,
  UpdateChargesFeesStartAction,
  UpdateChargesFeesSucceedAction,
} from 'src/store/types/dashboard/fees';
import {
  // Length
  CreateLengthAction,
  CreateLengthStartAction,
  CreateLengthSucceedAction,
  CreateLengthFailedAction,
  GetLengthsAction,
  GetLengthsStartAction,
  GetLengthsSucceedAction,
  GetLengthsFailedAction,
  UpdateLengthAction,
  UpdateLengthStartAction,
  UpdateLengthSucceedAction,
  UpdateLengthFailedAction,
  DeleteLengthAction,
  DeleteLengthStartAction,
  DeleteLengthSucceedAction,
  DeleteLengthFailedAction,
  // Body
  CreateBodyAction,
  CreateBodyFailedAction,
  CreateBodyStartAction,
  CreateBodySucceedAction,
  GetBodiesAction,
  GetBodiesFailedAction,
  GetBodiesStartAction,
  GetBodiesSucceedAction,
  UpdateBodyAction,
  UpdateBodyFailedAction,
  UpdateBodyStartAction,
  UpdateBodySucceedAction,
  DeleteBodyAction,
  DeleteBodyFailedAction,
  DeleteBodyStartAction,
  DeleteBodySucceedAction,
} from 'src/store/types/dashboard/body';

import {
  // Accessory
  CreateAccessoryAction,
  CreateAccessoryFailedAction,
  CreateAccessoryStartAction,
  CreateAccessorySucceedAction,
  GetAccessoriesAction,
  GetAccessoriesFailedAction,
  GetAccessoriesStartAction,
  GetAccessoriesSucceedAction,
  UpdateAccessoryAction,
  UpdateAccessoryFailedAction,
  UpdateAccessoryStartAction,
  UpdateAccessorySucceedAction,
  DeleteAccessoryAction,
  DeleteAccessoryStartAction,
  DeleteAccessorySucceedAction,
  DeleteAccessoryFailedAction,
  // Body Accessory
  CreateBodyAccessoryAction,
  CreateBodyAccessoryStartAction,
  CreateBodyAccessorySucceedAction,
  CreateBodyAccessoryFailedAction,
  GetBodyAccessoriesAction,
  GetBodyAccessoriesStartAction,
  GetBodyAccessoriesSucceedAction,
  GetBodyAccessoriesFailedAction,
  UpdateBodyAccessoryAction,
  UpdateBodyAccessoryStartAction,
  UpdateBodyAccessorySucceedAction,
  UpdateBodyAccessoryFailedAction,
  DeleteBodyAccessoryAction,
  DeleteBodyAccessoryStartAction,
  DeleteBodyAccessorySucceedAction,
  DeleteBodyAccessoryFailedAction,
  // Clear body accessory array
  ClearBodyAccessoryArrayAction,
  /* body associated accessories */
  GetBodyAssociatedAccessoriesAction,
  GetBodyAssociatedAccessoriesStartAction,
  GetBodyAssociatedAccessoriesSucceedAction,
  GetBodyAssociatedAccessoriesFailedAction,

  // Body make Accessory
  CreateBodyMakeAccessoryAction,
  CreateBodyMakeAccessoryFailedAction,
  CreateBodyMakeAccessoryStartAction,
  CreateBodyMakeAccessorySucceedAction,
  DeleteBodyMakeAccessoryAction,
  DeleteBodyMakeAccessoryFailedAction,
  DeleteBodyMakeAccessoryStartAction,
  DeleteBodyMakeAccessorySucceedAction,
  GetBodyMakeAccessoriesAction,
  GetBodyMakeAccessoriesFailedAction,
  GetBodyMakeAccessoriesStartAction,
  GetBodyMakeAccessoriesSucceedAction,
  UpdateBodyMakeAccessoryAction,
  UpdateBodyMakeAccessoryFailedAction,
  UpdateBodyMakeAccessoryStartAction,
  UpdateBodyMakeAccessorySucceedAction,
  /* dimension associated accessories */
  GetDimensionAssociatedAccessoriesAction,
  GetDimensionAssociatedAccessoriesStartAction,
  GetDimensionAssociatedAccessoriesSucceedAction,
  GetDimensionAssociatedAccessoriesFailedAction,
} from 'src/store/types/dashboard/accessory';

import {
  CreateBodyMakeAction,
  CreateBodyMakeStartAction,
  CreateBodyMakeSucceedAction,
  CreateBodyMakeFailedAction,
  GetBodyMakesAction,
  GetBodyMakesStartAction,
  GetBodyMakesSucceedAction,
  GetBodyMakesFailedAction,
  UpdateBodyMakeAction,
  UpdateBodyMakeStartAction,
  UpdateBodyMakeSucceedAction,
  UpdateBodyMakeFailedAction,
  DeleteBodyMakeAction,
  DeleteBodyMakeStartAction,
  DeleteBodyMakeSucceedAction,
  DeleteBodyMakeFailedAction,
} from 'src/store/types/dashboard/bodymake';

import {
  CreateIntakeStatusAction,
  CreateIntakeStatusFailedAction,
  CreateIntakeStatusStartAction,
  CreateIntakeStatusSucceedAction,
  DeleteIntakeStatusAction,
  DeleteIntakeStatusFailedAction,
  DeleteIntakeStatusStartAction,
  DeleteIntakeStatusSucceedAction,
  GetIntakeStatusAction,
  GetIntakeStatusFailedAction,
  GetIntakeStatusStartAction,
  GetIntakeStatusSucceedAction,
  UpdateIntakeStatusAction,
  UpdateIntakeStatusFailedAction,
  UpdateIntakeStatusStartAction,
  UpdateIntakeStatusSucceedAction,
  CreateServiceTypesAction,
  CreateServiceTypesFailedAction,
  CreateServiceTypesStartAction,
  CreateServiceTypesSucceedAction,
  DeleteServiceTypesAction,
  DeleteServiceTypesFailedAction,
  DeleteServiceTypesStartAction,
  DeleteServiceTypesSucceedAction,
  GetServiceTypesAction,
  GetServiceTypesFailedAction,
  GetServiceTypesStartAction,
  GetServiceTypesSucceedAction,
  UpdateServiceTypesAction,
  UpdateServiceTypesFailedAction,
  UpdateServiceTypesStartAction,
  UpdateServiceTypesSucceedAction,
  /* -------------------- */
  // Task Title
  /* -------------------- */
  CreateServiceTaskAction,
  CreateServiceTaskStartAction,
  CreateServiceTaskSucceedAction,
  CreateServiceTaskFailedAction,
  GetServiceTasksAction,
  GetServiceTasksStartAction,
  GetServiceTasksSucceedAction,
  GetServiceTasksFailedAction,
  UpdateServiceTaskAction,
  UpdateServiceTaskStartAction,
  UpdateServiceTaskSucceedAction,
  UpdateServiceTaskFailedAction,
  DeleteServiceTaskAction,
  DeleteServiceTaskStartAction,
  DeleteServiceTaskSucceedAction,
  DeleteServiceTaskFailedAction,
} from 'src/store/types/dashboard/jobmonitoring';

import {
  // Brand
  GetBrandsAction,
  GetBrandsStartAction,
  GetBrandsSucceedAction,
  GetBrandsFailedAction,
  CreateBrandAction,
  CreateBrandStartAction,
  CreateBrandSucceedAction,
  CreateBrandFailedAction,
  UpdateBrandAction,
  UpdateBrandStartAction,
  UpdateBrandSucceedAction,
  UpdateBrandFailedAction,
  DeleteBrandAction,
  DeleteBrandStartAction,
  DeleteBrandSucceedAction,
  DeleteBrandFailedAction,
  //Wheelbase
  CreateWheelbaseAction,
  CreateWheelbaseStartAction,
  CreateWheelbaseSucceedAction,
  CreateWheelbaseFailedAction,
  GetWheelbasesAction,
  GetWheelbasesStartAction,
  GetWheelbasesSucceedAction,
  GetWheelbasesFailedAction,
  UpdateWheelbaseAction,
  UpdateWheelbaseStartAction,
  UpdateWheelbaseSucceedAction,
  UpdateWheelbaseFailedAction,
  DeleteWheelbaseAction,
  DeleteWheelbaseStartAction,
  DeleteWheelbaseSucceedAction,
  DeleteWheelbaseFailedAction,
  //Model/Make
  CreateMakeAction,
  CreateMakeStartAction,
  CreateMakeSucceedAction,
  CreateMakeFailedAction,
  GetMakesAction,
  GetMakesStartAction,
  GetMakesSucceedAction,
  GetMakesFailedAction,
  UpdateMakeAction,
  UpdateMakeStartAction,
  UpdateMakeSucceedAction,
  UpdateMakeFailedAction,
  DeleteMakeAction,
  DeleteMakeStartAction,
  DeleteMakeSucceedAction,
  DeleteMakeFailedAction,
  // Series
  GetSeriesAction,
  GetSeriesStartAction,
  GetSeriesSucceedAction,
  GetSeriesFailedAction,
  CreateSeriesAction,
  CreateSeriesStartAction,
  CreateSeriesSucceedAction,
  CreateSeriesFailedAction,
  UpdateSeriesAction,
  UpdateSeriesStartAction,
  UpdateSeriesSucceedAction,
  UpdateSeriesFailedAction,
  DeleteSeriesAction,
  DeleteSeriesStartAction,
  DeleteSeriesSucceedAction,
  DeleteSeriesFailedAction,
  // Make Wheelbase
  ClearMakeWheelbaseAction,
  CreateMakeWheelbaseAction,
  CreateMakeWheelbaseStartAction,
  CreateMakeWheelbaseSucceedAction,
  CreateMakeWheelbaseFailedAction,
  GetMakeWheelbasesAction,
  GetMakeWheelbasesStartAction,
  GetMakeWheelbasesSucceedAction,
  GetMakeWheelbasesFailedAction,
  UpdateMakeWheelbaseAction,
  UpdateMakeWheelbaseStartAction,
  UpdateMakeWheelbaseSucceedAction,
  UpdateMakeWheelbaseFailedAction,
  DeleteMakeWheelbaseAction,
  DeleteMakeWheelbaseStartAction,
  DeleteMakeWheelbaseSucceedAction,
  DeleteMakeWheelbaseFailedAction,
} from 'src/store/types/dashboard/make';
import { PURGE } from 'redux-persist';
import { TReceivedUserInfoObj } from './auth';

// initialState for reducers
export interface DashboardInitialState {
  readonly loading?: boolean;
  readonly errorMessage?: string | null;
  readonly successMessage?: string | null;
  // charges fees
  readonly chargesFeesObj?: TReceivedChargesFeesObj | null;
  readonly chargesFeesArray?: TReceivedChargesFeesObj[] | null;
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
  // body make
  readonly bodyMakeObj?: TReceivedBodyMakeObj | null;
  readonly bodyMakesArray?: TReceivedBodyMakeObj[] | null;
  // body accessory
  readonly bodyAccessoryObj?: TReceivedBodyAccessoryObj | null;
  readonly bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
  readonly bodyAssociatedAccessoriesArray?: TReceivedAccessoryObj[] | null;
  // body make accessory
  readonly bodyMakeAccessoryObj?: TReceivedBodyMakeAccessoryObj | null;
  readonly bodyMakeAccessoriesArray?: TReceivedBodyMakeAccessoryObj[] | null;
  readonly dimensionAssociatedAccessoriesArray?: TReceivedAccessoryObj[] | null;
  // accessory
  readonly accessoryObj?: TReceivedAccessoryObj | null;
  readonly accessoriesArray?: TReceivedAccessoryObj[] | null;
  // images array
  readonly imagesUploaded?: boolean;
  readonly imagesArray?: TReceivedImageObj[] | null;
  // job status array
  readonly intakeStatusArray?: TReceivedIntakeStatusObj[] | null;
  // service types array
  readonly serviceTypesArray?: TReceivedServiceTypesObj[] | null;
  // task titles array
  readonly serviceTasksArray?: TReceivedServiceTaskObj[] | null;
  // user/roles related
  readonly usersArray?: TReceivedUserInfoObj[] | null;
  readonly userRolesArray?: TReceivedUserRolesObj[] | null;
}

/* =============================================================================================== */
// Redux Persist Purge
/* =============================================================================================== */
export interface ReduxPersistPurgeAction {
  type: typeof PURGE;
}
/* =============================================================================================== */
// Clear all the dashboard state
/* =============================================================================================== */
export interface ClearDashboardStateAction {
  type: typeof actionTypes.CLEAR_DASHBOARD_STATE;
}

/* =============================================================================================== */
// Upload Image(s)
/* =============================================================================================== */

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
  successMessage: string;
}

export interface UploadImageFailedAction {
  type: typeof actionTypes.UPLOAD_IMAGE_FAILED;
  errorMessage: string;
}

/* =============================================================================================== */
// Delete Upload Image(s)
/* =============================================================================================== */

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

// All the general types used by the actions

/* =============================================================================================== */
// User Roles
/* =============================================================================================== */
// type
export type TReceivedUserRolesObj = {
  id: number;
  title: string;
  description: string;
  priceSalesPage: boolean;
  fullSalesPage: boolean;
  viewSalesDashboard: boolean;
  editSalesDashboard: boolean;
  salesmenDashboard: boolean;
  adminDashboard: boolean;
};
/* =============================================================================================== */
// Standard Charges and Fees
/* =============================================================================================== */
// type
export type TReceivedChargesFeesObj = { id: number; title: string; price: number; available: boolean };

/* =============================================================================================== */
//  Length
/* =============================================================================================== */
// type
export type TReceivedLengthObj = { id: number; title: string; description: string; available: boolean };

/* =============================================================================================== */
//  Body
/* =============================================================================================== */
/* types */
export type TReceivedBodyObj = {
  id: number;
  title: string;
  description: string;
  available: boolean;
  accessories: TReceivedAccessoryObj[];
  images: TReceivedImageObj[];
};

/* =============================================================================================== */
// Make
/* =============================================================================================== */
/* ---------------------------------------- */
// Brand
/* ---------------------------------------- */
export type TReceivedBrandObj = {
  id: number;
  title: string;
  description: string;
  series: TReceivedSeriesObj[];
  images: TReceivedImageObj[];
  available: boolean;
};

/* ---------------------------------------- */
// Make / Model
/* ---------------------------------------- */
/* types */
// Type of Objs being submitted through form
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

/* ---------------------------------------- */
// Series
/* ---------------------------------------- */
// type
export type TReceivedSeriesObj = {
  id: number;
  title: string;
  brand: number;
  available: boolean;
  images: TReceivedImageObj[];
};

/* ---------------------------------------- */
// Wheelbase
/* ---------------------------------------- */
/* types */
export type TReceivedWheelbaseObj = {
  id: number;
  title: string;
  description: string;
  value: number | null;
  available: boolean;
};

/* ---------------------------------------- */
// Make Wheelbase
/* ---------------------------------------- */
// type
export type TReceivedMakeWheelbaseObj = {
  id: number;
  price: number;
  original: boolean;
  make: TReceivedMakeObj;
  wheelbase: TReceivedWheelbaseObj;
};

/* =============================================================================================== */
// Body Make (Body Page) (tail)
/* =============================================================================================== */
/* types */
// Body make data when creating
export type TCreateBodyMakeData = {
  body_id: number;
  make_id: number;
  length_id: number;
  make_wheelbase_id: number;
  depth: string;
  width: string;
  height: string;
  price: number;
};
export type TUpdateBodyMakeData = {
  body_make_id: number;
  body_id: number;
  make_id: number;
  length_id: number;
  make_wheelbase_id: number;
  depth: string;
  width: string;
  height: string;
  price: number;
};
// Received body make object when action success
// Types
export type TReceivedBodyMakeObj = {
  id: number;
  length: TReceivedLengthObj;
  make_wheelbase: TReceivedMakeWheelbaseObj;
  body: TReceivedBodyObj;
  width: string;
  depth: string;
  height: string | null;
  price: number;
  images: TReceivedImageObj[];
  available: true;
};

/* =============================================================================================== */
// Accessory related types
/* =============================================================================================== */
/* types */
/* ------------------------------------------- */
// Accessory
/* ------------------------------------------- */
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
// form types
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

/* ------------------------------------------- */
// Body Accessory
/* ------------------------------------------- */
/* types */
// Body accessory data when creating
export type TReceivedBodyAccessoryObj = {
  id: number;
  available: boolean;
  body: TReceivedBodyObj;
  images: TReceivedImageObj[];
  accessory: TReceivedAccessoryObj;
};

/* ------------------------------------------- */
// Body Make Accessory
/* ------------------------------------------- */
/* types */
// Body accessory data when creating
export type TReceivedBodyMakeAccessoryObj = {
  id: number;
  accessory: TReceivedAccessoryObj;
  body_make: TReceivedBodyMakeObj;
  price: number;
  available: boolean;
};

/* ------------------------------------------- */
// Intake Status
/* ------------------------------------------- */
/* types */
export type TReceivedIntakeStatusObj = {
  id: number;
  title: string;
  description: string;
};

/* ------------------------------------------- */
// Service Types
/* ------------------------------------------- */
/* types */
export type TReceivedServiceTypesObj = {
  id: number;
  title: string;
  description: string;
};
/* ------------------------------------------- */
// Task Title
/* ------------------------------------------- */

export type TReceivedServiceTaskObj = {
  id: number;
  title: string;
  duration: number;
  description: string | null;
  service_type: TReceivedServiceTypesObj;
};

export interface IServiceTaskFormData {
  title: string;
  duration: number;
  description: string;
  service_type_id: number;
}

/* ================================================================================================= */
// Combine and export all action types
/* ================================================================================================= */
export type DashboardActionTypes =
  /* ======================================================================= */
  // Miscellaneous
  /* ======================================================================= */
  | ReduxPersistPurgeAction
  | ClearDashboardStateAction
  // Upload Image(s)
  | UploadImageAction
  | UploadImageStartAction
  | UploadImageSucceedAction
  | UploadImageFailedAction
  // Delete Image(s)
  | DeleteUploadImageAction
  | DeleteUploadImageStartAction
  | DeleteUploadImageSucceedAction
  | DeleteUploadImageFailedAction
  /* ======================================================================== */
  // User/Roles
  /* ====================================================================== */
  // users
  | GetUsersAction
  | GetUsersFailedAction
  | GetUsersStartAction
  | GetUsersSucceedAction
  | CreateUserAction
  | CreateUserFailedAction
  | CreateUserStartAction
  | CreateUserSucceedAction
  | DeleteUserAction
  | DeleteUserFailedAction
  | DeleteUserStartAction
  | DeleteUserSucceedAction
  | UpdateUserAction
  | UpdateUserFailedAction
  | UpdateUserStartAction
  | UpdateUserSucceedAction
  // Roles
  | GetRolesAction
  | GetRolesFailedAction
  | GetRolesStartAction
  | GetRolesSucceedAction
  | CreateRoleAction
  | CreateRoleFailedAction
  | CreateRoleStartAction
  | CreateRoleSucceedAction
  | DeleteRoleAction
  | DeleteRoleFailedAction
  | DeleteRoleStartAction
  | DeleteRoleSucceedAction
  | UpdateRoleAction
  | UpdateRoleFailedAction
  | UpdateRoleStartAction
  | UpdateRoleSucceedAction
  /* ======================================================================== */
  // Standard Charges and fees
  /* ====================================================================== */
  | CreateChargesFeesAction
  | CreateChargesFeesFailedAction
  | CreateChargesFeesStartAction
  | CreateChargesFeesSucceedAction
  | DeleteChargesFeesAction
  | DeleteChargesFeesFailedAction
  | DeleteChargesFeesStartAction
  | DeleteChargesFeesSucceedAction
  | GetChargesFeesAction
  | GetChargesFeesFailedAction
  | GetChargesFeesStartAction
  | GetChargesFeesSucceedAction
  | UpdateChargesFeesAction
  | UpdateChargesFeesFailedAction
  | UpdateChargesFeesStartAction
  | UpdateChargesFeesSucceedAction
  /* ======================================================================== */
  // Brand (Make Page)
  /* ====================================================================== */
  | GetBrandsAction
  | GetBrandsStartAction
  | GetBrandsSucceedAction
  | GetBrandsFailedAction
  | CreateBrandAction
  | CreateBrandStartAction
  | CreateBrandSucceedAction
  | CreateBrandFailedAction
  | UpdateBrandAction
  | UpdateBrandStartAction
  | UpdateBrandSucceedAction
  | UpdateBrandFailedAction
  | DeleteBrandAction
  | DeleteBrandStartAction
  | DeleteBrandSucceedAction
  | DeleteBrandFailedAction
  /* ======================================================================= */
  // Wheelbase (Make Page)
  /* ======================================================================= */
  | CreateWheelbaseAction
  | CreateWheelbaseStartAction
  | CreateWheelbaseSucceedAction
  | CreateWheelbaseFailedAction
  | GetWheelbasesAction
  | GetWheelbasesStartAction
  | GetWheelbasesSucceedAction
  | GetWheelbasesFailedAction
  | UpdateWheelbaseAction
  | UpdateWheelbaseStartAction
  | UpdateWheelbaseSucceedAction
  | UpdateWheelbaseFailedAction
  | DeleteWheelbaseAction
  | DeleteWheelbaseStartAction
  | DeleteWheelbaseSucceedAction
  | DeleteWheelbaseFailedAction
  /* ======================================================================= */
  // Make
  /* ======================================================================= */
  | CreateMakeAction
  | CreateMakeStartAction
  | CreateMakeSucceedAction
  | CreateMakeFailedAction
  | GetMakesAction
  | GetMakesStartAction
  | GetMakesSucceedAction
  | GetMakesFailedAction
  | UpdateMakeAction
  | UpdateMakeStartAction
  | UpdateMakeSucceedAction
  | UpdateMakeFailedAction
  | DeleteMakeAction
  | DeleteMakeStartAction
  | DeleteMakeSucceedAction
  | DeleteMakeFailedAction
  /* ======================================================================= */
  // Series
  /* ======================================================================= */
  | GetSeriesAction
  | GetSeriesStartAction
  | GetSeriesSucceedAction
  | GetSeriesFailedAction
  | CreateSeriesAction
  | CreateSeriesStartAction
  | CreateSeriesSucceedAction
  | CreateSeriesFailedAction
  | UpdateSeriesAction
  | UpdateSeriesStartAction
  | UpdateSeriesSucceedAction
  | UpdateSeriesFailedAction
  | DeleteSeriesAction
  | DeleteSeriesStartAction
  | DeleteSeriesSucceedAction
  | DeleteSeriesFailedAction
  /* ======================================================================= */
  // Make Wheelbase (Make Page)
  /* ======================================================================= */
  | ClearMakeWheelbaseAction
  | CreateMakeWheelbaseAction
  | CreateMakeWheelbaseStartAction
  | CreateMakeWheelbaseSucceedAction
  | CreateMakeWheelbaseFailedAction
  | GetMakeWheelbasesAction
  | GetMakeWheelbasesStartAction
  | GetMakeWheelbasesSucceedAction
  | GetMakeWheelbasesFailedAction
  | UpdateMakeWheelbaseAction
  | UpdateMakeWheelbaseStartAction
  | UpdateMakeWheelbaseSucceedAction
  | UpdateMakeWheelbaseFailedAction
  | DeleteMakeWheelbaseAction
  | DeleteMakeWheelbaseStartAction
  | DeleteMakeWheelbaseSucceedAction
  | DeleteMakeWheelbaseFailedAction
  /* ======================================================================= */
  // Body
  /* ======================================================================= */
  | CreateBodyAction
  | CreateBodyStartAction
  | CreateBodySucceedAction
  | CreateBodyFailedAction
  | GetBodiesAction
  | GetBodiesStartAction
  | GetBodiesSucceedAction
  | GetBodiesFailedAction
  | UpdateBodyAction
  | UpdateBodyStartAction
  | UpdateBodySucceedAction
  | UpdateBodyFailedAction
  | DeleteBodyAction
  | DeleteBodyStartAction
  | DeleteBodySucceedAction
  | DeleteBodyFailedAction

  /* ======================================================================= */
  // Length
  /* ======================================================================= */
  | CreateLengthAction
  | CreateLengthStartAction
  | CreateLengthSucceedAction
  | CreateLengthFailedAction
  | GetLengthsAction
  | GetLengthsStartAction
  | GetLengthsSucceedAction
  | GetLengthsFailedAction
  | UpdateLengthAction
  | UpdateLengthStartAction
  | UpdateLengthSucceedAction
  | UpdateLengthFailedAction
  | DeleteLengthAction
  | DeleteLengthStartAction
  | DeleteLengthSucceedAction
  | DeleteLengthFailedAction
  /* ======================================================================= */
  // Body Make
  /* ======================================================================= */
  | CreateBodyMakeAction
  | CreateBodyMakeStartAction
  | CreateBodyMakeSucceedAction
  | CreateBodyMakeFailedAction
  | GetBodyMakesAction
  | GetBodyMakesStartAction
  | GetBodyMakesSucceedAction
  | GetBodyMakesFailedAction
  | UpdateBodyMakeAction
  | UpdateBodyMakeStartAction
  | UpdateBodyMakeSucceedAction
  | UpdateBodyMakeFailedAction
  | DeleteBodyMakeAction
  | DeleteBodyMakeStartAction
  | DeleteBodyMakeSucceedAction
  | DeleteBodyMakeFailedAction
  /* ======================================================================= */
  // Accessory (Accessory Page)
  /* ======================================================================= */
  | CreateAccessoryAction
  | CreateAccessoryStartAction
  | CreateAccessorySucceedAction
  | CreateAccessoryFailedAction
  | GetAccessoriesAction
  | GetAccessoriesStartAction
  | GetAccessoriesSucceedAction
  | GetAccessoriesFailedAction
  | UpdateAccessoryAction
  | UpdateAccessoryStartAction
  | UpdateAccessorySucceedAction
  | UpdateAccessoryFailedAction
  | DeleteAccessoryAction
  | DeleteAccessoryStartAction
  | DeleteAccessorySucceedAction
  | DeleteAccessoryFailedAction
  /* ======================================================================= */
  // Body Accessory (Body Page)
  /* ======================================================================= */
  | CreateBodyAccessoryAction
  | CreateBodyAccessoryStartAction
  | CreateBodyAccessorySucceedAction
  | CreateBodyAccessoryFailedAction
  | GetBodyAccessoriesAction
  | GetBodyAccessoriesStartAction
  | GetBodyAccessoriesSucceedAction
  | GetBodyAccessoriesFailedAction
  | UpdateBodyAccessoryAction
  | UpdateBodyAccessoryStartAction
  | UpdateBodyAccessorySucceedAction
  | UpdateBodyAccessoryFailedAction
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
  /* ======================================================================= */
  // Body Make Accessory
  /* ======================================================================= */
  | CreateBodyMakeAccessoryAction
  | CreateBodyMakeAccessoryFailedAction
  | CreateBodyMakeAccessoryStartAction
  | CreateBodyMakeAccessorySucceedAction
  | DeleteBodyMakeAccessoryAction
  | DeleteBodyMakeAccessoryFailedAction
  | DeleteBodyMakeAccessoryStartAction
  | DeleteBodyMakeAccessorySucceedAction
  | GetBodyMakeAccessoriesAction
  | GetBodyMakeAccessoriesFailedAction
  | GetBodyMakeAccessoriesStartAction
  | GetBodyMakeAccessoriesSucceedAction
  | UpdateBodyMakeAccessoryAction
  | UpdateBodyMakeAccessoryFailedAction
  | UpdateBodyMakeAccessoryStartAction
  | UpdateBodyMakeAccessorySucceedAction
  /* dimension associated accessories */
  | GetDimensionAssociatedAccessoriesAction
  | GetDimensionAssociatedAccessoriesStartAction
  | GetDimensionAssociatedAccessoriesSucceedAction
  | GetDimensionAssociatedAccessoriesFailedAction
  /* ======================================================================= */
  // Job monitoring page
  /* ======================================================================= */
  /* Intake Status */
  | CreateIntakeStatusAction
  | CreateIntakeStatusStartAction
  | CreateIntakeStatusFailedAction
  | CreateIntakeStatusSucceedAction
  | GetIntakeStatusAction
  | GetIntakeStatusStartAction
  | GetIntakeStatusFailedAction
  | GetIntakeStatusSucceedAction
  | DeleteIntakeStatusAction
  | DeleteIntakeStatusStartAction
  | DeleteIntakeStatusFailedAction
  | DeleteIntakeStatusSucceedAction
  | UpdateIntakeStatusAction
  | UpdateIntakeStatusStartAction
  | UpdateIntakeStatusFailedAction
  | UpdateIntakeStatusSucceedAction
  /* Service Types */
  | CreateServiceTypesAction
  | CreateServiceTypesStartAction
  | CreateServiceTypesFailedAction
  | CreateServiceTypesSucceedAction
  | GetServiceTypesAction
  | GetServiceTypesStartAction
  | GetServiceTypesFailedAction
  | GetServiceTypesSucceedAction
  | UpdateServiceTypesAction
  | UpdateServiceTypesStartAction
  | UpdateServiceTypesFailedAction
  | UpdateServiceTypesSucceedAction
  | DeleteServiceTypesAction
  | DeleteServiceTypesStartAction
  | DeleteServiceTypesFailedAction
  | DeleteServiceTypesSucceedAction
  /* Service Task title */
  | CreateServiceTaskAction
  | CreateServiceTaskStartAction
  | CreateServiceTaskSucceedAction
  | CreateServiceTaskFailedAction
  | GetServiceTasksAction
  | GetServiceTasksStartAction
  | GetServiceTasksSucceedAction
  | GetServiceTasksFailedAction
  | UpdateServiceTaskAction
  | UpdateServiceTaskStartAction
  | UpdateServiceTaskSucceedAction
  | UpdateServiceTaskFailedAction
  | DeleteServiceTaskAction
  | DeleteServiceTaskStartAction
  | DeleteServiceTaskSucceedAction
  | DeleteServiceTaskFailedAction;

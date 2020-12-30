import * as actionTypes from 'src/store/actions/actionTypes';
import {
  TCreateAccessoryData,
  TReceivedAccessoryObj,
  TReceivedBodyAccessoryObj,
  TReceivedBodyMakeAccessoryObj,
  TUpdateAccessoryData,
} from 'src/store/types/dashboard';

/* =============================================================================================== */
// Accessory
/* =============================================================================================== */

/* --------------------------- */
// Create Accessory (tail)
/* --------------------------- */
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

/* =============================================================================================== */
// Body Accessory
/* =============================================================================================== */
/* --------------------------- */
// Create Body Accessory (tail)
/* --------------------------- */
/*  Api call */
export interface CreateBodyAccessoryAction {
  type: typeof actionTypes.CREATE_BODYACCESSORY;
  body_id: number;
  accessory_id: number;
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

/* =============================================================================================== */
// Body Make Accessory
/* =============================================================================================== */
/* --------------------------- */
// Create Body Make Accessory (tail)
/* --------------------------- */
/*  Api call */
export interface CreateBodyMakeAccessoryAction {
  type: typeof actionTypes.CREATE_BODYMAKE_ACCESSORY;
  price: number;
  accessory_id: number;
  body_make_id: number;
}
/*  States */
export interface CreateBodyMakeAccessoryStartAction {
  type: typeof actionTypes.CREATE_BODYMAKE_ACCESSORY_START;
}
export interface CreateBodyMakeAccessorySucceedAction {
  type: typeof actionTypes.CREATE_BODYMAKE_ACCESSORY_SUCCEED;
  bodyMakeAccessoriesArray: TReceivedBodyMakeAccessoryObj[];
  successMessage: string;
}
export interface CreateBodyMakeAccessoryFailedAction {
  type: typeof actionTypes.CREATE_BODYMAKE_ACCESSORY_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Body Make Accessory (Tail)
/* --------------------------- */

/* Api call */
export interface UpdateBodyMakeAccessoryAction {
  type: typeof actionTypes.UPDATE_BODYMAKE_ACCESSORY;
  price: number;
  accessory_id: number;
  body_make_id: number;
  body_make_accessory_id: number;
}

/* States */
export interface UpdateBodyMakeAccessoryStartAction {
  type: typeof actionTypes.UPDATE_BODYMAKE_ACCESSORY_START;
}
export interface UpdateBodyMakeAccessorySucceedAction {
  type: typeof actionTypes.UPDATE_BODYMAKE_ACCESSORY_SUCCEED;
  bodyMakeAccessoriesArray: TReceivedBodyMakeAccessoryObj[];
  successMessage: string;
}
export interface UpdateBodyMakeAccessoryFailedAction {
  type: typeof actionTypes.UPDATE_BODYMAKE_ACCESSORY_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Body Make Accessories (tail)
/* --------------------------- */

/* Api call */
export interface GetBodyMakeAccessoriesAction {
  type: typeof actionTypes.GET_BODYMAKE_ACCESSORIES;
  body_make_id: number;
}
/* States */
export interface GetBodyMakeAccessoriesStartAction {
  type: typeof actionTypes.GET_BODYMAKE_ACCESSORIES_START;
}
export interface GetBodyMakeAccessoriesSucceedAction {
  type: typeof actionTypes.GET_BODYMAKE_ACCESSORIES_SUCCEED;
  bodyMakeAccessoriesArray: TReceivedBodyMakeAccessoryObj[];
}
export interface GetBodyMakeAccessoriesFailedAction {
  type: typeof actionTypes.GET_BODYMAKE_ACCESSORIES_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Delete body Make Accessory (tail)
/* --------------------------- */

/* Api call */
export interface DeleteBodyMakeAccessoryAction {
  type: typeof actionTypes.DELETE_BODYMAKE_ACCESSORY;
  body_make_id: number;
  body_make_accessory_id: number;
}
/* States */
export interface DeleteBodyMakeAccessoryStartAction {
  type: typeof actionTypes.DELETE_BODYMAKE_ACCESSORY_START;
}
export interface DeleteBodyMakeAccessorySucceedAction {
  type: typeof actionTypes.DELETE_BODYMAKE_ACCESSORY_SUCCEED;
  bodyMakeAccessoriesArray: TReceivedBodyMakeAccessoryObj[];
  successMessage: string;
}
export interface DeleteBodyMakeAccessoryFailedAction {
  type: typeof actionTypes.DELETE_BODYMAKE_ACCESSORY_FAILED;
  errorMessage: string;
}

/* ------------------------------------------ */
// Get dimension associated Accessories (tail)
/* ------------------------------------------ */

/* Api call */
export interface GetDimensionAssociatedAccessoriesAction {
  type: typeof actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES;
}
/* States */
export interface GetDimensionAssociatedAccessoriesStartAction {
  type: typeof actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES_START;
}
export interface GetDimensionAssociatedAccessoriesSucceedAction {
  type: typeof actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES_SUCCEED;
  dimensionAssociatedAccessoriesArray: TReceivedAccessoryObj[];
}
export interface GetDimensionAssociatedAccessoriesFailedAction {
  type: typeof actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES_FAILED;
  errorMessage: string;
}

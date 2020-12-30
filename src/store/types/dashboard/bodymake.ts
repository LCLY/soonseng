import * as actionTypes from 'src/store/actions/actionTypes';
import { TCreateBodyMakeData, TReceivedBodyMakeObj, TUpdateBodyMakeData } from 'src/store/types/dashboard';

/* =============================================================================================== */
// Body Make (Body Page) (tail)
/* =============================================================================================== */

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

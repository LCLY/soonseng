import * as actionTypes from 'src/store/actions/actionTypes';
import { TReceivedBodyObj, TReceivedLengthObj } from 'src/store/types/dashboard';

/* ============================================================== */
//  Length
/* ============================================================== */

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
//  Body  (Body Page) (tail)
/* ============================================================== */

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

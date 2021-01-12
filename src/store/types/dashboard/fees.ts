import * as actionTypes from 'src/store/actions/actionTypes';
import { TReceivedChargesFeesObj } from '../dashboard';

/* =============================================================================================== */
// Standard charges and fees
/* =============================================================================================== */

/* --------------------------- */
// Create Standard charges and fees
/* --------------------------- */
/*  Api call */
export interface CreateChargesFeesAction {
  type: typeof actionTypes.CREATE_CHARGES_FEES;
  title: string;
  price: number;
}
/*  States */
export interface CreateChargesFeesStartAction {
  type: typeof actionTypes.CREATE_CHARGES_FEES_START;
}
export interface CreateChargesFeesSucceedAction {
  type: typeof actionTypes.CREATE_CHARGES_FEES_SUCCEED;
  chargesFeesArray: TReceivedChargesFeesObj[];
  successMessage: string;
}
export interface CreateChargesFeesFailedAction {
  type: typeof actionTypes.CREATE_CHARGES_FEES_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Standard charges and fees
/* --------------------------- */
/* Api call */
export interface UpdateChargesFeesAction {
  type: typeof actionTypes.UPDATE_CHARGES_FEES;
  fee_id: number;
  title: string;
  price: number;
}
/* States */
export interface UpdateChargesFeesStartAction {
  type: typeof actionTypes.UPDATE_CHARGES_FEES_START;
}
export interface UpdateChargesFeesSucceedAction {
  type: typeof actionTypes.UPDATE_CHARGES_FEES_SUCCEED;
  chargesFeesArray: TReceivedChargesFeesObj[];
  successMessage: string;
}
export interface UpdateChargesFeesFailedAction {
  type: typeof actionTypes.UPDATE_CHARGES_FEES_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Standard charges and fees
/* --------------------------- */
/* Api call */
export interface GetChargesFeesAction {
  type: typeof actionTypes.GET_CHARGES_FEES;
}
/* States */
export interface GetChargesFeesStartAction {
  type: typeof actionTypes.GET_CHARGES_FEES_START;
}
export interface GetChargesFeesSucceedAction {
  type: typeof actionTypes.GET_CHARGES_FEES_SUCCEED;
  chargesFeesArray: TReceivedChargesFeesObj[];
}
export interface GetChargesFeesFailedAction {
  type: typeof actionTypes.GET_CHARGES_FEES_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Delete Standard charges and fees
/* --------------------------- */
/* Api call */
export interface DeleteChargesFeesAction {
  type: typeof actionTypes.DELETE_CHARGES_FEES;
  fee_id: number;
}
/* States */
export interface DeleteChargesFeesStartAction {
  type: typeof actionTypes.DELETE_CHARGES_FEES_START;
}
export interface DeleteChargesFeesSucceedAction {
  type: typeof actionTypes.DELETE_CHARGES_FEES_SUCCEED;
  chargesFeesArray: TReceivedChargesFeesObj[];
  successMessage: string;
}
export interface DeleteChargesFeesFailedAction {
  type: typeof actionTypes.DELETE_CHARGES_FEES_FAILED;
  errorMessage: string;
}

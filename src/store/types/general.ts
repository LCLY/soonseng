import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface GeneralInitialState {
  readonly projectVersion?: string;
  readonly quotationDiscount?: number;
  readonly notification?: INotification;
}

/* ============================================================== */
// Save Project Version
/* ============================================================== */
export interface SaveProjectVersionAction {
  type: typeof actionTypes.SAVE_PROJECT_VERSION;
  projectVersion: string;
}

/* ============================================================== */
// Clear local storage
/* ============================================================== */
export interface ClearLocalStorageAction {
  type: typeof actionTypes.CLEAR_LOCALSTORAGE;
  projectVersion: string;
}
/* ============================================================== */
// Set quotation discount
/* ============================================================== */
export interface SetQuotationDiscountAction {
  type: typeof actionTypes.SET_QUOTATION_DISCOUNT;
  quotationDiscount: number;
}
/* ============================================================== */
// Set notifications
/* ============================================================== */

export interface INotificatonArray {
  created_at: string;
  created_by: string;
  curr_status: string;
  description: string;
  id: number;
  intake: string;
  title: string;
}

export interface INotification {
  notificationNumber: number;
  notificationArray: INotificatonArray[];
}

export interface SetNotificationAction {
  type: typeof actionTypes.SET_NOTIFICATION;
  notification: INotification;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type GeneralActionTypes =
  /* -------------------- */
  // Save project's version
  /* -------------------- */
  | SaveProjectVersionAction
  /* -------------------- */
  // Save project's version
  /* -------------------- */
  | ClearLocalStorageAction
  /* -------------------- */
  // Set quotation discount
  /* -------------------- */
  | SetQuotationDiscountAction
  | SetNotificationAction;

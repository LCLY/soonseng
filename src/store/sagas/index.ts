import { takeEvery, all } from 'redux-saga/effects';
//allow us to listen to certain actions and do something when they occur
import * as actionTypes from '../actions/actionTypes';
import { DashboardActionTypes } from '../types/dashboard';
import { SalesActionTypes } from '../types/sales';

import {
  // Upload/Delete Image(s)
  uploadImageSaga,
  deleteUploadImageSaga,
  // Brand
  createBrandSaga,
  getBrandsSaga,
  updateBrandSaga,
  // Wheelbase
  createWheelbaseSaga,
  getWheelbasesSaga,
  updateWheelbaseSaga,
  // Make
  createMakeSaga,
  getMakesSaga,
  updateMakeSaga,
  // Series
  getSeriesSaga,
  // Body
  createBodySaga,
  getBodiesSaga,
  updateBodySaga,
  // Length
  createLengthSaga,
  getLengthsSaga,
  updateLengthSaga,
  // Body Make
  createBodyMakeSaga,
  getBodyMakesSaga,
  updateBodyMakeSaga,
  // Body Accessory
  createBodyAccessorySaga,
  getBodyAccessoriesSaga,
  updateBodyAccessorySaga,
  // Accessory
  createAccessorySaga,
  getAccessoriesSaga,
  updateAccessorySaga,
} from './dashboard';

import {
  // Get sales lengths
  getSalesLengthsSaga,
  // Get sales bodies
  getSalesBodiesSaga,
  // Get sales BodyMakes
  getSalesBodyMakesSaga,
  // Get sales accessories
  getSalesAccessoriesSaga,
} from './sales';

export function* watchSales() {
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_SALES_LENGTHS, getSalesLengthsSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_SALES_BODIES, getSalesBodiesSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_SALES_BODYMAKES, getSalesBodyMakesSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_SALES_ACCESSORIES, getSalesAccessoriesSaga)]);
}

export function* watchDashboard() {
  // Upload Images
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPLOAD_IMAGE, uploadImageSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_UPLOAD_IMAGE, deleteUploadImageSaga)]);
  // Brand
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_BRAND, createBrandSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_BRANDS, getBrandsSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_BRAND, updateBrandSaga)]);
  // Wheelbase
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_WHEELBASE, createWheelbaseSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_WHEELBASES, getWheelbasesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_WHEELBASE, updateWheelbaseSaga)]);
  // Make
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_MAKE, createMakeSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_MAKES, getMakesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_MAKE, updateMakeSaga)]);
  //  Series
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_SERIES, getSeriesSaga)]);

  // Body
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_BODY, createBodySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_BODIES, getBodiesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_BODY, updateBodySaga)]);
  // Length
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_LENGTH, createLengthSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_LENGTHS, getLengthsSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_LENGTH, updateLengthSaga)]);
  // Body Length
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_BODYMAKE, createBodyMakeSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_BODYMAKES, getBodyMakesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_BODYMAKE, updateBodyMakeSaga)]);
  // Body Accessory
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_BODYACCESSORY, createBodyAccessorySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_BODYACCESSORIES, getBodyAccessoriesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_BODYACCESSORY, updateBodyAccessorySaga)]);
  // Accessory
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_ACCESSORY, createAccessorySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_ACCESSORIES, getAccessoriesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_ACCESSORY, updateAccessorySaga)]);
}

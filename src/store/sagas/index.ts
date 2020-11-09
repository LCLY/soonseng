import { takeEvery, all } from 'redux-saga/effects';
//allow us to listen to certain actions and do something when they occur
import * as actionTypes from '../actions/actionTypes';
import { SalesActionTypes } from '../types/sales';

import {
  // Upload Image(s)
  uploadImageSaga,
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
  // Body
  createBodySaga,
  getBodiesSaga,
  updateBodySaga,
  // Length
  createLengthSaga,
  getLengthsSaga,
  updateLengthSaga,
} from './sales';

export function* watchAuth() {
  // Upload Images
  yield all([takeEvery<SalesActionTypes>(actionTypes.UPLOAD_IMAGE, uploadImageSaga)]);
  // Brand
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_BRAND, createBrandSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_BRANDS, getBrandsSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.UPDATE_BRAND, updateBrandSaga)]);
  // Wheelbase
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_WHEELBASE, createWheelbaseSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_WHEELBASES, getWheelbasesSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.UPDATE_WHEELBASE, updateWheelbaseSaga)]);
  // Make
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_MAKE, createMakeSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_MAKES, getMakesSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.UPDATE_MAKE, updateMakeSaga)]);
  // Body
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_BODY, createBodySaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_BODIES, getBodiesSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.UPDATE_BODY, updateBodySaga)]);
  // Length
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_LENGTH, createLengthSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_LENGTHS, getLengthsSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.UPDATE_LENGTH, updateLengthSaga)]);
}

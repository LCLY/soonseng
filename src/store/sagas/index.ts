import { takeEvery, all } from 'redux-saga/effects';
//allow us to listen to certain actions and do something when they occur
import * as actionTypes from '../actions/actionTypes';
import { SalesActionTypes } from '../types/sales';

import {
  // Brand
  createBrandSaga,
  getBrandsSaga,
  updateBrandSaga,
  // Wheelbase
  createWheelbaseSaga,
  getWheelbasesSaga,
  // Make
  createMakeSaga,
  getMakesSaga,
} from './sales';

export function* watchAuth() {
  // Brand
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_BRAND, createBrandSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_BRANDS, getBrandsSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.UPDATE_BRAND, updateBrandSaga)]);
  // Wheelbase
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_WHEELBASE, createWheelbaseSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_WHEELBASES, getWheelbasesSaga)]);
  // Make
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_MAKE, createMakeSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_MAKES, getMakesSaga)]);
}

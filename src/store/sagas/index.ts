import { takeEvery, all } from 'redux-saga/effects';
//allow us to listen to certain actions and do something when they occur
import * as actionTypes from '../actions/actionTypes';
import { SalesActionTypes } from '../types/sales';

import { getBrandsSaga, createBrandSaga, createMakeSaga, createWheelbaseSaga, getWheelbasesSaga } from './sales';

export function* watchAuth() {
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_BRANDS, getBrandsSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_MAKE, createMakeSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_BRAND, createBrandSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_WHEELBASE, createWheelbaseSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_WHEELBASES, getWheelbasesSaga)]);
}

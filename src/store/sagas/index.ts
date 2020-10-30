import { takeEvery, all } from 'redux-saga/effects';
//allow us to listen to certain actions and do something when they occur
import * as actionTypes from '../actions/actionTypes';
import { SalesActionTypes } from '../types/sales';

import { getBrandsHeadSaga, createBrandHeadSaga, createWheelbaseHeadSaga } from './sales';

export function* watchAuth() {
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_BRANDS_HEAD, getBrandsHeadSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_BRAND_HEAD, createBrandHeadSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.CREATE_WHEELBASE_HEAD, createWheelbaseHeadSaga)]);
}

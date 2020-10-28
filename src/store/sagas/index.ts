import { takeEvery, all } from 'redux-saga/effects';
//allow us to listen to certain actions and do something when they occur
import * as actionTypes from '../actions/actionTypes';
import { SalesActionTypes } from '../types/sales';

import { getBrandsHeadSaga } from './sales';

export function* watchAuth() {
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_BRANDS_HEAD, getBrandsHeadSaga)]);
}

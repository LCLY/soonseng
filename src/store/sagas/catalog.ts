import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios from 'axios';
import { setPromiseError } from 'src/shared/Utils';

/* ================================================================== */
//   Catalog
/* ================================================================== */
/* ------------------------------- */
//   Make
/* ------------------------------- */
export function* getCatalogMakesSaga(_action: AppActions) {
  yield put(actions.getCatalogMakesStart());

  let url = process.env.REACT_APP_API + `/pages/catalog/makes`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getCatalogMakesSucceed(response.data.makes));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getCatalogMakesFailed, error.response.data.messages);
    } else {
      yield setPromiseError(error, actions.getCatalogMakesFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//   Body Make
/* ------------------------------- */
export function* getCatalogBodyMakesSaga(_action: AppActions) {
  yield put(actions.getCatalogBodyMakesStart());

  let url = process.env.REACT_APP_API + `/pages/catalog/makes`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getCatalogBodyMakesSucceed(response.data.auth_token));
    // call get user info
    yield put(actions.getUserInfo(response.data.auth_token));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getCatalogBodyMakesFailed, error.response.data.messages);
    } else {
      yield setPromiseError(error, actions.getCatalogBodyMakesFailed, 'Error');
    }
  }
}

import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios from 'axios';
import { setAxiosHeaderToken, setPromiseError } from 'src/shared/Utils';

/* ================================================================== */
//   Catalog
/* ================================================================== */
/* ------------------------------- */
//   Make
/* ------------------------------- */
export function* getCatalogMakesSaga(action: AppActions) {
  yield put(actions.getCatalogMakesStart());
  // Setting Axios header token config
  let config = setAxiosHeaderToken(action);

  let url = process.env.REACT_APP_API + `/pages/catalog/makes`;

  try {
    let response = yield axios.get(url, config);
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
export function* getCatalogBodyMakesSaga(action: AppActions) {
  yield put(actions.getCatalogBodyMakesStart());

  let url = '';
  if ('make_id' in action) {
    url = process.env.REACT_APP_API + `/pages/catalog/makes/${action.make_id}`;
  }

  try {
    let response = yield axios.get(url);
    yield put(actions.getCatalogBodyMakesSucceed(response.data.make, response.data.wheelbase));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getCatalogBodyMakesFailed, error.response.data.messages);
    } else {
      yield setPromiseError(error, actions.getCatalogBodyMakesFailed, 'Error');
    }
  }
}

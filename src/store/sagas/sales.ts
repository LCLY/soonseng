import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios from 'axios';
import { setPromiseError, getAxiosHeaderToken } from 'src/shared/Utils';

/* ================================================================== */
//   Sales Page
/* ================================================================== */

/* ------------------------------- */
//    Get All Lengths
/* ------------------------------- */
export function* getSalesLengthsSaga(action: AppActions): any {
  yield put(actions.getSalesLengthsStart());

  let url = process.env.REACT_APP_API + `/pages/sales/get_length_through_tire`;

  let choice = {};

  if ('tire' in action) {
    choice = {
      tire: action.tire,
    };
  }

  try {
    let response = yield axios.post(url, { choice });
    yield put(actions.getSalesLengthsSucceed(response.data.length_categories));
  } catch (error: any) {
    if (error.response) {
      yield setPromiseError(error, actions.getSalesLengthsFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getSalesLengthsFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Get All Bodies
/* ------------------------------- */
export function* getSalesBodiesSaga(action: AppActions): any {
  yield put(actions.getSalesBodiesStart());
  let url = process.env.REACT_APP_API + `/pages/sales/get_body_through_length_and_tire`;

  let choice = {};
  if ('length_id' in action && 'tire' in action) {
    choice = {
      length_id: action.length_id,
      tire: action.tire,
    };
  }

  try {
    let response = yield axios.post(url, { choice });
    yield put(actions.getSalesBodiesSucceed(response.data.bodies));
  } catch (error: any) {
    if (error.response) {
      yield setPromiseError(error, actions.getSalesBodiesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getSalesBodiesFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Get All Body Makes
/* ------------------------------- */
export function* getSalesBodyMakesSaga(action: AppActions): any {
  yield put(actions.getSalesBodyMakesStart());
  let url = process.env.REACT_APP_API + `/pages/sales/get_bodymake_through_length_and_tire_and_body`;

  let choice = {};
  if ('length_id' in action && 'tire' in action && 'body_id' in action) {
    choice = {
      length_id: action.length_id,
      tire: action.tire,
      body_id: action.body_id,
    };
  }

  try {
    let response = yield axios.post(url, { choice }, getAxiosHeaderToken());
    yield put(actions.getSalesBodyMakesSucceed(response.data.brands));
  } catch (error: any) {
    if (error.response) {
      yield setPromiseError(error, actions.getSalesBodyMakesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getSalesBodyMakesFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Get All Accessories
/* ------------------------------- */
export function* getSalesAccessoriesSaga(action: AppActions): any {
  // get accessories through body length
  yield put(actions.getSalesAccessoriesStart());
  let url = process.env.REACT_APP_API + `/pages/sales/get_accessories_through_bodymake`;

  let choice = {};
  if ('body_make_id' in action) {
    choice = {
      body_make_id: action.body_make_id,
    };
  }

  try {
    let response = yield axios.post(url, { choice });
    yield put(actions.getSalesAccessoriesSucceed(response.data.general, response.data.dimension, response.data.body));
  } catch (error: any) {
    if (error.response) {
      yield setPromiseError(error, actions.getSalesAccessoriesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getSalesAccessoriesFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Get All Makes
/* ------------------------------- */
export function* getSalesMakesSaga(action: AppActions): any {
  // get accessories through body length
  yield put(actions.getSalesMakesStart());
  let url = process.env.REACT_APP_API + `/pages/sales/get_makes_for_body`;

  let choice = {};
  if ('length_id' in action && 'tire' in action) {
    choice = {
      length_id: action.length_id,
      tire: action.tire,
    };
  }

  try {
    let response = yield axios.post(url, { choice });
    yield put(actions.getSalesMakesSucceed(response.data.brands));
  } catch (error: any) {
    if (error.response) {
      yield setPromiseError(error, actions.getSalesMakesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getSalesMakesFailed, 'Error');
    }
  }
}

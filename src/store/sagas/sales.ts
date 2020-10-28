import { put /*, delay */, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';
import { AppActions } from '../types/index';

/* ============================================================================================ */
/* ============================================================================================ */

/* ========== Get all brands (head) ========== */
export function* getBrandsHeadSaga(_action: AppActions) {
  yield put(actions.getBrandsHeadStart());

  let url = `https://ss-sales.herokuapp.com/api/v1/head/brands`;

  try {
    let response = yield axios.get(url);

    console.log(response);
    yield put(actions.getBrandsHeadSucceed());
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response header:', error.response.headers);
      yield put(actions.getBrandsHeadFailed(error.response.data.error));
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log('error response request:', error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      alert('Error:' + error.message);
    }
  }
}

/* ============================================================================================ */
/* ============================================================================================ */

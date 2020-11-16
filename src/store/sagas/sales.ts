import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios from 'axios';

/* ================================================================== */
//   Sales Page
/* ================================================================== */

/* ------------------------------- */
//    Get All Lengths
/* ------------------------------- */
export function* getSalesLengthsSaga(_action: AppActions) {
  yield put(actions.getSalesLengthsStart());

  let url = process.env.REACT_APP_API + `/tail/lengths`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getSalesLengthsSucceed(response.data.lengths));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getSalesLengthsFailed(error.response.data.error));
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

/* ------------------------------- */
//    Get All Bodies
/* ------------------------------- */
export function* getSalesBodiesSaga(action: AppActions) {
  yield put(actions.getSalesBodiesStart());
  let url = '';
  if ('length_id' in action) {
    url = process.env.REACT_APP_API + `/pages/lengths/${action.length_id}/body`;
  }

  try {
    let response = yield axios.get(url);
    yield put(actions.getSalesBodiesSucceed(response.data.body_lengths));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getSalesBodiesFailed(error.response.data.error));
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

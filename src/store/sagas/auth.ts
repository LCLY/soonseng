import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios from 'axios';

/* ================================================================== */
//   Authentication
/* ================================================================== */

/* ------------------------------- */
//    Sign In
/* ------------------------------- */
export function* signInSaga(action: AppActions) {
  yield put(actions.signInStart());

  let url = process.env.REACT_APP_API + `/sign_in`;

  let user = {};

  if ('email' in action && 'password' in action) {
    user = {
      email: action.email,
      password: action.password,
    };
  }

  try {
    let response = yield axios.post(url, { user });
    yield put(actions.signInSucceed());
    // assign auth token
    localStorage.setItem('AuthToken', response.data.auth_token);
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.signInFailed(error.response.data.error));
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
//    Get User Info
/* ------------------------------- */
export function* getUserInfoSaga(_action: AppActions) {
  yield put(actions.getUserInfoStart());

  let url = process.env.REACT_APP_API + `/get_user_info`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getUserInfoSucceed(response.user));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getUserInfoFailed(error.response.data.error));
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

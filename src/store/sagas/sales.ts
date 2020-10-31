import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';
import { AppActions } from '../types/index';

/* ================================================================== */
//    Get All brands (head)
/* ================================================================== */
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

/* ================================================================== */
//    Create brand (head)
/* ================================================================== */
export function* createBrandHeadSaga(action: AppActions) {
  yield put(actions.createBrandHeadStart());

  let url = `https://ss-sales.herokuapp.com/api/v1/head/brands`;

  let brand = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'description' in action) {
    brand = {
      title: action.title,
      description: action.description,
    };
  }
  try {
    let response = yield axios.post(url, { brand });
    yield put(actions.createBrandHeadSucceed(response.data.brand, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response header:', error.response.headers);
      yield put(actions.createBrandHeadFailed(error.response.data.error));
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

/* ================================================================== */
//    Create wheelbase (head)
/* ================================================================== */
export function* createWheelbaseHeadSaga(action: AppActions) {
  yield put(actions.createWheelbaseHeadStart());

  let url = `https://ss-sales.herokuapp.com/api/v1/head/wheelbases`;

  let wheelbase = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'description' in action) {
    wheelbase = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.post(url, { wheelbase });
    console.log(response);
    yield put(actions.createWheelbaseHeadSucceed(response.data.wheelbase, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response header:', error.response.headers);
      yield put(actions.createWheelbaseHeadFailed(error.response.data.error));
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

/* ================================================================== */
//    Create make (head)
/* ================================================================== */
export function* createMakeHeadSaga(action: AppActions) {
  yield put(actions.createMakeHeadStart());

  let url = `https://ss-sales.herokuapp.com/api/v1/head/makes`;

  let make = {};
  // Type guard, check if the "key" exist in the action object
  if ('createMakeSubmitData' in action) {
    make = {
      gvw: action.createMakeSubmitData.gvw,
      year: action.createMakeSubmitData.year,
      price: action.createMakeSubmitData.price,
      title: action.createMakeSubmitData.title,
      length: action.createMakeSubmitData.length,
      brand_id: action.createMakeSubmitData.brand_id,
      engine_cap: action.createMakeSubmitData.engine_cap,
      horsepower: action.createMakeSubmitData.horsepower,
      description: action.createMakeSubmitData.description,
      wheelbase_id: action.createMakeSubmitData.wheelbase_id,
      transmission: action.createMakeSubmitData.transmission,
    };
  }

  try {
    let response = yield axios.post(url, { make });
    console.log(response);
    yield put(actions.createMakeHeadSucceed(response.data.wheelbase, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response header:', error.response.headers);
      yield put(actions.createMakeHeadFailed(error.response.data.error));
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

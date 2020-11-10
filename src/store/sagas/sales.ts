import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';
import { AppActions } from '../types/index';

/* ================================================================== */
//    Upload Image(s)
/* ================================================================== */

export function* uploadImageSaga(_action: AppActions) {
  yield put(actions.uploadImageStart());

  let url = process.env.REACT_APP_API + `/upload/images`;
  let config = yield {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };

  let formData = new FormData();
  // profile is the name of the key, it forms a new object of {profile: action.picture}
  // formData.append('profile', action.picture);

  try {
    let response = yield axios.post(url, formData, config);
    yield put(actions.uploadImageSucceed(response.data.brands));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.uploadImageFailed(error.response.data.error));
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
//   Brands (Make Page)(Head)
/* ================================================================== */

/* ------------------------------- */
//    Get All brands
/* ------------------------------- */
export function* getBrandsSaga(_action: AppActions) {
  yield put(actions.getBrandsStart());

  let url = process.env.REACT_APP_API + `/head/brands`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getBrandsSucceed(response.data.brands));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getBrandsFailed(error.response.data.error));
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
//    Create brand
/* ------------------------------- */
export function* createBrandSaga(action: AppActions) {
  yield put(actions.createBrandStart());

  let url = process.env.REACT_APP_API + `/head/brands`;

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
    // receive new updated brands array
    yield put(actions.createBrandSucceed(response.data.brands, response.data.success));

    // if imageFiles and image tag exist in action, then call the upload image API once succeed
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.createBrandFailed(error.response.data.error));
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
//    Update brand
/* ------------------------------- */
export function* updateBrandSaga(action: AppActions) {
  yield put(actions.updateBrandStart());

  let url = '';
  if ('brand_id' in action) {
    url = process.env.REACT_APP_API + `/head/brands/${action.brand_id}`;
  }

  let brand = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'description' in action) {
    brand = {
      title: action.title,
      description: action.description,
    };
  }
  try {
    let response = yield axios.put(url, { brand });
    yield put(actions.updateBrandSucceed(response.data.brands, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.updateBrandFailed(error.response.data.error));
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
/*   Wheelbase (Make Page) (head) */
/* ================================================================== */

/* ------------------------------- */
//    Create wheelbase
/* ------------------------------- */
export function* createWheelbaseSaga(action: AppActions) {
  yield put(actions.createWheelbaseStart());

  let url = process.env.REACT_APP_API + `/head/wheelbases`;

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
    yield put(actions.createWheelbaseSucceed(response.data.wheelbases, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.createWheelbaseFailed(error.response.data.error));
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
//    Get wheelbases
/* ------------------------------- */
export function* getWheelbasesSaga(_action: AppActions) {
  yield put(actions.getWheelbasesStart());

  let url = process.env.REACT_APP_API + `/head/wheelbases`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getWheelbasesSucceed(response.data.wheelbases));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getWheelbasesFailed(error.response.data.error));
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
//    Update wheelbase (Head)
/* ------------------------------- */
export function* updateWheelbaseSaga(action: AppActions) {
  yield put(actions.updateWheelbaseStart());
  let url = '';
  if ('wheelbase_id' in action) {
    url = process.env.REACT_APP_API + `/head/wheelbases/${action.wheelbase_id}`;
  }

  let wheelbase = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'description' in action) {
    wheelbase = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.put(url, { wheelbase });
    console.log(response);
    yield put(actions.updateWheelbaseSucceed(response.data.wheelbases, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.updateWheelbaseFailed(error.response.data.error));
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
/*   Make (Make Page) (head) */
/* ================================================================== */

/* ------------------------------- */
//    Create make
/* ------------------------------- */
export function* createMakeSaga(action: AppActions) {
  yield put(actions.createMakeStart());

  let url = process.env.REACT_APP_API + `/head/makes`;

  let make = {};
  // Type guard, check if the "key" exist in the action object
  if ('createMakeData' in action) {
    make = {
      gvw: action.createMakeData.gvw,
      year: action.createMakeData.year,
      price: action.createMakeData.price,
      title: action.createMakeData.title,
      length: action.createMakeData.length,
      brand_id: action.createMakeData.brand_id,
      engine_cap: action.createMakeData.engine_cap,
      horsepower: action.createMakeData.horsepower,
      wheelbase_id: action.createMakeData.wheelbase_id,
      transmission: action.createMakeData.transmission,
    };
  }

  try {
    let response = yield axios.post(url, { make });
    yield put(actions.createMakeSucceed(response.data.makes, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.createMakeFailed(error.response.data.error));
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
//    Get makes
/* ------------------------------- */
export function* getMakesSaga(_action: AppActions) {
  yield put(actions.getMakesStart());

  let url = process.env.REACT_APP_API + `/head/makes`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getMakesSucceed(response.data.makes));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getMakesFailed(error.response.data.error));
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
//    Update make
/* ------------------------------- */
export function* updateMakeSaga(action: AppActions) {
  yield put(actions.updateMakeStart());

  let url = '';

  let make = {};
  // Type guard, check if the "key" exist in the action object
  if ('updateMakeData' in action) {
    url = process.env.REACT_APP_API + `/head/makes/${action.updateMakeData.make_id}`;

    make = {
      gvw: action.updateMakeData.gvw,
      year: action.updateMakeData.year,
      price: action.updateMakeData.price,
      title: action.updateMakeData.title,
      length: action.updateMakeData.length,
      brand_id: action.updateMakeData.brand_id,
      engine_cap: action.updateMakeData.engine_cap,
      horsepower: action.updateMakeData.horsepower,
      wheelbase_id: action.updateMakeData.wheelbase_id,
      transmission: action.updateMakeData.transmission,
    };
  }

  try {
    let response = yield axios.put(url, { make });
    yield put(actions.updateMakeSucceed(response.data.makes, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.updateMakeFailed(error.response.data.error));
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
/*   Body (Body Page) (tail) */
/* ================================================================== */

/* ------------------------------- */
//    Create body
/* ------------------------------- */
export function* createBodySaga(action: AppActions) {
  yield put(actions.createBodyStart());

  let url = process.env.REACT_APP_API + `/tail/bodies`;

  let body = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'description' in action) {
    body = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.post(url, { body });
    yield put(actions.createBodySucceed(response.data.bodies, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.createBodyFailed(error.response.data.error));
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
//    Get bodies
/* ------------------------------- */
export function* getBodiesSaga(_action: AppActions) {
  yield put(actions.getBodiesStart());

  let url = process.env.REACT_APP_API + `/tail/bodies`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getBodiesSucceed(response.data.bodies));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getBodiesFailed(error.response.data.error));
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
//    Update body
/* ------------------------------- */
export function* updateBodySaga(action: AppActions) {
  yield put(actions.updateBodyStart());

  let url = '';
  if ('body_id' in action) {
    url = process.env.REACT_APP_API + `/tail/bodies/${action.body_id}`;
  }

  let body = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'description' in action) {
    body = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.put(url, { body });
    yield put(actions.updateBodySucceed(response.data.bodies, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.updateBodyFailed(error.response.data.error));
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
/*   Length (Body Page) (tail) */
/* ================================================================== */

/* ------------------------------- */
//    Create Length
/* ------------------------------- */
export function* createLengthSaga(action: AppActions) {
  yield put(actions.createLengthStart());

  let url = process.env.REACT_APP_API + `/tail/lengths`;

  let length = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'description' in action) {
    length = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.post(url, { length });
    yield put(actions.createLengthSucceed(response.data.lengths, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.createLengthFailed(error.response.data.error));
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
//    Get lengths
/* ------------------------------- */
export function* getLengthsSaga(_action: AppActions) {
  yield put(actions.getLengthsStart());

  let url = process.env.REACT_APP_API + `/tail/lengths`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getLengthsSucceed(response.data.lengths));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getLengthsFailed(error.response.data.error));
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
//    Update length
/* ------------------------------- */
export function* updateLengthSaga(action: AppActions) {
  yield put(actions.updateLengthStart());

  let url = '';
  if ('length_id' in action) {
    url = process.env.REACT_APP_API + `/tail/lengths/${action.length_id}`;
  }

  let length = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'description' in action) {
    length = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.put(url, { length });
    yield put(actions.updateLengthSucceed(response.data.lengths, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.updateLengthFailed(error.response.data.error));
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
/*   Body Length (Body Page) (tail) */
/* ================================================================== */

/* ------------------------------- */
//    Create Body Length
/* ------------------------------- */
export function* createBodyLengthSaga(action: AppActions) {
  yield put(actions.createBodyLengthStart());

  let url = process.env.REACT_APP_API + `/tail/body_length`;

  let body_length = {};
  // Type guard, check if the "key" exist in the action object
  if ('createBodyLengthData' in action) {
    body_length = {
      body_id: action.createBodyLengthData.body_id,
      length_id: action.createBodyLengthData.length_id,
      depth: action.createBodyLengthData.depth,
      width: action.createBodyLengthData.width,
      height: action.createBodyLengthData.height,
      price: action.createBodyLengthData.price,
    };
  }

  try {
    let response = yield axios.post(url, { body_length });
    yield put(actions.createBodyLengthSucceed(response.data.body_lengths, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.createBodyLengthFailed(error.response.data.error));
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
//    Get Body lengths
/* ------------------------------- */
export function* getBodyLengthsSaga(_action: AppActions) {
  yield put(actions.getBodyLengthsStart());

  let url = process.env.REACT_APP_API + `/tail/body_length`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getBodyLengthsSucceed(response.data.lengths));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getBodyLengthsFailed(error.response.data.error));
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
//    Update length
/* ------------------------------- */
export function* updateBodyLengthSaga(action: AppActions) {
  yield put(actions.updateBodyLengthStart());

  let url = '';
  let body_length = {};
  if ('updateBodyLengthData' in action) {
    url = process.env.REACT_APP_API + `/tail/body_length/${action.updateBodyLengthData.body_length_id}`;

    body_length = {
      body_id: action.updateBodyLengthData.body_id,
      length_id: action.updateBodyLengthData.length_id,
      depth: action.updateBodyLengthData.depth,
      width: action.updateBodyLengthData.width,
      height: action.updateBodyLengthData.height,
      price: action.updateBodyLengthData.price,
    };
  }

  try {
    let response = yield axios.put(url, { body_length });
    yield put(actions.updateBodyLengthSucceed(response.data.body_lengths, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.updateBodyLengthFailed(error.response.data.error));
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
/*   Body Accessory (Body Page) (tail) */
/* ================================================================== */

/* ------------------------------- */
//    Create Body Accessory
/* ------------------------------- */
export function* createBodyAccessorySaga(action: AppActions) {
  yield put(actions.createBodyAccessoryStart());

  let url = process.env.REACT_APP_API + `/tail/body_accesory`;

  let body_accesory = {};
  // Type guard, check if the "key" exist in the action object
  if ('createBodyAccessoryData' in action) {
    body_accesory = {
      title: action.createBodyAccessoryData.title,
      description: action.createBodyAccessoryData.description,
      body_length_id: action.createBodyAccessoryData.body_length_id,
      accesory_id: action.createBodyAccessoryData.accesory_id,
      price: action.createBodyAccessoryData.price,
    };
  }

  try {
    let response = yield axios.post(url, { body_accesory });
    yield put(actions.createBodyAccessorySucceed(response.data.body_accesories, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.createBodyAccessoryFailed(error.response.data.error));
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
//    Get Body Accessories
/* ------------------------------- */
export function* getBodyAccessoriesSaga(_action: AppActions) {
  yield put(actions.getBodyAccessoriesStart());

  let url = process.env.REACT_APP_API + `/tail/body_accesory`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getBodyAccessoriesSucceed(response.data.body_accesories));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getBodyAccessoriesFailed(error.response.data.error));
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
//    Update Accessory
/* ------------------------------- */
export function* updateBodyAccessorySaga(action: AppActions) {
  yield put(actions.updateBodyAccessoryStart());

  let url = '';
  let body_accesory = {};
  if ('updateBodyAccessoryData' in action) {
    url = process.env.REACT_APP_API + `/tail/body_accesory/${action.updateBodyAccessoryData.body_accessory_id}`;
    body_accesory = {
      title: action.updateBodyAccessoryData.title,
      description: action.updateBodyAccessoryData.description,
      body_length_id: action.updateBodyAccessoryData.body_length_id,
      accesory_id: action.updateBodyAccessoryData.accesory_id,
      price: action.updateBodyAccessoryData.price,
    };
  }

  try {
    let response = yield axios.put(url, { body_accesory });
    yield put(actions.updateBodyAccessorySucceed(response.data.body_lengths, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.updateBodyAccessoryFailed(error.response.data.error));
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
/*   Accessory (Accessory Page) (tail) */
/* ================================================================== */

/* ------------------------------- */
//    Create Accessory
/* ------------------------------- */
export function* createAccessorySaga(action: AppActions) {
  yield put(actions.createAccessoryStart());

  let url = process.env.REACT_APP_API + `/tail/accesories`;

  let accesory = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'description' in action) {
    accesory = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.post(url, { accesory });
    yield put(actions.createAccessorySucceed(response.data.accesories, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.createAccessoryFailed(error.response.data.error));
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
//    Get Accessories
/* ------------------------------- */
export function* getAccessoriesSaga(_action: AppActions) {
  yield put(actions.getAccessoriesStart());

  let url = process.env.REACT_APP_API + `/tail/accesories`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getAccessoriesSucceed(response.data.accesories));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getAccessoriesFailed(error.response.data.error));
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
//    Update Accessory
/* ------------------------------- */
export function* updateAccessorySaga(action: AppActions) {
  yield put(actions.updateAccessoryStart());

  let url = '';
  let accesory = {};
  if ('id' in action && 'title' in action && 'description' in action) {
    url = process.env.REACT_APP_API + `/tail/accesories/${action.id}`;
    accesory = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.put(url, { accesory });
    yield put(actions.updateAccessorySucceed(response.data.accesories, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.updateAccessoryFailed(error.response.data.error));
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

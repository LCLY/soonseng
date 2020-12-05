import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios from 'axios';
import {
  UPLOAD_TO_MAKE,
  UPLOAD_TO_BRAND,
  UPLOAD_TO_BODY,
  UPLOAD_TO_BODY_MAKE,
  UPLOAD_TO_ACCESSORY,
  UPLOAD_TO_BODY_ACCESSORY,
} from 'src/shared/constants';

/**
 * A boolean to check whether image has been uploaded
 * only until image is uploaded then proceed with the succeed actions
 * @type {boolean}
 * */
let imageIsUploaded = false;

/* ================================================================== */
//    Upload Image(s)
/* ================================================================== */

export function* uploadImageSaga(action: AppActions) {
  yield put(actions.uploadImageStart());

  let url = process.env.REACT_APP_API + `/uploads`;
  let config = yield {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  };

  let formData = new FormData();
  formData.append('upload_type', 'image'); //this is always fixed for this particular API because this will always be image instead of other file types

  if ('model' in action && 'model_id' in action && 'imageFiles' in action && 'imageTag' in action) {
    console.log(action.model, action.model_id, action.imageTag);
    // "images[]" is the name of the key, it forms a new object of {images[]: the image files}
    formData.append('model', action.model);
    formData.append('model_id', action.model_id.toString());
    formData.append('tag', action.imageTag);
    // for each image, loop them out and append into the "images[]" array object
    Array.from(action.imageFiles).forEach((file) => formData.append('images[]', file));
  }

  try {
    let response = yield axios.post(url, formData, config);
    yield put(actions.uploadImageSucceed(response.data.images));
    imageIsUploaded = true;
    window.location.reload(); //force refresh after image uploaded
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
//    Delete Image(s)
/* ================================================================== */

export function* deleteUploadImageSaga(action: AppActions) {
  yield put(actions.deleteUploadImageStart());

  let url = process.env.REACT_APP_API + `/uploads`;

  // let ids = {};

  // if ('ids' in action) {
  //   console.log(action.ids);
  //   ids = {
  //     ids: action.ids,
  //   };
  // }

  // let data = {};
  // if ('ids' in action) {
  //   data = {
  //     ids: action.ids,
  //   };
  // }

  let config = {};
  if ('ids' in action) {
    config = yield {
      data: yield {
        ids: action.ids,
      },
    };
  }

  try {
    let response = yield axios.delete(url, config);
    yield put(actions.deleteUploadImageSucceed(response.data.success));
    window.location.reload(); //force refresh after image uploaded
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.deleteUploadImageFailed(error.response.data.error));
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

    // Upload Image to model 'Make'
    if ('imageTag' in action && 'imageFiles' in action) {
      //  check if they are null or not
      if (action.imageTag && action.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(actions.uploadImage(UPLOAD_TO_BRAND, response.data.updated.id, action.imageTag, action.imageFiles));

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create brand succeed
          yield put(actions.createBrandSucceed(response.data.brands, response.data.success));
          //reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        // receive new updated brands array
        yield put(actions.createBrandSucceed(response.data.brands, response.data.success));
      }
    }
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
    // Upload Image to model 'Make'
    if ('imageTag' in action && 'imageFiles' in action) {
      //  check if they are null or not
      if (action.imageTag && action.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(actions.uploadImage(UPLOAD_TO_BRAND, response.data.updated.id, action.imageTag, action.imageFiles));

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create brand succeed
          yield put(actions.updateBrandSucceed(response.data.brands, response.data.success));
          //reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        // receive new updated brands array
        yield put(actions.updateBrandSucceed(response.data.brands, response.data.success));
      }
    }
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

    // Upload Image to model 'Make'
    if ('imageTag' in action && 'imageFiles' in action) {
      //  check if they are null or not
      if (action.imageTag && action.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(actions.uploadImage(UPLOAD_TO_MAKE, response.data.updated.id, action.imageTag, action.imageFiles));

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create make succeed
          yield put(actions.createMakeSucceed(response.data.makes, response.data.success));
          //  reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        yield put(actions.createMakeSucceed(response.data.makes, response.data.success));
      }
    }
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

    if ('imageTag' in action && 'imageFiles' in action) {
      //  check if they are null or not
      if (action.imageTag && action.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(actions.uploadImage(UPLOAD_TO_MAKE, response.data.updated.id, action.imageTag, action.imageFiles));

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create make succeed
          yield put(actions.updateMakeSucceed(response.data.makes, response.data.success));
          //  reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        yield put(actions.updateMakeSucceed(response.data.makes, response.data.success));
      }
    }
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

/* ================================================= */
// Series (Make)
/* ================================================= */

/* ------------------------------- */
//    Get series
/* ------------------------------- */
export function* getSeriesSaga(action: AppActions) {
  yield put(actions.getSeriesStart());
  let url = '';
  if ('brand_id' in action) {
    url = process.env.REACT_APP_API + `/head/brands/${action.brand_id}/series`;
  }

  try {
    let response = yield axios.get(url);
    yield put(actions.getSeriesSucceed(response.data.series));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getSeriesFailed(error.response.data.error));
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
    // Upload Image to model 'Make'
    if ('imageTag' in action && 'imageFiles' in action) {
      //  check if they are null or not
      if (action.imageTag && action.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(actions.uploadImage(UPLOAD_TO_BODY, response.data.updated.id, action.imageTag, action.imageFiles));

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create make succeed
          yield put(actions.createBodySucceed(response.data.bodies, response.data.success));

          //  reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        yield put(actions.createBodySucceed(response.data.bodies, response.data.success));
      }
    }
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
    if ('imageTag' in action && 'imageFiles' in action) {
      //  check if they are null or not
      if (action.imageTag && action.imageFiles) {
        console.log(response.data.updated.id);
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(actions.uploadImage(UPLOAD_TO_BODY, response.data.updated.id, action.imageTag, action.imageFiles));

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create make succeed
          yield put(actions.updateBodySucceed(response.data.bodies, response.data.success));
          //  reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        yield put(actions.updateBodySucceed(response.data.bodies, response.data.success));
      }
    }
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

/* ------------------------------- */
//    Delete body
/* ------------------------------- */
export function* deleteBodySaga(action: AppActions) {
  yield put(actions.deleteBodyStart());

  let url = '';
  if ('body_id' in action) {
    url = process.env.REACT_APP_API + `/tail/bodies/${action.body_id}`;
  }

  try {
    let response = yield axios.delete(url);

    // if user is not uploading files, then straight give success
    yield put(actions.deleteBodySucceed(response.data.bodies, response.data.success));
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

/* ------------------------------- */
//    Delete length
/* ------------------------------- */
export function* deleteLengthSaga(action: AppActions) {
  yield put(actions.deleteLengthStart());

  let url = '';
  if ('length_id' in action) {
    url = process.env.REACT_APP_API + `/tail/lengths/${action.length_id}`;
  }

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteLengthSucceed(response.data.lengths, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.deleteLengthFailed(error.response.data.error));
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
/*   Body Make (Body Page) (tail) */
/* ================================================================== */

/* ------------------------------- */
//    Create Body Make
/* ------------------------------- */
export function* createBodyMakeSaga(action: AppActions) {
  yield put(actions.createBodyMakeStart());

  let url = process.env.REACT_APP_API + `/products/body_make`;

  let bodymake = {};
  // Type guard, check if the "key" exist in the action object
  if ('createBodyMakeData' in action) {
    bodymake = {
      body_id: action.createBodyMakeData.body_id,
      length_id: action.createBodyMakeData.length_id,
      make_id: action.createBodyMakeData.make_id,
      depth: action.createBodyMakeData.depth,
      width: action.createBodyMakeData.width,
      height: action.createBodyMakeData.height,
      price: action.createBodyMakeData.price,
    };
  }

  try {
    let response = yield axios.post(url, { bodymake });
    // Upload Image to model 'BodyLength'
    if ('imageTag' in action && 'imageFiles' in action) {
      //  check if they are null or not
      if (action.imageTag && action.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(
          actions.uploadImage(UPLOAD_TO_BODY_MAKE, response.data.updated.id, action.imageTag, action.imageFiles),
        );

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create make succeed
          yield put(actions.createBodyMakeSucceed(response.data.body_makes, response.data.success));

          //  reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        yield put(actions.createBodyMakeSucceed(response.data.body_makes, response.data.success));
      }
    }
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.createBodyMakeFailed(error.response.data.error));
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
//    Get Body Makes
/* ------------------------------- */
export function* getBodyMakesSaga(_action: AppActions) {
  yield put(actions.getBodyMakesStart());

  let url = process.env.REACT_APP_API + `/products/body_make`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getBodyMakesSucceed(response.data.body_makes));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getBodyMakesFailed(error.response.data.error));
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
//    Update Body Make
/* ------------------------------- */
export function* updateBodyMakeSaga(action: AppActions) {
  yield put(actions.updateBodyMakeStart());

  let url = '';
  let bodymake = {};
  if ('updateBodyMakeData' in action) {
    url = process.env.REACT_APP_API + `/products/body_make/${action.updateBodyMakeData.body_make_id}`;

    bodymake = {
      body_id: action.updateBodyMakeData.body_id,
      make_id: action.updateBodyMakeData.make_id,
      depth: action.updateBodyMakeData.depth,
      width: action.updateBodyMakeData.width,
      height: action.updateBodyMakeData.height,
      price: action.updateBodyMakeData.price,
    };
  }

  try {
    let response = yield axios.put(url, { bodymake });

    // Upload Image to model 'BodyLength'
    if ('imageTag' in action && 'imageFiles' in action) {
      //  check if they are null or not
      if (action.imageTag && action.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(
          actions.uploadImage(UPLOAD_TO_BODY_MAKE, response.data.updated.id, action.imageTag, action.imageFiles),
        );

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create make succeed
          yield put(actions.updateBodyMakeSucceed(response.data.body_makes, response.data.success));

          //  reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        yield put(actions.updateBodyMakeSucceed(response.data.body_makes, response.data.success));
      }
    }
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.updateBodyMakeFailed(error.response.data.error));
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
//    Delete Body Make
/* ------------------------------- */
export function* deleteBodyMakeSaga(action: AppActions) {
  yield put(actions.deleteBodyMakeStart());

  let url = '';
  if ('body_make_id' in action) {
    url = process.env.REACT_APP_API + `/products/body_make/${action.body_make_id}`;
  }

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteBodyMakeSucceed(response.data.body_makes, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.updateBodyMakeFailed(error.response.data.error));
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

  let url = '';

  if ('body_id' in action) {
    url = process.env.REACT_APP_API + `/tail/bodies/${action.body_id}/body_accessory`;
  }

  let body_accessory = {};
  // Type guard, check if the "key" exist in the action object
  if ('body_id' in action && 'accessory_id' in action) {
    body_accessory = {
      body_id: action.body_id,
      accessory_id: action.accessory_id,
    };
  }

  try {
    let response = yield axios.post(url, { body_accessory });

    // Upload Image to model 'Accessory'
    if ('imageTag' in action && 'imageFiles' in action) {
      //  check if they are null or not
      if (action.imageTag && action.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(
          actions.uploadImage(UPLOAD_TO_BODY_ACCESSORY, response.data.updated.id, action.imageTag, action.imageFiles),
        );

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create make succeed
          yield put(actions.createBodyAccessorySucceed(response.data.body_accessories, response.data.success)); //  reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        yield put(actions.createBodyAccessorySucceed(response.data.body_accessories, response.data.success));
      }
    }
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
export function* getBodyAccessoriesSaga(action: AppActions) {
  yield put(actions.getBodyAccessoriesStart());

  let url = '';
  if ('body_id' in action) {
    url = process.env.REACT_APP_API + `/tail/bodies/${action.body_id}/body_accessory`;
  }

  try {
    let response = yield axios.get(url);
    yield put(actions.getBodyAccessoriesSucceed(response.data.body_accessories));
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
//    Update Body Accessory
/* ------------------------------- */
export function* updateBodyAccessorySaga(action: AppActions) {
  yield put(actions.updateBodyAccessoryStart());

  let url = '';
  let body_accessory = {};
  if ('body_id' in action && 'accessory_id' in action) {
    url = process.env.REACT_APP_API + `/tail/bodies/${action.body_id}/body_accessory`;
    body_accessory = {
      body_id: action.body_id,
      accessory_id: action.accessory_id,
    };
  }

  try {
    let response = yield axios.put(url, { body_accessory });

    // Upload Image to model 'Accessory'
    if ('imageTag' in action && 'imageFiles' in action) {
      //  check if they are null or not
      if (action.imageTag && action.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(
          actions.uploadImage(UPLOAD_TO_BODY_ACCESSORY, response.data.updated.id, action.imageTag, action.imageFiles),
        );

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create make succeed
          yield put(actions.updateBodyAccessorySucceed(response.data.body_accessories, response.data.success));

          //  reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        yield put(actions.updateBodyAccessorySucceed(response.data.body_accessories, response.data.success));
      }
    }
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

/* ------------------------------- */
//    Delete Body Accessory
/* ------------------------------- */
export function* deleteBodyAccessorySaga(action: AppActions) {
  yield put(actions.deleteBodyAccessoryStart());

  let url = '';
  if ('body_id' in action && 'body_accessory_id' in action) {
    url = process.env.REACT_APP_API + `/tail/bodies/${action.body_id}/body_accessory/${action.body_accessory_id}`;
  }

  try {
    let response = yield axios.delete(url);
    // if user is not uploading files, then straight give success
    yield put(actions.deleteBodyAccessorySucceed(response.data.body_accessories, response.data.success));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.deleteBodyAccessoryFailed(error.response.data.error));
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
//    Get Body Associated Accessories
/* ------------------------------- */
export function* getBodyAssociatedAccessoriesSaga(_action: AppActions) {
  yield put(actions.getBodyAssociatedAccessoriesStart());

  let url = process.env.REACT_APP_API + `/pages/dashboard/get_body_associated_accessories`;

  try {
    let response = yield axios.get(url);
    // if user is not uploading files, then straight give success
    yield put(actions.getBodyAssociatedAccessoriesSucceed(response.data.body_associated));
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log('error response data:', error.response.data);
      console.log('error response status:', error.response.status);
      console.log('error response error:', error.response.errors);
      yield put(actions.getBodyAssociatedAccessoriesFailed(error.response.data.error));
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

  let url = process.env.REACT_APP_API + `/tail/accessories`;

  let accessory = {};

  // Type guard, check if the "key" exist in the action object
  if ('createAccessoryData' in action) {
    accessory = {
      title: action.createAccessoryData.title,
      description: action.createAccessoryData.description,
      price: action.createAccessoryData.price,
      general: action.createAccessoryData.general,
      dimension_associated: action.createAccessoryData.dimension_associated,
    };
  }

  try {
    let response = yield axios.post(url, { accessory });

    // Upload Image to model 'Accessory'
    if (
      'createAccessoryData' in action &&
      'imageTag' in action.createAccessoryData &&
      'imageFiles' in action.createAccessoryData
    ) {
      //  check if they are null or not
      if (action.createAccessoryData.imageTag && action.createAccessoryData.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(
          actions.uploadImage(
            UPLOAD_TO_ACCESSORY,
            response.data.updated.id,
            action.createAccessoryData.imageTag,
            action.createAccessoryData.imageFiles,
          ),
        );

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create make succeed
          yield put(actions.createAccessorySucceed(response.data.accessories, response.data.success));
          //  reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        yield put(actions.createAccessorySucceed(response.data.accessories, response.data.success));
      }
    }
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

  let url = process.env.REACT_APP_API + `/tail/accessories`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getAccessoriesSucceed(response.data.accessories));
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
  let accessory = {};
  if ('updateAccessoryData' in action) {
    url = process.env.REACT_APP_API + `/tail/accessories/${action.updateAccessoryData.id}`;
    accessory = {
      title: action.updateAccessoryData.title,
      description: action.updateAccessoryData.description,
      price: action.updateAccessoryData.price,
      general: action.updateAccessoryData.general,
      dimension_associated: action.updateAccessoryData.dimension_associated,
    };
  }

  try {
    let response = yield axios.put(url, { accessory });

    // Upload Image to model 'Accessory'
    if (
      'updateAccessoryData' in action &&
      'imageTag' in action.updateAccessoryData &&
      'imageFiles' in action.updateAccessoryData
    ) {
      //  check if they are null or not
      if (action.updateAccessoryData.imageTag && action.updateAccessoryData.imageFiles) {
        // retrieve the updated individual make id on success and then call Upload Image action
        yield put(
          actions.uploadImage(
            UPLOAD_TO_ACCESSORY,
            response.data.updated.id,
            action.updateAccessoryData.imageTag,
            action.updateAccessoryData.imageFiles,
          ),
        );

        if (imageIsUploaded) {
          //wait until upload image succeed then only declare create make succeed
          yield put(actions.updateAccessorySucceed(response.data.accessories, response.data.success));
          //  reset imageIsUploaded boolean
          imageIsUploaded = false;
        }
      } else {
        // if user is not uploading files, then straight give success
        yield put(actions.updateAccessorySucceed(response.data.accessories, response.data.success));
      }
    }
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

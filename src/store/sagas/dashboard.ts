import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import { setPromiseError, succeedActionWithImageUpload } from 'src/shared/Utils';
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
      yield setPromiseError(error, actions.uploadImageFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.uploadImageFailed, 'Error');
    }
  }
}

/* ================================================================== */
//    Delete Image(s)
/* ================================================================== */

export function* deleteUploadImageSaga(action: AppActions) {
  yield put(actions.deleteUploadImageStart());

  let url = process.env.REACT_APP_API + `/uploads`;

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
      yield setPromiseError(error, actions.deleteUploadImageFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteUploadImageFailed, 'Error');
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
      yield setPromiseError(error, actions.getBrandsFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getBrandsFailed, 'Error');
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
    if ('imageTag' in action && 'imageFiles' in action) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_BRAND,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.brands,
        actions.createBrandSucceed,
        { imageTag: action.imageTag, imageFiles: action.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createBrandFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createBrandFailed, 'Error');
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
    if ('imageTag' in action && 'imageFiles' in action) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_BRAND,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.brands,
        actions.updateBrandSucceed,
        { imageTag: action.imageTag, imageFiles: action.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateBrandFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateBrandFailed, 'Error');
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
      yield setPromiseError(error, actions.createWheelbaseFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createWheelbaseFailed, 'Error');
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
      yield setPromiseError(error, actions.getWheelbasesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getWheelbasesFailed, 'Error');
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
      yield setPromiseError(error, actions.updateWheelbaseFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateWheelbaseFailed, 'Error');
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
      // wheelbase_id: action.createMakeData.wheelbase_id,
      transmission: action.createMakeData.transmission,
    };
  }

  try {
    let response = yield axios.post(url, { make });
    if ('imageTag' in action && 'imageFiles' in action) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_MAKE,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.makes,
        actions.createMakeSucceed,
        { imageTag: action.imageTag, imageFiles: action.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createMakeFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createMakeFailed, 'Error');
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
      yield setPromiseError(error, actions.getMakesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getMakesFailed, 'Error');
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
      // wheelbase_id: action.updateMakeData.wheelbase_id,
      transmission: action.updateMakeData.transmission,
    };
  }

  try {
    let response = yield axios.put(url, { make });
    if ('imageTag' in action && 'imageFiles' in action) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_MAKE,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.makes,
        actions.updateMakeSucceed,
        { imageTag: action.imageTag, imageFiles: action.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateMakeFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateMakeFailed, 'Error');
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
      yield setPromiseError(error, actions.getSeriesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getSeriesFailed, 'Error');
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
    if ('imageTag' in action && 'imageFiles' in action) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_BODY,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.bodies,
        actions.createBodySucceed,
        { imageTag: action.imageTag, imageFiles: action.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createBodyFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createBodyFailed, 'Error');
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
      yield setPromiseError(error, actions.getBodiesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getBodiesFailed, 'Error');
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
      yield succeedActionWithImageUpload(
        UPLOAD_TO_BODY,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.bodies,
        actions.updateBodySucceed,
        { imageTag: action.imageTag, imageFiles: action.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateBodyFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateBodyFailed, 'Error');
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
      yield setPromiseError(error, actions.updateBodyFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateBodyFailed, 'Error');
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
      yield setPromiseError(error, actions.createLengthFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createLengthFailed, 'Error');
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
      yield setPromiseError(error, actions.getLengthsFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getLengthsFailed, 'Error');
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
      yield setPromiseError(error, actions.updateLengthFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateLengthFailed, 'Error');
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
      yield setPromiseError(error, actions.deleteLengthFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteLengthFailed, 'Error');
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
    if ('imageTag' in action && 'imageFiles' in action) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_BODY_MAKE,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.body_makes,
        actions.createBodyMakeSucceed,
        { imageTag: action.imageTag, imageFiles: action.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createBodyMakeFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createBodyMakeFailed, 'Error');
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
      yield setPromiseError(error, actions.getBodyMakesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getBodyMakesFailed, 'Error');
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
    if ('imageTag' in action && 'imageFiles' in action) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_BODY_MAKE,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.body_makes,
        actions.updateBodyMakeSucceed,
        { imageTag: action.imageTag, imageFiles: action.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateBodyMakeFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateBodyMakeFailed, 'Error');
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
      yield setPromiseError(error, actions.updateBodyMakeFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateBodyMakeFailed, 'Error');
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
    if ('imageTag' in action && 'imageFiles' in action) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_BODY_ACCESSORY,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.body_accessories,
        actions.createBodyAccessorySucceed,
        { imageTag: action.imageTag, imageFiles: action.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createBodyAccessoryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createBodyAccessoryFailed, 'Error');
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
      yield setPromiseError(error, actions.getBodyAccessoriesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getBodyAccessoriesFailed, 'Error');
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
    if ('imageTag' in action && 'imageFiles' in action) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_BODY_ACCESSORY,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.body_accessories,
        actions.updateBodyAccessorySucceed,
        { imageTag: action.imageTag, imageFiles: action.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateBodyAccessoryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateBodyAccessoryFailed, 'Error');
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
      yield setPromiseError(error, actions.deleteBodyAccessoryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteBodyAccessoryFailed, 'Error');
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
      yield setPromiseError(error, actions.getBodyAssociatedAccessoriesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getBodyAssociatedAccessoriesFailed, 'Error');
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
    if (
      'createAccessoryData' in action &&
      'imageTag' in action.createAccessoryData &&
      'imageFiles' in action.createAccessoryData
    ) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_ACCESSORY,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.accessories,
        actions.createAccessorySucceed,
        { imageTag: action.createAccessoryData.imageTag, imageFiles: action.createAccessoryData.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createAccessoryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createAccessoryFailed, 'Error');
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
      yield setPromiseError(error, actions.getAccessoriesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getAccessoriesFailed, 'Error');
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
    if (
      'updateAccessoryData' in action &&
      'imageTag' in action.updateAccessoryData &&
      'imageFiles' in action.updateAccessoryData
    ) {
      yield succeedActionWithImageUpload(
        UPLOAD_TO_ACCESSORY,
        response,
        imageIsUploaded,
        actions.uploadImage,
        response.data.accessories,
        actions.updateAccessorySucceed,
        { imageTag: action.updateAccessoryData.imageTag, imageFiles: action.updateAccessoryData.imageFiles },
      );
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateAccessoryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateAccessoryFailed, 'Error');
    }
  }
}

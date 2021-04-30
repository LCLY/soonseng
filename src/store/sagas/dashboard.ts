import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import { getAxiosHeaderToken, setPromiseError, succeedActionWithImageUpload } from 'src/shared/Utils';
import axios from 'axios';
import { UPLOAD_TO_MAKE, UPLOAD_TO_BODY, UPLOAD_TO_BODY_MAKE, UPLOAD_TO_ACCESSORY } from 'src/shared/constants';

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
    // "images[]" is the name of the key, it forms a new object of {images[]: the image files}
    formData.append('model', action.model);
    formData.append('model_id', action.model_id.toString());
    formData.append('tag', action.imageTag);
    // for each image, loop them out and append into the "images[]" array object
    Array.from(action.imageFiles).forEach((file) => formData.append('images[]', file));
  }

  try {
    let response = yield axios.post(url, formData, config);
    yield put(actions.uploadImageSucceed(response.data.images, response.data.success));
    imageIsUploaded = true;
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
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteUploadImageFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteUploadImageFailed, 'Error');
    }
  }
}

/* ================================================================== */
//   Users related
/* ================================================================== */

/* ------------------------------- */
//    Get All users
/* ------------------------------- */
export function* getUsersSaga(_action: AppActions) {
  yield put(actions.getUsersStart());

  let url = process.env.REACT_APP_API + `/user/users`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getUsersSucceed(response.data.users));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getUsersFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getUsersFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Create user
/* ------------------------------- */
export function* createUserSaga(action: AppActions) {
  if (!('userFormData' in action)) return;
  yield put(actions.createUserStart());

  let url = process.env.REACT_APP_API + `/user/users`;

  let user = {
    first_name: action.userFormData.first_name,
    last_name: action.userFormData.last_name,
    email: action.userFormData.email,
    encrypted_password: action.userFormData.encrypted_password,
  };

  try {
    let response = yield axios.post(url, { user });
    yield put(actions.createUserSucceed(response.data.user, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createUserFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createUserFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Update User
/* ------------------------------- */
export function* updateUserSaga(action: AppActions) {
  if (!('userFormData' in action) || !('user_id' in action)) return;
  yield put(actions.updateUserStart());

  let url = process.env.REACT_APP_API + `/user/users/${action.user_id}`;

  let user = {
    first_name: action.userFormData.first_name,
    last_name: action.userFormData.last_name,
    email: action.userFormData.email,
    encrypted_password: action.userFormData.encrypted_password,
  };

  try {
    let response = yield axios.put(url, { user });
    yield put(actions.updateUserSucceed(response.data.standard_charges, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateUserFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateUserFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Delete User
/* ------------------------------- */
export function* deleteUserSaga(action: AppActions) {
  if (!('user_id' in action)) return;

  yield put(actions.deleteUserStart());
  let url = process.env.REACT_APP_API + `/user/users/${action.user_id}`;

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteUserSucceed(response.data.standard_charges, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteUserFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteUserFailed, 'Error');
    }
  }
}

/* ================================================================== */
//   Role related
/* ================================================================== */

/* ------------------------------- */
//    Get All roles
/* ------------------------------- */
export function* getRolesSaga(_action: AppActions) {
  yield put(actions.getRolesStart());

  let url = process.env.REACT_APP_API + `/user/roles`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getRolesSucceed(response.data.roles));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getRolesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getRolesFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Create role
/* ------------------------------- */
export function* createRoleSaga(action: AppActions) {
  if (!('userRoleFormData' in action)) return;
  yield put(actions.createRoleStart());

  let url = process.env.REACT_APP_API + `/user/roles`;

  let role = {
    title: action.userRoleFormData.title,
    description: action.userRoleFormData.description,
    fullSalesPage: action.userRoleFormData.fullSalesPage,
    priceSalesPage: action.userRoleFormData.priceSalesPage,
    adminDashboard: action.userRoleFormData.adminDashboard,
    editSalesDashboard: action.userRoleFormData.editSalesDashboard,
    salesmenDashboard: action.userRoleFormData.salesmenDashboard,
    viewSalesDashboard: action.userRoleFormData.viewSalesDashboard,
  };

  try {
    let response = yield axios.post(url, { role });
    yield put(actions.createRoleSucceed(response.data.roles, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createRoleFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createRoleFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Update Role
/* ------------------------------- */
export function* updateRoleSaga(action: AppActions) {
  if (!('userRoleFormData' in action) || !('role_id' in action)) return;
  yield put(actions.updateRoleStart());

  let url = process.env.REACT_APP_API + `/user/roles/${action.role_id}`;

  let role = {
    title: action.userRoleFormData.title,
    description: action.userRoleFormData.description,
    fullSalesPage: action.userRoleFormData.fullSalesPage,
    priceSalesPage: action.userRoleFormData.priceSalesPage,
    adminDashboard: action.userRoleFormData.adminDashboard,
    editSalesDashboard: action.userRoleFormData.editSalesDashboard,
    salesmenDashboard: action.userRoleFormData.salesmenDashboard,
    viewSalesDashboard: action.userRoleFormData.viewSalesDashboard,
  };

  try {
    let response = yield axios.put(url, { role });
    yield put(actions.updateRoleSucceed(response.data.roles, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateRoleFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateRoleFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Delete Role
/* ------------------------------- */
export function* deleteRoleSaga(action: AppActions) {
  if (!('role_id' in action)) return;

  yield put(actions.deleteRoleStart());
  let url = process.env.REACT_APP_API + `/user/roles/${action.role_id}`;

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteRoleSucceed(response.data.roles, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteRoleFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteRoleFailed, 'Error');
    }
  }
}
/* ================================================================== */
//   Standard Charges and fees
/* ================================================================== */

/* ------------------------------- */
//    Get All fees
/* ------------------------------- */
export function* getChargesFeesSaga(_action: AppActions) {
  yield put(actions.getChargesFeesStart());

  let url = process.env.REACT_APP_API + `/products/standard_charges`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getChargesFeesSucceed(response.data.standard_charges));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getChargesFeesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getChargesFeesFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Create fees
/* ------------------------------- */
export function* createChargesFeesSaga(action: AppActions) {
  yield put(actions.createChargesFeesStart());

  let url = process.env.REACT_APP_API + `/products/standard_charges`;

  let formData = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'price' in action) {
    formData = {
      title: action.title,
      price: action.price,
    };
  }
  try {
    let response = yield axios.post(url, formData);
    yield put(actions.createChargesFeesSucceed(response.data.standard_charges, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createChargesFeesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createChargesFeesFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Update fees
/* ------------------------------- */
export function* updateChargesFeesSaga(action: AppActions) {
  yield put(actions.updateChargesFeesStart());

  let url = '';
  if ('fee_id' in action) {
    url = process.env.REACT_APP_API + `/products/standard_charges/${action.fee_id}`;
  }

  let formData = {};
  // Type guard, check if the "key" exist in the action object
  if ('title' in action && 'price' in action) {
    formData = {
      title: action.title,
      price: action.price,
    };
  }
  try {
    let response = yield axios.put(url, formData);
    yield put(actions.updateChargesFeesSucceed(response.data.standard_charges, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateChargesFeesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateChargesFeesFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Delete Fees
/* ------------------------------- */
export function* deleteChargesFeesSaga(action: AppActions) {
  yield put(actions.deleteChargesFeesStart());

  let url = '';
  if ('fee_id' in action) {
    url = process.env.REACT_APP_API + `/products/standard_charges/${action.fee_id}`;
  }

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteChargesFeesSucceed(response.data.standard_charges, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteChargesFeesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteChargesFeesFailed, 'Error');
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
    yield put(actions.createBrandSucceed(response.data.brands, response.data.success));
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
    yield put(actions.updateBrandSucceed(response.data.brands, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateBrandFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateBrandFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Delete brand
/* ------------------------------- */
export function* deleteBrandSaga(action: AppActions) {
  yield put(actions.deleteBrandStart());

  let url = '';
  if ('brand_id' in action) {
    url = process.env.REACT_APP_API + `/head/brands/${action.brand_id}`;
  }

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteBrandSucceed(response.data.brands, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteBrandFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteBrandFailed, 'Error');
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

    yield put(actions.updateWheelbaseSucceed(response.data.wheelbases, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateWheelbaseFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateWheelbaseFailed, 'Error');
    }
  }
}

export function* deleteWheelbaseSaga(action: AppActions) {
  yield put(actions.deleteWheelbaseStart());

  let url = '';
  if ('wheelbase_id' in action) {
    url = process.env.REACT_APP_API + `/head/wheelbases/${action.wheelbase_id}`;
  }

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteWheelbaseSucceed(response.data.wheelbases, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteWheelbaseFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteWheelbaseFailed, 'Delete Body Make Accessory Failed');
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
      title: action.createMakeData.title,
      brand_id: action.createMakeData.brand_id,
      series_id: action.createMakeData.series_id,
      tire: action.createMakeData.tire,
      horsepower: action.createMakeData.horsepower,
      year: action.createMakeData.year,
      transmission: action.createMakeData.transmission,
      engine_cap: action.createMakeData.engine_cap,
      gvw: action.createMakeData.gvw,
      abs: action.createMakeData.abs,
      torque: action.createMakeData.torque,
      config: action.createMakeData.config,
      emission: action.createMakeData.emission,
      price: action.createMakeData.price,
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
      title: action.updateMakeData.title,
      brand_id: action.updateMakeData.brand_id,
      series_id: action.updateMakeData.series_id,
      tire: action.updateMakeData.tire,
      horsepower: action.updateMakeData.horsepower,
      year: action.updateMakeData.year,
      transmission: action.updateMakeData.transmission,
      engine_cap: action.updateMakeData.engine_cap,
      gvw: action.updateMakeData.gvw,
      abs: action.updateMakeData.abs,
      torque: action.updateMakeData.torque,
      config: action.updateMakeData.config,
      emission: action.updateMakeData.emission,
      price: action.updateMakeData.price,
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

/* ------------------------------- */
//    Delete make
/* ------------------------------- */
export function* deleteMakeSaga(action: AppActions) {
  yield put(actions.deleteMakeStart());
  let url = '';
  if ('make_id' in action) {
    url = process.env.REACT_APP_API + `/head/makes/${action.make_id}`;
  }
  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteMakeSucceed(response.data.makes, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteMakeFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteMakeFailed, 'Error');
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

/* ------------------------------- */
//    Create Series
/* ------------------------------- */
export function* createSeriesSaga(action: AppActions) {
  yield put(actions.createSeriesStart());

  let url = '';

  // Type guard, check if the "key" exist in the action object
  if ('brand_id' in action) {
    url = process.env.REACT_APP_API + `/head/brands/${action.brand_id}/series`;
  }

  let formData = {};
  if ('title' in action) {
    formData = {
      title: action.title,
    };
  }

  try {
    let response = yield axios.post(url, formData);
    yield put(actions.createSeriesSucceed(response.data.brand.series, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createSeriesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createSeriesFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Update Series
/* ------------------------------- */
export function* updateSeriesSaga(action: AppActions) {
  yield put(actions.updateSeriesStart());

  let url = '';

  // Type guard, check if the "key" exist in the action object
  if ('brand_id' in action && 'series_id' in action) {
    url = process.env.REACT_APP_API + `/head/brands/${action.brand_id}/series/${action.series_id}`;
  }

  let formData = {};

  if ('title' in action) {
    formData = { title: action.title };
  }

  try {
    let response = yield axios.put(url, formData);

    yield put(actions.updateSeriesSucceed(response.data.brand.series, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateSeriesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateSeriesFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Delete Series
/* ------------------------------- */
export function* deleteSeriesSaga(action: AppActions) {
  yield put(actions.deleteSeriesStart());

  let url = '';

  // Type guard, check if the "key" exist in the action object
  if ('brand_id' in action && 'series_id' in action) {
    url = process.env.REACT_APP_API + `/head/brands/${action.brand_id}/series/${action.series_id}`;
  }

  try {
    let response = yield axios.delete(url);

    yield put(actions.deleteSeriesSucceed(response.data.brand.series, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteSeriesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteSeriesFailed, 'Error');
    }
  }
}

/* ================================================================== */
/*   Make Wheelbase (Make Page) (tail) */
/* ================================================================== */

/* ------------------------------- */
//    Create Make Wheelbase
/* ------------------------------- */
export function* createMakeWheelbaseSaga(action: AppActions) {
  yield put(actions.createMakeWheelbaseStart());

  let url = '';

  let data = {};
  // Type guard, check if the "key" exist in the action object
  if ('make_id' in action && 'wheelbase_id' in action && 'extension_price' in action && 'original' in action) {
    url = process.env.REACT_APP_API + `/head/makes/${action.make_id}/make_wheelbase`;
    data = {
      original: action.original,
      price: action.extension_price,
      wheelbase_id: action.wheelbase_id,
    };
  }

  try {
    let response = yield axios.post(url, data);
    yield put(actions.createMakeWheelbaseSucceed(response.data.make_wheelbase, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createMakeWheelbaseFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createMakeWheelbaseFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Update Make Wheelbase
/* ------------------------------- */
export function* updateMakeWheelbaseSaga(action: AppActions) {
  if (
    !('make_id' in action) ||
    !('make_wheelbase_id' in action) ||
    !('wheelbase_id' in action) ||
    !('extension_price' in action) ||
    !('original' in action)
  )
    return;
  yield put(actions.updateMakeWheelbaseStart());

  let data = {};
  // Type guard, check if the "key" exist in the action object
  let url = process.env.REACT_APP_API + `/head/makes/${action.make_id}/make_wheelbase/${action.make_wheelbase_id}`;
  data = {
    original: action.original,
    price: action.extension_price,
    wheelbase_id: action.wheelbase_id,
  };

  try {
    let response = yield axios.put(url, data);
    yield put(actions.updateMakeWheelbaseSucceed(response.data.make_wheelbase, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateMakeWheelbaseFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateMakeWheelbaseFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Get Make Wheelbases
/* ------------------------------- */
export function* getMakeWheelbasesSaga(action: AppActions) {
  yield put(actions.getMakeWheelbasesStart());

  let url = '';

  // Type guard, check if the "key" exist in the action object
  if ('make_id' in action) {
    url = process.env.REACT_APP_API + `/head/makes/${action.make_id}/make_wheelbase`;
  }

  try {
    let response = yield axios.get(url);
    yield put(actions.getMakeWheelbasesSucceed(response.data.make_wheelbase));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getMakeWheelbasesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getMakeWheelbasesFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Delete Make Wheelbase
/* ------------------------------- */
export function* deleteMakeWheelbaseSaga(action: AppActions) {
  yield put(actions.deleteMakeWheelbaseStart());

  let url = '';

  // Type guard, check if the "key" exist in the action object
  if ('make_wheelbase_id' in action && 'make_id' in action) {
    url = process.env.REACT_APP_API + `/head/makes/${action.make_id}/make_wheelbase/${action.make_wheelbase_id}`;
  }

  try {
    let response = yield axios.delete(url);

    yield put(actions.deleteMakeWheelbaseSucceed(response.data.make_wheelbase, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteMakeWheelbaseFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteMakeWheelbaseFailed, 'Error');
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
    yield put(actions.createBodyAccessorySucceed(response.data.body_accessories, response.data.success));
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
    yield put(actions.updateBodyAccessorySucceed(response.data.body_accessories, response.data.success));
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
    yield put(actions.deleteBodyAccessorySucceed(response.data.body_accessories, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteBodyAccessoryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteBodyAccessoryFailed, 'Error');
    }
  }
}
/* ------------------------------------------ */
//    Get Body Associated Accessories
/* ------------------------------------------ */
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

  let body_make = {};
  // Type guard, check if the "key" exist in the action object
  if ('createBodyMakeData' in action) {
    body_make = {
      body_id: action.createBodyMakeData.body_id,
      length_id: action.createBodyMakeData.length_id,
      make_wheelbase_id: action.createBodyMakeData.make_wheelbase_id,
      make_id: action.createBodyMakeData.make_id,
      depth: action.createBodyMakeData.depth,
      width: action.createBodyMakeData.width,
      height: action.createBodyMakeData.height,
      price: action.createBodyMakeData.price,
    };
  }

  try {
    let response = yield axios.post(url, { body_make });
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
  let body_make = {};
  if ('updateBodyMakeData' in action) {
    url = process.env.REACT_APP_API + `/products/body_make/${action.updateBodyMakeData.body_make_id}`;

    body_make = {
      body_id: action.updateBodyMakeData.body_id,
      make_id: action.updateBodyMakeData.make_id,
      length_id: action.updateBodyMakeData.length_id,
      make_wheelbase_id: action.updateBodyMakeData.make_wheelbase_id,
      depth: action.updateBodyMakeData.depth,
      width: action.updateBodyMakeData.width,
      height: action.updateBodyMakeData.height,
      price: action.updateBodyMakeData.price,
    };
  }

  try {
    let response = yield axios.put(url, { body_make });
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
/*   Body Make Accessory  */
/* ================================================================== */

/* ------------------------------- */
//    Create Body Make Accessory
/* ------------------------------- */
export function* createBodyMakeAccessorySaga(action: AppActions) {
  yield put(actions.createBodyMakeAccessoryStart());

  let url = '';

  if ('body_make_id' in action) {
    url = process.env.REACT_APP_API + `/products/body_make/${action.body_make_id}/body_make_accessories`;
  }

  let formData = {};
  // Type guard, check if the "key" exist in the action object
  if ('accessory_id' in action && 'price' in action) {
    formData = {
      price: action.price,
      accessory_id: action.accessory_id,
    };
  }

  try {
    let response = yield axios.post(url, formData);
    yield put(actions.createBodyMakeAccessorySucceed(response.data.body_make_accessories, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createBodyMakeAccessoryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createBodyMakeAccessoryFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Get Body Make Accessories
/* ------------------------------- */
export function* getBodyMakeAccessoriesSaga(action: AppActions) {
  yield put(actions.getBodyMakeAccessoriesStart());

  let url = '';
  if ('body_make_id' in action) {
    url = process.env.REACT_APP_API + `/products/body_make/${action.body_make_id}/body_make_accessories`;
  }

  try {
    let response = yield axios.get(url);
    yield put(actions.getBodyMakeAccessoriesSucceed(response.data.body_make_accessories));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getBodyMakeAccessoriesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getBodyMakeAccessoriesFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Update Body Make Accessory
/* ------------------------------- */
export function* updateBodyMakeAccessorySaga(action: AppActions) {
  yield put(actions.updateBodyMakeAccessoryStart());

  let url = '';
  if ('body_make_id' in action && 'body_make_accessory_id' in action) {
    url =
      process.env.REACT_APP_API +
      `/products/body_make/${action.body_make_id}/body_make_accessories/${action.body_make_accessory_id}`;
  }

  let formData = {};
  // Type guard, check if the "key" exist in the action object
  if ('price' in action) {
    formData = {
      price: action.price,
    };
  }

  try {
    let response = yield axios.put(url, formData);

    yield put(actions.updateBodyMakeAccessorySucceed(response.data.body_make_accessories, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateBodyMakeAccessoryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateBodyMakeAccessoryFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Delete Body Make Accessory
/* ------------------------------- */
export function* deleteBodyMakeAccessorySaga(action: AppActions) {
  yield put(actions.deleteBodyMakeAccessoryStart());

  let url = '';
  if ('body_make_id' in action && 'body_make_accessory_id' in action) {
    url =
      process.env.REACT_APP_API +
      `/products/body_make/${action.body_make_id}/body_make_accessories/${action.body_make_accessory_id}`;
  }

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteBodyMakeAccessorySucceed(response.data.body_make_accessories, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteBodyMakeAccessoryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteBodyMakeAccessoryFailed, 'Delete Body Make Accessory Failed');
    }
  }
}

/* ------------------------------------------ */
//    Get Dimension Associated Accessories
/* ------------------------------------------ */
export function* getDimensionAssociatedAccessoriesSaga(_action: AppActions) {
  yield put(actions.getDimensionAssociatedAccessoriesStart());

  let url = process.env.REACT_APP_API + `/pages/dashboard/get_dimension_associated_accessories`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getDimensionAssociatedAccessoriesSucceed(response.data.dimension_associated));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getDimensionAssociatedAccessoriesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getDimensionAssociatedAccessoriesFailed, 'Error');
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
/* ------------------------------- */
//    Delete Accessory
/* ------------------------------- */
export function* deleteAccessorySaga(action: AppActions) {
  yield put(actions.deleteAccessoryStart());

  let url = '';
  if ('accessory_id' in action) {
    url = process.env.REACT_APP_API + `/tail/accessories/${action.accessory_id}`;
  }

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteAccessorySucceed(response.data.accessories, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteAccessoryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteAccessoryFailed, 'Error');
    }
  }
}

/* ============================================================================================== */
// Job Monitoring
/* ============================================================================================== */
/* ------------------------------- */
//    Get Service Types
/* ------------------------------- */
export function* getServiceTypesSaga(_action: AppActions) {
  yield put(actions.getServiceTypesStart());

  let url = process.env.REACT_APP_API + `/job_monitoring/service_types`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getServiceTypesSucceed(response.data.service_types));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getServiceTypesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getServiceTypesFailed, 'Get Service Types Error');
    }
  }
}
/* ------------------------------- */
//    Create Service Types
/* ------------------------------- */
export function* createServiceTypeSaga(action: AppActions) {
  yield put(actions.createServiceTypeStart());

  let url = process.env.REACT_APP_API + `/job_monitoring/service_types`;

  let service_type = {};
  if ('title' in action && 'description' in action) {
    service_type = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.post(url, { service_type });
    yield put(actions.createServiceTypeSucceed(response.data.service_types, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createServiceTypeFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createServiceTypeFailed, 'Create Service Types Error');
    }
  }
}
/* ------------------------------- */
//    Update Service Types
/* ------------------------------- */
export function* updateServiceTypeSaga(action: AppActions) {
  yield put(actions.updateServiceTypeStart());
  let url = '';
  if ('service_type_id' in action) {
    url = process.env.REACT_APP_API + `/job_monitoring/service_types/${action.service_type_id}`;
  }

  let service_type = {};
  if ('title' in action && 'description' in action) {
    service_type = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.put(url, { service_type });
    yield put(actions.updateServiceTypeSucceed(response.data.service_types, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateServiceTypeFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateServiceTypeFailed, 'Update Service Types Error');
    }
  }
}
/* ------------------------------- */
//    Delete Service Type
/* ------------------------------- */
export function* deleteServiceTypeSaga(action: AppActions) {
  yield put(actions.deleteServiceTypeStart());
  let url = '';
  if ('service_type_id' in action) {
    url = process.env.REACT_APP_API + `/job_monitoring/service_types/${action.service_type_id}`;
  }

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteServiceTypeSucceed(response.data.service_types, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteServiceTypeFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteServiceTypeFailed, 'Update Service Types Error');
    }
  }
}
/* ------------------------------- */
//    Get Service Tasks
/* ------------------------------- */
export function* getServiceTasksSaga(action: AppActions) {
  yield put(actions.getServiceTasksStart());

  let url = '';

  if ('service_type_id' in action) {
    url = process.env.REACT_APP_API + `/job_monitoring/service_types/${action.service_type_id}/service_tasks`;
  }

  try {
    let response = yield axios.get(url);
    yield put(actions.getServiceTasksSucceed(response.data.service_tasks));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getServiceTasksFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getServiceTasksFailed, 'Get Service Types Error');
    }
  }
}
/* ------------------------------- */
//    Create Service Task
/* ------------------------------- */
export function* createServiceTaskSaga(action: AppActions) {
  yield put(actions.createServiceTaskStart());

  let url = '';

  if ('serviceTaskFormData' in action) {
    url =
      process.env.REACT_APP_API +
      `/job_monitoring/service_types/${action.serviceTaskFormData.service_type_id}/service_tasks`;
  }

  let service_task = {};
  if ('serviceTaskFormData' in action) {
    service_task = {
      title: action.serviceTaskFormData.title,
      description: action.serviceTaskFormData.description,
    };
  }

  try {
    let response = yield axios.post(url, { service_task }, getAxiosHeaderToken());
    yield put(actions.createServiceTaskSucceed(response.data.service_tasks, 'Service Task Created'));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createServiceTaskFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createServiceTaskFailed, 'Create Service Types Error');
    }
  }
}
/* ------------------------------- */
//    Update Service Task
/* ------------------------------- */
export function* updateServiceTaskSaga(action: AppActions) {
  yield put(actions.updateServiceTaskStart());
  let url = '';
  if ('serviceTaskFormData' in action && 'service_task_id' in action) {
    url =
      process.env.REACT_APP_API +
      `/job_monitoring/service_types/${action.serviceTaskFormData.service_type_id}/service_tasks/${action.service_task_id}`;
  }

  let service_task = {};
  if ('serviceTaskFormData' in action) {
    service_task = {
      title: action.serviceTaskFormData.title,
      description: action.serviceTaskFormData.description,
    };
  }

  try {
    let response = yield axios.put(url, { service_task }, getAxiosHeaderToken());
    yield put(actions.updateServiceTaskSucceed(response.data.service_tasks, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateServiceTaskFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateServiceTaskFailed, 'Update Service Types Error');
    }
  }
}
/* ------------------------------- */
//    Delete Service Task
/* ------------------------------- */
export function* deleteServiceTaskSaga(action: AppActions) {
  yield put(actions.deleteServiceTaskStart());
  let url = '';
  if ('service_type_id' in action && 'service_task_id' in action) {
    url =
      process.env.REACT_APP_API +
      `/job_monitoring/service_types/${action.service_type_id}/service_tasks/${action.service_task_id}`;
  }

  try {
    let response = yield axios.delete(url, getAxiosHeaderToken());
    yield put(actions.deleteServiceTaskSucceed(response.data.service_tasks, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteServiceTaskFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteServiceTaskFailed, 'Update Service Types Error');
    }
  }
}

/* ------------------------------- */
//    Get Intake Status
/* ------------------------------- */
export function* getIntakeStatusSaga(_action: AppActions) {
  yield put(actions.getIntakeStatusStart());

  let url = process.env.REACT_APP_API + `/job_monitoring/intake_status`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getIntakeStatusSucceed(response.data.intake_status));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getIntakeStatusFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getIntakeStatusFailed, 'Get Job Status Error');
    }
  }
}
/* ------------------------------- */
//    Create Intake Status
/* ------------------------------- */
export function* createIntakeStatusSaga(action: AppActions) {
  yield put(actions.createIntakeStatusStart());

  let url = process.env.REACT_APP_API + `/job_monitoring/intake_status`;

  let intake_status = {};
  if ('title' in action && 'description' in action) {
    intake_status = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.post(url, { intake_status });
    yield put(actions.createIntakeStatusSucceed(response.data.intake_status, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createIntakeStatusFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createIntakeStatusFailed, 'Create Job Status Error');
    }
  }
}
/* ------------------------------- */
//    Update Intake Status
/* ------------------------------- */
export function* updateIntakeStatusSaga(action: AppActions) {
  yield put(actions.updateIntakeStatusStart());
  let url = '';
  if ('intake_status_id' in action) {
    url = process.env.REACT_APP_API + `/job_monitoring/intake_status/${action.intake_status_id}`;
  }

  let intake_status = {};
  if ('title' in action && 'description' in action) {
    intake_status = {
      title: action.title,
      description: action.description,
    };
  }

  try {
    let response = yield axios.put(url, { intake_status });
    yield put(actions.updateIntakeStatusSucceed(response.data.intake_status, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateIntakeStatusFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateIntakeStatusFailed, 'Update Job Status Error');
    }
  }
}
/* ------------------------------- */
//    Delete Intake Status
/* ------------------------------- */
export function* deleteIntakeStatusSaga(action: AppActions) {
  yield put(actions.deleteIntakeStatusStart());
  let url = '';
  if ('intake_status_id' in action) {
    url = process.env.REACT_APP_API + `/job_monitoring/intake_status/${action.intake_status_id}`;
  }

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteIntakeStatusSucceed(response.data.intake_status, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteIntakeStatusFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteIntakeStatusFailed, 'Update Job Status Error');
    }
  }
}

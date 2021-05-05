import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios from 'axios';
import { setPromiseError, setAxiosHeaderToken } from 'src/shared/Utils';

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
    yield put(actions.signInSucceed(response.data.auth_token));
    // call get user info
    yield put(actions.getUserInfo(response.data.auth_token));
    // clear the catalog array when login succeed, so user will fetch new array according to their status
    yield put(actions.clearCatalogState());
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.signInFailed, error.response.data.messages);
    } else {
      yield setPromiseError(error, actions.signInFailed, 'Error');
    }
  }
}

/* ------------------------------- */
//    Get User Info
/* ------------------------------- */
export function* getUserInfoSaga(action: AppActions) {
  yield put(actions.getUserInfoStart());

  // Setting Axios header token config
  let config = setAxiosHeaderToken(action);

  let url = process.env.REACT_APP_API + `/get_user_info`;

  try {
    let response = yield axios.get(url, config);

    yield put(actions.getUserInfoSucceed(response.data.user));

    if (response.data.user) {
      const { roles } = response.data.user; //extract the roles out
      // only assign access if there's a role
      let accessObj = {
        showAdminDashboard: roles.priceSalesPage,
        allowEditSalesDashboard: roles.fullSalesPage,
        showFullSalesPage: roles.viewSalesDashboard,
        showPriceSalesPage: roles.editSalesDashboard,
        showSalesmenDashboard: roles.salesmenDashboard,
        showSalesDashboard: roles.adminDashboard,
      };
      // assign the access booleans
      yield put(actions.assignAccess(accessObj));
    }
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getUserInfoFailed, error.response.data.messages);
    } else {
      yield setPromiseError(error, actions.getUserInfoFailed, 'Error');
    }
  }
}

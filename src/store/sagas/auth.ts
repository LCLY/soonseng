import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios from 'axios';
import { setPromiseError, getAxiosHeaderToken } from 'src/shared/Utils';

/* ================================================================== */
//   Authentication
/* ================================================================== */

/* ------------------------------- */
//    Sign In
/* ------------------------------- */
export function* signInSaga(action: AppActions): any {
  yield put(actions.signInStart());

  let url = process.env.REACT_APP_API + `/sign_in`;

  let user = {};

  if ('username' in action && 'password' in action) {
    user = {
      username: action.username,
      password: action.password,
    };
  }

  try {
    let response = yield axios.post(url, { user });
    yield put(actions.signInSucceed(response.data.auth_token));
    // call get user info
    localStorage.setItem('Authorization', response.data.auth_token);
    yield put(actions.getUserInfo());
    // clear the catalog array when login succeed, so user will fetch new array according to their status
    yield put(actions.clearCatalogState());
  } catch (error: any) {
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
export function* getUserInfoSaga(_action: AppActions): any {
  yield put(actions.getUserInfoStart());

  let url = process.env.REACT_APP_API + `/get_user_info`;

  try {
    let response = yield axios.get(url, getAxiosHeaderToken());

    yield put(actions.getUserInfoSucceed(response.data.user));

    if (response.data.user) {
      const { roles } = response.data.user; //extract the roles out
      // only assign access if there's a role
      let accessObj = {
        showAdminDashboard: roles.adminDashboard,
        allowEditSalesDashboard: roles.editSalesDashboard,
        showFullSalesPage: roles.fullSalesPage,
        showPriceSalesPage: roles.priceSalesPage,
        showSalesmenDashboard: roles.salesmenDashboard,
        showSalesDashboard: roles.viewSalesDashboard,
      };
      // assign the access booleans
      yield put(actions.assignAccess(accessObj));
    }
  } catch (error: any) {
    if (error.response) {
      yield setPromiseError(error, actions.getUserInfoFailed, error.response.data.messages);
    } else {
      yield setPromiseError(error, actions.getUserInfoFailed, 'Error');
    }
  }
}

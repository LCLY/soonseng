import { put /*, delay */ /* call */ } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import axios from 'axios';
import { getAxiosHeaderToken, setPromiseError } from 'src/shared/Utils';

/* ================================================================== */
//   All Performance
/* ================================================================== */
export function* getAllPerformanceSaga(action: AppActions) {
  if (!('date_from' in action) || !('date_to' in action)) return;
  yield put(actions.getAllPerformanceStart());

  let url = process.env.REACT_APP_API + `/pages/job_monitoring/generate_intakes_data`;

  let generate_data = {
    date_from: action.date_from,
    date_to: action.date_to,
  };

  try {
    let response = yield axios.post(url, { generate_data }, getAxiosHeaderToken());
    yield put(actions.getAllPerformanceSucceed(response.data.data));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getAllPerformanceFailed, error.response.data.messages);
    } else {
      yield setPromiseError(error, actions.getAllPerformanceFailed, 'Error');
    }
  }
}
/* ================================================================== */
//   Mechanics Data
/* ================================================================== */
export function* getAllMechanicsSaga(action: AppActions) {
  if (!('date_from' in action) || !('date_to' in action) || !('interval' in action)) return;
  yield put(actions.getAllMechanicsStart());

  let url = process.env.REACT_APP_API + `/pages/job_monitoring/generate_mechanics_data`;

  let generate_data = {
    date_from: action.date_from,
    date_to: action.date_to,
  };

  try {
    let response = yield axios.post(url, { generate_data }, getAxiosHeaderToken());
    yield put(actions.getAllMechanicsSucceed(response.data.data));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getAllMechanicsFailed, error.response.data.messages);
    } else {
      yield setPromiseError(error, actions.getAllMechanicsFailed, 'Error');
    }
  }
}
/* ================================================================== */
//   Specfici Mechanic Performance
/* ================================================================== */
export function* getSpecificMechanicPerformanceSaga(action: AppActions) {
  if (!('date_from' in action) || !('date_to' in action) || !('interval' in action) || !('mechanic_id' in action))
    return;
  yield put(actions.getSpecificMechanicPerformanceStart());

  let url = process.env.REACT_APP_API + `/pages/job_monitoring/generate_mechanics_data/${action.mechanic_id}`;

  let generate_data = {
    date_from: action.date_from,
    date_to: action.date_to,
  };

  try {
    let response = yield axios.post(url, { generate_data }, getAxiosHeaderToken());
    yield put(actions.getSpecificMechanicPerformanceSucceed(response.data.data));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getSpecificMechanicPerformanceFailed, error.response.data.messages);
    } else {
      yield setPromiseError(error, actions.getSpecificMechanicPerformanceFailed, 'Error');
    }
  }
}
/* ================================================================== */
//   Performance Intake Data
/* ================================================================== */
export function* getPerformanceIntakeDataSaga(action: AppActions) {
  if (!('date_from' in action) || !('date_to' in action)) return;
  yield put(actions.getPerformanceIntakeDataStart());

  let url = process.env.REACT_APP_API + `/pages/job_monitoring/generate_data_intake_summary`;

  let generate_data = {
    date_from: action.date_from,
    date_to: action.date_to,
  };

  try {
    let response = yield axios.post(url, { generate_data }, getAxiosHeaderToken());
    yield put(actions.getPerformanceIntakeDataSucceed(response.data.data));
  } catch (error) {
    if (error.response) {
    yield setPromiseError(error, actions.getPerformanceIntakeDataFailed, error.response.data.messages);
    } else {
      yield setPromiseError(error, actions.getPerformanceIntakeDataFailed, 'Error');
    }
  }
}

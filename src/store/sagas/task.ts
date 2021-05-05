import axios from 'axios';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import { setPromiseError } from 'src/shared/Utils';
import { put /*, delay */ /* call */ } from 'redux-saga/effects';

/* ====================================================================================== */
// Task
/* ====================================================================================== */
/* ------------------------------- */
//    Create Task
/* ------------------------------- */
export function* createTaskSaga(action: AppActions) {
  yield put(actions.createTaskStart());

  let url = process.env.REACT_APP_API + `/job_monitoring/jobs`;

  let job = {};
  // Type guard, check if the "key" exist in the action object
  if ('taskFormData' in action) {
    job = {
      assigned_to_id: action.taskFormData.assigned_to_id,
      description: action.taskFormData.description,
      job_statuses_id: action.taskFormData.job_statuses_id,
      registration_number: action.taskFormData.registration_number,
      service_types_id: action.taskFormData.service_types_id,
    };
  }
  try {
    let response = yield axios.post(url, { job });
    yield put(actions.createTaskSucceed(response.data.jobs, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createTaskFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createTaskFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Get Tasks
/* ------------------------------- */
export function* getTasksSaga(_action: AppActions) {
  yield put(actions.getTasksStart());
  let url = process.env.REACT_APP_API + `/job_monitoring/jobs`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getTasksSucceed(response.data.jobs));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getTasksFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getTasksFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Update Task
/* ------------------------------- */
export function* updateTaskSaga(action: AppActions) {
  yield put(actions.updateTaskStart());
  let url = '';

  if ('task_id' in action) {
    url = process.env.REACT_APP_API + `/job_monitoring/jobs/${action.task_id}`;
  }

  let job = {};
  // Type guard, check if the "key" exist in the action object
  if ('taskFormData' in action) {
    job = {
      assigned_to_id: action.taskFormData.assigned_to_id,
      description: action.taskFormData.description,
      job_statuses_id: action.taskFormData.job_statuses_id,
      registration_number: action.taskFormData.registration_number,
      service_types_id: action.taskFormData.service_types_id,
    };
  }
  try {
    let response = yield axios.post(url, { job });
    yield put(actions.updateTaskSucceed(response.data.jobs, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateTaskFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateTaskFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Delete Task
/* ------------------------------- */
export function* deleteTaskSaga(action: AppActions) {
  yield put(actions.deleteTaskStart());
  let url = '';

  if ('task_id' in action) {
    url = process.env.REACT_APP_API + `/job_monitoring/jobs/${action.task_id}`;
  }

  try {
    let response = yield axios.delete(url);
    yield put(actions.deleteTaskSucceed(response.data.jobs, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteTaskFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteTaskFailed, 'Error');
    }
  }
}

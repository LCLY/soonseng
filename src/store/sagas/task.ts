import axios from 'axios';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import { setAxiosHeaderToken, setPromiseError } from 'src/shared/Utils';
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
  let config = setAxiosHeaderToken(action);
  let job = {};
  // Type guard, check if the "key" exist in the action object
  if ('taskFormData' in action) {
    job = {
      description: action.taskFormData.description,
      job_status_id: action.taskFormData.job_status_id,
      assigned_to_ids: action.taskFormData.assigned_to_ids,
      service_type_id: action.taskFormData.service_type_id,
      registration_number: action.taskFormData.registration_number,
    };
  }

  try {
    let response = yield axios.post(url, { job }, config);
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
      description: action.taskFormData.description,
      job_status_id: action.taskFormData.job_status_id,
      assigned_to_ids: action.taskFormData.assigned_to_ids,
      service_type_id: action.taskFormData.service_type_id,
      registration_number: action.taskFormData.registration_number,
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

/* ============================================================================================== */
// Get Users
/* ============================================================================================== */
/* ------------------------------- */
//    Get All Users
/* ------------------------------- */
export function* getAllUsersSaga(_action: AppActions) {
  yield put(actions.getAllUsersStart());
  let url = process.env.REACT_APP_API + `/user/users`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getAllUsersSucceed(response.data.jobs));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getAllUsersFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getAllUsersFailed, 'Error');
    }
  }
}
/* ------------------------------- */
//    Get Users By Roles
/* ------------------------------- */
export function* getUsersByRolesSaga(action: AppActions) {
  yield put(actions.getUsersByRolesStart());
  let url = process.env.REACT_APP_API + `/user/users/by_role`;

  let role = {};

  if ('role_id' in action && 'title' in action) {
    role = { id: action.role_id, title: action.title };
  }

  try {
    let response = yield axios.post(url, { role });
    yield put(actions.getUsersByRolesSucceed(response.data.users));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getUsersByRolesFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getUsersByRolesFailed, 'Error');
    }
  }
}

import axios from 'axios';
import * as actions from '../actions/index';
import { AppActions } from '../types/index';
import { getAxiosHeaderToken, setPromiseError } from 'src/shared/Utils';
import { put /*, delay */ /* call */ } from 'redux-saga/effects';

/* ====================================================================================== */
// Task
/* ====================================================================================== */
/* ------------------------------- */
//    Create Task
/* ------------------------------- */
// export function* createTaskSaga(action: AppActions) {
//   yield put(actions.createTaskStart());

//   let url = process.env.REACT_APP_API + `/job_monitoring/jobs`;

//   let job = {};
//   // Type guard, check if the "key" exist in the action object
//   if ('taskFormData' in action) {
//     job = {
//       description: action.taskFormData.description,
//       job_status_id: action.taskFormData.job_status_id,
//       assigned_to_ids: action.taskFormData.assigned_to_ids,
//       service_type_id: action.taskFormData.service_type_id,
//       registration_number: action.taskFormData.registration_number,
//     };
//   }

//   try {
//     let response = yield axios.post(url, { job }, getAxiosHeaderToken());
//     yield put(actions.createTaskSucceed(response.data.jobs, response.data.success));
//   } catch (error) {
//     if (error.response) {
//       yield setPromiseError(error, actions.createTaskFailed, error.response.data.error);
//     } else {
//       yield setPromiseError(error, actions.createTaskFailed, 'Error');
//     }
//   }
// }
// /* ------------------------------- */
// //    Get Tasks
// /* ------------------------------- */
// export function* getTasksSaga(_action: AppActions) {
//   yield put(actions.getTasksStart());
//   let url = process.env.REACT_APP_API + `/job_monitoring/intakes`;

//   try {
//     let response = yield axios.get(url);
//     yield put(actions.getTasksSucceed(response.data.intakes));
//   } catch (error) {
//     if (error.response) {
//       yield setPromiseError(error, actions.getTasksFailed, error.response.data.error);
//     } else {
//       yield setPromiseError(error, actions.getTasksFailed, 'Error');
//     }
//   }
// }
// /* ------------------------------- */
// //    Update Task
// /* ------------------------------- */
// export function* updateTaskSaga(action: AppActions) {
//   yield put(actions.updateTaskStart());
//   let url = '';

//   if ('task_id' in action) {
//     url = process.env.REACT_APP_API + `/job_monitoring/jobs/${action.task_id}`;
//   }

//   let job = {};
//   // Type guard, check if the "key" exist in the action object
//   if ('taskFormData' in action) {
//     job = {
//       description: action.taskFormData.description,
//       job_status_id: action.taskFormData.job_status_id,
//       assigned_to_ids: action.taskFormData.assigned_to_ids,
//       service_type_id: action.taskFormData.service_type_id,
//       registration_number: action.taskFormData.registration_number,
//     };
//   }
//   try {
//     let response = yield axios.post(url, { job });
//     yield put(actions.updateTaskSucceed(response.data.jobs, response.data.success));
//   } catch (error) {
//     if (error.response) {
//       yield setPromiseError(error, actions.updateTaskFailed, error.response.data.error);
//     } else {
//       yield setPromiseError(error, actions.updateTaskFailed, 'Error');
//     }
//   }
// }
/* ------------------------------- */
//    Delete Task
/* ------------------------------- */
export function* deleteTaskSaga(action: AppActions) {
  yield put(actions.deleteTaskStart());
  if (!('task_id' in action) || !('intake_id' in action)) return;
  let url = process.env.REACT_APP_API + `/job_monitoring/intakes/${action.intake_id}/jobs/${action.task_id}`;
  try {
    let response = yield axios.delete(url, getAxiosHeaderToken());
    yield put(actions.deleteTaskSucceed(response.data.jobs, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteTaskFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteTaskFailed, 'Error');
    }
  }
}

/* ====================================================================================== */
// Intakes & Jobs - Pages
/* ====================================================================================== */
/* ------------------------------- */
//    Create Intake Summary
/* ------------------------------- */
export function* createIntakeSummarySaga(action: AppActions) {
  yield put(actions.createIntakeSummaryStart());

  let url = process.env.REACT_APP_API + `/pages/job_monitoring/intakes`;

  let intake_and_jobs = {};
  // Type guard, check if the "key" exist in the action object
  if ('intakeJobsFormData' in action) {
    intake_and_jobs = {
      intake: action.intakeJobsFormData.intake,
      jobs: action.intakeJobsFormData.jobs,
      logs: action.intakeJobsFormData.logs,
    };
  }

  try {
    let response = yield axios.post(url, { intake_and_jobs }, getAxiosHeaderToken());
    yield put(actions.createIntakeSummarySucceed(response.data.intakes, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.createIntakeSummaryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.createIntakeSummaryFailed, 'Create Intake Jobs Error');
    }
  }
}
/* ------------------------------- */
//    Get Intake Summary
/* ------------------------------- */
export function* getIntakeSummarySaga(_action: AppActions) {
  yield put(actions.getIntakeSummaryStart());
  let url = process.env.REACT_APP_API + `/pages/job_monitoring/intakes`;

  try {
    let response = yield axios.get(url);
    yield put(actions.getIntakeSummarySucceed(response.data.intakes));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getIntakeSummaryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getIntakeSummaryFailed, 'Get Intakes Jobs Error');
    }
  }
}
/* ------------------------------- */
//    Update Intake & Jobs
/* ------------------------------- */
export function* updateIntakeSummarySaga(action: AppActions) {
  yield put(actions.updateIntakeSummaryStart());
  let url = '';

  if ('intake_id' in action) {
    url = process.env.REACT_APP_API + `/pages/job_monitoring/intakes/${action.intake_id}`;
  }

  let intake_and_jobs = {};
  // Type guard, check if the "key" exist in the action object
  if ('intakeJobsFormData' in action) {
    intake_and_jobs = {
      intake: action.intakeJobsFormData.intake,
      jobs: action.intakeJobsFormData.jobs,
      logs: action.intakeJobsFormData.logs,
    };
  }
  console.log(intake_and_jobs);

  try {
    let response = yield axios.put(url, { intake_and_jobs }, getAxiosHeaderToken());
    yield put(actions.updateIntakeSummarySucceed(response.data.intakes, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateIntakeSummaryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateIntakeSummaryFailed, 'Update Intake Jobs Error');
    }
  }
}
/* ------------------------------- */
//    Delete Intake Summary
/* ------------------------------- */
export function* deleteIntakeSummarySaga(action: AppActions) {
  yield put(actions.deleteIntakeSummaryStart());
  let url = '';

  if ('intake_id' in action) {
    url = process.env.REACT_APP_API + `/pages/job_monitoring/intakes/${action.intake_id}`;
  }

  try {
    let response = yield axios.delete(url, getAxiosHeaderToken());
    yield put(actions.deleteIntakeSummarySucceed(response.data.intakes, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.deleteIntakeSummaryFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.deleteIntakeSummaryFailed, 'Delete Intake Jobs Error');
    }
  }
}

/* ------------------------------- */
//    Get Specific Intake Jobs
/* ------------------------------- */
export function* getSpecificIntakeJobsSaga(action: AppActions) {
  yield put(actions.getSpecificIntakeJobsStart());
  let url = '';
  if ('intake_id' in action) {
    url = process.env.REACT_APP_API + `/pages/job_monitoring/intakes/${action.intake_id}`;
  }

  try {
    let response = yield axios.get(url, getAxiosHeaderToken());
    yield put(actions.getSpecificIntakeJobsSucceed(response.data.intake));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.getSpecificIntakeJobsFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.getSpecificIntakeJobsFailed, 'Get Intakes Jobs Error');
    }
  }
}
/* ------------------------------- */
//    Update Specific Intake & Jobs
/* ------------------------------- */
export function* updateSpecificIntakeJobsSaga(action: AppActions) {
  yield put(actions.updateSpecificIntakeJobsStart());
  let url = '';

  if ('intake_id' in action) {
    url = process.env.REACT_APP_API + `/pages/job_monitoring/intakes/${action.intake_id}`;
  }

  let intake_and_jobs = {};
  // Type guard, check if the "key" exist in the action object
  if ('intakeJobsFormData' in action) {
    intake_and_jobs = {
      intake: action.intakeJobsFormData.intake,
      jobs: action.intakeJobsFormData.jobs,
    };
  }
  try {
    let response = yield axios.post(url, { intake_and_jobs }, getAxiosHeaderToken());
    yield put(actions.updateSpecificIntakeJobsSucceed(response.data.intakes, response.data.success));
  } catch (error) {
    if (error.response) {
      yield setPromiseError(error, actions.updateSpecificIntakeJobsFailed, error.response.data.error);
    } else {
      yield setPromiseError(error, actions.updateSpecificIntakeJobsFailed, 'Update Intake Jobs Error');
    }
  }
}

/* ============================================================================================== */
// Get Users
/* ============================================================================================== */
/* ------------------------------- */
//    Get Users By Roles
/* ------------------------------- */
export function* getUsersByRolesSaga(action: AppActions) {
  yield put(actions.getUsersByRolesStart());
  let url = process.env.REACT_APP_API + `/user/users/by_role`;

  let role: any = {};

  if ('role_id' in action && action.role_id !== undefined) {
    role['role_id'] = action.role_id;
  }
  if ('title' in action && action.title !== undefined) {
    role['title'] = action.title;
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

/* ============================================================================================== */
// Set Toggle Intake Status
/* ============================================================================================== */

export function* setToggleIntakeStatusSaga(action: AppActions) {
  if (!('intake_status_id' in action) || !('intake_id' in action) || !('description' in action)) return;
  let url = process.env.REACT_APP_API + `/pages/job_monitoring/intakes/${action.intake_id}/toggle_status`;

  let toggle_status = {
    intake_status_id: action.intake_status_id,
    description: action.description,
  };

  console.log(toggle_status);

  try {
    let response = yield axios.post(url, { toggle_status }, getAxiosHeaderToken());
    console.log('RESPONSE', response);
  } catch (error) {
    yield console.log(error);
  }
}

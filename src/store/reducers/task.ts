import { AppActions } from '../types';
import { Reducer } from 'redux';
import { updateObject } from 'src/shared/Utils';
import { TaskInitialState } from '../types/task';
import * as actionTypes from 'src/store/actions/actionTypes';

const initialState: TaskInitialState = {
  // others
  loading: false,
  errorMessage: null,
  successMessage: null,
  // task
  // users array
  tasksArray: null,
  usersByRolesArray: null,
  intakeSummaryArray: null,
  specificIntakeJobsObj: null,
};

/* ============================================================================================ */
/* Task 
/* ============================================================================================ */
const clearTaskState = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { successMessage: null, errorMessage: null, loading: false });
};

/* -------------------------- */
/* Create task */
/* -------------------------- */
// const createTaskStart = (state: TaskInitialState, _action: AppActions) => {
//   return updateObject(state, { errorMessage: null, loading: true });
// };
// const createTaskSucceed = (state: TaskInitialState, action: AppActions) => {
//   if ('successMessage' in action && 'tasksArray' in action) {
//     return updateObject(state, {
//       errorMessage: null,
//       loading: false,
//       tasksArray: action.tasksArray,
//       successMessage: action.successMessage,
//     });
//   }
//   return state;
// };
// const createTaskFailed = (state: TaskInitialState, action: AppActions) => {
//   if ('errorMessage' in action) {
//     return updateObject(state, { errorMessage: action.errorMessage, loading: false });
//   }
//   return state;
// };
// /* -------------------------- */
// /* Get tasks */
// /* -------------------------- */
// const getTasksStart = (state: TaskInitialState, _action: AppActions) => {
//   return updateObject(state, { errorMessage: null, loading: true });
// };
// const getTasksSucceed = (state: TaskInitialState, action: AppActions) => {
//   if ('tasksArray' in action) {
//     return updateObject(state, {
//       errorMessage: null,
//       loading: false,
//       tasksArray: action.tasksArray,
//     });
//   }
//   return state;
// };
// const getTasksFailed = (state: TaskInitialState, action: AppActions) => {
//   if ('errorMessage' in action) {
//     return updateObject(state, { errorMessage: action.errorMessage, loading: false });
//   }
//   return state;
// };
// /* -------------------------- */
// /* Update task */
// /* -------------------------- */
// const updateTaskStart = (state: TaskInitialState, _action: AppActions) => {
//   return updateObject(state, { errorMessage: null, loading: true });
// };
// const updateTaskSucceed = (state: TaskInitialState, action: AppActions) => {
//   if ('tasksArray' in action && 'successMessage' in action) {
//     return updateObject(state, {
//       errorMessage: null,
//       loading: false,
//       tasksArray: action.tasksArray,
//       successMessage: action.successMessage,
//     });
//   }
//   return state;
// };
// const updateTaskFailed = (state: TaskInitialState, action: AppActions) => {
//   if ('errorMessage' in action) {
//     return updateObject(state, { errorMessage: action.errorMessage, loading: false });
//   }
//   return state;
// };
// /* -------------------------- */
// /* Delete task */
// /* -------------------------- */
const deleteTaskStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteTaskSucceed = (state: TaskInitialState, action: AppActions) => {
  if ('tasksArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      tasksArray: action.tasksArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const deleteTaskFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
// Intakes and Jobs
/* ============================================================================================ */
/* -------------------------- */
/* Create Intake and Jobs */
/* -------------------------- */
const createIntakeSummaryStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createIntakeSummarySucceed = (state: TaskInitialState, action: AppActions) => {
  if ('successMessage' in action && 'intakeSummaryArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      intakeSummaryArray: action.intakeSummaryArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createIntakeSummaryFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Get Intakes and Jobs */
/* -------------------------- */
const getIntakeSummaryStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getIntakeSummarySucceed = (state: TaskInitialState, action: AppActions) => {
  if ('intakeSummaryArray' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      intakeSummaryArray: action.intakeSummaryArray,
    });
  }
  return state;
};
const getIntakeSummaryFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Update Intake and Jobs */
/* -------------------------- */
const updateIntakeSummaryStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateIntakeSummarySucceed = (state: TaskInitialState, action: AppActions) => {
  if ('intakeSummaryArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      intakeSummaryArray: action.intakeSummaryArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateIntakeSummaryFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* --------------------------- */
/* Delete task Intake and Jobs */
/* --------------------------- */
const deleteIntakeSummaryStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const deleteIntakeSummarySucceed = (state: TaskInitialState, action: AppActions) => {
  if ('intakeSummaryArray' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      intakeSummaryArray: action.intakeSummaryArray,
      successMessage: action.successMessage,
      specificIntakeJobsObj: null, //make it null after being deleted
    });
  }
  return state;
};
const deleteIntakeSummaryFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* -------------------------- */
/* Clear Specific Intakes and Jobs */
/* -------------------------- */
const clearSpecificIntakeJobs = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, specificIntakeJobsObj: null });
};
/* -------------------------- */
/* Get Specific Intakes and Jobs */
/* -------------------------- */
const getSpecificIntakeJobsStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true, specificIntakeJobsObj: null });
};
const getSpecificIntakeJobsSucceed = (state: TaskInitialState, action: AppActions) => {
  if ('specificIntakeJobsObj' in action) {
    return updateObject(state, {
      loading: false,
      errorMessage: null,
      specificIntakeJobsObj: action.specificIntakeJobsObj,
    });
  }
  return state;
};
const getSpecificIntakeJobsFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Update Specific Intake and Jobs */
/* -------------------------- */
const updateSpecificIntakeJobsStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateSpecificIntakeJobsSucceed = (state: TaskInitialState, action: AppActions) => {
  if ('specificIntakeJobsObj' in action && 'successMessage' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      specificIntakeJobsObj: action.specificIntakeJobsObj,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const updateSpecificIntakeJobsFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* ============================================================================================ */
/* -------------------------- */
/* Get users by roles */
/* -------------------------- */
const getUsersByRolesStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getUsersByRolesSucceed = (state: TaskInitialState, action: AppActions) => {
  if ('usersByRolesArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      usersByRolesArray: action.usersByRolesArray,
    });
  }
  return state;
};
const getUsersByRolesFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};

/* ============================================================================================ */
/* ============================================================================================ */

const reducer: Reducer<TaskInitialState, AppActions> = (state = initialState, action) => {
  switch (action.type) {
    // Clear State
    case actionTypes.CLEAR_TASK_STATE:
      /* =================================== */
      //  Tasks
      /* =================================== */
      return clearTaskState(state, action);
    // Create task
    // case actionTypes.CREATE_TASK_START:
    //   return createTaskStart(state, action);
    // case actionTypes.CREATE_TASK_SUCCEED:
    //   return createTaskSucceed(state, action);
    // case actionTypes.CREATE_TASK_FAILED:
    //   return createTaskFailed(state, action);
    // // Get tasks
    // case actionTypes.GET_TASKS_START:
    //   return getTasksStart(state, action);
    // case actionTypes.GET_TASKS_SUCCEED:
    //   return getTasksSucceed(state, action);
    // case actionTypes.GET_TASKS_FAILED:
    //   return getTasksFailed(state, action);
    // // Update task
    // case actionTypes.UPDATE_TASK_START:
    //   return updateTaskStart(state, action);
    // case actionTypes.UPDATE_TASK_SUCCEED:
    //   return updateTaskSucceed(state, action);
    // case actionTypes.UPDATE_TASK_FAILED:
    //   return updateTaskFailed(state, action);
    // // Delete task
    case actionTypes.DELETE_TASK_START:
      return deleteTaskStart(state, action);
    case actionTypes.DELETE_TASK_SUCCEED:
      return deleteTaskSucceed(state, action);
    case actionTypes.DELETE_TASK_FAILED:
      return deleteTaskFailed(state, action);
    /* =================================== */
    //  Intakes & Jobs
    /* =================================== */
    // Create Intake
    case actionTypes.CREATE_INTAKE_SUMMARY_START:
      return createIntakeSummaryStart(state, action);
    case actionTypes.CREATE_INTAKE_SUMMARY_SUCCEED:
      return createIntakeSummarySucceed(state, action);
    case actionTypes.CREATE_INTAKE_SUMMARY_FAILED:
      return createIntakeSummaryFailed(state, action);
    // Get Intakes
    case actionTypes.GET_INTAKE_SUMMARY_START:
      return getIntakeSummaryStart(state, action);
    case actionTypes.GET_INTAKE_SUMMARY_SUCCEED:
      return getIntakeSummarySucceed(state, action);
    case actionTypes.GET_INTAKE_SUMMARY_FAILED:
      return getIntakeSummaryFailed(state, action);
    // Update Intake
    case actionTypes.UPDATE_INTAKE_SUMMARY_START:
      return updateIntakeSummaryStart(state, action);
    case actionTypes.UPDATE_INTAKE_SUMMARY_SUCCEED:
      return updateIntakeSummarySucceed(state, action);
    case actionTypes.UPDATE_INTAKE_SUMMARY_FAILED:
      return updateIntakeSummaryFailed(state, action);
    // Delete Intake
    case actionTypes.DELETE_INTAKE_SUMMARY_START:
      return deleteIntakeSummaryStart(state, action);
    case actionTypes.DELETE_INTAKE_SUMMARY_SUCCEED:
      return deleteIntakeSummarySucceed(state, action);
    case actionTypes.DELETE_INTAKE_SUMMARY_FAILED:
      return deleteIntakeSummaryFailed(state, action);
    /* ------------------------ */
    // Clear Specific Intake
    /* ------------------------ */
    case actionTypes.CLEAR_SPECIFIC_INTAKE_JOBS:
      return clearSpecificIntakeJobs(state, action);
    /* ------------------------ */
    // Get Specific Intake
    /* ------------------------ */
    case actionTypes.GET_SPECIFIC_INTAKE_JOBS_START:
      return getSpecificIntakeJobsStart(state, action);
    case actionTypes.GET_SPECIFIC_INTAKE_JOBS_SUCCEED:
      return getSpecificIntakeJobsSucceed(state, action);
    case actionTypes.GET_SPECIFIC_INTAKE_JOBS_FAILED:
      return getSpecificIntakeJobsFailed(state, action);
    /* ------------------------ */
    // Update Specific Intake
    /* ------------------------ */
    case actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS_START:
      return updateSpecificIntakeJobsStart(state, action);
    case actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS_SUCCEED:
      return updateSpecificIntakeJobsSucceed(state, action);
    case actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS_FAILED:
      return updateSpecificIntakeJobsFailed(state, action);

    /* =================================== */
    // Get Users By Roles
    /* =================================== */
    case actionTypes.GET_USERS_BY_ROLES_START:
      return getUsersByRolesStart(state, action);
    case actionTypes.GET_USERS_BY_ROLES_SUCCEED:
      return getUsersByRolesSucceed(state, action);
    case actionTypes.GET_USERS_BY_ROLES_FAILED:
      return getUsersByRolesFailed(state, action);
    default:
      return state;
  }
};

export default reducer;

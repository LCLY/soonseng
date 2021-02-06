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
  taskObj: null,
  tasksArray: null,
  // users array
  allUsersArray: null,
  usersByRolesArray: null,
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
const createTaskStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const createTaskSucceed = (state: TaskInitialState, action: AppActions) => {
  if ('successMessage' in action && 'tasksArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      tasksArray: action.tasksArray,
      successMessage: action.successMessage,
    });
  }
  return state;
};
const createTaskFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Get tasks */
/* -------------------------- */
const getTasksStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getTasksSucceed = (state: TaskInitialState, action: AppActions) => {
  if ('tasksArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      tasksArray: action.tasksArray,
    });
  }
  return state;
};
const getTasksFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Update task */
/* -------------------------- */
const updateTaskStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const updateTaskSucceed = (state: TaskInitialState, action: AppActions) => {
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
const updateTaskFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
/* -------------------------- */
/* Delete task */
/* -------------------------- */
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
/* ============================================================================================ */
/* -------------------------- */
/* Get all users */
/* -------------------------- */
const getAllUsersStart = (state: TaskInitialState, _action: AppActions) => {
  return updateObject(state, { errorMessage: null, loading: true });
};
const getAllUsersSucceed = (state: TaskInitialState, action: AppActions) => {
  if ('allUsersArray' in action) {
    return updateObject(state, {
      errorMessage: null,
      loading: false,
      allUsersArray: action.allUsersArray,
    });
  }
  return state;
};
const getAllUsersFailed = (state: TaskInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { errorMessage: action.errorMessage, loading: false });
  }
  return state;
};
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
    /* =================================== */
    //  Tasks
    /* =================================== */
    // Create task
    case actionTypes.CLEAR_TASK_STATE:
      return clearTaskState(state, action);
    // Create task
    case actionTypes.CREATE_TASK_START:
      return createTaskStart(state, action);
    case actionTypes.CREATE_TASK_SUCCEED:
      return createTaskSucceed(state, action);
    case actionTypes.CREATE_TASK_FAILED:
      return createTaskFailed(state, action);
    // Get tasks
    case actionTypes.GET_TASKS_START:
      return getTasksStart(state, action);
    case actionTypes.GET_TASKS_SUCCEED:
      return getTasksSucceed(state, action);
    case actionTypes.GET_TASKS_FAILED:
      return getTasksFailed(state, action);
    // Update task
    case actionTypes.UPDATE_TASK_START:
      return updateTaskStart(state, action);
    case actionTypes.UPDATE_TASK_SUCCEED:
      return updateTaskSucceed(state, action);
    case actionTypes.UPDATE_TASK_FAILED:
      return updateTaskFailed(state, action);
    // Delete task
    case actionTypes.DELETE_TASK_START:
      return deleteTaskStart(state, action);
    case actionTypes.DELETE_TASK_SUCCEED:
      return deleteTaskSucceed(state, action);
    case actionTypes.DELETE_TASK_FAILED:
      return deleteTaskFailed(state, action);
    /* =================================== */
    // Get all Users
    /* =================================== */
    case actionTypes.GET_ALL_USERS_START:
      return getAllUsersStart(state, action);
    case actionTypes.GET_ALL_USERS_SUCCEED:
      return getAllUsersSucceed(state, action);
    case actionTypes.GET_ALL_USERS_FAILED:
      return getAllUsersFailed(state, action);
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

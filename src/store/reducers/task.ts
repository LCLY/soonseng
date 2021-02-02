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
};

/* ============================================================================================ */
/* Task 
/* ============================================================================================ */
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

const reducer: Reducer<TaskInitialState, AppActions> = (state = initialState, action) => {
  switch (action.type) {
    /* =================================== */
    //  Tasks
    /* =================================== */
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
    default:
      return state;
  }
};

export default reducer;

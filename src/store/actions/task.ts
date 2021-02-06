import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import { ITaskFormData, TReceivedTaskObj } from '../types/task';
import { TReceivedUserInfoObj } from '../types/auth';

/* ============================================================================================ */
//  Task
/* ============================================================================================ */
/*  ------------------------- */
//  Clear Task State
/*  ------------------------- */
export const clearTaskState = (): AppActions => {
  return {
    type: actionTypes.CLEAR_TASK_STATE,
  };
};

/*  ------------------------- */
//  Create Task
/*  ------------------------- */
export const createTask = (taskFormData: ITaskFormData, auth_token: string): AppActions => {
  return {
    type: actionTypes.CREATE_TASK,
    taskFormData: taskFormData,
    auth_token: auth_token,
  };
};

export const createTaskStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_TASK_START,
  };
};

export const createTaskSucceed = (tasksArray: TReceivedTaskObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_TASK_SUCCEED,
    tasksArray: tasksArray,
    successMessage: successMessage,
  };
};
export const createTaskFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_TASK_FAILED,
    errorMessage: errorMessage,
  };
};
/*  ------------------------- */
// Get Tasks
/*  ------------------------- */
export const getTasks = (): AppActions => {
  return {
    type: actionTypes.GET_TASKS,
  };
};

export const getTasksStart = (): AppActions => {
  return {
    type: actionTypes.GET_TASKS_START,
  };
};

export const getTasksSucceed = (tasksArray: TReceivedTaskObj[]): AppActions => {
  return {
    type: actionTypes.GET_TASKS_SUCCEED,
    tasksArray: tasksArray,
  };
};
export const getTasksFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_TASKS_FAILED,
    errorMessage: errorMessage,
  };
};
/*  ------------------------- */
//  Update Task
/*  ------------------------- */
export const updateTask = (task_id: number, taskFormData: ITaskFormData): AppActions => {
  return {
    type: actionTypes.UPDATE_TASK,
    task_id: task_id,
    taskFormData: taskFormData,
  };
};

export const updateTaskStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_TASK_START,
  };
};

export const updateTaskSucceed = (tasksArray: TReceivedTaskObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_TASK_SUCCEED,
    tasksArray: tasksArray,
    successMessage: successMessage,
  };
};
export const updateTaskFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_TASK_FAILED,
    errorMessage: errorMessage,
  };
};
/*  ------------------------- */
//  Delete Task
/*  ------------------------- */
export const deleteTask = (task_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_TASK,
    task_id: task_id,
  };
};

export const deleteTaskStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_TASK_START,
  };
};

export const deleteTaskSucceed = (tasksArray: TReceivedTaskObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_TASK_SUCCEED,
    tasksArray: tasksArray,
    successMessage: successMessage,
  };
};
export const deleteTaskFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_TASK_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
//  Get All Users
/* ============================================================================================ */
export const getAllUsers = (): AppActions => {
  return {
    type: actionTypes.GET_ALL_USERS,
  };
};

export const getAllUsersStart = (): AppActions => {
  return {
    type: actionTypes.GET_ALL_USERS_START,
  };
};

export const getAllUsersSucceed = (allUsersArray: TReceivedUserInfoObj[]): AppActions => {
  return {
    type: actionTypes.GET_ALL_USERS_SUCCEED,
    allUsersArray: allUsersArray,
  };
};
export const getAllUsersFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_ALL_USERS_FAILED,
    errorMessage: errorMessage,
  };
};
/* ============================================================================================ */
//  Get Users By Roles
/* ============================================================================================ */
export const getUsersByRoles = (role_id: number, title: string): AppActions => {
  return {
    type: actionTypes.GET_USERS_BY_ROLES,
    role_id: role_id,
    title: title,
  };
};

export const getUsersByRolesStart = (): AppActions => {
  return {
    type: actionTypes.GET_USERS_BY_ROLES_START,
  };
};

export const getUsersByRolesSucceed = (usersByRolesArray: TReceivedUserInfoObj[]): AppActions => {
  return {
    type: actionTypes.GET_USERS_BY_ROLES_SUCCEED,
    usersByRolesArray: usersByRolesArray,
  };
};
export const getUsersByRolesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_USERS_BY_ROLES_FAILED,
    errorMessage: errorMessage,
  };
};

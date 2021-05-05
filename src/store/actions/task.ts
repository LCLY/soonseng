import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import { ITaskFormData, TReceivedTaskObj } from '../types/task';

/* ============================================================================================ */
//  Task
/* ============================================================================================ */
/*  ------------------------- */
//  Create Task
/*  ------------------------- */
export const createTask = (taskFormData: ITaskFormData): AppActions => {
  return {
    type: actionTypes.CREATE_TASK,
    taskFormData: taskFormData,
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

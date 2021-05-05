import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface TaskInitialState {
  // others
  readonly loading?: boolean;
  readonly errorMessage?: string | null;
  readonly successMessage?: string | null;
  readonly taskObj?: TReceivedTaskObj | null;
  readonly tasksArray?: TReceivedTaskObj[] | null;
}

/* ============================================================== */
// Task/Job
/* ============================================================== */

export type TReceivedTaskObj = {
  id: number;
  assigned_to_id: number;
  description: string;
  job_statuses_id: number;
  registration_number: string;
  service_types_id: number;
};

export interface ITaskFormData {
  assigned_to_id: number;
  description: string;
  job_statuses_id: number;
  registration_number: string;
  service_types_id: number;
}

/* ----------------------------------- */
// Create Task
/* ----------------------------------- */
export interface CreateTaskAction {
  type: typeof actionTypes.CREATE_TASK;
  taskFormData: ITaskFormData;
}
export interface CreateTaskStartAction {
  type: typeof actionTypes.CREATE_TASK_START;
}
export interface CreateTaskSucceedAction {
  type: typeof actionTypes.CREATE_TASK_SUCCEED;
  tasksArray: TReceivedTaskObj[];
  successMessage: string;
}
export interface CreateTaskFailedAction {
  type: typeof actionTypes.CREATE_TASK_FAILED;
  errorMessage: string;
}
/* ----------------------------------- */
// Get Tasks
/* ----------------------------------- */
export interface GetTasksAction {
  type: typeof actionTypes.GET_TASKS;
}
export interface GetTasksStartAction {
  type: typeof actionTypes.GET_TASKS_START;
}
export interface GetTasksSucceedAction {
  type: typeof actionTypes.GET_TASKS_SUCCEED;
  tasksArray: TReceivedTaskObj[];
}
export interface GetTasksFailedAction {
  type: typeof actionTypes.GET_TASKS_FAILED;
  errorMessage: string;
}
/* ----------------------------------- */
// Update Task
/* ----------------------------------- */
export interface UpdateTaskAction {
  type: typeof actionTypes.UPDATE_TASK;
  task_id: number;
  taskFormData: ITaskFormData;
}
export interface UpdateTaskStartAction {
  type: typeof actionTypes.UPDATE_TASK_START;
}
export interface UpdateTaskSucceedAction {
  type: typeof actionTypes.UPDATE_TASK_SUCCEED;
  tasksArray: TReceivedTaskObj[];
  successMessage: string;
}
export interface UpdateTaskFailedAction {
  type: typeof actionTypes.UPDATE_TASK_FAILED;
  errorMessage: string;
}
/* ----------------------------------- */
// Delete Task
/* ----------------------------------- */
export interface DeleteTaskAction {
  type: typeof actionTypes.DELETE_TASK;
  task_id: number;
}
export interface DeleteTaskStartAction {
  type: typeof actionTypes.DELETE_TASK_START;
}
export interface DeleteTaskSucceedAction {
  type: typeof actionTypes.DELETE_TASK_SUCCEED;
  tasksArray: TReceivedTaskObj[];
  successMessage: string;
}
export interface DeleteTaskFailedAction {
  type: typeof actionTypes.DELETE_TASK_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type TaskActionTypes =
  /* -------------------- */
  // Task
  /* -------------------- */
  | CreateTaskAction
  | CreateTaskStartAction
  | CreateTaskSucceedAction
  | CreateTaskFailedAction
  | GetTasksAction
  | GetTasksStartAction
  | GetTasksSucceedAction
  | GetTasksFailedAction
  | UpdateTaskAction
  | UpdateTaskStartAction
  | UpdateTaskSucceedAction
  | UpdateTaskFailedAction
  | DeleteTaskAction
  | DeleteTaskStartAction
  | DeleteTaskSucceedAction
  | DeleteTaskFailedAction;

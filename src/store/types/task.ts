import * as actionTypes from '../actions/actionTypes';
import { TReceivedUserInfoObj } from './auth';

// initialState for reducers
export interface TaskInitialState {
  // others
  readonly loading?: boolean;
  readonly errorMessage?: string | null;
  readonly successMessage?: string | null;
  readonly taskObj?: TReceivedTaskObj | null;
  readonly tasksArray?: TReceivedTaskObj[] | null;
  readonly allUsersArray?: TReceivedUserInfoObj[] | null;
  readonly usersByRolesArray?: TReceivedUserInfoObj[] | null;
}
/* ============================================================== */
// Task/Job
/* ============================================================== */

/* -------------------------------------- */
// clear state
/* -------------------------------------- */
export interface ClearTaskAction {
  type: typeof actionTypes.CLEAR_TASK_STATE;
}

export type TReceivedTaskObj = {
  id: number;
  created_at: string;
  updated_at: string;
  registration_number: string;
  description: string;
  status: string;
  service_type: string;
  assigned_to: { user_id: number; first_name: string; last_name: string }[];
};

export interface ITaskFormData {
  description: string;
  job_status_id: number;
  service_type_id: number;
  registration_number: string;
  assigned_to_ids: number[];
}

/* ----------------------------------- */
// Create Task
/* ----------------------------------- */
export interface CreateTaskAction {
  type: typeof actionTypes.CREATE_TASK;
  taskFormData: ITaskFormData;
  auth_token: string;
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
// Get All Users
/* ============================================================== */

export interface GetAllUsersAction {
  type: typeof actionTypes.GET_ALL_USERS;
}
export interface GetAllUsersStartAction {
  type: typeof actionTypes.GET_ALL_USERS_START;
}
export interface GetAllUsersSucceedAction {
  type: typeof actionTypes.GET_ALL_USERS_SUCCEED;
  allUsersArray: TReceivedUserInfoObj[];
}
export interface GetAllUsersFailedAction {
  type: typeof actionTypes.GET_ALL_USERS_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Get Users by Roles
/* ============================================================== */
export interface GetUsersByRolesAction {
  type: typeof actionTypes.GET_USERS_BY_ROLES;
  role_id: number;
  title: string;
}
export interface GetUsersByRolesStartAction {
  type: typeof actionTypes.GET_USERS_BY_ROLES_START;
}
export interface GetUsersByRolesSucceedAction {
  type: typeof actionTypes.GET_USERS_BY_ROLES_SUCCEED;
  usersByRolesArray: TReceivedUserInfoObj[];
}
export interface GetUsersByRolesFailedAction {
  type: typeof actionTypes.GET_USERS_BY_ROLES_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type TaskActionTypes =
  | ClearTaskAction
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
  | DeleteTaskFailedAction
  /* -------------------- */
  // Get all users
  /* -------------------- */
  | GetAllUsersAction
  | GetAllUsersStartAction
  | GetAllUsersSucceedAction
  | GetAllUsersFailedAction
  /* -------------------- */
  // Get users by roles
  /* -------------------- */
  | GetUsersByRolesAction
  | GetUsersByRolesStartAction
  | GetUsersByRolesSucceedAction
  | GetUsersByRolesFailedAction;

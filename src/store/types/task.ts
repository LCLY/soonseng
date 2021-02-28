import * as actionTypes from '../actions/actionTypes';
import { TReceivedUserInfoObj } from './auth';
import { TReceivedServiceTaskObj } from './dashboard';

// initialState for reducers
export interface TaskInitialState {
  // others
  readonly loading?: boolean;
  readonly errorMessage?: string | null;
  readonly successMessage?: string | null;
  // readonly taskObj?: TReceivedTaskObj | null;
  // readonly tasksArray?: TReceivedTaskObj[] | null;
  readonly allUsersArray?: TReceivedUserInfoObj[] | null;
  readonly usersByRolesArray?: TReceivedUserInfoObj[] | null;
  readonly intakeSummaryArray?: TReceivedIntakeSummaryObj[] | null;
  readonly specificIntakeJobsObj?: TReceivedSpecificIntakeJobsObj | null;
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

// export interface ITaskFormData {
//   description: string;
//   job_status_id: number;
//   service_type_id: number;
//   registration_number: string;
//   assigned_to_ids: number[];
// }

// /* ----------------------------------- */
// // Create Task
// /* ----------------------------------- */
// export interface CreateTaskAction {
//   type: typeof actionTypes.CREATE_TASK;
//   taskFormData: ITaskFormData;
// }
// export interface CreateTaskStartAction {
//   type: typeof actionTypes.CREATE_TASK_START;
// }
// export interface CreateTaskSucceedAction {
//   type: typeof actionTypes.CREATE_TASK_SUCCEED;
//   tasksArray: TReceivedTaskObj[];
//   successMessage: string;
// }
// export interface CreateTaskFailedAction {
//   type: typeof actionTypes.CREATE_TASK_FAILED;
//   errorMessage: string;
// }
// /* ----------------------------------- */
// // Get Tasks
// /* ----------------------------------- */
// export interface GetTasksAction {
//   type: typeof actionTypes.GET_TASKS;
// }
// export interface GetTasksStartAction {
//   type: typeof actionTypes.GET_TASKS_START;
// }
// export interface GetTasksSucceedAction {
//   type: typeof actionTypes.GET_TASKS_SUCCEED;
//   tasksArray: TReceivedTaskObj[];
// }
// export interface GetTasksFailedAction {
//   type: typeof actionTypes.GET_TASKS_FAILED;
//   errorMessage: string;
// }
// /* ----------------------------------- */
// // Update Task
// /* ----------------------------------- */
// export interface UpdateTaskAction {
//   type: typeof actionTypes.UPDATE_TASK;
//   task_id: number;
//   taskFormData: ITaskFormData;
// }
// export interface UpdateTaskStartAction {
//   type: typeof actionTypes.UPDATE_TASK_START;
// }
// export interface UpdateTaskSucceedAction {
//   type: typeof actionTypes.UPDATE_TASK_SUCCEED;
//   tasksArray: TReceivedTaskObj[];
//   successMessage: string;
// }
// export interface UpdateTaskFailedAction {
//   type: typeof actionTypes.UPDATE_TASK_FAILED;
//   errorMessage: string;
// }
// /* ----------------------------------- */
// // Delete Task
// /* ----------------------------------- */
// export interface DeleteTaskAction {
//   type: typeof actionTypes.DELETE_TASK;
//   task_id: number;
// }
// export interface DeleteTaskStartAction {
//   type: typeof actionTypes.DELETE_TASK_START;
// }
// export interface DeleteTaskSucceedAction {
//   type: typeof actionTypes.DELETE_TASK_SUCCEED;
//   tasksArray: TReceivedTaskObj[];
//   successMessage: string;
// }
// export interface DeleteTaskFailedAction {
//   type: typeof actionTypes.DELETE_TASK_FAILED;
//   errorMessage: string;
// }

/* ============================================================== */
// Intakes & Jobs - Task Page
/* ============================================================== */

// Submit Form Data for creating both intake summary along with jobs
export interface IIntakeSummaryFormData {
  registration: string;
  description: string;
  pick_up: boolean;
  bay: string;
}
export interface IJobFormData {
  id?: number;
  service_task_id: number;
  description: string;
  job_status_id: number;
  assigned_to_ids: number[];
}
export interface IIntakeJobsFormData {
  intake: IIntakeSummaryFormData;
  jobs: IJobFormData[];
}

export type TReceivedIntakeSummaryObj = {
  created_at: string;
  updated_at: string;
  id: number;
  bay: string;
  registration: string;
  pick_up: boolean;
  description: string;
  jobs: { service_type: string; job_status: string }[];
};

/* ----------------------------------- */
// Create Intake Summary
/* ----------------------------------- */
export interface CreateIntakeSummaryAction {
  type: typeof actionTypes.CREATE_INTAKE_SUMMARY;
  intakeJobsFormData: IIntakeJobsFormData;
}
export interface CreateIntakeSummaryStartAction {
  type: typeof actionTypes.CREATE_INTAKE_SUMMARY_START;
}
export interface CreateIntakeSummarySucceedAction {
  type: typeof actionTypes.CREATE_INTAKE_SUMMARY_SUCCEED;
  intakeSummaryArray: TReceivedIntakeSummaryObj[];
  successMessage: string;
}
export interface CreateIntakeSummaryFailedAction {
  type: typeof actionTypes.CREATE_INTAKE_SUMMARY_FAILED;
  errorMessage: string;
}
/* ----------------------------------- */
// Get Intake Summary
/* ----------------------------------- */
export interface GetIntakeSummaryAction {
  type: typeof actionTypes.GET_INTAKE_SUMMARY;
}
export interface GetIntakeSummaryStartAction {
  type: typeof actionTypes.GET_INTAKE_SUMMARY_START;
}
export interface GetIntakeSummarySucceedAction {
  type: typeof actionTypes.GET_INTAKE_SUMMARY_SUCCEED;
  intakeSummaryArray: TReceivedIntakeSummaryObj[];
}
export interface GetIntakeSummaryFailedAction {
  type: typeof actionTypes.GET_INTAKE_SUMMARY_FAILED;
  errorMessage: string;
}
/* ----------------------------------- */
// Update Intake Summary
/* ----------------------------------- */
export interface UpdateIntakeSummaryAction {
  type: typeof actionTypes.UPDATE_INTAKE_SUMMARY;
  intake_id: number;
  intakeJobsFormData: IIntakeJobsFormData;
}
export interface UpdateIntakeSummaryStartAction {
  type: typeof actionTypes.UPDATE_INTAKE_SUMMARY_START;
}
export interface UpdateIntakeSummarySucceedAction {
  type: typeof actionTypes.UPDATE_INTAKE_SUMMARY_SUCCEED;
  intakeSummaryArray: TReceivedIntakeSummaryObj[];
  successMessage: string;
}
export interface UpdateIntakeSummaryFailedAction {
  type: typeof actionTypes.UPDATE_INTAKE_SUMMARY_FAILED;
  errorMessage: string;
}
/* ----------------------------------- */
// Delete Intake Summary
/* ----------------------------------- */
export interface DeleteIntakeSummaryAction {
  type: typeof actionTypes.DELETE_INTAKE_SUMMARY;
  intake_id: number;
}
export interface DeleteIntakeSummaryStartAction {
  type: typeof actionTypes.DELETE_INTAKE_SUMMARY_START;
}
export interface DeleteIntakeSummarySucceedAction {
  type: typeof actionTypes.DELETE_INTAKE_SUMMARY_SUCCEED;
  intakeSummaryArray: TReceivedIntakeSummaryObj[];
  successMessage: string;
}
export interface DeleteIntakeSummaryFailedAction {
  type: typeof actionTypes.DELETE_INTAKE_SUMMARY_FAILED;
  errorMessage: string;
}

/* ====================================================================== */
// Specific Intake
/* ====================================================================== */
export type TReceivedSpecificIntakeJobsObj = {
  created_at: string;
  updated_at: string;
  id: number;
  bay: string;
  pick_up: boolean;
  registration: string;
  description: string;
  jobs: IReceivedIntakeJobsObj[];
};

// Assigned Mechanics/Others
export interface IAssignedUsersObj {
  user_id: number;
  first_name: string;
  last_name: string;
  role: string;
}

// job obj within a specific intake
export type IReceivedIntakeJobsObj = {
  id: number;
  created_at: string;
  updated_at: string;
  intake_id: number;
  description: string;
  status: string;
  service_task: TReceivedServiceTaskObj;
  assigned_to: IAssignedUsersObj[];
};

/* --------------------------------------------- */
// Get Specific Intake & Jobs
/* --------------------------------------------- */
export interface GetSpecificIntakeJobsAction {
  type: typeof actionTypes.GET_SPECIFIC_INTAKE_JOBS;
  intake_id: number;
}
export interface GetSpecificIntakeJobsStartAction {
  type: typeof actionTypes.GET_SPECIFIC_INTAKE_JOBS_START;
}
export interface GetSpecificIntakeJobsSucceedAction {
  type: typeof actionTypes.GET_SPECIFIC_INTAKE_JOBS_SUCCEED;
  specificIntakeJobsObj: TReceivedSpecificIntakeJobsObj;
}
export interface GetSpecificIntakeJobsFailedAction {
  type: typeof actionTypes.GET_SPECIFIC_INTAKE_JOBS_FAILED;
  errorMessage: string;
}

/* --------------------------------------------- */
// Update Specific Intake & Jobs
/* --------------------------------------------- */
export interface UpdateSpecificIntakeJobsAction {
  type: typeof actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS;
  intake_id: number;
  intakeJobsFormData: IIntakeJobsFormData;
}
export interface UpdateSpecificIntakeJobsStartAction {
  type: typeof actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS_START;
}
export interface UpdateSpecificIntakeJobsSucceedAction {
  type: typeof actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS_SUCCEED;
  specificIntakeJobsObj: TReceivedSpecificIntakeJobsObj;
  successMessage: string;
}
export interface UpdateSpecificIntakeJobsFailedAction {
  type: typeof actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS_FAILED;
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
  role_id: number | undefined;
  title: string | undefined;
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
// dict for taskpage to keep track of the service types with their corresponding tasks
export type TServiceTypeTaskDict = {
  [serviceTypeId: number]: {
    title: string;
    description: string;
    serviceTasksArray: TReceivedServiceTaskObj[];
  };
};

/* ============================================================== */
// Combine and export all action types
/* ============================================================== */
export type TaskActionTypes =
  | ClearTaskAction
  /* -------------------- */
  // Task
  /* -------------------- */
  // | CreateTaskAction
  // | CreateTaskStartAction
  // | CreateTaskSucceedAction
  // | CreateTaskFailedAction
  // | GetTasksAction
  // | GetTasksStartAction
  // | GetTasksSucceedAction
  // | GetTasksFailedAction
  // | UpdateTaskAction
  // | UpdateTaskStartAction
  // | UpdateTaskSucceedAction
  // | UpdateTaskFailedAction
  // | DeleteTaskAction
  // | DeleteTaskStartAction
  // | DeleteTaskSucceedAction
  // | DeleteTaskFailedAction
  /* -------------------- */
  // Intake
  /* -------------------- */
  | CreateIntakeSummaryAction
  | CreateIntakeSummaryStartAction
  | CreateIntakeSummarySucceedAction
  | CreateIntakeSummaryFailedAction
  | GetIntakeSummaryAction
  | GetIntakeSummaryStartAction
  | GetIntakeSummarySucceedAction
  | GetIntakeSummaryFailedAction
  | UpdateIntakeSummaryAction
  | UpdateIntakeSummaryStartAction
  | UpdateIntakeSummarySucceedAction
  | UpdateIntakeSummaryFailedAction
  | DeleteIntakeSummaryAction
  | DeleteIntakeSummaryStartAction
  | DeleteIntakeSummarySucceedAction
  | DeleteIntakeSummaryFailedAction
  /* -------------------- */
  // Specific Intake & Jobs
  /* -------------------- */
  | GetSpecificIntakeJobsAction
  | GetSpecificIntakeJobsStartAction
  | GetSpecificIntakeJobsSucceedAction
  | GetSpecificIntakeJobsFailedAction
  | UpdateSpecificIntakeJobsAction
  | UpdateSpecificIntakeJobsStartAction
  | UpdateSpecificIntakeJobsSucceedAction
  | UpdateSpecificIntakeJobsFailedAction
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

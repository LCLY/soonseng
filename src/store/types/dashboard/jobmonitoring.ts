import * as actionTypes from 'src/store/actions/actionTypes';
import {
  IServiceTaskFormData,
  TReceivedJobStatusObj,
  TReceivedServiceTypesObj,
  TReceivedServiceTaskObj,
} from '../dashboard';

/* =============================================================================================== */
// Job Status
/* =============================================================================================== */

/* --------------------------- */
// Create Job Status
/* --------------------------- */
/*  Api call */
export interface CreateJobStatusAction {
  type: typeof actionTypes.CREATE_JOBSTATUS;
  title: string;
  description: string;
}
/*  States */
export interface CreateJobStatusStartAction {
  type: typeof actionTypes.CREATE_JOBSTATUS_START;
}
export interface CreateJobStatusSucceedAction {
  type: typeof actionTypes.CREATE_JOBSTATUS_SUCCEED;
  jobStatusArray: TReceivedJobStatusObj[];
  successMessage: string;
}
export interface CreateJobStatusFailedAction {
  type: typeof actionTypes.CREATE_JOBSTATUS_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Job Status
/* --------------------------- */
/* Api call */
export interface UpdateJobStatusAction {
  type: typeof actionTypes.UPDATE_JOBSTATUS;
  job_status_id: number;
  title: string;
  description: string;
}
/* States */
export interface UpdateJobStatusStartAction {
  type: typeof actionTypes.UPDATE_JOBSTATUS_START;
}
export interface UpdateJobStatusSucceedAction {
  type: typeof actionTypes.UPDATE_JOBSTATUS_SUCCEED;
  jobStatusArray: TReceivedJobStatusObj[];
  successMessage: string;
}
export interface UpdateJobStatusFailedAction {
  type: typeof actionTypes.UPDATE_JOBSTATUS_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Job Status
/* --------------------------- */
/* Api call */
export interface GetJobStatusAction {
  type: typeof actionTypes.GET_JOBSTATUS;
}
/* States */
export interface GetJobStatusStartAction {
  type: typeof actionTypes.GET_JOBSTATUS_START;
}
export interface GetJobStatusSucceedAction {
  type: typeof actionTypes.GET_JOBSTATUS_SUCCEED;
  jobStatusArray: TReceivedJobStatusObj[];
}
export interface GetJobStatusFailedAction {
  type: typeof actionTypes.GET_JOBSTATUS_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Delete Job Status
/* --------------------------- */
/* Api call */
export interface DeleteJobStatusAction {
  type: typeof actionTypes.DELETE_JOBSTATUS;
  job_status_id: number;
}
/* States */
export interface DeleteJobStatusStartAction {
  type: typeof actionTypes.DELETE_JOBSTATUS_START;
}
export interface DeleteJobStatusSucceedAction {
  type: typeof actionTypes.DELETE_JOBSTATUS_SUCCEED;
  jobStatusArray: TReceivedJobStatusObj[];
  successMessage: string;
}
export interface DeleteJobStatusFailedAction {
  type: typeof actionTypes.DELETE_JOBSTATUS_FAILED;
  errorMessage: string;
}

/* =============================================================================================== */
// Service Types
/* =============================================================================================== */

/* --------------------------- */
// Create Service Types
/* --------------------------- */
/*  Api call */
export interface CreateServiceTypesAction {
  type: typeof actionTypes.CREATE_SERVICETYPE;
  title: string;
  description: string;
}
/*  States */
export interface CreateServiceTypesStartAction {
  type: typeof actionTypes.CREATE_SERVICETYPE_START;
}
export interface CreateServiceTypesSucceedAction {
  type: typeof actionTypes.CREATE_SERVICETYPE_SUCCEED;
  serviceTypesArray: TReceivedServiceTypesObj[];
  successMessage: string;
}
export interface CreateServiceTypesFailedAction {
  type: typeof actionTypes.CREATE_SERVICETYPE_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Service Types
/* --------------------------- */
/* Api call */
export interface UpdateServiceTypesAction {
  type: typeof actionTypes.UPDATE_SERVICETYPE;
  service_type_id: number;
  title: string;
  description: string;
}
/* States */
export interface UpdateServiceTypesStartAction {
  type: typeof actionTypes.UPDATE_SERVICETYPE_START;
}
export interface UpdateServiceTypesSucceedAction {
  type: typeof actionTypes.UPDATE_SERVICETYPE_SUCCEED;
  serviceTypesArray: TReceivedServiceTypesObj[];
  successMessage: string;
}
export interface UpdateServiceTypesFailedAction {
  type: typeof actionTypes.UPDATE_SERVICETYPE_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Service Types
/* --------------------------- */
/* Api call */
export interface GetServiceTypesAction {
  type: typeof actionTypes.GET_SERVICETYPES;
}
/* States */
export interface GetServiceTypesStartAction {
  type: typeof actionTypes.GET_SERVICETYPES_START;
}
export interface GetServiceTypesSucceedAction {
  type: typeof actionTypes.GET_SERVICETYPES_SUCCEED;
  serviceTypesArray: TReceivedServiceTypesObj[];
}
export interface GetServiceTypesFailedAction {
  type: typeof actionTypes.GET_SERVICETYPES_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Delete Service Types
/* --------------------------- */
/* Api call */
export interface DeleteServiceTypesAction {
  type: typeof actionTypes.DELETE_SERVICETYPE;
  service_type_id: number;
}
/* States */
export interface DeleteServiceTypesStartAction {
  type: typeof actionTypes.DELETE_SERVICETYPE_START;
}
export interface DeleteServiceTypesSucceedAction {
  type: typeof actionTypes.DELETE_SERVICETYPE_SUCCEED;
  serviceTypesArray: TReceivedServiceTypesObj[];
  successMessage: string;
}
export interface DeleteServiceTypesFailedAction {
  type: typeof actionTypes.DELETE_SERVICETYPE_FAILED;
  errorMessage: string;
}

/* ============================================================== */
// Service Task Title
/* ============================================================== */
/* ----------------------------------- */
// Create Task Title
/* ----------------------------------- */
export interface CreateServiceTaskAction {
  type: typeof actionTypes.CREATE_SERVICE_TASK;
  serviceTaskFormData: IServiceTaskFormData;
}
export interface CreateServiceTaskStartAction {
  type: typeof actionTypes.CREATE_SERVICE_TASK_START;
}
export interface CreateServiceTaskSucceedAction {
  type: typeof actionTypes.CREATE_SERVICE_TASK_SUCCEED;
  serviceTasksArray: TReceivedServiceTaskObj[];
  successMessage: string;
}
export interface CreateServiceTaskFailedAction {
  type: typeof actionTypes.CREATE_SERVICE_TASK_FAILED;
  errorMessage: string;
}
/* ----------------------------------- */
// Get Tasks Title
/* ----------------------------------- */
export interface GetServiceTasksAction {
  type: typeof actionTypes.GET_SERVICE_TASKS;
  service_type_id: number;
}
export interface GetServiceTasksStartAction {
  type: typeof actionTypes.GET_SERVICE_TASKS_START;
}
export interface GetServiceTasksSucceedAction {
  type: typeof actionTypes.GET_SERVICE_TASKS_SUCCEED;
  serviceTasksArray: TReceivedServiceTaskObj[];
}
export interface GetServiceTasksFailedAction {
  type: typeof actionTypes.GET_SERVICE_TASKS_FAILED;
  errorMessage: string;
}
/* ----------------------------------- */
// Update Task Title
/* ----------------------------------- */
export interface UpdateServiceTaskAction {
  type: typeof actionTypes.UPDATE_SERVICE_TASK;
  service_task_id: number;
  serviceTaskFormData: IServiceTaskFormData;
}
export interface UpdateServiceTaskStartAction {
  type: typeof actionTypes.UPDATE_SERVICE_TASK_START;
}
export interface UpdateServiceTaskSucceedAction {
  type: typeof actionTypes.UPDATE_SERVICE_TASK_SUCCEED;
  serviceTasksArray: TReceivedServiceTaskObj[];
  successMessage: string;
}
export interface UpdateServiceTaskFailedAction {
  type: typeof actionTypes.UPDATE_SERVICE_TASK_FAILED;
  errorMessage: string;
}
/* ----------------------------------- */
// Delete Task Title
/* ----------------------------------- */
export interface DeleteServiceTaskAction {
  type: typeof actionTypes.DELETE_SERVICE_TASK;
  service_task_id: number;
  service_type_id: number;
}
export interface DeleteServiceTaskStartAction {
  type: typeof actionTypes.DELETE_SERVICE_TASK_START;
}
export interface DeleteServiceTaskSucceedAction {
  type: typeof actionTypes.DELETE_SERVICE_TASK_SUCCEED;
  serviceTasksArray: TReceivedServiceTaskObj[];
  successMessage: string;
}
export interface DeleteServiceTaskFailedAction {
  type: typeof actionTypes.DELETE_SERVICE_TASK_FAILED;
  errorMessage: string;
}

import { AppActions } from '../../types/index';
import * as actionTypes from '../actionTypes';
import {
  IServiceTaskFormData,
  TReceivedServiceTypesObj,
  TReceivedServiceTaskObj,
  TReceivedIntakeStatusObj,
} from '../../types/dashboard';

/* ============================================================================================ */
// Intake Status
/* ============================================================================================ */

/* ----------------------------- */
// Get Intake Status
/* ---------------------------- */
export const getIntakeStatus = (): AppActions => {
  return {
    type: actionTypes.GET_INTAKESTATUS,
  };
};

export const getIntakeStatusStart = (): AppActions => {
  return {
    type: actionTypes.GET_INTAKESTATUS_START,
  };
};

export const getIntakeStatusSucceed = (intakeStatusArray: TReceivedIntakeStatusObj[]): AppActions => {
  return {
    type: actionTypes.GET_INTAKESTATUS_SUCCEED,
    intakeStatusArray: intakeStatusArray,
  };
};
export const getIntakeStatusFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_INTAKESTATUS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------ */
// Create Intake Status
/* ------------------------------ */
export const createIntakeStatus = (title: string, description: string): AppActions => {
  return {
    type: actionTypes.CREATE_INTAKESTATUS,
    title: title,
    description: description,
  };
};

export const createIntakeStatusStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_INTAKESTATUS_START,
  };
};

export const createIntakeStatusSucceed = (
  intakeStatusArray: TReceivedIntakeStatusObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_INTAKESTATUS_SUCCEED,
    intakeStatusArray: intakeStatusArray,
    successMessage: successMessage,
  };
};
export const createIntakeStatusFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_INTAKESTATUS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------ */
// Update Intake Status
/* ------------------------------ */
export const updateIntakeStatus = (intake_status_id: number, title: string, description: string): AppActions => {
  return {
    type: actionTypes.UPDATE_INTAKESTATUS,
    intake_status_id: intake_status_id,
    title: title,
    description: description,
  };
};

export const updateIntakeStatusStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_INTAKESTATUS_START,
  };
};

export const updateIntakeStatusSucceed = (
  intakeStatusArray: TReceivedIntakeStatusObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_INTAKESTATUS_SUCCEED,
    intakeStatusArray: intakeStatusArray,
    successMessage: successMessage,
  };
};
export const updateIntakeStatusFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_INTAKESTATUS_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------------------ */
// Delete Intake Status
/* ------------------------------ */
export const deleteIntakeStatus = (intake_status_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_INTAKESTATUS,
    intake_status_id: intake_status_id,
  };
};

export const deleteIntakeStatusStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_INTAKESTATUS_START,
  };
};

export const deleteIntakeStatusSucceed = (
  intakeStatusArray: TReceivedIntakeStatusObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.DELETE_INTAKESTATUS_SUCCEED,
    intakeStatusArray: intakeStatusArray,
    successMessage: successMessage,
  };
};
export const deleteIntakeStatusFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_INTAKESTATUS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// Service Types
/* ============================================================================================ */

/* ----------------------------- */
// Get ServiceTypes
/* ---------------------------- */
export const getServiceTypes = (): AppActions => {
  return {
    type: actionTypes.GET_SERVICETYPES,
  };
};

export const getServiceTypesStart = (): AppActions => {
  return {
    type: actionTypes.GET_SERVICETYPES_START,
  };
};

export const getServiceTypesSucceed = (serviceTypesArray: TReceivedServiceTypesObj[]): AppActions => {
  return {
    type: actionTypes.GET_SERVICETYPES_SUCCEED,
    serviceTypesArray: serviceTypesArray,
  };
};
export const getServiceTypesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SERVICETYPES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------ */
// Create ServiceTypes
/* ------------------------------ */
export const createServiceType = (title: string, description: string): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICETYPE,
    title: title,
    description: description,
  };
};

export const createServiceTypeStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICETYPE_START,
  };
};

export const createServiceTypeSucceed = (
  serviceTypesArray: TReceivedServiceTypesObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICETYPE_SUCCEED,
    serviceTypesArray: serviceTypesArray,
    successMessage: successMessage,
  };
};
export const createServiceTypeFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICETYPE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------ */
// Update ServiceTypes
/* ------------------------------ */
export const updateServiceType = (service_type_id: number, title: string, description: string): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICETYPE,
    service_type_id: service_type_id,
    title: title,
    description: description,
  };
};

export const updateServiceTypeStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICETYPE_START,
  };
};

export const updateServiceTypeSucceed = (
  serviceTypesArray: TReceivedServiceTypesObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICETYPE_SUCCEED,
    serviceTypesArray: serviceTypesArray,
    successMessage: successMessage,
  };
};
export const updateServiceTypeFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICETYPE_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------------------ */
// Delete ServiceTypes
/* ------------------------------ */
export const deleteServiceType = (service_type_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICETYPE,
    service_type_id: service_type_id,
  };
};

export const deleteServiceTypeStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICETYPE_START,
  };
};

export const deleteServiceTypeSucceed = (
  serviceTypesArray: TReceivedServiceTypesObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICETYPE_SUCCEED,
    serviceTypesArray: serviceTypesArray,
    successMessage: successMessage,
  };
};
export const deleteServiceTypeFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICETYPE_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
//  Task Title
/* ============================================================================================ */
/*  ------------------------- */
//  Create Service Task
/*  ------------------------- */
export const createServiceTask = (serviceTaskFormData: IServiceTaskFormData): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICE_TASK,
    serviceTaskFormData: serviceTaskFormData,
  };
};

export const createServiceTaskStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICE_TASK_START,
  };
};

export const createServiceTaskSucceed = (
  serviceTasksArray: TReceivedServiceTaskObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICE_TASK_SUCCEED,
    serviceTasksArray: serviceTasksArray,
    successMessage: successMessage,
  };
};
export const createServiceTaskFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICE_TASK_FAILED,
    errorMessage: errorMessage,
  };
};
/*  ------------------------- */
// Get Service Tasks
/*  ------------------------- */
export const getServiceTasks = (service_type_id: number): AppActions => {
  return {
    type: actionTypes.GET_SERVICE_TASKS,
    service_type_id: service_type_id,
  };
};

export const getServiceTasksStart = (): AppActions => {
  return {
    type: actionTypes.GET_SERVICE_TASKS_START,
  };
};

export const getServiceTasksSucceed = (serviceTasksArray: TReceivedServiceTaskObj[]): AppActions => {
  return {
    type: actionTypes.GET_SERVICE_TASKS_SUCCEED,
    serviceTasksArray: serviceTasksArray,
  };
};
export const getServiceTasksFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SERVICE_TASKS_FAILED,
    errorMessage: errorMessage,
  };
};
/*  ------------------------- */
//  Update Service Task
/*  ------------------------- */
export const updateServiceTask = (service_task_id: number, serviceTaskFormData: IServiceTaskFormData): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICE_TASK,
    service_task_id: service_task_id,
    serviceTaskFormData: serviceTaskFormData,
  };
};

export const updateServiceTaskStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICE_TASK_START,
  };
};

export const updateServiceTaskSucceed = (
  serviceTasksArray: TReceivedServiceTaskObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICE_TASK_SUCCEED,
    serviceTasksArray: serviceTasksArray,
    successMessage: successMessage,
  };
};
export const updateServiceTaskFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICE_TASK_FAILED,
    errorMessage: errorMessage,
  };
};
/*  ------------------------- */
//  Delete Service Task
/*  ------------------------- */
export const deleteServiceTask = (service_task_id: number, service_type_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICE_TASK,
    service_task_id: service_task_id,
    service_type_id: service_type_id,
  };
};

export const deleteServiceTaskStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICE_TASK_START,
  };
};

export const deleteServiceTaskSucceed = (
  serviceTasksArray: TReceivedServiceTaskObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICE_TASK_SUCCEED,
    serviceTasksArray: serviceTasksArray,
    successMessage: successMessage,
  };
};
export const deleteServiceTaskFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICE_TASK_FAILED,
    errorMessage: errorMessage,
  };
};

import { AppActions } from '../../types/index';
import * as actionTypes from '../actionTypes';
import { TReceivedJobStatusObj, TReceivedServiceTypesObj } from '../../types/dashboard';

/* ============================================================================================ */
// JobStatus
/* ============================================================================================ */

/* ----------------------------- */
// Get JobStatus
/* ---------------------------- */
export const getJobStatus = (): AppActions => {
  return {
    type: actionTypes.GET_JOBSTATUS,
  };
};

export const getJobStatusStart = (): AppActions => {
  return {
    type: actionTypes.GET_JOBSTATUS_START,
  };
};

export const getJobStatusSucceed = (jobStatusArray: TReceivedJobStatusObj[]): AppActions => {
  return {
    type: actionTypes.GET_JOBSTATUS_SUCCEED,
    jobStatusArray: jobStatusArray,
  };
};
export const getJobStatusFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_JOBSTATUS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------ */
// Create Jobstatus
/* ------------------------------ */
export const createJobStatus = (title: string, description: string): AppActions => {
  return {
    type: actionTypes.CREATE_JOBSTATUS,
    title: title,
    description: description,
  };
};

export const createJobStatusStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_JOBSTATUS_START,
  };
};

export const createJobStatusSucceed = (jobStatusArray: TReceivedJobStatusObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_JOBSTATUS_SUCCEED,
    jobStatusArray: jobStatusArray,
    successMessage: successMessage,
  };
};
export const createJobStatusFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_JOBSTATUS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------ */
// Update JobStatus
/* ------------------------------ */
export const updateJobStatus = (job_status_id: number, title: string, description: string): AppActions => {
  return {
    type: actionTypes.UPDATE_JOBSTATUS,
    job_status_id: job_status_id,
    title: title,
    description: description,
  };
};

export const updateJobStatusStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_JOBSTATUS_START,
  };
};

export const updateJobStatusSucceed = (jobStatusArray: TReceivedJobStatusObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_JOBSTATUS_SUCCEED,
    jobStatusArray: jobStatusArray,
    successMessage: successMessage,
  };
};
export const updateJobStatusFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_JOBSTATUS_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------------------ */
// Delete JobStatus
/* ------------------------------ */
export const deleteJobStatus = (job_status_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_JOBSTATUS,
    job_status_id: job_status_id,
  };
};

export const deleteJobStatusStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_JOBSTATUS_START,
  };
};

export const deleteJobStatusSucceed = (jobStatusArray: TReceivedJobStatusObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_JOBSTATUS_SUCCEED,
    jobStatusArray: jobStatusArray,
    successMessage: successMessage,
  };
};
export const deleteJobStatusFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_JOBSTATUS_FAILED,
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
export const updateServiceType = (service_types_id: number, title: string, description: string): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICETYPE,
    service_types_id: service_types_id,
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
export const deleteServiceType = (service_types_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICETYPE,
    service_types_id: service_types_id,
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

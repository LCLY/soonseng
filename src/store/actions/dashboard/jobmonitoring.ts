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

export const deleteJOBSTATUStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_JOBSTATUS_START,
  };
};

export const deleteJOBSTATUSucceed = (jobStatusArray: TReceivedJobStatusObj[], successMessage: string): AppActions => {
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
export const createServiceTypes = (title: string, description: string): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICETYPES,
    title: title,
    description: description,
  };
};

export const createServiceTypesStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICETYPES_START,
  };
};

export const createServiceTypesSucceed = (
  serviceTypesArray: TReceivedServiceTypesObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICETYPES_SUCCEED,
    serviceTypesArray: serviceTypesArray,
    successMessage: successMessage,
  };
};
export const createServiceTypesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_SERVICETYPES_FAILED,
    errorMessage: errorMessage,
  };
};

/* ------------------------------ */
// Update ServiceTypes
/* ------------------------------ */
export const updateServiceTypes = (service_types_id: number, title: string, description: string): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICETYPES,
    service_types_id: service_types_id,
    title: title,
    description: description,
  };
};

export const updateServiceTypesStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICETYPES_START,
  };
};

export const updateServiceTypesSucceed = (
  serviceTypesArray: TReceivedServiceTypesObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICETYPES_SUCCEED,
    serviceTypesArray: serviceTypesArray,
    successMessage: successMessage,
  };
};
export const updateServiceTypesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_SERVICETYPES_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------------------ */
// Delete ServiceTypes
/* ------------------------------ */
export const deleteServiceTypes = (service_types_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICETYPES,
    service_types_id: service_types_id,
  };
};

export const deleteServiceTypestart = (): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICETYPES_START,
  };
};

export const deleteServiceTypesucceed = (
  serviceTypesArray: TReceivedServiceTypesObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICETYPES_SUCCEED,
    serviceTypesArray: serviceTypesArray,
    successMessage: successMessage,
  };
};
export const deleteServiceTypesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_SERVICETYPES_FAILED,
    errorMessage: errorMessage,
  };
};

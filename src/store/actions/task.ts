import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import {
  IIntakeJobsFormData,
  IReceivedIntakeJobsObj,
  TReceivedIntakeSummaryObj,
  TReceivedSpecificIntakeJobsObj,
} from '../types/task';
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
// export const createTask = (taskFormData: IServiceTaskForm): AppActions => {
//   return {
//     type: actionTypes.CREATE_TASK,
//     taskFormData: taskFormData,
//   };
// };

// export const createTaskStart = (): AppActions => {
//   return {
//     type: actionTypes.CREATE_TASK_START,
//   };
// };

// export const createTaskSucceed = (tasksArray: TReceivedTaskObj[], successMessage: string): AppActions => {
//   return {
//     type: actionTypes.CREATE_TASK_SUCCEED,
//     tasksArray: tasksArray,
//     successMessage: successMessage,
//   };
// };
// export const createTaskFailed = (errorMessage: string): AppActions => {
//   return {
//     type: actionTypes.CREATE_TASK_FAILED,
//     errorMessage: errorMessage,
//   };
// };
// /*  ------------------------- */
// // Get Tasks
// /*  ------------------------- */
// export const getTasks = (): AppActions => {
//   return {
//     type: actionTypes.GET_TASKS,
//   };
// };

// export const getTasksStart = (): AppActions => {
//   return {
//     type: actionTypes.GET_TASKS_START,
//   };
// };

// export const getTasksSucceed = (tasksArray: TReceivedTaskObj[]): AppActions => {
//   return {
//     type: actionTypes.GET_TASKS_SUCCEED,
//     tasksArray: tasksArray,
//   };
// };
// export const getTasksFailed = (errorMessage: string): AppActions => {
//   return {
//     type: actionTypes.GET_TASKS_FAILED,
//     errorMessage: errorMessage,
//   };
// };
// /*  ------------------------- */
// //  Update Task
// /*  ------------------------- */
// export const updateTask = (task_id: number, taskFormData: IServiceTaskForm): AppActions => {
//   return {
//     type: actionTypes.UPDATE_TASK,
//     task_id: task_id,
//     taskFormData: taskFormData,
//   };
// };

// export const updateTaskStart = (): AppActions => {
//   return {
//     type: actionTypes.UPDATE_TASK_START,
//   };
// };

// export const updateTaskSucceed = (tasksArray: TReceivedTaskObj[], successMessage: string): AppActions => {
//   return {
//     type: actionTypes.UPDATE_TASK_SUCCEED,
//     tasksArray: tasksArray,
//     successMessage: successMessage,
//   };
// };
// export const updateTaskFailed = (errorMessage: string): AppActions => {
//   return {
//     type: actionTypes.UPDATE_TASK_FAILED,
//     errorMessage: errorMessage,
//   };
// };
// /*  ------------------------- */
// //  Delete Task
// /*  ------------------------- */
export const deleteTask = (intake_id: number, task_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_TASK,
    intake_id: intake_id,
    task_id: task_id,
  };
};

export const deleteTaskStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_TASK_START,
  };
};

export const deleteTaskSucceed = (tasksArray: IReceivedIntakeJobsObj[], successMessage: string): AppActions => {
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
//  Intakes & Jobs
/* ============================================================================================ */

/*  ------------------------- */
//  Create Intakes & Jobs
/*  ------------------------- */
export const createIntakeSummary = (intakeJobsFormData: IIntakeJobsFormData): AppActions => {
  return {
    type: actionTypes.CREATE_INTAKE_SUMMARY,
    intakeJobsFormData: intakeJobsFormData,
  };
};

export const createIntakeSummaryStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_INTAKE_SUMMARY_START,
  };
};

export const createIntakeSummarySucceed = (
  intakeSummaryArray: TReceivedIntakeSummaryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.CREATE_INTAKE_SUMMARY_SUCCEED,
    intakeSummaryArray: intakeSummaryArray,
    successMessage: successMessage,
  };
};
export const createIntakeSummaryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_INTAKE_SUMMARY_FAILED,
    errorMessage: errorMessage,
  };
};
/*  ------------------------- */
// Get Intakes & Jobs
/*  ------------------------- */
export const getIntakeSummary = (): AppActions => {
  return {
    type: actionTypes.GET_INTAKE_SUMMARY,
  };
};

export const getIntakeSummaryStart = (): AppActions => {
  return {
    type: actionTypes.GET_INTAKE_SUMMARY_START,
  };
};

export const getIntakeSummarySucceed = (intakeSummaryArray: TReceivedIntakeSummaryObj[]): AppActions => {
  return {
    type: actionTypes.GET_INTAKE_SUMMARY_SUCCEED,
    intakeSummaryArray: intakeSummaryArray,
  };
};
export const getIntakeSummaryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_INTAKE_SUMMARY_FAILED,
    errorMessage: errorMessage,
  };
};
/*  ------------------------- */
//  Update Intake & Jobs
/*  ------------------------- */
export const updateIntakeSummary = (intake_id: number, intakeJobsFormData: IIntakeJobsFormData): AppActions => {
  return {
    type: actionTypes.UPDATE_INTAKE_SUMMARY,
    intake_id: intake_id,
    intakeJobsFormData: intakeJobsFormData,
  };
};

export const updateIntakeSummaryStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_INTAKE_SUMMARY_START,
  };
};

export const updateIntakeSummarySucceed = (
  intakeSummaryArray: TReceivedIntakeSummaryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_INTAKE_SUMMARY_SUCCEED,
    intakeSummaryArray: intakeSummaryArray,
    successMessage: successMessage,
  };
};
export const updateIntakeSummaryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_INTAKE_SUMMARY_FAILED,
    errorMessage: errorMessage,
  };
};
/*  ------------------------- */
//  Delete Intake & Jobs
/*  ------------------------- */
export const deleteIntakeSummary = (intake_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_INTAKE_SUMMARY,
    intake_id: intake_id,
  };
};

export const deleteIntakeSummaryStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_INTAKE_SUMMARY_START,
  };
};

export const deleteIntakeSummarySucceed = (
  intakeSummaryArray: TReceivedIntakeSummaryObj[],
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.DELETE_INTAKE_SUMMARY_SUCCEED,
    intakeSummaryArray: intakeSummaryArray,
    successMessage: successMessage,
  };
};
export const deleteIntakeSummaryFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_INTAKE_SUMMARY_FAILED,
    errorMessage: errorMessage,
  };
};

/* -------------------------------------------- */
// Specific Intake and Jobs
/* -------------------------------------------- */
// get specific
export const getSpecificIntakeJobs = (intake_id: number): AppActions => {
  return {
    type: actionTypes.GET_SPECIFIC_INTAKE_JOBS,
    intake_id: intake_id,
  };
};

export const getSpecificIntakeJobsStart = (): AppActions => {
  return {
    type: actionTypes.GET_SPECIFIC_INTAKE_JOBS_START,
  };
};

export const getSpecificIntakeJobsSucceed = (specificIntakeJobsObj: TReceivedSpecificIntakeJobsObj): AppActions => {
  return {
    type: actionTypes.GET_SPECIFIC_INTAKE_JOBS_SUCCEED,
    specificIntakeJobsObj: specificIntakeJobsObj,
  };
};
export const getSpecificIntakeJobsFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SPECIFIC_INTAKE_JOBS_FAILED,
    errorMessage: errorMessage,
  };
};

export const updateSpecificIntakeJobs = (intake_id: number, intakeJobsFormData: IIntakeJobsFormData): AppActions => {
  return {
    type: actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS,
    intake_id: intake_id,
    intakeJobsFormData: intakeJobsFormData,
  };
};
// update specific
export const updateSpecificIntakeJobsStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS_START,
  };
};

export const updateSpecificIntakeJobsSucceed = (
  specificIntakeJobsObj: TReceivedSpecificIntakeJobsObj,
  successMessage: string,
): AppActions => {
  return {
    type: actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS_SUCCEED,
    specificIntakeJobsObj: specificIntakeJobsObj,
    successMessage: successMessage,
  };
};
export const updateSpecificIntakeJobsFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
//  Get Users By Roles
/* ============================================================================================ */
export const getUsersByRoles = (role_id: number | undefined, title: string | undefined): AppActions => {
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

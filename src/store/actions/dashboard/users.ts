import { TReceivedUserInfoObj } from 'src/store/types/auth';
import { TReceivedUserRolesObj } from 'src/store/types/dashboard';
import { IUserFormData, IUserRoleFormData } from 'src/store/types/dashboard/users';
import { AppActions } from '../../types/index';
import * as actionTypes from '../actionTypes';
/* ============================================================================================ */
// User CRUD
/* ============================================================================================ */
/* ------------------ */
// Get users
/* ------------------ */
export const getUsers = (): AppActions => {
  return {
    type: actionTypes.GET_USERS,
  };
};

export const getUsersStart = (): AppActions => {
  return {
    type: actionTypes.GET_USERS_START,
  };
};

export const getUsersSucceed = (usersArray: TReceivedUserInfoObj[]): AppActions => {
  return {
    type: actionTypes.GET_USERS_SUCCEED,
    usersArray: usersArray,
  };
};
export const getUsersFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_USERS_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Create user
/* ------------------ */
export const createUser = (userFormData: IUserFormData): AppActions => {
  return {
    type: actionTypes.CREATE_USER,
    userFormData: userFormData,
  };
};

export const createUserStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_USER_START,
  };
};

export const createUserSucceed = (usersArray: TReceivedUserInfoObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_USER_SUCCEED,
    usersArray: usersArray,
    successMessage: successMessage,
  };
};
export const createUserFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_USER_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Update user
/* ------------------ */
export const updateUser = (user_id: number, userFormData: IUserFormData): AppActions => {
  return {
    type: actionTypes.UPDATE_USER,
    user_id: user_id,
    userFormData: userFormData,
  };
};

export const updateUserStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_USER_START,
  };
};

export const updateUserSucceed = (usersArray: TReceivedUserInfoObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_USER_SUCCEED,
    usersArray: usersArray,
    successMessage: successMessage,
  };
};
export const updateUserFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_USER_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Delete user
/* ------------------ */
export const deleteUser = (user_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_USER,
    user_id: user_id,
  };
};

export const deleteUserStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_USER_START,
  };
};

export const deleteUserSucceed = (usersArray: TReceivedUserInfoObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_USER_SUCCEED,
    usersArray: usersArray,
    successMessage: successMessage,
  };
};
export const deleteUserFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_USER_FAILED,
    errorMessage: errorMessage,
  };
};

/* ============================================================================================ */
// User Roles
/* ============================================================================================ */
/* ------------------ */
// Get Roles
/* ------------------ */
export const getRoles = (): AppActions => {
  return {
    type: actionTypes.GET_ROLES,
  };
};

export const getRolesStart = (): AppActions => {
  return {
    type: actionTypes.GET_ROLES_START,
  };
};

export const getRolesSucceed = (userRolesArray: TReceivedUserRolesObj[]): AppActions => {
  return {
    type: actionTypes.GET_ROLES_SUCCEED,
    userRolesArray: userRolesArray,
  };
};
export const getRolesFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_ROLES_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Create Roles
/* ------------------ */
export const createRole = (userRoleFormData: IUserRoleFormData): AppActions => {
  return {
    type: actionTypes.CREATE_ROLE,
    userRoleFormData: userRoleFormData,
  };
};

export const createRoleStart = (): AppActions => {
  return {
    type: actionTypes.CREATE_ROLE_START,
  };
};

export const createRoleSucceed = (userRolesArray: TReceivedUserRolesObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_ROLE_SUCCEED,
    userRolesArray: userRolesArray,
    successMessage: successMessage,
  };
};
export const createRoleFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.CREATE_ROLE_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Update Role
/* ------------------ */
export const updateRole = (role_id: number, userRoleFormData: IUserRoleFormData): AppActions => {
  return {
    type: actionTypes.UPDATE_ROLE,
    role_id: role_id,
    userRoleFormData: userRoleFormData,
  };
};

export const updateRoleStart = (): AppActions => {
  return {
    type: actionTypes.UPDATE_ROLE_START,
  };
};

export const updateRoleSucceed = (userRolesArray: TReceivedUserRolesObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_ROLE_SUCCEED,
    userRolesArray: userRolesArray,
    successMessage: successMessage,
  };
};
export const updateRoleFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.UPDATE_ROLE_FAILED,
    errorMessage: errorMessage,
  };
};
/* ------------------ */
// Delete Role
/* ------------------ */
export const deleteRole = (role_id: number): AppActions => {
  return {
    type: actionTypes.DELETE_ROLE,
    role_id: role_id,
  };
};

export const deleteRoleStart = (): AppActions => {
  return {
    type: actionTypes.DELETE_ROLE_START,
  };
};

export const deleteRoleSucceed = (userRolesArray: TReceivedUserRolesObj[], successMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_ROLE_SUCCEED,
    userRolesArray: userRolesArray,
    successMessage: successMessage,
  };
};
export const deleteRoleFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.DELETE_ROLE_FAILED,
    errorMessage: errorMessage,
  };
};

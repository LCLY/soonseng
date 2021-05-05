import * as actionTypes from 'src/store/actions/actionTypes';
import { TReceivedUserInfoObj } from '../auth';
import { TReceivedUserRolesObj } from '../dashboard';

/* =============================================================================================== */
// User CRUD
/* =============================================================================================== */

export interface IUserFormData {
  first_name: string;
  last_name: string;
  email: string;
  encrypted_password: string;
}

/* --------------------------- */
// Create User
/* --------------------------- */
/*  Api call */
export interface CreateUserAction {
  type: typeof actionTypes.CREATE_USER;
  userFormData: IUserFormData;
}
/*  States */
export interface CreateUserStartAction {
  type: typeof actionTypes.CREATE_USER_START;
}
export interface CreateUserSucceedAction {
  type: typeof actionTypes.CREATE_USER_SUCCEED;
  usersArray: TReceivedUserInfoObj[];
  successMessage: string;
}
export interface CreateUserFailedAction {
  type: typeof actionTypes.CREATE_USER_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update Standard charges and fees
/* --------------------------- */
/* Api call */
export interface UpdateUserAction {
  type: typeof actionTypes.UPDATE_USER;
  user_id: number;
  userFormData: IUserFormData;
}
/* States */
export interface UpdateUserStartAction {
  type: typeof actionTypes.UPDATE_USER_START;
}
export interface UpdateUserSucceedAction {
  type: typeof actionTypes.UPDATE_USER_SUCCEED;
  usersArray: TReceivedUserInfoObj[];
  successMessage: string;
}
export interface UpdateUserFailedAction {
  type: typeof actionTypes.UPDATE_USER_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All Users
/* --------------------------- */
/* Api call */
export interface GetUsersAction {
  type: typeof actionTypes.GET_USERS;
}
/* States */
export interface GetUsersStartAction {
  type: typeof actionTypes.GET_USERS_START;
}
export interface GetUsersSucceedAction {
  type: typeof actionTypes.GET_USERS_SUCCEED;
  usersArray: TReceivedUserInfoObj[];
}
export interface GetUsersFailedAction {
  type: typeof actionTypes.GET_USERS_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Delete User
/* --------------------------- */
/* Api call */
export interface DeleteUserAction {
  type: typeof actionTypes.DELETE_USER;
  user_id: number;
}
/* States */
export interface DeleteUserStartAction {
  type: typeof actionTypes.DELETE_USER_START;
}
export interface DeleteUserSucceedAction {
  type: typeof actionTypes.DELETE_USER_SUCCEED;
  usersArray: TReceivedUserInfoObj[];
  successMessage: string;
}
export interface DeleteUserFailedAction {
  type: typeof actionTypes.DELETE_USER_FAILED;
  errorMessage: string;
}

/* ========================================= */
// Role Crud
/* ========================================= */
/* --------------------------- */
// Create User Role
/* --------------------------- */

export interface IUserRoleFormData {
  title: string;
  description: string;
  fullSalesPage: boolean;
  priceSalesPage: boolean;
  adminDashboard: boolean;
  editSalesDashboard: boolean;
  salesmenDashboard: boolean;
  viewSalesDashboard: boolean;
}

/*  Api call */
export interface CreateRoleAction {
  type: typeof actionTypes.CREATE_ROLE;
  userRoleFormData: IUserRoleFormData;
}
/*  States */
export interface CreateRoleStartAction {
  type: typeof actionTypes.CREATE_ROLE_START;
}
export interface CreateRoleSucceedAction {
  type: typeof actionTypes.CREATE_ROLE_SUCCEED;
  userRolesArray: TReceivedUserRolesObj[];
  successMessage: string;
}
export interface CreateRoleFailedAction {
  type: typeof actionTypes.CREATE_ROLE_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Update User Role
/* --------------------------- */
/* Api call */
export interface UpdateRoleAction {
  type: typeof actionTypes.UPDATE_ROLE;
  role_id: number;
  userRoleFormData: IUserRoleFormData;
}
/* States */
export interface UpdateRoleStartAction {
  type: typeof actionTypes.UPDATE_ROLE_START;
}
export interface UpdateRoleSucceedAction {
  type: typeof actionTypes.UPDATE_ROLE_SUCCEED;
  userRolesArray: TReceivedUserRolesObj[];
  successMessage: string;
}
export interface UpdateRoleFailedAction {
  type: typeof actionTypes.UPDATE_ROLE_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Get All User Roles
/* --------------------------- */
/* Api call */
export interface GetRolesAction {
  type: typeof actionTypes.GET_ROLES;
}
/* States */
export interface GetRolesStartAction {
  type: typeof actionTypes.GET_ROLES_START;
}
export interface GetRolesSucceedAction {
  type: typeof actionTypes.GET_ROLES_SUCCEED;
  userRolesArray: TReceivedUserRolesObj[];
}
export interface GetRolesFailedAction {
  type: typeof actionTypes.GET_ROLES_FAILED;
  errorMessage: string;
}

/* --------------------------- */
// Delete User
/* --------------------------- */
/* Api call */
export interface DeleteRoleAction {
  type: typeof actionTypes.DELETE_ROLE;
  role_id: number;
}
/* States */
export interface DeleteRoleStartAction {
  type: typeof actionTypes.DELETE_ROLE_START;
}
export interface DeleteRoleSucceedAction {
  type: typeof actionTypes.DELETE_ROLE_SUCCEED;
  userRolesArray: TReceivedUserRolesObj[];
  successMessage: string;
}
export interface DeleteRoleFailedAction {
  type: typeof actionTypes.DELETE_ROLE_FAILED;
  errorMessage: string;
}

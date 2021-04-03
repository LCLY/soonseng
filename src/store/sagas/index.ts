import { takeEvery, all } from 'redux-saga/effects';
//allow us to listen to certain actions and do something when they occur
import * as actionTypes from '../actions/actionTypes';
import { DashboardActionTypes } from '../types/dashboard';
import { SalesActionTypes } from '../types/sales';
import { AuthActionTypes } from '../types/auth';
import { CatalogActionTypes } from '../types/catalog';

import {
  // Upload/Delete Image(s)
  uploadImageSaga,
  deleteUploadImageSaga,
  // Brand
  createBrandSaga,
  getBrandsSaga,
  updateBrandSaga,
  deleteBrandSaga,
  // Wheelbase
  createWheelbaseSaga,
  getWheelbasesSaga,
  updateWheelbaseSaga,
  deleteWheelbaseSaga,
  // Make
  createMakeSaga,
  getMakesSaga,
  updateMakeSaga,
  deleteMakeSaga,
  // Series
  getSeriesSaga,
  createSeriesSaga,
  updateSeriesSaga,
  deleteSeriesSaga,
  // Make
  createMakeWheelbaseSaga,
  getMakeWheelbasesSaga,
  updateMakeWheelbaseSaga,
  deleteMakeWheelbaseSaga,
  // Body
  createBodySaga,
  getBodiesSaga,
  updateBodySaga,
  deleteBodySaga,
  // Body Accessory
  createBodyAccessorySaga,
  getBodyAccessoriesSaga,
  updateBodyAccessorySaga,
  deleteBodyAccessorySaga,
  getBodyAssociatedAccessoriesSaga,
  // Length
  createLengthSaga,
  getLengthsSaga,
  updateLengthSaga,
  deleteLengthSaga,
  // Body Make
  createBodyMakeSaga,
  getBodyMakesSaga,
  updateBodyMakeSaga,
  deleteBodyMakeSaga,
  // Body Make Accessory
  createBodyMakeAccessorySaga,
  getBodyMakeAccessoriesSaga,
  updateBodyMakeAccessorySaga,
  deleteBodyMakeAccessorySaga,
  getDimensionAssociatedAccessoriesSaga,
  // Accessory
  createAccessorySaga,
  getAccessoriesSaga,
  updateAccessorySaga,
  deleteAccessorySaga,
  // charges and fees
  createChargesFeesSaga,
  getChargesFeesSaga,
  updateChargesFeesSaga,
  deleteChargesFeesSaga,
  // Intake Status
  getIntakeStatusSaga,
  createIntakeStatusSaga,
  deleteIntakeStatusSaga,
  updateIntakeStatusSaga,
  // Service Types
  getServiceTypesSaga,
  createServiceTypeSaga,
  deleteServiceTypeSaga,
  updateServiceTypeSaga,
  // Service Task Title
  getServiceTasksSaga,
  createServiceTaskSaga,
  deleteServiceTaskSaga,
  updateServiceTaskSaga,
  // user related
  createUserSaga,
  deleteUserSaga,
  getUsersSaga,
  updateUserSaga,
  createRoleSaga,
  deleteRoleSaga,
  updateRoleSaga,
  getRolesSaga,
} from './dashboard';

import {
  // Get sales lengths
  getSalesLengthsSaga,
  // Get sales bodies
  getSalesBodiesSaga,
  // Get sales BodyMakes
  getSalesBodyMakesSaga,
  // Get sales accessories
  getSalesAccessoriesSaga,
} from './sales';

import { getCatalogMakesSaga, getCatalogBodyMakesSaga } from './catalog';

import { signInSaga, getUserInfoSaga } from './auth';

import {
  // createTaskSaga,
  // getTasksSaga,
  // updateTaskSaga,
  deleteTaskSaga,
  getUsersByRolesSaga,
  // intakes jobs
  getIntakeSummarySaga,
  createIntakeSummarySaga,
  deleteIntakeSummarySaga,
  updateIntakeSummarySaga,
  getSpecificIntakeJobsSaga,
  updateSpecificIntakeJobsSaga,
} from './task';
import { TaskActionTypes } from '../types/task';

export function* watchAuth() {
  yield all([takeEvery<AuthActionTypes>(actionTypes.SIGN_IN, signInSaga)]);
  yield all([takeEvery<AuthActionTypes>(actionTypes.GET_USER_INFO, getUserInfoSaga)]);
}

export function* watchCatalog() {
  yield all([takeEvery<CatalogActionTypes>(actionTypes.GET_CATALOG_MAKES, getCatalogMakesSaga)]);
  yield all([takeEvery<CatalogActionTypes>(actionTypes.GET_CATALOG_BODYMAKES, getCatalogBodyMakesSaga)]);
}
export function* watchSales() {
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_SALES_LENGTHS, getSalesLengthsSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_SALES_BODIES, getSalesBodiesSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_SALES_BODYMAKES, getSalesBodyMakesSaga)]);
  yield all([takeEvery<SalesActionTypes>(actionTypes.GET_SALES_ACCESSORIES, getSalesAccessoriesSaga)]);
}

export function* watchDashboard() {
  // Upload Images
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPLOAD_IMAGE, uploadImageSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_UPLOAD_IMAGE, deleteUploadImageSaga)]);
  // Fees
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_CHARGES_FEES, createChargesFeesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_CHARGES_FEES, getChargesFeesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_CHARGES_FEES, updateChargesFeesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_CHARGES_FEES, deleteChargesFeesSaga)]);
  // Brand
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_BRAND, createBrandSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_BRANDS, getBrandsSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_BRAND, updateBrandSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_BRAND, deleteBrandSaga)]);

  // Wheelbase
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_WHEELBASE, createWheelbaseSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_WHEELBASES, getWheelbasesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_WHEELBASE, updateWheelbaseSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_WHEELBASE, deleteWheelbaseSaga)]);
  // Make
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_MAKE, createMakeSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_MAKES, getMakesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_MAKE, updateMakeSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_MAKE, deleteMakeSaga)]);
  //  Series
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_SERIES, getSeriesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_SERIES, createSeriesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_SERIES, updateSeriesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_SERIES, deleteSeriesSaga)]);
  // Make
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_MAKEWHEELBASE, createMakeWheelbaseSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_MAKEWHEELBASES, getMakeWheelbasesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_MAKEWHEELBASE, updateMakeWheelbaseSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_MAKEWHEELBASE, deleteMakeWheelbaseSaga)]);
  // Body
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_BODY, createBodySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_BODIES, getBodiesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_BODY, updateBodySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_BODY, deleteBodySaga)]);
  // Body Accessory
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_BODYACCESSORY, createBodyAccessorySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_BODYACCESSORIES, getBodyAccessoriesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_BODYACCESSORY, updateBodyAccessorySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_BODYACCESSORY, deleteBodyAccessorySaga)]);
  yield all([
    takeEvery<DashboardActionTypes>(actionTypes.GET_BODYASSOCIATED_ACCESSORIES, getBodyAssociatedAccessoriesSaga),
  ]);
  // Length
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_LENGTH, createLengthSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_LENGTHS, getLengthsSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_LENGTH, updateLengthSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_LENGTH, deleteLengthSaga)]);
  // Body Make
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_BODYMAKE, createBodyMakeSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_BODYMAKES, getBodyMakesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_BODYMAKE, updateBodyMakeSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_BODYMAKE, deleteBodyMakeSaga)]);
  // Body Make Accessory
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_BODYMAKE_ACCESSORY, createBodyMakeAccessorySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_BODYMAKE_ACCESSORIES, getBodyMakeAccessoriesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_BODYMAKE_ACCESSORY, updateBodyMakeAccessorySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_BODYMAKE_ACCESSORY, deleteBodyMakeAccessorySaga)]);
  yield all([
    takeEvery<DashboardActionTypes>(
      actionTypes.GET_DIMENSIONASSOCIATED_ACCESSORIES,
      getDimensionAssociatedAccessoriesSaga,
    ),
  ]);
  // Accessory
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_ACCESSORY, createAccessorySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_ACCESSORIES, getAccessoriesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_ACCESSORY, updateAccessorySaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_ACCESSORY, deleteAccessorySaga)]);
  // Job Status
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_INTAKESTATUS, getIntakeStatusSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_INTAKESTATUS, createIntakeStatusSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_INTAKESTATUS, deleteIntakeStatusSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_INTAKESTATUS, updateIntakeStatusSaga)]);
  // Service Types
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_SERVICETYPES, getServiceTypesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_SERVICETYPE, createServiceTypeSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_SERVICETYPE, deleteServiceTypeSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_SERVICETYPE, updateServiceTypeSaga)]);
  // Service Task Titles
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_SERVICE_TASKS, getServiceTasksSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_SERVICE_TASK, createServiceTaskSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_SERVICE_TASK, deleteServiceTaskSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_SERVICE_TASK, updateServiceTaskSaga)]);
  // User Related
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_USERS, getUsersSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_USER, createUserSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_USER, deleteUserSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_USER, updateUserSaga)]);
  // Role Related
  yield all([takeEvery<DashboardActionTypes>(actionTypes.GET_ROLES, getRolesSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.CREATE_ROLE, createRoleSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.DELETE_ROLE, deleteRoleSaga)]);
  yield all([takeEvery<DashboardActionTypes>(actionTypes.UPDATE_ROLE, updateRoleSaga)]);
}

export function* watchTask() {
  // Task
  // yield all([takeEvery<TaskActionTypes>(actionTypes.CREATE_TASK, createTaskSaga)]);
  // yield all([takeEvery<TaskActionTypes>(actionTypes.GET_TASKS, getTasksSaga)]);
  // yield all([takeEvery<TaskActionTypes>(actionTypes.UPDATE_TASK, updateTaskSaga)]);
  yield all([takeEvery<TaskActionTypes>(actionTypes.DELETE_TASK, deleteTaskSaga)]);
  // Intake Summary
  yield all([takeEvery<TaskActionTypes>(actionTypes.GET_INTAKE_SUMMARY, getIntakeSummarySaga)]);
  yield all([takeEvery<TaskActionTypes>(actionTypes.CREATE_INTAKE_SUMMARY, createIntakeSummarySaga)]);
  yield all([takeEvery<TaskActionTypes>(actionTypes.UPDATE_INTAKE_SUMMARY, updateIntakeSummarySaga)]);
  yield all([takeEvery<TaskActionTypes>(actionTypes.DELETE_INTAKE_SUMMARY, deleteIntakeSummarySaga)]);
  // Specific Intake Jobs
  yield all([takeEvery<TaskActionTypes>(actionTypes.GET_SPECIFIC_INTAKE_JOBS, getSpecificIntakeJobsSaga)]);
  yield all([takeEvery<TaskActionTypes>(actionTypes.UPDATE_SPECIFIC_INTAKE_JOBS, updateSpecificIntakeJobsSaga)]);
  yield all([takeEvery<TaskActionTypes>(actionTypes.GET_USERS_BY_ROLES, getUsersByRolesSaga)]);
}

import { AppActions } from '../types/index';
import * as actionTypes from './actionTypes';
import {
  TInterval,
  TReceivedMechanicObj,
  TReceivedPerformanceStatsObj,
  TReceivedSpecificMechanicPerformanceObj,
} from '../types/performance';

/* ========================================= */
// Performance
/* ========================================= */
export const getAllPerformance = (date_from: string, date_to: string): AppActions => {
  return {
    type: actionTypes.GET_ALL_PERFORMANCE,
    date_from: date_from,
    date_to: date_to,
  };
};
export const getAllPerformanceStart = (): AppActions => {
  return {
    type: actionTypes.GET_ALL_PERFORMANCE_START,
  };
};
export const getAllPerformanceSucceed = (performanceStats: TReceivedPerformanceStatsObj): AppActions => {
  return {
    type: actionTypes.GET_ALL_PERFORMANCE_SUCCEED,
    performanceStats: performanceStats,
  };
};
export const getAllPerformanceFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_ALL_PERFORMANCE_FAILED,
    errorMessage: errorMessage,
  };
};
/* ========================================= */
// Mechanics Data
/* ========================================= */
export const getAllMechanics = (date_from: string, date_to: string, interval: TInterval): AppActions => {
  return {
    type: actionTypes.GET_ALL_MECHANICS,
    date_from: date_from,
    date_to: date_to,
    interval: interval,
  };
};
export const getAllMechanicsStart = (): AppActions => {
  return {
    type: actionTypes.GET_ALL_MECHANICS_START,
  };
};
export const getAllMechanicsSucceed = (mechanicsData: TReceivedMechanicObj): AppActions => {
  return {
    type: actionTypes.GET_ALL_MECHANICS_SUCCEED,
    mechanicsData: mechanicsData,
  };
};
export const getAllMechanicsFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_ALL_MECHANICS_FAILED,
    errorMessage: errorMessage,
  };
};
/* ========================================= */
// Mechanics Data
/* ========================================= */
export const getSpecificMechanicPerformance = (
  date_from: string,
  date_to: string,
  interval: TInterval,
  mechanic_id: number,
): AppActions => {
  return {
    type: actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE,
    date_from: date_from,
    date_to: date_to,
    interval: interval,
    mechanic_id: mechanic_id,
  };
};
export const getSpecificMechanicPerformanceStart = (): AppActions => {
  return {
    type: actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE_START,
  };
};
export const getSpecificMechanicPerformanceSucceed = (
  specificMechanicsPerformanceData: TReceivedSpecificMechanicPerformanceObj,
): AppActions => {
  return {
    type: actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE_SUCCEED,
    specificMechanicsPerformanceData: specificMechanicsPerformanceData,
  };
};
export const getSpecificMechanicPerformanceFailed = (errorMessage: string): AppActions => {
  return {
    type: actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE_FAILED,
    errorMessage: errorMessage,
  };
};

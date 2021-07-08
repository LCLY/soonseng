import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/Utils';
import { PerformanceInitialState } from 'src/store/types/performance';
import { AppActions } from 'src/store/types';
import { Reducer } from 'redux';

const initialState: PerformanceInitialState = {
  loading: false,
  errorMessage: null,
  successMessage: null,
  performanceStats: null,
  mechanicsData: null,
  specificMechanicsPerformanceData: null,
};

/* ============================================================================================ */
// Get All Performance
/* ============================================================================================ */
const getAllPerformanceStart = (state: PerformanceInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
  });
};
const getAllPerformanceSucceed = (state: PerformanceInitialState, action: AppActions) => {
  if ('performanceStats' in action) {
    return updateObject(state, { loading: false, performanceStats: action.performanceStats });
  }
  return state;
};
const getAllPerformanceFailed = (state: PerformanceInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { loading: false, errorMessage: action.errorMessage });
  }
  return state;
};
/* ============================================================================================ */
// Get All Mechanics
/* ============================================================================================ */
const getAllMechanicsStart = (state: PerformanceInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
  });
};
const getAllMechanicsSucceed = (state: PerformanceInitialState, action: AppActions) => {
  if ('mechanicsData' in action) {
    return updateObject(state, { loading: false, mechanicsData: action.mechanicsData });
  }
  return state;
};
const getAllMechanicsFailed = (state: PerformanceInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { loading: false, errorMessage: action.errorMessage });
  }
  return state;
};
/* ============================================================================================ */
// Get Specific Mechanic Performance
/* ============================================================================================ */
const getSpecificMechanicPerformanceStart = (state: PerformanceInitialState, _action: AppActions) => {
  return updateObject(state, {
    loading: true,
  });
};
const getSpecificMechanicPerformanceSucceed = (state: PerformanceInitialState, action: AppActions) => {
  if ('specificMechanicsPerformanceData' in action) {
    return updateObject(state, {
      loading: false,
      specificMechanicsPerformanceData: action.specificMechanicsPerformanceData,
    });
  }
  return state;
};
const getSpecificMechanicPerformanceFailed = (state: PerformanceInitialState, action: AppActions) => {
  if ('errorMessage' in action) {
    return updateObject(state, { loading: false, errorMessage: action.errorMessage });
  }
  return state;
};

/* ============================================================================================ */
/* ============================================================================================ */
const reducer: Reducer<PerformanceInitialState, AppActions> = (state = initialState, action) => {
  switch (action.type) {
    /* ---------------------- */
    //  All Performance
    /* ---------------------- */
    case actionTypes.GET_ALL_PERFORMANCE_START:
      return getAllPerformanceStart(state, action);
    case actionTypes.GET_ALL_PERFORMANCE_SUCCEED:
      return getAllPerformanceSucceed(state, action);
    case actionTypes.GET_ALL_PERFORMANCE_FAILED:
      return getAllPerformanceFailed(state, action);
    /* ---------------------- */
    //  All Mechanics
    /* ---------------------- */
    case actionTypes.GET_ALL_MECHANICS_START:
      return getAllMechanicsStart(state, action);
    case actionTypes.GET_ALL_MECHANICS_SUCCEED:
      return getAllMechanicsSucceed(state, action);
    case actionTypes.GET_ALL_MECHANICS_FAILED:
      return getAllMechanicsFailed(state, action);
    /* ---------------------- */
    //  Specific mechanics
    /* ---------------------- */
    case actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE_START:
      return getSpecificMechanicPerformanceStart(state, action);
    case actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE_SUCCEED:
      return getSpecificMechanicPerformanceSucceed(state, action);
    case actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE_FAILED:
      return getSpecificMechanicPerformanceFailed(state, action);

    default:
      return state;
  }
};

export default reducer;

import * as actionTypes from '../actions/actionTypes';

// initialState for reducers
export interface PerformanceInitialState {
  readonly loading?: boolean;
  readonly successMessage?: string | null;
  readonly errorMessage?: string | null;
  readonly performanceStats?: TReceivedPerformanceStatsObj | null;
  readonly mechanicsData?: TReceivedMechanicObj[] | null;
  readonly specificMechanicsPerformanceData?: TReceivedMechanicObj[] | null;
}

export interface TReceivedPerformanceStatsObj {
  current_intake_count: number;
  unclaimed_intake_count: number;
  unclaimed_intakes: string[];
}

export interface GetAllPerformanceAction {
  type: typeof actionTypes.GET_ALL_PERFORMANCE;
  date_from: string;
  date_to: string;
}
export interface GetAllPerformanceStartAction {
  type: typeof actionTypes.GET_ALL_PERFORMANCE_START;
}
export interface GetAllPerformanceSucceedAction {
  type: typeof actionTypes.GET_ALL_PERFORMANCE_SUCCEED;
  performanceStats: TReceivedPerformanceStatsObj;
}
export interface GetAllPerformanceFailedAction {
  type: typeof actionTypes.GET_ALL_PERFORMANCE_FAILED;
  errorMessage: string;
}

/* ========================================================= */
// Get Mechanics Data
/* ========================================================= */

export type TInterval = 'daily' | 'monthly';

export interface TReceivedMechanicObj {
  date: string;
  average: number;
  individual: number;
}

export interface GetAllMechanicsAction {
  type: typeof actionTypes.GET_ALL_MECHANICS;
  date_from: string;
  date_to: string;
  interval: TInterval;
}
export interface GetAllMechanicsStartAction {
  type: typeof actionTypes.GET_ALL_MECHANICS_START;
}
export interface GetAllMechanicsSucceedAction {
  type: typeof actionTypes.GET_ALL_MECHANICS_SUCCEED;
  mechanicsData: TReceivedMechanicObj;
}
export interface GetAllMechanicsFailedAction {
  type: typeof actionTypes.GET_ALL_MECHANICS_FAILED;
  errorMessage: string;
}

/* ========================================================= */
// Get Specific Mechanics Data
/* ========================================================= */

export type TReceivedSpecificMechanicPerformanceObj = {
  date: string;
  average: number;
  individual: number;
};

export interface GetSpecificMechanicPerformanceAction {
  type: typeof actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE;
  date_from: string;
  date_to: string;
  interval: TInterval;
  mechanic_id: number;
}
export interface GetSpecificMechanicPerformanceStartAction {
  type: typeof actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE_START;
}
export interface GetSpecificMechanicPerformanceSucceedAction {
  type: typeof actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE_SUCCEED;
  specificMechanicsPerformanceData: TReceivedSpecificMechanicPerformanceObj;
}
export interface GetSpecificMechanicPerformanceFailedAction {
  type: typeof actionTypes.GET_SPECIFIC_MECHANIC_PERFORMANCE_FAILED;
  errorMessage: string;
}

export type PerformanceActionTypes =
  | GetAllPerformanceAction
  | GetAllPerformanceStartAction
  | GetAllPerformanceSucceedAction
  | GetAllPerformanceFailedAction
  | GetAllMechanicsAction
  | GetAllMechanicsStartAction
  | GetAllMechanicsSucceedAction
  | GetAllMechanicsFailedAction
  | GetSpecificMechanicPerformanceAction
  | GetSpecificMechanicPerformanceStartAction
  | GetSpecificMechanicPerformanceSucceedAction
  | GetSpecificMechanicPerformanceFailedAction;

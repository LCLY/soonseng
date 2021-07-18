import * as actionTypes from '../actions/actionTypes';
import { TReceivedUserInfoObj } from './auth';

// initialState for reducers
export interface PerformanceInitialState {
  readonly loading?: boolean;
  readonly successMessage?: string | null;
  readonly errorMessage?: string | null;
  readonly performanceStats?: TReceivedPerformanceStatsObj | null;
  readonly mechanicsData?: TReceivedMechanicObj[] | null;
  readonly performanceIntakeData?: TReceivedPerformanceIntakeObj | null;
  readonly specificMechanicsPerformanceData?: TReceivedSpecificMechanicPerformanceObj[] | null;
}

export interface TReceivedPerformanceStatsObj {
  current_intake_count: number;
  claimed_intake_count: number;
  unclaimed_intake_count: number;

  unclaimed_intakes: { id: number; intake_status: string; registration: string }[];
  active_claimed_intakes: { id: number; intake_status: string; registration: string }[];
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
  user: TReceivedUserInfoObj;
  intake_count: number;
  intake_jobs: number;
  intake_jobs_data: { [key: string]: number }[];
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
/* ========================================================= */
// Get Performance Intake Data
/* ========================================================= */
export type TReceivedPerformanceIntakeObj = {
  total_done_intakes: number;
  total_active_intakes: number;
  done_intakes_within_range: number;
  active_intakes_within_range: number;
  total_intakes_within_range: number;
  status: {
    Docked: number;
    'Pending Quotation': number;
    'In Progress': number;
    'Ordering Spareparts': number;
    'Ready for Pick-up': number;
    Done: number;
    'On hold': number;
    'In Queue': number;
  };
  service_type: {
    'Puspakom Test': number;
    Repair: number;
    Bodywork: number;
    Service: number;
  };
};

export interface GetPerformanceIntakeDataAction {
  type: typeof actionTypes.GET_PERFORMANCE_INTAKE_DATA;
  date_from: string;
  date_to: string;
}
export interface GetPerformanceIntakeDataStartAction {
  type: typeof actionTypes.GET_PERFORMANCE_INTAKE_DATA_START;
}
export interface GetPerformanceIntakeDataSucceedAction {
  type: typeof actionTypes.GET_PERFORMANCE_INTAKE_DATA_SUCCEED;
  performanceIntakeData: TReceivedPerformanceIntakeObj;
}
export interface GetPerformanceIntakeDataFailedAction {
  type: typeof actionTypes.GET_PERFORMANCE_INTAKE_DATA_FAILED;
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
  | GetSpecificMechanicPerformanceFailedAction
  | GetPerformanceIntakeDataAction
  | GetPerformanceIntakeDataStartAction
  | GetPerformanceIntakeDataSucceedAction
  | GetPerformanceIntakeDataFailedAction;

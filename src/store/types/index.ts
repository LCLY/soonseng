import { TaskActionTypes } from './task';
import { AuthActionTypes } from './auth';
import { SalesActionTypes } from './sales';
import { CatalogActionTypes } from './catalog';
import { GeneralActionTypes } from './general';
import { DashboardActionTypes } from './dashboard';
import { PerformanceActionTypes } from './performance';

// Export all action types under one AppActions type var
export type AppActions =
  | DashboardActionTypes
  | GeneralActionTypes
  | SalesActionTypes
  | AuthActionTypes
  | CatalogActionTypes
  | PerformanceActionTypes
  | TaskActionTypes;

import { AuthActionTypes } from './auth';
import { SalesActionTypes } from './sales';
import { CatalogActionTypes } from './catalog';
import { GeneralActionTypes } from './general';
import { DashboardActionTypes } from './dashboard';

// Export all action types under one AppActions type var
export type AppActions =
  | DashboardActionTypes
  | GeneralActionTypes
  | SalesActionTypes
  | AuthActionTypes
  | CatalogActionTypes;

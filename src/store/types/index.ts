import { AuthActionTypes } from './auth';
import { SalesActionTypes } from './sales';
import { DashboardActionTypes } from './dashboard';
import { CatalogActionTypes } from './catalog';
import { GeneralActionTypes } from './general';

// Export all action types under one AppActions type var
export type AppActions =
  | DashboardActionTypes
  | GeneralActionTypes
  | SalesActionTypes
  | AuthActionTypes
  | CatalogActionTypes;

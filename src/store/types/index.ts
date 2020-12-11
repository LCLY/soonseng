import { AuthActionTypes, IAuthMapStateToProps } from './auth';
import { SalesActionTypes, ISalesMapStateToProps } from './sales';
import { DashboardActionTypes, IDashboardMapStateToProps } from './dashboard';
import { CatalogActionTypes } from './catalog';

// Export all action types under one AppActions type var
export type AppActions = DashboardActionTypes | SalesActionTypes | AuthActionTypes | CatalogActionTypes;

// For mapstatetoprops
export type TMapStateToProps = IDashboardMapStateToProps | ISalesMapStateToProps | IAuthMapStateToProps;

import { AuthActionTypes, IAuthMapStateToProps } from './auth';
import { SalesActionTypes, ISalesMapStateToProps } from './sales';
import { DashboardActionTypes, IDashboardMapStateToProps } from './dashboard';

// Export all action types under one AppActions type var
export type AppActions = DashboardActionTypes | SalesActionTypes | AuthActionTypes;

// For mapstatetoprops
export type TMapStateToProps = IDashboardMapStateToProps | ISalesMapStateToProps | IAuthMapStateToProps;

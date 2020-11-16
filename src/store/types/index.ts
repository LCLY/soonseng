import { SalesActionTypes, ISalesMapStateToProps } from './sales';
import { DashboardActionTypes, IDashboardMapStateToProps } from './dashboard';

// Export all action types under one AppActions type var
export type AppActions = DashboardActionTypes | SalesActionTypes;

// For mapstatetoprops
export type TMapStateToProps = IDashboardMapStateToProps | ISalesMapStateToProps;

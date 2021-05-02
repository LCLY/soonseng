import React, { Suspense, useState, useEffect } from 'react';
/* containers */
// Authentication
import Logout from 'src/containers/Authentication/Logout/Logout';
// General pages
import TaskPage from 'src/containers/TaskPage/TaskPage';
import Homepage from 'src/containers/HomePage/HomePage';
import AboutPage from 'src/containers/AboutPage/AboutPage';
import SalesPage from 'src/containers/SalesPage/SalesPage';
import OrdersPage from 'src/containers/OrdersPage/OrdersPage';
import CatalogPage from 'src/containers/CatalogPage/CatalogPage';
import ContactPage from 'src/containers/ContactPage/ContactPage';
import PageNotFound from 'src/components/PageNotFound/PageNotFound';
import QuotationPage from 'src/containers/QuotationPage/QuotationPage';
import ComparisonPage from 'src/containers/ComparisonPage/ComparisonPage';
import LoginPage from 'src/containers/Authentication/LoginPage/LoginPage';
import CatalogBodyMake from 'src/containers/CatalogPage/CatalogBodyMake/CatalogBodyMake';
// Dashboard
import DashboardPage from 'src/containers/DashboardPage/DashboardPage';
import Make from 'src/containers/DashboardPage/DashboardCRUD/Make/Make';
import Body from 'src/containers/DashboardPage/DashboardCRUD/Body/Body';
import UserRoles from './containers/DashboardPage/DashboardCRUD/UserRoles/UserRoles';
import BodyMake from 'src/containers/DashboardPage/DashboardCRUD/BodyMake/BodyMake';
import Accessory from 'src/containers/DashboardPage/DashboardCRUD/Accessory/Accessory';
import ChargesFees from './containers/DashboardPage/DashboardCRUD/ChargesFees/ChargesFees';
import JobMonitoring from './containers/DashboardPage/DashboardCRUD/JobMonitoring/JobMonitoring';
// 3rd party lib
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Route, Redirect, Switch } from 'react-router-dom';
// Util
import './App.less';
import { RootState } from 'src';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datetime/css/react-datetime.css';
import { TUserAccess } from 'src/store/types/auth';
import * as actions from 'src/store/actions/index';
import {
  ROUTE_HOME,
  ROUTE_ABOUT,
  ROUTE_SALES,
  ROUTE_DASHBOARD,
  ROUTE_CONTACT,
  ROUTE_ORDERS,
  ROUTE_CATALOG,
  ROUTE_LOGIN,
  ROUTE_LOGOUT,
  ROUTE_NOT_FOUND,
  ROUTE_QUOTATION,
  ROUTE_COMPARISON,
  ROUTE_TASK,
} from 'src/shared/routes';
import { persistor } from 'src';

interface AppProps {}

type Props = AppProps & StateProps & DispatchProps;

const App: React.FC<Props> = ({ accessObj, projectVersion, onSaveProjectVersion, onClearLocalStorage }) => {
  let route = null;
  const [versionChecked, setVersionChecked] = useState(false);

  useEffect(() => {
    // set the version of the project so we can know which version we at and what should we do at which point
    // in this point of time, at version 1, we are clearing up all the localstorage
    if (localStorage.getItem('projectVersion') === null || projectVersion === '') {
      onSaveProjectVersion('v1.09');
    }
  }, [projectVersion, onSaveProjectVersion]);

  useEffect(() => {
    if (projectVersion === undefined) return;

    let projectVersionInt = projectVersion.substring(1);
    if (parseFloat(projectVersionInt) < 1.09) {
      //if the project is v1.0 then clear out the localstorage, update the version to v1.02
      onClearLocalStorage('v1.09');
      persistor.purge();
      window.location.href = ROUTE_LOGOUT; //force user to logout
    }
    setVersionChecked(true);
  }, [projectVersion, onClearLocalStorage]);

  if (accessObj?.showSalesDashboard) {
    // if user has access to dashboard
    route = (
      <Switch>
        {/* Other main pages */}
        <Route exact path={ROUTE_HOME} component={Homepage} />
        <Route exact path={ROUTE_ABOUT} component={AboutPage} />
        <Route exact path={ROUTE_SALES} component={SalesPage} />
        <Route exact path={ROUTE_TASK} component={TaskPage} />
        <Route exact path={ROUTE_CONTACT} component={ContactPage} />
        <Route exact path={ROUTE_ORDERS} component={OrdersPage} />
        <Route exact path={ROUTE_CATALOG} component={CatalogPage} />
        <Route exact path={`${ROUTE_CATALOG}/:series_id/:make_detail/:make_id`} component={CatalogBodyMake} />
        <Route exact path={`${ROUTE_QUOTATION}/:model_details/:order_id`} component={QuotationPage} />
        <Route exact path={ROUTE_COMPARISON} component={ComparisonPage} />
        {/* Dashboard */}
        <Route exact path={ROUTE_DASHBOARD.users} component={UserRoles} />
        <Route exact path={ROUTE_DASHBOARD.make} component={Make} />
        <Route exact path={ROUTE_DASHBOARD.body} component={Body} />
        <Route exact path={ROUTE_DASHBOARD.body_make} component={BodyMake} />
        <Route exact path={ROUTE_DASHBOARD.accessory} component={Accessory} />
        <Route exact path={ROUTE_DASHBOARD.fees} component={ChargesFees} />
        <Route exact path={ROUTE_DASHBOARD.job_monitoring} component={JobMonitoring} />
        <Route exact path={ROUTE_DASHBOARD.main} component={DashboardPage} />
        {/* authentication */}
        <Route exact path={ROUTE_LOGIN} component={LoginPage} />
        <Route exact path={ROUTE_LOGOUT} component={Logout} />
        <Route exact path={ROUTE_NOT_FOUND} component={PageNotFound} />
        <Redirect from="*" to={ROUTE_NOT_FOUND} />
      </Switch>
    );
  } else {
    // user has normal access
    route = (
      <Switch>
        {/* Other main pages */}
        <Route exact path={ROUTE_HOME} component={Homepage} />
        <Route exact path={ROUTE_ABOUT} component={AboutPage} />
        <Route exact path={ROUTE_SALES} component={SalesPage} />
        <Route exact path={ROUTE_CONTACT} component={ContactPage} />
        <Route exact path={ROUTE_ORDERS} component={OrdersPage} />
        <Route exact path={ROUTE_CATALOG} component={CatalogPage} />
        <Route exact path={ROUTE_TASK} component={TaskPage} />
        <Route exact path={`${ROUTE_CATALOG}/:series_id/:make_detail/:make_id`} component={CatalogBodyMake} />
        <Route exact path={`${ROUTE_QUOTATION}/:model_details/:order_id`} component={QuotationPage} />
        <Route exact path={ROUTE_COMPARISON} component={ComparisonPage} />
        {/* authentication */}
        <Route exact path={ROUTE_LOGIN} component={LoginPage} />
        <Route exact path={ROUTE_LOGOUT} component={Logout} />
        <Route exact path={ROUTE_NOT_FOUND} component={PageNotFound} />
        <Redirect from="*" to={ROUTE_NOT_FOUND} />
      </Switch>
    );
  }

  // only proceed after version is checked
  return <>{versionChecked && <Suspense fallback={<p>Loading...</p>}>{route}</Suspense>}</>;
};

interface StateProps {
  accessObj?: TUserAccess;
  projectVersion?: string;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    accessObj: state.auth.accessObj,
    projectVersion: state.general.projectVersion,
  };
};

interface DispatchProps {
  onSaveProjectVersion: typeof actions.saveProjectVersion;
  onClearLocalStorage: typeof actions.clearLocalStorage;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onSaveProjectVersion: (projectVersion) => dispatch(actions.saveProjectVersion(projectVersion)),
    onClearLocalStorage: (projectVersion) => dispatch(actions.clearLocalStorage(projectVersion)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

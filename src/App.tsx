import React, { Suspense } from 'react';
/* containers */
// Authentication
import Logout from './containers/Authentication/Logout/Logout';
// General pages
import Homepage from 'src/containers/HomePage/HomePage';
import AboutPage from 'src/containers/AboutPage/AboutPage';
import ContactPage from 'src/containers/ContactPage/ContactPage';
import PageNotFound from './components/PageNotFound/PageNotFound';
import SalesPage from 'src/containers/SalesPage/SalesPage';
import OrdersPage from './containers/OrdersPage/OrdersPage';
import LoginPage from './containers/Authentication/LoginPage/LoginPage';
import CatalogPage from './containers/CatalogPage/CatalogPage';
import CatalogBodyMake from './containers/CatalogPage/CatalogBodyMake/CatalogBodyMake';
// Dashboard
import DashboardPage from 'src/containers/DashboardPage/DashboardPage';
import Make from './containers/DashboardPage/DashboardCRUD/Make/Make';
import Body from './containers/DashboardPage/DashboardCRUD/Body/Body';
import BodyMake from './containers/DashboardPage/DashboardCRUD/BodyMake/BodyMake';
import Accessory from './containers/DashboardPage/DashboardCRUD/Accessory/Accessory';
// 3rd party lib
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
// Util
import './App.less';
import { RootState } from 'src';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datetime/css/react-datetime.css';
import { TUserAccess } from './store/types/auth';
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
} from './shared/routes';

interface AppProps {}

type Props = AppProps & StateProps;

const App: React.FC<Props> = ({ accessObj }) => {
  let route = null;

  if (accessObj?.showSalesDashboard) {
    // if user has access to dashboard
    route = (
      <Switch>
        {/* Other main pages */}
        <Route exact path={ROUTE_HOME} component={Homepage} />
        <Route exact path={ROUTE_ABOUT} component={AboutPage} />
        <Route exact path={ROUTE_SALES} component={SalesPage} />
        <Route exact path={ROUTE_CONTACT} component={ContactPage} />
        <Route exact path={ROUTE_ORDERS} component={OrdersPage} />
        <Route exact path={ROUTE_CATALOG} component={CatalogPage} />
        <Route exact path={`${ROUTE_CATALOG}/:make_id`} component={CatalogBodyMake} />
        {/* dashboard */}
        <Route exact path={ROUTE_DASHBOARD.main} component={DashboardPage} />
        <Route exact path={ROUTE_DASHBOARD.make} component={Make} />
        <Route exact path={ROUTE_DASHBOARD.body} component={Body} />
        <Route exact path={ROUTE_DASHBOARD.body_make} component={BodyMake} />
        <Route exact path={ROUTE_DASHBOARD.accessory} component={Accessory} />
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
        <Route exact path={ROUTE_CATALOG} component={CatalogPage} />
        <Route exact path={ROUTE_CONTACT} component={ContactPage} />
        <Route exact path={ROUTE_ORDERS} component={OrdersPage} />
        {/* authentication */}
        <Route exact path={ROUTE_LOGIN} component={LoginPage} />
        <Route exact path={ROUTE_LOGOUT} component={Logout} />
        <Route exact path={ROUTE_NOT_FOUND} component={PageNotFound} />
        <Redirect from="*" to={ROUTE_NOT_FOUND} />
      </Switch>
    );
  }

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>{route}</Suspense>
    </>
  );
};

interface StateProps {
  accessObj?: TUserAccess;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    accessObj: state.auth.accessObj,
  };
};
export default connect(mapStateToProps, null)(App);

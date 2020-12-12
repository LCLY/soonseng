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
import CatalogPage from './containers/CatalogPage/CatalogPage';

interface AppProps {}

type Props = AppProps & StateProps;

const App: React.FC<Props> = ({ accessObj }) => {
  let route = null;

  if (accessObj?.showSalesDashboard) {
    // if user has access to dashboard
    route = (
      <Switch>
        {/* Other main pages */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/sales" component={SalesPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/orders" component={OrdersPage} />
        <Route exact path="/catalog" component={CatalogPage} />
        {/* dashboard */}
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/dashboard/make" component={Make} />
        <Route exact path="/dashboard/body" component={Body} />
        <Route exact path="/dashboard/body_make" component={BodyMake} />
        <Route exact path="/dashboard/accessory" component={Accessory} />
        {/* authentication */}
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/404" component={PageNotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    );
  } else {
    // user has normal access
    route = (
      <Switch>
        {/* Other main pages */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/sales" component={SalesPage} />
        <Route exact path="/catalog" component={CatalogPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/orders" component={OrdersPage} />
        {/* authentication */}
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/404" component={PageNotFound} />
        <Redirect from="*" to="/404" />
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

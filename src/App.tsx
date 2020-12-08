import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datetime/css/react-datetime.css';
import './App.less';
// interface OwnProps {}

// type Props = OwnProps & StateProps;

/**
 * Containing routes for every pages
 *
 * @return all the routes
 */
function App() {
  let route = null;

  route = (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/sales" component={SalesPage} />
      <Route exact path="/contact" component={ContactPage} />
      <Route exact path="/orders" component={OrdersPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/dashboard/make" component={Make} />
      <Route exact path="/dashboard/body" component={Body} />
      <Route exact path="/dashboard/body_make" component={BodyMake} />
      <Route exact path="/dashboard/accessory" component={Accessory} />

      <Route exact path="/logout" component={Logout} />
      <Route exact path="/404" component={PageNotFound} />
      <Redirect from="*" to="/404" />
    </Switch>
  );

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>{route}</Suspense>
    </>
  );
}

// interface StateProps {
//   isAuthenticated?: boolean;
// }

// const mapStateToProps = (state: IAuthMapState): StateProps => {
//   return {
//     isAuthenticated: state.auth.authToken !== null,
//   };
// };
export default App;

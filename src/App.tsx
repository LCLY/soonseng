import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
/* containers */
// General pages
import Homepage from 'src/containers/HomePage/HomePage';
import AboutPage from 'src/containers/AboutPage/AboutPage';
import ContactPage from 'src/containers/ContactPage/ContactPage';
import PageNotFound from './components/PageNotFound/PageNotFound';
import SalesPage from 'src/containers/Product/SalesPage/SalesPage';
// Dashboard
import DashboardPage from 'src/containers/DashboardPage/DashboardPage';
import Brand from 'src/containers/DashboardPage/DashboardCRUD/Brand/Brand';
import Make from './containers/DashboardPage/DashboardCRUD/Make/Make';
import Body from './containers/DashboardPage/DashboardCRUD/Body/Body';
import Length from './containers/DashboardPage/DashboardCRUD/Length/Length';
import Accessory from './containers/DashboardPage/DashboardCRUD/Accessory/Accessory';
import Wheelbase from './containers/DashboardPage/DashboardCRUD/Wheelbase/Wheelbase';
import BodyLength from './containers/DashboardPage/DashboardCRUD/BodyLength/BodyLength';
import BodyAccessory from './containers/DashboardPage/DashboardCRUD/BodyAccessory/BodyAccessory';
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
      <Route exact path="/404" component={PageNotFound} />
      <Route exact path="/contact" component={ContactPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/dashboard/brand" component={Brand} />
      <Route exact path="/dashboard/wheelbase" component={Wheelbase} />
      <Route exact path="/dashboard/make" component={Make} />
      <Route exact path="/dashboard/body" component={Body} />
      <Route exact path="/dashboard/length" component={Length} />
      <Route exact path="/dashboard/accessory" component={Accessory} />
      <Route exact path="/dashboard/body_length" component={BodyLength} />
      <Route exact path="/dashboard/body_accessory" component={BodyAccessory} />
      {/* <Route exact path="/logout" component={Logout} /> */}
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

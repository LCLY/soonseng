import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
/* containers */
import Homepage from 'src/containers/HomePage/HomePage';
import AboutPage from 'src/containers/AboutPage/AboutPage';
import ContactPage from 'src/containers/ContactPage/ContactPage';
import PageNotFound from './components/PageNotFound/PageNotFound';
import SalesPage from 'src/containers/Product/SalesPage/SalesPage';
import DashboardPage from 'src/containers/DashboardPage/DashboardPage';
import DashboardBrand from 'src/containers/DashboardPage/DashboardCRUD/DashboardBrand/DashboardBrand';
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
      <Route exact path="/dashboard/brand" component={DashboardBrand} />
      <Route exact path="/dashboard/wheelbase" component={DashboardPage} />
      <Route exact path="/dashboard/make" component={DashboardPage} />
      <Route exact path="/dashboard/body" component={DashboardPage} />
      <Route exact path="/dashboard/length" component={DashboardPage} />
      <Route exact path="/dashboard/accessory" component={DashboardPage} />
      <Route exact path="/dashboard/body_length" component={DashboardPage} />
      <Route exact path="/dashboard/body_accessory" component={DashboardPage} />
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

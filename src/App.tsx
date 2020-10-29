import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
/* containers */
import Homepage from './containers/HomePage/HomePage';
import AboutPage from './containers/AboutPage/AboutPage';
import ContactPage from './containers/ContactPage/ContactPage';
import PageNotFound from './components/PageNotFound/PageNotFound';
import SalesPage from './containers/Product/SalesPage/SalesPage';
import DashboardPage from './containers/DashboardPage/DashboardPage';
// 3rd party lib
import 'bootstrap/dist/css/bootstrap.min.css';
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

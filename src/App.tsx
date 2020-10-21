import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
/* containers */
import Homepage from './containers/HomePage/HomePage';
import PageNotFound from './components/PageNotFound/PageNotFound';

// interface OwnProps {}

// type Props = OwnProps & StateProps;

function App() {
  let route = null;

  route = (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/404" component={PageNotFound} />
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

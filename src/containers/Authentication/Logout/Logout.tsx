import React, { useEffect } from 'react';
/*components*/
/*3rd party lib*/
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
/* Util */
import * as actions from 'src/store/actions/index';
import { Redirect } from 'react-router-dom';
import { TReceivedUserInfoObj } from 'src/store/types/auth';
import { RootState } from 'src';

interface LogoutProps {}

type Props = LogoutProps & StateProps & DispatchProps;

const Logout: React.FC<Props> = ({ userInfoObj, onSignOut, onClearCatalogState }) => {
  /* =========================== */
  /* useEffect */
  /* =========================== */
  useEffect(() => {
    onSignOut();
    onClearCatalogState();
  }, [onSignOut, onClearCatalogState]);

  /* ================================================== */
  /* ================================================== */

  // only redirect to home after userInfoObj is cleared

  let redirectToRedirect = null;
  if (userInfoObj === null) {
    redirectToRedirect = <Redirect to="/" />;
  }

  return <>{redirectToRedirect}</>;
};

interface StateProps {
  userInfoObj?: TReceivedUserInfoObj | null;
}

const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    userInfoObj: state.auth.userInfoObj,
  };
};

interface DispatchProps {
  onSignOut: typeof actions.signOut;
  onClearCatalogState: typeof actions.clearCatalogState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onSignOut: () => dispatch(actions.signOut()),
    onClearCatalogState: () => dispatch(actions.clearCatalogState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);

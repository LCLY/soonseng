import React, { useEffect } from 'react';
/*components*/
/*3rd party lib*/
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
/* Util */
import * as actions from 'src/store/actions/index';
import { Redirect } from 'react-router-dom';

interface LogoutProps {}

type Props = LogoutProps & DispatchProps;

const Logout: React.FC<Props> = ({ onSignOut, onClearCatalogState }) => {
  /* =========================== */
  /* useEffect */
  /* =========================== */
  useEffect(() => {
    onSignOut();
    onClearCatalogState();
  }, [onSignOut, onClearCatalogState]);

  /* ================================================== */
  /* ================================================== */
  return <Redirect to="/" />;
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
export default connect(null, mapDispatchToProps)(Logout);

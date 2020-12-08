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

const Logout: React.FC<Props> = ({ onSignOut }) => {
  /* =========================== */
  /* useEffect */
  /* =========================== */
  useEffect(() => {
    onSignOut();
  }, [onSignOut]);

  /* ================================================== */
  /* ================================================== */
  return <Redirect to="/" />;
};

interface DispatchProps {
  onSignOut: typeof actions.signOut;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return { onSignOut: () => dispatch(actions.signOut()) };
};
export default connect(null, mapDispatchToProps)(Logout);

import React, { useEffect } from 'react';
import './LoginPage.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import { Button, Form, Input, message } from 'antd';
/*3rd party lib*/
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { LoadingOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
/* Util */
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types';
import { TReceivedUserInfoObj } from 'src/store/types/auth';

interface LoginPageProps {}

type Props = LoginPageProps & StateProps & DispatchProps & RouteComponentProps;

const LoginPage: React.FC<Props> = ({
  loading,
  errorMessage,
  authenticated,
  userInfoObj,
  onSignIn,
  onClearAuthState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const antIcon = <LoadingOutlined style={{ color: 'white' }} spin />;

  console.log(userInfoObj);
  /* ================================================== */
  /*  methods  */
  /* ================================================== */

  // Form finish methods
  const onSignInFinish = (values: { email: string; password: string }) => {
    onSignIn(values.email, values.password);
  };

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */
  /* ------------------ */
  // error notification
  /* ------------------ */
  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage);
      onClearAuthState();
    }
  }, [errorMessage, onClearAuthState]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {authenticated && <Redirect to="/" />}
      <NavbarComponent activePage="login" />
      <section className="login__section">
        {/* <Container> */}
        <div className="login__section-outerdiv">
          <div className="login__form-outerdiv">
            <div className="login__form-div">
              <div className="login__section-header">Sign In</div>
              <Form name="basic" initialValues={{ remember: true }} onFinish={onSignInFinish}>
                <Form.Item
                  className="login__form-items"
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input type="email" />
                </Form.Item>

                <Form.Item
                  className="login__form-items"
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button className="login__btn" type="primary" htmlType="submit">
                    {loading ? <Spin indicator={antIcon} /> : 'Submit'}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        {/* </Container> */}
      </section>
      <Footer />
    </>
  );
};
interface StateProps {
  loading: boolean;
  authenticated: boolean;
  errorMessage: string | null;
  userInfoObj: TReceivedUserInfoObj | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  if ('auth' in state) {
    return {
      loading: state.auth.loading,
      errorMessage: state.auth.errorMessage,
      userInfoObj: state.auth.userInfoObj,
      authenticated: state.auth.auth_token !== null,
    };
  }
};
interface DispatchProps {
  onSignIn: typeof actions.signIn;
  onClearAuthState: typeof actions.clearAuthState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
    onClearAuthState: () => dispatch(actions.clearAuthState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));

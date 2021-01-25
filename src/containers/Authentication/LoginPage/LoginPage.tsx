import React, { useEffect } from 'react';
import './LoginPage.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
/*3rd party lib*/
import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { Button, Form, Input, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
/* Util */

import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import * as actions from 'src/store/actions/index';
import { TReceivedUserInfoObj } from 'src/store/types/auth';

interface LoginPageProps {}

type Props = LoginPageProps & StateProps & DispatchProps & RouteComponentProps;

const LoginPage: React.FC<Props> = ({
  loading,
  userInfoObj,
  errorMessage,
  authenticated,
  onSignIn,
  onClearAuthState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const antIcon = <LoadingOutlined style={{ color: 'white' }} spin />;

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
      <Helmet>
        <meta charSet="utf-8" name="Login" content="Login as salesman or admin to access more information." />
        <title>Login | Soon Seng Motors Enterprise (1988)</title>
        <link href="http://www.soonsenghino.com/login" />
      </Helmet>

      {authenticated && userInfoObj && <Redirect to="/" />}
      <NavbarComponent activePage="login" />

      <ParallaxContainer overlayColor="rgba(0, 0, 0, 0.3)" bgImageUrl={holy5truck}>
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
                    <Input type="email" placeholder="Enter email here e.g. example@gmail.com" />
                  </Form.Item>

                  <Form.Item
                    className="login__form-items"
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password placeholder="Enter password here" />
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
      </ParallaxContainer>
      <Footer />
    </>
  );
};

interface StateProps {
  loading?: boolean;
  authenticated?: boolean;
  errorMessage?: string | null;
  userInfoObj?: TReceivedUserInfoObj | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.auth.loading,
    errorMessage: state.auth.errorMessage,
    userInfoObj: state.auth.userInfoObj,
    authenticated: state.auth.auth_token !== null,
  };
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

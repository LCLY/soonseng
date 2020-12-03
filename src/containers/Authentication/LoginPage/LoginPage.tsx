import React from 'react';
import './LoginPage.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
// import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import { Button, Form, Input } from 'antd';
/*3rd party lib*/
// import { connect } from 'react-redux';
// import { AnyAction, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
/* Util */
// import * as actions from 'src/store/actions/index';
// import { TMapStateToProps } from 'src/store/types';

interface LoginPageProps {}

type Props = LoginPageProps & RouteComponentProps;

const LoginPage: React.FC<Props> = () => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  /* ================================================== */
  /*  methods  */
  /* ================================================== */

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent activePage="login" />
      <section className="login__section">
        {/* <Container> */}
        <div className="login__section-outerdiv">
          <div className="login__form-outerdiv">
            <div className="login__form-div">
              <div className="login__section-header">Sign In</div>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  className="login__form-items"
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
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
                    Submit
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
// interface StateProps {}
// const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
//   return { variable: state.reducer.variable };
// };
// interface DispatchProps {
//   onFunctionName: typeof actions.functionName;
// }
// const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
//   return { onFunctionName: (param) => dispatch(actions.functionName(param)) };
// };
export default withRouter(LoginPage);

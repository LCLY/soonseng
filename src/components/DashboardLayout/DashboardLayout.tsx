import React, { useState } from 'react';
import './DashboardLayout.scss';
/* components */
import Backdrop from '../Backdrop/Backdrop';
/* 3rd party lib */
import { Menu } from 'antd';
import { connect } from 'react-redux';
import Sider from 'antd/lib/layout/Sider';
import { AnyAction, Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
/* Util */
import { ROUTE_LOGOUT, ROUTE_LOGIN, ROUTE_DASHBOARD } from 'src/shared/routes';
import { RootState } from 'src';
import SoonSengLogo from 'src/img/soonseng_logo.png';
import * as actions from 'src/store/actions/index';
import { TReceivedUserInfoObj, TUserAccess } from 'src/store/types/auth';
import { TActivePage } from '../NavbarComponent/NavbarComponent';

const { SubMenu } = Menu;

interface DashboardLayoutProps {
  activePage?: TActivePage;
  defaultOpenKeys?: 'product' | 'dashboard';
}

type Props = DashboardLayoutProps & StateProps & DispatchProps & RouteComponentProps;

const DashboardLayout: React.FC<Props> = ({
  accessObj,
  activePage,
  userInfoObj,
  authenticated,
  projectVersion,
  defaultOpenKeys,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  component */
  /* ================================================== */

  let mobileSidebar = (
    <>
      <Backdrop backdropZIndex={100} show={showMobileSidebar} clicked={() => setShowMobileSidebar(false)} />
      <div
        className="navbar__mobilesidebar"
        style={{
          transform: showMobileSidebar ? 'translateX(0%)' : 'translateX(-100%)',
          transition: 'all 0.5s ease',
        }}
      >
        <div className="navbar__mobilesidebar-top">
          <a className="navbar__logo" href="/">
            <img
              alt="soonseng logo"
              className="navbar__logo"
              //   onClick={() => history.push(ROUTE_HOME)}
              src={SoonSengLogo}
            />
          </a>
        </div>

        <div className="navbar__mobilesidebar-bottom">
          <Sider className="navbar__mobilesidebar-sider" theme="light">
            <Menu
              mode="inline"
              defaultSelectedKeys={[activePage !== undefined ? activePage : '']}
              defaultOpenKeys={[defaultOpenKeys !== undefined ? defaultOpenKeys : '']}
            >
              <SubMenu
                className="navbar__mobilesidebar-submenu"
                key="dashboard"
                icon={<i className="fas fa-columns margin_r-1"></i>}
                title="Dashboard"
              >
                <Menu.Item key="users">
                  <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.users}>
                    User Roles
                  </a>
                </Menu.Item>
                <Menu.Item key="make">
                  <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.make}>
                    Model
                  </a>
                </Menu.Item>
                <Menu.Item key="body">
                  <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.body}>
                    Body
                  </a>
                </Menu.Item>
                <Menu.Item key="accessory">
                  <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.accessory}>
                    Accessory
                  </a>
                </Menu.Item>
                <Menu.Item key="bodymake">
                  <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.body_make}>
                    Model with body
                  </a>
                </Menu.Item>
                <Menu.Item key="fees">
                  <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.fees}>
                    Standard Charges
                  </a>
                </Menu.Item>
                <Menu.Item key="job_monitoring">
                  <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.job_monitoring}>
                    Job Monitoring
                  </a>
                </Menu.Item>
              </SubMenu>

              <Menu.Item
                key="login"
                icon={authenticated ? <i className="fas fa-sign-out-alt"></i> : <i className="fas fa-sign-in-alt"></i>}
              >
                {authenticated && userInfoObj ? (
                  <a className={`navbar__link`} href={ROUTE_LOGOUT}>
                    Sign Out
                  </a>
                ) : (
                  <a className={`navbar__link`} href={ROUTE_LOGIN}>
                    Sign In
                  </a>
                )}
              </Menu.Item>
            </Menu>
          </Sider>
        </div>
        {userInfoObj && (
          <div className="navbar__mobilesidebar-admin">
            <>
              <div className="">
                {userInfoObj?.roles.title}&nbsp;{accessObj?.showSalesDashboard ? projectVersion : ''}
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  return <>{mobileSidebar}</>;
};

interface StateProps {
  authenticated?: boolean;
  accessObj?: TUserAccess;
  projectVersion?: string;
  auth_token?: string | null;
  userInfoObj?: TReceivedUserInfoObj | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    userInfoObj: state.auth.userInfoObj,
    projectVersion: state.general.projectVersion,
    authenticated: state.auth.auth_token !== null,
  };
};

interface DispatchProps {
  onGetUserInfo: typeof actions.getUserInfo;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return { onGetUserInfo: () => dispatch(actions.getUserInfo()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardLayout));

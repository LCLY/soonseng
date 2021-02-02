import React, { useEffect, useState } from 'react';
import './NavbarComponent.scss';
// components
import Backdrop from '../Backdrop/Backdrop';
import OrdersSlidebar from 'src/containers/OrdersPage/OrdersSlidebar/OrdersSlidebar';
// 3rd party lib
import { connect } from 'react-redux';
import Sider from 'antd/lib/layout/Sider';
import { AnyAction, Dispatch } from 'redux';
import { Badge, Dropdown, Menu } from 'antd';
import { Navbar, Nav } from 'react-bootstrap';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// image
import SoonSengLogo from 'src/img/soonseng_logo.png';

// Util
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SALES,
  ROUTE_LOGOUT,
  // ROUTE_ORDERS,
  ROUTE_CATALOG,
  ROUTE_DASHBOARD,
} from 'src/shared/routes';
import { RootState } from 'src';
import * as actions from 'src/store/actions/index';
import { TLocalOrderObj } from 'src/store/types/sales';
import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import { TReceivedUserInfoObj, TUserAccess } from 'src/store/types/auth';

const { SubMenu } = Menu;

interface NavbarComponentProps {
  /** Shows which active page it is currently */
  activePage?:
    | 'catalog'
    | 'home'
    | 'sales'
    | 'body'
    | 'about'
    | 'product'
    | 'contact'
    | 'bodymake'
    | 'accessory'
    | 'fees'
    | 'about'
    | 'orders'
    | 'make'
    | 'login'
    | 'job_monitoring';
  defaultOpenKeys?: 'product' | 'dashboard';
}

type Props = NavbarComponentProps & StateProps & DispatchProps & RouteComponentProps;

/**
 *  A navbar component containing links to other pages
 * @param activePage optional: contains string of a page's name and it's used to determine whether the navlink is active or not
 * @param history history from react-router-dom
 * @category Components
 */

const NavbarComponent: React.FC<Props> = ({
  history,
  // auth_token,
  accessObj,
  userInfoObj,
  activePage,
  // onGetUserInfo,
  authenticated,
  projectVersion,
  defaultOpenKeys,
  localOrdersArray,
}) => {
  /* ======================================= */
  // state
  /* ======================================= */
  // const [prevScrollPos, setPrevScrollPos] = useState(0);
  // navbar visibility
  // const [visible, setVisible] = useState(true);

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showOrderSlidebar, setShowOrderSlidebar] = useState(false);
  const { width } = useWindowDimensions();

  /* =========================================== */
  // methods
  /* =========================================== */

  /* ========================================== */
  //  Component
  /* ========================================== */
  const dashboardMenu = (
    <div>
      <Menu className="navbar__dropdown-menu">
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
        <Menu.Item key="body_make">
          <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.body_make}>
            Model with body
          </a>
        </Menu.Item>
        <Menu.Item key="fees">
          <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.fees}>
            Processing Fees
          </a>
        </Menu.Item>
        <Menu.Item key="job_monitoring">
          <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.job_monitoring}>
            Job Monitoring
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );

  const salesMenu = (
    <div>
      <Menu className="navbar__dropdown-menu">
        <Menu.Item key="catalog">
          <a className="navbar__dropdown-link" href={ROUTE_CATALOG}>
            Vehicle Catalog
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );

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
          <Navbar.Brand className="navbar__logo" href="/">
            <img
              alt="soonseng logo"
              className="navbar__logo"
              onClick={() => history.push(ROUTE_HOME)}
              src={SoonSengLogo}
            />
          </Navbar.Brand>
        </div>

        <div className="navbar__mobilesidebar-bottom">
          <Sider className="navbar__mobilesidebar-sider" theme="light">
            <Menu
              mode="inline"
              defaultSelectedKeys={[activePage !== undefined ? activePage : '']}
              defaultOpenKeys={[defaultOpenKeys !== undefined ? defaultOpenKeys : '']}
            >
              <Menu.Item key="home" icon={<i className="fas fa-home"></i>}>
                <a className="navbar__dropdown-link" href={ROUTE_HOME}>
                  Home
                </a>
              </Menu.Item>
              <SubMenu
                className="navbar__mobilesidebar-submenu"
                key="product"
                icon={<i className="fas fa-book margin_r-1"></i>}
                title="Product"
              >
                <Menu.Item key="catalog">
                  <a className="navbar__dropdown-link" href={ROUTE_CATALOG}>
                    Vehicle Catalog
                  </a>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="sales" icon={<i className="fas fa-balance-scale"></i>}>
                <a className="navbar__link" href={ROUTE_SALES}>
                  Sales
                </a>
              </Menu.Item>

              {accessObj?.showSalesDashboard && (
                <SubMenu
                  className="navbar__mobilesidebar-submenu"
                  key="dashboard"
                  icon={<i className="fas fa-columns margin_r-1"></i>}
                  title="Dashboard"
                >
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
              )}

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

  /* ======================================== */
  // useEffect
  /* ======================================== */

  // useEffect(() => {
  //   if ((document && showMobileSidebar) || (document && showOrderSlidebar)) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, [showMobileSidebar, showOrderSlidebar]);

  useEffect(() => {
    if (width >= 1200) {
      setShowMobileSidebar(false);
    }
  }, [width]);

  // useEffect(() => {
  //   if (auth_token === undefined) return;
  //   onGetUserInfo(auth_token);
  // }, [onGetUserInfo, auth_token]);

  return (
    <>
      {mobileSidebar}
      <Backdrop backdropZIndex={100} show={showOrderSlidebar} clicked={() => setShowOrderSlidebar(false)} />

      <div className="navbar__outerdiv">
        <Navbar className="navbar__div" bg="primary" variant="dark" expand="md">
          <Navbar.Brand className="navbar__logo" href="#home">
            <img
              alt="soonseng logo"
              className="navbar__logo"
              onClick={() => history.push(ROUTE_HOME)}
              src={SoonSengLogo}
            />
          </Navbar.Brand>
          <div className="flex-align-center" style={{ marginLeft: 'auto' }}>
            {localOrdersArray !== undefined && (
              <Badge count={localOrdersArray.length} showZero size="small" className="navbar__icon-cart--mobile">
                <ShoppingCartOutlined className="navbar__icon-cart" onClick={() => setShowOrderSlidebar(true)} />
              </Badge>
            )}
            <input
              type="checkbox"
              id="header__toggle"
              checked={showMobileSidebar}
              className="navbar__bars-checkbox"
              readOnly
            />
            <label
              htmlFor="header__toggle"
              className="navbar__bars-button navbar__bars-div"
              onClick={() => {
                setShowMobileSidebar(!showMobileSidebar);
              }}
            >
              <div className="navbar__bars-icon">&nbsp;</div>
            </label>
          </div>

          <Nav className="navbar__wrapper">
            <div className="navbar__left-div">
              <div className={`navbar__link-div ${activePage === 'home' ? 'active' : ''}`}>
                <a className="navbar__link" href={ROUTE_HOME}>
                  <i className="fas fa-home"></i>&nbsp;Home
                </a>
              </div>
              <div className={`navbar__link-div ${activePage === 'product' ? 'active' : ''}`}>
                <Dropdown overlay={salesMenu} trigger={['click']} overlayStyle={{ fill: 'blue' }}>
                  <span className="navbar__link">
                    <i className="fas fa-book"></i>&nbsp;Product
                  </span>
                </Dropdown>
              </div>
              <div className={`navbar__link-div ${activePage === 'sales' ? 'active' : ''}`}>
                <a className="navbar__link" href={ROUTE_SALES}>
                  <i className="fas fa-balance-scale"></i>&nbsp;Sales
                </a>
              </div>
              {/* ABOUT US */}
              {/* <div className={`navbar__link-div ${activePage === 'about' ? 'active' : ''}`}>
          <span className="navbar__link" onClick={() => history.push('/about')}>
            <i className="fas fa-address-card"></i>&nbsp;About us
          </span>
        </div> */}
              {/* CONTACT */}
              {/* <div className={`navbar__link-div ${activePage === 'contact' ? 'active' : ''}`}>
          <span className="navbar__link" onClick={() => history.push('/contact')}>
            <i className="fas fa-address-book"></i>&nbsp;Contact
          </span>
        </div> */}

              {/* only show dashboard when bool is true */}
              {accessObj?.showSalesDashboard ? (
                <div className={`navbar__link-div`}>
                  <Dropdown overlay={dashboardMenu} trigger={['click']}>
                    <span className="navbar__link">
                      <i className="fas fa-columns"></i>&nbsp;Dashboard
                    </span>
                  </Dropdown>
                </div>
              ) : null}
            </div>
            <div className="navbar__right-div">
              {/* only show if user info exist or not a normal user */}
              {/* {userInfoObj && <div className="navbar__link-div navbar__role-title">{userInfoObj?.roles.title}</div>} */}
              {accessObj?.showSalesDashboard && <div className="navbar__version-div">{projectVersion}</div>}

              <div className={`navbar__link-div  ${activePage === 'login' ? 'active' : ''}`}>
                <div className={`navbar__link`}>
                  {authenticated && userInfoObj ? (
                    <>
                      <a className={`navbar__link`} href={ROUTE_LOGOUT}>
                        <i className="fas fa-sign-out-alt"></i>&nbsp;Sign Out
                      </a>
                    </>
                  ) : (
                    <>
                      <a className={`navbar__link`} href={ROUTE_LOGIN}>
                        <i className="fas fa-sign-in-alt"></i>&nbsp;Sign In
                      </a>
                    </>
                  )}
                </div>
              </div>

              <div className={`navbar__link-div  ${activePage === 'orders' ? 'active' : ''}`}>
                {localOrdersArray !== undefined && (
                  <Badge count={localOrdersArray.length} showZero size="small">
                    {/* <a className={`navbar__link`} href={ROUTE_ORDERS}> */}
                    <ShoppingCartOutlined className="navbar__icon-cart" onClick={() => setShowOrderSlidebar(true)} />
                    {/* </a> */}
                  </Badge>
                )}
              </div>
            </div>
          </Nav>
        </Navbar>
      </div>

      <OrdersSlidebar
        showOrderSlidebar={showOrderSlidebar}
        setShowOrderSlidebar={setShowOrderSlidebar}
        style={{ transform: showOrderSlidebar ? 'translateX(0)' : 'translateX(100%)' }}
      />
    </>
  );
};

interface StateProps {
  auth_token?: string | null;
  authenticated?: boolean;
  accessObj?: TUserAccess;
  projectVersion?: string;
  userInfoObj?: TReceivedUserInfoObj | null;
  localOrdersArray?: TLocalOrderObj[];
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    auth_token: state.auth.auth_token,
    userInfoObj: state.auth.userInfoObj,
    projectVersion: state.general.projectVersion,
    localOrdersArray: state.sales.localOrdersArray,
    authenticated: state.auth.auth_token !== null,
  };
};

interface DispatchProps {
  onGetUserInfo: typeof actions.getUserInfo;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return { onGetUserInfo: (auth_token) => dispatch(actions.getUserInfo(auth_token)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavbarComponent));

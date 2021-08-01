import React, { useEffect, useState } from 'react';
import './NavbarComponent.scss';
// components
import Backdrop from '../Backdrop/Backdrop';
import OrdersSlidebar from 'src/containers/OrdersPage/OrdersSlidebar/OrdersSlidebar';
// 3rd party lib
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import Sider from 'antd/lib/layout/Sider';
import { AnyAction, Dispatch } from 'redux';
import { Badge, Dropdown, Menu, Popover, Empty } from 'antd';
import { Navbar, Nav } from 'react-bootstrap';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// image
import SoonSengLogo from 'src/img/soonseng_logo.png';

// Util
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  // ROUTE_SALES,
  ROUTE_LOGOUT,
  ROUTE_TASK,
  // ROUTE_ORDERS,
  ROUTE_CATALOG,
  ROUTE_DASHBOARD,
  ROUTE_PERFORMANCE,
} from 'src/shared/routes';
import { RootState } from 'src';
import * as actions from 'src/store/actions/index';
import { TLocalOrderObj } from 'src/store/types/sales';
import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import { TReceivedUserInfoObj, TUserAccess } from 'src/store/types/auth';
import { INotification } from 'src/store/types/general';

const { SubMenu } = Menu;

export type TActivePage =
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
  | 'users'
  | 'about'
  | 'task'
  | 'orders'
  | 'make'
  | 'login'
  | 'performance'
  | 'job_monitoring';

interface NavbarComponentProps {
  /** Shows which active page it is currently */
  activePage?: TActivePage;
  defaultOpenKeys?: 'product' | 'dashboard';
}

type Props = NavbarComponentProps & StateProps & DispatchProps & RouteComponentProps;

/**
 *  A navbar component containing links to other pages
 * @param activePage optional: contains string of a page's name and it's used to determine whether the navlink is active or not
 * @param history history from react-router-dom
 * @category Components
 */
/**
 *
 *
 * @param {*} {
 *   history,
 *   // auth_token,
 *   accessObj,
 *   userInfoObj,
 *   activePage,
 *   // onGetUserInfo,
 *   authenticated,
 *   projectVersion,
 *   defaultOpenKeys,
 *   localOrdersArray,
 * }
 * @return {*}
 */
const NavbarComponent: React.FC<Props> = ({
  history,
  auth_token,
  accessObj,
  userInfoObj,
  activePage,
  notification,
  // onGetUserInfo,
  authenticated,
  projectVersion,
  defaultOpenKeys,
  localOrdersDict,
  onSetNotification,
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
        <Menu.Item key="user">
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
              {/* <Menu.Item key="sales" icon={<i className="fas fa-balance-scale"></i>}>
                <a className="navbar__link" href={ROUTE_SALES}>
                  Sales
                </a>
              </Menu.Item> */}
              <Menu.Item key="task" icon={<i className="fas fa-tasks"></i>}>
                <a className="navbar__link" href={ROUTE_TASK}>
                  Task
                </a>
              </Menu.Item>
              {accessObj?.showAdminDashboard && (
                <Menu.Item key="performance" icon={<i className="fas fa-chart-line"></i>}>
                  <a className="navbar__link" href={ROUTE_PERFORMANCE}>
                    Performance
                  </a>
                </Menu.Item>
              )}

              {accessObj?.showSalesDashboard && (
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
                {userInfoObj?.roles.title}&nbsp;{auth_token ? projectVersion : ''}
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

  let notificationContent = (
    <div>
      {notification?.notificationArray.length === 0 ? (
        <Empty description="No notifcation at the moment" className="navbar__notification-empty" />
      ) : (
        <div className="navbar__notification-list-outerdiv">
          {notification?.notificationArray.slice(0, 30).map((child) => {
            let logId = localStorage.getItem('logId');
            let backgroundColor = 'transparent';
            if (logId !== null) {
              if (child.id > parseInt(logId)) {
                backgroundColor = 'rgb(88, 160, 214)';
              } else {
                backgroundColor = 'transparent';
              }
            } else {
              backgroundColor = 'rgb(88, 160, 214)';
            }

            return (
              <div key={uuidv4()} className="navbar__notification-row">
                <div className="navbar__notification-dot-outerdiv">
                  {/* only show the dot if the log id is newer than the one stored in localstorage */}
                  <div
                    className="navbar__notification-dot"
                    style={{
                      width: '1rem',
                      height: '1rem',
                      borderRadius: ' 50%',
                      background: backgroundColor,
                    }}
                  />
                </div>
                <div className="navbar__notification-left">
                  <span className="navbar__notification-title">{child.intake}</span>
                  <div className="navbar__notification-content">{child.title}</div>
                  <div className="navbar__notification-date">
                    <div className="navbar__notification-ago">{moment(child.created_at).fromNow()}</div>
                    <div>
                      {child.created_by} - {moment(child.created_at).format('DD/MM/YYYY HH:mm')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

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
          <div className="navbar__link-outerdiv">
            {/* Mobile Icons */}
            {authenticated && (
              <div className="navbar__bell-div navbar__bell--mobile" style={{ marginRight: '2rem' }}>
                <Popover
                  placement="bottomLeft"
                  title={
                    <>
                      <i className="fas fa-bell navbar__bell-icon-title"></i>
                      <span>Notifications</span>
                    </>
                  }
                  content={notificationContent}
                  trigger="click"
                  onVisibleChange={(e) => {
                    if (notification === undefined) return;
                    if (e) {
                      // reset the number back to 0 when user open the bell
                      onSetNotification({
                        ...notification,
                        notificationNumber: 0,
                        notificationArray: notification?.notificationArray,
                      });
                    } else {
                      localStorage.setItem('logId', notification.notificationArray[0].id.toString());
                    }
                  }}
                >
                  {notification !== undefined && (
                    <Badge count={notification?.notificationNumber} size="small" overflowCount={20}>
                      {notification?.notificationNumber > 0 ? (
                        <i className="fas fa-bell navbar__icon-cart navbar__icon-cart--bell"></i>
                      ) : (
                        <i className="far fa-bell navbar__icon-cart navbar__icon-cart--bell"></i>
                      )}
                    </Badge>
                  )}
                </Popover>
              </div>
            )}

            {localOrdersDict !== undefined && (
              <Badge
                count={Object.keys(localOrdersDict).length}
                showZero
                size="small"
                className="navbar__icon-cart--mobile"
                overflowCount={20}
              >
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
                  {/* <i className="fas fa-home"></i>&nbsp; */}
                  Home
                </a>
              </div>
              <div className={`navbar__link-div ${activePage === 'product' ? 'active' : ''}`}>
                <Dropdown overlay={salesMenu} trigger={['click']} overlayStyle={{ fill: 'blue' }}>
                  <span className="navbar__link">
                    {/* <i className="fas fa-book"></i>&nbsp; */}
                    Product
                  </span>
                </Dropdown>
              </div>
              {/* <div className={`navbar__link-div ${activePage === 'sales' ? 'active' : ''}`}>
                <a className="navbar__link" href={ROUTE_SALES}>
                  <i className="fas fa-balance-scale"></i>&nbsp;Sales
                </a>
              </div> */}
              <div className={`navbar__link-div ${activePage === 'task' ? 'active' : ''}`}>
                <a className="navbar__link" href={ROUTE_TASK}>
                  {/* <i className="fas fa-tasks"></i>&nbsp; */}
                  Task
                </a>
              </div>

              {accessObj?.showAdminDashboard && (
                <div className={`navbar__link-div ${activePage === 'performance' ? 'active' : ''}`}>
                  <a className="navbar__link" href={ROUTE_PERFORMANCE}>
                    {/* <i className="fas fa-chart-line"></i>&nbsp; */}
                    Performance
                  </a>
                </div>
              )}
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
                      {/* <i className="fas fa-columns"></i>&nbsp; */}
                      Dashboard
                    </span>
                  </Dropdown>
                </div>
              ) : null}

              {/* ================================================================== */}
              {/* NEW DASHBOARD */}
              {/* ================================================================== */}
              {/* {accessObj?.showSalesDashboard && (
                <div className={`navbar__link-div ${activePage === 'task' ? 'active' : ''}`}>
                  <a className="navbar__link" href={ROUTE_DASHBOARD.body}>
                    <i className="fas fa-columns"></i>&nbsp;Dashboard
                  </a>
                </div>
              )} */}
            </div>
            <div className="navbar__right-div">
              {/* only show if user info exist or not a normal user */}
              {/* {userInfoObj && <div className="navbar__link-div navbar__role-title">{userInfoObj?.roles.title}</div>} */}
              {accessObj?.showSalesDashboard && <div className="navbar__version-div">{projectVersion}</div>}
              {authenticated && (
                <div className="navbar__bell-div">
                  <Popover
                    placement="topLeft"
                    title={
                      <>
                        <i className="fas fa-bell navbar__bell-icon-title"></i>
                        <span>Notifications</span>
                      </>
                    }
                    content={notificationContent}
                    trigger="click"
                    onVisibleChange={(e) => {
                      if (notification === undefined) return;
                      if (e) {
                        // reset the number back to 0 when user open the bell
                        onSetNotification({
                          ...notification,
                          notificationNumber: 0,
                          notificationArray: notification?.notificationArray,
                        });
                      } else {
                        console.log(e);
                        localStorage.setItem('logId', notification.notificationArray[0].id.toString());
                      }
                    }}
                  >
                    {notification !== undefined && (
                      <Badge count={notification?.notificationNumber} size="small">
                        {notification?.notificationNumber > 0 ? (
                          <i className="fas fa-bell navbar__icon-cart navbar__icon-cart--bell"></i>
                        ) : (
                          <i className="far fa-bell navbar__icon-cart navbar__icon-cart--bell"></i>
                        )}
                      </Badge>
                    )}
                  </Popover>
                </div>
              )}
              <div className={`navbar__link-div  ${activePage === 'orders' ? 'active' : ''}`}>
                {localOrdersDict !== undefined && (
                  <Badge count={Object.keys(localOrdersDict).length} size="small">
                    {/* <a className={`navbar__link`} href={ROUTE_ORDERS}> */}
                    <ShoppingCartOutlined className="navbar__icon-cart" onClick={() => setShowOrderSlidebar(true)} />
                    {/* </a> */}
                  </Badge>
                )}
              </div>
              <div className={`navbar__link-div  ${activePage === 'login' ? 'active' : ''}`}>
                <div>
                  {authenticated && userInfoObj ? (
                    <>
                      <a className={`navbar__button-login`} href={ROUTE_LOGOUT}>
                        {/* <i className="fas fa-sign-out-alt"></i>&nbsp; */}
                        Sign Out
                      </a>
                    </>
                  ) : (
                    <>
                      <a className={`navbar__button-login`} href={ROUTE_LOGIN}>
                        {/* <i className="fas fa-sign-in-alt"></i>&nbsp; */}
                        Sign In
                      </a>
                    </>
                  )}
                </div>
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
  authenticated?: boolean;
  accessObj?: TUserAccess;
  projectVersion?: string;
  notification?: INotification;
  auth_token?: string | null;
  userInfoObj?: TReceivedUserInfoObj | null;
  localOrdersDict?: { [key: string]: TLocalOrderObj };
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    userInfoObj: state.auth.userInfoObj,
    notification: state.general.notification,
    projectVersion: state.general.projectVersion,
    localOrdersDict: state.sales.localOrdersDict,
    authenticated: state.auth.auth_token !== null,
  };
};

interface DispatchProps {
  onGetUserInfo: typeof actions.getUserInfo;
  onSetNotification: typeof actions.setNotification;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetUserInfo: () => dispatch(actions.getUserInfo()),
    onSetNotification: (notification) => dispatch(actions.setNotification(notification)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavbarComponent));

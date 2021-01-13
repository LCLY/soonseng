import React, { useRef, useEffect, useState } from 'react';
import './NavbarComponent.scss';
// components
// 3rd party lib
import { Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
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
  ROUTE_ORDERS,
  ROUTE_CATALOG,
  ROUTE_DASHBOARD,
} from 'src/shared/routes';
import { RootState } from 'src';
import * as actions from 'src/store/actions/index';
import { TReceivedUserInfoObj, TUserAccess } from 'src/store/types/auth';
import Backdrop from '../Backdrop/Backdrop';
import Sider from 'antd/lib/layout/Sider';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  wrapperRef: any,
  dropdownRef: any,
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    /**
     * Hide pop up if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (
        wrapperRef.current &&
        dropdownRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowPopUp(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, dropdownRef, setShowPopUp]);
}

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
    | 'login';
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
  auth_token,
  accessObj,
  userInfoObj,
  activePage,
  onGetUserInfo,
  authenticated,
  defaultOpenKeys,
}) => {
  /* ======================================= */
  // state
  /* ======================================= */
  // const [prevScrollPos, setPrevScrollPos] = useState(0);
  // navbar visibility
  // const [visible, setVisible] = useState(true);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  useOutsideAlerter(wrapperRef, dropdownRef, setDropdownVisible);

  const [salesDropdownVisible, setSalesDropdownVisible] = useState(false);
  const salesWrapperRef = useRef(null);
  const salesDropdownRef = useRef(null);
  useOutsideAlerter(salesWrapperRef, salesDropdownRef, setSalesDropdownVisible);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  /* =========================================== */
  // methods
  /* =========================================== */

  /* ========================================== */
  //  Component
  /* ========================================== */
  const dashboardMenu = (
    <div ref={dropdownRef}>
      <Menu>
        <Menu.Item
          key="make"
          onClick={() => {
            setDropdownVisible(false);
          }}
        >
          <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.make}>
            Model
          </a>
        </Menu.Item>
        <Menu.Item
          key="body"
          onClick={() => {
            setDropdownVisible(false);
          }}
        >
          <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.body}>
            Body
          </a>
        </Menu.Item>
        <Menu.Item
          key="accessory"
          onClick={() => {
            setDropdownVisible(false);
          }}
        >
          <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.accessory}>
            Accessory
          </a>
        </Menu.Item>
        <Menu.Item
          key="body_make"
          onClick={() => {
            setDropdownVisible(false);
          }}
        >
          <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.body_make}>
            Model with body
          </a>
        </Menu.Item>
        <Menu.Item
          key="fees"
          onClick={() => {
            setDropdownVisible(false);
          }}
        >
          <a className="navbar__dropdown-link" href={ROUTE_DASHBOARD.fees}>
            Processing Fees
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );

  const salesMenu = (
    <div ref={salesDropdownRef}>
      <Menu>
        <Menu.Item
          key="catalog"
          onClick={() => {
            setSalesDropdownVisible(false);
          }}
        >
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
              <SubMenu key="product" icon={<i className="fas fa-book margin_r-1"></i>} title="Product">
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
                <SubMenu key="dashboard" icon={<i className="fas fa-columns margin_r-1"></i>} title="Dashboard">
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

              <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
                <a className={`navbar__link`} href={ROUTE_ORDERS}>
                  Orders
                </a>
              </Menu.Item>
            </Menu>
          </Sider>
        </div>
      </div>
    </>
  );

  /* ======================================== */
  // useEffect
  /* ======================================== */
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [prevScrollPos, visible, handleScroll]);

  useEffect(() => {
    if (auth_token === undefined) return;
    onGetUserInfo(auth_token);
  }, [onGetUserInfo, auth_token]);

  return (
    <>
      {mobileSidebar}
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

          <Nav className="mr-auto navbar__wrapper">
            <div className="navbar__left-div">
              <div className={`navbar__link-div ${activePage === 'home' ? 'active' : ''}`}>
                <a className="navbar__link" href={ROUTE_HOME}>
                  <i className="fas fa-home"></i>&nbsp;Home
                </a>
              </div>
              <div className={`navbar__link-div ${activePage === 'product' ? 'active' : ''}`}>
                <Dropdown visible={salesDropdownVisible} overlay={salesMenu} trigger={['click']}>
                  <span className="navbar__link" ref={salesWrapperRef} onClick={() => setSalesDropdownVisible(true)}>
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
                  <Dropdown visible={dropdownVisible} overlay={dashboardMenu} trigger={['click']}>
                    <span className="navbar__link" ref={wrapperRef} onClick={() => setDropdownVisible(true)}>
                      <i className="fas fa-columns"></i>&nbsp;Dashboard
                    </span>
                  </Dropdown>
                </div>
              ) : null}
            </div>
            <div className="navbar__right-div">
              {/* only show if user info exist or not a normal user */}
              {userInfoObj && <div className="navbar__link-div navbar__role-title">{userInfoObj?.roles.title}</div>}
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
                <a className={`navbar__link`} href={ROUTE_ORDERS}>
                  <ShoppingCartOutlined />
                  &nbsp;Orders
                </a>
              </div>
            </div>
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

interface StateProps {
  auth_token?: string | null;
  authenticated?: boolean;
  accessObj?: TUserAccess;
  userInfoObj?: TReceivedUserInfoObj | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    auth_token: state.auth.auth_token,
    userInfoObj: state.auth.userInfoObj,
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

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

interface NavbarComponentProps {
  /** Shows which active page it is currently */
  activePage?: 'home' | 'sales' | 'about' | 'product' | 'contact' | 'about' | 'orders' | 'dashboard' | 'login';
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
  authenticated,
  activePage,
  onGetUserInfo,
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

  /* =========================================== */
  // methods
  /* =========================================== */

  // const handleScroll = useCallback(
  //   debounce(
  //     () => {
  //       // find current scroll position
  //       const currentScrollPos = window.pageYOffset;
  //       // set state based on location info
  //       if (prevScrollPos > currentScrollPos) {
  //         if (Math.abs(prevScrollPos - currentScrollPos) > 40 || currentScrollPos < 10) {
  //           setVisible(true);
  //           setDropdownVisible(false);
  //           setSalesDropdownVisible(false);
  //         }
  //       } else {
  //         if (Math.abs(prevScrollPos - currentScrollPos) > 35) {
  //           setVisible(false);
  //           setDropdownVisible(false);
  //           setSalesDropdownVisible(false);
  //         }
  //       }

  //       // // set state based on location info (explained in more detail below)
  //       // setVisible(
  //       //   (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10,
  //       // );

  //       // setVisible(
  //       //   (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 20) || currentScrollPos < 10,
  //       // );
  //       // set state to new scroll position
  //       setPrevScrollPos(currentScrollPos);
  //     },
  //     100,
  //     {
  //       leading: true,
  //       trailing: false,
  //     },
  //   ),

  //   [prevScrollPos],
  // );

  /* ========================================== */
  //  Component
  /* ========================================== */
  const dashboardMenu = (
    <div ref={dropdownRef}>
      <Menu>
        <Menu.Item
          key="make"
          onClick={() => {
            history.push(ROUTE_DASHBOARD.make);
            setDropdownVisible(false);
          }}
        >
          Model
        </Menu.Item>
        <Menu.Item
          key="body"
          onClick={() => {
            history.push(ROUTE_DASHBOARD.body);
            setDropdownVisible(false);
          }}
        >
          Body
        </Menu.Item>
        <Menu.Item
          key="accessory"
          onClick={() => {
            history.push(ROUTE_DASHBOARD.accessory);
            setDropdownVisible(false);
          }}
        >
          Accessory
        </Menu.Item>
        <Menu.Item
          key="body_make"
          onClick={() => {
            history.push(ROUTE_DASHBOARD.body_make);
            setDropdownVisible(false);
          }}
        >
          Model with body
        </Menu.Item>
      </Menu>
    </div>
  );

  const salesMenu = (
    <div ref={salesDropdownRef}>
      <Menu>
        <Menu.Item
          key="make"
          onClick={() => {
            history.push(ROUTE_CATALOG);
            setSalesDropdownVisible(false);
          }}
        >
          Vehicle Catalog
        </Menu.Item>
      </Menu>
    </div>
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
      <div className="navbar__outerdiv" /*  style={{ top: visible ? '0' : '-100%' }} */>
        <Navbar className="navbar__div" bg="primary" variant="dark" expand="md">
          <Navbar.Brand className="navbar__logo" href="#home">
            <img
              alt="soonseng logo"
              className="navbar__logo"
              onClick={() => history.push(ROUTE_HOME)}
              src={SoonSengLogo}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto navbar__wrapper">
              <div className="navbar__left-div">
                <div className={`navbar__link-div ${activePage === 'home' ? 'active' : ''}`}>
                  <span className="navbar__link" onClick={() => history.push(ROUTE_HOME)}>
                    <i className="fas fa-home"></i>&nbsp;Home
                  </span>
                </div>
                <div className={`navbar__link-div ${activePage === 'product' ? 'active' : ''}`}>
                  <Dropdown visible={salesDropdownVisible} overlay={salesMenu} trigger={['click']}>
                    <span className="navbar__link" ref={salesWrapperRef} onClick={() => setSalesDropdownVisible(true)}>
                      {/* SALES <DownOutlined /> */}
                      <i className="fas fa-book"></i>&nbsp;Product
                    </span>
                  </Dropdown>
                </div>
                <div className={`navbar__link-div ${activePage === 'sales' ? 'active' : ''}`}>
                  <span className="navbar__link" onClick={() => history.push(ROUTE_SALES)}>
                    <i className="fas fa-balance-scale"></i>&nbsp;Sales
                  </span>
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
                        {/* DASHBOARD <DownOutlined /> */}
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
                  <div
                    className={`navbar__link`}
                    ref={dropdownRef}
                    onClick={() => {
                      authenticated && userInfoObj ? history.push(ROUTE_LOGOUT) : history.push(ROUTE_LOGIN);
                    }}
                  >
                    {authenticated && userInfoObj ? (
                      <>
                        <i className="fas fa-sign-out-alt"></i>&nbsp;Sign Out
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt"></i>&nbsp;Sign In
                      </>
                    )}
                  </div>
                </div>
                <div className={`navbar__link-div  ${activePage === 'orders' ? 'active' : ''}`}>
                  <div className={`navbar__link`} ref={dropdownRef} onClick={() => history.push(ROUTE_ORDERS)}>
                    <ShoppingCartOutlined />
                    &nbsp;Orders
                  </div>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
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

import React, { useCallback, useEffect, useState } from 'react';
import './NavbarComponent.scss';
// components
// 3rd party lib
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ShoppingCartOutlined, DownOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

// image
import SoonSengLogo from 'src/img/soonseng_logo.png';
import { Dropdown, Menu } from 'antd';

interface NavbarComponentProps {
  /** Shows which active page it is currently */
  activePage?: 'home' | 'sales' | 'about' | 'contact' | 'about' | 'orders' | 'dashboard';
}

type Props = NavbarComponentProps & RouteComponentProps;

/**
 *  A navbar component containing links to other pages
 * @param activePage optional: contains string of a page's name and it's used to determine whether the navlink is active or not
 * @param history history from react-router-dom
 * @category Components
 */

const NavbarComponent: React.FC<Props> = ({ history, activePage }) => {
  /* ======================================= */
  // state
  /* ======================================= */
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  /* =========================================== */
  // methods
  /* =========================================== */

  const handleScroll = useCallback(
    debounce(() => {
      // find current scroll position
      const currentScrollPos = window.pageYOffset;
      // set state based on location info
      setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 50) || currentScrollPos < 10);
      // set state to new scroll position
      setPrevScrollPos(currentScrollPos);
    }, 100),

    [prevScrollPos],
  );

  /* ========================================== */
  //  Component
  /* ========================================== */
  const dashboardMenu = (
    <Menu>
      <Menu.Item key="body" onClick={() => history.push('/dashboard/body')}>
        Body
      </Menu.Item>
      <Menu.Item key="make" onClick={() => history.push('/dashboard/make')}>
        Make
      </Menu.Item>
      <Menu.Item key="accessory" onClick={() => history.push('/dashboard/accessory')}>
        Accessory
      </Menu.Item>
    </Menu>
  );

  /* ======================================== */
  // useEffect
  /* ======================================== */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <>
      <div className="navbar__outerdiv" style={{ top: visible ? '0' : '-100%' }}>
        <Navbar className="navbar__div" bg="primary" variant="dark" expand="md">
          <Navbar.Brand className="navbar__logo" href="#home">
            <img alt="soonseng logo" className="navbar__logo" onClick={() => history.push('/')} src={SoonSengLogo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto navbar__wrapper">
              <div className="navbar__left-div">
                <div className={`navbar__link-div ${activePage === 'home' ? 'active' : ''}`}>
                  <span className="navbar__link" onClick={() => history.push('/')}>
                    HOME
                  </span>
                </div>
                <div className={`navbar__link-div ${activePage === 'sales' ? 'active' : ''}`}>
                  <span className="navbar__link" onClick={() => history.push('/sales')}>
                    SALES
                  </span>
                </div>
                <div className={`navbar__link-div ${activePage === 'about' ? 'active' : ''}`}>
                  <span className="navbar__link" onClick={() => history.push('/about')}>
                    ABOUT US
                  </span>
                </div>
                <div className={`navbar__link-div ${activePage === 'contact' ? 'active' : ''}`}>
                  <span className="navbar__link" onClick={() => history.push('/contact')}>
                    CONTACT
                  </span>
                </div>
                <div className={`navbar__link-div`}>
                  <Dropdown overlay={dashboardMenu} trigger={['click']}>
                    <span className="navbar__link">
                      DASHBOARD <DownOutlined />
                    </span>
                  </Dropdown>
                </div>
              </div>
              <div className="navbar__right-div">
                <div className={`navbar__link-div  ${activePage === 'orders' ? 'active' : ''}`}>
                  <div className={`navbar__link`} onClick={() => history.push('/orders')}>
                    <ShoppingCartOutlined /> Orders
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

export default withRouter(NavbarComponent);

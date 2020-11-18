import React from 'react';
import './NavbarComponent.scss';
// components
// 3rd party lib
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// image
import SoonSengLogo from 'src/img/soonseng_logo.png';

interface NavbarComponentProps {
  /** Shows which active page it is currently */
  activePage?: string;
}

type Props = NavbarComponentProps & RouteComponentProps;

/**
 *  A navbar component containing links to other pages
 * @param activePage optional: contains string of a page's name and it's used to determine whether the navlink is active or not
 * @param history history from react-router-dom
 * @category Components
 */

const NavbarComponent: React.FC<Props> = ({ history, activePage }) => {
  return (
    <div className="navbar__outerdiv">
      <Navbar className="navbar__div" bg="primary" variant="dark" expand="md">
        <Navbar.Brand className="navbar__logo" href="#home">
          <img alt="soonseng logo" className="navbar__logo" onClick={() => history.push('/')} src={SoonSengLogo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto navbar__wrapper">
            <div className={`navbar__link ${activePage === 'home' ? 'active' : ''}`}>
              <Nav.Link onClick={() => history.push('/')}>HOME</Nav.Link>
            </div>
            <div className={`navbar__link ${activePage === 'sales' ? 'active' : ''}`}>
              <Nav.Link onClick={() => history.push('/sales')}>SALES</Nav.Link>
            </div>
            <div className={`navbar__link ${activePage === 'about' ? 'active' : ''}`}>
              <Nav.Link onClick={() => history.push('/about')}>ABOUT US</Nav.Link>
            </div>
            <div className={`navbar__link ${activePage === 'contact' ? 'active' : ''}`}>
              <Nav.Link onClick={() => history.push('/contact')}>CONTACT</Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(NavbarComponent);

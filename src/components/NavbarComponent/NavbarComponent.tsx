import React from 'react';
import './NavbarComponent.scss';
// 3rd party lib
import { Navbar, Container, Nav /* NavDropdown */ } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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
        <Container>
          <Navbar.Brand className="navbar__logo" href="#home">
            LOGO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto navbar__wrapper">
              <div className={`navbar__link ${activePage === 'home' ? 'active' : ''}`}>
                <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>
              </div>
              {/* <div className="navbar__link navbar__link--product">
                <NavDropdown title="Product" id="product-nav-dropdown">
                  <NavDropdown.Item onClick={() => history.push('/product/sales')}>Sales</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Service</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Spare parts</NavDropdown.Item>
                </NavDropdown>
              </div> */}
              <div className={`navbar__link ${activePage === 'sales' ? 'active' : ''}`}>
                <Nav.Link onClick={() => history.push('/sales')}>Sales</Nav.Link>
              </div>
              <div className={`navbar__link ${activePage === 'about' ? 'active' : ''}`}>
                <Nav.Link onClick={() => history.push('/about')}>About Us</Nav.Link>
              </div>
              <div className={`navbar__link ${activePage === 'contact' ? 'active' : ''}`}>
                <Nav.Link onClick={() => history.push('/contact')}>Contact</Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default withRouter(NavbarComponent);

import React from 'react';
import './NavbarComponent.scss';
// components
// 3rd party lib
// import { Navbar, Nav /* NavDropdown */ } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Menu } from 'antd';
// image
import SoonSengLogo from 'src/img/soonseng_logo.png';
const { Header } = Layout;
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

/* <Navbar className="navbar__div" bg="primary" variant="dark" expand="md">
<Navbar.Brand className="navbar__logo" href="#home">
  LOGO
</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto navbar__wrapper">
    <div className={`navbar__link ${activePage === 'home' ? 'active' : ''}`}>
      <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>
    </div>
    // <div className="navbar__link navbar__link--product">
      //  <NavDropdown title="Product" id="product-nav-dropdown">
        //  <NavDropdown.Item onClick={() => history.push('/product/sales')}>Sales</NavDropdown.Item>
          //<NavDropdown.Item href="#action/3.2">Service</NavDropdown.Item>
          //<NavDropdown.Item href="#action/3.3">Spare parts</NavDropdown.Item>
        //</NavDropdown>
      //</div> 
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
</Navbar> */

const NavbarComponent: React.FC<Props> = ({ history, activePage }) => {
  return (
    <div className="navbar__outerdiv">
      <Header className="navbar__header">
        <img alt="soonseng logo" className="navbar__logo" onClick={() => history.push('/')} src={SoonSengLogo} />
        <Menu className="navbar__item-menu" theme="dark" mode="horizontal" defaultSelectedKeys={[`${activePage}`]}>
          <Menu.Item key="home" className="navbar__item" onClick={() => history.push('/')}>
            Home
          </Menu.Item>
          <Menu.Item key="sales" className="navbar__item" onClick={() => history.push('/sales')}>
            Sales
          </Menu.Item>
          <Menu.Item key="about" className="navbar__item" onClick={() => history.push('/about')}>
            About
          </Menu.Item>
          <Menu.Item key="contact" className="navbar__item" onClick={() => history.push('/contact')}>
            Contact
          </Menu.Item>
        </Menu>
      </Header>
    </div>
  );
};

export default withRouter(NavbarComponent);

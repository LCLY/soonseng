import React from 'react';
import './HomePage.scss';
// component
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

/**
 * Home page of the website
 * @return {*}
 * @category Pages
 */

function HomePage() {
  return (
    <div>
      <NavbarComponent activePage="home" />
      HomePage
    </div>
  );
}

export default HomePage;

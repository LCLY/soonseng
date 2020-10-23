import React from 'react';
import './AboutPage.scss';
// component
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

/**
 * Description about the company
 * @return {*}
 * @category Pages
 */
function AboutPage() {
  return (
    <div>
      <NavbarComponent activePage="about" />
      AboutPage
    </div>
  );
}

export default AboutPage;

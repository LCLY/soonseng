import React from 'react';
import './ContactPage.scss';
// component
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';

/**
 * Page to find contact information about the company
 * @return {*}
 * @category Pages
 */
function ContactPage() {
  return (
    <div>
      <NavbarComponent activePage="contact" />
      Contact us
    </div>
  );
}

export default ContactPage;

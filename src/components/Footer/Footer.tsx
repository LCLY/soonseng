import React from 'react';
import './Footer.scss';
import SoonSengLogo from 'src/img/soonseng_logo_slick_cropped.png';
/*components*/
import Container from 'src/components/CustomContainer/CustomContainer';
/*3rd party lib*/
import { Row, Col } from 'antd';

interface FooterProps {}

type Props = FooterProps;

const Footer: React.FC<Props> = () => {
  return (
    <>
      <footer className="footer__outerdiv">
        <Container>
          <div className="footer__top">
            <div>
              <img src={SoonSengLogo} alt="logo" className="footer__top-logo" />
            </div>
            <div className="footer__top-social">
              <div className="footer__top-social-follow">FOLLOW US</div>
              <i className="fab fa-facebook-f footer__top-social-icon"></i>
              <i className="fab fa-instagram footer__top-social-icon"></i>
              <i className="fab fa-twitter footer__top-social-icon"></i>
              <i className="fas fa-globe footer__top-social-icon"></i>
            </div>
          </div>
          <Row>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }}>
              <div className="footer__col footer__col--2">
                <div style={{ width: '100%' }}>
                  <div className="footer__services-text">OUR SEVICES</div>
                  <div className="footer__services-div">
                    <a className="footer__services-link" href="/">
                      Inspection
                    </a>
                    <br />
                    <a className="footer__services-link" href="/">
                      Upgrades
                    </a>
                    <br />
                    <a className="footer__services-link" href="/">
                      Maintenance
                    </a>
                    <br />
                    <a className="footer__services-link" href="/">
                      Inspection
                    </a>
                    <br />
                    <a className="footer__services-link" href="/">
                      Bay Maintenance
                    </a>
                    <br />
                    <a className="footer__services-link" href="/">
                      Reporting system
                    </a>
                    <br />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 5 }} lg={{ span: 5 }}>
              <div className="footer__col footer__col--2">
                <div style={{ width: '100%' }}>
                  <div className="footer__services-text">OUR COMPANY</div>
                  <div className="footer__services-div">
                    <a className="footer__services-link" href="/">
                      About Us
                    </a>
                    <br />
                    <a className="footer__services-link" href="/">
                      Our Blog
                    </a>
                    <br />
                    <a className="footer__services-link" href="/">
                      Our other sites
                    </a>
                    <br />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
              <div className="footer__col footer__col--2">
                <div>
                  <div className="footer__services-text">SOON SENG MOTORS</div>
                  <div className="footer__store-address">
                    <div className="footer__store-address-line">LOT 2776, JALAN LONG YUNUS,</div>
                    <div className="footer__store-address-line">KAWASAN MIEL,</div>
                    <div className="footer__store-address-line">15200 KOTA BHARU,</div>
                    Kelantan
                  </div>
                  <div className="footer__store-address--mobile">
                    LOT 2776 Jalan Long Yunus KAWASAN MIEL 15200 Kota Bharu Kelantan
                  </div>

                  <div className="footer__store-contact-div">
                    <div className="footer__store-phone-div">
                      <div className="footer__store-phone">09-747-7835</div>
                      <div className="footer__store-phone">012-900-2676</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className="footer__col footer__image-div">
                <img
                  className="footer__image"
                  src="https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg"
                  alt="test"
                />
              </div>
            </Col>
          </Row>
          <div className="footer__copyright-div">
            <div>Copyright © 2020 SSME (1988) SDN. BHD. All Rights Reserved</div>
            <div>
              <span className="footer__copyright-policy">
                <a
                  className="footer__copyright-policy-link"
                  href="https://www.privacypolicies.com/live/7c3b1e8e-e6ff-4667-8813-55978d4b4a07"
                >
                  Privacy Policys
                </a>
              </span>
              <span className="footer__copyright-policy">
                <a
                  className="footer__copyright-policy-link"
                  href="https://www.privacypolicies.com/live/7c3b1e8e-e6ff-4667-8813-55978d4b4a07"
                >
                  Terms of Use
                </a>
              </span>
              <span className="footer__copyright-policy">
                <a
                  className="footer__copyright-policy-link"
                  href="https://www.privacypolicies.com/live/7c3b1e8e-e6ff-4667-8813-55978d4b4a07"
                >
                  Sitemap
                </a>
              </span>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};
export default Footer;

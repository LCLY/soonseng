import React from 'react';
import './Footer.scss';
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
          <Row gutter={8}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className="footer__col footer__col--1">
                <div>
                  <div className="footer__store-name">SOON SENG MOTORS</div>
                  <div className="footer__store-address">
                    LOT 2776
                    <br />
                    Jalan Long Yunus
                    <br />
                    KAWASAN MIEL
                    <br />
                    15200 Kota Bharu
                    <br />
                    Kelantan
                  </div>
                  <div className="footer__store-address--mobile">
                    LOT 2776 Jalan Long Yunus KAWASAN MIEL 15200 Kota Bharu Kelantan
                  </div>

                  <div className="footer__store-contact-div">
                    <span className="footer__store-contact">Contact Us:</span>
                    <div className="footer__store-phone-div">
                      <span className="footer__store-phone">09-747-7835</span>
                      <br />
                      <span className="footer__store-phone">012-900-2676</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className="footer__col footer__col--2">
                <div style={{ width: '100%' }}>
                  <div className="footer__services-text">Our Services</div>
                  <div className="footer__services-div">
                    <a href="/">Inspection</a>
                    <br />
                    <a href="/">Upgrades</a>
                    <br />
                    <a href="/">Maintenance</a>
                    <br />
                    <a href="/">Inspection</a>
                    <br />
                    <a href="/">Bay Maintenance</a>
                    <br />
                    <a href="/">Reporting system</a>
                    <br />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className="footer__col footer__col--2">
                <div style={{ width: '100%' }}>
                  <div className="footer__services-text">Our Company</div>
                  <div className="footer__services-div">
                    <a href="/">About Us</a>
                    <br />
                    <a href="/">Contact Us</a>
                    <br />
                    <a href="/">Our Blog</a>
                    <br />
                    <a href="/">Our other sites</a>
                    <br />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <div className="footer__col footer__col--2">
                <div style={{ width: '100%' }}>
                  <div className="footer__services-text">Follow Us</div>
                  <div className="footer__services-div">
                    <a href="/">Facebook</a>
                    <br />
                    <a href="/">Instagram</a>
                    <br />
                    <a href="/">Twitter</a>
                    <br />
                    <a href="/">HINO website</a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="footer__copyright-div">
          {/* © 2020 Soon Seng Motors Enterprise (1988) Sdn Bhd */}Copyright © 2020 SSME (1988) Sdn. Bhd. All Rights
          Reserved
          <span className="footer__copyright-policy">
            <a
              className="footer__copyright-policy-link"
              href="https://www.privacypolicies.com/live/7c3b1e8e-e6ff-4667-8813-55978d4b4a07"
            >
              Privacy Policy
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};
export default Footer;

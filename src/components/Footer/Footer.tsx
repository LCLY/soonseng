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
            <Col span={6}>
              <div className="footer__col footer__col--1">
                <div>
                  <span className="footer__store-name">SOON SENG MOTORS</span>
                  <div className="footer__store-address">
                    6040 B & C
                    <br />
                    Jalan Sultan Ibrahim
                    <br />
                    Bandar Kota Bharu,
                    <br />
                    15050 Kota Bharu,
                    <br />
                    Kelantan
                  </div>

                  <div className="footer__store-contact-div">
                    <span className="footer__store-contact">Contact Us:</span>
                    <span className="footer__store-phone">018-888-8888</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={6}>
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
            <Col span={6}>
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
            <Col span={6}>
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
          © 2020 Soon Seng Motors
          <span className="footer__copyright-policy">
            <a className="footer__copyright-policy-link" href="/">
              Privacy Policy
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};
export default Footer;

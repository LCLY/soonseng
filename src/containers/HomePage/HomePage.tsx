import React, { useEffect } from 'react';
import './HomePage.scss';
// component
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
// image
// import transparent_background_truck_img from 'src/img/truck.png';
import transparent_green_hino from 'src/img/greenhino.png';
// 3rd party lib
import gsap from 'gsap';
// import { TweenMax, Linear } from 'gsap';
import { Parallax } from 'react-scroll-parallax';
import ScrollAnimation from 'react-animate-on-scroll';
import { Button } from 'antd';

/**
 * Home page of the website
 * @return {*}
 * @category Pages
 */
function HomePage() {
  // let imageElement = useRef(null);

  // useEffect(() => {
  //   TweenMax.from(imageElement, 8, {
  //     repeat: -1,
  //     yoyo: true,
  //     transform: 'translateX(-3rem) translateY(-2.5rem)',
  //     ease: Linear.easeInOut,
  //   });
  //   TweenMax.to(imageElement, 8, {
  //     repeat: -1,
  //     yoyo: true,
  //     transform: 'translateX(-6rem) translateY(-1rem)',
  //     ease: Linear.easeInOut,
  //   });
  // }, []);

  useEffect(() => {
    gsap.to('.homepage__button', {
      x: '0',
      opacity: 1,
      duration: 0.5,
      stagger: { amount: 0.35, ease: 'none' },
    });
  }, []);

  // const scaleup = () => {
  //   TweenMax.to(imageElement, 1, { scale: 1.03 });
  // };
  // const scaledown = () => {
  //   TweenMax.to(imageElement, 1, { scale: 1 });
  // };

  return (
    <div>
      <NavbarComponent activePage="home" />
      <section className="homepage__overlay-parent">
        <div className="homepage__overlay">
          <div className="homepage__title-div">
            <h1 className="homepage__title">
              SOON SENG MOTORS
              <br />
              ENTERPRISE (1988)
            </h1>
            <div className="homepage__button-outerdiv">
              <div className="homepage__button-div">
                <Button className="homepage__button" type="default">
                  Sales
                </Button>
                <div className="homepage__button-description">Some short description about sales</div>
              </div>
              <div className="homepage__button-div">
                <Button className="homepage__button" type="default">
                  Service
                </Button>
                <div className="homepage__button-description">Some short description about service</div>
              </div>
              <div className="homepage__button-div">
                <Button className="homepage__button" type="default">
                  Sparepart
                </Button>
                <div className="homepage__button-description">Some short description about sparepart</div>
              </div>
              <div className="homepage__button-div">
                <Button className="homepage__button" type="default">
                  Insurance
                </Button>
                <div className="homepage__button-description">Some short description about insurance</div>
              </div>
            </div>
          </div>
        </div>
        <div className="homepage__background-outerdiv">
          {/* <div className="homepage__background-image"></div> */}
          <Parallax className="homepage__third-img-div" x={['-10px', '100px']} tagOuter="figure">
            <img
              className="homepage__background-parallax"
              src="https://s29755.pcdn.co/wp-content/uploads/2019/08/2019_Top_Five_Class_5-Mack.jpg"
              alt="logo"
            />
          </Parallax>
        </div>
      </section>

      <Container>
        <section className="homepage__section-feature">
          <div className="homepage__feature-top">
            <div className="homepage__feature-outerdiv">
              <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
                <div className="homepage__feature-div">
                  <div className="homepage__feature-icon-div">
                    <i className="homepage__feature-icon  fas fa-hard-hat"></i>
                  </div>
                  <div className="homepage__feature-text">
                    <div className="homepage__feature-title">Safety</div>
                    <div className="homepage__feature-desc">
                      Our trucks are the safest, they are built with bulletproof materials
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            <div className="homepage__feature-outerdiv">
              <ScrollAnimation animateOnce={true} animateIn="fadeInDown">
                <div className="homepage__feature-div">
                  <div className="homepage__feature-icon-div">
                    <i className="homepage__feature-icon fas fa-chart-line"></i>
                  </div>
                  <div className="homepage__feature-text">
                    <div className="homepage__feature-title">Performance</div>
                    <div className="homepage__feature-desc">Our trucks are beasts, they can run 200 miles per hour</div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            <div className="homepage__feature-outerdiv homepage__feature-outerdiv--efficiency">
              <ScrollAnimation animateOnce={true} animateIn="fadeInRight">
                <div className="homepage__feature-div">
                  <div className="homepage__feature-icon-div">
                    <i className="homepage__feature-icon fas fa-business-time"></i>
                  </div>
                  <div className="homepage__feature-text">
                    <div className="homepage__feature-title">Efficiency</div>
                    <div className="homepage__feature-desc">
                      Our trucks are so efficient that their efficency are faster than time itself
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>

          <div className="homepage__feature-bottom">
            <div className="homepage__feature-outerdiv">
              <ScrollAnimation animateOnce={true} delay={0.2} animateIn="animate__fadeInBottomLeft">
                <div className="homepage__feature-div">
                  <div className="homepage__feature-icon-div">
                    <i className="homepage__feature-icon fas fa-truck-moving"></i>
                  </div>
                  <div className="homepage__feature-text">
                    <div className="homepage__feature-title">Comfort</div>
                    <div className="homepage__feature-desc">
                      Our trucks are so comfortable that you don't want to leave it
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            <div className="homepage__feature-outerdiv">
              <ScrollAnimation animateOnce={true} delay={0.4} animateIn="animate__fadeInBottomRight">
                <div className="homepage__feature-div">
                  <div className="homepage__feature-icon-div">
                    <i className="homepage__feature-icon fas fa-leaf"></i>
                  </div>
                  <div className="homepage__feature-text">
                    <div className="homepage__feature-title">Green Energy</div>
                    <div className="homepage__feature-desc">
                      Our trucks are environmentally friendly, they create oxygen while moving.
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </Container>

      {/* <section className="homepage__section-intro">
        <div className="homepage__intro-img-parent">
          <div className="homepage__intro-img--transparent-div">
            <img
              ref={(element: any) => {
                imageElement = element;
              }}
              onMouseEnter={scaleup}
              onMouseLeave={scaledown}
              className="homepage__intro-img--transparent"
              src={transparent_background_truck_img}
              alt="transparent truck"
            />
          </div>
          <div className="homepage__intro-img-overlay"></div>
          <div className="homepage__intro-img--ori-div">
            <img
              className="homepage__intro-img--ori"
              alt="trucklogo"
              src="https://www.daimler.com/bilder/innovation/autonomes-fahren/future-truck-2025/14c1049-42-klein-w1024xh512-cutout.jpg"
            />
          </div>
        </div>
        <div className="homepage__intro-text-outerdiv">
          <ScrollAnimation animateOnce={true} animateIn="bounceInRight">
            <div className="homepage__intro-title margin_b-2">Load and Roll</div>
            <div className="homepage__intro-text">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
              sunt in culpa
              <br />
              <br />
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam
              et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.
              <br />
              <br />
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam
              et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.
            </div>
          </ScrollAnimation>
        </div>
      </section> */}

      <section className="homepage__section-third">
        <div className="homepage__third-left">
          <div className="homepage__third-title">So Many Trucks To Choose</div>
          <div className="homepage__third-subtitle">Don't even know where to start</div>
          <div className="homepage__third-text">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
            sunt in culpa qui officia deserunt.
            <br />
            <br />
            Mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
          </div>
        </div>
        <div className="homepage__third-right">
          <Parallax className="homepage__third-img-div" x={['150px', '-0px']} tagOuter="figure">
            <img className="homepage__third-img" alt="green hino" src={transparent_green_hino} />
          </Parallax>
        </div>
      </section>
      <section className="homepage__section-third">
        <div className="homepage__third-text">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
          sunt in culpa qui officia deserunt. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
          praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident, similique sunt in culpa qui officia deserunt.
          <br />
          <br />
          Mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
          libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
        </div>
      </section>
    </div>
  );
}

export default HomePage;

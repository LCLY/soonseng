import React, { useRef, useEffect } from 'react';
import './HomePage.scss';
// component
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
// image
import transparent_background_truck_img from 'src/img/truck.png';
import transparent_green_hino from 'src/img/greenhino.png';
// 3rd party lib
import { TweenMax, Linear } from 'gsap';
import { Parallax } from 'react-scroll-parallax';
import ScrollAnimation from 'react-animate-on-scroll';
/**
 * Home page of the website
 * @return {*}
 * @category Pages
 */

function HomePage() {
  let imageElement = useRef(null);

  useEffect(() => {
    TweenMax.from(imageElement, 8, {
      repeat: -1,
      yoyo: true,
      transform: 'translateX(-3rem) translateY(-2.5rem)',
      ease: Linear.easeInOut,
    });
    TweenMax.to(imageElement, 8, {
      repeat: -1,
      yoyo: true,
      transform: 'translateX(-6rem) translateY(-1rem)',
      ease: Linear.easeInOut,
    });
  }, []);

  const scaleup = () => {
    TweenMax.to(imageElement, 1, { scale: 1.03 });
  };
  const scaledown = () => {
    TweenMax.to(imageElement, 1, { scale: 1 });
  };

  return (
    <div>
      <NavbarComponent activePage="home" />
      <section className="homepage__overlay-parent">
        <div className="homepage__overlay">
          <div className="homepage__title-div">
            <h1 className="homepage__title">SOON SENG</h1>
            <div className="homepage__subtitle">Makes your life easier</div>
            <div className="homepage__subtitle--2">Build your truck</div>
          </div>
        </div>
        <div className="homepage__background-image"></div>
      </section>

      <Container>
        {' '}
        <section className="homepage__section-feature">
          <div className="homepage__feature-outerdiv">
            <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
              <div className="homepage__feature-div">
                <div className="homepage__feature-icon-div">
                  <i className="homepage__feature-icon fas fa-clock"></i>
                </div>
                <div className="homepage__feature-text">
                  <div className="homepage__feature-title">
                    This thing will save a lot of your time, no joke, I promise you, its good
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
          <div className="homepage__feature-outerdiv">
            <ScrollAnimation animateOnce={true} animateIn="fadeInDown">
              <div className="homepage__feature-div">
                <div className="homepage__feature-icon-div">
                  <i className="homepage__feature-icon fas fa-dollar-sign"></i>
                </div>
                <div className="homepage__feature-text">
                  <div className="homepage__feature-title">
                    When you save time, you save money, think about that just for a sec
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
          <div className="homepage__feature-outerdiv">
            <ScrollAnimation animateOnce={true} animateIn="fadeInRight">
              <div className="homepage__feature-div">
                <div className="homepage__feature-icon-div">
                  <i className="homepage__feature-icon fas fa-truck-pickup"></i>
                </div>
                <div className="homepage__feature-text">
                  <div className="homepage__feature-title">
                    We have the best stuffs in the market, we don't play play, seriously
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </Container>

      <section className="homepage__section-intro">
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
            </div>
          </ScrollAnimation>
        </div>
      </section>

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
          sunt in culpa qui officia deserunt.
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

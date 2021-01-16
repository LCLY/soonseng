import React, { useEffect, useState } from 'react';
import './HomePage.scss';
// component
import Footer from 'src/components/Footer/Footer';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';

// 3rd party lib
import gsap from 'gsap';
import { v4 as uuidv4 } from 'uuid';
import { Button, Carousel } from 'antd';
import ScrollAnimation from 'react-animate-on-scroll';

/* Util */
import { ROUTE_SALES } from 'src/shared/routes';
import homepageImage from 'src/img/hino_homepage.jpg';
import { useWindowDimensions } from 'src/shared/HandleWindowResize';
/**
 * Home page of the website
 * @return {*}
 * @category Pages
 */
function HomePage() {
  const [animationIsMoving, setAnimationIsMoving] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    gsap.to('.homepage__first-button', {
      x: '0',
      opacity: 1,
      stagger: { amount: 0.25, ease: 'none' },
    });
  }, []);

  useEffect(() => {
    gsap.to('.homepage__first-parallelogram', {
      x: '0',
      opacity: 1,
      duration: 0.5,
    });
  }, []);

  const vroom = () => {
    // set bool to true when animation is going on
    setAnimationIsMoving(true);
    gsap.to('#truckicon', {
      x: '1000px',
      duration: 2,
      onComplete: resetvroom,
    });
  };
  const resetvroom = () => {
    gsap.set('#truckicon', {
      x: '-500px',
    });
    // once reset is done, user can hover to animate again
    gsap.to('#truckicon', {
      x: '0',
      duration: 1.5,
      onComplete: () => setAnimationIsMoving(false),
    });
  };

  let homepageButtons = [
    { title: 'Sales', desc: 'We don’t just sell vehicles. We solve problems.', redirectUrl: ROUTE_SALES },
    {
      title: 'Service',
      desc: 'Treat your tools to a spa, and they will serve you well',
      redirectUrl: '',
    },
    {
      title: 'Sparepart',
      desc: 'Sourcing the best parts since 1988.',
      redirectUrl: '',
    },
    {
      title: 'Insurance',
      desc: ' We offer competitive rates, tailored just for you.',
      redirectUrl: '',
    },
  ];

  let carouselContents = [
    {
      title: 'Service Advisor',
      italicText: 'Let our service advisors represent you in conveying your concerns to our skilled mechanics.',
      paragraph: [
        'Our service advisor liaises between service technicians and you, whilst assisting you in determining problems with your vehicles. Pin-pointing problems and providing accurate descriptions to our technicians ensures the process of the job runs smoothly.',
        'We put our customers on our HINO preventive maintenance schedule. By helping our customers think ahead of time on vehicle services, our schedule reduces downtime for vehicles which results in providing our customers a more consistent logistic performance.',
        'Share your problems and requests while we greet you with utmost sincerity. Skip the queue by scheduling a service appointment with us.',
      ],
      imgUrl: 'https://www.autotrainingcentre.com/wp-content/uploads/2015/11/image15.jpeg',
    },
    {
      title: 'HINO Certified Service Technician',
      italicText:
        'Your vehicle’s masseuse, responsible in making sure your vehicles have a great time. Rest assured, they are in good hands.',
      paragraph: [
        'Our Service Technicians do not stop until your vehicle is back on the road. We take our quality of service seriously and continuously attend workshop training to ensure we are keeping up with the latest trends of the automotive industry.',
        'We help you preemptively detect potential problems regarding your vehicle through our detailed 30-Point inspection and routine checks and services. Our goal is to reduce uncertainty and allow our customers to have smooth business operations.',
        '  We value customers reaching out to us whenever there is an issue, no matter the day nor the time.',
      ],
      imgUrl: 'https://www.cashcarsbuyer.com/wp-content/uploads/2020/04/Ask-A-Mechanic-1200x900.jpg',
    },
    {
      title: 'Sales Advisor',
      italicText:
        'Resolute your frustrations into individually tailored solutions. We don’t just hear your problems, we listen, discuss, and solve them together.',
      paragraph: [
        'Our customer’s satisfaction has always been our top priority. Share your problems with us and let us embark on our journey into solving them.',
        'Being under budget is every businesses’ concern. Providing the cheapest options are always easy, however the challenge lies within recommending the most suitable and effective solution. We aim to get your problems solved under budget for we care for our customers.',
        'Leave it up to us in providing you solutions for rest assured, your concerns are in good hands.',
      ],
      imgUrl: 'https://www.salesman.org/wp-content/uploads/2015/05/suit-hacks-for-salesmen.jpg',
    },
    {
      title: 'Customer Support',
      italicText: 'Your satisfaction, we guarantee.',
      paragraph: [
        'Our customer support extends way beyond our products. One of our proudest steps to emphasize on our commitment on customers’ satisfactory, we invested in having Procare units to provide customers’ with onsite services, and standby units for customers. We provide 24/7 breakdown assistance so that we know that our customers’ needs will always be met.',
        'Being part of the automotive industry, we support our customers’ through providing their drivers with training that are focuses on road safety, vehicle maintenance, fuel efficiency driving and many more. Together with HINO’s support through HTSCC (HINO Total Support Customer Center), we hope to get the idea across that we are always around to support our customers.',
        'With the resources we have at hand, we strive to make sure that no customer is left behind.',
      ],
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5aAff7FNXBxgHHpFNsezNMV4fwsMqhyETg&usqp=CAU',
    },
    {
      title: ' Parts Advisor',
      italicText: 'Good parts are the main components to a vehicle, as healthy organs are to humans.',
      paragraph: [
        'Good parts are the main components to a vehicle, as healthy organs are to humans. With HINO being our manufacturer, we are proud to offer our customers’ and business partners with HINO genuine parts. With HINO’s genuine parts program, we strive to provide our customers with good quality parts, within their constraints of budget in mind.',
        'Aligned to our core values where we look heavily upon growth, we often send our Parts Advisor to specially designed training sessions from HINO, to make sure that they are not left behind by the ever-changing technology of spare parts.',
      ],
      imgUrl: 'https://sc02.alicdn.com/kf/HTB1n5Z8KpXXXXaYXFXXq6xXFXXXK.jpg',
    },
  ];

  return (
    <>
      <NavbarComponent activePage="home" />

      <ParallaxContainer bgImageUrl={homepageImage} colorSettings="none" bgPosition={width < 768 ? '80% 0' : 'center'}>
        <section className="homepage__section-first-parent">
          <div className="homepage__section-first">
            <div className="homepage__first-title-div">
              <h1 className="homepage__first-title">
                SOON SENG MOTORS
                <br />
                ENTERPRISE (1988)
              </h1>
              <div className="homepage__first-parallelogram">
                <div className="homepage__first-parallelogram-text">- Your one stop commercial vehicle hub -</div>
              </div>
            </div>
            <div className="homepage__first-button-outerdiv">
              {homepageButtons.map((buttonObj, index) => (
                <div key={index} className="homepage__first-button-div">
                  <Button className="homepage__first-button" type="default">
                    <a href={buttonObj.redirectUrl}>{buttonObj.title}</a>
                  </Button>
                  <div className="homepage__first-button-description">{buttonObj.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxContainer>

      <Container>
        <section className="homepage__section-values">
          <div className="homepage__section-values-title">Our values</div>
          <div className="homepage__values-top">
            <div className="homepage__values-outerdiv">
              <ScrollAnimation animateOnce={true} animateIn="fadeInDown">
                <div className="homepage__values-div">
                  <div className="homepage__values-icon-div">
                    <i className="homepage__values-icon fas fa-chart-line"></i>
                  </div>
                  <div className="homepage__values-text">
                    <div className="homepage__values-title">Customers First</div>
                    <div className="homepage__values-desc">
                      Generating profit for customers through consistent logistic performance.
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            <div className="homepage__values-outerdiv">
              <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
                <div className="homepage__values-div">
                  <div className="homepage__values-icon-div">
                    <i className="homepage__values-icon fas fa-smile-beam"></i>
                  </div>
                  <div className="homepage__values-text">
                    <div className="homepage__values-title">Product Reliability</div>
                    <div className="homepage__values-desc">Turning uncertainties into predictabilities.</div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            <div className="homepage__values-outerdiv homepage__values-outerdiv--efficiency">
              <ScrollAnimation animateOnce={true} animateIn="fadeInRight">
                <div className="homepage__values-div">
                  <div className="homepage__values-icon-div">
                    <i className="homepage__values-icon fas fa-business-time"></i>
                  </div>
                  <div className="homepage__values-text">
                    <div className="homepage__values-title">Efficiency</div>
                    <div className="homepage__values-desc">Using less resources to get more done.</div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>

          <div className="homepage__values-bottom">
            <div className="homepage__values-outerdiv homepage__values-outerdiv--bottom">
              <ScrollAnimation animateOnce={true} delay={0.2} animateIn="animate__fadeInBottomLeft">
                <div className="homepage__values-div">
                  <div
                    style={{ cursor: 'pointer' }}
                    className="homepage__values-icon-div"
                    onDoubleClick={() => {
                      if (!animationIsMoving) {
                        vroom();
                      }
                    }}
                  >
                    <i style={{ zIndex: 10 }} id="truckicon" className="homepage__values-icon fas fa-truck-moving"></i>
                  </div>
                  <div className="homepage__values-text">
                    <div className="homepage__values-title">Performance</div>
                    <div className="homepage__values-desc">
                      Variety of vehicle selections that strive to perform on every situations possible.
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            <div className="homepage__values-outerdiv homepage__values-outerdiv--bottom">
              <ScrollAnimation animateOnce={true} delay={0.4} animateIn="animate__fadeInBottomRight">
                <div className="homepage__values-div">
                  <div className="homepage__values-icon-div">
                    <i className="homepage__values-icon fas fa-leaf"></i>
                  </div>
                  <div className="homepage__values-text">
                    <div className="homepage__values-title">Growth</div>
                    <div className="homepage__values-desc">
                      Taking part in growth, may it be our employees or customers.
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </Container>
      {/* Play carousel if user mouse point outside */}
      <div className="homepage__carousel-outerdiv">
        <Container>
          <div className="homepage__carousel-ourteam">Our Team</div>
          <Carousel autoplay autoplaySpeed={4000} pauseOnHover={true}>
            {carouselContents.map((carousel) => {
              return (
                <div key={uuidv4()} className="homepage__carousel-div">
                  <div className="homepage__carousel-div-left">
                    <div className="homepage__carousel-title">
                      {carousel.title}
                      <div className="homepage__carousel-parallelogram"></div>
                    </div>
                    <div>
                      <div className="homepage__carousel-italic">{`"${carousel.italicText}"`}</div>
                      <div className="homepage__carousel-content">
                        {carousel.paragraph.map((paragraph) => {
                          return (
                            <div key={uuidv4()} className="homepage__carousel-content-paragraph">
                              {paragraph}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="homepage__carousel-div-right">
                    <img alt={carousel.title} className="homepage__carousel-image" src={carousel.imgUrl} />
                  </div>
                </div>
              );
            })}
          </Carousel>
        </Container>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import './HomePage.scss';
// component
import Footer from 'src/components/Footer/Footer';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
// image
// 3rd party lib
import gsap from 'gsap';
import { Button, Carousel } from 'antd';
import ScrollAnimation from 'react-animate-on-scroll';

/**
 * Home page of the website
 * @return {*}
 * @category Pages
 */
function HomePage() {
  const [animationIsMoving, setAnimationIsMoving] = useState(false);

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
    { title: 'Sales', desc: 'We don’t just sell vehicles. We solve problems.' },
    {
      title: 'Service',
      desc: 'Treat your tools to a spa, and they will serve you well',
    },
    {
      title: 'Sparepart',
      desc: 'Sourcing the best parts since 1988.',
    },
    {
      title: 'Insurance',
      desc: ' We offer competitive rates, tailored just for you.',
    },
  ];

  return (
    <>
      <NavbarComponent activePage="home" />

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
                  {buttonObj.title}
                </Button>
                <div className="homepage__first-button-description">{buttonObj.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="homepage__background-outerdiv">
          <div className="homepage__background-image"></div>
        </div>
      </section>
      <Container>
        <section className="homepage__section-values">
          <div className="homepage__section-values-title">Our values</div>
          <div className="homepage__values-top">
            <div className="homepage__values-outerdiv">
              <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
                <div className="homepage__values-div">
                  <div className="homepage__values-icon-div">
                    <i className="homepage__values-icon  fas fa-hard-hat"></i>
                  </div>
                  <div className="homepage__values-text">
                    <div className="homepage__values-title">Product Reliability</div>
                    <div className="homepage__values-desc">Turning uncertainties into predictabilities.</div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
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
            <div className="homepage__carousel-div">
              <div className="homepage__carousel-div-left">
                <div className="homepage__carousel-title">
                  Service Advisor
                  <div className="homepage__carousel-parallelogram"></div>
                </div>
                <div>
                  <div className="homepage__carousel-italic">
                    "Let our service advisors represent you in conveying your concerns to our skilled mechanics."
                  </div>
                  <div className="homepage__carousel-content">
                    <div className="homepage__carousel-content-paragraph">
                      Our service advisor liaises between service technicians and you, whilst assisting you in
                      determining problems with your vehicles. Pin-pointing problems and providing accurate descriptions
                      to our technicians ensures the process of the job runs smoothly.
                    </div>

                    <div className="homepage__carousel-content-paragraph">
                      Share your problems and requests while we greet you with utmost sincerity. No challenges too huge
                      to intimidate us, no challenges too small to ignore.
                    </div>

                    <div className="homepage__carousel-content-paragraph">
                      Insurance are also considered one of our well-known products that are offered. Contact us to learn
                      more about our selection of products, as we venture into get you covered!
                    </div>

                    <div className="homepage__carousel-content-paragraph">
                      Skip the queue by scheduling a service appointment with us.
                    </div>
                  </div>
                </div>
              </div>
              <div className="homepage__carousel-div-right">
                <img
                  alt="service advisor"
                  className="homepage__carousel-image"
                  src="https://www.autotrainingcentre.com/wp-content/uploads/2015/11/image15.jpeg"
                />
              </div>
            </div>
            <div className="homepage__carousel-div">
              <div className="homepage__carousel-div-left">
                <div className="homepage__carousel-title">
                  Mechanic
                  <div className="homepage__carousel-parallelogram"></div>
                </div>

                <div className="homepage__carousel-italic">
                  "Your vehicle’s masseuse, responsible in making sure your vehicles have a great time. Rest assured,
                  they are in good hands."
                </div>
                <div className="homepage__carousel-content-paragraph">
                  Our mechanics do not stop until your vehicle is back on the road. We take our quality of service
                  seriously and continuously attend workshop training to ensure we are keeping up with the latest trends
                  of the automotive industry.
                </div>
                <div className="homepage__carousel-content-paragraph">
                  We help you preemptively detect potential problems regarding your vehicle through our detailed
                  30-Point inspection and routine checks and services. Our goal is to reduce uncertainty and allow our
                  customers to have smooth business operations.
                </div>
                <div className="homepage__carousel-content-paragraph">
                  We value customers reaching out to us whenever there is an issue, no matter the day nor the time. We
                  provide 24/7 emergency services.
                </div>
              </div>
              <div className="homepage__carousel-div-right">
                <img
                  alt="mechanic"
                  className="homepage__carousel-image"
                  src="https://www.cashcarsbuyer.com/wp-content/uploads/2020/04/Ask-A-Mechanic-1200x900.jpg"
                />
              </div>
            </div>
            <div className="homepage__carousel-div">
              <div className="homepage__carousel-div-left">
                <div className="homepage__carousel-title">
                  Salesmen
                  <div className="homepage__carousel-parallelogram"></div>
                </div>
                <div className="homepage__carousel-italic">
                  "Resolute your frustrations into individually tailored solutions. We don’t just hear your problems, we
                  listen, discuss, and solve them together."
                </div>
                <div className="homepage__carousel-content-paragraph">
                  Our customer’s satisfaction has always been our top priority. Share your problems with us and let us
                  embark on our journey into solving them.
                </div>
                <div className="homepage__carousel-content-paragraph">
                  Being under budget is every businesses’ concern. Providing the cheapest options are always easy,
                  however the challenge lies within recommending the most suitable and effective solution. We aim to get
                  your problems solved under budget for we care for our customers.
                </div>
                <div className="homepage__carousel-content-paragraph">
                  Leave it up to us in providing you solutions for rest assured, your concerns are in good hands.
                </div>
              </div>
              <div className="homepage__carousel-div-right">
                <img
                  alt="salesmen"
                  className="homepage__carousel-image"
                  src="https://www.salesman.org/wp-content/uploads/2015/05/suit-hacks-for-salesmen.jpg"
                />
              </div>
            </div>
            <div className="homepage__carousel-div">
              <div className="homepage__carousel-div-left">
                <div className="homepage__carousel-title">
                  Customer Support
                  <div className="homepage__carousel-parallelogram"></div>
                </div>
                <div className="homepage__carousel-italic">"Your satisfaction, we guarantee."</div>

                {/* <div className="homepage__carousel-content-paragraph">
                  Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est
                  eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
                  assumenda est, omnis dolor repellendus.
                </div>
                <div className="homepage__carousel-content-paragraph">
                  Ut ac ligula quis augue porta ultricies a quis justo. Aliquam facilisis ullamcorper purus. Nam
                  suscipit tellus sed lorem porta, sed volutpat lacus tempor. Aliquam in lacus felis.
                </div>
                <div className="homepage__carousel-content-paragraph">
                  Fusce a leo sed nibh fringilla tincidunt sit amet quis diam. Praesent volutpat nunc a diam porta
                  malesuada. Integer sollicitudin purus non rutrum scelerisque. Nunc dictum fringilla enim id tempor.
                </div> */}
              </div>
              <div className="homepage__carousel-div-right">
                <img
                  alt="customer support"
                  className="homepage__carousel-image"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5aAff7FNXBxgHHpFNsezNMV4fwsMqhyETg&usqp=CAU"
                />
              </div>
            </div>
          </Carousel>
        </Container>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;

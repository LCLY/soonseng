import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './AboutPage.scss';
/* component */
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';

/* 3rd party lib */
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Description about the company
 * @return {*}
 * @category Pages
 */
const AboutPage = () => {
  const divRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [captureRef, setCaptureRef] = useState<{ current: HTMLElement } | null>(null);

  const captureHandler = () => {
    if (captureRef !== null) {
      html2canvas(captureRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        // let width = pdf.internal.pageSize.getWidth();
        // let height = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, 'FAST');
        pdf.save('quotation.pdf');
        // captureRef.current.appendChild(canvas);
      });
    }
  };

  console.log(captureRef);

  useEffect(() => {
    if (divRef) {
      setCaptureRef(divRef);
    }
  }, [divRef]);

  return (
    <div>
      <NavbarComponent activePage="about" />
      <button onClick={() => captureHandler()}>Print</button>
      AboutPage
      <div className="test" ref={divRef}>
        <Container>
          <section className="homepage__section-values">
            <div className="homepage__section-values-title">Our values</div>
            <div className="homepage__values-top">
              <div className="homepage__values-outerdiv">
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
              </div>
              <div className="homepage__values-outerdiv">
                <div className="homepage__values-div">
                  <div className="homepage__values-icon-div">
                    <i className="homepage__values-icon fas fa-smile-beam"></i>
                  </div>
                  <div className="homepage__values-text">
                    <div className="homepage__values-title">Product Reliability</div>
                    <div className="homepage__values-desc">Turning uncertainties into predictabilities.</div>
                  </div>
                </div>
              </div>
              <div className="homepage__values-outerdiv homepage__values-outerdiv--efficiency">
                <div className="homepage__values-div">
                  <div className="homepage__values-icon-div">
                    <i className="homepage__values-icon fas fa-business-time"></i>
                  </div>
                  <div className="homepage__values-text">
                    <div className="homepage__values-title">Efficiency</div>
                    <div className="homepage__values-desc">Using less resources to get more done.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="homepage__values-bottom">
              <div className="homepage__values-outerdiv homepage__values-outerdiv--bottom">
                <div className="homepage__values-div">
                  <div style={{ cursor: 'pointer' }} className="homepage__values-icon-div">
                    <i style={{ zIndex: 10 }} id="truckicon" className="homepage__values-icon fas fa-truck-moving"></i>
                  </div>
                  <div className="homepage__values-text">
                    <div className="homepage__values-title">Performance</div>
                    <div className="homepage__values-desc">
                      Variety of vehicle selections that strive to perform on every situations possible.
                    </div>
                  </div>
                </div>
              </div>
              <div className="homepage__values-outerdiv homepage__values-outerdiv--bottom">
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
              </div>
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
};

export default AboutPage;

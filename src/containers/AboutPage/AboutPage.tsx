import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './AboutPage.scss';
/* component */
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
        const pdf = new jsPDF('p', 'px', 'a4');
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
        <section className="quotation__section">
          {/* Top div */}
          <div className="quotation__top-div">
            <div>
              <img
                alt="hinologo"
                className="quotation__logo"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Hino-logo.png/220px-Hino-logo.png"
              />
            </div>
            <div>
              <div className="quotation__top-title">
                SOON SENG MOTORS ENTERPRISE (1988) SDN BHD
                <br />
                HINO 3S DEALER KELANTAN
              </div>
              <div className="quotation__top-address">
                Lot 2776, Jalan Long Yunus, Kawasan MIEL Lundang, 15200 Kota Bharu, Kel.
              </div>
              <div className="quotation__top-contacts">
                <div className="margin_r-1">Tel: 09-741 8836</div>
                <div className="margin_r-1">Fax: 09-747 9836</div>
                <div>
                  H/P: <span className="quotation__top-contacts-highlight">016-9535780 Shahrul Reza</span>
                </div>
              </div>
            </div>
            <div>
              <img
                alt="hinologo"
                className="quotation__logo"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Hino-logo.png/220px-Hino-logo.png"
              />
            </div>
          </div>

          <div className="quotation__header-2">QUOTATION</div>
          <div className="quotation__subheader">
            We are pleased to append here with our quotation for the following commercial vehicle for your perusal
          </div>

          <section className="quotation__content-div">
            <div className="quotation__makedetail-div">
              <div className="quotation__makedetail-div-left">
                <div>Make / Model : XZC710R-WKFRL3</div>
                <div>Engine capacity : 4,009CC (EURO3)</div>
                <div>Horsepower : 156PS</div>
              </div>
              <div>
                <div>Year : 2020</div>
                <div>Wheelbase : 3500mm</div>
                <div>GVW : 7,500KG</div>
              </div>
            </div>

            <div className="quotation__price-div">
              <div className="quotation__price-unit">RM</div>
              <ol type="a" className="quotation__orderedlist">
                <li>
                  <div className="quotation__orderedlist-row--chassis quotation__orderedlist-row">
                    <div>Chassis Price : New Model Year 2020 - WKFRL3</div>
                    <div>114,500.00</div>
                  </div>
                </li>
                <li>
                  <div className="quotation__orderedlist-row">
                    <div>Body Price : 15 ft Wooden Body Cargo c/w Railing & Canvas</div>
                    <div>13,000.00</div>
                  </div>
                </li>
                <li>
                  <div className="quotation__orderedlist-row">
                    <div>Lapik Lantai Besi</div>
                    <div>1,500.00</div>
                  </div>
                </li>
                <li>
                  <div className="quotation__orderedlist-row">
                    <div>Admin fees, handling charges, weighing</div>
                    <div>500.00</div>
                  </div>
                </li>
                <li>
                  <div className="quotation__orderedlist-row">
                    <div>Signwriting & luminous sticker</div>
                    <div>250.00</div>
                  </div>
                </li>
                <li>
                  <div className="quotation__orderedlist-row">
                    <div>Weighing / Inspection Fee (Puspakom)</div>
                    <div>650.00</div>
                  </div>
                </li>
                <li>
                  <div className="quotation__orderedlist-row">
                    <div>JPJ Booking Number</div>
                    <div>325.00</div>
                  </div>
                </li>
                <li>
                  <div className="quotation__orderedlist-row">
                    <div>HQS Final Inspection</div>
                    <div>200.00</div>
                  </div>
                </li>

                <div>
                  <div className="quotation__orderedlist-row">
                    <div>SUBTOTAL</div>
                    <div>130,925.00</div>
                  </div>
                </div>

                <li>
                  <div className="quotation__orderedlist-row">
                    <div>Road tax (1 year)</div>
                    <div>1,015.00</div>
                  </div>
                </li>
                <li>
                  <div className="quotation__orderedlist-row">
                    <div>JPJ Registration & E Hak Milik</div>
                    <div>110.00</div>
                  </div>
                </li>
                <li>
                  <div className="quotation__orderedlist-row">
                    <div>INSURANCE PREMIUM (windscreen included)</div>
                    <div>4,733.96</div>
                  </div>
                </li>
              </ol>
              <div>
                <div>TOTAL PRICE</div>
                <div>136,783.96</div>
              </div>
              <div>
                <div>DISCOUNT</div>
                <div>2,783.96</div>
              </div>
              <div>
                <div>TOTAL ON THE ROAD PRICE</div>
                <div>134,000.00</div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

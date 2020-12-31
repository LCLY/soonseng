import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './QuotationPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';

/* 3rd party lib */
import { Button } from 'antd';
import moment from 'moment';
import { jsPDF } from 'jspdf';
import { Location } from 'history';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import NumberFormat from 'react-number-format';
import { RouteComponentProps, withRouter } from 'react-router-dom';
/* Util */
import warranty from 'src/img/quotation3.jpg';
import hinoconnect from 'src/img/quotation2.jpg';
import hinologo from 'src/img/quotation1.jpg';
import { TReceivedDimensionAccessoryObj } from 'src/store/types/sales';
import { TReceivedAccessoryObj, TReceivedBodyMakeObj, TReceivedLengthObj } from 'src/store/types/dashboard';

interface QuotationPageProps {}

type TIncomingLocationState = {
  grandTotalPrice: number;
  modelSubtotalPrice: number;
  lengthObj: TReceivedLengthObj;
  bodyMakeObj: TReceivedBodyMakeObj;
  generalAccessoriesArray: TReceivedAccessoryObj[];
  insuranceArray: { title: string; price: number }[];
  processingFeesArray: { title: string; price: number }[];
  bodyRelatedAccessoriesArray: TReceivedAccessoryObj[];
  dimensionRelatedAccessoriesArray: TReceivedDimensionAccessoryObj[];
};

type Props = QuotationPageProps & RouteComponentProps<{}, any, Location | any>;

const QuotationPage: React.FC<Props> = ({ location }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const {
    lengthObj,
    bodyMakeObj,
    insuranceArray,
    grandTotalPrice,
    modelSubtotalPrice,
    processingFeesArray,
    generalAccessoriesArray,
    bodyRelatedAccessoriesArray,
    dimensionRelatedAccessoriesArray,
  }: TIncomingLocationState = location.state;

  const divRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [captureRef, setCaptureRef] = useState<{ current: HTMLElement } | null>(null);

  /* ================================================== */
  /*  method */
  /* ================================================== */
  const captureHandler = () => {
    if (captureRef !== null) {
      html2canvas(captureRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        console.log(imgData);
        const pdf = new jsPDF('p', 'px', 'a4');
        // let width = pdf.internal.pageSize.getWidth();
        // let height = pdf.internal.pageSize.getHeight();
        canvas.width = document.body.clientWidth;
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, 'FAST');
        pdf.save('quotation.pdf');
        // captureRef.current.appendChild(canvas);
      });
    }
  };
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    if (divRef) {
      setCaptureRef(divRef);
    }
  }, [divRef]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent />
      <Container>
        <div className="quotation__section-outerdiv">
          <div className="quotation__button-div">
            <Button type="primary" onClick={() => captureHandler()}>
              Save as pdf
            </Button>
          </div>
          <section className="quotation__section">
            <div className="quotation__section-innerdiv" ref={divRef}>
              {/* Top div */}
              <div className="quotation__top-div">
                <div>
                  <img alt="hinologo" className="quotation__logo" src={hinologo} />
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
                  <img alt="hinoconnect" className="quotation__logo" src={hinoconnect} />
                </div>
              </div>

              <div className="quotation__header-2">QUOTATION</div>
              <div className="quotation__subheader">
                We are pleased to append here with our quotation for the following commercial vehicle for your perusal
              </div>

              <section className="quotation__content-div">
                <div className="quotation__content-innerdiv">
                  <div className="quotation__makedetail-div">
                    <div className="quotation__makedetail-div-left">
                      <div>Make / Model :&nbsp;{bodyMakeObj.make_wheelbase.make.title}</div>
                      <div>
                        Engine capacity :&nbsp;
                        {bodyMakeObj.make_wheelbase.make.engine_cap &&
                        bodyMakeObj.make_wheelbase.make.engine_cap !== '' ? (
                          bodyMakeObj.make_wheelbase.make.engine_cap
                        ) : (
                          <span className="margin_l-1"> - </span>
                        )}
                      </div>
                      <div>
                        Horsepower :&nbsp;
                        {bodyMakeObj.make_wheelbase.make.horsepower &&
                        bodyMakeObj.make_wheelbase.make.horsepower !== '' ? (
                          `${bodyMakeObj.make_wheelbase.make.horsepower}PS`
                        ) : (
                          <span className="margin_l-1"> - </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div>
                        Year :&nbsp;
                        {bodyMakeObj.make_wheelbase.make.year && bodyMakeObj.make_wheelbase.make.year !== '' ? (
                          bodyMakeObj.make_wheelbase.make.year
                        ) : (
                          <span className="margin_l-1"> - </span>
                        )}
                      </div>
                      <div>
                        Wheelbase :&nbsp;
                        {bodyMakeObj.make_wheelbase.wheelbase.title &&
                        bodyMakeObj.make_wheelbase.wheelbase.title !== '' ? (
                          `${bodyMakeObj.make_wheelbase.wheelbase.title}mm`
                        ) : (
                          <span className="margin_l-1"> - </span>
                        )}
                      </div>
                      <div>
                        GVW :&nbsp;
                        {bodyMakeObj.make_wheelbase.make.gvw && bodyMakeObj.make_wheelbase.make.gvw !== '' ? (
                          <span>
                            <NumberFormat
                              displayType={'text'}
                              thousandSeparator={true}
                              value={bodyMakeObj.make_wheelbase.make.gvw}
                            />
                            KG
                          </span>
                        ) : (
                          <span className="margin_l-1"> - </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="quotation__price-div">
                    <div className="quotation__price-unit">RM</div>
                    <ol type="a" className="quotation__orderedlist">
                      <li>
                        <div className="quotation__orderedlist-row--chassis quotation__orderedlist-row">
                          <div>
                            Chassis Price :&nbsp;
                            <span>
                              {bodyMakeObj.make_wheelbase.make.year === null
                                ? /* if year doesnt exist, dont show anything except the model name*/
                                  bodyMakeObj.make_wheelbase.make.title
                                : /* else check if year is equal to current, show "NEW MODEL YEAR CURRENTYEAR - model name"*/
                                parseInt(bodyMakeObj.make_wheelbase.make.year) === parseInt(moment().year().toString())
                                ? `NEW MODEL YEAR ${bodyMakeObj.make_wheelbase.make.year} - ${bodyMakeObj.make_wheelbase.make.title}`
                                : /* else show MODEL YEAR - model name */
                                  `MODEL ${bodyMakeObj.make_wheelbase.make.year} ${bodyMakeObj.make_wheelbase.make.title}`}
                            </span>
                          </div>
                          <div>
                            <NumberFormat
                              displayType={'text'}
                              thousandSeparator={true}
                              value={bodyMakeObj.make_wheelbase.make.price.toFixed(2)}
                            />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="quotation__orderedlist-row">
                          <div>
                            Body Price :&nbsp;<span>{`${lengthObj?.title}ft ${bodyMakeObj.body.title}`}</span>
                          </div>
                          <div>
                            <NumberFormat
                              value={bodyMakeObj.price.toFixed(2)}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </div>
                        </div>
                      </li>

                      {/* Accessories */}
                      <>
                        {generalAccessoriesArray.length > 0 &&
                          generalAccessoriesArray.map((accessory) => (
                            <li key={uuidv4()}>
                              <div className="flex space-between">
                                <span>{accessory.title} </span>
                                <span>
                                  <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    value={accessory.price.toFixed(2)}
                                  />
                                </span>
                              </div>
                            </li>
                          ))}
                      </>
                      <>
                        {bodyRelatedAccessoriesArray.length > 0 &&
                          bodyRelatedAccessoriesArray.map((accessory) => (
                            <li key={uuidv4()}>
                              <div className="flex space-between">
                                <span>{accessory.title} </span>

                                <span>
                                  <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    value={accessory.price.toFixed(2)}
                                  />
                                </span>
                              </div>
                            </li>
                          ))}
                      </>
                      <>
                        {dimensionRelatedAccessoriesArray.length > 0 &&
                          dimensionRelatedAccessoriesArray.map((dimension) => (
                            <li key={uuidv4()}>
                              <div className="flex space-between">
                                <span> {dimension.accessory.title} </span>
                                <span>
                                  <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    value={dimension.price.toFixed(2)}
                                  />
                                </span>
                              </div>
                            </li>
                          ))}
                      </>

                      {processingFeesArray.map((item) => (
                        <li key={uuidv4()}>
                          <div className="flex space-between">
                            <span>{item.title}</span>
                            <span>
                              <NumberFormat
                                value={item.price.toFixed(2)}
                                displayType={'text'}
                                thousandSeparator={true}
                              />
                            </span>
                          </div>
                        </li>
                      ))}
                      <div className="quotation__subtotal-outerdiv">
                        <span className="quotation__subtotal-text">SUBTOTAL</span>
                        <div className="quotation__subtotal-price">
                          <NumberFormat
                            value={modelSubtotalPrice.toFixed(2)}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </div>
                      </div>

                      {/* ============================ */}
                      {/* Road tax and insurance */}
                      {/* ============================ */}
                      {insuranceArray.map((insurance) => (
                        <li key={uuidv4()}>
                          <div className="flex space-between">
                            <span> {insurance.title}</span>
                            <span>
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                value={insurance.price.toFixed(2)}
                              />
                            </span>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <div className="quotation__grandtotal-outerdiv">
                      <span className="quotation__grandtotal-text">TOTAL PRICE</span>
                      <div className="quotation__grandtotal-price">
                        <NumberFormat
                          value={grandTotalPrice.toFixed(2)}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  </div>
                  {/* ========================= */}
                  {/* After Sales Programme */}
                  {/* ========================= */}
                  <div className="quotation__salesprogram-div">
                    <div>
                      <div className="quotation__salesprogram-title">After Sales Programme :</div>
                      <div>5 Years or 300,000km Warranty</div>
                      <div>3 Times Free Service Programme (1st-3rd service)</div>
                      <div className="quotation__salesprogram-contract">Hino Best FIT Service Contract</div>
                    </div>
                    <div>
                      <table className="quotation__salesprogram-table">
                        <tr>
                          <td className="quotation__salesprogram-table-left">Down Payment</td>
                          <td className="quotation__salesprogram-table-right"></td>
                        </tr>
                        <tr>
                          <td className="quotation__salesprogram-table-left">Account Finance</td>
                          <td className="quotation__salesprogram-table-right"></td>
                        </tr>
                        <tr>
                          <td className="quotation__salesprogram-table-left">Payment Period</td>
                          <td className="quotation__salesprogram-table-right"></td>
                        </tr>
                        <tr>
                          <td className="quotation__salesprogram-table-left">Months Finance</td>
                          <td className="quotation__salesprogram-table-right"></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  {/* ========================= */}
                  {/* The accessories lists */}
                  {/* ========================= */}
                  <div className="quotation__accessorieslist">
                    <div className="quotation__accessorieslist-standard">Standard accessories:</div>
                    <div className="quotation__accessorieslist-content">
                      <div>
                        <div>Air-Container</div>
                        <div>Radio CD Player</div>
                        <div>Cab Floor Mat</div>
                        <div>Mudguards</div>
                      </div>
                      <div>
                        <div>First Aid Kit</div>
                        <div>Safety Triangle</div>
                        <div>Fire Extinguisher</div>
                        <div>Tubeless tires</div>
                      </div>
                      <div>
                        <div>Rubber Mats</div>
                        <div>Alarm System</div>
                        <div>Central Locking</div>
                        <div>Kangaroo Bar</div>
                      </div>
                      <div>
                        <img className="quotation__accessorieslist-img" src={warranty} alt="warranty" />
                      </div>
                    </div>
                  </div>
                  {/* ========================= */}
                  {/* Note*/}
                  {/* ========================= */}
                  <div className="quotation__note">
                    NOTE: PRICE & SPECIFICATIONS ARE SUBJECTED TO CHANGE WITHOUT PRIOR NOTICE
                    <div className="quotation__note-date">**Price effective - Starts 1st Sept 2020</div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default withRouter(QuotationPage);

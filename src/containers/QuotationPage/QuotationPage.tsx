import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './QuotationPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
// import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';

/* 3rd party lib */
import { Button } from 'antd';
import moment from 'moment';
import { jsPDF } from 'jspdf';
import { Location } from 'history';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import NumberFormat from 'react-number-format';
import { DownloadOutlined } from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';
/* Util */
import holy5truck from 'src/img/5trucks.jpg';
import hinologo from 'src/img/quotation1.jpg';
import warranty from 'src/img/quotation3.jpg';
import hinoconnect from 'src/img/quotation2.jpg';
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
      html2canvas(captureRef.current).then((_canvas) => {
        let pdf = new jsPDF('p', 'px', 'a4');
        let pWidth = pdf.internal.pageSize.width; // 595.28 is the width of a4
        let srcWidth = captureRef.current.scrollWidth;

        let margin = 18; // narrow margin - 1.27 cm (36);
        let scale = (pWidth - margin * 2) / srcWidth;
        pdf.html(captureRef.current, {
          x: margin,
          y: margin,
          html2canvas: {
            scale: scale,
          },
          callback: function () {
            pdf.save('quotation.pdf');
          },
        });
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
      <ParallaxContainer bgImageUrl={holy5truck}>
        {/* <Container> */}
        <div className="quotation__section-outerdiv">
          <div className="quotation__button-div">
            <Button type="primary" className="quotation__button" onClick={() => captureHandler()}>
              <DownloadOutlined />
              &nbsp;Download as PDF
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
                      H/P: <span className="quotation__top-contacts-highlight">012-900 8765 Jason</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img alt="hinoconnect" className="quotation__logo" src={hinoconnect} />
                </div>
              </div>

              <div className="quotation__header-2">
                <span className="quotation__header-2-text">QUOTATION</span>
              </div>
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
                                  `${bodyMakeObj.make_wheelbase.make.title}`
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
                            <span>
                              {insurance.title.split(' ').map((word) => (
                                <React.Fragment key={uuidv4()}>{word}&nbsp;</React.Fragment>
                              ))}
                            </span>
                            {/* <span> {insurance.title}</span> */}
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
                      <div className="quotation__salesprogram-title">
                        <span>After Sales Programme :</span>
                      </div>
                      <div>5 Years or 300,000km Warranty</div>
                      <div>3 Times Free Service Programme (1st-3rd service)</div>
                      <div className="quotation__salesprogram-contract">Hino Best FIT Service Contract</div>
                    </div>
                    <div>
                      <table className="quotation__salesprogram-table">
                        <tbody>
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
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* ========================= */}
                  {/* The accessories lists */}
                  {/* ========================= */}
                  <div className="quotation__accessorieslist">
                    <div className="quotation__accessorieslist-standard">
                      <span>Standard accessories:</span>
                    </div>
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
          <section className="hiddenquotation__section">
            {/* ================================================= */}
            {/* Hidden version so that it always stays the same */}
            {/* ================================================= */}
            <div className="hiddenquotation__section-innerdiv" ref={divRef}>
              {/* Top div */}
              <div className="hiddenquotation__top-div">
                <div>
                  <img alt="hinologo" className="hiddenquotation__logo" src={hinologo} />
                </div>
                <div>
                  <div className="hiddenquotation__top-title">
                    <span>SOON&nbsp;SENG&nbsp;MOTORS&nbsp;ENTERPRISE&nbsp;(1988)&nbsp;SDN&nbsp;BHD</span>
                    <br />
                    HINO&nbsp;3S&nbsp;DEALER&nbsp;KELANTAN
                  </div>
                  <div className="hiddenquotation__top-address">
                    Lot 2776, Jalan Long Yunus, Kawasan MIEL Lundang, 15200 Kota Bharu, Kel.
                  </div>
                  <div className="hiddenquotation__top-contacts">
                    <div className="margin_r-1">Tel: 09-741 8836</div>
                    <div className="margin_r-1">Fax: 09-747 9836</div>
                    <div>
                      H/P: <span className="hiddenquotation__top-contacts-highlight">012-900 8765 Jason</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img alt="hinoconnect" className="hiddenquotation__logo" src={hinoconnect} />
                </div>
              </div>

              <div className="hiddenquotation__header-2">
                <span className="hiddenquotation__header-2-text">QUOTATION</span>
              </div>
              <div className="hiddenquotation__subheader">
                We are pleased to append here with our quotation for the following commercial vehicle for your perusal
              </div>

              <section className="hiddenquotation__content-div">
                <div className="hiddenquotation__content-innerdiv">
                  <div className="hiddenquotation__makedetail-div">
                    <div className="hiddenquotation__makedetail-div-left">
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

                  <div className="hiddenquotation__price-div">
                    <div className="hiddenquotation__price-unit">RM</div>
                    <ol type="a" className="hiddenquotation__orderedlist">
                      <li>
                        <div className="hiddenquotation__orderedlist-row--chassis hiddenquotation__orderedlist-row">
                          <div>
                            Chassis&nbsp;Price&nbsp;:&nbsp;&nbsp;
                            <span>
                              {bodyMakeObj.make_wheelbase.make.year === null
                                ? /* if year doesnt exist, dont show anything except the model name*/
                                  ` ${bodyMakeObj.make_wheelbase.make.title}`
                                : /* else check if year is equal to current, show "NEW MODEL YEAR CURRENTYEAR - model name"*/
                                parseInt(bodyMakeObj.make_wheelbase.make.year) === parseInt(moment().year().toString())
                                ? ` NEW MODEL YEAR ${bodyMakeObj.make_wheelbase.make.year} - ${bodyMakeObj.make_wheelbase.make.title}`
                                : /* else show MODEL YEAR - model name */
                                  ` MODEL ${bodyMakeObj.make_wheelbase.make.year} ${bodyMakeObj.make_wheelbase.make.title}`}
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
                        <div className="hiddenquotation__orderedlist-row">
                          <div>
                            Body&nbsp;Price&nbsp;:&nbsp;<span>{`${lengthObj?.title}ft ${bodyMakeObj.body.title}`}</span>
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
                      <div className="hiddenquotation__subtotal-outerdiv">
                        <span className="hiddenquotation__subtotal-text">SUBTOTAL</span>
                        <div className="hiddenquotation__subtotal-price">
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
                            <span>
                              {insurance.title.split(' ').map((word) => (
                                <React.Fragment key={uuidv4()}>
                                  {word === 'INSURANCE' ? <>{word}&nbsp;&nbsp;</> : <>{word}&nbsp;</>}
                                </React.Fragment>
                              ))}
                            </span>
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
                    <div className="hiddenquotation__grandtotal-outerdiv">
                      <span className="hiddenquotation__grandtotal-text">TOTAL&nbsp;PRICE</span>
                      <div className="hiddenquotation__grandtotal-price">
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
                  <div className="hiddenquotation__salesprogram-div">
                    <div>
                      <div className="hiddenquotation__salesprogram-title">
                        <span>After&nbsp;Sales&nbsp;Programme:</span>
                      </div>
                      <div>5 Years or 300,000km Warranty</div>
                      <div>3 Times Free Service Programme (1st-3rd service)</div>
                      <div className="hiddenquotation__salesprogram-contract">Hino Best FIT Service Contract</div>
                    </div>
                    <div>
                      <table className="hiddenquotation__salesprogram-table">
                        <tbody>
                          <tr>
                            <td className="hiddenquotation__salesprogram-table-left">Down&nbsp;Payment</td>
                            <td className="hiddenquotation__salesprogram-table-right"></td>
                          </tr>
                          <tr>
                            <td className="hiddenquotation__salesprogram-table-left">Account&nbsp;Finance</td>
                            <td className="hiddenquotation__salesprogram-table-right"></td>
                          </tr>
                          <tr>
                            <td className="hiddenquotation__salesprogram-table-left">Payment&nbsp;Period</td>
                            <td className="hiddenquotation__salesprogram-table-right"></td>
                          </tr>
                          <tr>
                            <td className="hiddenquotation__salesprogram-table-left">Months&nbsp;Finance</td>
                            <td className="hiddenquotation__salesprogram-table-right"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* ========================= */}
                  {/* The accessories lists */}
                  {/* ========================= */}
                  <div className="hiddenquotation__accessorieslist">
                    <div className="hiddenquotation__accessorieslist-standard">
                      <span>Standard&nbsp;Accessories:</span>
                    </div>
                    <div className="hiddenquotation__accessorieslist-content">
                      <div>
                        <div>Air-Container</div>
                        <div>Radio&nbsp;CD&nbsp;Player</div>
                        <div>Cab&nbsp;Floor&nbsp;Mat</div>
                        <div>Mudguards</div>
                      </div>
                      <div>
                        <div>First&nbsp;Aid&nbsp;Kit</div>
                        <div>Safety&nbsp;Triangle</div>
                        <div>Fire&nbsp;Extinguisher</div>
                        <div>Tubeless&nbsp;tires</div>
                      </div>
                      <div>
                        <div>Rubber&nbsp;Mats</div>
                        <div>Alarm&nbsp;System</div>
                        <div>Central&nbsp;Locking</div>
                        <div>Kangaroo&nbsp;Bar</div>
                      </div>
                      <div>
                        <img className="hiddenquotation__accessorieslist-img" src={warranty} alt="warranty" />
                      </div>
                    </div>
                  </div>
                  {/* ========================= */}
                  {/* Note*/}
                  {/* ========================= */}
                  <div className="hiddenquotation__note">
                    NOTE:&nbsp;PRICE&nbsp;&&nbsp;SPECIFICATIONS&nbsp;ARE&nbsp;SUBJECTED&nbsp;TO&nbsp;CHANGE&nbsp;WITHOUT&nbsp;PRIOR&nbsp;NOTICE
                    <div className="hiddenquotation__note-date">**Price effective - Starts 1st Sept 2020</div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
        {/* </Container> */}
      </ParallaxContainer>
      <Footer />
    </>
  );
};

export default withRouter(QuotationPage);

import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './QuotationPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
// import Container from 'src/components/CustomContainer/CustomContainer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';

/* 3rd party lib */
import axios from 'axios';
import moment from 'moment';
import { jsPDF } from 'jspdf';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { Menu, Dropdown, Modal, Form } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { DownloadOutlined, CaretDownOutlined } from '@ant-design/icons';
/* Util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
// import hinologo from 'src/img/quotation1.jpg';
import warranty from 'src/img/quotation3.jpg';
// import hinoconnect from 'src/img/quotation2.jpg';
import { ROUTE_NOT_FOUND } from 'src/shared/routes';
import { convertPriceToFloat, handleKeyDown } from 'src/shared/Utils';
import { TReceivedAccessoryObj, TReceivedBrandObj } from 'src/store/types/dashboard';
import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';

interface MatchParams {
  order_id: string;
  discount: string;
}

interface QuotationPageProps {}

type Props = QuotationPageProps & StateProps & RouteComponentProps<MatchParams, any, any>;

const QuotationPage: React.FC<Props> = ({ match, localOrdersArray }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const divRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { width } = useWindowDimensions();
  const [currentBrandObj, setCurrentBrandObj] = useState<TReceivedBrandObj | null>(null);
  const [updateRoadtaxForm] = Form.useForm();
  const [newRoadTax, setNewRoadTax] = useState(0);
  const [showRoadtaxModal, setShowRoadtaxModal] = useState(false);
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
          y: 0,
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
  /*  component */
  /* ================================================== */

  const QuotationMenu = () => (
    <Menu className="catalog__menu">
      <Menu.Item className="catalog__menu-item" onClick={() => captureHandler()}>
        <DownloadOutlined style={{ margin: 0 }} />
        &nbsp;&nbsp;Download as PDF
      </Menu.Item>
      <Menu.Item className="catalog__menu-item" onClick={() => setShowRoadtaxModal(true)}>
        <i className="fas fa-edit" />
        &nbsp;&nbsp;Edit Road Tax
      </Menu.Item>
    </Menu>
  );

  // separating the component out so we can change the classNames

  const QuotationComponent = (props: { hidden: string }) => {
    const { hidden = '' } = props;

    if (bodyMakeObj === null || currentBrandObj === null) return null;
    let filteredLeftImage = currentBrandObj.images.filter((image) => image.tag === 'Brand Top Left');
    let leftImageUrl = '';
    if (filteredLeftImage.length > 0) {
      leftImageUrl = filteredLeftImage[0].url;
    }
    let filteredRightImage = currentBrandObj.images.filter((image) => image.tag === 'Brand Top Right');
    let rightImageUrl = '';
    if (filteredRightImage.length > 0) {
      rightImageUrl = filteredRightImage[0].url;
    }
    return (
      <>
        {bodyMakeObj && (
          <section className={`${hidden}quotation__section`}>
            <div className={`${hidden}quotation__section-innerdiv`} ref={hidden === 'hidden' ? divRef : null}>
              {/* Top div */}
              <div className={`${hidden}quotation__top-div`}>
                <div>
                  {leftImageUrl !== '' && (
                    <img alt="leftlogo" className={`${hidden}quotation__logo`} src={leftImageUrl} />
                  )}
                </div>
                <div>
                  <div className={`${hidden}quotation__top-title`}>
                    SOON&nbsp;SENG&nbsp;MOTORS&nbsp;ENTERPRISE&nbsp;(1988)&nbsp;SDN&nbsp;BHD
                    <br />
                    HINO&nbsp;3S&nbsp;DEALER&nbsp;KELANTAN
                  </div>
                  <div className={`${hidden}quotation__top-address`}>
                    Lot 2776, Jalan Long Yunus, Kawasan MIEL Lundang, 15200 Kota Bharu, Kel.
                  </div>
                  <div className={`${hidden}quotation__top-contacts`}>
                    <div className="margin_r-1">Tel: 09-741 8836</div>
                    <div className="margin_r-1">Fax: 09-747 9836</div>
                    <div>
                      H/P: <span className={`${hidden}quotation__top-contacts-highlight`}>012-900 8765 Jason</span>
                    </div>
                  </div>
                </div>
                <div>
                  {rightImageUrl !== '' && (
                    <img alt="rightlogo" className={`${hidden}quotation__logo`} src={rightImageUrl} />
                  )}
                </div>
              </div>

              <div className={`${hidden}quotation__header-2`}>
                <span className={`${hidden}quotation__header-2-text`}>QUOTATION</span>
              </div>
              <div className={`${hidden}quotation__subheader`}>
                We are pleased to append here with our quotation for the following commercial vehicle for your perusal
              </div>

              <section className={`${hidden}quotation__content-div`}>
                <div className={`${hidden}quotation__content-innerdiv`}>
                  <div className={`${hidden}quotation__makedetail-div`}>
                    <div className={`${hidden}quotation__makedetail-div-left`}>
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

                  <div className={`${hidden}quotation__price-div`}>
                    <div className={`${hidden}quotation__price-unit`}>RM</div>
                    <ol type="a" className={`${hidden}quotation__orderedlist`}>
                      <li>
                        <div className={`${hidden}quotation__orderedlist-row--chassis quotation__orderedlist-row`}>
                          <div>
                            Chassis&nbsp;Price&nbsp;:&nbsp;
                            <span>
                              <>
                                {bodyMakeObj.make_wheelbase.make.year === null
                                  ? /* if year doesnt exist, dont show anything except the model name*/
                                    `${bodyMakeObj.make_wheelbase.make.title}`
                                  : /* else check if year is equal to current, show "NEW MODEL YEAR CURRENTYEAR - model name"*/
                                  parseInt(bodyMakeObj.make_wheelbase.make.year) ===
                                    parseInt(moment().format('YYYY').toString())
                                  ? `NEW MODEL YEAR ${bodyMakeObj.make_wheelbase.make.year} - ${bodyMakeObj.make_wheelbase.make.title}`
                                  : /* else show MODEL YEAR - model name */
                                    `MODEL ${bodyMakeObj.make_wheelbase.make.year} ${bodyMakeObj.make_wheelbase.make.title}`}
                              </>
                            </span>
                          </div>
                          <div>
                            <>
                              {bodyMakeObj.make_wheelbase.make.price && bodyMakeObj.make_wheelbase.make.price !== 0 ? (
                                <NumberFormat
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  value={bodyMakeObj.make_wheelbase.make.price.toFixed(2)}
                                />
                              ) : (
                                <span className="sales__overview-dash">-</span>
                              )}
                            </>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className={`${hidden}quotation__orderedlist-row`}>
                          <div>
                            Body Price :&nbsp;
                            <span>{`${lengthObj && lengthObj?.title}ft ${bodyMakeObj.body.title}`}</span>
                          </div>
                          <div>
                            <>
                              {bodyMakeObj.price && bodyMakeObj.price !== 0 ? (
                                <NumberFormat
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  value={bodyMakeObj.price.toFixed(2)}
                                />
                              ) : (
                                <span className="sales__overview-dash">-</span>
                              )}
                            </>
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
                                  {accessory.price && accessory.price !== 0 ? (
                                    <NumberFormat
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      value={accessory.price.toFixed(2)}
                                    />
                                  ) : (
                                    <span className="sales__overview-dash">-</span>
                                  )}
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
                                  {accessory.price && accessory.price !== 0 ? (
                                    <NumberFormat
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      value={accessory.price.toFixed(2)}
                                    />
                                  ) : (
                                    <span className="sales__overview-dash">-</span>
                                  )}
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
                                  {dimension.price && dimension.price !== 0 ? (
                                    <NumberFormat
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      value={dimension.price.toFixed(2)}
                                    />
                                  ) : (
                                    <span className="sales__overview-dash">-</span>
                                  )}
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
                      <div className={`${hidden}quotation__subtotal-outerdiv`}>
                        <span className={`${hidden}quotation__subtotal-text`}>SUBTOTAL</span>
                        <div className={`${hidden}quotation__subtotal-price`}>
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
                                  {/* only apply this on the hidden quotation */}
                                  {word === 'INSURANCE' && hidden === 'hidden' && width <= 576 ? (
                                    <>{word}&nbsp;&nbsp;</>
                                  ) : (
                                    <>{word}&nbsp;</>
                                  )}
                                </React.Fragment>
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
                    {match.params.discount ? (
                      <>
                        <div className={`${hidden}quotation__grandtotal-outerdiv--discount`}>
                          <span className={`${hidden}quotation__grandtotal-text`}>TOTAL PRICE</span>
                          <div className={`${hidden}quotation__grandtotal-price--discount`}>
                            <NumberFormat
                              value={grandTotalPrice.toFixed(2)}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </div>
                        </div>
                        <div
                          className={`${hidden}quotation__grandtotal-outerdiv ${hidden}quotation__grandtotal-outerdiv--discount`}
                        >
                          <span className={`${hidden}quotation__discount-text`}>DISCOUNT</span>
                          <div style={{ fontWeight: 'normal' }}>
                            -&nbsp;
                            <NumberFormat
                              value={parseFloat(match.params.discount.toString()).toFixed(2)}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </div>
                        </div>
                        <div className={`${hidden}quotation__grandtotal-outerdiv`}>
                          <span className={`${hidden}quotation__grandtotal-text`}>TOTAL ON THE ROAD PRICE</span>
                          <div className={`${hidden}quotation__grandtotal-price`}>
                            <NumberFormat
                              value={(grandTotalPrice - parseFloat(match.params.discount.toString())).toFixed(2)}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className={`${hidden}quotation__grandtotal-outerdiv`}>
                        <span className={`${hidden}quotation__grandtotal-text`}>TOTAL PRICE</span>
                        <div className={`${hidden}quotation__grandtotal-price`}>
                          <NumberFormat
                            value={grandTotalPrice.toFixed(2)}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* ========================= */}
                  {/* After Sales Programme */}
                  {/* ========================= */}
                  <div className={`${hidden}quotation__salesprogram-div`}>
                    <div>
                      <div className={`${hidden}quotation__salesprogram-title`}>
                        <span>After&nbsp;Sales&nbsp;Programme:</span>
                      </div>
                      <div>5 Years or 300,000km Warranty</div>
                      <div>3 Times Free Service Programme (1st-3rd service)</div>
                      <div className={`${hidden}quotation__salesprogram-contract`}>Hino Best FIT Service Contract</div>
                    </div>
                    <div>
                      <table className={`${hidden}quotation__salesprogram-table`}>
                        <tbody>
                          <tr>
                            <td className={`${hidden}quotation__salesprogram-table-left`}>Down&nbsp;Payment</td>
                            <td className={`${hidden}quotation__salesprogram-table-right`}></td>
                          </tr>
                          <tr>
                            <td className={`${hidden}quotation__salesprogram-table-left`}>Account&nbsp;Finance</td>
                            <td className={`${hidden}quotation__salesprogram-table-right`}></td>
                          </tr>
                          <tr>
                            <td className={`${hidden}quotation__salesprogram-table-left`}>Payment&nbsp;Period</td>
                            <td className={`${hidden}quotation__salesprogram-table-right`}></td>
                          </tr>
                          <tr>
                            <td className={`${hidden}quotation__salesprogram-table-left`}>Months&nbsp;Finance</td>
                            <td className={`${hidden}quotation__salesprogram-table-right`}></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* ========================= */}
                  {/* The accessories lists */}
                  {/* ========================= */}
                  <div className={`${hidden}quotation__accessorieslist`}>
                    <div className={`${hidden}quotation__accessorieslist-standard`}>
                      <span>Standard&nbsp;Accessories:</span>
                    </div>
                    <div className={`${hidden}quotation__accessorieslist-content`}>
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
                        <img className={`${hidden}quotation__accessorieslist-img`} src={warranty} alt="warranty" />
                      </div>
                    </div>
                  </div>
                  {/* ========================= */}
                  {/* Note*/}
                  {/* ========================= */}
                  <div className={`${hidden}quotation__note`}>
                    NOTE:&nbsp;PRICE&nbsp;&&nbsp;SPECIFICATIONS&nbsp;ARE&nbsp;SUBJECTED&nbsp;TO&nbsp;CHANGE&nbsp;WITHOUT&nbsp;PRIOR&nbsp;NOTICE
                    <div className={`${hidden}quotation__note-date`}>
                      **Price&nbsp;effective&nbsp;-&nbsp;Starts&nbsp;1st&nbsp;Sept&nbsp;2020
                    </div>
                    <div className={`${hidden}quotation__note-date`}>
                      **This&nbsp;quotation&nbsp;is&nbsp;only&nbsp;valid&nbsp;until&nbsp;
                      <span style={{ color: 'rgb(131, 14, 14)' }}>{moment().add(1, 'M').format('YYYY-MM-DD')}</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        )}
      </>
    );
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    if (localOrdersArray === undefined) return;
    let selectedOrder = localOrdersArray.filter((order) => order.id === match.params.order_id)[0];

    axios
      .get(`${process.env.REACT_APP_API}/head/brands/${selectedOrder.bodyMakeObj?.make_wheelbase.make.brand.id}`)
      .then((res) => {
        setCurrentBrandObj(res.data.brand);
      })
      .catch((err) => console.log(err));
  }, [match.params.order_id, localOrdersArray]);

  useEffect(() => {
    if (divRef) {
      setCaptureRef(divRef);
    }
  }, [divRef]);

  /* ================================================== */
  /* ================================================== */
  if (localOrdersArray === undefined) {
    return null;
  }
  const quotationOrder = localOrdersArray.filter((order) => order.id === match.params.order_id)[0];

  // quotaton Order can be undefined because of the wrong order id being passed into the filter
  // redirect to page not found

  if (quotationOrder === undefined) {
    window.location.href = ROUTE_NOT_FOUND;
  }

  const {
    lengthObj,
    bodyMakeObj,
    generalAccessoriesArray,
    bodyRelatedAccessoriesArray,
    dimensionRelatedAccessoriesArray,
  }: TLocalOrderObj = quotationOrder;

  let processingFeesArray = [
    {
      title: 'Admin fees, handling charges, weighing',
      price: 500,
    },
    {
      title: 'Signwriting & luminous sticker',
      price: 250,
    },
    {
      title: 'Weighing / Inspection Fee (Puspakom)',
      price: 650,
    },
    {
      title: 'JPJ Booking Number',
      price: 325,
    },
    {
      title: 'HQS Final Inspection',
      price: 200,
    },
  ];

  let totalAccessoriesPrice = 0;

  // get total of general accessories
  let generalAccessoriesTotalPrice = generalAccessoriesArray.reduce(
    (currentTotal: number, accessoryObj: TReceivedAccessoryObj) => {
      return currentTotal + accessoryObj.price;
    },
    0,
  );

  // get total of body related accessories
  let bodyRelatedAccessoriesTotalPrice = bodyRelatedAccessoriesArray.reduce(
    (currentTotal: number, accessoryObj: TReceivedAccessoryObj) => {
      return currentTotal + accessoryObj.price;
    },
    0,
  );
  // get total of dimension related accessories
  let dimensionRelatedAccessoriesTotalPrice = dimensionRelatedAccessoriesArray.reduce(
    (currentTotal: number, dimensionAccessoryObj: TReceivedDimensionAccessoryObj) => {
      return currentTotal + dimensionAccessoryObj.price;
    },
    0,
  );

  totalAccessoriesPrice =
    generalAccessoriesTotalPrice + bodyRelatedAccessoriesTotalPrice + dimensionRelatedAccessoriesTotalPrice;

  type miscellaneousType = {
    title: string;
    price: number;
  };

  let processingFees = processingFeesArray.reduce((currentTotal: number, processingFeeObj: miscellaneousType) => {
    return currentTotal + processingFeeObj.price;
  }, 0);

  let modelSubtotalPrice = 0;
  if (bodyMakeObj && bodyMakeObj) {
    modelSubtotalPrice =
      bodyMakeObj.make_wheelbase.make.price + bodyMakeObj.price + totalAccessoriesPrice + processingFees;
  }

  let tempModelSubtotalPrice = modelSubtotalPrice;
  tempModelSubtotalPrice = (tempModelSubtotalPrice * 95) / 100;
  let roundedModelSubtotalPrice = -Math.round(-tempModelSubtotalPrice / 1000) * 1000;
  roundedModelSubtotalPrice = (roundedModelSubtotalPrice - 1000) * 0.0325 + 441.8;
  roundedModelSubtotalPrice = roundedModelSubtotalPrice * 1.06 + 235;

  type insuranceType = {
    title: string;
    price: number;
  };

  let insuranceArray = [
    {
      title: 'Road tax (1year)',
      price: newRoadTax !== 0 ? newRoadTax : 1015,
    },
    {
      title: 'JPJ Registration & E Hak Milik',
      price: 110,
    },
    {
      title: 'INSURANCE PREMIUM (windscreen included)',
      price: roundedModelSubtotalPrice,
    },
  ];

  let insuranceSubtotalPrice = insuranceArray.reduce((currentTotal: number, insuranceObj: insuranceType) => {
    return currentTotal + insuranceObj.price;
  }, 0);

  let grandTotalPrice = modelSubtotalPrice + insuranceSubtotalPrice;

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* Modal */}
      <Modal
        centered
        title="Edit Road Tax"
        onOk={() => {
          setShowRoadtaxModal(false);
          updateRoadtaxForm.submit();
        }}
        visible={showRoadtaxModal}
        onCancel={() => setShowRoadtaxModal(false)}
      >
        <Form
          form={updateRoadtaxForm}
          onKeyDown={(e) => {
            handleKeyDown(e, updateRoadtaxForm);
            if (e.key === 'Enter') {
              setShowRoadtaxModal(false);
            }
          }}
          onFinish={(values: { roadtax: string }) => setNewRoadTax(convertPriceToFloat(values.roadtax))}
        >
          <Form.Item
            className="make__form-item"
            label="Road Tax"
            name="roadtax"
            rules={[{ required: false, message: 'Input price here!' }]}
          >
            <NumberFormat className="ant-input" placeholder="Type price here" thousandSeparator={true} prefix={'RM '} />
          </Form.Item>
        </Form>
      </Modal>
      <NavbarComponent />
      <ParallaxContainer bgImageUrl={holy5truck}>
        {/* <Container> */}
        <div className="quotation__section-outerdiv">
          <div className="quotation__button-div">
            <Dropdown overlay={<QuotationMenu />} trigger={['click']}>
              <div className="quotation__button">
                More Options <CaretDownOutlined />
              </div>
            </Dropdown>
          </div>

          {currentBrandObj ? (
            <>
              <QuotationComponent hidden="" />
              <QuotationComponent hidden="hidden" />
            </>
          ) : (
            <div className="catalog__loading-div">
              <Ripple />
            </div>
          )}
        </div>
        {/* </Container> */}
      </ParallaxContainer>
      <Footer />
    </>
  );
};

interface StateProps {
  localOrdersArray?: TLocalOrderObj[];
}

const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    localOrdersArray: state.sales.localOrdersArray,
  };
};

export default connect(mapStateToProps, null)(withRouter(QuotationPage));

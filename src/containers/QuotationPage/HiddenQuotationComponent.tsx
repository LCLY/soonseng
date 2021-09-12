import React, { useRef, useEffect, MutableRefObject } from 'react';
import './QuotationPage.scss';
/* components */
/* 3rd party lib */
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import { RouteComponentProps, withRouter } from 'react-router-dom';
/* Util */
import warranty from 'src/img/quotation3.jpg';
import { TUserAccess } from 'src/store/types/auth';
import { IInsurance, TLocalOrderObj } from 'src/store/types/sales';
import { TReceivedBrandObj, TReceivedChargesFeesObj } from 'src/store/types/dashboard';

// this component is for the hidden/ready to be printed
interface HiddenQuotationComponentProps {
  width: number;
  setCaptureRef: React.Dispatch<
    React.SetStateAction<{
      current: HTMLElement;
    } | null>
  >;
  accessObj: TUserAccess | undefined;
  currentBrandObj: TReceivedBrandObj;
  quotationOrder: TLocalOrderObj;
  brandsArray?: TReceivedBrandObj[] | null;
}

interface MatchParams {
  order_id: string;
}

type Props = HiddenQuotationComponentProps & RouteComponentProps<MatchParams, any, any>;

const HiddenQuotationComponent: React.FC<Props> = ({ width, currentBrandObj, quotationOrder, setCaptureRef }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const divRef = useRef() as MutableRefObject<HTMLDivElement>;
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    if (divRef) {
      setCaptureRef(divRef);
    }
  }, [divRef, setCaptureRef]);
  /* ================================================== */
  /* ================================================== */

  if (quotationOrder.bodyMakeObj === null || currentBrandObj === null) return null;
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

  let totalAccessoriesPrice = 0;

  // get the total price from all accessories array
  const getTotalPrice = (accessoriesArray: any) => {
    return Object.values(accessoriesArray).reduce((currentTotal: number, accessoryObj: any) => {
      return currentTotal + accessoryObj.price;
    }, 0);
  };

  let generalAccessoriesTotalPrice = getTotalPrice(quotationOrder.generalAccessoriesArray);
  let bodyRelatedAccessoriesTotalPrice = getTotalPrice(quotationOrder.bodyRelatedAccessoriesArray);
  let dimensionRelatedAccessoriesTotalPrice = getTotalPrice(quotationOrder.dimensionRelatedAccessoriesArray);

  totalAccessoriesPrice =
    generalAccessoriesTotalPrice + bodyRelatedAccessoriesTotalPrice + dimensionRelatedAccessoriesTotalPrice;

  let processingFees = Object.values(quotationOrder.chargesFeesDict).reduce(
    (currentTotal: number, processingFeeObj: TReceivedChargesFeesObj) => {
      return currentTotal + processingFeeObj.price;
    },
    0,
  );

  let modelSubtotalPrice = 0;
  if (quotationOrder.bodyMakeObj) {
    const { bodyMakeObj } = quotationOrder;
    modelSubtotalPrice =
      bodyMakeObj.make_wheelbase.make.price +
      bodyMakeObj.price +
      bodyMakeObj.make_wheelbase.price +
      totalAccessoriesPrice +
      processingFees;
  }

  if (quotationOrder.insuranceDict === null) return null;
  let insuranceSubtotalPrice = Object.values(quotationOrder.insuranceDict).reduce(
    (currentTotal: number, insuranceObj: IInsurance) => {
      return currentTotal + insuranceObj.price;
    },
    0,
  );

  let grandTotalPrice = modelSubtotalPrice + insuranceSubtotalPrice;

  const {
    hpNumber,
    discount,
    lengthObj,
    bodyMakeObj,
    insuranceDict,
    chargesFeesDict,
    afterSalesStrings,
    currentDate,
    standardAccessories,
    generalAccessoriesArray,
    bodyRelatedAccessoriesArray,
    dimensionRelatedAccessoriesArray,
  } = quotationOrder;
  if (bodyMakeObj === null || lengthObj === null) return null;

  return (
    <>
      <section className={`hiddenquotation__section`}>
        <div className={`hiddenquotation__section-innerdiv`} ref={divRef}>
          {/* Top div */}
          <div className={`hiddenquotation__top-div`}>
            <div>
              {leftImageUrl !== '' && (
                <img alt="leftlogo" className={`hiddenquotation__logo`} src={leftImageUrl} crossOrigin="anonymous" />
              )}
            </div>
            <div>
              <div className={`hiddenquotation__top-title`}>
                SOON&nbsp;SENG&nbsp;MOTORS&nbsp;ENTERPRISE&nbsp;(1988)&nbsp;SDN&nbsp;BHD
                <br />
                HINO&nbsp;3S&nbsp;DEALER&nbsp;KELANTAN
              </div>
              <div className={`hiddenquotation__top-address`}>
                Lot 2776, Jalan Long Yunus, Kawasan MIEL Lundang, 15200 Kota Bharu, Kel.
              </div>
              <div className={`hiddenquotation__top-contacts`}>
                <div className="margin_r-1">Tel: 09-741 8836</div>
                <div className="margin_r-1">Fax: 09-747 9836</div>
                <div>
                  H/P: <span className={`hiddenquotation__top-contacts-highlight`}>{hpNumber}</span>
                </div>
              </div>
            </div>
            <div>
              {rightImageUrl !== '' && (
                <img alt="rightlogo" className={`hiddenquotation__logo`} src={rightImageUrl} crossOrigin="anonymous" />
              )}
            </div>
          </div>

          <div className={`hiddenquotation__header-2`}>
            <span className={`hiddenquotation__header-2-text`}>QUOTATION</span>
          </div>
          <div className={`hiddenquotation__subheader`}>
            We are pleased to append here with our quotation for the following commercial vehicle for your perusal
          </div>

          <section className={`hiddenquotation__content-div`}>
            <div className={`hiddenquotation__content-innerdiv`}>
              <div className={`hiddenquotation__makedetail-div`}>
                <div className={`hiddenquotation__makedetail-div-left`}>
                  <div>Make / Model :&nbsp;{bodyMakeObj.make_wheelbase.make.title}</div>
                  <div>
                    Engine capacity :&nbsp;
                    {bodyMakeObj.make_wheelbase.make.engine_cap && bodyMakeObj.make_wheelbase.make.engine_cap !== '' ? (
                      bodyMakeObj.make_wheelbase.make.engine_cap
                    ) : (
                      <span className="margin_l-1"> - </span>
                    )}
                  </div>
                  <div>
                    Horsepower :&nbsp;
                    {bodyMakeObj.make_wheelbase.make.horsepower && bodyMakeObj.make_wheelbase.make.horsepower !== '' ? (
                      `${bodyMakeObj.make_wheelbase.make.horsepower}PS`
                    ) : (
                      <span className="margin_l-1"> - </span>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    Year :&nbsp;
                    {bodyMakeObj.make_wheelbase.make.year &&
                    bodyMakeObj.make_wheelbase.make.year !== '' &&
                    bodyMakeObj.make_wheelbase.make.year !== undefined &&
                    bodyMakeObj.make_wheelbase.make.year.toLowerCase() !== 'Invalid Date'.toLowerCase() ? (
                      bodyMakeObj.make_wheelbase.make.year
                    ) : (
                      <span className="margin_l-1"> - </span>
                    )}
                  </div>
                  <div>
                    Wheelbase :&nbsp;
                    {bodyMakeObj.make_wheelbase.wheelbase.title && bodyMakeObj.make_wheelbase.wheelbase.title !== '' ? (
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

              <div>
                <div className={`hiddenquotation__price-div`}>
                  <div className={`hiddenquotation__price-unit`}>RM</div>
                  <div>
                    <ol type="a" className={`hiddenquotation__orderedlist`}>
                      <li>
                        <div className={`hiddenquotation__orderedlist-row--chassis quotation__orderedlist-row`}>
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
                                  ? `NEW MODEL YEAR ${
                                      bodyMakeObj.make_wheelbase.make.year &&
                                      bodyMakeObj.make_wheelbase.make.year !== '' &&
                                      bodyMakeObj.make_wheelbase.make.year !== undefined &&
                                      bodyMakeObj.make_wheelbase.make.year.toLowerCase() !==
                                        'Invalid date'.toLowerCase()
                                        ? bodyMakeObj.make_wheelbase.make.year
                                        : ''
                                    } - ${bodyMakeObj.make_wheelbase.make.title}`
                                  : /* else show MODEL YEAR - model name */
                                    `MODEL ${
                                      bodyMakeObj.make_wheelbase.make.year &&
                                      bodyMakeObj.make_wheelbase.make.year !== '' &&
                                      bodyMakeObj.make_wheelbase.make.year !== undefined &&
                                      bodyMakeObj.make_wheelbase.make.year.toLowerCase() !==
                                        'Invalid date'.toLowerCase()
                                        ? bodyMakeObj.make_wheelbase.make.year
                                        : ''
                                    } ${bodyMakeObj.make_wheelbase.make.title}`}
                              </>
                            </span>
                          </div>
                          <div>
                            <>
                              {bodyMakeObj.make_wheelbase.make.price && bodyMakeObj.make_wheelbase.make.price !== 0 ? (
                                <>
                                  <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    value={bodyMakeObj.make_wheelbase.make.price.toFixed(2)}
                                  />
                                </>
                              ) : (
                                <span className="sales__overview-dash">-</span>
                              )}
                            </>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className={`hiddenquotation__orderedlist-row`}>
                          <div>
                            Body Price :&nbsp;
                            <span>{`${lengthObj && lengthObj?.title}ft ${bodyMakeObj.body.title}`}</span>
                          </div>
                          <div>
                            <>
                              {bodyMakeObj.price && bodyMakeObj.price !== 0 ? (
                                <>
                                  <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    value={bodyMakeObj.price.toFixed(2)}
                                  />
                                </>
                              ) : (
                                <span className="sales__overview-dash">-</span>
                              )}
                            </>
                          </div>
                        </div>
                      </li>
                      {!bodyMakeObj.make_wheelbase.original && bodyMakeObj.make_wheelbase.price !== 0 && (
                        <li>
                          <div className={`hiddenquotation__orderedlist-row`}>
                            <div>UBS Extension Price</div>
                            <div>
                              <>
                                {bodyMakeObj.make_wheelbase.price && bodyMakeObj.make_wheelbase.price !== 0 ? (
                                  <>
                                    <NumberFormat
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      value={bodyMakeObj.make_wheelbase.price.toFixed(2)}
                                    />
                                  </>
                                ) : (
                                  <span className="sales__overview-dash">-</span>
                                )}
                              </>
                            </div>
                          </div>
                        </li>
                      )}

                      {/* Accessories */}
                      <>
                        {Object.keys(generalAccessoriesArray).length > 0 &&
                          Object.values(generalAccessoriesArray).map((accessory) => (
                            <li key={uuidv4()}>
                              <div className="flex space-between">
                                <span>{accessory.title} </span>
                                <span>
                                  {accessory.price && accessory.price !== 0 ? (
                                    <>
                                      <NumberFormat
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        value={accessory.price.toFixed(2)}
                                      />
                                    </>
                                  ) : (
                                    <span className="sales__overview-dash">-</span>
                                  )}
                                </span>
                              </div>
                            </li>
                          ))}
                      </>
                      <>
                        {Object.keys(bodyRelatedAccessoriesArray).length > 0 &&
                          Object.values(bodyRelatedAccessoriesArray).map((accessory) => (
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
                        {Object.keys(dimensionRelatedAccessoriesArray).length > 0 &&
                          Object.values(dimensionRelatedAccessoriesArray).map((dimension) => (
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

                      {Object.values(chargesFeesDict).map((item) => (
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
                      <div className={`hiddenquotation__subtotal-outerdiv`}>
                        <span className={`hiddenquotation__subtotal-text`}>SUBTOTAL</span>
                        <div className={`hiddenquotation__subtotal-price`}>
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
                      {Object.values(insuranceDict).map((insurance) => (
                        <li key={uuidv4()}>
                          <div className="flex space-between">
                            <span>
                              {insurance.title.split(' ').map((word) => (
                                <React.Fragment key={uuidv4()}>
                                  {/* only apply this on the hidden quotation */}
                                  {word === 'INSURANCE' && width <= 576 ? <>{word}&nbsp;&nbsp;</> : <>{word}&nbsp;</>}
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
                  </div>
                  {discount ? (
                    <>
                      <div className={`hiddenquotation__grandtotal-outerdiv--discount`}>
                        <span className={`hiddenquotation__grandtotal-text`}>TOTAL PRICE</span>
                        <div className={`hiddenquotation__grandtotal-price--discount`}>
                          <NumberFormat
                            value={grandTotalPrice.toFixed(2)}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </div>
                      </div>
                      <div
                        className={`hiddenquotation__grandtotal-outerdiv hiddenquotation__grandtotal-outerdiv--discount`}
                      >
                        <span className={`hiddenquotation__discount-text`}>DISCOUNT</span>
                        <div style={{ fontWeight: 'normal' }}>
                          -&nbsp;
                          <NumberFormat
                            value={parseFloat(discount.toString()).toFixed(2)}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </div>
                      </div>
                      <div className={`hiddenquotation__grandtotal-outerdiv`}>
                        <span className={`hiddenquotation__grandtotal-text`}>TOTAL ON THE ROAD PRICE</span>
                        <div className={`hiddenquotation__grandtotal-price`}>
                          <NumberFormat
                            value={(grandTotalPrice - parseFloat(discount.toString())).toFixed(2)}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={`hiddenquotation__grandtotal-outerdiv`}>
                      <span className={`hiddenquotation__grandtotal-text`}>TOTAL PRICE</span>
                      <div className={`hiddenquotation__grandtotal-price`}>
                        <NumberFormat
                          value={grandTotalPrice.toFixed(2)}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* ========================= */}
              {/* After Sales Programme */}
              {/* ========================= */}
              <div className={`hiddenquotation__salesprogram-div`}>
                <div>
                  <div className={`hiddenquotation__salesprogram-title`}>
                    <span>After&nbsp;Sales&nbsp;Programme:</span>
                  </div>
                  <div>{afterSalesStrings.line_1}</div>
                  <div>{afterSalesStrings.line_2}</div>
                  <div className={`hiddenquotation__salesprogram-contract`}>{afterSalesStrings.line_3}</div>
                </div>
                <div>
                  <table className={`hiddenquotation__salesprogram-table`}>
                    <tbody>
                      <tr>
                        <td className={`hiddenquotation__salesprogram-table-left`}>Down&nbsp;Payment</td>
                        <td className={`hiddenquotation__salesprogram-table-right`}></td>
                      </tr>
                      <tr>
                        <td className={`hiddenquotation__salesprogram-table-left`}>Account&nbsp;Finance</td>
                        <td className={`hiddenquotation__salesprogram-table-right`}></td>
                      </tr>
                      <tr>
                        <td className={`hiddenquotation__salesprogram-table-left`}>Payment&nbsp;Period</td>
                        <td className={`hiddenquotation__salesprogram-table-right`}></td>
                      </tr>
                      <tr>
                        <td className={`hiddenquotation__salesprogram-table-left`}>Months&nbsp;Finance</td>
                        <td className={`hiddenquotation__salesprogram-table-right`}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* ========================= */}
              {/* The accessories lists */}
              {/* ========================= */}
              <div className={`hiddenquotation__accessorieslist`}>
                <div className={`hiddenquotation__accessorieslist-standard`}>
                  <span>Standard&nbsp;Accessories:</span>
                </div>
                <div className={`hiddenquotation__accessorieslist-content`}>
                  <div
                    className={`hiddenquotation__accessorieslist-content-grid`}
                    style={{
                      gridTemplateColumns:
                        currentBrandObj.images.filter((child) => child.tag === 'Warranty').length > 0
                          ? 'repeat(3, 1fr)'
                          : 'repeat(4, 1fr)',
                    }} //change the grid column numbers depending on if warranty image exist
                  >
                    {standardAccessories.map((acc) => (
                      <div key={`hiddenquotation${acc}`}>{acc}</div>
                    ))}
                  </div>
                  <div>
                    <img className={`hiddenquotation__accessorieslist-img`} src={warranty} alt="warranty" />
                  </div>
                </div>
              </div>
              {/* ========================= */}
              {/* Note*/}
              {/* ========================= */}
              <div className={`hiddenquotation__note`}>
                NOTE:&nbsp;PRICE&nbsp;&&nbsp;SPECIFICATIONS&nbsp;ARE&nbsp;SUBJECTED&nbsp;TO&nbsp;CHANGE&nbsp;WITHOUT&nbsp;PRIOR&nbsp;NOTICE
                <div className={`hiddenquotation__note-date`}>
                  **Price&nbsp;effective&nbsp;-&nbsp;Starts&nbsp;1st&nbsp;May&nbsp;2021
                </div>
                <div className={`hiddenquotation__note-date`}>
                  **This&nbsp;quotation&nbsp;is&nbsp;provided&nbsp;on&nbsp;
                  <span style={{ color: 'rgb(131, 14, 14)' }}>{currentDate}</span>,&nbsp;valid&nbsp;until&nbsp;
                  <span style={{ color: 'rgb(131, 14, 14)' }}>
                    {moment(currentDate).add(1, 'M').format('YYYY-MM-DD')}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default withRouter(HiddenQuotationComponent);

import React, { useEffect, useRef, useState } from 'react';
import './OrdersSlidebar.scss';
/* components */
/* 3rd party lib */
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { Button, Dropdown, Tooltip, Empty, Menu, Collapse } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { InfoCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
/* Util */
import { RootState } from 'src';
import { ROUTE_ORDERS } from 'src/shared/routes';
import { TUserAccess } from 'src/store/types/auth';
import * as actions from 'src/store/actions/index';
import { TReceivedAccessoryObj } from 'src/store/types/dashboard';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';
const { Panel } = Collapse;

interface OrdersSlidebarProps {
  style: any;
  showOrderSlidebar: boolean;
  setShowOrderSlidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = OrdersSlidebarProps & StateProps & DispatchProps & RouteComponentProps;

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  wrapperRef: any,
  dropdownRef: any,
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    /**
     * Hide pop up if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (
        wrapperRef.current &&
        dropdownRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowPopUp(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, dropdownRef, setShowPopUp]);
}

const OrdersSlidebar: React.FC<Props> = ({
  style,
  history,
  accessObj,
  localOrdersArray,
  onRemoveAnOrder,
  setShowOrderSlidebar,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [expandedModelCollapse, setExpandedModelCollapse] = useState<string | string[]>([]);
  const [expandedInsuranceCollapse, setExpandedInsuranceCollapse] = useState<string[]>([]);

  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  useOutsideAlerter(wrapperRef, dropdownRef, setShowOrderSlidebar);

  /* ================================================== */
  /*  method */
  /* ================================================== */
  const onModelCollapsed = (key: string | string[]) => {
    // only set the state when user is admin
    if (accessObj === undefined) return null;
    if (typeof key !== 'string') {
      if (accessObj.showPriceSalesPage) {
        setExpandedModelCollapse(key);
      }
    }
  };

  const onInsuranceCollapsed = (key: string | string[]) => {
    if (typeof key !== 'string') {
      setExpandedInsuranceCollapse(key);
    }
  };
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  if (accessObj === undefined) {
    return null;
  }
  return (
    <>
      <div className="ordersslidebar__div" style={style} ref={wrapperRef}>
        <div className="ordersslidebar__top-div" ref={dropdownRef}>
          <div className="ordersslidebar__title">
            <a className="ordersslidebar__title-link" href={ROUTE_ORDERS}>
              Orders
            </a>
          </div>
          <i className="far fa-times-circle ordersslidebar__icon" onClick={() => setShowOrderSlidebar(false)}></i>
        </div>

        <div className="ordersslidebar__bottom-div">
          {localOrdersArray && localOrdersArray.length > 0 ? (
            [...localOrdersArray]
              .slice(0) //here it would display how many orders based on second param in slice
              .reverse()
              .map((order, index) => {
                type miscellaneousType = {
                  title: string;
                  price: number;
                };

                let processingFeesArray = order.chargesFeesArray.filter(
                  (charges) => charges.title !== 'JPJ Registration & E Hak Milik',
                );

                let bodyMakeDetailRowArray: { title: string; data: string }[] = [];
                if (order.bodyMakeObj !== null && order.bodyMakeObj !== undefined) {
                  const { make, wheelbase } = order.bodyMakeObj.make_wheelbase;
                  const { length } = order.bodyMakeObj;
                  bodyMakeDetailRowArray = [
                    {
                      title: 'Length:',
                      data: length !== null ? `${length.title}ft - ${length.description}` : '-',
                    },
                    {
                      title: 'Torque:',
                      data: make.torque !== null && make.torque !== '' ? `${make.torque}Nm` : '-',
                    },
                    {
                      title: 'Config:',
                      data: make.config !== null && make.config !== '' ? make.config : '-',
                    },
                    {
                      title: 'Emission:',
                      data: make.emission !== null && make.emission !== '' ? make.emission : '-',
                    },
                    {
                      title: 'Horsepower:',
                      data: make.horsepower !== null && make.horsepower !== '' ? `${make.horsepower}PC` : '-',
                    },
                    {
                      title: 'Tire Count:',
                      data: make.tire !== null && make.tire !== '' ? make.tire : '-',
                    },
                    {
                      title: 'Year:',
                      data: make.year !== null && make.year !== '' ? make.year : '-',
                    },
                    {
                      title: 'Wheelbase:',
                      data: wheelbase.title !== null && wheelbase.title !== '' ? `${wheelbase.title}mm` : '-',
                    },
                    {
                      title: 'Transmission:',
                      data: make.transmission !== null && make.transmission !== '' ? `${make.transmission}` : '-',
                    },
                    {
                      title: 'Engine Capacity:',
                      data: make.engine_cap !== null && make.engine_cap !== '' ? `${make.engine_cap}CC` : '-',
                    },
                    {
                      title: 'GVW:',
                      data: make.gvw !== null && make.gvw !== '' ? `${make.gvw}kg` : '-',
                    },
                  ];
                }

                let totalAccessoriesPrice = 0;

                // get total of general accessories
                let generalAccessoriesTotalPrice = order.generalAccessoriesArray.reduce(
                  (currentTotal: number, accessoryObj: TReceivedAccessoryObj) => {
                    return currentTotal + accessoryObj.price;
                  },
                  0,
                );

                // get total of body related accessories
                let bodyRelatedAccessoriesTotalPrice = order.bodyRelatedAccessoriesArray.reduce(
                  (currentTotal: number, accessoryObj: TReceivedAccessoryObj) => {
                    return currentTotal + accessoryObj.price;
                  },
                  0,
                );
                // get total of dimension related accessories
                let dimensionRelatedAccessoriesTotalPrice = order.dimensionRelatedAccessoriesArray.reduce(
                  (currentTotal: number, dimensionAccessoryObj: TReceivedDimensionAccessoryObj) => {
                    return currentTotal + dimensionAccessoryObj.price;
                  },
                  0,
                );

                totalAccessoriesPrice =
                  generalAccessoriesTotalPrice +
                  bodyRelatedAccessoriesTotalPrice +
                  dimensionRelatedAccessoriesTotalPrice;

                let processingFees = processingFeesArray.reduce(
                  (currentTotal: number, processingFeeObj: miscellaneousType) => {
                    return currentTotal + processingFeeObj.price;
                  },
                  0,
                );

                /* ===================================================== */
                // Model subtotal price - add all except insurance fees
                /* ===================================================== */
                let modelSubtotalPrice = 0;
                if (order.bodyMakeObj && order.bodyMakeObj) {
                  modelSubtotalPrice =
                    order.bodyMakeObj.make_wheelbase.make.price +
                    order.bodyMakeObj.price +
                    totalAccessoriesPrice +
                    processingFees;
                }

                type insuranceType = {
                  title: string;
                  price: number;
                };

                let tempModelSubtotalPrice = modelSubtotalPrice;
                tempModelSubtotalPrice = (tempModelSubtotalPrice * 95) / 100;
                let roundedModelSubtotalPrice = -Math.round(-tempModelSubtotalPrice / 1000) * 1000;
                roundedModelSubtotalPrice = (roundedModelSubtotalPrice - 1000) * 0.0325 + 441.8;
                roundedModelSubtotalPrice = roundedModelSubtotalPrice * 1.06 + 235;

                let JPJEHakMilik = order.chargesFeesArray.filter(
                  (charges) => charges.title === 'JPJ Registration & E Hak Milik',
                );

                let insuranceArray = [
                  {
                    title: 'Road tax (1year)',
                    price: 1015,
                  },
                  {
                    title: JPJEHakMilik[0].title,
                    price: JPJEHakMilik[0].price,
                  },
                  {
                    title: 'INSURANCE PREMIUM (windscreen included)',
                    price: roundedModelSubtotalPrice,
                  },
                ];

                /* ======================== */
                // Insurance subtotal price
                /* ====================== */
                let insuranceSubtotalPrice = insuranceArray.reduce(
                  (currentTotal: number, insuranceObj: insuranceType) => {
                    return currentTotal + insuranceObj.price;
                  },
                  0,
                );

                /* ====================== */
                // Discount Price
                /* ====================== */
                // let discountPrice = -6000;

                let prediscountTotalPrice = modelSubtotalPrice + insuranceSubtotalPrice;

                let grandTotalPrice = modelSubtotalPrice + insuranceSubtotalPrice;

                let moreOptionsDropdown = (
                  <Menu>
                    {accessObj.showPriceSalesPage && (
                      <Menu.Item
                        onClick={() => {
                          //   setShowDiscountModal(true);
                          //   setClickedOrder(order);
                        }}
                      >
                        Generate quotation
                      </Menu.Item>
                    )}
                    <Menu.Item
                      danger
                      onClick={() => {
                        if (onRemoveAnOrder === undefined) return;
                        onRemoveAnOrder(order.id, localOrdersArray);
                      }}
                    >
                      Remove from order
                    </Menu.Item>
                  </Menu>
                );

                let collpaseKeyArray = [`model${index}`];
                /* ==================================================== */
                // RENDER
                /* ==================================================== */
                return (
                  <div className="ordersslidebar__overview-row-outerdiv" key={uuidv4()}>
                    <div className="ordersslidebar__overview-row">
                      {/* Content div on the right */}
                      <section className="ordersslidebar__overview-row-content">
                        {/* ------------ The largest header on top -------------- */}
                        <div className="flex-align-center space-between margin_b-1">
                          <Tooltip title={`${order.lengthObj?.title}ft ${order.bodyMakeObj?.body.title}`}>
                            <span className="ordersslidebar__overview-row-content-header">
                              {order.lengthObj?.title}ft {order.bodyMakeObj?.body.title}
                            </span>
                          </Tooltip>
                          <div className="flex-align-center">
                            {accessObj.showPriceSalesPage && (
                              <span className="ordersslidebar__overview-row-content-header-price--prediscount">
                                RM&nbsp;
                                <NumberFormat
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  value={prediscountTotalPrice.toFixed(2)}
                                />
                              </span>
                            )}
                            <div className="ordersslidebar__overview-more">
                              <Dropdown trigger={['click']} overlay={moreOptionsDropdown} placement="bottomRight">
                                <Tooltip title={`More Options`}>
                                  <div className="ordersslidebar__overview-more-icon-div">
                                    <i className="fas fa-ellipsis-v"></i>
                                  </div>
                                </Tooltip>
                              </Dropdown>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-between">
                          {/* ======================= */}
                          {/* Model Series  */}
                          {/* ======================= */}
                          <div className="sales__selectarea-seriestitle">
                            <span className="ordersslidebar__overview-row-content-subheader">
                              {`${order.bodyMakeObj?.make_wheelbase.make.brand.title} ${order.bodyMakeObj?.make_wheelbase.make.series}  ${order.bodyMakeObj?.make_wheelbase.make.title}`}
                            </span>
                          </div>
                          {accessObj.showPriceSalesPage && (
                            <span className="ordersslidebar__overview-row-content-subheader-price">
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                value={modelSubtotalPrice.toFixed(2)}
                              />
                            </span>
                          )}
                        </div>

                        {/* expand the collpase for normal user */}
                        <Collapse
                          ghost
                          activeKey={
                            accessObj.showPriceSalesPage
                              ? expandedModelCollapse
                              : [...collpaseKeyArray, `model${index}`]
                          }
                          onChange={onModelCollapsed}
                          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        >
                          <Panel
                            showArrow={accessObj.showPriceSalesPage ? true : false}
                            className="ordersslidebar__overview-panel"
                            header={
                              accessObj.showPriceSalesPage
                                ? expandedModelCollapse.includes(`model${index}`)
                                  ? 'View less'
                                  : 'View more'
                                : ''
                            }
                            key={`model${index}`}
                          >
                            <ol className="ordersslidebar__overview-list">
                              <div className="ordersslidebar__overview-smalltitle">Cargo</div>
                              <li>
                                {/* ------------ Chassis price ----------- */}
                                <div className="flex space-between">
                                  <span>
                                    Chassis Price:&nbsp;
                                    <span className="ordersslidebar__overview-highlight-model">
                                      {order.bodyMakeObj && order.bodyMakeObj?.make_wheelbase.make.year === null
                                        ? /* if year doesnt exist, dont show anything except the model name*/
                                          order.bodyMakeObj.make_wheelbase.make.title
                                        : order.bodyMakeObj &&
                                          /* else check if year is equal to current, show "NEW MODEL YEAR CURRENTYEAR - model name"*/
                                          parseInt(order.bodyMakeObj.make_wheelbase.make.year) ===
                                            parseInt(moment().format('YYYY').toString())
                                        ? `NEW MODEL YEAR ${order.bodyMakeObj.make_wheelbase.make.year} - ${order.bodyMakeObj.make_wheelbase.make.title}`
                                        : /* else show MODEL YEAR - model name */
                                          order.bodyMakeObj &&
                                          `MODEL ${order.bodyMakeObj.make_wheelbase.make.year} ${order.bodyMakeObj.make_wheelbase.make.title}`}
                                    </span>
                                  </span>
                                  {accessObj.showPriceSalesPage && (
                                    <span>
                                      {order.bodyMakeObj?.make_wheelbase.make.price &&
                                      order.bodyMakeObj?.make_wheelbase.make.price !== 0 ? (
                                        <NumberFormat
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          value={order.bodyMakeObj?.make_wheelbase.make.price.toFixed(2)}
                                        />
                                      ) : (
                                        <span className="ordersslidebar__overview-dash">-</span>
                                      )}
                                    </span>
                                  )}
                                </div>
                              </li>
                              <li>
                                {/* ----------------- Body price ----------------- */}
                                <div className="flex space-between">
                                  <span>
                                    Body Price:&nbsp;
                                    <span className="ordersslidebar__overview-highlight-model">
                                      {`${order.lengthObj?.title}ft ${order.bodyMakeObj?.body.title}`}
                                    </span>
                                  </span>
                                  {accessObj.showPriceSalesPage && (
                                    <span>
                                      {order.bodyMakeObj?.price && order.bodyMakeObj?.price !== 0 ? (
                                        <NumberFormat
                                          value={order.bodyMakeObj?.price.toFixed(2)}
                                          displayType={'text'}
                                          thousandSeparator={true}
                                        />
                                      ) : (
                                        <span className="ordersslidebar__overview-dash">-</span>
                                      )}
                                    </span>
                                  )}
                                </div>
                              </li>
                              {/* more info for model */}
                              <Collapse ghost className="ordersslidebar__overview-panel--modeldetails">
                                <Panel
                                  style={{ padding: 0 }}
                                  showArrow={false}
                                  className="ordersslidebar__overview-panel"
                                  header={
                                    <div>
                                      <span className="ordersslidebar__overview-panel-specs-header">
                                        <InfoCircleOutlined /> Click here to view more specs
                                      </span>
                                    </div>
                                  }
                                  key="specs"
                                >
                                  <div className="ordersslidebar__overview-panel-specs-div">
                                    <div className="ordersslidebar__overview-panel-specs-innerdiv">
                                      <div className="ordersslidebar__overview-panel-specs-column">
                                        {bodyMakeDetailRowArray.slice(0, 6).map((bodyMake) => (
                                          <div key={uuidv4()} className="ordersslidebar__overview-panel-specs-row">
                                            <span className="ordersslidebar__overview-panel-specs-title">
                                              {bodyMake.title}
                                            </span>
                                            <span className="ordersslidebar__overview-panel-specs-value">
                                              {bodyMake.data}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                      <div key={uuidv4()} className="ordersslidebar__overview-panel-specs-column">
                                        {bodyMakeDetailRowArray.slice(6).map((bodyMake) => (
                                          <div key={uuidv4()} className="ordersslidebar__overview-panel-specs-row">
                                            <span className="ordersslidebar__overview-panel-specs-title">
                                              {bodyMake.title}
                                            </span>
                                            <span className="ordersslidebar__overview-panel-specs-value">
                                              {bodyMake.data}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </Panel>
                              </Collapse>
                              {/* Accessories section */}
                              <div className="ordersslidebar__overview-smalltitle">Accessories</div>
                              {order.generalAccessoriesArray &&
                                order.bodyRelatedAccessoriesArray &&
                                order.dimensionRelatedAccessoriesArray &&
                                order.generalAccessoriesArray.length === 0 &&
                                order.bodyRelatedAccessoriesArray.length === 0 &&
                                order.dimensionRelatedAccessoriesArray.length === 0 && <span>None</span>}
                              <>
                                {order.generalAccessoriesArray &&
                                  order.generalAccessoriesArray.length > 0 &&
                                  order.generalAccessoriesArray.map((accessory) => (
                                    <li key={uuidv4()}>
                                      <div className="flex space-between">
                                        <span>{accessory.title} </span>
                                        {accessObj.showPriceSalesPage && (
                                          <span>
                                            {accessory.price && accessory.price !== 0 ? (
                                              <NumberFormat
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                value={accessory.price.toFixed(2)}
                                              />
                                            ) : (
                                              <span className="ordersslidebar__overview-dash">-</span>
                                            )}
                                          </span>
                                        )}
                                      </div>
                                    </li>
                                  ))}
                              </>
                              <>
                                {order.bodyRelatedAccessoriesArray &&
                                  order.bodyRelatedAccessoriesArray.length > 0 &&
                                  order.bodyRelatedAccessoriesArray.map((accessory) => (
                                    <li key={uuidv4()}>
                                      <div className="flex space-between">
                                        <span>{accessory.title} </span>
                                        {accessObj.showPriceSalesPage && (
                                          <span>
                                            {accessory.price && accessory.price !== 0 ? (
                                              <NumberFormat
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                value={accessory.price.toFixed(2)}
                                              />
                                            ) : (
                                              <span className="ordersslidebar__overview-dash">-</span>
                                            )}
                                          </span>
                                        )}
                                      </div>
                                    </li>
                                  ))}
                              </>
                              <>
                                {order.dimensionRelatedAccessoriesArray &&
                                  order.dimensionRelatedAccessoriesArray.length > 0 &&
                                  order.dimensionRelatedAccessoriesArray.map((dimension) => (
                                    <li key={uuidv4()}>
                                      <div className="flex space-between">
                                        <span> {dimension.accessory.title} </span>
                                        {accessObj.showPriceSalesPage && (
                                          <span>
                                            {dimension.price && dimension.price !== 0 ? (
                                              <NumberFormat
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                value={dimension.price.toFixed(2)}
                                              />
                                            ) : (
                                              <span className="ordersslidebar__overview-dash">-</span>
                                            )}
                                          </span>
                                        )}
                                      </div>
                                    </li>
                                  ))}
                              </>

                              {/* Processing fees section */}
                              {accessObj.showPriceSalesPage && (
                                <>
                                  <div className="ordersslidebar__overview-smalltitle">Processing fees</div>
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
                                </>
                              )}
                            </ol>
                            {/* Cargo subtotal */}
                            {accessObj.showPriceSalesPage && (
                              <div className="ordersslidebar__overview-subtotal-outerdiv">
                                <span className="ordersslidebar__overview-subtotal-text">SUBTOTAL</span>
                                <div className="ordersslidebar__overview-subtotal">
                                  <NumberFormat
                                    value={modelSubtotalPrice.toFixed(2)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                  />
                                </div>
                              </div>
                            )}
                          </Panel>
                        </Collapse>

                        {/* ======================== */}
                        {/* Road Tax and Insurance */}
                        {/* ======================== */}
                        {accessObj.showPriceSalesPage && (
                          <>
                            <div className="flex space-between">
                              <span className="ordersslidebar__overview-row-content-subheader">
                                Road Tax and Insurance
                              </span>
                              <span className="ordersslidebar__overview-row-content-subheader-price">
                                <NumberFormat
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  value={insuranceSubtotalPrice.toFixed(2)}
                                />
                              </span>
                            </div>

                            <Collapse
                              ghost
                              activeKey={expandedInsuranceCollapse}
                              onChange={onInsuranceCollapsed}
                              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            >
                              <Panel
                                className="ordersslidebar__overview-panel"
                                header={
                                  expandedInsuranceCollapse.includes(`insurance${index}`) ? 'View less' : 'View more'
                                }
                                key={`insurance${index}`}
                              >
                                <ul className="ordersslidebar__overview-list">
                                  {insuranceArray.map((item) => (
                                    <li key={uuidv4()}>
                                      <div className="flex space-between">
                                        <span> {item.title}</span>
                                        {accessObj.showPriceSalesPage && (
                                          <span>
                                            <NumberFormat
                                              displayType={'text'}
                                              thousandSeparator={true}
                                              value={item.price.toFixed(2)}
                                            />
                                          </span>
                                        )}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                                {/* Insurance subtotal */}
                                {accessObj.showPriceSalesPage && (
                                  <div className="ordersslidebar__overview-subtotal-outerdiv">
                                    <span className="ordersslidebar__overview-subtotal-text">SUBTOTAL</span>
                                    <div className="ordersslidebar__overview-subtotal">
                                      <NumberFormat
                                        value={insuranceSubtotalPrice.toFixed(2)}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                      />
                                    </div>
                                  </div>
                                )}
                              </Panel>
                            </Collapse>
                          </>
                        )}
                        {/* <hr /> */}

                        {/* ======================== */}
                        {/* Total Price */}
                        {/* ======================== */}
                        {/* {accessObj.showPriceSalesPage && (
                        <div className="flex space-between">
                          <span className="ordersslidebar__overview-row-content-subheader">Total Price</span>
                          <span className="ordersslidebar__overview-row-content-subheader-price--prediscount">
                            <NumberFormat
                              displayType={'text'}
                              thousandSeparator={true}
                              value={prediscountTotalPrice.toFixed(2)}
                            />
                          </span>
                        </div>
                      )} */}

                        {/* ======================== */}
                        {/* DISCOUNT */}
                        {/* ======================== */}
                        {/* {accessObj.showPriceSalesPage && (
                        <>
                          <div className="flex space-between">
                            <span className="ordersslidebar__overview-row-content-subheader ordersslidebar__overview-row-content-subheader--discount">
                              Hino Discount
                            </span>
                            <span className="ordersslidebar__overview-row-content-subheader-price">
                              -&nbsp;
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                value={Math.abs(discountPrice).toFixed(2)}
                              />
                            </span>
                          </div>
                        </>
                      )} */}
                        {/* ======================== */}
                        {/* TOTAL ON THE ROAD PRICE  */}
                        {/* ======================== */}
                        {/* change to total price because there's no more final discount */}
                        {accessObj.showPriceSalesPage && (
                          <div className="flex-align-center space-between ordersslidebar__overview-row-content-subheader--totalroadprice">
                            <span className="ordersslidebar__overview-row-content-subheader--totalroadprice-text">
                              TOTAL PRICE
                            </span>

                            <span className="ordersslidebar__overview-row-content-header-price">
                              RM&nbsp;
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                value={grandTotalPrice.toFixed(2)}
                              />
                            </span>
                          </div>
                        )}
                      </section>
                      {/* <div className="sales__btn-div">
                      <Button
                        className="sales__btn sales__btn--back margin_r-1"
                        onClick={() => {
                          if (setCurrentStep === undefined || currentStep === undefined) return;
                          setCurrentStep(currentStep - 1);
                        }}
                      >
                        Back
                      </Button>
                    </div> */}
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="ordersslidebar__overview-empty-div">
              <Empty description={<span>You have no order currently</span>}>
                <Button
                  className="ordersslidebar__overview-empty-btn"
                  type="primary"
                  onClick={() => history.push('/sales')}
                >
                  Make a new order
                </Button>
              </Empty>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

interface StateProps {
  accessObj?: TUserAccess;
  localOrdersArray?: TLocalOrderObj[];
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    localOrdersArray: state.sales.localOrdersArray,
  };
};

interface DispatchProps {
  onRemoveAnOrder?: typeof actions.removeAnOrder;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onRemoveAnOrder: (orderId, localOrdersArray) => dispatch(actions.removeAnOrder(orderId, localOrdersArray)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrdersSlidebar));

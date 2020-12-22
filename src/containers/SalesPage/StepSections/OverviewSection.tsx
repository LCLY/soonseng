import React, { useState, useContext } from 'react';
/*components*/
/*3rd party lib*/
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Breadcrumb, Button, Collapse, Divider, Dropdown, Menu } from 'antd';
import { CaretDownOutlined, InfoCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
/* Util */
import { AppActions } from 'src/store/types';
import { TUserAccess } from 'src/store/types/auth';
import { img_not_available_link } from 'src/shared/links';
import { SalesPageContext } from 'src/containers/SalesPage/SalesPageContext';
import { TReceivedBodyObj, TReceivedBodyMakeObj, TReceivedAccessoryObj } from 'src/store/types/dashboard';
import { TLocalOrderObj, TReceivedSalesLengthObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';

const { Panel } = Collapse;

export interface OverviewSectionProps {
  loading?: boolean;
  totalSteps?: number;
  accessObj?: TUserAccess;
  localOrdersArray?: TLocalOrderObj[];
  currentStep?: number; //for steps component
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  currentTyre?: number | null; //current picked tire count
  currentLength?: TReceivedSalesLengthObj | null;
  currentBody?: TReceivedBodyObj | null;
  currentBodyMake?: TReceivedBodyMakeObj | null;
  setCurrentBodyMake?: React.Dispatch<React.SetStateAction<TReceivedBodyMakeObj | null>>;
  currentOrderObj?: TLocalOrderObj; //to keep track of the current order
  onRemoveAnOrder?: (index: number, localOrdersArray: TLocalOrderObj[]) => AppActions;
  setCurrentLength?: React.Dispatch<React.SetStateAction<TReceivedSalesLengthObj | null>>;
  setCurrentTyre?: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentBody?: React.Dispatch<React.SetStateAction<TReceivedBodyObj | null>>;
  setCurrentAccessory?: React.Dispatch<
    React.SetStateAction<{
      accessoryObj: TReceivedAccessoryObj;
      price: number;
    } | null>
  >;
}

type Props = OverviewSectionProps & RouteComponentProps;

const OverviewSection: React.FC<Props> = ({ history }) => {
  const [expandedModelCollapse, setExpandedModelCollapse] = useState<string[]>([]);
  const [expandedInsuranceCollapse, setExpandedInsuranceCollapse] = useState<string[]>([]);

  const salesPageContext = useContext(SalesPageContext);
  if (salesPageContext === null) {
    return null;
  }

  const {
    // loading,
    accessObj,
    currentTyre,
    currentBody,
    currentOrderObj,
    currentLength,
    // totalSteps,
    // currentStep,
    currentBodyMake,
    localOrdersArray,
    setCurrentBodyMake,
    setCurrentStep,
    onRemoveAnOrder,
    setCurrentLength,
    setCurrentTyre,
    setCurrentBody,
    setCurrentAccessory,
  } = salesPageContext;

  /* ================================================== */
  /*  state */
  /* ================================================== */
  let totalAccessoriesArrayLength = 0;
  if (currentOrderObj !== undefined) {
    totalAccessoriesArrayLength =
      currentOrderObj.generalAccessoriesArray.length +
      currentOrderObj.bodyRelatedAccessoriesArray.length +
      currentOrderObj.dimensionRelatedAccessoriesArray.length;
  }

  /* ================================================== */
  /*  method */
  /* ================================================== */
  const onModelCollapsed = (key: string | string[]) => {
    if (typeof key !== 'string') {
      setExpandedModelCollapse(key);
    }
  };

  const onInsuranceCollapsed = (key: string | string[]) => {
    if (typeof key !== 'string') {
      setExpandedInsuranceCollapse(key);
    }
  };

  if (accessObj === undefined) {
    return null;
  }
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <section className="sales__section">
        <div className="sales__section-overview">
          <div className="sales__breadcrumb-outerdiv">
            <Breadcrumb separator=">" className="sales__breadcrumb">
              <Breadcrumb.Item>
                <span className="sales__breadcrumb-text">Tyre Count</span>
                <span className="sales__breadcrumb-highlight">({currentTyre})</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="sales__breadcrumb-text">Length</span>
                <span className="sales__breadcrumb-highlight">({currentLength?.title}ft)</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="sales__breadcrumb-text">Body</span>
                {currentBody && <span className="sales__breadcrumb-highlight">({currentBody?.title})</span>}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="sales__breadcrumb-text">Option</span>
                {currentBodyMake && (
                  <span className="sales__breadcrumb-highlight">{`(${currentBodyMake?.make.brand.title} ${currentBodyMake?.make.title} ${currentBodyMake?.make.series})`}</span>
                )}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="sales__breadcrumb-text">Accessory</span>
                <span className="sales__breadcrumb-highlight">({totalAccessoriesArrayLength} Items)</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="sales__breadcrumb-text">Overview</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Divider className="sales__section-header-divider" orientation="left">
            <div className="sales__section-header">Overview</div>
          </Divider>

          <div>
            {localOrdersArray &&
              localOrdersArray.length > 0 &&
              [...localOrdersArray]
                .reverse()
                .slice(0, 1)
                .map((order, index) => {
                  type miscellaneousType = {
                    title: string;
                    price: number;
                  };
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

                  type insuranceType = {
                    title: string;
                    price: number;
                  };
                  let insuranceArray = [
                    {
                      title: 'Road tax (1year)',
                      price: 1015,
                    },
                    {
                      title: 'JPJ Registration & E Hak Milik ',
                      price: 110,
                    },
                    {
                      title: 'INSURANCE PREMIUM (windscreen included)  ',
                      price: 4733.96,
                    },
                  ];

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
                      order.bodyMakeObj.make.price + order.bodyMakeObj.price + totalAccessoriesPrice + processingFees;
                  }

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
                  let discountPrice = -6000;

                  let prediscountTotalPrice = modelSubtotalPrice + insuranceSubtotalPrice;

                  let grandTotalPrice = modelSubtotalPrice + insuranceSubtotalPrice + discountPrice;

                  let moreOptionsDropdown = (
                    <Menu>
                      <Menu.Item
                        danger
                        onClick={() => {
                          if (onRemoveAnOrder === undefined) return;
                          onRemoveAnOrder(index, localOrdersArray);
                        }}
                      >
                        Remove from order
                      </Menu.Item>
                    </Menu>
                  );
                  /* ==================================================== */
                  // RENDER
                  /* ==================================================== */
                  return (
                    <div className="sales__overview-row-outerdiv" key={uuidv4()}>
                      <div className="sales__overview-more">
                        <div className="sales__overview-more-icon-div">
                          <Dropdown trigger={['click']} overlay={moreOptionsDropdown} placement="bottomRight">
                            <div className="flex-align-center">
                              More Options&nbsp;
                              <CaretDownOutlined className="sales__overview-more-icon" />
                            </div>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="sales__overview-row">
                        {/* Image div on the left */}
                        <section className="sales__overview-row-image-div">
                          {/* Show make images */}
                          {order.bodyMakeObj && order.bodyMakeObj?.make.images.length > 0 ? (
                            <img
                              alt={order.bodyMakeObj?.make.images[0].filename}
                              src={order.bodyMakeObj?.make.images[0].url}
                            />
                          ) : (
                            <img
                              className="sales__overview-row-image"
                              src={img_not_available_link}
                              alt="not available"
                            />
                          )}
                        </section>

                        {/* Content div on the right */}
                        <section className="sales__overview-row-content">
                          {/* ------------ The largest header on top -------------- */}
                          <div className="flex-align-center space-between margin_b-1">
                            <span className="sales__overview-row-content-header">
                              {order.lengthObj?.title}ft {order.bodyMakeObj?.body.title}
                            </span>
                            {accessObj.showPriceSalesPage && (
                              <span className="sales__overview-row-content-header-price--prediscount">
                                RM&nbsp;
                                <NumberFormat
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  value={prediscountTotalPrice.toFixed(2)}
                                />
                              </span>
                            )}
                          </div>

                          <div className="flex space-between">
                            {/* ======================= */}
                            {/* Model Series  */}
                            {/* ======================= */}
                            <div className="sales__selectarea-seriestitle">
                              <span className="sales__overview-row-content-subheader">
                                {`${order.bodyMakeObj?.make.brand.title} ${order.bodyMakeObj?.make.series}  ${order.bodyMakeObj?.make.title}`}
                              </span>
                            </div>
                            {accessObj.showPriceSalesPage && (
                              <span className="sales__overview-row-content-subheader-price">
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
                            activeKey={expandedModelCollapse}
                            onChange={onModelCollapsed}
                            defaultActiveKey={accessObj.showPriceSalesPage ? [''] : [`model${index}`]}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                          >
                            <Panel
                              className="sales__overview-panel"
                              header={expandedModelCollapse.includes(`model${index}`) ? 'View less' : 'View more'}
                              key={`model${index}`}
                            >
                              <ol className="sales__overview-list">
                                <div className="sales__overview-smalltitle">Cargo</div>
                                <li>
                                  {/* ------------ Chassis price ----------- */}
                                  <div className="flex space-between">
                                    <span>
                                      Chassis Price:&nbsp;
                                      <span className="sales__overview-highlight-model">
                                        {order.bodyMakeObj && order.bodyMakeObj?.make.year === null
                                          ? /* if year doesnt exist, dont show anything except the model name*/
                                            order.bodyMakeObj.make.title
                                          : order.bodyMakeObj &&
                                            /* else check if year is equal to current, show "NEW MODEL YEAR CURRENTYEAR - model name"*/
                                            parseInt(order.bodyMakeObj.make.year) ===
                                              parseInt(moment().year().toString())
                                          ? `NEW MODEL YEAR ${order.bodyMakeObj.make.year} - ${order.bodyMakeObj.make.title}`
                                          : /* else show MODEL YEAR - model name */
                                            order.bodyMakeObj &&
                                            `MODEL ${order.bodyMakeObj.make.year} ${order.bodyMakeObj.make.title}`}
                                      </span>
                                    </span>
                                    {accessObj.showPriceSalesPage && (
                                      <span>
                                        <NumberFormat
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          value={order.bodyMakeObj?.make.price.toFixed(2)}
                                        />
                                      </span>
                                    )}
                                  </div>
                                </li>
                                <li>
                                  {/* ----------------- Body price ----------------- */}
                                  <div className="flex space-between">
                                    <span>
                                      Body Price:&nbsp;
                                      <span className="sales__overview-highlight-model">
                                        {`${order.lengthObj?.title}ft ${order.bodyMakeObj?.body.title}`}
                                      </span>
                                    </span>
                                    {accessObj.showPriceSalesPage && (
                                      <span>
                                        <NumberFormat
                                          value={order.bodyMakeObj?.price.toFixed(2)}
                                          displayType={'text'}
                                          thousandSeparator={true}
                                        />
                                      </span>
                                    )}
                                  </div>
                                </li>
                                {/* more info for model */}
                                <Collapse ghost className="sales__overview-panel--modeldetails">
                                  <Panel
                                    style={{ padding: 0 }}
                                    showArrow={false}
                                    className="sales__overview-panel"
                                    header={
                                      <>
                                        <InfoCircleOutlined /> Click here to view more specs
                                      </>
                                    }
                                    key="model"
                                  >
                                    {order.bodyMakeObj?.make.torque !== null && order.bodyMakeObj?.make.torque !== '' && (
                                      <div className="sales__overview-panel-specs-row">
                                        <span className="sales__overview-panel-specs-title">Torque:</span>
                                        <span className="sales__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.torque}
                                        </span>
                                      </div>
                                    )}
                                    {order.bodyMakeObj?.make.config !== null && order.bodyMakeObj?.make.config !== '' && (
                                      <div className="sales__overview-panel-specs-row">
                                        <span className="sales__overview-panel-specs-title">Config:</span>
                                        <span className="sales__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.config}
                                        </span>
                                      </div>
                                    )}
                                    {order.bodyMakeObj?.make.emission !== null &&
                                      order.bodyMakeObj?.make.emission !== '' && (
                                        <div className="sales__overview-panel-specs-row">
                                          <span className="sales__overview-panel-specs-title">Emission:</span>
                                          <span className="sales__overview-panel-specs-value">
                                            {order.bodyMakeObj?.make.emission}
                                          </span>
                                        </div>
                                      )}
                                    {order.bodyMakeObj?.length !== null && (
                                      <div className="sales__overview-panel-specs-row">
                                        <span className="sales__overview-panel-specs-title">Length:</span>
                                        <span className="sales__overview-panel-specs-value">
                                          {order.bodyMakeObj?.length}mm
                                        </span>
                                      </div>
                                    )}
                                    {order.bodyMakeObj?.make.horsepower !== null &&
                                      order.bodyMakeObj?.make.horsepower !== '' && (
                                        <div className="sales__overview-panel-specs-row">
                                          <span className="sales__overview-panel-specs-title">Horsepower:</span>
                                          <span className="sales__overview-panel-specs-value">
                                            {order.bodyMakeObj?.make.horsepower}PS
                                          </span>
                                        </div>
                                      )}
                                    {order.bodyMakeObj?.make.year !== null && order.bodyMakeObj?.make.year !== '' && (
                                      <div className="sales__overview-panel-specs-row">
                                        <span className="sales__overview-panel-specs-title">Year:</span>
                                        <span className="sales__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.year}
                                        </span>
                                      </div>
                                    )}

                                    {order.bodyMakeObj?.make.tire !== null && order.bodyMakeObj?.make.tire !== '' && (
                                      <div className="sales__overview-panel-specs-row">
                                        <span className="sales__overview-panel-specs-title">Tyre Count:</span>
                                        <span className="sales__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.tire} tires
                                        </span>
                                      </div>
                                    )}
                                    {order.bodyMakeObj?.wheelbase !== null && order.bodyMakeObj?.wheelbase !== '' && (
                                      <div className="sales__overview-panel-specs-row">
                                        <span className="sales__overview-panel-specs-title">Wheelbase:</span>
                                        <span className="sales__overview-panel-specs-value">
                                          {order.bodyMakeObj?.wheelbase}mm
                                        </span>
                                      </div>
                                    )}
                                    {order.bodyMakeObj?.make.transmission !== null &&
                                      order.bodyMakeObj?.make.transmission !== '' && (
                                        <div className="sales__overview-panel-specs-row">
                                          <span className="sales__overview-panel-specs-title">Transmission:</span>
                                          <span className="sales__overview-panel-specs-value">
                                            {order.bodyMakeObj?.make.transmission}
                                          </span>
                                        </div>
                                      )}
                                    {order.bodyMakeObj?.make.engine_cap !== null &&
                                      order.bodyMakeObj?.make.engine_cap !== '' && (
                                        <div className="sales__overview-panel-specs-row">
                                          <span className="sales__overview-panel-specs-title">Engine Capacity:</span>
                                          <span className="sales__overview-panel-specs-value">
                                            {order.bodyMakeObj?.make.engine_cap}CC
                                          </span>
                                        </div>
                                      )}
                                    {order.bodyMakeObj?.make.gvw !== null && order.bodyMakeObj?.make.gvw !== '' && (
                                      <div className="sales__overview-panel-specs-row">
                                        <span className="sales__overview-panel-specs-title">Gross Vehicle Weight:</span>
                                        <span className="sales__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.gvw}kg
                                        </span>
                                      </div>
                                    )}
                                  </Panel>
                                </Collapse>
                                {/* Accessories section */}
                                <div className="sales__overview-smalltitle">Accessories</div>
                                <>
                                  {order.generalAccessoriesArray &&
                                    order.generalAccessoriesArray.length > 0 &&
                                    order.generalAccessoriesArray.map((accessory) => (
                                      <li key={uuidv4()}>
                                        <div className="flex space-between">
                                          <span>{accessory.title} </span>
                                          {accessObj.showPriceSalesPage && (
                                            <span>
                                              <NumberFormat
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                value={accessory.price.toFixed(2)}
                                              />
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
                                              <NumberFormat
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                value={accessory.price.toFixed(2)}
                                              />
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
                                              <NumberFormat
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                value={dimension.price.toFixed(2)}
                                              />
                                            </span>
                                          )}
                                        </div>
                                      </li>
                                    ))}
                                </>

                                {/* Processing fees section */}
                                {accessObj.showPriceSalesPage && (
                                  <>
                                    <div className="sales__overview-smalltitle">Processing fees</div>
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
                                <div className="sales__overview-subtotal-outerdiv">
                                  <span className="sales__overview-subtotal-text">SUBTOTAL</span>
                                  <div className="sales__overview-subtotal">
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
                                <span className="sales__overview-row-content-subheader">Road Tax and Insurance</span>
                                <span className="sales__overview-row-content-subheader-price">
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
                                  className="sales__overview-panel"
                                  header={
                                    expandedInsuranceCollapse.includes(`insurance${index}`) ? 'View less' : 'View more'
                                  }
                                  key={`insurance${index}`}
                                >
                                  <ul className="sales__overview-list">
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
                                    <div className="sales__overview-subtotal-outerdiv">
                                      <span className="sales__overview-subtotal-text">SUBTOTAL</span>
                                      <div className="sales__overview-subtotal">
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

                              <hr />
                            </>
                          )}
                          {/* ======================== */}
                          {/* Total Price */}
                          {/* ======================== */}
                          {accessObj.showPriceSalesPage && (
                            <div className="flex space-between">
                              <span className="sales__overview-row-content-subheader">Total Price</span>
                              <span className="sales__overview-row-content-subheader-price--prediscount">
                                <NumberFormat
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  value={prediscountTotalPrice.toFixed(2)}
                                />
                              </span>
                            </div>
                          )}

                          {/* ======================== */}
                          {/* DISCOUNT */}
                          {/* ======================== */}
                          {accessObj.showPriceSalesPage && (
                            <>
                              <div className="flex space-between">
                                <span className="sales__overview-row-content-subheader sales__overview-row-content-subheader--discount">
                                  Hino Discount
                                </span>
                                <span className="sales__overview-row-content-subheader-price">
                                  -&nbsp;
                                  <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    value={Math.abs(discountPrice).toFixed(2)}
                                  />
                                </span>
                              </div>
                              <hr />
                            </>
                          )}
                          {/* ======================== */}
                          {/* TOTAL ON THE ROAD PRICE */}
                          {/* ======================== */}
                          {accessObj.showPriceSalesPage && (
                            <div className="flex-align-center space-between">
                              <span className="sales__overview-row-content-subheader--totalroadprice">
                                TOTAL ON THE ROAD PRICE
                              </span>

                              <span className="sales__overview-row-content-header-price">
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
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        <Button
          className="sales__overview-btn--another"
          onClick={() => {
            if (
              setCurrentStep === undefined ||
              setCurrentLength === undefined ||
              setCurrentTyre === undefined ||
              setCurrentBody === undefined ||
              setCurrentBodyMake === undefined ||
              setCurrentAccessory === undefined
            )
              return;

            setCurrentStep(0);
            setCurrentLength(null);
            setCurrentTyre(null);
            setCurrentBody(null);
            setCurrentAccessory(null);
            setCurrentBodyMake(null);
          }}
        >
          Add Another Order
        </Button>
        <Button
          type="primary"
          className="sales__overview-btn--allorders"
          onClick={() => {
            history.push('/orders');
          }}
        >
          View All Orders
        </Button>
      </section>
    </>
  );
};
export default withRouter(OverviewSection);

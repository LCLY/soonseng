import React from 'react';
import './OrdersPage.scss';
// component
import Footer from 'src/components/Footer/Footer';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
// 3rd party lib
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Collapse, Divider, Dropdown, Empty, Menu } from 'antd';
import { InfoCircleOutlined, DownSquareOutlined, CaretRightOutlined } from '@ant-design/icons';

// Util
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types/index';
import { img_not_available_link } from 'src/shared/global';
import { TReceivedAccessoryObj } from 'src/store/types/dashboard';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';

const { Panel } = Collapse;

interface OrdersPageProps {}

type Props = OrdersPageProps & StateProps & DispatchProps & RouteComponentProps;

const OrdersPage: React.FC<Props> = ({ history, localOrdersArray, onRemoveAnOrder }) => {
  return (
    <>
      <NavbarComponent activePage="orders" />
      <section className="orders__section">
        <Container>
          <div className="orders__section-outerdiv">
            <Divider className="sales__section-header-divider" orientation="left">
              <div className="sales__section-header">Your Orders</div>
            </Divider>

            <div>
              {localOrdersArray && (
                <div>
                  Total:&nbsp;<span className="orders__total-text">{localOrdersArray.length}&nbsp;items</span>
                </div>
              )}
              {localOrdersArray && localOrdersArray.length > 0 ? (
                [...localOrdersArray].reverse().map((order, index) => {
                  type miscellaneousType = {
                    title: string;
                    price: number;
                  };
                  let miscellaneousArray = [
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

                  let miscellaneousFees = miscellaneousArray.reduce(
                    (currentTotal: number, miscellaneousObj: miscellaneousType) => {
                      return currentTotal + miscellaneousObj.price;
                    },
                    0,
                  );

                  /* ===================================================== */
                  // Model subtotal price - add all except insurance fees
                  /* ===================================================== */
                  let modelSubtotalPrice = 0;
                  if (order.bodyMakeObj && order.bodyObj) {
                    modelSubtotalPrice =
                      order.bodyMakeObj.make.price +
                      order.bodyMakeObj.price +
                      totalAccessoriesPrice +
                      miscellaneousFees;
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
                      <Menu.Item danger onClick={() => onRemoveAnOrder(index, localOrdersArray)}>
                        Remove from order
                      </Menu.Item>
                    </Menu>
                  );
                  /* ==================================================== */
                  // RENDER
                  /* ==================================================== */
                  return (
                    <div className="orders__overview-row-outerdiv" key={uuidv4()}>
                      <div className="orders__overview-more">
                        <div className="orders__overview-more-icon-div">
                          <Dropdown trigger={['click']} overlay={moreOptionsDropdown} placement="bottomRight">
                            <DownSquareOutlined className="orders__overview-more-icon" />
                          </Dropdown>
                        </div>
                      </div>
                      <div className="orders__overview-row">
                        {/* Image div on the left */}
                        <section className="orders__overview-row-image-div">
                          {/* Show make images */}
                          {order.bodyMakeObj && order.bodyMakeObj?.make.images.length > 0 ? (
                            <img
                              alt={order.bodyMakeObj?.make.images[0].filename}
                              src={order.bodyMakeObj?.make.images[0].url}
                            />
                          ) : (
                            <img
                              className="orders__overview-row-image"
                              src={img_not_available_link}
                              alt="not available"
                            />
                          )}
                        </section>

                        {/* Content div on the right */}
                        <section className="orders__overview-row-content">
                          {/* ------------ The largest header on top -------------- */}
                          <div className="flex-align-center space-between margin_b-1">
                            <span className="orders__overview-row-content-header">
                              {order.lengthObj?.title}ft {order.bodyMakeObj?.body.title}
                            </span>
                            <span className="orders__overview-row-content-header-price--prediscount">
                              RM&nbsp;
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                value={prediscountTotalPrice.toFixed(2)}
                              />
                            </span>
                          </div>

                          <div className="flex space-between">
                            {/* ======================= */}
                            {/* Model Series  */}
                            {/* ======================= */}
                            <div className="sales__selectarea-seriestitle">
                              <span className="orders__overview-row-content-subheader">
                                {`${order.bodyMakeObj?.make.brand.title} ${order.bodyMakeObj?.make.series} ${order.bodyMakeObj?.make.title}`}
                              </span>
                            </div>
                            <span className="orders__overview-row-content-subheader-price">
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                value={modelSubtotalPrice.toFixed(2)}
                              />
                            </span>
                          </div>
                          <Collapse
                            ghost
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                          >
                            <Panel className="orders__overview-panel" header="View more" key="model">
                              <ol className="orders__overview-list">
                                <div className="orders__overview-smalltitle">Cargo</div>
                                <li>
                                  {/* ------------ Chassis price ----------- */}
                                  <div className="flex space-between">
                                    <span>
                                      Chassis Price:&nbsp;
                                      <span className="orders__overview-highlight-model">
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
                                    <span>
                                      <NumberFormat
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        value={order.bodyMakeObj?.make.price.toFixed(2)}
                                      />
                                    </span>
                                  </div>
                                </li>
                                <li>
                                  {/* ----------------- Body price ----------------- */}
                                  <div className="flex space-between">
                                    <span>
                                      Body Price:&nbsp;
                                      <span className="orders__overview-highlight-model">
                                        {`${order.lengthObj?.title}ft ${order.bodyMakeObj?.body.title}`}
                                      </span>
                                    </span>
                                    <span>
                                      <NumberFormat
                                        value={order.bodyMakeObj?.price.toFixed(2)}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                      />
                                    </span>
                                  </div>
                                </li>
                                {/* more info for model */}
                                <Collapse ghost className="orders__overview-panel--modeldetails">
                                  <Panel
                                    style={{ padding: 0 }}
                                    showArrow={false}
                                    className="orders__overview-panel"
                                    header={
                                      <>
                                        <InfoCircleOutlined /> Click here to view more specs
                                      </>
                                    }
                                    key="model"
                                  >
                                    {order.bodyMakeObj?.make.torque !== null && order.bodyMakeObj?.make.torque !== '' && (
                                      <div className="orders__overview-panel-specs-row">
                                        <span className="orders__overview-panel-specs-title">Torque:</span>
                                        <span className="orders__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.torque}
                                        </span>
                                      </div>
                                    )}
                                    {order.bodyMakeObj?.make.config !== null && order.bodyMakeObj?.make.config !== '' && (
                                      <div className="orders__overview-panel-specs-row">
                                        <span className="orders__overview-panel-specs-title">Config:</span>
                                        <span className="orders__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.config}
                                        </span>
                                      </div>
                                    )}
                                    {order.bodyMakeObj?.make.emission !== null &&
                                      order.bodyMakeObj?.make.emission !== '' && (
                                        <div className="orders__overview-panel-specs-row">
                                          <span className="orders__overview-panel-specs-title">Emission:</span>
                                          <span className="orders__overview-panel-specs-value">
                                            {order.bodyMakeObj?.make.emission}
                                          </span>
                                        </div>
                                      )}
                                    {order.bodyMakeObj?.make.length !== null && (
                                      <div className="orders__overview-panel-specs-row">
                                        <span className="orders__overview-panel-specs-title">Length:</span>
                                        <span className="orders__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.length}mm
                                        </span>
                                      </div>
                                    )}
                                    {order.bodyMakeObj?.make.horsepower !== null &&
                                      order.bodyMakeObj?.make.horsepower !== '' && (
                                        <div className="orders__overview-panel-specs-row">
                                          <span className="orders__overview-panel-specs-title">Horsepower:</span>
                                          <span className="orders__overview-panel-specs-value">
                                            {order.bodyMakeObj?.make.horsepower}PS
                                          </span>
                                        </div>
                                      )}
                                    {order.bodyMakeObj?.make.year !== null && order.bodyMakeObj?.make.year !== '' && (
                                      <div className="orders__overview-panel-specs-row">
                                        <span className="orders__overview-panel-specs-title">Year:</span>
                                        <span className="orders__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.year}
                                        </span>
                                      </div>
                                    )}

                                    {order.bodyMakeObj?.make.tire !== null && order.bodyMakeObj?.make.tire !== 0 && (
                                      <div className="orders__overview-panel-specs-row">
                                        <span className="orders__overview-panel-specs-title">Tyre Count:</span>
                                        <span className="orders__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.tire} tires
                                        </span>
                                      </div>
                                    )}
                                    {order.bodyMakeObj?.make.wheelbase.title !== null &&
                                      order.bodyMakeObj?.make.wheelbase.title !== '' && (
                                        <div className="orders__overview-panel-specs-row">
                                          <span className="orders__overview-panel-specs-title">Wheelbase:</span>
                                          <span className="orders__overview-panel-specs-value">
                                            {order.bodyMakeObj?.make.wheelbase.title}mm
                                          </span>
                                        </div>
                                      )}
                                    {order.bodyMakeObj?.make.transmission !== null &&
                                      order.bodyMakeObj?.make.transmission !== '' && (
                                        <div className="orders__overview-panel-specs-row">
                                          <span className="orders__overview-panel-specs-title">Transmission:</span>
                                          <span className="orders__overview-panel-specs-value">
                                            {order.bodyMakeObj?.make.transmission}
                                          </span>
                                        </div>
                                      )}
                                    {order.bodyMakeObj?.make.engine_cap !== null &&
                                      order.bodyMakeObj?.make.engine_cap !== '' && (
                                        <div className="orders__overview-panel-specs-row">
                                          <span className="orders__overview-panel-specs-title">Engine Capacity:</span>
                                          <span className="orders__overview-panel-specs-value">
                                            {order.bodyMakeObj?.make.engine_cap}CC
                                          </span>
                                        </div>
                                      )}
                                    {order.bodyMakeObj?.make.gvw !== null && order.bodyMakeObj?.make.gvw !== '' && (
                                      <div className="orders__overview-panel-specs-row">
                                        <span className="orders__overview-panel-specs-title">
                                          Gross Vehicle Weight:
                                        </span>
                                        <span className="orders__overview-panel-specs-value">
                                          {order.bodyMakeObj?.make.gvw}kg
                                        </span>
                                      </div>
                                    )}
                                  </Panel>
                                </Collapse>
                                {/* Accessories section */}
                                <div className="orders__overview-smalltitle">Accessories</div>
                                <>
                                  {order.generalAccessoriesArray &&
                                    order.generalAccessoriesArray.length > 0 &&
                                    order.generalAccessoriesArray.map((accessory) => (
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
                                  {order.bodyRelatedAccessoriesArray &&
                                    order.bodyRelatedAccessoriesArray.length > 0 &&
                                    order.bodyRelatedAccessoriesArray.map((accessory) => (
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
                                  {order.dimensionRelatedAccessoriesArray &&
                                    order.dimensionRelatedAccessoriesArray.length > 0 &&
                                    order.dimensionRelatedAccessoriesArray.map((dimension) => (
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

                                {/* Processing fees section */}
                                <div className="orders__overview-smalltitle">Processing fees</div>
                                {miscellaneousArray.map((item) => (
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
                              </ol>
                              {/* Cargo subtotal */}
                              <div className="orders__overview-subtotal-outerdiv">
                                <span className="orders__overview-subtotal-text">SUBTOTAL</span>
                                <div className="orders__overview-subtotal">
                                  <NumberFormat
                                    value={modelSubtotalPrice.toFixed(2)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                  />
                                </div>
                              </div>
                            </Panel>
                          </Collapse>

                          {/* ======================== */}
                          {/* Road Tax and Insurance */}
                          {/* ======================== */}
                          <div className="flex space-between">
                            <span className="orders__overview-row-content-subheader">Road Tax and Insurance</span>
                            <span className="orders__overview-row-content-subheader-price">
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                value={insuranceSubtotalPrice.toFixed(2)}
                              />
                            </span>
                          </div>
                          <Collapse
                            ghost
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                          >
                            <Panel className="orders__overview-panel" header="View more" key="insurance">
                              <ul className="orders__overview-list">
                                {insuranceArray.map((item) => (
                                  <li key={uuidv4()}>
                                    <div className="flex space-between">
                                      <span> {item.title}</span>
                                      <span>
                                        <NumberFormat
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          value={item.price.toFixed(2)}
                                        />
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              {/* Insurance subtotal */}
                              <div className="orders__overview-subtotal-outerdiv">
                                <span className="orders__overview-subtotal-text">SUBTOTAL</span>
                                <div className="orders__overview-subtotal">
                                  <NumberFormat
                                    value={insuranceSubtotalPrice.toFixed(2)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                  />
                                </div>
                              </div>
                            </Panel>
                          </Collapse>

                          <hr />
                          {/* ======================== */}
                          {/* Total Price */}
                          {/* ======================== */}
                          <div className="flex space-between">
                            <span className="orders__overview-row-content-subheader">Total Price</span>
                            <span className="orders__overview-row-content-subheader-price--prediscount">
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                value={prediscountTotalPrice.toFixed(2)}
                              />
                            </span>
                          </div>

                          {/* ======================== */}
                          {/* DISCOUNT */}
                          {/* ======================== */}
                          <div className="flex space-between">
                            <span className="orders__overview-row-content-subheader orders__overview-row-content-subheader--discount">
                              Discount
                            </span>
                            <span className="orders__overview-row-content-subheader-price">
                              -&nbsp;
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                value={Math.abs(discountPrice).toFixed(2)}
                              />
                            </span>
                          </div>
                          <hr />
                          {/* ======================== */}
                          {/* TOTAL ON THE ROAD PRICE */}
                          {/* ======================== */}
                          <div className="flex-align-center space-between">
                            <span className="orders__overview-row-content-subheader--totalroadprice">
                              TOTAL ON THE ROAD PRICE
                            </span>

                            <span className="orders__overview-row-content-header-price">
                              RM&nbsp;
                              <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                value={grandTotalPrice.toFixed(2)}
                              />
                            </span>
                          </div>
                        </section>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Empty description={<span>You have no order currently</span>}>
                  <Button type="primary" onClick={() => history.push('/sales')}>
                    Make a new order
                  </Button>
                </Empty>
              )}
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};

interface StateProps {
  // array for local orders
  localOrdersArray: TLocalOrderObj[];
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  if ('sales' in state) {
    // Arrays
    return {
      localOrdersArray: state.sales.localOrdersArray,
    };
  }
};

interface DispatchProps {
  onRemoveAnOrder: typeof actions.removeAnOrder;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return { onRemoveAnOrder: (index, localOrdersArray) => dispatch(actions.removeAnOrder(index, localOrdersArray)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrdersPage));

import React, { useState, useContext } from 'react';
/*components*/
/*3rd party lib*/
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Collapse, Dropdown, Empty, Menu, Skeleton } from 'antd';
import { CaretDownOutlined, InfoCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
/* Util */
import { AppActions } from 'src/store/types';
import { TUserAccess } from 'src/store/types/auth';
import { convertSpaceInStringWithChar } from 'src/shared/Utils';
import { SalesPageContext } from 'src/containers/SalesPage/SalesPageContext';
import { TReceivedAccessoryObj } from 'src/store/types/dashboard';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';

const { Panel } = Collapse;

export interface OverviewComponentProps {
  accessObj?: TUserAccess;
  localOrdersArray?: TLocalOrderObj[];
  displayOrdersAmount?: number; //determine how many orders there should be
  onRemoveAnOrder?: (index: number, localOrdersArray: TLocalOrderObj[]) => AppActions;
}

type Props = OverviewComponentProps & RouteComponentProps;

const OverviewComponent: React.FC<Props> = ({ history }) => {
  // for the collapsible to be opened on load
  const [expandedModelCollapse, setExpandedModelCollapse] = useState<string | string[]>([]);
  const [expandedInsuranceCollapse, setExpandedInsuranceCollapse] = useState<string[]>([]);

  const salesPageContext = useContext(SalesPageContext);
  if (salesPageContext === null) {
    return null;
  }

  const { accessObj, localOrdersArray, displayOrdersAmount = 1, onRemoveAnOrder } = salesPageContext;

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

  if (accessObj === undefined) {
    return null;
  }
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <div>
        {localOrdersArray && localOrdersArray.length > 0 ? (
          [...localOrdersArray]
            .reverse()
            .slice(0, displayOrdersAmount) //here it would display how many orders based on second param in slice
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
                generalAccessoriesTotalPrice + bodyRelatedAccessoriesTotalPrice + dimensionRelatedAccessoriesTotalPrice;

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

              modelSubtotalPrice = (modelSubtotalPrice * 95) / 100;
              let roundedModelSubtotalPrice = -Math.round(-modelSubtotalPrice / 1000) * 1000;
              roundedModelSubtotalPrice = (roundedModelSubtotalPrice - 1000) * 0.0325 + 441.8;
              roundedModelSubtotalPrice = roundedModelSubtotalPrice * 1.06 + 235;

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
                  // price: 4733.96,
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
                        if (order.bodyMakeObj) {
                          const { length, make_wheelbase, body } = order.bodyMakeObj;
                          history.push({
                            pathname: `/quotation/${convertSpaceInStringWithChar(
                              `${make_wheelbase.make.brand.title}-${make_wheelbase.make.series}-${length.title}ft-${body.title}-${make_wheelbase.make.title}`,
                              '',
                            )}`,
                            state: {
                              lengthObj: order.lengthObj,
                              bodyMakeObj: order.bodyMakeObj,
                              insuranceArray: insuranceArray,
                              grandTotalPrice: grandTotalPrice,
                              modelSubtotalPrice: modelSubtotalPrice,
                              processingFeesArray: processingFeesArray,
                              generalAccessoriesArray: order.generalAccessoriesArray,
                              bodyRelatedAccessoriesArray: order.bodyRelatedAccessoriesArray,
                              dimensionRelatedAccessoriesArray: order.dimensionRelatedAccessoriesArray,
                            },
                          });
                        }
                      }}
                    >
                      Generate quotation
                    </Menu.Item>
                  )}
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

              let collpaseKeyArray = [`model${index}`];
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
                      {order.bodyMakeObj && order.bodyMakeObj?.make_wheelbase.make.images.length > 0 ? (
                        <img
                          alt={order.bodyMakeObj?.make_wheelbase.make.images[0].filename}
                          src={order.bodyMakeObj?.make_wheelbase.make.images[0].url}
                        />
                      ) : (
                        <div className="sales__overview-row-image">
                          <Skeleton.Image className="sales__section-img-skeleton" />
                        </div>
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
                            {`${order.bodyMakeObj?.make_wheelbase.make.brand.title} ${order.bodyMakeObj?.make_wheelbase.make.series}  ${order.bodyMakeObj?.make_wheelbase.make.title}`}
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
                        activeKey={
                          accessObj.showPriceSalesPage ? expandedModelCollapse : [...collpaseKeyArray, `model${index}`]
                        }
                        onChange={onModelCollapsed}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                      >
                        <Panel
                          showArrow={accessObj.showPriceSalesPage ? true : false}
                          className="sales__overview-panel"
                          header={
                            accessObj.showPriceSalesPage
                              ? expandedModelCollapse.includes(`model${index}`)
                                ? 'View less'
                                : 'View more'
                              : ''
                          }
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
                                    {order.bodyMakeObj && order.bodyMakeObj?.make_wheelbase.make.year === null
                                      ? /* if year doesnt exist, dont show anything except the model name*/
                                        order.bodyMakeObj.make_wheelbase.make.title
                                      : order.bodyMakeObj &&
                                        /* else check if year is equal to current, show "NEW MODEL YEAR CURRENTYEAR - model name"*/
                                        parseInt(order.bodyMakeObj.make_wheelbase.make.year) ===
                                          parseInt(moment().year().toString())
                                      ? `NEW MODEL YEAR ${order.bodyMakeObj.make_wheelbase.make.year} - ${order.bodyMakeObj.make_wheelbase.make.title}`
                                      : /* else show MODEL YEAR - model name */
                                        order.bodyMakeObj &&
                                        `MODEL ${order.bodyMakeObj.make_wheelbase.make.year} ${order.bodyMakeObj.make_wheelbase.make.title}`}
                                  </span>
                                </span>
                                {accessObj.showPriceSalesPage && (
                                  <span>
                                    <NumberFormat
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      value={order.bodyMakeObj?.make_wheelbase.make.price.toFixed(2)}
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
                                  <div>
                                    <span className="sales__overview-panel-specs-header">
                                      <InfoCircleOutlined /> Click here to view more specs
                                    </span>
                                  </div>
                                }
                                key="specs"
                              >
                                <div key={uuidv4()} className="sales__overview-panel-specs-div">
                                  <div className="sales__overview-panel-specs-innerdiv">
                                    <div key={uuidv4()} className="sales__overview-panel-specs-column">
                                      {bodyMakeDetailRowArray.slice(0, 6).map((bodyMake) => (
                                        <div key={uuidv4()} className="sales__overview-panel-specs-row">
                                          <span className="sales__overview-panel-specs-title">{bodyMake.title}</span>
                                          <span className="sales__overview-panel-specs-value">{bodyMake.data}</span>
                                        </div>
                                      ))}
                                    </div>
                                    <div key={uuidv4()} className="sales__overview-panel-specs-column">
                                      {bodyMakeDetailRowArray.slice(6).map((bodyMake) => (
                                        <div key={uuidv4()} className="sales__overview-panel-specs-row">
                                          <span className="sales__overview-panel-specs-title">{bodyMake.title}</span>
                                          <span className="sales__overview-panel-specs-value">{bodyMake.data}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </Panel>
                            </Collapse>
                            {/* Accessories section */}
                            <div className="sales__overview-smalltitle">Accessories</div>
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
                        </>
                      )}
                      {/* <hr /> */}

                      {/* ======================== */}
                      {/* Total Price */}
                      {/* ======================== */}
                      {/* {accessObj.showPriceSalesPage && (
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
                      )} */}

                      {/* ======================== */}
                      {/* DISCOUNT */}
                      {/* ======================== */}
                      {/* {accessObj.showPriceSalesPage && (
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
                        </>
                      )} */}
                      {/* ======================== */}
                      {/* TOTAL ON THE ROAD PRICE  */}
                      {/* ======================== */}
                      {/* change to total price because there's no more final discount */}
                      {accessObj.showPriceSalesPage && (
                        <div className="flex-align-center space-between sales__overview-row-content-subheader--totalroadprice">
                          <span className="sales__overview-row-content-subheader--totalroadprice-text">
                            TOTAL PRICE
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
            })
        ) : (
          <div className="sales__overview-empty-div">
            <Empty description={<span>You have no order currently</span>}>
              <Button className="sales__overview-empty-btn" type="primary" onClick={() => history.push('/sales')}>
                Make a new order
              </Button>
            </Empty>
          </div>
        )}
      </div>
    </>
  );
};
export default withRouter(OverviewComponent);

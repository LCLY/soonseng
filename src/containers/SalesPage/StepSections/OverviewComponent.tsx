import React, { useState, useContext } from 'react';
/*components*/
/*3rd party lib*/
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Collapse, Dropdown, Empty, Form, Menu, Modal, Skeleton } from 'antd';
import { CaretDownOutlined, InfoCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
/* Util */
import { AppActions } from 'src/store/types';
import * as actions from 'src/store/actions/index';
import { TUserAccess } from 'src/store/types/auth';
import { SalesPageContext } from 'src/containers/SalesPage/SalesPageContext';
import { TReceivedAccessoryObj } from 'src/store/types/dashboard';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';
import { convertPriceToFloat, convertSpaceInStringWithChar, handleKeyDown } from 'src/shared/Utils';

const { Panel } = Collapse;

export interface OverviewComponentProps {
  accessObj?: TUserAccess;
  currentStep?: number; //for steps component
  displayOrdersAmount?: number; //determine how many orders there should be
  localOrdersArray?: TLocalOrderObj[];
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  onRemoveAnOrder?: (orderId: string, localOrdersArray: TLocalOrderObj[]) => AppActions;
}

type Props = OverviewComponentProps & RouteComponentProps & DispatchProps;

const OverviewComponent: React.FC<Props> = ({ history }) => {
  const [discountForm] = Form.useForm();
  // for the collapsible to be opened on load
  const [clickedOrder, setClickedOrder] = useState<TLocalOrderObj | null>(null);
  const [expandedModelCollapse, setExpandedModelCollapse] = useState<string | string[]>([]);
  const [expandedInsuranceCollapse, setExpandedInsuranceCollapse] = useState<string[]>([]);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const salesPageContext = useContext(SalesPageContext);
  if (salesPageContext === null) {
    return null;
  }

  const { accessObj, onRemoveAnOrder, localOrdersArray, displayOrdersAmount = 1 } = salesPageContext;

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
      <Modal
        title="Setting Discount"
        visible={showDiscountModal}
        onCancel={() => {
          setShowDiscountInput(false);
          setShowDiscountModal(false);
        }}
        footer={[
          <Button
            key={uuidv4()}
            onClick={() => {
              setShowDiscountInput(false);
              setShowDiscountModal(false);
            }}
          >
            Cancel
          </Button>,
          <React.Fragment key={uuidv4()}>
            {showDiscountInput ? null : (
              <Button
                onClick={() => {
                  if (clickedOrder && clickedOrder.bodyMakeObj) {
                    const { length, make_wheelbase, body } = clickedOrder.bodyMakeObj;
                    history.push({
                      pathname: `/quotation/${convertSpaceInStringWithChar(
                        `${make_wheelbase.make.brand.title}-${make_wheelbase.make.series}-${length.title}ft-${body.title}-${make_wheelbase.make.title}`,
                        '',
                      )}/${clickedOrder.id}`,
                    });
                  }
                }}
              >
                No<span className="mobilehide-inline-block">&nbsp;, Proceed To Quotation</span>
              </Button>
            )}
          </React.Fragment>,
          <React.Fragment key={uuidv4()}>
            {showDiscountInput ? (
              <Button
                type="primary"
                onClick={() => {
                  discountForm.submit();
                }}
              >
                Generate Quotation
              </Button>
            ) : (
              <Button type="primary" onClick={() => setShowDiscountInput(true)}>
                Yes
              </Button>
            )}
          </React.Fragment>,
        ]}
      >
        {showDiscountInput ? (
          <Form
            form={discountForm}
            onKeyDown={(e) => {
              handleKeyDown(e, discountForm);
            }}
            onFinish={(values) => {
              if (clickedOrder && clickedOrder.bodyMakeObj) {
                const { length, make_wheelbase, body } = clickedOrder.bodyMakeObj;
                history.push({
                  pathname: `/quotation/${convertSpaceInStringWithChar(
                    `${make_wheelbase.make.brand.title}-${make_wheelbase.make.series}-${length.title}ft-${body.title}-${make_wheelbase.make.title}`,
                    '',
                  )}/${clickedOrder.id}/${convertPriceToFloat(values.discount)}`,
                });
              }
            }}
          >
            <Form.Item
              className="make__form-item"
              label="Discount"
              name="discount"
              rules={[{ required: true, message: 'Input discount here!' }]}
            >
              <NumberFormat
                placeholder="Type discount here"
                className="ant-input"
                thousandSeparator={true}
                prefix={'RM '}
              />
            </Form.Item>
          </Form>
        ) : (
          <div>Are you setting discount for this quotation?</div>
        )}
      </Modal>
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

              let processingFeesArray = Object.values(order.chargesFeesDict).filter(
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
              let generalAccessoriesTotalPrice = Object.values(order.generalAccessoriesArray).reduce(
                (currentTotal: number, accessoryObj: TReceivedAccessoryObj) => {
                  return currentTotal + accessoryObj.price;
                },
                0,
              );

              // get total of body related accessories
              let bodyRelatedAccessoriesTotalPrice = Object.values(order.bodyRelatedAccessoriesArray).reduce(
                (currentTotal: number, accessoryObj: TReceivedAccessoryObj) => {
                  return currentTotal + accessoryObj.price;
                },
                0,
              );
              // get total of dimension related accessories
              let dimensionRelatedAccessoriesTotalPrice = Object.values(order.dimensionRelatedAccessoriesArray).reduce(
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

              let tempModelSubtotalPrice = modelSubtotalPrice;
              let roundedModelSubtotalPrice = -Math.round(-tempModelSubtotalPrice / 1000) * 1000;
              roundedModelSubtotalPrice = (roundedModelSubtotalPrice - 1000) * 0.0325 + 441.8;
              roundedModelSubtotalPrice = roundedModelSubtotalPrice * 1.06 + 235;

              let JPJEHakMilik = Object.values(order.chargesFeesDict).filter(
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
                        setShowDiscountModal(true);
                        setClickedOrder(order);
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
                                      <span className="sales__overview-dash">-</span>
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
                                  <span className="sales__overview-highlight-model">
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
                                      <span className="sales__overview-dash">-</span>
                                    )}
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
                                <div className="sales__overview-panel-specs-div">
                                  <div className="sales__overview-panel-specs-innerdiv">
                                    <div className="sales__overview-panel-specs-column">
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
                              Object.keys(order.generalAccessoriesArray).length === 0 &&
                              Object.keys(order.bodyRelatedAccessoriesArray).length === 0 &&
                              Object.keys(order.dimensionRelatedAccessoriesArray).length === 0 && <span>None</span>}
                            <>
                              {order.generalAccessoriesArray &&
                                Object.keys(order.generalAccessoriesArray).length > 0 &&
                                Object.values(order.generalAccessoriesArray).map((accessory) => (
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
                                            <span className="sales__overview-dash">-</span>
                                          )}
                                        </span>
                                      )}
                                    </div>
                                  </li>
                                ))}
                            </>
                            <>
                              {order.bodyRelatedAccessoriesArray &&
                                Object.keys(order.bodyRelatedAccessoriesArray).length > 0 &&
                                Object.values(order.bodyRelatedAccessoriesArray).map((accessory) => (
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
                                            <span className="sales__overview-dash">-</span>
                                          )}
                                        </span>
                                      )}
                                    </div>
                                  </li>
                                ))}
                            </>
                            <>
                              {order.dimensionRelatedAccessoriesArray &&
                                Object.keys(order.dimensionRelatedAccessoriesArray).length > 0 &&
                                Object.values(order.dimensionRelatedAccessoriesArray).map((dimension) => (
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
                                            <span className="sales__overview-dash">-</span>
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

interface DispatchProps {
  onSetQuotationDiscount: typeof actions.setQuotationDiscount;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onSetQuotationDiscount: (quotationDiscount) => dispatch(actions.setQuotationDiscount(quotationDiscount)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(OverviewComponent));

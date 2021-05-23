import React, { useEffect, useState } from 'react';
import './OrdersSlidebar.scss';
/* components */
/* 3rd party lib */
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { RouteComponentProps, withRouter } from 'react-router';
import { InfoCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Button, Dropdown, Tooltip, Empty, Menu, Collapse, Checkbox, Modal } from 'antd';
/* Util */
import { RootState } from 'src';
import { TUserAccess } from 'src/store/types/auth';
import * as actions from 'src/store/actions/index';
import { TReceivedAccessoryObj } from 'src/store/types/dashboard';
import { ROUTE_CATALOG, ROUTE_COMPARISON, ROUTE_ORDERS } from 'src/shared/routes';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';
import { convertSpaceInStringWithChar } from 'src/shared/Utils';
const { Panel } = Collapse;

interface OrdersSlidebarProps {
  style: any;
  showOrderSlidebar: boolean;
  setShowOrderSlidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = OrdersSlidebarProps & StateProps & DispatchProps & RouteComponentProps;

const OrdersSlidebar: React.FC<Props> = ({
  style,
  history,
  accessObj,
  localOrdersDict,
  // onRemoveAnOrder,
  setShowOrderSlidebar,
  onSetLocalOrdersDict,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // const [discountForm] = Form.useForm();
  // const [clickedOrder, setClickedOrder] = useState<TLocalOrderObj | null>(null);
  // const [showDiscountModal, setShowDiscountModal] = useState(false);
  // const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [totalChecked, setTotalChecked] = useState(0);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedMoreThanFour, setSelectedMoreThanFour] = useState(false);
  const [expandedModelCollapse, setExpandedModelCollapse] = useState<string | string[]>([]);
  const [expandedInsuranceCollapse, setExpandedInsuranceCollapse] = useState<string[]>([]);
  const [checkedConfigurations, setCheckedConfigurations] = useState<{ [orderId: string]: boolean } | null>(null);

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

  // use the index as key and set true or false value to it
  const onCheckedChanged = (e: CheckboxChangeEvent, orderId: string) => {
    setCheckedConfigurations({ ...checkedConfigurations, [orderId]: e.target.checked });
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  useEffect(() => {
    if (localOrdersDict) {
      Object.keys(localOrdersDict).map((orderId) =>
        setCheckedConfigurations((prevState) => {
          return { ...prevState, [orderId]: false };
        }),
      );
    }
  }, [localOrdersDict, setCheckedConfigurations]);

  useEffect(() => {
    if (checkedConfigurations) {
      let totalCount = 0;
      // convert the values into array
      Object.values(checkedConfigurations).forEach((bool) => {
        if (bool === true) {
          totalCount++;
          setTotalChecked(totalCount);
          // loop through the booleans and count if there are 4 trues, set the bool
          if (totalCount === 4) {
            setSelectedMoreThanFour(true);
          } else {
            setSelectedMoreThanFour(false);
          }
        } else {
          setTotalChecked(totalCount);
        }
      });
    }
  }, [checkedConfigurations]);

  /* ================================================== */
  /* ================================================== */
  if (accessObj === undefined) {
    return null;
  }
  return (
    <>
      {/* ========================================================= */}
      {/* Discount modal */}
      {/* ========================================================= */}
      {/* <Modal
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
                    history.push(
                      `/quotation/${convertSpaceInStringWithChar(
                        `${make_wheelbase.make.brand.title}-${make_wheelbase.make.series}-${length.title}ft-${body.title}-${make_wheelbase.make.title}`,
                        '',
                      )}/${clickedOrder.id}`,
                    );
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
                history.push(
                  `/quotation/${convertSpaceInStringWithChar(
                    `${make_wheelbase.make.brand.title}-${make_wheelbase.make.series}-${length.title}ft-${body.title}-${make_wheelbase.make.title}`,
                    '',
                  )}/${clickedOrder.id}`,
                );

                let tempOrder = { ...localOrdersDict };
                tempOrder[clickedOrder.id]['discount'] = convertPriceToFloat(values.discount);
                onSetLocalOrdersDict(tempOrder);
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
      </Modal> */}

      {/* ========================================================= */}
      {/* Comparison modal */}
      {/* ========================================================= */}
      <Modal
        title="Select up to 4 configurations to compare"
        visible={compareModalOpen}
        okText="Compare"
        okButtonProps={{ disabled: totalChecked <= 1 ? true : false }}
        onOk={() => {
          // filter out array that has true
          if (checkedConfigurations) {
            let tempOrderIdArray: string[] = [];
            // check if value is true then push the index into the array
            for (let orderId in checkedConfigurations) {
              if (checkedConfigurations[orderId] === true) {
                tempOrderIdArray.push(orderId);
              }
            }

            let order_ids_combination = '';

            tempOrderIdArray.forEach((orderId, index) => {
              // if its the first then just straight add the id
              if (index === 0) {
                order_ids_combination = order_ids_combination + `order${index + 1}=${orderId}`;
              } else {
                // if its after the first then add & infront of the string
                order_ids_combination = order_ids_combination + `&order${index + 1}=${orderId}`;
              }
            });

            //adding the ids to the route as params
            history.push(`${ROUTE_COMPARISON}?${order_ids_combination}`);
          }
        }}
        onCancel={() => setCompareModalOpen(false)}
      >
        {localOrdersDict !== undefined &&
          checkedConfigurations &&
          Object.values(localOrdersDict).map((order) => {
            const { bodyMakeObj } = order;
            return (
              <React.Fragment key={uuidv4()}>
                {bodyMakeObj && (
                  <div>
                    <Checkbox
                      // whenever user selected more than four, the rest that are not checked will be disabled
                      disabled={selectedMoreThanFour && checkedConfigurations[order.id] === false}
                      className="orders__compare-checkbox"
                      checked={checkedConfigurations[order.id]}
                      onChange={(e) => onCheckedChanged(e, order.id)}
                    >
                      <div>
                        {bodyMakeObj.length.title}ft&nbsp;
                        {bodyMakeObj.body.title}&nbsp;(
                        {bodyMakeObj.make_wheelbase.make.brand.title}&nbsp;
                        {bodyMakeObj.make_wheelbase.make.series})
                      </div>
                    </Checkbox>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </Modal>

      <div className="ordersslidebar__div" style={style}>
        <div className="ordersslidebar__top-div">
          <div className="ordersslidebar__title">
            <a className="ordersslidebar__title-link" href={ROUTE_ORDERS}>
              Orders
            </a>
          </div>
          <div className="flex-align-center">
            {localOrdersDict && (
              <div className="ordersslidebar__total-items">
                <div>
                  Total:&nbsp;
                  <span className="ordersslidebar__total-text">{Object.keys(localOrdersDict).length}&nbsp;items</span>
                </div>

                <div className="ordersslidebar__btn-comparison-div">
                  <Button
                    disabled={Object.keys(localOrdersDict).length <= 1}
                    className="ordersslidebar__btn-comparison"
                    type="primary"
                    onClick={() => setCompareModalOpen(true)}
                  >
                    Compare
                  </Button>
                </div>
              </div>
            )}
            <i className="far fa-times-circle ordersslidebar__icon" onClick={() => setShowOrderSlidebar(false)}></i>
          </div>
        </div>

        <div className="ordersslidebar__bottom-div">
          {localOrdersDict && Object.keys(localOrdersDict).length > 0 ? (
            [...Object.values(localOrdersDict)]
              .slice(0) //here it would display how many orders based on second param in slice
              .reverse()
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
                let dimensionRelatedAccessoriesTotalPrice = Object.values(
                  order.dimensionRelatedAccessoriesArray,
                ).reduce((currentTotal: number, dimensionAccessoryObj: TReceivedDimensionAccessoryObj) => {
                  return currentTotal + dimensionAccessoryObj.price;
                }, 0);

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

                // let tempModelSubtotalPrice = modelSubtotalPrice;
                // tempModelSubtotalPrice = (tempModelSubtotalPrice * 95) / 100;
                // let roundedModelSubtotalPrice = -Math.round(-tempModelSubtotalPrice / 1000) * 1000;
                // roundedModelSubtotalPrice = (roundedModelSubtotalPrice - 1000) * 0.0325 + 441.8;
                // roundedModelSubtotalPrice = roundedModelSubtotalPrice * 1.06 + 235;

                // let JPJEHakMilik = Object.values(order.chargesFeesDict).filter(
                //   (charges) => charges.title === 'JPJ Registration & E Hak Milik',
                // );

                // let insuranceArray = [
                //   {
                //     title: 'Road tax (1year)',
                //     price: 1015,
                //   },
                //   {
                //     title: JPJEHakMilik[0].title,
                //     price: JPJEHakMilik[0].price,
                //   },
                //   {
                //     title: 'INSURANCE PREMIUM (windscreen included)',
                //     price: roundedModelSubtotalPrice,
                //   },
                // ];

                /* ======================== */
                // Insurance subtotal price
                /* ====================== */
                if (order.insuranceDict === null) return null;
                let insuranceSubtotalPrice = Object.values(order.insuranceDict).reduce(
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
                  <Menu className="catalog__menu">
                    {accessObj.showPriceSalesPage && (
                      <Menu.Item
                        className="catalog__menu-item"
                        onClick={() => {
                          // setShowDiscountModal(true);
                          // setClickedOrder(order);

                          if (order && order.bodyMakeObj) {
                            const { length, make_wheelbase, body } = order.bodyMakeObj;
                            history.push(
                              `/quotation/${convertSpaceInStringWithChar(
                                `${make_wheelbase.make.brand.title}-${make_wheelbase.make.series}-${length.title}ft-${body.title}-${make_wheelbase.make.title}`,
                                '',
                              )}/${order.id}`,
                            );
                          }
                        }}
                      >
                        Generate quotation
                      </Menu.Item>
                    )}
                    <Menu.Item
                      danger
                      className="catalog__menu-item--danger"
                      onClick={() => {
                        // if (onRemoveAnOrder !== undefined) {
                        //   console.log('hello');
                        //   onRemoveAnOrder(order.id, localOrdersArray);
                        // }
                        if (localOrdersDict === undefined) return;
                        let copiedLocalOrdersDict = { ...localOrdersDict };
                        // copy the object first then remove the item from the object, then update the whole thing

                        delete copiedLocalOrdersDict[order.id];
                        onSetLocalOrdersDict(copiedLocalOrdersDict);
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

                        <div className="ordersslidebar__collapse-outerdiv">
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
                                {/* Extension */}
                                {order.bodyMakeObj &&
                                  !order.bodyMakeObj.make_wheelbase.original &&
                                  order.bodyMakeObj.make_wheelbase.price !== 0 && (
                                    <li>
                                      <div className={`quotation__orderedlist-row`}>
                                        <div>UBS Extension Price</div>
                                        <div>
                                          <>
                                            {order.bodyMakeObj.make_wheelbase.price &&
                                            order.bodyMakeObj.make_wheelbase.price !== 0 ? (
                                              <NumberFormat
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                value={order.bodyMakeObj.make_wheelbase.price.toFixed(2)}
                                              />
                                            ) : (
                                              <span className="sales__overview-dash">-</span>
                                            )}
                                          </>
                                        </div>
                                      </div>
                                    </li>
                                  )}

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
                        </div>

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

                            <div className="ordersslidebar__collapse-outerdiv">
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
                                    {Object.values(order.insuranceDict).map((item) => (
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
                            </div>
                          </>
                        )}

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
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="ordersslidebar__overview-empty-div">
              <Empty description={<span>You have no order currently</span>}>
                <Button className="ordersslidebar__overview-empty-btn" type="primary">
                  <a className="ordersslidebar__overview-link" href={ROUTE_CATALOG}>
                    Make a new order
                  </a>
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
  localOrdersDict?: { [key: string]: TLocalOrderObj };
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    localOrdersDict: state.sales.localOrdersDict,
  };
};

interface DispatchProps {
  onSetLocalOrdersDict: typeof actions.setLocalOrdersDict;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onSetLocalOrdersDict: (localOrdersDict) => dispatch(actions.setLocalOrdersDict(localOrdersDict)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrdersSlidebar));

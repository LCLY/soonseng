import React, { useState, useEffect } from 'react';
import './QuotationPage.scss';
/* components */
import QuotationPriceInput from './QuotationPriceInput';
import QuotationStringInput from './QuotationStringInput';
/* 3rd party lib */
import _ from 'lodash';
import moment from 'moment';
import { Select, DatePicker } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import { RouteComponentProps, withRouter } from 'react-router-dom';
/* Util */
import { TUserAccess } from 'src/store/types/auth';
import { standardAccessoriesSelectOptions } from './QuotationPage';
import { IInsurance, TInsuranceDict, TLocalOrderObj } from 'src/store/types/sales';
import { TReceivedBrandObj, TReceivedChargesFeesObj } from 'src/store/types/dashboard';

interface QuotationComponentProps {
  inEditPriceMode?: boolean;
  quotationOrder: TLocalOrderObj;
  currentBrandObj: TReceivedBrandObj;
  accessObj: TUserAccess | undefined;
  tempEditChanges?: TLocalOrderObj | null;
  localOrdersDict: { [key: string]: TLocalOrderObj };
  setInEditPriceMode?: React.Dispatch<React.SetStateAction<boolean>>;
  onSetEditChanges?: React.Dispatch<React.SetStateAction<TLocalOrderObj | null>>;
}

interface MatchParams {
  order_id: string;
}

type Props = QuotationComponentProps & RouteComponentProps<MatchParams, any, any>;

const QuotationComponent: React.FC<Props> = ({
  accessObj,
  currentBrandObj,
  inEditPriceMode,
  tempEditChanges,
  quotationOrder,
  onSetEditChanges,
  setInEditPriceMode,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [grandTotalPrice, setGrandTotalPrice] = useState(0);
  const [modelSubtotalPrice, setModelSubtotalPrice] = useState(0);

  const [selectValues, setSelectValues] = useState<string[]>([]);
  const [currentOrderObj, setCurrentOrderObj] = useState<TLocalOrderObj | null>(null);

  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  useEffect(() => {
    if (tempEditChanges !== null && tempEditChanges !== undefined) {
      let totalAccessoriesPrice = 0;

      // get the total price from all accessories array
      const getTotalPrice = (accessoriesArray: any) => {
        return Object.values(accessoriesArray).reduce((currentTotal: number, accessoryObj: any) => {
          return currentTotal + accessoryObj.price;
        }, 0);
      };

      const getTotalProcessingFees = (processingFeesDict: { [id: string]: TReceivedChargesFeesObj }) => {
        return Object.values(processingFeesDict).reduce((currentTotal: number, processingFeeObj: any) => {
          return currentTotal + processingFeeObj.price;
        }, 0);
      };
      const getTotalInsurance = (insuranceDict: TInsuranceDict) => {
        return Object.values(insuranceDict).reduce((currentTotal: number, insuranceObj: IInsurance) => {
          return currentTotal + insuranceObj.price;
        }, 0);
      };

      let generalAccessoriesTotalPrice = inEditPriceMode
        ? getTotalPrice(tempEditChanges.generalAccessoriesArray)
        : getTotalPrice(quotationOrder.generalAccessoriesArray);
      let bodyRelatedAccessoriesTotalPrice = inEditPriceMode
        ? getTotalPrice(tempEditChanges.bodyRelatedAccessoriesArray)
        : getTotalPrice(quotationOrder.bodyRelatedAccessoriesArray);
      let dimensionRelatedAccessoriesTotalPrice = inEditPriceMode
        ? getTotalPrice(tempEditChanges.dimensionRelatedAccessoriesArray)
        : getTotalPrice(quotationOrder.dimensionRelatedAccessoriesArray);

      totalAccessoriesPrice =
        generalAccessoriesTotalPrice + bodyRelatedAccessoriesTotalPrice + dimensionRelatedAccessoriesTotalPrice;

      let processingFees = inEditPriceMode
        ? getTotalProcessingFees(tempEditChanges.chargesFeesDict)
        : getTotalProcessingFees(quotationOrder.chargesFeesDict);

      if (quotationOrder.bodyMakeObj && tempEditChanges && tempEditChanges.bodyMakeObj) {
        if (inEditPriceMode) {
          setModelSubtotalPrice(
            tempEditChanges.bodyMakeObj.make_wheelbase.make.price +
              tempEditChanges.bodyMakeObj.price +
              tempEditChanges.bodyMakeObj.make_wheelbase.price +
              totalAccessoriesPrice +
              processingFees,
          );
        } else {
          setModelSubtotalPrice(
            quotationOrder.bodyMakeObj.make_wheelbase.make.price +
              quotationOrder.bodyMakeObj.price +
              quotationOrder.bodyMakeObj.make_wheelbase.price +
              totalAccessoriesPrice +
              processingFees,
          );
        }
      }

      if (quotationOrder.insuranceDict && tempEditChanges && tempEditChanges.insuranceDict) {
        let insuranceSubtotalPrice = inEditPriceMode
          ? getTotalInsurance(tempEditChanges.insuranceDict)
          : getTotalInsurance(quotationOrder.insuranceDict);

        setGrandTotalPrice(modelSubtotalPrice + insuranceSubtotalPrice);
      }
    }
  }, [
    inEditPriceMode,
    tempEditChanges,
    modelSubtotalPrice,
    quotationOrder.bodyMakeObj,
    quotationOrder.insuranceDict,
    quotationOrder.chargesFeesDict,
    quotationOrder.generalAccessoriesArray,
    quotationOrder.bodyRelatedAccessoriesArray,
    quotationOrder.dimensionRelatedAccessoriesArray,
  ]);

  // if (tempQuotationOrder.bodyMakeObj === null || currentBrandObj === null) return null;

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

  useEffect(() => {
    if (inEditPriceMode) {
      setCurrentOrderObj(quotationOrder);
    } else {
      if (tempEditChanges !== null && tempEditChanges !== undefined) {
        setCurrentOrderObj(tempEditChanges);
      }
    }
  }, [inEditPriceMode, quotationOrder, tempEditChanges]);

  useEffect(() => {
    let tempSelectValues: string[] = [];
    if (tempEditChanges) {
      // fill the options array
      tempEditChanges.standardAccessories.forEach((child) => {
        tempSelectValues.push(child);
      });
      setSelectValues(tempSelectValues);
    }
  }, [tempEditChanges]);

  useEffect(() => {
    let tempModelSubtotalPrice = modelSubtotalPrice;
    tempModelSubtotalPrice = (tempModelSubtotalPrice * 95) / 100;
    let roundedModelSubtotalPrice = -Math.round(-tempModelSubtotalPrice / 1000) * 1000;
    roundedModelSubtotalPrice = (roundedModelSubtotalPrice - 1000) * 0.0325 + 441.8;
    roundedModelSubtotalPrice = roundedModelSubtotalPrice * 1.06 + 235;

    if (onSetEditChanges !== undefined) {
      onSetEditChanges((prevState) => {
        let tempChanges = _.cloneDeep(prevState);

        if (tempChanges) {
          //_.set will change the object value using the path (indexKey in this case)
          _.set(tempChanges, 'insuranceDict.insurance_premium.price', roundedModelSubtotalPrice);
        }
        return tempChanges;
      });
    }
  }, [modelSubtotalPrice, onSetEditChanges]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {currentOrderObj && currentOrderObj.bodyMakeObj && (
        <section
          className={`quotation__section`}
          onDoubleClick={() => {
            if (accessObj === undefined || setInEditPriceMode === undefined) return;
            if (accessObj.showPriceSalesPage) {
              setInEditPriceMode(true);
            }
          }}
        >
          <div className={`quotation__section-innerdiv`}>
            {/* Top div */}
            <div className={`quotation__top-div`}>
              <div>
                {leftImageUrl !== '' && (
                  <img alt="leftlogo" className={`quotation__logo`} src={leftImageUrl} crossOrigin="anonymous" />
                )}
              </div>
              <div>
                <div className={`quotation__top-title`}>
                  SOON&nbsp;SENG&nbsp;MOTORS&nbsp;ENTERPRISE&nbsp;(1988)&nbsp;SDN&nbsp;BHD
                  <br />
                  HINO&nbsp;3S&nbsp;DEALER&nbsp;KELANTAN
                </div>
                <div className={`quotation__top-address`}>
                  Lot 2776, Jalan Long Yunus, Kawasan MIEL Lundang, 15200 Kota Bharu, Kel.
                </div>
                <div className={`quotation__top-contacts`}>
                  <div className="margin_r-1">Tel: 09-741 8836</div>
                  <div className="margin_r-1">Fax: 09-747 9836</div>
                  <div className="flex-align-center">
                    H/P:
                    {inEditPriceMode ? (
                      <QuotationStringInput
                        className="quotation__input-hpnumber"
                        indexKey="hpNumber"
                        tempEditChanges={tempEditChanges}
                        onSetEditChanges={onSetEditChanges}
                      />
                    ) : (
                      <span className={`quotation__top-contacts-highlight`}>&nbsp;{currentOrderObj.hpNumber}</span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                {rightImageUrl !== '' && (
                  <img alt="rightlogo" className={`quotation__logo`} src={rightImageUrl} crossOrigin="anonymous" />
                )}
              </div>
            </div>

            <div className={`quotation__header-2`}>
              <span className={`quotation__header-2-text`}>QUOTATION</span>
            </div>
            <div className={`quotation__subheader`}>
              We are pleased to append here with our quotation for the following commercial vehicle for your perusal
            </div>

            <section className={`quotation__content-div`}>
              <div className={`quotation__content-innerdiv`}>
                <div className={`quotation__makedetail-div`}>
                  <div className={`quotation__makedetail-div-left`}>
                    <div>Make / Model :&nbsp;{currentOrderObj.bodyMakeObj.make_wheelbase.make.title}</div>

                    <div>
                      Engine capacity :&nbsp;
                      {currentOrderObj.bodyMakeObj.make_wheelbase.make.engine_cap &&
                      currentOrderObj.bodyMakeObj.make_wheelbase.make.engine_cap !== '' ? (
                        currentOrderObj.bodyMakeObj.make_wheelbase.make.engine_cap
                      ) : (
                        <span className="margin_l-1"> - </span>
                      )}
                    </div>
                    <div>
                      Horsepower :&nbsp;
                      {currentOrderObj.bodyMakeObj.make_wheelbase.make.horsepower &&
                      currentOrderObj.bodyMakeObj.make_wheelbase.make.horsepower !== '' ? (
                        `${currentOrderObj.bodyMakeObj.make_wheelbase.make.horsepower}PS`
                      ) : (
                        <span className="margin_l-1"> - </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div>
                      Year :&nbsp;
                      {currentOrderObj.bodyMakeObj.make_wheelbase.make.year &&
                      currentOrderObj.bodyMakeObj.make_wheelbase.make.year !== '' &&
                      currentOrderObj.bodyMakeObj.make_wheelbase.make.year !== undefined &&
                      currentOrderObj.bodyMakeObj.make_wheelbase.make.year.toLowerCase() !==
                        'Invalid Date'.toLowerCase() ? (
                        currentOrderObj.bodyMakeObj.make_wheelbase.make.year
                      ) : (
                        <span className="margin_l-1"> - </span>
                      )}
                    </div>
                    <div>
                      Wheelbase :&nbsp;
                      {currentOrderObj.bodyMakeObj.make_wheelbase.wheelbase.title &&
                      currentOrderObj.bodyMakeObj.make_wheelbase.wheelbase.title !== '' ? (
                        `${currentOrderObj.bodyMakeObj.make_wheelbase.wheelbase.title}mm`
                      ) : (
                        <span className="margin_l-1"> - </span>
                      )}
                    </div>
                    <div>
                      GVW :&nbsp;
                      {currentOrderObj.bodyMakeObj.make_wheelbase.make.gvw &&
                      currentOrderObj.bodyMakeObj.make_wheelbase.make.gvw !== '' ? (
                        <span>
                          <NumberFormat
                            displayType={'text'}
                            thousandSeparator={true}
                            value={currentOrderObj.bodyMakeObj.make_wheelbase.make.gvw}
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
                  <div className={`quotation__price-div`}>
                    <div className={`quotation__price-unit`}>RM</div>
                    <div>
                      <ol type="a" className={`quotation__orderedlist`}>
                        <li>
                          <div className={`quotation__orderedlist-row--chassis quotation__orderedlist-row`}>
                            <div>
                              Chassis&nbsp;Price&nbsp;:&nbsp;
                              <span>
                                <span>
                                  {currentOrderObj.bodyMakeObj.make_wheelbase.make.year === null
                                    ? /* if year doesnt exist, dont show anything except the model name*/
                                      `${currentOrderObj.bodyMakeObj.make_wheelbase.make.title}`
                                    : /* else check if year is equal to current, show "NEW MODEL YEAR CURRENTYEAR - model name"*/
                                    parseInt(currentOrderObj.bodyMakeObj.make_wheelbase.make.year) ===
                                      parseInt(moment().format('YYYY').toString())
                                    ? `NEW MODEL YEAR ${
                                        currentOrderObj.bodyMakeObj.make_wheelbase.make.year &&
                                        currentOrderObj.bodyMakeObj.make_wheelbase.make.year !== '' &&
                                        currentOrderObj.bodyMakeObj.make_wheelbase.make.year !== undefined &&
                                        currentOrderObj.bodyMakeObj.make_wheelbase.make.year.toLowerCase() !==
                                          'Invalid date'.toLowerCase()
                                          ? currentOrderObj.bodyMakeObj.make_wheelbase.make.year
                                          : ''
                                      } - ${currentOrderObj.bodyMakeObj.make_wheelbase.make.title}`
                                    : /* else show MODEL YEAR - model name */
                                      `MODEL ${
                                        currentOrderObj.bodyMakeObj.make_wheelbase.make.year &&
                                        currentOrderObj.bodyMakeObj.make_wheelbase.make.year !== '' &&
                                        currentOrderObj.bodyMakeObj.make_wheelbase.make.year !== undefined &&
                                        currentOrderObj.bodyMakeObj.make_wheelbase.make.year.toLowerCase() !==
                                          'Invalid date'.toLowerCase()
                                          ? currentOrderObj.bodyMakeObj.make_wheelbase.make.year
                                          : ''
                                      } ${currentOrderObj.bodyMakeObj.make_wheelbase.make.title}`}
                                </span>
                              </span>
                            </div>
                            <div>
                              {inEditPriceMode ? (
                                <QuotationPriceInput
                                  tempEditChanges={tempEditChanges}
                                  onSetEditChanges={onSetEditChanges}
                                  indexKey={'bodyMakeObj.make_wheelbase.make.price'}
                                />
                              ) : (
                                <>
                                  {currentOrderObj.bodyMakeObj.make_wheelbase.make.price &&
                                  currentOrderObj.bodyMakeObj.make_wheelbase.make.price !== 0 ? (
                                    <NumberFormat
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      value={currentOrderObj.bodyMakeObj.make_wheelbase.make.price.toFixed(2)}
                                    />
                                  ) : (
                                    <span className="sales__overview-dash">-</span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className={`quotation__orderedlist-row`}>
                            <div>
                              Body Price :&nbsp;
                              <span>{`${currentOrderObj.lengthObj && currentOrderObj.lengthObj?.title}ft ${
                                currentOrderObj.bodyMakeObj.body.title
                              }`}</span>
                            </div>
                            <div>
                              {inEditPriceMode ? (
                                <QuotationPriceInput
                                  tempEditChanges={tempEditChanges}
                                  onSetEditChanges={onSetEditChanges}
                                  indexKey={'bodyMakeObj.price'}
                                />
                              ) : (
                                <>
                                  {currentOrderObj.bodyMakeObj.price && currentOrderObj.bodyMakeObj.price !== 0 ? (
                                    <NumberFormat
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      value={currentOrderObj.bodyMakeObj.price.toFixed(2)}
                                    />
                                  ) : (
                                    <span className="sales__overview-dash">-</span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </li>
                        {!currentOrderObj.bodyMakeObj.make_wheelbase.original &&
                          currentOrderObj.bodyMakeObj.make_wheelbase.price !== 0 && (
                            <li>
                              <div className={`quotation__orderedlist-row`}>
                                <div>UBS Extension Price</div>
                                <div>
                                  {inEditPriceMode ? (
                                    <QuotationPriceInput
                                      tempEditChanges={tempEditChanges}
                                      onSetEditChanges={onSetEditChanges}
                                      indexKey={'bodyMakeObj.make_wheelbase.price'}
                                    />
                                  ) : (
                                    <>
                                      {currentOrderObj.bodyMakeObj.make_wheelbase.price &&
                                      currentOrderObj.bodyMakeObj.make_wheelbase.price !== 0 ? (
                                        <NumberFormat
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          value={currentOrderObj.bodyMakeObj.make_wheelbase.price.toFixed(2)}
                                        />
                                      ) : (
                                        <span className="sales__overview-dash">-</span>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </li>
                          )}

                        {/* Accessories */}
                        <>
                          {Object.keys(currentOrderObj.generalAccessoriesArray).length > 0 &&
                            Object.values(currentOrderObj.generalAccessoriesArray).map((accessory) => (
                              <li key={`general${accessory.id}`}>
                                <div className="flex space-between">
                                  <span>{accessory.title} </span>
                                  <span>
                                    {inEditPriceMode && onSetEditChanges !== undefined ? (
                                      <QuotationPriceInput
                                        tempEditChanges={tempEditChanges}
                                        onSetEditChanges={onSetEditChanges}
                                        indexKey={`generalAccessoriesArray.${accessory.id}.price`}
                                      />
                                    ) : (
                                      <>
                                        {accessory.price && accessory.price !== 0 ? (
                                          <NumberFormat
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            value={accessory.price.toFixed(2)}
                                          />
                                        ) : (
                                          <span className="sales__overview-dash">-</span>
                                        )}
                                      </>
                                    )}
                                  </span>
                                </div>
                              </li>
                            ))}
                        </>
                        <>
                          {Object.keys(currentOrderObj.bodyRelatedAccessoriesArray).length > 0 &&
                            Object.values(currentOrderObj.bodyRelatedAccessoriesArray).map((accessory) => (
                              <li key={`body${accessory.id}`}>
                                <div className="flex space-between">
                                  <span>{accessory.title} </span>

                                  <span>
                                    {inEditPriceMode ? (
                                      <QuotationPriceInput
                                        tempEditChanges={tempEditChanges}
                                        onSetEditChanges={onSetEditChanges}
                                        indexKey={`bodyRelatedAccessoriesArray.${accessory.id}.price`}
                                      />
                                    ) : (
                                      <>
                                        {accessory.price && accessory.price !== 0 ? (
                                          <NumberFormat
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            value={accessory.price.toFixed(2)}
                                          />
                                        ) : (
                                          <span className="sales__overview-dash">-</span>
                                        )}
                                      </>
                                    )}
                                  </span>
                                </div>
                              </li>
                            ))}
                        </>
                        <>
                          {Object.keys(currentOrderObj.dimensionRelatedAccessoriesArray).length > 0 &&
                            Object.values(currentOrderObj.dimensionRelatedAccessoriesArray).map((dimension) => (
                              <li key={`dimension${dimension.id}`}>
                                <div className="flex space-between">
                                  <span> {dimension.accessory.title} </span>
                                  <span>
                                    {inEditPriceMode ? (
                                      <QuotationPriceInput
                                        tempEditChanges={tempEditChanges}
                                        onSetEditChanges={onSetEditChanges}
                                        indexKey={`dimensionRelatedAccessoriesArray.${dimension.id}.price`}
                                      />
                                    ) : (
                                      <>
                                        {dimension.price && dimension.price !== 0 ? (
                                          <NumberFormat
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            value={dimension.price.toFixed(2)}
                                          />
                                        ) : (
                                          <span className="sales__overview-dash">-</span>
                                        )}
                                      </>
                                    )}
                                  </span>
                                </div>
                              </li>
                            ))}
                        </>

                        {Object.values(currentOrderObj.chargesFeesDict).map((item) => (
                          <li key={`fees${item.id}`}>
                            <div className="flex space-between">
                              <span>{item.title}</span>
                              <span>
                                {inEditPriceMode ? (
                                  <QuotationPriceInput
                                    tempEditChanges={tempEditChanges}
                                    onSetEditChanges={onSetEditChanges}
                                    indexKey={`chargesFeesDict.${item.id}.price`}
                                  />
                                ) : (
                                  <>
                                    {item.price && item.price !== 0 ? (
                                      <NumberFormat
                                        value={item.price.toFixed(2)}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                      />
                                    ) : (
                                      <span className="sales__overview-dash">-</span>
                                    )}
                                  </>
                                )}
                              </span>
                            </div>
                          </li>
                        ))}
                        <div className={`quotation__subtotal-outerdiv`}>
                          <span className={`quotation__subtotal-text`}>SUBTOTAL</span>
                          <div className={`quotation__subtotal-price`}>
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
                        {currentOrderObj.insuranceDict &&
                          Object.values(currentOrderObj.insuranceDict).map((insurance) => (
                            <li key={`insurance${insurance.id}`}>
                              <div className="flex space-between">
                                <span>
                                  {insurance.title.split(' ').map((word) => (
                                    <React.Fragment key={uuidv4()}>
                                      {/* only apply this on the hidden quotation */}
                                      <>{word}&nbsp;</>
                                    </React.Fragment>
                                  ))}
                                </span>
                                {/* <span> {insurance.title}</span> */}
                                <span>
                                  {inEditPriceMode ? (
                                    <QuotationPriceInput
                                      tempEditChanges={tempEditChanges}
                                      onSetEditChanges={onSetEditChanges}
                                      indexKey={`insuranceDict.${insurance.id}.price`}
                                    />
                                  ) : (
                                    <>
                                      {insurance.price && insurance.price !== 0 ? (
                                        <NumberFormat
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          value={insurance.price.toFixed(2)}
                                        />
                                      ) : (
                                        <span className="sales__overview-dash">-</span>
                                      )}
                                    </>
                                  )}
                                </span>
                              </div>
                            </li>
                          ))}
                      </ol>
                    </div>
                    {currentOrderObj.discount ? (
                      <>
                        <div className={`quotation__grandtotal-outerdiv--discount`}>
                          <span className={`quotation__grandtotal-text`}>TOTAL PRICE</span>
                          <div className={`quotation__grandtotal-price--discount`}>
                            <NumberFormat
                              value={grandTotalPrice.toFixed(2)}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </div>
                        </div>
                        <div className={`quotation__grandtotal-outerdiv quotation__grandtotal-outerdiv--discount`}>
                          <span className={`quotation__discount-text`}>DISCOUNT</span>
                          <div style={{ fontWeight: 'normal' }}>
                            -&nbsp;
                            {inEditPriceMode ? (
                              <QuotationPriceInput
                                indexKey={`discount`}
                                tempEditChanges={tempEditChanges}
                                onSetEditChanges={onSetEditChanges}
                              />
                            ) : (
                              <NumberFormat
                                value={parseFloat(currentOrderObj.discount.toString()).toFixed(2)}
                                displayType={'text'}
                                thousandSeparator={true}
                              />
                            )}
                          </div>
                        </div>
                        <div className={`quotation__grandtotal-outerdiv`}>
                          <span className={`quotation__grandtotal-text`}>TOTAL ON THE ROAD PRICE</span>
                          <div className={`quotation__grandtotal-price`}>
                            <NumberFormat
                              value={(grandTotalPrice - parseFloat(currentOrderObj.discount.toString())).toFixed(2)}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className={`quotation__grandtotal-outerdiv`}>
                        <span className={`quotation__grandtotal-text`}>TOTAL PRICE</span>
                        <div className={`quotation__grandtotal-price`}>
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
                <div className={`quotation__salesprogram-div`}>
                  <div className="quotation__salesprogram-div--left">
                    <div className={`quotation__salesprogram-title`}>
                      <span>After&nbsp;Sales&nbsp;Programme:</span>
                    </div>
                    <div>
                      {inEditPriceMode ? (
                        <QuotationStringInput
                          className="quotation__input-salesprogram"
                          indexKey="afterSalesStrings.line_1"
                          tempEditChanges={tempEditChanges}
                          onSetEditChanges={onSetEditChanges}
                        />
                      ) : (
                        currentOrderObj.afterSalesStrings.line_1
                      )}
                    </div>
                    <div>
                      {inEditPriceMode ? (
                        <QuotationStringInput
                          className="quotation__input-salesprogram"
                          indexKey="afterSalesStrings.line_2"
                          tempEditChanges={tempEditChanges}
                          onSetEditChanges={onSetEditChanges}
                        />
                      ) : (
                        currentOrderObj.afterSalesStrings.line_2
                      )}
                    </div>
                    <div className={`quotation__salesprogram-contract`}>
                      {inEditPriceMode ? (
                        <QuotationStringInput
                          className="quotation__input-salesprogram"
                          indexKey="afterSalesStrings.line_3"
                          tempEditChanges={tempEditChanges}
                          onSetEditChanges={onSetEditChanges}
                        />
                      ) : (
                        currentOrderObj.afterSalesStrings.line_3
                      )}
                    </div>
                  </div>
                  <div className="quotation__salesprogram-div--right">
                    <table className={`quotation__salesprogram-table`}>
                      <tbody>
                        <tr>
                          <td className={`quotation__salesprogram-table-left`}>Down&nbsp;Payment</td>
                          <td className={`quotation__salesprogram-table-right`}></td>
                        </tr>
                        <tr>
                          <td className={`quotation__salesprogram-table-left`}>Account&nbsp;Finance</td>
                          <td className={`quotation__salesprogram-table-right`}></td>
                        </tr>
                        <tr>
                          <td className={`quotation__salesprogram-table-left`}>Payment&nbsp;Period</td>
                          <td className={`quotation__salesprogram-table-right`}></td>
                        </tr>
                        <tr>
                          <td className={`quotation__salesprogram-table-left`}>Months&nbsp;Finance</td>
                          <td className={`quotation__salesprogram-table-right`}></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* ========================= */}
                {/* The accessories lists */}
                {/* ========================= */}
                <div className={`quotation__accessorieslist`}>
                  <div className={`quotation__accessorieslist-standard`}>
                    <span>Standard&nbsp;Accessories:</span>
                  </div>
                  <div>
                    {inEditPriceMode && (
                      <Select
                        value={selectValues}
                        options={standardAccessoriesSelectOptions}
                        onChange={(newValue: string[]) => {
                          setSelectValues(newValue);
                          if (onSetEditChanges !== undefined && tempEditChanges !== undefined && tempEditChanges) {
                            let tempChanges = _.cloneDeep(tempEditChanges);
                            _.set(tempChanges, 'standardAccessories', newValue);
                            onSetEditChanges(tempChanges);
                          }
                        }}
                        mode="multiple"
                        maxTagCount="responsive"
                        className="quotation__accessorieslist-select"
                        placeholder="Select accessories"
                      />
                    )}
                  </div>
                  <div className={`quotation__accessorieslist-content`}>
                    <div
                      className={`quotation__accessorieslist-content-grid`}
                      style={{
                        gridTemplateColumns:
                          currentBrandObj.images.filter((child) => child.tag === 'Warranty').length > 0
                            ? 'repeat(3, 1fr)'
                            : 'repeat(4, 1fr)',
                      }}
                    >
                      {currentOrderObj.standardAccessories.map((acc) => (
                        <div key={`quotation${acc}`}>{acc}</div>
                      ))}
                    </div>
                    <div>
                      {currentBrandObj.images.filter((child) => child.tag === 'Warranty').length > 0 && (
                        <img
                          className={`quotation__accessorieslist-img`}
                          src={currentBrandObj.images.filter((child) => child.tag === 'Warranty')[0].url}
                          alt="warranty"
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* ========================= */}
                {/* Note*/}
                {/* ========================= */}
                <div className={`quotation__note`}>
                  NOTE:&nbsp;PRICE&nbsp;&&nbsp;SPECIFICATIONS&nbsp;ARE&nbsp;SUBJECTED&nbsp;TO&nbsp;CHANGE&nbsp;WITHOUT&nbsp;PRIOR&nbsp;NOTICE
                  <div className={`quotation__note-date`}>
                    **Price&nbsp;effective&nbsp;-&nbsp;Starts&nbsp;1st&nbsp;May&nbsp;2021
                  </div>
                  <div className={`quotation__note-date`}>
                    **This&nbsp;quotation&nbsp;is&nbsp;provided&nbsp;on&nbsp;
                    {inEditPriceMode ? (
                      <>
                        {tempEditChanges !== null && tempEditChanges !== undefined && (
                          <DatePicker
                            className="quotation__datepicker"
                            onChange={(e) => {
                              if (onSetEditChanges === undefined) return;
                              let tempChanges = _.cloneDeep(tempEditChanges);

                              if (tempChanges.bodyMakeObj) {
                                //_.set will change the object value using the path (indexKey in this case)
                                _.set(tempChanges, 'currentDate', e?.format('YYYY-MM-DD'));
                              }
                              onSetEditChanges(tempChanges);
                            }}
                            value={moment(tempEditChanges.currentDate)}
                            style={{ width: '12rem' }}
                          />
                        )}
                      </>
                    ) : (
                      <span style={{ color: 'rgb(131, 14, 14)' }}>{currentOrderObj.currentDate}</span>
                    )}
                    ,&nbsp;valid&nbsp;until&nbsp;
                    <span style={{ color: 'rgb(131, 14, 14)' }}>
                      {moment(currentOrderObj.currentDate).add(1, 'M').format('YYYY-MM-DD')}
                    </span>
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

export default withRouter(QuotationComponent);

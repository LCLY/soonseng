import React, { useEffect, useState } from 'react';
import './SalesPage.scss';
// links
import * as actions from 'src/store/actions/index';
// import { img_placeholder_link } f`rom 'src/shared/global';

// component

import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import LightboxComponent from 'src/components/ImageRelated/LightboxComponent/LightboxComponent';

// 3rd party lib
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { LoadingOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Skeleton, Card, Empty, Steps, Tag, Divider } from 'antd';

// Util
import { TMapStateToProps } from 'src/store/types/index';
import { img_loading_link, img_not_available_link } from 'src/shared/global';
import {
  TReceivedSalesMakesObj,
  TReceivedSalesLengthObj,
  TReceivedSalesMakeSeriesObj,
  TReceivedSalesLengthCategoryObj,
  TReceivedDimensionAccessoryObj,
} from 'src/store/types/sales';
import { TReceivedAccessoryObj, TReceivedBodyLengthObj } from 'src/store/types/dashboard';

const { Step } = Steps;

interface SalesPageProps {}

type Props = SalesPageProps & StateProps & DispatchProps & RouteComponentProps;

/**
 * Sales page that provide functionality for user to choose vehicle parts
 * @return {*}
 * @category Pages
 */
const SalesPage: React.FC<Props> = ({
  loading,
  salesBrandsArray,
  bodyLengthsArray,
  lengthsCategoriesArray,
  generalAccessoriesArray,
  bodyRelatedAccessoriesArray,
  dimensionRelatedAccessoriesArray,
  onClearSalesState,
  onGetSalesMakes,
  onGetSalesLengths,
  onGetSalesBodyLengths,
  onGetSalesBodyAccessories,
  // boolean
  getSalesMakesSucceed,
  getSalesLengthsSucceed,
  getSalesBodyLengthsSucceed,
  getSalesBodyAccessoriesSucceed,
}) => {
  /* ================================================ */
  //                    state
  /* ================================================ */
  /**
   * Getting index of clicked vehicle length card to know which one is selected,
   * set to null because initially nothing is being selected   *
   */

  const [currentTyre, setCurrentTyre] = useState<number | null>(null);
  const [currentLength, setCurrentLength] = useState<TReceivedSalesLengthObj | null>(null);
  const [currentBodyLength, setCurrentBodyLength] = useState<TReceivedBodyLengthObj | null>(null);
  const [currentAccessory, setCurrentAccessory] = useState<TReceivedAccessoryObj | null>(null);
  const [currentMake, setCurrentMake] = useState<TReceivedSalesMakeSeriesObj | null>(null);

  /** Current Steps of the antd steps component */
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  /* Lightboxes */
  // whether the lightbox is opened
  const [bodyLightboxOpen, setBodyLightboxOpen] = useState(false);
  const [makeLightboxOpen, setMakeLightboxOpen] = useState(false);
  const [bodyAccessoryLightboxOpen, setBodyAccessoryLightboxOpen] = useState(false);
  // photoindex to keep track of which image it's showing right now
  const [bodyPhotoIndex, setBodyPhotoIndex] = useState(0);
  const [makePhotoIndex, setMakePhotoIndex] = useState(0);
  const [bodyAccessoryPhotoIndex, setBodyAccessoryPhotoIndex] = useState(0);

  /* ========================= */
  //        method
  /* ========================= */

  /** To go to previous step/page  */
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };
  /** To go to next step/page  */
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  /* =========================== */
  /*         components          */
  /* =========================== */

  /* -------------------- */
  // Lengths
  /* -------------------- */
  let lengthSection = (
    <section className="sales__section">
      <Divider orientation="left">
        <div className="sales__section-header">Length </div>
      </Divider>

      <section className="sales__section-innerdiv">
        {/* Description on the left */}
        <div className="sales__section-left">
          <img
            className="sales__section-img"
            src="https://i.pinimg.com/originals/49/e4/e1/49e4e11ce6571189fceff40836ebdac9.jpg"
            alt="length of body"
          />
          {currentLength ? (
            <Card className="sales__selectarea-card" size="small" title="Selected body length">
              <div className="sales__selectarea-card-row">
                <div className="sales__selectarea-card-row-left">Body Length</div>
                <div>{currentLength.title} (ft)</div>
              </div>
            </Card>
          ) : (
            <Card className="sales__selectarea-card" size="small" title="Selected body length">
              <div className="sales__selectarea-card-row">
                <div className="sales__selectarea-card-row-left">None</div>
              </div>
            </Card>
          )}
        </div>

        {/* Selections on the right */}
        <div className="sales__section-right">
          <div className="sales__selectarea-desc">
            Decide on the length of your cargo body, the length of the cargo body is measured from this side to that
            side.
            <div className="margin_t-1 margin_b-1">There are three main categories:</div>
            <div>
              <span>LCV</span> - Low Commercial Vehicle
            </div>
            <div>
              <span>MCV</span> - Medium Commercial Vehicle
            </div>
            <div>
              <span>HCV</span> - High Commercial Vehicle
            </div>
          </div>

          <div className="sales__selectarea-innerdiv">
            <div>Select the length of the cargo body (ft)</div>
            {lengthsCategoriesArray ? (
              <>
                {lengthsCategoriesArray.length > 0 ? (
                  <>
                    {lengthsCategoriesArray.map((category) => {
                      return (
                        <React.Fragment key={uuidv4()}>
                          {/* Only render the non empty object */}
                          {Object.keys(category).length !== 0 && (
                            <div>
                              <div>
                                <Divider orientation="left" className="sales__selectarea-categorydivider">
                                  {category.title}
                                </Divider>
                              </div>
                              <div className="sales__selectarea-div">
                                {category.lengths.map((lengthObj) => {
                                  return (
                                    <div
                                      className={`sales__selectarea-button ${
                                        currentLength?.id === lengthObj.id ? 'active' : ''
                                      }`}
                                      onClick={() => {
                                        //  if currentLength has an id
                                        if (currentLength?.id === lengthObj.id) {
                                          // reset the selection
                                          setCurrentLength(null);
                                        } else {
                                          setCurrentLength(lengthObj);
                                        }
                                      }}
                                    >
                                      {lengthObj.title}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <Empty />
                )}
              </>
            ) : (
              <>
                <div className="sales__selectarea-button margin_t-4 margin_b-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button className="sales__skeleton" key={num} active={true} size="large" />
                  ))}
                </div>
                <div className="sales__selectarea-button">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button className="sales__skeleton" key={num} active={true} size="large" />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="sales__length-btn-div">
            <Button className="sales__length-btn margin_r-1" onClick={() => prev()}>
              Back
            </Button>
            {currentStep < totalSteps - 1 && (
              <Button
                type="primary"
                onClick={() => {
                  // Then call the body lengths API
                  if (currentLength === null) return;
                  if (currentLength.id) {
                    onGetSalesBodyLengths(currentLength.id);
                  }
                }}
                className="sales__length-btn"
                loading={loading}
                disabled={currentLength === null ? true : false}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </section>
    </section>
  );

  /* ------------------ */
  // Body Length
  /* ------------------ */
  let bodyLengthSection = (
    <>
      {/*  only show if length is selected */}
      <section className="sales__section">
        <Divider orientation="left">
          <div className="sales__section-header">Body </div>
        </Divider>
        <section className="sales__section-innerdiv">
          {/* Description */}
          <div className="sales__section-left">
            {currentBodyLength ? (
              <>
                {/* if there is no image then show image not available */}
                {currentBodyLength.images.length > 0 ? (
                  <>
                    <div className="sales__lightbox-parent" onClick={() => setBodyLightboxOpen(true)}>
                      {/* Clickable image to show lightbox */}

                      <LazyLoadImage
                        className="sales__section-img"
                        src={currentBodyLength.images[0].url}
                        alt={currentBodyLength.images[0].filename}
                        placeholderSrc={img_loading_link}
                      />

                      <LightboxComponent
                        images={currentBodyLength?.images}
                        photoIndex={bodyPhotoIndex}
                        isOpen={bodyLightboxOpen}
                        setPhotoIndex={setBodyPhotoIndex}
                        setIsOpen={setBodyLightboxOpen}
                      />
                      <div className="sales__lightbox-icon">
                        <i className="fas fa-expand"></i>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <img className="sales__section-img" src={img_not_available_link} alt="no result" />
                    <div className="sales__section-img-unavailabletext"> No image is provided for this body</div>
                  </div>
                )}
              </>
            ) : (
              // if nothing has been picked yet then show this
              <>
                <div className="sales__body-preview">
                  <img
                    className="sales__section-img"
                    alt="pepega"
                    src="data:image/png;base64,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"
                  />
                </div>
              </>
            )}

            {/* Card Details */}
            {currentBodyLength ? (
              <Card className="sales__selectarea-card" size="small" title="Selected body type">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Title</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-row-right-title">
                    {currentBodyLength?.body.title}
                  </div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Description</div>
                  <div className="sales__selectarea-card-row-right">
                    {`${currentBodyLength.length.title}ft${
                      currentBodyLength.body.description === null ? '' : `, ${currentBodyLength.body.description}`
                    }`}
                  </div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Dimension</div>
                  <div className="sales__selectarea-card-row-right">
                    <Tag className="flex" color="red">
                      <div>Width:&nbsp;</div>
                      <div>
                        <div>{currentBodyLength?.width}</div>
                      </div>
                    </Tag>

                    <Tag className="flex" color="volcano">
                      <div>Height:&nbsp;</div>
                      <div>
                        <div>{currentBodyLength?.depth}</div>
                      </div>
                    </Tag>

                    <Tag className="flex" color="orange">
                      <div>Depth:&nbsp;</div>
                      <div>
                        <div>{currentBodyLength?.height}</div>
                      </div>
                    </Tag>
                  </div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Price</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-price">
                    RM
                    <NumberFormat value={currentBodyLength?.price} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="sales__selectarea-card" size="small" title="Selected body type">
                None
              </Card>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              Decide on the type of the cargo body, material decides the capabilities of the vehicle.
              <br />
              There are a few of main body types in the market.
            </div>
            <div className="sales__selectarea-innerdiv">
              <div>Select the material type of the cargo body</div>

              {bodyLengthsArray ? (
                <>
                  {bodyLengthsArray.length > 0 ? (
                    <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                      <>
                        {bodyLengthsArray.map((bodyLength) => {
                          return (
                            <div
                              className={`sales__selectarea-button  ${
                                currentBodyLength?.id === bodyLength.id ? 'active' : ''
                              }`}
                              onClick={() => {
                                //  if currentLength has an id
                                if (currentBodyLength?.id === bodyLength.id) {
                                  // reset the selection
                                  setCurrentBodyLength(null);
                                } else {
                                  setCurrentBodyLength(bodyLength);
                                }
                              }}
                            >
                              {bodyLength.body.title}
                            </div>
                          );
                        })}
                      </>
                    </div>
                  ) : (
                    <Empty />
                  )}
                </>
              ) : (
                <div className="sales__selectarea-button margin_t-4 margin_b-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button className="sales__skeleton" key={num} active={true} size="large" />
                  ))}
                </div>
              )}
            </div>
            <div className="sales__length-btn-div">
              <Button className="sales__length-btn margin_r-1" onClick={() => prev()}>
                Back
              </Button>
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    // Then call the body lengths API
                    if (currentBodyLength === null) return;
                    if (currentBodyLength.id) {
                      onGetSalesBodyAccessories(currentBodyLength.id);
                    }
                  }}
                  className="sales__length-btn"
                  loading={loading}
                  disabled={currentBodyLength === null ? true : false}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );

  /* ------------------------------- */
  // Body Accessories
  /* ------------------------------- */
  let bodyAccessorySection = (
    <>
      {/*  only show if length is selected */}
      <section className="sales__section sales__section-body">
        <Divider orientation="left">
          <div className="sales__section-header">Accessory </div>
        </Divider>
        <section className="sales__section-innerdiv">
          <div className="sales__section-left">
            {currentAccessory ? (
              <>
                {currentAccessory.images.length > 0 ? (
                  <div className="sales__lightbox-parent" onClick={() => setBodyAccessoryLightboxOpen(true)}>
                    {/* Clickable image to show lightbox */}
                    <LazyLoadImage
                      className="sales__section-img"
                      src={currentAccessory.images[0].url}
                      alt={currentAccessory.images[0].filename}
                      placeholderSrc={img_loading_link}
                    />
                    <LightboxComponent
                      images={currentAccessory?.images}
                      photoIndex={bodyAccessoryPhotoIndex}
                      isOpen={bodyAccessoryLightboxOpen}
                      setPhotoIndex={setBodyAccessoryPhotoIndex}
                      setIsOpen={setBodyAccessoryLightboxOpen}
                    />
                    <div className="sales__lightbox-icon">
                      <i className="fas fa-expand"></i>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* if there is no image then show image not available */}
                    <img className="sales__section-img" src={img_not_available_link} alt="no result" />
                    <div className="sales__section-img-unavailabletext"> No image is provided for this accessory</div>
                  </>
                )}
              </>
            ) : (
              // if nothing has been picked yet then show this
              <>
                <div className="sales__body-preview">
                  <img
                    className="sales__section-img"
                    alt="pepega"
                    src="data:image/png;base64,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"
                  />
                </div>
              </>
            )}

            {currentAccessory ? (
              //  The card details
              <Card className="sales__selectarea-card" size="small" title="Selected accessory">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Title</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-row-right-title">
                    {currentAccessory?.title}
                  </div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Description</div>
                  <div className="sales__selectarea-card-row-right">{`${
                    currentAccessory.description === null || currentAccessory.description === ''
                      ? 'None'
                      : currentAccessory.description
                  }`}</div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Price</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-price">
                    RM
                    <NumberFormat value={currentAccessory?.price} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div>
                <div className="sales__selectarea-button-addtocart">
                  <Button type="primary">Add To Purchase</Button>
                </div>
              </Card>
            ) : (
              <>
                <Card className="sales__selectarea-card" size="small" title="Selected accessory">
                  None
                </Card>
              </>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              After choosing the body type, you need to decide on the accessory that you want on your cargo body.
              Depending on the different functionalities you are looking for you need different kinds of accessories
            </div>
            <div className="sales__selectarea-innerdiv">
              <div>Select the accessory for the cargo body</div>

              {/* If all the arrays are empty then show <Empty/> */}
              {generalAccessoriesArray &&
                bodyRelatedAccessoriesArray &&
                dimensionRelatedAccessoriesArray &&
                generalAccessoriesArray.length === 0 &&
                dimensionRelatedAccessoriesArray.length === 0 &&
                bodyRelatedAccessoriesArray.length === 0 && <Empty />}

              {generalAccessoriesArray ? (
                <>
                  {generalAccessoriesArray.length > 0 ? (
                    <div className="sales__selectarea--accessories">
                      <Divider orientation="left" className="sales__selectarea-categorydivider">
                        <div>General Accessories</div>
                      </Divider>
                      <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                        <>
                          {generalAccessoriesArray.map((accessory) => {
                            return (
                              <div
                                key={uuidv4()}
                                className={`sales__selectarea-button ${
                                  currentAccessory?.id === accessory.id ? 'active' : ''
                                }`}
                                onClick={() => {
                                  //  if currentLength has an id
                                  if (currentAccessory?.id === accessory.id) {
                                    // reset the selection
                                    setCurrentAccessory(null);
                                  } else {
                                    setCurrentAccessory(accessory);
                                    // clear state first before calling this api
                                    // onClearSalesState();
                                  }
                                }}
                              >
                                {accessory.title}
                              </div>
                            );
                          })}
                        </>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button
                      className="sales__selectarea-button-skeleton"
                      key={num}
                      active={true}
                      size="large"
                    />
                  ))}
                </div>
              )}
              {bodyRelatedAccessoriesArray ? (
                <>
                  {bodyRelatedAccessoriesArray.length > 0 ? (
                    <div className="sales__selectarea--accessories">
                      <Divider orientation="left" className="sales__selectarea-categorydivider">
                        <div>Body Associated Accessories</div>
                      </Divider>
                      <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                        <>
                          {bodyRelatedAccessoriesArray.map((accessory) => {
                            return (
                              <div
                                className={`sales__selectarea-button ${
                                  currentAccessory?.id === accessory.id ? 'active' : ''
                                }`}
                                onClick={() => {
                                  //  if currentLength has an id
                                  if (currentAccessory?.id === accessory.id) {
                                    // reset the selection
                                    setCurrentAccessory(null);
                                  } else {
                                    setCurrentAccessory(accessory);
                                    // clear state first before calling this api
                                    // onClearSalesState();
                                  }
                                }}
                              >
                                {accessory.title}
                              </div>
                            );
                          })}
                        </>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="sales__ sales__selectarea-div--twocolumn">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button
                      className="sales__selectarea-button-skeleton"
                      key={num}
                      active={true}
                      size="large"
                    />
                  ))}
                </div>
              )}
              {dimensionRelatedAccessoriesArray ? (
                <>
                  {dimensionRelatedAccessoriesArray.length > 0 ? (
                    <div className="sales__selectarea--accessories">
                      <Divider orientation="left" className="sales__selectarea-categorydivider">
                        <div>Dimension Associated Accessories</div>
                      </Divider>

                      <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                        {dimensionRelatedAccessoriesArray.map((dimensionRelatedAccessory) => {
                          return (
                            <div
                              className={`sales__selectarea-button ${
                                currentAccessory?.id === dimensionRelatedAccessory.accessory.id ? 'active' : ''
                              }`}
                              onClick={() => {
                                //  if currentLength has an id
                                if (currentAccessory?.id === dimensionRelatedAccessory.accessory.id) {
                                  // reset the selection
                                  setCurrentAccessory(null);
                                } else {
                                  setCurrentAccessory(dimensionRelatedAccessory.accessory);
                                  // clear state first before calling this api
                                  // onClearSalesState();
                                }
                              }}
                            >
                              {dimensionRelatedAccessory.accessory.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button
                      className="sales__selectarea-button-skeleton"
                      key={num}
                      active={true}
                      size="large"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="sales__length-btn-div">
              <Button className="sales__length-btn margin_r-1" onClick={() => prev()}>
                Back
              </Button>
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  loading={loading}
                  onClick={() => {
                    // Then call the body lengths API
                    if (currentLength === null && currentTyre === null) return;
                    if (currentLength && currentTyre) {
                      onGetSalesMakes(currentLength.id, currentTyre);
                    }
                  }}
                  className="sales__length-btn"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );

  let tyreCountArray = [4, 6];
  let tyreSection = (
    <>
      <section className="sales__section">
        <Divider orientation="left">
          <div className="sales__section-header">Tyre </div>
        </Divider>

        <section className="sales__section-innerdiv">
          {/* Description on the left */}
          <div className="sales__section-left">
            <img
              className="sales__section-img"
              src="https://image.freepik.com/free-photo/large-truck-wheels-semi-truck-road-freight-cargo-shipment_36860-908.jpg"
              alt="tire count"
            />
            {currentTyre ? (
              <Card className="sales__selectarea-card" size="small" title="Selected tyre count">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Tyre count</div>
                  <div>{currentTyre} tires</div>
                </div>
              </Card>
            ) : (
              <Card className="sales__selectarea-card" size="small" title="Selected tyre count">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">None</div>
                </div>
              </Card>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              Let's start this exciting adventure off with selection of tires count.
              <br />
              The length of the truck is decided on the number of the tires it has.
            </div>
            <div className="sales__selectarea-innerdiv">
              <div>Select the tyre count for the cargo body</div>
              <div className="sales__selectarea-div">
                <>
                  {/* <div className="sales__selectarea-button"> */}
                  {tyreCountArray.map((tyre) => {
                    return (
                      <div
                        key={uuidv4()}
                        className={`sales__selectarea-button ${currentTyre === tyre ? 'active' : ''}`}
                        onClick={() => {
                          if (currentTyre === tyre) {
                            // reset the selection
                            setCurrentTyre(null);
                          } else {
                            setCurrentTyre(tyre);
                          }
                        }}
                      >
                        {tyre}
                      </div>
                    );
                  })}
                  {/* </div> */}
                </>
              </div>
            </div>
            <div className="sales__length-btn-div">
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    // Then call the body lengths API
                    if (currentTyre === null) return;
                    if (currentTyre) {
                      onGetSalesLengths(currentTyre);
                    }
                  }}
                  className="sales__length-btn"
                  loading={loading}
                  disabled={currentTyre === null ? true : false}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );

  /* ------------------ */
  // Brand/Make
  /* ------------------ */
  let brandSection = (
    <>
      <section className="sales__section sales__section-body">
        <Divider orientation="left">
          <div className="sales__section-header">Brand</div>
        </Divider>

        <section className="sales__section-innerdiv">
          {/* Description on the left */}
          <div className="sales__section-left">
            {currentMake ? (
              <>
                {/* if there is no image then show image not available */}
                {currentMake.images.length > 0 ? (
                  <>
                    <div className="sales__lightbox-parent" onClick={() => setMakeLightboxOpen(true)}>
                      {/* Clickable image to show lightbox */}
                      <LazyLoadImage
                        className="sales__section-img"
                        src={currentMake.images[0].url}
                        alt={currentMake.images[0].filename}
                        placeholderSrc={img_loading_link}
                      />
                      <LightboxComponent
                        images={currentMake?.images}
                        photoIndex={makePhotoIndex}
                        isOpen={makeLightboxOpen}
                        setPhotoIndex={setMakePhotoIndex}
                        setIsOpen={setMakeLightboxOpen}
                      />
                      <div className="sales__lightbox-icon">
                        <i className="fas fa-expand"></i>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img className="sales__section-img" src={img_not_available_link} alt="no result" />
                    <div className="sales__section-img-unavailabletext"> No image is provided for this model</div>
                  </>
                )}
              </>
            ) : (
              <div className="sales__body-preview">
                <img
                  className="sales__section-img"
                  alt="pepega"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAABU1BMVEX///9ajT4AAAClXh4DRP5bjz0DRf1bjz9ajT/8/PxdkUBcjT5YizxajUEAAANajjv///vy8vKioqKsrKzp6eng4ODw8PBnZ2epYB24uLiysrJbkT1LS0tAQEDZ2dlUgzo5OTnGxsZzc3OGhoYiIiKYmJiOjo4aGhrMzMxTU1OgWRs8YCxCaS9ra2tbW1sfLhU6WCggLRoqQR0zMzNGaTIrKyuQUhodEQdRfTd7e3suRh8OFAsyUCYTHw9PdzpOiCwmORv8/fAQFgxnOxdBJw4vGwxKKg8ZDwURHA0GKpQFIHkFPNgkNB9/pm7r8um1zKxtm1icuo54nmBFgBvO3cnY5NSVsoNQdj0GFgCpwZ4ZMRUxUiN9RxZHKQ5zSBtZMRQnGgmHURthMxIpEAAFG1oFMrQHOcgFFUMHP+sIJXcDETcGMKQDHmkFByQAJIoDGl4LABNMm7JiAAAb9ElEQVR4nO1d61/bxtK2N1lWXkkW1wSygIBAuNiJjWNA8UV2zTVtridpehpISHqapufkXN7//9M7sytZsuWLTFIQ/fVpS0G2hPdhZnZ2dmY2lfoLyUUmc9Wf4C8kFxNzk/duL63uzK/cm5ycm4Yrf4lLBEjJ9J0V0o37c5k46nVreXLt3r21yam5xT/+s149Nu5KcrLNomvbjpPPVbY9vh7dGnznxJ1HHfwu3LmcT3xVmLknh9nMO4JzloZ/GOdcN538E7x+L9NTGfHa4tqSvLVeyeUBxZL8afKyB3BpyEwtoEjVXF1YejoEqulM2KdZePVOT9t1a00K43bRMbmgDKAL7uSbcHH58sdxCchIoao5KFGKIhomLM24yJ+Abk1H2JpG7atW8prwb1Xg3KwRsnYlo/ljgbLRKptcM/2xWla6C4Ln4F1TnTfO3IdrJVfnptn9fqpzp0qWpq9mRH8YplA2yqBBoaFaNEoXNSuEPJDzopoaN27DnRVbsO53+vJoPpGq+OfxO6bBNrdyGu8cp6ZFydItkc+S9ZnUBN6XmVpCG2cL2v2+EFsCVPH2xFUP8dsA/uTLIBxFwfsP2JMqKq0Yt7fVLDeNPsZJzuL9pMqDKBOyOvMnkS0wz1WHprWYZKWZfkrI/AbOBwWXs4il6oRlGcKp/0lmxVugSU2DpcFAGT4pg6hCcLdOJFV9TZUHI209ffa0QbUazgvXXrYWUQU52Cbr6fMXxkCyAgtGqQ6jJ1wbIo2GaVhPU+MvDCrcP4GDugFWxwFrZTWep1IvLV+GLF0fTENa5JDkwWQZLzKvTHjws4YJlq7a7XNcN4Bpb2oCrI71t1TqecOXG5CcYWRJttwhZD1NPbXMVz+mnoLICvua2y3gqibkuODv//qVYURchUFsVUh9mMlKPWONV6+VyPI8ITNXPeKLYwM9BjULNp4BWY2nz7vYYnIdLQHfdlGhV0ERB5KFKvj6dUpKFrBbI0tXPeQLA2x7TvjD+jGV+vnNs/FGe6AmExq18/kioAb/5R2bcT1MGK599IGOg9l4jb/odUPNHKJAHl31oC+IaVim+FylrTd4KfPG8gSKa3auUugM/2W3a3kD5Ms3VLpFSH6gIlLaePry5VOPq3T6+pqtBbJtBma88fOz8dcvkCtmMsOteQG/Vr2wXSgUtusnLflztZIPPHbeJJVhfr9lhdZMKIvXcuEDDrjNQiaq0bAaFtM1ruVl3K5aKLqObSqDZXJTd3Ml6Yq2ijajUroYOE9D/f4wdLFN5q964BcATISuiA5HM/J1VLiKa3O0UIGW6WjqndyJDKS6hvTdOejh0CVlGMzOXkezhS5lxJfiLFcFmSpiAJDpnb4W/mRSkLsCBky38wZ4pKxGmiHGGVWzJ0ZKvVmUMq1j0Sl+isTDko5MaoU8kSJhhUZCmV3AMILNB7mkTDhFtF+tnEk1hxB8AlDDdMO2XRdmz1pJolKpnebLoMmGqXFG/Seit7VxvVaJUySr0S6yKCviOlGjLN1NlmGEf6LcLm9npfESWeKAWTNst1iREtcL9SeV05xj2yC48Ns4/JZrFTq9RUi529YIuwka6Nsx2iNKiuFAL0gD1qsk9za2SdEpl048Wk5g5mw2KzXpm1Wab2ESPam2OSzUXFhzMtEkD6+TZK2Qk26uqAPW6q0tPJmyrE5pUvJlWX5EQqMeXR4V9eZp3nFM0EchuEBrhV9E2jRsxy3nas1CVU6xpbzJjQJ5cNUMxMdidBJjtlJB9ZOu9w7TWO2YF4I7GKfJknop5xrKrEdvYWm19Shsp9ysSs8jbTbJ7avmIDY2SV10+UewbqvmOW1f7U0WSJsWSJxmcQcUsIxbhfpQfwv8EG64RZhCSoI1cUftWmCxxyrFcio2lzIVVb8BYCAktfieFmqpkysLoTfJanT/MYl4QJ5E9EUwNeSRqAJYZp38NCRQ0wkT5JdSkK31IZkTiQAIljNkk2EEUAe8kJHYktDN0rWYE5fAaITIUrI0WKAYemGca+B32g4A/mcbBlwB0wbWrjRMETWZYYJAfx7Nm2HBKjz5y0RYFDodI4mheKZmOOXTUqH+92rgahaapVot59rgkjs9Vpk+zzJHhOomEq1IFiqQqNeTPyfudCzn+qFtuzRcBeW9FK3s6tL8g9uABw/mH4Yc9pN89242QEdfH5x7B1dAhcLJSavaalWr9e0SuPMolloz6f7WHMiBb2KMPqIVusCYkS+hOC3dn1xenLkVRKMmpmcWF6ce3d58KOWsaHYaLmZyZrinze2A0myY3kIl5xjobyXZcC0EG1jW37Qh9opxu1gnZP321Ez/MU3M3LmPuRLldqoSrrYNu6ic9vXNlTWg2cPi4vLk3ZXNHRVJBCbvJZitGZL1FcZ6Of66MYgsnnZRqBamhvuPE5hMUzIsKoWRG04F44Tr8ytTi71uztya2Zi8LUUyyQGb+0HcvfEslWr04QlMFQjVWxjLo42Yf/mNdVKgsATgplv5O9z48P7y9OBbJxbvYWZlUjeqM5mQ8z6QLGrjum/97ggbfdM74EMAxbACWgKJihVrz8zNoyYmE3cJMTwfS2uMp5696mmpYBFXA/1bXxvFx86kbq2TItyXfbQxmKiOBPHMFCF3LzSWPxaZ1B2QFl8LNY4bej2liuVbQNU9n6pMZlyi62FRbMDjVycHW7gMouPK4jpqYuLM/CRG4Hz73niZSv3sBfgMI7Qm5G6BkJ3JQKrikpXBvNRh2hchKwOTTgIDzfcw+NSOEeAetN4ZDQXCDN3AmN6kP2Y1sghV/STBy2YI+IjcF6nSUJmHEwljC+xVrtoOJ7fTZjri7ZpwQQMfTXtkjHerzDCsqUTuPmRFhAp/xC+TZDNJZOF+DhCFG6vKiDdep8bNbg+LYt76QlB0E5UL72Ep9EVnoq7BDNkZ9CG6qA9+ngezlaC6O5Qr4ZCqL1gvwGJ1mXcQK5j2J/3PPPCzL95/uE52Fla6q5kGGi1FTmb57v215VvBhRSSjIqYELYy9wn5ifMcKXiTYeN56seG1QiLFhNFQm4P99ZRde6SVeV/d0/7O6R/MZjSwukFsgLWc/WR95uU9K6QlaTMiJlN0nKETOTwyXqWetp48WMoH8tklVhrDxzwJtnJZFZ7sbVC5gbemZpeJ+uplGQ6PBfcSk6i231yghF2AapI22T9/OJZyNFiepOsbwx/VEbNXquZaT+AgDe1ZWKyf1Kyuow0TUzIG3cy6oEZ9RGTsuwhBRNJMmCx4819YN/hQwYmXhMlshDHYcehYbEOmCwPHfHOO33JUqRg2QtZVUEHJcceWXOJiQRuyyg57g067fAMXB5/2tZC0wVhifu4ru15ec3zxCRZPR+kSNkJ37iEvHoz7uLAefQyYapNd1ulcUhJst68fv4ilGZWAGMTly0ZpnrwMEyW77ZOkTsD1VAK1NyCd6dyeOWrM2T1Kwf5reAFGuxgZYiZ76G5EHmM/zgY5uZEJvOwg6zvJF1TZHkg50QGGTKq6FXadI+sjcSQ5THCTvulnjGHLMR6kiRiRZmbKTViaWuALAAuqQb7HkTWwvq3hiRrLjF7PW1li2zwUSrFi5lZsjQ/v3l3boifpaZ/gl4RjHgNS1hlSu24ZAuj1oPvB98YNykmH2Jo9YG6U76wlpiwVm9xUmR5NsyuvC1gdvL67YH+g1zNYSzm3vKdVYKSsikvw6C/+248lRmmzehwPLiDDsaM51l5ZC0McNAuF/3JChQRi50MF0vAH94ZYHXUVLeojM7kXbLpq5I0WXcUdwOwqCzd5uKKFEl/9Tkxis38Y9EvK6ZDxtKmmaZMphHtDPgrKyIzG3dxSluSb8yMj6NowT8Lw13LzNxtSdcDuS7yyVpLTl4uOO9WOHt0UOmbMDFldGfKky4v8Ncj/pCZmLmV8d+jvlkckgHpPXNicXnZc4C95yZotZPCuLoVosg0+9OlGcwsI12qFqI/WQH84EFmfogy9WyggReXkqOF0mZZVtBKQPe+75OVzLiZA7rmvdIRNdOF2MqEvgZx4okpXFpfxExPL8hFU0JCNLrVMKyBytdhvfS0zjVMXV5QQ89Il7PjiZGBTax5LurUiPUmmY0VvG0tKRGaVOPlj6k3oaLdgVwx1wTXlVlGsYphpzkVYO5Swy6yJFXZmotB6fVHcxvTMRmbnnsAC/IW3JWcnkiv4V/T0GKRpRsY+zIwH1mTzWTWV4ZGbiYxBFHUhcWLRGZ/ZNdXH27enVoG1hSrEzMzixuI5bm5ueXljUX4Z3nqAb635PJKzPXDJeENLATNIe6DIlEDZ57kuCVrc3S7goPfGaRbi5Noq4oMq3lg2CSfz58225GF7Pr66ur6ejug04Vm3hbCSVYZwbNXmjbUZHlkUfjspJ43uU7TGqO6LBLLbk4tRm3K9MbaA2SqmTO4zpiJNfZ5jhU8lu3karVK4SRgbbtUagLaxSq105xrpTHPrZUY711i4lWj0TevoRsW1lqQqtfviHFh2kW8kl26/+jeFGjRHGJyZV4Flps5U5cZ8DovY/mUimXIWiczLTTTNm3417QYsojF6oxjnj1mx8ulqtZKVk7bs9Tzn398HpctTeNy2UO28zYXGtbic266p4WIErVKOUfTVfq8SVEHSzzdVnbkBetXKKaeMqwI0nXNxK8ghJqv9Fo9YZXTP+OXl42hS542GFXGihSKjobdw+AKF8J08qhcFVSkWt5B+WjfIZxtQmr6iKnh1Gglrbi18Xz82ZvG8PVhAFMXelFl21afFNEKM6abFKRCSFUC4nRBNSqAQnhNqEoet6twQ2on1fwql2i7G+5WSTZJxh2QBp90lJYNaqSCOpWQwrm2LgQFrrDk0h9spVAp5nLFSguNl9EZWrSQVVldRj34r/grBzRyO0mrHYAF30i1zAowTzFh5ypBOvdJoQbU5POu442WtvyXtnO2T5XPCaWGhGVRC0lDsmj7DWDG0MgtJcRvDzA6UW0wkwrNBVPVDDgjQea7jsWsJFu0eRCF7VJ3zTAkTaoYtE0bY8ZJIvPYvoIsjHMxTcdJH8178bRSaRa2S54i6kID6WjqNCy4AVmahGkql0EpJVAF79BMrP8lMXZ1Lx09/+IjAz0n9I4ELGu8J4pyVZbE9abZU0Olij6oNJ5Cg7nzfuJUEBGDrJi1SiBfZhokTd7CDXTHyt2NobS07r3X8kiiHUCBxLrZhDYPicHC6IVdHLNuSMmMFLcIU7Svdc6C/u/COzd7N9O9eoxMxFDAPInhmKYT7U7Ka6RehjWSWstoNJgewWUwYbnJsQVgUtJAoogz/JFEC/z1Atbq92okiU1XSLUcfkkV0GGRueBqKbWYmMBoBKPwMByUclzakBwXPYs8mY2+bMEWsBzSNbkQdxwX3I9irfJEhiFwJyehVH1jspjsgkuaGu0njDBpYlvhogYsFWvNFukGbv4nVbBikqU87Kir7+9q6JqsZ3VxZ7HpDKpetSiWjAfBiULptFgs5rDZisnckvKvJhLKVnyyMELY3bDH+xkcS2G7NQxGPHF7NQjuuI/JntVg6m2GpopauoxnYfxCgDuKC8KEyhalcZaGKFXRHUXda13HnVwpq1aBhhDD+zhQ/hO8+ScBv9q04LkBuxovJivm3omYvrumFiidMuK5BnJ1Am5VXh/WSrkNDtNis6e2igpZSayFZ7AWi7NrqLW/hK6pn5nTrJUdTtttCXDNp77r/FOEfsIITKnnjCla/TMErxq+xHwNmLA6es3EIEs2fs31lGo7QckNXfgWZOlpU/PpQMR5nglWvtZTa7HteYIl6+uoCqPneq8PuM17vtPkpcTkRXbhW5Cl6Bk9zNO794qu8XpC14dfSxTiomT1y9XBDdmr5qUnvo6mrwHMAqbZkyxsZzc4DfyKcNkUhSixTdPubQKom8x+IZfMUAi4eW/2sZeiQBYTyNblEhQGUBU9u8gDy8Oq5y+yAuBas99MrImTJG7vXC5BHYRoA9xhcFmXrpqaKEYd4tdumoUxwMPDIpjkidaoA/yWZA0CLyanVqCNyxn66KC2CgMmCldNSm/AOkjUyVrSIqbxB6BRXchURrlXL3u7W1T7Y7SSyT1GkrSNntifnzLTqTWbzYJMlT3NlfMudnQ3NB47PjoSMFC/ctXsdCHeJ2eMOrXovhUh2daTWt6G179dL1j1CwXDPNWERQHjfXQq94o/nJ/tfvy4+/Hs7P3+0dHB4Ye9Y9UFspCzYXTfTsAYN/Pbass1UXo4/JPTNMNj9ci73RuzszcQs/CNxNbW7sf9d4fH8Cq2yzQYv0B74MjvY8zGw0OOj94nLVIT5+/snpDs/pbHVAc8zs4OjuVOYAkYoz1Ow4oP1W8SnnX4Hh5+mDA97P2Z9WCzOY1FYO92ezAV5mzr4/kHqZJVPFcARIzBzNk7WtUPelpjlpmvgFAd7u/in2b2KGGJWn0+uNGOYcKslD0bSJUvY7tnB3uqlW32bSVXdmwTxKzPKQNRkeLCcHLNLMlKpuQvBLKS1aq0+0Orxa3WTvDHcp2tgKtZZbL68bW1u/v+6HCvnadcqeVcR7oXHCYAbqU1VUWhcicY0zRTN2XXbzuP549lDz76TOEDD68BWVoo0MRPSEgFwaRvbd3YutHLfgWU3dg9Q7MfnH3SrIBfhm6ZrdJIma6jyMm0W8OwHXVQW9bTvjZ2k+Y7dJNlevDUURTJUYirM2DgeO/DwdH+xy2Ur36cIWMwU5798i4QMy9tpnVygofKYNkKureFurq+d3AWkin1jIOkBZej1iMcZ6ImIbuhz79/vAe+lbJLB7+c7W7dmO0rZGqmvAHuBQja+bt3B4eH/r1hHO8dyidFnjN7nrhOkhGuLMxE91Nr9DI56BjEFo4dRn9+ICe/7OEROKq7qJuz/UyZlMCAOHBrwal9v//+PXi4u3hvH8LPk1TwqxCRK5Vx7ZHFamQ/8hf3Rg7+qGIMODv+cHC+D+LR0xmL3qse4P+/5xt3D5PHVRdZYNupJYL0a94kA9wGZcqPDmDhc6x06vBcKtRwT2MwZrd+IWQ9cVz1IssKwi6iMIgsRdisZ83f73u66TN2UcpgRQCzwnzCyucQkdlQZkS2yWqS87hjluygbsr57/Bo/+wjTACB2sZ4zqwU1vM9bFqdKMvuIUpWx095kt0aRSiUlKExk9bs+PDg4OAIzNkZMjdo7vR82v2jQ7zzYTJTcDupopR1kIUJLe9GViflyn8Ea7YX9hSye4fvzhVpgXFXhh6mWZxh97Af9vHhEUlo8l83We3dG6/RMqx2IvNhXBnzfQWwZhj9Ij5z4Fkd/bK///7sDN2QjzBHHKKxg3+PD87PwNydJa042kO3Gvpk6YZiCwuP9j1zrXwsCaVS8Yx4ew7YlXPn4eExibim2WOUOn8mnX0n2/8lDn3I4sVqWbLFRL4KovDu6OgQHIRsoFIfpDH6OHCd2M3ajRDpZ2f7++cSIGIflWq233iWzGy2brI8gK1SXbxZmtu1elsCqvVtXNG9fbvtNfzIHp6/3929MbqnEPZPI37vfrIahfjoR1YR+5571kt4Z3k5uJtDMdquaRgswKNp/048R+HjN3BGfa62EpqC24estFklpOx78qo+UP6ntQvqNDy/UbedckmdY3V8eD7cP4hD1Y3dvWRqYV+yqAP2qTj8nDXGmNBst9bczvr+AcxouxdnbHbrKLH1mf1I0LibxWOreIwNQU1XZ8rlKk/qWT88hWEXHzeUuMXgb3Zrv+P0h2ShPwUCS3Crbp/6+aiI4RHSDCgrF0vqkO3s8R7i+HjvwyGI2z5MBFv9TLpiCqg6JvODeqFeLQbIC9WwiUzT5jTuLo2shJIRdee0VGh1O1NSR8Edff8eVz9dDhtGMEABN5cTS9XgfUNZ/kdIxR25WQ12PkobeO6oC4Cv+dxppVmoVyP0IX/v3oG3dfQP+BEbEicscyaMdO8sWF0JCjdwLzp6XPJwstQXyxIYHgNg1g0e3CqJyxVP/fZR220C5+8Na3V95aA9yfJLVGGyc0pV4l50iznc3sKjEJw0eaA7Ji1xiq1DHBvUfV6dKZlcqUL0yuyk2AzLO7ZdY9y2v5qq7sZP7ZAZ07luVEiyutX1hfrMnQdqw6AM1X9IDejr5SpKlg8mG5clL320J3q5ndhdLX4p3Chk+c9sf8/LeEBksjIa+sPpkbfXXw6+LVlM4BGAq1PJNlQhZIumCLes+BYkDabLhyZPS1y6PlTh4QmtStkR7cTQyyLLEk6TkIdJdkGjkF1aSR0Jo9SMDjBKgOX5FcFr3e/qvj9KFUyxp8RbL18jugR3vNheIecYKGCDyTIMSZb2NWRZguaq6mDJ60QVkAULE83OlSRfrcJp2QYbxkXX8AJKwMlAH8xrZthhg7Se6qbaa7bfa4FUycTn2+qkuase/0io2ALjBbrh1ryz6OvNomPIJUovstJ4GIHVgxXa8yL1ukX6L1qw3kTFv79x3YhCEFJydIFdHblmlCtetL1aqOVdhyFfeh8OLgBGhcxDJvLA7uvHVepX+OwnNdfA2dAEIbPdmt9VOtsq1Mp2l4x9BSzVOFieVprUrn6DMfbpV8lMydVl2j9IWNp0i0Eb7not75hCcGaxfooWB+m00GWH4clEbp/Gw9jY2A+PJV+tUlm1eQejxE1hu7lKwQsSV7fBtbBlsIXGFrNOahnPwwS4mdwoaBzcBIzdHPvty2dkBdu8g/OAIQGYJVnacMLNgOul05zrpLloQ+6LUeUbpKlJOZWXmWHbtmkGUqUzPFl5tevY7WuHmxIgX2O/f/oeDdU2tnlv567rHLiw87W3wV40aZ2c1OvbhVKpUsvBNGDommFoGKewHbdcrFVK9arcn/fJshg3ZC82PMEvk8z8mHi46bGlKFMGrFrANu9BZIbJKKeTByKarUhkOIgQd2Yw1E3PQ+UOdtv//E9CVhKWUDsqboYwFhgwKWEyFtxmDJRMNxnVmWbbGBqulQon0QSPVsHPedfldCFsPF+MkC8gur8mME10JNzsBhD2238/q6EX1Eyo0gEDeLWsIHpaGhuN5gGyJMA2NO8lypiuMzyeR/L5+HcU3bHvZeLV9RWuCFnA1k00YP/9lycszaJr6zpKGe8RM4W1j4n1OUCNFu5ZhA1bPab+9eX3sTH16C/Jq04dBWMeopzdBIv/ua1frXqzUgQ54wImQB0LV/s1ZdAZHmPhr54+P/4h9OyxT4Qs3bq2hqsvWTfV5d9/+/L9v0gAcLmKOcfRLSlqbTDmfydgJjj1lpn//vQ7imn4L/DDfy52HF0i0J+sYIBgxT59efz9vz93ZIhWTwoFWYVTqRVzYLWKOFnWW/7r//z0Q8+noeFKWDVvbAwny5OxMTVZfvr0+PtfP/+nn/8g8Z9fv/zW75Fw/QtRx7VeP4yNxaGrc7T45fcffvvk48vjx//99/8+A/73/ZdPaKMGc/8bOPPXcoU4MllhYQvjZvzHSLauo2wNJ+sCVA5l6wdCHl5Dtq6ELMlWwgov40BZoG9LRRy2PiX2CJQBuCKy5NLnqsc+Mi6fJp+t/yOT10wR/x8s9G1edl7F+QAAAABJRU5ErkJggg=="
                />
              </div>
            )}
            {currentMake ? (
              <Card className="sales__selectarea-card" size="small" title="Selected model">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Model</div>
                  <div className="sales__selectarea-card-row-right">{currentMake.title}</div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Series</div>
                  <div className="sales__selectarea-card-row-right">{currentMake.series}</div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Length</div>
                  <div className="sales__selectarea-card-row-right">{currentMake.length}mm</div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Config</div>
                  <div className="sales__selectarea-card-row-right">{currentMake.config}</div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Horsepower</div>
                  <div className="sales__selectarea-card-row-right">{currentMake.horsepower}hp</div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Year</div>
                  <div className="sales__selectarea-card-row-right">{currentMake.year ? currentMake.year : '-'}</div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Price</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-price">
                    RM
                    <NumberFormat value={currentMake?.price} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="sales__selectarea-card" size="small" title="Selected model">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">None</div>
                </div>
              </Card>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              This page is to choose your preferred whip.
              <br />
              Choose your trusted or preferred brand, HINO is cool.
            </div>
            <div className="sales__selectarea-innerdiv">
              <div>Select the model of your vehicle</div>
              <>
                {salesBrandsArray && (
                  <>
                    {salesBrandsArray.map((brand) => {
                      // brand here is an object of brand containing values of series array
                      // {["HINO"]: TSalesMakeSeries[]}
                      //  To extract the array out, we have to do this
                      // since we are already looping the object, when we do Object.keys
                      // we will obtain only 1 value ['DAIHATSU'] for example, so thats why we use 0 here as index
                      let brandName = Object.keys(brand)[0];
                      return (
                        <div className="sales__selectarea--brand" key={uuidv4()}>
                          <div>
                            <Divider
                              orientation="left"
                              className="sales__selectarea-categorydivider sales__selectarea-categorydivider--brand"
                            >
                              {brandName}
                            </Divider>
                          </div>
                          {/* Groups of different series  */}
                          {brand[brandName] &&
                            brand[brandName].map((series) => {
                              // same things goes to series
                              // series here is an object of series containing array of its object
                              // {['300 SERIES']: TSalesMakeSeries[]}
                              let seriesName = Object.keys(series)[0];
                              return (
                                <React.Fragment key={uuidv4()}>
                                  {seriesName !== null && seriesName !== '' && (
                                    <div className="sales__selectarea-seriestitle">{seriesName}</div>
                                  )}

                                  <div className="sales__selectarea-div">
                                    {/* loop the makes array */}
                                    {series[seriesName].map((make) => {
                                      return (
                                        <div
                                          className={`sales__selectarea-button                                            
                                           ${currentMake?.id === make.id ? 'active' : ''}`}
                                          onClick={() => {
                                            //  if currentMake contains an id
                                            if (currentMake?.id === make.id) {
                                              // reset the selection
                                              setCurrentMake(null); //set content to null
                                            } else {
                                              setCurrentMake(make); //select the content of the preview card
                                            }
                                          }}
                                        >
                                          <div>{make.title}</div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </React.Fragment>
                              );
                            })}
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            </div>
          </div>
        </section>

        <div className="sales__length-btn-div">
          <Button className="sales__length-btn margin_r-1" onClick={() => prev()}>
            Back
          </Button>
          {currentStep < totalSteps - 1 && (
            <Button
              className="sales__length-btn"
              type="primary"
              disabled={currentMake === null}
              onClick={() => {
                next();
              }}
            >
              <i className="fas fa-cart-plus"></i>&nbsp;&nbsp;Add To Cart
            </Button>
          )}
        </div>
      </section>
    </>
  );

  let overviewSection = (
    <section className="sales__section">
      <div className="sales__section-overview">
        <Divider orientation="left">
          <div className="sales__section-header">Overview</div>
        </Divider>

        <div>{currentMake}</div>
      </div>
    </section>
  );

  const steps = [
    // { step: 1, title: 'Overview', content: overviewSection },
    { step: 1, title: 'Tyre', content: tyreSection },
    {
      step: 2,
      title: 'Length',
      content: lengthSection,
    },
    {
      step: 3,
      title: 'Body',
      content: bodyLengthSection,
    },
    {
      step: 4,
      title: 'Accessory',
      content: bodyAccessorySection,
    },
    { step: 5, title: 'Brand', content: brandSection },
    { step: 6, title: 'Overview', content: overviewSection },
  ];

  /* =========================== */
  /*         useEffect           */
  /* =========================== */

  useEffect(() => {
    setTotalSteps(steps.length);
  }, [setTotalSteps, steps]);

  useEffect(() => {
    // when user clicks on a length and the body length returns succeed, user proceed to the next step
    if (
      getSalesMakesSucceed ||
      getSalesLengthsSucceed ||
      getSalesBodyLengthsSucceed ||
      getSalesBodyAccessoriesSucceed
    ) {
      // go to the next step
      setCurrentStep(currentStep + 1);

      // then clear the state
      onClearSalesState();
    }
  }, [
    loading,
    currentStep,
    setCurrentStep,
    onClearSalesState,
    getSalesMakesSucceed,
    getSalesLengthsSucceed,
    getSalesBodyLengthsSucceed,
    getSalesBodyAccessoriesSucceed,
  ]);

  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */
  return (
    <>
      <NavbarComponent activePage="sales" />

      <div className="sales__outerdiv">
        <div className="sales__innerdiv">
          <div className="sales__steps-div">
            <Steps direction="vertical" current={currentStep}>
              {steps.map((item) => (
                <Step
                  key={item.title}
                  icon={currentStep + 1 === item.step && loading ? <LoadingOutlined /> : null}
                  title={
                    <div className="sales__steps-title">
                      <div>{item.title}</div>
                    </div>
                  }
                />
              ))}
            </Steps>
          </div>

          <div className="sales__steps-content">
            <div>{steps[currentStep].content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

interface StateProps {
  loading?: boolean;
  errorMessage?: string | null;
  // Arrays
  bodyLengthsArray?: TReceivedBodyLengthObj[] | null;
  salesBrandsArray?: TReceivedSalesMakesObj[] | null;
  generalAccessoriesArray: TReceivedAccessoryObj[] | null;
  dimensionRelatedAccessoriesArray: TReceivedDimensionAccessoryObj[] | null;
  bodyRelatedAccessoriesArray: TReceivedAccessoryObj[] | null;
  // length category object
  lengthsCategoriesArray?: TReceivedSalesLengthCategoryObj[] | null;
  // Bool for get api
  getSalesMakesSucceed?: boolean | null;
  getSalesLengthsSucceed?: boolean | null;
  getSalesBodyLengthsSucceed?: boolean | null;
  getSalesBodyAccessoriesSucceed?: boolean | null;
}

const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  if ('sales' in state) {
    return {
      loading: state.sales.loading,
      errorMessage: state.sales.errorMessage,
      // Arrays
      salesBrandsArray: state.sales.salesBrandsArray,
      bodyLengthsArray: state.sales.bodyLengthsArray,
      generalAccessoriesArray: state.sales.generalAccessoriesArray,
      dimensionRelatedAccessoriesArray: state.sales.dimensionRelatedAccessoriesArray,
      bodyRelatedAccessoriesArray: state.sales.bodyRelatedAccessoriesArray,
      lengthsCategoriesArray: state.sales.lengthsCategoriesArray,
      // Succeed states
      getSalesMakesSucceed: state.sales.getSalesMakesSucceed,
      getSalesLengthsSucceed: state.sales.getSalesLengthsSucceed,
      getSalesBodyLengthsSucceed: state.sales.getSalesBodyLengthsSucceed,
      getSalesBodyAccessoriesSucceed: state.sales.getSalesBodyAccessoriesSucceed,
    };
  }
};

interface DispatchProps {
  onClearSalesState: typeof actions.clearSalesState;
  onGetSalesMakes: typeof actions.getSalesMakes;
  onGetSalesLengths: typeof actions.getSalesLengths;
  onGetSalesBodyLengths: typeof actions.getSalesBodyLengths;
  onGetSalesBodyAccessories: typeof actions.getSalesBodyAccessories;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onClearSalesState: () => dispatch(actions.clearSalesState()),
    onGetSalesLengths: (tire) => dispatch(actions.getSalesLengths(tire)),
    onGetSalesMakes: (length_id, tire) => dispatch(actions.getSalesMakes(length_id, tire)),
    onGetSalesBodyLengths: (length_id) => dispatch(actions.getSalesBodyLengths(length_id)),
    onGetSalesBodyAccessories: (body_length_id) => dispatch(actions.getSalesBodyAccessories(body_length_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SalesPage));

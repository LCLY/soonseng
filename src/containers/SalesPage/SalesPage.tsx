import React, { useEffect, useState } from 'react';
import './SalesPage.scss';
// links
import * as actions from 'src/store/actions/index';
import { img_placeholder_link } from 'src/shared/global';

// component
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import LightboxComponent from 'src/components/ImageRelated/LightboxComponent/LightboxComponent';

// 3rd party lib
import { v4 as uuidv4 } from 'uuid';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LoadingOutlined, PictureFilled } from '@ant-design/icons';
import { Button, Skeleton, Steps, Tag, Collapse, Divider } from 'antd';

// Util
import { TMapStateToProps } from 'src/store/types/index';
import { img_not_available_link } from 'src/shared/global';
import {
  TReceivedSalesMakesObj,
  TReceivedSalesLengthObj,
  TReceivedSalesMakeSeriesObj,
  TReceivedSalesLengthCategoryObj,
} from 'src/store/types/sales';
import { TReceivedBodyAccessoryObj, TReceivedBodyLengthObj } from 'src/store/types/dashboard';

const { Step } = Steps;
const { Panel } = Collapse;

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
  bodyAccessoriesArray,
  lengthsCategoriesArray,
  onClearSalesState,
  // onGetSalesMakes,
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
  const [currentBodyAccessory, setCurrentBodyAccessory] = useState<TReceivedBodyAccessoryObj | null>(null);

  // const [tyreIndex, setTyreIndex] = useState<number | null>(null);
  const [makeIndex, setMakeIndex] = useState<number | null>(null);
  const [selectedMake, setSelectedMake] = useState<TReceivedSalesMakeSeriesObj | null>(null);

  /** Current Steps of the antd steps component */
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  /* Lightbox for body */
  // whether the lightbox is opened
  const [isBodyLightboxOpen, setIsBodyLightboxOpen] = useState(false);
  // photoindex to keep track of which image it's showing right now
  const [bodyPhotoIndex, setBodyPhotoIndex] = useState(0);
  /* Lightbox for body accessory */
  const [isBodyAccessoryLightboxOpen, setIsBodyAccessoryLightboxOpen] = useState(false);
  const [bodyAccessoryPhotoIndex, setBodyAccessoryPhotoIndex] = useState(0);

  /* ========================= */
  //        method
  /* ========================= */
  function callback(key: any) {
    console.log(key);
  }

  /** To go to next step/page  */
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  /** To go to previous step/page  */
  const prev = () => {
    setCurrentStep(currentStep - 1);
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
        <div className="sales__section-desc">
          Decide on the length of your cargo body, the length of the cargo body is measured from this side to that side.
          <p>Add more description here if you like.</p>
          <div className="margin_t-1 margin_b-1">There are three categories:</div>
          <div>
            <span>LCV</span> - Low Commercial Vehicle
          </div>
          <div>
            <span>MCV</span> - Medium Commercial Vehicle
          </div>
          <div>
            <span>HCV</span> - High Commercial Vehicle
          </div>
          <img
            className="sales__section-img"
            src="https://i.pinimg.com/originals/49/e4/e1/49e4e11ce6571189fceff40836ebdac9.jpg"
            alt="length of body"
          />
          <div>A blueprint pic or illustration above would be cool</div>
        </div>

        {/* Selections on the right */}
        <div className="sales__length-outerdiv">
          <div className="sales__length-innerdiv">
            <div>
              Select the length of the cargo body (ft)
              {currentLength && (
                <>
                  :&nbsp;<span className="sales__section-result">{currentLength.title}</span>
                </>
              )}
            </div>

            {lengthsCategoriesArray ? (
              <>
                {lengthsCategoriesArray.map((category) => {
                  return (
                    <>
                      {/* Only render the non empty object */}
                      {Object.keys(category).length !== 0 && (
                        <div key={uuidv4()}>
                          <div>
                            <Divider orientation="left" className="sales__length-category">
                              {category.title}
                            </Divider>
                          </div>
                          <div className="sales__length-div">
                            {category.lengths.map((lengthObj) => {
                              return (
                                <div
                                  className={`sales__length-card ${currentLength?.id === lengthObj.id ? 'active' : ''}`}
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
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <div className="sales__length-div margin_t-4 margin_b-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button className="sales__skeleton" key={num} active={true} size="large" />
                  ))}
                </div>
                <div className="sales__length-div">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button className="sales__skeleton" key={num} active={true} size="large" />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="sales__length-btn-div">
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
          <div className="sales__section-desc">
            Decide on the type of the cargo body, material decides the capabilities of the vehicle. There are a few of
            main body types in the market.
            <p>Add more description here if you like.</p>
            {currentBodyLength ? (
              <>
                {/* if there is no image then show image not available */}
                {currentBodyLength.images.length > 0 ? (
                  <LightboxComponent
                    images={currentBodyLength?.images}
                    photoIndex={bodyPhotoIndex}
                    isOpen={isBodyLightboxOpen}
                    setPhotoIndex={setBodyPhotoIndex}
                    setIsOpen={setIsBodyLightboxOpen}
                  />
                ) : (
                  <div>
                    <img className="sales__section-img" src={img_not_available_link} alt="no result" />
                    <div className="sales__section-img-unavailabletext"> No image is provided for this body</div>
                  </div>
                )}
              </>
            ) : (
              // if nothing has been picked yet then show this
              <div className="sales__body-preview">
                <div>
                  <div className="sales__body-preview-icon">
                    <PictureFilled />
                  </div>
                  <div className="sales__body-preview-title">Choose a body to preview image(s)</div>
                </div>
              </div>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__length-outerdiv">
            <div className="sales__length-innerdiv">
              <div>
                Select the material type of the cargo body
                {currentBodyLength && (
                  <>
                    :&nbsp;<span className="sales__section-result">{currentBodyLength.body.title}</span>
                  </>
                )}
              </div>
              {currentBodyLength && (
                <div className="sales__body-details-outerdiv">
                  <div className="sales__body-details-title">
                    <Divider orientation="left" className="sales__body-details-title">
                      Details
                    </Divider>
                  </div>
                  <div className="sales__body-details-row">
                    <div className="sales__body-details-row-left">Title</div>
                    <div>{currentBodyLength?.body.title}</div>
                  </div>
                  <div className="sales__body-details-row">
                    <div className="sales__body-details-row-left">Description</div>
                    <div>{currentBodyLength?.body.description}</div>
                  </div>
                  <div className="sales__body-details-row">
                    <div className="sales__body-details-row-left">Dimension</div>
                    <div className="sales__body-details-tag">
                      <Tag className="flex" color="red">
                        <div>Width:&nbsp;</div>
                        <div>
                          <div>{currentBodyLength?.width}</div>
                        </div>
                      </Tag>
                    </div>
                    <div>
                      <Tag className="flex" color="cyan">
                        <div>Height:&nbsp;</div>
                        <div>
                          <div>{currentBodyLength?.depth}</div>
                        </div>
                      </Tag>
                    </div>
                    <div>
                      <Tag className="flex" color="blue">
                        <div>Depth:&nbsp;</div>
                        <div>
                          <div>{currentBodyLength?.height}</div>
                        </div>
                      </Tag>
                    </div>
                  </div>
                  <div className="sales__body-details-row">
                    <div className="sales__body-details-row-left">Price</div>
                    <p className="sales__body-details-price">
                      RM
                      <NumberFormat value={currentBodyLength?.price} displayType={'text'} thousandSeparator={true} />
                    </p>
                  </div>
                </div>
              )}

              {bodyLengthsArray ? (
                <>
                  <div className="sales__body-div">
                    {bodyLengthsArray.map((bodyLength) => {
                      return (
                        <div className="sales__length-div">
                          <div
                            className={`sales__length-card ${currentBodyLength?.id === bodyLength.id ? 'active' : ''}`}
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
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="sales__length-div margin_t-4 margin_b-2">
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
          {/* Description */}
          <div className="sales__section-desc">
            After choosing the body type, you need to decide on the accessory that you want on your cargo body.
            Depending on the different functionalities you are looking for you need different kinds of accessories
            <p>Add more description here if you like.</p>
            {currentBodyAccessory ? (
              <>
                {/* if there is no image then show image not available */}
                {currentBodyAccessory.images.length > 0 ? (
                  <LightboxComponent
                    images={currentBodyAccessory?.images}
                    photoIndex={bodyAccessoryPhotoIndex}
                    isOpen={isBodyAccessoryLightboxOpen}
                    setPhotoIndex={setBodyAccessoryPhotoIndex}
                    setIsOpen={setIsBodyAccessoryLightboxOpen}
                  />
                ) : (
                  <div>
                    <img className="sales__section-img" src={img_not_available_link} alt="no result" />
                    <div className="sales__section-img-unavailabletext"> No image is provided for this accessory</div>
                  </div>
                )}
              </>
            ) : (
              // if nothing has been picked yet then show this
              <div className="sales__body-preview">
                <div>
                  <div className="sales__body-preview-icon">
                    <PictureFilled />
                  </div>
                  <div className="sales__body-preview-title">Choose an accessory to preview image(s)</div>
                </div>
              </div>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__length-outerdiv">
            <div className="sales__length-innerdiv">
              <div>
                Select the accessory for the cargo body
                {currentBodyAccessory && (
                  <>
                    :&nbsp;<span className="sales__section-result">{currentBodyAccessory.title}</span>
                  </>
                )}
              </div>
              {currentBodyAccessory && (
                <div className="sales__body-details-outerdiv">
                  <div className="sales__body-details-title">
                    <Divider orientation="left" className="sales__body-details-title">
                      Details
                    </Divider>
                  </div>
                  <div className="sales__body-details-row">
                    <div className="sales__body-details-row-left">Title</div>
                    <div>{currentBodyAccessory?.title}</div>
                  </div>
                  <div className="sales__body-details-row">
                    <div className="sales__body-details-row-left">Description</div>
                    <div>{currentBodyAccessory?.description}</div>
                  </div>
                  <div className="sales__body-details-row">
                    <div className="sales__body-details-row-left">Category</div>
                    <div>
                      {currentBodyAccessory?.accessory.title}&nbsp;
                      <span className="sales__body-details-accdesc">
                        ({currentBodyAccessory.accessory.description})
                      </span>
                    </div>
                  </div>
                  <div className="sales__body-details-row">
                    <div className="sales__body-details-row-left">Price</div>
                    <p className="sales__body-details-price">
                      RM
                      <NumberFormat value={currentBodyAccessory?.price} displayType={'text'} thousandSeparator={true} />
                    </p>
                  </div>
                  <div className="sales__body-btn-addtocart">
                    <Button type="primary">Add to cart</Button>
                  </div>
                </div>
              )}

              {bodyAccessoriesArray ? (
                <>
                  <div className="sales__body-div">
                    {bodyAccessoriesArray.map((bodyAccessory) => {
                      return (
                        <div className="sales__length-div">
                          <div
                            className={`sales__length-card ${
                              currentBodyAccessory?.id === bodyAccessory.id ? 'active' : ''
                            }`}
                            onClick={() => {
                              //  if currentLength has an id
                              if (currentBodyAccessory?.id === bodyAccessory.id) {
                                // reset the selection
                                setCurrentBodyAccessory(null);
                              } else {
                                setCurrentBodyAccessory(bodyAccessory);
                                // clear state first before calling this api
                                // onClearSalesState();
                              }
                            }}
                          >
                            {bodyAccessory.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="sales__length-div margin_t-4 margin_b-2">
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
                <Button type="primary" onClick={() => next()} className="sales__length-btn">
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
          <div className="sales__section-desc">
            Let's start this exciting adventure off with selection of tires count. The length of the truck is decided on
            the number of the tires it has.
            <p>Add more description here if you like.</p>
            <img
              className="sales__section-img"
              src="https://getoutlines.com/blueprints/car/mercedes-benz/mercedes-benz-actros-gritter-2006.gif"
              alt="tire count"
            />
            <div>A blueprint pic or illustration above would be cool</div>
          </div>

          {/* Selections on the right */}
          <div className="sales__length-outerdiv">
            <div className="sales__length-innerdiv">
              <div>
                Select the tires count the cargo body (ft)
                {currentLength && (
                  <>
                    :&nbsp;<span className="sales__section-result">{currentLength.title}</span>
                  </>
                )}
              </div>

              <div className="sales__body-div">
                <>
                  <div className="sales__length-div">
                    {tyreCountArray.map((tyre) => {
                      return (
                        <div
                          key={uuidv4()}
                          className={`sales__length-card ${currentTyre === tyre ? 'active' : ''}`}
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
                  </div>
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
      <section className="sales__section sales__section-brand">
        <div className="sales__section-header">Brand</div>
        <div className="sales__section-desc">Choose a brand that you prefer</div>
        <Collapse accordion defaultActiveKey={['1']} onChange={callback}>
          {salesBrandsArray &&
            salesBrandsArray.map((brand, index) => {
              // brand here is an object of brand containing values of series array
              // {["HINO"]: TSalesMakeSeries[]}
              //  To extract the array out, we have to do this
              const brandName = Object.keys(brand)[index];
              return (
                <React.Fragment key={uuidv4()}>
                  <Panel className="sales__panel" header={brandName} key="1">
                    {/* Groups of different series  */}
                    {brand[brandName].map((series, index) => {
                      // same things goes to series
                      // series here is an object of series containing array of its object
                      // {['300 SERIES']: TSalesMakeSeries[]}
                      const seriesName = Object.keys(series)[index];
                      return (
                        <div>
                          {/* The left column for user to preview and select */}
                          <div className="sales__panel-makes-div">
                            <div className="sales__panel-makes-picker">
                              {/* Show the series title at the top of the left column cards */}
                              <div className="sales__panel-divider">
                                <Divider orientation="center">
                                  <span className="sales__panel-divider-title">{seriesName}</span>
                                </Divider>
                              </div>
                              {/* loop the makes array */}
                              {series[seriesName].map((make, index) => {
                                return (
                                  <Card
                                    key={uuidv4()}
                                    className={`sales__card-picker ${makeIndex === index ? 'active' : ''}`}
                                    onClick={() => {
                                      // if makeIndex has a number and not null
                                      // if the current index is the same as selected makeIndex
                                      if (typeof makeIndex === 'number' && makeIndex === index) {
                                        // reset the selection
                                        setSelectedMake(null); //set content to null
                                        setMakeIndex(null); //remove the selected index
                                      } else {
                                        setSelectedMake(make); //select the content of the preview card
                                        setMakeIndex(index); //setting the selected index of make
                                      }
                                    }}
                                  >
                                    <div
                                      className="sales__overlay"
                                      style={{ display: makeIndex === index ? 'flex' : 'none' }}
                                    >
                                      <i className="fas fa-eye"></i>
                                    </div>
                                    <Card.Img
                                      variant="top"
                                      src={make.images.length > 0 ? make.images[0].url : img_not_available_link}
                                      onError={(e: React.ChangeEvent<HTMLImageElement>) => {
                                        if (e.target.src !== make.images[0].url) {
                                          e.target.onerror = null;
                                          e.target.src = img_placeholder_link;
                                        }
                                      }}
                                    />
                                    <Card.Body className="sales__card-picker-body">
                                      <Card.Title className="sales__card-picker-title">{make.title}</Card.Title>
                                    </Card.Body>
                                  </Card>
                                );
                              })}
                            </div>

                            {/* The right column for user to view */}
                            <div className="sales__panel-makes-viewer">
                              {/* if selectedMake and makeIndex is not null */}
                              {selectedMake !== null && typeof makeIndex === 'number' ? (
                                <Card className="sales__card-viewer">
                                  <Card.Img
                                    variant="top"
                                    src={
                                      selectedMake.images.length > 0
                                        ? selectedMake.images[0].url
                                        : img_not_available_link
                                    }
                                    onError={(e: React.ChangeEvent<HTMLImageElement>) => {
                                      if (e.target.src !== selectedMake.images[0].url) {
                                        e.target.onerror = null;
                                        e.target.src = img_placeholder_link;
                                      }
                                    }}
                                  />
                                  <Card.Body>
                                    <Card.Title>{selectedMake.title}</Card.Title>
                                    <Card.Text>{selectedMake.engine_cap}</Card.Text>
                                    <div className="card__price-div">
                                      <Button type="primary">Add to cart</Button>
                                      <p className="card-text card__price">
                                        RM
                                        <NumberFormat
                                          value={selectedMake.price}
                                          displayType={'text'}
                                          thousandSeparator={true}
                                        />
                                      </p>
                                    </div>
                                  </Card.Body>
                                </Card>
                              ) : (
                                /* if selectedMake and makeIndex is  null */
                                <div className="sales__nothing">
                                  <div className="sales__nothing-innerdiv">
                                    <i className="fas fa-truck"></i>
                                    <div>Choose an item on the left to view it's details </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Panel>
                </React.Fragment>
              );
            })}
        </Collapse>
      </section>
    </>
  );

  const steps = [
    { step: 1, title: 'Tyre', content: tyreSection },
    {
      step: 2,
      title: 'Length',
      content: lengthSection,
    },
    { step: 3, title: 'Body', content: bodyLengthSection },
    { step: 4, title: 'Accessory', content: bodyAccessorySection },
    { step: 5, title: 'Brand', content: brandSection },
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
      setCurrentStep(currentStep + 1);
      // then clear the state
      onClearSalesState();
    }
  }, [
    currentStep,
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
            <Steps
              direction="vertical"
              current={currentStep}
              // onChange={(current) => {
              //  later only enable onclick after user has completed everything
              // setCurrentStep(current);
              // }}
            >
              {steps.map((item) => (
                <Step
                  key={item.title}
                  icon={currentStep + 1 === item.step && loading ? <LoadingOutlined /> : null}
                  title={
                    <div className="sales__steps-title">
                      <div>{item.title}</div>
                      <>
                        {/* Tyre */}
                        {currentTyre && item.title === 'Tyre' && <Tag color="magenta">{currentTyre}</Tag>}
                        {/* Length */}
                        {currentLength && item.title === 'Length' && <Tag color="red">{currentLength.title}</Tag>}
                        {/* Body Length */}
                        {currentBodyLength && item.title === 'Body' && (
                          <Tag color="volcano">{currentBodyLength.body.title}</Tag>
                        )}
                        {/* Body Accessory */}
                        {currentBodyAccessory && item.title === 'Accessory' && (
                          <Tag color="cyan">{currentBodyAccessory.title}</Tag>
                        )}
                      </>
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
  bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
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
      salesBrandsArray: state.sales.salesBrandsArray,
      bodyLengthsArray: state.sales.bodyLengthsArray,
      bodyAccessoriesArray: state.sales.bodyAccessoriesArray,
      getSalesMakesSucceed: state.sales.getSalesMakesSucceed,
      lengthsCategoriesArray: state.sales.lengthsCategoriesArray,
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

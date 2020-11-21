import React, { useEffect, useState } from 'react';
import './SalesPage.scss';
// links
import * as actions from 'src/store/actions/index';
import { img_placeholder_link } from 'src/shared/global';

// component
import Loading from 'src/components/Loading/Loading';
// import Container from 'src/components/CustomContainer/CustomContainer';
import CardComponent from 'src/components/CardComponent/CardComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';

// 3rd party lib
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'react-bootstrap';
import { Button, Skeleton, Steps, Tag, Collapse, message, Divider } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// Util
import { TMapStateToProps } from 'src/store/types/index';
import { img_not_available_link } from 'src/shared/global';
import {
  TReceivedSalesMakesObj,
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
  // getSalesLengthsSucceed,
  getSalesMakesSucceed,
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

  const [currentLength, setCurrentLength] = useState<{ id: number; value: string } | null>(null);
  const [bodyIndex, setBodyIndex] = useState<number | null>(null);
  const [bodyAccessoryIndex, setBodyAccessoryIndex] = useState<number | null>(null);
  const [tyreIndex, setTyreIndex] = useState<number | null>(null);
  const [makeIndex, setMakeIndex] = useState<number | null>(null);
  const [selectedMake, setSelectedMake] = useState<TReceivedSalesMakeSeriesObj | null>(null);

  /** Current Steps of the antd steps component */
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  /* ===================================== */
  //             boolean states
  /* ===================================== */
  // when user has selected a length, it's a number type instead of null
  const tyreIndexIsNumber = typeof tyreIndex === 'number';
  const bodyAccessoryIndexIsNumber = typeof bodyAccessoryIndex === 'number';

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
    <section className="sales__section sales__section-length">
      <Divider orientation="left">
        <div className="sales__section-header">Length </div>
      </Divider>

      <section className="sales__section-innerdiv">
        <div className="sales__section-desc">
          Decide on the length of your cargo body, the length of the cargo body is measured from this side to that side.
          <p>Add more description here if you like.</p>
          <div className="margin_t-1 margin_b-1">There are three categories:</div>
          <div>
            <span>LCV</span> - Low Cringe Vehicle
          </div>
          <div>
            <span>MCV</span> - Medium Cringe Vehicle
          </div>
          <div>
            <span>HCV</span> - High Cringe Vehicle
          </div>
          <img
            className="sales__section-img"
            src="https://i.pinimg.com/originals/49/e4/e1/49e4e11ce6571189fceff40836ebdac9.jpg"
            alt="length of body"
          />
          <div>A blueprint pic or illustration above would be cool</div>
        </div>
        <div className="sales__length-outerdiv">
          <div>
            Select the length of the cargo body (ft)
            {currentLength?.value && (
              <>
                :&nbsp;<span className="sales__section-result margin_l-1">{currentLength.value}</span>
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
                          <Divider orientation="left">{category.title}</Divider>
                        </div>
                        <div className="sales__length-div">
                          {category.lengths.map((length) => {
                            return (
                              <div
                                className={`sales__length-card ${currentLength?.id === length.id ? 'active' : ''}`}
                                onClick={() => {
                                  //  if currentLength has an id
                                  if (currentLength?.id === length.id) {
                                    // reset the selection
                                    setCurrentLength(null);
                                  } else {
                                    setCurrentLength({ id: length.id, value: length.title });
                                    // clear state first before calling this api
                                    // onClearSalesState();
                                  }
                                }}
                              >
                                {length.title}
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
            <Skeleton />
          )}
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
                disabled={currentLength === null ? true : false}
              >
                Proceed
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
      <section className="sales__section sales__section-body">
        <div className="sales__section-header">Body</div>
        <div className="sales__section-desc">
          Choose the material type of the cargo body
          {typeof bodyIndex === 'number' && (
            <>
              &nbsp;:&nbsp;
              <span className="sales__section-result">
                {bodyLengthsArray && bodyLengthsArray.length > 0 && bodyLengthsArray[bodyIndex].body.title}
              </span>
            </>
          )}
        </div>
        {bodyLengthsArray ? (
          <>
            <div className="sales__body-div">
              {bodyLengthsArray.map((bodyLength, index) => {
                return (
                  <CardComponent
                    key={uuidv4()}
                    index={index}
                    bodyIndex={bodyIndex}
                    bodyLengthObj={bodyLength}
                    setBodyIndex={setBodyIndex}
                    onGetSalesBodyAccessories={onGetSalesBodyAccessories}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="sales__loading-div">
            <Loading />
          </div>
        )}
      </section>
    </>
  );
  /* ------------------------------- */
  // Body Accessories
  /* ------------------------------- */
  let bodyAccessorySection = (
    <>
      <section className="sales__section sales__section-bodyaccessory">
        <div className="sales__section-header">Accessory</div>
        <div className="sales__section-desc">
          Choose the right accessory for the cargo body
          {typeof bodyAccessoryIndex === 'number' && (
            <>
              &nbsp;:&nbsp;
              <span className="sales__section-result">
                {bodyAccessoriesArray &&
                  bodyAccessoriesArray.length > 0 &&
                  bodyAccessoriesArray[bodyAccessoryIndex].title}
              </span>
            </>
          )}
        </div>

        {bodyAccessoriesArray ? (
          bodyAccessoriesArray.map((bodyAccessory, index) => {
            return (
              <div
                key={uuidv4()}
                className={`sales__length-card ${bodyAccessoryIndex === index ? 'active' : ''}`}
                onClick={() => {
                  //  if length index has a number
                  if (bodyAccessoryIndexIsNumber && bodyAccessoryIndex === index) {
                    // if the current index is the same as selected index
                    // reset the selection
                    setBodyAccessoryIndex(null);
                  } else {
                    setBodyAccessoryIndex(index);
                    // clear state first before calling this api
                    onClearSalesState();
                    // Then call the body lengths API
                    onGetSalesBodyLengths(bodyAccessoriesArray[index].id);
                  }
                }}
              >
                <div className="sales__overlay" style={{ display: bodyAccessoryIndex === index ? 'flex' : 'none' }}>
                  <i className="fas fa-check-circle"></i>
                </div>
                {bodyAccessory.accessory.title}
              </div>
            );
          })
        ) : (
          <div className="sales__loading-div">
            <Loading />
          </div>
        )}
      </section>
    </>
  );

  let tyreType = [4, 6, 10];
  let tyreSection = (
    <>
      <section className="sales__section sales__section-bodyaccessory">
        <div className="sales__section-header">Tyre</div>
        <div className="sales__section-desc">
          Choose the tyre count for the cargo body
          {typeof bodyAccessoryIndex === 'number' && (
            <>
              &nbsp;:&nbsp;
              <span className="sales__section-result">
                {bodyAccessoriesArray &&
                  bodyAccessoriesArray.length > 0 &&
                  bodyAccessoriesArray[bodyAccessoryIndex].title}
              </span>
            </>
          )}
        </div>

        {tyreType.map((tyre, index) => {
          return (
            <div
              key={uuidv4()}
              className={`sales__length-card ${tyreIndex === index ? 'active' : ''}`}
              onClick={() => {
                //  if tyre index has a number
                if (tyreIndexIsNumber && tyreIndex === index) {
                  // if the current index is the same as selected index
                  // reset the selection
                  setTyreIndex(null);
                } else {
                  setTyreIndex(index);
                  // get sales makes using length id and tyre count
                  // if (lengthsArray && typeof lengthIndex === 'number') {
                  //   onGetSalesMakes(lengthsArray[lengthIndex].id, tyreType[index]);
                  // }
                }
              }}
            >
              <div className="sales__overlay" style={{ display: tyreIndex === index ? 'flex' : 'none' }}>
                <i className="fas fa-check-circle"></i>
              </div>
              {tyre}
            </div>
          );
        })}
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
    {
      step: 1,
      title: 'Length',
      content: lengthSection,
    },
    { step: 2, title: 'Body', content: bodyLengthSection },
    { step: 3, title: 'Accessory', content: bodyAccessorySection },
    { step: 4, title: 'Tyre', content: tyreSection },
    { step: 5, title: 'Brand', content: brandSection },
  ];

  /* =========================== */
  /*         useEffect           */
  /* =========================== */
  useEffect(() => {
    onGetSalesLengths();
  }, [onGetSalesLengths]);

  useEffect(() => {
    setTotalSteps(steps.length);
  }, [setTotalSteps, steps]);

  useEffect(() => {
    // when user clicks on a length and the body length returns succeed, user proceed to the next step
    if (getSalesBodyLengthsSucceed || getSalesBodyAccessoriesSucceed || getSalesMakesSucceed) {
      setCurrentStep(currentStep + 1);
      // then clear the state
      onClearSalesState();
    }
  }, [
    currentStep,
    onClearSalesState,
    getSalesMakesSucceed,
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
                    <>
                      <div>{item.title}</div>
                      <>
                        {currentLength?.value && item.title === 'Length' && (
                          <Tag color="red">{currentLength.value}</Tag>
                          //  <div className="sales__section-result">{currentLength.value}</div>
                        )}
                        {typeof bodyIndex === 'number' && item.title === 'Body' && (
                          <div className="sales__section-result">
                            {bodyLengthsArray && bodyLengthsArray.length > 0 && bodyLengthsArray[bodyIndex].body.title}
                          </div>
                        )}
                        {typeof bodyAccessoryIndex === 'number' && item.title === 'Accessory' && (
                          <div className="sales__section-result">
                            {bodyAccessoriesArray &&
                              bodyAccessoriesArray.length > 0 &&
                              bodyAccessoriesArray[bodyAccessoryIndex].accessory.title}
                          </div>
                        )}
                        {typeof tyreIndex === 'number' && item.title === 'Tyre' && (
                          <div className="sales__section-result">{tyreType[tyreIndex]}</div>
                        )}
                      </>
                    </>
                  }
                />
              ))}
            </Steps>
          </div>

          <div className="sales__steps-content">
            <div>{steps[currentStep].content}</div>
          </div>
        </div>

        <div className="steps-action">
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {currentStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
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
    onGetSalesLengths: () => dispatch(actions.getSalesLengths()),
    onGetSalesMakes: (length_id, tire) => dispatch(actions.getSalesMakes(length_id, tire)),
    onGetSalesBodyLengths: (length_id) => dispatch(actions.getSalesBodyLengths(length_id)),
    onGetSalesBodyAccessories: (body_length_id) => dispatch(actions.getSalesBodyAccessories(body_length_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SalesPage));

import React, { useEffect, useState } from 'react';
import './SalesPage.scss';
// links
import * as actions from 'src/store/actions/index';
import { img_placeholder_link } from 'src/shared/global';

// component
import Loading from 'src/components/Loading/Loading';
import Container from 'src/components/CustomContainer/CustomContainer';
import CardComponent from 'src/components/CardComponent/CardComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';

// 3rd party lib
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'react-bootstrap';
import { Button, Skeleton, Steps, Collapse, message, Divider } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// Util
import { TMapStateToProps } from 'src/store/types/index';
import { img_not_available_link } from 'src/shared/global';
import { TReceivedSalesMakeSeriesObj, TReceivedSalesMakesObj } from 'src/store/types/sales';
import { TReceivedBodyAccessoryObj, TReceivedBodyLengthObj, TReceivedLengthObj } from 'src/store/types/dashboard';

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
  history,
  loading,
  salesBrandsArray,
  lengthsArray,
  bodyLengthsArray,
  bodyAccessoriesArray,
  onClearSalesState,
  onGetSalesMakes,
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
  const [lengthIndex, setLengthIndex] = useState<number | null>(null);
  const [bodyIndex, setBodyIndex] = useState<number | null>(null);
  const [bodyAccessoryIndex, setBodyAccessoryIndex] = useState<number | null>(null);
  const [tyreIndex, setTyreIndex] = useState<number | null>(null);
  const [makeIndex, setMakeIndex] = useState<number | null>(null);
  const [selectedMake, setSelectedMake] = useState<TReceivedSalesMakeSeriesObj | null>(null);

  /** Current Steps of the antd steps component */
  const [currentStep, setCurrentStep] = useState(0);

  /* ===================================== */
  //             boolean states
  /* ===================================== */
  // when user has selected a length, it's a number type instead of null
  const lengthIndexIsNumber = typeof lengthIndex === 'number';
  const bodyAccessoryIndexIsNumber = typeof bodyAccessoryIndex === 'number';
  const tyreIndexIsNumber = typeof tyreIndex === 'number';

  /* ========================= */
  //        method
  /* ========================= */
  function callback(key: any) {
    console.log(key);
  }

  /* =========================== */
  /*         components          */
  /* =========================== */

  /* -------------------- */
  // Lengths
  /* -------------------- */
  let lengthSection = (
    <section className="sales__section sales__section-length">
      <div className="sales__section-header">Length</div>
      <div className="sales__section-desc">
        Choose the length of the cargo body
        {typeof lengthIndex === 'number' && (
          <>
            &nbsp;:&nbsp;
            <span className="sales__section-result">{lengthsArray && lengthsArray[lengthIndex].title}</span>
          </>
        )}
      </div>
      <div className="sales__length-div">
        {lengthsArray ? (
          <>
            {lengthsArray.map((vehicleLength, index) => {
              return (
                <div
                  key={uuidv4()}
                  className={`sales__length-card ${lengthIndex === index ? 'active' : ''}`}
                  onClick={() => {
                    //  if length index has a number
                    if (lengthIndexIsNumber && lengthIndex === index) {
                      // if the current index is the same as selected index
                      // reset the selection
                      setLengthIndex(null);
                    } else {
                      setLengthIndex(index);
                      // clear state first before calling this api
                      onClearSalesState();
                      // Then call the body lengths API
                      onGetSalesBodyLengths(lengthsArray[index].id);
                    }
                  }}
                >
                  <div className="sales__overlay" style={{ display: lengthIndex === index ? 'flex' : 'none' }}>
                    <i className="fas fa-check-circle"></i>
                  </div>
                  {vehicleLength.title}
                </div>
              );
            })}
          </>
        ) : (
          <>
            <Skeleton.Button className="margin_l-1" active={true} size="large" shape="square" />
            <Skeleton.Button className="margin_l-1" active={true} size="large" shape="square" />
            <Skeleton.Button className="margin_l-1" active={true} size="large" shape="square" />
          </>
        )}
      </div>
    </section>
  );

  /* ------------------ */
  // Body Length
  /* ------------------ */
  let bodyLengthSection = (
    <>
      {lengthIndexIsNumber ? (
        // only show if length is selected
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
      ) : (
        // if length is not chosen
        <section className="sales__section sales__section-body sales__section-body--disabled">
          <div className="sales__section-header">Body</div>
          <div className="sales__section-desc--disabled">
            <i className="fas fa-exclamation-circle"></i>&nbsp;Choose a cargo body length to proceed
          </div>
        </section>
      )}
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
                  if (lengthsArray && typeof lengthIndex === 'number') {
                    onGetSalesMakes(lengthsArray[lengthIndex].id, tyreType[index]);
                  }
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
      {lengthIndexIsNumber ? (
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

          {/* <Accordion defaultActiveKey="0">
            {brandArray.map((brand, index) => {
              return (
                <React.Fragment key={uuidv4()}>
                  <Card>
                    <Accordion.Toggle
                      onClick={() => {
                        setSelectedMake(null); // reset the content
                        setMakeIndex(null); //reset the index when user click the accordion
                      }}
                      className="sales__panel-toggle"
                      as={Card.Header}
                      eventKey={`${index}`}
                    >
                      {brand.name}
                      <img
                        width="100"
                        height="30"
                        alt={brand.name}
                        src={brand.logo_link}
                        onError={(e: React.ChangeEvent<HTMLImageElement>) => {
                          if (e.target.src !== brand.logo_link) {
                            e.target.onerror = null;
                            e.target.src = img_placeholder_link;
                          }
                        }}
                        className="sales__panel-logo"
                      />
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${index}`}>
                      <Card.Body>
                        <div className="sales__panel-makes-div">
                          <div className="sales__panel-makes-picker">                           
                            {brand.makes.map((make, index) => {
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
                                    src={make.img_link}
                                    onError={(e: React.ChangeEvent<HTMLImageElement>) => {
                                      if (e.target.src !== brand.logo_link) {
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

                      
                          <div className="sales__panel-makes-viewer">
                          
                            {selectedMake !== null && typeof makeIndex === 'number' ? (
                              <Card className="sales__card-viewer">
                                <Card.Img
                                  variant="top"
                                  src={selectedMake.img_link}
                                  onError={(e: React.ChangeEvent<HTMLImageElement>) => {
                                    if (e.target.src !== brand.logo_link) {
                                      e.target.onerror = null;
                                      e.target.src = img_placeholder_link;
                                    }
                                  }}
                                />
                                <Card.Body>
                                  <Card.Title>{selectedMake.title}</Card.Title>
                                  <Card.Text>{selectedMake.desc}</Card.Text>
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
                              <div className="sales__nothing">
                                <div className="sales__nothing-innerdiv">
                                  <i className="fas fa-truck"></i>
                                  <div>Choose an item on the left to view it's details </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </React.Fragment>
              );
            })}
          </Accordion> */}
        </section>
      ) : (
        // if length is not chosen
        <section className="sales__section sales__section-body sales__section-body--disabled">
          <div className="sales__section-header">Brand</div>
          <div className="sales__section-desc--disabled">
            <i className="fas fa-exclamation-circle"></i>&nbsp;Choose a cargo body length to proceed
          </div>
        </section>
      )}
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

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  /* =========================== */
  /*         useEffect           */
  /* =========================== */
  useEffect(() => {
    onGetSalesLengths();
  }, [onGetSalesLengths]);

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
      <Container>
        <div className="sales__dashboard">
          <Button type="default" onClick={() => history.push('/dashboard/make')}>
            Go to Dashboard
          </Button>
        </div>
        <div className="sales__outerdiv">
          <div className="margin_b-3">
            <Steps
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
                        {typeof lengthIndex === 'number' && item.title === 'Length' && (
                          <div className="sales__section-result">{lengthsArray && lengthsArray[lengthIndex].title}</div>
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

          <div className="steps-content">{steps[currentStep].content}</div>
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
      </Container>
    </>
  );
};

interface StateProps {
  loading?: boolean;
  errorMessage?: string | null;
  // Arrays
  lengthsArray?: TReceivedLengthObj[] | null;
  bodyLengthsArray?: TReceivedBodyLengthObj[] | null;
  salesBrandsArray?: TReceivedSalesMakesObj[] | null;
  bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
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
      lengthsArray: state.sales.lengthsArray,
      bodyLengthsArray: state.sales.bodyLengthsArray,
      bodyAccessoriesArray: state.sales.bodyAccessoriesArray,
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
    onGetSalesLengths: () => dispatch(actions.getSalesLengths()),
    onGetSalesMakes: (length_id, tire) => dispatch(actions.getSalesMakes(length_id, tire)),
    onGetSalesBodyLengths: (length_id) => dispatch(actions.getSalesBodyLengths(length_id)),
    onGetSalesBodyAccessories: (body_length_id) => dispatch(actions.getSalesBodyAccessories(body_length_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SalesPage));

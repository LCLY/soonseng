import React, { useEffect, useState } from 'react';
import './SalesPage.scss';
// links
import * as actions from 'src/store/actions/index';
import { img_placeholder_link } from 'src/shared/global';
// dummy data
import { dummyBrandArray } from './dummyData';

// component
import Loading from 'src/components/Loading/Loading';
import Container from 'src/components/CustomContainer/CustomContainer';
import CardComponent from 'src/components/CardComponent/CardComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';

// 3rd party lib
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Button, Skeleton } from 'antd';
import { Accordion, Card } from 'react-bootstrap';

// Util
import { TMapStateToProps } from 'src/store/types/index';
import { TReceivedBodyLengthObj, TReceivedLengthObj } from 'src/store/types/dashboard';

interface SalesPageProps {}

type Props = SalesPageProps & StateProps & DispatchProps & RouteComponentProps;

/* --------------------------------------- */
/**  This is for when user clicks on a preview and it shows the content of the clicked card */
type selectedMakeProps = {
  title: string;
  price: number;
  desc: string;
  img_link: string;
};

/* --------------------------------------- */
type makesProps = {
  title: string;
  price: number;
  desc: string;
  /** The image link of the vehicles provided by different brands */
  img_link: string;
};

type brandProps = {
  name: string;
  /** The image link to logo of brands */
  logo_link: string;
  /** An array of makes */
  makes: makesProps[];
};

/**
 * Sales page that provide functionality for user to choose vehicle parts
 * @return {*}
 * @category Pages
 */
const SalesPage: React.FC<Props> = ({
  history,
  lengthsArray,
  bodyLengthsArray,
  onGetSalesBodyLengths,
  onGetSalesLengths,
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
  const [makeIndex, setMakeIndex] = useState<number | null>(null);
  const [selectedMake, setSelectedMake] = useState<selectedMakeProps | null>({
    title: 'Isuzu 1',
    price: 150000,
    img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
    desc:
      'Isuzu Some quick example text to build on the card title and make up the bulk of the cards content.Some quick example text to build on the card title and make up the bulk of the cards content.',
  });

  /* ===================================== */
  //             boolean states
  /* ===================================== */
  // when user has selected a length, it's a number type instead of null
  const lengthIndexIsNumber = typeof lengthIndex === 'number';

  /* ========================= */
  //        data
  /* ========================= */

  let brandArray: brandProps[] = dummyBrandArray;

  /* =========================== */
  /*         useEffect           */
  /* =========================== */
  useEffect(() => {
    onGetSalesLengths();
  }, [onGetSalesLengths]);

  useEffect(() => {
    if (lengthIndex !== null) {
      if (lengthsArray) {
        console.log(lengthsArray[lengthIndex].id);
        onGetSalesBodyLengths(lengthsArray[lengthIndex].id);
      }
    }
  }, [onGetSalesBodyLengths, lengthsArray, lengthIndex]);

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
                        key={index}
                        className={`sales__length-card ${lengthIndex === index ? 'active' : ''}`}
                        onClick={() => {
                          //  if length index has a number
                          if (lengthIndexIsNumber && lengthIndex === index) {
                            // if the current index is the same as selected index
                            // reset the selection
                            setLengthIndex(null);
                          } else {
                            setLengthIndex(index);
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

          {lengthIndexIsNumber ? (
            // only show if length is selected
            <section className="sales__section sales__section-body">
              <div className="sales__section-header">Body</div>
              <div className="sales__section-desc">
                Choose the material type of the cargo body
                {typeof bodyIndex === 'number' && (
                  <>
                    &nbsp;:
                    <span className="sales__section-result">
                      {bodyLengthsArray && bodyLengthsArray[bodyIndex].body.title}
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
                          key={index}
                          index={index}
                          title={bodyLength.body.title}
                          desc={bodyLength.body.description}
                          price={bodyLength.price.toString()}
                          img_link={bodyLength.images[0].url}
                          images={bodyLength.images}
                          bodyIndex={bodyIndex}
                          setBodyIndex={setBodyIndex}
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

          {lengthIndexIsNumber ? (
            <section className="sales__section sales__section-brand">
              <div className="sales__section-header">Brand</div>
              <div className="sales__section-desc">Choose a brand that you prefer</div>

              <Accordion defaultActiveKey="0">
                {brandArray.map((brand, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Card>
                        <Accordion.Toggle
                          onClick={() => {
                            setSelectedMake(null); // reset the content
                            setMakeIndex(null); //reset the index when user click the accordion
                          }}
                          className="sales__brand-toggle"
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
                            className="sales__brand-logo"
                          />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={`${index}`}>
                          <Card.Body>
                            {/* The left column for user to preview and select */}
                            <div className="sales__brand-makes-div">
                              <div className="sales__brand-makes-picker">
                                {/* loop the makes array */}
                                {brand.makes.map((make, index) => {
                                  return (
                                    <Card
                                      key={index}
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

                              {/* The right column for user to view */}
                              <div className="sales__brand-makes-viewer">
                                {/* if selectedMake and makeIndex is not null */}
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
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </React.Fragment>
                  );
                })}
              </Accordion>
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
        </div>
      </Container>
    </>
  );
};

interface StateProps {
  loading?: boolean;
  errorMessage?: string | null;
  lengthsArray?: TReceivedLengthObj[] | null;
  bodyLengthsArray?: TReceivedBodyLengthObj[] | null;
}

const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  if ('sales' in state) {
    return {
      loading: state.sales.loading,
      errorMessage: state.sales.errorMessage,
      lengthsArray: state.sales.lengthsArray,
      bodyLengthsArray: state.sales.bodyLengthsArray,
    };
  }
};

interface DispatchProps {
  onGetSalesLengths: typeof actions.getSalesLengths;
  onGetSalesBodyLengths: typeof actions.getSalesBodyLengths;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetSalesLengths: () => dispatch(actions.getSalesLengths()),
    onGetSalesBodyLengths: (length_id) => dispatch(actions.getSalesBodyLengths(length_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SalesPage));

import React, { useEffect, useState } from 'react';
import './SalesPage.scss';
// links
import * as actions from 'src/store/actions/index';
import { img_placeholder_link } from 'src/shared/global';
// dummy data
import { dummyBrandArray, bodyCardArray } from './dummyData';

// component
import CardComponent from 'src/components/CardComponent/CardComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';

// 3rd party lib
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Container, Accordion, Button, Card } from 'react-bootstrap';

// Util
import { TMapStateToProps } from 'src/store/types/index';

interface SalesPageProps {}

type Props = SalesPageProps & StateProps & DispatchProps & RouteComponentProps;

/**
 * Sales page that provide functionality for user to choose vehicle parts
 *
 * @method setLengthIndex - Getting index of clicked vehicle length card to know which one is selected,
 * set to null because initially nothing is being selected
 * @return {*}
 * @category Pages
 */
const SalesPage: React.FC<Props> = ({ history, onGetBrands }) => {
  /*################# state #################*/
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

  /* =================================================================================== */
  /*############### boolean states ###############*/

  // when user has selected a length, it's a number type instead of null
  const lengthIndexIsNumber = typeof lengthIndex === 'number';

  /* =================================================================================== */
  /*################# data #################*/

  // length of vehicle
  let vehicleLengthArray: number[] = [15, 17, 21, 25];

  /* --------------------------------------- */
  /**  This is for when user clicks on a preview and it shows the content of the clicked card */
  type selectedMakeProps = {
    title: string;
    price: number;
    desc: string;
    img_link: string;
  };

  /* --------------------------------------- */
  type cardProps = {
    title: string;
    desc: string;
    price: string;
    img_link: string;
    images: string[];
  };
  let cardComponentArray: cardProps[] = bodyCardArray;

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

  let brandArray: brandProps[] = dummyBrandArray;

  /* ====================================================== */
  /* ############### useEffect ##################### */
  useEffect(() => {
    onGetBrands();
  }, [onGetBrands]);
  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */
  return (
    <>
      <NavbarComponent activePage="sales" />
      <Container>
        <div className="sales__dashboard">
          <Button variant="primary" onClick={() => history.push('/dashboard/brand')}>
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
                  <span className="sales__section-result">{vehicleLengthArray[lengthIndex]}ft</span>
                </>
              )}
            </div>
            <div className="sales__length-div">
              {vehicleLengthArray.map((vehicleLength, index) => {
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
                    {vehicleLength}ft
                  </div>
                );
              })}
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
                    &nbsp;:<span className="sales__section-result"> {cardComponentArray[bodyIndex].title}</span>
                  </>
                )}
              </div>
              <div className="sales__body-div">
                {cardComponentArray.map((card, index) => {
                  return (
                    <CardComponent
                      key={index}
                      index={index}
                      title={card.title}
                      desc={card.desc}
                      price={card.price}
                      img_link={card.img_link}
                      images={card.images}
                      bodyIndex={bodyIndex}
                      setBodyIndex={setBodyIndex}
                    />
                  );
                })}
              </div>
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
                                        <Button variant="primary">Add to cart</Button>
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
  errorMessage: string | null;
  loading: boolean;
}

const mapStateToProps = (state: TMapStateToProps): StateProps => {
  return {
    loading: state.sales.loading,
    errorMessage: state.sales.errorMessage,
  };
};

interface DispatchProps {
  onGetBrands: typeof actions.getBrands;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetBrands: () => dispatch(actions.getBrands()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SalesPage));

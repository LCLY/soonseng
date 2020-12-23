import React, { useEffect, useState } from 'react';
import './CatalogBodyMake.scss';
/*Components*/
import Footer from 'src/components/Footer/Footer';
// import Container from 'src/components/CustomContainer/CustomContainer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Empty, Skeleton } from 'antd';
import NumberFormat from 'react-number-format';
import { withRouter, RouteComponentProps } from 'react-router-dom';
/* Util */
import { RootState } from 'src';
import holy5truck from 'src/img/5-trucks.jpg';
import hino_banner from 'src/img/hino_banner.jpg';
import * as actions from 'src/store/actions/index';
import { TUserAccess } from 'src/store/types/auth';
import { TReceivedBodyMakeObj } from 'src/store/types/dashboard';

interface MatchParams {
  make_id: string;
}

interface CatalogBodyMakeProps {}

type Props = CatalogBodyMakeProps & StateProps & DispatchProps & RouteComponentProps<MatchParams>;

const CatalogBodyMake: React.FC<Props> = ({ match, accessObj, catalogBodyMakesArray, onGetCatalogBodyMakes }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [currentBodyMake, setCurrentBodyMake] = useState<TReceivedBodyMakeObj | null>(null);

  let bodyMakeDetailRowArray: { title: string; data: string }[] = [];
  if (currentBodyMake) {
    bodyMakeDetailRowArray = [
      {
        title: 'Length',
        data: currentBodyMake.length !== null && currentBodyMake.length !== 0 ? `${currentBodyMake.length}mm` : '-',
      },
      {
        title: 'Config',
        data:
          currentBodyMake.make.config !== null && currentBodyMake.make.config !== ''
            ? `${currentBodyMake.make.config}`
            : '-',
      },
      {
        title: 'Torque',
        data:
          currentBodyMake.make.torque !== null && currentBodyMake.make.torque !== ''
            ? `${currentBodyMake.make.torque}`
            : '-',
      },
      {
        title: 'Horsepower',
        data:
          currentBodyMake.make.horsepower !== null && currentBodyMake.make.horsepower !== ''
            ? `${currentBodyMake.make.horsepower}PC`
            : '-',
      },
      {
        title: 'Emission',
        data:
          currentBodyMake.make.emission !== null && currentBodyMake.make.emission !== ''
            ? `${currentBodyMake.make.emission}`
            : '-',
      },
      {
        title: 'Tire Count',
        data: currentBodyMake.make.tire !== null && currentBodyMake.make.tire !== '' ? currentBodyMake.make.tire : '-',
      },
      {
        title: 'Wheelbase',
        data:
          currentBodyMake.wheelbase !== null && currentBodyMake.wheelbase !== ''
            ? `${currentBodyMake.wheelbase}mm`
            : '-',
      },
      {
        title: 'Transmission',
        data:
          currentBodyMake.make.transmission !== null && currentBodyMake.make.transmission !== ''
            ? `${currentBodyMake.make.transmission}`
            : '-',
      },
      {
        title: 'Engine Capacity',
        data:
          currentBodyMake.make.engine_cap !== null && currentBodyMake.make.engine_cap !== ''
            ? `${currentBodyMake.make.engine_cap}CC`
            : '-',
      },
      {
        title: 'Year',
        data:
          currentBodyMake.make.year !== null && currentBodyMake.make.year !== '' ? `${currentBodyMake.make.year}` : '-',
      },
      {
        title: 'GVW',
        data:
          currentBodyMake.make.gvw !== null && currentBodyMake.make.gvw !== '' ? `${currentBodyMake.make.gvw}kg` : '-',
      },
    ];
  }

  /* ================================================== */
  /*  component */
  /* ================================================== */

  let MakeDetailsComponent = (props: { bodyMake: TReceivedBodyMakeObj }) => {
    const { bodyMake } = props;
    return (
      <>
        <div className="catalogbodymake__detail-div">
          <div className="catalogbodymake__detail-innerdiv">
            <div className="catalogbodymake__detail-model">
              <div className="catalogbodymake__detail-model-text">{bodyMake.make.title}</div>
            </div>

            <section className="catalogbodymake__detail-body">
              {bodyMakeDetailRowArray.length > 0 &&
                bodyMakeDetailRowArray.map((detail) => (
                  <div className="catalogbodymake__detail-body-row" key={uuidv4()}>
                    <div className="catalogbodymake__detail-body-row-left">{detail.title}</div>
                    <div className="catalogbodymake__detail-body-row-right">{detail.data}</div>
                  </div>
                ))}
              {accessObj?.showPriceSalesPage && (
                <div className="catalogbodymake__detail-body-row" key={uuidv4()}>
                  <div className="catalogbodymake__detail-body-row-left">Model Price</div>
                  <div className="catalogbodymake__detail-body-row-right catalogbodymake__detail-body-row-right-price">
                    {bodyMake?.make.price === 0 || bodyMake?.make.price === null ? (
                      '-'
                    ) : (
                      <>
                        RM
                        <NumberFormat value={bodyMake?.make.price} displayType={'text'} thousandSeparator={true} />
                      </>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
        <div className="catalogbodymake__detail-div--mobile">
          <div className="catalogbodymake__detail-innerdiv">
            <div className="catalogbodymake__detail-model">
              <div className="catalogbodymake__detail-model-text">{bodyMake.make.title}</div>
            </div>

            <section className="catalogbodymake__detail-body catalogbodymake__detail-body--mobile">
              {/* left column */}
              <div style={{ width: '100%' }}>
                {bodyMakeDetailRowArray.length > 0 &&
                  [...bodyMakeDetailRowArray].slice(0, 6).map((detail) => (
                    <div
                      className="catalogbodymake__detail-body-row catalogbodymake__detail-body-row--mobile"
                      key={uuidv4()}
                    >
                      <div className="catalogbodymake__detail-body-row-left catalogbodymake__detail-body-row-left--mobile">
                        {detail.title}
                      </div>
                      <div className="catalogbodymake__detail-body-row-left catalogbodymake__detail-body-row-right--mobile">
                        {detail.data}
                      </div>
                    </div>
                  ))}
              </div>
              {/* right column */}
              <div style={{ width: '100%' }}>
                {bodyMakeDetailRowArray.length > 0 &&
                  [...bodyMakeDetailRowArray].slice(6).map((detail) => (
                    <div
                      className="catalogbodymake__detail-body-row catalogbodymake__detail-body-row--mobile"
                      key={uuidv4()}
                    >
                      <div className="catalogbodymake__detail-body-row-left catalogbodymake__detail-body-row-left--mobile">
                        {detail.title}
                      </div>
                      <div className="catalogbodymake__detail-body-row-right catalogbodymake__detail-body-row-right--mobile">
                        {detail.data}
                      </div>
                    </div>
                  ))}
                {/* move price to second column and bottom on mobile view */}
                {accessObj?.showPriceSalesPage && (
                  <div className="catalogbodymake__detail-body-row" key={uuidv4()}>
                    <div className="catalogbodymake__detail-body-row-left catalogbodymake__detail-body-row-left--mobile">
                      Model Price
                    </div>
                    <div className="catalogbodymake__detail-body-row-right catalogbodymake__detail-body-row-right--mobile">
                      <div>
                        {bodyMake?.make.price === 0 || bodyMake?.make.price === null ? (
                          '-'
                        ) : (
                          <span className="catalogbodymake__detail-body-row-right-price">
                            RM
                            <NumberFormat value={bodyMake?.make.price} displayType={'text'} thousandSeparator={true} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </>
    );
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  // on mount, always start user at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (catalogBodyMakesArray) {
      setCurrentBodyMake(catalogBodyMakesArray[0]);
    }
  }, [catalogBodyMakesArray, setCurrentBodyMake]);

  useEffect(() => {
    onGetCatalogBodyMakes(parseInt(match.params.make_id));
  }, [onGetCatalogBodyMakes, match.params.make_id]);

  /* ================================================== */
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent />

      <ParallaxContainer bgImageUrl={holy5truck}>
        <div className="catalog__outerdiv">
          <div className="catalog__div">
            {catalogBodyMakesArray ? (
              catalogBodyMakesArray.length > 0 ? (
                <div className="catalogbodymake__innerdiv">
                  <>
                    <div>
                      <div className="catalogbodymake__brand-title"> {catalogBodyMakesArray[0].make.brand.title}</div>
                      <section className="catalogbodymake__section-div">
                        <div className="catalog__series-title margin_t-2"> {catalogBodyMakesArray[0].make.series}</div>
                        <section className="catalogbodymake__section-banner">
                          <div className="catalogbodymake__banner-div">
                            <img className="catalogbodymake__banner" src={hino_banner} alt="banner" />
                          </div>
                          <MakeDetailsComponent bodyMake={catalogBodyMakesArray[0]} />
                        </section>
                        <div className="catalogbodymake__grid">
                          {catalogBodyMakesArray.map((bodyMake) => {
                            return (
                              <div className="catalogbodymake__card" key={uuidv4()}>
                                {bodyMake.images.length > 0 ? (
                                  <img
                                    className="catalogbodymake__card-image"
                                    src={bodyMake.images[0].url}
                                    alt={bodyMake.images[0].filename}
                                  />
                                ) : (
                                  // <img
                                  //   className="catalogbodymake__card-image"
                                  //   src="https://sc01.alicdn.com/kf/HTB1K9KNGVXXXXbFXVXXq6xXFXXXY/220577434/HTB1K9KNGVXXXXbFXVXXq6xXFXXXY.jpg"
                                  //   alt="random pic"
                                  // />

                                  <Skeleton.Image className="catalogbodymake__card-image" />
                                )}
                                <div className="catalogbodymake__card-overlay">
                                  <div className="catalogbodymake__card-overlay-content">
                                    <div className="catalogbodymake__card-overlay-moreinfo">More Info</div>
                                    <div>
                                      {bodyMake?.width !== null && bodyMake?.width !== '' && bodyMake?.width !== null && (
                                        <div className="flex-align-center">
                                          Width:&nbsp;
                                          <div className="catalogbodymake__card-overlay-dimension">
                                            {bodyMake?.width}
                                          </div>
                                        </div>
                                      )}

                                      {bodyMake?.depth !== null && bodyMake?.depth !== '' && bodyMake?.depth !== null && (
                                        <div className="flex-align-center">
                                          Depth:&nbsp;
                                          <div className="catalogbodymake__card-overlay-dimension">
                                            {bodyMake?.depth}
                                          </div>
                                        </div>
                                      )}

                                      {bodyMake?.height !== null &&
                                        bodyMake?.height !== '' &&
                                        bodyMake?.height !== null && (
                                          <div className="flex-align-center">
                                            Height:&nbsp;
                                            <div className="catalogbodymake__card-overlay-dimension">
                                              {bodyMake?.height}
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                    <div>
                                      {accessObj?.showPriceSalesPage && (
                                        <>
                                          <div className="margin_t-1">Body Price</div>
                                          <div className="catalogbodymake__card-overlay-price">
                                            {bodyMake?.price === 0 || bodyMake?.price === null ? (
                                              '-'
                                            ) : (
                                              <>
                                                RM
                                                <NumberFormat
                                                  value={bodyMake?.price}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                />
                                              </>
                                            )}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="catalogbodymake__card-label"> {bodyMake.body.title}</div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    </div>
                  </>
                </div>
              ) : (
                <div className="catalogbodymake__loading-div">
                  <Empty className="catalogbodymake__empty" />
                </div>
              )
            ) : (
              <div className="catalog__loading-div">
                <Ripple />
              </div>
            )}
          </div>
        </div>
      </ParallaxContainer>
      <Footer />
    </>
  );
};

interface StateProps {
  catalogBodyMakesArray?: TReceivedBodyMakeObj[] | null;
  accessObj?: TUserAccess;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    catalogBodyMakesArray: state.catalog.catalogBodyMakesArray,
  };
};

interface DispatchProps {
  onGetCatalogBodyMakes: typeof actions.getCatalogBodyMakes;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetCatalogBodyMakes: (make_id) => dispatch(actions.getCatalogBodyMakes(make_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogBodyMake));

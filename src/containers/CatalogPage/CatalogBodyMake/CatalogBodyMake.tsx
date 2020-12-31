import React, { useEffect, useState } from 'react';
import './CatalogBodyMake.scss';
/*Components*/
import Footer from 'src/components/Footer/Footer';
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
import { LeftCircleOutlined } from '@ant-design/icons';
/* Util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import hino_banner from 'src/img/hino_banner.jpg';
import * as actions from 'src/store/actions/index';
import { TUserAccess } from 'src/store/types/auth';
import { TReceivedMakeObj } from 'src/store/types/dashboard';
import { TReceivedCatalogBodyMake } from 'src/store/types/catalog';

interface MatchParams {
  make_id: string;
}

interface CatalogBodyMakeProps {}

type Props = CatalogBodyMakeProps & StateProps & DispatchProps & RouteComponentProps<MatchParams>;

const CatalogBodyMake: React.FC<Props> = ({
  match,
  history,
  accessObj,
  bodyMakeWithWheelbase,
  onGetCatalogBodyMakes,
  makeFromCatalogBodyMake,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [catalogMake, setCatalogMake] = useState<TReceivedMakeObj | null>(null);

  let bodyMakeDetailRowArray: { title: string; data: string }[] = [];
  if (catalogMake) {
    bodyMakeDetailRowArray = [
      {
        title: 'Config',
        data: catalogMake.config !== null && catalogMake.config !== '' ? `${catalogMake.config}` : '-',
      },
      {
        title: 'Torque',
        data: catalogMake.torque !== null && catalogMake.torque !== '' ? `${catalogMake.torque}` : '-',
      },
      {
        title: 'Horsepower',
        data: catalogMake.horsepower !== null && catalogMake.horsepower !== '' ? `${catalogMake.horsepower}PC` : '-',
      },
      {
        title: 'Emission',
        data: catalogMake.emission !== null && catalogMake.emission !== '' ? `${catalogMake.emission}` : '-',
      },
      {
        title: 'Tire Count',
        data: catalogMake.tire !== null && catalogMake.tire !== '' ? catalogMake.tire : '-',
      },
      {
        title: 'Transmission',
        data:
          catalogMake.transmission !== null && catalogMake.transmission !== '' ? `${catalogMake.transmission}` : '-',
      },
      {
        title: 'Engine Capacity',
        data: catalogMake.engine_cap !== null && catalogMake.engine_cap !== '' ? `${catalogMake.engine_cap}CC` : '-',
      },
      {
        title: 'Year',
        data: catalogMake.year !== null && catalogMake.year !== '' ? `${catalogMake.year}` : '-',
      },
      {
        title: 'GVW',
        data: catalogMake.gvw !== null && catalogMake.gvw !== '' ? `${catalogMake.gvw}kg` : '-',
      },
    ];
  }

  /* ================================================== */
  /*  component */
  /* ================================================== */

  let MakeDetailsComponent = (props: { catalogMake: TReceivedMakeObj }) => {
    const { catalogMake } = props;
    return (
      <>
        <div className="catalogbodymake__detail-div">
          <div className="catalogbodymake__detail-innerdiv">
            <div className="catalogbodymake__detail-model">
              <div className="catalogbodymake__detail-model-text">{catalogMake.title}</div>
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
                    {catalogMake.price === 0 || catalogMake.price === null ? (
                      '-'
                    ) : (
                      <>
                        RM
                        <NumberFormat value={catalogMake.price} displayType={'text'} thousandSeparator={true} />
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
              <div className="catalogbodymake__detail-model-text">{catalogMake.title}</div>
            </div>

            <section className="catalogbodymake__detail-body catalogbodymake__detail-body--mobile">
              {/* left column */}
              <div style={{ width: '100%' }}>
                {bodyMakeDetailRowArray.length > 0 &&
                  [...bodyMakeDetailRowArray].slice(0, 5).map((detail) => (
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
                  [...bodyMakeDetailRowArray].slice(5).map((detail) => (
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
                        {catalogMake.price === 0 || catalogMake.price === null ? (
                          '-'
                        ) : (
                          <span className="catalogbodymake__detail-body-row-right-price">
                            RM
                            <NumberFormat value={catalogMake.price} displayType={'text'} thousandSeparator={true} />
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
    if (makeFromCatalogBodyMake) {
      setCatalogMake(makeFromCatalogBodyMake);
    }
  }, [makeFromCatalogBodyMake, setCatalogMake]);

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
            {bodyMakeWithWheelbase && catalogMake ? (
              <>
                {bodyMakeWithWheelbase.length > 0 ? (
                  <section className="catalogbodymake__section-div">
                    <div className="catalogbodymake__series-outerdiv">
                      {/* <div> */}
                      <LeftCircleOutlined
                        className="catalogbodymake__backarrow"
                        onClick={() => history.push('/catalog')}
                      />
                      {/* </div> */}
                      <div className="catalogbodymake__series-title">{catalogMake.series}</div>
                    </div>
                    <section className="catalogbodymake__section-banner">
                      <div className="catalogbodymake__banner-div">
                        <img className="catalogbodymake__banner" src={hino_banner} alt="banner" />
                      </div>
                      <MakeDetailsComponent catalogMake={catalogMake} />
                    </section>

                    {bodyMakeWithWheelbase.map((wheelbaseBodyMake) => (
                      <section key={uuidv4()} className="catalogbodymake__wheelbase-div">
                        <div>
                          {wheelbaseBodyMake.wheelbase.title && wheelbaseBodyMake.wheelbase.title !== '' ? (
                            <div className="catalogbodymake__wheelbase-title">
                              {wheelbaseBodyMake.wheelbase.title}mm Wheelbase
                            </div>
                          ) : (
                            ''
                          )}
                        </div>

                        <div className="catalogbodymake__innerdiv">
                          <div className="catalogbodymake__grid">
                            {wheelbaseBodyMake.body_makes.map((bodyMake) => {
                              return (
                                <div className="catalogbodymake__card" key={uuidv4()}>
                                  {bodyMake.images.length > 0 ? (
                                    <img
                                      className="catalogbodymake__card-image"
                                      src={bodyMake.images[0].url}
                                      alt={bodyMake.images[0].filename}
                                    />
                                  ) : (
                                    <Skeleton.Image className="catalog__card-image" />
                                  )}
                                  <div className="catalogbodymake__card-overlay">
                                    <div className="catalogbodymake__card-overlay-content">
                                      <div className="catalogbodymake__card-overlay-moreinfo">More Info</div>
                                      <div className="catalogbodymake__card-overlay-moreinfo-content">
                                        {bodyMake?.width !== null &&
                                          bodyMake?.width !== '' &&
                                          bodyMake?.width !== null && (
                                            <div className="flex-align-center">
                                              Width:&nbsp;
                                              <div className="catalogbodymake__card-overlay-dimension">
                                                {bodyMake?.width}
                                              </div>
                                            </div>
                                          )}

                                        {bodyMake?.depth !== null &&
                                          bodyMake?.depth !== '' &&
                                          bodyMake?.depth !== null && (
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
                                            <div>Body Price</div>
                                            <div className="catalogbodymake__card-overlay-price">
                                              {bodyMake?.price === 0 || bodyMake?.price === null ? (
                                                '-'
                                              ) : (
                                                <div>
                                                  RM
                                                  <NumberFormat
                                                    value={bodyMake?.price}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                  />
                                                </div>
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
                        </div>
                      </section>
                    ))}
                  </section>
                ) : (
                  <div className="catalogbodymake__loading-div">
                    <Empty className="catalogbodymake__empty" />
                  </div>
                )}
              </>
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
  accessObj?: TUserAccess;
  bodyMakeWithWheelbase?: TReceivedCatalogBodyMake[] | null;
  makeFromCatalogBodyMake?: TReceivedMakeObj | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    bodyMakeWithWheelbase: state.catalog.catalogBodyMakesArray,
    makeFromCatalogBodyMake: state.catalog.makeFromCatalogBodyMake,
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

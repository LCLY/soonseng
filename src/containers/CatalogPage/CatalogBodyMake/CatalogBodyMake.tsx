import React, { useEffect, useState } from 'react';
import './CatalogBodyMake.scss';
/*Components*/
import Footer from 'src/components/Footer/Footer';
// import Container from 'src/components/CustomContainer/CustomContainer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Empty, Skeleton } from 'antd';
import NumberFormat from 'react-number-format';
import { withRouter, RouteComponentProps } from 'react-router-dom';
/* Util */
import { RootState } from 'src';
import hino_banner from 'src/img/hino_banner.jpg';
import * as actions from 'src/store/actions/index';
import { TReceivedBodyMakeObj } from 'src/store/types/dashboard';
import { TUserAccess } from 'src/store/types/auth';

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
                                //   src="data:image/jpeg;base64,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"
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
                                        Width:&nbsp;{' '}
                                        <div className="catalogbodymake__card-overlay-dimension">{bodyMake?.width}</div>
                                      </div>
                                    )}

                                    {bodyMake?.depth !== null && bodyMake?.depth !== '' && bodyMake?.depth !== null && (
                                      <div className="flex-align-center">
                                        Depth:&nbsp;
                                        <div className="catalogbodymake__card-overlay-dimension">{bodyMake?.depth}</div>
                                      </div>
                                    )}

                                    {bodyMake?.height !== null && bodyMake?.height !== '' && bodyMake?.height !== null && (
                                      <div className="flex-align-center">
                                        Height:&nbsp;{' '}
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

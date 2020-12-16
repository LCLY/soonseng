import React, { useEffect, useState } from 'react';
import './CatalogBodyMake.scss';
/*Components*/
import Footer from 'src/components/Footer/Footer';
import Container from 'src/components/CustomContainer/CustomContainer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Card, Empty, Skeleton, Tag } from 'antd';
import NumberFormat from 'react-number-format';
import { withRouter, RouteComponentProps } from 'react-router-dom';
/* Util */
import { RootState } from 'src';
import hino_banner from 'src/img/hino_banner.jpg';
import * as actions from 'src/store/actions/index';
import { TReceivedBodyMakeObj } from 'src/store/types/dashboard';
import { TUserAccess } from 'src/store/types/auth';

const { Meta } = Card;

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
        <div style={{ width: '100%' }}>
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
          </section>
        </div>

        {/* {accessObj?.showPriceSalesPage && (
          <div className="sales__selectarea-card-row" style={{ marginTop: '0.5rem' }}>
            <div className="sales__selectarea-card-row-left">Model Price</div>

            <div className="sales__selectarea-card-row-right sales__selectarea-card-price--model">
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
        )} */}
        {/* <div className="sales__selectarea-card-row" style={{ marginTop: '0.5rem' }}>
          <div className="sales__selectarea-card-row-left">Dimension</div>
          <div className="sales__selectarea-card-row-right">
            {bodyMake?.width !== null && bodyMake?.width !== '' && bodyMake?.width !== null && (
              <Tag className="flex" color="red">
                <div className="sales__selectarea-card-dimension">Width:&nbsp;</div>
                <div className="sales__selectarea-card-dimension">{bodyMake?.width}</div>
              </Tag>
            )}

            {bodyMake?.depth !== null && bodyMake?.depth !== '' && bodyMake?.depth !== null && (
              <Tag className="flex" color="orange">
                <div className="sales__selectarea-card-dimension">Depth:&nbsp;</div>
                <div className="sales__selectarea-card-dimension">{bodyMake?.depth}</div>
              </Tag>
            )}

            {bodyMake?.height !== null && bodyMake?.height !== '' && bodyMake?.height !== null && (
              <Tag className="flex" color="volcano">
                <div className="sales__selectarea-card-dimension">Height:&nbsp;</div>
                <div className="sales__selectarea-card-dimension">{bodyMake?.height}</div>
              </Tag>
            )}
          </div> 
        </div>*/}
        {/* {accessObj?.showPriceSalesPage && (
          <div className="sales__selectarea-card-row">
            <div className="sales__selectarea-card-row-left">Body Price</div>

            <div className="sales__selectarea-card-row-right sales__selectarea-card-price">
              {bodyMake?.price === 0 || bodyMake?.price === null ? (
                '-'
              ) : (
                <>
                  RM
                  <NumberFormat value={bodyMake?.price} displayType={'text'} thousandSeparator={true} />
                </>
              )}
            </div>
          </div>
        )} */}
      </div>
    );
  };

  /* ================================================== */
  /*  useEffect */

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
        <Container>
          <div className="catalog__div">
            {catalogBodyMakesArray ? (
              catalogBodyMakesArray.length > 0 ? (
                <div className="catalogbodymake__innerdiv">
                  <>
                    <div>
                      <div className="catalog__brand-title"> {catalogBodyMakesArray[0].make.brand.title}</div>
                      <section className="catalogbodymake__section-div">
                        <div className="catalog__series-title margin_t-2"> {catalogBodyMakesArray[0].make.series}</div>
                        <section className="catalogbodymake__section-banner">
                          <div className="catalogbodymake__banner-div">
                            <img className="catalogbodymake__banner" src={hino_banner} alt="banner" />
                          </div>
                          <MakeDetailsComponent bodyMake={catalogBodyMakesArray[0]} />
                        </section>
                        <div className="catalog__grid">
                          {catalogBodyMakesArray.map((bodyMake) => {
                            return <div>{bodyMake.body.title}</div>;
                          })}
                        </div>
                      </section>
                    </div>
                  </>
                </div>
              ) : (
                <Empty />
              )
            ) : (
              <div className="catalog__loading-div">
                <Ripple />
              </div>
            )}
          </div>
        </Container>
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

import React, { useEffect } from 'react';
import './CatalogBodyMake.scss';
/*Components*/
import Footer from 'src/components/Footer/Footer';
import Container from 'src/components/CustomContainer/CustomContainer';
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
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  useEffect(() => {
    onGetCatalogBodyMakes(parseInt(match.params.make_id));
  }, [onGetCatalogBodyMakes, match.params.make_id]);
  if (accessObj === undefined) {
    return null;
  }
  /* ================================================== */
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent />
      <div className="catalog__outerdiv">
        <Container>
          <div className="catalog__innerdiv">
            {catalogBodyMakesArray ? (
              catalogBodyMakesArray.length > 0 ? (
                <>
                  <div>
                    <div className="catalog__brand-title"> {catalogBodyMakesArray[0].make.brand.title}</div>
                    <div className="catalog__series-title margin_t-2"> {catalogBodyMakesArray[0].make.series}</div>
                    <section className="catalogbodymake__section-div">
                      <div className="catalog__grid">
                        <img className="catalogbodymake__banner" src={hino_banner} alt="banner" />
                        {catalogBodyMakesArray.map((bodyMake) => {
                          return (
                            <Card
                              key={uuidv4()}
                              className="catalogbodymake__card"
                              style={{ width: 240 }}
                              cover={
                                bodyMake.images.length > 0 ? (
                                  <img
                                    className="catalogbodymake__card-skeleton-image"
                                    src={bodyMake.images[0].url}
                                    alt={bodyMake.images[0].filename}
                                  />
                                ) : (
                                  <Skeleton.Image className="catalogbodymake__card-skeleton-image" />
                                )
                              }
                            >
                              <Meta
                                title={bodyMake.body.title}
                                description={
                                  <>
                                    {bodyMake.width}
                                    {bodyMake.depth}
                                    {bodyMake.height}
                                    <div className="flex">
                                      <section className="sales__selectarea-card-column">
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Model</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.title}
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Series</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.series === null || bodyMake.make.series === ''
                                              ? '-'
                                              : bodyMake.make.series}
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Length</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.length !== null || bodyMake.make.length !== 0
                                              ? bodyMake.make.length
                                              : '-'}
                                            mm
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Config</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.config ? bodyMake.make.config : '-'}
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Torque</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.torque ? bodyMake.make.torque : '-'}
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Horsepower</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.horsepower ? `${bodyMake.make.horsepower}PC` : '-'}
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Emission</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.emission ? bodyMake.make.emission : '-'}
                                          </div>
                                        </div>
                                      </section>
                                      <section className="sales__selectarea-card-column">
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Tyre Count</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.tire}
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Wheelbase</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.wheelbase.title ? `${bodyMake.make.wheelbase.title}mm` : '-'}
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Transmission</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.transmission ? bodyMake.make.transmission : '-'}
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Engine Capacity</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.engine_cap ? `${bodyMake.make.engine_cap}CC` : '-'}
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">Year</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.year ? bodyMake.make.year : '-'}
                                          </div>
                                        </div>
                                        <div className="sales__selectarea-card-row">
                                          <div className="sales__selectarea-card-row-left--make">GVW</div>
                                          <div className="sales__selectarea-card-row-right--make">
                                            {bodyMake.make.gvw ? `${bodyMake.make.gvw}kg` : '-'}
                                          </div>
                                        </div>
                                      </section>
                                    </div>
                                    {accessObj.showPriceSalesPage && (
                                      <div className="sales__selectarea-card-row" style={{ marginTop: '0.5rem' }}>
                                        <div className="sales__selectarea-card-row-left">Model Price</div>

                                        <div className="sales__selectarea-card-row-right sales__selectarea-card-price--model">
                                          {bodyMake?.make.price === 0 || bodyMake?.make.price === null ? (
                                            '-'
                                          ) : (
                                            <>
                                              RM
                                              <NumberFormat
                                                value={bodyMake?.make.price}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                              />
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    <div className="sales__selectarea-card-row" style={{ marginTop: '0.5rem' }}>
                                      <div className="sales__selectarea-card-row-left">Dimension</div>
                                      <div className="sales__selectarea-card-row-right">
                                        {bodyMake?.width !== null &&
                                          bodyMake?.width !== '' &&
                                          bodyMake?.width !== null && (
                                            <Tag className="flex" color="red">
                                              <div className="sales__selectarea-card-dimension">Width:&nbsp;</div>
                                              <div className="sales__selectarea-card-dimension">{bodyMake?.width}</div>
                                            </Tag>
                                          )}

                                        {bodyMake?.depth !== null &&
                                          bodyMake?.depth !== '' &&
                                          bodyMake?.depth !== null && (
                                            <Tag className="flex" color="orange">
                                              <div className="sales__selectarea-card-dimension">Depth:&nbsp;</div>
                                              <div className="sales__selectarea-card-dimension">{bodyMake?.depth}</div>
                                            </Tag>
                                          )}

                                        {bodyMake?.height !== null &&
                                          bodyMake?.height !== '' &&
                                          bodyMake?.height !== null && (
                                            <Tag className="flex" color="volcano">
                                              <div className="sales__selectarea-card-dimension">Height:&nbsp;</div>
                                              <div className="sales__selectarea-card-dimension">{bodyMake?.height}</div>
                                            </Tag>
                                          )}
                                      </div>
                                    </div>
                                    {accessObj.showPriceSalesPage && (
                                      <div className="sales__selectarea-card-row">
                                        <div className="sales__selectarea-card-row-left">Body Price</div>

                                        <div className="sales__selectarea-card-row-right sales__selectarea-card-price">
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
                                      </div>
                                    )}
                                  </>
                                }
                              />
                            </Card>
                          );
                        })}
                      </div>
                    </section>
                  </div>
                </>
              ) : (
                <Empty />
              )
            ) : (
              <div>
                <div className="catalog__grid">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <Card
                      key={num + uuidv4()}
                      className="catalog__card-skeleton"
                      style={{ width: 240 }}
                      cover={<Skeleton.Image className="catalog__card-skeleton-image" />}
                    >
                      <Meta description={<Skeleton paragraph={{ rows: 2, width: '100%' }} active />} />
                    </Card>
                  ))}
                </div>
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

import React, { useEffect } from 'react';
import './CatalogPage.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
// import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { Card, Empty, Skeleton } from 'antd';
/* Util */
import { RootState } from 'src';
import { ROUTE_CATALOG } from 'src/shared/routes';
import * as actions from 'src/store/actions/index';
import { TReceivedCatalogMakeObj } from 'src/store/types/catalog';
const { Meta } = Card;
interface CatalogPageProps {}

type Props = CatalogPageProps & StateProps & DispatchProps & RouteComponentProps;

const CatalogPage: React.FC<Props> = ({ history, auth_token, catalogMakesArray, onGetCatalogMakes }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  /* ================================================== */
  /*  methods  */
  /* ================================================== */

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */

  useEffect(() => {
    if (auth_token === undefined) return;
    onGetCatalogMakes(auth_token);
  }, [onGetCatalogMakes, auth_token]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent />
      <div className="catalog__outerdiv">
        <div className="catalog__div">
          {/* <Container> */}
          <div className="catalog__innerdiv">
            {catalogMakesArray ? (
              catalogMakesArray.length > 0 ? (
                catalogMakesArray.map((catalog) => {
                  return (
                    <div className="catalog__brand-div" key={uuidv4()}>
                      <div className="catalog__brand-title"> {catalog.brand.title}</div>
                      <section className="catalog__section-series">
                        {catalog.series.map((series, index) => {
                          // if array is odd number, on the last row, make it display flex
                          let arrayIsOddNumber = catalog.series.length % 2 !== 0 && index === catalog.series.length - 1;

                          return (
                            <div key={uuidv4()} className={arrayIsOddNumber ? 'fullcolspan' : ''}>
                              <div className="catalog__section-series-outerdiv">
                                <div className="catalog__series-title">{series.title}</div>
                                <div className="catalog__section-series-innerdiv">
                                  <div className={`catalog__grid ${arrayIsOddNumber ? 'catalog__grid--full' : ''}`}>
                                    {series.makes.map((make) => {
                                      return (
                                        <div
                                          key={uuidv4()}
                                          className="catalog__card"
                                          onClick={() => history.push(`${ROUTE_CATALOG}/${make.id}`)}
                                        >
                                          {make.images.length > 0 ? (
                                            <img
                                              className="catalog__card-image"
                                              src={make.images[0].url}
                                              alt={make.images[0].filename}
                                            />
                                          ) : (
                                            <Skeleton.Image className="catalog__card-image" />
                                          )}

                                          <div className="catalog__card-label">{make.title}</div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </section>
                    </div>
                  );
                })
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
          {/* </Container> */}
        </div>
      </div>
      <Footer />
    </>
  );
};
interface StateProps {
  loading?: boolean;
  auth_token?: string | null;
  catalogMakesArray?: TReceivedCatalogMakeObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.catalog.loading,
    auth_token: state.auth.auth_token,
    catalogMakesArray: state.catalog.catalogMakesArray,
  };
};
interface DispatchProps {
  onGetCatalogMakes: typeof actions.getCatalogMakes;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return { onGetCatalogMakes: (auth_token) => dispatch(actions.getCatalogMakes(auth_token)) };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogPage));

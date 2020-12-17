import React, { useEffect } from 'react';
import './CatalogPage.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import { Empty, Skeleton } from 'antd';
/* Util */
import { RootState } from 'src';
import { ROUTE_CATALOG } from 'src/shared/routes';
import * as actions from 'src/store/actions/index';
import { convertSpaceInStringWithChar } from 'src/shared/Utils';
import { TReceivedCatalogMakeObj } from 'src/store/types/catalog';

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
  // on mount, always start user at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (auth_token === undefined) return;
    onGetCatalogMakes(auth_token);
  }, [onGetCatalogMakes, auth_token]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent />
      {/* background image in outerdiv */}
      <div className="catalog__outerdiv">
        <div className="catalog__div">
          {catalogMakesArray ? (
            catalogMakesArray.length > 0 ? (
              <div className="catalog__innerdiv">
                {catalogMakesArray.map((catalog) => {
                  return (
                    // div wrapping brand along with its series
                    <div className="catalog__brand-div" key={uuidv4()}>
                      {/* brand title */}
                      <div className="catalog__brand-title"> {catalog.brand.title}</div>
                      {/* series section */}
                      <section className="catalog__section-series">
                        {catalog.series.map((series, index) => {
                          // if array is odd number, on the last row, make it display flex
                          let arrayIsOddNumberAndMakeLengthLessThanThree =
                            catalog.series.length % 2 !== 0 &&
                            index === catalog.series.length - 1 &&
                            catalog.series[index].makes.length > 3;

                          return (
                            <div
                              key={uuidv4()}
                              className={arrayIsOddNumberAndMakeLengthLessThanThree ? 'fullcolspan' : ''}
                            >
                              <div className="catalog__section-series-outerdiv">
                                <div className="catalog__series-title">{series.title}</div>
                                <div className="catalog__section-series-innerdiv">
                                  <div
                                    className={`catalog__grid ${
                                      arrayIsOddNumberAndMakeLengthLessThanThree ? 'catalog__grid--full' : ''
                                    }`}
                                  >
                                    {series.makes.map((make) => {
                                      let model_detail = `${catalog.brand.title}-${convertSpaceInStringWithChar(
                                        series.title,
                                        '',
                                      )}-${convertSpaceInStringWithChar(make.title, '')}`;
                                      return (
                                        <div
                                          key={uuidv4()}
                                          className="catalog__card"
                                          onClick={() => history.push(`${ROUTE_CATALOG}/${model_detail}/${make.id}`)}
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
                })}
              </div>
            ) : (
              <div className="catalogbodymake__loading-div">
                <Empty />
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

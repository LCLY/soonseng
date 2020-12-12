import React, { useEffect } from 'react';
import './CatalogPage.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { Card, Empty, Skeleton } from 'antd';
/* Util */
import { RootState } from 'src';
import * as actions from 'src/store/actions/index';
import { TReceivedCatalogMakeObj } from 'src/store/types/catalog';
const { Meta } = Card;
interface CatalogPageProps {}

type Props = CatalogPageProps & StateProps & DispatchProps;

const CatalogPage: React.FC<Props> = ({ catalogMakesArray, onGetCatalogMakes }) => {
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
    onGetCatalogMakes();
  }, [onGetCatalogMakes]);
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent />
      <div className="catalog__outerdiv">
        <div className="catalog__innerdiv">
          {catalogMakesArray ? (
            catalogMakesArray.length > 0 ? (
              catalogMakesArray.map((catalog) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    {catalog.brand.title}
                    <section>
                      {catalog.series.map((series) => {
                        return (
                          <div key={uuidv4()} className="catalog__section-series">
                            {series.title}

                            <div className="catalog__grid">
                              {series.makes.map((make) => {
                                return (
                                  <Card
                                    key={uuidv4()}
                                    className="catalog__card-skeleton"
                                    style={{ width: 240 }}
                                    cover={<Skeleton.Image className="catalog__card-skeleton-image" />}
                                  >
                                    <Meta title={make.title} description={make.horsepower} />
                                  </Card>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </section>
                  </React.Fragment>
                );
              })
            ) : (
              <Empty />
            )
          ) : (
            <div>
              <div className="catalog__banner">
                <Skeleton.Image className="catalog__banner-image" />
              </div>
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
      </div>
      <Footer />
    </>
  );
};
interface StateProps {
  loading?: boolean;
  catalogMakesArray?: TReceivedCatalogMakeObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.catalog.loading,
    catalogMakesArray: state.catalog.catalogMakesArray,
  };
};
interface DispatchProps {
  onGetCatalogMakes: typeof actions.getCatalogMakes;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return { onGetCatalogMakes: () => dispatch(actions.getCatalogMakes()) };
};
export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);

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
import NumberFormat from 'react-number-format';
import { LeftCircleOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Empty, Modal, Checkbox, Divider, Skeleton } from 'antd';
/* Util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import { ROUTE_ORDERS } from 'src/shared/routes';
import hino_banner from 'src/img/hino_banner.jpg';
import * as actions from 'src/store/actions/index';
import { TUserAccess } from 'src/store/types/auth';
import { TReceivedCatalogBodyMake } from 'src/store/types/catalog';
import { TReceivedAccessoryObj, TReceivedMakeObj } from 'src/store/types/dashboard';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';

interface MatchParams {
  make_id: string;
}

interface ICheckedAccessories {
  [uniqueId: string]: { checked: boolean; accessory: TReceivedAccessoryObj };
}
interface ICheckedDimensionAccessories {
  [uniqueId: string]: { checked: boolean; accessory: TReceivedDimensionAccessoryObj };
}

interface CatalogBodyMakeProps {}

type Props = CatalogBodyMakeProps & StateProps & DispatchProps & RouteComponentProps<MatchParams>;

const CatalogBodyMake: React.FC<Props> = ({
  match,
  history,
  accessObj,
  localOrdersArray,
  bodyMakeWithWheelbase,
  makeFromCatalogBodyMake,
  generalAccessoriesArray,
  bodyRelatedAccessoriesArray,
  dimensionRelatedAccessoriesArray,
  onStoreLocalOrders,
  onGetSalesAccessories,
  onGetCatalogBodyMakes,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [catalogMake, setCatalogMake] = useState<TReceivedMakeObj | null>(null);
  const [pickAccessoryModalOpen, setPickAccessoryModalOpen] = useState(false);
  const [orderObj, setOrderObj] = useState<TLocalOrderObj>({
    id: '',
    tireCount: -1,
    bodyObj: null,
    lengthObj: null,
    generalAccessoriesArray: [],
    dimensionRelatedAccessoriesArray: [],
    bodyRelatedAccessoriesArray: [],
    bodyMakeObj: null,
  });
  const [accessoriesLength, setAccessoriesLength] = useState<{ general: number; body: number; dimension: number }>({
    general: -1,
    body: -1,
    dimension: -1,
  });

  const [currentCheckedGeneralAccessories, setCurrentCheckedGeneralAccessories] = useState<ICheckedAccessories | null>(
    null,
  );
  const [currentCheckedBodyAccessories, setCurrentCheckedBodyAccessories] = useState<ICheckedAccessories | null>(null);
  const [
    currentCheckedDimensionAccessories,
    setCurrentCheckedDimensionAccessories,
  ] = useState<ICheckedDimensionAccessories | null>(null);

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
        data: catalogMake.horsepower !== null && catalogMake.horsepower !== '' ? `${catalogMake.horsepower}PS` : '-',
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
  /*  method */
  /* ================================================== */
  const onGenerateQuotation = () => {
    if (currentCheckedGeneralAccessories) {
      let tempGeneralAccessoriesArray: TReceivedAccessoryObj[] = [];
      for (let uniqueId in currentCheckedGeneralAccessories) {
        if (currentCheckedGeneralAccessories[uniqueId].checked === true) {
          tempGeneralAccessoriesArray.push(currentCheckedGeneralAccessories[uniqueId].accessory);
        }
      }
      setOrderObj({ ...orderObj, generalAccessoriesArray: tempGeneralAccessoriesArray });
    }
    if (currentCheckedBodyAccessories) {
      let tempBodyRelatedAccessoriesArray: TReceivedAccessoryObj[] = [];
      for (let uniqueId in currentCheckedBodyAccessories) {
        if (currentCheckedBodyAccessories[uniqueId].checked === true) {
          tempBodyRelatedAccessoriesArray.push(currentCheckedBodyAccessories[uniqueId].accessory);
        }
      }
      setOrderObj({ ...orderObj, bodyRelatedAccessoriesArray: tempBodyRelatedAccessoriesArray });
    }
    if (currentCheckedDimensionAccessories) {
      let tempDimensionRelatedAccessoriesArray: TReceivedDimensionAccessoryObj[] = [];
      for (let uniqueId in currentCheckedDimensionAccessories) {
        if (currentCheckedDimensionAccessories[uniqueId].checked === true) {
          tempDimensionRelatedAccessoriesArray.push(currentCheckedDimensionAccessories[uniqueId].accessory);
        }
      }
      setOrderObj({ ...orderObj, dimensionRelatedAccessoriesArray: tempDimensionRelatedAccessoriesArray });
    }

    if (localOrdersArray !== undefined) {
      let copyArray = [...localOrdersArray];
      copyArray.push(orderObj);
      onStoreLocalOrders(copyArray);
      history.push(ROUTE_ORDERS);
    }
  };

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
    if (generalAccessoriesArray && bodyRelatedAccessoriesArray && dimensionRelatedAccessoriesArray) {
      //  initialize the object with checked as false
      setAccessoriesLength((prevState) => {
        return {
          ...prevState,
          general: generalAccessoriesArray.length,
          body: bodyRelatedAccessoriesArray.length,
          dimension: dimensionRelatedAccessoriesArray.length,
        };
      });

      generalAccessoriesArray.forEach((accessory) => {
        setCurrentCheckedGeneralAccessories((prevState) => {
          return {
            ...prevState,
            [uuidv4()]: { checked: false, accessory: accessory },
          };
        });
      });
      bodyRelatedAccessoriesArray.forEach((accessory) =>
        setCurrentCheckedBodyAccessories((prevState) => {
          return { ...prevState, [uuidv4()]: { checked: false, accessory: accessory } };
        }),
      );
      dimensionRelatedAccessoriesArray.forEach((dimensionAccessory) =>
        setCurrentCheckedDimensionAccessories((prevState) => {
          return { ...prevState, [uuidv4()]: { checked: false, accessory: dimensionAccessory } };
        }),
      );
    }
  }, [generalAccessoriesArray, bodyRelatedAccessoriesArray, dimensionRelatedAccessoriesArray]);

  useEffect(() => {
    onGetCatalogBodyMakes(parseInt(match.params.make_id));
  }, [onGetCatalogBodyMakes, match.params.make_id]);

  /* ================================================== */
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* Modal */}
      <Modal
        className="catalogbodymake__modal"
        title="Select accessories for this configuration"
        visible={pickAccessoryModalOpen}
        okText="Generate Quotation"
        onOk={onGenerateQuotation}
        onCancel={() => {
          // close the modal
          setPickAccessoryModalOpen(false);
          // need to clear the objects on cancel if not the accessories will keep stacking on each other
          setCurrentCheckedBodyAccessories({});
          setCurrentCheckedGeneralAccessories({});
          setCurrentCheckedDimensionAccessories({});
        }}
      >
        {generalAccessoriesArray && bodyRelatedAccessoriesArray && dimensionRelatedAccessoriesArray ? (
          <>
            {accessoriesLength.general === 0 && accessoriesLength.body === 0 && accessoriesLength.dimension === 0 ? (
              <Empty />
            ) : (
              <div className="catalogbodymake__modal-div">
                {currentCheckedGeneralAccessories && accessoriesLength.general > 0 && (
                  <div>
                    <Divider orientation="left">
                      <div className="catalogbodymake__modal-divider">General Accessories</div>
                    </Divider>
                    <div className="catalogbodymake__modal-checkboxes-div">
                      <div className="catalogbodymake__modal-checkboxes">
                        {Object.keys(currentCheckedGeneralAccessories).map((uniqueId) => {
                          // map out unique id to keep track of which accessories is this
                          return (
                            <div key={uuidv4()}>
                              <Checkbox
                                checked={currentCheckedGeneralAccessories[uniqueId].checked}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    let tempObject = { ...currentCheckedGeneralAccessories };
                                    tempObject[uniqueId].checked = true;
                                    setCurrentCheckedGeneralAccessories({
                                      ...currentCheckedGeneralAccessories,
                                      [uniqueId]: tempObject[uniqueId],
                                    });
                                  } else {
                                    let tempObject = { ...currentCheckedGeneralAccessories };
                                    tempObject[uniqueId].checked = false;
                                    setCurrentCheckedGeneralAccessories({
                                      ...currentCheckedGeneralAccessories,
                                      [uniqueId]: tempObject[uniqueId],
                                    });
                                  }
                                }}
                              >
                                {currentCheckedGeneralAccessories[uniqueId].accessory.title}
                              </Checkbox>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                {currentCheckedBodyAccessories && accessoriesLength.body > 0 && (
                  <div>
                    <Divider orientation="left">
                      <div className="catalogbodymake__modal-divider">Body Associated Accessories</div>
                    </Divider>
                    <div className="catalogbodymake__modal-checkboxes-div">
                      <div className="catalogbodymake__modal-checkboxes">
                        {Object.keys(currentCheckedBodyAccessories).map((uniqueId) => {
                          // map out unique id to keep track of which accessories is this
                          return (
                            <div key={uuidv4()}>
                              <Checkbox
                                checked={currentCheckedBodyAccessories[uniqueId].checked}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    let tempObject = { ...currentCheckedBodyAccessories };
                                    tempObject[uniqueId].checked = true;
                                    setCurrentCheckedBodyAccessories({
                                      ...currentCheckedBodyAccessories,
                                      [uniqueId]: tempObject[uniqueId],
                                    });
                                  } else {
                                    let tempObject = { ...currentCheckedBodyAccessories };
                                    tempObject[uniqueId].checked = false;
                                    setCurrentCheckedBodyAccessories({
                                      ...currentCheckedBodyAccessories,
                                      [uniqueId]: tempObject[uniqueId],
                                    });
                                  }
                                }}
                              >
                                {currentCheckedBodyAccessories[uniqueId].accessory.title}
                              </Checkbox>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                {currentCheckedDimensionAccessories && accessoriesLength.dimension > 0 && (
                  <div>
                    <Divider orientation="left">
                      <div className="catalogbodymake__modal-divider">Dimension Associated Accessories</div>
                    </Divider>
                    <div className="catalogbodymake__modal-checkboxes-div">
                      <div className="catalogbodymake__modal-checkboxes">
                        {Object.keys(currentCheckedDimensionAccessories).map((uniqueId) => {
                          // map out unique id to keep track of which accessories is this
                          return (
                            <div key={uuidv4()}>
                              <Checkbox
                                checked={currentCheckedDimensionAccessories[uniqueId].checked}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    let tempObject = { ...currentCheckedDimensionAccessories };
                                    tempObject[uniqueId].checked = true;
                                    setCurrentCheckedDimensionAccessories({
                                      ...currentCheckedDimensionAccessories,
                                      [uniqueId]: tempObject[uniqueId],
                                    });
                                  } else {
                                    let tempObject = { ...currentCheckedDimensionAccessories };
                                    tempObject[uniqueId].checked = false;
                                    setCurrentCheckedDimensionAccessories({
                                      ...currentCheckedDimensionAccessories,
                                      [uniqueId]: tempObject[uniqueId],
                                    });
                                  }
                                }}
                              >
                                {currentCheckedDimensionAccessories[uniqueId].accessory.accessory.title}
                              </Checkbox>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <Skeleton active />
        )}
      </Modal>
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
                                        {bodyMake?.length && (
                                          <div className="flex-align-center catalogbodymake__card-overlay-dimension-title">
                                            Length:&nbsp;
                                            <div className="catalogbodymake__card-overlay-dimension">
                                              {bodyMake?.length.title} - {bodyMake?.length.description}
                                            </div>
                                          </div>
                                        )}
                                        {bodyMake?.width !== null &&
                                          bodyMake?.width !== '' &&
                                          bodyMake?.width !== null && (
                                            <div className="flex-align-center catalogbodymake__card-overlay-dimension-title">
                                              Width:&nbsp;
                                              <div className="catalogbodymake__card-overlay-dimension">
                                                {bodyMake?.width}
                                              </div>
                                            </div>
                                          )}

                                        {bodyMake?.depth !== null &&
                                          bodyMake?.depth !== '' &&
                                          bodyMake?.depth !== null && (
                                            <div className="flex-align-center catalogbodymake__card-overlay-dimension-title">
                                              Depth:&nbsp;
                                              <div className="catalogbodymake__card-overlay-dimension">
                                                {bodyMake?.depth}
                                              </div>
                                            </div>
                                          )}

                                        {bodyMake?.height !== null &&
                                          bodyMake?.height !== '' &&
                                          bodyMake?.height !== null && (
                                            <div className="flex-align-center catalogbodymake__card-overlay-dimension-title">
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
                                            <div className="flex-align-center">
                                              <div className="catalogbodymake__card-overlay-price-title">
                                                Body Price:
                                              </div>
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
                                            </div>
                                          </>
                                        )}
                                      </div>
                                      <div className="catalogbodymake__card-overlay-quotation-div">
                                        <Button
                                          type="default"
                                          className="catalogbodymake__card-overlay-quotation-btn"
                                          onClick={() => {
                                            onGetSalesAccessories(bodyMake?.id);
                                            setOrderObj({
                                              ...orderObj,
                                              id: uuidv4(),
                                              bodyMakeObj: bodyMake,
                                              bodyObj: bodyMake.body,
                                              lengthObj: bodyMake.length,
                                              tireCount: parseInt(bodyMake?.make_wheelbase.make.tire),
                                            });
                                            setPickAccessoryModalOpen(true);
                                          }}
                                        >
                                          Quotation&nbsp;&nbsp;
                                          <i className="fas fa-file-invoice-dollar"></i>
                                        </Button>
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
                  <div className="catalogbodymake__empty-div">
                    <div className="catalogbodymake__empty-backarrow-div" onClick={() => history.push('/catalog')}>
                      <LeftCircleOutlined className="catalogbodymake__backarrow" />
                      Go Back
                    </div>
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
  localOrdersArray?: TLocalOrderObj[];
  bodyMakeWithWheelbase?: TReceivedCatalogBodyMake[] | null;
  makeFromCatalogBodyMake?: TReceivedMakeObj | null;
  generalAccessoriesArray?: TReceivedAccessoryObj[] | null;
  bodyRelatedAccessoriesArray?: TReceivedAccessoryObj[] | null;
  dimensionRelatedAccessoriesArray?: TReceivedDimensionAccessoryObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    localOrdersArray: state.sales.localOrdersArray,
    bodyMakeWithWheelbase: state.catalog.catalogBodyMakesArray,
    makeFromCatalogBodyMake: state.catalog.makeFromCatalogBodyMake,
    generalAccessoriesArray: state.sales.generalAccessoriesArray,
    bodyRelatedAccessoriesArray: state.sales.bodyRelatedAccessoriesArray,
    dimensionRelatedAccessoriesArray: state.sales.dimensionRelatedAccessoriesArray,
  };
};

interface DispatchProps {
  onStoreLocalOrders: typeof actions.storeLocalOrders;
  onGetCatalogBodyMakes: typeof actions.getCatalogBodyMakes;
  onGetSalesAccessories: typeof actions.getSalesAccessories;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetCatalogBodyMakes: (make_id) => dispatch(actions.getCatalogBodyMakes(make_id)),
    onGetSalesAccessories: (body_make_id) => dispatch(actions.getSalesAccessories(body_make_id)),
    onStoreLocalOrders: (localOrdersArray) => dispatch(actions.storeLocalOrders(localOrdersArray)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogBodyMake));

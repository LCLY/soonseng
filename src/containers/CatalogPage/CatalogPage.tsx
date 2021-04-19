import React, { useEffect, useCallback, useState } from 'react';
import './CatalogPage.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
import CrudModal from 'src/components/Modal/Crud/CrudModal';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
// import CatalogFilter from 'src/containers/CatalogPage/CatalogFilter/CatalogFilter';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
/*3rd party lib*/
import gsap from 'gsap';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import NumberFormat from 'react-number-format';
import { PlusCircleOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Empty, Form, Tabs, Tooltip, message, Menu, Dropdown } from 'antd';

/* Util */
import { RootState } from 'src';
import holy5trucks from 'src/img/5trucks.jpg';
import { ROUTE_CATALOG } from 'src/shared/routes';
import * as actions from 'src/store/actions/index';
import { TUserAccess } from 'src/store/types/auth';
import soonseng_placeholder from 'src/img/soonseng_logo_red.png';
import { desiredValueWhenUndefinedOrNull } from 'src/shared/Utils';
import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import { TCatalogSeries, TReceivedCatalogMakeObj } from 'src/store/types/catalog';
import { TCreateMakeFinishValues, TUpdateMakeFinishValues } from '../DashboardPage/DashboardCRUD/Make/Make';
import { TCreateMakeData, TReceivedMakeObj, TReceivedSeriesObj, TUpdateMakeData } from 'src/store/types/dashboard';
import { convertPriceToFloat, convertSpaceInStringWithChar, emptyStringWhenUndefinedOrNull } from 'src/shared/Utils';

const { TabPane } = Tabs;

interface CatalogPageProps {}

type Props = CatalogPageProps & StateProps & DispatchProps & RouteComponentProps;

const CatalogPage: React.FC<Props> = ({
  history,
  accessObj,
  successMessage,
  errorMessage,
  catalogMakesArray,
  onCreateBrand,
  onUpdateBrand,
  onDeleteBrand,
  onCreateSeries,
  onDeleteSeries,
  onUpdateSeries,
  onCreateMake,
  onDeleteMake,
  onUpdateMake,
  onGetCatalogMakes,
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({
    brand: false,
    series: false,
    make: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({
    brand: false,
    series: false,
    make: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({
    brand: false,
    series: false,
    make: false,
  });

  // if undefined meaning there's no make
  const [selectedMake, setSelectedMake] = useState<TReceivedMakeObj | null | undefined>(null);

  const [localLoading, setLocalLoading] = useState(false);

  const [activeBrandTab, setActiveBrandTab] = useState('brand1');
  const [activeSeriesTab, setActiveSeriesTab] = useState('series1');
  const [activeSeriesId, setActiveSeriesId] = useState(-1);

  const [modalContent, setModalContent] = useState({
    make: { makeTitle: '', seriesTitle: '' },
    series: { brandTitle: '', seriesTitle: '' },
  });
  const [deleteModalContent, setDeleteModalContent] = useState({
    series: { brandId: -1, seriesId: -1, warningText: '', backupWarningText: 'this series' },
    make: { makeId: -1, warningText: '', backupWarningText: 'this model' },
    brand: { brandId: -1, warningText: '', backupWarningText: 'this brand' },
  });

  const [createMakeForm] = Form.useForm();
  const [updateMakeForm] = Form.useForm();
  const [createSeriesForm] = Form.useForm();
  const [updateSeriesForm] = Form.useForm();
  const [createBrandForm] = Form.useForm();
  const [updateBrandForm] = Form.useForm();
  // const [makeFilter, setMakeFilter] = useState('');
  // const [showSearch, setShowSearch] = useState(false);

  const { width } = useWindowDimensions();

  /* ======================== */
  /*   Image related states   */
  /* ======================== */
  // Upload states
  // const [uploadSelectedFiles, setUploadSelectedFiles] = useState<FileList | null | undefined>(null);
  // state to store temporary images before user uploads
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState<string[]>([]); //this is for preview image purposes only

  /* ================================================== */
  /*  methods  */
  /* ================================================== */
  /* ---------------- */
  //  Animation
  /* ---------------- */
  const animateMakesAppear = useCallback(() => {
    gsap.fromTo(
      `.catalog__row-div-parent-${activeSeriesId}`,
      { x: '120%', duration: 0.5 },
      { x: 0, duration: 0.5, stagger: { each: 0.05, from: 'end' } },
    );
  }, [activeSeriesId]);

  const animateStatsAppear = () => {
    gsap.fromTo('.catalog__series-content-line', { margin: '0 100%', duration: 1 }, { margin: 0, duration: 1 });
    gsap.fromTo('.catalog__series-content-title', { x: '100%', duration: 1 }, { x: 0, duration: 1 });
    gsap.fromTo(
      '.catalog__series-content-button',
      { x: '150%', duration: 1, ease: Back.easeOut.config(3) },
      { x: '0', duration: 1, ease: Back.easeOut.config(3) },
    );
    gsap.fromTo(
      '.catalog__series-content-row',
      { x: '-120%' },
      {
        x: '0',
        stagger: { each: 0.05, from: 'start' }, // 0.1 seconds between when each ".box" element starts animating
      },
    );
  };
  /* ---------------- */
  //  Series
  /* ---------------- */
  const onCreateSeriesFinish = (values: { brand_id: number; title: string }) => {
    setLocalLoading(true);
    onCreateSeries(values.brand_id, values.title);
  };
  const onUpdateSeriesFinish = (values: { brand_id: number; series_id: number; title: string }) => {
    setLocalLoading(true);
    onUpdateSeries(values.brand_id, values.series_id, values.title);
  };
  const onDeleteSeriesFinish = () => {
    setLocalLoading(true);
    onDeleteSeries(deleteModalContent.series.brandId, deleteModalContent.series.seriesId);
  };
  /* ---------------- */
  //  Make
  /* ---------------- */
  // Create Make
  const onCreateMakeFinish = (values: TCreateMakeFinishValues) => {
    setLocalLoading(true);
    // package the object
    let createMakeData: TCreateMakeData = {
      title: values.title,
      brand_id: values.makeBrandId,
      series_id: values.makeSeriesId,
      tire: emptyStringWhenUndefinedOrNull(values.makeTire),
      horsepower: emptyStringWhenUndefinedOrNull(values.horsepower),
      year: emptyStringWhenUndefinedOrNull(moment(values.year).format('YYYY').toString()), //convert to year
      transmission: emptyStringWhenUndefinedOrNull(values.transmission),
      engine_cap: emptyStringWhenUndefinedOrNull(values.engine_cap),
      gvw: emptyStringWhenUndefinedOrNull(values.gvw),
      abs: emptyStringWhenUndefinedOrNull(values.abs),
      torque: emptyStringWhenUndefinedOrNull(values.torque),
      config: emptyStringWhenUndefinedOrNull(values.config),
      emission: emptyStringWhenUndefinedOrNull(values.emission),
      price: convertPriceToFloat(values.price),
    };

    onCreateMake(createMakeData);
    // if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
    //   // if there are files being selected to be uploaded
    //   // then send the tag and image files to the api call
    //   onCreateMake(createMakeData, values.imageTag, uploadSelectedFiles);
    // } else {
    //   onCreateMake(createMakeData, null, null); //call create make api
    // }
  };

  // Update Make
  const onUpdateMakeFinish = (values: TUpdateMakeFinishValues) => {
    setLocalLoading(true);
    // package the object
    let updateMakeData: TUpdateMakeData = {
      make_id: values.makeId,
      title: values.title,
      brand_id: values.makeBrandId,
      series_id: values.makeSeriesId,
      price: convertPriceToFloat(values.price),
      gvw: emptyStringWhenUndefinedOrNull(values.gvw),
      abs: emptyStringWhenUndefinedOrNull(values.abs),
      torque: emptyStringWhenUndefinedOrNull(values.torque),
      tire: emptyStringWhenUndefinedOrNull(values.makeTire),
      config: emptyStringWhenUndefinedOrNull(values.config),
      emission: emptyStringWhenUndefinedOrNull(values.emission),
      horsepower: emptyStringWhenUndefinedOrNull(values.horsepower),
      transmission: emptyStringWhenUndefinedOrNull(values.transmission),
      engine_cap: emptyStringWhenUndefinedOrNull(values.engine_cap),
      year: emptyStringWhenUndefinedOrNull(moment(values.year).format('YYYY').toString()),
    };
    onUpdateMake(updateMakeData);
    // if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
    //   // if there are files being selected to be uploaded
    //   // then send the tag and image files to the api call
    //   onUpdateMake(updateMakeData, values.imageTag, uploadSelectedFiles);
    // } else {
    //   onUpdateMake(updateMakeData, null, null);
    // }
  };

  const onDeleteMakeFinish = () => {
    setLocalLoading(true);
    onDeleteMake(deleteModalContent.make.makeId);
  };

  const onCreateBrandFinish = (values: { brandDescription: string | null; brandTitle: string }) => {
    setLocalLoading(true);
    onCreateBrand(values.brandTitle, values.brandDescription ? values.brandDescription : '');
  };

  const onUpdateBrandFinish = (values: { brandDescription: string | null; brandId: number; brandTitle: string }) => {
    setLocalLoading(true);
    onUpdateBrand(values.brandId, values.brandTitle, values.brandDescription ? values.brandDescription : '');
  };
  const onDeleteBrandFinish = () => {
    setLocalLoading(true);
    onDeleteBrand(deleteModalContent.brand.brandId);
  };

  /* ================================================== */
  /*  components  */
  /* ================================================== */
  const BrandMenu = ({ catalog }: { catalog: TReceivedCatalogMakeObj }) => (
    <Menu className="catalog__menu">
      <Menu.Item
        className="catalog__menu-item"
        onClick={() => {
          updateBrandForm.setFieldsValue({
            brandId: catalog.brand.id,
            brandTitle: catalog.brand.title,
            brandDescription: catalog.brand.description,
          });
          setShowUpdateModal({ ...showUpdateModal, brand: true });
        }}
      >
        <i className="fas fa-edit" />
        &nbsp;&nbsp;Edit Brand
      </Menu.Item>
      <Menu.Item
        className="catalog__menu-item--danger"
        danger
        onClick={() => {
          setDeleteModalContent({
            ...deleteModalContent,
            brand: {
              brandId: catalog.brand.id,
              warningText: catalog.brand.title,
              backupWarningText: 'this brand',
            },
          });
          setShowDeleteModal({ ...showDeleteModal, brand: true });
        }}
      >
        <i className="fas fa-trash-alt" />
        &nbsp;&nbsp;Delete Brand
      </Menu.Item>
    </Menu>
  );
  const SeriesMenu = (props: { seriesTitle: string; brandId: number; seriesId: number }) => (
    <Menu className="catalog__menu">
      <Menu.Item
        className="catalog__menu-item"
        onClick={() => {
          updateSeriesForm.setFieldsValue({
            brand_id: props.brandId,
            series_id: props.seriesId,
            title: props.seriesTitle,
          });
          // let seriesModalContent = { ...modalContent };
          // seriesModalContent.series.seriesTitle = props.seriesTitle;
          // setModalContent(seriesModalContent);
          setShowUpdateModal({ ...showUpdateModal, series: true });
        }}
      >
        <i className="fas fa-edit" />
        &nbsp;&nbsp;Edit Series
      </Menu.Item>
      <Menu.Item
        className="catalog__menu-item--danger"
        danger
        onClick={() => {
          setDeleteModalContent({
            ...deleteModalContent,
            series: {
              brandId: props.brandId,
              seriesId: props.seriesId,
              warningText: props.seriesTitle,
              backupWarningText: 'this series',
            },
          });
          setShowDeleteModal({ ...showDeleteModal, series: true });
        }}
      >
        <i className="fas fa-trash-alt" />
        &nbsp;&nbsp;Delete Series
      </Menu.Item>
    </Menu>
  );

  // Menu for dropdown
  const MakeMenu = (props: { makeObj: TReceivedMakeObj; seriesObj: TReceivedSeriesObj }) => (
    <div className="catalog__menu-outerdiv">
      <Menu className="catalog__menu">
        <Menu.Item
          className="catalog__menu-item"
          onClick={() => {
            let price: number | null = null;
            if (props.makeObj.price === 0) {
              price = null;
            } else {
              price = props.makeObj.price;
            }
            updateMakeForm.setFieldsValue({
              makeId: props.makeObj.id,
              gvw: props.makeObj.gvw,
              price: price,
              title: props.makeObj.title,
              makeAbs: props.makeObj.abs,
              makeTire: props.makeObj.tire,
              makeTorque: props.makeObj.torque,
              makeConfig: props.makeObj.config,
              makeSeriesId: props.seriesObj.id,
              makeBrandId: props.makeObj.brand.id,
              horsepower: props.makeObj.horsepower,
              engine_cap: props.makeObj.engine_cap,
              makeEmission: props.makeObj.emission,
              transmission: props.makeObj.transmission,
              year: props.makeObj.year ? moment(props.makeObj.year) : null,
            });
            let makeModalContent = { ...modalContent };
            makeModalContent.make.makeTitle = props.makeObj.title;
            setModalContent(makeModalContent);
            setShowUpdateModal({ ...showUpdateModal, make: true });
          }}
        >
          <i className="fas fa-edit" />
          &nbsp;&nbsp;Edit Model
        </Menu.Item>
        <Menu.Item
          className="catalog__menu-item--danger"
          danger
          onClick={() => {
            setDeleteModalContent({
              ...deleteModalContent,
              make: {
                makeId: props.makeObj.id,
                warningText: props.makeObj.title,
                backupWarningText: 'this model',
              },
            });
            setShowDeleteModal({ ...showDeleteModal, make: true });
          }}
        >
          <i className="fas fa-trash-alt" /> &nbsp;&nbsp;Delete Model
        </Menu.Item>
      </Menu>
    </div>
  );

  const SeriesMakesGrid = ({
    series,
    catalog,
  }: {
    series: TCatalogSeries;
    catalog: TReceivedCatalogMakeObj;
    arrayIsOddNumberAndMakeLengthLessThanThree: boolean;
  }) => (
    <>
      <div className="catalog__section-series-outerdiv">
        <div className="catalog__section-series-innerdiv">
          {series.makes.length > 0 ? (
            <div className="catalog__series-outerdiv">
              <div
                className={
                  series.images.length > 0
                    ? 'catalog__series-image-div'
                    : 'catalog__series-image-div catalog__series-image-div--placeholder'
                }
              >
                {selectedMake ? (
                  <>
                    {series.images.length > 0 ? (
                      <img className="catalog__series-image" alt={series.images[0].tag} src={series.images[0].url} />
                    ) : (
                      <img
                        className="catalog__series-image catalog__series-image--placeholder"
                        alt="placeholder"
                        src={soonseng_placeholder}
                      />
                    )}
                    <div className="catalog__series-overlay"></div>
                    <div className="catalog__series-content">
                      <div>
                        <div className="catalog__series-content-line"></div>
                        <div className="catalog__series-content-title">
                          <h2>{selectedMake?.title}</h2>
                        </div>
                      </div>
                      <div className="catalog__series-content-row">
                        <div className="catalog__series-content-row-label">Config</div>
                        <div className="catalog__series-content-row-info">
                          {desiredValueWhenUndefinedOrNull(selectedMake.config, '-')}
                        </div>
                      </div>
                      <div className="catalog__series-content-row">
                        <div className="catalog__series-content-row-label">Torque</div>
                        <div className="catalog__series-content-row-info">
                          {desiredValueWhenUndefinedOrNull(selectedMake.torque, '-')}
                        </div>
                      </div>
                      <div className="catalog__series-content-row">
                        <div className="catalog__series-content-row-label">Horsepower</div>
                        <div className="catalog__series-content-row-info">
                          {desiredValueWhenUndefinedOrNull(`${selectedMake.horsepower}PS`, '-')}
                        </div>
                      </div>
                      <div className="catalog__series-content-row">
                        <div className="catalog__series-content-row-label">Emission</div>
                        <div className="catalog__series-content-row-info">
                          {desiredValueWhenUndefinedOrNull(selectedMake.emission, '-')}
                        </div>
                      </div>
                      <div className="catalog__series-content-row">
                        <div className="catalog__series-content-row-label">Tire Count</div>
                        <div className="catalog__series-content-row-info">
                          {desiredValueWhenUndefinedOrNull(selectedMake.tire, '-')}
                        </div>
                      </div>

                      <div className="catalog__series-content-row">
                        <div className="catalog__series-content-row-label">Transmission</div>
                        <div className="catalog__series-content-row-info">
                          {desiredValueWhenUndefinedOrNull(selectedMake.transmission, '-')}
                        </div>
                      </div>
                      <div className="catalog__series-content-row">
                        <div className="catalog__series-content-row-label">Engine Capacity</div>
                        <div className="catalog__series-content-row-info">
                          {desiredValueWhenUndefinedOrNull(selectedMake.engine_cap, '-')}
                        </div>
                      </div>
                      <div className="catalog__series-content-row">
                        <div className="catalog__series-content-row-label">ABS</div>
                        <div className="catalog__series-content-row-info">
                          {selectedMake.abs ? 'Available' : 'Not Available'}
                        </div>
                      </div>
                      <div className="catalog__series-content-row">
                        <div className="catalog__series-content-row-label">Year</div>
                        <div className="catalog__series-content-row-info">
                          {(selectedMake.year && selectedMake.year.toLowerCase() === 'Invalid Date'.toLowerCase()) ||
                          selectedMake.year === null ||
                          selectedMake.year === undefined
                            ? '-'
                            : selectedMake.year}
                        </div>
                      </div>
                      <div className="catalog__series-content-row">
                        <div className="catalog__series-content-row-label">GVW</div>
                        <div className="catalog__series-content-row-info">
                          {desiredValueWhenUndefinedOrNull(`${selectedMake.gvw}KG`, '-')}
                        </div>
                      </div>
                      {accessObj?.showPriceSalesPage && (
                        <div className="catalog__series-content-row">
                          <div className="catalog__series-content-row-label catalog__series-content-row-label--price">
                            Price
                          </div>
                          <div className="catalog__series-content-row-info catalog__series-content-row-info--price">
                            {selectedMake.price === null ||
                            selectedMake.price === undefined ||
                            selectedMake.price === 0 ? (
                              '-'
                            ) : (
                              <>
                                RM
                                <NumberFormat
                                  value={selectedMake.price}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="catalog__series-content-button-div">
                          <span
                            className="catalog__series-content-button"
                            onClick={() => {
                              let model_detail = `${selectedMake.brand.title}-${convertSpaceInStringWithChar(
                                series.title,
                                '',
                              )}-${convertSpaceInStringWithChar(selectedMake.title, '')}`;
                              history.push(`${ROUTE_CATALOG}/${series.id}/${model_detail}/${selectedMake.id}`);
                            }}
                          >
                            Go To Model&nbsp;<i className="fas fa-chevron-circle-right"></i>
                          </span>
                        </div>
                        <div className="catalog__series-content-line"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>loading</div>
                )}
              </div>
              <div className="catalog__div-makelist">
                <>
                  {series.makes
                    // .filter((make) => make.title.toLowerCase().includes(makeFilter.toLowerCase()))
                    .map((make) => {
                      let cardUniqueKey = uuidv4();
                      return (
                        <div
                          className={`catalog__row-div-parent catalog__row-div-parent-${series.id}`}
                          key={cardUniqueKey}
                        >
                          <div
                            className={`catalog__row-div ${make.id === selectedMake?.id ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedMake(make);

                              if (selectedMake) {
                                animateStatsAppear();
                              }
                              // history.push(`${ROUTE_CATALOG}/${series.id}/${model_detail}/${make.id}`);
                            }}
                          >
                            <div>{make.title}</div>
                          </div>
                          {accessObj?.showAdminDashboard && (
                            <Tooltip title={`Edit / Delete ${make.title}`}>
                              <Dropdown
                                className="catalog__dropdown-more catalog__dropdown-more--make"
                                overlay={<MakeMenu makeObj={make} seriesObj={series} />}
                                trigger={['click']}
                              >
                                <i className="fas fa-ellipsis-h"></i>
                              </Dropdown>
                            </Tooltip>
                          )}
                        </div>
                      );
                    })}
                  {accessObj?.showAdminDashboard && (
                    <Tooltip title="Add Model">
                      <div
                        className={`catalog__button-series catalog__button-series--addmodel catalog__row-div-parent-${series.id}`}
                        onClick={() => {
                          setModalContent({
                            ...modalContent,
                            make: { seriesTitle: series.title, makeTitle: '' },
                          });
                          createMakeForm.setFieldsValue({ makeSeriesId: series.id, makeBrandId: catalog.brand.id });
                          // show the modal
                          setShowCreateModal({ ...showCreateModal, make: true });
                        }}
                      >
                        <PlusCircleOutlined className="catalog__button-icon catalog__button-icon--make" />
                        &nbsp;&nbsp;Add Model
                      </div>
                    </Tooltip>
                  )}
                </>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'çenter', justifyContent: 'center', height: '100%' }}>
              <Empty />
            </div>
          )}
        </div>
      </div>
    </>
  );

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */
  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
  }, []);
  // on mount, always start user at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
    message.config({
      maxCount: 3,
    });
  }, []);

  useEffect(() => {
    if (selectedMake) {
      animateStatsAppear();
    }
  }, [selectedMake]);

  useEffect(() => {
    animateMakesAppear();
  }, [animateMakesAppear]);

  useEffect(() => {
    // animate makes everytime a new series is chosen
    if (activeSeriesTab) {
      let index = parseInt(activeSeriesTab.replace('series', '')) - 1;
      animateMakesAppear();
      if (
        catalogMakesArray &&
        catalogMakesArray.length > 0 &&
        catalogMakesArray[0].series.length > 0 &&
        catalogMakesArray[0].series[index].makes.length > 0
      ) {
        setActiveSeriesId(catalogMakesArray[0].series[index].id);
        setSelectedMake(catalogMakesArray[0].series[index].makes[0]);
      } else {
        setSelectedMake(undefined); //undefined when there's no make
      }
    }
  }, [activeSeriesTab, animateMakesAppear, catalogMakesArray]);

  useEffect(() => {
    onGetCatalogMakes();
  }, [onGetCatalogMakes]);

  useEffect(() => {
    //  after successful data retrieve, select the first series from first brand
    if (catalogMakesArray) {
      // first make sure that there is >= 1 catalog makes
      // then make sure that series is also >= 1
      // then make sure that makes within series is also >= 1 then proceed
      if (
        catalogMakesArray.length > 0 &&
        catalogMakesArray[0].series.length > 0 &&
        catalogMakesArray[0].series[0].makes.length > 0
      ) {
        setActiveSeriesId(catalogMakesArray[0].series[0].id);
        setSelectedMake(catalogMakesArray[0].series[0].makes[0]);
      } else {
        setSelectedMake(undefined); //undefined when there's no make
      }
    }
  }, [catalogMakesArray]);

  /* -------------------- */
  // success notification
  /* -------------------- */
  useEffect(() => {
    if (successMessage) {
      // delay 1s to allow array render to catch
      setTimeout(() => {
        setLocalLoading(false);
        // show success notification
        message.success(successMessage);
        // clear the successMessage object, set to null
        onClearDashboardState();
        // clear the form inputs using the form reference
        createSeriesForm.resetFields();
        createMakeForm.resetFields();

        // close all the modals if successful
        setShowCreateModal({
          ...showCreateModal,
          series: false,
          make: false,
          brand: false,
        });
        setShowUpdateModal({
          ...showUpdateModal,
          series: false,
          make: false,
          brand: false,
        });
        setShowDeleteModal({
          ...showDeleteModal,
          series: false,
          make: false,
          brand: false,
        });

        if (successMessage === 'Series deleted') {
          setActiveSeriesTab('series1');
        }
        if (successMessage === 'Brand deleted') {
          setActiveBrandTab('brand1');
        }
      }, 1000);
    }
  }, [
    successMessage,
    showDeleteModal,
    showUpdateModal,
    showCreateModal,
    createMakeForm,
    createSeriesForm,
    onClearDashboardState,
  ]);

  useEffect(() => {
    if (successMessage) {
      // everytime when succeed get catalog again
      onGetCatalogMakes();
    }
  }, [successMessage, onGetCatalogMakes]);
  /* ------------------ */
  // error notification
  /* ------------------ */
  useEffect(() => {
    if (errorMessage) {
      message.success({ content: errorMessage, duration: 2.5 });
      onClearDashboardState();
    }
  }, [errorMessage, onClearDashboardState]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" name="Catalog" content="Catalog showing all available vehicle cargos to be ordered." />
        <title>Catalog | Soon Seng Motors Enterprise (1988)</title>
        <link href="http://www.soonsenghino.com/catalog" />
      </Helmet>
      {/* ====================================== */}
      {/* Modals */}
      {/* ====================================== */}
      {/* -------------------------------- */}
      {/* Brand */}
      {/* -------------------------------- */}
      <CrudModal
        crud={'create'}
        indexKey={'brand'}
        category={'brand'}
        modalTitle={'Create Brand'}
        antdForm={createBrandForm}
        showModal={showCreateModal}
        visible={showCreateModal.brand}
        onFinish={onCreateBrandFinish}
        setShowModal={setShowCreateModal}
        loading={localLoading}
      />
      <CrudModal
        crud={'update'}
        indexKey={'brand'}
        category={'brand'}
        modalTitle={'Update Brand'}
        antdForm={updateBrandForm}
        showModal={showUpdateModal}
        visible={showUpdateModal.brand}
        onFinish={onUpdateBrandFinish}
        setShowModal={setShowUpdateModal}
        loading={localLoading}
      />
      <CrudModal
        crud={'delete'}
        indexKey={'brand'}
        category={'brand'}
        modalTitle={`Delete Brand`}
        showModal={showDeleteModal}
        visible={showDeleteModal.brand}
        onDelete={onDeleteBrandFinish}
        setShowModal={setShowDeleteModal}
        warningText={deleteModalContent.brand.warningText}
        backupWarningText={deleteModalContent.brand.backupWarningText}
        loading={localLoading}
      />
      {/* -------------------------------- */}
      {/* Series */}
      {/* -------------------------------- */}
      <CrudModal
        crud={'create'}
        indexKey={'series'}
        category={'series'}
        modalTitle={'Create Series'}
        antdForm={createSeriesForm}
        showModal={showCreateModal}
        visible={showCreateModal.series}
        onFinish={onCreateSeriesFinish}
        setShowModal={setShowCreateModal}
        loading={localLoading}
      />

      <CrudModal
        crud={'update'}
        indexKey={'series'}
        category={'series'}
        modalTitle={`Update Series`}
        antdForm={updateSeriesForm}
        showModal={showUpdateModal}
        visible={showUpdateModal.series}
        onFinish={onUpdateSeriesFinish}
        setShowModal={setShowUpdateModal}
        loading={localLoading}
      />
      <CrudModal
        crud={'delete'}
        indexKey={'series'}
        category={'series'}
        modalTitle={`Delete Series`}
        showModal={showDeleteModal}
        visible={showDeleteModal.series}
        onDelete={onDeleteSeriesFinish}
        setShowModal={setShowDeleteModal}
        warningText={deleteModalContent.series.warningText}
        backupWarningText={deleteModalContent.series.backupWarningText}
        loading={localLoading}
      />

      {/* -------------------------------- */}
      {/* Model/Make */}
      {/* -------------------------------- */}
      <CrudModal
        crud={'create'}
        indexKey={'make'}
        category={'make'}
        modalWidth={800}
        isDashboard={false}
        modalTitle={`Create Model for ${modalContent.make.seriesTitle}`}
        antdForm={createMakeForm}
        showModal={showCreateModal}
        visible={showCreateModal.make}
        onFinish={onCreateMakeFinish}
        setShowModal={setShowCreateModal}
        loading={localLoading}
      />

      <CrudModal
        crud={'update'}
        indexKey={'make'}
        category={'make'}
        modalWidth={800}
        isDashboard={false}
        modalTitle={'Update Model'}
        antdForm={updateMakeForm}
        showModal={showUpdateModal}
        visible={showUpdateModal.make}
        onFinish={onUpdateMakeFinish}
        setShowModal={setShowUpdateModal}
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
        loading={localLoading}
      />

      <CrudModal
        crud={'delete'}
        indexKey={'make'}
        category={'make'}
        modalTitle={`Delete Model`}
        showModal={showDeleteModal}
        visible={showDeleteModal.make}
        onDelete={onDeleteMakeFinish}
        setShowModal={setShowDeleteModal}
        warningText={deleteModalContent.make.warningText}
        backupWarningText={deleteModalContent.make.backupWarningText}
        loading={localLoading}
      />

      <NavbarComponent activePage="catalog" defaultOpenKeys="product" />
      {/* background image in outerdiv */}
      <ParallaxContainer bgImageUrl={holy5trucks} overlayColor="rgba(0, 0, 0, 0.3)">
        <CustomContainer>
          <div className="catalog__outerdiv">
            {/* {catalogMakesArray && (
              <>
                <CatalogFilter
                  showSearch={showSearch}
                  setShowSearch={setShowSearch}
                  filterString={makeFilter}
                  setFilterString={setMakeFilter}
                />
              </>
            )} */}
            <div className="catalog__div">
              {catalogMakesArray ? (
                catalogMakesArray.length > 0 ? (
                  <div className="catalog__innerdiv">
                    <Tabs
                      activeKey={activeBrandTab}
                      tabPosition={width < 900 ? 'top' : 'left'}
                      className="catalog__tabs-outerdiv--brand"
                      onTabClick={(activeKey: string) => {
                        setActiveSeriesTab('series1');
                        setActiveBrandTab(activeKey);
                      }}
                      tabBarExtraContent={{
                        right: (
                          <>
                            {accessObj?.showAdminDashboard && (
                              <div
                                className="catalog__button-series catalog__button-series--brand"
                                onClick={() => {
                                  // show the modal
                                  setShowCreateModal({ ...showCreateModal, brand: true });
                                }}
                              >
                                <PlusCircleOutlined className="catalog__button-icon" />
                                &nbsp;&nbsp;Add Brand
                              </div>
                            )}
                          </>
                        ),
                      }}
                    >
                      {catalogMakesArray.map((catalog, index) => {
                        return (
                          // div wrapping brand along with its series
                          <TabPane
                            tab={
                              <div className="catalog__tabs-title">
                                <div>{catalog.brand.title}</div>
                                <div>
                                  {accessObj?.showAdminDashboard && (
                                    <Tooltip title={`Edit / Delete ${catalog.brand.title}`}>
                                      <Dropdown
                                        className="catalog__dropdown-more"
                                        overlay={<BrandMenu catalog={catalog} />}
                                        trigger={['click']}
                                      >
                                        <i className="fas fa-cogs" />
                                      </Dropdown>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                            }
                            key={`brand${index + 1}`}
                          >
                            <div className="catalog__brand-div" key={uuidv4()}>
                              {/* ================================= */}
                              {/* series section */}
                              {/* ================================= */}
                              <section className="catalog__section-series">
                                {catalog.series.length > 0 ? (
                                  <Tabs
                                    tabBarExtraContent={{
                                      right: (
                                        <>
                                          {accessObj?.showAdminDashboard && (
                                            <div
                                              className="catalog__button-series"
                                              onClick={() => {
                                                // set the brand id in the form
                                                createSeriesForm.setFieldsValue({ brand_id: catalog.brand.id });
                                                // set the content so that modal can display the brand title
                                                let seriesModalContent = { ...modalContent };
                                                seriesModalContent.series.brandTitle = catalog.brand.title;
                                                setModalContent(seriesModalContent);
                                                // show the modal
                                                setShowCreateModal({ ...showCreateModal, series: true });
                                              }}
                                            >
                                              <PlusCircleOutlined className="catalog__button-icon" />
                                              &nbsp;&nbsp;Add Series
                                            </div>
                                          )}
                                        </>
                                      ),
                                    }}
                                    tabPosition="top"
                                    className="catalog__tabs-outerdiv glass-shadow"
                                    animated={{ tabPane: true }}
                                    activeKey={activeSeriesTab}
                                    onTabClick={(activeKey: string) => {
                                      if (activeSeriesTab === activeKey) return;
                                      setActiveSeriesTab(activeKey);
                                      // if makes has items then choose the first one always
                                      if (
                                        Object.keys(catalog.series[0]).includes('makes') &&
                                        catalog.series[0].makes.length > 0
                                      ) {
                                        setActiveSeriesId(catalog.series[0].id);
                                        setSelectedMake(catalog.series[0].makes[0]);
                                      } else {
                                        setSelectedMake(undefined);
                                      }
                                    }}
                                  >
                                    {catalog.series.map((series, index) => {
                                      // if array is odd number, on the last row, make it display flex
                                      let arrayIsOddNumberAndMakeLengthLessThanThree =
                                        catalog.series.length % 2 !== 0 &&
                                        index === catalog.series.length - 1 &&
                                        catalog.series[index].makes.length > 3;

                                      return (
                                        <TabPane
                                          tab={
                                            <div className="catalog__tabs-title">
                                              <div>{series.title}</div>
                                              <div>
                                                {accessObj?.showAdminDashboard && (
                                                  <Tooltip title={`Edit / Delete ${series.title}`}>
                                                    <Dropdown
                                                      className="catalog__dropdown-more"
                                                      overlay={
                                                        <SeriesMenu
                                                          seriesTitle={series.title}
                                                          brandId={catalog.brand.id}
                                                          seriesId={series.id}
                                                        />
                                                      }
                                                      trigger={['click']}
                                                    >
                                                      <i className="fas fa-cogs" />
                                                    </Dropdown>
                                                  </Tooltip>
                                                )}
                                              </div>
                                            </div>
                                          }
                                          key={`series${index + 1}`}
                                        >
                                          <div
                                            className={arrayIsOddNumberAndMakeLengthLessThanThree ? 'fullcolspan' : ''}
                                          >
                                            {/*  ================================================================ */}
                                            {/*    ADMIN - if user is admin show everything, if not only show
                                       those that the length is greater than 0 */}
                                            {/*  ================================================================ */}
                                            {accessObj?.showAdminDashboard ? (
                                              <SeriesMakesGrid
                                                series={series}
                                                catalog={catalog}
                                                arrayIsOddNumberAndMakeLengthLessThanThree={
                                                  arrayIsOddNumberAndMakeLengthLessThanThree
                                                }
                                              />
                                            ) : (
                                              /* ================================================================ */
                                              // NORMAL USER - if user is normal user only show the series that has item inside
                                              /* ================================================================ */
                                              <>
                                                {series.makes.length > 0 && (
                                                  <SeriesMakesGrid
                                                    series={series}
                                                    catalog={catalog}
                                                    arrayIsOddNumberAndMakeLengthLessThanThree={
                                                      arrayIsOddNumberAndMakeLengthLessThanThree
                                                    }
                                                  />
                                                )}
                                              </>
                                            )}
                                          </div>
                                        </TabPane>
                                      );
                                    })}
                                  </Tabs>
                                ) : (
                                  <div className="catalog__empty-series glass-shadow">
                                    <Empty />
                                  </div>
                                )}
                              </section>
                            </div>
                          </TabPane>
                        );
                      })}
                    </Tabs>
                  </div>
                ) : (
                  <div className="catalog__loading-div">
                    <Empty style={{ color: 'white' }}>
                      <div className="catalog__button-series" onClick={() => history.push('/dashboard/make')}>
                        Go to Dashboard
                      </div>
                    </Empty>
                  </div>
                )
              ) : (
                <div className="catalog__loading-div">
                  <Ripple />
                </div>
              )}
            </div>
          </div>
        </CustomContainer>
      </ParallaxContainer>
      <Footer />
    </>
  );
};
interface StateProps {
  loading?: boolean;
  accessObj?: TUserAccess;
  dashboardLoading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  catalogMakesArray?: TReceivedCatalogMakeObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.catalog.loading,
    accessObj: state.auth.accessObj,
    dashboardLoading: state.dashboard.loading,
    errorMessage: state.dashboard.errorMessage,
    successMessage: state.dashboard.successMessage,
    catalogMakesArray: state.catalog.catalogMakesArray,
  };
};
interface DispatchProps {
  onCreateBrand: typeof actions.createBrand;
  onUpdateBrand: typeof actions.updateBrand;
  onDeleteBrand: typeof actions.deleteBrand;
  onCreateMake: typeof actions.createMake;
  onUpdateMake: typeof actions.updateMake;
  onDeleteMake: typeof actions.deleteMake;
  onCreateSeries: typeof actions.createSeries;
  onUpdateSeries: typeof actions.updateSeries;
  onDeleteSeries: typeof actions.deleteSeries;
  onGetCatalogMakes: typeof actions.getCatalogMakes;
  onDeleteUploadImage: typeof actions.deleteUploadImage;
  onClearDashboardState: typeof actions.clearDashboardState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onCreateBrand: (title, description) => dispatch(actions.createBrand(title, description)),
    onUpdateBrand: (brand_id, title, description) => dispatch(actions.updateBrand(brand_id, title, description)),
    onDeleteBrand: (brand_id) => dispatch(actions.deleteBrand(brand_id)),
    onCreateMake: (createMakeData) => dispatch(actions.createMake(createMakeData)),
    onGetCatalogMakes: () => dispatch(actions.getCatalogMakes()),
    onUpdateMake: (updateMakeData) => dispatch(actions.updateMake(updateMakeData)),
    onDeleteMake: (make_id) => dispatch(actions.deleteMake(make_id)),
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
    onDeleteUploadImage: (ids) => dispatch(actions.deleteUploadImage(ids)),
    onCreateSeries: (brand_id, title) => dispatch(actions.createSeries(brand_id, title)),
    onDeleteSeries: (brand_id, series_id) => dispatch(actions.deleteSeries(brand_id, series_id)),
    onUpdateSeries: (brand_id, series_id, title) => dispatch(actions.updateSeries(brand_id, series_id, title)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogPage));

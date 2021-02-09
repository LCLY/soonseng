import React, { useEffect, useState } from 'react';
import './CatalogPage.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
import CrudModal from 'src/components/Modal/Crud/CrudModal';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import CatalogFilter from 'src/containers/CatalogPage/CatalogFilter/CatalogFilter';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
import LightboxComponent from 'src/components/ImageRelated/LightboxComponent/LightboxComponent';
import FullImageGalleryModal from 'src/components/ImageRelated/FullImageGalleryModal/FullImageGalleryModal';
/*3rd party lib*/
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Empty, Form, Tabs, Tooltip, message, Skeleton, Menu, Dropdown } from 'antd';

/* Util */
import {
  TCreateMakeData,
  TReceivedImageObj,
  TReceivedMakeObj,
  TReceivedSeriesObj,
  TUpdateMakeData,
} from 'src/store/types/dashboard';
import { RootState } from 'src';
import holy5trucks from 'src/img/5trucks.jpg';
import { ROUTE_CATALOG } from 'src/shared/routes';

import * as actions from 'src/store/actions/index';
import { TUserAccess } from 'src/store/types/auth';
import { onClearAllSelectedImages } from 'src/shared/Utils';
import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import { TCatalogSeries, TReceivedCatalogMakeObj } from 'src/store/types/catalog';
import { TCreateMakeFinishValues, TUpdateMakeFinishValues } from '../DashboardPage/DashboardCRUD/Make/Make';
import { convertPriceToFloat, convertSpaceInStringWithChar, emptyStringWhenUndefinedOrNull } from 'src/shared/Utils';

const { TabPane } = Tabs;

interface CatalogPageProps {}

type Props = CatalogPageProps & StateProps & DispatchProps & RouteComponentProps;

const CatalogPage: React.FC<Props> = ({
  history,
  accessObj,
  auth_token,
  dashboardLoading,
  successMessage,
  errorMessage,
  catalogMakesArray,
  onCreateSeries,
  onDeleteSeries,
  onUpdateSeries,
  onCreateMake,
  onDeleteMake,
  onUpdateMake,
  onGetCatalogMakes,
  onDeleteUploadImage,
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({
    series: false,
    make: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({
    series: false,
    make: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({
    series: false,
    make: false,
  });

  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImagesArray, setLightboxImagesArray] = useState<TReceivedImageObj[]>([]);
  const [fullImageGalleryVisible, setFullImageGalleryVisible] = useState(false);
  const [fullImageGalleryImagesArray, setFullImageGalleryImagesArray] = useState<TReceivedImageObj[] | null>(null);
  const [keepTrackSeriesMake, setKeepTrackSeriesMake] = useState<{
    series_id: number;
    make_id: number;
    brand_id: number;
  } | null>(null);

  const [localLoading, setLocalLoading] = useState(false);

  const [activeBrandTab, setActiveBrandTab] = useState('brand1');
  const [activeSeriesTab, setActiveSeriesTab] = useState('series1');

  const [modalContent, setModalContent] = useState({
    make: { makeTitle: '', seriesTitle: '' },
    series: { brandTitle: '', seriesTitle: '' },
  });
  const [deleteModalContent, setDeleteModalContent] = useState({
    series: { brandId: -1, seriesId: -1, warningText: '', backupWarningText: 'this series' },
    make: { makeId: -1, warningText: '', backupWarningText: 'this model' },
  });

  const [makeFilter, setMakeFilter] = useState('');
  const [createMakeForm] = Form.useForm();
  const [updateMakeForm] = Form.useForm();
  const [createSeriesForm] = Form.useForm();
  const [updateSeriesForm] = Form.useForm();
  const [showSearch, setShowSearch] = useState(false);

  const { width } = useWindowDimensions();

  /* ======================== */
  /*   Image related states   */
  /* ======================== */
  // Upload states
  const [uploadSelectedFiles, setUploadSelectedFiles] = useState<FileList | null | undefined>(null);
  // state to store temporary images before user uploads
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState<string[]>([]); //this is for preview image purposes only
  const [fullGalleryImagesPreviewUrls, setFullGalleryImagesPreviewUrls] = useState<{ url: string; name: string }[]>([]); //this is for preview image purposes only
  const [imageGalleryTargetModelId, setImageGalleryTargetModelId] = useState(-1);
  /* ================================================== */
  /*  methods  */
  /* ================================================== */

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

    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onCreateMake(createMakeData, values.imageTag, uploadSelectedFiles);
    } else {
      onCreateMake(createMakeData, null, null); //call create make api
    }
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

    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onUpdateMake(updateMakeData, values.imageTag, uploadSelectedFiles);
    } else {
      onUpdateMake(updateMakeData, null, null);
    }
  };

  const onDeleteMakeFinish = () => {
    setLocalLoading(true);
    onDeleteMake(deleteModalContent.make.makeId);
  };

  /* ================================================== */
  /*  components  */
  /* ================================================== */
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
          onClick={() => {
            setFullImageGalleryVisible(true);
            setFullImageGalleryImagesArray(props.makeObj.images);
            setKeepTrackSeriesMake({
              ...keepTrackSeriesMake,
              make_id: props.makeObj.id,
              series_id: props.seriesObj.id,
              brand_id: props.makeObj.brand.id,
            });
            setImageGalleryTargetModelId(props.makeObj.id);
          }}
        >
          <i className="fas fa-images"></i> &nbsp;&nbsp;Edit Images
        </Menu.Item>
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
        <div className="catalog__series-top-div">
          <div className="catalog__series-title-outerdiv"></div>

          {accessObj?.showAdminDashboard && (
            <Tooltip title="Add Model">
              <div
                className="catalog__button-series"
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
        </div>
        <div className="catalog__section-series-innerdiv">
          {series.makes.length > 0 ? (
            <div className={`catalog__grid`}>
              {series.makes
                .filter((make) => make.title.toLowerCase().includes(makeFilter.toLowerCase()))
                .map((make) => {
                  let model_detail = `${catalog.brand.title}-${convertSpaceInStringWithChar(
                    series.title,
                    '',
                  )}-${convertSpaceInStringWithChar(make.title, '')}`;
                  let cardUniqueKey = uuidv4();
                  return (
                    <div key={cardUniqueKey} className="catalog__card-outerdiv">
                      <div
                        className="catalog__card"
                        onClick={() => history.push(`${ROUTE_CATALOG}/${series.id}/${model_detail}/${make.id}`)}
                      >
                        {make.images.length > 0 ? (
                          <>
                            <img
                              className="catalog__card-image"
                              src={make.images[0].url}
                              alt={make.images[0].filename}
                            />
                            <div
                              className="catalog__card-image-blurbg"
                              style={{ backgroundImage: `url(${make.images[0].url})` }}
                            ></div>
                          </>
                        ) : (
                          <Skeleton.Image className="catalog__card-image--skeleton" />
                        )}
                      </div>
                      <div className="catalog__card-label">{make.title}</div>
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

                      {/* View Image button */}
                      <Tooltip title={`View Images`}>
                        <div
                          onClick={() => {
                            setPhotoIndex(0);
                            setLightboxOpen(true);
                            setLightboxImagesArray(make.images);
                          }}
                          className={`catalog__dropdown-more 
                        ${make.images.length === 0 ? 'catalog__dropdown-more--disabled' : ''}                       
                        ${
                          accessObj?.showAdminDashboard
                            ? 'catalog__dropdown-more--image'
                            : 'catalog__dropdown-more--make'
                        }                          
                          `}
                        >
                          <i className="fas fa-images"></i>
                        </div>
                      </Tooltip>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'çenter', justifyContent: 'center', height: '100%' }}>
              <Empty />
            </div>
          )}
        </div>
      </div>

      {lightboxImagesArray.length > 0 && (
        <LightboxComponent
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          isOpen={lightboxOpen}
          setIsOpen={setLightboxOpen}
          images={lightboxImagesArray}
        />
      )}
    </>
  );

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */
  // on mount, always start user at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
    message.config({
      maxCount: 3,
    });
  }, []);

  useEffect(() => {
    if (auth_token === undefined) return;
    onGetCatalogMakes(auth_token);
  }, [onGetCatalogMakes, auth_token]);

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
        });
        setShowUpdateModal({
          ...showUpdateModal,
          series: false,
          make: false,
        });
        setShowDeleteModal({
          ...showDeleteModal,
          series: false,
          make: false,
        });
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
    if (catalogMakesArray && catalogMakesArray !== undefined && keepTrackSeriesMake) {
      let filteredBrandArray = catalogMakesArray.filter(
        (catalogMake) => catalogMake.brand.id === keepTrackSeriesMake.brand_id,
      );

      let filteredSeries = filteredBrandArray[0].series.filter(
        (seriesChild) => seriesChild.id === keepTrackSeriesMake.series_id,
      );
      let filteredMake = filteredSeries[0].makes.filter((makeChild) => makeChild.id === keepTrackSeriesMake.make_id);
      setFullImageGalleryImagesArray(filteredMake[0].images);
    }
  }, [catalogMakesArray, keepTrackSeriesMake]);

  useEffect(() => {
    if (successMessage) {
      if (auth_token === undefined) return;
      // everytime when succeed get catalog again
      onGetCatalogMakes(auth_token);
    }
  }, [auth_token, successMessage, onGetCatalogMakes]);
  /* ------------------ */
  // error notification
  /* ------------------ */
  useEffect(() => {
    if (errorMessage) {
      message.success({ content: errorMessage, duration: 2.5 });
      onClearDashboardState();
    }
  }, [errorMessage, onClearDashboardState]);

  useEffect(() => {
    if (document && lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [lightboxOpen]);

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
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
        setUploadSelectedFiles={setUploadSelectedFiles}
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
        setUploadSelectedFiles={setUploadSelectedFiles}
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

      <FullImageGalleryModal
        indexKey={'make'}
        modelId={imageGalleryTargetModelId}
        uploadSelectedFiles={uploadSelectedFiles}
        setUploadSelectedFiles={setUploadSelectedFiles}
        imagesPreviewUrls={fullGalleryImagesPreviewUrls}
        setImagesPreviewUrls={setFullGalleryImagesPreviewUrls}
        visible={fullImageGalleryVisible}
        setVisible={setFullImageGalleryVisible}
        loading={dashboardLoading !== undefined && dashboardLoading}
        showUpdateModal={showUpdateModal}
        imagesArray={fullImageGalleryImagesArray}
        setShowUpdateModal={setShowUpdateModal}
        onDeleteUploadImage={onDeleteUploadImage}
        onClearAllSelectedImages={onClearAllSelectedImages}
      />

      <NavbarComponent activePage="catalog" defaultOpenKeys="product" />
      {/* background image in outerdiv */}
      <ParallaxContainer bgImageUrl={holy5trucks} overlayColor="rgba(0, 0, 0, 0.3)">
        <CustomContainer>
          <div className="catalog__outerdiv">
            {catalogMakesArray && (
              <>
                <CatalogFilter
                  showSearch={showSearch}
                  setShowSearch={setShowSearch}
                  filterString={makeFilter}
                  setFilterString={setMakeFilter}
                />
              </>
            )}
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
                    >
                      {catalogMakesArray.map((catalog, index) => {
                        return (
                          // div wrapping brand along with its series
                          <TabPane tab={catalog.brand.title} key={`brand${index + 1}`}>
                            <div className="catalog__brand-div" key={uuidv4()}>
                              {/* ================================= */}
                              {/* Brand title */}
                              {/* ================================= */}
                              <div className="catalog__brand-innerdiv">
                                {/* <div className="catalog__brand-title">{catalog.brand.title}</div> */}
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
                              </div>
                              {/* ================================= */}
                              {/* series section */}
                              {/* ================================= */}
                              <section className="catalog__section-series">
                                {catalog.series.length > 0 ? (
                                  <Tabs
                                    tabPosition="top"
                                    className="catalog__tabs-outerdiv glass-shadow"
                                    animated={{ tabPane: true }}
                                    activeKey={activeSeriesTab}
                                    onTabClick={(activeKey: string) => {
                                      setActiveSeriesTab(activeKey);
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
                                              <span>{series.title}</span>
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
  auth_token?: string | null;
  dashboardLoading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  catalogMakesArray?: TReceivedCatalogMakeObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.catalog.loading,
    accessObj: state.auth.accessObj,
    auth_token: state.auth.auth_token,
    dashboardLoading: state.dashboard.loading,
    errorMessage: state.dashboard.errorMessage,
    successMessage: state.dashboard.successMessage,
    catalogMakesArray: state.catalog.catalogMakesArray,
  };
};
interface DispatchProps {
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
    onCreateMake: (createMakeData, imageTag, uploadSelectedFiles) =>
      dispatch(actions.createMake(createMakeData, imageTag, uploadSelectedFiles)),
    onUpdateMake: (updateMakeData, imageTag, imageFiles) =>
      dispatch(actions.updateMake(updateMakeData, imageTag, imageFiles)),
    onDeleteMake: (make_id) => dispatch(actions.deleteMake(make_id)),
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
    onDeleteUploadImage: (ids) => dispatch(actions.deleteUploadImage(ids)),
    onGetCatalogMakes: (auth_token) => dispatch(actions.getCatalogMakes(auth_token)),
    onCreateSeries: (brand_id, title) => dispatch(actions.createSeries(brand_id, title)),
    onDeleteSeries: (brand_id, series_id) => dispatch(actions.deleteSeries(brand_id, series_id)),
    onUpdateSeries: (brand_id, series_id, title) => dispatch(actions.updateSeries(brand_id, series_id, title)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogPage));

import React, { useEffect, useState } from 'react';
import './CatalogPage.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
import CrudModal from 'src/components/Modal/Crud/CrudModal';
/*3rd party lib*/
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Empty, Form, Tooltip, Skeleton, notification, Menu, Dropdown } from 'antd';

/* Util */
import { RootState } from 'src';
import holy5trucks from 'src/img/5trucks.jpg';
import { ROUTE_CATALOG } from 'src/shared/routes';
import * as actions from 'src/store/actions/index';
import { TUserAccess } from 'src/store/types/auth';
import { TCatalogSeries, TReceivedCatalogMakeObj } from 'src/store/types/catalog';
import { TCreateMakeData, TReceivedMakeObj, TReceivedSeriesObj, TUpdateMakeData } from 'src/store/types/dashboard';
import { TCreateMakeFinishValues, TUpdateMakeFinishValues } from '../DashboardPage/DashboardCRUD/Make/Make';
import { convertPriceToFloat, convertSpaceInStringWithChar, emptyStringWhenUndefinedOrNull } from 'src/shared/Utils';

interface CatalogPageProps {}

type Props = CatalogPageProps & StateProps & DispatchProps & RouteComponentProps;

const CatalogPage: React.FC<Props> = ({
  history,
  accessObj,
  auth_token,
  successMessage,
  errorMessage,
  dashboardLoading,
  catalogMakesArray,
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
  const [modalContent, setModalContent] = useState({
    make: { makeTitle: '', seriesTitle: '' },
    series: { brandTitle: '', seriesTitle: '' },
  });
  const [deleteModalContent, setDeleteModalContent] = useState({
    series: { brandId: -1, seriesId: -1, warningText: '', backupWarningText: 'this series' },
    make: { makeId: -1, warningText: '', backupWarningText: 'this model' },
  });

  const [createMakeForm] = Form.useForm();
  const [updateMakeForm] = Form.useForm();
  const [createSeriesForm] = Form.useForm();
  const [updateSeriesForm] = Form.useForm();

  /* ======================== */
  /*   Image related states   */
  /* ======================== */
  // Upload states
  const [uploadSelectedFiles, setUploadSelectedFiles] = useState<FileList | null | undefined>(null);
  // state to store temporary images before user uploads
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState<string[]>([]); //this is for preview image purposes only

  /* ================================================== */
  /*  methods  */
  /* ================================================== */

  /* ---------------- */
  //  Series
  /* ---------------- */
  const onCreateSeriesFinish = (values: { brand_id: number; title: string }) => {
    onCreateSeries(values.brand_id, values.title);
  };
  const onUpdateSeriesFinish = (values: { brand_id: number; series_id: number; title: string }) => {
    onUpdateSeries(values.brand_id, values.series_id, values.title);
  };
  const onDeleteSeriesFinish = () => {
    onDeleteSeries(deleteModalContent.series.brandId, deleteModalContent.series.seriesId);
  };
  /* ---------------- */
  //  Make
  /* ---------------- */
  // Create Make
  const onCreateMakeFinish = (values: TCreateMakeFinishValues) => {
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
    onDeleteMake(deleteModalContent.make.makeId);
  };

  /* ================================================== */
  /*  components  */
  /* ================================================== */
  const SeriesMenu = (props: { seriesTitle: string; brandId: number; seriesId: number }) => (
    <Menu>
      <Menu.Item
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
        &nbsp;Edit Series
      </Menu.Item>
      <Menu.Item
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
        <i className="fas fa-trash-alt" /> &nbsp; Delete Series
      </Menu.Item>
    </Menu>
  );

  // Menu for dropdown
  const MakeMenu = (props: { makeObj: TReceivedMakeObj; seriesObj: TReceivedSeriesObj }) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          updateMakeForm.setFieldsValue({
            makeId: props.makeObj.id,
            gvw: props.makeObj.gvw,
            price: props.makeObj.price,
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
        &nbsp;Edit Model
      </Menu.Item>
      <Menu.Item
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
        <i className="fas fa-trash-alt" /> &nbsp; Delete Model
      </Menu.Item>
    </Menu>
  );

  const SeriesMakesGrid = ({
    series,
    catalog,
    arrayIsOddNumberAndMakeLengthLessThanThree,
  }: {
    series: TCatalogSeries;
    catalog: TReceivedCatalogMakeObj;
    arrayIsOddNumberAndMakeLengthLessThanThree: boolean;
  }) => (
    <>
      <div className="catalog__section-series-outerdiv">
        <div className="catalog__series-top-div">
          <div className="catalog__series-title-outerdiv">
            <div className="catalog__series-title">{series.title}</div>

            {accessObj?.showAdminDashboard && (
              <Tooltip title={`Edit / Delete ${series.title}`}>
                <Dropdown
                  className="catalog__dropdown-series"
                  overlay={<SeriesMenu seriesTitle={series.title} brandId={catalog.brand.id} seriesId={series.id} />}
                  trigger={['click']}
                >
                  <i className="fas fa-cogs" />
                </Dropdown>
              </Tooltip>
            )}
          </div>

          {accessObj?.showAdminDashboard && (
            <Tooltip title="Add Model">
              <div
                className="catalog__button-series"
                onClick={() => {
                  setModalContent({
                    ...modalContent,
                    make: { seriesTitle: series.title, makeTitle: '' },
                  });
                  createMakeForm.setFieldsValue({ makeSeriesId: series.id });
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
            <div className={`catalog__grid ${arrayIsOddNumberAndMakeLengthLessThanThree ? 'catalog__grid--full' : ''}`}>
              {series.makes.map((make) => {
                let model_detail = `${catalog.brand.title}-${convertSpaceInStringWithChar(
                  series.title,
                  '',
                )}-${convertSpaceInStringWithChar(make.title, '')}`;

                return (
                  <div key={uuidv4()} className="catalog__card-outerdiv">
                    <div
                      className="catalog__card"
                      onClick={() => history.push(`${ROUTE_CATALOG}/${series.id}/${model_detail}/${make.id}`)}
                    >
                      {make.images.length > 0 ? (
                        <img className="catalog__card-image" src={make.images[0].url} alt={make.images[0].filename} />
                      ) : (
                        <Skeleton.Image className="catalog__card-image" />
                      )}
                      <div className="catalog__card-label">{make.title}</div>
                    </div>
                    {accessObj?.showAdminDashboard && (
                      <Tooltip title={`Edit / Delete ${make.title}`}>
                        <Dropdown
                          className="catalog__dropdown-series catalog__dropdown-series--make"
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
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  );

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

  /* -------------------- */
  // success notification
  /* -------------------- */
  useEffect(() => {
    if (successMessage) {
      // show success notification
      notification['success']({
        message: 'Success',
        description: successMessage,
      });
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
      notification['error']({
        message: 'Failed',
        duration: 2.5,
        description: errorMessage,
      });
      onClearDashboardState();
    }
  }, [errorMessage, onClearDashboardState]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
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
        loading={dashboardLoading !== undefined && dashboardLoading}
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
        loading={dashboardLoading !== undefined && dashboardLoading}
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
        loading={dashboardLoading !== undefined && dashboardLoading}
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
        loading={dashboardLoading !== undefined && dashboardLoading}
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
        loading={dashboardLoading !== undefined && dashboardLoading}
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
        loading={dashboardLoading !== undefined && dashboardLoading}
      />

      <NavbarComponent />
      {/* background image in outerdiv */}
      <ParallaxContainer bgImageUrl={holy5trucks} overlayColor="rgba(0, 0, 0, 0.3)">
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
                        <div className="catalog__brand-innerdiv">
                          <div className="catalog__brand-title">{catalog.brand.title}</div>
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
    onGetCatalogMakes: (auth_token) => dispatch(actions.getCatalogMakes(auth_token)),
    onCreateSeries: (brand_id, title) => dispatch(actions.createSeries(brand_id, title)),
    onDeleteSeries: (brand_id, series_id) => dispatch(actions.deleteSeries(brand_id, series_id)),
    onUpdateSeries: (brand_id, series_id, title) => dispatch(actions.updateSeries(brand_id, series_id, title)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogPage));

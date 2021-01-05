import React, { useEffect, useState } from 'react';
import './CatalogPage.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Empty, Form, Input, Modal, Skeleton, notification, Menu, Dropdown } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* Util */
import holy5trucks from 'src/img/5trucks.jpg';
import { RootState } from 'src';
import { ROUTE_CATALOG } from 'src/shared/routes';
import * as actions from 'src/store/actions/index';
import { convertSpaceInStringWithChar } from 'src/shared/Utils';
import { TReceivedCatalogMakeObj } from 'src/store/types/catalog';
import { TUserAccess } from 'src/store/types/auth';

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
  onUpdateSeries,
  onGetCatalogMakes,
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [showCreateModal, setShowCreateModal] = useState({
    series: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState({
    series: false,
  });
  const [modalContent, setModalContent] = useState({ series: { brand_title: '', series_title: '' } });

  const [createSeriesForm] = Form.useForm();
  const [updateSeriesForm] = Form.useForm();
  /* ================================================== */
  /*  methods  */
  /* ================================================== */

  const onCreateSeriesFinish = (values: { brand_id: number; title: string }) => {
    onCreateSeries(values.brand_id, values.title);
  };
  const onUpdateSeriesFinish = (values: { brand_id: number; series_id: number; title: string }) => {
    console.log(values);
    /* !!!!!!!!!!!!!!!!!!!!!!!!! CONTINUE HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!  */
    onUpdateSeries(values.brand_id, values.series_id, values.title);
  };

  /**
   * For user to be able to press enter and submit the form
   * @param {React.KeyboardEvent<HTMLFormElement>} e
   * @param {FormInstance<any>} form form instance created at initialization using useForm
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>, formRef: FormInstance<any>) => {
    if (e.key === 'Enter') {
      formRef.submit();
    }
  };

  /* ================================================== */
  /*  components  */
  /* ================================================== */
  const SeriesMenu = (props: { seriesTitle: string; brandId: number; seriesId: number }) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          updateSeriesForm.setFieldsValue({ brand_id: props.brandId, series_id: props.seriesId });
          let seriesModalContent = { ...modalContent };
          seriesModalContent.series.series_title = props.seriesTitle;
          setModalContent(seriesModalContent);
          setShowUpdateModal({ ...showUpdateModal, series: true });
        }}
      >
        <i className="fas fa-edit" />
        &nbsp;Edit Series
      </Menu.Item>
      <Menu.Item danger>
        <i className="fas fa-trash-alt" /> &nbsp; Delete Series
      </Menu.Item>
    </Menu>
  );

  /* -------------------------- */
  // Series
  /* -------------------------- */
  let seriesFormItems = (
    <>
      <Form.Item
        className="make__form-item"
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Input series title here!' }]}
      >
        <Input placeholder="Type series title here" />
      </Form.Item>

      {/* Getting the brand id */}
      <Form.Item hidden name="brand_id" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </>
  );

  let createSeriesFormComponent = (
    <>
      <Form
        form={createSeriesForm}
        // name="createBrand"
        onKeyDown={(e) => handleKeyDown(e, createSeriesForm)}
        onFinish={onCreateSeriesFinish}
      >
        {/* The rest of the form items */}
        {seriesFormItems}
      </Form>
    </>
  );

  /* Create Series Modal */
  let createSeriesModal = (
    <Modal
      centered
      title={`Create Series for ${modalContent.series.brand_title}`}
      visible={showCreateModal.series}
      onOk={createSeriesForm.submit}
      confirmLoading={dashboardLoading}
      onCancel={() => {
        createSeriesForm.resetFields();
        setShowCreateModal({ ...showCreateModal, series: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {createSeriesFormComponent}
    </Modal>
  );
  let updateSeriesFormComponent = (
    <>
      <Form
        form={updateSeriesForm}
        // name="createBrand"
        onKeyDown={(e) => handleKeyDown(e, updateSeriesForm)}
        onFinish={onUpdateSeriesFinish}
      >
        {/* The rest of the form items */}
        {seriesFormItems}

        {/* Getting the series id */}
        <Form.Item hidden name="series_id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Update Series Modal */
  let updateSeriesModal = (
    <Modal
      centered
      title={`Update for ${modalContent.series.series_title}`}
      visible={showUpdateModal.series}
      onOk={updateSeriesForm.submit}
      confirmLoading={dashboardLoading}
      onCancel={() => {
        updateSeriesForm.resetFields();
        setShowUpdateModal({ ...showUpdateModal, series: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {updateSeriesFormComponent}
    </Modal>
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

      // close all the modals if successful
      setShowCreateModal({
        ...showCreateModal,
        series: false,
      });
    }
  }, [createSeriesForm, onClearDashboardState, showCreateModal, successMessage]);

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
    }
  }, [errorMessage, onClearDashboardState]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* Modals */}
      {createSeriesModal}
      {updateSeriesModal}
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
                                seriesModalContent.series.brand_title = catalog.brand.title;
                                setModalContent(seriesModalContent);
                                // show the modal
                                setShowCreateModal({ ...createSeriesModal, series: true });
                              }}
                            >
                              <PlusCircleOutlined className="catalog__button-icon" />
                              Add Series
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
                                  <div className="catalog__section-series-outerdiv">
                                    <div className="catalog__series-top-div">
                                      <div className="catalog__series-title-outerdiv">
                                        <div className="catalog__series-title">{series.title}</div>
                                        <Dropdown
                                          className="catalog__dropdown-series"
                                          overlay={
                                            <SeriesMenu
                                              seriesTitle={series.title}
                                              brandId={catalog.brand.id}
                                              seriesId={9999999999999999999}
                                            />
                                          }
                                          trigger={['click']}
                                        >
                                          <i className="fas fa-cogs" />
                                        </Dropdown>
                                      </div>
                                    </div>
                                    <div className="catalog__section-series-innerdiv">
                                      {series.makes.length > 0 ? (
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
                                                onClick={() =>
                                                  history.push(`${ROUTE_CATALOG}/${model_detail}/${make.id}`)
                                                }
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
                                      ) : (
                                        <Empty />
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  /* ================================================================ */
                                  // NORMAL USER - show if user is not admin and there are makes in the series
                                  /* ================================================================ */
                                  <>
                                    {series.makes.length > 0 && (
                                      <div className="catalog__section-series-outerdiv">
                                        <div className="catalog__series-title">{series.title}</div>
                                        {/* if user is admin show everything, if not only show those that the length is greater than 0 */}
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
                                                  onClick={() =>
                                                    history.push(`${ROUTE_CATALOG}/${model_detail}/${make.id}`)
                                                  }
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
  onCreateSeries: typeof actions.createSeries;
  onUpdateSeries: typeof actions.updateSeries;
  onGetCatalogMakes: typeof actions.getCatalogMakes;
  onClearDashboardState: typeof actions.clearDashboardState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
    onGetCatalogMakes: (auth_token) => dispatch(actions.getCatalogMakes(auth_token)),
    onCreateSeries: (brand_id, title) => dispatch(actions.createSeries(brand_id, title)),
    onUpdateSeries: (brand_id, series_id, title) => dispatch(actions.updateSeries(brand_id, series_id, title)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogPage));

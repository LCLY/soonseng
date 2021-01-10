import React, { useEffect, useState } from 'react';
import './CatalogBodyMake.scss';
/*Components*/
import Footer from 'src/components/Footer/Footer';
import CrudModal from 'src/components/Modal/Crud/CrudModal';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { LeftCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Empty,
  Modal,
  Form,
  Checkbox,
  Divider,
  Skeleton,
  notification,
  Dropdown,
  Tooltip,
  Menu,
  Tag,
} from 'antd';
/* Util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import { ROUTE_ORDERS } from 'src/shared/routes';
import hino_banner from 'src/img/hino_banner.jpg';
import * as actions from 'src/store/actions/index';
import { TUserAccess } from 'src/store/types/auth';
import { TReceivedCatalogBodyMake } from 'src/store/types/catalog';
import {
  TCreateBodyMakeData,
  TReceivedAccessoryObj,
  TReceivedBodyMakeObj,
  TReceivedMakeObj,
  TUpdateBodyMakeData,
  TUpdateMakeData,
} from 'src/store/types/dashboard';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';
import moment from 'moment';
import { TUpdateMakeFinishValues } from 'src/containers/DashboardPage/DashboardCRUD/Make/Make';
import { checkInchExist, convertPriceToFloat, emptyStringWhenUndefinedOrNull, formatFeetInch } from 'src/shared/Utils';
import { TCreateBodyMakeForm, TUpdateBodyMakeForm } from 'src/containers/DashboardPage/DashboardCRUD/BodyMake/BodyMake';
import CatalogAccessoriesModal from './CatalogAccessories/CatalogAccessoriesModal';

interface MatchParams {
  make_id: string;
  series_id: string;
}

export interface ICheckedAccessories {
  [uniqueId: string]: { checked: boolean; accessory: TReceivedAccessoryObj };
}
export interface ICheckedDimensionAccessories {
  [uniqueId: string]: { checked: boolean; accessory: TReceivedDimensionAccessoryObj };
}

export interface ICrudModal {
  [key: string]: boolean;
}

interface CatalogBodyMakeProps {}

type Props = CatalogBodyMakeProps & StateProps & DispatchProps & RouteComponentProps<MatchParams>;

const CatalogBodyMake: React.FC<Props> = ({
  match,
  history,
  accessObj,
  errorMessage,
  successMessage,
  dashboardLoading,
  localOrdersArray,
  bodyMakeWithWheelbase,
  makeFromCatalogBodyMake,
  generalAccessoriesArray,
  bodyRelatedAccessoriesArray,
  dimensionRelatedAccessoriesArray,
  onUpdateMake,
  onGetBodies,
  onGetLengths,
  onGetWheelbases,
  onUpdateBodyMake,
  onDeleteBodyMake,
  onCreateBodyMake,
  onStoreLocalOrders,
  onGetSalesAccessories,
  onCreateMakeWheelbase,
  onDeleteMakeWheelbase,
  onGetBodyAccessories,
  onClearDashboardState,
  onGetCatalogBodyMakes,
  onGetBodyMakeAccessories,
  onGetBodyAssociatedAccessories,
  onGetDimensionAssociatedAccessories,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [catalogMake, setCatalogMake] = useState<TReceivedMakeObj | null>(null);
  const [pickAccessoryModalOpen, setPickAccessoryModalOpen] = useState(false);
  const [crudAccessoryModalOpen, setCrudAccessoryModalOpen] = useState(false);
  const [currentBodyMake, setCurrentBodyMake] = useState<TReceivedBodyMakeObj | null>(null);

  /* ======================== */
  /*   Image related states   */
  /* ======================== */
  // Upload states
  const [uploadSelectedFiles, setUploadSelectedFiles] = useState<FileList | null | undefined>(null);
  // state to store temporary images before user uploads
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState<string[]>([]); //this is for preview image purposes only

  const [updateMakeForm] = Form.useForm();
  const [createMakeWheelbaseForm] = Form.useForm();
  const [createBodyMakeForm] = Form.useForm();
  const [updateBodyMakeForm] = Form.useForm();

  const [showCreateModal, setShowCreateModal] = useState<ICrudModal>({
    make: false,
    accessory: false,
    body_make: false,
    make_wheelbase: false,
    body_accessory: false,
    body_make_accessory: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<ICrudModal>({
    make: false,
    accessory: false,
    body_make: false,
    body_make_accessory: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<ICrudModal>({
    accessory: false,
    body_make: false,
    make_wheelbase: false,
    body_accessory: false,
    body_make_accessory: false,
  });

  const [modalContent, setModalContent] = useState({
    make: { makeTitle: '', seriesTitle: '' },
    make_wheelbase: { seriesTitle: '' },
    body_make: { makeWheelbaseTitle: '' },
  });
  const [deleteModalContent, setDeleteModalContent] = useState({
    make_wheelbase: { makeWheelbaseId: -1, makeId: -1, warningText: '', backupWarningText: 'this configuration' },
    body_make: { bodyMakeId: -1, warningText: '', backupWarningText: 'this configuration' },
  });

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
    let tempGeneralAccessoriesArray: TReceivedAccessoryObj[] = [];
    let tempBodyRelatedAccessoriesArray: TReceivedAccessoryObj[] = [];
    let tempDimensionRelatedAccessoriesArray: TReceivedDimensionAccessoryObj[] = [];

    // push the accessories into each respective arrays
    if (currentCheckedGeneralAccessories) {
      for (let uniqueId in currentCheckedGeneralAccessories) {
        if (currentCheckedGeneralAccessories[uniqueId].checked === true) {
          tempGeneralAccessoriesArray.push(currentCheckedGeneralAccessories[uniqueId].accessory);
        }
      }
    }
    if (currentCheckedBodyAccessories) {
      for (let uniqueId in currentCheckedBodyAccessories) {
        if (currentCheckedBodyAccessories[uniqueId].checked === true) {
          tempBodyRelatedAccessoriesArray.push(currentCheckedBodyAccessories[uniqueId].accessory);
        }
      }
    }
    if (currentCheckedDimensionAccessories) {
      for (let uniqueId in currentCheckedDimensionAccessories) {
        if (currentCheckedDimensionAccessories[uniqueId].checked === true) {
          tempDimensionRelatedAccessoriesArray.push(currentCheckedDimensionAccessories[uniqueId].accessory);
        }
      }
    }

    if (localOrdersArray !== undefined) {
      let copyArray = [...localOrdersArray];
      let tempOrderObj = { ...orderObj };
      tempOrderObj.generalAccessoriesArray = tempGeneralAccessoriesArray;
      tempOrderObj.bodyRelatedAccessoriesArray = tempBodyRelatedAccessoriesArray;
      tempOrderObj.dimensionRelatedAccessoriesArray = tempDimensionRelatedAccessoriesArray;

      // push that updated orderObj with the latest accessories array
      copyArray.push(tempOrderObj);

      onStoreLocalOrders(copyArray);
      history.push(ROUTE_ORDERS);
    }
  };

  /* ======================================== */
  // method after click ok on modal
  /* ======================================== */
  /* --------------------- */
  // Make
  /* --------------------- */

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
  /* --------------------- */
  // Make Wheelbase
  /* --------------------- */
  const onCreateMakeWheelbaseFinish = (values: { wheelbaseId: number; makeId: number }) => {
    onCreateMakeWheelbase(values.makeId, values.wheelbaseId);
  };

  const onDeleteMakeWheelbaseFinish = () => {
    onDeleteMakeWheelbase(deleteModalContent.make_wheelbase.makeId, deleteModalContent.make_wheelbase.makeWheelbaseId);
  };
  /* --------------------- */
  // Body Make
  /* --------------------- */

  /* --------- BODY Make ---------- */
  const onCreateBodyMakeFinish = (values: TCreateBodyMakeForm) => {
    // if inch has no input then only display feet
    let concatWidth = formatFeetInch(values.bodyMakeWidth.feet, values.bodyMakeWidth.inch);
    let concatHeight = formatFeetInch(values.bodyMakeHeight.feet, values.bodyMakeHeight.inch);
    let concatDepth = formatFeetInch(values.bodyMakeDepth.feet, values.bodyMakeDepth.inch);

    // if inch has no input then only display length
    let createBodyMakeData: TCreateBodyMakeData = {
      body_id: values.bodyId,
      length_id: values.lengthId,
      make_wheelbase_id: values.makeWheelbaseId,
      make_id: values.makeId,
      width: concatWidth,
      height: concatHeight,
      depth: concatDepth,
      price: convertPriceToFloat(values.bodyMakePrice),
    };

    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onCreateBodyMake(createBodyMakeData, values.imageTag, uploadSelectedFiles);
    } else {
      onCreateBodyMake(createBodyMakeData, null, null);
    }
  };

  const onUpdateBodyMakeFinish = (values: TUpdateBodyMakeForm) => {
    // if inch has no input then only display feet
    let concatWidth = formatFeetInch(values.bodyMakeWidth.feet, values.bodyMakeWidth.inch);
    let concatHeight = formatFeetInch(values.bodyMakeHeight.feet, values.bodyMakeHeight.inch);
    let concatDepth = formatFeetInch(values.bodyMakeDepth.feet, values.bodyMakeDepth.inch);

    let updateBodyMakeData: TUpdateBodyMakeData = {
      body_id: values.bodyId,
      body_make_id: values.bodyMakeId,
      length_id: values.lengthId,
      make_wheelbase_id: values.makeWheelbaseId,
      make_id: values.makeId,
      width: concatWidth,
      height: concatHeight,
      depth: concatDepth,
      price: convertPriceToFloat(values.bodyMakePrice),
    };

    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onUpdateBodyMake(updateBodyMakeData, values.imageTag, uploadSelectedFiles);
    } else {
      onUpdateBodyMake(updateBodyMakeData, null, null);
    }
  };

  const onDeleteBodyMakeFinish = () => {
    onDeleteBodyMake(deleteModalContent.body_make.bodyMakeId);
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
          {accessObj?.showAdminDashboard && (
            <Tooltip title="Edit Model">
              <div
                className="catalogbodymake__button-make"
                onClick={() => {
                  setModalContent({
                    ...modalContent,
                    make: { seriesTitle: catalogMake.series, makeTitle: catalogMake.title },
                  });

                  updateMakeForm.setFieldsValue({
                    makeId: catalogMake.id,
                    gvw: catalogMake.gvw,
                    price: catalogMake.price,
                    title: catalogMake.title,
                    makeAbs: catalogMake.abs,
                    makeTire: catalogMake.tire,
                    makeTorque: catalogMake.torque,
                    makeConfig: catalogMake.config,
                    makeSeriesId: match.params.series_id,
                    makeBrandId: catalogMake.brand.id,
                    horsepower: catalogMake.horsepower,
                    engine_cap: catalogMake.engine_cap,
                    makeEmission: catalogMake.emission,
                    transmission: catalogMake.transmission,
                    year: catalogMake.year ? moment(catalogMake.year) : '',
                  });
                  // show the modal
                  setShowUpdateModal({ ...showUpdateModal, make: true });
                }}
              >
                <i className="fas fa-pen" />
              </div>
            </Tooltip>
          )}
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
              <div style={{ width: '100%' }} className="catalogbodymake__detail-div-right">
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
          {accessObj?.showAdminDashboard && (
            <Tooltip title="Edit Model">
              <div
                className="catalogbodymake__button-make"
                onClick={() => {
                  setModalContent({
                    ...modalContent,
                    make: { seriesTitle: catalogMake.series, makeTitle: catalogMake.title },
                  });

                  updateMakeForm.setFieldsValue({
                    makeId: catalogMake.id,
                    gvw: catalogMake.gvw,
                    price: catalogMake.price,
                    title: catalogMake.title,
                    makeAbs: catalogMake.abs,
                    makeTire: catalogMake.tire,
                    makeTorque: catalogMake.torque,
                    makeConfig: catalogMake.config,
                    makeSeriesId: match.params.series_id,
                    makeBrandId: catalogMake.brand.id,
                    horsepower: catalogMake.horsepower,
                    engine_cap: catalogMake.engine_cap,
                    makeEmission: catalogMake.emission,
                    transmission: catalogMake.transmission,
                    year: catalogMake.year ? moment(catalogMake.year) : '',
                  });
                  // show the modal
                  setShowUpdateModal({ ...showUpdateModal, make: true });
                }}
              >
                <i className="fas fa-pen" />
              </div>
            </Tooltip>
          )}
        </div>
      </>
    );
  };

  const WheelbaseBodyMakeGrid = ({
    makeObj,
    seriesTitle,
    wheelbaseBodyMake,
  }: {
    seriesTitle?: string;
    makeObj?: TReceivedMakeObj;
    wheelbaseBodyMake: TReceivedCatalogBodyMake;
  }) => (
    <>
      <div className="catalogbodymake__wheelbase-outerdiv">
        {wheelbaseBodyMake.make_wheelbase.wheelbase.title && wheelbaseBodyMake.make_wheelbase.wheelbase.title !== '' ? (
          <>
            <div className="catalogbodymake__wheelbase-innerdiv">
              <div className="catalogbodymake__wheelbase-title">
                {wheelbaseBodyMake.make_wheelbase.wheelbase.title}mm Wheelbase
              </div>
              {accessObj?.showAdminDashboard && (
                <Tooltip title={`Delete ${wheelbaseBodyMake.make_wheelbase.wheelbase.title}mm from ${seriesTitle}`}>
                  {makeObj !== undefined && seriesTitle !== undefined && (
                    <div
                      className="catalog__dropdown-series"
                      onClick={() => {
                        setDeleteModalContent({
                          ...deleteModalContent,
                          make_wheelbase: {
                            makeId: makeObj.id,
                            makeWheelbaseId: wheelbaseBodyMake.make_wheelbase.id,
                            warningText: `${wheelbaseBodyMake.make_wheelbase.wheelbase.title}mm from ${seriesTitle} along with other ${wheelbaseBodyMake.body_makes.length} bodies`,
                            backupWarningText: `this configuration from ${seriesTitle}`,
                          },
                        });
                        setShowDeleteModal({ ...showDeleteModal, make_wheelbase: true });
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </div>
                  )}
                </Tooltip>
              )}
            </div>
          </>
        ) : (
          ''
        )}

        {/* Add Body Make Button */}
        {accessObj?.showAdminDashboard && (
          <Tooltip title={`Add Body for ${wheelbaseBodyMake.make_wheelbase.wheelbase.title}mm configuration`}>
            <span
              className="catalog__button-series catalogbodymake__button-body"
              onClick={() => {
                setModalContent({
                  ...modalContent,
                  body_make: { makeWheelbaseTitle: wheelbaseBodyMake.make_wheelbase.wheelbase.title },
                });
                if (makeObj !== undefined) {
                  createBodyMakeForm.setFieldsValue({
                    makeId: makeObj.id,
                    makeWheelbaseId: wheelbaseBodyMake.make_wheelbase.id,
                  });
                }
                // show the modal
                setShowCreateModal({ ...showCreateModal, body_make: true });
              }}
            >
              <PlusCircleOutlined className="catalog__button-icon catalog__button-icon--make" />
              <span className="catalogbodymake__button-title">&nbsp;&nbsp;Add Body</span>
            </span>
          </Tooltip>
        )}
      </div>
      <div className="catalogbodymake__innerdiv">
        {wheelbaseBodyMake.body_makes.length > 0 ? (
          <div className="catalogbodymake__grid">
            <>
              {wheelbaseBodyMake.body_makes.map((bodyMake) => {
                return (
                  <div key={uuidv4()} className="catalogbodymake__card-parent">
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
                            {bodyMake?.width !== null && bodyMake?.width !== '' && bodyMake?.width !== null && (
                              <div className="flex-align-center catalogbodymake__card-overlay-dimension-title">
                                Width:&nbsp;
                                <div className="catalogbodymake__card-overlay-dimension">{bodyMake?.width}</div>
                              </div>
                            )}

                            {bodyMake?.depth !== null && bodyMake?.depth !== '' && bodyMake?.depth !== null && (
                              <div className="flex-align-center catalogbodymake__card-overlay-dimension-title">
                                Depth:&nbsp;
                                <div className="catalogbodymake__card-overlay-dimension">{bodyMake?.depth}</div>
                              </div>
                            )}

                            {bodyMake?.height !== null &&
                              bodyMake?.height !== '\' "' &&
                              bodyMake?.height !== '' &&
                              bodyMake?.height !== null && (
                                <div className="flex-align-center catalogbodymake__card-overlay-dimension-title">
                                  Height:&nbsp;
                                  <div className="catalogbodymake__card-overlay-dimension">{bodyMake?.height}</div>
                                </div>
                              )}
                          </div>
                          <div>
                            {accessObj?.showPriceSalesPage && (
                              <div>
                                <div className="flex-align-center">
                                  <div className="catalogbodymake__card-overlay-price-title">Body Price:</div>
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
                              </div>
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
                                // clear the states
                                setCurrentCheckedBodyAccessories({});
                                setCurrentCheckedGeneralAccessories({});
                                setCurrentCheckedDimensionAccessories({});
                              }}
                            >
                              Add To Orders&nbsp;&nbsp;
                              <i className="fas fa-file-invoice-dollar"></i>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="catalogbodymake__card-label"> {bodyMake.body.title}</div>
                    </div>
                    {accessObj?.showAdminDashboard && (
                      <Tooltip title={`Edit / Delete ${bodyMake.body.title}`}>
                        <Dropdown
                          className="catalog__dropdown-series catalog__dropdown-series--make"
                          overlay={<BodyMakeMenu bodyMakeObj={bodyMake} />}
                          trigger={['click']}
                        >
                          <i className="fas fa-ellipsis-h"></i>
                        </Dropdown>
                      </Tooltip>
                    )}
                  </div>
                );
              })}
            </>
          </div>
        ) : (
          <div className="catalogbodymake__empty-bodymake">
            <Empty />
          </div>
        )}
      </div>
    </>
  );

  const BodyMakeMenu = ({ bodyMakeObj }: { bodyMakeObj: TReceivedBodyMakeObj }) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          setModalContent({
            ...modalContent,
            body_make: { makeWheelbaseTitle: bodyMakeObj.make_wheelbase.wheelbase.title },
          });
          // update the form value using the 'name' attribute as target/key
          updateBodyMakeForm.setFieldsValue({
            makeId: bodyMakeObj.make_wheelbase.make.id,
            bodyId: bodyMakeObj.body.id, // body id
            bodyMakeId: bodyMakeObj.id, // length id
            makeWheelbaseId: bodyMakeObj.make_wheelbase.id,
            lengthId: bodyMakeObj.length.id,
            bodyMakeWidth: {
              feet: checkInchExist(bodyMakeObj.width).feet,
              inch: checkInchExist(bodyMakeObj.width).inch,
            },
            bodyMakeHeight: {
              feet: bodyMakeObj.height ? checkInchExist(bodyMakeObj.height).feet : '',
              inch: bodyMakeObj.height ? checkInchExist(bodyMakeObj.height).inch : '',
            },
            bodyMakeDepth: {
              feet: checkInchExist(bodyMakeObj.depth).feet,
              inch: checkInchExist(bodyMakeObj.depth).inch,
            },
            bodyMakePrice: bodyMakeObj.price,
          });

          setShowUpdateModal({ ...showUpdateModal, body_make: true });
        }}
      >
        <i className="fas fa-edit" />
        &nbsp;&nbsp;Edit Body
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          // set the current body make obj
          setCurrentBodyMake(bodyMakeObj);
          setCrudAccessoryModalOpen(true);
        }}
      >
        <i className="fas fa-tools" />
        &nbsp;&nbsp;Accessories
      </Menu.Item>
      <Menu.Item
        danger
        onClick={() => {
          setDeleteModalContent({
            ...deleteModalContent,
            body_make: {
              bodyMakeId: bodyMakeObj.id,
              warningText: `${bodyMakeObj.make_wheelbase.make.brand.title} ${bodyMakeObj.make_wheelbase.make.title} ${bodyMakeObj.body.title}`,
              backupWarningText: 'this body',
            },
          });
          setShowDeleteModal({ ...showDeleteModal, body_make: true });
        }}
      >
        <i className="fas fa-trash-alt" />
        &nbsp;&nbsp;Delete Body
      </Menu.Item>
    </Menu>
  );

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  // on mount, always start user at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    onGetWheelbases();
  }, [onGetWheelbases]);

  useEffect(() => {
    onGetBodies();
  }, [onGetBodies]);

  useEffect(() => {
    onGetLengths();
  }, [onGetLengths]);

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
      createMakeWheelbaseForm.resetFields();
      createBodyMakeForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({
        ...showCreateModal,
        make: false,
        accessory: false,
        body_make: false,
        make_wheelbase: false,
        body_accessory: false,
        body_make_accessory: false,
      });
      setShowUpdateModal({
        ...showUpdateModal,
        make: false,
        accessory: false,
        body_make: false,
        make_wheelbase: false,
        body_make_accessory: false,
      });
      setShowDeleteModal({
        ...showDeleteModal,
        make: false,
        body_make: false,
        make_wheelbase: false,
        accessory: false,
        body_accessory: false,
        body_make_accessory: false,
      });
    }
  }, [
    successMessage,
    showDeleteModal,
    showUpdateModal,
    showCreateModal,
    createBodyMakeForm,
    createMakeWheelbaseForm,
    onClearDashboardState,
  ]);

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

  useEffect(() => {
    if (successMessage) {
      onGetCatalogBodyMakes(parseInt(match.params.make_id));
      // need to refesh them jz incase new ones are created
      onGetBodyAssociatedAccessories();
      onGetDimensionAssociatedAccessories();

      if (currentBodyMake) {
        onGetSalesAccessories(currentBodyMake.id);
        onGetBodyAccessories(currentBodyMake.body.id);
        onGetBodyMakeAccessories(currentBodyMake.id);
      }
    }
  }, [
    successMessage,
    currentBodyMake,
    onGetBodyAccessories,
    onGetSalesAccessories,
    onGetCatalogBodyMakes,
    match.params.make_id,
    onGetBodyMakeAccessories,
    onGetBodyAssociatedAccessories,
    onGetDimensionAssociatedAccessories,
  ]);

  /* ================================================== */
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* ====================================== */}
      {/* Modal */}
      {/* ====================================== */}
      {/* -------------------------------- */}
      {/* Model/Make */}
      {/* -------------------------------- */}
      <CrudModal
        crud={'update'}
        indexKey={'make'}
        category={'make'}
        modalWidth={800}
        antdForm={updateMakeForm}
        showModal={showUpdateModal}
        visible={showUpdateModal.make}
        onFinish={onUpdateMakeFinish}
        setShowModal={setShowUpdateModal}
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
        setUploadSelectedFiles={setUploadSelectedFiles}
        loading={dashboardLoading !== undefined && dashboardLoading}
        modalTitle={`Update Model for ${modalContent.make.seriesTitle}`}
      />

      {/* -------------------------------- */}
      {/* Make Wheelbase / Configuration */}
      {/* -------------------------------- */}
      <CrudModal
        crud={'create'}
        indexKey={'make_wheelbase'}
        category={'make_wheelbase'}
        showModal={showCreateModal}
        antdForm={createMakeWheelbaseForm}
        setShowModal={setShowCreateModal}
        onFinish={onCreateMakeWheelbaseFinish}
        visible={showCreateModal.make_wheelbase}
        loading={dashboardLoading !== undefined && dashboardLoading}
        modalTitle={`Create Configuration for ${modalContent.make_wheelbase.seriesTitle}`}
      />

      <CrudModal
        crud={'delete'}
        indexKey={'make_wheelbase'}
        category={'make_wheelbase'}
        modalTitle={`Delete Configuration`}
        showModal={showDeleteModal}
        visible={showDeleteModal.make_wheelbase}
        onDelete={onDeleteMakeWheelbaseFinish}
        setShowModal={setShowDeleteModal}
        warningText={deleteModalContent.make_wheelbase.warningText}
        backupWarningText={deleteModalContent.make_wheelbase.backupWarningText}
        loading={dashboardLoading !== undefined && dashboardLoading}
      />

      {/* -------------------------------- */}
      {/* Body Make */}
      {/* -------------------------------- */}
      <CrudModal
        crud={'create'}
        indexKey={'body_make'}
        category={'body_make'}
        showModal={showCreateModal}
        antdForm={createBodyMakeForm}
        setShowModal={setShowCreateModal}
        onFinish={onCreateBodyMakeFinish}
        visible={showCreateModal.body_make}
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
        setUploadSelectedFiles={setUploadSelectedFiles}
        loading={dashboardLoading !== undefined && dashboardLoading}
        modalTitle={`Create Body for ${modalContent.body_make.makeWheelbaseTitle}mm wheelbase`}
      />
      <CrudModal
        crud={'update'}
        indexKey={'body_make'}
        category={'body_make'}
        showModal={showUpdateModal}
        antdForm={updateBodyMakeForm}
        setShowModal={setShowUpdateModal}
        onFinish={onUpdateBodyMakeFinish}
        visible={showUpdateModal.body_make}
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
        setUploadSelectedFiles={setUploadSelectedFiles}
        loading={dashboardLoading !== undefined && dashboardLoading}
        modalTitle={`Update Body with ${modalContent.body_make.makeWheelbaseTitle}mm wheelbase`}
      />

      <CrudModal
        crud={'delete'}
        indexKey={'body_make'}
        category={'body_make'}
        modalTitle={`Delete Body`}
        showModal={showDeleteModal}
        visible={showDeleteModal.body_make}
        onDelete={onDeleteBodyMakeFinish}
        setShowModal={setShowDeleteModal}
        warningText={deleteModalContent.body_make.warningText}
        backupWarningText={deleteModalContent.body_make.backupWarningText}
        loading={dashboardLoading !== undefined && dashboardLoading}
      />

      {/* -------------------------------- */}
      {/* Catalog Accessories CRUD Modal */}
      {/* -------------------------------- */}
      <CatalogAccessoriesModal
        currentBodyMake={currentBodyMake}
        setCurrentBodyMake={setCurrentBodyMake}
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        crudAccessoryModalOpen={crudAccessoryModalOpen}
        setCrudAccessoryModalOpen={setCrudAccessoryModalOpen}
      />

      {/* -------------------------------- */}
      {/* Quotation modal */}
      {/* -------------------------------- */}
      <Modal
        className="catalogbodymake__modal"
        title="Select accessories for this configuration"
        width={650}
        visible={pickAccessoryModalOpen}
        okText="Add To Orders"
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
                                {currentCheckedGeneralAccessories[uniqueId].accessory.price !== 0 &&
                                  currentCheckedGeneralAccessories[uniqueId].accessory.price !== null && (
                                    <Tag color="volcano" className="margin_l-1">
                                      RM&nbsp;{currentCheckedGeneralAccessories[uniqueId].accessory.price}
                                    </Tag>
                                  )}
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

                                {currentCheckedBodyAccessories[uniqueId].accessory.price !== 0 &&
                                  currentCheckedBodyAccessories[uniqueId].accessory.price !== null && (
                                    <Tag color="volcano" className="margin_l-1">
                                      RM&nbsp;{currentCheckedBodyAccessories[uniqueId].accessory.price}
                                    </Tag>
                                  )}
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

                                {currentCheckedDimensionAccessories[uniqueId].accessory.accessory.price !== 0 &&
                                  currentCheckedDimensionAccessories[uniqueId].accessory.accessory.price !== null && (
                                    <Tag color="volcano" className="margin_l-1">
                                      RM&nbsp;{currentCheckedDimensionAccessories[uniqueId].accessory.accessory.price}
                                    </Tag>
                                  )}
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
      <ParallaxContainer bgImageUrl={holy5truck} overlayColor="rgba(0, 0, 0, 0.3)">
        <div className="catalog__outerdiv">
          <div className="catalog__div">
            {bodyMakeWithWheelbase && catalogMake ? (
              <>
                <section className="catalogbodymake__section-div">
                  <div className="catalogbodymake__series-outerdiv">
                    <div className="catalogbodymake__series-innerdiv">
                      <LeftCircleOutlined
                        className="catalogbodymake__backarrow"
                        onClick={() => history.push('/catalog')}
                      />
                      <div className="catalogbodymake__series-title">{catalogMake.series}</div>
                    </div>

                    {accessObj?.showAdminDashboard && (
                      <Tooltip title="Add Configuration">
                        <div
                          className="catalog__button-series catalogbodymake__button-body"
                          onClick={() => {
                            // get make id and title
                            setModalContent({
                              ...modalContent,
                              make_wheelbase: {
                                seriesTitle: catalogMake.series,
                              },
                            });
                            setShowCreateModal({ ...showCreateModal, make_wheelbase: true });
                            createMakeWheelbaseForm.setFieldsValue({
                              makeId: catalogMake.id,
                            });
                          }}
                        >
                          <PlusCircleOutlined className="catalog__button-icon" />
                          <span className="catalogbodymake__button-title">&nbsp;&nbsp;Add Configuration</span>
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  <section className="catalogbodymake__section-banner">
                    <div className="catalogbodymake__banner-div">
                      <img className="catalogbodymake__banner" src={hino_banner} alt="banner" />
                    </div>
                    <MakeDetailsComponent catalogMake={catalogMake} />
                  </section>

                  {/*  ================================================================ */}
                  {/*    ADMIN - if user is admin show everything, if not only show
                        those that the length is greater than 0 */}
                  {/*  ================================================================ */}
                  {bodyMakeWithWheelbase.length > 0 ? (
                    <>
                      {bodyMakeWithWheelbase.map((wheelbaseBodyMake) => (
                        <section key={uuidv4()} className="catalogbodymake__wheelbase-div">
                          {
                            /* ================================================================ */
                            // ADMIN - shows everything
                            /* ================================================================ */
                          }
                          {accessObj?.showAdminDashboard ? (
                            <WheelbaseBodyMakeGrid
                              makeObj={catalogMake}
                              seriesTitle={catalogMake.series}
                              wheelbaseBodyMake={wheelbaseBodyMake}
                            />
                          ) : (
                            <>
                              {
                                /* ================================================================ */
                                // NORMAL USER - only show the body makes that has length > 0
                                /* ================================================================ */
                              }
                              {wheelbaseBodyMake.body_makes.length > 0 && (
                                <WheelbaseBodyMakeGrid wheelbaseBodyMake={wheelbaseBodyMake} />
                              )}
                            </>
                          )}
                        </section>
                      ))}
                    </>
                  ) : (
                    <div className="catalogbodymake__empty-div">
                      <div>
                        <Empty
                          description={
                            <span>
                              No configurations available
                              <br />
                              Contact Jason for business inquiries
                            </span>
                          }
                        />
                      </div>
                    </div>
                  )}
                </section>
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
  dashboardLoading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
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
    dashboardLoading: state.dashboard.loading,
    errorMessage: state.dashboard.errorMessage,
    successMessage: state.dashboard.successMessage,
    localOrdersArray: state.sales.localOrdersArray,
    bodyMakeWithWheelbase: state.catalog.catalogBodyMakesArray,
    makeFromCatalogBodyMake: state.catalog.makeFromCatalogBodyMake,
    generalAccessoriesArray: state.sales.generalAccessoriesArray,
    bodyRelatedAccessoriesArray: state.sales.bodyRelatedAccessoriesArray,
    dimensionRelatedAccessoriesArray: state.sales.dimensionRelatedAccessoriesArray,
  };
};

interface DispatchProps {
  onGetBodies: typeof actions.getBodies;
  onGetLengths: typeof actions.getLengths;
  onUpdateMake: typeof actions.updateMake;
  onGetWheelbases: typeof actions.getWheelbases;
  onCreateBodyMake: typeof actions.createBodyMake;
  onUpdateBodyMake: typeof actions.updateBodyMake;
  onDeleteBodyMake: typeof actions.deleteBodyMake;
  onStoreLocalOrders: typeof actions.storeLocalOrders;
  onGetCatalogBodyMakes: typeof actions.getCatalogBodyMakes;
  onGetSalesAccessories: typeof actions.getSalesAccessories;
  onCreateMakeWheelbase: typeof actions.createMakeWheelbase;
  onDeleteMakeWheelbase: typeof actions.deleteMakeWheelbase;
  onClearDashboardState: typeof actions.clearDashboardState;
  onGetBodyAccessories: typeof actions.getBodyAccessories;
  onGetBodyMakeAccessories: typeof actions.getBodyMakeAccessories;
  onGetBodyAssociatedAccessories: typeof actions.getBodyAssociatedAccessories;
  onGetDimensionAssociatedAccessories: typeof actions.getDimensionAssociatedAccessories;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetBodies: () => dispatch(actions.getBodies()),
    onGetLengths: () => dispatch(actions.getLengths()),
    onGetWheelbases: () => dispatch(actions.getWheelbases()),
    onUpdateMake: (updateMakeData, imageTag, imageFiles) =>
      dispatch(actions.updateMake(updateMakeData, imageTag, imageFiles)),
    onCreateBodyMake: (createBodyMakeData, imageTag, imageFiles) =>
      dispatch(actions.createBodyMake(createBodyMakeData, imageTag, imageFiles)),
    onUpdateBodyMake: (updateBodyMakeData, imageTag, imageFiles) =>
      dispatch(actions.updateBodyMake(updateBodyMakeData, imageTag, imageFiles)),
    onDeleteMakeWheelbase: (make_id, make_wheelbase_id) =>
      dispatch(actions.deleteMakeWheelbase(make_id, make_wheelbase_id)),
    onGetBodyAccessories: (body_id) => dispatch(actions.getBodyAccessories(body_id)),
    onDeleteBodyMake: (body_make_id) => dispatch(actions.deleteBodyMake(body_make_id)),
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
    onGetCatalogBodyMakes: (make_id) => dispatch(actions.getCatalogBodyMakes(make_id)),
    onGetBodyAssociatedAccessories: () => dispatch(actions.getBodyAssociatedAccessories()),
    onGetDimensionAssociatedAccessories: () => dispatch(actions.getDimensionAssociatedAccessories()),
    onGetBodyMakeAccessories: (body_make_id) => dispatch(actions.getBodyMakeAccessories(body_make_id)),
    onGetSalesAccessories: (body_make_id) => dispatch(actions.getSalesAccessories(body_make_id)),
    onStoreLocalOrders: (localOrdersArray) => dispatch(actions.storeLocalOrders(localOrdersArray)),
    onCreateMakeWheelbase: (make_id, wheelbase_id) => dispatch(actions.createMakeWheelbase(make_id, wheelbase_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogBodyMake));

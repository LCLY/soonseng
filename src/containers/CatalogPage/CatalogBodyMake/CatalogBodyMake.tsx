import React, { useEffect, useState } from 'react';
import './CatalogBodyMake.scss';
/*Components*/
import Footer from 'src/components/Footer/Footer';
import CrudModal from 'src/components/Modal/Crud/CrudModal';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import CatalogFilter from 'src/containers/CatalogPage/CatalogFilter/CatalogFilter';
import CatalogAccessoriesModal from './CatalogAccessories/CatalogAccessoriesModal';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
import LightboxComponent from 'src/components/ImageRelated/LightboxComponent/LightboxComponent';
/*3rd party lib*/
import {
  Button,
  Empty,
  Modal,
  Tabs,
  Form,
  Checkbox,
  Divider,
  Skeleton,
  notification,
  Dropdown,
  Tooltip,
  Menu,
  Tag,
  message,
  Select,
  Input,
} from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { LeftCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
/* Util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import * as actions from 'src/store/actions/index';
import { TUserAccess } from 'src/store/types/auth';
import soonseng_placeholder_white from 'src/img/soonseng_logo_white.png';
import soonseng_placeholder_red from 'src/img/soonseng_logo_red.png';
import { handleKeyDown, onClearAllSelectedImages } from 'src/shared/Utils';
import { TReceivedCatalogBodyMake } from 'src/store/types/catalog';
import {
  TCreateBodyMakeData,
  TReceivedAccessoryObj,
  TReceivedBodyMakeObj,
  TReceivedChargesFeesObj,
  TReceivedImageObj,
  TReceivedMakeObj,
  TReceivedWheelbaseObj,
  TUpdateBodyMakeData,
  TUpdateMakeData,
} from 'src/store/types/dashboard';
import { UPLOAD_TO_BODY_MAKE } from 'src/shared/constants';
import { afterSalesStrings, standardAccessories } from 'src/containers/QuotationPage/QuotationPage';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj } from 'src/store/types/sales';
import { TUpdateMakeFinishValues } from 'src/containers/DashboardPage/DashboardCRUD/Make/Make';
import { checkInchExist, convertPriceToFloat, emptyStringWhenUndefinedOrNull, formatFeetInch } from 'src/shared/Utils';
import { TCreateBodyMakeForm, TUpdateBodyMakeForm } from 'src/containers/DashboardPage/DashboardCRUD/BodyMake/BodyMake';
import FullImageGalleryModal from 'src/components/ImageRelated/FullImageGalleryModal/FullImageGalleryModal';

const { TabPane } = Tabs;
const { Option } = Select;

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
  wheelbasesArray,
  localOrdersDict,
  chargesFeesArray,
  dashboardLoading,
  // localOrdersArray,
  makeFromCatalogBodyMake,
  generalAccessoriesArray,
  bodyMakeWithWheelbaseArray,
  bodyRelatedAccessoriesArray,
  dimensionRelatedAccessoriesArray,
  onUpdateMake,
  onGetBodies,
  onGetLengths,
  onGetWheelbases,
  onUpdateBodyMake,
  onDeleteBodyMake,
  onCreateBodyMake,
  // onStoreLocalOrders,
  onGetChargesFees,
  onDeleteUploadImage,
  onGetSalesAccessories,
  onCreateMakeWheelbase,
  onDeleteMakeWheelbase,
  onGetBodyAccessories,
  onUpdateMakeWheelbase,
  onClearDashboardState,
  onGetCatalogBodyMakes,
  onSetLocalOrdersDict,
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
  const [showAllEmpty, setShowAllEmpty] = useState(false);
  const [filteredWheelbasesArray, setFilteredWheelbasesArray] = useState<TReceivedWheelbaseObj[] | null>(null);

  // need to refer to both the pop up and also the dropdown button itself
  const [showSearch, setShowSearch] = useState(false);
  const [bodyMakeFilter, setBodyMakeFilter] = useState<string>('');
  const [activeConfigurationTab, setActiveConfigurationTab] = useState('wheelbase1');

  /* ======================== */
  /*   Image related states   */
  /* ======================== */
  // Upload states
  const [uploadSelectedFiles, setUploadSelectedFiles] = useState<FileList | null | undefined>(null);
  // state to store temporary images before user uploads
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showMenu, setShowMenu] = useState<{ [key: string]: boolean }>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImagesArray, setLightboxImagesArray] = useState<TReceivedImageObj[]>([]);
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState<string[]>([]); //this is for preview image purposes only
  const [fullImageGalleryVisible, setFullImageGalleryVisible] = useState(false);
  const [imageGalleryTargetModelId, setImageGalleryTargetModelId] = useState(-1);
  const [fullGalleryImagesPreviewUrls, setFullGalleryImagesPreviewUrls] = useState<{ url: string; name: string }[]>([]); //this is for preview image purposes only
  const [fullImageGalleryImagesArray, setFullImageGalleryImagesArray] = useState<TReceivedImageObj[] | null>(null);
  const [keepTrackBodyMake, setKeepTrackBodyMake] = useState<{
    body_make_id: number;
    make_wheelbase_id: number;
  } | null>(null);

  const [updateMakeForm] = Form.useForm();
  const [createBodyMakeForm] = Form.useForm();
  const [updateBodyMakeForm] = Form.useForm();
  const [createMakeWheelbaseForm] = Form.useForm();
  const [updateMakeWheelbaseForm] = Form.useForm();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  const [isExtended, setIsExtended] = useState(false); //isExtended === !original

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
    make_wheelbase: false,
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
    make_wheelbase: {
      makeWheelbaseId: -1,
      makeId: -1,
      text: { wheelbase: '', series: '', bodyMakesLength: '' },
      warningText: '',
      backupWarningText: 'this configuration',
    },
    body_make: { bodyMakeId: -1, warningText: '', backupWarningText: 'this configuration' },
  });

  const [orderObj, setOrderObj] = useState<TLocalOrderObj>({
    id: '',
    tireCount: -1,
    bodyObj: null,
    discount: null,
    lengthObj: null,
    bodyMakeObj: null,
    insuranceDict: null,
    chargesFeesDict: {},
    generalAccessoriesArray: {},
    bodyRelatedAccessoriesArray: {},
    dimensionRelatedAccessoriesArray: {},
    afterSalesStrings: afterSalesStrings,
    standardAccessories: standardAccessories,
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
        data:
          catalogMake.year === null ||
          catalogMake.year === '' ||
          (catalogMake.year && catalogMake.year.toLowerCase() === 'Invalid Date'.toLowerCase())
            ? '-'
            : `${catalogMake.year}`,
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
    let tempOrderObj = { ...orderObj };
    // push the accessories into each respective arrays
    if (currentCheckedGeneralAccessories) {
      for (let uniqueId in currentCheckedGeneralAccessories) {
        if (currentCheckedGeneralAccessories[uniqueId].checked === true) {
          tempOrderObj['generalAccessoriesArray'][currentCheckedGeneralAccessories[uniqueId].accessory.id] =
            currentCheckedGeneralAccessories[uniqueId].accessory;
        }
      }
    }
    if (currentCheckedBodyAccessories) {
      for (let uniqueId in currentCheckedBodyAccessories) {
        if (currentCheckedBodyAccessories[uniqueId].checked === true) {
          tempOrderObj['bodyRelatedAccessoriesArray'][currentCheckedBodyAccessories[uniqueId].accessory.id] =
            currentCheckedBodyAccessories[uniqueId].accessory;
        }
      }
    }
    if (currentCheckedDimensionAccessories) {
      for (let uniqueId in currentCheckedDimensionAccessories) {
        if (currentCheckedDimensionAccessories[uniqueId].checked === true) {
          tempOrderObj['dimensionRelatedAccessoriesArray'][currentCheckedDimensionAccessories[uniqueId].accessory.id] =
            currentCheckedDimensionAccessories[uniqueId].accessory;
        }
      }
    }

    let totalAccessoriesLength =
      Object.keys(tempOrderObj.generalAccessoriesArray).length +
      Object.keys(tempOrderObj.bodyRelatedAccessoriesArray).length +
      Object.keys(tempOrderObj.dimensionRelatedAccessoriesArray).length;

    /* ============================================================= */
    // creating the processing fees dict
    /* ============================================================= */

    let totalAccessoriesPrice = 0;
    const getTotalPrice = (accessoriesArray: any) => {
      return Object.values(accessoriesArray).reduce((currentTotal: number, accessoryObj: any) => {
        return currentTotal + accessoryObj.price;
      }, 0);
    };

    let generalAccessoriesTotalPrice = getTotalPrice(tempOrderObj.generalAccessoriesArray);
    let bodyRelatedAccessoriesTotalPrice = getTotalPrice(tempOrderObj.bodyRelatedAccessoriesArray);
    let dimensionRelatedAccessoriesTotalPrice = getTotalPrice(tempOrderObj.dimensionRelatedAccessoriesArray);

    totalAccessoriesPrice =
      generalAccessoriesTotalPrice + bodyRelatedAccessoriesTotalPrice + dimensionRelatedAccessoriesTotalPrice;

    let processingFees = Object.values(tempOrderObj.chargesFeesDict).reduce(
      (currentTotal: number, processingFeeObj: TReceivedChargesFeesObj) => {
        return currentTotal + processingFeeObj.price;
      },
      0,
    );

    let modelSubtotalPrice = 0;
    if (tempOrderObj.bodyMakeObj) {
      modelSubtotalPrice =
        tempOrderObj.bodyMakeObj.make_wheelbase.make.price +
        tempOrderObj.bodyMakeObj.price +
        totalAccessoriesPrice +
        processingFees;
    }

    let tempModelSubtotalPrice = modelSubtotalPrice;
    tempModelSubtotalPrice = (tempModelSubtotalPrice * 95) / 100;
    let roundedModelSubtotalPrice = -Math.round(-tempModelSubtotalPrice / 1000) * 1000;
    roundedModelSubtotalPrice = (roundedModelSubtotalPrice - 1000) * 0.0325 + 441.8;
    roundedModelSubtotalPrice = roundedModelSubtotalPrice * 1.06 + 235;

    if (chargesFeesArray === null || chargesFeesArray === undefined) return;

    let JPJEHakMilik = chargesFeesArray.filter((charges) => charges.title === 'JPJ Registration & E Hak Milik');

    let insuranceDict = {
      insurance_roadtax: {
        id: 'insurance_roadtax',
        title: 'Road tax (1year)',
        price: 1015,
      },
      insurance_jpj: {
        id: 'insurance_jpj',
        title: JPJEHakMilik[0].title,
        price: JPJEHakMilik[0].price,
      },
      insurance_premium: {
        id: 'insurance_premium',
        title: 'INSURANCE PREMIUM (windscreen included)',
        price: roundedModelSubtotalPrice,
      },
    };

    tempOrderObj['insuranceDict'] = insuranceDict;

    onSetLocalOrdersDict({ ...localOrdersDict, [orderObj.id]: tempOrderObj });

    // onStoreLocalOrders(copyArray);
    const { bodyMakeObj } = tempOrderObj;
    if (bodyMakeObj) {
      const { make_wheelbase } = bodyMakeObj;
      message.success(
        `${make_wheelbase.wheelbase.title}mm ${bodyMakeObj.length.title}ft ${make_wheelbase.make.brand.title} ${make_wheelbase.make.series} ${make_wheelbase.make.title} ${bodyMakeObj.body.title} with ${totalAccessoriesLength} accessories added to orders!`,
        1,
      );
    }
    setPickAccessoryModalOpen(false);
    // }
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
    onUpdateMake(updateMakeData);
  };
  /* --------------------- */
  // Make Wheelbase
  /* --------------------- */
  const onCreateMakeWheelbaseFinish = (values: {
    wheelbaseId: number;
    makeId: number;
    extensionPrice: string;
    extended: boolean;
  }) => {
    // since make wheelbase needs original, extended is the opposite of extended so we needa flip the boolean value
    onCreateMakeWheelbase(
      values.makeId,
      values.wheelbaseId,
      !values.extended,
      convertPriceToFloat(values.extensionPrice),
    );
  };
  const onUpdateMakeWheelbaseFinish = (values: {
    makeWheelbaseId: number;
    wheelbaseId: number;
    makeId: number;
    extensionPrice: string;
    extended: boolean;
  }) => {
    // since make wheelbase needs original, extended is the opposite of extended so we needa flip the boolean value
    onUpdateMakeWheelbase(
      values.makeWheelbaseId,
      values.makeId,
      values.wheelbaseId,
      !values.extended,
      convertPriceToFloat(values.extensionPrice),
    );
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
                  let price: number | null = null;

                  if (catalogMake.price === 0) {
                    price = null;
                  } else {
                    price = catalogMake.price;
                  }

                  updateMakeForm.setFieldsValue({
                    makeId: catalogMake.id,
                    gvw: catalogMake.gvw,
                    price: price,
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
    wheelbaseBodyMake,
  }: {
    seriesTitle?: string;
    makeObj?: TReceivedMakeObj;
    wheelbaseBodyMake: TReceivedCatalogBodyMake;
  }) => (
    <>
      {/* <div className="catalogbodymake__wheelbase-outerdiv">
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
      </div> */}
      <div className="catalogbodymake__view-outerdiv">
        {!wheelbaseBodyMake.make_wheelbase.original &&
          wheelbaseBodyMake.make_wheelbase.price !== undefined &&
          wheelbaseBodyMake.make_wheelbase.price !== null && (
            <div className="catalogbodymake__extended">
              <i className="fas fa-tags"></i>
              UBS (Wheelbase Extension):
              <div className="catalogbodymake__extended-price">
                RM
                <NumberFormat
                  value={wheelbaseBodyMake.make_wheelbase.price}
                  displayType={'text'}
                  thousandSeparator={true}
                />
              </div>
            </div>
          )}
        <div className="catalogbodymake__view-div">
          <div
            className={`catalogbodymake__view-icon ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <i className="fas fa-list-ul"></i> <span className="catalogbodymake__view-text">List View</span>
          </div>
          <div
            className={`catalogbodymake__view-icon ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <i className="fas fa-th"></i> <span className="catalogbodymake__view-text">Grid View</span>
          </div>
        </div>
      </div>
      <div className="catalogbodymake__innerdiv">
        {wheelbaseBodyMake.body_makes.length > 0 ? (
          <div className="catalogbodymake__grid">
            <>
              {wheelbaseBodyMake.body_makes
                .filter(
                  (body_make) =>
                    body_make.body.title.toLowerCase().includes(bodyMakeFilter.toLowerCase()) ||
                    body_make.price.toString().toLowerCase().includes(bodyMakeFilter.toLowerCase()) ||
                    body_make.make_wheelbase.wheelbase.title
                      .toString()
                      .toLowerCase()
                      .includes(bodyMakeFilter.toLowerCase()),
                )
                .map((bodyMake) => {
                  return (
                    <div key={uuidv4()} className="catalogbodymake__card-parent">
                      <div className="catalogbodymake__card" key={uuidv4()}>
                        {bodyMake.images.length > 0 ? (
                          <>
                            <img
                              className="catalogbodymake__card-image"
                              src={bodyMake.images[0].url}
                              alt={bodyMake.images[0].filename}
                            />
                            <div
                              className="catalogbodymake__card-image-blurbg"
                              style={{ backgroundImage: `url(${bodyMake.images[0].url})` }}
                            ></div>
                          </>
                        ) : (
                          <>
                            <div className="catalogbodymake__card-image--placeholder-div">
                              <img
                                className="catalogbodymake__card-image--placeholder"
                                alt="placeholder"
                                src={soonseng_placeholder_white}
                              />
                            </div>

                            {/*  <Skeleton.Image className="catalogbodymake__card-image--skeleton" /> */}
                          </>
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
                      </div>
                      <div className="catalogbodymake__card-label"> {bodyMake.body.title}</div>
                      {accessObj?.showAdminDashboard && (
                        <Tooltip title={`Edit / Delete ${bodyMake.body.title}`}>
                          <Dropdown
                            className="catalogbodymake__dropdown-more catalogbodymake__dropdown-more--make"
                            overlay={
                              <BodyMakeMenu
                                bodyMakeObj={bodyMake}
                                makeWheelbaseObj={wheelbaseBodyMake.make_wheelbase}
                              />
                            }
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
                            setLightboxImagesArray(bodyMake.images);
                          }}
                          className={`catalogbodymake__dropdown-more 
                        ${
                          bodyMake.images.length === 0 ? 'catalogbodymake__dropdown-more--disabled' : ''
                        }                       
                        ${
                          accessObj?.showAdminDashboard
                            ? 'catalogbodymake__dropdown-more--image'
                            : 'catalogbodymake__dropdown-more--make'
                        }                          
                          `}
                        >
                          <i className="fas fa-images"></i>
                        </div>
                      </Tooltip>
                    </div>
                  );
                })}
            </>

            {accessObj?.showAdminDashboard && (
              // <Tooltip title={`Add Body for ${wheelbaseBodyMake.make_wheelbase.wheelbase.title}mm configuration`}>
              <div
                className="catalogbodymake__button-body--grid"
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
                <div className="flex-align-center">
                  <PlusCircleOutlined className="catalogbodymake__button-body-icon" />
                  <span className="catalogbodymake__button-body-text">&nbsp;&nbsp;Add Body</span>
                </div>
              </div>
              // </Tooltip>
            )}
          </div>
        ) : (
          <>
            {accessObj?.showAdminDashboard ? (
              <>
                <div className="catalogbodymake__grid">
                  {accessObj?.showAdminDashboard && (
                    // <Tooltip title={`Add Body for ${wheelbaseBodyMake.make_wheelbase.wheelbase.title}mm configuration`}>
                    <div
                      className="catalogbodymake__button-body--grid"
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
                      <div className="flex-align-center">
                        <PlusCircleOutlined className="catalogbodymake__button-body-icon" />
                        <span className="catalogbodymake__button-body-text">&nbsp;&nbsp;Add Body</span>
                      </div>
                    </div>
                    // </Tooltip>
                  )}
                </div>
              </>
            ) : (
              <div className="catalogbodymake__empty-bodymake">
                <Empty />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );

  const MakeWheelbaseMenu = ({
    index,
    catalogMake,
    wheelbaseBodyMake,
  }: {
    index: number;
    catalogMake: TReceivedMakeObj;
    wheelbaseBodyMake: TReceivedCatalogBodyMake;
  }) => (
    <>
      <div className="catalog__menu-outerdiv">
        <Menu className="catalog__menu">
          <Menu.Item
            className="catalog__menu-item"
            onClick={() => {
              setShowMenu({ ...showMenu, [`makeWheelbase${index}`]: false });
              setShowUpdateModal({ ...showUpdateModal, make_wheelbase: true });
              setIsExtended(!wheelbaseBodyMake.make_wheelbase.original);
              updateMakeWheelbaseForm.setFieldsValue({
                wheelbaseId: wheelbaseBodyMake.make_wheelbase.wheelbase.id,
                extensionPrice: wheelbaseBodyMake.make_wheelbase.price,
                extended: !wheelbaseBodyMake.make_wheelbase.original,
                makeId: catalogMake.id,
                makeWheelbaseId: wheelbaseBodyMake.make_wheelbase.id,
              });
            }}
          >
            <i className="fas fa-edit" />
            &nbsp;&nbsp;Edit Configuration
          </Menu.Item>

          <Menu.Item
            danger
            className="catalog__menu-item--danger"
            onClick={() => {
              setShowMenu({ ...showMenu, [`makeWheelbase${index}`]: false });
              setDeleteModalContent({
                ...deleteModalContent,
                make_wheelbase: {
                  makeId: catalogMake.id,
                  makeWheelbaseId: wheelbaseBodyMake.make_wheelbase.id,
                  text: {
                    wheelbase: wheelbaseBodyMake.make_wheelbase.wheelbase.title,
                    series: catalogMake.series,
                    bodyMakesLength: wheelbaseBodyMake.body_makes.length.toString(),
                  },
                  warningText: `${wheelbaseBodyMake.make_wheelbase.wheelbase.title}mm from ${catalogMake.series} along with other ${wheelbaseBodyMake.body_makes.length} bodies`,
                  backupWarningText: `this configuration from ${catalogMake.series}`,
                },
              });
              setShowDeleteModal({ ...showDeleteModal, make_wheelbase: true });
            }}
          >
            <i className="fas fa-trash-alt" />
            &nbsp;&nbsp;Delete Configuration
          </Menu.Item>
        </Menu>
      </div>
    </>
  );

  const BodyMakeMenu = ({
    bodyMakeObj,
    makeWheelbaseObj,
  }: {
    bodyMakeObj: TReceivedBodyMakeObj;
    makeWheelbaseObj: { id: number; wheelbase: TReceivedWheelbaseObj };
  }) => (
    <div className="catalog__menu-outerdiv">
      <Menu className="catalog__menu">
        <Menu.Item
          onClick={() => {
            setFullImageGalleryVisible(true);
            setFullImageGalleryImagesArray(bodyMakeObj.images);
            setKeepTrackBodyMake({
              ...keepTrackBodyMake,
              body_make_id: bodyMakeObj.id,
              make_wheelbase_id: makeWheelbaseObj.id,
            });
            setImageGalleryTargetModelId(bodyMakeObj.id);
          }}
        >
          <i className="fas fa-images"></i>&nbsp;&nbsp;Edit Images
        </Menu.Item>
        <Menu.Item
          className="catalog__menu-item"
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
          className="catalog__menu-item"
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
          className="catalog__menu-item--danger"
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
    </div>
  );

  /* Make Wheelbase Form Items */
  let makeWheelbaseFormItems = (
    <>
      {isExtended && (
        <Form.Item
          className="make__form-item"
          label="Price"
          name="extensionPrice"
          rules={[{ required: true, message: 'Input price here!' }]}
        >
          <NumberFormat className="ant-input" placeholder="Type price here" thousandSeparator={true} prefix={'RM '} />
        </Form.Item>
      )}
      <Form.Item initialValue={false} valuePropName="checked" className="make__form-item" name="extended">
        <Checkbox onChange={(e) => setIsExtended(e.target.checked)}>Extended</Checkbox>
      </Form.Item>
      <Form.Item hidden name="makeId" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </>
  );

  let createMakeWheelbaseModal = (
    <Modal
      title={
        <>
          Create Configuration
          <>
            &nbsp;for
            <span className="make__modal-title--card">{` ${modalContent.make_wheelbase.seriesTitle}`}</span>
          </>
        </>
      }
      centered
      visible={showCreateModal.make_wheelbase}
      onOk={createMakeWheelbaseForm.submit}
      confirmLoading={dashboardLoading !== undefined && dashboardLoading}
      onCancel={() => {
        setIsExtended(false);
        setShowCreateModal({ ...showCreateModal, make_wheelbase: false });
        createMakeWheelbaseForm.resetFields();
      }}
    >
      <Form
        form={createMakeWheelbaseForm}
        onKeyDown={(e) => handleKeyDown(e, createMakeWheelbaseForm)}
        onFinish={onCreateMakeWheelbaseFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Wheelbase"
          name="wheelbaseId"
          rules={[{ required: true, message: 'Select wheelbase!' }]}
        >
          <Select
            showSearch
            placeholder="Select a wheelbase"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option !== undefined && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {filteredWheelbasesArray &&
              filteredWheelbasesArray.map((wheelbase) => {
                return (
                  <Option
                    style={{ textTransform: 'capitalize' }}
                    key={uuidv4()}
                    label={wheelbase.title}
                    value={wheelbase.id}
                  >
                    {wheelbase.title + 'mm'}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        {makeWheelbaseFormItems}
      </Form>
    </Modal>
  );
  let updateMakeWheelbaseModal = (
    <Modal
      title={
        <>
          Update Configuration
          <>
            &nbsp;for
            <span className="make__modal-title--card">{` ${modalContent.make_wheelbase.seriesTitle}`}</span>
          </>
        </>
      }
      centered
      visible={showUpdateModal.make_wheelbase}
      onOk={updateMakeWheelbaseForm.submit}
      confirmLoading={dashboardLoading !== undefined && dashboardLoading}
      onCancel={() => {
        setIsExtended(false);
        setShowUpdateModal({ ...showUpdateModal, make_wheelbase: false });
        // updateMakeWheelbaseForm.resetFields();
      }}
    >
      <Form
        form={updateMakeWheelbaseForm}
        onKeyDown={(e) => handleKeyDown(e, updateMakeWheelbaseForm)}
        onFinish={onUpdateMakeWheelbaseFinish}
      >
        <Form.Item
          className="make__form-item"
          hidden
          name="wheelbaseId"
          rules={[{ required: true, message: 'Provide a wheelbase!' }]}
        >
          <Input />
        </Form.Item>
        {makeWheelbaseFormItems}
        <Form.Item hidden name="makeWheelbaseId" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
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
    onGetChargesFees();
  }, [onGetChargesFees]);

  useEffect(() => {
    onGetBodies();
  }, [onGetBodies]);

  useEffect(() => {
    onGetLengths();
  }, [onGetLengths]);

  useEffect(() => {
    if (chargesFeesArray) {
      let tempChargesFeesDict = {};
      let filteredArray = chargesFeesArray.filter((charges) => charges.title !== 'JPJ Registration & E Hak Milik');
      // get rid of JPJ Registration for charges Fees dict
      filteredArray.forEach((fee) => ((tempChargesFeesDict as any)[fee.id] = fee));
      setOrderObj((prevState) => {
        return { ...prevState, chargesFeesDict: tempChargesFeesDict };
      });
    }
  }, [chargesFeesArray]);

  useEffect(() => {
    if (bodyMakeWithWheelbaseArray && bodyMakeWithWheelbaseArray !== undefined && keepTrackBodyMake) {
      //  first filter using make wheelbase id
      let filteredBodyMakesArray = bodyMakeWithWheelbaseArray.filter(
        (child) => child.make_wheelbase.id === keepTrackBodyMake.make_wheelbase_id,
      );

      if (filteredBodyMakesArray.length > 0) {
        let filteredBodyMake = filteredBodyMakesArray[0].body_makes.filter(
          (bodyMakeChild) => bodyMakeChild.id === keepTrackBodyMake.body_make_id,
        );
        if (filteredBodyMake.length > 0) {
          setFullImageGalleryImagesArray(filteredBodyMake[0].images);
        }
      }
    }
  }, [bodyMakeWithWheelbaseArray, keepTrackBodyMake]);

  useEffect(() => {
    if (bodyMakeWithWheelbaseArray) {
      // use this to loop through every body makes array and determine if all of them are empty
      // if they are all empty, then show no data on normal user screen
      let result = bodyMakeWithWheelbaseArray.reduce((total, currValue) => {
        return total + currValue.body_makes.length;
      }, 0);

      if (result === 0) {
        setShowAllEmpty(true);
      } else {
        setShowAllEmpty(false);
      }
    }
  }, [bodyMakeWithWheelbaseArray]);

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

  useEffect(() => {
    if (
      wheelbasesArray === null ||
      wheelbasesArray === undefined ||
      bodyMakeWithWheelbaseArray === null ||
      bodyMakeWithWheelbaseArray === undefined
    )
      return;

    let newFilteredArray = wheelbasesArray.filter((mainArrayChild) =>
      bodyMakeWithWheelbaseArray.every(
        (filterArrayChild) => filterArrayChild.make_wheelbase.wheelbase.id !== mainArrayChild.id,
      ),
    );

    setFilteredWheelbasesArray(newFilteredArray);
  }, [wheelbasesArray, bodyMakeWithWheelbaseArray]);

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

      if (successMessage === 'Make Wheelbase deleted') {
        setActiveConfigurationTab('wheelbase1');
      }
      setIsExtended(false);

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
      {/* Make Wheelbase */}
      {createMakeWheelbaseModal}
      {updateMakeWheelbaseModal}
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
        crud={'delete'}
        indexKey={'make_wheelbase'}
        category={'make_wheelbase'}
        modalTitle={`Delete Configuration`}
        showModal={showDeleteModal}
        visible={showDeleteModal.make_wheelbase}
        onDelete={onDeleteMakeWheelbaseFinish}
        setShowModal={setShowDeleteModal}
        customDeleteTextComponent={
          <>
            You are deleting&nbsp;
            <>
              <span className="dashboard__delete-message">
                {deleteModalContent.make_wheelbase.text.wheelbase}mm wheelbase configuration
              </span>
              &nbsp;from&nbsp;
              <span className="dashboard__delete-message">{deleteModalContent.make_wheelbase.text.series}</span>
              &nbsp;along with other&nbsp;
              <span className="dashboard__delete-message">
                {deleteModalContent.make_wheelbase.text.bodyMakesLength}&nbsp;bodies
              </span>
              , this action is permanent. Are you sure?
            </>
          </>
        }
        customDeleteButtonText={'Yes, delete it'}
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

      <FullImageGalleryModal
        indexKey={'body_make'}
        modelName={UPLOAD_TO_BODY_MAKE}
        modelId={imageGalleryTargetModelId}
        uploadSelectedFiles={uploadSelectedFiles}
        setUploadSelectedFiles={setUploadSelectedFiles}
        imagesPreviewUrls={fullGalleryImagesPreviewUrls}
        setImagesPreviewUrls={setFullGalleryImagesPreviewUrls}
        visible={fullImageGalleryVisible}
        setVisible={setFullImageGalleryVisible}
        loading={dashboardLoading !== undefined && dashboardLoading}
        imagesArray={fullImageGalleryImagesArray}
        onDeleteUploadImage={onDeleteUploadImage}
        onClearAllSelectedImages={onClearAllSelectedImages}
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
                    <div className="catalogbodymake__modal-checkboxes-outerdiv">
                      <div className="catalogbodymake__modal-checkboxes">
                        {Object.keys(currentCheckedGeneralAccessories).map((uniqueId) => {
                          // map out unique id to keep track of which accessories is this
                          return (
                            <div key={uuidv4()} className="catalogbodymake__modal-checkboxes-row">
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
                                <div className="catalogbodymake__modal-checkboxes-titlepricediv">
                                  <Tooltip
                                    title={`${currentCheckedGeneralAccessories[uniqueId].accessory.title}${
                                      currentCheckedGeneralAccessories[uniqueId].accessory.description &&
                                      currentCheckedGeneralAccessories[uniqueId].accessory.description !== ''
                                        ? ` (${currentCheckedGeneralAccessories[uniqueId].accessory.description})`
                                        : ''
                                    }`}
                                  >
                                    <div className="catalogbodymake__modal-checkboxes-title">
                                      {currentCheckedGeneralAccessories[uniqueId].accessory.title}
                                    </div>
                                  </Tooltip>

                                  <div>
                                    {currentCheckedGeneralAccessories[uniqueId].accessory.price !== 0 &&
                                    currentCheckedGeneralAccessories[uniqueId].accessory.price !== null ? (
                                      <Tag color="volcano" className="margin_l-1">
                                        RM&nbsp;{currentCheckedGeneralAccessories[uniqueId].accessory.price}
                                      </Tag>
                                    ) : (
                                      <Tag color="red" className="margin_l-1">
                                        -----
                                      </Tag>
                                    )}
                                  </div>
                                </div>
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
                    <div className="catalogbodymake__modal-checkboxes-outerdiv">
                      <div className="catalogbodymake__modal-checkboxes">
                        {Object.keys(currentCheckedBodyAccessories).map((uniqueId) => {
                          // map out unique id to keep track of which accessories is this
                          return (
                            <div key={uuidv4()} className="catalogbodymake__modal-checkboxes-row">
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
                                <div className="catalogbodymake__modal-checkboxes-titlepricediv">
                                  <Tooltip
                                    title={`${currentCheckedBodyAccessories[uniqueId].accessory.title}${
                                      currentCheckedBodyAccessories[uniqueId].accessory.description &&
                                      currentCheckedBodyAccessories[uniqueId].accessory.description !== ''
                                        ? ` (${currentCheckedBodyAccessories[uniqueId].accessory.description})`
                                        : ''
                                    }`}
                                  >
                                    <div className="catalogbodymake__modal-checkboxes-title">
                                      {currentCheckedBodyAccessories[uniqueId].accessory.title}
                                    </div>
                                  </Tooltip>

                                  <div>
                                    {currentCheckedBodyAccessories[uniqueId].accessory.price !== 0 &&
                                    currentCheckedBodyAccessories[uniqueId].accessory.price !== null ? (
                                      <Tag color="volcano" className="margin_l-1">
                                        RM&nbsp;{currentCheckedBodyAccessories[uniqueId].accessory.price}
                                      </Tag>
                                    ) : (
                                      <Tag color="red" className="margin_l-1">
                                        -----
                                      </Tag>
                                    )}
                                  </div>
                                </div>
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
                    <div className="catalogbodymake__modal-checkboxes-outerdiv">
                      <div className="catalogbodymake__modal-checkboxes">
                        {Object.keys(currentCheckedDimensionAccessories).map((uniqueId) => {
                          // map out unique id to keep track of which accessories is this
                          return (
                            <div key={uuidv4()} className="catalogbodymake__modal-checkboxes-row">
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
                                <div className="catalogbodymake__modal-checkboxes-titlepricediv">
                                  <Tooltip
                                    title={`${currentCheckedDimensionAccessories[uniqueId].accessory.accessory.title}${
                                      currentCheckedDimensionAccessories[uniqueId].accessory.accessory.description &&
                                      currentCheckedDimensionAccessories[uniqueId].accessory.accessory.description !==
                                        ''
                                        ? ` (${currentCheckedDimensionAccessories[uniqueId].accessory.accessory.description})`
                                        : ''
                                    }`}
                                  >
                                    <div className="catalogbodymake__modal-checkboxes-title">
                                      {currentCheckedDimensionAccessories[uniqueId].accessory.accessory.title}
                                    </div>
                                  </Tooltip>
                                  <div>
                                    {currentCheckedDimensionAccessories[uniqueId].accessory.accessory.price !== 0 &&
                                    currentCheckedDimensionAccessories[uniqueId].accessory.accessory.price !== null ? (
                                      <Tag color="volcano" className="margin_l-1">
                                        RM&nbsp;{currentCheckedDimensionAccessories[uniqueId].accessory.accessory.price}
                                      </Tag>
                                    ) : (
                                      <Tag color="red" className="margin_l-1">
                                        -----
                                      </Tag>
                                    )}
                                  </div>
                                </div>
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
      <NavbarComponent activePage="catalog" defaultOpenKeys="product" />

      <ParallaxContainer bgImageUrl={holy5truck} overlayColor="rgba(0, 0, 0, 0.3)">
        <CustomContainer>
          <div className="catalogbodymake__outerdiv">
            {makeFromCatalogBodyMake && (
              <>
                <CatalogFilter
                  showSearch={showSearch}
                  setShowSearch={setShowSearch}
                  filterString={bodyMakeFilter}
                  setFilterString={setBodyMakeFilter}
                />
              </>
            )}
            <div className="catalogbodymake__div">
              {bodyMakeWithWheelbaseArray && catalogMake ? (
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

                      {/* {accessObj?.showAdminDashboard && (
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
                      )} */}
                    </div>
                    <section className="catalogbodymake__section-banner">
                      <div className="catalogbodymake__banner-div">
                        <div className="catalogbodymake__banner-bgcover bg-cover"></div>
                        {/* @TODO - change to using series image */}
                        {catalogMake.images.length > 0 ? (
                          <img
                            className="catalogbodymake__banner"
                            src={catalogMake.images[0].url}
                            alt={catalogMake.images[0].filename}
                          />
                        ) : (
                          <div className="catalogbodymake__banner-innerdiv">
                            <img
                              className="catalogbodymake__banner catalogbodymake__banner--placeholder"
                              src={soonseng_placeholder_red}
                              alt="placeholder_red"
                            />
                          </div>
                        )}
                      </div>
                      <MakeDetailsComponent catalogMake={catalogMake} />
                    </section>

                    {/*  ================================================================ */}
                    {/*    ADMIN - if user is admin show everything, if not only show
                        those that the length is greater than 0 */}
                    {/*  ================================================================ */}
                    {bodyMakeWithWheelbaseArray.length > 0 ? (
                      <>
                        {accessObj?.showAdminDashboard ? (
                          <Tabs
                            animated={{ tabPane: true }}
                            className="catalogbodymake__tabs-outerdiv"
                            activeKey={activeConfigurationTab}
                            onTabClick={(activeKey: string) => setActiveConfigurationTab(activeKey)}
                            tabPosition={'top'}
                            tabBarExtraContent={{
                              right: (
                                <>
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
                                        <span className="catalogbodymake__button-title">
                                          &nbsp;&nbsp;Add Configuration
                                        </span>
                                      </div>
                                    </Tooltip>
                                  )}
                                </>
                              ),
                            }}
                          >
                            {bodyMakeWithWheelbaseArray.map((wheelbaseBodyMake: TReceivedCatalogBodyMake, index) => (
                              <TabPane
                                tab={
                                  <div className="catalog__tabs-title">
                                    <span style={{ display: 'inline-block' }}>
                                      {wheelbaseBodyMake.make_wheelbase.wheelbase.title}mm
                                      {wheelbaseBodyMake.make_wheelbase.original === true ? '' : ' (Extended)'}
                                    </span>
                                    <>
                                      {accessObj?.showAdminDashboard && (
                                        <div style={{ marginLeft: '0rem' }}>
                                          <Tooltip
                                            title={`Edit / Delete ${wheelbaseBodyMake.make_wheelbase.wheelbase.title}mm`}
                                          >
                                            <Dropdown
                                              visible={showMenu[`makeWheelbase${index}`]}
                                              onVisibleChange={(e) =>
                                                setShowMenu({ ...showMenu, [`makeWheelbase${index}`]: e })
                                              }
                                              className="catalogbodymake__dropdown-more "
                                              overlay={
                                                <MakeWheelbaseMenu
                                                  index={index}
                                                  catalogMake={catalogMake}
                                                  wheelbaseBodyMake={wheelbaseBodyMake}
                                                />
                                              }
                                              trigger={['click']}
                                            >
                                              <i className="fas fa-ellipsis-h"></i>
                                            </Dropdown>
                                          </Tooltip>
                                        </div>
                                      )}
                                    </>
                                  </div>
                                }
                                key={`wheelbase${index + 1}`}
                              >
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
                              </TabPane>
                            ))}
                          </Tabs>
                        ) : (
                          <>
                            {showAllEmpty ? (
                              <div className="catalogbodymake__empty-div">
                                <Empty
                                  description={
                                    <span>
                                      No configurations available
                                      <br />
                                      Contact Jason for business inquiries
                                    </span>
                                  }
                                >
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
                                        <span className="catalogbodymake__button-title">
                                          &nbsp;&nbsp;Add Configuration
                                        </span>
                                      </div>
                                    </Tooltip>
                                  )}
                                </Empty>
                              </div>
                            ) : (
                              <Tabs
                                animated={{ tabPane: true }}
                                className="catalogbodymake__tabs-outerdiv"
                                activeKey={activeConfigurationTab}
                                onTabClick={(activeKey: string) => setActiveConfigurationTab(activeKey)}
                                tabPosition={'top'}
                              >
                                {bodyMakeWithWheelbaseArray.map((wheelbaseBodyMake, index) => (
                                  <React.Fragment key={uuidv4()}>
                                    {wheelbaseBodyMake.body_makes.length > 0 && (
                                      <TabPane
                                        tab={
                                          <div className="catalog__tabs-title">
                                            <span>
                                              {wheelbaseBodyMake.make_wheelbase.wheelbase.title}mm
                                              {wheelbaseBodyMake.make_wheelbase.original === true ? '' : ' (Extended)'}
                                            </span>
                                          </div>
                                        }
                                        key={`wheelbase${index + 1}`}
                                      >
                                        <section className="catalogbodymake__wheelbase-div">
                                          <section>
                                            {
                                              /* ================================================================ */
                                              // NORMAL USER - only show the body makes that has length > 0
                                              /* ================================================================ */
                                            }
                                            <WheelbaseBodyMakeGrid wheelbaseBodyMake={wheelbaseBodyMake} />
                                          </section>
                                        </section>
                                      </TabPane>
                                    )}
                                  </React.Fragment>
                                ))}
                              </Tabs>
                            )}
                          </>
                        )}
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
                          >
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
                          </Empty>
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
        </CustomContainer>
      </ParallaxContainer>
      <Footer />

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
};

interface StateProps {
  accessObj?: TUserAccess;
  dashboardLoading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  localOrdersDict?: { [key: string]: TLocalOrderObj };
  makeFromCatalogBodyMake?: TReceivedMakeObj | null;
  wheelbasesArray?: TReceivedWheelbaseObj[] | null;
  chargesFeesArray?: TReceivedChargesFeesObj[] | null;
  bodyMakeWithWheelbaseArray?: TReceivedCatalogBodyMake[] | null;
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
    localOrdersDict: state.sales.localOrdersDict,
    wheelbasesArray: state.dashboard.wheelbasesArray,
    chargesFeesArray: state.dashboard.chargesFeesArray,
    bodyMakeWithWheelbaseArray: state.catalog.catalogBodyMakesArray,
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
  onGetChargesFees: typeof actions.getChargesFees;
  onDeleteUploadImage: typeof actions.deleteUploadImage;
  onSetLocalOrdersDict: typeof actions.setLocalOrdersDict;
  onGetCatalogBodyMakes: typeof actions.getCatalogBodyMakes;
  onGetSalesAccessories: typeof actions.getSalesAccessories;
  onCreateMakeWheelbase: typeof actions.createMakeWheelbase;
  onUpdateMakeWheelbase: typeof actions.updateMakeWheelbase;
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
    onGetChargesFees: () => dispatch(actions.getChargesFees()),
    onDeleteUploadImage: (ids) => dispatch(actions.deleteUploadImage(ids)),
    onUpdateMake: (updateMakeData) => dispatch(actions.updateMake(updateMakeData)),
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
    onSetLocalOrdersDict: (localOrdersDict) => dispatch(actions.setLocalOrdersDict(localOrdersDict)),
    onCreateMakeWheelbase: (make_id, wheelbase_id, original, extension_price) =>
      dispatch(actions.createMakeWheelbase(make_id, wheelbase_id, original, extension_price)),
    onUpdateMakeWheelbase: (make_wheelbase_id, make_id, wheelbase_id, original, extension_price) =>
      dispatch(actions.updateMakeWheelbase(make_wheelbase_id, make_id, wheelbase_id, original, extension_price)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatalogBodyMake));

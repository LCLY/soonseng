import React, { ReactText, useEffect, useState } from 'react';
import './Make.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
import CrudModal from 'src/components/Modal/Crud/CrudModal';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
import TableImageViewer from 'src/components/ImageRelated/TableImageViewer/TableImageViewer';
import PreviewUploadImage from 'src/components/ImageRelated/PreviewUploadImage/PreviewUploadImage';

/*3rd party lib*/
import {
  Table,
  Form,
  Input,
  Layout,
  Button,
  Modal,
  Tooltip,
  notification,
  Select,
  DatePicker,
  Card,
  Skeleton,
} from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import NumberFormat from 'react-number-format';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { PlusCircleTwoTone, ExclamationCircleOutlined, MinusCircleTwoTone } from '@ant-design/icons';
/* Util */
import {
  TReceivedMakeObj,
  TCreateMakeData,
  TUpdateMakeData,
  TReceivedBrandObj,
  TReceivedImageObj,
  TReceivedWheelbaseObj,
  TReceivedSeriesObj,
  TReceivedMakeWheelbaseObj,
} from 'src/store/types/dashboard';
import {
  setFilterReference,
  convertHeader,
  getColumnSearchProps,
  convertPriceToFloat,
  onClearAllSelectedImages,
  emptyStringWhenUndefinedOrNull,
} from 'src/shared/Utils';

import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import * as actions from 'src/store/actions/index';
import { TGalleryImageArrayObj } from 'src/components/ImageRelated/ImageGallery/ImageGallery';

const { Option } = Select;
const { TextArea } = Input;

interface MakeProps {}

// State for the table column definition
type TBrandTableState = {
  key?: string;
  brandId: number;
  brandTitle: string;
  brandDescription: string;
  available?: boolean;
  brandImages: TReceivedImageObj[];
};
// State for the table column definition
type TWheelbaseTableState = {
  key?: string;
  wheelbaseId: number;
  wheelbaseTitle: string;
  wheelbaseDescription: string;
  available?: boolean;
};
// State for the table column definition
type TMakeTableState = {
  key: string;
  makeId: number;
  gvw: string;
  year: string;
  makeTitle: string;
  price: string;
  available: boolean;
  engine_cap: string;
  horsepower: string;
  transmission: string;
  makeBrandId: number;
  makeBrandTitle: string;
  // makeWheelbaseId: number;
  // makeWheelbaseTitle: string;
  makeAbs: string;
  makeTorque: string;
  makeTire: string;
  makeConfig: string;
  makeSeries: string;
  makeEmission: string;
  /** a long combined string for filter usage */
  makeDetails: string;
  makeImages: TReceivedImageObj[];
};

type TDeleteModalContent = {
  make_wheelbase: { make_wheelbase_id: number; make_wheelbase_title: string; make_title: string };
  brand: { brand_id: number; brand_title: string };
  wheelbase: { wheelbase_id: number; wheelbase_title: string };
  make: { make_id: number; make_title: string };
};

// Type for values from onCreateMakeFinish / onUpdateMakeFinish thats from the form
export type TCreateMakeFinishValues = {
  makeBrandId: number;
  makeSeriesId: number;
  title: string;
  makeTire: string;
  horsepower: string;
  year: string;
  transmission: string;
  engine_cap: string;
  gvw: string;
  abs: string;
  torque: string;
  config: string;
  emission: string;
  price: string;
  imageTag: string;
};
export type TUpdateMakeFinishValues = {
  makeId: number;
  makeBrandId: number;
  makeSeriesId: number;
  title: string;
  makeTire: string;
  horsepower: string;
  year: string;
  transmission: string;
  engine_cap: string;
  gvw: string;
  abs: string;
  torque: string;
  config: string;
  emission: string;
  price: string;
  imageTag: string;
};

type Props = MakeProps & StateProps & DispatchProps;

const Make: React.FC<Props> = ({
  // Miscellaneous
  loading,
  errorMessage,
  successMessage,
  onClearDashboardState,
  // brand
  brandsArray,
  onGetBrands,
  onCreateBrand,
  onUpdateBrand,
  onDeleteBrand,
  // wheelbase
  wheelbasesArray,
  onGetWheelbases,
  onCreateWheelbase,
  onUpdateWheelbase,
  onDeleteWheelbase,
  // make
  makesArray,
  onGetMakes,
  onCreateMake,
  onUpdateMake,
  onDeleteMake,
  // series
  seriesArray,
  onGetSeries,
  onCreateSeries,
  onUpdateSeries,
  // make wheelbase
  makeWheelbasesArray,
  onGetMakeWheelbases,
  onCreateMakeWheelbase,
  onUpdateMakeWheelbase,
  onDeleteMakeWheelbase,
  // image
  imagesUploaded,
  // delete uploaded image
  onDeleteUploadImage,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // ref for forms
  const [createBrandForm] = Form.useForm();
  const [updateBrandForm] = Form.useForm();
  const [createWheelbaseForm] = Form.useForm();
  const [updateWheelbaseForm] = Form.useForm();
  const [createMakeForm] = Form.useForm();
  const [updateMakeForm] = Form.useForm();
  const [createSeriesForm] = Form.useForm();
  const [updateSeriesForm] = Form.useForm();
  const [createMakeWheelbaseForm] = Form.useForm();
  const [updateMakeWheelbaseForm] = Form.useForm();

  // Table states
  const [makeTableState, setMakeTableState] = useState<TMakeTableState[]>([]);
  const [brandTableState, setBrandTableState] = useState<TBrandTableState[]>([]);
  const [wheelbaseTableState, setWheelbaseTableState] = useState<TWheelbaseTableState[]>([]);

  let brandSearchInput = null; //this is for filter on antd table
  let wheelbaseSearchInput = null;
  let makeSearchInput = null;

  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });

  setFilterReference(filterData, setFilterData);

  // Modal states
  const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({
    brand: false,
    wheelbase: false,
    make: false,
    series: false,
    make_wheelbase: false,
  });
  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({
    brand: false,
    wheelbase: false,
    make: false,
    series: false,
    make_wheelbase: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({
    brand: false,
    wheelbase: false,
    make: false,
    series: false,
    make_wheelbase: false,
  });

  // state to track which brand we are using
  const [selectedBrand, setSelectedBrand] = useState<{ brandId: number; brandTitle: string } | null>(null);
  const [selectedMake, setSelectedMake] = useState<{
    makeId: number;
    makeTitle: string;
    makeBrandTitle: string;
  } | null>(null);

  // this state to keep track of what to show on delete modal and what useful info to pass
  const [deleteModalContent, setDeleteModalContent] = useState<TDeleteModalContent>({
    make_wheelbase: { make_title: '', make_wheelbase_id: -1, make_wheelbase_title: '' },
    brand: { brand_title: '', brand_id: -1 },
    wheelbase: { wheelbase_id: -1, wheelbase_title: '' },
    make: { make_title: '', make_id: -1 },
  });

  /* ======================== */
  /*   Image related states   */
  /* ======================== */
  // Upload states
  const [uploadSelectedFiles, setUploadSelectedFiles] = useState<FileList | null | undefined>(null);
  // state to store temporary images before user uploads
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState<string[]>([]); //this is for preview image purposes only

  // edit image gallery

  /**
   * This state will be storing makeId as the key
   * The boolean is to determine whether to show each individual image gallery
   * e.g. make1: false
   */
  const [showEditImageGallery, setShowEditImageGallery] = useState<{ [key: string]: boolean }>({});
  // To handle one row only expand at a time
  const [expandedRowKeys, setExpandedRowKeys] = useState<ReactText[]>([]);
  // this is to determine if all of the images are selected
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  // For populating image gallery images
  const [galleryImages, setGalleryImages] = useState<TGalleryImageArrayObj[]>([]);

  // store table header definition in state
  /**
   * containing objects of arrays
   * brand[], wheelbases[], make[]
   **/

  /* Brand column initialization */
  const [brandColumns, setBrandColumns] = useState([
    {
      key: 'brandTitle',
      title: 'Title',
      dataIndex: 'brandTitle',
      className: 'body__table-header--title',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TBrandTableState, b: TBrandTableState) => a.brandTitle.localeCompare(b.brandTitle),
      ...getColumnSearchProps(brandSearchInput, 'brandTitle', 'Title'),
    },
    // {
    //   key: 'brandDescription',
    //   title: 'Description',
    //   dataIndex: 'brandDescription',
    //   ellipsis: true,
    //   width: 'auto',
    //   sorter: (a: TBrandTableState, b: TBrandTableState) => a.brandDescription.localeCompare(b.brandDescription),

    //   ...getColumnSearchProps(brandSearchInput, 'brandDescription', 'Description'),
    // },
    {
      key: 'brandAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBrandTableState) => {
        return (
          <>
            <div className="dashboard__btn-div">
              <Button
                type="link"
                title="Edit Brand"
                className="make__brand-btn--edit"
                onClick={() => {
                  onPopulateUpdateBrandModal(record);

                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, brand: true });
                }}
              >
                <i className="far fa-edit"></i>
              </Button>
              <Button
                type="link"
                className="make__brand-btn--edit"
                onClick={() => {
                  alert('disable - supposed to set available to false');
                }}
              >
                <i className="fas fa-eye-slash"></i>
              </Button>
              <Button
                type="link"
                title="Delete Brand"
                danger
                onClick={() => {
                  // delete modal
                  setShowDeleteModal({ ...showDeleteModal, brand: true });
                  setDeleteModalContent({
                    ...deleteModalContent,
                    brand: { brand_id: record.brandId, brand_title: record.brandTitle },
                  });
                }}
              >
                <i className="far fa-trash-alt"></i>
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                type="default"
                onClick={() => {
                  setSelectedBrand({ ...selectedBrand, brandId: record.brandId, brandTitle: record.brandTitle });
                  setShowCreateModal({ ...showCreateModal, series: true });
                  createSeriesForm.setFieldsValue({
                    brandId: record.brandId,
                  });
                }}
              >
                Create Series
              </Button>
            </div>
          </>
        );
      },
    },
  ]);

  /* Wheelbase column initialization */
  const [wheelbaseColumn, setWheelbaseColumn] = useState([
    {
      key: 'wheelbaseTitle',
      title: 'Title',
      dataIndex: 'wheelbaseTitle',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TWheelbaseTableState, b: TWheelbaseTableState) => a.wheelbaseTitle.localeCompare(b.wheelbaseTitle),
      ...getColumnSearchProps(wheelbaseSearchInput, 'wheelbaseTitle', 'Title'),
    },
    // {
    //   key: 'wheelbaseDescription',
    //   title: 'Description',
    //   dataIndex: 'wheelbaseDescription',
    //   ellipsis: true,
    //   width: 'auto',
    //   sorter: (a: TWheelbaseTableState, b: TWheelbaseTableState) =>
    //     a.wheelbaseDescription.localeCompare(b.wheelbaseDescription),
    //   ...getColumnSearchProps(wheelbaseSearchInput, 'wheelbaseDescription', 'Description'),
    // },
    {
      key: 'wheelbaseAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TWheelbaseTableState) => {
        return (
          <>
            <div className="dashboard__btn-div">
              <Button
                className="make__brand-btn--edit"
                type="link"
                title="Edit Wheelbase"
                onClick={() => {
                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, wheelbase: true });
                  let convertedToIntWheelbaseTitle = parseInt(record.wheelbaseTitle.replace('mm', ''));
                  // update the form value
                  // if wheelbaseDescription is '-' then change to empty string, else the real string
                  // remember to set this form on the Form component
                  updateWheelbaseForm.setFieldsValue({
                    wheelbaseId: record.wheelbaseId,
                    wheelbaseTitle: convertedToIntWheelbaseTitle,
                    wheelbaseDescription: record.wheelbaseDescription === '-' ? '' : record.wheelbaseDescription,
                  });
                }}
              >
                <i className="far fa-edit"></i>
              </Button>
              <Button
                type="link"
                className="make__brand-btn--edit"
                onClick={() => {
                  alert('disable - supposed to set available to false');
                }}
              >
                <i className="fas fa-eye-slash"></i>
              </Button>
              <Button
                type="link"
                danger
                title="Delete Wheelbase"
                onClick={() => {
                  // delete modal
                  setShowDeleteModal({ ...showDeleteModal, wheelbase: true });
                  setDeleteModalContent({
                    ...deleteModalContent,
                    wheelbase: {
                      wheelbase_id: record.wheelbaseId,
                      wheelbase_title: record.wheelbaseTitle,
                    },
                  });
                }}
              >
                <i className="far fa-trash-alt"></i>
              </Button>
            </div>
          </>
        );
      },
    },
  ]);

  /* Make column initialization */
  const [makeColumn, setMakeColumn] = useState([
    {
      key: 'makeBrandTitle',
      title: 'Brand',
      dataIndex: 'makeBrandTitle',
      className: 'body__table-header--title',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TMakeTableState, b: TMakeTableState) =>
        typeof a.makeBrandTitle === 'string' &&
        typeof b.makeBrandTitle === 'string' &&
        a.makeBrandTitle.localeCompare(b.makeBrandTitle),
      ...getColumnSearchProps(makeSearchInput, 'makeBrandTitle', 'Brand'),
    },
    {
      key: 'makeTitle',
      title: 'Title',
      dataIndex: 'makeTitle',
      className: 'body__table-header--title',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TMakeTableState, b: TMakeTableState) => a.makeTitle.localeCompare(b.makeTitle),
      ...getColumnSearchProps(makeSearchInput, 'makeTitle', 'Title'),
    },
    {
      key: 'makeSeries',
      title: 'Series',
      dataIndex: 'makeSeries',
      className: 'body__table-header--title',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TMakeTableState, b: TMakeTableState) => a.makeSeries.localeCompare(b.makeSeries),
      ...getColumnSearchProps(makeSearchInput, 'makeSeries', 'Series'),
    },
    {
      key: 'makeDetails',
      title: 'Details',
      dataIndex: 'makeDetails',
      ellipsis: true,
      width: '30rem',
      ...getColumnSearchProps(makeSearchInput, 'makeDetails', 'Details'),
    },
    {
      key: 'makeAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TMakeTableState) => {
        return (
          <>
            <div className="dashboard__btn-div">
              <Button
                className="dashboard__btn-link"
                title="Edit Model"
                type="link"
                onClick={() => {
                  // populate the editModalForm
                  onPopulateUpdateMakeModal(record);
                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, make: true });
                }}
              >
                <i className="far fa-edit"></i>
              </Button>
              <Button
                type="link"
                className="dashboard__btn-link"
                onClick={() => {
                  alert('disable - supposed to set available to false');
                }}
              >
                <i className="fas fa-eye-slash"></i>
              </Button>
              <Button
                className="dashboard__btn-link--danger"
                title="Delete Models"
                type="link"
                danger
                onClick={() => {
                  setShowDeleteModal({ ...showDeleteModal, make: true });
                  setDeleteModalContent({
                    ...deleteModalContent,
                    make: { make_id: record.makeId, make_title: record.makeBrandTitle },
                  });
                }}
              >
                <i className="far fa-trash-alt"></i>
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                type="default"
                onClick={() => {
                  // get make id and title
                  setSelectedMake({
                    ...selectedMake,
                    makeId: record.makeId,
                    makeTitle: record.makeTitle,
                    makeBrandTitle: record.makeBrandTitle,
                  });
                  setShowCreateModal({ ...showCreateModal, make_wheelbase: true });
                  createMakeWheelbaseForm.setFieldsValue({
                    makeId: record.makeId,
                  });
                }}
              >
                Add Configuration
              </Button>
            </div>
          </>
        );
      },
    },
  ]);

  /* ================================================== */
  /*  methods  */
  /* ================================================== */

  /**
   *
   * helper function to only show 1 expanded row
   * @param {*} expanded
   * @param {*} record
   * @category Helper function
   */
  const onTableRowExpand = (expanded: boolean, record: TMakeTableState | TBrandTableState) => {
    var keys = [];
    let key = record.key;
    if (!expanded && key) {
      keys.push(key.toString()); // I have set my record.id as row key. Check the documentation for more details.
    }

    setExpandedRowKeys(keys);
  };

  /**
   *
   * This function takes in images array from make object and then populate the current state
   * of setImage
   * @param {TReceivedImageObj[]} recordImagesArray
   * @category Helper function
   */
  const onPopulateImagesArray = (recordImagesArray: TReceivedImageObj[]) => {
    let tempArray: TGalleryImageArrayObj[] = [];

    // Populate the array state with every image and later pass to Image Gallery
    const storeValue = (image: TReceivedImageObj) => {
      let imageObject = {
        id: image.id,
        src: image.url,
        thumbnail: image.url,
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        alt: image.filename,
        nano: 'https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif', //spinner gif
        isSelected: false,
        tags: [{ value: image.tag ? image.tag : ' - ', title: image.tag ? image.tag : ' - ' }],
        caption: image.filename,
      };

      tempArray.push(imageObject);
    };
    recordImagesArray.map(storeValue);

    setGalleryImages(tempArray);
  };

  /**
   * This function takes in the record of the current row of the table
   * and then reformat the important information and pass into the current modal / form
   * @param {*} record
   */
  const onPopulateUpdateMakeModal = (record: TMakeTableState) => {
    // update the form value using the 'name' attribute as target/key
    // e.g. record.length = ("10 ' 11 '' ")-> splitting using " '" so we will get ["100"," 11","' "]
    let extractedHorsepower = '';
    let extractedPrice: number | null = null;
    let extractedGvw = '';
    // let extractedLength = '';

    // replace units with empty strings
    extractedHorsepower = record.horsepower.replace('hp', '');
    extractedGvw = record.gvw.replace('kg', '');
    if (record.price !== '') {
      extractedPrice = convertPriceToFloat(record.price);
    } else {
      extractedPrice = null;
    }

    // remember to set this form on the Form component
    updateMakeForm.setFieldsValue({
      makeId: record.makeId,
      makeBrandId: record.makeBrandId,
      gvw: extractedGvw,
      year: moment(record.year),
      price: extractedPrice,
      title: record.makeTitle,
      engine_cap: record.engine_cap,
      horsepower: extractedHorsepower,
      transmission: record.transmission,
      makeAbs: record.makeAbs,
      makeTorque: record.makeTorque,
      makeTire: record.makeTire,
      makeConfig: record.makeConfig,
      makeSeries: record.makeSeries,
      makeEmission: record.makeEmission,
    });
  };

  /**
   * This function takes in the record of the current row of the table
   * and then reformat the important information and pass into the current modal / form
   * @param {TBrandTableState} record
   */
  const onPopulateUpdateBrandModal = (record: TBrandTableState) => {
    // update the form value using the 'name' attribute as target/key
    // if brandDescription is '-' then change to empty string, else the real string
    // remember to set this form on the Form component
    updateBrandForm.setFieldsValue({
      brandId: record.brandId,
      brandTitle: record.brandTitle,
      brandDescription: record.brandDescription === '-' ? '' : record.brandDescription,
    });
  };

  /* Forms onFinish methods */
  // the keys "values" are from the form's 'name' attribute

  /* ===================================== */
  // Brand
  /* ===================================== */
  const onCreateBrandFinish = (values: { brandTitle: string; brandDescription: string; imageTag: string }) => {
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onCreateBrand(values.brandTitle, values.brandDescription, values.imageTag, uploadSelectedFiles);
    } else {
      onCreateBrand(values.brandTitle, values.brandDescription, null, null);
    }
  };
  const onEditBrandFinish = (values: {
    brandId: number;
    brandTitle: string;
    brandDescription: string;
    imageTag: string;
  }) => {
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onUpdateBrand(values.brandId, values.brandTitle, values.brandDescription, values.imageTag, uploadSelectedFiles);
    } else {
      onUpdateBrand(values.brandId, values.brandTitle, values.brandDescription, null, null);
    }
  };

  /* ===================================== */
  // Series
  /* ===================================== */

  const onCreateSeriesFinish = (values: { brandTitle: string; brandId: number }) => {
    onCreateSeries(values.brandId, values.brandTitle);
  };
  const onUpdateSeriesFinish = (values: { brandId: number; seriesId: number; title: string }) => {
    onUpdateSeries(values.brandId, values.seriesId, values.title);
  };

  /* ===================================== */
  // Wheelbase
  /* ===================================== */
  const onCreateWheelbaseFinish = (values: { wheelbaseTitle: string; wheelbaseDescription: string }) => {
    onCreateWheelbase(values.wheelbaseTitle, values.wheelbaseDescription);
  };
  const onEditWheelbaseFinish = (values: {
    wheelbaseId: number;
    wheelBaseTitle: string;
    wheelbaseDescription: string;
  }) => {
    onUpdateWheelbase(values.wheelbaseId, values.wheelBaseTitle, values.wheelbaseDescription);
  };
  const onDeleteWheelbaseFinish = () => {
    onDeleteWheelbase(deleteModalContent.wheelbase.wheelbase_id);
  };

  const onDeleteMakeFinish = () => {
    onDeleteMake(deleteModalContent.make.make_id);
  };

  /* ===================================== */
  // Make
  /* ===================================== */

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

  // Edit Make
  const onEditMakeFinish = (values: TUpdateMakeFinishValues) => {
    // package the object
    let updateMakeData: TUpdateMakeData = {
      make_id: values.makeId,
      title: values.title,
      brand_id: values.makeBrandId,
      series_id: values.makeSeriesId,
      tire: emptyStringWhenUndefinedOrNull(values.makeTire),
      horsepower: emptyStringWhenUndefinedOrNull(values.horsepower),
      year: emptyStringWhenUndefinedOrNull(moment(values.year).format('YYYY').toString()),
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
      onUpdateMake(updateMakeData, values.imageTag, uploadSelectedFiles);
    } else {
      onUpdateMake(updateMakeData, null, null);
    }
  };

  /* ===================================== */
  // Make Wheelbase
  /* ===================================== */
  const onCreateMakeWheelbaseFinish = (values: { wheelbaseId: number; makeId: number }) => {
    onCreateMakeWheelbase(values.makeId, values.wheelbaseId);
  };
  const onUpdateMakeWheelbaseFinish = (values: { wheelbaseId: number; makeId: number; makeWheelbaseId: number }) => {
    onUpdateMakeWheelbase(values.makeWheelbaseId, values.makeId, values.wheelbaseId);
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

  /**
   *
   * Helper function to render expand icons for different tables
   * @param {boolean} expanded
   * @param {(TBrandTableState | TMakeTableState)} record
   * @return {*}
   */
  const onExpandIcon = (expanded: boolean, record: TBrandTableState | TMakeTableState) => {
    let expandImageGalleryButton = null;
    if ('brandImages' in record) {
      expandImageGalleryButton = (
        <PlusCircleTwoTone
          // style={{
          //   opacity: record.brandImages.length === 0 ? 0.3 : 1,
          //   pointerEvents: record.brandImages.length === 0 ? 'none' : 'auto',
          // }}
          onClick={() => {
            onGetSeries(record.brandId);
            // this allow only 1 row to expand at a time
            onTableRowExpand(expanded, record);
            // this closes all the edit image gallery when user expand other row
            // clearing out all the booleans
            setShowEditImageGallery({});
            // this function is passed to imageGallery
            //  it will simply uncheck everything
            onClearAllSelectedImages(selectAllChecked, setSelectAllChecked, galleryImages, setGalleryImages);
            // populate image array state and pass to ImageGallery component
            onPopulateImagesArray(record.brandImages);
          }}
        />
      );
    } else if ('makeImages' in record) {
      expandImageGalleryButton = (
        <PlusCircleTwoTone
          // style={{
          //   opacity: record.makeImages.length === 0 ? 0.3 : 1,
          //   pointerEvents: record.makeImages.length === 0 ? 'none' : 'auto',
          // }}
          onClick={() => {
            // Call make wheelbases here
            onGetMakeWheelbases(record.makeId);
            // this allow only 1 row to expand at a time
            onTableRowExpand(expanded, record);
            // this closes all the edit image gallery when user expand other row
            // clearing out all the booleans
            setShowEditImageGallery({});
            // this function is passed to imageGallery
            //  it will simply uncheck everything
            onClearAllSelectedImages(selectAllChecked, setSelectAllChecked, galleryImages, setGalleryImages);
            // populate image array state and pass to ImageGallery component
            onPopulateImagesArray(record.makeImages);
          }}
        />
      );
    }

    return (
      <>
        {expanded ? (
          <Tooltip trigger={['hover', 'click']} title="Click to hide details">
            <MinusCircleTwoTone
              onClick={() => {
                onTableRowExpand(expanded, record);
                // this function is passed to imageGallery
                //  it will simply uncheck everything
                onClearAllSelectedImages(selectAllChecked, setSelectAllChecked, galleryImages, setGalleryImages);
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip trigger={['hover', 'click']} title="Click to view more details">
            {expandImageGalleryButton}
          </Tooltip>
        )}
      </>
    );
  };

  const onExpandedRowRender = (record: TMakeTableState | TBrandTableState) => {
    let tableName: string = ''; //the names have to come from TShowModal
    let tableSpecificId: number = -1;
    let recordImageArray: TReceivedImageObj[] = [];

    if ('makeImages' in record && 'makeId' in record) {
      tableName = 'make';
      recordImageArray = record.makeImages;
      tableSpecificId = record.makeId;
    } else if ('brandImages' in record && 'brandId' in record) {
      tableName = 'brand';
      recordImageArray = record.brandImages;
      tableSpecificId = record.brandId;
    }

    return (
      <>
        {seriesArray &&
          seriesArray.map((series) => (
            <div>
              {series.title}{' '}
              <Button
                className="make__brand-btn--edit"
                type="link"
                title="Edit Series"
                onClick={() => {
                  // delete modal
                  setShowUpdateModal({ ...showUpdateModal, series: true });
                }}
              >
                <i className="far fa-edit"></i>
              </Button>
              <Button
                type="link"
                danger
                title="Delete Series"
                onClick={() => {
                  // delete modal
                  setShowDeleteModal({ ...showDeleteModal, series: true });
                }}
              >
                <i className="far fa-trash-alt"></i>
              </Button>
            </div>
          ))}

        <TableImageViewer
          record={record}
          loading={loading}
          tableName={tableName}
          galleryImages={galleryImages}
          showUpdateModal={showUpdateModal}
          tableSpecificId={tableSpecificId}
          setGalleryImages={setGalleryImages}
          recordImageArray={recordImageArray}
          selectAllChecked={selectAllChecked}
          setSelectAllChecked={setSelectAllChecked}
          onDeleteUploadImage={onDeleteUploadImage}
          setShowUpdateModal={setShowUpdateModal}
          setExpandedRowKeys={setExpandedRowKeys}
          showEditImageGallery={showEditImageGallery}
          setShowEditImageGallery={setShowEditImageGallery}
          onPopulateEditModal={(record) => {
            if ('makeImages' in record && 'makeId' in record) {
              onPopulateUpdateMakeModal(record);
            } else if ('brandImages' in record && 'brandId' in record) {
              onPopulateUpdateBrandModal(record);
            }
          }}
        />
      </>
    );
  };

  /* ================================================== */
  /*  Components  */
  /* ================================================== */

  /* ------------------------ */
  // Brand
  /* ------------------------ */

  // Brand Form items
  let brandFormItems = (
    <>
      <Form.Item
        className="make__form-item"
        label="Title"
        name="brandTitle"
        rules={[{ required: true, message: 'Input title here!' }]}
      >
        <Input placeholder="Type title here" />
      </Form.Item>
      <Form.Item
        className="make__form-item"
        label="Description"
        name="brandDescription"
        rules={[{ required: false, message: 'Input description here!' }]}
      >
        <TextArea rows={3} placeholder="Type description here" />
      </Form.Item>
      <PreviewUploadImage
        setUploadSelectedFiles={setUploadSelectedFiles}
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
      />
    </>
  );

  /* Create Brand Form */
  let createBrandFormComponent = (
    <>
      <Form
        form={createBrandForm}
        // name="createBrand"
        onKeyDown={(e) => handleKeyDown(e, createBrandForm)}
        onFinish={onCreateBrandFinish}
      >
        {/* The rest of the form items */}
        {brandFormItems}
      </Form>
    </>
  );

  /* Create Brand Modal */
  let createBrandModal = (
    <Modal
      centered
      title="Create Brand"
      visible={showCreateModal.brand}
      onOk={createBrandForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createBrandForm.resetFields();
        setShowCreateModal({ ...showCreateModal, brand: false }); //close modal on cancel
        setImagesPreviewUrls([]); //clear the image preview urls array when cancel
      }}
    >
      {/* the content within the modal */}
      {createBrandFormComponent}
    </Modal>
  );

  /* Edit Brand Form */
  let updateBrandFormComponent = (
    <>
      <Form
        form={updateBrandForm}
        // name="editBrand"
        onKeyDown={(e) => handleKeyDown(e, updateBrandForm)}
        onFinish={onEditBrandFinish}
      >
        {/* The rest of the form items */}
        {brandFormItems}
        {/* Getting the brand id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="brandId"
          hidden
          rules={[{ required: true, message: 'Get brand id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Brand Modal */
  let updateBrandModal = (
    <Modal
      centered
      title="Edit Brand"
      visible={showUpdateModal.brand}
      onOk={updateBrandForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // reset the brandObj value
        setShowUpdateModal({
          ...showUpdateModal,
          brand: false,
        });
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {updateBrandFormComponent}
    </Modal>
  );

  /* ------------------------ */
  // Series
  /* ------------------------ */

  // Series Form items
  let seriesFormItems = (
    <>
      <Form.Item
        className="make__form-item"
        label="Title"
        name="brandTitle"
        rules={[{ required: true, message: 'Input title here!' }]}
      >
        <Input placeholder="Type title here" />
      </Form.Item>
      <Form.Item
        className="make__form-item"
        hidden
        label="id"
        name="brandId"
        rules={[{ required: true, message: 'Input id here!' }]}
      ></Form.Item>
    </>
  );

  /* Create Series Form */
  let createSeriesFormComponent = (
    <>
      <Form
        form={createSeriesForm}
        name="createSeries"
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
      title={
        selectedBrand && (
          <>
            Create series for <span className="make__brand-series-title">{selectedBrand.brandTitle}</span>
          </>
        )
      }
      visible={showCreateModal.series}
      onOk={createSeriesForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createSeriesForm.resetFields();
        setShowCreateModal({ ...showCreateModal, series: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {createSeriesFormComponent}
    </Modal>
  );

  /* Edit Series Form */
  let updateSeriesFormComponent = (
    <>
      <Form
        form={updateSeriesForm}
        name="editSeries"
        onKeyDown={(e) => handleKeyDown(e, updateSeriesForm)}
        onFinish={onUpdateSeriesFinish}
      >
        {/* The rest of the form items */}
        {seriesFormItems}
        {/* Getting the Series id - hidden */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="seriesId"
          hidden
          rules={[{ required: true, message: 'Get Series id!' }]}
        ></Form.Item>
      </Form>
    </>
  );

  /* Edit Series Modal */
  let updateSeriesModal = (
    <Modal
      centered
      title={selectedBrand && `Edit series for ${selectedBrand.brandTitle}`}
      visible={showUpdateModal.series}
      onOk={updateSeriesForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // reset the series value
        setShowUpdateModal({
          ...showUpdateModal,
          series: false,
        });
      }}
    >
      {/* the content within the modal */}
      {updateSeriesFormComponent}
    </Modal>
  );

  /* ----------------------------------------------- */
  // Wheelbase
  /* ----------------------------------------------- */

  /* Create Wheelbase Form */
  let createWheelbaseFormComponent = (
    <>
      <Form
        form={createWheelbaseForm}
        // name="createWheelbase"
        onKeyDown={(e) => handleKeyDown(e, createWheelbaseForm)}
        onFinish={onCreateWheelbaseFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="wheelbaseTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input addonAfter={'mm'} placeholder="Type title here e.g. 3300" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="wheelbaseDescription"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <TextArea rows={3} placeholder="Type description here" />
        </Form.Item>
      </Form>
    </>
  );

  /* Create Wheelbase Modal */
  let createWheelbaseModal = (
    <Modal
      centered
      title="Create Wheelbase"
      visible={showCreateModal.wheelbase}
      onOk={createWheelbaseForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowCreateModal({ ...showCreateModal, wheelbase: false });
        createWheelbaseForm.resetFields();
      }}
    >
      {/* the content within the modal */}
      {createWheelbaseFormComponent}
    </Modal>
  );

  /* Edit Wheelbase Form */
  let updateWheelbaseFormComponent = (
    <>
      <Form
        form={updateWheelbaseForm}
        // name="editWheelbase"
        onKeyDown={(e) => handleKeyDown(e, updateWheelbaseForm)}
        onFinish={onEditWheelbaseFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="wheelbaseTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input addonAfter={'mm'} placeholder="Type title here e.g. 3300" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="wheelbaseDescription"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <TextArea rows={3} placeholder="Type description here" />
        </Form.Item>

        {/* Getting the wheelbase id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="wheelbaseId"
          hidden
          rules={[{ required: true, message: 'Get wheelbase id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Wheelbase Modal */
  let updateWheelbaseModal = (
    <Modal
      title="Edit Wheelbase"
      visible={showUpdateModal.wheelbase}
      onOk={updateWheelbaseForm.submit}
      confirmLoading={loading}
      onCancel={() => setShowUpdateModal({ ...showUpdateModal, wheelbase: false })}
    >
      {/* the content within the modal */}
      {updateWheelbaseFormComponent}
    </Modal>
  );

  /* -------------------------------------------- */
  // Make
  /* -------------------------------------------- */

  /* Make Form Items */
  let makeFormItems = (
    <>
      <div className="flex">
        <div className="make__form-left">
          {/* ------- title ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Input title here!' }]}
          >
            <Input placeholder="Type title here e.g. XZA200" />
          </Form.Item>
          {/* ------- Brand - value is brand id but display is brand name -------*/}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Brand"
            name="makeBrandId"
            rules={[{ required: true, message: 'Select Brand!' }]}
          >
            {/* only render if brandsArray is not null */}
            <Select
              showSearch
              placeholder="Select a brand"
              optionFilterProp="children"
              filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {brandsArray &&
                brandsArray.map((brand) => {
                  return (
                    <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={brand.id}>
                      {brand.title}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          {/* ------- Series ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Series"
            name="makeSeriesId"
            rules={[{ required: false, message: 'Input Series here!' }]}
          >
            {/* only render if brandsArray is not null */}
            <Select
              showSearch
              placeholder="Select a series"
              optionFilterProp="children"
              filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {seriesArray &&
                seriesArray.map((seriesObj) => {
                  return (
                    <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={seriesObj.id}>
                      {seriesObj.title}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          {/* ------- Tire ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Tyre"
            name="makeTire"
            rules={[{ required: false, message: 'Input tyre count here!' }]}
          >
            <Input type="number" placeholder="Type tyre count here" />
          </Form.Item>

          {/* ------- Horsepower ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Horsepower"
            name="horsepower"
            rules={[{ required: false, message: 'Input Horsepower here!' }]}
          >
            <Input type="number" min={0} addonAfter={'hp'} placeholder="Type horsepower here e.g. 250" />
          </Form.Item>
          {/* ------- Year ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Year"
            name="year"
            rules={[{ required: false, message: 'Select a year!' }]}
          >
            <DatePicker style={{ width: '100%' }} picker="year" />
          </Form.Item>
          {/* ------- Transmission ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Transmission"
            name="transmission"
            rules={[{ required: false, message: 'Input Transmission here!' }]}
          >
            <Input placeholder="Type transmission here e.g. MT" />
          </Form.Item>
        </div>
        <div className="make__form-right">
          {/* ------- Engine cap ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Engine Cap"
            name="engine_cap"
            rules={[{ required: false, message: 'Input Engine Cap here!' }]}
          >
            <Input type="number" min={0} placeholder="Type length here e.g. 115" />
          </Form.Item>
          {/* ------- GVW ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="GVW"
            name="gvw"
            rules={[{ required: false, message: 'Input Gross Vehicle Weight here!' }]}
          >
            <Input addonAfter="kg" placeholder="Type Gross Vehicle Weight here e.g. 2t" />
          </Form.Item>
          {/* ------- ABS ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Abs"
            name="makeAbs"
            rules={[{ required: false, message: 'Input ABS here!' }]}
          >
            <Input placeholder="Type ABS here" />
          </Form.Item>
          {/* ------- Torque ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Torque"
            name="makeTorque"
            rules={[{ required: false, message: 'Input torque here!' }]}
          >
            <Input placeholder="Type torque here" />
          </Form.Item>

          {/* ------- Config ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Config"
            name="makeConfig"
            rules={[{ required: false, message: 'Input config here!' }]}
          >
            <Input placeholder="Type config here e.g. 4X4" />
          </Form.Item>

          {/* ------- Emission ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Emission"
            name="makeEmission"
            rules={[{ required: false, message: 'Input Emission here!' }]}
          >
            <Input type="number" placeholder="Type Emission here" />
          </Form.Item>
          {/* ------- Price ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Price"
            name="price"
            rules={[{ required: false, message: 'Input price here!' }]}
          >
            <NumberFormat className="ant-input" placeholder="Type price here" thousandSeparator={true} prefix={'RM '} />
          </Form.Item>
        </div>
      </div>

      {/* The whole upload image component including buttons and image previews */}
      <PreviewUploadImage
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
        setUploadSelectedFiles={setUploadSelectedFiles}
      />
    </>
  );

  /*  Create Make Form */
  let createMakeFormComponent = (
    <>
      <Form
        onValuesChange={(value) => {
          // check if brand id is chosen
          if (typeof value.makeBrandId === 'number')
            // call get series array
            onGetSeries(value.makeBrandId);
        }}
        form={createMakeForm}
        // name="createMake"
        onKeyDown={(e) => handleKeyDown(e, createMakeForm)}
        onFinish={onCreateMakeFinish}
      >
        {makeFormItems}
      </Form>
    </>
  );

  /* Create Make Modal */
  let createMakeModal = (
    <Modal
      title="Create Make"
      centered
      width={800}
      visible={showCreateModal.make}
      onOk={createMakeForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowCreateModal({ ...showCreateModal, make: false });
        setImagesPreviewUrls([]); //clear the image preview when oncancel
        createMakeForm.resetFields();
      }}
    >
      {/* the content within the modal */}
      {createMakeFormComponent}
    </Modal>
  );

  /* Edit Make Form */
  let updateMakeFormComponent = (
    <>
      <Form
        form={updateMakeForm}
        // name="editMake"
        onKeyDown={(e) => handleKeyDown(e, updateMakeForm)}
        onFinish={onEditMakeFinish}
      >
        {makeFormItems}
        {/* Getting the make id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="makeId"
          hidden
          rules={[{ required: true, message: 'Get make id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Make Modal */
  let updateMakeModal = (
    <Modal
      centered
      width={800}
      title="Edit Make"
      visible={showUpdateModal.make}
      onOk={updateMakeForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowUpdateModal({ ...showUpdateModal, make: false });
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {updateMakeFormComponent}
    </Modal>
  );

  /* Make Wheelbase Form Items */
  let makeWheelbaseFormItems = (
    <>
      <Form.Item
        className="make__form-item "
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
          {wheelbasesArray &&
            wheelbasesArray.map((wheelbase) => {
              return (
                <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={wheelbase.id}>
                  {wheelbase.title + 'mm'}
                </Option>
              );
            })}
        </Select>
      </Form.Item>

      <Form.Item
        className="make__form-item"
        label="Length"
        name="length"
        rules={[{ required: true, message: 'Input length here!' }]}
      >
        <Input addonAfter="mm" placeholder="Type length here" />
      </Form.Item>

      <Form.Item hidden label="makeId" name="makeId" rules={[{ required: true, message: 'Input body id!' }]}>
        <Input />
      </Form.Item>
    </>
  );

  /* Create MakeWheelbase Form */
  let createMakeWheelbaseFormComponent = (
    <>
      <Form
        form={createMakeWheelbaseForm}
        // name="createMakeWheelbase"
        onKeyDown={(e) => handleKeyDown(e, createMakeWheelbaseForm)}
        onFinish={onCreateMakeWheelbaseFinish}
      >
        {/* The rest of the form items */}
        {makeWheelbaseFormItems}
      </Form>
    </>
  );

  /* Create MakeWheelbase Modal */
  let createMakeWheelbaseModal = (
    <Modal
      title={
        <>
          Create Configuration
          {selectedMake ? (
            <>
              &nbsp;for
              <span className="make__modal-title--card">{` ${selectedMake.makeBrandTitle} - ${selectedMake.makeTitle}`}</span>
            </>
          ) : (
            ''
          )}
        </>
      }
      centered
      visible={showCreateModal.make_wheelbase}
      onOk={createMakeWheelbaseForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowCreateModal({ ...showCreateModal, make_wheelbase: false });
        createMakeWheelbaseForm.resetFields();
      }}
    >
      {/* the content within the modal */}
      {createMakeWheelbaseFormComponent}
    </Modal>
  );

  /* Update MakeWheelbase Form */
  let updateMakeWheelbaseFormComponent = (
    <>
      <Form
        form={updateMakeWheelbaseForm}
        // name="updateMakeWheelbase"
        onKeyDown={(e) => handleKeyDown(e, updateMakeWheelbaseForm)}
        onFinish={onUpdateMakeWheelbaseFinish}
      >
        {/* The rest of the form items */}
        {makeWheelbaseFormItems}
        {/* Id for update */}
        <Form.Item
          hidden
          label="makeWheelbaseId"
          name="makeWheelbaseId"
          rules={[{ required: true, message: 'Assign makewheelbase id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit MakeWheelbase Modal */
  let updateMakeWheelbaseModal = (
    <Modal
      centered
      title={
        <>
          Edit Configuration
          {selectedMake ? (
            <>
              &nbsp;for
              <span className="make__modal-title--card">{` ${selectedMake.makeBrandTitle} - ${selectedMake.makeTitle}`}</span>
            </>
          ) : (
            ''
          )}
        </>
      }
      visible={showUpdateModal.make_wheelbase}
      onOk={updateMakeWheelbaseForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowUpdateModal({ ...showUpdateModal, make_wheelbase: false });
      }}
    >
      {/* the content within the modal */}
      {updateMakeWheelbaseFormComponent}
    </Modal>
  );
  /* =================================== */
  /* Make wheelbase expanded component*/
  /* =================================== */

  const makeWheelbasesCardsComponent = (record: TMakeTableState) => {
    return (
      <>
        {makeWheelbasesArray ? (
          <>
            {makeWheelbasesArray.length > 0 ? (
              <>
                <div>
                  Configuration(s) for&nbsp;
                  <span className="make__expand-title" style={{ textTransform: 'capitalize' }}>
                    {record.makeBrandTitle}&nbsp;{record.makeTitle}
                  </span>
                  :&nbsp;
                  <span className="make__expand-available">{makeWheelbasesArray.length} available</span>
                </div>
                <hr />
                <div className="make__expand-outerdiv">
                  {[...makeWheelbasesArray].reverse().map((makeWheelbase, index) => {
                    return (
                      <Card
                        key={uuidv4()}
                        className="make__expand-card"
                        title={
                          <div className="make__expand-card-title-div">
                            <span className="make__expand-card-title">Configuration {index + 1}</span>
                          </div>
                        }
                        size="small"
                        style={{ width: 'auto' }}
                        headStyle={{ background: '#FFF2E8' }}
                      >
                        <div className="make__expand-card-body">
                          <section className="make__expand-card-description">
                            <div>
                              Wheelbase:&nbsp;
                              {makeWheelbase.wheelbase.title && makeWheelbase.wheelbase.title !== ''
                                ? `${makeWheelbase.wheelbase.title}mm`
                                : '-'}
                            </div>
                          </section>
                          <section className="make__expand-card-btn-section">
                            <div className="make__expand-card-btn-div">
                              <div>
                                <Button
                                  type="link"
                                  className="blue-link-btn margin_r-1"
                                  title="Edit Model"
                                  style={{ padding: 0 }}
                                  onClick={() => {
                                    // to get name and id
                                    setSelectedMake({
                                      ...selectedMake,
                                      makeId: record.makeId,
                                      makeTitle: record.makeTitle,
                                      makeBrandTitle: record.makeBrandTitle,
                                    });
                                    setShowUpdateModal({ ...showUpdateModal, make_wheelbase: true });
                                    updateMakeWheelbaseForm.setFieldsValue({
                                      makeId: record.makeId,
                                      makeWheelbaseId: makeWheelbase.id,
                                      wheelbaseId: makeWheelbase.wheelbase.id,
                                    });
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  type="link"
                                  danger
                                  style={{ padding: 0 }}
                                  onClick={() => {
                                    // to get name and id
                                    setSelectedMake({
                                      ...selectedMake,
                                      makeId: record.makeId,
                                      makeTitle: record.makeTitle,
                                      makeBrandTitle: record.makeBrandTitle,
                                    });
                                    setDeleteModalContent({
                                      ...deleteModalContent,
                                      make_wheelbase: {
                                        make_title: record.makeTitle,
                                        make_wheelbase_id: makeWheelbase.id,
                                        make_wheelbase_title: makeWheelbase.wheelbase.title,
                                      },
                                    });
                                    setShowDeleteModal({ ...showDeleteModal, make_wheelbase: true });
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </section>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </>
            ) : (
              <>No Configurations yet</>
            )}
          </>
        ) : (
          <Skeleton active />
        )}
      </>
    );
  };

  /* ================================ */
  // Delete Modals
  /* ================================ */
  //  Delete Make Wheelbase Modal
  let deleteMakeWheelbaseModal = (
    <Modal
      title={
        <div className="dashboard__delete-header">
          <ExclamationCircleOutlined className="dashboard__delete-icon" />
          <div>
            Delete Configuration
            {selectedMake ? (
              <>
                &nbsp;for&nbsp;
                <span className="make__modal-title--card">{` ${selectedMake.makeBrandTitle} - ${selectedMake.makeTitle}`}</span>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      }
      visible={showDeleteModal.make_wheelbase}
      onOk={() => {
        if (selectedMake === undefined || selectedMake === null) return;
        onDeleteMakeWheelbase(selectedMake.makeId, deleteModalContent.make_wheelbase.make_wheelbase_id);
      }}
      onCancel={() => setShowDeleteModal({ ...showDeleteModal, make_wheelbase: false })}
      okText="Yes, delete it"
      confirmLoading={loading}
      cancelText="Cancel"
    >
      You are deleting
      {deleteModalContent.make_wheelbase.make_wheelbase_title === '' ? (
        ' this configuration'
      ) : (
        <span className="dashboard__delete-message">{` Wheelbase: ${deleteModalContent.make_wheelbase.make_wheelbase_title}mm`}</span>
      )}
      , this action is permanent. Are you sure?
    </Modal>
  );

  //  Delete Brand Modal
  let deleteBrandModal = (
    <Modal
      title={
        <div className="dashboard__delete-header">
          <ExclamationCircleOutlined className="dashboard__delete-icon" />
          Delete Brand
        </div>
      }
      visible={showDeleteModal.brand}
      onOk={() => onDeleteBrand(deleteModalContent.brand.brand_id)}
      onCancel={() => setShowDeleteModal({ ...showDeleteModal, brand: false })}
      okText="Yes, delete it"
      confirmLoading={loading}
      cancelText="Cancel"
    >
      You are deleting
      {deleteModalContent.brand.brand_title === '' ? (
        ' this brand'
      ) : (
        <span className="dashboard__delete-message">{` ${deleteModalContent.brand.brand_title}`}</span>
      )}
      , this action is permanent. Are you sure?
    </Modal>
  );

  //  Delete Make Wheelbase Modal
  let deleteWheelbaseModal = (
    <CrudModal
      crud={'delete'}
      indexKey={'wheelbase'}
      category={'wheelbase'}
      modalTitle={`Delete Wheelbase`}
      showModal={showDeleteModal}
      visible={showDeleteModal.wheelbase}
      onDelete={onDeleteWheelbaseFinish}
      setShowModal={setShowDeleteModal}
      warningText={deleteModalContent.wheelbase.wheelbase_title}
      backupWarningText={'this wheelbase'}
      loading={loading !== undefined && loading}
    />
  );

  //  Delete Make  Modal
  let deleteMakeModal = (
    <CrudModal
      crud={'delete'}
      indexKey={'make'}
      category={'make'}
      modalTitle={`Delete Make`}
      showModal={showDeleteModal}
      visible={showDeleteModal.make}
      onDelete={onDeleteMakeFinish}
      setShowModal={setShowDeleteModal}
      warningText={deleteModalContent.make.make_title}
      backupWarningText={'this wheelbase'}
      loading={loading !== undefined && loading}
    />
  );
  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */

  //  Calling get APIs
  useEffect(() => {
    onGetBrands();
  }, [onGetBrands]);

  useEffect(() => {
    onGetWheelbases();
  }, [onGetWheelbases]);

  useEffect(() => {
    onGetMakes();
  }, [onGetMakes]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for BRAND
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TBrandTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (brand: TReceivedBrandObj) => {
      let descriptionIsNullOrEmpty = brand.description === null || brand.description === '';
      // only render when available value is true
      if (brand.available) {
        tempArray.push({
          key: uuidv4(),
          brandId: brand.id,
          brandTitle: brand.title,
          brandDescription: descriptionIsNullOrEmpty ? '-' : brand.description,
          available: brand.available,
          brandImages: brand.images, //store the whole array of images
        });
      }
    };

    if (brandsArray) {
      // Execute function "storeValue" for every array index
      brandsArray.map(storeValue);
    }
    // update the state with tempArray
    setBrandTableState(tempArray);
  }, [brandsArray]);

  /* -------------------------------------------------- */
  // initialize/populate the state of data array for WHEELBASES
  /* -------------------------------------------------- */
  useEffect(() => {
    let tempArray: TWheelbaseTableState[] = [];
    // A function that stores desired keys and values into a tempArray
    const storeValue = (wheelbase: TReceivedWheelbaseObj) => {
      let descriptionIsNullOrEmpty = wheelbase.description === null || wheelbase.description === '';

      // only push into the array when available value is true
      if (wheelbase.available) {
        tempArray.push({
          key: uuidv4(),

          wheelbaseId: wheelbase.id,
          wheelbaseTitle: wheelbase.title + 'mm',
          wheelbaseDescription: descriptionIsNullOrEmpty ? '-' : wheelbase.description,
          available: wheelbase.available,
        });
      }
    };

    if (wheelbasesArray) {
      // Execute function "storeValue" for every array index
      wheelbasesArray.map(storeValue);
    }
    // update the state with tempArray
    setWheelbaseTableState(tempArray);
  }, [wheelbasesArray]);

  /* -------------------------------------------------- */
  // initialize/populate the state of data array for MAKES
  /* -------------------------------------------------- */
  useEffect(() => {
    let tempArray: TMakeTableState[] = [];
    // A function that stores desired keys and values into a tempArray
    const storeValue = (make: TReceivedMakeObj) => {
      let detailsCombinedString = ''; //use this combined string so that filter can work
      // manipulate the strings first
      // let concatLength = make.length;
      // let concatWheelbase = make.wheelbase.title + 'mm';
      let concatHorsePower = make.horsepower + 'hp';
      let concatGvw = make.gvw + 'kg';
      let concatPrice = '';
      if (make.price === null) {
        concatPrice = '';
      } else {
        concatPrice = 'RM' + make.price.toFixed(2);
      }

      // concatenate them
      detailsCombinedString +=
        // concatLength +
        // concatWheelbase +
        concatHorsePower +
        concatGvw +
        concatPrice +
        make.engine_cap +
        make.transmission +
        make.year +
        make.abs +
        make.torque +
        make.tire +
        make.config +
        make.series +
        make.emission;

      // check if undefined
      let makeGVW = make.gvw === undefined || make.gvw === null || make.gvw === '' ? '' : make.gvw + 'kg';
      let makeYear = make.year === undefined || make.year === null ? '' : make.year;
      let makePrice =
        make.price === undefined || make.price === null || make.price === 0
          ? ''
          : 'RM' +
            make.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
      let makeTitle = make.title === undefined || make.title === null ? '' : make.title;
      // let makeLength = make.length === undefined || make.length === null || make.length === 0 ? '' : make.length + 'mm';
      let makeEngineCap = make.engine_cap === undefined || make.engine_cap === null ? '' : make.engine_cap;
      let makeHorsepower =
        make.horsepower === undefined || make.horsepower === null || make.horsepower === ''
          ? ''
          : make.horsepower + 'hp';
      let makeTransmission = make.transmission === undefined || make.transmission === null ? '' : make.transmission;
      let makeBrandTitle = make.brand.title === undefined || make.brand.title === null ? '' : make.brand.title;
      // let makeWheelbaseTitle =
      // make.wheelbase.title === undefined || make.wheelbase.title === null ? '' : make.wheelbase.title + 'mm';
      let makeAbs = make.abs === undefined || make.abs === null ? '' : make.abs;
      let makeTorque = make.torque === undefined || make.torque === null ? '' : make.torque;
      let makeTire = make.tire === undefined || make.tire === null ? '' : make.tire;
      let makeConfig = make.config === undefined || make.config === null ? '' : make.config;
      let makeEmission = make.emission === undefined || make.emission === null ? '' : make.emission;
      let makeSeries = make.series === undefined || make.series === null ? '' : make.series;

      // only push into the array when available value is true
      if (make.available) {
        tempArray.push({
          key: uuidv4(),
          gvw: makeGVW,
          year: makeYear,
          makeId: make.id,
          price: makePrice,
          makeTitle: makeTitle,
          available: make.available,
          engine_cap: makeEngineCap,
          horsepower: makeHorsepower,
          transmission: makeTransmission,
          makeDetails: detailsCombinedString,
          makeBrandId: make.brand.id,
          makeBrandTitle: makeBrandTitle,
          makeSeries: makeSeries,
          makeImages: make.images, //the whole array of images
          makeAbs: makeAbs,
          makeTorque: makeTorque,
          makeTire: makeTire.toString(),
          makeConfig: makeConfig,
          makeEmission: makeEmission,
        });
      }
    };

    if (makesArray) {
      // Execute function "storeValue" for every array index
      makesArray.map(storeValue);
    }
    // update the state with tempArray
    setMakeTableState(tempArray);
  }, [makesArray]);

  useEffect(() => {
    if (makesArray) {
      // for every make in makesArray, set image gallery with that make id and initialize all as false
      makesArray.forEach((make) => {
        setShowEditImageGallery((prevState: any) => {
          return { ...prevState, ['make' + make.id]: false };
        });
      });
    }
  }, [makesArray]);

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
      createBrandForm.resetFields();
      createWheelbaseForm.resetFields();
      createMakeForm.resetFields();
      createSeriesForm.resetFields();
      createMakeWheelbaseForm.resetFields();
      // close all the modals if successful
      setShowCreateModal({
        ...showCreateModal,
        brand: false,
        wheelbase: false,
        make: false,
        series: false,
        make_wheelbase: false,
      });
      setShowUpdateModal({
        ...showUpdateModal,
        brand: false,
        wheelbase: false,
        make: false,
        series: false,
        make_wheelbase: false,
      });
      setShowDeleteModal({
        ...showDeleteModal,
        brand: false,
        wheelbase: false,
        make: false,
        series: false,
        make_wheelbase: false,
      });
    }
  }, [
    successMessage,
    showDeleteModal,
    showUpdateModal,
    showCreateModal,
    createMakeForm,
    createBrandForm,
    createWheelbaseForm,
    createSeriesForm,
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
    }
  }, [errorMessage, onClearDashboardState]);

  /* --------------- */
  // Image Uploaded
  /* --------------- */
  useEffect(() => {
    if (imagesUploaded) {
      // if image has been uploaded, clear the state
      onClearDashboardState();
      setImagesPreviewUrls([]); //empty the array
    }
  }, [imagesUploaded, onClearDashboardState, setImagesPreviewUrls]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* ================== */}
      {/*       Modals       */}
      {/* ================== */}
      {createBrandModal}
      {updateBrandModal}
      {createWheelbaseModal}
      {updateWheelbaseModal}
      {createMakeModal}
      {updateMakeModal}
      {createSeriesModal}
      {updateSeriesModal}
      {createMakeWheelbaseModal}
      {updateMakeWheelbaseModal}
      {deleteMakeWheelbaseModal}
      {deleteWheelbaseModal}
      {deleteBrandModal}
      {deleteMakeModal}

      <NavbarComponent activePage="make" defaultOpenKeys="dashboard" />
      <Layout>
        <LayoutComponent activeKey="make">
          <ParallaxContainer bgImageUrl={holy5truck} overlayColor="rgba(0, 0, 0, 0.3)">
            <CustomContainer>
              <div className="make__tab-outerdiv">
                <section>
                  {brandsArray && wheelbasesArray && makesArray ? (
                    <>
                      {/* ====================== */}
                      {/*     Brand Section      */}
                      {/* ====================== */}
                      <div className="make__section-top">
                        <div className="make__section-top-left">
                          <section className="make__section" style={{ marginRight: '1rem' }}>
                            <div className="make__header-div ">
                              <div className="make__header-title">Brands</div>
                              <Button
                                type="primary"
                                className="make__brand-btn"
                                onClick={() => setShowCreateModal({ ...showCreateModal, brand: true })}
                              >
                                Create New Brand
                              </Button>
                            </div>
                            {/* ------------------ */}
                            {/*    Brand Table     */}
                            {/* ------------------ */}
                            <Table
                              bordered
                              className="make__table"
                              scroll={{ y: 400 }}
                              expandedRowKeys={expandedRowKeys} // this allow only 1 row to expand at a time
                              onExpand={onTableRowExpand} //this allow only 1 row to expand at a time
                              expandable={{
                                expandIcon: ({ expanded, record }) => onExpandIcon(expanded, record),
                                expandedRowRender: (record: TBrandTableState) => onExpandedRowRender(record),
                              }}
                              // components={components}
                              dataSource={brandTableState}
                              columns={convertHeader(brandColumns, setBrandColumns)}
                              pagination={false}
                            />
                          </section>
                        </div>

                        {/* ====================== */}
                        {/*   Wheelbases Section   */}
                        {/* ====================== */}

                        <div className="make__section-top-right">
                          <section className="make__section">
                            <div className="make__header-div ">
                              <div className="make__header-title">Wheelbases</div>
                              <Button
                                type="primary"
                                className="make__brand-btn"
                                onClick={() => setShowCreateModal({ ...showCreateModal, wheelbase: true })}
                              >
                                Create New Wheelbase
                              </Button>
                            </div>

                            {/* -------------------- */}
                            {/*   Wheelbase Table   */}
                            {/* -------------------- */}
                            <Table
                              bordered
                              className="make__table"
                              scroll={{ y: 400 }}
                              // components={components}
                              dataSource={wheelbaseTableState}
                              columns={convertHeader(wheelbaseColumn, setWheelbaseColumn)}
                              pagination={false}
                            />
                          </section>
                        </div>
                      </div>

                      {/* ====================== */}
                      {/*      Makes/Models Section     */}
                      {/* ====================== */}

                      <section className="make__section">
                        <div className="make__header-div ">
                          <div className="make__header-title">Models</div>
                          <Button
                            type="primary"
                            className="make__brand-btn"
                            onClick={() => setShowCreateModal({ ...showCreateModal, make: true })}
                          >
                            Create New Make
                          </Button>
                        </div>

                        {/* -------------------- */}
                        {/*     Make Table      */}
                        {/* -------------------- */}
                        <Table
                          bordered
                          className="make__table"
                          scroll={{ x: '89rem', y: 600 }}
                          expandedRowKeys={expandedRowKeys} // this allow only 1 row to expand at a time
                          onExpand={onTableRowExpand} //this allow only 1 row to expand at a time
                          expandable={{
                            expandIcon: ({ expanded, record }) => onExpandIcon(expanded, record),
                            expandedRowRender: (record: TMakeTableState) => {
                              let imageGalleryComponent = onExpandedRowRender(record);
                              let makeWheelbaseCards = makeWheelbasesCardsComponent(record);

                              return (
                                <>
                                  <div
                                    style={{
                                      marginBottom:
                                        makeWheelbasesArray && makeWheelbasesArray.length > 0 ? '2rem' : 'none',
                                    }}
                                  >
                                    {makeWheelbaseCards}
                                  </div>
                                  {imageGalleryComponent}
                                </>
                              );
                            },
                          }}
                          // components={components}
                          dataSource={makeTableState}
                          columns={convertHeader(makeColumn, setMakeColumn)}
                          // pagination={false}
                        />
                      </section>
                    </>
                  ) : (
                    <div className="catalog__loading-div">
                      <Ripple />
                    </div>
                  )}
                </section>
              </div>
            </CustomContainer>
          </ParallaxContainer>
        </LayoutComponent>
      </Layout>
      <Footer />
    </>
  );
};
interface StateProps {
  loading?: boolean;
  imagesUploaded?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  makesArray?: TReceivedMakeObj[] | null;
  brandsArray?: TReceivedBrandObj[] | null;
  seriesArray?: TReceivedSeriesObj[] | null;
  wheelbasesArray?: TReceivedWheelbaseObj[] | null;
  makeWheelbasesArray?: TReceivedMakeWheelbaseObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.dashboard.loading,
    makesArray: state.dashboard.makesArray,
    seriesArray: state.dashboard.seriesArray,
    brandsArray: state.dashboard.brandsArray,
    errorMessage: state.dashboard.errorMessage,
    imagesUploaded: state.dashboard.imagesUploaded,
    successMessage: state.dashboard.successMessage,
    wheelbasesArray: state.dashboard.wheelbasesArray,
    makeWheelbasesArray: state.dashboard.makeWheelbasesArray,
  };
};

interface DispatchProps {
  // Brand
  onGetBrands: typeof actions.getBrands;
  onCreateBrand: typeof actions.createBrand;
  onUpdateBrand: typeof actions.updateBrand;
  onDeleteBrand: typeof actions.deleteBrand;
  // Wheelbase
  onGetWheelbases: typeof actions.getWheelbases;
  onCreateWheelbase: typeof actions.createWheelbase;
  onUpdateWheelbase: typeof actions.updateWheelbase;
  onDeleteWheelbase: typeof actions.deleteWheelbase;
  // Make
  onGetMakes: typeof actions.getMakes;
  onCreateMake: typeof actions.createMake;
  onUpdateMake: typeof actions.updateMake;
  onDeleteMake: typeof actions.deleteMake;
  // Series
  onGetSeries: typeof actions.getSeries;
  onCreateSeries: typeof actions.createSeries;
  onUpdateSeries: typeof actions.updateSeries;
  // Make Wheelbase
  onGetMakeWheelbases: typeof actions.getMakeWheelbases;
  onCreateMakeWheelbase: typeof actions.createMakeWheelbase;
  onUpdateMakeWheelbase: typeof actions.updateMakeWheelbase;
  onDeleteMakeWheelbase: typeof actions.deleteMakeWheelbase;
  // Images
  onDeleteUploadImage: typeof actions.deleteUploadImage;
  // Miscellaneous
  onClearDashboardState: typeof actions.clearDashboardState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    // Brand
    onGetBrands: () => dispatch(actions.getBrands()),
    onCreateBrand: (title, description, tag, imageFiles) =>
      dispatch(actions.createBrand(title, description, tag, imageFiles)),
    onUpdateBrand: (brand_id, title, description, imageTag, imageFiles) =>
      dispatch(actions.updateBrand(brand_id, title, description, imageTag, imageFiles)),
    onDeleteBrand: (brand_id) => dispatch(actions.deleteBrand(brand_id)),
    // Wheelbase
    onGetWheelbases: () => dispatch(actions.getWheelbases()),
    onCreateWheelbase: (title, description) => dispatch(actions.createWheelbase(title, description)),
    onUpdateWheelbase: (wheelbase_id, title, description) =>
      dispatch(actions.updateWheelbase(wheelbase_id, title, description)),
    onDeleteWheelbase: (wheelbase_id) => dispatch(actions.deleteWheelbase(wheelbase_id)),
    // Make
    onGetMakes: () => dispatch(actions.getMakes()),
    onCreateMake: (createMakeData, imageTag, uploadSelectedFiles) =>
      dispatch(actions.createMake(createMakeData, imageTag, uploadSelectedFiles)),
    onUpdateMake: (updateMakeData, imageTag, imageFiles) =>
      dispatch(actions.updateMake(updateMakeData, imageTag, imageFiles)),
    onDeleteMake: (make_id) => dispatch(actions.deleteMake(make_id)),
    //  Series
    onGetSeries: (brand_id) => dispatch(actions.getSeries(brand_id)),
    onCreateSeries: (brand_id, title) => dispatch(actions.createSeries(brand_id, title)),
    onUpdateSeries: (brand_id, series_id, title) => dispatch(actions.updateSeries(brand_id, series_id, title)),
    // Make wheelbase
    onGetMakeWheelbases: (make_id) => dispatch(actions.getMakeWheelbases(make_id)),
    onCreateMakeWheelbase: (make_id, wheelbase_id) => dispatch(actions.createMakeWheelbase(make_id, wheelbase_id)),
    onUpdateMakeWheelbase: (make_wheelbase_id, make_id, wheelbase_id) =>
      dispatch(actions.updateMakeWheelbase(make_wheelbase_id, make_id, wheelbase_id)),
    onDeleteMakeWheelbase: (make_id, make_wheelbase_id) =>
      dispatch(actions.deleteMakeWheelbase(make_id, make_wheelbase_id)),
    // Image
    onDeleteUploadImage: (ids) => dispatch(actions.deleteUploadImage(ids)),
    // Miscellaneous
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Make);

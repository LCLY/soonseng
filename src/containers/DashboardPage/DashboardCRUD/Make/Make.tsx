import React, { ReactText, useEffect, useState } from 'react';
import './Make.scss';
/*components*/
import Loading from 'src/components/Loading/Loading';
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import TableImageViewer from 'src/components/ImageRelated/TableImageViewer/TableImageViewer';
import PreviewUploadImage from 'src/components/ImageRelated/PreviewUploadImage/PreviewUploadImage';
/*3rd party lib*/
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import NumberFormat from 'react-number-format';
import { FormInstance } from 'antd/lib/form/hooks/useForm';

import { Table, Form, Input, Layout, Button, Modal, Tooltip, notification, Select, DatePicker } from 'antd';
/* Util */
import {
  TReceivedMakeObj,
  TCreateMakeData,
  TUpdateMakeData,
  TReceivedBrandObj,
  TReceivedImageObj,
  TReceivedWheelbaseObj,
  TReceivedSeriesObj,
} from 'src/store/types/dashboard';
// import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import { TGalleryImageArrayObj } from 'src/components/ImageRelated/ImageGallery/ImageGallery';
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types';
import {
  setFilterReference,
  convertHeader,
  getColumnSearchProps,
  convertPriceToFloat,
  onClearAllSelectedImages,
} from 'src/shared/Utils';

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
  makeLength: string;
  available: boolean;
  engine_cap: string;
  horsepower: string;
  transmission: string;
  makeBrandId: number;
  makeBrandTitle: string;
  makeWheelbaseId: number;
  makeWheelbaseTitle: string;
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

type TShowModal = {
  make: boolean;
  brand: boolean;
  wheelbase: boolean;
  series: boolean;
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
  // wheelbase
  wheelbasesArray,
  onGetWheelbases,
  onCreateWheelbase,
  onUpdateWheelbase,
  // make
  makesArray,
  onGetMakes,
  onCreateMake,
  onUpdateMake,
  // series
  seriesArray,
  onGetSeries,
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

  // const { width } = useWindowDimensions();
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
  const [showUpdateModal, setShowUpdateModal] = useState<TShowModal>({
    brand: false,
    wheelbase: false,
    make: false,
    series: false,
  });
  const [showCreateModal, setShowCreateModal] = useState<TShowModal>({
    brand: false,
    wheelbase: false,
    make: false,
    series: false,
  });

  // state to track which brand we are using
  const [selectedBrand, setSelectedBrand] = useState<{ brandId: number; brandTitle: string } | null>(null);

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
    {
      key: 'brandDescription',
      title: 'Description',
      dataIndex: 'brandDescription',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBrandTableState, b: TBrandTableState) => a.brandDescription.localeCompare(b.brandDescription),

      ...getColumnSearchProps(brandSearchInput, 'brandDescription', 'Description'),
    },
    {
      key: 'brandAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBrandTableState) => {
        return (
          <>
            <div>
              <Button
                type="link"
                className="make__brand-btn--edit"
                onClick={() => {
                  onPopulateUpdateBrandModal(record);

                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, brand: true });
                }}
              >
                Edit
              </Button>
              <Button disabled type="link" danger>
                Delete
              </Button>
            </div>
            <div className="flex justify-conter">
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
                Create series
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
    {
      key: 'wheelbaseDescription',
      title: 'Description',
      dataIndex: 'wheelbaseDescription',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TWheelbaseTableState, b: TWheelbaseTableState) =>
        a.wheelbaseDescription.localeCompare(b.wheelbaseDescription),
      ...getColumnSearchProps(wheelbaseSearchInput, 'wheelbaseDescription', 'Description'),
    },
    {
      key: 'wheelbaseAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TWheelbaseTableState) => {
        return (
          <>
            <Button
              className="make__brand-btn--edit"
              type="link"
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
              Edit
            </Button>
            <Button disabled type="link" danger>
              Delete
            </Button>
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
            <Button
              className="make__brand-btn--edit"
              type="link"
              onClick={() => {
                // populate the editModalForm
                onPopulateupdateMakeModal(record);
                // show modal
                setShowUpdateModal({ ...showUpdateModal, make: true });
              }}
            >
              Edit
            </Button>
            <Button disabled type="link" danger>
              Delete
            </Button>
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
  const onPopulateupdateMakeModal = (record: TMakeTableState) => {
    // update the form value using the 'name' attribute as target/key
    // e.g. record.length = ("10 ' 11 '' ")-> splitting using " '" so we will get ["100"," 11","' "]
    let extractedHorsepower = '';
    let extractedPrice: number | null = null;
    let extractedGvw = '';
    let extractedLength = '';

    // replace units with empty strings
    extractedHorsepower = record.horsepower.replace('hp', '');
    extractedGvw = record.gvw.replace('kg', '');
    extractedLength = record.makeLength.replace('mm', '');
    if (record.price !== '') {
      extractedPrice = convertPriceToFloat(record.price);
    } else {
      extractedPrice = null;
    }

    // remember to set this form on the Form component
    updateMakeForm.setFieldsValue({
      makeId: record.makeId,
      makeBrandId: record.makeBrandId,
      makeWheelbaseId: record.makeWheelbaseId,
      gvw: extractedGvw,
      year: moment(record.year),
      price: extractedPrice,
      title: record.makeTitle,
      engine_cap: record.engine_cap,
      horsepower: extractedHorsepower,
      transmission: record.transmission,
      makeLength: extractedLength,
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

  const onCreateSeriesFinish = (values: any) => {
    console.log(values);
  };
  const onEditSeriesFinish = (values: any) => {
    console.log(values);
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

  /* ===================================== */
  // Make
  /* ===================================== */
  // Type for values from onCreateMakeFinish / onUpdateMakeFinish thats from the form
  type TCreateMakeFinishValues = {
    makeBrandId: string;
    makeWheelbaseId: string;
    gvw: string;
    year: string;
    price: string;
    title: string;
    engine_cap: string;
    horsepower: string;
    description: string;
    transmission: string;
    length: number;
    imageTag: string;
  };
  type TUpdateMakeFinishValues = {
    makeId: number;
    makeBrandId: string;
    makeWheelbaseId: string;
    gvw: string;
    year: string;
    price: string;
    title: string;
    engine_cap: string;
    horsepower: string;
    description: string;
    transmission: string;
    length: number;
    imageTag: string;
  };

  // Create Make
  const onCreateMakeFinish = (values: TCreateMakeFinishValues) => {
    // package the object
    let createMakeData: TCreateMakeData = {
      gvw: values.gvw,
      title: values.title,
      length: values.length,
      engine_cap: values.engine_cap,
      horsepower: values.horsepower,
      transmission: values.transmission,
      brand_id: values.makeBrandId.toString(),
      price: convertPriceToFloat(values.price),
      wheelbase_id: values.makeWheelbaseId.toString(),
      year: moment(values.year).year().toString(), //convert to year
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
    console.log(values.price);
    // package the object
    let updateMakeData: TUpdateMakeData = {
      make_id: values.makeId,
      gvw: values.gvw,
      title: values.title,
      length: values.length,
      engine_cap: values.engine_cap,
      horsepower: values.horsepower,
      transmission: values.transmission,
      brand_id: values.makeBrandId.toString(),
      price: convertPriceToFloat(values.price),
      wheelbase_id: values.makeWheelbaseId.toString(),
      year: moment(values.year).year().toString(), //convert to year
    };

    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onUpdateMake(updateMakeData, values.imageTag, uploadSelectedFiles);
    } else {
      onUpdateMake(updateMakeData, null, null);
    }
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
          style={{
            opacity: record.brandImages.length === 0 ? 0.3 : 1,
            pointerEvents: record.brandImages.length === 0 ? 'none' : 'auto',
          }}
          onClick={() => {
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
          style={{
            opacity: record.makeImages.length === 0 ? 0.3 : 1,
            pointerEvents: record.makeImages.length === 0 ? 'none' : 'auto',
          }}
          onClick={() => {
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
          <Tooltip trigger={['hover', 'click']} title="Click to hide images">
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
          <Tooltip trigger={['hover', 'click']} title="Click to view images">
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
              onPopulateupdateMakeModal(record);
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
        name="createBrand"
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
        name="editBrand"
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
        onFinish={onEditSeriesFinish}
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
        name="createWheelbase"
        onKeyDown={(e) => handleKeyDown(e, createWheelbaseForm)}
        onFinish={onCreateWheelbaseFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="wheelbaseTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input type="number" min={0} addonAfter={'mm'} placeholder="Type title here e.g. 3300" />
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
        name="editWheelbase"
        onKeyDown={(e) => handleKeyDown(e, updateWheelbaseForm)}
        onFinish={onEditWheelbaseFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="wheelbaseTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input type="number" min={0} addonAfter={'mm'} placeholder="Type title here e.g. 3300" />
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
          {/* ------- Wheelbase - value is Wheelbase id but display is Wheelbase name  -------*/}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Wheelbase"
            name="makeWheelbaseId"
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
          {/* ------- Length ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Length"
            name="makeLength"
            rules={[{ required: true, message: 'Input length (mm) here!' }]}
          >
            <Input type="number" min={0} addonAfter={'mm'} placeholder="Type length here" />
          </Form.Item>
          {/* ------- Series ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Series"
            name="makeSeries"
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
        </div>
        <div className="make__form-right">
          {/* ------- Transmission ------- */}
          <Form.Item
            className="make__form-item make__form-item--make"
            label="Transmission"
            name="transmission"
            rules={[{ required: false, message: 'Input Transmission here!' }]}
          >
            <Input placeholder="Type transmission here e.g. MT" />
          </Form.Item>
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
        name="createMake"
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
        name="editMake"
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
      let concatLength = make.length;
      let concatWheelbase = make.wheelbase.title + 'mm';
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
        concatLength +
        concatWheelbase +
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
      let makeYear = make.year === undefined || make.year === null ? moment().year().toString() : make.year;
      let makePrice =
        make.price === undefined || make.price === null || make.price === 0
          ? ''
          : 'RM' +
            make.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
      let makeTitle = make.title === undefined || make.title === null ? '' : make.title;
      let makeLength = make.length === undefined || make.length === null || make.length === 0 ? '' : make.length + 'mm';
      let makeEngineCap = make.engine_cap === undefined || make.engine_cap === null ? '' : make.engine_cap;
      let makeHorsepower =
        make.horsepower === undefined || make.horsepower === null || make.horsepower === ''
          ? ''
          : make.horsepower + 'hp';
      let makeTransmission = make.transmission === undefined || make.transmission === null ? '' : make.transmission;
      let makeBrandTitle = make.brand.title === undefined || make.brand.title === null ? '' : make.brand.title;
      let makeWheelbaseTitle =
        make.wheelbase.title === undefined || make.wheelbase.title === null ? '' : make.wheelbase.title + 'mm';
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
          makeLength: makeLength,
          makeTitle: makeTitle,
          available: make.available,
          engine_cap: makeEngineCap,
          horsepower: makeHorsepower,
          transmission: makeTransmission,
          makeDetails: detailsCombinedString,
          makeBrandId: make.brand.id,
          makeBrandTitle: makeBrandTitle,
          makeSeries: makeSeries,
          makeWheelbaseId: make.wheelbase.id,
          makeWheelbaseTitle: makeWheelbaseTitle,
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
      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, brand: false, wheelbase: false, make: false });
      setShowUpdateModal({ ...showUpdateModal, brand: false, wheelbase: false, make: false });
    }
  }, [
    showUpdateModal,
    setShowUpdateModal,
    createMakeForm,
    createBrandForm,
    createWheelbaseForm,
    showCreateModal,
    successMessage,
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

      <Layout>
        <NavbarComponent activePage="dashboard" />
        <LayoutComponent activeKey="make">
          <CustomContainer>
            <div className="make__tab-outerdiv">
              <section>
                <HeaderTitle>Model</HeaderTitle>

                {brandsArray && wheelbasesArray && makesArray ? (
                  <>
                    {/* ====================== */}
                    {/*     Brand Section      */}
                    {/* ====================== */}
                    <section className="make__section">
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
                        scroll={{ x: '89rem', y: 400 }}
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

                    {/* ====================== */}
                    {/*   Wheelbases Section   */}
                    {/* ====================== */}

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
                        scroll={{ x: '89rem', y: 300 }}
                        // components={components}
                        dataSource={wheelbaseTableState}
                        columns={convertHeader(wheelbaseColumn, setWheelbaseColumn)}
                        pagination={false}
                      />
                    </section>

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
                          expandedRowRender: (record: TMakeTableState) => onExpandedRowRender(record),
                        }}
                        // components={components}
                        dataSource={makeTableState}
                        columns={convertHeader(makeColumn, setMakeColumn)}
                        pagination={false}
                      />
                    </section>
                  </>
                ) : (
                  <div className="padding_t-5">
                    <Loading />
                  </div>
                )}
              </section>
            </div>
          </CustomContainer>
        </LayoutComponent>
      </Layout>
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
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  if ('dashboard' in state) {
    return {
      loading: state.dashboard.loading,
      makesArray: state.dashboard.makesArray,
      seriesArray: state.dashboard.seriesArray,
      brandsArray: state.dashboard.brandsArray,
      errorMessage: state.dashboard.errorMessage,
      imagesUploaded: state.dashboard.imagesUploaded,
      successMessage: state.dashboard.successMessage,
      wheelbasesArray: state.dashboard.wheelbasesArray,
    };
  }
};

interface DispatchProps {
  // Brand
  onGetBrands: typeof actions.getBrands;
  onCreateBrand: typeof actions.createBrand;
  onUpdateBrand: typeof actions.updateBrand;
  // Wheelbase
  onGetWheelbases: typeof actions.getWheelbases;
  onCreateWheelbase: typeof actions.createWheelbase;
  onUpdateWheelbase: typeof actions.updateWheelbase;
  // Make
  onGetMakes: typeof actions.getMakes;
  onCreateMake: typeof actions.createMake;
  onUpdateMake: typeof actions.updateMake;
  // Series
  onGetSeries: typeof actions.getSeries;
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
    // Wheelbase
    onGetWheelbases: () => dispatch(actions.getWheelbases()),
    onCreateWheelbase: (title, description) => dispatch(actions.createWheelbase(title, description)),
    onUpdateWheelbase: (wheelbase_id, title, description) =>
      dispatch(actions.updateWheelbase(wheelbase_id, title, description)),
    // Make
    onGetMakes: () => dispatch(actions.getMakes()),
    onCreateMake: (createMakeData, imageTag, uploadSelectedFiles) =>
      dispatch(actions.createMake(createMakeData, imageTag, uploadSelectedFiles)),
    onUpdateMake: (updateMakeData, imageTag, imageFiles) =>
      dispatch(actions.updateMake(updateMakeData, imageTag, imageFiles)),
    //  Series
    onGetSeries: (brand_id) => dispatch(actions.getSeries(brand_id)),
    // Image
    onDeleteUploadImage: (ids) => dispatch(actions.deleteUploadImage(ids)),
    // Miscellaneous
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Make);

import React, { useEffect, useState, ReactText } from 'react';
import './BodyMake.scss';
/*components*/
import Loading from 'src/components/Loading/Loading';
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import TableImageViewer from 'src/components/ImageRelated/TableImageViewer/TableImageViewer';
import PreviewUploadImage from 'src/components/ImageRelated/PreviewUploadImage/PreviewUploadImage';
import { TGalleryImageArrayObj } from 'src/components/ImageRelated/ImageGallery/ImageGallery';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import NumberFormat from 'react-number-format';
import { PlusCircleTwoTone, ExclamationCircleOutlined, MinusCircleTwoTone } from '@ant-design/icons';
/* Util */
import {
  checkInchExist,
  convertHeader,
  convertPriceToFloat,
  formatFeetInch,
  getColumnSearchProps,
  handleFormKeyDown,
  onClearAllSelectedImages,
  onPopulateImagesArray,
  onTableRowExpand,
  setFilterReference,
  unformatPriceString,
} from 'src/shared/Utils';
import {
  TCreateBodyMakeData,
  TUpdateBodyMakeData,
  TReceivedBodyObj,
  TReceivedImageObj,
  TReceivedLengthObj,
  TReceivedBodyMakeObj,
  TReceivedAccessoryObj,
  TReceivedMakeObj,
} from 'src/store/types/dashboard';
import { TMapStateToProps } from 'src/store/types';
import * as actions from 'src/store/actions/index';
import { img_not_available_link, img_loading_link } from 'src/shared/links';
import { Button, Form, Select, Input, Layout, notification, Table, Tag, Tooltip, Modal, Card, Carousel } from 'antd';

const { Option } = Select;
// const { TextArea } = Input;

interface bodyMakeProps {}

type TBodyMakeTableState = {
  key?: string;
  bodyObj: TReceivedBodyObj;
  makeObj: TReceivedMakeObj;
  bodyMakeId: number;
  bodyMakeDetails: string;
  bodyMakeWidth: string;
  bodyMakeHeight: string;
  bodyMakeDepth: string;
  bodyMakePrice: string;
  available?: boolean;
  bodyMakeImages: TReceivedImageObj[];
  bodyMakeAccessoriesArrayLength: number;
  bodyMakeAccessories: TReceivedAccessoryObj[] | null;
};

type TCreateBodyMakeForm = {
  lengthId: number; // length id
  bodyId: number; //body id
  makeId: number; //make id
  bodyMakeWidth: { feet: string; inch: string };
  bodyMakeHeight: { feet: string; inch: string };
  bodyMakeDepth: { feet: string; inch: string };
  bodyMakePrice: string;
  imageTag: string;
};
type TUpdateBodyMakeForm = {
  bodyId: number; //body id
  makeId: number; //make id
  bodyMakeId: number; //body make id
  bodyMakeWidth: { feet: string; inch: string };
  bodyMakeHeight: { feet: string; inch: string };
  bodyMakeDepth: { feet: string; inch: string };
  bodyMakePrice: string;
  imageTag: string;
};

type TShowModal = {
  body_make: boolean;
  body_make_accessory: boolean;
};

type TDeleteModalContent = {
  body_make: { body_make_id: number; makeObj: TReceivedMakeObj | null; bodyObj: TReceivedBodyObj | null };
};

type Props = bodyMakeProps & StateProps & DispatchProps;

const BodyMake: React.FC<Props> = ({
  loading,
  errorMessage,
  successMessage,
  makesArray,
  bodiesArray,
  lengthsArray,
  bodyMakesArray,
  onGetMakes,
  onGetBodies,
  onGetLengths,
  onGetBodyMakes,
  onCreateBodyMake,
  onUpdateBodyMake,
  onDeleteBodyMake,
  onDeleteUploadImage,
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  /* Form */
  const [createBodyMakeForm] = Form.useForm();
  const [updateBodyMakeForm] = Form.useForm();
  const [createBodyMakeAccessoryForm] = Form.useForm();
  const [updateBodyMakeAccessoryForm] = Form.useForm();
  /*  Table states */
  const [bodyMakeTableState, setBodyMakeTableState] = useState<TBodyMakeTableState[]>([]);

  /* ------------------------ */
  // Modal states
  /* ------------------------ */
  const [showCreateModal, setShowCreateModal] = useState<TShowModal>({
    body_make: false,
    body_make_accessory: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<TShowModal>({
    body_make: false,
    body_make_accessory: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<TShowModal>({
    body_make: false,
    body_make_accessory: false,
  });

  // this state to keep track of what to show on delete modal and what useful info to pass
  const [deleteModalContent, setDeleteModalContent] = useState<TDeleteModalContent>({
    body_make: { body_make_id: -1, makeObj: null, bodyObj: null },
  });

  // for table search input
  let bodyMakeSearchInput = null; //this is for filter on antd table
  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });
  setFilterReference(filterData, setFilterData);

  /* ------------------------ */
  /*   Image related states   */
  /* ------------------------ */
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
  // For populating images
  const [galleryImages, setGalleryImages] = useState<TGalleryImageArrayObj[]>([]);

  // store table header definition in state
  /* 
  containing objects of arrays
  bodyMake[]
  */

  /* Body Make column initialization */
  const [bodyMakeColumns, setbodyMakeColumns] = useState([
    {
      key: 'bodyMakeModelDetails',
      title: 'Option Details',
      dataIndex: 'bodyMakeModelDetails',
      className: 'body__table-header--title',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBodyMakeTableState, b: TBodyMakeTableState) => a.bodyMakeDetails.localeCompare(b.bodyMakeDetails),
      ...getColumnSearchProps(bodyMakeSearchInput, 'bodyMakeDetails', 'Model Details'),
      render: (_text: any, record: TBodyMakeTableState) => {
        let modelDetailsArray = [
          { title: 'Brand', content: record.makeObj.brand.title },
          { title: 'Model', content: record.makeObj.title },
          { title: 'Series', content: record.makeObj.series },
          { title: 'Body', content: record.bodyObj.title },
        ];
        return (
          <>
            <div>
              {modelDetailsArray.map((detail) => (
                <div className="flex-align-center" key={uuidv4()}>
                  <div className="bodymake__details-left">
                    {/* if its gvw, all uppercase, for others only capitalize the first letter */}
                    <span className="bodymake__details-category">{detail.title}</span>
                  </div>
                  :<div className="bodymake__details-right">{detail.content}</div>
                </div>
              ))}
            </div>
          </>
        );
      },
    },
    {
      key: 'bodyMakePrice',
      title: 'Price',
      dataIndex: 'bodyMakePrice',
      ellipsis: true,
      width: '15rem',
      sorter: (a: TBodyMakeTableState, b: TBodyMakeTableState) => a.bodyMakePrice.localeCompare(b.bodyMakePrice),
      ...getColumnSearchProps(bodyMakeSearchInput, 'bodyMakePrice', 'Price'),
    },
    {
      key: 'bodyMakeDimension',
      title: 'Dimension',
      dataIndex: 'bodyMakeDimension',
      ellipsis: true,
      width: 'auto',
      render: (_text: any, record: TBodyMakeTableState) => {
        return (
          <>
            <div className="body__tag-outerdiv">
              <div className="body__tag-div">
                <Tag className="body__tag" color="red">
                  <div className="body__tag-title">Width</div>
                  <div className="body__tag-values">
                    <div className="body__tag-colon">:</div> <div>{record.bodyMakeWidth}</div>
                  </div>
                </Tag>
              </div>
              <div className="body__tag-div">
                <Tag className="body__tag" color="blue">
                  <div className="body__tag-title">Depth</div>
                  <div className="body__tag-values">
                    <div className="body__tag-colon">:</div> <div>{record.bodyMakeDepth}</div>
                  </div>
                </Tag>
              </div>
              <div className="body__tag-div">
                <Tag className="body__tag" color="cyan">
                  <div className="body__tag-title">Height</div>
                  <div className="body__tag-values">
                    <div className="body__tag-colon">:</div> <div>{record.bodyMakeHeight}</div>
                  </div>
                </Tag>
              </div>
            </div>
          </>
        );
      },
    },

    {
      key: 'bodyMakeAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBodyMakeTableState) => {
        return (
          <>
            <div className="bodymake__btn-div">
              <Button
                type="link"
                className="bodymake__btn-link"
                onClick={() => {
                  // populate bodyMake modal
                  onPopulateEditbodyMakeModal(record);
                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, body_make: true });
                }}
              >
                <i className="far fa-edit"></i>
              </Button>
              <Button
                type="link"
                className="bodymake__btn-link"
                onClick={() => {
                  alert('disable - supposed to set available to false');
                }}
              >
                <i className="fas fa-eye-slash"></i>
              </Button>
              <Button
                type="link"
                danger
                className="bodymake__btn-link--danger"
                onClick={() => {
                  setShowDeleteModal({ ...showDeleteModal, body_make: true });
                  setDeleteModalContent({
                    ...deleteModalContent,
                    body_make: { body_make_id: record.bodyMakeId, makeObj: record.makeObj, bodyObj: record.bodyObj },
                  });
                }}
              >
                <i className="far fa-trash-alt"></i>
              </Button>
            </div>
            <div>
              <Button
                type="default"
                onClick={() => {
                  setShowCreateModal({ ...showCreateModal, body_make_accessory: true });
                  //  set the body make id
                  createBodyMakeAccessoryForm.setFieldsValue({ bodyMakeId: record.bodyMakeId });
                }}
              >
                Create Accessory
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
   * This function takes in the record of the current row of the table
   * and then reformat the important information and pass into the current modal / form
   * @param {TBodyMakeTableState} record
   */
  const onPopulateEditbodyMakeModal = (record: TBodyMakeTableState) => {
    let formattedPrice = '';
    formattedPrice = record.bodyMakePrice.replace('RM', '');
    formattedPrice = unformatPriceString(formattedPrice).toString();

    // update the form value using the 'name' attribute as target/key
    updateBodyMakeForm.setFieldsValue({
      makeId: record.makeObj.id,
      bodyId: record.bodyObj.id, // body id
      bodyMakeId: record.bodyMakeId, // length id
      bodyMakeWidth: {
        feet: checkInchExist(record.bodyMakeWidth).feet,
        inch: checkInchExist(record.bodyMakeWidth).inch,
      },
      bodyMakeHeight: {
        feet: checkInchExist(record.bodyMakeHeight).feet,
        inch: checkInchExist(record.bodyMakeHeight).inch,
      },
      bodyMakeDepth: {
        feet: checkInchExist(record.bodyMakeDepth).feet,
        inch: checkInchExist(record.bodyMakeDepth).inch,
      },
      bodyMakePrice: formattedPrice,
    });
  };

  /**
   *
   * Helper function to render expand icons for different tables
   * @param {boolean} expanded
   * @param {(TBodyTableState)} record
   * @return {*}
   */
  const onExpandIcon = (expanded: boolean, record: TBodyMakeTableState) => {
    let expandImageGalleryButton = null;
    let tooltipIconsText = { plusIcon: '', minusIcon: '' };

    if ('bodyMakeImages' in record && 'bodyMakeId' in record) {
      expandImageGalleryButton = (
        <PlusCircleTwoTone
          style={{
            opacity: record.bodyMakeImages.length === 0 ? 0.3 : 1,
            pointerEvents: record.bodyMakeImages.length === 0 ? 'none' : 'auto',
          }}
          onClick={() => {
            // this allow only 1 row to expand at a time
            onTableRowExpand(expanded, record, setExpandedRowKeys);
            // this closes all the edit image gallery when user expand other row
            // clearing out all the booleans
            setShowEditImageGallery({});
            // this function is passed to imageGallery
            //  it will simply uncheck everything
            onClearAllSelectedImages(selectAllChecked, setSelectAllChecked, galleryImages, setGalleryImages);
            // populate image array state and pass to ImageGallery component
            onPopulateImagesArray(record.bodyMakeImages, setGalleryImages);
          }}
        />
      );
      // when showing plus, text should be click to show, vice versa
      tooltipIconsText.plusIcon = 'Click to show images';
      tooltipIconsText.minusIcon = 'Click to hide images';
    }

    return (
      <>
        {expanded ? (
          <Tooltip trigger={['hover', 'click']} title={tooltipIconsText.minusIcon}>
            <MinusCircleTwoTone
              onClick={() => {
                onTableRowExpand(expanded, record, setExpandedRowKeys);
                // this function is passed to imageGallery
                //  it will simply uncheck everything
                onClearAllSelectedImages(selectAllChecked, setSelectAllChecked, galleryImages, setGalleryImages);
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip trigger={['hover', 'click']} title={tooltipIconsText.plusIcon}>
            {expandImageGalleryButton}
          </Tooltip>
        )}
      </>
    );
  };

  const onExpandedRowRender = (record: TBodyMakeTableState) => {
    let tableName: string = '';
    let tableSpecificId: number = -1;
    let recordImageArray: TReceivedImageObj[] = [];

    if ('bodyMakeImages' in record && 'bodyMakeId' in record) {
      recordImageArray = record.bodyMakeImages;
      tableSpecificId = record.bodyMakeId;
      tableName = 'body_make';
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
            if ('bodyMakeImages' in record && 'bodyMakeId' in record) {
              onPopulateEditbodyMakeModal(record);
            }
          }}
        />
      </>
    );
  };

  /* ------------------------------------------- */
  // Forms onfinish methods
  /* ------------------------------------------- */

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
      body_make_id: values.bodyMakeId,
      body_id: values.bodyId,
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
  /* ====================================================== */
  // components
  /* ====================================================== */
  /* ---------------------------- */
  // Body Make
  /* ---------------------------- */
  /* Body Make Form Items*/
  let bodyMakeFormItems = (
    <>
      {/* ------- Make/Model - value is make id but display is make title -------*/}
      <Form.Item
        className="make__form-item"
        label="Model"
        name="makeId"
        style={{ marginBottom: '0.8rem' }}
        rules={[{ required: true, message: 'Select a Model!' }]}
      >
        {/* only render if bodiesArray is not null */}
        <Select
          showSearch
          placeholder="Select a Body"
          optionFilterProp="children"
          className="body__select-updatebodyMake"
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {makesArray &&
            makesArray.map((make) => {
              return (
                <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={make.id}>
                  {`${make.brand.title} ${make.title} ${make.series}`}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      {/* ------- Body - value is brand id but display is brand name -------*/}
      <Form.Item
        className="make__form-item"
        label="Body"
        name="bodyId"
        rules={[{ required: true, message: 'Select a Body!' }]}
      >
        {/* only render if bodiesArray is not null */}
        <Select
          showSearch
          placeholder="Select a Body"
          optionFilterProp="children"
          className="body__select-updatebodyMake"
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {bodiesArray &&
            bodiesArray
              .sort((a: TReceivedBodyObj, b: TReceivedBodyObj) => a.title.localeCompare(b.title))
              .map((body) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={body.id}>
                    {`${body.title} ${body.description ? `(${body.description})` : ''}`}
                  </Option>
                );
              })}
        </Select>
      </Form.Item>
      {/* Dimensions */}
      <div style={{ marginBottom: '1rem' }}>Dimensions - W x H x D</div>
      {/* Body Length Width */}
      <div className="flex">
        <Form.Item
          className="make__form-item body__item margin_r-1"
          label="Width"
          name={['bodyMakeWidth', 'feet']}
          rules={[{ required: false, message: 'Input ft here!' }]}
          style={{ width: '62%' }}
        >
          {/* width - ft */}
          <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
        </Form.Item>

        <Form.Item
          className="make__form-item--make body__item make__form-item--inch"
          name={['bodyMakeWidth', 'inch']}
          rules={[{ required: false, message: 'Input inch here!' }]}
          style={{ width: '38%' }}
        >
          {/* height - inch */}
          <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
        </Form.Item>
      </div>
      {/* Body Length Height */}
      <div className="flex">
        <Form.Item
          className="make__form-item body__item margin_r-1"
          label="Height"
          name={['bodyMakeHeight', 'feet']}
          rules={[{ required: false, message: 'Input ft here!' }]}
          style={{ width: '62%' }}
        >
          {/* height - ft */}
          <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
        </Form.Item>

        <Form.Item
          className="make__form-item--make body__item make__form-item--inch"
          name={['bodyMakeHeight', 'inch']}
          rules={[{ required: false, message: 'Input inch here!' }]}
          style={{ width: '38%' }}
        >
          {/* height - inch */}
          <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
        </Form.Item>
      </div>
      {/* Body Length Depth */}
      <div className="flex">
        <Form.Item
          className="make__form-item margin_r-1"
          label="Depth"
          name={['bodyMakeDepth', 'feet']}
          rules={[{ required: false, message: 'Input ft here!' }]}
          style={{ width: '62%' }}
        >
          {/* height - ft */}
          <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
        </Form.Item>

        <Form.Item
          className="make__form-item--make make__form-item--inch"
          name={['bodyMakeDepth', 'inch']}
          rules={[{ required: false, message: 'Input inch here!' }]}
          style={{ width: '38%' }}
        >
          {/* height - inch */}
          <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
        </Form.Item>
      </div>
      <Form.Item
        className="make__form-item"
        label="Price"
        name="bodyMakePrice"
        rules={[{ required: false, message: 'Input price here!' }]}
      >
        <NumberFormat className="ant-input" placeholder="Type price here" thousandSeparator={true} prefix={'RM '} />
      </Form.Item>
      <PreviewUploadImage
        setUploadSelectedFiles={setUploadSelectedFiles}
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
      />
    </>
  );

  /* Create Body Make Form  */
  let createBodyMakeFormComponent = (
    <>
      <Form
        form={createBodyMakeForm}
        name="createBodyMake"
        onKeyDown={(e) => handleFormKeyDown(e, createBodyMakeForm)}
        onFinish={onCreateBodyMakeFinish}
      >
        {/* ------- Length - value is brand id but display is brand name -------*/}
        <Form.Item
          className="make__form-item"
          label="Length"
          name="lengthId"
          style={{ marginBottom: '0.8rem' }}
          rules={[{ required: true, message: 'Select a Length!' }]}
        >
          {/* only render if lengthsArray is not null */}
          <Select
            showSearch
            placeholder="Select a length"
            optionFilterProp="children"
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {lengthsArray &&
              lengthsArray.map((length) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={length.id}>
                    {length.title}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        {/* reuse the component */}
        {bodyMakeFormItems}
      </Form>
    </>
  );

  /* Create Body Length Modal */
  let createBodyMakeModal = (
    <Modal
      centered
      title="Create Body Make"
      visible={showCreateModal.body_make}
      onOk={createBodyMakeForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createBodyMakeForm.resetFields();
        setShowCreateModal({ ...showCreateModal, body_make: false }); //close modal on cancel
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {createBodyMakeFormComponent}
    </Modal>
  );

  /* ----------------------------------------- */
  /* Edit/Update Body Length Form */
  let updateBodyMakeFormComponent = (
    <>
      <Form
        form={updateBodyMakeForm}
        name="createBodyMake"
        onKeyDown={(e) => handleFormKeyDown(e, updateBodyMakeForm)}
        onFinish={onUpdateBodyMakeFinish}
      >
        {/* reuse form items */}
        {bodyMakeFormItems}
        {/* Getting the BODY MAKE ID */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="bodyMakeId"
          hidden
          rules={[{ required: true, message: 'Get body make id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Body Length Modal */
  let updateBodyMakeModal = (
    <Modal
      centered
      title="Edit Body Make"
      visible={showUpdateModal.body_make}
      onOk={updateBodyMakeForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowUpdateModal({
          ...showUpdateModal,
          body_make: false,
        });
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {updateBodyMakeFormComponent}
    </Modal>
  );

  /* =================================== */
  /* Body make accessory expanded component*/
  /* =================================== */
  const renderBodyMakeAccessoriesCardsComponent = (record: TBodyMakeTableState) => {
    return (
      <>
        {record.bodyMakeAccessoriesArrayLength > 0 && (
          //  only show this when length of body accesosry array is greater than 0
          <>
            <div>
              Attachable accessories for&nbsp;
              <span style={{ textTransform: 'capitalize' }}>
                {record.makeObj.brand.title} {record.makeObj.series} {record.bodyObj.title}
              </span>
              :&nbsp;
              <span className="body__expand-available">{record.bodyMakeAccessoriesArrayLength} available</span>
            </div>
            <hr />
          </>
        )}
        <div className="body__expand-outerdiv">
          {record.bodyMakeAccessories && (
            <>
              {/* if no accessory then show nothing */}
              {record.bodyMakeAccessoriesArrayLength === 0
                ? null
                : record.bodyMakeAccessories.map((bodyMakeAccessory) => {
                    if (bodyMakeAccessory.available) {
                      return (
                        <Card
                          key={uuidv4()}
                          className="body__expand-card"
                          title={
                            <div className="body__expand-card-title-div">
                              <span className="body__expand-card-title">{bodyMakeAccessory.title}</span>
                              <Tag color="geekblue" style={{ marginRight: 0 }}>
                                RM{bodyMakeAccessory.price}
                              </Tag>
                            </div>
                          }
                          size="small"
                          style={{ width: 'auto' }}
                          headStyle={{ background: '#FFF2E8' }}
                        >
                          {bodyMakeAccessory.images ? (
                            <>
                              <Carousel autoplay>
                                {/* render all images if array more than 0 else render 'image not available' image */}
                                {bodyMakeAccessory.images.length > 0 ? (
                                  bodyMakeAccessory.images.map((image) => {
                                    return (
                                      <React.Fragment key={uuidv4()}>
                                        <LazyLoad
                                          placeholder={
                                            <img
                                              className="body__expand-card-img"
                                              alt="loading"
                                              src={img_loading_link}
                                            />
                                          }
                                        >
                                          <img
                                            className="body__expand-card-img"
                                            key={image.id}
                                            alt={image.filename}
                                            src={image.url}
                                          />
                                        </LazyLoad>
                                      </React.Fragment>
                                    );
                                  })
                                ) : (
                                  <img className="body__expand-card-img" alt="test" src={img_not_available_link} />
                                )}
                              </Carousel>
                            </>
                          ) : (
                            <img className="body__expand-card-img" alt="test" src={img_not_available_link} />
                          )}
                          <div className="body__expand-card-body">
                            <section className="body__expand-card-btn-section">
                              <div className="body__expand-card-btn-div">
                                <div>
                                  <Button
                                    className="body__expand-card-btn-edit"
                                    style={{ padding: 0 }}
                                    type="link"
                                    onClick={() => {
                                      // show the update modal
                                      setShowUpdateModal({ ...showUpdateModal, body_make_accessory: true });
                                      // fill in the updateBodyAccessoryform
                                      // updateBodyMakeAccessoryForm.setFieldsValue({
                                      //   bodyAccessoryId: bodyAccessory.id, //the id for update
                                      //   accessoryId: bodyAccessory.accessory.id,
                                      //   bodyAccessoryPrice: bodyAccessory.accessory.price,
                                      //   bodyAccessoryDescription: bodyAccessory.body_length.body.description,
                                      //   bodyMakeId: bodyAccessory.body_length.id,
                                      // });
                                      alert('open up a modal!');
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button disabled type="link" danger style={{ padding: 0 }}>
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </section>
                          </div>
                        </Card>
                      );
                    }
                    return <></>;
                  })}
            </>
          )}
        </div>
      </>
    );
  };

  /* ==================================== */
  // Body Make Accessory Form Items
  /* ==================================== */
  let bodyMakeAccessoryFormItems = (
    <>
      <Form.Item
        className="make__form-item"
        label="Model"
        name="makeId"
        style={{ marginBottom: '0.8rem' }}
        rules={[{ required: true, message: 'Select a Model!' }]}
      >
        {/* only render if bodiesArray is not null */}
        <Select
          showSearch
          placeholder="Select a Body"
          optionFilterProp="children"
          className="body__select-updatebodyMake"
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {makesArray &&
            makesArray.map((make) => {
              return (
                <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={make.id}>
                  {`${make.brand.title} ${make.title} ${make.series}`}
                </Option>
              );
            })}
        </Select>
      </Form.Item>

      {/* Body Make ID */}
      <Form.Item
        className="make__form-item"
        label="id"
        name="bodyMakeId"
        hidden
        rules={[{ required: true, message: 'Get body make id!' }]}
      >
        <Input />
      </Form.Item>
    </>
  );

  /* ----------------------------------------- */
  /* Create Body Make Accessory Form */
  /* ----------------------------------------- */
  let createBodyMakeAccessoryFormComponent = (
    <>
      <Form
        form={createBodyMakeAccessoryForm}
        name="createBodyMakeAccessory"
        onKeyDown={(e) => handleFormKeyDown(e, createBodyMakeAccessoryForm)}
        onFinish={onUpdateBodyMakeFinish}
      >
        {/* reuse form items */}
        {bodyMakeAccessoryFormItems}
      </Form>
    </>
  );

  /* ======================================== */
  // Create Body Make Accessory Modal
  /* ======================================== */
  /* Create Body Make Accessory Modal */
  let createBodyMakeAccessoryModal = (
    <Modal
      centered
      title="Create Body Make Accessory"
      visible={showCreateModal.body_make_accessory}
      onOk={createBodyMakeAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowCreateModal({
          ...showCreateModal,
          body_make_accessory: false,
        });
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {createBodyMakeAccessoryFormComponent}
    </Modal>
  );

  /* ----------------------------------------- */
  /* Update Body Make Accessory Form */
  /* ----------------------------------------- */
  let updateBodyMakeAccessoryFormComponent = (
    <>
      <Form
        form={updateBodyMakeAccessoryForm}
        name="updateBodyMakeAccessory"
        onKeyDown={(e) => handleFormKeyDown(e, updateBodyMakeAccessoryForm)}
        onFinish={onUpdateBodyMakeFinish}
      >
        {/* reuse form items */}
        {bodyMakeAccessoryFormItems}
        {/* Getting the Body Make Accessory ID */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="bodyMakeAccessoryId"
          hidden
          rules={[{ required: true, message: 'Get body make accessory id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* ----------------------------------------- */
  /* Update Body Make Accessory Modal */
  /* ----------------------------------------- */
  let updateBodyMakeAccessoryModal = (
    <Modal
      centered
      title="Update Body Make Accessory"
      visible={showUpdateModal.body_make_accessory}
      onOk={updateBodyMakeAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowUpdateModal({
          ...showUpdateModal,
          body_make_accessory: false,
        });
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {updateBodyMakeAccessoryFormComponent}
    </Modal>
  );

  /* ================================== */
  //  Delete Body Make Modal
  /* ================================== */
  let deleteBodyMakeModal = (
    <Modal
      title={
        <div className="bodymake__delete-header">
          <ExclamationCircleOutlined className="bodymake__delete-icon" />
          Delete Body Make
        </div>
      }
      visible={showDeleteModal.body_make}
      onOk={() => onDeleteBodyMake(deleteModalContent.body_make.body_make_id)}
      onCancel={() => setShowDeleteModal({ ...showDeleteModal, body_make: false })}
      okText="Yes, delete it"
      confirmLoading={loading}
      cancelText="Cancel"
    >
      You are deleting
      {deleteModalContent.body_make.makeObj === null && deleteModalContent.body_make.bodyObj === null ? (
        ' this body make'
      ) : (
        <span className="bodymake__delete-message">
          {` ${deleteModalContent.body_make.makeObj?.brand.title} ${deleteModalContent.body_make.makeObj?.title} ${deleteModalContent.body_make.bodyObj?.title}`}
        </span>
      )}
      , this action is permanent. Are you sure?
    </Modal>
  );

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */

  // get body makes api call
  useEffect(() => {
    onGetBodyMakes();
  }, [onGetBodyMakes]);
  useEffect(() => {
    onGetLengths();
  }, [onGetLengths]);
  useEffect(() => {
    onGetMakes();
  }, [onGetMakes]);
  useEffect(() => {
    onGetBodies();
  }, [onGetBodies]);

  /* ------------------------------------------------------------ */
  // initialize/populate the state of data array for BODY LENGTH
  /* ------------------------------------------------------------ */

  useEffect(() => {
    let tempArray: TBodyMakeTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (bodyMake: TReceivedBodyMakeObj) => {
      // only render when available value is true
      let formattedPrice =
        bodyMake.price === undefined || bodyMake.price === null || bodyMake.price === 0
          ? '-'
          : 'RM ' +
            bodyMake.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

      // for filter
      let bodyMakeDetails =
        bodyMake.make.brand.title + bodyMake.make.title + bodyMake.make.series + bodyMake.body.title;

      let body_make_height = bodyMake.height ? bodyMake.height : ' -';
      let body_make_width = bodyMake.width ? bodyMake.width : ' -';
      let body_make_depth = bodyMake.depth ? bodyMake.depth : ' -';

      if (bodyMake.available && bodyMakesArray) {
        tempArray.push({
          key: uuidv4(),
          bodyMakeId: bodyMake.id,
          bodyObj: bodyMake.body,
          makeObj: bodyMake.make,
          bodyMakeDetails: bodyMakeDetails,
          bodyMakeWidth: body_make_width,
          bodyMakeHeight: body_make_height,
          bodyMakeDepth: body_make_depth,
          bodyMakePrice: formattedPrice,
          bodyMakeAccessories: bodyMake.body_make_accessories, //pass the bodyaccessory array
          bodyMakeAccessoriesArrayLength: bodyMake.body_make_accessories.length, //pass in the body make accessory array length for rowSpan
          available: bodyMake.available,
          bodyMakeImages: bodyMake.images,
        });
      }
    };

    if (bodyMakesArray) {
      // Execute function "storeValue" for every array index
      bodyMakesArray.map(storeValue);
    }
    // update the state with tempArray
    setBodyMakeTableState(tempArray);
  }, [bodyMakesArray]);

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
      createBodyMakeForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, body_make: false });
      setShowUpdateModal({ ...showUpdateModal, body_make: false });
      setShowDeleteModal({ ...showDeleteModal, body_make: false });
    }
  }, [
    successMessage,
    showUpdateModal,
    showCreateModal,
    showDeleteModal,
    createBodyMakeForm,
    onClearDashboardState,
    setShowUpdateModal,
    setShowCreateModal,
    setShowDeleteModal,
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

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* ================== */}
      {/*       Modals       */}
      {/* ================== */}
      {createBodyMakeModal}
      {updateBodyMakeModal}
      {deleteBodyMakeModal}
      {createBodyMakeAccessoryModal}
      {updateBodyMakeAccessoryModal}

      <Layout style={{ overflow: 'hidden' }}>
        <NavbarComponent activePage="dashboard" />
        <LayoutComponent>
          <CustomContainer>
            <div className="body__tab-outerdiv">
              <section>
                <HeaderTitle>Vehicle Option</HeaderTitle>
                {bodyMakesArray ? (
                  <>
                    {/* ===================================== */}
                    {/*         Body Make Section           */}
                    {/* ===================================== */}
                    <section className="make__section">
                      <div className="make__header-div ">
                        <div className="make__header-title">Body Make</div>
                        <Button
                          type="primary"
                          className="make__brand-btn"
                          onClick={() => setShowCreateModal({ ...showCreateModal, body_make: true })}
                        >
                          Create Body Make
                        </Button>
                      </div>
                      {/* ----------------------- */}
                      {/*    Body Make Table    */}
                      {/* ----------------------- */}
                      <Table
                        bordered
                        className="body__table"
                        scroll={{ x: '89rem', y: 600 }}
                        dataSource={bodyMakeTableState}
                        expandedRowKeys={expandedRowKeys}
                        onExpand={(expanded: boolean, record: TBodyMakeTableState) =>
                          onTableRowExpand(expanded, record, setExpandedRowKeys)
                        }
                        expandable={{
                          expandIcon: ({ expanded, record }) => onExpandIcon(expanded, record),
                          expandedRowRender: (record: TBodyMakeTableState) => {
                            let bodyMakeAccessoriesCards = renderBodyMakeAccessoriesCardsComponent(record);
                            let imageGalleryComponent = onExpandedRowRender(record);
                            return (
                              <>
                                <div style={{ marginBottom: record.bodyMakeImages.length > 0 ? '2rem' : 'none' }}>
                                  {bodyMakeAccessoriesCards}
                                </div>
                                {imageGalleryComponent}
                              </>
                            );
                          },
                        }}
                        columns={convertHeader(bodyMakeColumns, setbodyMakeColumns)}
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
  errorMessage?: string | null;
  successMessage?: string | null;
  makesArray?: TReceivedMakeObj[] | null;
  bodiesArray?: TReceivedBodyObj[] | null;
  lengthsArray?: TReceivedLengthObj[] | null;
  bodyMakesArray?: TReceivedBodyMakeObj[] | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  if ('dashboard' in state) {
    return {
      loading: state.dashboard.loading,
      errorMessage: state.dashboard.errorMessage,
      successMessage: state.dashboard.successMessage,
      makesArray: state.dashboard.makesArray,
      bodiesArray: state.dashboard.bodiesArray,
      lengthsArray: state.dashboard.lengthsArray,
      bodyMakesArray: state.dashboard.bodyMakesArray,
    };
  }
};
interface DispatchProps {
  // Make
  onGetMakes: typeof actions.getMakes;
  // Body
  onGetBodies: typeof actions.getBodies;
  // Length
  onGetLengths: typeof actions.getLengths;
  // Body Make
  onGetBodyMakes: typeof actions.getBodyMakes;
  onCreateBodyMake: typeof actions.createBodyMake;
  onUpdateBodyMake: typeof actions.updateBodyMake;
  onDeleteBodyMake: typeof actions.deleteBodyMake;
  // Images
  onDeleteUploadImage: typeof actions.deleteUploadImage;
  // Miscellaneous
  onClearDashboardState: typeof actions.clearDashboardState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetMakes: () => dispatch(actions.getMakes()),
    onGetBodies: () => dispatch(actions.getBodies()),
    onGetLengths: () => dispatch(actions.getLengths()),
    // Body Make
    onGetBodyMakes: () => dispatch(actions.getBodyMakes()),
    onCreateBodyMake: (createBodyMakeData, imageTag, imageFiles) =>
      dispatch(actions.createBodyMake(createBodyMakeData, imageTag, imageFiles)),
    onUpdateBodyMake: (updateBodyMakeData, imageTag, imageFiles) =>
      dispatch(actions.updateBodyMake(updateBodyMakeData, imageTag, imageFiles)),
    onDeleteBodyMake: (body_make_id) => dispatch(actions.deleteBodyMake(body_make_id)),
    // Image
    onDeleteUploadImage: (ids) => dispatch(actions.deleteUploadImage(ids)),
    // Miscellaneous
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BodyMake);

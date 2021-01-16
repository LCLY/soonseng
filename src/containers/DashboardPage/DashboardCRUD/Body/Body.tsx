import React, { useEffect, useState, ReactText } from 'react';
import './Body.scss';
/*components*/
import Footer from 'src/components/Footer/Footer';
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
import TableImageViewer from 'src/components/ImageRelated/TableImageViewer/TableImageViewer';
import PreviewUploadImage from 'src/components/ImageRelated/PreviewUploadImage/PreviewUploadImage';
import { TGalleryImageArrayObj } from 'src/components/ImageRelated/ImageGallery/ImageGallery';
/*3rd party lib*/
import {
  Button,
  Form,
  Input,
  Layout,
  Modal,
  Select,
  Table,
  Tag,
  Tooltip,
  notification,
  Checkbox,
  Skeleton,
  Card,
  Carousel,
} from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import { AnyAction, Dispatch } from 'redux';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { img_not_available_link, img_loading_link } from 'src/shared/links';
import { PlusCircleTwoTone, ExclamationCircleOutlined, MinusCircleTwoTone } from '@ant-design/icons';
/* Util */
import {
  TReceivedAccessoryObj,
  TReceivedBodyAccessoryObj,
  TReceivedBodyObj,
  TReceivedImageObj,
  TReceivedLengthObj,
} from 'src/store/types/dashboard';
import { RootState } from 'src';
import {
  convertHeader,
  getColumnSearchProps,
  onClearAllSelectedImages,
  onTableRowExpand,
  setFilterReference,
} from 'src/shared/Utils';
import holy5truck from 'src/img/5trucks.jpg';
import * as actions from 'src/store/actions/index';

const { Option } = Select;
const { TextArea } = Input;

interface BodyProps {}

type TBodyTableState = {
  key?: string;
  bodyId: number; //for update
  bodyTitle: string;
  bodyDescription: string;
  available?: boolean;
  bodyImages: TReceivedImageObj[];
};
type TLengthTableState = {
  key?: string;
  lengthId: number; //for update
  lengthTitle: string;
  lengthDescription: CheckboxValueType[] | string;
  available?: boolean;
};

type TShowModal = {
  body: boolean;
  length: boolean;
  body_accessory: boolean;
};

type TDeleteModalContent = {
  body: { body_id: number; bodyTitle: string };
  length: { length_id: number; lengthTitle: string };
  body_accessory: { body_id: number; body_accessory_id: number; accessoryTitle: string };
};

type Props = BodyProps & StateProps & DispatchProps;

const Body: React.FC<Props> = ({
  // miscellaneous
  loading,
  errorMessage,
  successMessage,
  // body
  bodiesArray,
  onGetBodies,
  onUpdateBody,
  onCreateBody,
  onDeleteBody,
  // length
  lengthsArray,
  onGetLengths,
  onUpdateLength,
  onCreateLength,
  onDeleteLength,
  // body accessory
  bodyAccessoriesArray,
  bodyAssociatedAccessoriesArray,
  onGetBodyAccessories,
  onCreateBodyAccessory,
  // onUpdateBodyAccessory,
  onDeleteBodyAccessory,
  onGetBodyAssociatedAccessories,
  // onClearBodyAccessoryArray,
  // delete upload iamges
  onDeleteUploadImage,
  // clear states
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // ref for forms
  /* body */
  const [createBodyForm] = Form.useForm();
  const [updateBodyForm] = Form.useForm();
  /* length */
  const [createLengthForm] = Form.useForm();
  const [updateLengthForm] = Form.useForm();

  /* bodyAccessories */
  const [createBodyAccessoryForm] = Form.useForm();
  // const [updateBodyAccessoryForm] = Form.useForm();

  // const { width } = useWindowDimensions();

  // Table states
  const [bodyTableState, setBodyTableState] = useState<TBodyTableState[]>([]);
  const [lengthTableState, setLengthTableState] = useState<TLengthTableState[]>([]);

  let bodySearchInput = null; //this is for filter on antd table
  let lengthSearchInput = null; //this is for filter on antd table
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
  /* ------------------------ */
  // Modal states
  /* ------------------------ */
  const [showCreateModal, setShowCreateModal] = useState<TShowModal>({
    body: false,
    length: false,
    body_accessory: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<TShowModal>({
    body: false,
    length: false,
    body_accessory: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<TShowModal>({
    body: false,
    length: false,
    body_accessory: false,
  });

  // this state to keep track of what to show on delete modal and what useful info to pass
  const [deleteModalContent, setDeleteModalContent] = useState<TDeleteModalContent>({
    body: { body_id: -1, bodyTitle: '' },
    length: { length_id: -1, lengthTitle: '' },
    body_accessory: { body_id: -1, body_accessory_id: -1, accessoryTitle: '' },
  });

  // store table header definition in state
  /**
   * containing objects of arrays
   * body[], length[]
   **/

  /* Body column initialization */
  const [bodyColumns, setBodyColumns] = useState([
    {
      key: 'bodyTitle',
      title: 'Title',
      dataIndex: 'bodyTitle',
      width: '30rem',
      ellipsis: true,
      className: 'body__table-header--title',
      sorter: (a: TBodyTableState, b: TBodyTableState) => a.bodyTitle.localeCompare(b.bodyTitle),
      ...getColumnSearchProps(bodySearchInput, 'bodyTitle', 'Title'),
    },
    {
      key: 'bodyDescription',
      title: 'Description',
      dataIndex: 'bodyDescription',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBodyTableState, b: TBodyTableState) => a.bodyDescription.localeCompare(b.bodyDescription),

      ...getColumnSearchProps(bodySearchInput, 'bodyDescription', 'Description'),
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBodyTableState) => {
        return (
          <>
            <div className="dashboard__btn-div">
              <Button
                type="link"
                className="dashboard__btn-link"
                onClick={() => {
                  onPopulateEditBodyModal(record);
                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, body: true });
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
                type="link"
                danger
                onClick={() => {
                  setShowDeleteModal({ ...showDeleteModal, body: true });
                  setDeleteModalContent({
                    ...deleteModalContent,
                    body: { body_id: record.bodyId, bodyTitle: record.bodyTitle },
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
                  // everytime when user open the modal clear the body accessory array first
                  // onClearBodyAccessoryArray();
                  //  set the body id
                  createBodyAccessoryForm.setFieldsValue({ bodyId: record.bodyId });
                  setShowCreateModal({ ...showCreateModal, body_accessory: true });
                  onGetBodyAccessories(record.bodyId); //get body accessories so we can know what to filter
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
  /* Length column initialization */
  const [lengthColumns, setLengthColumns] = useState([
    {
      key: 'lengthTitle',
      title: 'Title',
      dataIndex: 'lengthTitle',
      width: '15rem',
      ellipsis: true,
      sorter: (a: TLengthTableState, b: TLengthTableState) => a.lengthTitle.localeCompare(b.lengthTitle),
      ...getColumnSearchProps(lengthSearchInput, 'lengthTitle', 'Title'),
    },
    {
      key: 'lengthDescription',
      title: 'Categories',
      dataIndex: 'lengthDescription',
      ellipsis: true,
      width: 'auto',
      render: (_text: any, record: TLengthTableState) => (
        <>
          {typeof record.lengthDescription === 'string'
            ? record.lengthDescription
            : record.lengthDescription.map((category) => {
                /** check categories and assign respective tag colors  */
                const setRespectiveColors = (category: CheckboxValueType) => {
                  let color = '';
                  switch (category) {
                    case 'LCV':
                      color = 'orange';
                      break;
                    case 'MCV':
                      color = 'green';
                      break;
                    case 'HCV':
                      color = 'cyan';
                      break;
                    default:
                      color = 'magenta';
                  }
                  return color;
                };
                return (
                  <React.Fragment key={uuidv4()}>
                    {category !== '' && <Tag color={setRespectiveColors(category)}>{category}</Tag>}
                  </React.Fragment>
                );
              })}
        </>
      ),
    },
    {
      key: 'lengthAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TLengthTableState) => {
        return (
          <>
            <div className="dashboard__btn-div">
              <Button
                type="link"
                className="dashboard__btn-link"
                onClick={() => {
                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, length: true });

                  updateLengthForm.setFieldsValue({
                    lengthId: record.lengthId,
                    lengthTitle: record.lengthTitle.replace('ft', ''),
                    lengthDescription: record.lengthDescription === '-' ? '' : record.lengthDescription,
                  });
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
                type="link"
                danger
                onClick={() => {
                  setShowDeleteModal({ ...showDeleteModal, length: true });
                  setDeleteModalContent({
                    ...deleteModalContent,
                    length: { length_id: record.lengthId, lengthTitle: record.lengthTitle },
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

  /* ================================================== */
  /*  methods  */
  /* ================================================== */

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
   *
   * Helper function to render expand icons for different tables
   * @param {boolean} expanded
   * @param {(TBodyTableState)} record
   * @return {*}
   */
  const onExpandIcon = (expanded: boolean, record: TBodyTableState) => {
    let expandImageGalleryButton = null;
    let tooltipIconsText = { plusIcon: '', minusIcon: '' };

    if ('bodyImages' in record && 'bodyId' in record) {
      expandImageGalleryButton = (
        <PlusCircleTwoTone
          onClick={() => {
            // clear the state first to make sure that body accessories array is reloaded
            // onClearBodyAccessoryArray();
            // this allow only 1 row to expand at a time
            onTableRowExpand(expanded, record, setExpandedRowKeys);
            // call the body accessories api on expand
            onGetBodyAccessories(record.bodyId);
            // this closes all the edit image gallery when user expand other row
            // clearing out all the booleans
            setShowEditImageGallery({});
            // this function is passed to imageGallery
            //  it will simply uncheck everything
            onClearAllSelectedImages(selectAllChecked, setSelectAllChecked, galleryImages, setGalleryImages);
            // populate image array state and pass to ImageGallery component
            onPopulateImagesArray(record.bodyImages);
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

  const onExpandedRowRender = (record: TBodyTableState) => {
    let tableName: string = '';
    let tableSpecificId: number = -1;
    let recordImageArray: TReceivedImageObj[] = [];

    if ('bodyImages' in record && 'bodyId' in record) {
      recordImageArray = record.bodyImages;
      tableSpecificId = record.bodyId;
      tableName = 'body';
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
            if ('bodyImages' in record && 'bodyId' in record) {
              onPopulateEditBodyModal(record);
            }
          }}
        />
      </>
    );
  };

  /* helper functions to populate forms */
  /**
   * This function takes in the record of the current row of the table
   * and then reformat the important information and pass into the current modal / form
   * @param {TBodyTableState} record
   */
  const onPopulateEditBodyModal = (record: TBodyTableState) => {
    // update the form value using the 'name' attribute as target/key
    // if bodyDescription is '-' then change to empty string, else the real string
    // remember to set this form on the Form component
    updateBodyForm.setFieldsValue({
      bodyId: record.bodyId,
      bodyTitle: record.bodyTitle,
      bodyDescription: record.bodyDescription === '-' ? '' : record.bodyDescription,
    });
  };

  /*========================================== */
  /* Forms onFinish methods */
  /*========================================== */
  /* --------- BODY ---------- */
  // the keys "values" are from the form's 'name' attribute
  const onCreateBodyFinish = (values: { bodyTitle: string; bodyDescription: string; imageTag: string }) => {
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onCreateBody(values.bodyTitle, values.bodyDescription, values.imageTag, uploadSelectedFiles);
    } else {
      onCreateBody(values.bodyTitle, values.bodyDescription, null, null);
    }
  };
  const onUpdateBodyFinish = (values: {
    bodyId: number;
    bodyTitle: string;
    bodyDescription: string;
    imageTag: string;
  }) => {
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onUpdateBody(values.bodyId, values.bodyTitle, values.bodyDescription, values.imageTag, uploadSelectedFiles);
    } else {
      onUpdateBody(values.bodyId, values.bodyTitle, values.bodyDescription, null, null);
    }
  };

  /**
   *
   * Concat categories into strings
   * @param {CheckboxValueType[]} checkboxValuesArray
   * @return {string} e.g. "LCV,MCV,HCV"
   */
  const concatCategories = (checkboxValuesArray: CheckboxValueType[]) => {
    let concatCategories = '';
    checkboxValuesArray.forEach((category) => (concatCategories += `${category},`));
    return concatCategories;
  };

  /**
   *
   * Convert a plain string into an array of strings
   * @param {string} categoriesString
   * @return {string[]} ["LCV","HCV","MCV"]
   */
  const convertCategoriesToCheckboxValuesType = (categoriesString: string) => {
    return categoriesString.split(',');
  };

  /* --------- LENGTH ---------- */
  const onCreateLengthFinish = (values: { lengthTitle: string; lengthDescription: CheckboxValueType[] }) => {
    if (!loading) {
      onCreateLength(values.lengthTitle, concatCategories(values.lengthDescription));
    }
  };

  const onUpdateLengthFinish = (values: {
    lengthId: number;
    lengthDescription: CheckboxValueType[];
    lengthTitle: string;
  }) => {
    if (!loading) {
      onUpdateLength(values.lengthId, values.lengthTitle, concatCategories(values.lengthDescription));
    }
  };

  /* --------- BODY ACCESSORY ---------- */
  const onCreateBodyAccessoryFinish = (values: { bodyId: number; accessoryId: number }) => {
    onCreateBodyAccessory(values.bodyId, values.accessoryId);
  };
  // const onUpdateBodyAccessoryFinish = (values: { bodyId: number; accessoryId: number }) => {
  //   onUpdateBodyAccessory(values.bodyId, values.accessoryId);
  // };

  /* ================================================== */
  /*  Components  */
  /* ================================================== */

  /* ---------------------------- */
  // Body
  /* ---------------------------- */
  /* Create Body Form Items */
  let createBodyFormItems = (
    <>
      <Form.Item
        className="make__form-item"
        label="Title"
        name="bodyTitle"
        rules={[{ required: true, message: 'Input title here!' }]}
      >
        <Input placeholder="Type title here" />
      </Form.Item>
      <Form.Item
        className="make__form-item"
        label="Description"
        name="bodyDescription"
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

  /* Create Body Form */
  let createBodyFormComponent = (
    <>
      <Form
        form={createBodyForm}
        name="createBody"
        onKeyDown={(e) => handleKeyDown(e, createBodyForm)}
        onFinish={onCreateBodyFinish}
      >
        {createBodyFormItems}
      </Form>
    </>
  );

  /* Create Body Modal */
  let createBodyModal = (
    <Modal
      centered
      title="Create Body"
      visible={showCreateModal.body}
      onOk={createBodyForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createBodyForm.resetFields();
        setShowCreateModal({ ...showCreateModal, body: false }); //close modal on cancel
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {createBodyFormComponent}
    </Modal>
  );

  /* -------------------------------------- */
  /* Edit Body Form */
  let updateBodyFormComponent = (
    <>
      <Form
        form={updateBodyForm}
        name="editBody"
        onKeyDown={(e) => handleKeyDown(e, updateBodyForm)}
        onFinish={onUpdateBodyFinish}
      >
        {/* reusing the form items from create body and add body id for update */}
        {createBodyFormItems}
        {/* Getting the brand id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="bodyId"
          hidden
          rules={[{ required: true, message: 'Get body id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Body Modal */
  let updateBodyModal = (
    <Modal
      centered
      title="Edit Body"
      visible={showUpdateModal.body}
      onOk={updateBodyForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowUpdateModal({
          ...showUpdateModal,
          body: false,
        });
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {updateBodyFormComponent}
    </Modal>
  );

  /* ---------------------------- */
  // Length
  /* ---------------------------- */

  const lengthCategoryOptions = ['LCV', 'MCV', 'HCV'];

  /* Length Form Items*/
  let lengthFormItems = (
    <>
      <Form.Item
        className="make__form-item margin_r-1"
        label="Title"
        name={'lengthTitle'}
        rules={[{ required: true, message: 'Input ft here!' }]}
      >
        {/* ft */}
        <Input type="number" min={0} addonAfter={'ft'} placeholder="Type ft here" />
      </Form.Item>

      <Form.Item
        className="make__form-item"
        label="Categories"
        name="lengthDescription"
        rules={[{ required: true, message: 'Choose a category!' }]}
      >
        <Checkbox.Group options={lengthCategoryOptions} style={{ paddingLeft: '2rem' }} />
      </Form.Item>
    </>
  );

  /* Create Length Form*/
  let createLengthFormComponent = (
    <>
      <Form
        form={createLengthForm}
        name="createLength"
        onKeyDown={(e) => handleKeyDown(e, createLengthForm)}
        onFinish={onCreateLengthFinish}
      >
        {/* reuse form items */}
        {lengthFormItems}
      </Form>
    </>
  );

  /* --------------------------- */
  /* Create Length Modal */
  /* --------------------------- */
  let createLengthModal = (
    <Modal
      centered
      title="Create Length"
      visible={showCreateModal.length}
      onOk={createLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createLengthForm.resetFields();
        setShowCreateModal({ ...showCreateModal, length: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {createLengthFormComponent}
    </Modal>
  );

  /* Edit Length Form */
  let updateLengthFormComponent = (
    <>
      <Form
        form={updateLengthForm}
        name="editLength"
        onKeyDown={(e) => handleKeyDown(e, updateLengthForm)}
        onFinish={onUpdateLengthFinish}
      >
        {/* reuse form items */}
        {lengthFormItems}

        {/* Getting the length id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="lengthId"
          hidden
          rules={[{ required: true, message: 'Get length id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* ---------------------- */
  /* Edit Length Modal */
  /* ---------------------- */
  let updateLengthModal = (
    <Modal
      centered
      title="Edit Length"
      visible={showUpdateModal.length}
      onOk={updateLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowUpdateModal({
          ...showUpdateModal,
          length: false,
        });
      }}
    >
      {/* the content within the modal */}
      {updateLengthFormComponent}
    </Modal>
  );

  /**
   * Extract accessories only from each body accessory and form a new
   * accessory array so can filter
   * @param {TReceivedBodyAccessoryObj[]} bodyAccessoriesArray
   * @return {*}
   */
  const extractAccessoriesArray = (bodyAccessoriesArray: TReceivedBodyAccessoryObj[]) => {
    let resultArray: TReceivedAccessoryObj[] = [];
    bodyAccessoriesArray.forEach((bodyAccessory) => resultArray.push(bodyAccessory.accessory));
    return resultArray;
  };

  /* ---------------------------- */
  // Body Accessory
  /* ---------------------------- */
  /* Body Accessory Form Items */
  let bodyAccessoryFormItems = (
    <>
      {/* ------- Select Accessory - value is accessory id but display is accessory title -------*/}
      <Form.Item
        className="make__form-item "
        label="Accessory"
        name="accessoryId"
        rules={[{ required: true, message: 'Select an Accessory!' }]}
      >
        {/* only render if accessoriesArray is not null */}
        {/* also if user already created a new body accessory using body associated accessories */}
        {bodyAssociatedAccessoriesArray && bodyAccessoriesArray ? (
          <Select placeholder="Select an Accessory">
            {bodyAssociatedAccessoriesArray
              .filter((mainArrayChild) =>
                extractAccessoriesArray(bodyAccessoriesArray).every(
                  (filterArrayChild) => filterArrayChild.id !== mainArrayChild.id,
                ),
              )
              .map((accessory) => {
                return (
                  <Option key={uuidv4()} value={accessory.id}>
                    {accessory.title} {accessory.description ? ' - ' + accessory.description : ''}
                  </Option>
                );
              })}
          </Select>
        ) : (
          <Skeleton.Input className="body__form-item-skeleton" style={{ width: '100%' }} active={true} />
        )}
      </Form.Item>

      <Form.Item hidden label="bodyId" name="bodyId" rules={[{ required: true, message: 'Input body id!' }]}>
        <Input />
      </Form.Item>
    </>
  );

  /* Create Body Accessory Form */
  let createBodyAccessoryFormComponent = (
    <>
      <Form
        form={createBodyAccessoryForm}
        name="createBodyAccessory"
        onKeyDown={(e) => handleKeyDown(e, createBodyAccessoryForm)}
        onFinish={onCreateBodyAccessoryFinish}
      >
        {bodyAccessoryFormItems}
      </Form>
    </>
  );

  /* ------------------------------ */
  /* Create Body Accessory Modal */
  /* ------------------------------ */
  let createBodyAccessoryModal = (
    <Modal
      centered
      title="Create Body Accessory"
      visible={showCreateModal.body_accessory}
      onOk={createBodyAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createBodyAccessoryForm.resetFields();
        setShowCreateModal({ ...showCreateModal, body_accessory: false }); //close modal on cancel
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {createBodyAccessoryFormComponent}
    </Modal>
  );

  /* ================================ */
  // Delete Modals
  /* ================================ */

  //  Delete Length Modal
  let deleteLengthModal = (
    <Modal
      title={
        <div className="dashboard__delete-header">
          <ExclamationCircleOutlined className="dashboard__delete-icon" />
          Delete Length
        </div>
      }
      visible={showDeleteModal.length}
      onOk={() => onDeleteLength(deleteModalContent.length.length_id)}
      onCancel={() => setShowDeleteModal({ ...showDeleteModal, length: false })}
      okText="Yes, delete it"
      confirmLoading={loading}
      cancelText="Cancel"
    >
      You are deleting
      {deleteModalContent.length.lengthTitle === '' ? (
        ' this length'
      ) : (
        <span className="dashboard__delete-message">{` ${deleteModalContent.length.lengthTitle}`}</span>
      )}
      , this action is permanent. Are you sure?
    </Modal>
  );

  //  Delete Body Modal
  let deleteBodyModal = (
    <Modal
      title={
        <div className="dashboard__delete-header">
          <ExclamationCircleOutlined className="dashboard__delete-icon" />
          Delete Body
        </div>
      }
      visible={showDeleteModal.body}
      onOk={() => onDeleteBody(deleteModalContent.body.body_id)}
      onCancel={() => setShowDeleteModal({ ...showDeleteModal, body: false })}
      okText="Yes, delete it"
      confirmLoading={loading}
      cancelText="Cancel"
    >
      You are deleting
      {deleteModalContent.body.bodyTitle === '' ? (
        ' this body'
      ) : (
        <span className="dashboard__delete-message">{` ${deleteModalContent.body.bodyTitle}`}</span>
      )}
      , this action is permanent. Are you sure?
    </Modal>
  );

  //  Delete Body Accessory Modal
  let deleteBodyAccessoryModal = (
    <Modal
      title={
        <div className="dashboard__delete-header">
          <ExclamationCircleOutlined className="dashboard__delete-icon" />
          Delete Body Accessory
        </div>
      }
      visible={showDeleteModal.body_accessory}
      onOk={() =>
        onDeleteBodyAccessory(
          deleteModalContent.body_accessory.body_id,
          deleteModalContent.body_accessory.body_accessory_id,
        )
      }
      onCancel={() => setShowDeleteModal({ ...showDeleteModal, body_accessory: false })}
      okText="Yes, delete it"
      confirmLoading={loading}
      cancelText="Cancel"
    >
      You are deleting
      {deleteModalContent.body_accessory.accessoryTitle === '' ? (
        ' this body accessory'
      ) : (
        <span className="dashboard__delete-message">{` ${deleteModalContent.body_accessory.accessoryTitle}`}</span>
      )}
      , this action is permanent. Are you sure?
    </Modal>
  );

  /* =================================== */
  /* Body accessory expanded component*/
  /* =================================== */
  const bodyAccessoriesCardsComponent = (record: TBodyTableState) => {
    return (
      <>
        {bodyAccessoriesArray ? (
          <>
            {bodyAccessoriesArray.length > 0 ? (
              <>
                <div>
                  Attachable accessories for&nbsp;
                  <span style={{ textTransform: 'capitalize' }}>{record.bodyTitle}</span>
                  :&nbsp;
                  <span className="body__expand-available">{bodyAccessoriesArray.length} available</span>
                </div>
                <hr />
                <div className="body__expand-outerdiv">
                  {[...bodyAccessoriesArray].reverse().map((bodyAccessory) => {
                    if (bodyAccessory.available) {
                      return (
                        <Card
                          key={uuidv4()}
                          className="body__expand-card"
                          title={
                            <div className="body__expand-card-title-div">
                              <span className="body__expand-card-title">{bodyAccessory.accessory.title}</span>
                              <Tag color="geekblue" style={{ marginRight: 0 }}>
                                RM {bodyAccessory.accessory.price}
                              </Tag>
                            </div>
                          }
                          size="small"
                          style={{ width: 'auto' }}
                          headStyle={{ background: '#FFF2E8' }}
                        >
                          {bodyAccessory.accessory.images ? (
                            <>
                              <Carousel autoplay>
                                {/* render all images if array more than 0 else render 'image not available' image */}
                                {bodyAccessory.accessory.images.length > 0 ? (
                                  bodyAccessory.accessory.images.map((image) => {
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
                            <section className="body__expand-card-description">
                              Description:&nbsp;
                              {bodyAccessory.accessory.description ? bodyAccessory.accessory.description : '-'}
                            </section>
                            <section className="body__expand-card-btn-section">
                              <div className="body__expand-card-btn-div">
                                <div>
                                  <Button
                                    type="link"
                                    danger
                                    style={{ padding: 0 }}
                                    onClick={() => {
                                      setDeleteModalContent({
                                        ...deleteModalContent,
                                        body_accessory: {
                                          body_id: record.bodyId,
                                          body_accessory_id: bodyAccessory.id,
                                          accessoryTitle: bodyAccessory.accessory.title,
                                        },
                                      });
                                      setShowDeleteModal({ ...showDeleteModal, body_accessory: true });
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
                    }
                    return <React.Fragment key={uuidv4()}></React.Fragment>;
                  })}
                </div>
              </>
            ) : (
              <div>No accessory has been created yet for this body.</div>
            )}
          </>
        ) : (
          <Skeleton active />
        )}
      </>
    );
  };

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */
  //  Calling get APIs
  useEffect(() => {
    onGetBodies();
  }, [onGetBodies]);

  useEffect(() => {
    onGetLengths();
  }, [onGetLengths]);

  useEffect(() => {
    onGetBodyAssociatedAccessories();
  }, [onGetBodyAssociatedAccessories]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for BODY
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TBodyTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (body: TReceivedBodyObj) => {
      let descriptionIsNullOrEmpty = body.description === null || body.description === '';
      // only render when available value is true
      if (body.available) {
        tempArray.push({
          key: uuidv4(),
          bodyId: body.id,
          bodyTitle: body.title,
          bodyDescription: descriptionIsNullOrEmpty ? '-' : body.description,
          available: body.available,
          bodyImages: body.images,
        });
      }
    };

    if (bodiesArray) {
      // Execute function "storeValue" for every array index
      bodiesArray.map(storeValue);
    }
    // update the state with tempArray
    setBodyTableState(tempArray);
  }, [bodiesArray]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for LENGTH
  /* ----------------------------------------------------- */

  useEffect(() => {
    let tempArray: TLengthTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (length: TReceivedLengthObj) => {
      let descriptionIsNullOrEmpty = length.description === null || length.description === '';
      let formattedLength = '';
      let lengthHasFtInString = length.title.includes('ft');
      if (!lengthHasFtInString) {
        // then add ft to the string behind
        formattedLength = length.title + 'ft';
      } else {
        formattedLength = length.title;
      }

      if (length.available) {
        // only render when available value is true
        tempArray.push({
          key: uuidv4(),
          lengthId: length.id,
          lengthTitle: formattedLength,
          lengthDescription: descriptionIsNullOrEmpty ? '-' : convertCategoriesToCheckboxValuesType(length.description),
          available: length.available,
        });
      }
    };

    if (lengthsArray) {
      // Execute function "storeValue" for every array index
      lengthsArray.map(storeValue);
    }
    // update the state with tempArray
    setLengthTableState(tempArray);
  }, [lengthsArray]);

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
      createBodyForm.resetFields();
      createLengthForm.resetFields();
      createBodyAccessoryForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, body: false, length: false, body_accessory: false });
      setShowUpdateModal({ ...showUpdateModal, body: false, length: false, body_accessory: false });
      setShowDeleteModal({ ...showDeleteModal, body: false, length: false, body_accessory: false });
    }
  }, [
    successMessage,
    showUpdateModal,
    showCreateModal,
    showDeleteModal,
    createBodyForm,
    createLengthForm,
    createBodyAccessoryForm,
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
      {createBodyModal}
      {updateBodyModal}
      {createLengthModal}
      {updateLengthModal}
      {createBodyAccessoryModal}
      {deleteBodyModal}
      {deleteLengthModal}
      {deleteBodyAccessoryModal}

      <NavbarComponent activePage="body" defaultOpenKeys="dashboard" />
      <Layout>
        <LayoutComponent activeKey="body">
          <ParallaxContainer bgImageUrl={holy5truck} overlayColor="rgba(0, 0, 0, 0.3)">
            <CustomContainer>
              <div className="make__tab-outerdiv">
                <section>
                  <HeaderTitle>Body</HeaderTitle>
                  {bodiesArray && lengthsArray ? (
                    <>
                      {/* ===================================== */}
                      {/*             Length Section            */}
                      {/* ===================================== */}
                      <section className="make__section">
                        <div className="make__header-div ">
                          <div className="make__header-title">Lengths</div>
                          <Button
                            type="primary"
                            className="make__brand-btn"
                            onClick={() => setShowCreateModal({ ...showCreateModal, length: true })}
                          >
                            Create New Length
                          </Button>
                        </div>
                        {/* ------------------ */}
                        {/*    Length Table     */}
                        {/* ------------------ */}
                        <Table
                          bordered
                          className="body__table"
                          scroll={{ x: '89rem', y: 400 }}
                          dataSource={lengthTableState}
                          columns={convertHeader(lengthColumns, setLengthColumns)}
                          pagination={false}
                        />
                      </section>
                      {/* ===================================== */}
                      {/*              Body Section             */}
                      {/* ===================================== */}
                      <section className="make__section">
                        <div className="make__header-div ">
                          <div className="make__header-title">Bodies</div>
                          <Button
                            type="primary"
                            className="make__brand-btn"
                            onClick={() => setShowCreateModal({ ...showCreateModal, body: true })}
                          >
                            Create New Body
                          </Button>
                        </div>
                        {/* ------------------ */}
                        {/*    Body Table     */}
                        {/* ------------------ */}
                        <Table
                          bordered
                          className="body__table"
                          scroll={{ x: '89rem', y: 700 }}
                          dataSource={bodyTableState}
                          expandedRowKeys={expandedRowKeys} // this allow only 1 row to expand at a time
                          onExpand={(expanded, record) => {
                            onTableRowExpand(expanded, record, setExpandedRowKeys);
                          }} //this allow only 1 row to expand at a time
                          expandable={{
                            expandIcon: ({ expanded, record }) => onExpandIcon(expanded, record),
                            expandedRowRender: (record: TBodyTableState) => {
                              let bodyAccessoriesCards = bodyAccessoriesCardsComponent(record);
                              let imageGalleryComponent = onExpandedRowRender(record);
                              return (
                                <>
                                  <div
                                    style={{
                                      marginBottom:
                                        bodyAccessoriesArray && bodyAccessoriesArray.length > 0 ? '2rem' : 'none',
                                    }}
                                  >
                                    {bodyAccessoriesCards}
                                  </div>
                                  {imageGalleryComponent}
                                </>
                              );
                            },
                          }}
                          columns={convertHeader(bodyColumns, setBodyColumns)}
                          pagination={false}
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
  errorMessage?: string | null;
  successMessage?: string | null;
  bodiesArray?: TReceivedBodyObj[] | null;
  lengthsArray?: TReceivedLengthObj[] | null;
  bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
  bodyAssociatedAccessoriesArray?: TReceivedAccessoryObj[] | null;
}

const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.dashboard.loading,
    bodiesArray: state.dashboard.bodiesArray,
    lengthsArray: state.dashboard.lengthsArray,
    errorMessage: state.dashboard.errorMessage,
    successMessage: state.dashboard.successMessage,
    bodyAccessoriesArray: state.dashboard.bodyAccessoriesArray,
    bodyAssociatedAccessoriesArray: state.dashboard.bodyAssociatedAccessoriesArray,
  };
};
interface DispatchProps {
  // Body
  onGetBodies: typeof actions.getBodies;
  onCreateBody: typeof actions.createBody;
  onUpdateBody: typeof actions.updateBody;
  onDeleteBody: typeof actions.deleteBody;
  // Length
  onGetLengths: typeof actions.getLengths;
  onCreateLength: typeof actions.createLength;
  onUpdateLength: typeof actions.updateLength;
  onDeleteLength: typeof actions.deleteLength;
  // Body Accessory
  onGetBodyAccessories: typeof actions.getBodyAccessories;
  onCreateBodyAccessory: typeof actions.createBodyAccessory;
  // onUpdateBodyAccessory: typeof actions.updateBodyAccessory;
  onDeleteBodyAccessory: typeof actions.deleteBodyAccessory;
  onGetBodyAssociatedAccessories: typeof actions.getBodyAssociatedAccessories;
  onClearBodyAccessoryArray: typeof actions.clearBodyAccessoryArray;
  // Images
  onDeleteUploadImage: typeof actions.deleteUploadImage;
  // Miscellaneous
  onClearDashboardState: typeof actions.clearDashboardState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    // Body
    onGetBodies: () => dispatch(actions.getBodies()),
    onCreateBody: (title, description, imageTag, imageFiles) =>
      dispatch(actions.createBody(title, description, imageTag, imageFiles)),
    onUpdateBody: (id, title, description, imageTag, imageFiles) =>
      dispatch(actions.updateBody(id, title, description, imageTag, imageFiles)),
    onDeleteBody: (body_id) => dispatch(actions.deleteBody(body_id)),
    // Length
    onGetLengths: () => dispatch(actions.getLengths()),
    onCreateLength: (title, description) => dispatch(actions.createLength(title, description)),
    onUpdateLength: (id, title, description) => dispatch(actions.updateLength(id, title, description)),
    onDeleteLength: (length_id) => dispatch(actions.deleteLength(length_id)),
    // Body Accessory
    onGetBodyAccessories: (body_id) => dispatch(actions.getBodyAccessories(body_id)),
    onCreateBodyAccessory: (body_id, accessory_id) => dispatch(actions.createBodyAccessory(body_id, accessory_id)),
    // onUpdateBodyAccessory: (body_id, accessory_id, imageTag, imageFiles) =>
    //   dispatch(actions.updateBodyAccessory(body_id, accessory_id, imageTag, imageFiles)),
    onDeleteBodyAccessory: (body_id, body_accessory_id) =>
      dispatch(actions.deleteBodyAccessory(body_id, body_accessory_id)),
    onGetBodyAssociatedAccessories: () => dispatch(actions.getBodyAssociatedAccessories()),
    onClearBodyAccessoryArray: () => dispatch(actions.clearBodyAccessoryArray()),

    // Image
    onDeleteUploadImage: (ids) => dispatch(actions.deleteUploadImage(ids)),
    // Miscellaneous
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Body);

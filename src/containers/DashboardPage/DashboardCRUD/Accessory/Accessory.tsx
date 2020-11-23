import React, { useState, useEffect, ReactText } from 'react';
import './Accessory.scss';
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
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Modal, Layout, Table, Tooltip, notification } from 'antd'; /* Util */
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types';
// import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import {
  TReceivedAccessoryObj,
  TReceivedBodyAccessoryObj,
  TReceivedBodyLengthObj,
  TReceivedImageObj,
} from 'src/store/types/dashboard';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';

const { TextArea } = Input;

interface AccessoryProps {}

type TAccessoryTableState = {
  key?: string;
  index?: number;
  accessoryId: number; //for update
  accessoryTitle: string;
  accessoryDescription: string;
  available?: boolean;
  accessoryImages: TReceivedImageObj[];
};

type TShowModal = {
  accessory: boolean;
};

type Props = AccessoryProps & StateProps & DispatchProps;

const Accessory: React.FC<Props> = ({
  // miscellaneous
  loading,
  errorMessage,
  successMessage,
  // accessory
  accessoriesArray,
  onGetAccessories,
  onCreateAccessory,
  onUpdateAccessory,
  // body length
  bodyLengthsArray,
  onGetBodyLengths,
  // delete upload iamge
  onDeleteUploadImage,
  // clear states
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // ref for forms
  /* body */
  const [createAccessoryForm] = Form.useForm();
  const [updateAccessoryForm] = Form.useForm();

  // const { width } = useWindowDimensions();

  // Table States
  const [accessoryTableState, setAccessoryTableState] = useState<TAccessoryTableState[]>([]);

  let accessorySearchInput = null; //this is for filter on antd table

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
  // For populating images in image gallery
  const [galleryImages, setGalleryImages] = useState<TGalleryImageArrayObj[]>([]);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState<TShowModal>({
    accessory: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<TShowModal>({
    accessory: false,
  });

  // store table header definition in state
  /**
   * containing objects of arrays
   * accessory[], bodyaccessory[]
   **/

  /* Accessory column initialization */
  const [accessoryColumns, setAccessoryColumns] = useState([
    {
      key: 'accessoryIndex',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TAccessoryTableState, b: TAccessoryTableState) =>
        a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'accessoryTitle',
      title: 'Title',
      className: 'body__table-header--title',
      dataIndex: 'accessoryTitle',
      width: '15rem',
      ellipsis: true,
      sorter: (a: TAccessoryTableState, b: TAccessoryTableState) => a.accessoryTitle.localeCompare(b.accessoryTitle),
      ...getColumnSearchProps(accessorySearchInput, 'accessoryTitle', 'Title'),
    },
    {
      key: 'accessoryDescription',
      title: 'Description',
      dataIndex: 'accessoryDescription',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TAccessoryTableState, b: TAccessoryTableState) =>
        a.accessoryDescription.localeCompare(b.accessoryDescription),

      ...getColumnSearchProps(accessorySearchInput, 'accessoryDescription', 'Description'),
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TAccessoryTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // populate the accessory modal
                onPopulateAccessoryModal(record);
                // show modal
                setShowUpdateModal({ ...showUpdateModal, accessory: true });
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
   * This function takes in the record of the current row of the table
   * and then reformat the important information and pass into the current modal / form
   * @param {*} record
   */
  const onPopulateAccessoryModal = (record: TAccessoryTableState) => {
    // update the form value using the 'name' attribute as target/key
    // if accessoryDescription is '-' then change to empty string, else the real string
    // remember to set this form on the Form component
    updateAccessoryForm.setFieldsValue({
      accessoryId: record.accessoryId,
      accessoryTitle: record.accessoryTitle,
      accessoryDescription: record.accessoryDescription === '-' ? '' : record.accessoryDescription,
    });
  };

  /* Forms onFinish methods */
  /* --------- ACCESSORY ---------- */

  // the keys "values" are from the form's 'name' attribute
  const onCreateAccessoryFinish = (values: {
    accessoryTitle: string;
    accessoryDescription: string;
    imageTag: string;
  }) => {
    // if not then just get the title and description
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onCreateAccessory(values.accessoryTitle, values.accessoryDescription, values.imageTag, uploadSelectedFiles);
    } else {
      onCreateAccessory(values.accessoryTitle, values.accessoryDescription, null, null);
    }
  };

  const onUpdateAccessoryFinish = (values: {
    accessoryId: number;
    accessoryTitle: string;
    accessoryDescription: string;
    imageTag: string;
  }) => {
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      onUpdateAccessory(
        values.accessoryId,
        values.accessoryTitle,
        values.accessoryDescription,
        values.imageTag,
        uploadSelectedFiles,
      );
    } else {
      onUpdateAccessory(values.accessoryId, values.accessoryTitle, values.accessoryDescription, null, null);
    }
  };

  /**
   * helper function to clear all selected images in image gallery when user call it
   * @category Helper function
   */
  const onClearAllSelectedImages = () => {
    setSelectAllChecked(false);

    var temp_images: any = galleryImages.slice();
    if (selectAllChecked) {
      for (var j = 0; j < temp_images.length; j++) temp_images[j].isSelected = false;
    }
    setGalleryImages(temp_images);
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
   * helper function to only show 1 expanded row
   * @param {*} expanded
   * @param {*} record
   * @category Helper function
   */
  const onTableRowExpand = (expanded: boolean, record: TAccessoryTableState) => {
    var keys = [];
    let key = record.key;
    if (!expanded && key) {
      keys.push(key.toString()); // I have set my record.id as row key. Check the documentation for more details.
    }

    setExpandedRowKeys(keys);
  };

  /**
   *
   * Helper function to render expand icons for different tables
   * @param {boolean} expanded
   * @param {(TAccessoryTableState|TBodyAccessoryTableState)} record
   * @return {*}
   */
  const onExpandIcon = (expanded: boolean, record: TAccessoryTableState) => {
    let expandImageGalleryButton = null;
    let tooltipIconsText = { plusIcon: '', minusIcon: '' };

    if ('accessoryImages' in record) {
      expandImageGalleryButton = (
        <PlusCircleTwoTone
          style={{
            opacity: record.accessoryImages.length === 0 ? 0.3 : 1,
            pointerEvents: record.accessoryImages.length === 0 ? 'none' : 'auto',
          }}
          onClick={() => {
            // this allow only 1 row to expand at a time
            onTableRowExpand(expanded, record);
            // this closes all the edit image gallery when user expand other row
            // clearing out all the booleans
            setShowEditImageGallery({});
            // this function is passed to imageGallery
            //  it will simply uncheck everything
            onClearAllSelectedImages();
            // populate image array state and pass to ImageGallery component
            onPopulateImagesArray(record.accessoryImages);
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
                onTableRowExpand(expanded, record);
                // this function is passed to imageGallery
                //  it will simply uncheck everything
                onClearAllSelectedImages();
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

  const onExpandedRowRender = (record: TAccessoryTableState) => {
    let recordImageArray: TReceivedImageObj[] = [];
    let tableSpecificId: number = -1;
    let tableName: string = '';

    if ('accessoryImages' in record && 'accessoryId' in record) {
      tableName = 'accessory';
      tableSpecificId = record.accessoryId;
      recordImageArray = record.accessoryImages;
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
          onClearAllSelectedImages={onClearAllSelectedImages}
          onPopulateEditModal={(record) => {
            if ('accessoryImages' in record && 'accessoryId' in record) {
              onPopulateAccessoryModal(record);
            }
          }}
        />
      </>
    );
  };

  /* ================================================== */
  /*  Components  */
  /* ================================================== */
  /* Create Accessory Form Items */
  let accessoryFormItems = (
    <>
      <Form.Item
        className="make__form-item"
        label="Title"
        name="accessoryTitle"
        rules={[{ required: true, message: 'Input title here!' }]}
      >
        <Input placeholder="Type title here" />
      </Form.Item>
      <Form.Item
        className="make__form-item"
        label="Description"
        name="accessoryDescription"
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

  /* Create Accessory Form */
  let createAccessoryFormComponent = (
    <>
      <Form
        form={createAccessoryForm}
        name="createAccessory"
        onKeyDown={(e) => handleKeyDown(e, createAccessoryForm)}
        onFinish={onCreateAccessoryFinish}
      >
        {accessoryFormItems}
      </Form>
    </>
  );

  /* Create Accessory Modal */
  let createAccessoryModal = (
    <Modal
      centered
      title="Create Accessory"
      visible={showCreateModal.accessory}
      onOk={createAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        createAccessoryForm.resetFields();
        setShowCreateModal({ ...showCreateModal, accessory: false }); //close modal on cancel
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {createAccessoryFormComponent}
    </Modal>
  );

  /* Update Accessory Form */
  let updateAccessoryFormComponent = (
    <>
      <Form
        form={updateAccessoryForm}
        name="updateAccessory"
        onKeyDown={(e) => handleKeyDown(e, updateAccessoryForm)}
        onFinish={onUpdateAccessoryFinish}
      >
        {accessoryFormItems}

        {/* Getting the brand id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="accessoryId"
          hidden
          rules={[{ required: true, message: 'Get accessory id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Update Accessory Modal */
  let updateAccessoryModal = (
    <Modal
      title="Create Accessory"
      centered
      visible={showUpdateModal.accessory}
      onOk={updateAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowUpdateModal({ ...showUpdateModal, accessory: false }); //close modal on cancel
        setImagesPreviewUrls([]); //clear the image preview when oncancel
      }}
    >
      {/* the content within the modal */}
      {updateAccessoryFormComponent}
    </Modal>
  );

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */
  useEffect(() => {
    onGetAccessories();
  }, [onGetAccessories]);

  useEffect(() => {
    if (!bodyLengthsArray) {
      onGetBodyLengths();
    }
  }, [bodyLengthsArray, onGetBodyLengths]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for ACCESSORY
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TAccessoryTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (accessory: TReceivedAccessoryObj, index: number) => {
      let descriptionIsNullOrEmpty = accessory.description === null || accessory.description === '';
      // only render when available value is true
      if (accessory.available) {
        tempArray.push({
          key: uuidv4(),
          index: index + 1,
          accessoryId: accessory.id,
          accessoryTitle: accessory.title,
          accessoryDescription: descriptionIsNullOrEmpty ? '-' : accessory.description,
          available: accessory.available,
          accessoryImages: accessory.images,
        });
      }
    };

    if (accessoriesArray) {
      // Execute function "storeValue" for every array index
      accessoriesArray.map(storeValue);
    }
    // update the state with tempArray
    setAccessoryTableState(tempArray);
  }, [accessoriesArray]);

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
      //  clear the state so the notification will be hidden afterwards
      onClearDashboardState();
      // clear the form inputs using the form reference
      createAccessoryForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, accessory: false });
      setShowUpdateModal({ ...showUpdateModal, accessory: false });
    }
  }, [
    successMessage,
    showUpdateModal,
    showCreateModal,
    createAccessoryForm,
    updateAccessoryForm,

    setShowUpdateModal,
    setShowCreateModal,
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

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* ================== */}
      {/*       Modals       */}
      {/* ================== */}
      {createAccessoryModal}
      {updateAccessoryModal}

      <Layout>
        <NavbarComponent activePage="dashboard" />
        <LayoutComponent activeKey="accessory">
          <CustomContainer>
            <div className="accessory__tab-outerdiv">
              <section>
                <HeaderTitle>Accessory</HeaderTitle>
                {accessoriesArray && bodyLengthsArray ? (
                  <>
                    {/* ===================================== */}
                    {/*           Accessory Section           */}
                    {/* ===================================== */}
                    <section className="make__section">
                      <div className="make__header-div ">
                        <div className="make__header-title">Accessories</div>
                        <Button
                          type="primary"
                          className="make__brand-btn"
                          onClick={() => setShowCreateModal({ ...showCreateModal, accessory: true })}
                        >
                          Create New Accessory
                        </Button>
                      </div>
                      {/* --------------------- */}
                      {/*    Accessory Table    */}
                      {/* --------------------- */}
                      <Table
                        bordered
                        scroll={{ x: '89rem', y: 400 }}
                        expandedRowKeys={expandedRowKeys} // this allow only 1 row to expand at a time
                        onExpand={onTableRowExpand} //this allow only 1 row to expand at a time
                        expandable={{
                          expandIcon: ({ expanded, record }) => onExpandIcon(expanded, record),
                          expandedRowRender: (record: TAccessoryTableState) => onExpandedRowRender(record),
                        }}
                        dataSource={accessoryTableState}
                        columns={convertHeader(accessoryColumns, setAccessoryColumns)}
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
  accessoriesArray?: TReceivedAccessoryObj[] | null;
  bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
  bodyLengthsArray?: TReceivedBodyLengthObj[] | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  if ('dashboard' in state) {
    return {
      loading: state.dashboard.loading,
      errorMessage: state.dashboard.errorMessage,
      successMessage: state.dashboard.successMessage,
      imagesUploaded: state.dashboard.imagesUploaded,
      bodyLengthsArray: state.dashboard.bodyLengthsArray,
      accessoriesArray: state.dashboard.accessoriesArray,
      bodyAccessoriesArray: state.dashboard.bodyAccessoriesArray,
    };
  }
};
interface DispatchProps {
  // Accessory
  onGetAccessories: typeof actions.getAccessories;
  onCreateAccessory: typeof actions.createAccessory;
  onUpdateAccessory: typeof actions.updateAccessory;
  // Body length
  onGetBodyLengths: typeof actions.getBodyLengths;
  //  Body accessory
  onGetBodyAccessories: typeof actions.getBodyAccessories;
  onCreateBodyAccessory: typeof actions.createBodyAccessory;
  onUpdateBodyAccessory: typeof actions.updateBodyAccessory;
  // Images
  onDeleteUploadImage: typeof actions.deleteUploadImage;
  // Miscellaneous
  onClearDashboardState: typeof actions.clearDashboardState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    //  accessory
    onGetAccessories: () => dispatch(actions.getAccessories()),
    onCreateAccessory: (title, description, imageTag, imageFiles) =>
      dispatch(actions.createAccessory(title, description, imageTag, imageFiles)),
    onUpdateAccessory: (id, title, description, imageTag, imageFiles) =>
      dispatch(actions.updateAccessory(id, title, description, imageTag, imageFiles)),
    // body length
    onGetBodyLengths: () => dispatch(actions.getBodyLengths()),
    // body accessory
    onGetBodyAccessories: () => dispatch(actions.getBodyAccessories()),
    onCreateBodyAccessory: (createBodyAccessoryData, imageTag, imageFiles) =>
      dispatch(actions.createBodyAccessory(createBodyAccessoryData, imageTag, imageFiles)),
    onUpdateBodyAccessory: (updateBodyAccessoryData, imageTag, imageFiles) =>
      dispatch(actions.updateBodyAccessory(updateBodyAccessoryData, imageTag, imageFiles)),
    // Image
    onDeleteUploadImage: (ids) => dispatch(actions.deleteUploadImage(ids)),
    // Miscellaneous
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Accessory);

import React, { useEffect, useState } from 'react';
import './CatalogAccessoriesModal.scss';
/* components */
import CrudModal from 'src/components/Modal/Crud/CrudModal';
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Divider, Empty, Form, Modal, Skeleton, Tag, Tooltip } from 'antd';
/* Util */
import {
  TReceivedAccessoryObj,
  TReceivedBodyAccessoryObj,
  TReceivedBodyMakeAccessoryObj,
  TReceivedBodyMakeObj,
} from 'src/store/types/dashboard';
import { RootState } from 'src';
import { TUserAccess } from 'src/store/types/auth';
import { ICrudModal } from '../CatalogBodyMake';
import * as actions from 'src/store/actions/index';
import { convertPriceToFloat } from 'src/shared/Utils';
import { TReceivedDimensionAccessoryObj } from 'src/store/types/sales';
import { BODY_ACCESSORY, DIMENSION_ACCESSORY, GENERAL_ACCESSORY } from 'src/shared/constants';

interface CatalogAccessoriesModalProps {
  crudAccessoryModalOpen: boolean;
  setCrudAccessoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentBodyMake: TReceivedBodyMakeObj | null;
  setCurrentBodyMake: React.Dispatch<React.SetStateAction<TReceivedBodyMakeObj | null>>;
  showCreateModal: ICrudModal;
  showUpdateModal: ICrudModal;
  showDeleteModal: ICrudModal;
  setShowCreateModal: React.Dispatch<React.SetStateAction<ICrudModal>>;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<ICrudModal>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<ICrudModal>>;
}

type Props = CatalogAccessoriesModalProps & StateProps & DispatchProps;

const CatalogAccessoriesModal: React.FC<Props> = ({
  currentBodyMake,
  dashboardLoading,
  showCreateModal,
  showUpdateModal,
  showDeleteModal,
  bodyAccessoriesArray,
  crudAccessoryModalOpen,
  generalAccessoriesArray,
  bodyMakeAccessoriesArray,
  setShowCreateModal,
  setShowUpdateModal,
  setShowDeleteModal,
  onDeleteAccessory,
  onCreateAccessory,
  onUpdateAccessory,
  onSetAccessoryType,
  setCurrentBodyMake,
  onGetBodyAccessories,
  onCreateBodyAccessory,
  onGetSalesAccessories,
  onDeleteBodyAccessory,
  onGetBodyMakeAccessories,
  onDeleteBodyMakeAccessory,
  onCreateBodyMakeAccessory,
  onUpdateBodyMakeAccessory,
  setCrudAccessoryModalOpen,
  onGetBodyAssociatedAccessories,
  onGetDimensionAssociatedAccessories,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [createAccessoryForm] = Form.useForm();
  const [updateAccessoryForm] = Form.useForm();
  const [createBodyAccessoryForm] = Form.useForm();
  const [createBodyMakeAccessoryForm] = Form.useForm();
  const [updateBodyMakeAccessoryForm] = Form.useForm();
  //   to know whether the modal is to create general/body/dimension associated accessory
  const [accessoryCategory, setAccessoryCategory] = useState({ general: false, body: false, dimension: false });

  const [deleteModalContent, setDeleteModalContent] = useState({
    accessory: { accessoryId: -1, warningText: '', backupWarningText: 'this accessory' },
    body_accessory: {
      body_id: -1,
      body_accessory_id: -1,
      bodyTitle: '',
      accessoryTitle: '',
      warningText: '',
      backupWarningText: 'this body accessory',
    },
    body_make_accessory: {
      body_make_id: -1,
      body_make_accessory_id: -1,
      bodyTitle: '',
      accessoryTitle: '',
      dimensionTitle: '',
      warningText: '',
      backupWarningText: 'this body with dimension accessory',
    },
  });

  /* ======================== */
  /*   Image related states   */
  /* ======================== */
  // Upload states
  const [uploadSelectedFiles, setUploadSelectedFiles] = useState<FileList | null | undefined>(null);
  // state to store temporary images before user uploads
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState<string[]>([]); //this is for preview image purposes only

  /* ================================================== */
  /*  method */
  /* ================================================== */
  /**
   * Use accessoryType string to check which category type is the accessory in and return the correct booleans
   * @param {string} accessoryType
   * @return {boolean} {general_bool: boolean, dimension_associated_bool: boolean}
   */
  const checkCategory = (accessoryType: string) => {
    let general_bool = false;
    let dimension_associated_bool = false;
    switch (accessoryType) {
      case GENERAL_ACCESSORY:
        general_bool = true;
        dimension_associated_bool = false;
        break;
      case DIMENSION_ACCESSORY:
        general_bool = false;
        dimension_associated_bool = true;
        break;
      case BODY_ACCESSORY:
        general_bool = false;
        dimension_associated_bool = false;
        break;
      default:
    }
    return { general_bool: general_bool, dimension_associated_bool: dimension_associated_bool };
  };

  const convertAccessoryBoolToCategory = (general: boolean, dimension: boolean) => {
    let accessoryTypeName = '';
    if (general === true && dimension === false) {
      accessoryTypeName = GENERAL_ACCESSORY;
    } else if (general === false && dimension === true) {
      accessoryTypeName = DIMENSION_ACCESSORY;
    } else if (general === false && dimension === false) {
      accessoryTypeName = BODY_ACCESSORY;
    } else {
      accessoryTypeName = 'NULL';
    }
    return accessoryTypeName;
  };

  // the keys "values" are from the form's 'name' attribute
  const onCreateAccessoryFinish = (values: {
    accessoryTitle: string;
    accessoryDescription: string;
    accessoryType: string;
    accessoryPrice: string;
    imageTag: string;
  }) => {
    const { general_bool, dimension_associated_bool } = checkCategory(values.accessoryType);

    // if not then just get the title and description
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call
      let createAccessoryData = {
        title: values.accessoryTitle,
        description: values.accessoryDescription,
        general: general_bool,
        price: convertPriceToFloat(values.accessoryPrice),
        dimension_associated: dimension_associated_bool,
        imageTag: values.imageTag,
        imageFiles: uploadSelectedFiles,
      };
      onCreateAccessory(createAccessoryData);
    } else {
      let createAccessoryData = {
        title: values.accessoryTitle,
        description: values.accessoryDescription,
        price: convertPriceToFloat(values.accessoryPrice),
        general: general_bool,
        dimension_associated: dimension_associated_bool,
        imageTag: null,
        imageFiles: null,
      };
      onCreateAccessory(createAccessoryData);
    }
  };

  const onUpdateAccessoryFinish = (values: {
    accessoryId: number;
    accessoryTitle: string;
    accessoryDescription: string;
    accessoryType: string;
    accessoryPrice: string;
    imageTag: string;
  }) => {
    const { general_bool, dimension_associated_bool } = checkCategory(values.accessoryType);
    if (uploadSelectedFiles && uploadSelectedFiles.length > 0) {
      // if there are files being selected to be uploaded
      // then send the tag and image files to the api call

      let updateAccessoryData = {
        id: values.accessoryId,
        title: values.accessoryTitle,
        description: values.accessoryDescription,
        general: general_bool,
        price: convertPriceToFloat(values.accessoryPrice),
        dimension_associated: dimension_associated_bool,
        imageTag: values.imageTag,
        imageFiles: uploadSelectedFiles,
      };
      onUpdateAccessory(updateAccessoryData);
    } else {
      let updateAccessoryData = {
        id: values.accessoryId,
        title: values.accessoryTitle,
        description: values.accessoryDescription,
        price: convertPriceToFloat(values.accessoryPrice),
        general: general_bool,
        dimension_associated: dimension_associated_bool,
        imageTag: null,
        imageFiles: null,
      };
      onUpdateAccessory(updateAccessoryData);
    }
  };
  const onDeleteAccessoryFinish = () => {
    onDeleteAccessory(deleteModalContent.accessory.accessoryId);
  };

  /* ------------------------------------ */
  //   Body Accessory
  /* ------------------------------------ */

  const onCreateBodyAccessoryFinish = (values: { bodyId: number; accessoryId: number }) => {
    onCreateBodyAccessory(values.bodyId, values.accessoryId);
  };
  const onDeleteBodyAccessoryFinish = () => {
    onDeleteBodyAccessory(
      deleteModalContent.body_accessory.body_id,
      deleteModalContent.body_accessory.body_accessory_id,
    );
  };

  /* ------------------------------------ */
  //   Body Make Accessory
  /* ------------------------------------ */
  const onCreateBodyMakeAccessoryFinish = (values: {
    accessoryId: number;
    accessoryPrice: string;
    bodyMakeId: number;
  }) => {
    onCreateBodyMakeAccessory(convertPriceToFloat(values.accessoryPrice), values.bodyMakeId, values.accessoryId);
  };
  const onUpdateBodyMakeAccessoryFinish = (values: {
    accessoryPrice: string;
    bodyMakeId: number;
    bodyMakeAccessoryId: number;
  }) => {
    onUpdateBodyMakeAccessory(
      values.bodyMakeId,
      values.bodyMakeAccessoryId,
      convertPriceToFloat(values.accessoryPrice),
    );
  };

  const onDeleteBodyMakeAccessoryFinish = () => {
    onDeleteBodyMakeAccessory(
      deleteModalContent.body_make_accessory.body_make_id,
      deleteModalContent.body_make_accessory.body_make_accessory_id,
    );
  };
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  useEffect(() => {
    if (currentBodyMake) {
      onGetSalesAccessories(currentBodyMake.id);
    }
  }, [currentBodyMake, onGetSalesAccessories]);

  useEffect(() => {
    if (currentBodyMake) {
      onGetBodyAccessories(currentBodyMake.body.id);
      onGetBodyMakeAccessories(currentBodyMake.id);
    }
  }, [currentBodyMake, onGetBodyAccessories, onGetBodyMakeAccessories]);

  useEffect(() => {
    onGetBodyAssociatedAccessories();
  }, [onGetBodyAssociatedAccessories]);
  useEffect(() => {
    onGetDimensionAssociatedAccessories();
  }, [onGetDimensionAssociatedAccessories]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* ------------------- */}
      {/* Accessory */}
      {/* ------------------- */}
      <CrudModal
        crud={'create'}
        isDashboard={false}
        indexKey={'accessory'}
        category={'accessory'}
        showModal={showCreateModal}
        antdForm={createAccessoryForm}
        setShowModal={setShowCreateModal}
        onFinish={onCreateAccessoryFinish}
        visible={showCreateModal.accessory}
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
        setUploadSelectedFiles={setUploadSelectedFiles}
        loading={dashboardLoading !== undefined && dashboardLoading}
        modalTitle={`Create ${accessoryCategory.general ? 'General' : ''} 
        ${accessoryCategory.body ? 'Body Associated' : ''} 
          ${accessoryCategory.dimension ? 'Dimension Associated' : ''} Accessory`}
      />
      <CrudModal
        crud={'update'}
        isDashboard={false}
        indexKey={'accessory'}
        category={'accessory'}
        showModal={showUpdateModal}
        antdForm={updateAccessoryForm}
        setShowModal={setShowUpdateModal}
        onFinish={onUpdateAccessoryFinish}
        visible={showUpdateModal.accessory}
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
        setUploadSelectedFiles={setUploadSelectedFiles}
        loading={dashboardLoading !== undefined && dashboardLoading}
        modalTitle={`Update Accessory`}
      />
      <CrudModal
        crud={'delete'}
        indexKey={'accessory'}
        category={'accessory'}
        modalTitle={`Delete Accessory`}
        showModal={showDeleteModal}
        visible={showDeleteModal.accessory}
        onDelete={onDeleteAccessoryFinish}
        setShowModal={setShowDeleteModal}
        warningText={deleteModalContent.accessory.warningText}
        backupWarningText={deleteModalContent.accessory.backupWarningText}
        loading={dashboardLoading !== undefined && dashboardLoading}
      />
      {/* --------------------------- */}
      {/* Body Accessory */}
      {/* --------------------------- */}
      <CrudModal
        crud={'create'}
        isDashboard={false}
        indexKey={'body_accessory'}
        category={'body_accessory'}
        showModal={showCreateModal}
        antdForm={createBodyAccessoryForm}
        setShowModal={setShowCreateModal}
        onFinish={onCreateBodyAccessoryFinish}
        visible={showCreateModal.body_accessory}
        loading={dashboardLoading !== undefined && dashboardLoading}
        modalTitle={`Assign Accessory ${currentBodyMake ? `to ${currentBodyMake.body.title}` : 'to this body'}`}
      />
      <CrudModal
        crud={'delete'}
        indexKey={'body_accessory'}
        category={'body_accessory'}
        modalTitle={`Remove Assigned Accessory`}
        showModal={showDeleteModal}
        visible={showDeleteModal.body_accessory}
        onDelete={onDeleteBodyAccessoryFinish}
        setShowModal={setShowDeleteModal}
        customDeleteTextComponent={
          <>
            You are about to remove&nbsp;
            <>
              <span className="dashboard__delete-message">{deleteModalContent.body_accessory.accessoryTitle}</span>
              &nbsp;from&nbsp;
              <span className="dashboard__delete-message">{deleteModalContent.body_accessory.bodyTitle}</span>
              .&nbsp;Proceed?
            </>
          </>
        }
        customDeleteButtonText={'Yes, Remove It'}
        warningText={deleteModalContent.body_accessory.warningText}
        backupWarningText={deleteModalContent.body_accessory.backupWarningText}
        loading={dashboardLoading !== undefined && dashboardLoading}
      />
      {/* ------------------------- */}
      {/* Body Make Accessory */}
      {/* ------------------------- */}
      <CrudModal
        crud={'create'}
        isDashboard={false}
        indexKey={'body_make_accessory'}
        category={'body_make_accessory'}
        showModal={showCreateModal}
        antdForm={createBodyMakeAccessoryForm}
        setShowModal={setShowCreateModal}
        onFinish={onCreateBodyMakeAccessoryFinish}
        visible={showCreateModal.body_make_accessory}
        loading={dashboardLoading !== undefined && dashboardLoading}
        modalTitle={`Assign Accessory ${
          currentBodyMake
            ? `to ${currentBodyMake.body.title} with dimension (${
                currentBodyMake?.width !== null && currentBodyMake?.width !== '' && currentBodyMake?.width !== '\' "'
                  ? ` W: ${currentBodyMake?.width}`
                  : ''
              }${
                currentBodyMake?.depth !== null && currentBodyMake?.depth !== '' && currentBodyMake?.depth !== '\' "'
                  ? ` | D: ${currentBodyMake?.depth}`
                  : ''
              }${
                currentBodyMake?.height !== null && currentBodyMake?.height !== '' && currentBodyMake?.height !== '\' "'
                  ? ` | H: ${currentBodyMake?.height}`
                  : ''
              })`
            : "to this body with it's dimension"
        }`}
      />
      <CrudModal
        crud={'update'}
        isDashboard={false}
        indexKey={'body_make_accessory'}
        category={'body_make_accessory'}
        showModal={showUpdateModal}
        antdForm={updateBodyMakeAccessoryForm}
        setShowModal={setShowUpdateModal}
        onFinish={onUpdateBodyMakeAccessoryFinish}
        visible={showUpdateModal.body_make_accessory}
        loading={dashboardLoading !== undefined && dashboardLoading}
        modalTitle={`Assign Accessory ${
          currentBodyMake
            ? `to ${currentBodyMake.body.title} with dimension (${
                currentBodyMake?.width !== null && currentBodyMake?.width !== '' && currentBodyMake?.width !== '\' "'
                  ? ` W: ${currentBodyMake?.width}`
                  : ''
              }${
                currentBodyMake?.depth !== null && currentBodyMake?.depth !== '' && currentBodyMake?.depth !== '\' "'
                  ? ` | D: ${currentBodyMake?.depth}`
                  : ''
              }${
                currentBodyMake?.height !== null && currentBodyMake?.height !== '' && currentBodyMake?.height !== '\' "'
                  ? ` | H: ${currentBodyMake?.height}`
                  : ''
              })`
            : "to this body with it's dimension"
        }`}
      />

      <CrudModal
        crud={'delete'}
        indexKey={'body_make_accessory'}
        category={'body_make_accessory'}
        modalTitle={`Remove Assigned Accessory`}
        showModal={showDeleteModal}
        visible={showDeleteModal.body_make_accessory}
        onDelete={onDeleteBodyMakeAccessoryFinish}
        setShowModal={setShowDeleteModal}
        warningText={deleteModalContent.body_make_accessory.warningText}
        backupWarningText={deleteModalContent.body_make_accessory.backupWarningText}
        loading={dashboardLoading !== undefined && dashboardLoading}
        customDeleteTextComponent={
          <>
            You are about to remove&nbsp;
            <>
              <span className="dashboard__delete-message">{deleteModalContent.body_make_accessory.accessoryTitle}</span>
              &nbsp;from&nbsp;
              <span className="dashboard__delete-message">{deleteModalContent.body_make_accessory.bodyTitle}</span>
              &nbsp;with it's dimension&nbsp;
              <span className="dashboard__delete-message">{deleteModalContent.body_make_accessory.dimensionTitle}</span>
              .&nbsp;Proceed?
            </>
          </>
        }
        customDeleteButtonText={'Yes, Remove It'}
      />

      <Modal
        centered
        className="catalogbodymake__modal"
        title={
          currentBodyMake ? (
            <span>
              All accessories for&nbsp;
              <span className="catalogbodymake__modal-title-highlight">
                {currentBodyMake.make_wheelbase.wheelbase.title}mm&nbsp;|&nbsp;
                {currentBodyMake.make_wheelbase.make.brand.title}&nbsp;
                {currentBodyMake.make_wheelbase.make.series}&nbsp;|&nbsp;{currentBodyMake.body.title}
              </span>
            </span>
          ) : (
            'All accessories for this body'
          )
        }
        width={800}
        visible={crudAccessoryModalOpen}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText={'Close'}
        onCancel={() => {
          // close the modal and clear the current body make obj
          setCurrentBodyMake(null);
          setCrudAccessoryModalOpen(false);
        }}
      >
        {generalAccessoriesArray && bodyAccessoriesArray && bodyMakeAccessoriesArray ? (
          <>
            <div className="catalogbodymake__modal-div">
              <div>
                <Divider orientation="left">
                  <div className="flex-align-center">
                    <div className="catalogbodymake__modal-divider">
                      General<span className="mobilehide-inline-block">&nbsp;Accessories</span>
                    </div>
                    <Tooltip title={`Create General Accessory`}>
                      <div
                        className="catalogaccessoriesmodal__button-create"
                        onClick={() => {
                          onSetAccessoryType(GENERAL_ACCESSORY);
                          createAccessoryForm.setFieldsValue({ accessoryType: GENERAL_ACCESSORY });
                          setShowCreateModal({ ...showCreateModal, accessory: true });
                          setAccessoryCategory({ ...accessoryCategory, general: true, body: false, dimension: false });
                        }}
                      >
                        <i className="fas fa-plus"></i>&nbsp;Create
                      </div>
                    </Tooltip>
                  </div>
                </Divider>
                <>
                  {/* ============================= */}
                  {/* General Accessories array */}
                  {/* ============================= */}
                  {generalAccessoriesArray.length > 0 ? (
                    <div>
                      <div className="catalogaccessoriesmodal__accessories-grid">
                        {generalAccessoriesArray.map((accessoryObj) => {
                          return (
                            <div key={uuidv4()} className="catalogaccessoriesmodal__accessories-div">
                              <Tooltip
                                title={`${accessoryObj.title}${
                                  accessoryObj.description && accessoryObj.description !== ''
                                    ? ` (${accessoryObj.description})`
                                    : ''
                                }`}
                              >
                                <div className="catalogaccessoriesmodal__accessories-title">{accessoryObj.title}</div>
                              </Tooltip>
                              <div className="catalogaccessoriesmodal__button-crud-div">
                                {accessoryObj.price !== 0 && accessoryObj.price !== null ? (
                                  <Tag color="red" className="margin_l-1">
                                    RM&nbsp;{accessoryObj.price}
                                  </Tag>
                                ) : (
                                  <Tag color="red" className="margin_l-1">
                                    -----
                                  </Tag>
                                )}
                                {/* Edit Button */}
                                <div
                                  className="catalogaccessoriesmodal__button-crud-edit"
                                  onClick={() => {
                                    onSetAccessoryType(GENERAL_ACCESSORY);
                                    updateAccessoryForm.setFieldsValue({
                                      accessoryId: accessoryObj.id,
                                      accessoryTitle: accessoryObj.title,
                                      accessoryType: convertAccessoryBoolToCategory(
                                        accessoryObj.general,
                                        accessoryObj.dimension_associated,
                                      ),
                                      accessoryPrice: accessoryObj.price,
                                      accessoryDescription: accessoryObj.description,
                                    });
                                    setShowUpdateModal({ ...showUpdateModal, accessory: true });
                                  }}
                                >
                                  <i className="fas fa-edit"></i>
                                </div>
                                {/* Delete Button */}
                                <div
                                  className="catalogaccessoriesmodal__button-crud-delete"
                                  onClick={() => {
                                    setDeleteModalContent({
                                      ...deleteModalContent,
                                      accessory: {
                                        accessoryId: accessoryObj.id,
                                        warningText: accessoryObj.title,
                                        backupWarningText: 'this accessory',
                                      },
                                    });
                                    setShowDeleteModal({ ...showDeleteModal, accessory: true });
                                  }}
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No general accessories</span>} />
                  )}
                </>
              </div>

              <div>
                <Divider orientation="left">
                  <div className="flex-align-center">
                    <div className="catalogbodymake__modal-divider">
                      Body
                      <span className="mobilehide-inline-block">&nbsp;Associated Accessories</span>
                    </div>
                    <Tooltip title={`Assign accessory to ${currentBodyMake?.body.title}`}>
                      <div
                        className="catalogaccessoriesmodal__button-create"
                        onClick={() => {
                          setShowCreateModal({ ...showCreateModal, body_accessory: true });
                          createBodyAccessoryForm.setFieldsValue({ bodyId: currentBodyMake?.body.id });
                        }}
                      >
                        <i className="fas fa-wrench"></i>&nbsp;Assign
                      </div>
                    </Tooltip>
                    <Tooltip title={`Create Body Associated Accessory`}>
                      <div
                        className="catalogaccessoriesmodal__button-create"
                        onClick={() => {
                          onSetAccessoryType(BODY_ACCESSORY);
                          createAccessoryForm.setFieldsValue({ accessoryType: BODY_ACCESSORY });
                          setShowCreateModal({ ...showCreateModal, accessory: true });
                          setAccessoryCategory({ ...accessoryCategory, general: false, body: true, dimension: false });
                        }}
                      >
                        <i className="fas fa-plus"></i>&nbsp;Create
                      </div>
                    </Tooltip>
                  </div>
                </Divider>

                {/* ============================= */}
                {/* Body Accessories array */}
                {/* ============================= */}
                {bodyAccessoriesArray.length > 0 ? (
                  <div className="catalogbodymake__modal-checkboxes-div">
                    <div className="catalogaccessoriesmodal__accessories-grid">
                      {bodyAccessoriesArray.map((bodyAccessoryObj) => {
                        return (
                          <div key={uuidv4()} className="catalogaccessoriesmodal__accessories-div">
                            <div className="catalogaccessoriesmodal__accessories-title">
                              <Tooltip
                                title={`${bodyAccessoryObj.accessory.title}${
                                  bodyAccessoryObj.accessory.description &&
                                  bodyAccessoryObj.accessory.description !== ''
                                    ? ` (${bodyAccessoryObj.accessory.description})`
                                    : ''
                                }`}
                              >
                                {bodyAccessoryObj.accessory.title}
                              </Tooltip>
                            </div>
                            {/* Price */}
                            <div className="catalogaccessoriesmodal__button-crud-div">
                              {bodyAccessoryObj.accessory.price !== 0 && bodyAccessoryObj.accessory.price !== null ? (
                                <Tag color="red" className="margin_l-1">
                                  RM&nbsp;{bodyAccessoryObj.accessory.price}
                                </Tag>
                              ) : (
                                <Tag color="red" className="margin_l-1">
                                  -----
                                </Tag>
                              )}
                              {/* Edit Button */}
                              <div
                                className="catalogaccessoriesmodal__button-crud-edit"
                                onClick={() => {
                                  updateAccessoryForm.setFieldsValue({
                                    accessoryId: bodyAccessoryObj.accessory.id,
                                    accessoryTitle: bodyAccessoryObj.accessory.title,
                                    accessoryType: convertAccessoryBoolToCategory(
                                      bodyAccessoryObj.accessory.general,
                                      bodyAccessoryObj.accessory.dimension_associated,
                                    ),
                                    accessoryPrice: bodyAccessoryObj.accessory.price,
                                    accessoryDescription: bodyAccessoryObj.accessory.description,
                                  });
                                  setShowUpdateModal({ ...showUpdateModal, accessory: true });
                                }}
                              >
                                <i className="fas fa-edit"></i>
                              </div>
                              {/* Delete Button */}
                              <div
                                className="catalogaccessoriesmodal__button-crud-delete"
                                onClick={() => {
                                  if (currentBodyMake) {
                                    setShowDeleteModal({ ...showDeleteModal, body_accessory: true });
                                    setDeleteModalContent({
                                      ...deleteModalContent,
                                      body_accessory: {
                                        body_id: currentBodyMake.body.id,
                                        body_accessory_id: bodyAccessoryObj.id,
                                        bodyTitle: currentBodyMake.body.title,
                                        accessoryTitle: bodyAccessoryObj.accessory.title,
                                        warningText: `${bodyAccessoryObj.accessory.title} from ${currentBodyMake.body.title}`,
                                        backupWarningText: 'this accessory from this body',
                                      },
                                    });
                                  }
                                }}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<span>No accessory assigned to this body yet</span>}
                  />
                )}
              </div>

              <div>
                <Divider orientation="left">
                  <div className="flex-align-center">
                    <div className="catalogbodymake__modal-divider">
                      Dimension
                      <span className="mobilehide-inline-block">&nbsp;Associated Accessories</span>
                    </div>
                    {/* Create body make accessory button */}
                    <Tooltip
                      title={`Assign accessory to ${currentBodyMake?.body.title} with dimension (${
                        currentBodyMake?.width !== null &&
                        currentBodyMake?.width !== '' &&
                        currentBodyMake?.width !== '\' "'
                          ? ` W: ${currentBodyMake?.width}`
                          : ''
                      }${
                        currentBodyMake?.depth !== null &&
                        currentBodyMake?.depth !== '' &&
                        currentBodyMake?.depth !== '\' "'
                          ? ` | D: ${currentBodyMake?.depth}`
                          : ''
                      }${
                        currentBodyMake?.height !== null &&
                        currentBodyMake?.height !== '' &&
                        currentBodyMake?.height !== '\' "'
                          ? ` | H: ${currentBodyMake?.height}`
                          : ''
                      })`}
                    >
                      <div
                        className="catalogaccessoriesmodal__button-create"
                        onClick={() => {
                          if (currentBodyMake) {
                            setShowCreateModal({ ...showCreateModal, body_make_accessory: true });
                            createBodyMakeAccessoryForm.setFieldsValue({ bodyMakeId: currentBodyMake.id });
                          }
                        }}
                      >
                        <i className="fas fa-wrench"></i>&nbsp;Assign
                      </div>
                    </Tooltip>
                    {/* Create Dimension Accessory Button */}
                    <Tooltip title={`Create Dimension Associated Accessory`}>
                      <div
                        className="catalogaccessoriesmodal__button-create"
                        onClick={() => {
                          onSetAccessoryType(DIMENSION_ACCESSORY);
                          createAccessoryForm.setFieldsValue({ accessoryType: DIMENSION_ACCESSORY });
                          setShowCreateModal({ ...showCreateModal, accessory: true });
                          setAccessoryCategory({ ...accessoryCategory, general: false, body: false, dimension: true });
                        }}
                      >
                        <i className="fas fa-plus"></i>&nbsp;Create
                      </div>
                    </Tooltip>
                  </div>
                </Divider>

                {/* ============================= */}
                {/* Body Make Accessories array */}
                {/* ============================= */}
                {bodyMakeAccessoriesArray.length > 0 ? (
                  <div className="catalogbodymake__modal-checkboxes-div">
                    <div className="catalogaccessoriesmodal__accessories-grid">
                      {bodyMakeAccessoriesArray.map((bodyMakeAccessoryObj) => {
                        // map out unique id to keep track of which accessories is this
                        return (
                          <div key={uuidv4()} className="catalogaccessoriesmodal__accessories-div">
                            {/* Title */}
                            <div className="catalogaccessoriesmodal__accessories-title">
                              <Tooltip
                                title={`${bodyMakeAccessoryObj.accessory.title}${
                                  bodyMakeAccessoryObj.accessory.description &&
                                  bodyMakeAccessoryObj.accessory.description !== ''
                                    ? ` (${bodyMakeAccessoryObj.accessory.description})`
                                    : ''
                                }`}
                              >
                                {bodyMakeAccessoryObj.accessory.title}
                              </Tooltip>
                            </div>
                            <div className="catalogaccessoriesmodal__button-crud-div">
                              {/* The body make accessory's price */}
                              {bodyMakeAccessoryObj.price !== 0 && bodyMakeAccessoryObj.price !== null ? (
                                <Tag color="red" className="margin_l-1">
                                  RM&nbsp;{bodyMakeAccessoryObj.price}
                                </Tag>
                              ) : (
                                <Tag color="red" className="margin_l-1">
                                  -----
                                </Tag>
                              )}
                              {/* Edit Button */}
                              <div
                                className="catalogaccessoriesmodal__button-crud-edit"
                                onClick={() => {
                                  setShowUpdateModal({ ...showUpdateModal, body_make_accessory: true });
                                  // fill in the updateBodyAccessoryform
                                  if (currentBodyMake) {
                                    updateBodyMakeAccessoryForm.setFieldsValue({
                                      bodyMakeId: currentBodyMake.id,
                                      accessoryPrice: bodyMakeAccessoryObj.price,
                                      bodyMakeAccessoryId: bodyMakeAccessoryObj.id,
                                    });
                                  }
                                }}
                              >
                                <i className="fas fa-edit"></i>
                              </div>

                              {/* Delete Button */}
                              <div
                                className="catalogaccessoriesmodal__button-crud-delete"
                                onClick={() => {
                                  if (currentBodyMake) {
                                    setShowDeleteModal({ ...showDeleteModal, body_make_accessory: true });
                                    setDeleteModalContent({
                                      ...deleteModalContent,
                                      body_make_accessory: {
                                        body_make_id: currentBodyMake.id,
                                        body_make_accessory_id: bodyMakeAccessoryObj.id,
                                        bodyTitle: currentBodyMake.body.title,
                                        accessoryTitle: bodyMakeAccessoryObj.accessory.title,
                                        dimensionTitle: `${
                                          currentBodyMake?.width !== null &&
                                          currentBodyMake?.width !== '' &&
                                          currentBodyMake?.width !== '\' "'
                                            ? ` W: ${currentBodyMake?.width}`
                                            : ''
                                        }${
                                          currentBodyMake?.depth !== null &&
                                          currentBodyMake?.depth !== '' &&
                                          currentBodyMake?.depth !== '\' "'
                                            ? ` | D: ${currentBodyMake?.depth}`
                                            : ''
                                        }${
                                          currentBodyMake?.height !== null &&
                                          currentBodyMake?.height !== '' &&
                                          currentBodyMake?.height !== '\' "'
                                            ? ` | H: ${currentBodyMake?.height}`
                                            : ''
                                        }`,
                                        warningText: '',
                                        backupWarningText: "this accessory from this body with it's dimension",
                                      },
                                    });
                                  }
                                }}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<span>No accessory assigned to this body and dimension yet</span>}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        )}
      </Modal>
    </>
  );
};

interface StateProps {
  accessObj?: TUserAccess;
  dashboardLoading?: boolean;
  successMessage?: string | null;
  accessoriesArray?: TReceivedAccessoryObj[] | null;
  bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
  generalAccessoriesArray?: TReceivedAccessoryObj[] | null;
  bodyMakeAccessoriesArray?: TReceivedBodyMakeAccessoryObj[] | null;
  dimensionRelatedAccessoriesArray?: TReceivedDimensionAccessoryObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    dashboardLoading: state.dashboard.loading,
    successMessage: state.dashboard.successMessage,
    accessoriesArray: state.dashboard.accessoriesArray,
    bodyAccessoriesArray: state.dashboard.bodyAccessoriesArray,
    generalAccessoriesArray: state.sales.generalAccessoriesArray,
    bodyMakeAccessoriesArray: state.dashboard.bodyMakeAccessoriesArray,
    dimensionRelatedAccessoriesArray: state.sales.dimensionRelatedAccessoriesArray,
  };
};

interface DispatchProps {
  onSetAccessoryType: typeof actions.setAccessoryType;
  onCreateAccessory: typeof actions.createAccessory;
  onUpdateAccessory: typeof actions.updateAccessory;
  onDeleteAccessory: typeof actions.deleteAccessory;
  onGetSalesAccessories: typeof actions.getSalesAccessories;
  onCreateBodyAccessory: typeof actions.createBodyAccessory;
  onDeleteBodyAccessory: typeof actions.deleteBodyAccessory;
  onGetBodyAccessories: typeof actions.getBodyAccessories;
  onGetBodyMakeAccessories: typeof actions.getBodyMakeAccessories;
  onCreateBodyMakeAccessory: typeof actions.createBodyMakeAccessory;
  onUpdateBodyMakeAccessory: typeof actions.updateBodyMakeAccessory;
  onDeleteBodyMakeAccessory: typeof actions.deleteBodyMakeAccessory;
  onGetBodyAssociatedAccessories: typeof actions.getBodyAssociatedAccessories;
  onGetDimensionAssociatedAccessories: typeof actions.getDimensionAssociatedAccessories;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onDeleteBodyAccessory: (body_id, body_accessory_id) =>
      dispatch(actions.deleteBodyAccessory(body_id, body_accessory_id)),
    onDeleteBodyMakeAccessory: (body_make_id, body_make_accessory_id) =>
      dispatch(actions.deleteBodyMakeAccessory(body_make_id, body_make_accessory_id)),
    onSetAccessoryType: (accessoryType) => dispatch(actions.setAccessoryType(accessoryType)),
    onCreateBodyMakeAccessory: (price, body_make_id, accessory_id) =>
      dispatch(actions.createBodyMakeAccessory(price, body_make_id, accessory_id)),
    onUpdateBodyMakeAccessory: (body_make_id, body_make_accessory_id, price) =>
      dispatch(actions.updateBodyMakeAccessory(body_make_id, body_make_accessory_id, price)),
    onGetBodyAccessories: (body_id) => dispatch(actions.getBodyAccessories(body_id)),
    onDeleteAccessory: (accessory_id) => dispatch(actions.deleteAccessory(accessory_id)),
    onGetSalesAccessories: (body_make_id) => dispatch(actions.getSalesAccessories(body_make_id)),
    onGetBodyAssociatedAccessories: () => dispatch(actions.getBodyAssociatedAccessories()),
    onGetDimensionAssociatedAccessories: () => dispatch(actions.getDimensionAssociatedAccessories()),
    onGetBodyMakeAccessories: (body_make_id) => dispatch(actions.getBodyMakeAccessories(body_make_id)),
    onCreateAccessory: (createAccessoryData) => dispatch(actions.createAccessory(createAccessoryData)),
    onUpdateAccessory: (updateAccessoryData) => dispatch(actions.updateAccessory(updateAccessoryData)),
    onCreateBodyAccessory: (body_id, accessory_id) => dispatch(actions.createBodyAccessory(body_id, accessory_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogAccessoriesModal);

import React from 'react';
/* components */
import MakeFormItems from 'src/components/Modal/Crud/FormItems/MakeFormItems';
import FeesFormItems from 'src/components/Modal/Crud/FormItems/FeesFormItems';
import SeriesFormItems from 'src/components/Modal/Crud/FormItems/SeriesFormItems';
import BodyMakeFormItems from 'src/components/Modal/Crud/FormItems/BodyMakeFormItems';
import JobStatusFormItems from 'src/components/Modal/Crud/FormItems/JobStatusFormItems';
import ServiceTypesFormItems from 'src/components/Modal/Crud/FormItems/ServiceTypesFormItems';
import AccessoryMakeFormItems from 'src/components/Modal/Crud/FormItems/AccessoryMakeFormItems';
import BodyAccessoryFormItems from 'src/components/Modal/Crud/FormItems/BodyAccessoryFormItems';
import MakeWheelbaseFormItems from 'src/components/Modal/Crud/FormItems/MakeWheelbaseFormItems';
import BodyMakeAccessoryFormItems from 'src/components/Modal/Crud/FormItems/BodyMakeAccessoryFormItems';
/* 3rd party lib */
import { Modal } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TaskTitleFormItems from './FormItems/TaskTitleFormItems';

interface CrudModalProps extends ICategory {
  /** The title of the modal on top  */
  modalTitle: string;
  modalWidth?: number;
  /** boolean to know if this modal is for dashboard or other place */
  isDashboard?: boolean;
  /** To show or hide the modal  */
  visible: boolean;
  /** for spinner of the modal to show loading  */
  loading: boolean;
  /** The form instance from antd  */
  antdForm?: FormInstance<any>;
  /** index key to change the show modal's boolean  */
  indexKey: string;
  /** warning text when user tries to delete, type text after "You are deleting [maybe a series title here]"  */
  warningText?: string;
  /** Backup text jz incase something's wrong*/
  backupWarningText?: string;
  showModal: {
    [key: string]: boolean;
  };
  setShowModal: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  /** custom delete text component jz incase need to overrwite the whole content*/
  customDeleteTextComponent?: React.ReactNode;
  customDeleteButtonText?: string | null;
  /** onFinish method when user click ok*/
  onFinish?: (values: any) => void;
  /** onDelete method when user is deleting*/
  onDelete?: () => void;
  /** setState action to set the selected files to upload*/
  setUploadSelectedFiles?: React.Dispatch<React.SetStateAction<FileList | null | undefined>>;
  /** url for preview images */
  imagesPreviewUrls?: string[];
  /** set action for image preview urls */
  setImagesPreviewUrls?: React.Dispatch<React.SetStateAction<string[]>>;
  /** crud method - create | update | delete */
  crud: 'create' | 'update' | 'delete';
}
type Props = CrudModalProps;

/** Categories - e.g. make, body, wheelbase......*/
export interface ICategory {
  category:
    | 'fees'
    | 'series'
    | 'make'
    | 'body'
    | 'make_wheelbase'
    | 'body_make'
    | 'accessory'
    | 'body_accessory'
    | 'body_make_accessory'
    | 'wheelbase'
    | 'task'
    | 'task_title'
    | 'job_status'
    | 'service_type';
}

const CrudModal: React.FC<Props> = ({
  crud,
  modalTitle,
  category,
  visible,
  indexKey,
  antdForm,
  loading,
  showModal,
  isDashboard,
  warningText,
  modalWidth = 520,
  imagesPreviewUrls,
  backupWarningText = 'this item',
  onFinish,
  onDelete,
  setShowModal,
  setImagesPreviewUrls,
  setUploadSelectedFiles,
  customDeleteTextComponent,
  customDeleteButtonText,
}) => {
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {crud === 'delete' ? (
        <Modal
          title={
            <div className="dashboard__delete-header">
              <ExclamationCircleOutlined className="dashboard__delete-icon" />
              {modalTitle}
            </div>
          }
          visible={visible}
          onOk={() => {
            if (onDelete !== undefined) onDelete();
          }}
          onCancel={() => setShowModal({ ...showModal, [indexKey]: false })}
          okText={customDeleteButtonText ? customDeleteButtonText : 'Yes, delete it'}
          confirmLoading={loading}
          cancelText="Cancel"
        >
          {customDeleteTextComponent ? (
            customDeleteTextComponent
          ) : (
            <>
              You are deleting&nbsp;
              <>
                {warningText === '' || warningText === null || warningText === undefined ? (
                  <>{backupWarningText}</>
                ) : (
                  <span className="dashboard__delete-message">{`${warningText}`}</span>
                )}
              </>
              , this action is permanent. Are you sure?
            </>
          )}
        </Modal>
      ) : (
        <Modal
          className="catalog__modal"
          centered
          width={modalWidth}
          title={modalTitle}
          visible={visible}
          onOk={() => {
            if (antdForm !== undefined) {
              antdForm.submit();
            }
          }}
          confirmLoading={loading}
          onCancel={() => {
            if (antdForm === undefined) return;
            if (crud === 'create') {
              antdForm.resetFields();
            }
            if (setImagesPreviewUrls !== undefined) {
              setImagesPreviewUrls([]); //clear the image preview when oncancel
            }
            setShowModal({ ...showModal, [indexKey]: false }); //close modal on cancel
          }}
        >
          {/* the content within the modal */}
          {category === 'fees' && antdForm !== undefined && onFinish !== undefined && (
            <FeesFormItems crud={crud} antdForm={antdForm} onFinish={onFinish} />
          )}
          {category === 'series' && antdForm !== undefined && onFinish !== undefined && (
            <SeriesFormItems crud={crud} antdForm={antdForm} onFinish={onFinish} />
          )}
          {category === 'make' &&
            antdForm !== undefined &&
            onFinish !== undefined &&
            imagesPreviewUrls !== undefined &&
            setImagesPreviewUrls !== undefined &&
            setUploadSelectedFiles !== undefined && (
              <MakeFormItems
                crud={crud}
                antdForm={antdForm}
                onFinish={onFinish}
                isDashboard={isDashboard}
                imagesPreviewUrls={imagesPreviewUrls}
                setImagesPreviewUrls={setImagesPreviewUrls}
                setUploadSelectedFiles={setUploadSelectedFiles}
              />
            )}
          {category === 'make_wheelbase' && antdForm !== undefined && onFinish !== undefined && (
            <MakeWheelbaseFormItems crud={crud} antdForm={antdForm} onFinish={onFinish} />
          )}
          {category === 'body_make' &&
            antdForm !== undefined &&
            onFinish !== undefined &&
            imagesPreviewUrls !== undefined &&
            setImagesPreviewUrls !== undefined &&
            setUploadSelectedFiles !== undefined && (
              <BodyMakeFormItems
                crud={crud}
                antdForm={antdForm}
                onFinish={onFinish}
                isDashboard={isDashboard}
                imagesPreviewUrls={imagesPreviewUrls}
                setImagesPreviewUrls={setImagesPreviewUrls}
                setUploadSelectedFiles={setUploadSelectedFiles}
              />
            )}

          {category === 'accessory' &&
            antdForm !== undefined &&
            onFinish !== undefined &&
            imagesPreviewUrls !== undefined &&
            setImagesPreviewUrls !== undefined &&
            setUploadSelectedFiles !== undefined && (
              <AccessoryMakeFormItems
                crud={crud}
                antdForm={antdForm}
                onFinish={onFinish}
                isDashboard={isDashboard}
                imagesPreviewUrls={imagesPreviewUrls}
                setImagesPreviewUrls={setImagesPreviewUrls}
                setUploadSelectedFiles={setUploadSelectedFiles}
              />
            )}

          {category === 'body_accessory' && antdForm !== undefined && onFinish !== undefined && (
            <BodyAccessoryFormItems crud={crud} antdForm={antdForm} onFinish={onFinish} />
          )}
          {category === 'body_make_accessory' && antdForm !== undefined && onFinish !== undefined && (
            <BodyMakeAccessoryFormItems crud={crud} antdForm={antdForm} onFinish={onFinish} />
          )}

          {category === 'job_status' && antdForm !== undefined && onFinish !== undefined && (
            <JobStatusFormItems crud={crud} antdForm={antdForm} onFinish={onFinish} />
          )}
          {category === 'service_type' && antdForm !== undefined && onFinish !== undefined && (
            <ServiceTypesFormItems crud={crud} antdForm={antdForm} onFinish={onFinish} />
          )}
          {category === 'task_title' && antdForm !== undefined && onFinish !== undefined && (
            <TaskTitleFormItems crud={crud} antdForm={antdForm} onFinish={onFinish} />
          )}
        </Modal>
      )}
    </>
  );
};

export default CrudModal;

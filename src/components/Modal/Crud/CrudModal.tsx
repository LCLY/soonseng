import React from 'react';
/* components */
/* 3rd party lib */
import { Form, Input, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
/* Util */
import { handleKeyDown } from 'src/shared/Utils';
import NumberFormat from 'react-number-format';

interface CrudModalProps {
  /** The title of the modal on top  */
  modalTitle: string;
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
  /** onFinish method when user click ok*/
  onFinish?: (values: any) => void;
  /** onDelete method when user is deleting*/
  onDelete?: () => void;
  /** crud method*/
  crud: 'create' | 'update' | 'delete';
  /** Categories - e.g. make, body, wheelbase......*/
  category: 'fees' | 'series';
}
type Props = CrudModalProps;

const CrudModal: React.FC<Props> = ({
  crud,
  modalTitle,
  category,
  visible,
  indexKey,
  antdForm,
  loading,
  showModal,
  onFinish,
  onDelete,
  setShowModal,
  warningText,
  backupWarningText = 'this item',
}) => {
  /* ================================================== */
  /*  component */
  /* ================================================== */

  let formItems = null;

  /* ================================================================================================ */
  //  FEES form items
  /* ================================================================================================ */
  if (category === 'fees') {
    formItems = (
      <>
        {/* The rest of the form items */}
        <Form.Item
          className="make__form-item"
          label="Title"
          name="feesTitle"
          rules={[{ required: true, message: 'Input fees title here!' }]}
        >
          <Input placeholder="Type fees title here" />
        </Form.Item>
        <Form.Item
          className="make__form-item"
          label="Price"
          name="feesPrice"
          rules={[{ required: true, message: 'Input fees price here!' }]}
        >
          <NumberFormat
            placeholder="Type fees price here"
            className="ant-input"
            thousandSeparator={true}
            prefix={'RM '}
          />
        </Form.Item>
        {crud === 'update' && (
          <>
            <Form.Item hidden name="feesId" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </>
        )}
      </>
    );
  }

  /* ================================================================================================ */
  //  SERIES form items
  /* ================================================================================================ */
  if (category === 'series') {
    formItems = (
      <>
        {/* the content within the modal */}
        <Form
          form={antdForm}
          // name="createBrand"
          onKeyDown={(e) => {
            if (antdForm !== undefined) handleKeyDown(e, antdForm);
          }}
          onFinish={(values) => {
            if (onFinish !== undefined) onFinish(values);
          }}
        >
          {/* The rest of the form items */}
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

          {crud === 'update' && (
            <Form.Item hidden name="series_id" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          )}
        </Form>
      </>
    );
  }

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {crud === 'delete' ? (
        <Modal
          title={
            <div className="dashboard__delete-header">
              <ExclamationCircleOutlined className="dashboard__delete-icon" />
              Delete Standard Charges and Fees
            </div>
          }
          visible={visible}
          onOk={() => {
            if (onDelete !== undefined) onDelete();
          }}
          onCancel={() => setShowModal({ ...showModal, [indexKey]: false })}
          okText="Yes, delete it"
          confirmLoading={loading}
          cancelText="Cancel"
        >
          You are deleting&nbsp;
          {warningText !== undefined && (
            <>
              {warningText === '' ? (
                { backupWarningText }
              ) : (
                <span className="dashboard__delete-message">{` ${warningText}`}</span>
              )}
            </>
          )}
          , this action is permanent. Are you sure?
        </Modal>
      ) : (
        <Modal
          className="catalog__modal"
          centered
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
            setShowModal({ ...showModal, [indexKey]: false }); //close modal on cancel
          }}
        >
          {/* the content within the modal */}
          <Form
            form={antdForm}
            // name="createBrand"
            onKeyDown={(e) => {
              if (antdForm !== undefined) handleKeyDown(e, antdForm);
            }}
            onFinish={(values) => {
              if (onFinish !== undefined) onFinish(values);
            }}
          >
            {formItems}
          </Form>
        </Modal>
      )}
    </>
  );
};

export default CrudModal;

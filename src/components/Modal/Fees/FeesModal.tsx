import React from 'react';
/* components */
/* 3rd party lib */
import { Form, Input, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
/* Util */
import { handleKeyDown } from 'src/shared/Utils';
import NumberFormat from 'react-number-format';

interface FeesModalProps {
  title: string;
  visible: boolean;
  loading: boolean;
  antdForm?: FormInstance<any>;
  indexKey: string;
  feesTitle?: string;
  showModal: {
    [key: string]: boolean;
  };
  setShowModal: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  onFinish?: (values: any) => void;
  onDelete?: () => void;
  crud: 'create' | 'update' | 'delete';
}
type Props = FeesModalProps;

const FeesModal: React.FC<Props> = ({
  crud,
  title,
  visible,
  indexKey,
  antdForm,
  loading,
  showModal,
  feesTitle,
  onFinish,
  onDelete,
  setShowModal,
}) => {
  /* ================================================== */
  /*  component */
  /* ================================================== */

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
          You are deleting
          {feesTitle === '' ? (
            ' this standard charges / fees'
          ) : (
            <span className="dashboard__delete-message">{` ${feesTitle}`}</span>
          )}
          , this action is permanent. Are you sure?
        </Modal>
      ) : (
        <Modal
          className="catalog__modal"
          centered
          title={title}
          visible={visible}
          onOk={() => {
            if (antdForm !== undefined) {
              antdForm.submit();
            }
          }}
          confirmLoading={loading}
          onCancel={() => {
            if (antdForm === undefined) return;
            antdForm.resetFields();
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
          </Form>
        </Modal>
      )}
    </>
  );
};

export default FeesModal;

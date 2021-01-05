import React from 'react';
/* components */
/* 3rd party lib */
import { Form, Input, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';

interface SeriesModalProps {
  title: string;
  visible: boolean;
  loading: boolean;
  antdForm: FormInstance<any>;
  indexKey: string;
  showModal: {
    [key: string]: boolean;
  };
  setShowModal: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  onFinish: (values: any) => void;
  crud: 'create' | 'update' | 'delete';
}

type Props = SeriesModalProps;

const SeriesModal: React.FC<Props> = ({
  crud,
  title,
  visible,
  indexKey,
  antdForm,
  loading,
  showModal,
  onFinish,
  setShowModal,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  /* ================================================== */
  /*  method */
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

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <Modal
        className="catalog__modal"
        centered
        title={title}
        visible={visible}
        onOk={antdForm.submit}
        confirmLoading={loading}
        onCancel={() => {
          antdForm.resetFields();
          setShowModal({ ...showModal, [indexKey]: false }); //close modal on cancel
        }}
      >
        {/* the content within the modal */}
        <Form
          form={antdForm}
          // name="createBrand"
          onKeyDown={(e) => handleKeyDown(e, antdForm)}
          onFinish={onFinish}
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
      </Modal>
    </>
  );
};

export default SeriesModal;

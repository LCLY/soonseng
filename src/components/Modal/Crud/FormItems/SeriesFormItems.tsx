import React from 'react';
/* components */
/* 3rd party lib */
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
/* Util */
import { handleKeyDown } from 'src/shared/Utils';

interface SeriesFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

type Props = SeriesFormItemsProps;

const SeriesFormItems: React.FC<Props> = ({ crud, antdForm, onFinish }) => {
  return (
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
};

export default SeriesFormItems;

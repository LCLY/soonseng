import React from 'react';
/* components */
/* 3rd party lib */
import { Form, Input } from 'antd';
import NumberFormat from 'react-number-format';
import { FormInstance } from 'antd/lib/form';
import { handleKeyDown } from 'src/shared/Utils';
interface FeesFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

type Props = FeesFormItemsProps;

const FeesFormItems: React.FC<Props> = ({ crud, antdForm, onFinish }) => {
  return (
    <>
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

        {/* Add this part for update modal form only */}
        {crud === 'update' && (
          <>
            <Form.Item hidden name="feesId" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
};

export default FeesFormItems;

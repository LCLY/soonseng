import React from 'react';
/* components */
/* 3rd party lib */
import { Form, Input } from 'antd';
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
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Input First Name here!' }]}
        >
          <Input placeholder="Type First Name Here" />
        </Form.Item>
        <Form.Item
          className="make__form-item"
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Input Last Name here!' }]}
        >
          <Input placeholder="Type Last Name Here" />
        </Form.Item>
        <Form.Item
          className="make__form-item"
          label="Email"
          name="email"
          rules={[{ required: false, message: 'Input Email here!' }]}
        >
          <Input type="email" placeholder="Type First Name Here" />
        </Form.Item>

        {/* Add this part for update modal form only */}
        {crud === 'update' && (
          <>
            <Form.Item hidden name="userId" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
};

export default FeesFormItems;

import React from 'react';
/* components */
/* 3rd party lib */
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { handleKeyDown } from 'src/shared/Utils';
interface CommitIntakeFormItemsProps {
  crud: 'create' | 'update';
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

type Props = CommitIntakeFormItemsProps;

const CommitIntakeFormItems: React.FC<Props> = ({ antdForm, onFinish }) => {
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
          name="intakeCommitTitle"
          rules={[{ required: true, message: 'Input commit message here!' }]}
        >
          <Input placeholder="Type commit message here" />
        </Form.Item>
        <Form.Item
          className="make__form-item"
          label="Description"
          name="intakeCommitDescription"
          rules={[{ required: true, message: 'Input commit description here!' }]}
        >
          <Input placeholder="Type commit description here" />
        </Form.Item>

        <Form.Item hidden name="userId" rules={[{ required: true, message: 'Required user id!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default CommitIntakeFormItems;

import React from 'react';
/* components */
/* 3rd party lib */
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { handleKeyDown } from 'src/shared/Utils';
import TextArea from 'antd/lib/input/TextArea';
interface TaskTitleFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

type Props = TaskTitleFormItemsProps;

const TaskTitleFormItems: React.FC<Props> = ({ crud, antdForm, onFinish }) => {
  return (
    <>
      <Form
        name="service task"
        form={antdForm}
        // name="createBrand"
        onKeyDown={(e) => {
          if (antdForm !== undefined) handleKeyDown(e, antdForm);
        }}
        onFinish={(values) => {
          if (onFinish !== undefined) onFinish(values);
        }}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input placeholder="Type title here" />
        </Form.Item>
        <Form.Item
          className="make__form-item"
          label="Duration"
          name="duration"
          rules={[{ required: true, message: 'Input duration here!' }]}
        >
          <Input type="number" placeholder="Type duration here" />
        </Form.Item>
        <Form.Item
          className="make__form-item"
          label="Description"
          name="description"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <TextArea rows={3} placeholder="Type description here" />
        </Form.Item>

        <Form.Item hidden name="service_type_id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {/* Add this part for update modal form only */}
        {crud === 'update' && (
          <>
            <Form.Item hidden name="task_title_id" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
};

export default TaskTitleFormItems;

import React from 'react';
/* components */
/* 3rd party lib */
import { Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { handleKeyDown } from 'src/shared/Utils';
import { TReceivedUserRolesObj } from 'src/store/types/dashboard';
import { connect } from 'react-redux';
import { RootState } from 'src';

interface FeesFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

const { Option } = Select;

type Props = FeesFormItemsProps & StateProps;

const FeesFormItems: React.FC<Props> = ({ crud, antdForm, userRolesArray, onFinish }) => {
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
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Input username here!' }]}
        >
          <Input placeholder="Type Username Here" />
        </Form.Item>
        <Form.Item
          className="make__form-item"
          label="Role"
          name="role_id"
          rules={[{ required: true, message: 'Select a role!' }]}
        >
          {/* only render if brandsArray is not null */}
          <Select placeholder="Select a brand">
            {userRolesArray &&
              userRolesArray.map((role) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={role.id} value={role.id}>
                    {role.title}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
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
          label="Password"
          name="password"
          rules={[{ required: false, message: 'Input Password here!' }]}
        >
          <Input type="password" placeholder="Type Password Here" />
        </Form.Item>
        <Form.Item
          className="make__form-item"
          label="Confirm Password"
          name="password_confirmation"
          rules={[{ required: false, message: 'Input Password Again here!' }]}
        >
          <Input type="password" placeholder="Type Password Again Here" />
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

interface StateProps {
  userRolesArray?: TReceivedUserRolesObj[] | null;
}

const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    userRolesArray: state.dashboard.userRolesArray,
  };
};

export default connect(mapStateToProps, null)(FeesFormItems);

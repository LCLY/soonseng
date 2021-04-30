import React from 'react';
/* components */
/* 3rd party lib */
import { Form, Input, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { handleKeyDown } from 'src/shared/Utils';
import { RootState } from 'src';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { TReceivedUserRolesObj } from 'src/store/types/dashboard';
import { roleAccessArray } from 'src/containers/DashboardPage/DashboardCRUD/UserRoles/UserRoles';
interface RolesFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

type Props = RolesFormItemsProps & StateProps;

const RolesFormItems: React.FC<Props> = ({ crud, antdForm, onFinish }) => {
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
          name="roleTitle"
          rules={[{ required: true, message: 'Input role title!' }]}
        >
          <Input placeholder="Type role title here" />
        </Form.Item>
        <Form.Item className="make__form-item" label="Description" name="roleDescription">
          <Input placeholder="Type Description Here" />
        </Form.Item>
        <Form.Item className="make__form-item" label="Access" name="roleAccess">
          <Checkbox.Group style={{ width: '100%' }} className="userroles__checkbox-outerdiv">
            {roleAccessArray.map((child) => (
              <div key={uuidv4()}>
                <Checkbox value={child}>{child}</Checkbox>
              </div>
            ))}
          </Checkbox.Group>
        </Form.Item>

        {/* Add this part for update modal form only */}
        {crud === 'update' && (
          <>
            <Form.Item hidden name="roleId" rules={[{ required: true }]}>
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

const mapStateToProps = (state: RootState): StateProps => {
  return {
    userRolesArray: state.dashboard.userRolesArray,
  };
};

export default connect(mapStateToProps, null)(RolesFormItems);

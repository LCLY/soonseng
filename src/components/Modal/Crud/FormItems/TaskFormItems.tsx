import React from 'react';
/* components */
/* 3rd party lib */
/* utils */
import { RootState } from 'src';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { handleKeyDown } from 'src/shared/Utils';
import { TReceivedJobStatusObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';
import { TReceivedUserInfoObj } from 'src/store/types/auth';

const { Option } = Select;

/* Util */
interface TaskFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

type Props = TaskFormItemsProps & StateProps;

const TaskFormItems: React.FC<Props> = ({
  crud,
  antdForm,
  onFinish,
  jobStatusArray,
  serviceTypesArray,
  usersByRolesArray,
}) => {
  /* ================================================================== */
  // State
  /* ================================================================== */

  return (
    <>
      <Form
        form={antdForm}
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
          label="Registration No."
          name="registrationNumber"
          rules={[{ required: true, message: 'Input Registration Number here!' }]}
        >
          <Input placeholder="Type Registration Number here e.g. DCG1199" />
        </Form.Item>

        {/* Service/Job Types  */}
        <Form.Item
          className="make__form-item"
          label="Job Type"
          name="serviceTypes"
          rules={[{ required: true, message: 'Select A Job!' }]}
        >
          {/* only render if brandsArray is not null */}
          <Select
            showSearch
            placeholder="Select a Job"
            optionFilterProp="children"
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {serviceTypesArray &&
              serviceTypesArray.map((serviceType) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={serviceType.id}>
                    {`${serviceType.title}${
                      serviceType.description !== '' && serviceType.description !== null
                        ? ` - ${serviceType.description}`
                        : ''
                    }`}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        {/* Job Status  */}
        <Form.Item
          className="make__form-item"
          label="Status"
          name="jobStatus"
          rules={[{ required: true, message: 'Select a job status!' }]}
        >
          <Select
            showSearch
            placeholder="Select a job status"
            optionFilterProp="children"
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {jobStatusArray &&
              jobStatusArray.map((jobStatus) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={jobStatus.id}>
                    {`${jobStatus.title}${
                      jobStatus.description !== '' && jobStatus.description !== null
                        ? ` - ${jobStatus.description}`
                        : ''
                    }`}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        {/* Users Array  */}
        <Form.Item
          className="make__form-item"
          label="Assignees"
          name="usersByRoles"
          rules={[{ required: true, message: 'Select one or more mechanics!' }]}
        >
          <Select
            mode="multiple"
            placeholder="Please select mechanics"
            optionFilterProp="children"
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {usersByRolesArray &&
              usersByRolesArray.map((user) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={user.id}>
                    {`${user.first_name} ${user.last_name} - ${user.roles.title}`}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        {/* Add this part for update modal form only */}
        {crud === 'update' && (
          <>
            <Form.Item hidden name="taskId" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
};

interface StateProps {
  jobStatusArray?: TReceivedJobStatusObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
  usersByRolesArray?: TReceivedUserInfoObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    jobStatusArray: state.dashboard.jobStatusArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
    usersByRolesArray: state.task.usersByRolesArray,
  };
};

export default connect(mapStateToProps, null)(TaskFormItems);

import React from 'react';
/* components */
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Form, Input, Select, Skeleton } from 'antd';
/* Util */
import { RootState } from 'src';
import { extractAccessoriesArray, handleKeyDown } from 'src/shared/Utils';
import { TReceivedAccessoryObj, TReceivedBodyAccessoryObj } from 'src/store/types/dashboard';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;

interface BodyAccessoryFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** boolean to know if this modal is for dashboard or other place */
  isDashboard?: boolean;
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

type Props = BodyAccessoryFormItemsProps & StateProps;

const BodyAccessoryFormItems: React.FC<Props> = ({
  antdForm,
  onFinish,
  bodyAccessoriesArray,
  bodyAssociatedAccessoriesArray,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
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
        {/* ------- Select Accessory - value is accessory id but display is accessory title -------*/}
        <Form.Item
          className="make__form-item "
          label="Accessory"
          name="accessoryId"
          rules={[{ required: true, message: 'Select an Accessory!' }]}
        >
          {/* only render if accessoriesArray is not null */}
          {/* also if user already created a new body accessory using body associated accessories */}
          {bodyAssociatedAccessoriesArray && bodyAccessoriesArray ? (
            <Select placeholder="Select an Accessory">
              {bodyAssociatedAccessoriesArray
                .filter((mainArrayChild) =>
                  extractAccessoriesArray(bodyAccessoriesArray).every(
                    (filterArrayChild) => filterArrayChild.id !== mainArrayChild.id,
                  ),
                )
                .map((accessory) => {
                  return (
                    <Option key={uuidv4()} value={accessory.id}>
                      {accessory.title} {accessory.description ? ' - ' + accessory.description : ''}
                    </Option>
                  );
                })}
            </Select>
          ) : (
            <Skeleton.Input className="body__form-item-skeleton" style={{ width: '100%' }} active={true} />
          )}
        </Form.Item>

        <Form.Item hidden label="bodyId" name="bodyId" rules={[{ required: true, message: 'Input body id!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

interface StateProps {
  bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
  bodyAssociatedAccessoriesArray?: TReceivedAccessoryObj[] | null;
}

const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    bodyAccessoriesArray: state.dashboard.bodyAccessoriesArray,
    bodyAssociatedAccessoriesArray: state.dashboard.bodyAssociatedAccessoriesArray,
  };
};

export default connect(mapStateToProps, null)(BodyAccessoryFormItems);

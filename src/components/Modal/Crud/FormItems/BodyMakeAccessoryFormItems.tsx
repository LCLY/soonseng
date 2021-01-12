import React from 'react';
/* components */
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { FormInstance } from 'antd/lib/form';
import NumberFormat from 'react-number-format';
import { Form, Input, Select, Skeleton } from 'antd';
/* Util */
import { RootState } from 'src';
import { handleKeyDown } from 'src/shared/Utils';
import { TReceivedAccessoryObj, TReceivedBodyMakeAccessoryObj } from 'src/store/types/dashboard';

const { Option } = Select;

interface BodyMakeAccessoryFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** boolean to know if this modal is for dashboard or other place */
  isDashboard?: boolean;
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

type Props = BodyMakeAccessoryFormItemsProps & StateProps;

const BodyMakeAccessoryFormItems: React.FC<Props> = ({
  crud,
  antdForm,
  onFinish,
  bodyMakeAccessoriesArray,
  dimensionAssociatedAccessoriesArray,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  /* ================================================== */
  /*  method */
  /* ================================================== */
  const extractAccessoriesArray = (bodyMakeAccessoriesArray: TReceivedBodyMakeAccessoryObj[]) => {
    let resultArray: TReceivedAccessoryObj[] = [];
    bodyMakeAccessoriesArray.forEach((bodyMakeAccessory) => resultArray.push(bodyMakeAccessory.accessory));
    return resultArray;
  };

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
        {/* for update, it doesnt need accessory id because we are jz changing other stuffs */}
        {crud === 'create' && (
          <Form.Item
            className="make__form-item"
            label="Accessory"
            name="accessoryId"
            style={{ marginBottom: '0.8rem' }}
            rules={[{ required: true, message: 'Select an Accessory!' }]}
          >
            {/* only render if accessoriesArray is not null */}
            {/* also if user already created a new body accessory using body associated accessories */}
            {dimensionAssociatedAccessoriesArray && bodyMakeAccessoriesArray ? (
              <Select placeholder="Select an Accessory">
                {dimensionAssociatedAccessoriesArray
                  .filter((mainArrayChild) =>
                    extractAccessoriesArray(bodyMakeAccessoriesArray).every(
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
        )}

        <Form.Item
          className="make__form-item"
          label="Price"
          name="accessoryPrice"
          rules={[{ required: true, message: 'Input price here!' }]}
        >
          <NumberFormat className="ant-input" placeholder="Type price here" thousandSeparator={true} prefix={'RM '} />
        </Form.Item>

        {/* Body Make ID */}
        <Form.Item name="bodyMakeId" hidden rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {crud === 'update' && (
          <Form.Item name="bodyMakeAccessoryId" hidden rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
      </Form>
    </>
  );
};

interface StateProps {
  bodyMakeAccessoriesArray?: TReceivedBodyMakeAccessoryObj[] | null;
  dimensionAssociatedAccessoriesArray?: TReceivedAccessoryObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    bodyMakeAccessoriesArray: state.dashboard.bodyMakeAccessoriesArray,
    dimensionAssociatedAccessoriesArray: state.dashboard.dimensionAssociatedAccessoriesArray,
  };
};

export default connect(mapStateToProps, null)(BodyMakeAccessoryFormItems);

import React from 'react';
/* components */
/* 3rd party lib */
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
/* Util */
import { RootState } from 'src';
import { TReceivedWheelbaseObj } from 'src/store/types/dashboard';
import { handleKeyDown } from 'src/shared/Utils';

const { Option } = Select;

interface MakeWheelbaseFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

type Props = MakeWheelbaseFormItemsProps & StateProps;

const MakeWheelbaseFormItems: React.FC<Props> = ({ crud, antdForm, onFinish, wheelbasesArray }) => {
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
        <Form.Item
          className="make__form-item "
          label="Wheelbase"
          name="wheelbaseId"
          rules={[{ required: true, message: 'Select wheelbase!' }]}
        >
          <Select
            showSearch
            placeholder="Select a wheelbase"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option !== undefined && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {wheelbasesArray &&
              wheelbasesArray.map((wheelbase) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={wheelbase.id}>
                    {wheelbase.title + 'mm'}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>

        <Form.Item hidden name="makeId" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {crud === 'update' && (
          <Form.Item hidden name="makeWheelbaseId" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
      </Form>
    </>
  );
};

interface StateProps {
  wheelbasesArray?: TReceivedWheelbaseObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    wheelbasesArray: state.dashboard.wheelbasesArray,
  };
};

export default connect(mapStateToProps, null)(MakeWheelbaseFormItems);

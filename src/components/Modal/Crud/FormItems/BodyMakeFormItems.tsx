import React from 'react';
/* components */
// import PreviewUploadImage from 'src/components/ImageRelated/PreviewUploadImage/PreviewUploadImage';
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
/*Util*/
import { RootState } from 'src';
import { Dispatch, AnyAction } from 'redux';
import { handleKeyDown } from 'src/shared/Utils';
import * as actions from 'src/store/actions/index';
import {
  TReceivedBodyObj,
  TReceivedLengthObj,
  TReceivedMakeObj,
  TReceivedMakeWheelbaseObj,
} from 'src/store/types/dashboard';

const { Option } = Select;
interface BodyMakeFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** boolean to know if this modal is for dashboard or other place */
  isDashboard?: boolean;
  /** url for preview images */
  imagesPreviewUrls: string[];
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
  /** set action for image preview urls */
  setImagesPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  /** setState action to set the selected files to upload*/
  setUploadSelectedFiles: React.Dispatch<React.SetStateAction<FileList | null | undefined>>;
}

type Props = BodyMakeFormItemsProps & StateProps & DispatchProps;

const BodyMakeFormItems: React.FC<Props> = ({
  crud,
  onFinish,
  antdForm,
  isDashboard,
  bodiesArray,
  makesArray,
  lengthsArray,
  makeWheelbasesArray,
  // imagesPreviewUrls,
  onGetMakeWheelbases,
  // setImagesPreviewUrls,
  // setUploadSelectedFiles
}) => {
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
        {isDashboard !== undefined && isDashboard ? (
          <Form.Item
            className="bodymake__form-item"
            label="Model"
            name="makeId"
            style={{ marginBottom: '0.8rem' }}
            rules={[{ required: true, message: 'Select a Model!' }]}
          >
            {/* only render if bodiesArray is not null */}
            <Select
              showSearch
              placeholder="Select a Body"
              optionFilterProp="children"
              className="bodymake__select"
              onChange={(value: number) => {
                // reset the makewheelbase Id everytime when user changes the make
                antdForm.setFieldsValue({ makeWheelbaseId: null });
                onGetMakeWheelbases(value);
              }}
              filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {makesArray &&
                makesArray.map((make) => {
                  return (
                    <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={make.id}>
                      {`${make.brand.title} ${make.title} ${make.series}`}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
        ) : (
          <Form.Item hidden name="makeId" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
        {/* ------- Make Wheelbase ------- */}
        {isDashboard !== undefined && isDashboard ? (
          makeWheelbasesArray && (
            <Form.Item
              className="bodymake__form-item"
              label="Configuration"
              name="makeWheelbaseId"
              style={{ marginBottom: '0.8rem' }}
              rules={[{ required: true, message: 'Select a configuration!' }]}
            >
              {/* only render if makeWheelbase is not null */}
              <Select placeholder="Select a configuration" className="bodymake__select">
                {makeWheelbasesArray.map((makeWheelbase) => {
                  return (
                    <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={makeWheelbase.id}>
                      {`Wheelbase: ${makeWheelbase.wheelbase.title}mm`}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          )
        ) : (
          <Form.Item name="makeWheelbaseId" hidden rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
        {/* ------- Body - value is brand id but display is brand name -------*/}
        <Form.Item
          className="bodymake__form-item"
          label="Body"
          name="bodyId"
          style={{ marginBottom: '0.8rem' }}
          rules={[{ required: true, message: 'Select a Body!' }]}
        >
          {/* only render if bodiesArray is not null */}
          <Select
            showSearch
            placeholder="Select a Body"
            optionFilterProp="children"
            className="bodymake__select"
            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {bodiesArray &&
              bodiesArray
                .sort((a: TReceivedBodyObj, b: TReceivedBodyObj) => a.title.localeCompare(b.title))
                .map((body) => {
                  return (
                    <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={body.id}>
                      {`${body.title} ${body.description ? `(${body.description})` : ''}`}
                    </Option>
                  );
                })}
          </Select>
        </Form.Item>

        {/* <Form.Item name="bodyId" hidden rules={[{ required: true }]}>
          <Input />
        </Form.Item> */}

        {/* ------- Length - value is brand id but display is brand name -------*/}
        <Form.Item
          className="bodymake__form-item"
          label="Length"
          name="lengthId"
          rules={[{ required: true, message: 'Select a Length!' }]}
        >
          {/* only render if lengthsArray is not null */}
          <Select
            showSearch
            placeholder="Select a length"
            optionFilterProp="children"
            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {lengthsArray &&
              lengthsArray.map((length) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={length.id}>
                    {`${length.title}ft - ${length.description}`}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        {/* <Form.Item hidden name="lengthId" rules={[{ required: true }]}>
            <Input />
          </Form.Item> */}
        {/* Dimensions */}
        <div style={{ marginBottom: '1rem' }}>Dimensions - W x H x D</div>
        {/* Body Length Width */}
        <div className="flex">
          <Form.Item
            className="make__form-item body__item margin_r-1 bodymake__form-item-left "
            label="Width"
            name={['bodyMakeWidth', 'feet']}
            rules={[{ required: false, message: 'Input ft here!' }]}
          >
            {/* width - ft */}
            <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
          </Form.Item>

          <Form.Item
            className="make__form-item--make body__item make__form-item--inch bodymake__form-item-right"
            name={['bodyMakeWidth', 'inch']}
            rules={[{ required: false, message: 'Input inch here!' }]}
          >
            {/* height - inch */}
            <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
          </Form.Item>
        </div>
        {/* Body Length Height */}
        <div className="flex">
          <Form.Item
            className="make__form-item body__item margin_r-1 bodymake__form-item-left "
            label="Height"
            name={['bodyMakeHeight', 'feet']}
            rules={[{ required: false, message: 'Input ft here!' }]}
          >
            {/* height - ft */}
            <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
          </Form.Item>

          <Form.Item
            className="make__form-item--make body__item make__form-item--inch bodymake__form-item-right"
            name={['bodyMakeHeight', 'inch']}
            rules={[{ required: false, message: 'Input inch here!' }]}
          >
            {/* height - inch */}
            <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
          </Form.Item>
        </div>
        {/* Body Length Depth */}
        <div className="flex">
          <Form.Item
            className="make__form-item body__item margin_r-1 bodymake__form-item-left "
            label="Depth"
            name={['bodyMakeDepth', 'feet']}
            rules={[{ required: false, message: 'Input ft here!' }]}
          >
            {/* height - ft */}
            <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
          </Form.Item>

          <Form.Item
            className="make__form-item--make make__form-item--inch bodymake__form-item-right"
            name={['bodyMakeDepth', 'inch']}
            rules={[{ required: false, message: 'Input inch here!' }]}
          >
            {/* height - inch */}
            <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
          </Form.Item>
        </div>
        <Form.Item
          className="make__form-item margin_t-1"
          label="Price"
          name="bodyMakePrice"
          rules={[{ required: false, message: 'Input price here!' }]}
        >
          <NumberFormat className="ant-input" placeholder="Type price here" thousandSeparator={true} prefix={'RM '} />
        </Form.Item>
        {/* <PreviewUploadImage
          setUploadSelectedFiles={setUploadSelectedFiles}
          imagesPreviewUrls={imagesPreviewUrls}
          setImagesPreviewUrls={setImagesPreviewUrls}
        /> */}
        {crud === 'update' && (
          <Form.Item name="bodyMakeId" hidden rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
      </Form>
    </>
  );
};

interface StateProps {
  makesArray?: TReceivedMakeObj[] | null;
  bodiesArray?: TReceivedBodyObj[] | null;
  lengthsArray?: TReceivedLengthObj[] | null;
  makeWheelbasesArray?: TReceivedMakeWheelbaseObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    makesArray: state.dashboard.makesArray,
    bodiesArray: state.dashboard.bodiesArray,
    lengthsArray: state.dashboard.lengthsArray,
    makeWheelbasesArray: state.dashboard.makeWheelbasesArray,
  };
};

interface DispatchProps {
  // Brand
  onGetMakeWheelbases: typeof actions.getMakeWheelbases;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetMakeWheelbases: (make_id) => dispatch(actions.getMakeWheelbases(make_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyMakeFormItems);

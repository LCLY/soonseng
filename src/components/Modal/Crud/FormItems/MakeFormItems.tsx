import React, { useEffect } from 'react';
/* components */
import PreviewUploadImage from 'src/components/ImageRelated/PreviewUploadImage/PreviewUploadImage';
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { DatePicker, Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
/*Util*/
import { RootState } from 'src';
import { AnyAction, Dispatch } from 'redux';
import { handleKeyDown } from 'src/shared/Utils';
import * as actions from 'src/store/actions/index';
import { TReceivedBrandObj, TReceivedSeriesObj } from 'src/store/types/dashboard';

const { Option } = Select;

interface MakeFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** setState action to set the selected files to upload*/
  setUploadSelectedFiles: React.Dispatch<React.SetStateAction<FileList | null | undefined>>;
  /** url for preview images */
  imagesPreviewUrls: string[];
  /** set action for image preview urls */
  setImagesPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
}

type Props = MakeFormItemsProps & StateProps & DispatchProps;

const MakeFormItems: React.FC<Props> = ({
  crud,
  antdForm,
  brandsArray,
  //   seriesArray,
  imagesPreviewUrls,
  onFinish,
  onGetBrands,
  //   onGetSeries,
  setImagesPreviewUrls,
  setUploadSelectedFiles,
}) => {
  /* ======================== */
  /* useEffect */
  /* ======================== */
  useEffect(() => {
    onGetBrands();
  }, [onGetBrands]);
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
        <div className="flex">
          <div className="make__form-left">
            {/* ------- title ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Input title here!' }]}
            >
              <Input placeholder="Type title here e.g. XZA200" />
            </Form.Item>
            {/* ------- Brand - value is brand id but display is brand name -------*/}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Brand"
              name="makeBrandId"
              rules={[{ required: true, message: 'Select Brand!' }]}
            >
              {/* only render if brandsArray is not null */}
              <Select
                showSearch
                placeholder="Select a brand"
                optionFilterProp="children"
                filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {brandsArray &&
                  brandsArray.map((brand) => {
                    return (
                      <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={brand.id}>
                        {brand.title}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            {/* ------- Series ------- */}
            {/* <Form.Item
              className="make__form-item make__form-item--make"
              label="Series"
              name="makeSeriesId"
              rules={[{ required: false, message: 'Input Series here!' }]}
            >

         
              <Select
                showSearch
                placeholder="Select a series"
                optionFilterProp="children"
                filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {seriesArray &&
                  seriesArray.map((seriesObj) => {
                    return (
                      <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={seriesObj.id}>
                        {seriesObj.title}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item> */}
            {/* Hidden series id */}
            {/* IN FUTURE HERE MUST ADD A CHECK FOR DASHBOARD if want to use this 
            reusable component in the dashboard section
            because on dashboard, you need to choose the series first */}
            <Form.Item
              className="make__form-item"
              label="id"
              name="makeSeriesId"
              hidden
              rules={[{ required: false, message: 'Get make id!' }]}
            >
              <Input />
            </Form.Item>

            {/* ------- Tire ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Tyre"
              name="makeTire"
              rules={[{ required: false, message: 'Input tyre count here!' }]}
            >
              <Input type="number" placeholder="Type tyre count here" />
            </Form.Item>

            {/* ------- Horsepower ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Horsepower"
              name="horsepower"
              rules={[{ required: false, message: 'Input Horsepower here!' }]}
            >
              <Input type="number" min={0} addonAfter={'hp'} placeholder="Type horsepower here e.g. 250" />
            </Form.Item>
            {/* ------- Year ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Year"
              name="year"
              rules={[{ required: false, message: 'Select a year!' }]}
            >
              <DatePicker style={{ width: '100%' }} picker="year" />
            </Form.Item>
            {/* ------- Transmission ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Transmission"
              name="transmission"
              rules={[{ required: false, message: 'Input Transmission here!' }]}
            >
              <Input placeholder="Type transmission here e.g. MT" />
            </Form.Item>
            {/* ------- Engine cap ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Engine Cap"
              name="engine_cap"
              rules={[{ required: false, message: 'Input Engine Cap here!' }]}
            >
              <Input type="number" min={0} placeholder="Type length here e.g. 115" />
            </Form.Item>
          </div>
          <div className="make__form-right">
            {/* ------- GVW ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="GVW"
              name="gvw"
              rules={[{ required: false, message: 'Input Gross Vehicle Weight here!' }]}
            >
              <Input addonAfter="kg" placeholder="Type Gross Vehicle Weight here e.g. 2t" />
            </Form.Item>
            {/* ------- ABS ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Abs"
              name="makeAbs"
              rules={[{ required: false, message: 'Input ABS here!' }]}
            >
              <Input placeholder="Type ABS here" />
            </Form.Item>
            {/* ------- Torque ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Torque"
              name="makeTorque"
              rules={[{ required: false, message: 'Input torque here!' }]}
            >
              <Input placeholder="Type torque here" />
            </Form.Item>

            {/* ------- Config ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Config"
              name="makeConfig"
              rules={[{ required: false, message: 'Input config here!' }]}
            >
              <Input placeholder="Type config here e.g. 4X4" />
            </Form.Item>

            {/* ------- Emission ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Emission"
              name="makeEmission"
              rules={[{ required: false, message: 'Input Emission here!' }]}
            >
              <Input type="number" placeholder="Type Emission here" />
            </Form.Item>
            {/* ------- Price ------- */}
            <Form.Item
              className="make__form-item make__form-item--make"
              label="Price"
              name="price"
              rules={[{ required: false, message: 'Input price here!' }]}
            >
              <NumberFormat
                className="ant-input"
                placeholder="Type price here"
                thousandSeparator={true}
                prefix={'RM '}
              />
            </Form.Item>
          </div>
        </div>

        {/* The whole upload image component including buttons and image previews */}
        <PreviewUploadImage
          imagesPreviewUrls={imagesPreviewUrls}
          setImagesPreviewUrls={setImagesPreviewUrls}
          setUploadSelectedFiles={setUploadSelectedFiles}
        />

        {crud === 'update' && (
          <Form.Item
            className="make__form-item"
            label="id"
            name="makeId"
            hidden
            rules={[{ required: true, message: 'Get make id!' }]}
          >
            <Input />
          </Form.Item>
        )}
      </Form>
    </>
  );
};
interface StateProps {
  seriesArray?: TReceivedSeriesObj[] | null;
  brandsArray?: TReceivedBrandObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    seriesArray: state.dashboard.seriesArray,
    brandsArray: state.dashboard.brandsArray,
  };
};

interface DispatchProps {
  // Brand
  onGetBrands: typeof actions.getBrands;
  // Series
  onGetSeries: typeof actions.getSeries;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    // Brand
    onGetBrands: () => dispatch(actions.getBrands()),
    //  Series
    onGetSeries: (brand_id) => dispatch(actions.getSeries(brand_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeFormItems);

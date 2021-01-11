import React, { useEffect, useState } from 'react';
/* components */
import PreviewUploadImage from 'src/components/ImageRelated/PreviewUploadImage/PreviewUploadImage';
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Form, Input, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import NumberFormat from 'react-number-format';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
/* Util */
import { RootState } from 'src';
import { handleKeyDown } from 'src/shared/Utils';
import { GENERAL_ACCESSORY, DIMENSION_ACCESSORY, BODY_ACCESSORY } from 'src/shared/constants';

interface AccessoryMakeFormItemsProps {
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

type Props = AccessoryMakeFormItemsProps & StateProps;

const AccessoryMakeFormItems: React.FC<Props> = ({
  crud,
  antdForm,
  onFinish,
  isDashboard,
  accessoryType,
  imagesPreviewUrls,
  setImagesPreviewUrls,
  setUploadSelectedFiles,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // check if accessory is dimension associated if yes, hide price
  // true = hide, false = show
  const [accessoryIsDimensionAssociated, setAccessoryIsDimensionAssociated] = useState(false);
  let accessoryTypeOptions = [GENERAL_ACCESSORY, DIMENSION_ACCESSORY, BODY_ACCESSORY];

  /* ================================== */
  // useEffect
  /* ================================== */
  useEffect(() => {
    if (accessoryType) {
      if (accessoryType === DIMENSION_ACCESSORY) {
        // hide price
        setAccessoryIsDimensionAssociated(true);
      } else {
        // show price
        setAccessoryIsDimensionAssociated(false);
      }
    }
  }, [accessoryType]);

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
        onValuesChange={(values) => {
          if (values.accessoryType === DIMENSION_ACCESSORY) {
            // hide price
            setAccessoryIsDimensionAssociated(true);
          } else {
            // show price
            setAccessoryIsDimensionAssociated(false);
          }
        }}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="accessoryTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input placeholder="Type title here" />
        </Form.Item>
        <Form.Item
          className="make__form-item"
          label="Description"
          name="accessoryDescription"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <TextArea rows={3} placeholder="Type description here" />
        </Form.Item>

        {/* only show the types in dashboard page */}
        {isDashboard !== undefined && isDashboard ? (
          <Form.Item
            className="accessory__form-item"
            label="Type"
            name="accessoryType"
            rules={[{ required: true, message: 'Choose an accessory type!' }]}
          >
            <Radio.Group style={{ paddingLeft: '2rem' }}>
              {accessoryTypeOptions.map((type) => (
                <Radio key={uuidv4()} value={type}>
                  {type}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        ) : (
          <Form.Item hidden name="accessoryType" rules={[{ required: true }]}>
            <Radio.Group></Radio.Group>
          </Form.Item>
        )}

        {/* only show price if its not dimension associated */}
        {accessoryIsDimensionAssociated ? null : (
          <Form.Item
            className="make__form-item"
            label="Price"
            name="accessoryPrice"
            rules={[{ required: true, message: 'Input price here!' }]}
          >
            <NumberFormat className="ant-input" thousandSeparator={true} prefix={'RM '} />
          </Form.Item>
        )}

        {/* update needs accessory id */}
        {crud === 'update' && (
          <Form.Item name="accessoryId" hidden rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}

        <PreviewUploadImage
          setUploadSelectedFiles={setUploadSelectedFiles}
          imagesPreviewUrls={imagesPreviewUrls}
          setImagesPreviewUrls={setImagesPreviewUrls}
        />
      </Form>
    </>
  );
};

interface StateProps {
  accessoryType?: string | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessoryType: state.catalog.accessoryType,
  };
};

export default connect(mapStateToProps, null)(AccessoryMakeFormItems);

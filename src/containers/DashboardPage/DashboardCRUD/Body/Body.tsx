import React, { useEffect, useState } from 'react';
import './Body.scss';
/*components*/
import Loading from 'src/components/Loading/Loading';
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { Button, Empty, Form, Card, Input, Modal, Select, Table, Tag, Tooltip } from 'antd';
/* Util */
import { TMapStateToProps } from 'src/store/types';
import * as actions from 'src/store/actions/index';
import {
  TCreateBodyLengthData,
  TReceivedAccessoryObj,
  TReceivedBodyAccessoryObj,
  TReceivedBodyLengthObj,
  TReceivedBodyObj,
  TReceivedLengthObj,
  TUpdateBodyLengthData,
} from 'src/store/types/sales';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';

const { Option } = Select;
const { TextArea } = Input;

interface BodyProps {}

type TBodyTableState = {
  key?: string;
  index?: number;
  bodyId: number; //for update
  bodyTitle: string;
  bodyDescription: string;
  available?: boolean;
};
type TLengthTableState = {
  key?: string;
  index?: number;
  lengthId: number; //for update
  lengthTitle: string;
  lengthDescription: string;
  available?: boolean;
};
type TBodyLengthTableState = {
  key?: string;
  index?: number;
  bodyLengthId: number; //for update
  bodyLengthLengthId: number;
  bodyLengthLengthTitle: string;
  bodyLengthBodyId: number;
  bodyLengthBodyTitle: string;
  bodyLengthWidth: string;
  bodyLengthHeight: string;
  bodyLengthDepth: string;
  bodyLengthPrice: string;
  bodyLengthBodyAccessory: TReceivedBodyAccessoryObj[] | null;
  bodyLengthBodyAccessoryArrayLength: number;
  available?: boolean;
};

type TCreateBodyLengthForm = {
  bodyLengthLengthId: number; // length id
  bodyLengthBodyId: number; // body id
  bodyLengthWidth: { feet: string; inch: string };
  bodyLengthHeight: { feet: string; inch: string };
  bodyLengthDepth: { feet: string; inch: string };
  bodyLengthPrice: number;
};
type TUpdateBodyLengthForm = {
  bodyLengthId: number;
  bodyLengthLengthId: number; // length id
  bodyLengthBodyId: number; // body id
  bodyLengthWidth: { feet: string; inch: string };
  bodyLengthHeight: { feet: string; inch: string };
  bodyLengthDepth: { feet: string; inch: string };
  bodyLengthPrice: number;
};

type TCreateBodyAccessoryForm = {
  bodyAccessoryTitle: string; //according to teckhong, probably dont want the title
  bodyAccessoryDescription: string;
  bodyLengthId: number; //body_length_id
  accessoryId: number; //accessory_id
  bodyAccessoryPrice: number;
};
type TUpdateBodyAccessoryForm = {
  bodyAccessoryId: number; // body_accessory id
  bodyAccessoryTitle: string; //according to teckhong, probably dont want the title
  bodyAccessoryDescription: string;
  bodyLengthId: number; //body_length_id
  accessoryId: number; //accessory_id
  bodyAccessoryPrice: number;
};

type TShowModal = {
  body: boolean;
  currentBodyId?: number; //(for upload image) id to track which specific object is currently being edited
  length: boolean;
  body_length: boolean; //if got image add current Body length id as well
  body_accessory: boolean; //if got image add current Body length id as well
};

type Props = BodyProps & StateProps & DispatchProps;

const Body: React.FC<Props> = ({
  // miscellaneous
  loading,
  successMessage,
  // body
  bodiesArray,
  onGetBodies,
  onUpdateBody,
  onCreateBody,
  // length
  lengthsArray,
  onGetLengths,
  onUpdateLength,
  onCreateLength,
  // body length
  bodyLengthsArray,
  onGetBodyLengths,
  onCreateBodyLength,
  onUpdateBodyLength,
  // body accessory
  bodyAccessoriesArray,
  onGetBodyAccessories,
  onCreateBodyAccessory,
  onUpdateBodyAccessory,
  // accessory
  accessoriesArray,
  onGetAccessories,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // ref for forms
  /* body */
  const [createBodyForm] = Form.useForm();
  const [updateBodyForm] = Form.useForm();
  /* length */
  const [createLengthForm] = Form.useForm();
  const [updateLengthForm] = Form.useForm();
  /* bodyLength */
  const [createBodyLengthForm] = Form.useForm();
  const [updateBodyLengthForm] = Form.useForm();
  /* bodyAccessories */
  const [createBodyAccessoryForm] = Form.useForm();
  const [updateBodyAccessoryForm] = Form.useForm();

  // Table states
  const [bodyTableState, setBodyTableState] = useState<TBodyTableState[]>([]);
  const [lengthTableState, setLengthTableState] = useState<TLengthTableState[]>([]);
  const [bodyLengthTableState, setBodyLengthTableState] = useState<TBodyLengthTableState[]>([]);

  let bodySearchInput = null; //this is for filter on antd table
  let lengthSearchInput = null; //this is for filter on antd table
  let bodyLengthSearchInput = null; //this is for filter on antd table
  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });
  setFilterReference(filterData, setFilterData);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState<TShowModal>({
    body: false,
    length: false,
    body_length: false,
    body_accessory: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<TShowModal>({
    body: false,
    length: false,
    body_length: false,
    body_accessory: false,
  });

  // store table header definition in state
  /**
   * containing objects of arrays
   * body[], length[], bodyLength[]
   **/

  /* Body column initialization */
  const [bodyColumns, setBodyColumns] = useState([
    {
      key: 'bodyIndex',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TBodyTableState, b: TBodyTableState) =>
        a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'bodyTitle',
      title: 'Title',
      dataIndex: 'bodyTitle',
      width: '15rem',
      className: 'body__table-header--title',
      ellipsis: true,
      sorter: (a: TBodyTableState, b: TBodyTableState) => a.bodyTitle.localeCompare(b.bodyTitle),
      ...getColumnSearchProps(bodySearchInput, 'bodyTitle', 'Title'),
    },
    {
      key: 'bodyDescription',
      title: 'Description',
      dataIndex: 'bodyDescription',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBodyTableState, b: TBodyTableState) => a.bodyDescription.localeCompare(b.bodyDescription),

      ...getColumnSearchProps(bodySearchInput, 'bodyDescription', 'Description'),
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBodyTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // show modal
                setShowUpdateModal({ ...showUpdateModal, body: true });
                // update the form value using the 'name' attribute as target/key
                // if bodyDescription is '-' then change to empty string, else the real string
                // remember to set this form on the Form component
                updateBodyForm.setFieldsValue({
                  bodyId: record.bodyId,
                  bodyTitle: record.bodyTitle,
                  bodyDescription: record.bodyDescription === '-' ? '' : record.bodyDescription,
                });
              }}
            >
              Edit
            </Button>
            <Button disabled type="link" danger>
              Delete
            </Button>
          </>
        );
      },
    },
  ]);
  /* Length column initialization */
  const [lengthColumns, setLengthColumns] = useState([
    {
      key: 'lengthIndex',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TLengthTableState, b: TLengthTableState) =>
        a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'lengthTitle',
      title: 'Title',
      dataIndex: 'lengthTitle',
      width: '15rem',
      ellipsis: true,
      sorter: (a: TLengthTableState, b: TLengthTableState) => a.lengthTitle.localeCompare(b.lengthTitle),
      ...getColumnSearchProps(lengthSearchInput, 'lengthTitle', 'Title'),
    },
    {
      key: 'lengthDescription',
      title: 'Description',
      dataIndex: 'lengthDescription',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TLengthTableState, b: TLengthTableState) => a.lengthDescription.localeCompare(b.lengthDescription),

      ...getColumnSearchProps(lengthSearchInput, 'lengthDescription', 'Description'),
    },
    {
      key: 'lengthAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TLengthTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // show modal
                setShowUpdateModal({ ...showUpdateModal, length: true });
                // update the form value using the 'name' attribute as target/key
                // if bodyDescription is '-' then change to empty string, else the real string
                // remember to set this form on the Form component
                let extractedFeet = '';
                let extractedInch = '';
                // they have to be legit strings after being splitted

                // needa check if inch is undefined, only have feet in the string
                let onlyInchUndefined =
                  record.lengthTitle.split(" '")[0] !== undefined && record.lengthTitle.split(" '")[1] === undefined;

                if (onlyInchUndefined) {
                  extractedFeet = record.lengthTitle.split(" '")[0]; //get the first index  (feet)
                } else {
                  extractedFeet = record.lengthTitle.split(" '")[0]; //get the first index
                  extractedInch = record.lengthTitle.split(" '")[1].toString().trim(); //second index (inch) and remove empty space infront of the inch
                }

                updateLengthForm.setFieldsValue({
                  lengthId: record.lengthId,
                  lengthTitle: { feet: extractedFeet, inch: extractedInch },
                  lengthDescription: record.lengthDescription === '-' ? '' : record.lengthDescription,
                });
              }}
            >
              Edit
            </Button>
            <Button disabled type="link" danger>
              Delete
            </Button>
          </>
        );
      },
    },
  ]);

  /* Body Length column initialization */
  const [bodyLengthColumns, setBodyLengthColumns] = useState([
    {
      key: 'bodyLengthIndex',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TBodyLengthTableState, b: TBodyLengthTableState) =>
        a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'bodyLengthBodyTitle',
      title: 'Body',
      dataIndex: 'bodyLengthBodyTitle',
      className: 'body__table-header--title',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBodyLengthTableState, b: TBodyLengthTableState) =>
        a.bodyLengthBodyTitle.localeCompare(b.bodyLengthBodyTitle),
      ...getColumnSearchProps(bodyLengthSearchInput, 'bodyLengthBodyTitle', 'Body'),
    },
    {
      key: 'bodyLengthDimension',
      title: 'Dimension',
      dataIndex: 'bodyLengthDimension',
      ellipsis: true,
      width: 'auto',
      render: (_text: any, record: TBodyLengthTableState) => {
        return (
          <>
            <div className="body__tag-outerdiv">
              <div className="body__tag-div">
                <Tag className="body__tag" color="red">
                  <div className="body__tag-title">Width</div>
                  <div className="body__tag-values">
                    <div className="body__tag-colon">:</div> <div>{record.bodyLengthWidth}</div>
                  </div>
                </Tag>
              </div>
              <div className="body__tag-div">
                <Tag className="body__tag" color="cyan">
                  <div className="body__tag-title">Height</div>
                  <div className="body__tag-values">
                    <div className="body__tag-colon">:</div> <div>{record.bodyLengthHeight}</div>
                  </div>
                </Tag>
              </div>
              <div className="body__tag-div">
                <Tag className="body__tag" color="blue">
                  <div className="body__tag-title">Depth</div>
                  <div className="body__tag-values">
                    <div className="body__tag-colon">:</div> <div>{record.bodyLengthDepth}</div>
                  </div>
                </Tag>
              </div>
            </div>
          </>
        );
      },
    },
    {
      key: 'bodyLengthPrice',
      title: 'Price',
      dataIndex: 'bodyLengthPrice',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBodyLengthTableState, b: TBodyLengthTableState) =>
        a.bodyLengthPrice.localeCompare(b.bodyLengthPrice),
      ...getColumnSearchProps(bodyLengthSearchInput, 'bodyLengthPrice', 'Price'),
    },
    {
      key: 'bodyLengthAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBodyLengthTableState) => {
        return (
          <>
            <div>
              <Button
                type="link"
                className="make__brand-btn--edit"
                onClick={() => {
                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, body_length: true });

                  /**
                   *
                   *  Inner helper function to return feet only or feet with inch
                   * @param {string} extractedValue Value after width/height/depth is extracted
                   * @return {*} return object of feet and inch
                   */
                  const checkInchExist = (extractedValue: string) => {
                    let extractedFeet = '';
                    let extractedInch = '';

                    // needa check if inch is undefined, only have feet in the string
                    let onlyInchUndefined =
                      extractedValue.split(" '")[0] !== undefined && extractedValue.split(" '")[1] === undefined;

                    // needa check if inch is undefined, only have feet in the string
                    if (onlyInchUndefined) {
                      extractedFeet = extractedValue.split(" '")[0]; //get the first index
                    } else {
                      extractedFeet = extractedValue.split(" '")[0]; //get the first index
                      extractedInch = extractedValue.split(" '")[1].toString().trim(); //second index and remove empty space infront of the inch
                    }

                    return { feet: extractedFeet, inch: extractedInch };
                  };

                  let formattedPrice = record.bodyLengthPrice.replace('RM', ''); //remove unit

                  // update the form value using the 'name' attribute as target/key
                  updateBodyLengthForm.setFieldsValue({
                    bodyLengthId: record.bodyLengthId,
                    bodyLengthBodyId: record.bodyLengthBodyId, // body id
                    bodyLengthLengthId: record.bodyLengthLengthId, // length id
                    bodyLengthWidth: {
                      feet: checkInchExist(record.bodyLengthWidth).feet,
                      inch: checkInchExist(record.bodyLengthWidth).inch,
                    },
                    bodyLengthHeight: {
                      feet: checkInchExist(record.bodyLengthHeight).feet,
                      inch: checkInchExist(record.bodyLengthHeight).inch,
                    },
                    bodyLengthDepth: {
                      feet: checkInchExist(record.bodyLengthDepth).feet,
                      inch: checkInchExist(record.bodyLengthDepth).inch,
                    },
                    bodyLengthPrice: formattedPrice,
                  });
                }}
              >
                Edit
              </Button>
              <Button disabled type="link" danger>
                Delete
              </Button>
            </div>
            <div>
              <Button
                type="default"
                onClick={() => {
                  setShowCreateModal({ ...showCreateModal, body_accessory: true });
                  //  set the body length id
                  createBodyAccessoryForm.setFieldsValue({ bodyLengthId: record.bodyLengthId });
                }}
              >
                Create Accessory
              </Button>
            </div>
          </>
        );
      },
    },
  ]);

  /* ================================================== */
  /*  methods  */
  /* ================================================== */

  /**
   * helper function for checking inch undefined
   * @param {string} feet
   * @param {string} inch
   * @return {*} feet + ' or feet + ' + inch ''
   */
  const formatFeetInch = (feet: string, inch: string) => {
    if (inch === undefined) {
      return feet + " ' ";
    }
    return feet + " ' " + inch + " '' ";
  };

  /**
   * For user to be able to press enter and submit the form
   * @param {React.KeyboardEvent<HTMLFormElement>} e
   * @param {FormInstance<any>} form form instance created at initialization using useForm
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>, formRef: FormInstance<any>) => {
    if (e.key === 'Enter') {
      formRef.submit();
    }
  };

  /* Forms onFinish methods */
  /* --------- BODY ---------- */
  // the keys "values" are from the form's 'name' attribute
  const onCreateBodyFinish = (values: { bodyTitle: string; bodyDescription: string }) => {
    // if not then just get the title and description
    if (!loading) {
      // prevent it from running multiple times
      onCreateBody(values.bodyTitle, values.bodyDescription);
    }
  };
  const onUpdateBodyFinish = (values: { bodyId: number; bodyTitle: string; bodyDescription: string }) => {
    // if not then just get the title and description
    if (!loading) {
      onUpdateBody(values.bodyId, values.bodyTitle, values.bodyDescription);
    }
  };

  /* --------- LENGTH ---------- */
  const onCreateLengthFinish = (values: { lengthTitle: { feet: string; inch: string }; lengthDescription: string }) => {
    let concatLength = '';
    // if inch has no input then only display length
    concatLength = formatFeetInch(values.lengthTitle.feet, values.lengthTitle.inch);
    if (!loading) {
      onCreateLength(concatLength, values.lengthDescription);
    }
  };
  const onUpdateLengthFinish = (values: {
    lengthId: number;
    lengthDescription: string;
    lengthTitle: { feet: string; inch: string };
  }) => {
    let concatLength = '';
    // if inch has no input then only display length
    concatLength = formatFeetInch(values.lengthTitle.feet, values.lengthTitle.inch);
    if (!loading) {
      onUpdateLength(values.lengthId, concatLength, values.lengthDescription);
    }
  };

  /* --------- BODY LENGTH ---------- */
  const onCreateBodyLengthFinish = (values: TCreateBodyLengthForm) => {
    // if inch has no input then only display feet
    let concatWidth = formatFeetInch(values.bodyLengthWidth.feet, values.bodyLengthWidth.inch);
    let concatHeight = formatFeetInch(values.bodyLengthHeight.feet, values.bodyLengthHeight.inch);
    let concatDepth = formatFeetInch(values.bodyLengthDepth.feet, values.bodyLengthDepth.inch);

    // if inch has no input then only display length
    let createBodyLengthData: TCreateBodyLengthData = {
      body_id: values.bodyLengthBodyId,
      length_id: values.bodyLengthLengthId,
      width: concatWidth,
      height: concatHeight,
      depth: concatDepth,
      price: values.bodyLengthPrice,
    };
    onCreateBodyLength(createBodyLengthData);
  };

  const onUpdateBodyLengthFinish = (values: TUpdateBodyLengthForm) => {
    // if inch has no input then only display feet
    let concatWidth = formatFeetInch(values.bodyLengthWidth.feet, values.bodyLengthWidth.inch);
    let concatHeight = formatFeetInch(values.bodyLengthHeight.feet, values.bodyLengthHeight.inch);
    let concatDepth = formatFeetInch(values.bodyLengthDepth.feet, values.bodyLengthDepth.inch);

    let updateBodyLengthData: TUpdateBodyLengthData = {
      body_length_id: values.bodyLengthId,
      body_id: values.bodyLengthBodyId,
      length_id: values.bodyLengthLengthId,
      width: concatWidth,
      height: concatHeight,
      depth: concatDepth,
      price: values.bodyLengthPrice,
    };

    onUpdateBodyLength(updateBodyLengthData);
  };

  /* --------- BODY ACCESSORY ---------- */
  const onCreateBodyAccessoryFinish = (values: TCreateBodyAccessoryForm) => {
    console.log(values.bodyLengthId);
    let createBodyAccessoryData = {
      body_length_id: values.bodyLengthId,
      accesory_id: values.accessoryId,
      price: values.bodyAccessoryPrice,
      description: values.bodyAccessoryDescription,
    };
    onCreateBodyAccessory(createBodyAccessoryData);
  };
  const onUpdateBodyAccessoryFinish = (values: TUpdateBodyAccessoryForm) => {
    let updateBodyAccessoryData = {
      body_accessory_id: values.bodyAccessoryId,
      body_length_id: values.bodyLengthId,
      accesory_id: values.accessoryId,
      price: values.bodyAccessoryPrice,
      description: values.bodyAccessoryDescription,
    };
    onUpdateBodyAccessory(updateBodyAccessoryData);
  };

  /* ================================================== */
  /*  Components  */
  /* ================================================== */

  /* ---------------------------- */
  // Body
  /* ---------------------------- */
  /* Create Body Form Items */
  let createBodyFormItems = (
    <>
      <Form.Item
        className="make__form-item"
        label="Title"
        name="bodyTitle"
        rules={[{ required: true, message: 'Input title here!' }]}
      >
        <Input placeholder="Type title here" />
      </Form.Item>
      <Form.Item
        className="make__form-item"
        label="Description"
        name="bodyDescription"
        rules={[{ required: false, message: 'Input description here!' }]}
      >
        <TextArea rows={3} placeholder="Type description here" />
      </Form.Item>
    </>
  );

  /* Create Body Form */
  let createBodyFormComponent = (
    <>
      <Form
        form={createBodyForm}
        name="createBody"
        onKeyDown={(e) => handleKeyDown(e, createBodyForm)}
        onFinish={onCreateBodyFinish}
      >
        {createBodyFormItems}
      </Form>
    </>
  );

  /* Create Body Modal */
  let createBodyModal = (
    <Modal
      title="Create Body"
      visible={showCreateModal.body}
      onOk={createBodyForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowCreateModal({ ...showCreateModal, body: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {createBodyFormComponent}
    </Modal>
  );

  /* -------------------------------------- */
  /* Edit Body Form */
  let updateBodyFormComponent = (
    <>
      <Form
        form={updateBodyForm}
        name="editBody"
        onKeyDown={(e) => handleKeyDown(e, updateBodyForm)}
        onFinish={onUpdateBodyFinish}
      >
        {/* reusing the form items from create body and add body id for update */}
        {createBodyFormItems}
        {/* Getting the brand id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="bodyId"
          hidden
          rules={[{ required: true, message: 'Get body id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Body Modal */
  let updateBodyModal = (
    <Modal
      title="Edit Body"
      visible={showUpdateModal.body}
      onOk={updateBodyForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowUpdateModal({
          ...showUpdateModal,
          body: false,
        });
      }}
    >
      {/* the content within the modal */}
      {updateBodyFormComponent}
    </Modal>
  );

  /* ---------------------------- */
  // Length
  /* ---------------------------- */
  /* Length Form Items*/
  let lengthFormItems = (
    <>
      <div className="flex">
        <Form.Item
          className="make__form-item margin_r-1"
          label="Title"
          name={['lengthTitle', 'feet']}
          rules={[{ required: true, message: 'Input ft here!' }]}
          style={{ width: '62%' }}
        >
          {/* ft */}
          <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
        </Form.Item>

        <Form.Item
          className="make__form-item--make make__form-item--inch"
          name={['lengthTitle', 'inch']}
          rules={[{ required: false, message: 'Input inch here!' }]}
          style={{ width: '38%' }}
        >
          {/* inch */}
          <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
        </Form.Item>
      </div>

      <Form.Item
        className="make__form-item"
        label="Description"
        name="lengthDescription"
        rules={[{ required: false, message: 'Input description here!' }]}
      >
        <TextArea rows={3} placeholder="Type description here" />
      </Form.Item>
    </>
  );

  /* Create Length Form*/
  let createLengthFormComponent = (
    <>
      <Form
        form={createLengthForm}
        name="createLength"
        onKeyDown={(e) => handleKeyDown(e, createLengthForm)}
        onFinish={onCreateLengthFinish}
      >
        {/* reuse form items */}
        {lengthFormItems}
      </Form>
    </>
  );

  /* Create Length Modal */
  let createLengthModal = (
    <Modal
      title="Create Length"
      visible={showCreateModal.length}
      onOk={createLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowCreateModal({ ...showCreateModal, length: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {createLengthFormComponent}
    </Modal>
  );

  /* ----------------------------------------- */
  /* Edit Length Form */
  let updateLengthFormComponent = (
    <>
      <Form
        form={updateLengthForm}
        name="editLength"
        onKeyDown={(e) => handleKeyDown(e, updateLengthForm)}
        onFinish={onUpdateLengthFinish}
      >
        {/* reuse form items */}
        {lengthFormItems}

        {/* Getting the length id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="lengthId"
          hidden
          rules={[{ required: true, message: 'Get length id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Length Modal */
  let updateLengthModal = (
    <Modal
      title="Edit Length"
      visible={showUpdateModal.length}
      onOk={updateLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowUpdateModal({
          ...showUpdateModal,
          length: false,
        });
      }}
    >
      {/* the content within the modal */}
      {updateLengthFormComponent}
    </Modal>
  );

  /* ---------------------------- */
  // Body Length
  /* ---------------------------- */
  /* Body Length Form Items*/
  let bodyLengthFormItems = (
    <>
      {/* ------- Length - value is brand id but display is brand name -------*/}
      <Form.Item
        className="make__form-item"
        label="Length"
        name="bodyLengthLengthId"
        style={{ marginBottom: '0.8rem' }}
        rules={[{ required: true, message: 'Select a Length!' }]}
      >
        {/* only render if lengthsArray is not null */}
        <Select
          showSearch
          placeholder="Select a length"
          optionFilterProp="children"
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {lengthsArray &&
            lengthsArray.map((length) => {
              return (
                <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={length.id}>
                  {length.title}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      {/* ------- Body - value is brand id but display is brand name -------*/}
      <Form.Item
        className="make__form-item"
        label="Body"
        name="bodyLengthBodyId"
        rules={[{ required: true, message: 'Select a Body!' }]}
      >
        {/* only render if bodiesArray is not null */}
        <Select
          showSearch
          placeholder="Select a Body"
          optionFilterProp="children"
          className="body__select-updatebodylength"
          filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {bodiesArray &&
            bodiesArray.map((body) => {
              return (
                <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={body.id}>
                  {body.title} {body.description ? ' (' + body.description + ')' : ''}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <div style={{ marginBottom: '1rem' }}>Dimensions - W x H x D</div>
      {/* Body Length Width */}
      <div className="flex">
        <Form.Item
          className="make__form-item body__item margin_r-1"
          label="Width"
          name={['bodyLengthWidth', 'feet']}
          rules={[{ required: true, message: 'Input ft here!' }]}
          style={{ width: '62%' }}
        >
          {/* width - ft */}
          <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
        </Form.Item>

        <Form.Item
          className="make__form-item--make body__item make__form-item--inch"
          name={['bodyLengthWidth', 'inch']}
          rules={[{ required: false, message: 'Input inch here!' }]}
          style={{ width: '38%' }}
        >
          {/* height - inch */}
          <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
        </Form.Item>
      </div>
      {/* Body Length Height */}
      <div className="flex">
        <Form.Item
          className="make__form-item body__item margin_r-1"
          label="Height"
          name={['bodyLengthHeight', 'feet']}
          rules={[{ required: true, message: 'Input ft here!' }]}
          style={{ width: '62%' }}
        >
          {/* height - ft */}
          <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
        </Form.Item>

        <Form.Item
          className="make__form-item--make body__item make__form-item--inch"
          name={['bodyLengthHeight', 'inch']}
          rules={[{ required: false, message: 'Input inch here!' }]}
          style={{ width: '38%' }}
        >
          {/* height - inch */}
          <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
        </Form.Item>
      </div>
      {/* Body Length Depth */}
      <div className="flex">
        <Form.Item
          className="make__form-item margin_r-1"
          label="Depth"
          name={['bodyLengthDepth', 'feet']}
          rules={[{ required: true, message: 'Input ft here!' }]}
          style={{ width: '62%' }}
        >
          {/* height - ft */}
          <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
        </Form.Item>

        <Form.Item
          className="make__form-item--make make__form-item--inch"
          name={['bodyLengthDepth', 'inch']}
          rules={[{ required: false, message: 'Input inch here!' }]}
          style={{ width: '38%' }}
        >
          {/* height - inch */}
          <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
        </Form.Item>
      </div>
      <Form.Item
        className="make__form-item"
        label="Price"
        name="bodyLengthPrice"
        rules={[{ required: true, message: 'Input price here!' }]}
      >
        <Input type="number" min={0} addonBefore="RM" placeholder="Type price here" />
      </Form.Item>
    </>
  );

  /* Create Body Length Form */
  let createBodyLengthFormComponent = (
    <>
      <Form
        form={createBodyLengthForm}
        name="createBodyLength"
        onKeyDown={(e) => handleKeyDown(e, createBodyLengthForm)}
        onFinish={onCreateBodyLengthFinish}
      >
        {/* reuse the component */}
        {bodyLengthFormItems}
      </Form>
    </>
  );

  /* Create Body Length Modal */
  let createBodyLengthModal = (
    <Modal
      title="Create Body Price"
      visible={showCreateModal.body_length}
      onOk={createBodyLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowCreateModal({ ...showCreateModal, body_length: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {createBodyLengthFormComponent}
    </Modal>
  );

  /* ----------------------------------------- */
  /* Edit/Update Body Length Form */
  let updateBodyLengthFormComponent = (
    <>
      <Form
        form={updateBodyLengthForm}
        name="createBodyLength"
        onKeyDown={(e) => handleKeyDown(e, updateBodyLengthForm)}
        onFinish={onUpdateBodyLengthFinish}
      >
        {/* reuse form items */}
        {bodyLengthFormItems}
        {/* Getting the BODY LENGTH ID */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="bodyLengthId"
          hidden
          rules={[{ required: true, message: 'Get body length id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Edit Body Length Modal */
  let updateBodyLengthModal = (
    <Modal
      title="Edit Body Price"
      visible={showUpdateModal.body_length}
      onOk={updateBodyLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowUpdateModal({
          ...showUpdateModal,
          body_length: false,
        });
      }}
    >
      {/* the content within the modal */}
      {updateBodyLengthFormComponent}
    </Modal>
  );

  /* ---------------------------- */
  // Body Accessory
  /* ---------------------------- */
  /* Body Accessory Form Items */
  let bodyAccessoryFormItems = (
    <>
      {/* ------- Select Accessory - value is accessory id but display is accessory title -------*/}
      <Form.Item
        className="make__form-item "
        label="Accessory"
        name="accessoryId"
        rules={[{ required: true, message: 'Select an Accessory!' }]}
      >
        {/* only render if accessoriesArray is not null */}
        {accessoriesArray && (
          <Select placeholder="Select an Accessory">
            {accessoriesArray.map((accessory) => {
              return (
                <Option key={uuidv4()} value={accessory.id}>
                  {accessory.title} {accessory.description ? ' - ' + accessory.description : ''}
                </Option>
              );
            })}
          </Select>
        )}
      </Form.Item>

      {/* Accessory price */}
      <Form.Item
        className="make__form-item"
        label="Price"
        name="bodyAccessoryPrice"
        rules={[{ required: true, message: 'Input price here!' }]}
      >
        <Input type="number" min={0} addonBefore="RM" placeholder="Type price here" />
      </Form.Item>

      {/* Body accessory description */}
      <Form.Item
        className="make__form-item"
        label="Description"
        name="bodyAccessoryDescription"
        rules={[{ required: false, message: 'Input description here!' }]}
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        hidden
        label="bodyLengthId"
        name="bodyLengthId"
        rules={[{ required: true, message: 'Input body length id!' }]}
      >
        <Input />
      </Form.Item>
    </>
  );

  /* Create Body Accessory Form */
  let createBodyAccessoryFormComponent = (
    <>
      <Form
        form={createBodyAccessoryForm}
        name="createBodyAccessory"
        onKeyDown={(e) => handleKeyDown(e, createBodyAccessoryForm)}
        onFinish={onCreateBodyAccessoryFinish}
      >
        {bodyAccessoryFormItems}
      </Form>
    </>
  );

  /* Create Body Accessory Modal */
  let createBodyAccessoryModal = (
    <Modal
      title="Create Accessory"
      visible={showCreateModal.body_accessory}
      onOk={createBodyAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowCreateModal({ ...showCreateModal, body_accessory: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {createBodyAccessoryFormComponent}
    </Modal>
  );

  /* -------------------------------------------- */
  /* Update Body Accessory Form */
  let updateBodyAccessoryFormComponent = (
    <>
      <Form
        form={updateBodyAccessoryForm}
        name="updateBodyAccessory"
        onKeyDown={(e) => handleKeyDown(e, updateBodyAccessoryForm)}
        onFinish={onUpdateBodyAccessoryFinish}
      >
        {bodyAccessoryFormItems}

        {/* Getting the BODY ACCESSORY ID */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="bodyAccessoryId"
          hidden
          rules={[{ required: true, message: 'Get body accessory id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Update Body Accessory Modal */
  let updateBodyAccessoryModal = (
    <Modal
      title="Edit Body Accessory"
      visible={showUpdateModal.body_accessory}
      onOk={updateBodyAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowUpdateModal({ ...showUpdateModal, body_accessory: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {updateBodyAccessoryFormComponent}
    </Modal>
  );

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */
  //  Calling get APIs
  useEffect(() => {
    onGetBodies();
  }, [onGetBodies]);

  useEffect(() => {
    onGetLengths();
  }, [onGetLengths]);

  useEffect(() => {
    onGetLengths();
  }, [onGetLengths]);

  useEffect(() => {
    if (!accessoriesArray) {
      // only call if accessoriesArray is null
      onGetAccessories();
    }
  }, [accessoriesArray, onGetAccessories]);

  useEffect(() => {
    onGetBodyLengths();
  }, [onGetBodyLengths]);

  useEffect(() => {
    onGetBodyAccessories();
  }, [onGetBodyAccessories]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for BODY
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TBodyTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (body: TReceivedBodyObj, index: number) => {
      let descriptionIsNullOrEmpty = body.description === null || body.description === '';
      // only render when available value is true
      if (body.available) {
        tempArray.push({
          key: uuidv4(),
          index: index + 1,
          bodyId: body.id,
          bodyTitle: body.title,
          bodyDescription: descriptionIsNullOrEmpty ? '-' : body.description,
          available: body.available,
        });
      }
    };

    if (bodiesArray) {
      // Execute function "storeValue" for every array index
      bodiesArray.map(storeValue);
    }
    // update the state with tempArray
    setBodyTableState(tempArray);
  }, [bodiesArray]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for LENGTH
  /* ----------------------------------------------------- */

  useEffect(() => {
    let tempArray: TLengthTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (length: TReceivedLengthObj, index: number) => {
      let descriptionIsNullOrEmpty = length.description === null || length.description === '';
      // only render when available value is true
      if (length.available) {
        tempArray.push({
          key: uuidv4(),
          index: index + 1,
          lengthId: length.id,
          lengthTitle: length.title,
          lengthDescription: descriptionIsNullOrEmpty ? '-' : length.description,
          available: length.available,
        });
      }
    };

    if (lengthsArray) {
      // Execute function "storeValue" for every array index
      lengthsArray.map(storeValue);
    }
    // update the state with tempArray
    setLengthTableState(tempArray);
  }, [lengthsArray]);

  /* ------------------------------------------------------------ */
  // initialize/populate the state of data array for BODY LENGTH
  /* ------------------------------------------------------------ */

  useEffect(() => {
    let tempArray: TBodyLengthTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (bodyLength: TReceivedBodyLengthObj, index: number) => {
      // only render when available value is true
      let concatPrice = `RM${bodyLength.price}`;
      if (bodyLength.available && bodyAccessoriesArray && bodyLengthsArray) {
        tempArray.push({
          key: uuidv4(),
          index: index + 1,
          bodyLengthId: bodyLength.id,
          bodyLengthLengthId: bodyLength.length.id,
          bodyLengthBodyId: bodyLength.body.id,
          bodyLengthLengthTitle: bodyLength.length.title,
          bodyLengthBodyTitle: bodyLength.body.title,
          bodyLengthWidth: bodyLength.width,
          bodyLengthHeight: bodyLength.height,
          bodyLengthDepth: bodyLength.depth,
          bodyLengthPrice: concatPrice,
          bodyLengthBodyAccessory: bodyAccessoriesArray, //pass the whole array
          bodyLengthBodyAccessoryArrayLength: bodyLengthsArray.length, //pass in the array length for rowSpan
          available: bodyLength.available,
        });
      }
    };

    if (bodyLengthsArray) {
      // Execute function "storeValue" for every array index
      bodyLengthsArray.map(storeValue);
    }
    // update the state with tempArray
    setBodyLengthTableState(tempArray);
  }, [bodyAccessoriesArray, bodyLengthsArray]);

  /* -------------------- */
  // success notification
  /* -------------------- */
  useEffect(() => {
    if (successMessage) {
      // no need to call notification and onClearSalesState again because Make Page already calls it
      // clear the form inputs using the form reference
      createBodyForm.resetFields();
      createLengthForm.resetFields();
      createBodyLengthForm.resetFields();
      createBodyAccessoryForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, body: false, length: false, body_length: false, body_accessory: false });
      setShowUpdateModal({ ...showUpdateModal, body: false, length: false, body_length: false, body_accessory: false });
    }
  }, [
    successMessage,
    showUpdateModal,
    showCreateModal,
    createBodyForm,
    createLengthForm,
    createBodyLengthForm,
    createBodyAccessoryForm,
    setShowUpdateModal,
    setShowCreateModal,
  ]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* ================== */}
      {/*       Modals       */}
      {/* ================== */}
      {createBodyModal}
      {updateBodyModal}
      {createLengthModal}
      {updateLengthModal}
      {createBodyLengthModal}
      {updateBodyLengthModal}
      {createBodyAccessoryModal}
      {updateBodyAccessoryModal}

      <section>
        <HeaderTitle>Body (Tail)</HeaderTitle>
        {bodiesArray && lengthsArray && bodyLengthsArray ? (
          <>
            {/* ===================================== */}
            {/*              Body Section             */}
            {/* ===================================== */}
            <section className="make__section">
              <div className="make__header-div ">
                <div className="make__header-title">Bodies</div>
                <Button
                  type="primary"
                  className="make__brand-btn"
                  onClick={() => setShowCreateModal({ ...showCreateModal, body: true })}
                >
                  Create New Body
                </Button>
              </div>
              {/* ------------------ */}
              {/*    Body Table     */}
              {/* ------------------ */}
              <Table
                bordered
                className="body__table"
                scroll={{ x: '89rem', y: 400 }}
                dataSource={bodyTableState}
                columns={convertHeader(bodyColumns, setBodyColumns)}
                pagination={false}
              />
            </section>

            {/* ===================================== */}
            {/*             Length Section            */}
            {/* ===================================== */}
            <section className="make__section">
              <div className="make__header-div ">
                <div className="make__header-title">Lengths</div>
                <Button
                  type="primary"
                  className="make__brand-btn"
                  onClick={() => setShowCreateModal({ ...showCreateModal, length: true })}
                >
                  Create New Length
                </Button>
              </div>
              {/* ------------------ */}
              {/*    Length Table     */}
              {/* ------------------ */}
              <Table
                bordered
                className="body__table"
                scroll={{ x: '89rem', y: 400 }}
                dataSource={lengthTableState}
                columns={convertHeader(lengthColumns, setLengthColumns)}
                pagination={false}
              />
            </section>

            {/* ===================================== */}
            {/*         Body Length Section           */}
            {/* ===================================== */}
            <section className="make__section">
              <div className="make__header-div ">
                <div className="make__header-title">Body Price</div>
                <Button
                  type="primary"
                  className="make__brand-btn"
                  onClick={() => setShowCreateModal({ ...showCreateModal, body_length: true })}
                >
                  Create Price
                </Button>
              </div>
              {/* ----------------------- */}
              {/*    Body Length Table    */}
              {/* ----------------------- */}
              <Table
                bordered
                className="body__table"
                scroll={{ x: '89rem', y: 600 }}
                dataSource={bodyLengthTableState}
                expandable={{
                  expandIcon: ({ expanded, onExpand, record }) =>
                    expanded ? (
                      <Tooltip title="Click to hide accessories">
                        <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Click to view accessories">
                        <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
                      </Tooltip>
                    ),

                  expandedRowRender: (record: TBodyLengthTableState) => (
                    <>
                      <div>
                        Attachable accessories for this body:&nbsp;
                        <span className="body__expand-available">
                          {record.bodyLengthBodyAccessoryArrayLength} available
                        </span>
                      </div>
                      <hr />
                      <div className="body__expand-outerdiv">
                        {record.bodyLengthBodyAccessory && (
                          <>
                            {/* if no accessory then show empty */}
                            {record.bodyLengthBodyAccessoryArrayLength === 0 ? (
                              <div className="body__expand-empty">
                                <Empty />
                              </div>
                            ) : (
                              record.bodyLengthBodyAccessory.map((bodyAccessory, index) => {
                                if (bodyAccessory.available) {
                                  return (
                                    <Card
                                      className="body__expand-card"
                                      title={
                                        <span className="body__expand-card-title">{bodyAccessory.accesory.title}</span>
                                      }
                                      key={index}
                                      size="small"
                                      style={{ width: 'auto' }}
                                      headStyle={{ background: '#FFF2E8' }}
                                    >
                                      <div>
                                        <div>
                                          <span className="body__expand-card-category">Price</span>: RM
                                          {bodyAccessory.price}
                                        </div>
                                        <div>
                                          <span className="body__expand-card-category">Description</span>:&nbsp;
                                          {bodyAccessory.description ? (
                                            <>
                                              <br />
                                              <div className="body__expand-card-description">
                                                {bodyAccessory.description}
                                              </div>
                                            </>
                                          ) : (
                                            ' - '
                                          )}
                                        </div>
                                      </div>
                                      <section className="body__expand-card-btn-section">
                                        <hr style={{ margin: 0 }} />
                                        <div className="body__expand-card-btn-div">
                                          <Button
                                            className="body__expand-card-btn-edit"
                                            style={{ padding: 0 }}
                                            type="link"
                                            onClick={() => {
                                              // show the update modal
                                              setShowUpdateModal({ ...showUpdateModal, body_accessory: true });
                                              // fill in the updateBodyAccessoryform
                                              updateBodyAccessoryForm.setFieldsValue({
                                                bodyAccessoryId: bodyAccessory.id, //the id for update
                                                accessoryId: bodyAccessory.accesory.id,
                                                bodyAccessoryPrice: bodyAccessory.price,
                                                bodyAccessoryDescription: bodyAccessory.description,
                                                bodyLengthId: bodyAccessory.body_length.id,
                                              });
                                            }}
                                          >
                                            Edit
                                          </Button>
                                          <Button disabled type="link" danger style={{ padding: 0 }}>
                                            Delete
                                          </Button>
                                        </div>
                                      </section>
                                    </Card>
                                  );
                                }
                                return <></>;
                              })
                            )}
                          </>
                        )}
                      </div>
                    </>
                  ),
                }}
                columns={convertHeader(bodyLengthColumns, setBodyLengthColumns)}
                pagination={false}
              />
            </section>
          </>
        ) : (
          <div className="padding_t-5">
            <Loading />
          </div>
        )}
      </section>
    </>
  );
};
interface StateProps {
  loading?: boolean;
  successMessage?: string | null;
  bodiesArray?: TReceivedBodyObj[] | null;
  lengthsArray?: TReceivedLengthObj[] | null;
  accessoriesArray?: TReceivedAccessoryObj[] | null;
  bodyLengthsArray?: TReceivedBodyLengthObj[] | null;
  bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  return {
    loading: state.sales.loading,
    bodiesArray: state.sales.bodiesArray,
    lengthsArray: state.sales.lengthsArray,
    successMessage: state.sales.successMessage,
    accessoriesArray: state.sales.accessoriesArray,
    bodyLengthsArray: state.sales.bodyLengthsArray,
    bodyAccessoriesArray: state.sales.bodyAccessoriesArray,
  };
};
interface DispatchProps {
  // Body
  onGetBodies: typeof actions.getBodies;
  onCreateBody: typeof actions.createBody;
  onUpdateBody: typeof actions.updateBody;
  // Length
  onGetLengths: typeof actions.getLengths;
  onCreateLength: typeof actions.createLength;
  onUpdateLength: typeof actions.updateLength;
  // Body Length
  onGetBodyLengths: typeof actions.getBodyLengths;
  onCreateBodyLength: typeof actions.createBodyLength;
  onUpdateBodyLength: typeof actions.updateBodyLength;
  // Body Accessory
  onGetBodyAccessories: typeof actions.getBodyAccessories;
  onCreateBodyAccessory: typeof actions.createBodyAccessory;
  onUpdateBodyAccessory: typeof actions.updateBodyAccessory;
  // Accessory
  onGetAccessories: typeof actions.getAccessories;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    // Body
    onGetBodies: () => dispatch(actions.getBodies()),
    onCreateBody: (title, description) => dispatch(actions.createBody(title, description)),
    onUpdateBody: (id, title, description) => dispatch(actions.updateBody(id, title, description)),
    // Length
    onGetLengths: () => dispatch(actions.getLengths()),
    onCreateLength: (title, description) => dispatch(actions.createLength(title, description)),
    onUpdateLength: (id, title, description) => dispatch(actions.updateLength(id, title, description)),
    // Body Length
    onGetBodyLengths: () => dispatch(actions.getBodyLengths()),
    onCreateBodyLength: (createBodyLengthData) => dispatch(actions.createBodyLength(createBodyLengthData)),
    onUpdateBodyLength: (updateBodyLengthData) => dispatch(actions.updateBodyLength(updateBodyLengthData)),
    // Body Length
    onGetBodyAccessories: () => dispatch(actions.getBodyAccessories()),
    onCreateBodyAccessory: (createBodyAccessoryData) => dispatch(actions.createBodyAccessory(createBodyAccessoryData)),
    onUpdateBodyAccessory: (updateBodyAccessoryData) => dispatch(actions.updateBodyAccessory(updateBodyAccessoryData)),
    // Accessory
    onGetAccessories: () => dispatch(actions.getAccessories()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Body);

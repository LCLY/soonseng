import React, { useState, useEffect } from 'react';
import './Accessory.scss';
/*components*/
import Loading from 'src/components/Loading/Loading';
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { Container } from 'react-bootstrap';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { RouteComponentProps, withRouter } from 'react-router';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Tabs, Table, Tag, Tooltip, notification } from 'antd';
/* Util */
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types';
import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import { TReceivedAccessoryObj, TReceivedBodyAccessoryObj, TReceivedBodyLengthObj } from 'src/store/types/sales';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

interface AccessoryProps {}

type TAccessoryTableState = {
  key?: string;
  index?: number;
  accessoryId: number; //for update
  accessoryTitle: string;
  accessoryDescription: string;
  available?: boolean;
};

type TBodyAccessoryTableState = {
  key?: string;
  index?: number;
  bodyAccessoryId: number; //for update
  accessoryId: number; //for update
  bodyLengthId: number; //for update
  bodyTitle: string; //for update
  accessoryTitle: string;
  bodyAccessoryDescription: string;
  bodyAccessoryPrice: string;
  bodyLengthWidth: string;
  bodyLengthHeight: string;
  bodyLengthDepth: string;
  available?: boolean;
};

type TCreateBodyAccessoryForm = {
  bodyAccessoryTitle: string;
  bodyAccessoryDescription: string;
  bodyLengthId: number; //body_length_id
  accessoryId: number; //accessory_id
  bodyAccessoryPrice: number;
};
type TUpdateBodyAccessoryForm = {
  bodyAccessoryId: number; // body_accessory id
  bodyAccessoryTitle: string;
  bodyAccessoryDescription: string;
  bodyLengthId: number; //body_length_id
  accessoryId: number; //accessory_id
  bodyAccessoryPrice: number;
};

type TShowModal = {
  accessory: boolean;
  body_accessory: boolean;
};

type Props = AccessoryProps & StateProps & DispatchProps & RouteComponentProps;

const Accessory: React.FC<Props> = ({
  // miscellaneous
  loading,
  history,
  errorMessage,
  successMessage,
  // accessory
  accessoriesArray,
  onGetAccessories,
  onCreateAccessory,
  onUpdateAccessory,
  // body length
  bodyLengthsArray,
  onGetBodyLengths,
  // body accessories
  bodyAccessoriesArray,
  onCreateBodyAccessory,
  onUpdateBodyAccessory,
  onGetBodyAccessories,
  // clear states
  onClearSalesState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // ref for forms
  /* body */
  const [createAccessoryForm] = Form.useForm();
  const [updateAccessoryForm] = Form.useForm();

  const [createBodyAccessoryForm] = Form.useForm();
  const [updateBodyAccessoryForm] = Form.useForm();

  const { width } = useWindowDimensions();

  // Table States
  const [accessoryTableState, setAccessoryTableState] = useState<TAccessoryTableState[]>([]);
  const [bodyAccessoryTableState, setBodyAccessoryTableState] = useState<TBodyAccessoryTableState[]>([]);

  let accessorySearchInput = null; //this is for filter on antd table
  let bodyAccessorySearchInput = null; //this is for filter on antd table

  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });
  setFilterReference(filterData, setFilterData);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState<TShowModal>({
    accessory: false,
    body_accessory: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<TShowModal>({
    accessory: false,
    body_accessory: false,
  });

  // store table header definition in state
  /**
   * containing objects of arrays
   * accessory[], bodyaccessory[]
   **/

  /* Accessory column initialization */
  const [accessoryColumns, setAccessoryColumns] = useState([
    {
      key: 'accessoryIndex',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TAccessoryTableState, b: TAccessoryTableState) =>
        a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'accessoryTitle',
      title: 'Title',
      className: 'body__table-header--title',
      dataIndex: 'accessoryTitle',
      width: '15rem',
      ellipsis: true,
      sorter: (a: TAccessoryTableState, b: TAccessoryTableState) => a.accessoryTitle.localeCompare(b.accessoryTitle),
      ...getColumnSearchProps(accessorySearchInput, 'accessoryTitle', 'Title'),
    },
    {
      key: 'accessoryDescription',
      title: 'Description',
      dataIndex: 'accessoryDescription',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TAccessoryTableState, b: TAccessoryTableState) =>
        a.accessoryDescription.localeCompare(b.accessoryDescription),

      ...getColumnSearchProps(accessorySearchInput, 'accessoryDescription', 'Description'),
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TAccessoryTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // show modal
                setShowUpdateModal({ ...showUpdateModal, accessory: true });
                // update the form value using the 'name' attribute as target/key
                // if accessoryDescription is '-' then change to empty string, else the real string
                // remember to set this form on the Form component
                updateAccessoryForm.setFieldsValue({
                  accessoryId: record.accessoryId,
                  accessoryTitle: record.accessoryTitle,
                  accessoryDescription: record.accessoryDescription === '-' ? '' : record.accessoryDescription,
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

  /* Body accessory column initialization */
  const [bodyAccessoryColumns, setBodyAccessoryColumns] = useState([
    {
      key: 'bodyAccessoryIndex',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TBodyAccessoryTableState, b: TBodyAccessoryTableState) =>
        a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'accessoryTitle',
      title: 'Accessory',
      dataIndex: 'accessoryTitle',
      className: 'body__table-header--title',
      width: '15rem',
      ellipsis: true,
      sorter: (a: TBodyAccessoryTableState, b: TBodyAccessoryTableState) =>
        a.accessoryTitle.localeCompare(b.accessoryTitle),
      ...getColumnSearchProps(bodyAccessorySearchInput, 'accessoryTitle', 'Accessory'),
    },
    {
      key: 'bodyTitle',
      title: 'Body',
      dataIndex: 'bodyTitle',
      className: 'body__table-header--title',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBodyAccessoryTableState, b: TBodyAccessoryTableState) => a.bodyTitle.localeCompare(b.bodyTitle),

      ...getColumnSearchProps(bodyAccessorySearchInput, 'bodyTitle', 'Body'),
    },
    {
      key: 'bodyAccessoryDimension',
      title: 'Dimension',
      dataIndex: 'bodyAccessoryDimension',
      ellipsis: true,
      width: 'auto',
      render: (_text: any, record: TBodyAccessoryTableState) => {
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
      key: 'bodyAccessoryPrice',
      title: 'Price',
      dataIndex: 'bodyAccessoryPrice',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBodyAccessoryTableState, b: TBodyAccessoryTableState) =>
        a.bodyAccessoryPrice.localeCompare(b.bodyAccessoryPrice),
      ...getColumnSearchProps(bodyAccessorySearchInput, 'bodyAccessoryPrice', 'Price'),
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBodyAccessoryTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // show modal
                setShowUpdateModal({ ...showUpdateModal, body_accessory: true });
                // update the form value using the 'name' attribute as target/key
                // if description is '-' then change to empty string, else the real string
                // remember to set this form on the Form component

                // remove the unit
                let formattedPrice = record.bodyAccessoryPrice.replace('RM', '');
                // dont show '-' when populating the form
                let descriptionExist = record.bodyAccessoryDescription === '-' ? '' : record.bodyAccessoryDescription;

                updateBodyAccessoryForm.setFieldsValue({
                  bodyAccessoryId: record.bodyAccessoryId, // body_accessory id
                  bodyAccessoryDescription: descriptionExist,
                  bodyAccessoryPrice: formattedPrice,
                  bodyLengthId: record.bodyLengthId, //body_length_id
                  accessoryId: record.accessoryId, //accessory_id
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
  /* ================================================== */
  /*  methods  */
  /* ================================================== */
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
  /* --------- ACCESSORY ---------- */

  // the keys "values" are from the form's 'name' attribute
  const onCreateAccessoryFinish = (values: { accessoryTitle: string; accessoryDescription: string }) => {
    // if not then just get the title and description
    onCreateAccessory(values.accessoryTitle, values.accessoryDescription);
  };
  const onUpdateAccessoryFinish = (values: {
    accessoryId: number;
    accessoryTitle: string;
    accessoryDescription: string;
  }) => {
    // if not then just get the title and description
    onUpdateAccessory(values.accessoryId, values.accessoryTitle, values.accessoryDescription);
  };

  /* --------- BODY ACCESSORY ---------- */
  const onCreateBodyAccessoryFinish = (values: TCreateBodyAccessoryForm) => {
    let createBodyAccessoryData = {
      body_length_id: values.bodyLengthId,
      accessory_id: values.accessoryId,
      price: values.bodyAccessoryPrice,
      description: values.bodyAccessoryDescription,
    };
    onCreateBodyAccessory(createBodyAccessoryData);
  };
  const onUpdateBodyAccessoryFinish = (values: TUpdateBodyAccessoryForm) => {
    let updateBodyAccessoryData = {
      body_accessory_id: values.bodyAccessoryId,
      body_length_id: values.bodyLengthId,
      accessory_id: values.accessoryId,
      price: values.bodyAccessoryPrice,
      description: values.bodyAccessoryDescription,
    };
    onUpdateBodyAccessory(updateBodyAccessoryData);
  };

  /* ================================================== */
  /*  Components  */
  /* ================================================== */
  /* Create Accessory Form Items */
  let createAccessoryFormItems = (
    <>
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
    </>
  );

  /* Create Accessory Form */
  let createAccessoryFormComponent = (
    <>
      <Form
        form={createAccessoryForm}
        name="createAccessory"
        onKeyDown={(e) => handleKeyDown(e, createAccessoryForm)}
        onFinish={onCreateAccessoryFinish}
      >
        {createAccessoryFormItems}
      </Form>
    </>
  );

  /* Create Accessory Modal */
  let createAccessoryModal = (
    <Modal
      title="Create Accessory"
      visible={showCreateModal.accessory}
      onOk={createAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowCreateModal({ ...showCreateModal, accessory: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {createAccessoryFormComponent}
    </Modal>
  );

  /* Update Accessory Form */
  let updateAccessoryFormComponent = (
    <>
      <Form
        form={updateAccessoryForm}
        name="updateAccessory"
        onKeyDown={(e) => handleKeyDown(e, updateAccessoryForm)}
        onFinish={onUpdateAccessoryFinish}
      >
        {createAccessoryFormItems}

        {/* Getting the brand id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="accessoryId"
          hidden
          rules={[{ required: true, message: 'Get accessory id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* Update Accessory Modal */
  let updateAccessoryModal = (
    <Modal
      title="Create Accessory"
      visible={showUpdateModal.accessory}
      onOk={updateAccessoryForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        setShowUpdateModal({ ...showUpdateModal, accessory: false }); //close modal on cancel
      }}
    >
      {/* the content within the modal */}
      {updateAccessoryFormComponent}
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

      {/* ------- Select Body Length - value is body length id but display is accessory title -------*/}
      <Form.Item
        className="make__form-item "
        label="Body"
        name="bodyLengthId"
        rules={[{ required: true, message: 'Select a Body!' }]}
      >
        {/* only render if accessoriesArray is not null */}
        {bodyLengthsArray && (
          <Select placeholder="Select a Body" className="body__select-updatebodylength">
            {bodyLengthsArray.map((bodyLength) => {
              return (
                <Option key={uuidv4()} value={bodyLength.id}>
                  {bodyLength.body.title} {bodyLength.body.description ? ' - ' + bodyLength.body.description : ''}
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
      title="Create Accessory Price"
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
  useEffect(() => {
    onGetAccessories();
  }, [onGetAccessories]);

  useEffect(() => {
    if (!bodyAccessoriesArray) {
      onGetBodyAccessories();
    }
  }, [bodyAccessoriesArray, onGetBodyAccessories]);

  useEffect(() => {
    if (!bodyLengthsArray) {
      onGetBodyLengths();
    }
  }, [bodyLengthsArray, onGetBodyLengths]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for ACCESSORY
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TAccessoryTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (accessory: TReceivedAccessoryObj, index: number) => {
      let descriptionIsNullOrEmpty = accessory.description === null || accessory.description === '';
      // only render when available value is true
      if (accessory.available) {
        tempArray.push({
          key: uuidv4(),
          index: index + 1,
          accessoryId: accessory.id,
          accessoryTitle: accessory.title,
          accessoryDescription: descriptionIsNullOrEmpty ? '-' : accessory.description,
          available: accessory.available,
        });
      }
    };

    if (accessoriesArray) {
      // Execute function "storeValue" for every array index
      accessoriesArray.map(storeValue);
    }
    // update the state with tempArray
    setAccessoryTableState(tempArray);
  }, [accessoriesArray]);

  /* --------------------------------------------------------------- */
  // initialize/populate the state of data array for BODY ACCESSORY
  /* --------------------------------------------------------------- */
  useEffect(() => {
    let tempArray: TBodyAccessoryTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (bodyAccessory: TReceivedBodyAccessoryObj, index: number) => {
      let descriptionIsNullOrEmpty = bodyAccessory.description === null || bodyAccessory.description === '';
      // only render when available value is true
      if (bodyAccessory.available) {
        tempArray.push({
          key: uuidv4(),
          index: index + 1,
          bodyAccessoryId: bodyAccessory.id,
          accessoryId: bodyAccessory.accessory.id, //for update
          bodyLengthId: bodyAccessory.body_length.id, //for update
          bodyTitle: bodyAccessory.body_length.body.title, //body is wihtin the body length object
          accessoryTitle: bodyAccessory.accessory.title,
          bodyAccessoryPrice: 'RM' + bodyAccessory.price,
          bodyLengthWidth: bodyAccessory.body_length.width,
          bodyLengthHeight: bodyAccessory.body_length.height,
          bodyLengthDepth: bodyAccessory.body_length.depth,
          bodyAccessoryDescription: descriptionIsNullOrEmpty ? '-' : bodyAccessory.description,
          available: bodyAccessory.available,
        });
      }
    };

    if (bodyAccessoriesArray) {
      // Execute function "storeValue" for every array index
      bodyAccessoriesArray.map(storeValue);
    }
    // update the state with tempArray
    setBodyAccessoryTableState(tempArray);
  }, [bodyAccessoriesArray]);

  /* -------------------- */
  // success notification
  /* -------------------- */
  useEffect(() => {
    if (successMessage) {
      // show success notification
      notification['success']({
        message: 'Success',
        description: successMessage,
      });
      //  clear the state so the notification will be hidden afterwards
      onClearSalesState();
      // clear the form inputs using the form reference
      createAccessoryForm.resetFields();
      createBodyAccessoryForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, accessory: false, body_accessory: false });
      setShowUpdateModal({ ...showUpdateModal, accessory: false, body_accessory: false });
    }
  }, [
    successMessage,
    showUpdateModal,
    showCreateModal,
    createAccessoryForm,
    updateAccessoryForm,
    createBodyAccessoryForm,
    setShowUpdateModal,
    setShowCreateModal,
    onClearSalesState,
  ]);

  /* ------------------ */
  // error notification
  /* ------------------ */
  useEffect(() => {
    if (errorMessage) {
      notification['error']({
        message: 'Failed',
        duration: 2.5,
        description: errorMessage,
      });
    }
  }, [errorMessage, onClearSalesState]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* ================== */}
      {/*       Modals       */}
      {/* ================== */}
      {createAccessoryModal}
      {updateAccessoryModal}
      {createBodyAccessoryModal}
      {updateBodyAccessoryModal}

      <NavbarComponent activePage="" />
      <Container>
        <div className="accessory__tab-outerdiv">
          <Tabs
            animated={false}
            onTabClick={(e) => {
              // onclick check which key and go to that page
              switch (e) {
                case 'make':
                  history.push('/dashboard/make');
                  break;
                case 'body':
                  history.push('/dashboard/body');
                  break;
                case 'accessory':
                  history.push('/dashboard/accessory');
                  break;
                default:
                  history.push('/dashboard/make');
                  break;
              }
            }}
            activeKey="accessory"
            tabPosition={width > 1200 ? 'left' : 'top'}
          >
            <TabPane tab="Make" key="make" className="dashboard__tab"></TabPane>
            <TabPane tab="Body" key="body" className="dashboard__tab"></TabPane>
            <TabPane tab="Accessory" key="accessory" className="dashboard__tab">
              <section>
                <HeaderTitle>Accessory (Tail)</HeaderTitle>
                {accessoriesArray && bodyLengthsArray && bodyAccessoriesArray ? (
                  <>
                    {/* ===================================== */}
                    {/*           Accessory Section           */}
                    {/* ===================================== */}
                    <section className="make__section">
                      <div className="make__header-div ">
                        <div className="make__header-title">Accessories</div>
                        <Button
                          type="primary"
                          className="make__brand-btn"
                          onClick={() => setShowCreateModal({ ...showCreateModal, accessory: true })}
                        >
                          Create New Accessory
                        </Button>
                      </div>
                      {/* ------------------ */}
                      {/*    Accessory Table     */}
                      {/* ------------------ */}
                      <Table
                        bordered
                        scroll={{ x: '89rem', y: 400 }}
                        dataSource={accessoryTableState}
                        columns={convertHeader(accessoryColumns, setAccessoryColumns)}
                        pagination={false}
                      />
                    </section>
                    {/* ===================================== */}
                    {/*           Body Accessory Section           */}
                    {/* ===================================== */}
                    <section className="make__section">
                      <div className="make__header-div ">
                        <div className="make__header-title">Accessories Price</div>
                        <Button
                          type="primary"
                          className="make__brand-btn"
                          onClick={() => setShowCreateModal({ ...showCreateModal, body_accessory: true })}
                        >
                          Create Accessory Price
                        </Button>
                      </div>
                      {/* -------------------------- */}
                      {/*    Body Accessory Table    */}
                      {/* -------------------------- */}
                      <Table
                        bordered
                        scroll={{ x: '89rem', y: 600 }}
                        expandable={{
                          expandIcon: ({ expanded, onExpand, record }) =>
                            expanded ? (
                              <Tooltip trigger={['hover', 'click']} title="Click to hide description">
                                <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
                              </Tooltip>
                            ) : (
                              <Tooltip trigger={['hover', 'click']} title="Click to view description">
                                <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
                              </Tooltip>
                            ),

                          expandedRowRender: (record: TBodyAccessoryTableState) => (
                            <>
                              <div className="accessory__expand-div">
                                <div className="accessory__expand-title">Description:</div>
                                <div className="accessory__expand-text">{record.bodyAccessoryDescription}</div>
                              </div>
                            </>
                          ),
                        }}
                        dataSource={bodyAccessoryTableState}
                        columns={convertHeader(bodyAccessoryColumns, setBodyAccessoryColumns)}
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
            </TabPane>
          </Tabs>
        </div>
      </Container>
    </>
  );
};
interface StateProps {
  loading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  accessoriesArray?: TReceivedAccessoryObj[] | null;
  bodyAccessoriesArray?: TReceivedBodyAccessoryObj[] | null;
  bodyLengthsArray?: TReceivedBodyLengthObj[] | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  return {
    loading: state.sales.loading,
    errorMessage: state.sales.errorMessage,
    successMessage: state.sales.successMessage,
    bodyLengthsArray: state.sales.bodyLengthsArray,
    accessoriesArray: state.sales.accessoriesArray,
    bodyAccessoriesArray: state.sales.bodyAccessoriesArray,
  };
};
interface DispatchProps {
  // Accessory
  onGetAccessories: typeof actions.getAccessories;
  onCreateAccessory: typeof actions.createAccessory;
  onUpdateAccessory: typeof actions.updateAccessory;
  // Body length
  onGetBodyLengths: typeof actions.getBodyLengths;
  //  Body accessory
  onGetBodyAccessories: typeof actions.getBodyAccessories;
  onCreateBodyAccessory: typeof actions.createBodyAccessory;
  onUpdateBodyAccessory: typeof actions.updateBodyAccessory;
  // Miscellaneous
  onClearSalesState: typeof actions.clearSalesState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    //  accessory
    onGetAccessories: () => dispatch(actions.getAccessories()),
    onCreateAccessory: (title, description) => dispatch(actions.createAccessory(title, description)),
    onUpdateAccessory: (id, title, description) => dispatch(actions.updateAccessory(id, title, description)),
    // body length
    onGetBodyLengths: () => dispatch(actions.getBodyLengths()),
    // body accessory
    onGetBodyAccessories: () => dispatch(actions.getBodyAccessories()),
    onCreateBodyAccessory: (createBodyAccessoryData) => dispatch(actions.createBodyAccessory(createBodyAccessoryData)),
    onUpdateBodyAccessory: (updateBodyAccessoryData) => dispatch(actions.updateBodyAccessory(updateBodyAccessoryData)),
    // Miscellaneous
    onClearSalesState: () => dispatch(actions.clearSalesState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Accessory));

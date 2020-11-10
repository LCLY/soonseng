import React, { useState, useEffect } from 'react';
import './Accessory.scss';
/*components*/
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { Button, Form, Input, Modal, Table } from 'antd';
/* Util */
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types';
import { TReceivedAccessoryObj } from 'src/store/types/sales';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import Loading from 'src/components/Loading/Loading';

interface AccessoryProps {}

type TAccessoryTableState = {
  key?: string;
  index?: number;
  accessoryId: number; //for update
  accessoryTitle: string;
  accessoryDescription: string;
  available?: boolean;
};
type TShowModal = {
  accessory: boolean;
};

type Props = AccessoryProps & StateProps & DispatchProps;

const Accessory: React.FC<Props> = ({
  // miscellaneous
  loading,
  successMessage,
  // accessory
  accessoriesArray,
  onGetAccessories,
  onCreateAccessory,
  onUpdateAccessory,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // ref for forms
  /* body */
  const [createAccessoryForm] = Form.useForm();
  const [updateAccessoryForm] = Form.useForm();

  // Table States
  const [accessoryTableState, setAccessoryTableState] = useState<TAccessoryTableState[]>([]);
  let accessorySearchInput = null; //this is for filter on antd table

  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });
  setFilterReference(filterData, setFilterData);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState<TShowModal>({
    accessory: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<TShowModal>({
    accessory: false,
  });

  // store table header definition in state
  /**
   * containing objects of arrays
   * accessory[]
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
        <Input placeholder="Type description here" />
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

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */
  useEffect(() => {
    onGetAccessories();
  }, [onGetAccessories]);

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

  /* -------------------- */
  // success notification
  /* -------------------- */
  useEffect(() => {
    if (successMessage) {
      // no need to call notification and onClearSalesState again because Make Page already calls it
      // clear the form inputs using the form reference
      createAccessoryForm.resetFields();
      updateAccessoryForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, accessory: false });
      setShowUpdateModal({ ...showUpdateModal, accessory: false });
    }
  }, [
    successMessage,
    showUpdateModal,
    showCreateModal,
    createAccessoryForm,
    updateAccessoryForm,
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
      {createAccessoryModal}
      {updateAccessoryModal}

      <section>
        <HeaderTitle>Accessory (Tail)</HeaderTitle>
        {accessoriesArray ? (
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
  accessoriesArray?: TReceivedAccessoryObj[] | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  return {
    loading: state.sales.loading,
    successMessage: state.sales.successMessage,
    accessoriesArray: state.sales.accessoriesArray,
  };
};
interface DispatchProps {
  // Accessory
  onGetAccessories: typeof actions.getAccessories;
  onCreateAccessory: typeof actions.createAccessory;
  onUpdateAccessory: typeof actions.updateAccessory;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetAccessories: () => dispatch(actions.getAccessories()),
    onCreateAccessory: (title, description) => dispatch(actions.createAccessory(title, description)),
    onUpdateAccessory: (id, title, description) => dispatch(actions.updateAccessory(id, title, description)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Accessory);

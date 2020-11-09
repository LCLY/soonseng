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
import { Button, Form, Input, Modal, Table } from 'antd';
/* Util */
import { TMapStateToProps } from 'src/store/types';
import * as actions from 'src/store/actions/index';
import { TReceivedBodyObj, TReceivedLengthObj } from 'src/store/types/sales';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';

// const { Option } = Select;

interface BodyProps {}
type TBodyTableState = {
  key?: string;
  index?: number;
  bodyId: number;
  bodyTitle: string;
  bodyDescription: string;
  available?: boolean;
};
type TLengthTableState = {
  key?: string;
  index?: number;
  lengthId: number;
  lengthTitle: string;
  lengthDescription: string;
  available?: boolean;
};

type TShowModal = {
  body: boolean;
  currentBodyId?: number; //(for upload image) id to track which specific object is currently being edited
  length: boolean;
};

type Props = BodyProps & StateProps & DispatchProps;

const Body: React.FC<Props> = ({
  // miscellaneous
  loading,
  successMessage,
  onClearSalesState,
  // body
  bodiesArray,
  onGetBodies,
  onEditBody,
  onCreateBody,
  // length
  lengthsArray,
  onGetLengths,
  onEditLength,
  onCreateLength,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // ref for forms
  const [createBodyForm] = Form.useForm();
  const [editBodyForm] = Form.useForm();
  const [createLengthForm] = Form.useForm();
  const [editLengthForm] = Form.useForm();
  // Table states
  const [bodyTableState, setBodyTableState] = useState<TBodyTableState[]>([]);
  const [lengthTableState, setLengthTableState] = useState<TLengthTableState[]>([]);
  let bodySearchInput = null; //this is for filter on antd table
  let lengthSearchInput = null; //this is for filter on antd table
  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });
  setFilterReference(filterData, setFilterData);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState<TShowModal>({
    body: false,
    length: false,
  });
  const [showEditModal, setShowEditModal] = useState<TShowModal>({
    body: false,
    length: false,
  });

  // store table header definition in state
  /**
   * containing objects of arrays
   * body[], length[]
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
      fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBodyTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // show modal
                setShowEditModal({ ...showEditModal, body: true });
                // update the form value using the 'name' attribute as target/key
                // if bodyDescription is '-' then change to empty string, else the real string
                // remember to set this form on the Form component
                editBodyForm.setFieldsValue({
                  bodyId: record.bodyId,
                  bodyTitle: record.bodyTitle,
                  bodyDescription: record.bodyDescription === '-' ? '' : record.bodyDescription,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" danger>
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
      fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TLengthTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // show modal
                setShowEditModal({ ...showEditModal, length: true });
                // update the form value using the 'name' attribute as target/key
                // if bodyDescription is '-' then change to empty string, else the real string
                // remember to set this form on the Form component
                editLengthForm.setFieldsValue({
                  lengthId: record.lengthId,
                  lengthTitle: record.lengthTitle,
                  lengthDescription: record.lengthDescription === '-' ? '' : record.lengthDescription,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" danger>
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

  /* Forms onFinish methods */
  // the keys "values" are from the form's 'name' attribute
  const onCreateBodyFinish = (values: { bodyTitle: string; bodyDescription: string }) => {
    // if not then just get the title and description
    onCreateBody(values.bodyTitle, values.bodyDescription);
  };
  const onEditBodyFinish = (values: { bodyId: number; bodyTitle: string; bodyDescription: string }) => {
    // if not then just get the title and description
    onEditBody(values.bodyId, values.bodyTitle, values.bodyDescription);
  };
  const onCreateLengthFinish = (values: { lengthTitle: string; lengthDescription: string }) => {
    // if not then just get the title and description
    onCreateLength(values.lengthTitle, values.lengthDescription);
  };
  const onEditLengthFinish = (values: { lengthId: number; lengthTitle: string; lengthDescription: string }) => {
    // if not then just get the title and description
    onEditLength(values.lengthId, values.lengthTitle, values.lengthDescription);
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

  /* ================================================== */
  /*  Components  */
  /* ================================================== */

  /* ---------------------------- */
  // Body
  /* ---------------------------- */
  /* Create Body Form */
  let createBodyFormComponent = (
    <>
      <Form
        form={createBodyForm}
        name="createBody"
        onKeyDown={(e) => handleKeyDown(e, createBodyForm)}
        onFinish={onCreateBodyFinish}
      >
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
          <Input placeholder="Type description here" />
        </Form.Item>
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

  /* Edit Body Form */
  let editBodyFormComponent = (
    <>
      <Form
        form={editBodyForm}
        name="editBody"
        onKeyDown={(e) => handleKeyDown(e, editBodyForm)}
        onFinish={onEditBodyFinish}
      >
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
          <Input placeholder="Type description here" />
        </Form.Item>

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
  let editBodyModal = (
    <Modal
      title="Edit Body"
      visible={showEditModal.body}
      onOk={editBodyForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowEditModal({
          ...showEditModal,
          body: false,
        });
      }}
    >
      {/* the content within the modal */}
      {editBodyFormComponent}
    </Modal>
  );
  /* ---------------------------- */
  // Length
  /* ---------------------------- */
  /* Create Length Form */
  let createLengthFormComponent = (
    <>
      <Form
        form={createLengthForm}
        name="createLength"
        onKeyDown={(e) => handleKeyDown(e, createLengthForm)}
        onFinish={onCreateLengthFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="lengthTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input type="number" min={0} placeholder="Type title here" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="lengthDescription"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <Input placeholder="Type description here" />
        </Form.Item>
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

  /* Edit Length Form */
  let editLengthFormComponent = (
    <>
      <Form
        form={editLengthForm}
        name="editLength"
        onKeyDown={(e) => handleKeyDown(e, editLengthForm)}
        onFinish={onEditLengthFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="lengthTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input placeholder="Type title here" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="lengthDescription"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <Input placeholder="Type description here" />
        </Form.Item>

        {/* Getting the brand id */}
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
  let editLengthModal = (
    <Modal
      title="Edit Length"
      visible={showEditModal.length}
      onOk={editLengthForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // close edit body modal
        setShowEditModal({
          ...showEditModal,
          length: false,
        });
      }}
    >
      {/* the content within the modal */}
      {editLengthFormComponent}
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

  /* -------------------- */
  // success notification
  /* -------------------- */
  useEffect(() => {
    if (successMessage) {
      // no need to call notification again because Make Page already calls it

      // clear the successMessage object, set to null
      onClearSalesState();
      // clear the form inputs using the form reference
      createBodyForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, body: false, length: false });
      setShowEditModal({ ...showEditModal, body: false, length: false });
    }
  }, [showEditModal, setShowEditModal, createBodyForm, showCreateModal, successMessage, onClearSalesState]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* ================== */}
      {/*       Modals       */}
      {/* ================== */}
      {createBodyModal}
      {editBodyModal}
      {createLengthModal}
      {editLengthModal}

      <section className="">
        <HeaderTitle>Body (Tail)</HeaderTitle>
        {bodiesArray ? (
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
              {/*    Brand Table     */}
              {/* ------------------ */}
              <Table
                bordered
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
                scroll={{ x: '89rem', y: 400 }}
                dataSource={lengthTableState}
                columns={convertHeader(lengthColumns, setLengthColumns)}
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
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  return {
    loading: state.sales.loading,
    successMessage: state.sales.successMessage,
    bodiesArray: state.sales.bodiesArray,
    lengthsArray: state.sales.lengthsArray,
  };
};
interface DispatchProps {
  // Body
  onGetBodies: typeof actions.getBodies;
  onCreateBody: typeof actions.createBody;
  onEditBody: typeof actions.updateBody;
  // Length
  onGetLengths: typeof actions.getLengths;
  onCreateLength: typeof actions.createLength;
  onEditLength: typeof actions.updateLength;
  // Miscellaneous
  onClearSalesState: typeof actions.clearSalesState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    // Body
    onGetBodies: () => dispatch(actions.getBodies()),
    onCreateBody: (title, description) => dispatch(actions.createBody(title, description)),
    onEditBody: (id, title, description) => dispatch(actions.updateBody(id, title, description)),
    // Length
    onGetLengths: () => dispatch(actions.getLengths()),
    onCreateLength: (title, description) => dispatch(actions.createLength(title, description)),
    onEditLength: (id, title, description) => dispatch(actions.updateLength(id, title, description)),
    // Miscellaneous
    onClearSalesState: () => dispatch(actions.clearSalesState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Body);

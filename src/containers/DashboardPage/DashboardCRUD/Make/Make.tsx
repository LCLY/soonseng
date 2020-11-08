import React, { useEffect, useState } from 'react';
import './Make.scss';
/*components*/
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
/*3rd party lib*/
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
// import Highlighter from 'react-highlight-words';
import { Empty, Table, Form, Input, Button, Modal, notification, Select, DatePicker } from 'antd';
/* Util */
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types';
import { TBrandReceivedObj, TMakeReceivedObj, TMakeSubmitData, TWheelbaseReceivedObj } from 'src/store/types/sales';
import { setFilterReference, convertHeader, getColumnSearchProps } from 'src/shared/Utils';
import Loading from 'src/components/Loading/Loading';
import moment from 'moment';

const { Option } = Select;

interface MakeProps {}

type TBrandState = {
  key?: number;
  index?: number;
  brandId: number;
  brandTitle: string;
  brandDescription: string;
  available?: boolean;
};
type TWheelbaseState = {
  key?: number;
  index?: number;
  wheelbaseId: number;
  wheelbaseTitle: string;
  wheelbaseDescription: string;
  available?: boolean;
};
type TMakeState = {
  key: number;
  index: number;
  makeId: number;
  gvw: string;
  year: string;
  makeTitle: string;
  price: string;
  length: string;
  available: boolean;
  engine_cap: string;
  horsepower: string;
  description: string;
  transmission: string;
  makeBrandId: number;
  makeBrandTitle: string;
  makeWheelbaseId: number;
  makeWheelbaseTitle: string;
  /** a long combined string for filter usage */
  makeDetails: string;
};

type TShowModal = {
  make: boolean;
  brand: boolean;
  /** brand object for edit modal */
  brandObj?: TBrandState;
  wheelbase: boolean;
  /** wheelbase object for edit modal */
  wheelbaseObj?: TWheelbaseState;
};

type Props = MakeProps & StateProps & DispatchProps;

const Make: React.FC<Props> = ({
  loading,
  errorMessage,
  makesArray,
  brandsArray,
  successMessage,
  wheelbasesArray,
  onGetMakes,
  onGetBrands,
  onCreateMake,
  onCreateBrand,
  onUpdateBrand,
  onGetWheelbases,
  onCreateWheelbase,
  onClearSalesState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [form] = Form.useForm();
  const [createBrandForm] = Form.useForm();
  const [editBrandForm] = Form.useForm();
  // const [createWheelbaseForm] = Form.useForm();
  // const [editWheelbaseForm] = Form.useForm();
  // const [createMakeForm] = Form.useForm();
  // const [editMakeForm] = Form.useForm();
  // Table states
  const [makeState, setMakeState] = useState<TMakeState[]>([]);
  const [brandsState, setBrandState] = useState<TBrandState[]>([]);
  const [wheelbaseState, setWheelbaseState] = useState<TWheelbaseState[]>([]);
  // Modal states
  const [showEditModal, setShowEditModal] = useState<TShowModal>({
    brand: false,
    wheelbase: false,
    make: false,
  });
  const [showCreateModal, setShowCreateModal] = useState<TShowModal>({
    brand: false,
    wheelbase: false,
    make: false,
  });

  let brandSearchInput = null;
  let wheelbaseSearchInput = null;
  let makeSearchInput = null;

  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });

  setFilterReference(filterData, setFilterData);

  // store header definition in state
  /**
   * containing objects of arrays
   * brand[], wheelbases[], make[]
   **/

  /* Brand column initialization */
  const [brandColumns, setBrandColumns] = useState([
    {
      key: 'index',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TBrandState, b: TBrandState) => a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'brandTitle',
      title: 'Title',
      dataIndex: 'brandTitle',
      width: '15rem',
      ellipsis: true,
      sorter: (a: TBrandState, b: TBrandState) => a.brandTitle.localeCompare(b.brandTitle),
      ...getColumnSearchProps(brandSearchInput, 'brandTitle', 'Title'),
    },
    {
      key: 'brandDescription',
      title: 'Description',
      dataIndex: 'brandDescription',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TBrandState, b: TBrandState) => a.brandDescription.localeCompare(b.brandDescription),

      ...getColumnSearchProps(brandSearchInput, 'brandDescription', 'Description'),
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TBrandState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // show modal
                setShowEditModal({ ...showEditModal, brand: true });
                // update the form value
                // if brandDescription is '-' then change to empty string, else the real string
                editBrandForm.setFieldsValue({
                  id: record.brandId,
                  title: record.brandTitle,
                  description: record.brandDescription === '-' ? '' : record.brandDescription,
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

  /* Wheelbase column initialization */
  const [wheelbaseColumn, setWheelbaseColumn] = useState([
    {
      key: 'index',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TWheelbaseState, b: TWheelbaseState) =>
        a.index !== undefined && b.index !== undefined && a.index - b.index,
    },
    {
      key: 'wheelbaseTitle',
      title: 'Title',
      dataIndex: 'wheelbaseTitle',
      width: '15rem',
      ellipsis: true,
      sorter: (a: TWheelbaseState, b: TWheelbaseState) => a.wheelbaseTitle.localeCompare(b.wheelbaseTitle),
      ...getColumnSearchProps(wheelbaseSearchInput, 'wheelbaseTitle', 'Title'),
    },
    {
      key: 'wheelbaseDescription',
      title: 'Description',
      dataIndex: 'wheelbaseDescription',
      ellipsis: true,
      width: 'auto',
      sorter: (a: TWheelbaseState, b: TWheelbaseState) => a.wheelbaseDescription.localeCompare(b.wheelbaseDescription),
      ...getColumnSearchProps(wheelbaseSearchInput, 'wheelbaseDescription', 'Description'),
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      width: '17rem',
      render: (_text: any, _record: TBrandState) => {
        return (
          <>
            <Button className="make__brand-btn--edit" type="link">
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

  /* Make column initialization */
  const [makeColumn, setMakeColumn] = useState([
    {
      key: 'index',
      title: 'No.',
      dataIndex: 'index',
      ellipsis: true,
      width: '7rem',
      align: 'center',
      sorter: (a: TMakeState, b: TMakeState) => a.index - b.index,
    },
    {
      key: 'makeBrandTitle',
      title: 'Brand',
      dataIndex: 'makeBrandTitle',
      ellipsis: true,
      width: '15rem',
      align: 'center',
      sorter: (a: TMakeState, b: TMakeState) =>
        typeof a.makeBrandTitle === 'string' &&
        typeof b.makeBrandTitle === 'string' &&
        a.makeBrandTitle.localeCompare(b.makeBrandTitle),
      ...getColumnSearchProps(makeSearchInput, 'makeBrandTitle', 'Brand'),
    },
    {
      key: 'makeTitle',
      title: 'Title',
      dataIndex: 'makeTitle',
      width: '15rem',
      ellipsis: true,
      sorter: (a: TMakeState, b: TMakeState) => a.makeTitle.localeCompare(b.makeTitle),
      ...getColumnSearchProps(makeSearchInput, 'makeTitle', 'Title'),
    },
    {
      key: 'makeDetails',
      title: 'Details',
      dataIndex: 'makeDetails',
      ellipsis: true,
      width: 'auto',
      ...getColumnSearchProps(makeSearchInput, 'makeDetails', 'Details'),
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      width: '17rem',
      render: (_text: any, _record: TBrandState) => {
        return (
          <>
            <Button className="make__brand-btn--edit" type="link">
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
  const onCreateBrandFinish = (values: { title: string; description: string }) => {
    onCreateBrand(values.title, values.description);
  };
  const onEditBrandFinish = (values: { id: number; title: string; description: string }) => {
    onUpdateBrand(values.id, values.title, values.description);
  };
  const onWheelbaseFinish = (values: { title: string; description: string }) => {
    onCreateWheelbase(values.title, values.description);
  };
  type makeFinishValues = {
    gvw: string;
    year: string;
    price: string;
    title: string;
    length: string;
    brand_id: string;
    engine_cap: string;
    horsepower: string;
    description: string;
    wheelbase_id: string;
    transmission: string;
  };
  const onMakeFinish = (values: makeFinishValues) => {
    // package the object
    let createMakeSubmitData: TMakeSubmitData = {
      gvw: values.gvw,
      title: values.title,
      length: values.length,
      engine_cap: values.engine_cap,
      price: values.price.toString(),
      horsepower: values.horsepower,
      description: values.description,
      transmission: values.transmission,
      brand_id: values.brand_id.toString(),
      wheelbase_id: values.wheelbase_id.toString(),
      year: moment(values.year).year().toString(), //convert to year
    };
    onCreateMake(createMakeSubmitData);
  };

  /* ================================================== */
  /*  Components  */
  /* ================================================== */

  /* ------------------- */
  // Create Brand Form
  /* ------------------- */
  let createBrandFormComponent = (
    <>
      <Form form={createBrandForm} name="createBrand" onFinish={onCreateBrandFinish}>
        <Form.Item
          className="make__form-item"
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input placeholder="Type title here" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="description"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <Input placeholder="Type description here" />
        </Form.Item>
      </Form>
    </>
  );

  /* ------------------- */
  // Edit Brand Form
  /* ------------------- */
  let editBrandFormComponent = (
    <>
      <Form form={editBrandForm} name="editBrand" onFinish={onEditBrandFinish}>
        <Form.Item
          className="make__form-item"
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input placeholder="Type title here" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="description"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <Input placeholder="Type description here" />
        </Form.Item>

        {/* Getting the id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="id"
          hidden
          rules={[{ required: true, message: 'Input description here!' }]}
        >
          <Input placeholder="Type id here" />
        </Form.Item>
      </Form>
    </>
  );

  /* ----------------------- */
  // Create Wheelbase Form
  /* ----------------------- */
  let createWheelbaseFormComponent = (
    <>
      <Form form={form} name="basic" onFinish={onWheelbaseFinish}>
        <Form.Item
          className="make__form-item"
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input type="number" min={0} addonAfter={'mm'} placeholder="Type title here e.g. 3300" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="description"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <Input placeholder="Type description here" />
        </Form.Item>
      </Form>
    </>
  );
  /* ------------------- */
  // Create Make Form
  /* ------------------- */
  let createMakeFormComponent = (
    <>
      <Form form={form} name="basic" onFinish={onMakeFinish}>
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
          name="brand_id"
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
              brandsArray.map((brand, index) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={index} value={brand.id}>
                    {brand.title}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>

        {/* ------- Wheelbase - value is Wheelbase id but display is Wheelbase name  -------*/}
        <Form.Item
          className="make__form-item make__form-item--make"
          label="Wheelbase"
          name="wheelbase_id"
          rules={[{ required: true, message: 'Select wheelbase!' }]}
        >
          <Select
            showSearch
            placeholder="Select a wheelbase"
            optionFilterProp="children"
            onChange={(value) => console.log(value)}
            filterOption={(input, option) =>
              option !== undefined && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {wheelbasesArray &&
              wheelbasesArray.map((wheelbase, index) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={index} value={wheelbase.id}>
                    {wheelbase.title + 'mm'}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>

        {/* ------- Length ------- */}
        <Form.Item
          className="make__form-item make__form-item--make"
          label="Length"
          name="length"
          rules={[{ required: true, message: 'Input length here!' }]}
        >
          <Input type="number" min={0} addonAfter={'ft'} placeholder="Type length here e.g. 17" />
        </Form.Item>

        {/* ------- Engine cap ------- */}
        <Form.Item
          className="make__form-item make__form-item--make"
          label="Engine Cap"
          name="engine_cap"
          rules={[{ required: true, message: 'Input Engine Cap here!' }]}
        >
          <Input type="number" min={0} placeholder="Type length here e.g. 115" />
        </Form.Item>

        {/* ------- Horsepower ------- */}
        <Form.Item
          className="make__form-item make__form-item--make"
          label="Horsepower"
          name="horsepower"
          rules={[{ required: true, message: 'Input Horsepower here!' }]}
        >
          <Input type="number" min={0} addonAfter={'hp'} placeholder="Type horsepower here e.g. 250" />
        </Form.Item>

        {/* ------- Year ------- */}
        <Form.Item
          className="make__form-item make__form-item--make"
          label="Year"
          name="year"
          rules={[{ required: true, message: 'Select a year!' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            // onChange={(date, dateString) => console.log(date, dateString)}
            picker="year"
          />
        </Form.Item>

        {/* ------- Transmission ------- */}
        <Form.Item
          className="make__form-item make__form-item--make"
          label="Transmission"
          name="transmission"
          rules={[{ required: true, message: 'Input Transmission here!' }]}
        >
          <Input placeholder="Type transmission here e.g. MT" />
        </Form.Item>

        {/* ------- GVW ------- */}
        <Form.Item
          className="make__form-item make__form-item--make"
          label="GVW"
          name="gvw"
          rules={[{ required: true, message: 'Input Gross Vehicle Weight here!' }]}
        >
          <Input type="number" min={0} addonAfter="kg" placeholder="Type Gross Vehicle Weight here e.g. 2000" />
        </Form.Item>

        {/* ------- Price ------- */}
        <Form.Item
          className="make__form-item make__form-item--make"
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Input price here!' }]}
        >
          <Input type="number" min={0} addonBefore="RM" placeholder="Type price here e.g. 1500" />
        </Form.Item>

        {/* ------- Description ------- */}
        <Form.Item
          className="make__form-item make__form-item--make"
          label="Description"
          name="description"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <Input placeholder="Type description here" />
        </Form.Item>
      </Form>
    </>
  );

  /* ---------------------- */
  // Create Brand Modal
  /* ---------------------- */
  let createBrandModal = (
    <Modal
      title="Create Brand"
      visible={showCreateModal.brand}
      onOk={createBrandForm.submit}
      confirmLoading={loading}
      onCancel={() => setShowCreateModal({ ...showCreateModal, brand: false })}
    >
      {/* the content within the modal */}
      {createBrandFormComponent}
    </Modal>
  );

  let editBrandModal = (
    <Modal
      title="Edit Brand"
      visible={showEditModal.brand}
      onOk={editBrandForm.submit}
      confirmLoading={loading}
      onCancel={() => {
        // reset the brandObj value
        setShowEditModal({
          ...showEditModal,
          brand: false,
          brandObj: { brandId: -1, brandTitle: '', brandDescription: '' },
        });
      }}
    >
      {/* the content within the modal */}
      {editBrandFormComponent}
    </Modal>
  );

  let createwheelbaseModal = (
    <Modal
      title="Create Wheelbase"
      visible={showCreateModal.wheelbase}
      onOk={form.submit}
      confirmLoading={loading}
      onCancel={() => setShowCreateModal({ ...showCreateModal, wheelbase: false })}
    >
      {/* the content within the modal */}
      {createWheelbaseFormComponent}
    </Modal>
  );
  let createMakeModal = (
    <Modal
      centered
      title="Create Make"
      visible={showCreateModal.make}
      onOk={form.submit}
      confirmLoading={loading}
      onCancel={() => setShowCreateModal({ ...showCreateModal, make: false })}
    >
      {/* the content within the modal */}
      {createMakeFormComponent}
    </Modal>
  );

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */
  //  Calling get APIs
  useEffect(() => {
    onGetBrands();
  }, [onGetBrands]);

  useEffect(() => {
    onGetWheelbases();
  }, [onGetWheelbases]);

  useEffect(() => {
    onGetMakes();
  }, [onGetMakes]);

  /* -------------------------------------------- */
  // initialize the state of data array for BRAND
  /* -------------------------------------------- */
  useEffect(() => {
    let tempArray: TBrandState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (brand: TBrandReceivedObj, index: number) => {
      let descriptionIsNullOrEmpty = brand.description === null || brand.description === '';
      // only render when available value is true
      if (brand.available) {
        tempArray.push({
          key: index,
          index: index + 1,
          brandId: brand.id,
          brandTitle: brand.title,
          brandDescription: descriptionIsNullOrEmpty ? '-' : brand.description,
          available: brand.available,
        });
      }
    };

    if (brandsArray) {
      // Execute function "storeValue" for every array index
      brandsArray.map(storeValue);
    }
    // update the state with tempArray
    setBrandState(tempArray);
  }, [brandsArray]);

  /* -------------------------------------------------- */
  // initialize the state of data array for WHEELBASES
  /* -------------------------------------------------- */
  useEffect(() => {
    let tempArray: TWheelbaseState[] = [];
    // A function that stores desired keys and values into a tempArray
    const storeValue = (wheelbase: TWheelbaseReceivedObj, index: number) => {
      let descriptionIsNullOrEmpty = wheelbase.description === null || wheelbase.description === '';

      // only push into the array when available value is true
      if (wheelbase.available) {
        tempArray.push({
          key: index,
          index: index + 1,
          wheelbaseId: wheelbase.id,
          wheelbaseTitle: wheelbase.title + 'mm',
          wheelbaseDescription: descriptionIsNullOrEmpty ? '-' : wheelbase.description,
          available: wheelbase.available,
        });
      }
    };

    if (wheelbasesArray) {
      // Execute function "storeValue" for every array index
      wheelbasesArray.map(storeValue);
    }
    // update the state with tempArray
    setWheelbaseState(tempArray);
  }, [wheelbasesArray]);

  /* -------------------------------------------------- */
  // initialize the state of data array for MAKES
  /* -------------------------------------------------- */
  useEffect(() => {
    let tempArray: TMakeState[] = [];
    // A function that stores desired keys and values into a tempArray
    const storeValue = (make: TMakeReceivedObj, index: number) => {
      let descriptionIsNullOrEmpty = make.description === null || make.description === '';

      let detailsCombinedString = ''; //use this combined string so that filter can work
      // manipulate the strings first
      let concatLength = make.length + 'ft';
      let concatWheelbase = make.wheelbase.title + 'mm';
      let concatHorsePower = make.horsepower + 'hp';
      let concatGvw = make.gvw + 'kg';
      let concatPrice = 'RM' + make.price;

      // concatenate them
      detailsCombinedString +=
        concatLength +
        concatWheelbase +
        concatHorsePower +
        concatGvw +
        concatPrice +
        make.engine_cap +
        make.transmission +
        make.year;

      if (make.description !== null) {
        // if description exist then add description into the string
        detailsCombinedString += make.description;
      }

      // check if undefined
      let makeGVW = make.gvw === undefined ? '-' : make.gvw + 'kg';
      let makeYear = make.year === undefined ? '-' : make.year;
      let makePrice = make.price === undefined ? '-' : 'RM' + make.price;
      let makeTitle = make.title === undefined ? '-' : make.title;
      let makeLength = make.length === undefined ? '-' : make.length + 'ft';
      let makeEngineCap = make.engine_cap === undefined ? '-' : make.engine_cap;
      let makeHorsepower = make.horsepower === undefined ? '-' : make.horsepower + 'hp';
      let makeTransmission = make.transmission === undefined ? '-' : make.transmission;
      let makeBrandTitle = make.brand.title === undefined ? '-' : make.brand.title;
      let makeWheelbaseTitle = make.wheelbase.title === undefined ? '-' : make.wheelbase.title + 'mm';

      // only push into the array when available value is true
      if (make.available) {
        tempArray.push({
          key: index,
          index: index + 1,
          gvw: makeGVW,
          year: makeYear,
          makeId: make.id,
          price: makePrice,
          length: makeLength,
          makeTitle: makeTitle,
          available: make.available,
          engine_cap: makeEngineCap,
          horsepower: makeHorsepower,
          transmission: makeTransmission,
          makeDetails: detailsCombinedString,
          makeBrandId: make.brand.id,
          makeBrandTitle: makeBrandTitle,
          makeWheelbaseId: make.wheelbase.id,
          makeWheelbaseTitle: makeWheelbaseTitle,
          description: descriptionIsNullOrEmpty ? '-' : make.description,
        });
      }
    };

    if (makesArray) {
      // Execute function "storeValue" for every array index
      makesArray.map(storeValue);
    }
    // update the state with tempArray
    setMakeState(tempArray);
  }, [makesArray]);

  /* -------------------- */
  // success notification
  /* -------------------- */
  useEffect(() => {
    if (successMessage) {
      notification['success']({
        message: 'Success',
        description: successMessage,
      });
      // clear the successMessage object, set to null
      onClearSalesState();
      // clear the inputs
      createBrandForm.resetFields();
      form.resetFields();
      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, brand: false, wheelbase: false, make: false });
    }
  }, [form, createBrandForm, showCreateModal, successMessage, onClearSalesState]);

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
      {createBrandModal}
      {editBrandModal}
      {createwheelbaseModal}
      {createMakeModal}

      <section>
        <HeaderTitle>Make (Head)</HeaderTitle>

        {brandsArray && wheelbasesArray && makesArray ? (
          <>
            {/* ====================== */}
            {/*     Brand Section      */}
            {/* ====================== */}
            {brandsArray.length === 0 ? (
              <Empty style={{ marginTop: '5rem' }} />
            ) : (
              <section className="make__section">
                <div className="make__header-div ">
                  <div className="make__header-title">Brands</div>
                  <Button
                    type="primary"
                    className="make__brand-btn"
                    onClick={() => setShowCreateModal({ ...showCreateModal, brand: true })}
                  >
                    Create New Brand
                  </Button>
                </div>
                {/* ------------------ */}
                {/*    Brand Table     */}
                {/* ------------------ */}
                <Table
                  bordered
                  scroll={{ x: '89rem', y: 400 }}
                  // components={components}
                  dataSource={brandsState}
                  columns={convertHeader(brandColumns, setBrandColumns)}
                  pagination={false}
                />
              </section>
            )}

            {/* ====================== */}
            {/*   Wheelbases Section   */}
            {/* ====================== */}
            {wheelbasesArray.length === 0 ? (
              <Empty style={{ marginTop: '5rem' }} />
            ) : (
              <section className="make__section">
                <div className="make__header-div ">
                  <div className="make__header-title">Wheelbases</div>
                  <Button
                    type="primary"
                    className="make__brand-btn"
                    onClick={() => setShowCreateModal({ ...showCreateModal, wheelbase: true })}
                  >
                    Create New Wheelbase
                  </Button>
                </div>

                {/* -------------------- */}
                {/*   Wheelbase Table   */}
                {/* -------------------- */}
                <Table
                  bordered
                  scroll={{ x: '89rem', y: 300 }}
                  // components={components}
                  dataSource={wheelbaseState}
                  columns={convertHeader(wheelbaseColumn, setWheelbaseColumn)}
                  pagination={false}
                />
              </section>
            )}

            {/* ====================== */}
            {/*      Makes Section     */}
            {/* ====================== */}
            {wheelbasesArray.length === 0 ? (
              <Empty style={{ marginTop: '5rem' }} />
            ) : (
              <section className="make__section">
                <div className="make__header-div ">
                  <div className="make__header-title">Makes</div>
                  <Button
                    type="primary"
                    className="make__brand-btn"
                    onClick={() => setShowCreateModal({ ...showCreateModal, make: true })}
                  >
                    Create New Make
                  </Button>
                </div>

                {/* -------------------- */}
                {/*     Make Table      */}
                {/* -------------------- */}
                <Table
                  bordered
                  scroll={{ x: '89rem', y: 600 }}
                  // components={components}
                  dataSource={makeState}
                  columns={convertHeader(makeColumn, setMakeColumn)}
                  pagination={false}
                />
              </section>
            )}
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
  errorMessage?: string | null;
  successMessage?: string | null;
  makesArray?: TMakeReceivedObj[] | null;
  brandsArray?: TBrandReceivedObj[] | null;
  wheelbasesArray?: TWheelbaseReceivedObj[] | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  return {
    loading: state.sales.loading,
    makesArray: state.sales.makesArray,
    brandsArray: state.sales.brandsArray,
    errorMessage: state.sales.errorMessage,
    successMessage: state.sales.successMessage,
    wheelbasesArray: state.sales.wheelbasesArray,
  };
};
interface DispatchProps {
  // Brand
  onGetBrands: typeof actions.getBrands;
  onCreateBrand: typeof actions.createBrand;
  onUpdateBrand: typeof actions.updateBrand;
  // Wheelbase
  onGetWheelbases: typeof actions.getWheelbases;
  onCreateWheelbase: typeof actions.createWheelbase;
  // Make
  onGetMakes: typeof actions.getMakes;
  onCreateMake: typeof actions.createMake;
  // Miscellaneous
  onClearSalesState: typeof actions.clearSalesState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    // Brand
    onGetBrands: () => dispatch(actions.getBrands()),
    onCreateBrand: (title, description) => dispatch(actions.createBrand(title, description)),
    onUpdateBrand: (id, title, description) => dispatch(actions.updateBrand(id, title, description)),
    // Wheelbase
    onGetWheelbases: () => dispatch(actions.getWheelbases()),
    onCreateWheelbase: (title, description) => dispatch(actions.createWheelbase(title, description)),
    // Make
    onGetMakes: () => dispatch(actions.getMakes()),
    onCreateMake: (createMakeSubmitData) => dispatch(actions.createMake(createMakeSubmitData)),
    // Miscellaneous
    onClearSalesState: () => dispatch(actions.clearSalesState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Make);

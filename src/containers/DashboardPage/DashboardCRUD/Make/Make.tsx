import React, { useEffect, useState } from 'react';
import './Make.scss';
/*components*/
import Loading from 'src/components/Loading/Loading';
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
/*3rd party lib*/
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { Table, Form, Input, Button, Modal, notification, Select, DatePicker } from 'antd';
/* Util */
import {
  TReceivedBrandObj,
  TReceivedMakeObj,
  TCreateMakeData,
  TUpdateMakeData,
  TReceivedWheelbaseObj,
} from 'src/store/types/sales';
import * as actions from 'src/store/actions/index';
import { img_placeholder_link } from 'src/shared/global';
import { TMapStateToProps } from 'src/store/types';
import { setFilterReference, convertHeader, getColumnSearchProps } from 'src/shared/Utils';

const { Option } = Select;

interface MakeProps {}

type TBrandState = {
  key?: string;
  index?: number;
  brandId: number;
  brandTitle: string;
  brandDescription: string;
  available?: boolean;
};
type TWheelbaseState = {
  key?: string;
  index?: number;
  wheelbaseId: number;
  wheelbaseTitle: string;
  wheelbaseDescription: string;
  available?: boolean;
};
type TMakeState = {
  key: string;
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
  currentMakeId?: number; //id to track which specific object is currently being edited
  brand: boolean;
  currentBrandId?: number;
  wheelbase: boolean;
  currentWheelbaseId?: number;
};

type Props = MakeProps & StateProps & DispatchProps;

const Make: React.FC<Props> = ({
  // Miscellaneous
  loading,
  errorMessage,
  successMessage,
  onClearSalesState,
  // brand
  brandsArray,
  onGetBrands,
  onCreateBrand,
  onUpdateBrand,
  // wheelbase
  wheelbasesArray,
  onGetWheelbases,
  onCreateWheelbase,
  onUpdateWheelbase,
  // make
  makesArray,
  onGetMakes,
  onCreateMake,
  onUpdateMake,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const [createBrandForm] = Form.useForm();
  const [editBrandForm] = Form.useForm();
  const [createWheelbaseForm] = Form.useForm();
  const [editWheelbaseForm] = Form.useForm();
  const [createMakeForm] = Form.useForm();
  const [editMakeForm] = Form.useForm();
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
                // update the form value using the 'name' attribute as target/key
                // if brandDescription is '-' then change to empty string, else the real string
                // remember to set this form on the Form component
                editBrandForm.setFieldsValue({
                  brandId: record.brandId,
                  brandTitle: record.brandTitle,
                  brandDescription: record.brandDescription === '-' ? '' : record.brandDescription,
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
      render: (_text: any, record: TWheelbaseState) => {
        return (
          <>
            <Button
              className="make__brand-btn--edit"
              type="link"
              onClick={() => {
                // show modal
                setShowEditModal({ ...showEditModal, wheelbase: true });
                let convertedToIntWheelbaseTitle = parseInt(record.wheelbaseTitle.replace('mm', ''));
                // update the form value
                // if wheelbaseDescription is '-' then change to empty string, else the real string
                // remember to set this form on the Form component
                editWheelbaseForm.setFieldsValue({
                  wheelbaseId: record.wheelbaseId,
                  wheelbaseTitle: convertedToIntWheelbaseTitle,
                  wheelbaseDescription: record.wheelbaseDescription === '-' ? '' : record.wheelbaseDescription,
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
      render: (_text: any, record: TMakeState) => {
        return (
          <>
            <Button
              className="make__brand-btn--edit"
              type="link"
              onClick={() => {
                // update the form value using the 'name' attribute as target/key
                // e.g. record.length = ("10 ' 11 '' ")-> splitting using " '" so we will get ["100"," 11","' "]
                let extractedFeet = '';
                let extractedInch = '';
                let extractedHorsepower = '';
                let extractedPrice = '';
                let extractedGvw = '';
                // they have to be legit strings after being splitted
                if (record.length.split(" '")[0] !== undefined && record.length.split(" '")[1] !== undefined) {
                  extractedFeet = record.length.split(" '")[0]; //get the first index
                  extractedInch = record.length.split(" '")[1].toString().trim(); //second index and remove empty space infront of the inch
                } else {
                  // this can be removed after database is being cleared because it's guaranteed to have ft and inch after
                  extractedFeet = record.length;
                  extractedInch = record.length;
                }

                // replace units with empty strings
                extractedHorsepower = record.horsepower.replace('hp', '');
                extractedPrice = record.price.replace('RM', '');
                extractedGvw = record.gvw.replace('kg', '');

                // remember to set this form on the Form component
                editMakeForm.setFieldsValue({
                  makeId: record.makeId,
                  gvw: extractedGvw,
                  year: moment(record.year),
                  price: extractedPrice,
                  title: record.makeTitle,
                  makeBrandId: record.makeBrandId,
                  engine_cap: record.engine_cap,
                  horsepower: extractedHorsepower,
                  makeWheelbaseId: record.makeWheelbaseId,
                  transmission: record.transmission,
                  length: { feet: extractedFeet, inch: extractedInch },
                });

                // show modal
                setShowEditModal({ ...showEditModal, make: true, currentMakeId: record.makeId });
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
  const onCreateBrandFinish = (values: { brandTitle: string; brandDescription: string }) => {
    onCreateBrand(values.brandTitle, values.brandDescription);
  };
  const onEditBrandFinish = (values: { brandId: number; brandTitle: string; brandDescription: string }) => {
    onUpdateBrand(values.brandId, values.brandTitle, values.brandDescription);
  };
  const onCreateWheelbaseFinish = (values: { wheelbaseTitle: string; wheelbaseDescription: string }) => {
    onCreateWheelbase(values.wheelbaseTitle, values.wheelbaseDescription);
  };
  const onEditWheelbaseFinish = (values: {
    wheelbaseId: number;
    wheelBaseTitle: string;
    wheelbaseDescription: string;
  }) => {
    onUpdateWheelbase(values.wheelbaseId, values.wheelBaseTitle, values.wheelbaseDescription);
  };
  // Type for values from onCreateMakeFinish / onUpdateMakeFinish thats from the form
  type TCreateMakeFinishValues = {
    gvw: string;
    year: string;
    price: string;
    title: string;
    brand_id: string;
    engine_cap: string;
    horsepower: string;
    description: string;
    wheelbase_id: string;
    transmission: string;
    length: { feet: string; inch: string };
  };
  type TUpdateMakeFinishValues = {
    gvw: string;
    year: string;
    price: string;
    title: string;
    engine_cap: string;
    horsepower: string;
    description: string;
    transmission: string;
    makeId: number;
    makeBrandId: string;
    makeWheelbaseId: string;
    length: { feet: string; inch: string };
  };
  const onCreateMakeFinish = (values: TCreateMakeFinishValues) => {
    // combine the ft and inch
    let concatLength = values.length.feet + " ' " + values.length.inch + " '' ";
    // package the object
    let createMakeData: TCreateMakeData = {
      gvw: values.gvw,
      title: values.title,
      length: concatLength,
      engine_cap: values.engine_cap,
      price: values.price.toString(),
      horsepower: values.horsepower,
      transmission: values.transmission,
      brand_id: values.brand_id.toString(),
      wheelbase_id: values.wheelbase_id.toString(),
      year: moment(values.year).year().toString(), //convert to year
    };
    onCreateMake(createMakeData);
  };
  const onEditMakeFinish = (values: TUpdateMakeFinishValues) => {
    let concatLength = values.length.feet + " ' " + values.length.inch + " '' ";
    // package the object
    let updateMakeData: TUpdateMakeData = {
      make_id: values.makeId,
      gvw: values.gvw,
      title: values.title,
      length: concatLength,
      engine_cap: values.engine_cap,
      price: values.price.toString(),
      horsepower: values.horsepower,
      transmission: values.transmission,
      brand_id: values.makeBrandId.toString(),
      wheelbase_id: values.makeWheelbaseId.toString(),
      year: moment(values.year).year().toString(), //convert to year
    };
    onUpdateMake(updateMakeData);
  };

  /**
   * For user to be able to press enter and submit the form
   * @param {React.KeyboardEvent<HTMLFormElement>} e
   * @param {FormInstance<any>} form form instance created at initialization using useForm
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>, form: FormInstance<any>) => {
    if (e.key === 'Enter') {
      form.submit();
    }
  };
  /* ================================================== */
  /*  Components  */
  /* ================================================== */

  /* ================================================ */
  // Brand
  /* ================================================ */
  /* ------------------- */
  // Create Brand Form
  /* ------------------- */
  let createBrandFormComponent = (
    <>
      <Form
        form={createBrandForm}
        name="createBrand"
        onKeyDown={(e) => handleKeyDown(e, createBrandForm)}
        onFinish={onCreateBrandFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="brandTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input placeholder="Type title here" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="brandDescription"
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

  /* ------------------- */
  // Edit Brand Form
  /* ------------------- */
  let editBrandFormComponent = (
    <>
      <Form
        form={editBrandForm}
        name="editBrand"
        onKeyDown={(e) => handleKeyDown(e, editBrandForm)}
        onFinish={onEditBrandFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="brandTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input placeholder="Type title here" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="brandDescription"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <Input placeholder="Type description here" />
        </Form.Item>

        {/* Getting the brand id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="brandId"
          hidden
          rules={[{ required: true, message: 'Get brand id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* ---------------------- */
  // Edit Brand Modal
  /* ---------------------- */
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
        });
      }}
    >
      {/* the content within the modal */}
      {editBrandFormComponent}
    </Modal>
  );

  /* ================================================ */
  // Wheelbase
  /* ================================================ */
  /* ----------------------- */
  // Create Wheelbase Form
  /* ----------------------- */
  let createWheelbaseFormComponent = (
    <>
      <Form
        form={createWheelbaseForm}
        name="createWheelbase"
        onKeyDown={(e) => handleKeyDown(e, createWheelbaseForm)}
        onFinish={onCreateWheelbaseFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="wheelbaseTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input type="number" min={0} addonAfter={'mm'} placeholder="Type title here e.g. 3300" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="wheelbaseDescription"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <Input placeholder="Type description here" />
        </Form.Item>
      </Form>
    </>
  );

  /* ---------------------- */
  // Create Wheelbase Modal
  /* ---------------------- */
  let createWheelbaseModal = (
    <Modal
      title="Create Wheelbase"
      visible={showCreateModal.wheelbase}
      onOk={createWheelbaseForm.submit}
      confirmLoading={loading}
      onCancel={() => setShowCreateModal({ ...showCreateModal, wheelbase: false })}
    >
      {/* the content within the modal */}
      {createWheelbaseFormComponent}
    </Modal>
  );

  /* ----------------------- */
  // Edit Wheelbase Form
  /* ----------------------- */
  let editWheelbaseFormComponent = (
    <>
      <Form
        form={editWheelbaseForm}
        name="editWheelbase"
        onKeyDown={(e) => handleKeyDown(e, editWheelbaseForm)}
        onFinish={onEditWheelbaseFinish}
      >
        <Form.Item
          className="make__form-item"
          label="Title"
          name="wheelbaseTitle"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input type="number" min={0} addonAfter={'mm'} placeholder="Type title here e.g. 3300" />
        </Form.Item>

        <Form.Item
          className="make__form-item"
          label="Description"
          name="wheelbaseDescription"
          rules={[{ required: false, message: 'Input description here!' }]}
        >
          <Input placeholder="Type description here" />
        </Form.Item>

        {/* Getting the wheelbase id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="wheelbaseId"
          hidden
          rules={[{ required: true, message: 'Get wheelbase id!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );

  /* ---------------------- */
  // Edit Wheelbase Modal
  /* ---------------------- */
  let editWheelbaseModal = (
    <Modal
      title="Edit Wheelbase"
      visible={showEditModal.wheelbase}
      onOk={editWheelbaseForm.submit}
      confirmLoading={loading}
      onCancel={() => setShowEditModal({ ...showEditModal, wheelbase: false })}
    >
      {/* the content within the modal */}
      {editWheelbaseFormComponent}
    </Modal>
  );

  /* ================================================ */
  // Make
  /* ================================================ */
  /* ------------------- */
  // Create Make Form
  /* ------------------- */
  let createMakeFormComponent = (
    <>
      <Form
        form={createMakeForm}
        name="createMake"
        onKeyDown={(e) => handleKeyDown(e, createMakeForm)}
        onFinish={onCreateMakeFinish}
      >
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
              brandsArray.map((brand) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={brand.id}>
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

        {/* ------- Length ------- */}
        <div className="flex">
          <Form.Item
            className="make__form-item make__form-item--make margin_r-1"
            label="Length"
            name={['length', 'feet']}
            rules={[{ required: true, message: 'Input ft here!' }]}
            style={{ width: '62%' }}
          >
            {/* ft */}
            <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
          </Form.Item>

          <Form.Item
            className="make__form-item--make make__form-item--inch"
            name={['length', 'inch']}
            rules={[{ required: true, message: 'Input inch here!' }]}
            style={{ width: '38%' }}
          >
            {/* inch */}
            <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
          </Form.Item>
        </div>
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
          <DatePicker style={{ width: '100%' }} picker="year" />
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
      </Form>
    </>
  );

  /* ---------------------- */
  // Create Make Modal
  /* ---------------------- */
  let createMakeModal = (
    <Modal
      title="Create Make"
      visible={showCreateModal.make}
      onOk={createMakeForm.submit}
      confirmLoading={loading}
      onCancel={() => setShowCreateModal({ ...showCreateModal, make: false })}
    >
      {/* the content within the modal */}
      {createMakeFormComponent}
    </Modal>
  );

  /* ---------------------- */
  // Edit Make Form
  /* ---------------------- */
  let editMakeFormComponent = (
    <>
      <Form
        form={editMakeForm}
        name="editMake"
        onKeyDown={(e) => handleKeyDown(e, editMakeForm)}
        onFinish={onEditMakeFinish}
      >
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
        {/* ------- Wheelbase - value is Wheelbase id but display is Wheelbase name  -------*/}
        <Form.Item
          className="make__form-item make__form-item--make"
          label="Wheelbase"
          name="makeWheelbaseId"
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
        {/* ------- Length ------- */}
        <div className="flex">
          <Form.Item
            className="make__form-item make__form-item--make margin_r-1"
            label="Length"
            name={['length', 'feet']}
            rules={[{ required: true, message: 'Input ft here!' }]}
            style={{ width: '62%' }}
          >
            {/* ft */}
            <Input type="number" min={0} addonAfter={"'"} placeholder="Type ft' here" />
          </Form.Item>

          <Form.Item
            className="make__form-item--make make__form-item--inch"
            name={['length', 'inch']}
            rules={[{ required: true, message: 'Input inch here!' }]}
            style={{ width: '38%' }}
          >
            {/* inch */}
            <Input type="number" min={0} max={12} addonAfter={"''"} placeholder="Type inch'' here" />
          </Form.Item>
        </div>
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
          <DatePicker style={{ width: '100%' }} picker="year" />
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
        {/* Getting the make id */}
        <Form.Item
          className="make__form-item"
          label="id"
          name="makeId"
          hidden
          rules={[{ required: true, message: 'Get make id!' }]}
        >
          <Input />
        </Form.Item>

        {/* Making use of the currentMakeId object, loop through the makeArray
        and check if the value of id matches with the currentMakeId thats being selected */}
        {makesArray &&
          makesArray.map((make) => {
            return (
              <>
                {/* only render when the id matches */}
                {make['id'] === showEditModal.currentMakeId && (
                  <div key={uuidv4()}>
                    {make.images.map((image_url) => {
                      return (
                        <div
                          key={uuidv4()}
                          style={{
                            height: '10rem',
                            width: '10rem',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundColor: 'rgb(197, 197, 191)',
                            backgroundImage: `url(${image_url}), url(${img_placeholder_link})`,
                          }}
                        >
                          test
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })}
      </Form>
    </>
  );

  /* ---------------------- */
  // Edit Make Modal
  /* ---------------------- */
  let editMakeModal = (
    <Modal
      centered
      title="Edit Make"
      visible={showEditModal.make}
      onOk={editMakeForm.submit}
      confirmLoading={loading}
      onCancel={() => setShowEditModal({ ...showEditModal, make: false })}
    >
      {/* the content within the modal */}
      {editMakeFormComponent}
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
  // initialize/populate the state of data array for BRAND
  /* -------------------------------------------- */
  useEffect(() => {
    let tempArray: TBrandState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (brand: TReceivedBrandObj, index: number) => {
      let descriptionIsNullOrEmpty = brand.description === null || brand.description === '';
      // only render when available value is true
      if (brand.available) {
        tempArray.push({
          key: uuidv4(),
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
  // initialize/populate the state of data array for WHEELBASES
  /* -------------------------------------------------- */
  useEffect(() => {
    let tempArray: TWheelbaseState[] = [];
    // A function that stores desired keys and values into a tempArray
    const storeValue = (wheelbase: TReceivedWheelbaseObj, index: number) => {
      let descriptionIsNullOrEmpty = wheelbase.description === null || wheelbase.description === '';

      // only push into the array when available value is true
      if (wheelbase.available) {
        tempArray.push({
          key: uuidv4(),
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
  // initialize/populate the state of data array for MAKES
  /* -------------------------------------------------- */
  useEffect(() => {
    let tempArray: TMakeState[] = [];
    // A function that stores desired keys and values into a tempArray
    const storeValue = (make: TReceivedMakeObj, index: number) => {
      let detailsCombinedString = ''; //use this combined string so that filter can work
      // manipulate the strings first
      let concatLength = make.length;
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

      // check if undefined
      let makeGVW = make.gvw === undefined ? '-' : make.gvw + 'kg';
      let makeYear = make.year === undefined ? '-' : make.year;
      let makePrice = make.price === undefined ? '-' : 'RM' + make.price;
      let makeTitle = make.title === undefined ? '-' : make.title;
      let makeLength = make.length === undefined ? '-' : make.length;
      let makeEngineCap = make.engine_cap === undefined ? '-' : make.engine_cap;
      let makeHorsepower = make.horsepower === undefined ? '-' : make.horsepower + 'hp';
      let makeTransmission = make.transmission === undefined ? '-' : make.transmission;
      let makeBrandTitle = make.brand.title === undefined ? '-' : make.brand.title;
      let makeWheelbaseTitle = make.wheelbase.title === undefined ? '-' : make.wheelbase.title + 'mm';

      // only push into the array when available value is true
      if (make.available) {
        tempArray.push({
          key: uuidv4(),
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
      // clear the form inputs using the form reference
      createBrandForm.resetFields();
      createWheelbaseForm.resetFields();
      createMakeForm.resetFields();
      // close all the modals if successful
      setShowCreateModal({ ...showCreateModal, brand: false, wheelbase: false, make: false });
      setShowEditModal({ ...showEditModal, brand: false, wheelbase: false, make: false });
    }
  }, [
    showEditModal,
    setShowEditModal,
    createMakeForm,
    createBrandForm,
    createWheelbaseForm,
    showCreateModal,
    successMessage,
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
      {createBrandModal}
      {editBrandModal}
      {createWheelbaseModal}
      {editWheelbaseModal}
      {createMakeModal}
      {editMakeModal}

      <section>
        <HeaderTitle>Make (Head)</HeaderTitle>

        {brandsArray && wheelbasesArray && makesArray ? (
          <>
            {/* ====================== */}
            {/*     Brand Section      */}
            {/* ====================== */}
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

            {/* ====================== */}
            {/*   Wheelbases Section   */}
            {/* ====================== */}

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

            {/* ====================== */}
            {/*      Makes Section     */}
            {/* ====================== */}

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
  makesArray?: TReceivedMakeObj[] | null;
  brandsArray?: TReceivedBrandObj[] | null;
  wheelbasesArray?: TReceivedWheelbaseObj[] | null;
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
  onUpdateWheelbase: typeof actions.updateWheelbase;
  // Make
  onGetMakes: typeof actions.getMakes;
  onCreateMake: typeof actions.createMake;
  onUpdateMake: typeof actions.updateMake;
  // Miscellaneous
  onClearSalesState: typeof actions.clearSalesState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    // Brand
    onGetBrands: () => dispatch(actions.getBrands()),
    onCreateBrand: (title, description) => dispatch(actions.createBrand(title, description)),
    onUpdateBrand: (brand_id, title, description) => dispatch(actions.updateBrand(brand_id, title, description)),
    // Wheelbase
    onGetWheelbases: () => dispatch(actions.getWheelbases()),
    onCreateWheelbase: (title, description) => dispatch(actions.createWheelbase(title, description)),
    onUpdateWheelbase: (wheelbase_id, title, description) =>
      dispatch(actions.updateWheelbase(wheelbase_id, title, description)),
    // Make
    onGetMakes: () => dispatch(actions.getMakes()),
    onCreateMake: (createMakeData) => dispatch(actions.createMake(createMakeData)),
    onUpdateMake: (updateMakeData) => dispatch(actions.updateMake(updateMakeData)),
    // Miscellaneous
    onClearSalesState: () => dispatch(actions.clearSalesState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Make);

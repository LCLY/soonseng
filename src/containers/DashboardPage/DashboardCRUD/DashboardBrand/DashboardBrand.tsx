import React, { useEffect, useState } from 'react';
import './DashboardBrand.scss';
/*components*/
import Loading from 'src/components/Loading/Loading';
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/*3rd party lib*/
import { connect } from 'react-redux';
// import { Button } from 'react-bootstrap';
import { Empty, Table, Form, Input, Button, Modal, notification } from 'antd';
import { AnyAction, Dispatch } from 'redux';
/* Util */
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types';
import { TBrandsArray } from 'src/store/types/sales';
import { components, convertHeader, getColumnSearchProps, setAntdResizableState } from 'src/shared/Utils';

interface DashboardBrandProps {}

type BrandsState = {
  key: number;
  id: number;
  title: string;
  description: string | null;
  available: boolean;
};
type Props = DashboardBrandProps & StateProps & DispatchProps;

const DashboardBrand: React.FC<Props> = ({
  loading,
  brandsArray,
  successMessage,
  errorMessage,
  onGetBrands,
  onCreateBrandHead,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [brandsState, setBrandsState] = useState<BrandsState[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = Form.useForm();

  let searchInput = null;
  // const { width } = useWindowDimensions(); //get width from window resize
  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });

  // store header definition in state
  const [columnsDefineHeader, setColumnsDefineHeader] = useState([
    {
      key: 'id',
      title: 'Brand ID',
      dataIndex: 'id',
      ellipsis: true,
      width: 180,
      minWidth: 180,
      sorter: (a: BrandsState, b: BrandsState) => a.id - b.id,
      ...getColumnSearchProps('id', 'Brand ID'),
    },
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
      width: 180,
      minWidth: 180,
      ellipsis: true,
      sorter: (a: BrandsState, b: BrandsState) => a.title.localeCompare(b.title),
      ...getColumnSearchProps('title', 'Title'),
    },
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      width: 180,
      minWidth: 180,
      sorter: (a: BrandsState, b: BrandsState) => {
        // if both a and b are not null
        a.description && b.description && a.description.localeCompare(b.description);
      },
      ...getColumnSearchProps('description', 'Description'),
    },
  ]);

  /* ================================================== */
  /*  methods  */
  /* ================================================== */
  // to send the required states to external handle filters functions
  // Allowing table to be able to filter and search
  setAntdResizableState(filterData, setFilterData, searchInput, columnsDefineHeader, setColumnsDefineHeader);
  const onFinish = (values: { title: string; description: string }) => {
    // setCreateBrand({ ...createBrand, title: values.title, description: values.description });
    onCreateBrandHead(values.title, values.description);
  };

  /* ================================================== */
  /*  Component  */
  /* ================================================== */

  /* ------------------- */
  // Create Brand - Head
  /* ------------------- */
  let createBrandForm = (
    <>
      <Form form={form} name="basic" onFinish={onFinish}>
        <Form.Item
          className="brand__form-item"
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Input title here!' }]}
        >
          <Input placeholder="Type title here" />
        </Form.Item>

        <Form.Item
          className="brand__form-item"
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Input description here!' }]}
        >
          <Input placeholder="Type description here" />
        </Form.Item>
      </Form>
    </>
  );

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */
  useEffect(() => {
    onGetBrands();
  }, [onGetBrands]);

  // initialize the data array state
  useEffect(() => {
    let tempArray: BrandsState[] = [];
    // A function that stores desired keys and values into a tempArray
    const storeValue = (brand: TBrandsArray, index: number) => {
      let descriptionIsNullOrEmpty = brand.description === null || brand.description === '';
      tempArray.push({
        key: index,
        id: brand.id,
        title: brand.title,
        description: descriptionIsNullOrEmpty ? '-' : brand.description,
        available: brand.available,
      });
    };

    if (brandsArray) {
      // Execute function "storeValue" for every array index
      brandsArray.map(storeValue);
    }
    // update the state with tempArray
    setBrandsState(tempArray);
  }, [brandsArray]);

  // success or error
  useEffect(() => {
    if (successMessage) {
      notification['success']({
        message: 'Success',
        description: successMessage,
      });
      // close the modal if successful
      setShowModal(false);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      notification['error']({
        message: 'Failed',
        duration: 2.5,
        description: errorMessage,
      });
    }
  }, [errorMessage]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* =================== */}
      {/*        Modal        */}
      {/* =================== */}

      <Modal
        title="Create Brand"
        visible={showModal}
        onOk={form.submit}
        confirmLoading={loading}
        onCancel={() => setShowModal(false)}
      >
        {createBrandForm}
      </Modal>

      <NavbarComponent activePage="" />
      <LayoutComponent activeKey="brand">
        <section className="">
          <HeaderTitle>Brand (Head)</HeaderTitle>
          {/* ================== */}
          {/*       Table        */}
          {/* ================== */}

          {brandsArray ? (
            brandsArray.length === 0 ? (
              <Empty style={{ marginTop: '5rem' }} />
            ) : (
              <section>
                <Button type="default" className="brand__btn" onClick={() => setShowModal(true)}>
                  Create New Brand
                </Button>
                <Table
                  bordered
                  dataSource={brandsState}
                  columns={convertHeader()}
                  components={components}
                  className="accountlisting__table"
                  // pagination={{ simple: width <= 1200 ? true : null }}
                />
              </section>
            )
          ) : (
            <div className="padding_t-5">
              <Loading />
            </div>
          )}
        </section>
      </LayoutComponent>
    </>
  );
};

interface StateProps {
  loading: boolean;
  brandsArray: TBrandsArray[] | null;
  errorMessage: string | null;
  successMessage: string | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  //type guard
  if ('sales' in state) {
    return {
      loading: state.sales.loading,
      brandsArray: state.sales.brandsArray,
      errorMessage: state.sales.errorMessage,
      successMessage: state.sales.successMessage,
    };
  }
};
interface DispatchProps {
  onGetBrands: typeof actions.getBrandsHead;
  onCreateBrandHead: typeof actions.createBrandHead;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetBrands: () => dispatch(actions.getBrandsHead()),
    onCreateBrandHead: (title, description) => dispatch(actions.createBrandHead(title, description)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardBrand);

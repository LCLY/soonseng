import React, { useEffect, useState } from 'react';
import './Wheelbase.scss';
/*components*/
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import Loading from 'src/components/Loading/Loading';
/*3rd party lib*/
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { Empty, Button, Table, Form, Input, Modal } from 'antd';
/* Util */
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types';
import { TWheelbaseReceivedObj } from 'src/store/types/sales';
import { components, convertHeader, getColumnSearchProps, setAntdResizableState } from 'src/shared/Utils';

interface WheelbaseProps {}

type Props = WheelbaseProps & StateProps & DispatchProps;
type WheelbaseState = {
  key: number;
  id: number;
  title: string;
  description: string | null;
  value: string | number | null;
  available: boolean;
};
const Wheelbase: React.FC<Props> = ({ loading, wheelbasesArray, onGetWheelbases }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [wheelbaseState, setWheelbaseState] = useState<WheelbaseState[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = Form.useForm();

  let searchInput = null;
  // const { width } = useWindowDimensions(); //get width from window resize
  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });

  // store header definition in state
  const [columnsDefineHeader, setColumnsDefineHeader] = useState([
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
      width: 75,
      minWidth: 75,
      sorter: (a: WheelbaseState, b: WheelbaseState) => a.id - b.id,
      ...getColumnSearchProps('id', 'Brand ID'),
    },
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
      width: 60,
      minWidth: 60,
      ellipsis: true,
      sorter: (a: WheelbaseState, b: WheelbaseState) => a.title.localeCompare(b.title),
      ...getColumnSearchProps('title', 'Title'),
    },
    {
      key: 'value',
      title: 'Value',
      dataIndex: 'value',
      width: 60,
      minWidth: 60,
      ellipsis: true,
      sorter: (a: WheelbaseState, b: WheelbaseState) =>
        typeof a.value === 'number' && typeof b.value === 'number' && a.value - b.value,
      ...getColumnSearchProps('value', 'Value'),
    },
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      width: 180,
      minWidth: 180,
      sorter: (a: WheelbaseState, b: WheelbaseState) => {
        // if both a and b are not null
        typeof a.description === 'string' &&
          typeof b.description === 'string' &&
          a.description.localeCompare(b.description);
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
    // onCreateBrand(values.title, values.description);
    console.log(values);
  };

  /* ================================================== */
  /*  Component  */
  /* ================================================== */
  /* ------------------- */
  // Create Wheelbase - Head
  /* ------------------- */
  let createWheelbaseForm = (
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
    onGetWheelbases();
  }, [onGetWheelbases]);

  // initialize the data array state
  useEffect(() => {
    let tempArray: WheelbaseState[] = [];
    // A function that stores desired keys and values into a tempArray
    const storeValue = (brand: TWheelbaseReceivedObj, index: number) => {
      let descriptionIsNullOrEmpty = brand.description === null || brand.description === '';
      let valueIsNullOrEmpty = brand.value === null || brand.description === '';

      // only push into the array when available value is true
      if (brand.available) {
        tempArray.push({
          key: index,
          id: brand.id,
          title: brand.title,
          value: valueIsNullOrEmpty ? '-' : brand.value,
          description: descriptionIsNullOrEmpty ? '-' : brand.description,
          available: brand.available,
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

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* =================== */}
      {/*        Modal        */}
      {/* =================== */}
      <Modal
        title="Create Wheelbase"
        visible={showModal}
        onOk={form.submit}
        confirmLoading={loading}
        onCancel={() => setShowModal(false)}
      >
        {createWheelbaseForm}
      </Modal>
      <NavbarComponent activePage="" />
      <LayoutComponent activeKey="wheelbase">
        <section className="">
          <HeaderTitle>Wheelbase (Head)</HeaderTitle>
          {/* ================== */}
          {/*       Table        */}
          {/* ================== */}
          {wheelbasesArray ? (
            wheelbasesArray.length === 0 ? (
              <Empty style={{ marginTop: '5rem' }} />
            ) : (
              <section>
                <Button type="default" className="brand__btn" onClick={() => setShowModal(true)}>
                  Create New Wheelbase
                </Button>
                <Table
                  bordered
                  dataSource={wheelbaseState}
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
  wheelbasesArray: TWheelbaseReceivedObj[] | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  return {
    loading: state.sales.loading,
    wheelbasesArray: state.sales.wheelbasesArray,
  };
};
interface DispatchProps {
  onGetWheelbases: typeof actions.getWheelbases;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetWheelbases: () => dispatch(actions.getWheelbases()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Wheelbase);

import React, { useEffect, useState } from 'react';
import './DashboardBrand.scss';
/*components*/
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
import LoadingSpinner from 'src/components/LoadingSpinner/LoadingSpinner';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/*3rd party lib*/
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { AnyAction, Dispatch } from 'redux';
/* Util */
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types';
import { TBrandsArray } from 'src/store/types/sales';
import { Empty, Table } from 'antd';
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

const DashboardBrand: React.FC<Props> = ({ brandsArray, onGetBrands }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [brandsState, setBrandsState] = useState<BrandsState[]>([]);
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

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent activePage="" />
      <LayoutComponent activeKey="brand">
        <section className="">
          <HeaderTitle>Brand (Head)</HeaderTitle>
          <Button variant="secondary" className="brand__btn">
            Create New Brand
          </Button>
          {/* ================== */}
          {/*       Table        */}
          {/* ================== */}
          {brandsArray ? (
            brandsArray.length === 0 ? (
              <Empty style={{ marginTop: '5rem' }} />
            ) : (
              <section>
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
            <LoadingSpinner />
          )}
        </section>
      </LayoutComponent>
    </>
  );
};

interface StateProps {
  brandsArray: TBrandsArray[] | null;
}
const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  //type guard
  if ('sales' in state) {
    return { brandsArray: state.sales.brandsArray };
  }
};
interface DispatchProps {
  onGetBrands: typeof actions.getBrandsHead;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return { onGetBrands: () => dispatch(actions.getBrandsHead()) };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardBrand);

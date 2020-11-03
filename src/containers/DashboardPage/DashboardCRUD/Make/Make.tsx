import React from 'react';
import './Make.scss';
/*components*/
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
/*3rd party lib*/
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
/* Util */
// import * as actions from 'src/store/actions/index';
// import { TMapStateToProps } from 'src/store/types';

interface MakeProps {}

type Props = MakeProps & StateProps & DispatchProps;

const Make: React.FC<Props> = () => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  /* ================================================== */
  /*  methods  */
  /* ================================================== */

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent activePage="" />
      <LayoutComponent activeKey="make">
        <section className="">
          <HeaderTitle>Make (Head)</HeaderTitle>
          {/* ================== */}
          {/*       Table        */}
          {/* ================== */}
          TABLE HERE
          {/* {brandsArray ? (
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
      )} */}
        </section>
      </LayoutComponent>
    </>
  );
};
interface StateProps {
  loading: boolean;
}
const mapStateToProps = (state: any): StateProps | void => {
  return {
    loading: state.sales.loading,
  };
};
interface DispatchProps {
  // onFunctionName: typeof actions.functionName;
}
const mapDispatchToProps = (_dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    /*  onFunctionName: (param) => dispatch(actions.functionName(param)) */
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Make);

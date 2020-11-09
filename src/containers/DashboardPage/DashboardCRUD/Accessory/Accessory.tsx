import React from 'react';
import './Accessory.scss';
/*components*/
import HeaderTitle from 'src/components/HeaderTitle/HeaderTitle';
/*3rd party lib*/
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
/* Util */
// import * as actions from 'src/store/actions/index';
// import { TMapStateToProps } from 'src/store/types';

interface AccessoryProps {}

type Props = AccessoryProps & StateProps & DispatchProps;

const Accessory: React.FC<Props> = () => {
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
      <section className="">
        <HeaderTitle>Accessory (Tail)</HeaderTitle>
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
    </>
  );
};
interface StateProps {
  loading?: boolean;
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
export default connect(mapStateToProps, mapDispatchToProps)(Accessory);

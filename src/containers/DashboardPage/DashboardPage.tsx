import React, { useEffect, useState } from 'react';
import './DashboardPage.scss';
/*components*/
import DashboardCreate from './DashboardCreate/DashboardCreate';
import OverlaySpinner from 'src/components/OverlaySpinner/OverlaySpinner';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import DashboardSidebar from 'src/components/DashboardSidebar/DashboardSidebar';
/*3rd party lib*/
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Toast, Container } from 'react-bootstrap';
/* Utils */
import * as actions from 'src/store/actions/index';
import { TMakeHeadSubmit } from 'src/store/types/sales';
import { TMapStateToProps } from 'src/store/types/index';
import { Layout } from 'antd';

const { Content, Sider } = Layout;

interface DashboardPageProps {}

type Props = DashboardPageProps & StateProps & DispatchProps;

/**
 *
 * The page where admin can add delete or update information
 * @param {*} {  onCreateBrandHead }
 * @return {*}
 * @category Pages
 */
const DashboardPage: React.FC<Props> = ({
  loading,
  errorMessage,
  successMessage,
  onCreateMakeHead,
  onClearSalesState,
  onCreateBrandHead,
  onCreateWheelbaseHead,
}) => {
  /* ================================================== */
  // state
  /* ================================================== */

  const [createBrand, setCreateBrand] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  });
  const [createWheelbase, setCreateWheelbase] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  });
  const [createMake, setCreateMake] = useState<TMakeHeadSubmit>({
    gvw: '',
    year: 0,
    price: 0,
    title: '',
    length: '',
    brand_id: 0,
    engine_cap: '',
    horsepower: '',
    description: '',
    wheelbase_id: 0,
    transmission: '',
  });

  // Toast notification
  const [showToast, setShowToast] = useState(false);

  /* ================================================== */
  // components
  /* ================================================== */
  let DashboardCreateComponent = (
    <DashboardCreate
      // create brand
      createBrand={createBrand}
      setCreateBrand={setCreateBrand}
      onCreateBrandHead={onCreateBrandHead}
      // create wheelbase
      createWheelbase={createWheelbase}
      setCreateWheelbase={setCreateWheelbase}
      onCreateWheelbaseHead={onCreateWheelbaseHead}
      // create make
      createMake={createMake}
      setCreateMake={setCreateMake}
      onCreateMakeHead={onCreateMakeHead}
    />
  );

  /* ================================================== */
  // booleans
  /* ================================================== */
  //  If success message or error message exist
  let successOrErrorMessageExist = successMessage || errorMessage;

  /* ================================================== */
  /*  useEffect  */
  useEffect(() => {
    if (successOrErrorMessageExist) {
      // show the toast popup
      setShowToast(true);
      // after 2 seconds, hide the toast
      // then call onClearStates to clear the error/success message
      let timer = setTimeout(() => {
        setShowToast(false);
        onClearSalesState();
        setCreateBrand({ ...createBrand, title: '', description: '' }); //empty the inputs
        setCreateWheelbase({ ...createWheelbase, title: '', description: '' }); //empty the inputs
      }, 2500);

      return () => {
        // prevent memory leak
        clearTimeout(timer);
      };
    }
  }, [
    createBrand,
    createWheelbase,
    setShowToast,
    setCreateBrand,
    onClearSalesState,
    setCreateWheelbase,
    successOrErrorMessageExist,
  ]);
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {loading && <OverlaySpinner />}
      <NavbarComponent activePage="" />
      {successOrErrorMessageExist && (
        <div className="dashboard__toast-div">
          <Toast className="dashboard__toast" show={showToast} onClose={() => setShowToast(false)}>
            <Toast.Header className="dashboard__toast-header">
              {errorMessage && (
                <strong className="mr-auto">
                  <span style={{ color: 'rgb(201, 26, 56)' }}>Error</span>
                </strong>
              )}
              {successMessage && (
                <strong className="mr-auto">
                  <span style={{ color: 'rgb(31, 167, 72)' }}>Successful</span>
                </strong>
              )}
            </Toast.Header>
            <Toast.Body className="dashboard__toast-body">
              {errorMessage}
              {successMessage}
            </Toast.Body>
          </Toast>
        </div>
      )}
      <Container>
        <Layout>
          <Sider theme="light" width={'auto'}>
            <DashboardSidebar activeKey="brand" />
          </Sider>
          <Layout style={{ padding: '0 24px 24px', background: 'white' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {DashboardCreateComponent}
            </Content>
          </Layout>
        </Layout>
      </Container>
    </>
  );
};

interface StateProps {
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const mapStateToProps = (state: TMapStateToProps) => {
  return {
    loading: state.sales.loading,
    errorMessage: state.sales.errorMessage,
    successMessage: state.sales.successMessage,
  };
};

interface DispatchProps {
  onClearSalesState: typeof actions.clearSalesState;
  onCreateMakeHead: typeof actions.createMakeHead;
  onCreateBrandHead: typeof actions.createBrandHead;
  onCreateWheelbaseHead: typeof actions.createWheelbaseHead;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onClearSalesState: () => dispatch(actions.clearSalesState()),
    onCreateMakeHead: (createMakeSubmitData: TMakeHeadSubmit) => dispatch(actions.createMakeHead(createMakeSubmitData)),
    onCreateBrandHead: (title, description) => dispatch(actions.createBrandHead(title, description)),
    onCreateWheelbaseHead: (title, description) => dispatch(actions.createWheelbaseHead(title, description)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

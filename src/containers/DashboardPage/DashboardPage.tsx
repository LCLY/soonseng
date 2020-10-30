import React, { useEffect, useState } from 'react';
import './DashboardPage.scss';
/*components*/
import OverlaySpinner from 'src/components/OverlaySpinner/OverlaySpinner';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import DashboardCreate from './DashboardCreate/DashboardCreate';
/*3rd party lib*/
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Nav, Col, Tab, Row, Toast, Container } from 'react-bootstrap';
/* Utils */
import * as actions from 'src/store/actions/index';
import { TBrandObject } from 'src/store/types/sales';
import { TMapStateToProps } from 'src/store/types/index';

interface DashboardPageProps {}

type Props = DashboardPageProps & StateProps & DispatchProps;

/**
 *
 * The page where admin can add delete or update information
 * @param {*} { brandObject, onCreateBrandHead }
 * @return {*}
 * @category Pages
 */
const DashboardPage: React.FC<Props> = ({
  loading,
  // brandObject,
  errorMessage,
  successMessage,
  onClearSalesState,
  onCreateBrandHead,
  onCreateWheelbaseHead,
}) => {
  /* ================================================== */
  // state
  /* ================================================== */
  const [createBrand, setCreateBrand] = useState({ title: '', description: '' });
  const [createWheelbase, setCreateWheelbase] = useState({ title: '', description: '' });

  // Toast notification
  const [showToast, setShowToast] = useState(false);

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
        <div className="dashboard__tab">
          <Tab.Container id="left-tabs-dashboard" defaultActiveKey="create">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="view">View</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="create">Create</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="update">Update</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="delete">Delete</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="view">View</Tab.Pane>
                  <Tab.Pane eventKey="create">
                    <DashboardCreate
                      // create brand
                      createBrand={createBrand}
                      setCreateBrand={setCreateBrand}
                      // create wheelbase
                      onCreateBrandHead={onCreateBrandHead}
                      createWheelbase={createWheelbase}
                      setCreateWheelbase={setCreateWheelbase}
                      onCreateWheelbaseHead={onCreateWheelbaseHead}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="update">Update</Tab.Pane>
                  <Tab.Pane eventKey="delete">Delete</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Container>
    </>
  );
};

interface StateProps {
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  brandObject: TBrandObject | null;
}

const mapStateToProps = (state: TMapStateToProps) => {
  return {
    loading: state.sales.loading,
    brandObject: state.sales.brandObject,
    errorMessage: state.sales.errorMessage,
    successMessage: state.sales.successMessage,
  };
};

interface DispatchProps {
  onClearSalesState: typeof actions.clearSalesState;
  onCreateBrandHead: typeof actions.createBrandHead;
  onCreateWheelbaseHead: typeof actions.createWheelbaseHead;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onClearSalesState: () => dispatch(actions.clearSalesState()),
    onCreateBrandHead: (title, description) => dispatch(actions.createBrandHead(title, description)),
    onCreateWheelbaseHead: (title, description) => dispatch(actions.createWheelbaseHead(title, description)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

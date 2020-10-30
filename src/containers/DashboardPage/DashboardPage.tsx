import React, { useEffect, useState } from 'react';
import './DashboardPage.scss';
/*components*/
import OverlaySpinner from 'src/components/OverlaySpinner/OverlaySpinner';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/*3rd party lib*/
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Form, Nav, Col, Tab, Row, Button, Toast, Container } from 'react-bootstrap';
/* Utils */
import * as actions from 'src/store/actions/index';
import { TBrandObject } from 'src/store/types/sales';
import { TMapStateToProps } from 'src/store/types/index';

interface DashboardPageProps {}

type Props = DashboardPageProps & StateProps & DispatchProps;

/**
 *
 * The page where admin can add delete or update information
 * @param {*} { brandObject, onCreateHeadBrand }
 * @return {*}
 * @category Pages
 */
const DashboardPage: React.FC<Props> = ({
  loading,
  brandObject,
  errorMessage,
  successMessage,
  onClearSalesState,
  onCreateHeadBrand,
}) => {
  /* ================================================== */
  // state
  /* ================================================== */
  const [createBrand, setCreateBrand] = useState({ title: '', description: '' });
  // Toast notification
  const [showToast, setShowToast] = useState(false);

  /* ================================================== */
  // booleans
  /* ================================================== */
  //  If success message or error message exist
  let successOrErrorMessageExist = successMessage || errorMessage;

  console.log(brandObject);

  /* ================================================== */
  //  component
  /* ================================================== */
  let CreateComponent = (
    <>
      {
        /* ------------------- */
        // Create Brand - Head
        /* ------------------- */
      }
      <section className="dashboard__section">
        <div className="dashboard__header">
          <h2>Create Brand - Head</h2>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onCreateHeadBrand(createBrand.title, createBrand.description);
          }}
        >
          <Form.Group className="dashboard__form-row" controlId="createBrandTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>:
            <Form.Control
              required
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the title of the head brand here"
              onChange={(e) => setCreateBrand({ ...createBrand, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBrandDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>:
            <Form.Control
              required
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the head brand here"
              onChange={(e) => setCreateBrand({ ...createBrand, description: e.target.value })}
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button disabled={loading} variant="primary" type="submit" className="dashboard__form-btn">
              Create Head Brand
            </Button>
          </div>
        </Form>
      </section>
      {
        /* ---------------------- */
        // Create Wheelbase - Head
        /* ---------------------- */
      }
      <section className="dashboard__section">
        <div className="dashboard__header">
          <h2>Create Wheelbase - Head</h2>
        </div>
        <Form>
          <Form.Group className="dashboard__form-row" controlId="createWheelbaseTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the title of the head wheelbase here e.g. 3200"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createWheelbaseDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the head wheelbase here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" className="dashboard__form-btn">
              Create Head Wheelbase
            </Button>
          </div>
        </Form>
      </section>
      {
        /* -------------------------- */
        // Create Makes - Head
        /* -------------------------- */
      }
      <section className="dashboard__section">
        <div className="dashboard__header">
          <h2>Create Makes - Head</h2>
        </div>
        <Form>
          <Form.Group className="dashboard__form-row" controlId="createMakesTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the title of the head make here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the head make here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakeBrandId">
            <Form.Label className="dashboard__form-text">Brand ID</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the brand id of the head make here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesWheelbaseId">
            <Form.Label className="dashboard__form-text">Wheelbase ID</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the wheelbase ID of the head make here"
            />
          </Form.Group>

          <Form.Group className="dashboard__form-row" controlId="createMakesEngineCap">
            <Form.Label className="dashboard__form-text">Engine Cap</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the engine cap of the head make here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesGvw">
            <Form.Label className="dashboard__form-text">GVW</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the gvw of the head make here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesHorsePower">
            <Form.Label className="dashboard__form-text">Horsepower</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the horsepower of the head make here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesLength">
            <Form.Label className="dashboard__form-text">Length</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the length of the head make here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesPrice">
            <Form.Label className="dashboard__form-text">Price</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the price of the head make here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesTransmission">
            <Form.Label className="dashboard__form-text">Transmission</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the transmission of the head make here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesYear">
            <Form.Label className="dashboard__form-text">Year</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the year of the head make here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" className="dashboard__form-btn">
              Create Head Make
            </Button>
          </div>
        </Form>
      </section>
      {
        /* ------------------ */
        // Create Body - Tail
        /* ------------------ */
      }
      <section className="dashboard__section">
        <div className="dashboard__header">
          <h2>Create Body - Tail</h2>
        </div>
        <Form>
          <Form.Group className="dashboard__form-row" controlId="createBodyTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the title of the tail body here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the tail body here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" className="dashboard__form-btn">
              Create Tail Body
            </Button>
          </div>
        </Form>
      </section>
      {
        /* ------------------- */
        // Create Length - Tail
        /* ------------------- */
      }
      <section className="dashboard__section">
        <div className="dashboard__header">
          <h2>Create Length - Tail</h2>
        </div>
        <Form>
          <Form.Group className="dashboard__form-row" controlId="createLengthTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the tail length herer e.g. 13"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createLengthDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the tail length here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" className="dashboard__form-btn">
              Create Tail Length
            </Button>
          </div>
        </Form>
      </section>
      {
        /* -------------------- */
        // Create Accessory - Tail
        /* -------------------- */
      }
      <section className="dashboard__section">
        <div className="dashboard__header">
          <h2>Create Accessory - Tail</h2>
        </div>
        <Form>
          <Form.Group className="dashboard__form-row" controlId="createAccTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the tail accessory here e.g. metal flooring"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createAccDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the tail accessory here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" className="dashboard__form-btn">
              Create Tail Accessory
            </Button>
          </div>
        </Form>
      </section>

      {
        /* -------------------------- */
        // Create Body length - Tail
        /* -------------------------- */
      }
      <section className="dashboard__section">
        <div className="dashboard__header">
          <h2>Create Body length - Tail</h2>
        </div>
        <Form>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthBodyId">
            <Form.Label className="dashboard__form-text">Body ID</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the id of the tail body length here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthLengthId">
            <Form.Label className="dashboard__form-text">Length ID</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the length id of the tail body length here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthDepth">
            <Form.Label className="dashboard__form-text">Depth</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the depth of the tail body length here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthWidth">
            <Form.Label className="dashboard__form-text">Width</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the width of the tail body length here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthHeight">
            <Form.Label className="dashboard__form-text">Height</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the height of the tail body length here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthPrice">
            <Form.Label className="dashboard__form-text">Price</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the price of the tail body length here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" className="dashboard__form-btn">
              Create Tail Body length
            </Button>
          </div>
        </Form>
      </section>
      {
        /* -------------------------- */
        // Create Body Accessory - Tail
        /* -------------------------- */
      }
      <section className="dashboard__section">
        <div className="dashboard__header">
          <h2>Create Body Accessory - Tail</h2>
        </div>
        <Form>
          <Form.Group className="dashboard__form-row" controlId="createBodyAccessoryTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the title of the tail body accessory here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyAccessoryDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the tail body accessory here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyAccessoryBodyLengthId">
            <Form.Label className="dashboard__form-text">Body Length ID</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the body length id of the tail body accessory here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyAccessoryId">
            <Form.Label className="dashboard__form-text">Accessory ID</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the accessory id of the tail body accessory here"
            />
          </Form.Group>

          <Form.Group className="dashboard__form-row" controlId="createBodyAccessoryPrice">
            <Form.Label className="dashboard__form-text">Price</Form.Label>:
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the price of the tail body accessory here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" className="dashboard__form-btn">
              Create Tail Body Accessory
            </Button>
          </div>
        </Form>
      </section>
    </>
  );

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
      }, 2000);

      return () => {
        // prevent memory leak
        clearTimeout(timer);
      };
    }
  }, [createBrand, setShowToast, setCreateBrand, onClearSalesState, successOrErrorMessageExist]);
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  console.log(showToast);
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
                  <Tab.Pane eventKey="create">{CreateComponent}</Tab.Pane>
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
  onCreateHeadBrand: typeof actions.createBrandHead;
  onClearSalesState: typeof actions.clearSalesState;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onClearSalesState: () => dispatch(actions.clearSalesState()),
    onCreateHeadBrand: (title, description) => dispatch(actions.createBrandHead(title, description)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

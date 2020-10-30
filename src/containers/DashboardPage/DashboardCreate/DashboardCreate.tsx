import React from 'react';
import './DashboardCreate.scss';
/*components*/
/*3rd party lib*/
import { Form, Button } from 'react-bootstrap';

interface DashboardCreateProps {
  // create brand
  createBrand: { title: string; description: string };
  setCreateBrand: React.Dispatch<React.SetStateAction<{ title: string; description: string }>>;
  onCreateBrandHead: (title: string, description: string) => void;
  // create wheelbase
  createWheelbase: { title: string; description: string };
  setCreateWheelbase: React.Dispatch<React.SetStateAction<{ title: string; description: string }>>;
  onCreateWheelbaseHead: (title: string, description: string) => void;
}

type Props = DashboardCreateProps;

const DashboardCreate: React.FC<Props> = ({
  // create brand
  createBrand,
  setCreateBrand,
  onCreateBrandHead,
  // create wheelbase
  createWheelbase,
  setCreateWheelbase,
  onCreateWheelbaseHead,
}) => {
  return (
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
            onCreateBrandHead(createBrand.title, createBrand.description);
          }}
        >
          <Form.Group className="dashboard__form-row" controlId="createBrandTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>:
            <Form.Control
              required
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the title of the head brand here"
              value={createBrand.title}
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
              value={createBrand.description}
              onChange={(e) => setCreateBrand({ ...createBrand, description: e.target.value })}
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" type="submit" className="dashboard__form-btn">
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onCreateWheelbaseHead(createWheelbase.title, createWheelbase.description);
          }}
        >
          <Form.Group className="dashboard__form-row" controlId="createWheelbaseTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>:
            <Form.Control
              required
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the title of the head wheelbase here e.g. 3200"
              value={createWheelbase.title}
              onChange={(e) => setCreateWheelbase({ ...createWheelbase, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createWheelbaseDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>:
            <Form.Control
              required
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the head wheelbase here"
              value={createWheelbase.description}
              onChange={(e) => setCreateWheelbase({ ...createWheelbase, description: e.target.value })}
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" type="submit" className="dashboard__form-btn">
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
};
export default DashboardCreate;

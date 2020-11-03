import React from 'react';
import './DashboardCreate.scss';
/*components*/
/*3rd party lib*/
import NumberFormat from 'react-number-format';
import Datetime from 'react-datetime';
import { TMakeSubmitData } from 'src/store/types/sales';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import moment from 'moment';

interface DashboardCreateProps {
  // create brand
  createBrand: { title: string; description: string };
  setCreateBrand: React.Dispatch<React.SetStateAction<{ title: string; description: string }>>;
  onCreateBrand: (title: string, description: string) => void;
  // create wheelbase
  createWheelbase: { title: string; description: string };
  setCreateWheelbase: React.Dispatch<React.SetStateAction<{ title: string; description: string }>>;
  onCreateWheelbase: (title: string, description: string) => void;
  // create make
  createMake: TMakeSubmitData;
  setCreateMake: React.Dispatch<React.SetStateAction<TMakeSubmitData>>;
  onCreateMake: (createMakeSubmitData: TMakeSubmitData) => void;
}

type Props = DashboardCreateProps;

const DashboardCreate: React.FC<Props> = ({
  // create brand
  createBrand,
  setCreateBrand,
  onCreateBrand,
  // create wheelbase
  createWheelbase,
  setCreateWheelbase,
  onCreateWheelbase,
  // create make
  createMake,
  setCreateMake,
  onCreateMake,
}) => {
  /* ============================== */
  // Boolean
  /* ============================== */
  // If year is still in initial state, meaning year: 0
  let yearNotYetInitialized = createMake.year === 0;

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
            onCreateBrand(createBrand.title, createBrand.description);
          }}
        >
          <Form.Group className="dashboard__form-row" controlId="createBrandTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>
            <div className="dashboard__form-colon">:</div>
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
            <Form.Label className="dashboard__form-text">Description</Form.Label>
            <div className="dashboard__form-colon">:</div>
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
            onCreateWheelbase(createWheelbase.title, createWheelbase.description);
          }}
        >
          <Form.Group className="dashboard__form-row" controlId="createWheelbaseTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>
            <div className="dashboard__form-colon">:</div>
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
            <Form.Label className="dashboard__form-text">Description</Form.Label>
            <div className="dashboard__form-colon">:</div>
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
        // Create Make - Head
        /* -------------------------- */
      }
      <section className="dashboard__section">
        <div className="dashboard__header">
          <h2>Create Make - Head</h2>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onCreateMake(createMake);
          }}
        >
          <Form.Group className="dashboard__form-row" controlId="createMakesTitle">
            <Form.Label className="dashboard__form-text">Title</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              required
              type="text"
              value={createMake.title}
              className="dashboard__form-input"
              placeholder="Enter the title of the head make here"
              onChange={(e) => setCreateMake({ ...createMake, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              required
              type="text"
              value={createMake.description}
              className="dashboard__form-input"
              placeholder="Enter the description of the head make here"
              onChange={(e) => setCreateMake({ ...createMake, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakeBrandId">
            <Form.Label className="dashboard__form-text">Brand ID</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              custom
              as="select"
              className="dashboard__form-input"
              value={createMake.brand_id}
              onChange={(e) => setCreateMake({ ...createMake, brand_id: parseInt(e.target.value) })}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesWheelbaseId">
            <Form.Label className="dashboard__form-text">Wheelbase ID</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              custom
              as="select"
              className="dashboard__form-input"
              value={createMake.wheelbase_id}
              onChange={(e) => setCreateMake({ ...createMake, wheelbase_id: parseInt(e.target.value) })}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesEngineCap">
            <Form.Label className="dashboard__form-text">Engine Cap</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              required
              type="number"
              value={createMake.engine_cap}
              className="dashboard__form-input"
              placeholder="Enter the engine cap of the head make here"
              onChange={(e) => setCreateMake({ ...createMake, engine_cap: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesGvw">
            <Form.Label className="dashboard__form-text">GVW</Form.Label> <div className="dashboard__form-colon">:</div>
            <InputGroup>
              <FormControl
                required
                type="number"
                value={createMake.gvw}
                className="dashboard__form-input"
                placeholder="e.g. 5000"
                aria-label="gvw weight"
                aria-describedby="gvw weight"
                onChange={(e) => setCreateMake({ ...createMake, gvw: e.target.value })}
              />
              <InputGroup.Append className="dashboard__form-append">
                <InputGroup.Text className="dashboard__form-append-text" id="gvw-kg">
                  kg
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          <Form.Group className="dashboard__form-row" controlId="createMakesHorsePower">
            <Form.Label className="dashboard__form-text">Horsepower</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <InputGroup>
              <FormControl
                required
                type="number"
                value={createMake.horsepower}
                className="dashboard__form-input"
                placeholder="e.g. 428"
                aria-label="horsepower"
                aria-describedby="horsepower"
                onChange={(e) => setCreateMake({ ...createMake, horsepower: e.target.value })}
              />
              <InputGroup.Append className="dashboard__form-append">
                <InputGroup.Text className="dashboard__form-append-text" id="horsepower">
                  hp
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          <Form.Group className="dashboard__form-row" controlId="createMakesLength">
            <Form.Label className="dashboard__form-text">Length</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <InputGroup>
              <FormControl
                required
                type="number"
                value={createMake.length}
                className="dashboard__form-input"
                placeholder="e.g. 12"
                aria-label="length"
                aria-describedby="length"
                onChange={(e) => setCreateMake({ ...createMake, length: e.target.value })}
              />
              <InputGroup.Append className="dashboard__form-append">
                <InputGroup.Text className="dashboard__form-append-text" id="length">
                  ft
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          <Form.Group className="dashboard__form-row" controlId="createMakesPrice">
            <Form.Label className="dashboard__form-text">Price</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <InputGroup>
              <InputGroup.Prepend className="dashboard__form-append">
                <InputGroup.Text className="dashboard__form-append-text" id="price">
                  RM
                </InputGroup.Text>
              </InputGroup.Prepend>
              <NumberFormat
                required
                inputMode="numeric"
                value={createMake.price}
                thousandSeparator={true}
                className="dashboard__form-input form-control"
                placeholder="Enter the price of the head make here"
                onChange={(e) => setCreateMake({ ...createMake, price: parseInt(e.target.value) })}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="dashboard__form-row" controlId="createMakesTransmission">
            <Form.Label className="dashboard__form-text">Transmission</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              required
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the transmission of the head make here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createMakesYear">
            <Form.Label className="dashboard__form-text">Year</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Datetime
              dateFormat="YYYY"
              className="dashboard__form-input"
              timeFormat={false}
              value={yearNotYetInitialized ? new Date() : createMake.year.toString()}
              closeOnSelect={true}
              onChange={(date) => {
                setCreateMake({ ...createMake, year: moment(date).year() });
              }}
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" type="submit" className="dashboard__form-btn">
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
            <Form.Label className="dashboard__form-text">Title</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the title of the tail body here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the tail body here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" type="submit" className="dashboard__form-btn">
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
            <Form.Label className="dashboard__form-text">Title</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the tail length herer e.g. 13"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createLengthDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the tail length here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" type="submit" className="dashboard__form-btn">
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
            <Form.Label className="dashboard__form-text">Title</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the tail accessory here e.g. metal flooring"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createAccDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the tail accessory here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" type="submit" className="dashboard__form-btn">
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
            <Form.Label className="dashboard__form-text">Body ID</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the id of the tail body length here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthLengthId">
            <Form.Label className="dashboard__form-text">Length ID</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the length id of the tail body length here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthDepth">
            <Form.Label className="dashboard__form-text">Depth</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the depth of the tail body length here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthWidth">
            <Form.Label className="dashboard__form-text">Width</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the width of the tail body length here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthHeight">
            <Form.Label className="dashboard__form-text">Height</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the height of the tail body length here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyLengthPrice">
            <Form.Label className="dashboard__form-text">Price</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the price of the tail body length here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" type="submit" className="dashboard__form-btn">
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
            <Form.Label className="dashboard__form-text">Title</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the title of the tail body accessory here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyAccessoryDesc">
            <Form.Label className="dashboard__form-text">Description</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the description of the tail body accessory here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyAccessoryBodyLengthId">
            <Form.Label className="dashboard__form-text">Body Length ID</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the body length id of the tail body accessory here"
            />
          </Form.Group>
          <Form.Group className="dashboard__form-row" controlId="createBodyAccessoryId">
            <Form.Label className="dashboard__form-text">Accessory ID</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the accessory id of the tail body accessory here"
            />
          </Form.Group>

          <Form.Group className="dashboard__form-row" controlId="createBodyAccessoryPrice">
            <Form.Label className="dashboard__form-text">Price</Form.Label>
            <div className="dashboard__form-colon">:</div>
            <Form.Control
              type="text"
              className="dashboard__form-input"
              placeholder="Enter the price of the tail body accessory here"
            />
          </Form.Group>
          <div className="dashboard__form-btn-div">
            <Button variant="primary" type="submit" className="dashboard__form-btn">
              Create Tail Body Accessory
            </Button>
          </div>
        </Form>
      </section>
    </>
  );
};
export default DashboardCreate;

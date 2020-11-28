import React, { useEffect, useState } from 'react';
import './SalesPage.scss';
// component
import Footer from 'src/components/Footer/Footer';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import LightboxComponent from 'src/components/ImageRelated/LightboxComponent/LightboxComponent';
// 3rd party lib
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { LoadingOutlined, InfoCircleOutlined, DownSquareOutlined, CaretRightOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Skeleton, Card, Empty, Steps, Collapse, Tag, Divider, Breadcrumb, Dropdown, Menu } from 'antd';

// Util
import {
  TLocalOrderObj,
  TReceivedSalesMakesObj,
  TReceivedSalesLengthObj,
  TReceivedSalesMakeSeriesObj,
  TReceivedDimensionAccessoryObj,
  TReceivedSalesLengthCategoryObj,
} from 'src/store/types/sales';
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types/index';
import { img_loading_link, img_not_available_link } from 'src/shared/global';
import { TReceivedAccessoryObj, TReceivedBodyLengthObj } from 'src/store/types/dashboard';
import { STEPS_TYRE, STEPS_LENGTH, STEPS_BODY, STEPS_ACCESSORY, STEPS_BRAND } from 'src/shared/constants';

const { Step } = Steps;
const { Panel } = Collapse;

interface SalesPageProps {}

type Props = SalesPageProps & StateProps & DispatchProps & RouteComponentProps;

/**
 * Sales page that provide functionality for user to choose vehicle parts
 * @return {*}
 * @category Pages
 */
const SalesPage: React.FC<Props> = ({
  // Arrays
  salesBrandsArray,
  bodyLengthsArray,
  localOrdersArray,
  lengthsCategoriesArray,
  generalAccessoriesArray,
  bodyRelatedAccessoriesArray,
  dimensionRelatedAccessoriesArray,
  //  Miscellaneous
  onClearSalesState,
  onStoreLocalOrders,
  onRemoveAnOrder,
  // API calls
  onGetSalesMakes,
  onGetSalesLengths,
  onGetSalesBodyLengths,
  onGetSalesBodyAccessories,
  // Booleans
  loading,
  getSalesMakesSucceed,
  getSalesLengthsSucceed,
  getSalesBodyLengthsSucceed,
  getSalesBodyAccessoriesSucceed,
}) => {
  /* ================================================ */
  //                    state
  /* ================================================ */
  /**
   * Getting index of clicked vehicle length card to know which one is selected,
   * set to null because initially nothing is being selected   *
   */

  const [currentTyre, setCurrentTyre] = useState<number | null>(null);
  const [currentLength, setCurrentLength] = useState<TReceivedSalesLengthObj | null>(null);
  const [currentBodyLength, setCurrentBodyLength] = useState<TReceivedBodyLengthObj | null>(null);
  const [currentAccessory, setCurrentAccessory] = useState<{
    accessoryObj: TReceivedAccessoryObj;
    price: number;
  } | null>(null);
  const [currentMake, setCurrentMake] = useState<TReceivedSalesMakeSeriesObj | null>(null);

  /** Current order object to track what user has added to the current order  */
  const [currentOrderObj, setCurrentOrderObj] = useState<TLocalOrderObj>({
    tireCount: -1,
    lengthObj: null,
    bodyLengthObj: null,
    generalAccessoriesArray: [],
    dimensionRelatedAccessoriesArray: [],
    bodyRelatedAccessoriesArray: [],
    makeObj: null,
  });

  let totalAccessoriesArrayLength =
    currentOrderObj.generalAccessoriesArray.length +
    currentOrderObj.bodyRelatedAccessoriesArray.length +
    currentOrderObj.dimensionRelatedAccessoriesArray.length;

  /** Current Steps of the antd steps component */
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  /* Lightboxes */
  // whether the lightbox is opened
  const [bodyLightboxOpen, setBodyLightboxOpen] = useState(false);
  const [makeLightboxOpen, setMakeLightboxOpen] = useState(false);
  const [bodyAccessoryLightboxOpen, setBodyAccessoryLightboxOpen] = useState(false);
  // photoindex to keep track of which image it's showing right now
  const [bodyPhotoIndex, setBodyPhotoIndex] = useState(0);
  const [makePhotoIndex, setMakePhotoIndex] = useState(0);
  const [bodyAccessoryPhotoIndex, setBodyAccessoryPhotoIndex] = useState(0);

  /* ========================= */
  //        method
  /* ========================= */

  /** To go to previous step/page  */
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };
  /** To go to next step/page  */
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  /* =========================== */
  /*         components          */
  /* =========================== */

  /* Tyre count */
  let tyreCountArray = [4, 6];
  let tyreSection = (
    <>
      <section className="sales__section">
        <div className="sales__breadcrumb-outerdiv">
          <Breadcrumb separator=">" className="sales__breadcrumb">
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Tyre Count</span>
              {currentTyre && <span className="sales__breadcrumb-highlight">({currentTyre})</span>}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider orientation="left">
          <div className="sales__section-header">Tyre </div>
        </Divider>
        <section className="sales__section-innerdiv">
          {/* Description on the left */}
          <div className="sales__section-left">
            <img
              className="sales__section-img"
              src="https://image.freepik.com/free-photo/large-truck-wheels-semi-truck-road-freight-cargo-shipment_36860-908.jpg"
              alt="tire count"
            />
            {currentTyre ? (
              <Card className="sales__selectarea-card" size="small" title="Selected tyre count">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Tyre count</div>
                  <div>{currentTyre} tires</div>
                </div>
              </Card>
            ) : (
              <Card className="sales__selectarea-card" size="small" title="Selected tyre count">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">None</div>
                </div>
              </Card>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              Let's start this exciting adventure off with selection of tires count.
              <br />
              The length of the truck is decided on the number of the tires it has.
            </div>
            <div className="sales__selectarea-innerdiv">
              <div>Select the tyre count for the cargo body</div>
              <div className="sales__selectarea-div">
                <>
                  {/* <div className="sales__selectarea-button"> */}
                  {tyreCountArray.map((tyre) => {
                    return (
                      <div
                        key={uuidv4()}
                        className={`sales__selectarea-button ${currentTyre === tyre ? 'active' : ''}`}
                        onClick={() => {
                          if (currentTyre === tyre) {
                            // reset the selection
                            setCurrentTyre(null);
                            setCurrentOrderObj({ ...currentOrderObj, tireCount: -1 });
                          } else {
                            setCurrentTyre(tyre);
                            setCurrentOrderObj({ ...currentOrderObj, tireCount: tyre });
                          }
                        }}
                      >
                        {tyre}
                      </div>
                    );
                  })}
                  {/* </div> */}
                </>
              </div>
            </div>
            <div className="sales__length-btn-div">
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    // Then call the body lengths API
                    if (currentTyre === null) return;
                    if (currentTyre) {
                      onGetSalesLengths(currentTyre);
                    }
                  }}
                  className="sales__length-btn"
                  loading={loading}
                  disabled={currentTyre === null ? true : false}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );

  /* -------------------- */
  // Lengths
  /* -------------------- */
  let lengthSection = (
    <>
      <section className="sales__section">
        <div className="sales__breadcrumb-outerdiv">
          <Breadcrumb separator=">" className="sales__breadcrumb">
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Tyre Count</span>
              {currentTyre && <span className="sales__breadcrumb-highlight">({currentTyre})</span>}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Length</span>
              {currentLength && <span className="sales__breadcrumb-highlight">({currentLength?.title}ft)</span>}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider orientation="left">
          <div className="sales__section-header">Length </div>
        </Divider>

        <section className="sales__section-innerdiv">
          {/* Description on the left */}
          <div className="sales__section-left">
            <img
              className="sales__section-img"
              src="https://i.pinimg.com/originals/49/e4/e1/49e4e11ce6571189fceff40836ebdac9.jpg"
              alt="length of body"
            />
            {currentLength ? (
              <Card className="sales__selectarea-card" size="small" title="Selected body length">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Body Length</div>
                  <div>{currentLength.title} (ft)</div>
                </div>
              </Card>
            ) : (
              <Card className="sales__selectarea-card" size="small" title="Selected body length">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">None</div>
                </div>
              </Card>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              Decide on the length of your cargo body, the length of the cargo body is measured from this side to that
              side.
              <div className="margin_t-1 margin_b-1">There are three main categories:</div>
              <div>
                <span>LCV</span> - Low Commercial Vehicle
              </div>
              <div>
                <span>MCV</span> - Medium Commercial Vehicle
              </div>
              <div>
                <span>HCV</span> - High Commercial Vehicle
              </div>
            </div>

            <div className="sales__selectarea-innerdiv">
              <div>Select the length of the cargo body (ft)</div>
              {lengthsCategoriesArray ? (
                <>
                  {lengthsCategoriesArray.length > 0 ? (
                    <>
                      {lengthsCategoriesArray.map((category) => {
                        return (
                          <React.Fragment key={uuidv4()}>
                            {/* Only render the non empty object */}
                            {Object.keys(category).length !== 0 && (
                              <div>
                                <div>
                                  <Divider orientation="left" className="sales__selectarea-categorydivider">
                                    {category.title}
                                  </Divider>
                                </div>
                                <div className="sales__selectarea-div">
                                  {category.lengths.map((lengthObj) => {
                                    return (
                                      <div
                                        key={uuidv4()}
                                        className={`sales__selectarea-button ${
                                          currentLength?.id === lengthObj.id ? 'active' : ''
                                        }`}
                                        onClick={() => {
                                          //  if currentLength has an id
                                          if (currentLength?.id === lengthObj.id) {
                                            // reset the selection
                                            setCurrentLength(null);
                                            setCurrentOrderObj({
                                              ...currentOrderObj,
                                              lengthObj: null,
                                            });
                                          } else {
                                            setCurrentLength(lengthObj);
                                            setCurrentOrderObj({
                                              ...currentOrderObj,
                                              lengthObj: lengthObj,
                                            });
                                          }
                                        }}
                                      >
                                        {lengthObj.title}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    <Empty />
                  )}
                </>
              ) : (
                <>
                  <div className="sales__selectarea-button margin_t-4 margin_b-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <Skeleton.Button className="sales__skeleton" key={num + uuidv4()} active={true} size="large" />
                    ))}
                  </div>
                  <div className="sales__selectarea-button">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <Skeleton.Button className="sales__skeleton" key={num + uuidv4()} active={true} size="large" />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="sales__length-btn-div">
              <Button
                loading={false}
                className="sales__length-btn margin_r-1"
                onClick={() => {
                  prev();
                  setCurrentLength(null);
                }}
              >
                Back
              </Button>
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    // Then call the body lengths API
                    if (currentLength === null || currentTyre === null) return;
                    if (currentLength.id && currentTyre) {
                      onGetSalesBodyLengths(currentLength.id, currentTyre);
                    }
                  }}
                  className="sales__length-btn"
                  loading={loading}
                  disabled={currentLength === null ? true : false}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );

  /* ------------------ */
  // Body Length
  /* ------------------ */
  let bodyLengthSection = (
    <>
      {/*  only show if length is selected */}
      <section className="sales__section">
        <div className="sales__breadcrumb-outerdiv">
          <Breadcrumb separator=">" className="sales__breadcrumb">
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Tyre Count</span>
              {currentTyre && <span className="sales__breadcrumb-highlight">({currentTyre})</span>}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Length</span>
              {currentLength && <span className="sales__breadcrumb-highlight">({currentLength?.title}ft)</span>}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Body</span>
              {currentBodyLength && (
                <span className="sales__breadcrumb-highlight">({currentBodyLength?.body.title})</span>
              )}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider orientation="left">
          <div className="sales__section-header">Body </div>
        </Divider>
        <section className="sales__section-innerdiv">
          {/* Description */}
          <div className="sales__section-left">
            {currentBodyLength ? (
              <>
                {/* if there is no image then show image not available */}
                {currentBodyLength.images.length > 0 ? (
                  <>
                    <div className="sales__lightbox-parent" onClick={() => setBodyLightboxOpen(true)}>
                      {/* Clickable image to show lightbox */}

                      <LazyLoadImage
                        className="sales__section-img"
                        src={currentBodyLength.images[0].url}
                        alt={currentBodyLength.images[0].filename}
                        placeholderSrc={img_loading_link}
                      />

                      <LightboxComponent
                        images={currentBodyLength?.images}
                        photoIndex={bodyPhotoIndex}
                        isOpen={bodyLightboxOpen}
                        setPhotoIndex={setBodyPhotoIndex}
                        setIsOpen={setBodyLightboxOpen}
                      />
                      <div className="sales__lightbox-icon">
                        <i className="fas fa-expand"></i>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <img className="sales__section-img" src={img_not_available_link} alt="no result" />
                    <div className="sales__section-img-unavailabletext"> No image is provided for this body</div>
                  </div>
                )}
              </>
            ) : (
              // if nothing has been picked yet then show this
              <>
                <div className="sales__section-preview">
                  <div className="sales__section-preview-innerdiv">
                    <div className="sales__section-img--illustratoricon-div">
                      <img
                        alt="material"
                        className="sales__section-img sales__section-img--illustratoricon"
                        src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxnPjxnPjxnPjxwYXRoIGQ9Im0xMjggMTM4LjMzMS05My4zMzggMjguNjY5IDkzLjMzOCAyOC42NjktMzAtMjguNjY5eiIgZmlsbD0iI2E0ZDRhMCIvPjwvZz48Zz48cGF0aCBkPSJtMTI4IDEzOC4zMzEgMzAgMjguNjY5LTMwIDI4LjY2OSA5My4zMzgtMjguNjY5eiIgZmlsbD0iIzQxOWI0NiIvPjwvZz48Zz48cGF0aCBkPSJtMTI4IDEzOC4zMzEtMzAgMjguNjY5IDMwIDI4LjY2OSAzMC0yOC42Njl6IiBmaWxsPSIjNjViYzQ5Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJtMTI4IDE5OC42NjljLS4yOTcgMC0uNTk0LS4wNDQtLjg4MS0uMTMybC05My4zMzgtMjguNjY5Yy0xLjI2LS4zODctMi4xMTktMS41NS0yLjExOS0yLjg2OHMuODU5LTIuNDgxIDIuMTE5LTIuODY4bDkzLjMzOC0yOC42NjljLjU3NC0uMTc3IDEuMTg4LS4xNzcgMS43NjIgMGw5My4zMzggMjguNjY5YzEuMjYuMzg3IDIuMTE5IDEuNTUgMi4xMTkgMi44NjhzLS44NTkgMi40ODEtMi4xMTkgMi44NjhsLTkzLjMzOCAyOC42NjljLS4yODcuMDg4LS41ODQuMTMyLS44ODEuMTMyem0tODMuMTItMzEuNjY5IDgzLjEyIDI1LjUzMSA4My4xMi0yNS41MzEtODMuMTItMjUuNTMxeiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTM0LjY2MiAxNjd2MTEuOTg2aC4wNDNsLS4wNDMuMDE0IDkzLjMzOCAyOC42NjktNDEuMjM3LTI0LjY2NnoiIGZpbGw9IiNhNGQ0YTAiLz48L2c+PGc+PHBhdGggZD0ibTIyMS4zMzggMTY3LTUyLjEwMSAxNi4wMDMtNDEuMjM3IDI0LjY2NiA5My4zMzgtMjguNjY5LS4wNDMtLjAxNGguMDQzeiIgZmlsbD0iIzQxOWI0NiIvPjwvZz48Zz48cGF0aCBkPSJtMTI4IDE5NS42NjktNDEuMjM3LTEyLjY2NiA0MS4yMzcgMjQuNjY2IDQxLjIzNy0yNC42NjZ6IiBmaWxsPSIjNjViYzQ5Ii8+PC9nPjwvZz48Zz48Zz48Zz48cGF0aCBkPSJtMTI4IDIxMC42NjljLS4yOTcgMC0uNTk0LS4wNDQtLjg4MS0uMTMybC05My4zMzgtMjguNjY5Yy0xLjI2LS4zODctMi4xMTktMS41NS0yLjExOS0yLjg2OCAwLS4wMDIgMC0uMDA0IDAtLjAwNnMwLS4wMDQgMC0uMDA3di0xMS45ODdjMC0uOTUyLjQ1MS0xLjg0NyAxLjIxNy0yLjQxMy43NjUtLjU2NiAxLjc1Mi0uNzM1IDIuNjY0LS40NTVsOTIuNDU3IDI4LjM5OSA5Mi40NTctMjguMzk5Yy45MS0uMjggMS44OTgtLjExMSAyLjY2NC40NTUuNzY2LjU2NSAxLjIxNyAxLjQ2MSAxLjIxNyAyLjQxM3YxMS45ODdjMCAuNzQ5LS4yNzQgMS40MzQtLjcyOSAxLjk1OS0uMzU2LjQyNC0uODMyLjc1LTEuMzkxLjkyMWwtOTMuMzM4IDI4LjY2OWMtLjI4Ni4wODktLjU4My4xMzMtLjg4LjEzM3ptLTkwLjMzOC0zMy44ODYgOTAuMzM4IDI3Ljc0OCA5MC4zMzgtMjcuNzQ4di01LjcyNGwtODkuNDU3IDI3LjQ3OGMtLjU3NC4xNzctMS4xODguMTc3LTEuNzYyIDBsLTg5LjQ1Ny0yNy40Nzh6IiBmaWxsPSIjMWMyZDZiIi8+PC9nPjwvZz48L2c+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Im0xMjggOTEuMzM1LTkzLjMzOCAyOC42NjkgOTMuMzM4IDI4LjY2OS0zMC0yOC42Njl6IiBmaWxsPSIjODlhYWRiIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMjggOTEuMzM1IDMwIDI4LjY2OS0zMCAyOC42NjkgOTMuMzM4LTI4LjY2OXoiIGZpbGw9IiM0YjY3YjAiLz48L2c+PGc+PHBhdGggZD0ibTEyOCA5MS4zMzUtMzAgMjguNjY5IDMwIDI4LjY2OSAzMC0yOC42Njl6IiBmaWxsPSIjNjI4N2M1Ii8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJtMTI4IDE1MS42NzNjLS4yOTcgMC0uNTk0LS4wNDQtLjg4MS0uMTMybC05My4zMzgtMjguNjY5Yy0xLjI2LS4zODctMi4xMTktMS41NS0yLjExOS0yLjg2OHMuODU5LTIuNDgxIDIuMTE5LTIuODY4bDkzLjMzOC0yOC42NjljLjU3NC0uMTc3IDEuMTg4LS4xNzcgMS43NjIgMGw5My4zMzggMjguNjY5YzEuMjYuMzg3IDIuMTE5IDEuNTUgMi4xMTkgMi44NjhzLS44NTkgMi40ODEtMi4xMTkgMi44NjhsLTkzLjMzOCAyOC42NjljLS4yODcuMDg4LS41ODQuMTMyLS44ODEuMTMyem0tODMuMTItMzEuNjY5IDgzLjEyIDI1LjUzMSA4My4xMi0yNS41MzEtODMuMTItMjUuNTMxeiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTM0LjY2MiAxMjAuMDA0djExLjk4N2guMDQzbC0uMDQzLjAxMyA5My4zMzggMjguNjY5LTQxLjIzNy0yNC42NjZ6IiBmaWxsPSIjODlhYWRiIi8+PC9nPjxnPjxwYXRoIGQ9Im0yMjEuMzM4IDEyMC4wMDQtNTIuMTAxIDE2LjAwMy00MS4yMzcgMjQuNjY2IDkzLjMzOC0yOC42NjktLjA0My0uMDEzaC4wNDN6IiBmaWxsPSIjNGI2N2IwIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMjggMTQ4LjY3My00MS4yMzctMTIuNjY2IDQxLjIzNyAyNC42NjYgNDEuMjM3LTI0LjY2NnoiIGZpbGw9IiM2Mjg3YzUiLz48L2c+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Im0xMjggMTYzLjY3M2MtLjI5NyAwLS41OTQtLjA0NC0uODgxLS4xMzJsLTkzLjMzOC0yOC42NjljLTEuMjYtLjM4Ny0yLjExOS0xLjU1LTIuMTE5LTIuODY4IDAtLjAwMiAwLS4wMDQgMC0uMDA2czAtLjAwNCAwLS4wMDd2LTExLjk4N2MwLS45NTIuNDUxLTEuODQ3IDEuMjE3LTIuNDEzLjc2NS0uNTY2IDEuNzUyLS43MzUgMi42NjQtLjQ1NWw5Mi40NTcgMjguMzk5IDkyLjQ1Ny0yOC4zOThjLjkxLS4yOCAxLjg5OC0uMTExIDIuNjY0LjQ1NS43NjYuNTY1IDEuMjE3IDEuNDYxIDEuMjE3IDIuNDEzdjExLjk4N2MwIC43NDktLjI3NCAxLjQzNC0uNzI5IDEuOTYtLjM1Ni40MjQtLjgzMi43NS0xLjM5MS45MjFsLTkzLjMzOCAyOC42NjljLS4yODYuMDg3LS41ODMuMTMxLS44OC4xMzF6bS05MC4zMzgtMzMuODg2IDkwLjMzOCAyNy43NDggOTAuMzM4LTI3Ljc0OHYtNS43MjRsLTg5LjQ1NyAyNy40NzdjLS41NzQuMTc3LTEuMTg4LjE3Ny0xLjc2MiAwbC04OS40NTctMjcuNDc3eiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PC9nPjwvZz48Zz48Zz48Zz48cGF0aCBkPSJtMTI4IDQ4LjMzMS05My4zMzggMjguNjY5IDkzLjMzOCAyOC42NjktMzAtMjguNjY5eiIgZmlsbD0iI2VkZTQ5ZCIvPjwvZz48Zz48cGF0aCBkPSJtMTI4IDQ4LjMzMSAzMCAyOC42NjktMzAgMjguNjY5IDkzLjMzOC0yOC42Njl6IiBmaWxsPSIjZDNiYTJhIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMjggNDguMzMxLTMwIDI4LjY2OSAzMCAyOC42NjkgMzAtMjguNjY5eiIgZmlsbD0iI2VlZTA0NSIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTEyOCAxMDguNjY5Yy0uMjk3IDAtLjU5NC0uMDQ0LS44ODEtLjEzMmwtOTMuMzM4LTI4LjY2OWMtMS4yNi0uMzg3LTIuMTE5LTEuNTUtMi4xMTktMi44NjhzLjg1OS0yLjQ4MSAyLjExOS0yLjg2OGw5My4zMzgtMjguNjY5Yy41NzQtLjE3NyAxLjE4OC0uMTc3IDEuNzYyIDBsOTMuMzM4IDI4LjY2OWMxLjI2LjM4NyAyLjExOSAxLjU1IDIuMTE5IDIuODY4cy0uODU5IDIuNDgxLTIuMTE5IDIuODY4bC05My4zMzggMjguNjY5Yy0uMjg3LjA4OC0uNTg0LjEzMi0uODgxLjEzMnptLTgzLjEyLTMxLjY2OSA4My4xMiAyNS41MzEgODMuMTItMjUuNTMxLTgzLjEyLTI1LjUzMXoiIGZpbGw9IiMxYzJkNmIiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0zNC42NjIgNzd2MTEuOTg3aC4wNDNsLS4wNDMuMDEzIDkzLjMzOCAyOC42NjktNDEuMjM3LTI0LjY2NnoiIGZpbGw9IiNlZjdmNzIiLz48L2c+PGc+PHBhdGggZD0ibTIyMS4zMzggNzctNTIuMTAxIDE2LjAwMy00MS4yMzcgMjQuNjY2IDkzLjMzOC0yOC42NjktLjA0My0uMDEzaC4wNDN6IiBmaWxsPSIjZTgzODNiIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMjggMTA1LjY2OS00MS4yMzctMTIuNjY2IDQxLjIzNyAyNC42NjYgNDEuMjM3LTI0LjY2NnoiIGZpbGw9IiNlOTU5NDciLz48L2c+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Im0xMjggMTIwLjY2OWMtLjI5NyAwLS41OTQtLjA0NC0uODgxLS4xMzJsLTkzLjMzOC0yOC42NjljLTEuMjU0LS4zODUtMi4xMTItMS41NDEtMi4xMTktMi44NTMgMC0uMDA4IDAtLjAxNiAwLS4wMjMgMC0uMDAyIDAtLjAwNCAwLS4wMDV2LTExLjk4N2MwLS45NTIuNDUxLTEuODQ3IDEuMjE3LTIuNDEzLjc2NS0uNTY2IDEuNzUyLS43MzYgMi42NjQtLjQ1NWw5Mi40NTcgMjguMzk5IDkyLjQ1Ny0yOC4zOThjLjkxLS4yODEgMS44OTgtLjExMSAyLjY2NC40NTUuNzY2LjU2NSAxLjIxNyAxLjQ2MSAxLjIxNyAyLjQxM3YxMS45ODZjMCAuNzQ0LS4yNzEgMS40MjUtLjcxOSAxLjk0OS0uMzU3LjQzLS44MzcuNzYtMS40LjkzM2wtOTMuMzM4IDI4LjY2OWMtLjI4Ny4wODctLjU4NC4xMzEtLjg4MS4xMzF6bS05MC4zMzgtMzMuODg1IDkwLjMzOCAyNy43NDcgOTAuMzM4LTI3Ljc0OHYtNS43MjNsLTg5LjQ1NyAyNy40NzdjLS41NzQuMTc3LTEuMTg4LjE3Ny0xLjc2MiAwbC04OS40NTctMjcuNDc3eiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0zNC42NjEgODAuMDAxYy0xLjI4MyAwLTIuNDcxLS44My0yLjg2Ny0yLjEyLS40ODYtMS41ODQuNDAzLTMuMjYyIDEuOTg3LTMuNzQ5bDkzLjMzOC0yOC42NjljMS41ODEtLjQ4NyAzLjI2My40MDMgMy43NDkgMS45ODdzLS40MDMgMy4yNjItMS45ODcgMy43NDlsLTkzLjMzOCAyOC42NjljLS4yOTMuMDktLjU5LjEzMy0uODgyLjEzM3oiIGZpbGw9IiMxYzJkNmIiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0xMjcuOTk5IDYyLjU1NWMtMS4yODMgMC0yLjQ3MS0uODMtMi44NjctMi4xMi0uNDg2LTEuNTg0LjQwMy0zLjI2MiAxLjk4Ny0zLjc0OWwxOC4yNy01LjYxMWMxLjU4Mi0uNDg2IDMuMjYzLjQwMiAzLjc0OSAxLjk4Ny40ODYgMS41ODQtLjQwMyAzLjI2Mi0xLjk4NyAzLjc0OWwtMTguMjcgNS42MTFjLS4yOTMuMDktLjU5LjEzMy0uODgyLjEzM3oiIGZpbGw9IiMxYzJkNmIiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im03OS45OTkgNzcuMjk5Yy0xLjI4MyAwLTIuNDcxLS44My0yLjg2Ny0yLjEyLS40ODYtMS41ODQuNDAzLTMuMjYyIDEuOTg3LTMuNzQ5bDI0LTcuMzcyYzEuNTgyLS40ODggMy4yNjMuNDAzIDMuNzQ5IDEuOTg3cy0uNDAzIDMuMjYyLTEuOTg3IDMuNzQ5bC0yNCA3LjM3MmMtLjI5My4wOS0uNTkuMTMzLS44ODIuMTMzeiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTExNS45OTkgNzcuNDY0Yy0xLjI4MyAwLTIuNDcxLS44My0yLjg2Ny0yLjEyLS40ODYtMS41ODQuNDAzLTMuMjYyIDEuOTg3LTMuNzQ5bDE4LTUuNTI5YzEuNTgyLS40ODcgMy4yNjMuNDAzIDMuNzQ5IDEuOTg3cy0uNDAzIDMuMjYyLTEuOTg3IDMuNzQ5bC0xOCA1LjUyOWMtLjI5My4wOS0uNTkuMTMzLS44ODIuMTMzeiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTcxLjA4NyA5MS4yNTljLTEuMjgzIDAtMi40NzEtLjgzLTIuODY3LTIuMTItLjQ4Ni0xLjU4NC40MDMtMy4yNjIgMS45ODctMy43NDlsMjguNDQ5LTguNzM4YzEuNTgtLjQ4NSAzLjI2My40MDIgMy43NDkgMS45ODcuNDg2IDEuNTg0LS40MDMgMy4yNjItMS45ODcgMy43NDlsLTI4LjQ0OSA4LjczOGMtLjI5My4wOS0uNTkuMTMzLS44ODIuMTMzeiIgZmlsbD0iIzFjMmQ2YiIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTE1Ny45OTkgNzUuNzg3Yy0xLjI4MyAwLTIuNDcxLS44My0yLjg2Ny0yLjEyLS40ODYtMS41ODQuNDAzLTMuMjYyIDEuOTg3LTMuNzQ5bDI0Ljc0OS03LjYwMmMxLjU4Mi0uNDg4IDMuMjYzLjQwMyAzLjc0OSAxLjk4N3MtLjQwMyAzLjI2Mi0xLjk4NyAzLjc0OWwtMjQuNzQ5IDcuNjAyYy0uMjkzLjA5LS41OS4xMzMtLjg4Mi4xMzN6IiBmaWxsPSIjMWMyZDZiIi8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJtMTQ2LjAwNiA5MC42OTRjLTEuMjgzIDAtMi40NzEtLjgzLTIuODY3LTIuMTItLjQ4Ni0xLjU4NC40MDMtMy4yNjIgMS45ODctMy43NDlsMTkuNjExLTYuMDIzYzEuNTgxLS40ODUgMy4yNjMuNDAyIDMuNzQ5IDEuOTg3LjQ4NiAxLjU4NC0uNDAzIDMuMjYyLTEuOTg3IDMuNzQ5bC0xOS42MTEgNi4wMjNjLS4yOTMuMDktLjU5LjEzMy0uODgyLjEzM3oiIGZpbGw9IiMxYzJkNmIiLz48L2c+PC9nPjxnPjxnPjxwYXRoIGQ9Im0xMDcuNzE4IDEwMi40NTRjLTEuMjgzIDAtMi40NzEtLjgzLTIuODY3LTIuMTItLjQ4Ni0xLjU4NC40MDMtMy4yNjIgMS45ODctMy43NDlsMjYuNDMxLTguMTE4YzEuNTgyLS40ODYgMy4yNjMuNDAzIDMuNzQ5IDEuOTg3cy0uNDAzIDMuMjYyLTEuOTg3IDMuNzQ5bC0yNi40MzEgOC4xMThjLS4yOTMuMDktLjU5LjEzMy0uODgyLjEzM3oiIGZpbGw9IiMxYzJkNmIiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+"
                      />
                    </div>
                    <div className="sales__section-img--illustratoricon-text">Materials</div>
                  </div>
                </div>
              </>
            )}

            {/* Card Details */}
            {currentBodyLength ? (
              <Card className="sales__selectarea-card" size="small" title="Selected body type">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Title</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-row-right-title">
                    {currentBodyLength?.body.title}
                  </div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Description</div>
                  <div className="sales__selectarea-card-row-right">
                    {`${currentBodyLength.length.title}ft${
                      currentBodyLength.body.description === null ? '' : `, ${currentBodyLength.body.description}`
                    }`}
                  </div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Dimension</div>
                  <div className="sales__selectarea-card-row-right">
                    <Tag className="flex" color="red">
                      <div>Width:&nbsp;</div>
                      <div>
                        <div>{currentBodyLength?.width}</div>
                      </div>
                    </Tag>

                    <Tag className="flex" color="volcano">
                      <div>Height:&nbsp;</div>
                      <div>
                        <div>{currentBodyLength?.depth}</div>
                      </div>
                    </Tag>

                    <Tag className="flex" color="orange">
                      <div>Depth:&nbsp;</div>
                      <div>
                        <div>{currentBodyLength?.height}</div>
                      </div>
                    </Tag>
                  </div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Price</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-price">
                    RM
                    <NumberFormat value={currentBodyLength?.price} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="sales__selectarea-card" size="small" title="Selected body type">
                None
              </Card>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              Decide on the type of the cargo body, material decides the capabilities of the vehicle.
              <br />
              There are a few of main body types in the market.
            </div>
            <div className="sales__selectarea-innerdiv">
              <div>Select the material type of the cargo body</div>

              {bodyLengthsArray ? (
                <>
                  {bodyLengthsArray.length > 0 ? (
                    <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                      <>
                        {bodyLengthsArray.map((bodyLength) => {
                          return (
                            <div
                              key={uuidv4()}
                              className={`sales__selectarea-button  ${
                                currentBodyLength?.id === bodyLength.id ? 'active' : ''
                              }`}
                              onClick={() => {
                                //  if currentLength has an id
                                if (currentBodyLength?.id === bodyLength.id) {
                                  // reset the selection
                                  setCurrentBodyLength(null);
                                  setCurrentOrderObj({ ...currentOrderObj, bodyLengthObj: null });
                                } else {
                                  setCurrentBodyLength(bodyLength);
                                  setCurrentOrderObj({
                                    ...currentOrderObj,
                                    bodyLengthObj: bodyLength,
                                  });
                                }
                              }}
                            >
                              {bodyLength.body.title}
                            </div>
                          );
                        })}
                      </>
                    </div>
                  ) : (
                    <Empty />
                  )}
                </>
              ) : (
                <div className="sales__selectarea-button margin_t-4 margin_b-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button className="sales__skeleton" key={num + uuidv4()} active={true} size="large" />
                  ))}
                </div>
              )}
            </div>
            <div className="sales__length-btn-div">
              <Button
                className="sales__length-btn margin_r-1"
                onClick={() => {
                  prev();
                  setCurrentBodyLength(null);
                }}
              >
                Back
              </Button>
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    // Then call the body lengths API
                    if (currentBodyLength === null) return;
                    if (currentBodyLength.id) {
                      onGetSalesBodyAccessories(currentBodyLength.id);
                    }
                  }}
                  className="sales__length-btn"
                  loading={loading}
                  disabled={currentBodyLength === null ? true : false}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );

  /* ------------------------------- */
  // Body Accessories
  /* ------------------------------- */
  let bodyAccessorySection = (
    <>
      {/*  only show if length is selected */}
      <section className="sales__section sales__section-body">
        <div className="sales__breadcrumb-outerdiv">
          <Breadcrumb separator=">" className="sales__breadcrumb">
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Tyre Count</span>
              {currentTyre && <span className="sales__breadcrumb-highlight">({currentTyre})</span>}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Length</span>
              <span className="sales__breadcrumb-highlight">({currentLength?.title}ft)</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Body</span>
              {currentBodyLength && (
                <span className="sales__breadcrumb-highlight">({currentBodyLength?.body.title})</span>
              )}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Accessory</span>
              <span className="sales__breadcrumb-highlight">({totalAccessoriesArrayLength} Items)</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider orientation="left">
          <div className="sales__section-header">Accessory </div>
        </Divider>
        <section className="sales__section-innerdiv">
          <div className="sales__section-left">
            {currentAccessory ? (
              <>
                {currentAccessory.accessoryObj.images.length > 0 ? (
                  <div className="sales__lightbox-parent" onClick={() => setBodyAccessoryLightboxOpen(true)}>
                    {/* Clickable image to show lightbox */}
                    <LazyLoadImage
                      className="sales__section-img"
                      src={currentAccessory.accessoryObj.images[0].url}
                      alt={currentAccessory.accessoryObj.images[0].filename}
                      placeholderSrc={img_loading_link}
                    />
                    <LightboxComponent
                      images={currentAccessory.accessoryObj?.images}
                      photoIndex={bodyAccessoryPhotoIndex}
                      isOpen={bodyAccessoryLightboxOpen}
                      setPhotoIndex={setBodyAccessoryPhotoIndex}
                      setIsOpen={setBodyAccessoryLightboxOpen}
                    />
                    <div className="sales__lightbox-icon">
                      <i className="fas fa-expand"></i>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* if there is no image then show image not available */}
                    <img className="sales__section-img" src={img_not_available_link} alt="no result" />
                    <div className="sales__section-img-unavailabletext"> No image is provided for this accessory</div>
                  </>
                )}
              </>
            ) : (
              // if nothing has been picked yet then show this
              <>
                <div className="sales__section-preview">
                  <div className="sales__section-preview-innerdiv">
                    <div className="sales__section-img--illustratoricon-div">
                      <img
                        alt="accessory"
                        className="sales__section-img sales__section-img--accessories"
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzYwNUY2RDsiIGQ9Ik04NC4yNSwxNS43MzhsNTUuNTEsNTUuNTA5YzcuMDQ4LDcuMDQ4LDcuMDQ4LDE4LjQ3NCwwLDI1LjUyMmwtNDEuMjY0LDQxLjI2NA0KCWMtNy4wNDgsNy4wNDgtMTguNDc0LDcuMDQ4LTI1LjUyMiwwbC01NS41MS01NS41MDljLTMuODAyLTMuODAyLTEwLjI2OS0yLjA0NC0xMS42NzYsMy4xNDUNCgljLTEwLjUzOCwzOC44NjYtMC41NzIsODIuMTI3LDI5Ljk0NCwxMTIuNjQzYzMzLjIxLDMzLjIwOSw4MS41MTIsNDIuMDc5LDEyMi44MTksMjYuNjc0bDI0MC4yMzQsMjYyLjcwMg0KCWMyNC42NjcsMjYuOTc0LDY2Ljg1MiwyNy45MTYsOTIuNjk5LDIuMDdsMCwwYzI1Ljk2OS0yNS45NjksMjQuODc2LTY4LjM5Ni0yLjM5NS05Mi45OTRMMjI1Ljc4OCwxNTkuMjc2DQoJYzE2LjY5Mi00MS44MzMsOC4xMTgtOTEuNDAzLTI1Ljc0OS0xMjUuMjcxQzE2OS41MjMsMy40ODksMTI2LjI2MS02LjQ3Nyw4Ny4zOTUsNC4wNjFDODIuMjA2LDUuNDY4LDgwLjQ0OCwxMS45MzYsODQuMjUsMTUuNzM4eg0KCSBNNDYzLjk3Niw0NDMuOTU0YzAsMTAuNjE0LTguNjA0LDE5LjIxOC0xOS4yMTgsMTkuMjE4Yy0xMC42MTQsMC0xOS4yMTgtOC42MDQtMTkuMjE4LTE5LjIxOGMwLTEwLjYxNCw4LjYwNC0xOS4yMTgsMTkuMjE4LTE5LjIxOA0KCUM0NTUuMzcyLDQyNC43MzYsNDYzLjk3Niw0MzMuMzQsNDYzLjk3Niw0NDMuOTU0eiIvPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzUzNTE1RTsiIGQ9Ik0yMDMuOTEzLDEzNS4wNjhsMjMuMTM3LDIwLjg2OWMxNC45NDktNDEuMTA5LDUuOTYtODguOTYtMjcuMDExLTEyMS45MzINCgkJYy0yLjQ3NS0yLjQ3NS01LjA0My00Ljc5OC03LjY3Ni03LjAwMkMyMTQuMTExLDU5LjE5NCwyMTcuOTU4LDk5Ljg2OSwyMDMuOTEzLDEzNS4wNjh6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzUzNTE1RTsiIGQ9Ik0zNzYuNzMzLDQ2My41NzJsMjIuMDUzLDI0LjExNWMyNC42NjcsMjYuOTc0LDY2Ljg1MiwyNy45MTYsOTIuNjk5LDIuMDdsMCwwDQoJCWMyNS45NjktMjUuOTY5LDI0Ljg3Ni02OC4zOTctMi4zOTUtOTIuOTk0bC04Ljk1LTguMDcyYzEzLjczNCwyNC4zNTQsMTAuMzg3LDU1Ljk0My0xMC41Myw3Ni44NTlsMCwwDQoJCUM0NDMuNzYzLDQ5MS4zOTUsNDAxLjQsNDkwLjU0NywzNzYuNzMzLDQ2My41NzIiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojNTM1MTVFOyIgZD0iTTE1OC41NTIsMjI0Ljk4NWwtMjEuODc1LTI0LjIwN2MtMzguMjI0LDE0LjI1Ni04Mi40MjksNy43MDgtMTE1LjEzMi0xOS42NjINCgkJYzQuMDk2LDYuMDYyLDguODIsMTEuODI4LDE0LjE4NywxNy4xOTVDNjguOTQyLDIzMS41MjEsMTE3LjI0NSwyNDAuMzkxLDE1OC41NTIsMjI0Ljk4NSIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiM1MzUxNUU7IiBkPSJNMzA1Ljg0NCwyMzEuNDgzbC0yMC40MjMsMjAuNDIzbC0xMy42OC0xMy42OGMtOC40NzctOC40NzctMjIuMjIxLTguNDc3LTMwLjY5OCwwbC0xOC42OTIsMTguNjkyDQoJCWM0LjcwNywxMi4xMjQsNC42ODgsMjUuNjU5LTAuMDYxLDM3Ljc2OWw0NS4xOTQsNDkuNDIxYzkuODgyLTQuNjA2LDIwLjkxNS01LjkyOSwzMS40NTktMy45NjcNCgkJYzYuMjczLDEuMTY4LDEyLjcxOC0wLjgxOSwxNy4yMjktNS4zMzFsMTAuNzI3LTEwLjcyN2M4LjQ3Ny04LjQ3Nyw4LjQ3Ny0yMi4yMiwwLTMwLjY5N2wwLDBjLTcuNTU1LTcuNTU1LTcuNTU1LTE5LjgwNSwwLTI3LjM2DQoJCWw4LjE3NS04LjE3NkwzMDUuODQ0LDIzMS40ODN6Ii8+DQo8L2c+DQo8cGF0aCBzdHlsZT0iZmlsbDojRTlFQkYyOyIgZD0iTTUwNy41NDksNjMuNjg1bC0zNS4xMjctMzUuMTI3Yy0zLjM3OS0zLjM3OS05LjA2NC0yLjUyLTExLjI5NCwxLjcwNmwtMTguOTEsMzUuODI3bC0xNzIuOCwxNzIuNzk4DQoJbDI3Ljc5OSwyNy43OTlsMTcyLjgtMTcyLjc5OGwzNS44MjctMTguOTExQzUxMC4wNyw3Mi43NDksNTEwLjkyOCw2Ny4wNjQsNTA3LjU0OSw2My42ODV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQzdDQUQzOyIgZD0iTTUwNy41NDksNjMuNjg1bC04Ljg2OC04Ljg2OGMwLjYyMSwyLjk2MS0wLjY4Miw2LjE5My0zLjYyOCw3Ljc0N2wtMzUuODI3LDE4LjkxMUwyODYuNDI3LDI1NC4yNzMNCglsLTE2LjE5Ni0xNi4xOTZsLTAuODEyLDAuODEybDI3Ljc5OSwyNy43OTlMNDcwLjAxNyw5My44OWwzNS44MjctMTguOTExQzUxMC4wNyw3Mi43NDksNTEwLjkyOCw2Ny4wNjQsNTA3LjU0OSw2My42ODV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQzY0OyIgZD0iTTIzOC41MDIsMzM5LjY1N2MxNC45OTctMTQuOTk3LDM2Ljg4OS0xOC44NzUsNTUuNDY3LTExLjY2MmwxOC42OTItMTguNjkyDQoJYzguNDc3LTguNDc3LDguNDc3LTIyLjIyMSwwLTMwLjY5OGwtNTUuMTU5LTU1LjE1OWMtOC40NzctOC40NzctMjIuMjIxLTguNDc3LTMwLjY5NywwbC0xOC42OTIsMTguNjkyDQoJYzcuMjEzLDE4LjU3OCwzLjMzNCw0MC40Ny0xMS42NjIsNTUuNDY3cy0zNi44ODksMTguODc1LTU1LjQ2NywxMS42NjJMNDEuODksNDA4LjM2MWMtMjMuNzA5LDIzLjcwOS0yMy43MDksNjIuMTQ4LDAsODUuODU3bDAsMA0KCWMyMy43MDksMjMuNzA5LDYyLjE0OCwyMy43MDksODUuODU3LDBsOTkuMDk0LTk5LjA5NEMyMTkuNjI2LDM3Ni41NDcsMjIzLjUwNSwzNTQuNjU0LDIzOC41MDIsMzM5LjY1N3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkM4NTA7IiBkPSJNMzEyLjY2MSwyNzguNjA1bC0xMy4wNDMtMTMuMDQzYzEuODI3LDcuMTc4LTAuMDQ0LDE1LjEwMy01LjY2MSwyMC43MmwtMTguNjkyLDE4LjY5Mg0KCWMtMTguNTc3LTcuMjEzLTQwLjQ3LTMuMzM0LTU1LjQ2NywxMS42NjJjLTE0Ljk5NywxNC45OTctMTguODc2LDM2Ljg4OS0xMS42NjIsNTUuNDY3bC05OS4wOTQsOTkuMDk0DQoJYy0yMS42MzEsMjEuNjMxLTU1LjUxNywyMy41MTYtNzkuMjk3LDUuNjc3YzIuOTE3LDYuMjgsNi45NjUsMTIuMTYzLDEyLjE0NSwxNy4zNDRjMjMuNzA5LDIzLjcwOSw2Mi4xNDgsMjMuNzA5LDg1Ljg1NywwDQoJbDk5LjA5NC05OS4wOTRjLTcuMjEzLTE4LjU3OC0zLjMzNC00MC40NywxMS42NjItNTUuNDY3YzE0Ljk5Ny0xNC45OTcsMzYuODg5LTE4Ljg3NSw1NS40NjctMTEuNjYybDE4LjY5Mi0xOC42OTINCglDMzIxLjEzOCwzMDAuODI2LDMyMS4xMzgsMjg3LjA4MiwzMTIuNjYxLDI3OC42MDV6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkY2QjVDOyIgZD0iTTc2Ljk3OSw0MzkuNTg2Yy0yLjA3MSwwLTQuMTQyLTAuNzktNS43MjMtMi4zN2MtMy4xNi0zLjE2MS0zLjE2LTguMjg1LDAtMTEuNDQ2bDc2LjY2Ny03Ni42NjcNCgkJYzMuMTYxLTMuMTU5LDguMjg1LTMuMTU5LDExLjQ0NiwwYzMuMTYsMy4xNjEsMy4xNiw4LjI4NSwwLDExLjQ0NmwtNzYuNjY3LDc2LjY2N0M4MS4xMjEsNDM4Ljc5Niw3OS4wNDksNDM5LjU4Niw3Ni45NzksNDM5LjU4NnoiDQoJCS8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNkI1QzsiIGQ9Ik0xMDUuMzA2LDQ2Ny45MTNjLTIuMDcxLDAtNC4xNDItMC43OS01LjcyMy0yLjM3Yy0zLjE2LTMuMTYxLTMuMTYtOC4yODUsMC0xMS40NDZsNzYuNjY3LTc2LjY2Nw0KCQljMy4xNjEtMy4xNTksOC4yODUtMy4xNTksMTEuNDQ2LDBjMy4xNiwzLjE2MSwzLjE2LDguMjg1LDAsMTEuNDQ2bC03Ni42NjcsNzYuNjY3DQoJCUMxMDkuNDQ4LDQ2Ny4xMjMsMTA3LjM3Niw0NjcuOTEzLDEwNS4zMDYsNDY3LjkxM3oiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                      />
                    </div>
                    <div className="sales__section-img--accessories-text">Accessories</div>
                  </div>
                </div>
              </>
            )}

            {currentAccessory ? (
              //  The card details
              <Card className="sales__selectarea-card" size="small" title="Selected accessory">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Title</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-row-right-title">
                    {currentAccessory.accessoryObj?.title}
                  </div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Description</div>
                  <div className="sales__selectarea-card-row-right">{`${
                    currentAccessory.accessoryObj.description === null ||
                    currentAccessory.accessoryObj.description === ''
                      ? 'None'
                      : currentAccessory.accessoryObj.description
                  }`}</div>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Price</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-price">
                    RM
                    <NumberFormat value={currentAccessory.price} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div>
              </Card>
            ) : (
              <>
                <Card className="sales__selectarea-card" size="small" title="Selected accessory">
                  None
                </Card>
              </>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              After choosing the body type, you need to decide on the accessory that you want on your cargo body.
              Depending on the different functionalities you are looking for you need different kinds of accessories
            </div>
            <div className="sales__selectarea-innerdiv">
              <div className="flex space-between">
                Select the accessory for the cargo body
                <span className="sales__breadcrumb-highlight">
                  {totalAccessoriesArrayLength > 0 ? `${totalAccessoriesArrayLength} items` : null}
                </span>
              </div>

              {/* If all the arrays are empty then show <Empty/> */}
              {generalAccessoriesArray &&
                bodyRelatedAccessoriesArray &&
                dimensionRelatedAccessoriesArray &&
                generalAccessoriesArray.length === 0 &&
                dimensionRelatedAccessoriesArray.length === 0 &&
                bodyRelatedAccessoriesArray.length === 0 && <Empty />}

              {generalAccessoriesArray ? (
                <>
                  {generalAccessoriesArray.length > 0 ? (
                    <div className="sales__selectarea--accessories">
                      <Divider orientation="left" className="sales__selectarea-categorydivider">
                        <div>General Accessories</div>
                      </Divider>
                      <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                        <>
                          {generalAccessoriesArray.map((accessory) => {
                            // Boolean
                            let objExistInGeneralAccessoriesArray = currentOrderObj.generalAccessoriesArray.includes(
                              accessory,
                            );
                            return (
                              <div
                                key={uuidv4()}
                                className={`sales__selectarea-button ${
                                  // if the generalaccessoriesarray includes this specific accessory object
                                  objExistInGeneralAccessoriesArray ? 'active' : ''
                                }`}
                                onClick={() => {
                                  // Whenever user clicks on an accessory, straight show that accessory
                                  // we need a separate obj to keep track of price because for dimension the price is not
                                  // in accessory
                                  setCurrentAccessory({
                                    ...currentAccessory,
                                    accessoryObj: accessory,
                                    price: accessory.price,
                                  });
                                  //  if currentLength has an id
                                  if (objExistInGeneralAccessoriesArray) {
                                    //  Filter the current general accessories array and only return the rest that doesnt match that id
                                    let arrayAfterDelete = [...currentOrderObj.generalAccessoriesArray].filter(
                                      (accessoryObj) => {
                                        return accessoryObj.id !== accessory.id;
                                      },
                                    );

                                    let totalArrayAfterDelete =
                                      arrayAfterDelete.length +
                                      currentOrderObj.bodyRelatedAccessoriesArray.length +
                                      currentOrderObj.dimensionRelatedAccessoriesArray.length;

                                    // if after delete and nothing is left from the total array, then make the accessory null again
                                    if (totalArrayAfterDelete === 0) {
                                      setCurrentAccessory(null);
                                    }
                                    setCurrentOrderObj({
                                      ...currentOrderObj,
                                      generalAccessoriesArray: arrayAfterDelete,
                                    });
                                  } else {
                                    // spread the array
                                    let tempArray = [...currentOrderObj.generalAccessoriesArray];
                                    // add new accessory into the array and update the state
                                    tempArray.push(accessory);
                                    setCurrentOrderObj({
                                      ...currentOrderObj,
                                      generalAccessoriesArray: tempArray,
                                    });
                                  }
                                }}
                              >
                                {accessory.title}
                              </div>
                            );
                          })}
                        </>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button
                      className="sales__selectarea-button-skeleton"
                      key={num + uuidv4()}
                      active={true}
                      size="large"
                    />
                  ))}
                </div>
              )}
              {bodyRelatedAccessoriesArray ? (
                <>
                  {bodyRelatedAccessoriesArray.length > 0 ? (
                    <div className="sales__selectarea--accessories">
                      <Divider orientation="left" className="sales__selectarea-categorydivider">
                        <div>Body Associated Accessories</div>
                      </Divider>
                      <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                        <>
                          {bodyRelatedAccessoriesArray.map((accessory) => {
                            let objExistInBodyRelatedAccessoriesArray = currentOrderObj.bodyRelatedAccessoriesArray.includes(
                              accessory,
                            );
                            return (
                              <div
                                key={uuidv4()}
                                className={`sales__selectarea-button ${
                                  objExistInBodyRelatedAccessoriesArray ? 'active' : ''
                                }`}
                                onClick={() => {
                                  // Whenever user clicks on an accessory, straight show that accessory
                                  setCurrentAccessory({
                                    ...currentAccessory,
                                    accessoryObj: accessory,
                                    price: accessory.price,
                                  });

                                  //  if currentLength has an id
                                  if (objExistInBodyRelatedAccessoriesArray) {
                                    //  Filter the current general accessories array and only return the rest that doesnt match that id
                                    let arrayAfterDelete = [...currentOrderObj.bodyRelatedAccessoriesArray].filter(
                                      (accessoryObj) => {
                                        return accessoryObj.id !== accessory.id;
                                      },
                                    );
                                    let totalArrayAfterDelete =
                                      arrayAfterDelete.length +
                                      currentOrderObj.generalAccessoriesArray.length +
                                      currentOrderObj.dimensionRelatedAccessoriesArray.length;

                                    // if after delete and nothing is left from the total array, then make the accessory null again
                                    if (totalArrayAfterDelete === 0) {
                                      setCurrentAccessory(null);
                                    }
                                    setCurrentOrderObj({
                                      ...currentOrderObj,
                                      bodyRelatedAccessoriesArray: arrayAfterDelete,
                                    });
                                  } else {
                                    // spread the array
                                    let tempArray = [...currentOrderObj.bodyRelatedAccessoriesArray];
                                    // add new accessory into the array and update the state
                                    tempArray.push(accessory);
                                    setCurrentOrderObj({
                                      ...currentOrderObj,
                                      bodyRelatedAccessoriesArray: tempArray,
                                    });
                                  }
                                }}
                              >
                                {accessory.title}
                              </div>
                            );
                          })}
                        </>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="sales__ sales__selectarea-div--twocolumn">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button
                      className="sales__selectarea-button-skeleton"
                      key={num + uuidv4()}
                      active={true}
                      size="large"
                    />
                  ))}
                </div>
              )}
              {dimensionRelatedAccessoriesArray ? (
                <>
                  {dimensionRelatedAccessoriesArray.length > 0 ? (
                    <div className="sales__selectarea--accessories">
                      <Divider orientation="left" className="sales__selectarea-categorydivider">
                        <div>Dimension Associated Accessories</div>
                      </Divider>

                      <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                        {dimensionRelatedAccessoriesArray.map((dimensionRelatedAccessory) => {
                          let objExistInDimensionRelatedAccessoriesArray = currentOrderObj.dimensionRelatedAccessoriesArray.includes(
                            dimensionRelatedAccessory,
                          );
                          return (
                            <div
                              key={uuidv4()}
                              className={`sales__selectarea-button ${
                                objExistInDimensionRelatedAccessoriesArray ? 'active' : ''
                              }`}
                              onClick={() => {
                                // Whenever user clicks on an accessory, straight show that accessory
                                setCurrentAccessory({
                                  ...currentAccessory,
                                  accessoryObj: dimensionRelatedAccessory.accessory,
                                  price: dimensionRelatedAccessory.price,
                                });

                                //  if currentLength has an id
                                if (objExistInDimensionRelatedAccessoriesArray) {
                                  //  Filter the current general accessories array and only return the rest that doesnt match that id
                                  let arrayAfterDelete = [...currentOrderObj.dimensionRelatedAccessoriesArray].filter(
                                    (dimensionObj) => {
                                      return dimensionObj.id !== dimensionRelatedAccessory.id;
                                    },
                                  );
                                  let totalArrayAfterDelete =
                                    arrayAfterDelete.length +
                                    currentOrderObj.generalAccessoriesArray.length +
                                    currentOrderObj.bodyRelatedAccessoriesArray.length;

                                  // if after delete and nothing is left from the total array, then make the accessory null again
                                  if (totalArrayAfterDelete === 0) {
                                    setCurrentAccessory(null);
                                  }
                                  setCurrentOrderObj({
                                    ...currentOrderObj,
                                    dimensionRelatedAccessoriesArray: arrayAfterDelete,
                                  });
                                } else {
                                  // spread the array
                                  let tempArray = [...currentOrderObj.dimensionRelatedAccessoriesArray];
                                  // add new accessory into the array and update the state
                                  tempArray.push(dimensionRelatedAccessory);
                                  setCurrentOrderObj({
                                    ...currentOrderObj,
                                    dimensionRelatedAccessoriesArray: tempArray,
                                  });
                                }
                              }}
                            >
                              {dimensionRelatedAccessory.accessory.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Skeleton.Button
                      className="sales__selectarea-button-skeleton"
                      key={num + uuidv4()}
                      active={true}
                      size="large"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="sales__length-btn-div">
              <Button
                className="sales__length-btn margin_r-1"
                onClick={() => {
                  prev();
                  setCurrentAccessory(null);
                }}
              >
                Back
              </Button>
              {currentStep < totalSteps - 1 && (
                <Button
                  type="primary"
                  loading={loading}
                  onClick={() => {
                    // Then call the body lengths API
                    if (currentLength === null && currentTyre === null) return;
                    if (currentLength && currentTyre) {
                      onGetSalesMakes(currentLength.id, currentTyre);
                    }
                  }}
                  className="sales__length-btn"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );

  /* ------------------ */
  // Brand/Make
  /* ------------------ */
  let brandSection = (
    <>
      <section className="sales__section sales__section-body">
        <div className="sales__breadcrumb-outerdiv">
          <Breadcrumb separator=">" className="sales__breadcrumb">
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Tyre Count</span>
              <span className="sales__breadcrumb-highlight">({currentTyre})</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Length</span>
              <span className="sales__breadcrumb-highlight">({currentLength?.title}ft)</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Body</span>
              {currentBodyLength && (
                <span className="sales__breadcrumb-highlight">({currentBodyLength?.body.title})</span>
              )}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Accessory</span>
              <span className="sales__breadcrumb-highlight">({totalAccessoriesArrayLength} Items)</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Brand</span>
              {currentMake && <span className="sales__breadcrumb-highlight">({currentMake?.title})</span>}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider orientation="left">
          <div className="sales__section-header">Brand</div>
        </Divider>

        <section className="sales__section-innerdiv">
          {/* Description on the left */}
          <div className="sales__section-left">
            {currentMake ? (
              <>
                {/* if there is no image then show image not available */}
                {currentMake.images.length > 0 ? (
                  <>
                    <div className="sales__lightbox-parent" onClick={() => setMakeLightboxOpen(true)}>
                      {/* Clickable image to show lightbox */}
                      <LazyLoadImage
                        className="sales__section-img"
                        src={currentMake.images[0].url}
                        alt={currentMake.images[0].filename}
                        placeholderSrc={img_loading_link}
                      />
                      <LightboxComponent
                        images={currentMake?.images}
                        photoIndex={makePhotoIndex}
                        isOpen={makeLightboxOpen}
                        setPhotoIndex={setMakePhotoIndex}
                        setIsOpen={setMakeLightboxOpen}
                      />
                      <div className="sales__lightbox-icon">
                        <i className="fas fa-expand"></i>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img className="sales__section-img" src={img_not_available_link} alt="no result" />
                    <div className="sales__section-img-unavailabletext"> No image is provided for this model</div>
                  </>
                )}
              </>
            ) : (
              <div className="sales__section-preview">
                <div className="sales__section-preview-innerdiv">
                  <div className="sales__section-img--illustratoricon-div">
                    <img
                      alt="make"
                      className="sales__section-img sales__section-img--accessories"
                      src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PGc+PGc+PGc+PHBhdGggZD0ibTExMi40NzcgMjk5LjA1OGgtOTMuNzMxYy0xMC4zNTMgMC0xOC43NDYtOC4zOTMtMTguNzQ2LTE4Ljc0N3YtOTMuNzMxYzAtMTAuMzUzIDguMzkzLTE4Ljc0NiAxOC43NDYtMTguNzQ2aDkzLjczMWMxMC4zNTMgMCAxOC43NDYgOC4zOTMgMTguNzQ2IDE4Ljc0NnY5My43MzFjMCAxMC4zNTQtOC4zOTMgMTguNzQ3LTE4Ljc0NiAxOC43NDd6IiBmaWxsPSIjZmZlMDdkIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMTQuMDUzIDE2Ny44NzRjLjE5OCAyLjYwMy4yOTkgNS4yMzQuMjk5IDcuODg4IDAgNTYuNjg0LTQ1Ljk1MSAxMDIuNjM1LTEwMi42MzUgMTAyLjYzNS0zLjk2MyAwLTcuODcxLS4yMzItMTEuNzE2LS42N3YyLjU0NGMwIDEwLjM1MyA4LjM5MyAxOC43NDYgMTguNzQ2IDE4Ljc0Nmg5My43MzFjMTAuMzUzIDAgMTguNzQ2LTguMzkzIDE4Ljc0Ni0xOC43NDZ2LTkzLjczMWMtLjAwMS05LjgyLTcuNTU3LTE3Ljg2NC0xNy4xNzEtMTguNjY2eiIgZmlsbD0iI2ZmZDA2NCIvPjwvZz48L2c+PC9nPjxwYXRoIGQ9Im04My40MDQgMjI4LjUxOWMyLjQ5LTMuNjQ0IDMuOTUtOC4wNDUgMy45NS0xMi43ODIgMC0xMi41MjItMTAuMTg3LTIyLjcwOS0yMi43MDktMjIuNzA5aC0xOS4wNTdjLTQuMjA0IDAtNy42MTEgMy40MDgtNy42MTEgNy42MTF2NjUuNjExYzAgMi4wMjUuODA3IDMuOTY2IDIuMjQxIDUuMzk0IDEuNDI3IDEuNDIxIDMuMzU4IDIuMjE4IDUuMzcxIDIuMjE4aC4wMzRjLjAwMiAwIDE3LjUyNC0uMDc4IDIyLjM1My0uMDc4IDEzLjkzNiAwIDI1LjI3My0xMS4zMzcgMjUuMjczLTI1LjI3Mi0uMDAyLTguMTI3LTMuODY0LTE1LjM2Ny05Ljg0NS0xOS45OTN6bS0xOC43NTgtMjAuMjY3YzQuMTI4IDAgNy40ODYgMy4zNTggNy40ODYgNy40ODZzLTMuMzU4IDcuNDg2LTcuNDg2IDcuNDg2Yy0xLjQxMSAwLTExLjQ0Ny4wMTgtMTEuNDQ3LjAxOHYtMTQuOTl6bTMuMzI4IDUwLjMxYy0yLjcxIDAtOS40MDIuMDI0LTE0Ljc3NS4wNDZ2LTIwLjEyN2MxLjQ3My0uMDA2IDE0Ljc3NS0uMDE3IDE0Ljc3NS0uMDE3IDUuNTQxIDAgMTAuMDUgNC41MDggMTAuMDUgMTAuMDQ5IDAgNS41NDItNC41MDkgMTAuMDQ5LTEwLjA1IDEwLjA0OXoiIGZpbGw9IiNlY2Y0ZmYiLz48Zz48Zz48cGF0aCBkPSJtMTEyLjQ3NyAxMzUuMDI5aC05My43MzFjLTEwLjM1MyAwLTE4Ljc0Ni04LjM5My0xOC43NDYtMTguNzQ2di05My43MzFjMC0xMC4zNTMgOC4zOTMtMTguNzQ2IDE4Ljc0Ni0xOC43NDZoOTMuNzMxYzEwLjM1MyAwIDE4Ljc0NiA4LjM5MyAxOC43NDYgMTguNzQ2djkzLjczMWMwIDEwLjM1My04LjM5MyAxOC43NDYtMTguNzQ2IDE4Ljc0NnoiIGZpbGw9IiNkZjc1YTUiLz48cGF0aCBkPSJtMTE0LjA1MyAzLjgwNmMuMTk4IDIuNjAzLjI5OSA1LjIzNC4yOTkgNy44ODggMCA1Ni42ODQtNDUuOTUxIDEwMi42MzUtMTAyLjYzNSAxMDIuNjM1LTMuOTYzIDAtNy44NzEtLjIzMi0xMS43MTYtLjY3djIuNTQ0YzAgMTAuMzUzIDguMzkzIDE4Ljc0NiAxOC43NDYgMTguNzQ2aDkzLjczMWMxMC4zNTMgMCAxOC43NDYtOC4zOTMgMTguNzQ2LTE4Ljc0NnYtOTMuNzMxYy0uMDAxLTkuODIxLTcuNTU3LTE3Ljg2NC0xNy4xNzEtMTguNjY2eiIgZmlsbD0iI2RkNTc5MCIvPjwvZz48L2c+PGc+PGc+PGc+PHBhdGggZD0ibTM5Ny40NzcgMTM1LjAyOWgtOTMuNzMxYy0xMC4zNTMgMC0xOC43NDYtOC4zOTMtMTguNzQ2LTE4Ljc0NnYtOTMuNzMxYzAtMTAuMzUzIDguMzkzLTE4Ljc0NiAxOC43NDYtMTguNzQ2aDkzLjczMWMxMC4zNTMgMCAxOC43NDYgOC4zOTMgMTguNzQ2IDE4Ljc0NnY5My43MzFjMCAxMC4zNTMtOC4zOTMgMTguNzQ2LTE4Ljc0NiAxOC43NDZ6IiBmaWxsPSIjYjNlNTlmIi8+PHBhdGggZD0ibTM5OS4wNTMgMy44ODVjLjE5OCAyLjYwMy4yOTkgNS4yMzQuMjk5IDcuODg4IDAgNTYuNjg0LTQ1Ljk1MSAxMDIuNjM1LTEwMi42MzUgMTAyLjYzNS0zLjk2MyAwLTcuODcxLS4yMzItMTEuNzE2LS42N3YyLjU0NGMwIDEwLjM1MyA4LjM5MyAxOC43NDYgMTguNzQ2IDE4Ljc0Nmg5My43MzFjMTAuMzUzIDAgMTguNzQ2LTguMzkzIDE4Ljc0Ni0xOC43NDZ2LTkzLjczYy0uMDAxLTkuODIxLTcuNTU3LTE3Ljg2NC0xNy4xNzEtMTguNjY3eiIgZmlsbD0iIzk1ZDZhNCIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD0ibTM5Ny40NzcgMjk5LjA1OGgtOTMuNzMxYy0xMC4zNTMgMC0xOC43NDYtOC4zOTMtMTguNzQ2LTE4Ljc0NnYtOTMuNzMxYzAtMTAuMzUzIDguMzkzLTE4Ljc0NiAxOC43NDYtMTguNzQ2aDkzLjczMWMxMC4zNTMgMCAxOC43NDYgOC4zOTMgMTguNzQ2IDE4Ljc0NnY5My43MzFjMCAxMC4zNTMtOC4zOTMgMTguNzQ2LTE4Ljc0NiAxOC43NDZ6IiBmaWxsPSIjOTBkOGY5Ii8+PHBhdGggZD0ibTM5OS4wNTMgMTY3LjkxNGMuMTk4IDIuNjAzLjI5OSA1LjIzNC4yOTkgNy44ODggMCA1Ni42ODQtNDUuOTUxIDEwMi42MzUtMTAyLjYzNSAxMDIuNjM1LTMuOTYzIDAtNy44NzEtLjIzMy0xMS43MTYtLjY3djIuNTQ0YzAgMTAuMzUzIDguMzkzIDE4Ljc0NiAxOC43NDYgMTguNzQ2aDkzLjczMWMxMC4zNTMgMCAxOC43NDYtOC4zOTMgMTguNzQ2LTE4Ljc0NnYtOTMuNzMxYy0uMDAxLTkuODIxLTcuNTU3LTE3Ljg2NC0xNy4xNzEtMTguNjY2eiIgZmlsbD0iIzc1Y2VmOSIvPjwvZz48L2c+PC9nPjxwYXRoIGQ9Im05OC42MzMgOTkuNTM2LTI0LjQxMy02NC42OTFjLS4wMjYtLjA2OS0uMDUzLS4xMzgtLjA4MS0uMjA3LTEuNDA5LTMuNDI1LTQuNzExLTUuNjM4LTguNDE1LTUuNjM4LS4wMDMgMC0uMDA2IDAtLjAwOSAwLTMuNzA3LjAwMy03LjAwOSAyLjIyMy04LjQxMiA1LjY1NC0uMDI0LjA1Ny0uMDQ3LjExNC0uMDY4LjE3MmwtMjQuNjM3IDY0LjY4OGMtMS40OTcgMy45MjkuNDc2IDguMzI2IDQuNDAzIDkuODIyIDMuOTI4IDEuNDk1IDguMzI2LS40NzUgOS44MjMtNC40MDRsNC4yNjktMTEuMjA4aDI5LjA3N2w0LjIyMiAxMS4xODZjMS4xNSAzLjA0OCA0LjA0NyA0LjkyNyA3LjEyMiA0LjkyNi44OTMgMCAxLjgwMi0uMTU4IDIuNjg3LS40OTIgMy45MzItMS40ODQgNS45MTctNS44NzYgNC40MzItOS44MDh6bS00MS43NDMtMjEuMDM1IDguODA3LTIzLjEyNCA4LjcyNyAyMy4xMjR6IiBmaWxsPSIjZWNmNGZmIi8+PGcgZmlsbD0iIzRhODBhYSI+PHBhdGggZD0ibTIxOS4zODkgNDQuMjIzaC01NS4zNmMtNC4yMDQgMC03LjYxMS0zLjQwOC03LjYxMS03LjYxMXMzLjQwNy03LjYxMiA3LjYxMS03LjYxMmg1NS4zNmM0LjIwNCAwIDcuNjExIDMuNDA4IDcuNjExIDcuNjExcy0zLjQwNyA3LjYxMi03LjYxMSA3LjYxMnoiLz48cGF0aCBkPSJtMTk4Ljg4NSA3Ny4wMjloLTM0Ljg1NmMtNC4yMDQgMC03LjYxMS0zLjQwOC03LjYxMS03LjYxMXMzLjQwNy03LjYxMSA3LjYxMS03LjYxMWgzNC44NTZjNC4yMDQgMCA3LjYxMSAzLjQwOCA3LjYxMSA3LjYxMXMtMy40MDcgNy42MTEtNy42MTEgNy42MTF6Ii8+PHBhdGggZD0ibTE5OC44ODUgMTA5LjgzNGgtMzQuODU2Yy00LjIwNCAwLTcuNjExLTMuNDA4LTcuNjExLTcuNjExczMuNDA3LTcuNjExIDcuNjExLTcuNjExaDM0Ljg1NmM0LjIwNCAwIDcuNjExIDMuNDA4IDcuNjExIDcuNjExcy0zLjQwNyA3LjYxMS03LjYxMSA3LjYxMXoiLz48cGF0aCBkPSJtMjE5LjM4OSAyMDguMjUyaC01NS4zNmMtNC4yMDQgMC03LjYxMS0zLjQwOC03LjYxMS03LjYxMSAwLTQuMjA0IDMuNDA3LTcuNjExIDcuNjExLTcuNjExaDU1LjM2YzQuMjA0IDAgNy42MTEgMy40MDggNy42MTEgNy42MTFzLTMuNDA3IDcuNjExLTcuNjExIDcuNjExeiIvPjxwYXRoIGQ9Im0xOTguODg1IDI0MS4wNTdoLTM0Ljg1NmMtNC4yMDQgMC03LjYxMS0zLjQwOC03LjYxMS03LjYxMSAwLTQuMjA0IDMuNDA3LTcuNjExIDcuNjExLTcuNjExaDM0Ljg1NmM0LjIwNCAwIDcuNjExIDMuNDA4IDcuNjExIDcuNjExLjAwMSA0LjIwNC0zLjQwNyA3LjYxMS03LjYxMSA3LjYxMXoiLz48cGF0aCBkPSJtMTk4Ljg4NSAyNzMuODYzaC0zNC44NTZjLTQuMjA0IDAtNy42MTEtMy40MDgtNy42MTEtNy42MTFzMy40MDctNy42MTIgNy42MTEtNy42MTJoMzQuODU2YzQuMjA0IDAgNy42MTEgMy40MDggNy42MTEgNy42MTJzLTMuNDA3IDcuNjExLTcuNjExIDcuNjExeiIvPjwvZz48Zz48Zz48cGF0aCBkPSJtMzU2LjY4MSAxMDkuODM0Yy0yMi4yODYgMC00MC40MTctMTguMTMxLTQwLjQxNy00MC40MTdzMTguMTMtNDAuNDE3IDQwLjQxNy00MC40MTdjOC4wOTggMCAxNS45MTQgMi4zODkgMjIuNjAzIDYuOTA3IDMuNDg0IDIuMzUzIDQuMzk5IDcuMDg1IDIuMDQ3IDEwLjU2OC0yLjM1NCAzLjQ4NC03LjA4NSA0LjM5OS0xMC41NjggMi4wNDctNC4xNjMtMi44MTItOS4wMzItNC4yOTgtMTQuMDgxLTQuMjk4LTEzLjg5MiAwLTI1LjE5NCAxMS4zMDItMjUuMTk0IDI1LjE5NHMxMS4zMDIgMjUuMTk0IDI1LjE5NCAyNS4xOTRjNS4xNzEgMCA5LjUyNS0xLjU0MyAxMi45NDMtNC41ODYuNjY2LS41OTMgMS4zMDEtMS4yNSAxLjg5MS0xLjk1MyAyLjctMy4yMjIgNy41MDEtMy42NDQgMTAuNzIzLS45NDRzMy42NDUgNy41MDEuOTQ0IDEwLjcyM2MtMS4wNjIgMS4yNjgtMi4yMTggMi40Ni0zLjQzMyAzLjU0My02LjIwMyA1LjUyLTE0LjE3OSA4LjQzOS0yMy4wNjkgOC40Mzl6IiBmaWxsPSIjZWNmNGZmIi8+PC9nPjwvZz48Zz48Zz48cGF0aCBkPSJtMzI4LjIwNSAyNzMuODYzYy0yLjAwOSAwLTMuOTM3LS43OTQtNS4zNjItMi4yMS0xLjQzMy0xLjQyMi0yLjI0My0zLjM1Ni0yLjI1LTUuMzc1IDAgMC0uMDg1LTIzLjc4NS0uMDg1LTMyLjkwNSAwLTcuNDgxLS4wNDgtMzIuNzE5LS4wNDgtMzIuNzE5LS4wMDQtMi4wMjEuNzk3LTMuOTYxIDIuMjI0LTUuMzkxIDEuNDI4LTEuNDMxIDMuMzY3LTIuMjM0IDUuMzg4LTIuMjM0aDE4LjU4M2MyMC40IDAgMzQuMTA3IDE2LjI0MiAzNC4xMDcgNDAuNDE3IDAgMjIuOTk2LTE0LjA1OSAzOS45MzMtMzMuNDMxIDQwLjI3Mi01LjI4OS4wOTItMTguNTM1LjE0My0xOS4wOTcuMTQ1LS4wMSAwLS4wMTkgMC0uMDI5IDB6bTcuNDkzLTY1LjYxMWMuMDE0IDguMDcuMDM0IDIwLjI5My4wMzQgMjUuMTIyIDAgNS43ODIuMDM1IDE3LjQ2OC4wNTkgMjUuMjI4IDQuMDQzLS4wMjQgOC42OTYtLjA2IDExLjI3NS0uMTA1IDEyLjc2MS0uMjIzIDE4LjQ3NC0xMi43NDMgMTguNDc0LTI1LjA1MSAwLTEyLjE4LTQuOTYtMjUuMTk0LTE4Ljg4NC0yNS4xOTR6IiBmaWxsPSIjZWNmNGZmIi8+PC9nPjwvZz48cGF0aCBkPSJtNTA0LjM4OCA0NC4yMjNoLTU1LjM2Yy00LjIwNCAwLTcuNjEyLTMuNDA4LTcuNjEyLTcuNjExczMuNDA5LTcuNjEyIDcuNjEzLTcuNjEyaDU1LjM2YzQuMjA0IDAgNy42MTIgMy40MDggNy42MTIgNy42MTFzLTMuNDA4IDcuNjEyLTcuNjEzIDcuNjEyeiIgZmlsbD0iIzRhODBhYSIvPjxwYXRoIGQ9Im00ODMuODg1IDc3LjAyOWgtMzQuODU2Yy00LjIwNCAwLTcuNjEyLTMuNDA4LTcuNjEyLTcuNjExczMuNDA3LTcuNjExIDcuNjEyLTcuNjExaDM0Ljg1NmM0LjIwNCAwIDcuNjExIDMuNDA4IDcuNjExIDcuNjExcy0zLjQwNyA3LjYxMS03LjYxMSA3LjYxMXoiIGZpbGw9IiM0YTgwYWEiLz48cGF0aCBkPSJtNDgzLjg4NSAxMDkuODM0aC0zNC44NTZjLTQuMjA0IDAtNy42MTItMy40MDgtNy42MTItNy42MTFzMy40MDctNy42MTEgNy42MTItNy42MTFoMzQuODU2YzQuMjA0IDAgNy42MTEgMy40MDggNy42MTEgNy42MTFzLTMuNDA3IDcuNjExLTcuNjExIDcuNjExeiIgZmlsbD0iIzRhODBhYSIvPjxwYXRoIGQ9Im01MDQuMzg4IDIwOC4yNTJoLTU1LjM2Yy00LjIwNCAwLTcuNjEyLTMuNDA4LTcuNjEyLTcuNjExIDAtNC4yMDQgMy40MDctNy42MTEgNy42MTItNy42MTFoNTUuMzZjNC4yMDQgMCA3LjYxMiAzLjQwOCA3LjYxMiA3LjYxMXMtMy40MDcgNy42MTEtNy42MTIgNy42MTF6IiBmaWxsPSIjNGE4MGFhIi8+PHBhdGggZD0ibTQ4My44ODUgMjQxLjA1N2gtMzQuODU2Yy00LjIwNCAwLTcuNjEyLTMuNDA4LTcuNjEyLTcuNjExIDAtNC4yMDQgMy40MDctNy42MTEgNy42MTItNy42MTFoMzQuODU2YzQuMjA0IDAgNy42MTEgMy40MDggNy42MTEgNy42MTEuMDAxIDQuMjA0LTMuNDA3IDcuNjExLTcuNjExIDcuNjExeiIgZmlsbD0iIzRhODBhYSIvPjxwYXRoIGQ9Im00ODMuODg1IDI3My44NjNoLTM0Ljg1NmMtNC4yMDQgMC03LjYxMi0zLjQwOC03LjYxMi03LjYxMXMzLjQwNy03LjYxMiA3LjYxMi03LjYxMmgzNC44NTZjNC4yMDQgMCA3LjYxMSAzLjQwOCA3LjYxMSA3LjYxMnMtMy40MDcgNy42MTEtNy42MTEgNy42MTF6IiBmaWxsPSIjNGE4MGFhIi8+PGc+PHBhdGggZD0ibTg0Ljg3MyA0OTguNjg2IDEwLjQzOSA3LjU3NGMxLjczMyAxLjI1NyAzLjgxOSAxLjkzNCA1Ljk2IDEuOTM0aDE3My41NjhjNC4xIDAgNy4wMjgtMy45NjkgNS44MTgtNy44ODdsLTguMjcxLTI2Ljc3MWMtLjI0NS0uNzkzLS4zOTItMS42MTMtLjQzNy0yLjQ0MWwtMS45NjYtMzUuOTE4Yy0uMTgzLTMuMzQ4LS43NzYtNi42NjEtMS43NjYtOS44NjVsLTMxLjk1NC0xMDMuNDNjLTMuMjgyLTEwLjYyMi0xNC4zMzctMTcuMTE3LTI1LjA2OS0xNC4yMTUtMTEuMjY3IDMuMDQ3LTE3LjY3MiAxNC43OTQtMTQuMjU2IDI1Ljg1bC02LjIxLTIwLjFjLTMuMjgyLTEwLjYyMi0xNC4zMzctMTcuMTE3LTI1LjA2OS0xNC4yMTUtMTEuMjY3IDMuMDQ3LTE3LjY3MiAxNC43OTQtMTQuMjU2IDI1Ljg1bC01LjkwNy0xOS4xMmMtMy4yODItMTAuNjIyLTE0LjMzNy0xNy4xMTgtMjUuMDY5LTE0LjIxNS0xMS4yNjcgMy4wNDctMTcuNjcyIDE0Ljc5NC0xNC4yNTYgMjUuODVsLTIwLjQzMi02Ni4xMzdjLTMuMjgyLTEwLjYyMi0xNC4zMzctMTcuMTE4LTI1LjA2OS0xNC4yMTUtMTEuMjY3IDMuMDQ3LTE3LjY3MiAxNC43OTQtMTQuMjU2IDI1Ljg1bDM2LjMxMyAxMTcuNTRjLTMuNDE2LTExLjA1Ni0xNS4zMy0xNy4xNDQtMjYuMzUzLTEzLjMwNC0xMC40OTkgMy42NTctMTUuOTY0IDE1LjI1Ni0xMi42ODIgMjUuODc4bDI2LjA4MSA4NC40MmMyLjYxOSA4LjQ3OCA3LjkxNyAxNS44NzcgMTUuMDk5IDIxLjA4N3oiIGZpbGw9IiNmZmRkY2UiLz48cGF0aCBkPSJtMTYwLjM1IDUwOC4xOTRoMTE0LjQ5YzQuMSAwIDcuMDI4LTMuOTY5IDUuODE4LTcuODg3bC04LjI3MS0yNi43NzFjLS4yNDUtLjc5My0uMzkyLTEuNjEzLS40MzctMi40NDFsLTEuOTY2LTM1LjkyYy0uMTgzLTMuMzQ3LS43NzYtNi42Ni0xLjc2Ni05Ljg2MmwtMjAuNTM2LTY2LjQ3M2MtNy45MzEgNDQuMzk1LTI5LjQ0NiAxMDcuNjk0LTg3LjMzMiAxNDkuMzU0eiIgZmlsbD0iI2ZmY2JiZSIvPjwvZz48ZyBmaWxsPSIjZmZjYmJlIj48cGF0aCBkPSJtNjUuMjA2IDIzNi41NTIgNDQuNDg1IDE0My45OWMxLjAxIDMuMjY4IDQuMDIgNS4zNjcgNy4yNzEgNS4zNjcuNzQzIDAgMS41LS4xMSAyLjI0OS0uMzQxIDQuMDE3LTEuMjQxIDYuMjY3LTUuNTAzIDUuMDI2LTkuNTE5bC0zOC41MjUtMTI0LjY5OGMtMi44NDUtOS4wNzktMTEuMzc0LTE1LjEwNC0yMC41MDYtMTQuNzk5eiIvPjxwYXRoIGQ9Im0xMjQuOTYzIDI5MS4wNTMgMjMuOTA4IDc3LjM4NGMxLjAxIDMuMjY4IDQuMDIgNS4zNjcgNy4yNzEgNS4zNjcuNzQzIDAgMS41MDEtLjExIDIuMjQ5LS4zNDEgNC4wMTctMS4yNDEgNi4yNjctNS41MDMgNS4wMjYtOS41MTlsLTE3Ljk0OS01OC4wOTZjLTIuODQ2LTkuMDc3LTExLjM3NS0xNS4xLTIwLjUwNS0xNC43OTV6Ii8+PHBhdGggZD0ibTE3MC4xOTUgMjk4LjUzOSAxNy44NTUgNTcuNzk0YzEuMDEgMy4yNjggNC4wMiA1LjM2NyA3LjI3MSA1LjM2Ny43NDMgMCAxLjUwMS0uMTEgMi4yNDktLjM0MSA0LjAxNy0xLjI0MSA2LjI2Ny01LjUwMyA1LjAyNi05LjUxOWwtMTEuODk3LTM4LjUwOGMtMi44NDYtOS4wNzYtMTEuMzc0LTE1LjA5OC0yMC41MDQtMTQuNzkzeiIvPjxwYXRoIGQ9Im0yMTUuNzY2IDMwNy4wMDQgMTEuNzQgMzcuOTk5YzEuMDEgMy4yNjggNC4wMiA1LjM2NyA3LjI3MSA1LjM2Ny43NDMgMCAxLjUtLjExIDIuMjQ5LS4zNDEgMy44MjQtMS4xODEgNi4wNC01LjEwMiA1LjE3My04Ljk0MWwtNS45MzQtMTkuMjA2Yy0yLjgxNi05LjExMi0xMS4zNTMtMTUuMTY3LTIwLjQ5OS0xNC44Nzh6Ii8+PHBhdGggZD0ibTgyLjUyNCAzODAuMDQ1Yy0yLjk4Mi04Ljc1LTExLjMzNi0xNC4yMTktMjAuMjE0LTEzLjg1NWwxOS42NSA2My42MDQtNC42MTkgOC43NWMtMS45NjMgMy43MTgtLjU0MSA4LjMyMiAzLjE3NiAxMC4yODUgMS4xMzQuNTk5IDIuMzQ5Ljg4MiAzLjU0Ny44ODIgMi43MzIgMCA1LjM3NC0xLjQ3NSA2LjczOC00LjA1OWw2LjA5Mi0xMS41MzljLjk0My0xLjc4NSAxLjEzNy0zLjg3Mi41NDEtNS44MDF6Ii8+PC9nPjwvZz48L3N2Zz4="
                    />
                  </div>
                  <div className="sales__section-img--accessories-text">Brand/Model</div>
                </div>
              </div>
            )}
            {currentMake ? (
              <Card className="sales__selectarea-card" size="small" title="Selected model">
                <div className="flex">
                  <section className="sales__selectarea-card-column">
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Model</div>
                      <div className="sales__selectarea-card-row-right--make">{currentMake.title}</div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Series</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentMake.series === null || currentMake.series === '' ? '-' : currentMake.series}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Length</div>
                      <div className="sales__selectarea-card-row-right--make">{currentMake.length}mm</div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Config</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentMake.config ? currentMake.config : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Torque</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentMake.torque ? currentMake.torque : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Horsepower</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentMake.horsepower ? `${currentMake.horsepower}PC` : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Emission</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentMake.emission ? currentMake.emission : '-'}
                      </div>
                    </div>
                  </section>
                  <section className="sales__selectarea-card-column">
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Tyre Count</div>
                      <div className="sales__selectarea-card-row-right--make">{currentMake.tire}</div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Wheelbase</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentMake.wheelbase.title ? `${currentMake.wheelbase.title}mm` : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Transmission</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentMake.transmission ? currentMake.transmission : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Engine Capacity</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentMake.engine_cap ? `${currentMake.engine_cap}CC` : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">Year</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentMake.year ? currentMake.year : '-'}
                      </div>
                    </div>
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left--make">GVW</div>
                      <div className="sales__selectarea-card-row-right--make">
                        {currentMake.gvw ? `${currentMake.gvw}kg` : '-'}
                      </div>
                    </div>
                  </section>
                </div>
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">Price</div>
                  <div className="sales__selectarea-card-row-right sales__selectarea-card-price">
                    RM
                    <NumberFormat value={currentMake?.price} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="sales__selectarea-card" size="small" title="Selected model">
                <div className="sales__selectarea-card-row">
                  <div className="sales__selectarea-card-row-left">None</div>
                </div>
              </Card>
            )}
          </div>

          {/* Selections on the right */}
          <div className="sales__section-right">
            <div className="sales__selectarea-desc">
              This page is to choose your preferred whip.
              <br />
              Choose your trusted or preferred brand, HINO is cool.
            </div>
            <div className="sales__selectarea-innerdiv">
              <div>Select the model of your vehicle</div>
              <>
                {salesBrandsArray && (
                  <>
                    {salesBrandsArray.map((brand) => {
                      // brand here is an object of brand containing values of series array
                      // {["HINO"]: TSalesMakeSeries[]}
                      //  To extract the array out, we have to do this
                      // since we are already looping the object, when we do Object.keys
                      // we will obtain only 1 value ['DAIHATSU'] for example, so thats why we use 0 here as index
                      let brandName = Object.keys(brand)[0];
                      return (
                        <div className="sales__selectarea--brand" key={uuidv4()}>
                          <div>
                            <Divider
                              orientation="left"
                              className="sales__selectarea-categorydivider sales__selectarea-categorydivider--brand"
                            >
                              {brandName}
                            </Divider>
                          </div>
                          {/* Groups of different series  */}
                          {brand[brandName] &&
                            brand[brandName].map((series) => {
                              // same things goes to series
                              // series here is an object of series containing array of its object
                              // {['300 SERIES']: TSalesMakeSeries[]}
                              let seriesName = Object.keys(series)[0];
                              return (
                                <React.Fragment key={uuidv4()}>
                                  {seriesName !== null && seriesName !== '' && (
                                    <div className="sales__selectarea-seriestitle">{seriesName}</div>
                                  )}

                                  <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                                    {/* loop the makes array */}
                                    {series[seriesName].map((make) => {
                                      return (
                                        <div
                                          key={uuidv4()}
                                          className={`sales__selectarea-button                                            
                                           ${currentMake?.id === make.id ? 'active' : ''}`}
                                          onClick={() => {
                                            //  if currentMake contains an id
                                            if (currentMake?.id === make.id) {
                                              // reset the selection
                                              setCurrentMake(null); //set content to null
                                              setCurrentOrderObj({
                                                ...currentOrderObj,
                                                makeObj: null,
                                              });
                                            } else {
                                              setCurrentMake(make); //select the content of the preview card
                                              setCurrentOrderObj({
                                                ...currentOrderObj,
                                                makeObj: {
                                                  brandName: brandName,
                                                  seriesName: seriesName,
                                                  seriesObj: make,
                                                },
                                              });
                                            }
                                          }}
                                        >
                                          <div>{make.title}</div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </React.Fragment>
                              );
                            })}
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            </div>
          </div>
        </section>

        <div className="sales__length-btn-div">
          <Button
            className="sales__length-btn margin_r-1"
            onClick={() => {
              prev();
              setCurrentMake(null);
            }}
          >
            Back
          </Button>
          {currentStep < totalSteps - 1 && (
            <Button
              className="sales__length-btn"
              type="primary"
              disabled={currentMake === null}
              onClick={() => {
                // At the end of the choosing phase after user done choosing brand
                // user click on complete button and we store the current order object
                // into the localOrdersArray in redux so we can save it in localstorage
                let copyArray = [...localOrdersArray];
                copyArray.push(currentOrderObj);
                onStoreLocalOrders(copyArray);
                next();
              }}
            >
              Complete
            </Button>
          )}
        </div>
      </section>
    </>
  );

  let overviewSection = (
    <section className="sales__section">
      <div className="sales__section-overview">
        <div className="sales__breadcrumb-outerdiv">
          <Breadcrumb separator=">" className="sales__breadcrumb">
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Tyre Count</span>
              <span className="sales__breadcrumb-highlight">({currentTyre})</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Length</span>
              <span className="sales__breadcrumb-highlight">({currentLength?.title}ft)</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Body</span>
              {currentBodyLength && (
                <span className="sales__breadcrumb-highlight">({currentBodyLength?.body.title})</span>
              )}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Accessory</span>
              <span className="sales__breadcrumb-highlight">({totalAccessoriesArrayLength} Items)</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Brand</span>
              {currentMake && <span className="sales__breadcrumb-highlight">({currentMake?.title})</span>}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Overview</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider orientation="left">
          <div className="sales__section-header">Overview</div>
        </Divider>

        <div>
          {localOrdersArray && <div>Total: {localOrdersArray.length}items</div>}
          {localOrdersArray &&
            localOrdersArray.length > 0 &&
            [...localOrdersArray].reverse().map((order, index) => {
              type miscellaneousType = {
                title: string;
                price: number;
              };
              let miscellaneousArray = [
                {
                  title: 'Admin fees, handling charges, weighing',
                  price: 500,
                },
                {
                  title: 'Signwriting & luminous sticker',
                  price: 250,
                },
                {
                  title: 'Weighing / Inspection Fee (Puspakom)',
                  price: 650,
                },
                {
                  title: 'JPJ Booking Number',
                  price: 325,
                },
                {
                  title: 'HQS Final Inspection',
                  price: 200,
                },
              ];

              type insuranceType = {
                title: string;
                price: number;
              };
              let insuranceArray = [
                {
                  title: 'Road tax (1year)',
                  price: 1015,
                },
                {
                  title: 'JPJ Registration & E Hak Milik ',
                  price: 110,
                },
                {
                  title: 'INSURANCE PREMIUM (windscreen included)  ',
                  price: 4733.96,
                },
              ];

              let totalAccessoriesPrice = 0;

              // get total of general accessories
              let generalAccessoriesTotalPrice = order.generalAccessoriesArray.reduce(
                (currentTotal: number, accessoryObj: TReceivedAccessoryObj) => {
                  return currentTotal + accessoryObj.price;
                },
                0,
              );

              // get total of body related accessories
              let bodyRelatedAccessoriesTotalPrice = order.bodyRelatedAccessoriesArray.reduce(
                (currentTotal: number, accessoryObj: TReceivedAccessoryObj) => {
                  return currentTotal + accessoryObj.price;
                },
                0,
              );
              // get total of dimension related accessories
              let dimensionRelatedAccessoriesTotalPrice = order.dimensionRelatedAccessoriesArray.reduce(
                (currentTotal: number, dimensionAccessoryObj: TReceivedDimensionAccessoryObj) => {
                  return currentTotal + dimensionAccessoryObj.price;
                },
                0,
              );

              totalAccessoriesPrice =
                generalAccessoriesTotalPrice + bodyRelatedAccessoriesTotalPrice + dimensionRelatedAccessoriesTotalPrice;

              let miscellaneousFees = miscellaneousArray.reduce(
                (currentTotal: number, miscellaneousObj: miscellaneousType) => {
                  return currentTotal + miscellaneousObj.price;
                },
                0,
              );

              /* ===================================================== */
              // Model subtotal price - add all except insurance fees
              /* ===================================================== */
              let modelSubtotalPrice = 0;
              if (order.makeObj && order.bodyLengthObj) {
                modelSubtotalPrice =
                  order.makeObj.seriesObj.price + order.bodyLengthObj.price + totalAccessoriesPrice + miscellaneousFees;
              }

              /* ======================== */
              // Insurance subtotal price
              /* ====================== */
              let insuranceSubtotalPrice = insuranceArray.reduce(
                (currentTotal: number, insuranceObj: insuranceType) => {
                  return currentTotal + insuranceObj.price;
                },
                0,
              );

              /* ====================== */
              // Discount Price
              /* ====================== */
              let discountPrice = -6000;

              let prediscountTotalPrice = modelSubtotalPrice + insuranceSubtotalPrice;

              let grandTotalPrice = modelSubtotalPrice + insuranceSubtotalPrice + discountPrice;

              let moreOptionsDropdown = (
                <Menu>
                  <Menu.Item danger onClick={() => onRemoveAnOrder(index, localOrdersArray)}>
                    Remove from order
                  </Menu.Item>
                </Menu>
              );
              /* ==================================================== */
              // RENDER
              /* ==================================================== */
              return (
                <div className="sales__overview-row-outerdiv" key={uuidv4()}>
                  <div className="sales__overview-more">
                    <div className="sales__overview-more-icon-div">
                      <Dropdown trigger={['click']} overlay={moreOptionsDropdown} placement="bottomRight">
                        <DownSquareOutlined className="sales__overview-more-icon" />
                      </Dropdown>
                    </div>
                  </div>
                  <div className="sales__overview-row">
                    {/* Image div on the left */}
                    <section className="sales__overview-row-image-div">
                      {/* Show make images */}
                      {order.makeObj && order.makeObj?.seriesObj.images.length > 0 ? (
                        <img
                          alt={order.makeObj?.seriesObj.images[0].filename}
                          src={order.makeObj?.seriesObj.images[0].url}
                        />
                      ) : (
                        <img className="sales__overview-row-image" src={img_not_available_link} alt="not available" />
                      )}
                    </section>

                    {/* Content div on the right */}
                    <section className="sales__overview-row-content">
                      {/* ------------ The largest header on top -------------- */}
                      <div className="flex-align-center space-between margin_b-1">
                        <span className="sales__overview-row-content-header">
                          {order.lengthObj?.title}ft {order.bodyLengthObj?.body.title}
                        </span>
                        <span className="sales__overview-row-content-header-price--prediscount">
                          RM&nbsp;
                          <NumberFormat
                            displayType={'text'}
                            thousandSeparator={true}
                            value={prediscountTotalPrice.toFixed(2)}
                          />
                        </span>
                      </div>

                      <div className="flex space-between">
                        {/* ======================= */}
                        {/* Model Series  */}
                        {/* ======================= */}
                        <div className="sales__selectarea-seriestitle">
                          <span className="sales__overview-row-content-subheader">
                            {`${order.makeObj?.brandName} ${order.makeObj?.seriesName} ${order.makeObj?.seriesObj.title}`}
                          </span>
                        </div>
                        <span className="sales__overview-row-content-subheader-price">
                          <NumberFormat
                            displayType={'text'}
                            thousandSeparator={true}
                            value={modelSubtotalPrice.toFixed(2)}
                          />
                        </span>
                      </div>
                      <Collapse ghost expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                        <Panel className="sales__overview-panel" header="View more" key="model">
                          <ol className="sales__overview-list">
                            <div className="sales__overview-smalltitle">Cargo</div>
                            <li>
                              {/* ------------ Chassis price ----------- */}
                              <div className="flex space-between">
                                <span>
                                  Chassis Price:&nbsp;
                                  <span className="sales__overview-highlight-model">
                                    {order.makeObj && order.makeObj?.seriesObj.year === null
                                      ? /* if year doesnt exist, dont show anything except the model name*/
                                        order.makeObj.seriesObj.title
                                      : order.makeObj &&
                                        /* else check if year is equal to current, show "NEW MODEL YEAR CURRENTYEAR - model name"*/
                                        parseInt(order.makeObj.seriesObj.year) === parseInt(moment().year().toString())
                                      ? `NEW MODEL YEAR ${order.makeObj.seriesObj.year} - ${order.makeObj.seriesObj.title}`
                                      : /* else show MODEL YEAR - model name */
                                        order.makeObj &&
                                        `MODEL ${order.makeObj.seriesObj.year} ${order.makeObj.seriesObj.title}`}
                                  </span>
                                </span>
                                <span>
                                  <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    value={order.makeObj?.seriesObj.price.toFixed(2)}
                                  />
                                </span>
                              </div>
                            </li>
                            <li>
                              {/* ----------------- Body price ----------------- */}
                              <div className="flex space-between">
                                <span>
                                  Body Price:&nbsp;
                                  <span className="sales__overview-highlight-model">
                                    {`${order.bodyLengthObj?.length.title}ft ${order.bodyLengthObj?.body.title}`}
                                  </span>
                                </span>
                                <span>
                                  <NumberFormat
                                    value={order.bodyLengthObj?.price.toFixed(2)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                  />
                                </span>
                              </div>
                            </li>
                            {/* more info for model */}
                            <Collapse ghost className="sales__overview-panel--modeldetails">
                              <Panel
                                style={{ padding: 0 }}
                                showArrow={false}
                                className="sales__overview-panel"
                                header={
                                  <>
                                    <InfoCircleOutlined /> Click here to view more specs
                                  </>
                                }
                                key="model"
                              >
                                {order.makeObj?.seriesObj.torque !== null && order.makeObj?.seriesObj.torque !== '' && (
                                  <div className="sales__overview-panel-specs-row">
                                    <span className="sales__overview-panel-specs-title">Torque:</span>
                                    <span className="sales__overview-panel-specs-value">
                                      {order.makeObj?.seriesObj.torque}
                                    </span>
                                  </div>
                                )}
                                {order.makeObj?.seriesObj.config !== null && order.makeObj?.seriesObj.config !== '' && (
                                  <div className="sales__overview-panel-specs-row">
                                    <span className="sales__overview-panel-specs-title">Config:</span>
                                    <span className="sales__overview-panel-specs-value">
                                      {order.makeObj?.seriesObj.config}
                                    </span>
                                  </div>
                                )}
                                {order.makeObj?.seriesObj.emission !== null &&
                                  order.makeObj?.seriesObj.emission !== '' && (
                                    <div className="sales__overview-panel-specs-row">
                                      <span className="sales__overview-panel-specs-title">Emission:</span>
                                      <span className="sales__overview-panel-specs-value">
                                        {order.makeObj?.seriesObj.emission}
                                      </span>
                                    </div>
                                  )}
                                {order.makeObj?.seriesObj.length !== null && (
                                  <div className="sales__overview-panel-specs-row">
                                    <span className="sales__overview-panel-specs-title">Length:</span>
                                    <span className="sales__overview-panel-specs-value">
                                      {order.makeObj?.seriesObj.length}mm
                                    </span>
                                  </div>
                                )}
                                {order.makeObj?.seriesObj.horsepower !== null &&
                                  order.makeObj?.seriesObj.horsepower !== '' && (
                                    <div className="sales__overview-panel-specs-row">
                                      <span className="sales__overview-panel-specs-title">Horsepower:</span>
                                      <span className="sales__overview-panel-specs-value">
                                        {order.makeObj?.seriesObj.horsepower}PS
                                      </span>
                                    </div>
                                  )}
                                {order.makeObj?.seriesObj.year !== null && order.makeObj?.seriesObj.year !== '' && (
                                  <div className="sales__overview-panel-specs-row">
                                    <span className="sales__overview-panel-specs-title">Year:</span>
                                    <span className="sales__overview-panel-specs-value">
                                      {order.makeObj?.seriesObj.year}
                                    </span>
                                  </div>
                                )}

                                {order.makeObj?.seriesObj.tire !== null && order.makeObj?.seriesObj.tire !== '' && (
                                  <div className="sales__overview-panel-specs-row">
                                    <span className="sales__overview-panel-specs-title">Tyre Count:</span>
                                    <span className="sales__overview-panel-specs-value">
                                      {order.makeObj?.seriesObj.tire} tires
                                    </span>
                                  </div>
                                )}
                                {order.makeObj?.seriesObj.wheelbase.title !== null &&
                                  order.makeObj?.seriesObj.wheelbase.title !== '' && (
                                    <div className="sales__overview-panel-specs-row">
                                      <span className="sales__overview-panel-specs-title">Wheelbase:</span>
                                      <span className="sales__overview-panel-specs-value">
                                        {order.makeObj?.seriesObj.wheelbase.title}mm
                                      </span>
                                    </div>
                                  )}
                                {order.makeObj?.seriesObj.transmission !== null &&
                                  order.makeObj?.seriesObj.transmission !== '' && (
                                    <div className="sales__overview-panel-specs-row">
                                      <span className="sales__overview-panel-specs-title">Transmission:</span>
                                      <span className="sales__overview-panel-specs-value">
                                        {order.makeObj?.seriesObj.transmission}
                                      </span>
                                    </div>
                                  )}
                                {order.makeObj?.seriesObj.engine_cap !== null &&
                                  order.makeObj?.seriesObj.engine_cap !== '' && (
                                    <div className="sales__overview-panel-specs-row">
                                      <span className="sales__overview-panel-specs-title">Engine Capacity:</span>
                                      <span className="sales__overview-panel-specs-value">
                                        {order.makeObj?.seriesObj.engine_cap}CC
                                      </span>
                                    </div>
                                  )}
                                {order.makeObj?.seriesObj.gvw !== null && order.makeObj?.seriesObj.gvw !== '' && (
                                  <div className="sales__overview-panel-specs-row">
                                    <span className="sales__overview-panel-specs-title">Gross Vehicle Weight:</span>
                                    <span className="sales__overview-panel-specs-value">
                                      {order.makeObj?.seriesObj.gvw}kg
                                    </span>
                                  </div>
                                )}
                              </Panel>
                            </Collapse>
                            {/* Accessories section */}
                            <div className="sales__overview-smalltitle">Accessories</div>
                            <>
                              {order.generalAccessoriesArray &&
                                order.generalAccessoriesArray.length > 0 &&
                                order.generalAccessoriesArray.map((accessory) => (
                                  <li key={uuidv4()}>
                                    <div className="flex space-between">
                                      <span>{accessory.title} </span>
                                      <span>
                                        <NumberFormat
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          value={accessory.price.toFixed(2)}
                                        />
                                      </span>
                                    </div>
                                  </li>
                                ))}
                            </>
                            <>
                              {order.bodyRelatedAccessoriesArray &&
                                order.bodyRelatedAccessoriesArray.length > 0 &&
                                order.bodyRelatedAccessoriesArray.map((accessory) => (
                                  <li key={uuidv4()}>
                                    <div className="flex space-between">
                                      <span>{accessory.title} </span>
                                      <span>
                                        <NumberFormat
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          value={accessory.price.toFixed(2)}
                                        />
                                      </span>
                                    </div>
                                  </li>
                                ))}
                            </>
                            <>
                              {order.dimensionRelatedAccessoriesArray &&
                                order.dimensionRelatedAccessoriesArray.length > 0 &&
                                order.dimensionRelatedAccessoriesArray.map((dimension) => (
                                  <li key={uuidv4()}>
                                    <div className="flex space-between">
                                      <span> {dimension.accessory.title} </span>
                                      <span>
                                        <NumberFormat
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          value={dimension.price.toFixed(2)}
                                        />
                                      </span>
                                    </div>
                                  </li>
                                ))}
                            </>

                            {/* Processing fees section */}
                            <div className="sales__overview-smalltitle">Processing fees</div>
                            {miscellaneousArray.map((item) => (
                              <li key={uuidv4()}>
                                <div className="flex space-between">
                                  <span>{item.title}</span>
                                  <span>
                                    <NumberFormat
                                      value={item.price.toFixed(2)}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                    />
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ol>
                          {/* Cargo subtotal */}
                          <div className="sales__overview-subtotal-outerdiv">
                            <span className="sales__overview-subtotal-text">SUBTOTAL</span>
                            <div className="sales__overview-subtotal">
                              <NumberFormat
                                value={modelSubtotalPrice.toFixed(2)}
                                displayType={'text'}
                                thousandSeparator={true}
                              />
                            </div>
                          </div>
                        </Panel>
                      </Collapse>

                      {/* ======================== */}
                      {/* Road Tax and Insurance */}
                      {/* ======================== */}
                      <div className="flex space-between">
                        <span className="sales__overview-row-content-subheader">Road Tax and Insurance</span>
                        <span className="sales__overview-row-content-subheader-price">
                          <NumberFormat
                            displayType={'text'}
                            thousandSeparator={true}
                            value={insuranceSubtotalPrice.toFixed(2)}
                          />
                        </span>
                      </div>
                      <Collapse ghost expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                        <Panel className="sales__overview-panel" header="View more" key="insurance">
                          <ul className="sales__overview-list">
                            {insuranceArray.map((item) => (
                              <li key={uuidv4()}>
                                <div className="flex space-between">
                                  <span> {item.title}</span>
                                  <span>
                                    <NumberFormat
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      value={item.price.toFixed(2)}
                                    />
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                          {/* Insurance subtotal */}
                          <div className="sales__overview-subtotal-outerdiv">
                            <span className="sales__overview-subtotal-text">SUBTOTAL</span>
                            <div className="sales__overview-subtotal">
                              <NumberFormat
                                value={insuranceSubtotalPrice.toFixed(2)}
                                displayType={'text'}
                                thousandSeparator={true}
                              />
                            </div>
                          </div>
                        </Panel>
                      </Collapse>

                      <hr />
                      {/* ======================== */}
                      {/* Total Price */}
                      {/* ======================== */}
                      <div className="flex space-between">
                        <span className="sales__overview-row-content-subheader">Total Price</span>
                        <span className="sales__overview-row-content-subheader-price--prediscount">
                          <NumberFormat
                            displayType={'text'}
                            thousandSeparator={true}
                            value={prediscountTotalPrice.toFixed(2)}
                          />
                        </span>
                      </div>

                      {/* ======================== */}
                      {/* DISCOUNT */}
                      {/* ======================== */}
                      <div className="flex space-between">
                        <span className="sales__overview-row-content-subheader sales__overview-row-content-subheader--discount">
                          Discount
                        </span>
                        <span className="sales__overview-row-content-subheader-price">
                          -&nbsp;
                          <NumberFormat
                            displayType={'text'}
                            thousandSeparator={true}
                            value={Math.abs(discountPrice).toFixed(2)}
                          />
                        </span>
                      </div>
                      <hr />
                      {/* ======================== */}
                      {/* TOTAL ON THE ROAD PRICE */}
                      {/* ======================== */}
                      <div className="flex-align-center space-between">
                        <span className="sales__overview-row-content-subheader--totalroadprice">
                          TOTAL ON THE ROAD PRICE
                        </span>

                        <span className="sales__overview-row-content-header-price">
                          RM&nbsp;
                          <NumberFormat
                            displayType={'text'}
                            thousandSeparator={true}
                            value={grandTotalPrice.toFixed(2)}
                          />
                        </span>
                      </div>
                    </section>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Button
        onClick={() => {
          setCurrentStep(0);
          setCurrentLength(null);
          setCurrentTyre(null);
          setCurrentBodyLength(null);
          setCurrentAccessory(null);
          setCurrentMake(null);
        }}
      >
        Go back to first page
      </Button>
    </section>
  );

  const steps = [
    { step: 1, title: STEPS_TYRE, content: tyreSection },
    {
      step: 2,
      title: STEPS_LENGTH,
      content: lengthSection,
    },
    {
      step: 3,
      title: STEPS_BODY,
      content: bodyLengthSection,
    },
    {
      step: 4,
      title: STEPS_ACCESSORY,
      content: bodyAccessorySection,
    },
    { step: 5, title: STEPS_BRAND, content: brandSection },
    { step: 6, title: 'Overview', content: overviewSection },
  ];

  /* =========================== */
  /*         useEffect           */
  /* =========================== */

  useEffect(() => {
    setTotalSteps(steps.length);
  }, [setTotalSteps, steps]);

  useEffect(() => {
    // when user clicks on a length and the body length returns succeed, user proceed to the next step
    if (
      getSalesMakesSucceed ||
      getSalesLengthsSucceed ||
      getSalesBodyLengthsSucceed ||
      getSalesBodyAccessoriesSucceed
    ) {
      // Clear the state
      onClearSalesState();
      if (loading === false) {
        // go to the next step only after loading is false
        setCurrentStep(currentStep + 1);
      }
    }
  }, [
    loading,
    currentStep,
    setCurrentStep,
    onClearSalesState,
    getSalesMakesSucceed,
    getSalesLengthsSucceed,
    getSalesBodyLengthsSucceed,
    getSalesBodyAccessoriesSucceed,
  ]);

  /* ====================================================== */
  /* ====================================================== */
  /* ====================================================== */
  return (
    <>
      <NavbarComponent activePage="sales" />

      <div className="sales__outerdiv">
        <div className="sales__innerdiv">
          <div className="sales__steps-content">
            <Container>
              <div className="sales__steps-div">
                <Steps current={currentStep}>
                  {steps.map((item) => (
                    <Step
                      key={uuidv4()}
                      icon={currentStep + 1 === item.step && loading ? <LoadingOutlined /> : null}
                      title={
                        <div className="sales__steps-title">
                          <div>{item.title}</div>
                          {/* <div className="sales__steps-additionalinfo">
                              {currentTyre && item.title === STEPS_TYRE && (
                                <span className="sales__breadcrumb-highlight">({currentTyre})</span>
                              )}
                              {currentLength && item.title === STEPS_LENGTH && (
                                <span className="sales__breadcrumb-highlight">({currentLength?.title}ft)</span>
                              )}
                              {currentBodyLength && item.title === STEPS_BODY && (
                                <span className="sales__breadcrumb-highlight">({currentBodyLength?.body.title})</span>
                              )}
                              {currentAccessory && item.title === STEPS_ACCESSORY && (
                                <span className="sales__breadcrumb-highlight">
                                  ({totalAccessoriesArrayLength} Items)
                                </span>
                              )}
                              {currentMake && item.title === STEPS_BRAND && (
                                <span className="sales__breadcrumb-highlight">{currentMake.series}</span>
                              )}
                            </div> */}
                        </div>
                      }
                    />
                  ))}
                </Steps>
              </div>
            </Container>
            <div className="sales__steps-content-outerdiv">
              <Container>{steps[currentStep].content}</Container>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

interface StateProps {
  loading?: boolean;
  errorMessage?: string | null;
  // Arrays
  bodyLengthsArray?: TReceivedBodyLengthObj[] | null;
  salesBrandsArray?: TReceivedSalesMakesObj[] | null;
  generalAccessoriesArray: TReceivedAccessoryObj[] | null;
  dimensionRelatedAccessoriesArray: TReceivedDimensionAccessoryObj[] | null;
  bodyRelatedAccessoriesArray: TReceivedAccessoryObj[] | null;
  // length category object
  lengthsCategoriesArray?: TReceivedSalesLengthCategoryObj[] | null;
  // array for local orders
  localOrdersArray: TLocalOrderObj[];
  // Bool for get api
  getSalesMakesSucceed?: boolean | null;
  getSalesLengthsSucceed?: boolean | null;
  getSalesBodyLengthsSucceed?: boolean | null;
  getSalesBodyAccessoriesSucceed?: boolean | null;
}

const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  if ('sales' in state) {
    return {
      loading: state.sales.loading,
      errorMessage: state.sales.errorMessage,
      // Arrays
      localOrdersArray: state.sales.localOrdersArray,
      bodyLengthsArray: state.sales.bodyLengthsArray,
      salesBrandsArray: state.sales.salesBrandsArray,
      lengthsCategoriesArray: state.sales.lengthsCategoriesArray,
      generalAccessoriesArray: state.sales.generalAccessoriesArray,
      bodyRelatedAccessoriesArray: state.sales.bodyRelatedAccessoriesArray,
      dimensionRelatedAccessoriesArray: state.sales.dimensionRelatedAccessoriesArray,
      // Succeed states
      getSalesMakesSucceed: state.sales.getSalesMakesSucceed,
      getSalesLengthsSucceed: state.sales.getSalesLengthsSucceed,
      getSalesBodyLengthsSucceed: state.sales.getSalesBodyLengthsSucceed,
      getSalesBodyAccessoriesSucceed: state.sales.getSalesBodyAccessoriesSucceed,
    };
  }
};

interface DispatchProps {
  onClearSalesState: typeof actions.clearSalesState;
  onRemoveAnOrder: typeof actions.removeAnOrder;
  onStoreLocalOrders: typeof actions.storeLocalOrders;
  onGetSalesMakes: typeof actions.getSalesMakes;
  onGetSalesLengths: typeof actions.getSalesLengths;
  onGetSalesBodyLengths: typeof actions.getSalesBodyLengths;
  onGetSalesBodyAccessories: typeof actions.getSalesBodyAccessories;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onClearSalesState: () => dispatch(actions.clearSalesState()),
    onGetSalesLengths: (tire) => dispatch(actions.getSalesLengths(tire)),
    onGetSalesMakes: (length_id, tire) => dispatch(actions.getSalesMakes(length_id, tire)),
    onStoreLocalOrders: (localOrdersArray) => dispatch(actions.storeLocalOrders(localOrdersArray)),
    onGetSalesBodyLengths: (length_id, tire) => dispatch(actions.getSalesBodyLengths(length_id, tire)),
    onRemoveAnOrder: (index, localOrdersArray) => dispatch(actions.removeAnOrder(index, localOrdersArray)),
    onGetSalesBodyAccessories: (body_length_id) => dispatch(actions.getSalesBodyAccessories(body_length_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SalesPage));

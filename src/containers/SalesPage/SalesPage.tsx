import React, { useEffect, useState } from 'react';
import './SalesPage.scss';
// component
import Footer from 'src/components/Footer/Footer';
import BodyMakeSection from './StepSections/BodyMakeSection';
import OverviewSection from './StepSections/OverviewSection';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import LightboxComponent from 'src/components/ImageRelated/LightboxComponent/LightboxComponent';
// Sales related components
import TyreSection from 'src/containers/SalesPage/StepSections/TyreSection';
import LengthSection from 'src/containers/SalesPage/StepSections/LengthSection';
import BodySection from 'src/containers/SalesPage/StepSections/BodySection';
// 3rd party lib
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import NumberFormat from 'react-number-format';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Skeleton, Card, Empty, Steps, Divider, Breadcrumb } from 'antd';

// Util
import {
  TLocalOrderObj,
  TReceivedSalesMakesObj,
  TReceivedSalesLengthObj,
  TReceivedDimensionAccessoryObj,
  TReceivedSalesLengthCategoryObj,
  TReceivedSalesBodyMakeObj,
} from 'src/store/types/sales';
import * as actions from 'src/store/actions/index';
import { TMapStateToProps } from 'src/store/types/index';
import { img_loading_link, img_not_available_link } from 'src/shared/global';
import { TReceivedAccessoryObj, TReceivedBodyMakeObj, TReceivedBodyObj } from 'src/store/types/dashboard';
import { STEPS_TYRE, STEPS_LENGTH, STEPS_BODY, STEPS_ACCESSORY, STEPS_BODYMAKE } from 'src/shared/constants';

const { Step } = Steps;

interface SalesPageProps {}

type Props = SalesPageProps & StateProps & DispatchProps & RouteComponentProps;

/**
 * Sales page that provide functionality for user to choose vehicle parts
 * @return {*}
 * @category Pages
 */
const SalesPage: React.FC<Props> = ({
  // Arrays
  bodiesArray,
  bodyMakesArray,
  // salesBrandsArray,
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
  onGetSalesLengths,
  onGetSalesBodies,
  onGetSalesBodyMakes,
  onGetSalesAccessories,
  // Booleans
  loading,
  getSalesMakesSucceed,
  getSalesLengthsSucceed,
  getSalesBodiesSucceed,
  getSalesBodyMakesSucceed,
  getSalesAccessoriesSucceed,
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
  const [currentBody, setCurrentBody] = useState<TReceivedBodyObj | null>(null);
  const [currentAccessory, setCurrentAccessory] = useState<{
    accessoryObj: TReceivedAccessoryObj;
    price: number;
  } | null>(null);
  const [currentBodyMake, setCurrentBodyMake] = useState<TReceivedBodyMakeObj | null>(null);

  /** Current order object to track what user has added to the current order  */
  const [currentOrderObj, setCurrentOrderObj] = useState<TLocalOrderObj>({
    tireCount: -1,
    bodyObj: null,
    lengthObj: null,
    generalAccessoriesArray: [],
    dimensionRelatedAccessoriesArray: [],
    bodyRelatedAccessoriesArray: [],
    bodyMakeObj: null,
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
  const [bodyAccessoryLightboxOpen, setBodyAccessoryLightboxOpen] = useState(false);
  // photoindex to keep track of which image it's showing right now
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

  /* ------------------------------- */
  // Accessories
  /* ------------------------------- */
  let accessorySection = (
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
              {currentBody && <span className="sales__breadcrumb-highlight">({currentBody?.title})</span>}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="sales__breadcrumb-text">Option</span>
              {currentBodyMake && (
                <span className="sales__breadcrumb-highlight">{`(${currentBodyMake?.make.brand.title} ${currentBodyMake?.make.title} ${currentBodyMake?.make.series})`}</span>
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
              <div className="sales__selectarea-selecttext flex space-between">
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
            <div className="sales__btn-div">
              <Button
                className="sales__btn margin_r-1"
                onClick={() => {
                  prev();
                  setCurrentAccessory(null);
                }}
              >
                Back
              </Button>

              {currentStep < totalSteps - 1 && (
                <Button
                  className="sales__btn"
                  type="primary"
                  disabled={currentBodyMake === null}
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
          </div>
        </section>
      </section>
    </>
  );

  const steps = [
    {
      step: 1,
      title: STEPS_TYRE,
      content: (
        <TyreSection
          loading={loading}
          totalSteps={totalSteps}
          currentStep={currentStep}
          currentTyre={currentTyre}
          setCurrentTyre={setCurrentTyre}
          currentOrderObj={currentOrderObj}
          setCurrentOrderObj={setCurrentOrderObj}
          onGetSalesLengths={onGetSalesLengths}
        />
      ),
    },
    {
      step: 2,
      title: STEPS_LENGTH,
      content: (
        <LengthSection
          loading={loading}
          totalSteps={totalSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          currentTyre={currentTyre}
          setCurrentTyre={setCurrentTyre}
          currentLength={currentLength}
          setCurrentLength={setCurrentLength}
          currentOrderObj={currentOrderObj}
          setCurrentOrderObj={setCurrentOrderObj}
          onGetSalesBodies={onGetSalesBodies}
          lengthsCategoriesArray={lengthsCategoriesArray}
        />
      ),
    },
    {
      step: 3,
      title: STEPS_BODY,
      content: (
        <BodySection
          loading={loading}
          totalSteps={totalSteps}
          bodiesArray={bodiesArray}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          currentTyre={currentTyre}
          setCurrentTyre={setCurrentTyre}
          currentLength={currentLength}
          setCurrentLength={setCurrentLength}
          currentBody={currentBody}
          setCurrentBody={setCurrentBody}
          currentOrderObj={currentOrderObj}
          setCurrentOrderObj={setCurrentOrderObj}
          lengthsCategoriesArray={lengthsCategoriesArray}
          onGetSalesBodyMakes={onGetSalesBodyMakes}
        />
      ),
    },
    {
      step: 5,
      title: STEPS_BODYMAKE,
      content: (
        <BodyMakeSection
          loading={loading}
          totalSteps={totalSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          currentTyre={currentTyre}
          currentLength={currentLength}
          currentBody={currentBody}
          bodyMakesArray={bodyMakesArray}
          currentBodyMake={currentBodyMake}
          setCurrentBodyMake={setCurrentBodyMake}
          currentOrderObj={currentOrderObj}
          setCurrentOrderObj={setCurrentOrderObj}
          onGetSalesAccessories={onGetSalesAccessories}
        />
      ),
    },
    {
      step: 4,
      title: STEPS_ACCESSORY,
      content: accessorySection,
    },

    {
      step: 6,
      title: 'Overview',
      content: (
        <OverviewSection
          loading={loading}
          totalSteps={totalSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          currentTyre={currentTyre}
          currentLength={currentLength}
          currentBody={currentBody}
          currentBodyMake={currentBodyMake}
          setCurrentBodyMake={setCurrentBodyMake}
          currentOrderObj={currentOrderObj}
          onRemoveAnOrder={onRemoveAnOrder}
          localOrdersArray={localOrdersArray}
          setCurrentLength={setCurrentLength}
          setCurrentTyre={setCurrentTyre}
          setCurrentBody={setCurrentBody}
          setCurrentAccessory={setCurrentAccessory}
        />
      ),
    },
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
      getSalesBodyMakesSucceed ||
      getSalesBodiesSucceed ||
      getSalesAccessoriesSucceed
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
    getSalesBodiesSucceed,
    getSalesLengthsSucceed,
    getSalesBodyMakesSucceed,
    getSalesAccessoriesSucceed,
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
                      // icon={currentStep + 1 === item.step && loading ? <LoadingOutlined /> : null}
                      title={
                        <div className="sales__steps-title">
                          <div>{item.title}</div>
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
  bodiesArray?: TReceivedBodyObj[] | null;
  salesBrandsArray?: TReceivedSalesMakesObj[] | null;
  bodyMakesArray?: TReceivedSalesBodyMakeObj[] | null;
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
  getSalesBodiesSucceed?: boolean | null;
  getSalesBodyMakesSucceed?: boolean | null;
  getSalesAccessoriesSucceed?: boolean | null;
}

const mapStateToProps = (state: TMapStateToProps): StateProps | void => {
  if ('sales' in state) {
    return {
      loading: state.sales.loading,
      errorMessage: state.sales.errorMessage,
      // Arrays
      bodiesArray: state.sales.bodiesArray,
      bodyMakesArray: state.sales.bodyMakesArray,
      localOrdersArray: state.sales.localOrdersArray,
      salesBrandsArray: state.sales.salesBrandsArray,
      lengthsCategoriesArray: state.sales.lengthsCategoriesArray,
      generalAccessoriesArray: state.sales.generalAccessoriesArray,
      bodyRelatedAccessoriesArray: state.sales.bodyRelatedAccessoriesArray,
      dimensionRelatedAccessoriesArray: state.sales.dimensionRelatedAccessoriesArray,
      // Succeed states
      getSalesMakesSucceed: state.sales.getSalesMakesSucceed,
      getSalesLengthsSucceed: state.sales.getSalesLengthsSucceed,
      getSalesBodiesSucceed: state.sales.getSalesBodiesSucceed,
      getSalesBodyMakesSucceed: state.sales.getSalesBodyMakesSucceed,
      getSalesAccessoriesSucceed: state.sales.getSalesAccessoriesSucceed,
    };
  }
};

interface DispatchProps {
  onClearSalesState: typeof actions.clearSalesState;
  onRemoveAnOrder: typeof actions.removeAnOrder;
  onStoreLocalOrders: typeof actions.storeLocalOrders;
  onGetSalesMakes: typeof actions.getSalesMakes;
  onGetSalesLengths: typeof actions.getSalesLengths;
  onGetSalesBodies: typeof actions.getSalesBodies;
  onGetSalesBodyMakes: typeof actions.getSalesBodyMakes;
  onGetSalesAccessories: typeof actions.getSalesAccessories;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onClearSalesState: () => dispatch(actions.clearSalesState()),
    onGetSalesLengths: (tire) => dispatch(actions.getSalesLengths(tire)),
    onGetSalesMakes: (length_id, tire) => dispatch(actions.getSalesMakes(length_id, tire)),
    onStoreLocalOrders: (localOrdersArray) => dispatch(actions.storeLocalOrders(localOrdersArray)),
    onGetSalesBodies: (length_id, tire) => dispatch(actions.getSalesBodies(length_id, tire)),
    onRemoveAnOrder: (index, localOrdersArray) => dispatch(actions.removeAnOrder(index, localOrdersArray)),
    onGetSalesAccessories: (body_make_id) => dispatch(actions.getSalesAccessories(body_make_id)),
    onGetSalesBodyMakes: (length_id, tire, body_id) => dispatch(actions.getSalesBodyMakes(length_id, tire, body_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SalesPage));

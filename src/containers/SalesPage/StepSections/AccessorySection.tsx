import React, { useState, useContext } from 'react';
/*components*/
import LightboxComponent from 'src/components/ImageRelated/LightboxComponent/LightboxComponent';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Breadcrumb, Button, Card, Divider, Empty, Skeleton } from 'antd';
/* Util */
import { AppActions } from 'src/store/types';
import { TUserAccess } from 'src/store/types/auth';
import { img_loading_link } from 'src/shared/links';
import { SalesPageContext } from 'src/containers/SalesPage/SalesPageContext';
import { TLocalOrderObj, TReceivedDimensionAccessoryObj, TReceivedSalesLengthObj } from 'src/store/types/sales';
import { TReceivedAccessoryObj, TReceivedBodyMakeObj, TReceivedBodyObj } from 'src/store/types/dashboard';

export interface AccessorySectionProps {
  loading?: boolean;
  totalSteps?: number;
  accessObj?: TUserAccess;
  localOrdersArray?: TLocalOrderObj[];
  bodiesArray?: TReceivedBodyObj[] | null;
  currentStep?: number; //for steps component
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  currentTyre?: number | null; //current picked tire count
  currentLength?: TReceivedSalesLengthObj | null;
  currentBody?: TReceivedBodyObj | null;
  currentBodyMake?: TReceivedBodyMakeObj | null;
  currentAccessory?: {
    accessoryObj: TReceivedAccessoryObj;
    price: number;
  } | null;
  setCurrentAccessory?: React.Dispatch<
    React.SetStateAction<{
      accessoryObj: TReceivedAccessoryObj;
      price: number;
    } | null>
  >;
  currentOrderObj?: TLocalOrderObj; //to keep track of the current order
  setCurrentOrderObj?: React.Dispatch<React.SetStateAction<TLocalOrderObj>>;
  totalAccessoriesArrayLength?: number;
  generalAccessoriesArray?: TReceivedAccessoryObj[] | null;
  bodyRelatedAccessoriesArray?: TReceivedAccessoryObj[] | null;
  dimensionRelatedAccessoriesArray?: TReceivedDimensionAccessoryObj[] | null;
  onStoreLocalOrders?: (localOrdersArray: TLocalOrderObj[]) => AppActions;
}

type Props = AccessorySectionProps;

const AccessorySection: React.FC<Props> = () => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  // To keep track which image is it in the lightbox
  const [accessoryPhotoIndex, setAccessoryPhotoIndex] = useState(0);
  // whether the lightbox is opened
  const [accessoryLightboxOpen, setAccessoryLightboxOpen] = useState(false);
  /* ================================================== */
  /*  methods  */
  /* ================================================== */

  /* ================================================== */
  /*  useEffect  */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */

  const salesPageContext = useContext(SalesPageContext);
  if (salesPageContext === null) {
    return null;
  }

  const {
    accessObj,
    totalSteps,
    currentTyre,
    currentBody,
    currentLength,
    currentStep,
    setCurrentStep,
    currentOrderObj,
    currentBodyMake,
    currentAccessory,
    localOrdersArray,
    onStoreLocalOrders,
    setCurrentOrderObj,
    setCurrentAccessory,
    generalAccessoriesArray,
    totalAccessoriesArrayLength,
    bodyRelatedAccessoriesArray,
    dimensionRelatedAccessoriesArray,
  } = salesPageContext;

  if (accessObj === undefined) {
    return null;
  }
  return (
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
                <span className="sales__breadcrumb-highlight">{`(${currentBodyMake?.make_wheelbase.make.brand.title} ${currentBodyMake?.make_wheelbase.wheelbase.title} ${currentBodyMake?.make_wheelbase.make.series})`}</span>
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
                  <div className="sales__lightbox-parent" onClick={() => setAccessoryLightboxOpen(true)}>
                    {/* Clickable image to show lightbox */}
                    <LazyLoadImage
                      className="sales__section-img"
                      src={currentAccessory.accessoryObj.images[0].url}
                      alt={currentAccessory.accessoryObj.images[0].filename}
                      placeholderSrc={img_loading_link}
                    />
                    <LightboxComponent
                      images={currentAccessory.accessoryObj?.images}
                      photoIndex={accessoryPhotoIndex}
                      isOpen={accessoryLightboxOpen}
                      setPhotoIndex={setAccessoryPhotoIndex}
                      setIsOpen={setAccessoryLightboxOpen}
                    />
                    <div className="sales__lightbox-icon">
                      <i className="fas fa-expand"></i>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* if there is no image then show image not available */}
                    <div className="sales__section-img">
                      <Skeleton.Image className="sales__section-img-skeleton" />
                    </div>
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
              <div className="sales__selectarea-card-outerdiv">
                <div className="sales__selectarea-card-outerdiv-customheader">Selected tyre count</div>

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
                  {accessObj.showPriceSalesPage && (
                    <div className="sales__selectarea-card-row">
                      <div className="sales__selectarea-card-row-left">Price</div>
                      <div className="sales__selectarea-card-row-right sales__selectarea-card-price">
                        RM
                        <NumberFormat value={currentAccessory.price} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ) : (
              <div className="sales__selectarea-card-outerdiv">
                <div className="sales__selectarea-card-outerdiv-customheader">Selected tyre count</div>
                <Card className="sales__selectarea-card" size="small" title="Selected accessory">
                  None
                </Card>
              </div>
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
                <span className="sales__breadcrumb-highlight sales__breadcrumb-highlight--accessory">
                  {totalAccessoriesArrayLength !== undefined && totalAccessoriesArrayLength > 0
                    ? `${totalAccessoriesArrayLength} item(s)`
                    : null}
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
                        <div className="sales__selectarea-category">General Accessories</div>
                      </Divider>
                      <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                        <>
                          {generalAccessoriesArray.map((accessory) => {
                            // Boolean
                            let objExistInGeneralAccessoriesArray =
                              currentOrderObj !== undefined &&
                              currentOrderObj.generalAccessoriesArray.includes(accessory);
                            return (
                              <div
                                key={uuidv4()}
                                className={`sales__selectarea-button ${
                                  // if the generalaccessoriesarray includes this specific accessory object
                                  objExistInGeneralAccessoriesArray ? 'active' : ''
                                }`}
                                onClick={() => {
                                  if (
                                    setCurrentAccessory === undefined ||
                                    currentOrderObj === undefined ||
                                    setCurrentOrderObj === undefined
                                  )
                                    return;
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
                        <div className="sales__selectarea-category">Body Associated Accessories</div>
                      </Divider>
                      <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                        <>
                          {bodyRelatedAccessoriesArray.map((accessory) => {
                            let objExistInBodyRelatedAccessoriesArray =
                              currentOrderObj !== undefined &&
                              currentOrderObj.bodyRelatedAccessoriesArray.includes(accessory);
                            return (
                              <div
                                key={uuidv4()}
                                className={`sales__selectarea-button ${
                                  objExistInBodyRelatedAccessoriesArray ? 'active' : ''
                                }`}
                                onClick={() => {
                                  if (
                                    setCurrentAccessory === undefined ||
                                    currentOrderObj === undefined ||
                                    setCurrentOrderObj === undefined
                                  )
                                    return;

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
                        <div className="sales__selectarea-category">Dimension Associated Accessories</div>
                      </Divider>

                      <div className="sales__selectarea-div sales__selectarea-div--twocolumn">
                        {dimensionRelatedAccessoriesArray.map((dimensionRelatedAccessory) => {
                          let objExistInDimensionRelatedAccessoriesArray =
                            currentOrderObj !== undefined &&
                            currentOrderObj.dimensionRelatedAccessoriesArray.includes(dimensionRelatedAccessory);
                          return (
                            <div
                              key={uuidv4()}
                              className={`sales__selectarea-button ${
                                objExistInDimensionRelatedAccessoriesArray ? 'active' : ''
                              }`}
                              onClick={() => {
                                if (
                                  setCurrentAccessory === undefined ||
                                  currentOrderObj === undefined ||
                                  setCurrentOrderObj === undefined
                                )
                                  return;
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
                className="sales__btn sales__btn--back margin_r-1"
                onClick={() => {
                  if (setCurrentStep === undefined || currentStep === undefined || setCurrentAccessory === undefined)
                    return;
                  setCurrentStep(currentStep - 1);
                  setCurrentAccessory(null);
                }}
              >
                Back
              </Button>

              {currentStep !== undefined && totalSteps !== undefined && currentStep < totalSteps - 1 && (
                <Button
                  className="sales__btn"
                  type="primary"
                  disabled={currentBodyMake === null}
                  onClick={() => {
                    // At the end of the choosing phase after user done choosing brand
                    // user click on complete button and we store the current order object
                    // into the localOrdersArray in redux so we can save it in localstorage
                    if (
                      localOrdersArray === undefined ||
                      setCurrentStep === undefined ||
                      currentOrderObj === undefined ||
                      onStoreLocalOrders === undefined
                    )
                      return;
                    let copyArray = [...localOrdersArray];
                    copyArray.push(currentOrderObj);

                    onStoreLocalOrders(copyArray);
                    setCurrentStep(currentStep + 1);
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
};

export default AccessorySection;

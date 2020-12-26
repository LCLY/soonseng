import React, { useEffect, useState, useMemo } from 'react';
import './SalesPage.scss';
// component
import Footer from 'src/components/Footer/Footer';
import BodyMakeSection from './StepSections/BodyMakeSection';
import OverviewComponent from './StepSections/OverviewComponent';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
// Sales related components
import AccessorySection from './StepSections/AccessorySection';
import TyreSection from 'src/containers/SalesPage/StepSections/TyreSection';
import LengthSection from 'src/containers/SalesPage/StepSections/LengthSection';
import BodySection from 'src/containers/SalesPage/StepSections/BodySection';
// 3rd party lib
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb, Button, Divider, Steps } from 'antd';

// Util
import {
  STEPS_TYRE,
  STEPS_LENGTH,
  STEPS_BODY,
  STEPS_ACCESSORY,
  STEPS_BODYMAKE,
  STEPS_OVERVIEW,
} from 'src/shared/constants';
import {
  TLocalOrderObj,
  TReceivedSalesMakesObj,
  TReceivedSalesLengthObj,
  TReceivedDimensionAccessoryObj,
  TReceivedSalesLengthCategoryObj,
  TReceivedSalesBodyMakeObj,
} from 'src/store/types/sales';

import { RootState } from 'src';
import holy5truck from 'src/img/5-trucks-lowres.jpg';
import * as actions from 'src/store/actions/index';
import { TUserAccess } from 'src/store/types/auth';
import { TReceivedAccessoryObj, TReceivedBodyMakeObj, TReceivedBodyObj } from 'src/store/types/dashboard';
import { SalesPageContext } from './SalesPageContext';

const { Step } = Steps;

interface SalesPageProps {}

type Props = SalesPageProps & StateProps & DispatchProps & RouteComponentProps;

/**
 * Sales page that provide functionality for user to choose vehicle parts
 * @return {*}
 * @category Pages
 */
const SalesPage: React.FC<Props> = ({
  history,
  // auth token
  auth_token,
  accessObj,
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

  // only display 1 order in sales page
  let displayOrdersAmount = 1;
  // To optimize useContext
  const value = useMemo(
    () => ({
      loading,
      totalSteps,
      auth_token,
      accessObj,
      displayOrdersAmount,
      currentStep,
      currentTyre,
      currentBody,
      currentLength,
      currentBodyMake,
      currentAccessory,
      currentOrderObj,
      bodiesArray,
      bodyMakesArray,
      localOrdersArray,
      lengthsCategoriesArray,
      generalAccessoriesArray,
      totalAccessoriesArrayLength,
      bodyRelatedAccessoriesArray,
      dimensionRelatedAccessoriesArray,
      setCurrentStep,
      setCurrentTyre,
      setCurrentBody,
      setCurrentLength,
      setCurrentOrderObj,
      setCurrentBodyMake,
      setCurrentAccessory,
      onRemoveAnOrder,
      onStoreLocalOrders,
      onGetSalesBodies,
      onGetSalesLengths,
      onGetSalesBodyMakes,
      onGetSalesAccessories,
    }),
    [
      loading,
      totalSteps,
      auth_token,
      accessObj,
      displayOrdersAmount,
      // state
      currentStep,
      currentTyre,
      currentBody,
      currentLength,
      currentBodyMake,
      currentOrderObj,
      currentAccessory,
      // arrays
      bodiesArray,
      bodyMakesArray,
      localOrdersArray,
      lengthsCategoriesArray,
      generalAccessoriesArray,
      totalAccessoriesArrayLength,
      bodyRelatedAccessoriesArray,
      dimensionRelatedAccessoriesArray,
      // setstate
      setCurrentStep,
      setCurrentTyre,
      setCurrentBody,
      setCurrentLength,
      setCurrentOrderObj,
      setCurrentBodyMake,
      setCurrentAccessory,
      // Redux Actions
      onRemoveAnOrder,
      onStoreLocalOrders,
      onGetSalesBodies,
      onGetSalesLengths,
      onGetSalesBodyMakes,
      onGetSalesAccessories,
    ],
  );

  let SalesPageOverview = (
    <>
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
                {currentBody && <span className="sales__breadcrumb-highlight">({currentBody?.title})</span>}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="sales__breadcrumb-text">Option</span>
                {currentBodyMake && (
                  <span className="sales__breadcrumb-highlight">{`(${currentBodyMake?.make_wheelbase.make.brand.title} ${currentBodyMake?.make_wheelbase.make.title} ${currentBodyMake?.make_wheelbase.make.series})`}</span>
                )}
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="sales__breadcrumb-text">Accessory</span>
                <span className="sales__breadcrumb-highlight">({totalAccessoriesArrayLength} Items)</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="sales__breadcrumb-text">Overview</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Divider className="sales__section-header-divider" orientation="left">
            <div className="sales__section-header">Overview</div>
          </Divider>
        </div>

        {/* Add overview component in here */}
        <OverviewComponent />

        <Button
          className="sales__overview-btn--another"
          onClick={() => {
            if (
              setCurrentStep === undefined ||
              setCurrentLength === undefined ||
              setCurrentTyre === undefined ||
              setCurrentBody === undefined ||
              setCurrentBodyMake === undefined ||
              setCurrentAccessory === undefined
            )
              return;

            setCurrentStep(0);
            setCurrentLength(null);
            setCurrentTyre(null);
            setCurrentBody(null);
            setCurrentAccessory(null);
            setCurrentBodyMake(null);
          }}
        >
          Add Another Order
        </Button>
        <Button
          type="primary"
          className="sales__overview-btn--allorders"
          onClick={() => {
            history.push('/orders');
          }}
        >
          View All Orders
        </Button>
      </section>
    </>
  );

  /* =========================== */
  /*         components          */
  /* =========================== */

  const steps = [
    {
      step: 1,
      title: STEPS_TYRE,
      content: <TyreSection />,
    },
    {
      step: 2,
      title: STEPS_LENGTH,
      content: <LengthSection />,
    },
    {
      step: 3,
      title: STEPS_BODY,
      content: <BodySection />,
    },
    {
      step: 5,
      title: STEPS_BODYMAKE,
      content: <BodyMakeSection />,
    },
    {
      step: 4,
      title: STEPS_ACCESSORY,
      content: <AccessorySection />,
    },
    {
      step: 6,
      title: STEPS_OVERVIEW,
      content: SalesPageOverview,
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
      <ParallaxContainer bgImageUrl={holy5truck} colorSettings="radial-gradient(rgba(0,0,0,0.2) 60%, rgba(0, 0, 0, 1))">
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
                <Container>
                  <SalesPageContext.Provider value={value}>{steps[currentStep].content}</SalesPageContext.Provider>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </ParallaxContainer>
      <Footer />
    </>
  );
};

interface StateProps {
  loading?: boolean;
  errorMessage?: string | null;
  // auth token
  auth_token?: string | null;
  accessObj?: TUserAccess;
  // Arrays
  bodiesArray?: TReceivedBodyObj[] | null;
  salesBrandsArray?: TReceivedSalesMakesObj[] | null;
  bodyMakesArray?: TReceivedSalesBodyMakeObj[] | null;
  generalAccessoriesArray?: TReceivedAccessoryObj[] | null;
  dimensionRelatedAccessoriesArray?: TReceivedDimensionAccessoryObj[] | null;
  bodyRelatedAccessoriesArray?: TReceivedAccessoryObj[] | null;
  // length category object
  lengthsCategoriesArray?: TReceivedSalesLengthCategoryObj[] | null;
  // array for local orders
  localOrdersArray?: TLocalOrderObj[];
  // Bool for get api
  getSalesMakesSucceed?: boolean | null;
  getSalesLengthsSucceed?: boolean | null;
  getSalesBodiesSucceed?: boolean | null;
  getSalesBodyMakesSucceed?: boolean | null;
  getSalesAccessoriesSucceed?: boolean | null;
}

const mapStateToProps = (state: RootState): StateProps | void => {
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
    // Authentication
    auth_token: state.auth.auth_token,
    accessObj: state.auth.accessObj,
  };
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
    onGetSalesBodyMakes: (length_id, tire, body_id, auth_token) =>
      dispatch(actions.getSalesBodyMakes(length_id, tire, body_id, auth_token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SalesPage));

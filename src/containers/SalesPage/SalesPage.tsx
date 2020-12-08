import React, { useEffect, useState } from 'react';
import './SalesPage.scss';
// component
import Footer from 'src/components/Footer/Footer';
import BodyMakeSection from './StepSections/BodyMakeSection';
import OverviewSection from './StepSections/OverviewSection';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
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
import { Steps } from 'antd';

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

  /* =========================== */
  /*         components          */
  /* =========================== */

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
      content: (
        <AccessorySection
          totalSteps={totalSteps}
          currentTyre={currentTyre}
          currentBody={currentBody}
          currentLength={currentLength}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          currentOrderObj={currentOrderObj}
          currentBodyMake={currentBodyMake}
          currentAccessory={currentAccessory}
          localOrdersArray={localOrdersArray}
          onStoreLocalOrders={onStoreLocalOrders}
          setCurrentOrderObj={setCurrentOrderObj}
          setCurrentAccessory={setCurrentAccessory}
          generalAccessoriesArray={generalAccessoriesArray}
          totalAccessoriesArrayLength={totalAccessoriesArrayLength}
          bodyRelatedAccessoriesArray={bodyRelatedAccessoriesArray}
          dimensionRelatedAccessoriesArray={dimensionRelatedAccessoriesArray}
        />
      ),
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

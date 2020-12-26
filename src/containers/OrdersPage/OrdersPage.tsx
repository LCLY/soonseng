import React, { useMemo } from 'react';
import './OrdersPage.scss';
// component
import Footer from 'src/components/Footer/Footer';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
// 3rd party lib
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Divider } from 'antd';

// Util
import { RootState } from 'src';
import * as actions from 'src/store/actions/index';
import holy5truck from 'src/img/5-trucks-lowres.jpg';
import { TUserAccess } from 'src/store/types/auth';
import { TLocalOrderObj } from 'src/store/types/sales';
import OverviewComponent from '../SalesPage/StepSections/OverviewComponent';
import { SalesPageContext } from 'src/containers/SalesPage/SalesPageContext';

interface OrdersPageProps {}

type Props = OrdersPageProps & StateProps & DispatchProps & RouteComponentProps;

const OrdersPage: React.FC<Props> = ({ accessObj, localOrdersArray }) => {
  const value = useMemo(
    () => ({
      accessObj,
      localOrdersArray,
    }),
    [accessObj, localOrdersArray],
  );

  if (accessObj === undefined) {
    return null;
  }
  return (
    <>
      <NavbarComponent activePage="orders" />
      <ParallaxContainer bgImageUrl={holy5truck}>
        <section className="orders__section">
          <Container>
            <div className="orders__section-outerdiv">
              <Divider className="sales__section-header-divider" orientation="left">
                <div className="sales__section-header">Your Orders</div>
              </Divider>

              <div>
                {localOrdersArray && (
                  <div className="orders__total-items">
                    Total:&nbsp;<span className="orders__total-text">{localOrdersArray.length}&nbsp;items</span>
                  </div>
                )}
                {/* Provider to pass props into overview component, since overviewcomponent is using salespage context */}
                <SalesPageContext.Provider value={value}>
                  <OverviewComponent />
                </SalesPageContext.Provider>
              </div>
            </div>
          </Container>
        </section>
      </ParallaxContainer>
      <Footer />
    </>
  );
};

interface StateProps {
  // array for local orders
  accessObj?: TUserAccess;
  localOrdersArray?: TLocalOrderObj[];
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    localOrdersArray: state.sales.localOrdersArray,
  };
};

interface DispatchProps {
  onRemoveAnOrder: typeof actions.removeAnOrder;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return { onRemoveAnOrder: (index, localOrdersArray) => dispatch(actions.removeAnOrder(index, localOrdersArray)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrdersPage));

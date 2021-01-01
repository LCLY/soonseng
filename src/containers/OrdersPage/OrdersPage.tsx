import React, { useEffect, useMemo, useState } from 'react';
import './OrdersPage.scss';
// component
import Footer from 'src/components/Footer/Footer';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
// 3rd party lib
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Button, Checkbox, Divider, Modal } from 'antd';
import { Dispatch, AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// Util
import { RootState } from 'src';
import * as actions from 'src/store/actions/index';
import holy5truck from 'src/img/5trucks.jpg';
import { TUserAccess } from 'src/store/types/auth';
import { TLocalOrderObj } from 'src/store/types/sales';
import OverviewComponent from '../SalesPage/StepSections/OverviewComponent';
import { SalesPageContext } from 'src/containers/SalesPage/SalesPageContext';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

interface OrdersPageProps {}

type Props = OrdersPageProps & StateProps & DispatchProps & RouteComponentProps;

const OrdersPage: React.FC<Props> = ({ accessObj, history, localOrdersArray }) => {
  /* ============================= */
  /* useState */
  /* ============================= */
  // show the whole array
  let displayOrdersAmount = localOrdersArray?.length;

  const value = useMemo(
    () => ({
      accessObj,
      localOrdersArray,
      displayOrdersAmount,
    }),
    [accessObj, localOrdersArray, displayOrdersAmount],
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMoreThanFour, setSelectedMoreThanFour] = useState(false);
  const [totalChecked, setTotalChecked] = useState(0);
  const [checkedConfigurations, setCheckedConfigurations] = useState<{ [key: string]: boolean } | null>(null);

  // use the index as key and set true or false value to it
  const onCheckedChanged = (e: CheckboxChangeEvent, index: number) => {
    setCheckedConfigurations({ ...checkedConfigurations, [index]: e.target.checked });
  };

  useEffect(() => {
    if (localOrdersArray) {
      localOrdersArray.map((_order, index) =>
        setCheckedConfigurations((prevState) => {
          return { ...prevState, [index]: false };
        }),
      );
    }
  }, [localOrdersArray, setCheckedConfigurations]);

  useEffect(() => {
    if (checkedConfigurations) {
      let totalCount = 0;
      // convert the values into array
      Object.values(checkedConfigurations).forEach((bool) => {
        if (bool === true) {
          totalCount++;
          setTotalChecked(totalCount);
          // loop through the booleans and count if there are 4 trues, set the bool
          if (totalCount === 4) {
            setSelectedMoreThanFour(true);
          } else {
            setSelectedMoreThanFour(false);
          }
        } else {
          setTotalChecked(totalCount);
        }
      });
    }
  }, [checkedConfigurations]);

  if (accessObj === undefined) {
    return null;
  }
  return (
    <>
      <Modal
        title="Select up to 4 configurations to compare"
        visible={modalOpen}
        okText="Compare"
        okButtonProps={{ disabled: totalChecked <= 1 ? true : false }}
        onOk={() => {
          // filter out array that has true
          if (checkedConfigurations) {
            let tempArray: string[] = [];
            // check if value is true then push the index into the array
            for (let i in checkedConfigurations) {
              if (checkedConfigurations[i] === true) {
                tempArray.push(i);
              }
            }
            history.push({
              pathname: '/comparison',
              state: {
                checkedConfigurations: tempArray,
              },
            });
          }
        }}
        onCancel={() => setModalOpen(false)}
      >
        {localOrdersArray !== undefined &&
          checkedConfigurations &&
          localOrdersArray.map((order, index) => {
            const { bodyMakeObj } = order;
            return (
              <React.Fragment key={uuidv4()}>
                {bodyMakeObj && (
                  <div>
                    <Checkbox
                      // whenever user selected more than four, the rest that are not checked will be disabled
                      disabled={selectedMoreThanFour && checkedConfigurations[index] === false}
                      className="orders__compare-checkbox"
                      checked={checkedConfigurations[index]}
                      onChange={(e) => onCheckedChanged(e, index)}
                    >
                      <div>
                        {bodyMakeObj.length.title}ft&nbsp;
                        {bodyMakeObj.body.title}&nbsp;(
                        {bodyMakeObj.make_wheelbase.make.brand.title}&nbsp;
                        {bodyMakeObj.make_wheelbase.make.series})
                      </div>
                    </Checkbox>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </Modal>
      <NavbarComponent activePage="orders" />
      <section>
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
                      <div>
                        Total:&nbsp;<span className="orders__total-text">{localOrdersArray.length}&nbsp;items</span>
                      </div>

                      <div className="orders__btn-comparison-div">
                        <Button className="orders__btn-comparison" type="primary" onClick={() => setModalOpen(true)}>
                          Compare Specifications
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Provider to pass props into overview component, since overviewcomponent is using salespage context */}
                  <SalesPageContext.Provider value={value}>
                    <OverviewComponent />
                  </SalesPageContext.Provider>
                </div>
                <div className="orders__btn-comparison-div--bottom">
                  <Button className="orders__btn-comparison" type="primary" onClick={() => setModalOpen(true)}>
                    Compare Specifications
                  </Button>
                </div>
              </div>
            </Container>
          </section>
        </ParallaxContainer>
      </section>
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

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
import { Helmet } from 'react-helmet';
import { Button, Checkbox, Divider, Modal } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// Util
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import { ROUTE_COMPARISON } from 'src/shared/routes';
import { TUserAccess } from 'src/store/types/auth';
import { TLocalOrderObj } from 'src/store/types/sales';
import OverviewComponent from '../SalesPage/StepSections/OverviewComponent';
import { SalesPageContext } from 'src/containers/SalesPage/SalesPageContext';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

interface OrdersPageProps {}

type Props = OrdersPageProps & StateProps & RouteComponentProps;

const OrdersPage: React.FC<Props> = ({ accessObj, history, localOrdersDict }) => {
  /* ============================= */
  /* useState */
  /* ============================= */
  // show the whole array
  // if (localOrdersDict === undefined) return null;
  let displayOrdersAmount = 0;
  if (localOrdersDict !== undefined) {
    displayOrdersAmount = Object.values(localOrdersDict).length;
  }

  const value = useMemo(
    () => ({
      accessObj,
      localOrdersDict,
      displayOrdersAmount,
    }),
    [accessObj, localOrdersDict, displayOrdersAmount],
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMoreThanFour, setSelectedMoreThanFour] = useState(false);
  const [totalChecked, setTotalChecked] = useState(0);
  const [checkedConfigurations, setCheckedConfigurations] = useState<{ [orderId: string]: boolean } | null>(null);

  // use the index as key and set true or false value to it
  const onCheckedChanged = (e: CheckboxChangeEvent, orderId: string) => {
    setCheckedConfigurations({ ...checkedConfigurations, [orderId]: e.target.checked });
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  // on mount, always start user at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (localOrdersDict) {
      Object.values(localOrdersDict).map((order) =>
        setCheckedConfigurations((prevState) => {
          return { ...prevState, [order.id]: false };
        }),
      );
    }
  }, [localOrdersDict, setCheckedConfigurations]);

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
      <Helmet>
        <meta
          charSet="utf-8"
          name="Orders"
          content="Check out the configurations you put together and make comparisons to see which one you prefer."
        />
        <title>Orders | Soon Seng Motors Enterprise (1988)</title>
        <link href="http://www.soonsenghino.com/orders" />
      </Helmet>

      {/* ========================================== */}
      {/* compare modal */}
      {/* ========================================== */}
      <Modal
        title="Select up to 4 configurations to compare"
        visible={modalOpen}
        okText="Compare"
        okButtonProps={{ disabled: totalChecked <= 1 ? true : false }}
        onOk={() => {
          // filter out array that has true
          if (checkedConfigurations) {
            let tempOrderIdArray: string[] = [];
            // check if value is true then push the index into the array
            for (let orderId in checkedConfigurations) {
              if (checkedConfigurations[orderId] === true) {
                tempOrderIdArray.push(orderId);
              }
            }

            let order_ids_combination = '';

            tempOrderIdArray.forEach((orderId, index) => {
              // if its the first then just straight add the id
              if (index === 0) {
                order_ids_combination = order_ids_combination + `order${index + 1}=${orderId}`;
              } else {
                // if its after the first then add & infront of the string
                order_ids_combination = order_ids_combination + `&order${index + 1}=${orderId}`;
              }
            });

            //adding the ids to the route as params
            history.push(`${ROUTE_COMPARISON}?${order_ids_combination}`);
          }
        }}
        onCancel={() => setModalOpen(false)}
      >
        {localOrdersDict !== undefined &&
          checkedConfigurations &&
          Object.values(localOrdersDict).map((order) => {
            const { bodyMakeObj } = order;
            return (
              <React.Fragment key={uuidv4()}>
                {bodyMakeObj && (
                  <div>
                    <Checkbox
                      // whenever user selected more than four, the rest that are not checked will be disabled
                      disabled={selectedMoreThanFour && checkedConfigurations[order.id] === false}
                      className="orders__compare-checkbox"
                      checked={checkedConfigurations[order.id]}
                      onChange={(e) => onCheckedChanged(e, order.id)}
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
        <ParallaxContainer overlayColor="rgba(0, 0, 0, 0.3)" bgImageUrl={holy5truck}>
          <section className="orders__section">
            <Container>
              <div className="orders__section-outerdiv">
                <Divider className="sales__section-header-divider" orientation="left">
                  <div className="sales__section-header">Your Orders</div>
                </Divider>

                <div>
                  {localOrdersDict && (
                    <div className="orders__total-items">
                      <div>
                        Total:&nbsp;
                        <span className="orders__total-text">{Object.keys(localOrdersDict).length}&nbsp;items</span>
                      </div>

                      <div className="orders__btn-comparison-div">
                        <Button
                          disabled={Object.keys(localOrdersDict).length <= 1}
                          className="orders__btn-comparison"
                          type="primary"
                          onClick={() => setModalOpen(true)}
                        >
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
                  <Button className="orders__btn-comparison" type="primary" onClick={() => history.push('/sales')}>
                    Add More Orders
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
  localOrdersDict?: { [key: string]: TLocalOrderObj };
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    accessObj: state.auth.accessObj,
    localOrdersDict: state.sales.localOrdersDict,
  };
};

export default connect(mapStateToProps, null)(withRouter(OrdersPage));

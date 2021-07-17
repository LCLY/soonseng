/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import './PerformancePage.scss';
/* components */
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/* 3rd party lib */
import moment from 'moment';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Skeleton, Carousel } from 'antd';
import ReactSvgPieChart from 'react-svg-piechart';
import { withRouter, RouteComponentProps } from 'react-router-dom';

/* Util */
import { connect } from 'react-redux';
import { RootState } from 'src';
import { AnyAction, Dispatch } from 'redux';
import * as actions from 'src/store/actions/index';
import { ROUTE_PERFORMANCE } from 'src/shared/routes';
import {
  TReceivedMechanicObj,
  TReceivedPerformanceStatsObj,
  TReceivedSpecificMechanicPerformanceObj,
} from 'src/store/types/performance';

interface PerformancePageProps {}

type Props = PerformancePageProps & StateProps & DispatchProps & RouteComponentProps;

const PerformancePage: React.FC<Props> = ({
  history,
  performanceStats,
  mechanicsData,
  onGetAllMechanics,
  onGetAllPerformance,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const [currentTime, setCurrentTime] = useState(moment().format('DD/MM/YYYY HH:mm'));

  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    // let startOfMonth = moment().startOf('month').format('DD/MM/YYYY');
    let startOfMonth = moment('1/6/2021').format('DD/MM/YYYY');
    let endOfMonth = moment().endOf('month').format('DD/MM/YYYY');
    onGetAllPerformance(startOfMonth, endOfMonth);
  }, [onGetAllPerformance]);

  useEffect(() => {
    let startOfMonth = moment('1/6/2021').format('DD/MM/YYYY');
    let endOfMonth = moment().endOf('month').format('DD/MM/YYYY');

    onGetAllMechanics(startOfMonth, endOfMonth, 'daily');
  }, [onGetAllMechanics]);

  useEffect(() => {
    setInterval(() => setCurrentTime(moment().format('DD/MM/YYYY HH:mm')), 30000);
  }, []);

  useEffect(() => {
    if (mechanicsData) {
      console.log(_.chunk(mechanicsData, 3));
    }
  }, [mechanicsData]);

  const data = [
    { title: 'Data 2', value: 60, color: '#2f7d6d' },
    { title: 'Data 4', value: 20, color: '#69c2b0' },
    { title: 'Data 1', value: 100, color: '#22594e' },
    { title: 'Data 5', value: 10, color: '#a1d9ce' },
    { title: 'Data 3', value: 30, color: '#3da18d' },
  ];

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <NavbarComponent activePage="performance" defaultOpenKeys="dashboard" />
      <div className="performance__bg">
        <Container>
          <section className="performance__section-content">
            <section className="performance__section-top-info">
              <span>{moment().format('MMMM')}</span>
              <div>
                <span>{currentTime}</span>
              </div>
            </section>
            <section className="performance__section-top">
              <div className="performance__section-top-left">
                {mechanicsData ? (
                  <Carousel autoplay autoplaySpeed={4000} pauseOnHover={true} style={{ height: '100%', width: '100%' }}>
                    {_.chunk(mechanicsData, 3).map((smallerArray) => (
                      <div key={uuidv4()} className="performance__card-outerdiv">
                        {smallerArray.map((child) => (
                          <div
                            key={uuidv4()}
                            className="performance__card-mechanic"
                            onClick={() => history.push(`${ROUTE_PERFORMANCE}/${child.user.id}`)}
                          >
                            <div className="performance__card-mechanic-innerdiv">
                              <div>
                                {child.user.first_name} {child.user.last_name}
                              </div>
                              <div>
                                <div>Intakes:{child.intake_count}</div>
                                <div>Jobs:{child.intake_jobs}</div>
                                {Object.keys(child.intake_jobs_data).map((intake_job, index) => (
                                  <div key={`jobsdata${index}`}>
                                    {intake_job}: {(child.intake_jobs_data as any)[intake_job]}
                                  </div>
                                ))}

                                <ReactSvgPieChart
                                  data={data}
                                  // If you need expand on hover (or touch) effect
                                  expandOnHover
                                  // If you need custom behavior when sector is hovered (or touched)
                                  onSectorHover={(d: any, i: any, e: any) => {
                                    if (d) {
                                      console.log('Mouse enter - Index:', i, 'Data:', d, 'Event:', e);
                                    } else {
                                      console.log('Mouse leave - Index:', i, 'Event:', e);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <div className="performance__section-loading">
                    <Ripple />
                  </div>
                )}
              </div>
              <div className="performance__section-top-right">
                <div className="performance__section-top-intakes">
                  Intakes currently: {performanceStats ? <>{performanceStats.current_intake_count}</> : 'loading...'}
                  <br />
                  Unclaimed intakes: {performanceStats ? <>{performanceStats.unclaimed_intake_count}</> : 'loading...'}
                </div>
                <div className="performance__section-bottom-intakes">
                  {performanceStats ? (
                    <>
                      <div className="performance__section-bottom-intakes-innerdiv">
                        <span className="performance__section-bottom-intakes-innerdiv-title">
                          Active Claimed Intakes
                        </span>
                        {performanceStats.active_claimed_intakes.map((child) => (
                          <div key={child.id}>{child.registration}</div>
                        ))}
                      </div>
                      <div className="performance__section-bottom-intakes-innerdiv">
                        <span className="performance__section-bottom-intakes-innerdiv-title">Unclaimed Intakes</span>
                        {performanceStats.unclaimed_intakes.map((child) => (
                          <div key={child.id}>{child.registration}</div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="performance__section-bottom-intakes-innerdiv">
                      <Skeleton active />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </section>
        </Container>
      </div>
    </>
  );
};

interface StateProps {
  mechanicsData?: TReceivedMechanicObj[] | null;
  performanceStats?: TReceivedPerformanceStatsObj | null;
  specificMechanicsPerformanceData?: TReceivedSpecificMechanicPerformanceObj[] | null;
}

const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    mechanicsData: state.performance.mechanicsData,
    performanceStats: state.performance.performanceStats,
    specificMechanicsPerformanceData: state.performance.specificMechanicsPerformanceData,
  };
};

interface DispatchProps {
  onGetAllMechanics: typeof actions.getAllMechanics;
  onGetAllPerformance: typeof actions.getAllPerformance;
  onGetSpecificMechanicPerformance: typeof actions.getSpecificMechanicPerformance;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetAllMechanics: (date_from, date_to, interval) =>
      dispatch(actions.getAllMechanics(date_from, date_to, interval)),
    onGetAllPerformance: (date_from, date_to) => dispatch(actions.getAllPerformance(date_from, date_to)),
    onGetSpecificMechanicPerformance: (date_from, date_to, interval, mechanic_id) =>
      dispatch(actions.getSpecificMechanicPerformance(date_from, date_to, interval, mechanic_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PerformancePage));

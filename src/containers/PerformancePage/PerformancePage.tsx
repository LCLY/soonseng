/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react';
import './PerformancePage.scss';
/* components */
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
/* 3rd party lib */
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
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

const PerformancePage: React.FC<Props> = ({ history, mechanicsData, onGetAllMechanics, onGetAllPerformance }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  let mechanics = [
    { name: 'test1', jobs: 10, intake: 6 },
    { name: 'test2', jobs: 10, intake: 6 },
    { name: 'test3', jobs: 10, intake: 6 },
    { name: 'test4', jobs: 10, intake: 6 },
    { name: 'test5', jobs: 10, intake: 6 },
    { name: 'test6', jobs: 10, intake: 6 },
  ];

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

  console.log(mechanicsData);

  useEffect(() => {
    let startOfMonth = moment('1/6/2021').format('DD/MM/YYYY');
    let endOfMonth = moment().endOf('month').format('DD/MM/YYYY');

    onGetAllMechanics(startOfMonth, endOfMonth, 'daily');
  }, [onGetAllMechanics]);

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
                <span>{moment().format('DD/MM/YYYY HH:mm')}</span>
              </div>
            </section>
            <section className="performance__section-top">
              <div className="performance__section-top-left">
                {mechanics.map((child) => (
                  <div
                    key={uuidv4()}
                    className="performance__card-mechanic"
                    onClick={() => history.push(`${ROUTE_PERFORMANCE}/${child.name}`)}
                  >
                    Name: {child.name}
                    <br />
                    Intakes:{child.intake}
                    <br />
                    Jobs:{child.jobs}
                  </div>
                ))}
              </div>
              <div className="performance__section-top-right">
                <div className="performance__section-top-intakes">
                  Intakes currently: 20 <br /> Unclaimed intakes:10
                </div>
                <div className="performance__section-top-intakes">
                  <div>ABC1234 - Something Sdn Bhd</div>
                  <div>ABC1234 - Something Sdn Bhd</div>
                  <div>ABC1234 - Something Sdn Bhd</div>
                  <div>ABC1234 - Something Sdn Bhd</div>
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

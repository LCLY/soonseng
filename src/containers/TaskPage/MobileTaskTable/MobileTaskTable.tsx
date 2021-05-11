import React, { useEffect, useCallback, useContext } from 'react';
import './MobileTaskTable.scss';
/* components */
/* 3rd party lib */
import gsap from 'gsap';
import moment from 'moment';
// import { CustomWiggle } from 'gsap/CustomWiggle';
import { Empty, Tooltip, Button } from 'antd';
/* Util */
import { TIntakeTableState } from '../TaskPage';
import { emptyStringWhenUndefinedOrNull } from 'src/shared/Utils';
import { TaskPageContext } from 'src/containers/TaskPage/TaskPageContext';

export interface MobileTaskTableProps {}

type Props = MobileTaskTableProps;
const MobileTaskTable: React.FC<Props> = () => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const taskPageContext = useContext(TaskPageContext);

  /* ================================================== */
  /*  method */
  /* ================================================== */

  // sort array using created at date
  const sortByCreatedAt = (a: TIntakeTableState, b: TIntakeTableState) => {
    return moment(b.createdAt).diff(moment(a.createdAt));
  };

  const checkFilterString = useCallback(
    (intakeChild: TIntakeTableState) => {
      if (taskPageContext === null) return;
      const { filterText } = taskPageContext;
      let date = moment(intakeChild.createdAt).format('DD-MM-YYYY');
      let time = moment(intakeChild.createdAt).format('HH:mm A');
      let listOfUsers = intakeChild.assign.reduce(
        (finalString, assignChild) =>
          (finalString += `${assignChild.user.first_name} ${emptyStringWhenUndefinedOrNull(
            assignChild.user.last_name,
          )} ${assignChild.user.username} ${assignChild.user.role} `),
        '',
      );

      // if filtertext has nothing straight return the whole array
      if (filterText === '') return intakeChild;
      var searchedText = filterText.toLowerCase();

      var pattern = filterText
        .split('')
        .map((x) => {
          return `(?=.*${x})`;
        })
        .join('');

      var regex = new RegExp(`${pattern}`, 'g');

      // basically if there's a result, it will return array instead of null
      let regexBoolean =
        intakeChild.bay.toLowerCase().match(regex) ||
        intakeChild.description.toLowerCase().match(regex) ||
        intakeChild.assign.length.toString().match(regex) ||
        intakeChild.serviceType.toLowerCase().match(regex) ||
        date.toLowerCase().match(regex) ||
        listOfUsers.toLowerCase().match(regex) ||
        time.toLowerCase().match(regex) ||
        intakeChild.regNumber.toLowerCase().match(regex) ||
        intakeChild.status.toLowerCase().match(regex);

      // if not return the filtered result
      // if includes doesnt return result, it will fallback to regex to get better tweaked result
      return (
        regexBoolean ||
        intakeChild.bay.toLowerCase().includes(searchedText) ||
        intakeChild.description.toLowerCase().includes(searchedText) ||
        intakeChild.assign.length.toString().includes(searchedText) ||
        intakeChild.serviceType.toLowerCase().includes(searchedText) ||
        intakeChild.status.toLowerCase().includes(searchedText) ||
        date.toLowerCase().includes(searchedText) ||
        listOfUsers.toLowerCase().includes(searchedText) ||
        time.toLowerCase().includes(searchedText) ||
        intakeChild.regNumber.toLowerCase().includes(searchedText)
      );
    },
    [taskPageContext],
  );

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
  }, []);

  useEffect(() => {
    if (taskPageContext === null) return;
    const { incomingData, intakeDict, setIncomingData } = taskPageContext;
    // If there is incoming data, update the table or add a new row to the table
    if (incomingData && incomingData !== undefined && typeof incomingData === 'object') {
      if (intakeDict) {
        gsap.to(`.mobileintakesummary__row-${incomingData.data.id}`, {
          duration: 0.2,
          background: '#245676',
          onComplete: () =>
            gsap.to(`.mobileintakesummary__row-${incomingData.data.id}`, {
              duration: 0.2,
              background: '#091a41', //+ 1 because 0 is not odd or even
            }),
        });
      }

      let serviceTypeOnlyArray: string[] = [];
      if (incomingData.data.jobs !== undefined) {
        incomingData.data.jobs.forEach((job) => serviceTypeOnlyArray.push(job.service_type));
      }
      let uniqueService = [...new Set(serviceTypeOnlyArray)];

      if (intakeDict === null) return;
      let intakeTableObj: TIntakeTableState = {
        key: incomingData.data.id.toString(),
        dateTimeIn: moment(incomingData.data.created_at), //formatted timestamp
        createdAt: incomingData.data.created_at, //raw timestamp
        pickup: incomingData.data.pick_up,
        assign: incomingData.data.intake_users,
        regNumber: incomingData.data.registration,
        description: incomingData.data.description,
        serviceType: uniqueService.length > 0 ? uniqueService.join() : '-',
        status: incomingData.data.intake_status.title,
        bay: incomingData.data.bay === '' ? '-' : incomingData.data.bay,
      };

      intakeDict[incomingData.data.id] = intakeTableObj;
      setIncomingData(null);
    }
  }, [taskPageContext]);

  useEffect(() => {
    if (taskPageContext === null) return;
    const { intakeDict, filterText } = taskPageContext;

    if (intakeDict && filterText !== '' && Object.values(intakeDict).filter(checkFilterString).length === 0) {
      // the text no result shaking/wiggling
      var tl = new TimelineMax({ repeat: 0, repeatDelay: 0 })
        .to('.mobiletasktable__emptyresult-title', 0.5, { rotation: 15 })
        .to('.mobiletasktable__emptyresult-title', 5, { rotation: 0, ease: Elastic.easeOut.config(0.9, 0.1) });

      // when theres no result after filter, set to a fixed height
      gsap.to('.task__table-wrapper', { minHeight: 'calc(100vh - 20rem)', maxHeight: 'calc(100vh - 20rem)' });
      gsap.to('.mobiletasktable__div', { overflow: 'hidden' });

      tl.play();
    } else {
      // set over flow back to auto
      gsap.to('.mobiletasktable__div', { overflow: 'auto' });
    }
  }, [checkFilterString, taskPageContext]);

  if (taskPageContext === null) {
    return null;
  }
  const {
    intakeDict,
    filterText,
    setFilterText,
    updateIntakeJobsForm,
    goToUpdateSpecificIntake,
    onGetSpecificIntakeJobs,
  } = taskPageContext;

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {intakeDict && (
        <div
          className="mobiletasktable__div"
          style={{
            marginTop: Object.values(intakeDict).length === 0 ? 0 : '5.5rem',
            paddingBottom: Object.values(intakeDict).length === 0 ? 0 : '5.5rem',
          }}
        >
          <>
            {Object.values(intakeDict).length > 0 ? (
              <>
                {filterText !== '' && Object.values(intakeDict).filter(checkFilterString).length === 0 ? (
                  <div className="mobiletasktable__emptyresult-div">
                    <div>
                      <div className="mobiletasktable__emptyresult-title">No result!</div>
                      <div className="mobiletasktable__emptyresult-text">
                        But don't panic, here's an undo button
                        <br />
                        to erase your mistake
                      </div>
                      <Button onClick={() => setFilterText('')} className="mobiletasktable__emptyresult-button">
                        <i className="fas fa-eraser"></i>&nbsp;Undo
                      </Button>
                    </div>
                  </div>
                ) : (
                  Object.values(intakeDict)
                    .filter(checkFilterString)
                    .sort((a: TIntakeTableState, b: TIntakeTableState) => sortByCreatedAt(a, b))
                    .map((child: TIntakeTableState) => {
                      let companyName = child.regNumber.split('-')[1];
                      let defaultColor = '#b2d8e9';
                      let grey = '#808080';
                      let readyToPickUp = '#63a777';
                      let onHold = '#e98923';
                      let inProgress = '#edd864';
                      let statusColor = '';
                      switch (child.status) {
                        case 'Ready for Pick-up'.toLowerCase():
                          statusColor = readyToPickUp;
                          break;
                        case 'Done'.toLowerCase():
                          statusColor = grey;
                          break;
                        case 'In Progress'.toLowerCase():
                          statusColor = inProgress;
                          break;
                        case 'On Hold'.toLowerCase():
                          statusColor = onHold;
                          break;
                        default:
                          statusColor = defaultColor;
                      }
                      return (
                        <div className="mobiletasktable__intake-row-parent" key={`mobileintake${child.key}`}>
                          <div
                            className={`mobiletasktable__intake-row mobileintakesummary__row-${child.key}`}
                            onClick={() => {
                              onGetSpecificIntakeJobs(parseInt(child.key));
                              updateIntakeJobsForm.setFieldsValue({
                                intakeId: child.key,
                                pickup: child.pickup,
                                description: child.description,
                                registrationNumber: child.regNumber,
                                bay: child.bay === '-' ? '' : child.bay,
                              });
                              goToUpdateSpecificIntake();
                            }}
                          >
                            <div>
                              {/* ========================================= */}
                              {/* Company Name & intake reg number */}
                              {/* ========================================= */}
                              <div className="mobiletasktable__title-div">
                                <div className="mobiletasktable__title-innerdiv">
                                  <span className="mobiletasktable__title-regNumber" style={{ color: statusColor }}>
                                    {child.regNumber.split('-')[0]}
                                  </span>
                                </div>
                                {child.bay !== '-' ? (
                                  <span className="mobiletasktable__div-bottom-bay">Bay {child.bay}</span>
                                ) : (
                                  ''
                                )}
                              </div>
                            </div>
                            <div className="mobiletasktable__title-company-outerdiv">
                              {companyName !== undefined && (
                                <div className="mobiletasktable__title-company">{companyName}</div>
                              )}
                            </div>
                            {/* ========================================= */}
                            {/* Service Type */}
                            {/* ========================================= */}
                            <div className="mobiletasktable__div-servicetype">
                              {child.serviceType === '-' ? 'No jobs yet, chill out...' : child.serviceType}
                            </div>
                            {/* ========================================= */}
                            {/* Description */}
                            {/* ========================================= */}
                            {child.description !== '' && child.description && (
                              <div className="mobiletasktable__div-description">
                                <div className="mobiletasktable__div-description-icon">
                                  <i className="fas fa-clipboard"></i>
                                </div>

                                <div className="mobiletasktable__div-description-text">{child.description}</div>
                              </div>
                            )}

                            {/* ======================================== */}
                            {/* The bay and the created at date/time */}
                            {/* ======================================== */}
                            <div className="mobiletasktable__div-bottom-div">
                              <span className="mobiletasktable__title-status" style={{ color: statusColor }}>
                                {child.status}
                              </span>

                              <div className="mobiletasktable__div-createdat">
                                Created at&nbsp;
                                {child.dateTimeIn.format('DD-MM-YYYY')}
                                &nbsp;&nbsp;<i className="far fa-clock"></i>&nbsp;{child.dateTimeIn.format('HH:mm')}
                              </div>
                            </div>
                          </div>

                          {/* Assignees red circle */}
                          <Tooltip
                            title={
                              <>
                                <ol>
                                  {child.assign.length > 0
                                    ? child.assign.map((child) => (
                                        <li key={`assignees${child.id}`} className="task__table-assignees">
                                          {child.user.first_name}&nbsp;
                                          {child.user.last_name ? child.user.last_name : ''}
                                        </li>
                                      ))
                                    : '-'}
                                </ol>
                              </>
                            }
                          >
                            <span className="mobiletasktable__assignees">
                              <div className="flex-align-center">
                                <i className="fas fa-user"></i>&nbsp;x&nbsp;{child.assign.length}
                              </div>
                            </span>
                          </Tooltip>
                        </div>
                      );
                    })
                )}
              </>
            ) : (
              <div className="mobiletasktable__div-empty">
                <Empty />
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default MobileTaskTable;

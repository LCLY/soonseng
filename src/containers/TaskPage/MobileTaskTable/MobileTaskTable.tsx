import React, { useEffect, useContext } from 'react';
import './MobileTaskTable.scss';
/* components */
/* 3rd party lib */
import moment from 'moment';
import { Tooltip } from 'antd';
/* Util */
import { TIntakeTableState } from '../TaskPage';
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

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
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

  if (taskPageContext === null) {
    return null;
  }
  const {
    intakeDict,

    updateIntakeJobsForm,
    goToUpdateSpecificIntake,
    onGetSpecificIntakeJobs,
  } = taskPageContext;

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <div className="mobiletasktable__div">
        {intakeDict && (
          <>
            {Object.values(intakeDict)
              .sort((a: TIntakeTableState, b: TIntakeTableState) => sortByCreatedAt(a, b))
              .map((child: TIntakeTableState) => (
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
                      <Tooltip
                        title={
                          <>
                            <span className="all-uppercase">{child.regNumber}</span>
                            <span>{`${
                              child.description !== undefined && child.description !== null && child.description !== ''
                                ? ` (${child.description})`
                                : ''
                            }`}</span>
                          </>
                        }
                      >
                        <span
                          className="mobiletasktable__title"
                          style={{ color: child.status === 'Ready for Pick-up' ? '#63a777' : '#df7471' }}
                        >
                          {child.regNumber}
                          {child.bay !== '-' ? (
                            <span className="mobiletasktable__title--bay">
                              &nbsp;&nbsp;-&nbsp;&nbsp;Bay {child.bay}
                            </span>
                          ) : (
                            ''
                          )}
                        </span>
                      </Tooltip>
                    </div>
                    <div className="mobiletasktable__div-servicetype">
                      {child.serviceType === '-' ? 'No service yet' : child.serviceType}
                    </div>
                    {child.description !== '' && child.description && (
                      <div className="mobiletasktable__div-description">Description: {child.description}</div>
                    )}

                    <div className="mobiletasktable__div-createdat">
                      <i className="far fa-clock"></i>&nbsp;Created at&nbsp;
                      {child.dateTimeIn.format('DD-MM-YYYY')}
                      &nbsp;{child.dateTimeIn.format('HH:mm A')}
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
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default MobileTaskTable;

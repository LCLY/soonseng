import React, { useEffect, useState, useCallback, useMemo, useContext, useRef, MutableRefObject } from 'react';
import './TaskPage2.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import Backdrop from 'src/components/Backdrop/Backdrop';
import MobileTaskTable from './MobileTaskTable/MobileTaskTable';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import CreateSpecificIntake, {
  TServiceTableState,
} from 'src/containers/TaskPage/CreateSpecificIntake/CreateSpecificIntake';
import UpdateSpecificIntake, {
  TUpdateTaskTableState,
} from 'src/containers/TaskPage//UpdateSpecificIntake/UpdateSpecificIntake';
/* 3rd party lib */
import gsap from 'gsap';
import axios from 'axios';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import ReactSvgPieChart from 'react-svg-piechart';

// import { ActionCableConsumer } from 'react-actioncable-provider';
import { Layout, Collapse, notification, Form, Table, message, Input, Tooltip } from 'antd';

/* Util */
import { RootState } from 'src';
import { ActionCableContext } from 'src/index';
import * as actions from 'src/store/actions/index';
import { TaskPageContext } from './TaskPageContext';
import {
  // IIntakeJobsFormData,
  IIntakeLogs,
  IIntakeUser,
  // IJobFormData,
  TReceivedIntakeSummaryObj,
  TReceivedSpecificIntakeJobsObj,
  TServiceTypeTaskDict,
} from 'src/store/types/task';
import {
  convertHeader,
  // emptyStringWhenUndefinedOrNull,
  getColumnSearchProps,
  setFilterReference,
} from 'src/shared/Utils';

import { TReceivedUserInfoObj, TUserAccess } from 'src/store/types/auth';
import { TReceivedIntakeStatusObj, TReceivedServiceTaskObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';
import { TReceivedPerformanceIntakeObj } from 'src/store/types/performance';
import { INotification } from 'src/store/types/general';

const { Panel } = Collapse;
const { Search } = Input;

export type TTaskTableState = {
  key: string;
  taskId: string;
  taskType: string;
  taskTitle: string;
  taskStatus: string;
  taskTitleString?: string;
  taskDescription: string;
  assign: number[];
};

export type TIntakeTableState = {
  key: string;
  dateTimeIn: any;
  time: any;
  createdAt: string;
  regNumber: string;
  serviceType: string;
  status: string;
  company: string;
  pickup: boolean;
  assign: IIntakeUser[];
  description: string;
  bay: string;
};
export interface IIntakeDict {
  [intakeId: number]: TIntakeTableState;
}

export interface IServiceTaskDropdown {
  [key: string]: {
    serviceTaskId: string;
    serviceTaskTitle: string;
    serviceType: TReceivedServiceTypesObj;
    serviceTaskDropdownArray: TReceivedServiceTaskObj[] | null;
  };
}

export interface IPieChart {
  label: string;
  value: number;
  color: string;
}

interface TaskPageProps {}

type Props = TaskPageProps & StateProps & DispatchProps;

const TaskPage2: React.FC<Props> = ({
  // accessObj,
  auth_token,
  userInfoObj,
  notificationObj,
  successMessage,
  specificIntakeLogs,
  serviceTypesArray,
  intakeSummaryArray,
  performanceIntakeData,
  onGetIntakeStatus,
  onGetIntakeSummary,
  onClearTaskState,
  onGetUsersByRoles,
  onGetServiceTypes,
  onGetSpecificIntakeJobs,
  onSetSpecificIntakeLogs,
  onSetToggleUserAssign,
  onGetPerformanceIntakeData,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const cableApp = useContext(ActionCableContext);
  const cableRef = useRef() as MutableRefObject<any>;
  const notificationRef = useRef<any>(null);

  const [currentPage, setCurrentPage] = useState<'main' | 'update' | 'create'>('main');
  // const [pieChartData, setPieChartData] = useState();
  const [inEditMode, setInEditMode] = useState(true);
  const [intakeDict, setIntakeDict] = useState<IIntakeDict | null>(null);
  const [showMobileHistoryLogs, setShowMobileHistoryLogs] = useState(false);
  const [startLogsAnimation, setStartLogsAnimation] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({ intake_job: false });
  const [serviceTaskDropdown, setServiceTaskDropdown] = useState<IServiceTaskDropdown>({});
  const [beforeDeleteState, setBeforeDeleteState] = useState<TUpdateTaskTableState[] | null>(null);

  // Forms
  const [createIntakeJobsForm] = Form.useForm();
  const [updateIntakeJobsForm] = Form.useForm();

  // Incoming websocket data
  const [incomingData, setIncomingData] = useState<{ data: TReceivedIntakeSummaryObj; action: string } | null>(null);
  // Table states
  // const [taskTableState, setTaskTableState] = useState<TTaskTableState[] | null>(null);
  const [createServiceTableState, setCreateServiceTableState] = useState<TServiceTableState>({});
  // const [intakeTableState, setIntakeTableState] = useState<TIntakeTableState[]>([]);
  const [serviceTypeTaskDict, setServiceTypeTaskDict] = useState<TServiceTypeTaskDict | null>(null);

  const [filterText, setFilterText] = useState('');

  let intakeJobsSearchInput = null; //this is for filter on antd table

  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });
  setFilterReference(filterData, setFilterData);

  /* =========================================== */
  /* intake table column initialization */
  /* =========================================== */
  const [intakeJobsColumns, setIntakeJobsColumns] = useState([
    {
      key: 'dateTimeIn',
      title: 'Date',
      dataIndex: 'dateTimeIn',
      width: '10rem',
      ellipsis: true,
      align: 'center',
      sorter: (a: TIntakeTableState, b: TIntakeTableState) =>
        (moment as any)(a.dateTimeIn).format('YYYYMMDD') - (moment as any)(b.dateTimeIn).format('YYYYMMDD'),
      render: (_: any, record: TIntakeTableState) => {
        return <span className="task__table-col--datetime">{record.dateTimeIn.format('DD-MM-YYYY')}</span>;
      },
    },
    {
      key: 'time',
      title: 'Time',
      dataIndex: 'time',
      width: '7rem',
      ellipsis: true,
      align: 'center',
      sorter: (a: TIntakeTableState, b: TIntakeTableState) =>
        (moment as any)(a.dateTimeIn).format('HH:mm') - (moment as any)(b.dateTimeIn).format('HH:mm'),
      render: (_: any, record: TIntakeTableState) => {
        return <span className="task__table-col--datetime">{record.dateTimeIn.format('HH:mm')}</span>;
      },
    },

    {
      key: 'regNumber',
      title: 'Reg No',
      dataIndex: 'regNumber',
      width: '11rem',
      align: 'center',
      ellipsis: true,
      sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.regNumber.localeCompare(b.regNumber),
      // ...getColumnSearchProps(intakeJobsSearchInput, 'regNumber', 'Registration Number'),
      render: (_text: any, record: TIntakeTableState) => {
        return (
          <>
            <Tooltip
              title={
                <>
                  <span className="all-uppercase">{record.regNumber}</span>
                  <span>{`${
                    record.description !== undefined && record.description !== null && record.description !== ''
                      ? ` (${record.description})`
                      : ''
                  }`}</span>
                </>
              }
            >
              <span
                className="task__link"
                onClick={() => {
                  onGetSpecificIntakeJobs(parseInt(record.key));
                  updateIntakeJobsForm.setFieldsValue({
                    intakeId: record.key,
                    pickup: record.pickup,
                    description: record.description,
                    registrationNumber: record.regNumber,
                    bay: record.bay === '-' ? '' : record.bay,
                  });
                  goToUpdateSpecificIntake();
                  // setShowUpdateModal({ ...showUpdateModal, intake_job: true });
                  // setSpecificIntakeId(parseInt(record.key));
                }}
              >
                {record.regNumber.split('-')[0]}
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      key: 'company',
      title: 'Company',
      dataIndex: 'company',
      width: 'auto',
      ellipsis: true,
      ...getColumnSearchProps(intakeJobsSearchInput, 'company', 'Company'),
      sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.company.localeCompare(b.company),
    },
    {
      key: 'bay',
      title: 'Bay',
      dataIndex: 'bay',
      width: '10rem',
      sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.bay.localeCompare(b.bay),
    },
    // {
    //   key: 'serviceType',
    //   title: 'Job Type',
    //   dataIndex: 'serviceType',
    //   width: 'auto',
    //   ellipsis: true,
    //   ...getColumnSearchProps(intakeJobsSearchInput, 'serviceType', 'Job Type'),
    //   sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.serviceType.localeCompare(b.serviceType),
    // },

    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: '12rem',
      ellipsis: true,
      align: 'center',
      render: (_text: any, record: TIntakeTableState) => {
        let defaultColor = '#7c7c82';
        let grey = '#808080';
        let readyToPickUp = '#2b9d2b';
        let onHold = '#e98923';
        let inQueue = '#d5c129';
        let inProgress = '#277ded';
        let statusColor = '';
        switch (record.status.toLowerCase()) {
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
          case 'In Queue'.toLowerCase():
            statusColor = inQueue;
            break;
          default:
            statusColor = defaultColor;
        }
        return <span style={{ color: statusColor, fontWeight: 'bolder' }}>{record.status}</span>;
      },
    },

    // {
    //   key: 'assignees',
    //   title: 'Assignees',
    //   dataIndex: 'assignees',
    //   // width: '10rem',
    //   ellipsis: true,
    //   align: 'center',
    //   render: (_text: any, record: TIntakeTableState) => {
    //     return (
    //       <>
    //         {userInfoObj?.roles.title === 'Mechanic' ? (
    //           <Button
    //             type="primary"
    //             className="make__brand-btn"
    //             onClick={() => onSetToggleUserAssign(parseInt(record.key))}
    //           >
    //             {record.assign.filter((child) => child.user.id === userInfoObj?.id).length > 0 ? 'Unassign' : 'Assign'}
    //           </Button>
    //         ) : (
    //           <Tooltip
    //             title={
    //               <>
    //                 <ol>
    //                   {record.assign.length > 0
    //                     ? record.assign.map((child) => (
    //                         <li key={`assignees${child.id}`} className="task__table-assignees">
    //                           {child.user.first_name}&nbsp;
    //                           {child.user.last_name ? child.user.last_name : ''}
    //                         </li>
    //                       ))
    //                     : '-'}
    //                 </ol>
    //               </>
    //             }
    //           >
    //             <i className="fas fa-user"></i> x {record.assign.length}
    //           </Tooltip>
    //         )}
    //       </>
    //     );
    //   },
    // },

    // {
    //   key: 'bay',
    //   title: 'Bay',
    //   dataIndex: 'bay',
    //   width: '10rem',
    //   align: 'center',
    //   ellipsis: true,
    //   // sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.bay.localeCompare(b.bay),
    //   // ...getColumnSearchProps(intakeJobsSearchInput, 'bay', 'Bay'),
    // },
  ]);

  /* ================================================== */
  /*  method */
  /* ================================================== */

  const goToUpdateSpecificIntake = useCallback(() => {
    setCurrentPage('update');
    gsap.to('.task__table-div', {
      duration: 1,
      ease: 'ease',
      x: '-100%',
    });
  }, []);

  const goToCreateSpecificIntake = () => {
    setCurrentPage('create');
    gsap.to('.task__table-div', {
      duration: 1,
      ease: 'ease',
      x: '100%',
    });
  };

  // sort array using created at date
  const sortByCreatedAt = (a: TIntakeTableState, b: TIntakeTableState) => {
    return moment(b.createdAt).diff(moment(a.createdAt));
  };

  const contextValue = useMemo(
    () => ({
      intakeDict,
      filterText,
      setFilterText,
      incomingData,
      userInfoObj,
      // checkItemsHeight,
      setIncomingData,
      updateIntakeJobsForm,
      goToUpdateSpecificIntake,
      onGetSpecificIntakeJobs,
      onSetToggleUserAssign,
    }),
    [
      intakeDict,
      filterText,
      userInfoObj,
      incomingData,
      // checkItemsHeight,
      setFilterText,
      setIncomingData,
      updateIntakeJobsForm,
      onSetToggleUserAssign,
      goToUpdateSpecificIntake,
      onGetSpecificIntakeJobs,
    ],
  );

  const checkFilterString = (intakeChild: TIntakeTableState) => {
    // let date = moment(intakeChild.createdAt).format('DD-MM-YYYY');
    // let time = moment(intakeChild.createdAt).format('HH:mm A');
    // let listOfUsers = intakeChild.assign.reduce(
    //   (finalString, assignChild) =>
    //     (finalString += `${assignChild.user.first_name} ${emptyStringWhenUndefinedOrNull(assignChild.user.last_name)} ${
    //       assignChild.user.username
    //     } ${assignChild.user.role} `),
    //   '',
    // );

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
      // intakeChild.bay.toLowerCase().match(regex) ||
      // intakeChild.description.toLowerCase().match(regex) ||
      // intakeChild.assign.length.toString().match(regex) ||
      // intakeChild.serviceType.toLowerCase().match(regex) ||
      // date.toLowerCase().match(regex) ||
      // listOfUsers.toLowerCase().match(regex) ||
      // time.toLowerCase().match(regex) ||
      intakeChild.regNumber.toLowerCase().match(regex);
    // intakeChild.status.toLowerCase().match(regex);

    // if not return the filtered result
    // if includes doesnt return result, it will fallback to regex to get better tweaked result
    return (
      regexBoolean ||
      // intakeChild.bay.toLowerCase().includes(searchedText) ||
      // intakeChild.description.toLowerCase().includes(searchedText) ||
      // intakeChild.assign.length.toString().includes(searchedText) ||
      // intakeChild.serviceType.toLowerCase().includes(searchedText) ||
      // intakeChild.status.toLowerCase().includes(searchedText) ||
      // date.toLowerCase().includes(searchedText) ||
      // listOfUsers.toLowerCase().includes(searchedText) ||
      // time.toLowerCase().includes(searchedText) ||
      intakeChild.regNumber.toLowerCase().includes(searchedText)
    );
  };
  /* ================================================== */
  /*  components */
  /* ================================================== */

  let mobileSpecificIntakeLogsComponent = (
    <>
      <Backdrop
        show={startLogsAnimation}
        backdropZIndex={1000}
        clicked={() => {
          setStartLogsAnimation(false);
        }}
      />

      <div className="updatespecificintake__logs--mobile">
        <div className="updatespecificintake__logs-title">
          <div>Intake History Logs</div>
          <div className="updatespecificintake__logs-icon" onClick={() => setStartLogsAnimation(false)}>
            <i className="fas fa-times-circle"></i>
          </div>
        </div>
        {specificIntakeLogs ? (
          <Collapse accordion className="task__collapse">
            {[...specificIntakeLogs].reverse().map((child, index) => (
              <Panel
                header={
                  <div className="task__collapse-header">
                    <div className="task__collapse-header-title">{child.title === '' ? '-' : child.title}</div>
                    <div className="task__collapse-header-time">
                      <i className="fas fa-clock"></i>
                      {moment(child.created_at).format('HH:mm')}
                    </div>
                  </div>
                }
                key={`log${index}`}
              >
                <section className="task__collapse-content">
                  <div className="task__collapse-row">
                    <div className="task__collapse-row-label">Note:</div>
                    <div className="task__collapse-row-description">
                      {child.description === '' ? '-' : child.description}
                    </div>
                  </div>
                  <div className="task__collapse-row">
                    <div className="task__collapse-row-label">Updated at:</div>
                    <div>{moment(child.created_at).format('DD/MM/YYYY HH:mm:A')}</div>
                  </div>
                </section>
                <div className="task__collapse-row task__collapse-row--user">
                  <div>
                    <i className="fas fa-user"></i>
                  </div>
                  &nbsp;
                  <div>{child.created_by}</div>
                </div>
              </Panel>
            ))}
          </Collapse>
        ) : (
          <div className="task__collapse-spin">
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    const channel = cableApp.cable.subscriptions.create(
      { channel: 'JobMonitoringChannel' },
      {
        connected: () => console.log('Intakes connected'),
        received: (res: any) => {
          // console.log(res);

          if (res.action === 'destroy') {
            // if action is delete/destroy
            let tempIntakeDict = { ...intakeDict }; //copy object first
            let destroyedIntakeId = res.data.id; //get the destoyed intake id
            // delete the whole key and value from the dict
            delete tempIntakeDict[destroyedIntakeId];
            setIntakeDict(tempIntakeDict); //update it
          } else {
            setIncomingData(res);
          }
        },
      },
    );

    cableRef.current = channel;
  }, [cableRef, intakeDict, cableApp.cable.subscriptions]);

  useEffect(() => {
    if (serviceTypesArray) {
      // loop through the service Types array and call the service task array api
      let tempObj: any = {};
      serviceTypesArray.forEach((serviceType) => {
        let url = process.env.REACT_APP_API + `/job_monitoring/service_types/${serviceType.id}/service_tasks`;
        axios
          .get(url)
          .then((res) => {
            tempObj[serviceType.id] = {}; //create empty object first with the id then proceed to fill it up with other data
            tempObj[serviceType.id]['title'] = serviceType.title;
            tempObj[serviceType.id]['description'] = serviceType.description;
            tempObj[serviceType.id]['serviceTasksArray'] = res.data.service_tasks;
          })
          .catch((err) => console.log(err));
      });

      setServiceTypeTaskDict(tempObj);
    }
  }, [serviceTypesArray]);

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
    // onGetTasks();
    onGetIntakeStatus();
    onGetServiceTypes();
    onGetIntakeSummary();
    let startOfMonth = moment().startOf('month').format('DD/MM/YYYY');
    // let startOfMonth = moment('01/05/2021').format('DD/MM/YYYY');
    let endOfMonth = moment().endOf('month').format('DD/MM/YYYY');
    if (auth_token) {
      onGetPerformanceIntakeData(startOfMonth, endOfMonth);
    }
    onGetUsersByRoles(undefined, '');
  }, [
    auth_token,
    onGetIntakeStatus,
    onGetIntakeSummary,
    onGetUsersByRoles,
    onGetServiceTypes,
    onGetPerformanceIntakeData,
  ]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for Tasks
  /* ----------------------------------------------------- */
  useEffect(() => {
    // let tempArray: TIntakeTableState[] = [];
    let intakeDictObj: any = {};
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (intake: TReceivedIntakeSummaryObj) => {
      // only render when available value is true

      let serviceTypeOnlyArray: string[] = [];
      if (intake.jobs !== undefined) {
        intake.jobs.forEach((job) => serviceTypeOnlyArray.push(job.service_type));
      }

      let uniqueService = [...new Set(serviceTypeOnlyArray)];

      let companyUndefined =
        intake.registration.split('-')[1] === undefined ||
        intake.registration.split('-')[1] === null ||
        intake.registration.split('-')[1] === '';

      intakeDictObj[intake.id] = {
        key: intake.id.toString(),
        dateTimeIn: moment(intake.created_at), //formatted timestamp
        createdAt: intake.created_at, //raw timestamp
        pickup: intake.pick_up,
        regNumber: intake.registration.split('-')[0],
        company: companyUndefined ? '-' : intake.registration.split('-')[1],
        assign: intake.intake_users,
        description: intake.description,
        serviceType: uniqueService.length > 0 ? uniqueService.join() : '-',
        status: intake.intake_status.title,
        bay: intake.bay === '' || intake.bay === null ? '-' : intake.bay,
      };
    };

    if (intakeSummaryArray) {
      console.log(intakeSummaryArray);

      // Execute function "storeValue" for every array index
      intakeSummaryArray.map(storeValue);
    }
    // update the state with tempArray
    // tempArray.sort((a: TIntakeTableState, b: TIntakeTableState) => sortByCreatedAt(a, b));
    // setIntakeTableState(tempArray);
    setIntakeDict(intakeDictObj);
  }, [intakeSummaryArray]);

  useEffect(() => {
    // whenever the page is not in update, reset the specific intake logs
    if (currentPage !== 'update') {
      onSetSpecificIntakeLogs(null);
    }
  }, [currentPage, onSetSpecificIntakeLogs]);

  const goBackToIntakes = useCallback(() => {
    createIntakeJobsForm.resetFields();
    setCreateServiceTableState({});
    setCurrentPage('main');
    gsap.to('.task__table-div', {
      duration: 1,
      ease: 'ease',
      x: '0',
    });
  }, [createIntakeJobsForm]);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);

      // setInEditMode(false);
      setBeforeDeleteState(null); //make sure that before delete state is null after successfully updated

      goBackToIntakes();
      setShowCreateModal({
        ...showCreateModal,
        intake_job: false,
      });

      onClearTaskState();
    }
  }, [successMessage, createIntakeJobsForm, goBackToIntakes, onClearTaskState, showCreateModal]);

  useEffect(() => {
    // If there is incoming data, update the table or add a new row to the table
    if (incomingData && incomingData !== undefined && typeof incomingData === 'object') {
      if (intakeDict) {
        let sortedIntakeArray = Object.values(intakeDict).sort((a: TIntakeTableState, b: TIntakeTableState) =>
          sortByCreatedAt(a, b),
        );

        let rowIndexInTable = sortedIntakeArray.findIndex((child) => parseInt(child.key) === incomingData.data.id);

        (gsap as any).to(`.intakesummary__row-${incomingData.data.id}`, {
          duration: 0.2,
          background: '#245676',
          onComplete: () =>
            gsap.to(`.intakesummary__row-${incomingData.data.id}`, {
              duration: 0.2,
              background: (rowIndexInTable + 1) % 2 === 0 ? '#051231' : '#010c24', //+ 1 because 0 is not odd or even
            }),
        });
      }

      let serviceTypeOnlyArray: string[] = [];
      if (incomingData.data.jobs !== undefined) {
        incomingData.data.jobs.forEach((job) => serviceTypeOnlyArray.push(job.service_type));
      }
      let uniqueService = [...new Set(serviceTypeOnlyArray)];

      if (intakeDict === null) return;

      let companyUndefined =
        incomingData.data.registration.split('-')[1] === undefined ||
        incomingData.data.registration.split('-')[1] === null ||
        incomingData.data.registration.split('-')[1] === '';

      let intakeTableObj: TIntakeTableState = {
        key: incomingData.data.id.toString(),
        dateTimeIn: moment(incomingData.data.created_at), //formatted timestamp
        time: moment(incomingData.data.created_at),
        createdAt: incomingData.data.created_at, //raw timestamp
        pickup: incomingData.data.pick_up,
        assign: incomingData.data.intake_users,
        regNumber: incomingData.data.registration,
        description: incomingData.data.description,
        serviceType: uniqueService.length > 0 ? uniqueService.join() : '-',
        status: incomingData.data.intake_status.title,
        bay: incomingData.data.bay === '' || incomingData.data.bay === null ? '-' : incomingData.data.bay,
        company: companyUndefined ? '-' : incomingData.data.registration.split('-')[1],
      };

      intakeDict[incomingData.data.id] = intakeTableObj;
      setIncomingData(null);
    }
  }, [intakeDict, incomingData]);

  useEffect(() => {
    if (startLogsAnimation) {
      gsap.fromTo('.updatespecificintake__logs--mobile', { width: 0, height: 0 }, { width: '90vw', height: '90vh' });
    } else {
      gsap.to('.updatespecificintake__logs--mobile', { opacity: 0, duration: 0.2, delay: 0.1 }); //wait 1 second
      gsap.fromTo(
        '.updatespecificintake__logs--mobile',
        { width: '90vw', height: '90vh', overflow: 'hidden' },
        { width: 0, height: 0, onComplete: () => setShowMobileHistoryLogs(false) },
      );
    }
  }, [startLogsAnimation]);

  /* ================================================== */
  /* ================================================== */

  const [expandedSector, setExpandedSector] = useState<any>(null);
  const [expandedServiceTypeSector, setExpandedServiceTypeSector] = useState<any>(null);
  const [statusPieChartData, setStatusPieChartData] = useState<IPieChart[] | null>(null);
  const [serviceTypePieChartData, setServiceTypePieChartData] = useState<IPieChart[] | null>(null);

  // const data = [
  //   { label: 'Facebook', value: 0, color: '#3b5998' },
  //   { label: 'Twitter', value: 100, color: '#00aced' },
  //   { label: 'Google Plus', value: 0, color: '#dd4b39' },
  //   { label: 'Pinterest', value: 0, color: '#cb2027' },
  //   { label: 'Linked In', value: 0, color: '#007bb6' },
  // ];

  useEffect(() => {
    if (notificationObj) {
      notificationRef.current = notificationObj;
    }
  }, [notificationObj]);

  useEffect(() => {
    if (notificationRef.current) {
      cableApp.cable.subscriptions.create(
        {
          channel: 'NotificationChannel',
          notification_controller: 'JobMonitoringController',
          notification_type: 'intake_update',
        },
        {
          rejected: () => console.log('rejected'),
          connected: () => console.log('Notification cable connected'),
          received: (res: any) => {
            const args = {
              message: 'Update',
              description: res.data.title,
              // duration: 0,
            };
            notification.open(args);
          },
        },
      );
    }
  }, [cableApp.cable.subscriptions]);

  useEffect(() => {
    if (performanceIntakeData) {
      let statuses = performanceIntakeData.status;
      let service_types = performanceIntakeData.service_type;
      let data: any = [
        { label: 'Quotation', value: statuses['Pending Quotation'], color: '#138c78' },
        { label: 'In Progress', value: statuses['In Progress'], color: '#2362b5' },
        { label: 'Spareparts', value: statuses['Ordering Spareparts'], color: '#4b92d5' },
        { label: 'Pick-up', value: statuses['Ready for Pick-up'], color: '#3b5998' },
        { label: 'Done', value: statuses['Done'], color: '#4bd57e' },
        { label: 'On Hold', value: statuses['On hold'], color: '#149094' },
        { label: 'In Queue', value: statuses['In Queue'], color: '#3b7c7e' },
      ];
      let totalNumberOfStatuses = Object.values(performanceIntakeData.status).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

      let serviceTypeData: any = [
        { label: 'Puspakom Test', value: service_types['Puspakom Test'], color: '#4bd57e' },

        { label: 'Repair', value: service_types['Repair'], color: '#3b7c7e' },
        { label: 'Bodywork', value: service_types['Bodywork'], color: '#149094' },
        { label: 'Service', value: service_types['Service'], color: '#138c78' },
      ];

      let totalNumberOfJobTypes = Object.values(performanceIntakeData.service_type).reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue;
        },
        0,
      );

      if (totalNumberOfStatuses === 0) {
        data = null;
      }
      if (totalNumberOfJobTypes === 0) {
        serviceTypeData = null;
      }

      // let data = [
      //   {
      //     label: 'Docked',
      //     value: 1,
      //     color: '#2fc5ac',
      //   },
      //   { label: 'Quotation', value: 1, color: '#138c78' },
      //   { label: 'In Progress', value: 2, color: '#2362b5' },
      //   { label: 'Ordering Spareparts', value: 5, color: '#4b92d5' },
      //   { label: 'Ready for Pick-up', value: 3, color: '#3b5998' },
      //   { label: 'Done', value: 1, color: '#4bd57e' },
      //   { label: 'On Hold', value: 2, color: '#149094' },
      //   { label: 'In Queue', value: 8, color: '#3b7c7e' },
      // ];
      setStatusPieChartData(data);
      setServiceTypePieChartData(serviceTypeData);
    }
  }, [performanceIntakeData]);

  useEffect(() => {
    var browserPrefixes = ['moz', 'ms', 'o', 'webkit'],
      // isVisible = true,
      isVisible = true;

    // get the correct attribute name
    function getHiddenPropertyName(prefix: any) {
      return prefix ? prefix + 'Hidden' : 'hidden';
    }

    // get the correct event name
    function getVisibilityEvent(prefix: any) {
      return (prefix ? prefix : '') + 'visibilitychange';
    }

    // get current browser vendor prefix
    function getBrowserPrefix() {
      for (var i = 0; i < browserPrefixes.length; i++) {
        if (getHiddenPropertyName(browserPrefixes[i]) in document) {
          // return vendor prefix
          return browserPrefixes[i];
        }
      }

      // no vendor prefix needed
      return null;
    }

    // bind and handle events
    var browserPrefix = getBrowserPrefix(),
      hiddenPropertyName = getHiddenPropertyName(browserPrefix),
      visibilityEventName = getVisibilityEvent(browserPrefix);

    function onVisible() {
      // prevent double execution
      if (isVisible) {
        return;
      }

      // change flag value
      isVisible = true;
      console.log('visible');
    }

    function onHidden() {
      // prevent double execution
      if (!isVisible) {
        return;
      }

      // change flag value
      isVisible = false;
      console.log('hidden');
    }

    function handleVisibilityChange(forcedFlag: any) {
      // forcedFlag is a boolean when this event handler is triggered by a
      // focus or blur eventotherwise it's an Event object
      if (typeof forcedFlag === 'boolean') {
        if (forcedFlag) {
          return onVisible();
        }

        return onHidden();
      }

      if ((document as any)[hiddenPropertyName]) {
        return onHidden();
      }

      return onVisible();
    }

    document.addEventListener(visibilityEventName, handleVisibilityChange, false);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" name="Task" content="Task for intakes." />
        {notificationObj !== undefined && (
          <title>
            {notificationObj.notificationNumber > 0 ? `(${notificationObj.notificationNumber})` : ''} Service & Repair
          </title>
        )}
      </Helmet>
      {showMobileHistoryLogs && mobileSpecificIntakeLogsComponent}
      <NavbarComponent activePage="task" defaultOpenKeys="dashboard" />
      <Layout>
        <LayoutComponent>
          <div className="task__background">
            <CustomContainer>
              <div className="make__tab-outerdiv">
                <section>
                  <>
                    {intakeSummaryArray && intakeDict ? (
                      <section>
                        <div className="task__component-top">
                          <div className="task__component-top-title">
                            <div className="task__component-top-title-innerdiv">
                              <h1 className="task__component-h1">INTAKE ANALYSIS</h1>
                              <span className="task__component-activeintakes">
                                (Current Active Intakes:&nbsp;
                                {performanceIntakeData ? performanceIntakeData.total_active_intakes : 'loading...'})
                              </span>
                            </div>
                          </div>
                          <div className="task__component-top-content">
                            <div className="task__component-top-content-intakes">
                              <div className="task__component-top-content-intakes-date"> {moment().format('MMMM')}</div>
                              <div className="task__component-top-content-intakes-stats-div">
                                <div className="task__component-top-content-intakes-stats">
                                  TOTAL INTAKES:&nbsp;
                                  {performanceIntakeData
                                    ? performanceIntakeData.total_intakes_within_range
                                    : 'loading...'}
                                </div>
                                <div className="task__component-top-content-intakes-stats">
                                  ACTIVE INTAKES:&nbsp;
                                  {performanceIntakeData
                                    ? performanceIntakeData.active_intakes_within_range
                                    : 'loading...'}
                                </div>
                                <div className="task__component-top-content-intakes-stats">
                                  DONE INTAKES:&nbsp;
                                  {performanceIntakeData
                                    ? performanceIntakeData.done_intakes_within_range
                                    : 'loading...'}
                                </div>
                              </div>
                            </div>
                            <div>
                              <section className="task__stats-chart">
                                <div className="task__stats-chart-column">
                                  <span className="task__stats-chart-title">Status:</span>
                                  {statusPieChartData ? (
                                    <section className="task__section-chart">
                                      <div className="task__chart-div">
                                        <ReactSvgPieChart
                                          data={statusPieChartData}
                                          expandOnHover
                                          onSectorHover={(d: any, i: number, _e: any) => {
                                            if (d) {
                                              setExpandedSector(i);
                                            } else {
                                              setExpandedSector(null);
                                            }
                                          }}
                                        />
                                      </div>

                                      <div className="task__chart-legends-div">
                                        {statusPieChartData &&
                                          statusPieChartData.map((d, i) => (
                                            <div className="task__chart-legends-innerdiv" key={`status${i}`}>
                                              <div className="task__chart-legends" style={{ background: d.color }} />
                                              <span
                                                style={{
                                                  fontWeight: expandedSector === i ? 'bold' : 'normal',
                                                }}
                                              >
                                                {d.label} : {d.value}
                                              </span>
                                            </div>
                                          ))}
                                      </div>
                                    </section>
                                  ) : (
                                    <div className="task__chart-nodata">
                                      <div className="task__chart-nodata-innerdiv">
                                        <div>
                                          <div className="task__chart-nodata-icon-div">
                                            <i className="fas fa-chart-pie task__chart-nodata-icon"></i>
                                          </div>
                                          <div>No status at the moment</div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="task__stats-chart-column">
                                  <span className="task__stats-chart-title">Job Type:</span>
                                  {serviceTypePieChartData ? (
                                    <section className="task__section-chart">
                                      <div className="task__chart-div">
                                        <ReactSvgPieChart
                                          data={serviceTypePieChartData}
                                          expandOnHover
                                          onSectorHover={(d: any, i: number, _e: any) => {
                                            if (d) {
                                              setExpandedServiceTypeSector(i);
                                            } else {
                                              setExpandedServiceTypeSector(null);
                                            }
                                          }}
                                        />
                                      </div>

                                      <div className="task__chart-legends-div">
                                        {serviceTypePieChartData &&
                                          serviceTypePieChartData.map((d, i) => (
                                            <div className="task__chart-legends-innerdiv" key={`jobType${i}`}>
                                              <div className="task__chart-legends" style={{ background: d.color }} />
                                              <span
                                                style={{
                                                  fontWeight: expandedServiceTypeSector === i ? 'bold' : 'normal',
                                                }}
                                              >
                                                {d.label} : {d.value}
                                              </span>
                                            </div>
                                          ))}
                                      </div>
                                    </section>
                                  ) : (
                                    <div className="task__chart-nodata">
                                      <div className="task__chart-nodata-innerdiv">
                                        <div>
                                          <div className="task__chart-nodata-icon-div">
                                            <i className="fas fa-chart-pie task__chart-nodata-icon"></i>
                                          </div>
                                          <div>No job at the moment</div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                        <div className="task__component-bottom">
                          <div className="task__component-bottom-innerdiv">
                            <div className="task__component-bottom-title">
                              <div className="task__component-bottom-title-innerdiv">
                                <h1 className="task__component-h1">SCHEDULE</h1>
                              </div>
                              <div className="task__component-bottom-title-innerdiv task__component-bottom-title-innerdiv--intakelog">
                                <h1 className="task__component-h1">INTAKE LOG</h1>
                              </div>
                            </div>
                          </div>
                          <div className="task__component-bottom-content">
                            <div className="task__component-bottom-content-left">
                              <div className="task__searchbar-div">
                                {auth_token &&
                                  userInfoObj &&
                                  userInfoObj !== undefined &&
                                  userInfoObj.roles.title.toLowerCase() !== 'Mechanic'.toLowerCase() &&
                                  currentPage !== 'create' && (
                                    <div
                                      className="task__button"
                                      onClick={() => {
                                        goToCreateSpecificIntake();
                                        // setShowCreateModal({ ...showCreateModal, intake_job: true });
                                        // if (taskTableState === null) return;
                                        // const newData: any = {
                                        //   key: count.toString(),
                                        //   [`assign${count}`]: [],
                                        //   [`taskType${count}`]: '',
                                        //   [`taskTitle${count}`]: '',
                                        //   [`taskStatus${count}`]: '',
                                        //   [`taskDescription${count}`]: '',
                                        // };
                                        // let tempArray = [...taskTableState];
                                        // tempArray.push(newData);
                                        // setTaskTableState(tempArray);
                                      }}
                                    >
                                      <i className="fas fa-plus"></i>

                                      {/* Create <span className="task__button-text">&nbsp;New Intake</span> */}
                                    </div>
                                  )}

                                <div className="task__searchbar">
                                  <Search
                                    value={filterText}
                                    suffix={<i className="fas fa-times-circle" onClick={() => setFilterText('')}></i>}
                                    placeholder="Type registration number here to filter"
                                    onChange={(e) => setFilterText(e.target.value)}
                                    onSearch={(value) => setFilterText(value)}
                                    enterButton={<i className="fas fa-filter"></i>}
                                  />
                                </div>
                              </div>
                              <div className="task__table-wrapper">
                                {/* -------------------- */}
                                {/*     Search bar      */}
                                {/* -------------------- */}

                                <div className="task__table-outerdiv">
                                  <div className="task__table-parent">
                                    <div className="task__table-div">
                                      <div className="task__specific-div task__specific-div--create">
                                        <CreateSpecificIntake
                                          goBackToIntakes={goBackToIntakes}
                                          createServiceTableState={createServiceTableState}
                                          setCreateServiceTableState={setCreateServiceTableState}
                                          createIntakeJobsForm={createIntakeJobsForm}
                                          serviceTypeTaskDict={serviceTypeTaskDict}
                                          setServiceTypeTaskDict={setServiceTypeTaskDict}
                                          serviceTaskDropdown={serviceTaskDropdown}
                                          setServiceTaskDropdown={setServiceTaskDropdown}
                                        />
                                      </div>

                                      <section>
                                        <TaskPageContext.Provider value={contextValue}>
                                          <MobileTaskTable />
                                        </TaskPageContext.Provider>
                                        <Table
                                          bordered
                                          className="task__table"
                                          scroll={{ y: 600 }}
                                          // components={components}
                                          rowClassName={(record) => `intakesummary__row-${record.key}`}
                                          dataSource={Object.values(intakeDict)
                                            .filter((child) => child.status !== 'Done')
                                            .filter(checkFilterString)
                                            .sort((a: TIntakeTableState, b: TIntakeTableState) =>
                                              sortByCreatedAt(a, b),
                                            )}
                                          columns={convertHeader(intakeJobsColumns, setIntakeJobsColumns)}
                                          pagination={false}
                                        />
                                      </section>
                                      <div className="task__specific-div task__specific-div--update">
                                        <UpdateSpecificIntake
                                          inEditMode={inEditMode}
                                          setInEditMode={setInEditMode}
                                          setCurrentPage={setCurrentPage}
                                          beforeDeleteState={beforeDeleteState}
                                          setBeforeDeleteState={setBeforeDeleteState}
                                          serviceTypeTaskDict={serviceTypeTaskDict}
                                          setServiceTypeTaskDict={setServiceTypeTaskDict}
                                          serviceTaskDropdown={serviceTaskDropdown}
                                          setServiceTaskDropdown={setServiceTaskDropdown}
                                          setShowMobileHistoryLogs={setShowMobileHistoryLogs}
                                          setStartLogsAnimation={setStartLogsAnimation}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {currentPage === 'update' && (
                                  <div className="task__table--pickup">
                                    {/* {currentPage === 'main' || currentPage === 'create' ? (
                                <p> Ready for pickup</p>
                              ) : ( */}
                                    <div style={{ height: '100%' }}>
                                      <div className="task__table--pickup-title">Intake Logs</div>
                                      <div className="task__collapse-div">
                                        {specificIntakeLogs ? (
                                          <Collapse accordion className="task__collapse">
                                            {[...specificIntakeLogs].reverse().map((child, index) => (
                                              <Panel
                                                header={
                                                  <div className="task__collapse-header">
                                                    <div className="task__collapse-header-title">
                                                      {child.title === '' ? '-' : child.title}
                                                    </div>
                                                    <div className="task__collapse-header-time">
                                                      <i className="fas fa-clock"></i>
                                                      {moment(child.created_at).format('HH:mm')}
                                                    </div>
                                                  </div>
                                                }
                                                key={`log${index}`}
                                              >
                                                <section className="task__collapse-content">
                                                  <div className="task__collapse-row">
                                                    <div className="task__collapse-row-label">Note:</div>
                                                    <div className="task__collapse-row-description">
                                                      {child.description === '' ? '-' : child.description}
                                                    </div>
                                                  </div>
                                                  <div className="task__collapse-row">
                                                    <div className="task__collapse-row-label">Updated at:</div>
                                                    <div>{moment(child.created_at).format('DD/MM/YYYY HH:mm')}</div>
                                                  </div>
                                                </section>
                                                <div className="task__collapse-row task__collapse-row--user">
                                                  <div>
                                                    <i className="fas fa-user"></i>
                                                  </div>
                                                  &nbsp;
                                                  <div>{child.created_by}</div>
                                                </div>
                                              </Panel>
                                            ))}
                                          </Collapse>
                                        ) : (
                                          <div className="task__collapse-spin">
                                            <div className="lds-spinner">
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {/* )} */}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="task__component-bottom-content-right"></div>
                          </div>
                        </div>
                      </section>
                    ) : (
                      <div className="catalog__loading-div">
                        <Ripple />
                      </div>
                    )}
                  </>
                </section>
              </div>
            </CustomContainer>
          </div>
        </LayoutComponent>
      </Layout>
      <Footer />

      {/* Websocket */}
      {/* <ActionCableConsumer
        channel={{
          channel: 'NotificationChannel',
          notification_controller: 'JobMonitoringController',
          notification_type: 'intake_update',
        }}
        onConnected={() => console.log('Notification Connected')}
        onRejected={() => console.log('Notification Rejected')}
        onDisconnected={() => console.log('Notification Disconnected')}
        onReceived={(res: any) => setIncomingData(res.data)}
      /> */}
    </>
  );
};

interface StateProps {
  loading?: boolean;
  accessObj?: TUserAccess;
  notificationObj?: INotification;
  errorMessage?: string | null;
  successMessage?: string | null;
  auth_token?: string | null;
  userInfoObj?: TReceivedUserInfoObj | null;
  specificIntakeLogs?: IIntakeLogs[] | null;
  intakeStatusArray?: TReceivedIntakeStatusObj[] | null;
  intakeSummaryArray?: TReceivedIntakeSummaryObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
  performanceIntakeData?: TReceivedPerformanceIntakeObj | null;
  specificIntakeJobsObj?: TReceivedSpecificIntakeJobsObj | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.task.loading,
    accessObj: state.auth.accessObj,
    auth_token: state.auth.auth_token,
    userInfoObj: state.auth.userInfoObj,
    errorMessage: state.task.errorMessage,
    notificationObj: state.general.notification,
    successMessage: state.task.successMessage,
    specificIntakeLogs: state.task.specificIntakeLogs,
    intakeStatusArray: state.dashboard.intakeStatusArray,
    intakeSummaryArray: state.task.intakeSummaryArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
    performanceIntakeData: state.performance.performanceIntakeData,
    specificIntakeJobsObj: state.task.specificIntakeJobsObj,
  };
};

interface DispatchProps {
  onGetIntakeStatus: typeof actions.getIntakeStatus;
  onClearTaskState: typeof actions.clearTaskState;
  onGetUsersByRoles: typeof actions.getUsersByRoles;
  onGetServiceTypes: typeof actions.getServiceTypes;
  onGetIntakeSummary: typeof actions.getIntakeSummary;
  onSetToggleUserAssign: typeof actions.setToggleUserAssign;
  onCreateIntakeSummary: typeof actions.createIntakeSummary;
  onUpdateIntakeSummary: typeof actions.updateIntakeSummary;
  onGetSpecificIntakeJobs: typeof actions.getSpecificIntakeJobs;
  onSetSpecificIntakeLogs: typeof actions.setSpecificIntakeLogs;
  onGetPerformanceIntakeData: typeof actions.getPerformanceIntakeData;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onClearTaskState: () => dispatch(actions.clearTaskState()),
    onGetIntakeStatus: () => dispatch(actions.getIntakeStatus()),
    onGetServiceTypes: () => dispatch(actions.getServiceTypes()),
    onGetIntakeSummary: () => dispatch(actions.getIntakeSummary()),
    onSetToggleUserAssign: (intake_id) => dispatch(actions.setToggleUserAssign(intake_id)),
    onGetUsersByRoles: (role_id, title) => dispatch(actions.getUsersByRoles(role_id, title)),
    onGetSpecificIntakeJobs: (intake_id) => dispatch(actions.getSpecificIntakeJobs(intake_id)),
    onSetSpecificIntakeLogs: (specificIntakeLogs) => dispatch(actions.setSpecificIntakeLogs(specificIntakeLogs)),
    onCreateIntakeSummary: (intakeJobsFormData) => dispatch(actions.createIntakeSummary(intakeJobsFormData)),
    onUpdateIntakeSummary: (intake_id, intakeJobsFormData) =>
      dispatch(actions.updateIntakeSummary(intake_id, intakeJobsFormData)),
    onGetPerformanceIntakeData: (date_from, date_to) => dispatch(actions.getPerformanceIntakeData(date_from, date_to)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage2);

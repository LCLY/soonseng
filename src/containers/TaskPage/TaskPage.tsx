import React, { useEffect, useState, useCallback, useMemo, useContext, useRef, MutableRefObject } from 'react';
import './TaskPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import Backdrop from 'src/components/Backdrop/Backdrop';
import MobileTaskTable from './MobileTaskTable/MobileTaskTable';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
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
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Button, Layout, Collapse, Form, Table, message, Tooltip, Input } from 'antd';

/* Util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
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
  emptyStringWhenUndefinedOrNull,
  getColumnSearchProps,
  setFilterReference,
} from 'src/shared/Utils';

import { TUserAccess } from 'src/store/types/auth';
import { TReceivedIntakeStatusObj, TReceivedServiceTaskObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';

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
  createdAt: string;
  regNumber: string;
  serviceType: string;
  status: string;
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
    serviceType: TReceivedServiceTypesObj;
    serviceTaskDropdownArray: TReceivedServiceTaskObj[] | null;
  };
}

interface TaskPageProps {}

type Props = TaskPageProps & StateProps & DispatchProps;

const TaskPage: React.FC<Props> = ({
  // accessObj,
  auth_token,
  successMessage,
  specificIntakeLogs,
  serviceTypesArray,
  intakeSummaryArray,
  onGetIntakeStatus,
  onGetIntakeSummary,
  onClearTaskState,
  onGetUsersByRoles,
  onGetServiceTypes,
  onGetSpecificIntakeJobs,
  onSetSpecificIntakeLogs,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const cableApp = useContext(ActionCableContext);
  const cableRef = useRef() as MutableRefObject<any>;

  const [currentPage, setCurrentPage] = useState<'main' | 'update' | 'create'>('main');

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
      width: '12rem',
      ellipsis: true,
      align: 'center',
      sorter: (a: TIntakeTableState, b: TIntakeTableState) =>
        a.dateTimeIn.format('DD-MM-YYYY HH:mm A').localeCompare(b.dateTimeIn.format('DD-MM-YYYY HH:mm A')),
      render: (_: any, record: TIntakeTableState) => {
        return (
          <span className="task__table-col--datetime">
            {record.dateTimeIn.format('DD-MM-YYYY')}
            <br />
            {record.dateTimeIn.format('HH:mm A')}
          </span>
        );
      },
    },
    {
      key: 'regNumber',
      title: 'Reg No',
      dataIndex: 'regNumber',
      width: '20rem',
      ellipsis: true,
      sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.regNumber.localeCompare(b.regNumber),
      ...getColumnSearchProps(intakeJobsSearchInput, 'regNumber', 'Registration Number'),
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
                style={{ color: record.status === 'Ready for Pick-up' ? '#63a777' : '#df7471' }}
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
                {record.regNumber}
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      key: 'serviceType',
      title: 'Job Type',
      dataIndex: 'serviceType',
      width: 'auto',
      ellipsis: true,
    },
    {
      key: 'assignees',
      title: 'Assignees',
      dataIndex: 'assignees',
      width: '10rem',
      ellipsis: true,
      align: 'center',
      render: (_text: any, record: TIntakeTableState) => {
        return (
          <Tooltip
            title={
              <>
                <ol>
                  {record.assign.length > 0
                    ? record.assign.map((child) => (
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
            <i className="fas fa-user"></i> x {record.assign.length}
          </Tooltip>
        );
      },
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: '10rem',
      ellipsis: true,
      align: 'center',
    },
    {
      key: 'bay',
      title: 'Bay',
      dataIndex: 'bay',
      width: '10rem',
      align: 'center',
      ellipsis: true,
      // sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.bay.localeCompare(b.bay),
      // ...getColumnSearchProps(intakeJobsSearchInput, 'bay', 'Bay'),
    },
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
      // checkItemsHeight,
      setIncomingData,
      updateIntakeJobsForm,
      goToUpdateSpecificIntake,
      onGetSpecificIntakeJobs,
    }),
    [
      intakeDict,
      filterText,
      incomingData,
      // checkItemsHeight,
      setFilterText,
      setIncomingData,
      updateIntakeJobsForm,
      goToUpdateSpecificIntake,
      onGetSpecificIntakeJobs,
    ],
  );

  const checkFilterString = (intakeChild: TIntakeTableState) => {
    let date = moment(intakeChild.createdAt).format('DD-MM-YYYY');
    let time = moment(intakeChild.createdAt).format('HH:mm A');
    let listOfUsers = intakeChild.assign.reduce(
      (finalString, assignChild) =>
        (finalString += `${assignChild.user.first_name} ${emptyStringWhenUndefinedOrNull(assignChild.user.last_name)} ${
          assignChild.user.username
        } ${assignChild.user.role} `),
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
      intakeChild.regNumber.toLowerCase().match(regex);

    // if not return the filtered result
    // if includes doesnt return result, it will fallback to regex to get better tweaked result
    return (
      regexBoolean ||
      intakeChild.bay.toLowerCase().includes(searchedText) ||
      intakeChild.description.toLowerCase().includes(searchedText) ||
      intakeChild.assign.length.toString().includes(searchedText) ||
      intakeChild.serviceType.toLowerCase().includes(searchedText) ||
      date.toLowerCase().includes(searchedText) ||
      listOfUsers.toLowerCase().includes(searchedText) ||
      time.toLowerCase().includes(searchedText) ||
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
    onGetUsersByRoles(undefined, '');
    onGetIntakeSummary();
  }, [onGetIntakeStatus, onGetIntakeSummary, onGetUsersByRoles, onGetServiceTypes]);

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

      intakeDictObj[intake.id] = {
        key: intake.id.toString(),
        dateTimeIn: moment(intake.created_at), //formatted timestamp
        createdAt: intake.created_at, //raw timestamp
        pickup: intake.pick_up,
        regNumber: intake.registration,
        assign: intake.intake_users,
        description: intake.description,
        serviceType: uniqueService.length > 0 ? uniqueService.join() : '-',
        status: intake.intake_status.title,
        bay: intake.bay === '' ? '-' : intake.bay,
      };
    };

    if (intakeSummaryArray) {
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

        gsap.to(`.intakesummary__row-${incomingData.data.id}`, {
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

  return (
    <>
      {showMobileHistoryLogs && mobileSpecificIntakeLogsComponent}
      <NavbarComponent activePage="task" defaultOpenKeys="dashboard" />
      <Layout>
        <LayoutComponent>
          <ParallaxContainer bgImageUrl={holy5truck} overlayColor="rgba(0, 0, 0, 0.3)">
            <CustomContainer>
              <div className="make__tab-outerdiv">
                <section>
                  <>
                    {intakeSummaryArray && intakeDict ? (
                      <section className="task__glass">
                        <div className="task__header-div ">
                          <div className="make__header-title">
                            {auth_token === null ? (
                              'Intakes'
                            ) : (
                              <>
                                {currentPage === 'main'
                                  ? 'Intakes'
                                  : currentPage === 'update'
                                  ? 'Update Intake'
                                  : 'Create Intake'}
                              </>
                            )}
                          </div>
                          {auth_token && currentPage !== 'create' && (
                            <Button
                              type="primary"
                              className="make__brand-btn"
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
                              Create <span className="task__button-text">&nbsp;New Intake</span>
                            </Button>
                          )}
                        </div>

                        {/* -------------------- */}
                        {/*     Intake Table      */}
                        {/* -------------------- */}

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

                                <div>
                                  <div className="task__searchbar-div">
                                    <Search
                                      value={filterText}
                                      suffix={<i className="fas fa-times-circle" onClick={() => setFilterText('')}></i>}
                                      placeholder="Type here to filter"
                                      onChange={(e) => setFilterText(e.target.value)}
                                      onSearch={(value) => setFilterText(value)}
                                      enterButton={<i className="fas fa-filter"></i>}
                                    />
                                  </div>
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
                                      .filter(checkFilterString)
                                      .sort((a: TIntakeTableState, b: TIntakeTableState) => sortByCreatedAt(a, b))}
                                    columns={convertHeader(intakeJobsColumns, setIntakeJobsColumns)}
                                    pagination={false}
                                  />
                                </div>
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
          </ParallaxContainer>
        </LayoutComponent>
      </Layout>
      <Footer />

      {/* Websocket */}
      {/* <ActionCableConsumer
        channel={{ channel: 'JobMonitoringChannel' }}
        onConnected={() => console.log('Table Connected')}
        onRejected={() => console.log('Table Rejected')}
        onDisconnected={() => console.log('Table Disconnected')}
        onReceived={(res: any) => setIncomingData(res.data)}
      /> */}
    </>
  );
};

interface StateProps {
  loading?: boolean;
  accessObj?: TUserAccess;
  errorMessage?: string | null;
  successMessage?: string | null;
  auth_token?: string | null;
  specificIntakeLogs?: IIntakeLogs[] | null;
  intakeStatusArray?: TReceivedIntakeStatusObj[] | null;
  intakeSummaryArray?: TReceivedIntakeSummaryObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
  specificIntakeJobsObj?: TReceivedSpecificIntakeJobsObj | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.task.loading,
    accessObj: state.auth.accessObj,
    auth_token: state.auth.auth_token,
    errorMessage: state.task.errorMessage,
    successMessage: state.task.successMessage,
    specificIntakeLogs: state.task.specificIntakeLogs,
    intakeStatusArray: state.dashboard.intakeStatusArray,
    intakeSummaryArray: state.task.intakeSummaryArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
    specificIntakeJobsObj: state.task.specificIntakeJobsObj,
  };
};

interface DispatchProps {
  onGetIntakeStatus: typeof actions.getIntakeStatus;
  onClearTaskState: typeof actions.clearTaskState;
  onGetUsersByRoles: typeof actions.getUsersByRoles;
  onGetServiceTypes: typeof actions.getServiceTypes;
  onGetIntakeSummary: typeof actions.getIntakeSummary;
  onCreateIntakeSummary: typeof actions.createIntakeSummary;
  onUpdateIntakeSummary: typeof actions.updateIntakeSummary;
  onGetSpecificIntakeJobs: typeof actions.getSpecificIntakeJobs;
  onSetSpecificIntakeLogs: typeof actions.setSpecificIntakeLogs;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onClearTaskState: () => dispatch(actions.clearTaskState()),
    onGetIntakeStatus: () => dispatch(actions.getIntakeStatus()),
    onGetServiceTypes: () => dispatch(actions.getServiceTypes()),
    onGetIntakeSummary: () => dispatch(actions.getIntakeSummary()),
    onGetUsersByRoles: (role_id, title) => dispatch(actions.getUsersByRoles(role_id, title)),
    onGetSpecificIntakeJobs: (intake_id) => dispatch(actions.getSpecificIntakeJobs(intake_id)),
    onSetSpecificIntakeLogs: (specificIntakeLogs) => dispatch(actions.setSpecificIntakeLogs(specificIntakeLogs)),
    onCreateIntakeSummary: (intakeJobsFormData) => dispatch(actions.createIntakeSummary(intakeJobsFormData)),
    onUpdateIntakeSummary: (intake_id, intakeJobsFormData) =>
      dispatch(actions.updateIntakeSummary(intake_id, intakeJobsFormData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);

import React, { useEffect, useState, useContext, useRef, MutableRefObject } from 'react';
import './TaskPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
// import IntakeJobsModal from 'src/components/Modal/IntakeJobsModal/IntakeJobsModal';
import CreateSpecificIntake from 'src/containers/TaskPage/CreateSpecificIntake/CreateSpecificIntake';
import UpdateSpecificIntake, {
  TUpdateTaskTableState,
} from 'src/containers/TaskPage//UpdateSpecificIntake/UpdateSpecificIntake';
/* 3rd party lib */
import gsap from 'gsap';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Button, Layout, Collapse, Form, Table, message, Tooltip } from 'antd';

/* Util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import { ActionCableContext } from 'src/index';
import * as actions from 'src/store/actions/index';
import {
  // IIntakeJobsFormData,
  IIntakeLogs,
  // IJobFormData,
  TReceivedIntakeSummaryObj,
  TReceivedSpecificIntakeJobsObj,
  TServiceTypeTaskDict,
} from 'src/store/types/task';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';
import { TReceivedIntakeStatusObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';
import { TUserAccess } from 'src/store/types/auth';

const { Panel } = Collapse;

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

type TIntakeTableState = {
  key: string;
  dateTimeIn: any;
  createdAt: string;
  regNumber: string;
  serviceType: string;
  status: string;
  pickup: boolean;
  description: string;
  bay: string;
};
export interface IIntakeDict {
  [intakeId: number]: TIntakeTableState;
}

export interface IServiceTaskDropdown {
  [key: string]: {
    serviceTask: string;
    serviceTaskDropdownArray: any[] | null;
  };
}

interface TaskPageProps {}

type Props = TaskPageProps & StateProps & DispatchProps;

const TaskPage: React.FC<Props> = ({
  accessObj,
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

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<'main' | 'update' | 'create'>('main');

  const [inEditMode, setInEditMode] = useState(true);
  const [intakeDict, setIntakeDict] = useState<IIntakeDict | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({ intake_job: false });
  const [serviceTaskDropdown, setServiceTaskDropdown] = useState<IServiceTaskDropdown>({});
  const [beforeDeleteState, setBeforeDeleteState] = useState<TUpdateTaskTableState[] | null>(null);

  // Forms
  const [createIntakeJobsForm] = Form.useForm();
  const [updateIntakeJobsForm] = Form.useForm();

  // Incoming websocket data
  const [incomingData, setIncomingData] = useState<{ data: TReceivedIntakeSummaryObj; action: string } | null>(null);
  // Table states
  const [taskTableState, setTaskTableState] = useState<TTaskTableState[] | null>(null);
  // const [intakeTableState, setIntakeTableState] = useState<TIntakeTableState[]>([]);
  const [serviceTypeTaskDict, setServiceTypeTaskDict] = useState<TServiceTypeTaskDict | null>(null);

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
    // {
    //   key: 'status',
    //   title: 'Status',
    //   dataIndex: 'status',
    //   width: '10rem',
    //   ellipsis: true,
    //   align: 'center',
    // },
    {
      key: 'bay',
      title: 'Bay',
      dataIndex: 'bay',
      width: '10rem',
      align: 'center',
      ellipsis: true,
      sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.bay.localeCompare(b.bay),
      ...getColumnSearchProps(intakeJobsSearchInput, 'bay', 'Bay'),
    },
  ]);

  /* ================================================== */
  /*  method */
  /* ================================================== */

  const goToUpdateSpecificIntake = () => {
    setCurrentPage('update');
    gsap.to('.task__table-div', {
      duration: 1,
      ease: 'ease',
      x: '-100%',
    });
  };
  const goToCreateSpecificIntake = () => {
    setCurrentPage('create');
    gsap.to('.task__table-div', {
      duration: 1,
      ease: 'ease',
      x: '100%',
    });
  };

  // const onCreateIntakeAndJobsFinish = (values: {
  //   bay: string;
  //   pickup: boolean;
  //   description: string;
  //   assign: number[];
  //   intakeStatus: number;
  //   registrationNumber: string;
  // }) => {
  //   if (userInfoObj === null || userInfoObj === undefined) return;
  //   let resultJobs: IJobFormData[] = [];
  //   (taskTableState as any).forEach((task: any, index: number) => {
  //     let taskObj = {
  //       service_task_id: task[`taskTitle${index}`],
  //       description: task[`taskDescription${index}`],
  //     };
  //     resultJobs.push(taskObj);
  //   });

  //   let intakeJobsFormData: IIntakeJobsFormData = {
  //     intake: {
  //       bay: values.bay !== undefined ? values.bay : '',
  //       pick_up: values.pickup !== undefined ? values.pickup : false,
  //       description: values.description !== undefined ? values.description : '',
  //       registration: values.registrationNumber,
  //       intake_status_id: values.intakeStatus,
  //       assigned_to_ids: values.assign,
  //     },
  //     jobs: resultJobs,
  //     logs: {
  //       title: `Intake updated at ${moment().format('DD/MM/YYYY HH:mm')} by ${userInfoObj.username}`,
  //       description: 'TEST',
  //       user_id: userInfoObj.id,
  //     },
  //   };
  //   onCreateIntakeSummary(intakeJobsFormData);
  // };

  // const onUpdateIntakeAndJobsFinish = (values: {
  //   [key: string]: any;
  //   bay: string;
  //   pickup: boolean;
  //   description: string;
  //   assign: number[];
  //   intakeId: string;
  //   intakeStatus: number;
  // }) => {
  //   let resultJobs: IJobFormData[] = [];

  //   (taskTableState as any).forEach((task: any, index: number) => {
  //     let taskObj = {
  //       id: task[`taskId${index}`],
  //       service_task_id: values[`taskTitle${index}`],
  //       description: values[`taskDescription${index}`],
  //     };
  //     resultJobs.push(taskObj);
  //   });

  //   let intakeJobsFormData: IIntakeJobsFormData = {
  //     intake: {
  //       bay: values.bay !== undefined ? values.bay : '',
  //       pick_up: values.pickup !== undefined ? values.pickup : false,
  //       description: values.description !== undefined ? values.description : '',
  //       registration: values.registrationNumber,
  //       intake_status_id: values.intakeStatus,
  //       assigned_to_ids: values.assign,
  //     },
  //     jobs: resultJobs,
  //   };
  //   onUpdateIntakeSummary(parseInt(values.intakeId), intakeJobsFormData);
  // };

  // sort array using created at date
  const sortByCreatedAt = (a: TIntakeTableState, b: TIntakeTableState) => {
    return moment(b.createdAt).diff(moment(a.createdAt));
  };
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

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);

      // setInEditMode(false);
      setBeforeDeleteState(null); //make sure that before delete state is null after successfully updated
      createIntakeJobsForm.resetFields();
      setShowCreateModal({
        ...showCreateModal,
        intake_job: false,
      });

      setCurrentPage('main');
      gsap.to('.task__table-div', {
        duration: 1,
        ease: 'ease',
        x: '0',
      });

      onClearTaskState();
    }
  }, [successMessage, createIntakeJobsForm, onClearTaskState, showCreateModal]);

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

  /* ================================================== */
  /* ================================================== */

  return (
    <>
      {/* {serviceTypeTaskDict && (
        <>
          <IntakeJobsModal
            crud="create"
            indexKey={'intake_job'}
            modalWidth={1200}
            count={count}
            setCount={setCount}
            modalTitle={'Create New Intake'}
            antdForm={createIntakeJobsForm}
            showModal={showCreateModal}
            intake_id={specificIntakeId}
            // intakeDictObj={intakeDictObj}
            visible={showCreateModal.intake_job}
            onFinish={onCreateIntakeAndJobsFinish}
            setShowModal={setShowCreateModal}
            taskTableState={taskTableState}
            setTaskTableState={setTaskTableState}
            serviceTypeTaskDict={serviceTypeTaskDict}
            serviceTaskDropdown={serviceTaskDropdown}
            setServiceTaskDropdown={setServiceTaskDropdown}
            setServiceTypeTaskDict={setServiceTypeTaskDict}
            loading={loading !== undefined && loading}
          />
          <IntakeJobsModal
            crud="update"
            indexKey={'intake_job'}
            modalWidth={1200}
            count={count}
            setCount={setCount}
            // intakeDictObj={intakeDictObj}
            intake_id={specificIntakeId}
            modalTitle={'Update Intake'}
            antdForm={updateIntakeJobsForm}
            showModal={showUpdateModal}
            visible={showUpdateModal.intake_job}
            onFinish={onUpdateIntakeAndJobsFinish}
            setShowModal={setShowUpdateModal}
            taskTableState={taskTableState}
            setTaskTableState={setTaskTableState}
            serviceTypeTaskDict={serviceTypeTaskDict}
            serviceTaskDropdown={serviceTaskDropdown}
            setServiceTaskDropdown={setServiceTaskDropdown}
            setServiceTypeTaskDict={setServiceTypeTaskDict}
            loading={loading !== undefined && loading}
          />
        </>
      )} */}

      <NavbarComponent activePage="task" defaultOpenKeys="dashboard" />
      <Layout>
        <LayoutComponent activeKey="accessory">
          <ParallaxContainer bgImageUrl={holy5truck} overlayColor="rgba(0, 0, 0, 0.3)">
            <CustomContainer>
              {/* <button onClick={() => cableRef.current.unsubscribe()}>UNSUBSCRIBE2</button> */}
              <div className="make__tab-outerdiv">
                <section>
                  <>
                    {intakeSummaryArray && intakeDict ? (
                      <section className="task__glass">
                        <div className="make__header-div ">
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
                          {accessObj?.showSalesDashboard && (
                            <Button
                              type="primary"
                              className="make__brand-btn"
                              onClick={() => {
                                goToCreateSpecificIntake();
                                // setShowCreateModal({ ...showCreateModal, intake_job: true });
                                if (taskTableState === null) return;
                                const newData: any = {
                                  key: count.toString(),
                                  [`assign${count}`]: [],
                                  [`taskType${count}`]: '',
                                  [`taskTitle${count}`]: '',
                                  [`taskStatus${count}`]: '',
                                  [`taskDescription${count}`]: '',
                                };
                                let tempArray = [...taskTableState];
                                tempArray.push(newData);
                                setCount(1);
                                setTaskTableState(tempArray);
                              }}
                            >
                              Create New Intake
                            </Button>
                          )}
                        </div>
                        {/* -------------------- */}
                        {/*     Intake Table      */}
                        {/* -------------------- */}
                        <div className="task__table-wrapper">
                          <div className="task__table-outerdiv">
                            <div className="task__table-parent">
                              <div className="task__table-div">
                                <div className="task__specific-div task__specific-div--create">
                                  <CreateSpecificIntake
                                    count={count}
                                    setCount={setCount}
                                    setCurrentPage={setCurrentPage}
                                    createIntakeJobsForm={createIntakeJobsForm}
                                    serviceTypeTaskDict={serviceTypeTaskDict}
                                    setServiceTypeTaskDict={setServiceTypeTaskDict}
                                    serviceTaskDropdown={serviceTaskDropdown}
                                    setServiceTaskDropdown={setServiceTaskDropdown}
                                  />
                                </div>
                                <Table
                                  bordered
                                  className="task__table"
                                  scroll={{ y: 600 }}
                                  // components={components}
                                  rowClassName={(record) => `intakesummary__row-${record.key}`}
                                  dataSource={Object.values(
                                    intakeDict,
                                  ).sort((a: TIntakeTableState, b: TIntakeTableState) => sortByCreatedAt(a, b))}
                                  columns={convertHeader(intakeJobsColumns, setIntakeJobsColumns)}
                                  pagination={false}
                                />
                                <div className="task__specific-div task__specific-div--update">
                                  <UpdateSpecificIntake
                                    count={count}
                                    setCount={setCount}
                                    inEditMode={inEditMode}
                                    setInEditMode={setInEditMode}
                                    setCurrentPage={setCurrentPage}
                                    beforeDeleteState={beforeDeleteState}
                                    setBeforeDeleteState={setBeforeDeleteState}
                                    serviceTypeTaskDict={serviceTypeTaskDict}
                                    setServiceTypeTaskDict={setServiceTypeTaskDict}
                                    serviceTaskDropdown={serviceTaskDropdown}
                                    setServiceTaskDropdown={setServiceTaskDropdown}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* )} */}
                          </div>
                          <div className="task__table--pickup">
                            {currentPage === 'main' || currentPage === 'create' ? (
                              <p> Ready for pickup</p>
                            ) : (
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
                                                {moment(child.created_at).format('HH:mm:A')}
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
                              </div>
                            )}
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

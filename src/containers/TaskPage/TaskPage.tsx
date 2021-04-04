import React, { useEffect, useState, useContext, useRef, MutableRefObject } from 'react';
import './TaskPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import SpecificIntake, { TUpdateTaskTableState } from './SpecificIntake/SpecificIntake';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
import IntakeJobsModal from 'src/components/Modal/IntakeJobsModal/IntakeJobsModal';
/* 3rd party lib */
import gsap from 'gsap';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Button, Layout, Form, Table, message, Tooltip } from 'antd';
/* Util */
import { RootState } from 'src';
import holy5truck from 'src/img/5trucks.jpg';
import { ActionCableContext } from 'src/index';
import * as actions from 'src/store/actions/index';
import {
  IIntakeJobsFormData,
  IJobFormData,
  TReceivedIntakeSummaryObj,
  TServiceTypeTaskDict,
} from 'src/store/types/task';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';
import { TReceivedIntakeStatusObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';

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
  loading,
  // onGetTasks,
  // onCreateTask,
  successMessage,
  serviceTypesArray,
  intakeSummaryArray,
  onGetIntakeStatus,
  onGetIntakeSummary,
  onClearTaskState,
  onGetUsersByRoles,
  onGetServiceTypes,
  onGetSpecificIntakeJobs,
  onCreateIntakeSummary,
  onUpdateIntakeSummary,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const cableApp = useContext(ActionCableContext);
  const cableRef = useRef() as MutableRefObject<any>;

  const [count, setCount] = useState(0);

  const [inEditMode, setInEditMode] = useState(false);
  const [intakeDict, setIntakeDict] = useState<IIntakeDict | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({ intake_job: false });
  const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({ intake_job: false });
  const [specificIntakeId, setSpecificIntakeId] = useState<null | undefined | number>(null);
  const [serviceTaskDropdown, setServiceTaskDropdown] = useState<IServiceTaskDropdown>({});
  const [beforeDeleteState, setBeforeDeleteState] = useState<TUpdateTaskTableState[] | null>(null);
  // const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({ fees: false });

  // Forms
  const [createIntakeJobsForm] = Form.useForm();
  const [updateIntakeJobsForm] = Form.useForm();

  // Incoming websocket data
  const [incomingData, setIncomingData] = useState<TReceivedIntakeSummaryObj | null>(null);
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
            <Tooltip title={record.description}>
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
                  gsap.to('.task__table-div', {
                    duration: 1,
                    ease: 'ease',
                    x: '-100%',
                  });
                  // setShowUpdateModal({ ...showUpdateModal, intake_job: true });
                  setSpecificIntakeId(parseInt(record.key));
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
      sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.bay.localeCompare(b.bay),
      ...getColumnSearchProps(intakeJobsSearchInput, 'bay', 'Bay'),
    },
  ]);

  /* ================================================== */
  /*  method */
  /* ================================================== */
  const onCreateIntakeAndJobsFinish = (values: {
    bay: string;
    pickup: boolean;
    description: string;
    assign: number[];
    intakeStatus: number;
    registrationNumber: string;
  }) => {
    let resultJobs: IJobFormData[] = [];
    (taskTableState as any).forEach((task: any, index: number) => {
      let taskObj = {
        service_task_id: task[`taskTitle${index}`],
        description: task[`taskDescription${index}`],
      };
      resultJobs.push(taskObj);
    });

    let intakeJobsFormData: IIntakeJobsFormData = {
      intake: {
        bay: values.bay !== undefined ? values.bay : '',
        pick_up: values.pickup !== undefined ? values.pickup : false,
        description: values.description !== undefined ? values.description : '',
        registration: values.registrationNumber,
        intake_status_id: values.intakeStatus,
        assigned_to_ids: values.assign,
      },
      jobs: resultJobs,
    };
    onCreateIntakeSummary(intakeJobsFormData);
  };

  const onUpdateIntakeAndJobsFinish = (values: {
    [key: string]: any;
    bay: string;
    pickup: boolean;
    description: string;
    assign: number[];
    intakeId: string;
    intakeStatus: number;
  }) => {
    let resultJobs: IJobFormData[] = [];

    (taskTableState as any).forEach((task: any, index: number) => {
      let taskObj = {
        id: task[`taskId${index}`],
        service_task_id: values[`taskTitle${index}`],
        description: values[`taskDescription${index}`],
      };
      resultJobs.push(taskObj);
    });

    let intakeJobsFormData: IIntakeJobsFormData = {
      intake: {
        bay: values.bay !== undefined ? values.bay : '',
        pick_up: values.pickup !== undefined ? values.pickup : false,
        description: values.description !== undefined ? values.description : '',
        registration: values.registrationNumber,
        intake_status_id: values.intakeStatus,
        assigned_to_ids: values.assign,
      },
      jobs: resultJobs,
    };
    onUpdateIntakeSummary(parseInt(values.intakeId), intakeJobsFormData);
  };

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
        connected: () => console.log('connected'),
        received: (res: any) => setIncomingData(res.data),
      },
    );

    cableRef.current = channel;
  }, [cableRef, cableApp.cable.subscriptions]);

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
    if (successMessage) {
      message.success(successMessage);
      setInEditMode(false);
      setBeforeDeleteState(null); //make sure that before delete state is null after successfully updated
      createIntakeJobsForm.resetFields();
      setShowCreateModal({
        ...showCreateModal,
        intake_job: false,
      });

      onClearTaskState();
    }
  }, [successMessage, createIntakeJobsForm, onClearTaskState, showCreateModal]);

  useEffect(() => {
    // If there is incoming data, update the table or add a new row to the table
    if (incomingData && incomingData !== undefined && typeof incomingData === 'object') {
      let serviceTypeOnlyArray: string[] = [];
      if (incomingData.jobs !== undefined) {
        incomingData.jobs.forEach((job) => serviceTypeOnlyArray.push(job.service_type));
      }
      let uniqueService = [...new Set(serviceTypeOnlyArray)];

      console.log('incoming', incomingData);

      if (intakeDict === null) return;
      let intakeTableObj: TIntakeTableState = {
        key: incomingData.id.toString(),
        dateTimeIn: moment(incomingData.created_at), //formatted timestamp
        createdAt: incomingData.created_at, //raw timestamp
        pickup: incomingData.pick_up,
        regNumber: incomingData.registration,
        description: incomingData.description,
        serviceType: uniqueService.length > 0 ? uniqueService.join() : '-',
        status: incomingData.intake_status.title,
        bay: incomingData.bay === '' ? '-' : incomingData.bay,
      };

      intakeDict[incomingData.id] = intakeTableObj;
      setIncomingData(null);
    }
  }, [intakeDict, incomingData]);

  /* ================================================== */
  /* ================================================== */

  return (
    <>
      {serviceTypeTaskDict && (
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
      )}

      <NavbarComponent activePage="task" defaultOpenKeys="dashboard" />
      <Layout>
        <LayoutComponent activeKey="accessory">
          <ParallaxContainer bgImageUrl={holy5truck} overlayColor="rgba(0, 0, 0, 0.3)">
            <CustomContainer>
              <button onClick={() => cableRef.current.unsubscribe()}>UNSUBSCRIBE2</button>
              <div className="make__tab-outerdiv">
                <section>
                  <>
                    {intakeSummaryArray && intakeDict ? (
                      <section className="task__glass">
                        <div className="make__header-div ">
                          <div className="make__header-title">Tasks</div>
                          <Button
                            type="primary"
                            className="make__brand-btn"
                            onClick={() => {
                              setShowCreateModal({ ...showCreateModal, intake_job: true });
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
                        </div>

                        {/* -------------------- */}
                        {/*     Intake Table      */}
                        {/* -------------------- */}
                        <div className="task__table-wrapper">
                          <div className="task__table-outerdiv">
                            <div className="task__table-parent">
                              <div className="task__table-div">
                                <Table
                                  bordered
                                  className="task__table"
                                  scroll={{ y: 600 }}
                                  // components={components}
                                  dataSource={Object.values(
                                    intakeDict,
                                  ).sort((a: TIntakeTableState, b: TIntakeTableState) => sortByCreatedAt(a, b))}
                                  columns={convertHeader(intakeJobsColumns, setIntakeJobsColumns)}
                                  pagination={false}
                                />
                                <div className="task__specific-div">
                                  <SpecificIntake
                                    count={count}
                                    setCount={setCount}
                                    inEditMode={inEditMode}
                                    setInEditMode={setInEditMode}
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
                          <div className="task__table--pickup">Ready for pickup</div>
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
  errorMessage?: string | null;
  successMessage?: string | null;
  intakeStatusArray?: TReceivedIntakeStatusObj[] | null;
  intakeSummaryArray?: TReceivedIntakeSummaryObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.task.loading,
    errorMessage: state.task.errorMessage,
    successMessage: state.task.successMessage,
    intakeStatusArray: state.dashboard.intakeStatusArray,
    intakeSummaryArray: state.task.intakeSummaryArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
  };
};

interface DispatchProps {
  // onGetTasks: typeof actions.getTasks;
  // onCreateTask: typeof actions.createTask;
  // onUpdateTask: typeof actions.updateTask;
  // onDeleteTask: typeof actions.deleteTask;
  onGetIntakeStatus: typeof actions.getIntakeStatus;
  onClearTaskState: typeof actions.clearTaskState;
  onGetUsersByRoles: typeof actions.getUsersByRoles;
  onGetServiceTypes: typeof actions.getServiceTypes;
  onGetIntakeSummary: typeof actions.getIntakeSummary;
  onCreateIntakeSummary: typeof actions.createIntakeSummary;
  onUpdateIntakeSummary: typeof actions.updateIntakeSummary;
  onGetSpecificIntakeJobs: typeof actions.getSpecificIntakeJobs;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    // onGetTasks: () => dispatch(actions.getTasks()),
    // onDeleteTask: (task_id) => dispatch(actions.deleteTask(task_id)),
    // onCreateTask: (taskFormData) => dispatch(actions.createTask(taskFormData)),
    // onUpdateTask: (task_id, taskFormData) => dispatch(actions.updateTask(task_id, taskFormData)),
    onClearTaskState: () => dispatch(actions.clearTaskState()),
    onGetIntakeStatus: () => dispatch(actions.getIntakeStatus()),
    onGetServiceTypes: () => dispatch(actions.getServiceTypes()),
    onGetIntakeSummary: () => dispatch(actions.getIntakeSummary()),
    onGetUsersByRoles: (role_id, title) => dispatch(actions.getUsersByRoles(role_id, title)),
    onGetSpecificIntakeJobs: (intake_id) => dispatch(actions.getSpecificIntakeJobs(intake_id)),
    onCreateIntakeSummary: (intakeJobsFormData) => dispatch(actions.createIntakeSummary(intakeJobsFormData)),
    onUpdateIntakeSummary: (intake_id, intakeJobsFormData) =>
      dispatch(actions.updateIntakeSummary(intake_id, intakeJobsFormData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);

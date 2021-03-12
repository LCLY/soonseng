import React, { useEffect, useState, useContext, useRef, MutableRefObject } from 'react';
import './TaskPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
import IntakeJobsModal from 'src/components/Modal/IntakeJobsModal/IntakeJobsModal';
/* 3rd party lib */
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
import { TReceivedJobStatusObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';

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
  dateTimeIn: string;
  createdAt: string;
  regNumber: string;
  serviceType: string;
  status: string;
  pickup: boolean;
  description: string;
  bay: string;
};
interface IIntakeDict {
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
  onGetJobStatus,
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

  const [intakeDict, setIntakeDict] = useState<IIntakeDict | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({ intake_job: false });
  const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({ intake_job: false });
  const [specificIntakeId, setSpecificIntakeId] = useState<null | undefined | number>(null);
  const [serviceTaskDropdown, setServiceTaskDropdown] = useState<IServiceTaskDropdown>({});
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
      title: 'Date Time In',
      className: 'body__table-header--title',
      dataIndex: 'dateTimeIn',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.dateTimeIn.localeCompare(b.dateTimeIn),
      ...getColumnSearchProps(intakeJobsSearchInput, 'dateTimeIn', 'Date Time In'),
    },
    {
      key: 'regNumber',
      title: 'Registration Number',
      className: 'body__table-header--title',
      dataIndex: 'regNumber',
      width: 'auto',
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
                  setShowUpdateModal({ ...showUpdateModal, intake_job: true });
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
      className: 'body__table-header--title',
      dataIndex: 'serviceType',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TIntakeTableState, b: TIntakeTableState) => a.serviceType.localeCompare(b.serviceType),
      ...getColumnSearchProps(intakeJobsSearchInput, 'serviceType', 'Job Type'),
    },
    {
      key: 'status',
      title: 'Status',
      className: 'body__table-header--title',
      dataIndex: 'status',
      width: '10rem',
      ellipsis: true,
      align: 'center',
    },
    {
      key: 'bay',
      title: 'Bay',
      className: 'body__table-header--title',
      dataIndex: 'bay',
      width: 'auto',
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
    registrationNumber: string;
  }) => {
    let resultJobs: IJobFormData[] = [];
    (taskTableState as any).forEach((task: any, index: number) => {
      let taskObj = {
        service_task_id: task[`taskTitle${index}`],
        description: task[`taskDescription${index}`],
        job_status_id: task[`taskStatus${index}`],
        assigned_to_ids: task[`assign${index}`],
      };
      resultJobs.push(taskObj);
    });

    let intakeJobsFormData: IIntakeJobsFormData = {
      intake: {
        bay: values.bay !== undefined ? values.bay : '',
        pick_up: values.pickup !== undefined ? values.pickup : false,
        description: values.description !== undefined ? values.description : '',
        registration: values.registrationNumber,
      },
      jobs: resultJobs,
    };
    onCreateIntakeSummary(intakeJobsFormData);
  };

  const onUpdateIntakeAndJobsFinish = (values: {
    [key: string]: any;
    bay: string;
    description: string;
    intakeId: string;
    pickup: boolean;
    registrationNumber: string;
  }) => {
    let resultJobs: IJobFormData[] = [];
    console.log(values);
    (taskTableState as any).forEach((task: any, index: number) => {
      console.log(task);
      let taskObj = {
        id: task[`taskId${index}`],
        assigned_to_ids: values[`assign${index}`],
        job_status_id: values[`taskStatus${index}`],
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
      },
      jobs: resultJobs,
    };
    console.log(intakeJobsFormData);
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
    onGetJobStatus();
    onGetServiceTypes();
    onGetUsersByRoles(undefined, '');
    onGetIntakeSummary();
  }, [onGetJobStatus, onGetIntakeSummary, onGetUsersByRoles, onGetServiceTypes]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for Tasks
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TIntakeTableState[] = [];
    let intakeDictObj: any = {};
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (intake: TReceivedIntakeSummaryObj) => {
      // only render when available value is true

      let serviceTypeOnlyArray: string[] = [];
      intake.jobs.forEach((job) => serviceTypeOnlyArray.push(job.service_type));

      let uniqueService = [...new Set(serviceTypeOnlyArray)];

      intakeDictObj[intake.id] = {
        key: intake.id.toString(),
        dateTimeIn: moment(intake.created_at).format('YYYY-MM-DD HH:mm A'), //formatted timestamp
        createdAt: intake.created_at, //raw timestamp
        pickup: intake.pick_up,
        regNumber: intake.registration,
        description: intake.description,
        serviceType: uniqueService.length > 0 ? uniqueService.join() : '-',
        status: `${uniqueService.length} / ${intake.jobs.length}`,
        bay: intake.bay === '' ? '-' : intake.bay,
      };
    };

    if (intakeSummaryArray) {
      // Execute function "storeValue" for every array index
      intakeSummaryArray.map(storeValue);
    }
    // update the state with tempArray
    tempArray.sort((a: TIntakeTableState, b: TIntakeTableState) => sortByCreatedAt(a, b));
    // setIntakeTableState(tempArray);
    setIntakeDict(intakeDictObj);
  }, [intakeSummaryArray]);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
      onClearTaskState();
      createIntakeJobsForm.resetFields();
      setShowCreateModal({
        ...showCreateModal,
        intake_job: false,
      });
    }
  }, [successMessage, createIntakeJobsForm, onClearTaskState, showCreateModal]);

  useEffect(() => {
    // If there is incoming data, update the table or add a new row to the table
    if (incomingData && typeof incomingData === 'object') {
      let serviceTypeOnlyArray: string[] = [];
      incomingData.jobs.forEach((job) => serviceTypeOnlyArray.push(job.service_type));

      let uniqueService = [...new Set(serviceTypeOnlyArray)];

      if (intakeDict === null) return;
      let intakeTableObj: TIntakeTableState = {
        key: incomingData.id.toString(),
        dateTimeIn: moment(incomingData.created_at).format('YYYY-MM-DD HH:mm A'), //formatted timestamp
        createdAt: incomingData.created_at, //raw timestamp
        pickup: incomingData.pick_up,
        regNumber: incomingData.registration,
        description: incomingData.description,
        serviceType: uniqueService.length > 0 ? uniqueService.join() : '-',
        status: `${uniqueService.length} / ${incomingData.jobs.length}`,
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
                      <section className="make__section">
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
                        <Table
                          bordered
                          // className="make__table"
                          scroll={{ x: '89rem', y: 'auto' }}
                          // components={components}
                          dataSource={Object.values(intakeDict)}
                          columns={convertHeader(intakeJobsColumns, setIntakeJobsColumns)}
                          pagination={false}
                        />
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
  jobStatusArray?: TReceivedJobStatusObj[] | null;
  intakeSummaryArray?: TReceivedIntakeSummaryObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.task.loading,
    errorMessage: state.task.errorMessage,
    successMessage: state.task.successMessage,
    jobStatusArray: state.dashboard.jobStatusArray,
    intakeSummaryArray: state.task.intakeSummaryArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
  };
};

interface DispatchProps {
  // onGetTasks: typeof actions.getTasks;
  // onCreateTask: typeof actions.createTask;
  // onUpdateTask: typeof actions.updateTask;
  // onDeleteTask: typeof actions.deleteTask;
  onGetJobStatus: typeof actions.getJobStatus;
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
    onGetJobStatus: () => dispatch(actions.getJobStatus()),
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

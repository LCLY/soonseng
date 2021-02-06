import React, { useEffect, useState } from 'react';
import './TaskPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import CrudModal from 'src/components/Modal/Crud/CrudModal';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
/* 3rd party lib */
// import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Button, Layout, Form, Table, message } from 'antd';
import { ActionCableConsumer } from 'react-actioncable-provider';
/* Util */
import holy5truck from 'src/img/5trucks.jpg';
import * as actions from 'src/store/actions/index';
import { ITaskFormData, TReceivedTaskObj } from 'src/store/types/task';
import { RootState } from 'src';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';
import { TReceivedJobStatusObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';
import moment from 'moment';

type TTaskTableState = {
  key: string;
  dateTimeIn: string;
  regNumber: string;
  serviceType: string;
  status: string;
  bay: string;
};

interface TaskPageProps {}

type Props = TaskPageProps & StateProps & DispatchProps;

const TaskPage: React.FC<Props> = ({
  loading,
  tasksArray,
  onGetTasks,
  auth_token,
  onCreateTask,
  successMessage,
  onGetJobStatus,
  onClearTaskState,
  onGetUsersByRoles,
  onGetServiceTypes,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({ task: false });
  // const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({ fees: false });
  // const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({ fees: false });

  // Forms
  const [createTaskForm] = Form.useForm();

  // Incoming data
  const [incomingData, setIncomingData] = useState<TReceivedTaskObj | null>(null);
  // Table states
  const [taskTableState, setTaskTableState] = useState<TTaskTableState[]>([]);

  let taskSearchInput = null; //this is for filter on antd table

  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });
  setFilterReference(filterData, setFilterData);

  /* task table column initialization */
  const [taskColumns, setTaskColumns] = useState([
    {
      key: 'dateTimeIn',
      title: 'Date Time In',
      className: 'body__table-header--title',
      dataIndex: 'dateTimeIn',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TTaskTableState, b: TTaskTableState) => a.dateTimeIn.localeCompare(b.dateTimeIn),
      ...getColumnSearchProps(taskSearchInput, 'dateTimeIn', 'Date Time In'),
    },
    {
      key: 'regNumber',
      title: 'Registration Number',
      className: 'body__table-header--title',
      dataIndex: 'regNumber',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TTaskTableState, b: TTaskTableState) => a.regNumber.localeCompare(b.regNumber),
      ...getColumnSearchProps(taskSearchInput, 'regNumber', 'Registration Number'),
    },
    {
      key: 'serviceType',
      title: 'Service Type',
      className: 'body__table-header--title',
      dataIndex: 'serviceType',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TTaskTableState, b: TTaskTableState) => a.serviceType.localeCompare(b.serviceType),
      ...getColumnSearchProps(taskSearchInput, 'serviceType', 'Service Type'),
    },
    {
      key: 'status',
      title: 'Status',
      className: 'body__table-header--title',
      dataIndex: 'status',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TTaskTableState, b: TTaskTableState) => a.status.localeCompare(b.status),
      ...getColumnSearchProps(taskSearchInput, 'status', 'Status'),
    },
    {
      key: 'bay',
      title: 'Bay',
      className: 'body__table-header--title',
      dataIndex: 'bay',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TTaskTableState, b: TTaskTableState) => a.bay.localeCompare(b.bay),
      ...getColumnSearchProps(taskSearchInput, 'bay', 'Bay'),
    },
  ]);

  /* ================================================== */
  /*  method */
  /* ================================================== */
  const onCreateTaskFinish = (values: {
    jobStatus: number;
    registrationNumber: string;
    serviceTypes: number;
    usersByRoles: number[];
  }) => {
    let taskFormData: ITaskFormData = {
      registration_number: values.registrationNumber,
      job_status_id: values.jobStatus,
      service_type_id: values.serviceTypes,
      assigned_to_ids: values.usersByRoles,
      description: '',
    };
    if (auth_token && auth_token !== undefined) {
      onCreateTask(taskFormData, auth_token);
    }
  };
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    onGetTasks();
  }, [onGetTasks]);

  useEffect(() => {
    onGetJobStatus();
    onGetServiceTypes();
    onGetUsersByRoles(2, 'admin');
  }, [onGetJobStatus, onGetUsersByRoles, onGetServiceTypes]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for charges fees
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TTaskTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (task: TReceivedTaskObj) => {
      // only render when available value is true
      tempArray.push({
        key: task.id.toString(),
        dateTimeIn: moment(task.created_at).format('YYYY-MM-DD HH:mm A'),
        regNumber: task.registration_number,
        serviceType: task.service_type,
        status: task.status,
        bay: 'string',
      });
    };

    if (tasksArray) {
      // Execute function "storeValue" for every array index
      tasksArray.map(storeValue);
    }
    // update the state with tempArray
    setTaskTableState(tempArray);
  }, [tasksArray]);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
      onClearTaskState();
      createTaskForm.resetFields();
      setShowCreateModal({
        ...showCreateModal,
        task: false,
      });
    }
  }, [successMessage, createTaskForm, onClearTaskState, showCreateModal]);

  useEffect(() => {
    // If there is incoming data, update the table or add a new row to the table
    if (incomingData && typeof incomingData === 'object') {
      const tempTableData = [...taskTableState];
      // check if the incoming data's id exist in the tempTableData
      const index = tempTableData.findIndex((item) => incomingData.id.toString() === item.key);

      let formattedData = {
        key: incomingData.id.toString(),
        dateTimeIn: moment(incomingData.created_at).format('YYYY-MM-DD HH:mm A'),
        regNumber: incomingData.registration_number,
        serviceType: incomingData.service_type,
        status: incomingData.status,
        bay: 'string',
      };

      // If already exist, update/replace the row
      if (index > -1) {
        const item = tempTableData[index];
        tempTableData.splice(index, 1, {
          ...item,
          ...formattedData,
        });
        setTaskTableState(tempTableData);
        setIncomingData(null);
      } else {
        // If not yet exist, add a new row
        tempTableData.unshift(formattedData);
        setTaskTableState(tempTableData);
        setIncomingData(null);
      }
    }
  }, [taskTableState, incomingData]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <CrudModal
        crud="create"
        indexKey={'task'}
        category="task"
        modalWidth={600}
        modalTitle={'Create New Intake'}
        antdForm={createTaskForm}
        showModal={showCreateModal}
        visible={showCreateModal.task}
        onFinish={onCreateTaskFinish}
        setShowModal={setShowCreateModal}
        loading={loading !== undefined && loading}
      />
      <NavbarComponent activePage="task" defaultOpenKeys="dashboard" />
      <Layout>
        <LayoutComponent activeKey="accessory">
          <ParallaxContainer bgImageUrl={holy5truck} overlayColor="rgba(0, 0, 0, 0.3)">
            <CustomContainer>
              <div className="make__tab-outerdiv">
                <section>
                  <>
                    {tasksArray ? (
                      <section className="make__section">
                        <div className="make__header-div ">
                          <div className="make__header-title">Tasks</div>
                          <Button
                            type="primary"
                            className="make__brand-btn"
                            onClick={() => setShowCreateModal({ ...showCreateModal, task: true })}
                          >
                            Create New Intake
                          </Button>
                        </div>

                        {/* -------------------- */}
                        {/*     Task Table      */}
                        {/* -------------------- */}
                        <Table
                          bordered
                          // className="make__table"
                          scroll={{ x: '89rem', y: 'auto' }}
                          // components={components}
                          dataSource={taskTableState}
                          columns={convertHeader(taskColumns, setTaskColumns)}
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
      <ActionCableConsumer
        channel={{ channel: 'JobMonitoringChannel' }}
        onConnected={() => console.log('Connected')}
        onReceived={(res: any) => setIncomingData(res.data)}
      />
    </>
  );
};

interface StateProps {
  loading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  auth_token?: string | null;
  tasksArray?: TReceivedTaskObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
  jobStatusArray?: TReceivedJobStatusObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.task.loading,
    tasksArray: state.task.tasksArray,
    auth_token: state.auth.auth_token,
    errorMessage: state.task.errorMessage,
    successMessage: state.task.successMessage,
    jobStatusArray: state.dashboard.jobStatusArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
  };
};

interface DispatchProps {
  onGetTasks: typeof actions.getTasks;
  onCreateTask: typeof actions.createTask;
  onUpdateTask: typeof actions.updateTask;
  onDeleteTask: typeof actions.deleteTask;
  onGetJobStatus: typeof actions.getJobStatus;
  onClearTaskState: typeof actions.clearTaskState;
  onGetUsersByRoles: typeof actions.getUsersByRoles;
  onGetServiceTypes: typeof actions.getServiceTypes;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetTasks: () => dispatch(actions.getTasks()),
    onClearTaskState: () => dispatch(actions.clearTaskState()),
    onDeleteTask: (task_id) => dispatch(actions.deleteTask(task_id)),
    onUpdateTask: (task_id, taskFormData) => dispatch(actions.updateTask(task_id, taskFormData)),
    onCreateTask: (taskFormData, auth_token) => dispatch(actions.createTask(taskFormData, auth_token)),
    onGetJobStatus: () => dispatch(actions.getJobStatus()),
    onGetServiceTypes: () => dispatch(actions.getServiceTypes()),
    onGetUsersByRoles: (role_id, title) => dispatch(actions.getUsersByRoles(role_id, title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);

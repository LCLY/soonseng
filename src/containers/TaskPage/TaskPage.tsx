import React, { useEffect, useState } from 'react';
import './TaskPage.scss';
/* components */
import Footer from 'src/components/Footer/Footer';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Button, Layout, Table } from 'antd';
/* Util */
import holy5truck from 'src/img/5trucks.jpg';
import * as actions from 'src/store/actions/index';
import { TReceivedTaskObj } from 'src/store/types/task';
import { RootState } from 'src';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';

type TTaskTableState = {
  key: string;
  dateTimeIn: string;
  regNumber: string;
  serviceType: string;
  status: string;
  mechanic: string;
};

interface TaskPageProps {}

type Props = TaskPageProps & StateProps & DispatchProps;

const TaskPage: React.FC<Props> = ({ tasksArray, onGetTasks }) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({ task: false });
  // const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({ fees: false });
  // const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({ fees: false });

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
      key: 'mechanic',
      title: 'Mechanic/Bay/Team Assigned',
      className: 'body__table-header--title',
      dataIndex: 'mechanic',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TTaskTableState, b: TTaskTableState) => a.mechanic.localeCompare(b.mechanic),
      ...getColumnSearchProps(taskSearchInput, 'mechanic', 'Mechanic/Bay/Team Assigned'),
    },
  ]);

  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    onGetTasks();
  }, [onGetTasks]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for charges fees
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TTaskTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (task: TReceivedTaskObj) => {
      // only render when available value is true

      tempArray.push({
        key: uuidv4(),
        dateTimeIn: 'created date',
        regNumber: task.registration_number,
        status: task.job_statuses_id.toString(),
        mechanic: task.assigned_to_id.toString(),
        serviceType: task.service_types_id.toString(),
      });
    };

    if (tasksArray) {
      // Execute function "storeValue" for every array index
      tasksArray.map(storeValue);
    }
    // update the state with tempArray
    setTaskTableState(tempArray);
  }, [tasksArray]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
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
                            Create New Task
                          </Button>
                        </div>

                        {/* -------------------- */}
                        {/*     Task Table      */}
                        {/* -------------------- */}
                        <Table
                          bordered
                          className="make__table"
                          scroll={{ x: '89rem', y: 600 }}
                          // components={components}
                          dataSource={taskTableState}
                          columns={convertHeader(taskColumns, setTaskColumns)}
                          // pagination={false}ca
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
    </>
  );
};

interface StateProps {
  loading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  tasksArray?: TReceivedTaskObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.task.loading,
    errorMessage: state.task.errorMessage,
    successMessage: state.task.successMessage,
    tasksArray: state.task.tasksArray,
  };
};

interface DispatchProps {
  onGetTasks: typeof actions.getTasks;
  onCreateTask: typeof actions.createTask;
  onUpdateTask: typeof actions.updateTask;
  onDeleteTask: typeof actions.deleteTask;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetTasks: () => dispatch(actions.getTasks()),
    onCreateTask: (taskFormData) => dispatch(actions.createTask(taskFormData)),
    onUpdateTask: (task_id, taskFormData) => dispatch(actions.updateTask(task_id, taskFormData)),
    onDeleteTask: (task_id) => dispatch(actions.deleteTask(task_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);

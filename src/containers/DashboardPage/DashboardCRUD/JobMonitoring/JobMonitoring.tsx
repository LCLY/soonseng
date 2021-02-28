import { Button, Form, Layout, message, Table, Tooltip } from 'antd';
import React, { ReactText, useEffect, useState } from 'react';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
import holy5truck from 'src/img/5trucks.jpg';
import './JobMonitoring.scss';
/* components */
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

/* Util */
import { RootState } from 'src';
import * as actions from 'src/store/actions/index';
import {
  IServiceTaskFormData,
  TReceivedJobStatusObj,
  TReceivedServiceTypesObj,
  TReceivedServiceTaskObj,
} from 'src/store/types/dashboard';
import CrudModal from 'src/components/Modal/Crud/CrudModal';
import { convertHeader, getColumnSearchProps, onTableRowExpand } from 'src/shared/Utils';

interface JobMonitoringProps {}

type TServiceTypesTableState = {
  key: string;
  id: number;
  title: string;
  description: string;
};
type TJobStatusTableState = {
  key: string;
  id: number;
  title: string;
  description: string;
};

type Props = JobMonitoringProps & StateProps & DispatchProps;

const JobMonitoring: React.FC<Props> = ({
  loading,
  jobStatusArray,
  successMessage,
  serviceTasksArray,
  serviceTypesArray,
  onGetJobStatus,
  onCreateJobStatus,
  onDeleteJobStatus,
  onUpdateJobStatus,
  onGetServiceTypes,
  onCreateServiceType,
  onUpdateServiceType,
  onDeleteServiceType,
  onGetServiceTasks,
  onCreateServiceTask,
  onUpdateServiceTask,
  onDeleteServiceTask,
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({
    service_type: false,
    job_status: false,
    task_title: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({
    service_type: false,
    job_status: false,
    task_title: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({
    service_type: false,
    job_status: false,
    task_title: false,
  });
  const [deleteModalContent, setDeleteModalContent] = useState({
    job_status: { id: -1, title: '' },
    service_type: { id: -1, title: '' },
    task_title: { task_title_id: -1, service_type_id: -1, title: '' },
  });

  const [createServiceTypeForm] = Form.useForm();
  const [updateServiceTypeForm] = Form.useForm();
  const [createJobStatusForm] = Form.useForm();
  const [updateJobStatusForm] = Form.useForm();
  const [createServiceTaskForm] = Form.useForm();
  const [updateServiceTaskForm] = Form.useForm();

  const [expandedRowKeys, setExpandedRowKeys] = useState<ReactText[]>([]);

  // Table states
  const [serviceTypesTableState, setServiceTypesTableState] = useState<TServiceTypesTableState[]>([]);
  const [jobStatusTableState, setJobStatusTableState] = useState<TJobStatusTableState[]>([]);

  let serviceTypesSearchInput = null; //this is for filter on antd table
  let jobStatusSearchInput = null; //this is for filter on antd table

  const [serviceTypesColumns, setServiceTypesColumns] = useState([
    {
      key: 'title',
      title: 'Title',
      className: 'body__table-header--title',
      dataIndex: 'title',

      ellipsis: true,
      sorter: (a: TJobStatusTableState, b: TJobStatusTableState) => a.title.localeCompare(b.title),
      ...getColumnSearchProps(serviceTypesSearchInput, 'title', 'Title'),
    },
    {
      key: 'description',
      title: 'Description',
      className: 'body__table-header--title',
      dataIndex: 'description',

      ellipsis: true,
      sorter: (a: TJobStatusTableState, b: TJobStatusTableState) => a.description.localeCompare(b.description),
      ...getColumnSearchProps(serviceTypesSearchInput, 'description', 'Description'),
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TJobStatusTableState) => {
        return (
          <>
            <div className="dashboard__btn-div">
              <Button
                type="link"
                className="make__brand-btn--edit"
                onClick={() => {
                  // populate the accessory modal
                  updateServiceTypeForm.setFieldsValue({
                    id: record.id,
                    title: record.title,
                    description: record.description,
                  });
                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, service_type: true });
                }}
              >
                <i className="far fa-edit"></i>
              </Button>
              <Button
                type="link"
                className="make__brand-btn--edit"
                onClick={() => {
                  alert('disable - supposed to set available to false');
                }}
              >
                <i className="fas fa-eye-slash"></i>
              </Button>
              <Button
                type="link"
                danger
                onClick={() => {
                  // delete modal
                  setShowDeleteModal({ ...showDeleteModal, service_type: true });
                  setDeleteModalContent({
                    ...deleteModalContent,
                    service_type: { id: record.id, title: record.title },
                  });
                }}
              >
                <i className="far fa-trash-alt"></i>
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                type="default"
                onClick={() => {
                  setShowCreateModal({ ...showCreateModal, task_title: true });
                  createServiceTaskForm.setFieldsValue({
                    service_type_id: record.id,
                  });
                }}
              >
                Create Service Task
              </Button>
            </div>
          </>
        );
      },
    },
  ]);

  const [jobStatusColumns, setJobStatusColumns] = useState([
    {
      key: 'title',
      title: 'Title',
      className: 'body__table-header--title',
      dataIndex: 'title',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TJobStatusTableState, b: TJobStatusTableState) => a.title.localeCompare(b.title),
      ...getColumnSearchProps(jobStatusSearchInput, 'title', 'Title'),
    },
    {
      key: 'description',
      title: 'Description',
      className: 'body__table-header--title',
      dataIndex: 'description',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TJobStatusTableState, b: TJobStatusTableState) => a.description.localeCompare(b.description),
      ...getColumnSearchProps(jobStatusSearchInput, 'description', 'Description'),
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TJobStatusTableState) => {
        return (
          <>
            <div className="dashboard__btn-div">
              <Button
                type="link"
                className="make__brand-btn--edit"
                onClick={() => {
                  // populate the accessory modal
                  updateJobStatusForm.setFieldsValue({
                    id: record.id,
                    title: record.title,
                    description: record.description,
                  });
                  // show modal
                  setShowUpdateModal({ ...showUpdateModal, job_status: true });
                }}
              >
                <i className="far fa-edit"></i>
              </Button>
              <Button
                type="link"
                className="make__brand-btn--edit"
                onClick={() => {
                  alert('disable - supposed to set available to false');
                }}
              >
                <i className="fas fa-eye-slash"></i>
              </Button>
              <Button
                type="link"
                danger
                onClick={() => {
                  // delete modal
                  setShowDeleteModal({ ...showDeleteModal, job_status: true });
                  setDeleteModalContent({
                    ...deleteModalContent,
                    job_status: { id: record.id, title: record.title },
                  });
                }}
              >
                <i className="far fa-trash-alt"></i>
              </Button>
            </div>
          </>
        );
      },
    },
  ]);

  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* Job Status */
  const onCreateJobStatusFinish = (values: { title: string; description: string }) => {
    onCreateJobStatus(values.title, values.description);
  };
  const onUpdateJobStatusFinish = (values: { id: number; title: string; description: string }) => {
    onUpdateJobStatus(values.id, values.title, values.description);
  };
  const onDeleteJobStatusFinish = () => {
    onDeleteJobStatus(deleteModalContent.job_status.id);
  };

  /* Service Type */
  const onCreateServiceTypeFinish = (values: { title: string; description: string }) => {
    onCreateServiceType(values.title, values.description);
  };
  const onUpdateServiceTypeFinish = (values: { id: number; title: string; description: string }) => {
    onUpdateServiceType(values.id, values.title, values.description);
  };
  const onDeleteServiceTypeFinish = () => {
    onDeleteServiceType(deleteModalContent.service_type.id);
  };

  /* Task Title */
  const onCreateServiceTaskFinish = (values: { title: string; description: string; service_type_id: number }) => {
    let taskTitleFormData: IServiceTaskFormData = {
      title: values.title,
      description: values.description,
      service_type_id: values.service_type_id,
    };
    onCreateServiceTask(taskTitleFormData);
  };
  const onUpdateServiceTaskFinish = (values: {
    title: string;
    description: string;
    task_title_id: number;
    service_type_id: number;
  }) => {
    let taskTitleFormData: IServiceTaskFormData = {
      title: values.title,
      description: values.description,
      service_type_id: values.service_type_id,
    };
    onUpdateServiceTask(values.task_title_id, taskTitleFormData);
  };
  const onDeleteServiceTaskFinish = () => {
    onDeleteServiceTask(deleteModalContent.task_title.task_title_id, deleteModalContent.task_title.service_type_id);
  };

  const onExpandIcon = (expanded: boolean, record: TServiceTypesTableState) => {
    let expandImageGalleryButton = null;

    expandImageGalleryButton = (
      <PlusCircleTwoTone
        // style={{
        //   opacity: record.brandImages.length === 0 ? 0.3 : 1,
        //   pointerEvents: record.brandImages.length === 0 ? 'none' : 'auto',
        // }}
        onClick={() => {
          onGetServiceTasks(record.id);
          // this allow only 1 row to expand at a time
          onTableRowExpand(expanded, record, setExpandedRowKeys);
        }}
      />
    );

    return (
      <>
        {expanded ? (
          <Tooltip trigger={['hover', 'click']} title="Click to hide service tasks">
            <MinusCircleTwoTone
              onClick={() => {
                onTableRowExpand(expanded, record, setExpandedRowKeys);
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip trigger={['hover', 'click']} title="Click to view all service tasks">
            {expandImageGalleryButton}
          </Tooltip>
        )}
      </>
    );
  };

  const onExpandedRowRender = (record: TServiceTypesTableState) => {
    return (
      <>
        {serviceTasksArray ? (
          <>
            {serviceTasksArray.length > 0 ? (
              serviceTasksArray.map((task) => (
                <div key={uuidv4()}>
                  {`${task.title}${task.description && task.description !== '' ? ` - ${task.description}` : ''} `}
                  <Button
                    className="make__brand-btn--edit"
                    type="link"
                    title="Edit Service Task"
                    onClick={() => {
                      // delete modal
                      setShowUpdateModal({ ...showUpdateModal, task_title: true });
                      updateServiceTaskForm.setFieldsValue({
                        task_title_id: task.id,
                        title: task.title,
                        service_type_id: record.id,
                        description: task.description,
                      });
                    }}
                  >
                    <i className="far fa-edit"></i>
                  </Button>
                  <Button
                    type="link"
                    danger
                    title="Delete Service Task"
                    onClick={() => {
                      // delete modal
                      setShowDeleteModal({ ...showDeleteModal, task_title: true });
                      setDeleteModalContent({
                        ...deleteModalContent,
                        task_title: { task_title_id: task.id, service_type_id: record.id, title: task.title },
                      });
                    }}
                  >
                    <i className="far fa-trash-alt"></i>
                  </Button>
                </div>
              ))
            ) : (
              <p>No Service Task</p>
            )}
          </>
        ) : (
          <p>loading...</p>
        )}
      </>
    );
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  useEffect(() => {
    onGetJobStatus();
    onGetServiceTypes();
  }, [onGetJobStatus, onGetServiceTypes]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for job status and service types
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TJobStatusTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (jobStatus: TReceivedJobStatusObj) => {
      // only render when available value is true
      tempArray.push({
        key: uuidv4(),
        id: jobStatus.id,
        title: jobStatus.title,
        description: jobStatus.description && jobStatus.description !== '' ? jobStatus.description : '-',
      });
    };

    if (jobStatusArray) {
      // Execute function "storeValue" for every array index
      jobStatusArray.map(storeValue);
    }
    // update the state with tempArray
    setJobStatusTableState(tempArray);
  }, [jobStatusArray]);

  useEffect(() => {
    let tempArray: TServiceTypesTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (serviceType: TReceivedServiceTypesObj) => {
      // only render when available value is true
      tempArray.push({
        key: uuidv4(),
        id: serviceType.id,
        title: serviceType.title,
        description: serviceType.description && serviceType.description !== '' ? serviceType.description : '-',
      });
    };

    if (serviceTypesArray) {
      // Execute function "storeValue" for every array index
      serviceTypesArray.map(storeValue);
    }
    // update the state with tempArray
    setServiceTypesTableState(tempArray);
  }, [serviceTypesArray]);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
      onClearDashboardState();

      createJobStatusForm.resetFields();
      createServiceTypeForm.resetFields();
      createServiceTaskForm.resetFields();

      setShowCreateModal({
        ...showCreateModal,
        service_type: false,
        job_status: false,
        task_title: false,
      });
      setShowUpdateModal({
        ...showUpdateModal,
        service_type: false,
        job_status: false,
        task_title: false,
      });
      setShowDeleteModal({
        ...showDeleteModal,
        service_type: false,
        job_status: false,
        task_title: false,
      });
    }
  }, [
    successMessage,
    showDeleteModal,
    showUpdateModal,
    showCreateModal,
    createJobStatusForm,
    createServiceTypeForm,
    createServiceTaskForm,
    onClearDashboardState,
  ]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* Job Status */}
      <CrudModal
        crud="create"
        indexKey="job_status"
        category="job_status"
        modalTitle={'Create New Job Status'}
        antdForm={createJobStatusForm}
        showModal={showCreateModal}
        visible={showCreateModal.job_status}
        onFinish={onCreateJobStatusFinish}
        setShowModal={setShowCreateModal}
        loading={loading !== undefined && loading}
      />
      <CrudModal
        crud="update"
        indexKey="job_status"
        category="job_status"
        modalTitle={'Update Job Status'}
        antdForm={updateJobStatusForm}
        showModal={showUpdateModal}
        visible={showUpdateModal.job_status}
        onFinish={onUpdateJobStatusFinish}
        setShowModal={setShowUpdateModal}
        loading={loading !== undefined && loading}
      />

      <CrudModal
        category="job_status"
        crud={'delete'}
        visible={showDeleteModal.job_status}
        indexKey="job_status"
        showModal={showDeleteModal}
        onDelete={onDeleteJobStatusFinish}
        setShowModal={setShowDeleteModal}
        loading={loading !== undefined && loading}
        modalTitle={'Delete Job Status'}
        warningText={deleteModalContent.job_status.title}
        backupWarningText={'this job status'}
      />

      {/* Service Type */}
      <CrudModal
        crud="create"
        indexKey="service_type"
        category="service_type"
        modalTitle={'Create New Job/Service Type'}
        antdForm={createServiceTypeForm}
        showModal={showCreateModal}
        visible={showCreateModal.service_type}
        onFinish={onCreateServiceTypeFinish}
        setShowModal={setShowCreateModal}
        loading={loading !== undefined && loading}
      />
      <CrudModal
        crud="update"
        indexKey="service_type"
        category="service_type"
        modalTitle={'Update Job/Service Type'}
        antdForm={updateServiceTypeForm}
        showModal={showUpdateModal}
        visible={showUpdateModal.service_type}
        onFinish={onUpdateServiceTypeFinish}
        setShowModal={setShowUpdateModal}
        loading={loading !== undefined && loading}
      />

      <CrudModal
        category="service_type"
        crud={'delete'}
        visible={showDeleteModal.service_type}
        indexKey="service_type"
        showModal={showDeleteModal}
        onDelete={onDeleteServiceTypeFinish}
        setShowModal={setShowDeleteModal}
        loading={loading !== undefined && loading}
        modalTitle={'Delete Service Type'}
        warningText={deleteModalContent.service_type.title}
        backupWarningText={'this job/service type'}
      />
      {/* Task Title */}
      <CrudModal
        crud="create"
        indexKey="task_title"
        category="task_title"
        modalTitle={'Create New Service Task'}
        antdForm={createServiceTaskForm}
        showModal={showCreateModal}
        visible={showCreateModal.task_title}
        onFinish={onCreateServiceTaskFinish}
        setShowModal={setShowCreateModal}
        loading={loading !== undefined && loading}
      />
      <CrudModal
        crud="update"
        indexKey="task_title"
        category="task_title"
        modalTitle={'Update Service Task'}
        antdForm={updateServiceTaskForm}
        showModal={showUpdateModal}
        visible={showUpdateModal.task_title}
        onFinish={onUpdateServiceTaskFinish}
        setShowModal={setShowUpdateModal}
        loading={loading !== undefined && loading}
      />

      <CrudModal
        category="task_title"
        crud={'delete'}
        visible={showDeleteModal.task_title}
        indexKey="task_title"
        showModal={showDeleteModal}
        onDelete={onDeleteServiceTaskFinish}
        setShowModal={setShowDeleteModal}
        loading={loading !== undefined && loading}
        modalTitle={'Delete Service Task'}
        warningText={deleteModalContent.task_title.title}
        backupWarningText={'this service task'}
      />

      <NavbarComponent activePage="job_monitoring" defaultOpenKeys="dashboard" />
      <Layout>
        <LayoutComponent activeKey="accessory">
          <ParallaxContainer bgImageUrl={holy5truck} overlayColor="rgba(0, 0, 0, 0.3)">
            <CustomContainer>
              <div className="make__tab-outerdiv">
                <section>
                  <>
                    {jobStatusArray && serviceTypesArray ? (
                      <>
                        <section className="make__section">
                          <div className="make__header-div ">
                            <div className="make__header-title">Job/Service Types</div>
                            <Button
                              type="primary"
                              className="make__brand-btn"
                              onClick={() => setShowCreateModal({ ...showCreateModal, service_type: true })}
                            >
                              Create New Job/Service Type
                            </Button>
                          </div>

                          {/* -------------------- */}
                          {/*     Make Table      */}
                          {/* -------------------- */}
                          <Table
                            bordered
                            className="make__table"
                            scroll={{ x: '89rem', y: 600 }}
                            dataSource={serviceTypesTableState}
                            columns={convertHeader(serviceTypesColumns, setServiceTypesColumns)}
                            expandedRowKeys={expandedRowKeys} // this allow only 1 row to expand at a time
                            onExpand={(expanded, record) => onTableRowExpand(expanded, record, setExpandedRowKeys)} //this allow only 1 row to expand at a time
                            expandable={{
                              expandIcon: ({ expanded, record }) => onExpandIcon(expanded, record),
                              expandedRowRender: (record: TServiceTypesTableState) => onExpandedRowRender(record),
                            }}
                            pagination={false}
                            // components={components}
                          />
                        </section>

                        <section className="make__section">
                          <div className="make__header-div ">
                            <div className="make__header-title">Job Status</div>
                            <Button
                              type="primary"
                              className="make__brand-btn"
                              onClick={() => setShowCreateModal({ ...showCreateModal, job_status: true })}
                            >
                              Create New Job Status
                            </Button>
                          </div>

                          {/* -------------------- */}
                          {/*     Make Table      */}
                          {/* -------------------- */}
                          <Table
                            bordered
                            className="make__table"
                            scroll={{ x: '89rem', y: 600 }}
                            dataSource={jobStatusTableState}
                            columns={convertHeader(jobStatusColumns, setJobStatusColumns)}
                            // components={components}

                            // pagination={false}
                          />
                        </section>
                      </>
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
    </>
  );
};

interface StateProps {
  loading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  jobStatusArray?: TReceivedJobStatusObj[] | null;
  serviceTasksArray?: TReceivedServiceTaskObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.dashboard.loading,
    errorMessage: state.dashboard.errorMessage,
    successMessage: state.dashboard.successMessage,
    jobStatusArray: state.dashboard.jobStatusArray,
    serviceTasksArray: state.dashboard.serviceTasksArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
  };
};

interface DispatchProps {
  onGetJobStatus: typeof actions.getJobStatus;
  onCreateJobStatus: typeof actions.createJobStatus;
  onUpdateJobStatus: typeof actions.updateJobStatus;
  onDeleteJobStatus: typeof actions.deleteJobStatus;
  onGetServiceTypes: typeof actions.getServiceTypes;
  onCreateServiceType: typeof actions.createServiceType;
  onUpdateServiceType: typeof actions.updateServiceType;
  onDeleteServiceType: typeof actions.deleteServiceType;
  onGetServiceTasks: typeof actions.getServiceTasks;
  onCreateServiceTask: typeof actions.createServiceTask;
  onUpdateServiceTask: typeof actions.updateServiceTask;
  onDeleteServiceTask: typeof actions.deleteServiceTask;
  onClearDashboardState: typeof actions.clearDashboardState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
    onGetJobStatus: () => dispatch(actions.getJobStatus()),
    onUpdateJobStatus: (job_status_id, title, description) =>
      dispatch(actions.updateJobStatus(job_status_id, title, description)),
    onDeleteJobStatus: (job_status_id) => dispatch(actions.deleteJobStatus(job_status_id)),
    onCreateJobStatus: (title, description) => dispatch(actions.createJobStatus(title, description)),
    onGetServiceTypes: () => dispatch(actions.getServiceTypes()),
    onUpdateServiceType: (service_type_id, title, description) =>
      dispatch(actions.updateServiceType(service_type_id, title, description)),
    onCreateServiceType: (title, description) => dispatch(actions.createServiceType(title, description)),
    onDeleteServiceType: (service_type_id) => dispatch(actions.deleteServiceType(service_type_id)),
    onGetServiceTasks: (service_type_id) => dispatch(actions.getServiceTasks(service_type_id)),
    onCreateServiceTask: (taskTitleFormData) => dispatch(actions.createServiceTask(taskTitleFormData)),
    onUpdateServiceTask: (service_task_id, taskTitleFormData) =>
      dispatch(actions.updateServiceTask(service_task_id, taskTitleFormData)),
    onDeleteServiceTask: (service_task_id, service_type_id) =>
      dispatch(actions.deleteServiceTask(service_task_id, service_type_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobMonitoring);

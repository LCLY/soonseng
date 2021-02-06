import { Button, Form, Layout, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
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
/* Util */
import { RootState } from 'src';
import * as actions from 'src/store/actions/index';
import { TReceivedJobStatusObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';
import CrudModal from 'src/components/Modal/Crud/CrudModal';
import { convertHeader, getColumnSearchProps } from 'src/shared/Utils';

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
  serviceTypesArray,
  onGetJobStatus,
  onCreateJobStatus,
  onUpdateJobStatus,
  onGetServiceTypes,
  onCreateServiceType,
  onUpdateServiceType,
  onDeleteJobStatus,
  onDeleteServiceType,
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({
    service_type: false,
    job_status: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({
    service_type: false,
    job_status: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({
    service_type: false,
    job_status: false,
  });
  const [deleteModalContent, setDeleteModalContent] = useState({
    job_status: { id: -1, title: '' },
    service_type: { id: -1, title: '' },
  });

  const [createServiceTypeForm] = Form.useForm();
  const [updateServiceTypeForm] = Form.useForm();
  const [createJobStatusForm] = Form.useForm();
  const [updateJobStatusForm] = Form.useForm();

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
        description: jobStatus.description,
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
        description: serviceType.description,
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
      setShowCreateModal({
        ...showCreateModal,
        service_type: false,
        job_status: false,
      });
      setShowUpdateModal({
        ...showUpdateModal,
        service_type: false,
        job_status: false,
      });
      setShowDeleteModal({
        ...showDeleteModal,
        service_type: false,
        job_status: false,
      });
    }
  }, [
    successMessage,
    showDeleteModal,
    showUpdateModal,
    showCreateModal,
    createJobStatusForm,
    createServiceTypeForm,
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
                            // components={components}

                            // pagination={false}
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
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.dashboard.loading,
    errorMessage: state.dashboard.errorMessage,
    successMessage: state.dashboard.successMessage,
    jobStatusArray: state.dashboard.jobStatusArray,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobMonitoring);

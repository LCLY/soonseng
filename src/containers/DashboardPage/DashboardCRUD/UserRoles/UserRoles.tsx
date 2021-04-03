import React, { useState, useEffect } from 'react';
import './UserRoles.scss';
/*Components*/
import Footer from 'src/components/Footer/Footer';
import CrudModal from 'src/components/Modal/Crud/CrudModal';
import Ripple from 'src/components/Loading/LoadingIcons/Ripple/Ripple';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
import CustomContainer from 'src/components/CustomContainer/CustomContainer';
import LayoutComponent from 'src/components/LayoutComponent/LayoutComponent';
import ParallaxContainer from 'src/components/ParallaxContainer/ParallaxContainer';
/*3rd party lib*/
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { Button, Form, Layout, notification, Table } from 'antd';
/* Util */
import * as actions from 'src/store/actions/index';
import { RootState } from 'src';
import holy5trucks from 'src/img/5trucks.jpg';
import { TReceivedUserInfoObj } from 'src/store/types/auth';
import { TReceivedUserRolesObj } from 'src/store/types/dashboard';
import { convertHeader, getColumnSearchProps, setFilterReference } from 'src/shared/Utils';

type TUserTableState = {
  key: string;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type TRoleTableState = {
  key: string;
  roleId: number;
  roleTitle: string;
  roleDescription: string;
  roleAccess: { [key: string]: boolean }[];
};

interface UserRolesProps {}

type Props = UserRolesProps & StateProps & DispatchProps;

export const roleAccessArray = [
  'adminDashboard',
  'priceSalesPage',
  'editSalesDashboard',
  'fullSalesPage',
  'viewSalesDashboard',
  'salesmenDashboard',
];

const UserRoles: React.FC<Props> = ({
  loading,
  usersArray,
  userRolesArray,
  errorMessage,
  successMessage,
  onGetRoles,
  onGetUsers,
  onCreateUser,
  onDeleteRole,
  onCreateRole,
  onUpdateRole,
  onClearDashboardState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const [showCreateModal, setShowCreateModal] = useState<{ [key: string]: boolean }>({ users: false, roles: false });
  const [showUpdateModal, setShowUpdateModal] = useState<{ [key: string]: boolean }>({ users: false, roles: false });
  const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({ users: false, roles: false });

  const [deleteModalContent, setDeleteModalContent] = useState({
    users: { userId: -1, firstName: '', lastName: '' },
    roles: { roleId: -1, roleTitle: '' },
  });

  const [createUserForm] = Form.useForm();
  const [updateUserForm] = Form.useForm();
  const [createRoleForm] = Form.useForm();
  const [updateRoleForm] = Form.useForm();

  // Table states
  const [usersTableState, setUsersTableState] = useState<TUserTableState[]>([]);
  const [roleTableState, setRoleTableState] = useState<TRoleTableState[]>([]);
  let usersSearchInput = null; //this is for filter on antd table
  let roleSearchInput = null; //this is for filter on antd table
  const [filterData, setFilterData] = useState({ searchText: '', searchedColumn: '' });
  setFilterReference(filterData, setFilterData);

  // store table header definition in state

  /* users column initialization */
  const [usersColumns, setUsersColumns] = useState([
    {
      key: 'firstName',
      title: 'First Name',
      className: 'body__table-header--title',
      dataIndex: 'firstName',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TUserTableState, b: TUserTableState) => a.firstName.localeCompare(b.firstName),
      ...getColumnSearchProps(usersSearchInput, 'firstName', 'First Name'),
    },
    {
      key: 'lastName',
      title: 'Last Name',
      className: 'body__table-header--title',
      dataIndex: 'lastName',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TUserTableState, b: TUserTableState) => a.lastName.localeCompare(b.lastName),
      ...getColumnSearchProps(usersSearchInput, 'lastName', 'Last Name'),
    },
    {
      key: 'email',
      title: 'Email',
      className: 'body__table-header--title',
      dataIndex: 'email',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TUserTableState, b: TUserTableState) => a.email.localeCompare(b.email),
      ...getColumnSearchProps(usersSearchInput, 'email', 'Email'),
    },
    {
      key: 'role',
      title: 'Role',
      className: 'body__table-header--title',
      dataIndex: 'role',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TUserTableState, b: TUserTableState) => a.role.localeCompare(b.role),
      ...getColumnSearchProps(usersSearchInput, 'role', 'Role'),
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TUserTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // show modal
                setShowUpdateModal({ ...showUpdateModal, users: true });
              }}
            >
              Edit
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                // delete modal
                setShowDeleteModal({ ...showDeleteModal, users: true });
                setDeleteModalContent({
                  ...deleteModalContent,
                  users: { userId: record.userId, firstName: record.firstName, lastName: record.lastName },
                });
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ]);

  /* roles column initialization */
  const [rolesColumns, setRolesColumns] = useState([
    {
      key: 'roleTitle',
      title: 'Title',
      className: 'body__table-header--title',
      dataIndex: 'roleTitle',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TRoleTableState, b: TRoleTableState) => a.roleTitle.localeCompare(b.roleTitle),
      ...getColumnSearchProps(roleSearchInput, 'roleTitle', 'Title'),
    },
    {
      key: 'roleDescription',
      title: 'Description',
      className: 'body__table-header--title',
      dataIndex: 'roleDescription',
      width: 'auto',
      ellipsis: true,
      sorter: (a: TRoleTableState, b: TRoleTableState) => a.roleDescription.localeCompare(b.roleDescription),
      ...getColumnSearchProps(roleSearchInput, 'roleDescription', 'Price'),
    },
    {
      key: 'roleAccess',
      title: 'Access',
      className: 'body__table-header--title',
      dataIndex: 'roleAccess',
      width: 'auto',
      ellipsis: true,
      render: (_: any, record: TRoleTableState) => {
        return (
          <>
            <div className="userroles__access-outerdiv">
              {record.roleAccess.map((child) => (
                <div key={uuidv4()}>
                  <span className="userroles__access-text">{Object.keys(child)[0]}</span>
                  {Object.values(child)[0] ? (
                    <i className="fas fa-check-circle"></i>
                  ) : (
                    <i className="fas fa-times-circle"></i>
                  )}
                </div>
              ))}
            </div>
          </>
        );
      },
    },
    {
      key: 'bodyAction',
      title: 'Action',
      dataIndex: 'action',
      // fixed: 'right',
      width: '17rem',
      render: (_text: any, record: TRoleTableState) => {
        return (
          <>
            <Button
              type="link"
              className="make__brand-btn--edit"
              onClick={() => {
                // filter out the names that has true bool value
                let tempRoleAccessArray: string[] = [];

                record.roleAccess.forEach((child) => {
                  for (let i in child) {
                    console.log(i);
                    console.log(child[i]);
                    if (child[i] === true) {
                      tempRoleAccessArray.push(i);
                    }
                  }
                });
                // populate the update modal
                updateRoleForm.setFieldsValue({
                  roleTitle: record.roleTitle,
                  roleId: record.roleId,
                  roleDescription:
                    record.roleDescription === undefined ||
                    record.roleDescription === null ||
                    record.roleDescription === '-'
                      ? ''
                      : record.roleDescription,
                  roleAccess: tempRoleAccessArray,
                });
                // show modal
                setShowUpdateModal({ ...showUpdateModal, roles: true });
              }}
            >
              Edit
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                // delete modal
                setShowDeleteModal({ ...showDeleteModal, roles: true });
                setDeleteModalContent({
                  ...deleteModalContent,
                  roles: { roleId: record.roleId, roleTitle: record.roleTitle },
                });
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ]);

  /* ================================================== */
  /*  method */
  /* ================================================== */

  const onCreateUserFinish = (values: { firstName: string; lastName: string; email: string; password: string }) => {
    onCreateUser({
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      encrypted_password: values.password,
    });
  };
  const onUpdateUserFinish = () => {};

  const onCreateRoleFinish = (values: { roleAccess: string[]; roleDescription: string; roleTitle: string }) => {
    // let disallowedAccessArray = roleAccessArray.filter((access) => !values.roleAccess.includes(access));
    let roleAccessObj = {
      fullSalesPage: false,
      priceSalesPage: false,
      adminDashboard: false,
      editSalesDashboard: false,
      salesmenDashboard: false,
      viewSalesDashboard: false,
    };

    // loop the role access array (checked strings), modify the object
    values.roleAccess.forEach((access) => ((roleAccessObj as any)[access] = true));

    let description = values.roleDescription === undefined ? '' : values.roleDescription;
    onCreateRole({
      title: values.roleTitle,
      description: description,
      fullSalesPage: roleAccessObj.fullSalesPage,
      priceSalesPage: roleAccessObj.priceSalesPage,
      adminDashboard: roleAccessObj.adminDashboard,
      editSalesDashboard: roleAccessObj.editSalesDashboard,
      salesmenDashboard: roleAccessObj.salesmenDashboard,
      viewSalesDashboard: roleAccessObj.viewSalesDashboard,
    });
  };
  const onUpdateRoleFinish = (values: {
    roleId: number;
    roleAccess: string[];
    roleDescription: string;
    roleTitle: string;
  }) => {
    let roleAccessObj = {
      fullSalesPage: false,
      priceSalesPage: false,
      adminDashboard: false,
      editSalesDashboard: false,
      salesmenDashboard: false,
      viewSalesDashboard: false,
    };

    // loop the role access array (checked strings), modify the object
    values.roleAccess.forEach((access) => ((roleAccessObj as any)[access] = true));

    let description = values.roleDescription === undefined ? '' : values.roleDescription;
    let userRoleFormData = {
      title: values.roleTitle,
      description: description,
      fullSalesPage: roleAccessObj.fullSalesPage,
      priceSalesPage: roleAccessObj.priceSalesPage,
      adminDashboard: roleAccessObj.adminDashboard,
      editSalesDashboard: roleAccessObj.editSalesDashboard,
      salesmenDashboard: roleAccessObj.salesmenDashboard,
      viewSalesDashboard: roleAccessObj.viewSalesDashboard,
    };
    onUpdateRole(values.roleId, userRoleFormData);
  };

  const onDeleteRoleFinish = () => {
    onDeleteRole(deleteModalContent.roles.roleId);
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  useEffect(() => {
    onGetUsers();
    onGetRoles();
  }, [onGetUsers, onGetRoles]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for charges fees
  /* ----------------------------------------------------- */
  useEffect(() => {
    let tempArray: TUserTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (user: TReceivedUserInfoObj) => {
      // only render when available value is true

      tempArray.push({
        key: uuidv4(),
        userId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email === '' ? '-' : user.email,
        role: user.roles.title,
      });
    };

    if (usersArray) {
      // Execute function "storeValue" for every array index
      usersArray.map(storeValue);
    }
    // update the state with tempArray
    setUsersTableState(tempArray);
  }, [usersArray]);

  useEffect(() => {
    let tempArray: TRoleTableState[] = [];
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (role: TReceivedUserRolesObj) => {
      // only render when available value is true

      // convert the role object into an array and filter out those that are boolean

      let tempRoleAccessArray: { [key: string]: boolean }[] = [];
      for (let child in role) {
        // if the value is boolean
        if (typeof (role as any)[child] === 'boolean') {
          tempRoleAccessArray.push({ [child]: (role as any)[child] });
        }
      }

      tempArray.push({
        key: uuidv4(),
        roleId: role.id,
        roleTitle: role.title,
        roleAccess: tempRoleAccessArray,
        roleDescription: role.description === null || role.description === '' ? '-' : role.description,
      });
    };

    if (userRolesArray) {
      // Execute function "storeValue" for every array index
      userRolesArray.map(storeValue);
    }
    // update the state with tempArray
    setRoleTableState(tempArray);
  }, [userRolesArray]);

  /* -------------------- */
  // success notification
  /* -------------------- */
  useEffect(() => {
    if (successMessage) {
      // show success notification
      notification['success']({
        message: 'Success',
        description: successMessage,
      });
      // clear the successMessage object, set to null
      onClearDashboardState();
      // clear the form inputs using the form reference
      createUserForm.resetFields();

      // close all the modals if successful
      setShowCreateModal({
        ...showCreateModal,
        users: false,
        roles: false,
      });
      setShowUpdateModal({
        ...showUpdateModal,
        users: false,
        roles: false,
      });
      setShowDeleteModal({
        ...showDeleteModal,
        users: false,
        roles: false,
      });
    }
  }, [createUserForm, onClearDashboardState, showDeleteModal, showUpdateModal, showCreateModal, successMessage]);

  /* ------------------ */
  // error notification
  /* ------------------ */
  useEffect(() => {
    if (errorMessage) {
      notification['error']({
        message: 'Failed',
        duration: 2.5,
        description: errorMessage,
      });
      onClearDashboardState();
    }
  }, [errorMessage, onClearDashboardState]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {/* Modal */}
      <CrudModal
        category={'users'}
        crud={'create'}
        indexKey={'users'}
        antdForm={createUserForm}
        showModal={showCreateModal}
        onFinish={onCreateUserFinish}
        visible={showCreateModal.users}
        setShowModal={setShowCreateModal}
        loading={loading !== undefined && loading}
        modalTitle={'Create User'}
      />
      <CrudModal
        category={'users'}
        crud={'update'}
        indexKey={'users'}
        antdForm={updateUserForm}
        showModal={showUpdateModal}
        onFinish={onUpdateUserFinish}
        visible={showUpdateModal.users}
        setShowModal={setShowUpdateModal}
        loading={loading !== undefined && loading}
        modalTitle={'Update User'}
      />
      <CrudModal
        category={'roles'}
        crud={'create'}
        indexKey={'roles'}
        antdForm={createRoleForm}
        showModal={showCreateModal}
        onFinish={onCreateRoleFinish}
        visible={showCreateModal.roles}
        setShowModal={setShowCreateModal}
        loading={loading !== undefined && loading}
        modalTitle={'Create Role'}
      />
      <CrudModal
        category={'roles'}
        crud={'update'}
        indexKey={'roles'}
        antdForm={updateRoleForm}
        showModal={showUpdateModal}
        onFinish={onUpdateRoleFinish}
        visible={showUpdateModal.roles}
        setShowModal={setShowUpdateModal}
        loading={loading !== undefined && loading}
        modalTitle={'Update Role'}
      />

      <CrudModal
        category={'roles'}
        crud={'delete'}
        visible={showDeleteModal.roles}
        indexKey={'roles'}
        showModal={showDeleteModal}
        onDelete={onDeleteRoleFinish}
        setShowModal={setShowDeleteModal}
        loading={loading !== undefined && loading}
        modalTitle={'Delete Role'}
        warningText={deleteModalContent.roles.roleTitle}
        backupWarningText={'this role'}
      />
      <NavbarComponent activePage="users" defaultOpenKeys="dashboard" />
      <Layout>
        <LayoutComponent>
          <ParallaxContainer bgImageUrl={holy5trucks} overlayColor="rgba(0, 0, 0, 0.3)">
            <CustomContainer>
              <div className="make__tab-outerdiv">
                <section>
                  <>
                    {usersArray && userRolesArray ? (
                      <>
                        <section className="make__section">
                          <div className="make__header-div ">
                            <div className="make__header-title">Users</div>
                            <Button
                              type="primary"
                              className="make__brand-btn"
                              onClick={() => setShowCreateModal({ ...showCreateModal, users: true })}
                            >
                              Create User
                            </Button>
                          </div>

                          {/* -------------------- */}
                          {/*     User Table      */}
                          {/* -------------------- */}
                          <Table
                            bordered
                            className="make__table"
                            scroll={{ x: '89rem', y: 600 }}
                            dataSource={usersTableState}
                            columns={convertHeader(usersColumns, setUsersColumns)}
                          />
                        </section>
                        <section className="make__section">
                          <div className="make__header-div ">
                            <div className="make__header-title">Roles</div>
                            <Button
                              type="primary"
                              className="make__brand-btn"
                              onClick={() => setShowCreateModal({ ...showCreateModal, roles: true })}
                            >
                              Create Role
                            </Button>
                          </div>

                          {/* -------------------- */}
                          {/*     Role Table      */}
                          {/* -------------------- */}
                          <Table
                            bordered
                            className="make__table"
                            scroll={{ x: '89rem', y: 600 }}
                            dataSource={roleTableState}
                            columns={convertHeader(rolesColumns, setRolesColumns)}
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
      <Footer />
    </>
  );
};

interface StateProps {
  loading?: boolean;
  usersArray?: TReceivedUserInfoObj[] | null;
  userRolesArray?: TReceivedUserRolesObj[] | null;
  successMessage?: string | null;
  errorMessage?: string | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.dashboard.loading,
    usersArray: state.dashboard.usersArray,
    errorMessage: state.dashboard.errorMessage,
    successMessage: state.dashboard.successMessage,
    userRolesArray: state.dashboard.userRolesArray,
  };
};

interface DispatchProps {
  onGetUsers: typeof actions.getUsers;
  onCreateUser: typeof actions.createUser;
  onUpdateUser: typeof actions.updateUser;
  onDeleteUser: typeof actions.deleteUser;
  onGetRoles: typeof actions.getRoles;
  onUpdateRole: typeof actions.updateRole;
  onDeleteRole: typeof actions.deleteRole;
  onCreateRole: typeof actions.createRole;
  onClearDashboardState: typeof actions.clearDashboardState;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetUsers: () => dispatch(actions.getUsers()),
    onGetRoles: () => dispatch(actions.getRoles()),
    onDeleteUser: (user_id) => dispatch(actions.deleteUser(user_id)),
    onDeleteRole: (role_id) => dispatch(actions.deleteRole(role_id)),
    onCreateRole: (userRoleFormData) => dispatch(actions.createRole(userRoleFormData)),
    onUpdateRole: (role_id, userRoleFormData) => dispatch(actions.updateRole(role_id, userRoleFormData)),
    onCreateUser: (userFormData) => dispatch(actions.createUser(userFormData)),
    onUpdateUser: (user_id, userFormData) => dispatch(actions.updateUser(user_id, userFormData)),
    onClearDashboardState: () => dispatch(actions.clearDashboardState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserRoles);

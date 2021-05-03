import React, { useState, useEffect } from 'react';
import { RootState } from 'src';
import './CreateSpecificIntake.scss';
/* components */
/* 3rd party lib */
import moment from 'moment';
import gsap from 'gsap';
import { Table, Tooltip, Form, Button, Input, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
/* Util */
import { Dispatch, AnyAction } from 'redux';
import { IServiceTaskDropdown } from '../TaskPage';
import * as actions from 'src/store/actions/index';
import { TReceivedUserInfoObj } from 'src/store/types/auth';
import { TReceivedIntakeStatusObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';
import { IJobFormData, IIntakeJobsFormData, TServiceTypeTaskDict } from 'src/store/types/task';

const { Option } = Select;

interface CreateSpecificIntakeProps {
  count: number;
  createIntakeJobsForm: any;
  serviceTaskDropdown: IServiceTaskDropdown;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  serviceTypeTaskDict: TServiceTypeTaskDict | null;
  setServiceTypeTaskDict: React.Dispatch<React.SetStateAction<TServiceTypeTaskDict | null>>;
  setServiceTaskDropdown: React.Dispatch<React.SetStateAction<IServiceTaskDropdown>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<'main' | 'update' | 'create'>>;
}

export type TTaskTableState = {
  key: number;
  taskId: string;
  taskType: string;
  taskTitle: string;
  taskTitleString?: string;
  taskDescription: string;
};

type Props = CreateSpecificIntakeProps & StateProps & DispatchProps;

const CreateSpecificIntake: React.FC<Props> = ({
  count,
  setCount,
  loading,
  userInfoObj,
  setCurrentPage,
  onGetServiceTypes,
  usersByRolesArray,
  intakeStatusArray,
  serviceTypesArray,
  serviceTypeTaskDict,
  serviceTaskDropdown,
  createIntakeJobsForm,
  // beforeDeleteState,
  setServiceTaskDropdown,
  onCreateIntakeSummary,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const [createTaskTableState, setCreateTaskTableState] = useState<TTaskTableState[]>([]);

  const baysList = ['1', '2', '3', '4', '5', '6', '7', '8'];
  /* ================================================== */
  /*  method */
  /* ================================================== */

  const goBackToIntakes = () => {
    createIntakeJobsForm.resetFields();
    setCurrentPage('main');
    gsap.to('.task__table-div', {
      duration: 1,
      ease: 'ease',
      x: '0',
    });
  };

  const handleAdd = () => {
    if (createTaskTableState === null) return;
    const newData: any = {
      key: count,
      [`taskType${count}`]: '',
      [`taskTitle${count}`]: '',
      [`taskTitleString${count}`]: '',
      [`taskDescription${count}`]: '',
    };
    let tempArray = [...createTaskTableState];
    tempArray.push(newData);
    setCreateTaskTableState(tempArray);
    setCount(count + 1);
  };

  const onCreateIntakeAndJobsFinish = (values: {
    [key: string]: any;
    bay: string;
    pickup: boolean;
    description: string;
    assign: number[];
    intakeStatus: number;
  }) => {
    if (userInfoObj === null || userInfoObj === undefined) return;
    let resultJobs: IJobFormData[] = [];

    (createTaskTableState as any).forEach((task: any, index: number) => {
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
        assigned_to_ids: values.assign === undefined ? [] : values.assign,
      },
      jobs: resultJobs,
      logs: {
        title: `Intake created at ${moment().format('DD/MM/YYYY HH:mm')} by ${userInfoObj.username}`,
        description: 'TEST',
        user_id: userInfoObj.id,
      },
    };

    onCreateIntakeSummary(intakeJobsFormData);
  };

  const tagRender = (props: any) => {
    if (usersByRolesArray === null || usersByRolesArray === undefined) return <></>;

    let userResultArray = usersByRolesArray.filter((user) => props.value === user.id);
    //
    return (
      <div className="flex-align-center">
        {userResultArray.map((user) => {
          // let randomColor = Math.floor(Math.random() * 16777215).toString(16);
          let firstChar = user.username.charAt(0);
          let secondChar = user.username.charAt(1);
          return (
            <Tooltip title={`${user.first_name} ${user.last_name ? user.last_name : ''}`} key={uuidv4()}>
              <div className="task__form-user-div" key={uuidv4()}>
                <div>
                  <span className="task__form-user-text">{firstChar}</span>
                  <span className="task__form-user-text">{secondChar}</span>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    );
  };

  // const handleDelete = (intake_id: number, taskId: number) => {
  //   onDeleteTask(intake_id, taskId);
  // };

  /* ================================================== */
  /*  components */
  /* ================================================== */
  /* ===================================== */
  /* task table column initialization */
  /* ===================================== */
  let taskColumnsSettings = [
    {
      key: 'taskType',
      title: 'Service Type',
      className: 'createspecificintake__table-header',
      dataIndex: 'taskType',
      width: '15rem',
      ellipsis: true,
      editable: true,
      // sorter: (a: TTaskTableState, b: TTaskTableState) => a.taskType.localeCompare(b.taskType),

      render: (_text: any, record: TTaskTableState) => {
        if (serviceTypesArray === null || serviceTypesArray === undefined) return;

        return (
          <>
            <>
              <Form.Item
                // label="Service Type"
                name={`taskType${record.key}`}
                className="createspecificintake__form-item--task"
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: `Please choose a service type!`,
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Job Type"
                  optionFilterProp="children"
                  className="createspecificintake__select createspecificintake__select--task"
                  filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="">Select a Job Type</Option>
                  {serviceTypeTaskDict &&
                    Object.keys(serviceTypeTaskDict).map((serviceTypeId) => {
                      let serviceTypeObj = serviceTypeTaskDict[parseInt(serviceTypeId)];
                      return (
                        <Option
                          style={{ textTransform: 'capitalize' }}
                          key={parseInt(serviceTypeId)}
                          value={parseInt(serviceTypeId)}
                        >
                          {`${serviceTypeObj.title}${
                            serviceTypeObj.description !== '' && serviceTypeObj.description !== null
                              ? ` - ${serviceTypeObj.description}`
                              : ''
                          }`}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </>
          </>
        );
      },
    },
    {
      key: 'taskTitle',
      title: 'Service Task',
      className: 'createspecificintake__table-header',
      dataIndex: 'taskTitle',
      width: 'auto',
      ellipsis: true,
      editable: true,
      render: (_text: any, record: TTaskTableState) => {
        if (Object.keys(serviceTaskDropdown).includes(record.key.toString())) {
          let dropdownArrayExist = Object.keys(serviceTaskDropdown[record.key]).length > 0;
          let dropdownArray = serviceTaskDropdown[record.key].serviceTaskDropdownArray;
          return (
            <Form.Item
              // label="Service Type"
              name={`taskTitle${record.key}`}
              className="createspecificintake__form-item--task"
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `Please choose a service task!`,
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a Task title"
                optionFilterProp="children"
                className="createspecificintake__select createspecificintake__select--task"
                filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="">Select a Task</Option>
                {dropdownArrayExist &&
                  dropdownArray !== null &&
                  dropdownArray.map((task) => {
                    return (
                      <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={parseInt(task.id)}>
                        {`${task.title}${
                          task.description !== '' && task.description !== null ? ` - ${task.description}` : ''
                        }`}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          );
        } else {
          return (
            <Form.Item
              // label="Service Type"
              name={`taskTitle${record.key}`}
              className="createspecificintake__form-item--task"
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `Please choose a service type!`,
                },
              ]}
            >
              <Select
                disabled={true}
                showSearch
                placeholder="Select a Task title"
                optionFilterProp="children"
                className="createspecificintake__select createspecificintake__select--task createspecificintake__select--disabled"
                filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="">Select a Task</Option>
              </Select>
            </Form.Item>
          );
        }
      },
    },
    {
      key: 'taskDescription',
      title: 'Description',
      className: 'createspecificintake__table-header',
      dataIndex: 'taskDescription',
      width: 'auto',
      ellipsis: true,
      editable: true,
      // sorter: (a: TTaskTableState, b: TTaskTableState) => a.taskDescription.localeCompare(b.taskDescription),
      render: (_text: any, record: TTaskTableState) => {
        return (
          <Form.Item
            // label="Description"
            className="createspecificintake__form-item--task"
            name={`taskDescription${record.key}`}
            style={{ margin: 0 }}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input className="createspecificintake__form-input" placeholder="Type description here" />
          </Form.Item>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      width: '8rem',
      render: (_: any, record: TTaskTableState) => {
        // const editable = isEditing(record);
        return (
          <>
            {createTaskTableState && createTaskTableState.length >= 1 ? (
              <>
                {/* {(record as any)[`taskId${record.key}`] === undefined ? ( */}
                {/* // this is for normal delete */}
                <Button
                  type="link"
                  danger
                  title="Delete"
                  onClick={() => {
                    if (createTaskTableState === null) return;
                    const dataSource = [...createTaskTableState];
                    // setCount(count - 1);
                    setCreateTaskTableState(dataSource.filter((item) => item.key !== record.key));
                  }}
                >
                  <i className="far fa-trash-alt"></i>
                </Button>
                {/* ) : (
                  // this is for api delete
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => {
                      if (specificIntakeJobsObj === null || specificIntakeJobsObj === undefined) return;
                      handleDelete(specificIntakeJobsObj.id, parseInt((record as any)[`taskId${record.key}`]));
                    }}
                  >
                    <Button type="link" danger title="Delete">
                      <i className="far fa-trash-alt"></i>
                    </Button>
                  </Popconfirm>
                )} */}
              </>
            ) : null}
          </>
        );
      },
    },
  ];

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  useEffect(() => {
    onGetServiceTypes();
  }, [onGetServiceTypes]);

  /* ================================================== */
  /* ================================================== */

  return (
    <>
      <Form
        className="createspecificintake__form"
        form={createIntakeJobsForm}
        onFieldsChange={(e) => {
          if (createTaskTableState === null) return;
          let tempTaskTableState = [...createTaskTableState];

          let labelName = e[0].name.toString();
          let currentValue = e[0].value;
          let rowIndex = -1;
          // basically getting the row index
          if (
            labelName.includes('taskType') ||
            labelName.includes('taskTitle') ||
            labelName.includes('taskDescription')
          ) {
            // get the number string (row index) after the last string index
            rowIndex = parseInt(labelName.substring(labelName.length - 1));
          }

          let formItemsObject = (tempTaskTableState as any)[rowIndex];

          let result = { ...formItemsObject, [labelName]: currentValue };
          (tempTaskTableState as any)[rowIndex] = result;
          // normally update the state
          setCreateTaskTableState(tempTaskTableState);

          if (labelName.includes('taskType') && currentValue !== '') {
            if (serviceTypeTaskDict) {
              setServiceTaskDropdown({
                ...serviceTaskDropdown,
                [rowIndex]: {
                  serviceTask: '',
                  serviceTaskDropdownArray: serviceTypeTaskDict[currentValue].serviceTasksArray,
                },
              });
            }
            createIntakeJobsForm.setFieldsValue({ [`taskTitle${rowIndex}`]: '' });
          }

          if (labelName.includes('taskTitle')) {
            setServiceTaskDropdown({
              ...serviceTaskDropdown,
              [rowIndex]: { ...serviceTaskDropdown[rowIndex], serviceTask: currentValue },
            });
          }
        }}
        onFinish={(values) => {
          onCreateIntakeAndJobsFinish(values);
        }}
      >
        <div className="createspecificintake__outerdiv">
          <div className="createspecificintake__nav-outerdiv">
            <div className="flex-align-center">
              <div
                className="updatespecificintake__back"
                onClick={() => {
                  goBackToIntakes();
                }}
              >
                <i className="fas fa-arrow-circle-left" /> <div className="updatespecificintake__back-text">Back</div>
              </div>
            </div>

            <div className="createspecificintake__back-outerdiv">
              <div className="flex-align-center"></div>
            </div>
          </div>
          <section className="createspecificintake__section-top">
            {/* REGISTRATION */}
            <div className="createspecificintake__row--registration">
              <div className="createspecificintake__div-registration">
                <div style={{ width: '100%' }}>
                  <Form.Item
                    className="createspecificintake__form-item--registration"
                    name="registrationNumber"
                    rules={[{ required: true, message: 'Input Registration Number here!' }]}
                  >
                    <Input placeholder="e.g. DCG1199" className="createspecificintake__form-item--registration-input" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    name="bay"
                    className="createspecificintake__form-item--bay"
                    initialValue={''}
                    rules={[{ required: false, message: 'Select a bay!' }]}
                  >
                    <Select className="createspecificintake__select--bay">
                      <Option value="">Select a bay</Option>
                      {baysList.map((child) => (
                        <Option value={child} key={uuidv4()}>
                          Bay {child}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>

            {/* DIV WRAPPING ALL 3 FORMITEMS */}
            <div className="createspecificintake__box-outerdiv">
              {/* ==================================================== */}
              {/* Intake Status */}
              {/* ==================================================== */}
              <div className="createspecificintake__box createspecificintake__box--status">
                <Tooltip title="Intake Status">
                  <div className="createspecificintake__box-left">
                    <i className="fas fa-tasks createspecificintake__box-icon"></i>
                  </div>
                </Tooltip>
                <div className="createspecificintake__box-right">
                  <Form.Item
                    name="intakeStatus"
                    style={{ margin: 0 }}
                    className="createspecificintake__form-item--intake"
                    initialValue={intakeStatusArray?.filter((child) => child.title === 'Docked')[0].id}
                    rules={[
                      {
                        required: true,
                        message: `Please choose a status!`,
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select an intake status"
                      optionFilterProp="children"
                      // defaultValue={intakeStatusArray?.filter((child) => child.title === 'Docked')[0].id}
                      className="createspecificintake__select"
                      filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option value="">Select a status</Option>
                      {intakeStatusArray &&
                        intakeStatusArray.map((intakeStatus) => {
                          return (
                            <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={intakeStatus.id}>
                              {`${intakeStatus.title}${
                                intakeStatus.description !== '' && intakeStatus.description !== null
                                  ? ` - ${intakeStatus.description}`
                                  : ''
                              }`}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* ==================================================== */}
              {/* Intake Users */}
              {/* ==================================================== */}
              <div className="createspecificintake__box createspecificintake__box--users">
                <Tooltip title="Task Assignees">
                  <div className="createspecificintake__box-left">
                    <i className="fas fa-users createspecificintake__box-icon"></i>
                  </div>
                </Tooltip>
                <div className="createspecificintake__box-right createspecificintake__box-right--users">
                  <Form.Item name="assign" className="createspecificintake__form-item--users" style={{ margin: 0 }}>
                    <Select
                      mode="multiple"
                      placeholder="Please select mechanics"
                      optionFilterProp="children"
                      className="createspecificintake__select"
                      tagRender={(props) => tagRender(props)}
                      filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {usersByRolesArray &&
                        usersByRolesArray.map((user) => {
                          return (
                            <Option
                              style={{ textTransform: 'capitalize' }}
                              key={uuidv4()}
                              value={parseInt(user.id.toString())}
                            >
                              {`${user.first_name} ${user.last_name ? user.last_name : ''} - ${user.roles.title}`}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>

            <section className="createspecificintake__section-description">
              <div className="createspecificintake__section-description-outerdiv">
                <span className="createspecificintake__section-description-text">Description:</span>
                <Form.Item
                  // label="Description"
                  name={`description`}
                  className="createspecificintake__form-item--task"
                  style={{ margin: 0, width: '100%' }}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input
                    className="createspecificintake__form-input createspecificintake__form-input--intakedesc"
                    placeholder="Type description here"
                  />
                </Form.Item>
              </div>
            </section>
          </section>
          <section className="createspecificintake__section-bottom">
            <div>
              <div className="createspecificintake__section-bottom-title-div">
                <div className="createspecificintake__section-bottom-title">List of Services</div>

                <div className="createspecificintake__add-div">
                  <span className="createspecificintake__add-button" onClick={() => handleAdd()}>
                    <i className="fas fa-plus-square"></i>&nbsp;&nbsp;Add service
                  </span>
                </div>
              </div>
              <Table
                bordered
                // components={{
                //   body: {
                //     cell: EditableCell,
                //   },
                // }}
                className="createspecificintake__table"
                scroll={{ y: 300 }}
                dataSource={createTaskTableState}
                columns={taskColumnsSettings} //remove actions when its in edit mode
                // columns={mergedColumns}
                // rowClassName="editable-row"
                // columns={convertHeader(taskColumns, setTaskColumns)}
                pagination={false}
              />
            </div>
            <div className="updatespecificintake__button-div-bottom">
              <Button
                loading={loading !== undefined && loading}
                className="updatespecificintake__button-task updatespecificintake__button-task--save"
                onClick={() => {
                  createIntakeJobsForm.submit();
                }}
              >
                Create
              </Button>
            </div>
          </section>
        </div>
      </Form>
    </>
  );
};

interface StateProps {
  loading?: boolean;
  userInfoObj?: TReceivedUserInfoObj | null;
  intakeStatusArray?: TReceivedIntakeStatusObj[] | null;
  usersByRolesArray?: TReceivedUserInfoObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.task.loading,
    userInfoObj: state.auth.userInfoObj,
    intakeStatusArray: state.dashboard.intakeStatusArray,
    usersByRolesArray: state.task.usersByRolesArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
  };
};

interface DispatchProps {
  // onDeleteTask: typeof actions.deleteTask;
  onGetServiceTypes: typeof actions.getServiceTypes;
  onCreateIntakeSummary: typeof actions.createIntakeSummary;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetServiceTypes: () => dispatch(actions.getServiceTypes()),
    onCreateIntakeSummary: (intakeJobsFormData) => dispatch(actions.createIntakeSummary(intakeJobsFormData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpecificIntake);

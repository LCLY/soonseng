import React, { useEffect } from 'react';
import 'src/containers/TaskPage/TaskPage.scss';
/* components */
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { FormInstance } from 'antd/lib/form';
import { Button, Checkbox, Form, Input, Popconfirm, Select, Table, Tooltip } from 'antd';
/* utils */
import { RootState } from 'src';
import { handleKeyDown } from 'src/shared/Utils';
import * as actions from 'src/store/actions/index';
import { TReceivedUserInfoObj } from 'src/store/types/auth';
import { IServiceTaskDropdown, TTaskTableState } from 'src/containers/TaskPage/TaskPage';
import {
  /* IAssignedUsersObj, */ IReceivedIntakeJobsObj,
  TReceivedSpecificIntakeJobsObj,
  TServiceTypeTaskDict,
} from 'src/store/types/task';
import { TReceivedIntakeStatusObj, TReceivedServiceTaskObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';

const { TextArea } = Input;
const { Option } = Select;

/* Util */
interface TaskFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  intake_id?: number | null;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
  taskTableState: TTaskTableState[] | null;
  count: number;
  // intakeDictObj: IIntakeDict | null;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setTaskTableState: React.Dispatch<React.SetStateAction<TTaskTableState[] | null>>;
  serviceTypeTaskDict: TServiceTypeTaskDict | null;
  setServiceTypeTaskDict: React.Dispatch<React.SetStateAction<TServiceTypeTaskDict | null>>;
  serviceTaskDropdown: IServiceTaskDropdown;
  setServiceTaskDropdown: React.Dispatch<React.SetStateAction<IServiceTaskDropdown>>;
  incomingSpecificIntakeData: TReceivedSpecificIntakeJobsObj | null;
  setIncomingSpecificIntakeData: React.Dispatch<React.SetStateAction<TReceivedSpecificIntakeJobsObj | null>>;
}

type Props = TaskFormItemsProps & StateProps & DispatchProps;

// interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
//   editing: boolean;
//   dataIndex: string;
//   title: string;
//   // inputType: 'textarea' | 'select';
//   record: TTaskTableState;
//   index: number;
//   children: React.ReactNode;
// }

const TaskFormItems: React.FC<Props> = ({
  crud,
  count,
  antdForm,
  setCount,
  onFinish,
  intake_id,
  // intakeDictObj,
  onDeleteTask,
  taskTableState,
  setTaskTableState,
  // onGetServiceTasks,
  intakeStatusArray,
  // serviceTasksArray,
  // serviceTypesArray,
  usersByRolesArray,
  serviceTaskDropdown,
  serviceTypeTaskDict,
  specificIntakeJobsObj,
  setServiceTaskDropdown,
  incomingSpecificIntakeData,
  setIncomingSpecificIntakeData,
}) => {
  /* ================================================================== */
  // State
  /* ================================================================== */

  // const isEditing = (record: TTaskTableState) => record.key === editingKey;

  const tagRender = (props: any) => {
    if (usersByRolesArray === null || usersByRolesArray === undefined) return <></>;

    let userResultArray = usersByRolesArray.filter((user) => props.value === user.id);
    //
    return (
      <div className="flex-align-center">
        {userResultArray.map((user) => {
          // let randomColor = Math.floor(Math.random() * 16777215).toString(16);
          let firstNameChar = user.first_name.length > 0 ? user.first_name.charAt(0) : '';
          let lastNameChar = user.last_name.length > 0 ? user.last_name.charAt(0) : '';
          return (
            <Tooltip title={`${user.first_name} ${user.last_name}`} key={uuidv4()}>
              <div className="task__form-user-div" key={uuidv4()}>
                <div>
                  <span className="task__form-user-text">{firstNameChar}</span>
                  <span className="task__form-user-text">{lastNameChar}</span>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    );
  };

  /* ===================================== */
  /* task table column initialization */
  /* ===================================== */
  const taskColumns = [
    {
      key: 'taskType',
      title: 'Service Type',
      className: 'body__table-header--title',
      dataIndex: 'taskType',
      width: '18rem',
      ellipsis: true,
      editable: true,
      // sorter: (a: TTaskTableState, b: TTaskTableState) => a.taskType.localeCompare(b.taskType),

      render: (_text: any, record: TTaskTableState) => {
        return (
          <>
            <Form.Item
              // label="Service Type"
              name={`taskType${record.key}`}
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
                filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={(value: number) => {
                  if (serviceTypeTaskDict && typeof value === 'number') {
                    setServiceTaskDropdown({
                      ...serviceTaskDropdown,
                      [record.key]: {
                        serviceTask: '',
                        serviceTaskDropdownArray: serviceTypeTaskDict[value].serviceTasksArray,
                      },
                    });
                  }
                  antdForm.setFieldsValue({ [`taskTitle${record.key}`]: '' });
                }}
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

            {/* set hidden task id */}
            {crud === 'update' && (
              <Form.Item hidden required name={`taskId${record.key}`}>
                <Input />
              </Form.Item>
            )}
          </>
        );
      },
    },
    {
      key: 'taskTitle',
      title: 'Service Task',
      className: 'body__table-header--title',
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
                placeholder="Select a Task title"
                optionFilterProp="children"
                filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={(e) =>
                  setServiceTaskDropdown({
                    ...serviceTaskDropdown,
                    [record.key]: { ...serviceTaskDropdown[record.key], serviceTask: e.toString() },
                  })
                }
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
      className: 'body__table-header--title',
      dataIndex: 'taskDescription',
      width: 'auto',
      ellipsis: true,
      editable: true,
      // sorter: (a: TTaskTableState, b: TTaskTableState) => a.taskDescription.localeCompare(b.taskDescription),
      render: (_text: any, record: TTaskTableState) => {
        return (
          <Form.Item
            // label="Description"
            name={`taskDescription${record.key}`}
            style={{ margin: 0 }}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Type description here" />
          </Form.Item>
        );
      },
    },
    // {
    //   key: 'assign',
    //   title: 'Assigned',
    //   className: 'body__table-header--title',
    //   dataIndex: 'assign',
    //   width: 'auto',
    //   ellipsis: true,
    //   editable: true,
    //   // sorter: (a: TTaskTableState, b: TTaskTableState) => a.assign.localeCompare(b.assign),
    //   render: (_text: any, record: TTaskTableState) => {
    //     return (
    //       <Form.Item
    //         // label="Service Type"
    //         name={`assign${record.key}`}
    //         style={{ margin: 0 }}
    //         rules={[
    //           {
    //             required: true,
    //             message: `Please choose a service type!`,
    //           },
    //         ]}
    //       >
    //         <Select
    //           mode="multiple"
    //           placeholder="Please select mechanics"
    //           optionFilterProp="children"
    //           tagRender={(props) => tagRender(props, record)}
    //           filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    //         >
    //           {usersByRolesArray &&
    //             usersByRolesArray.map((user) => {
    //               return (
    //                 <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={parseInt(user.id.toString())}>
    //                   {`${user.first_name} ${user.last_name} - ${user.roles.title}`}
    //                 </Option>
    //               );
    //             })}
    //         </Select>
    //       </Form.Item>
    //     );
    //   },
    // },
    // {
    //   key: 'taskStatus',
    //   title: 'Status',
    //   className: 'body__table-header--title',
    //   dataIndex: 'taskStatus',
    //   width: 'auto',
    //   ellipsis: true,
    //   editable: true,
    //   // sorter: (a: TTaskTableState, b: TTaskTableState) => a.taskStatus.localeCompare(b.taskStatus),
    //   render: (_text: any, record: TTaskTableState) => {
    //     return (
    //       <Form.Item
    //         // label="Status"
    //         name={`taskStatus${record.key}`}
    //         style={{ margin: 0 }}
    //         rules={[
    //           {
    //             required: true,
    //             message: `Please choose a status!`,
    //           },
    //         ]}
    //       >
    //         <Select
    //           showSearch
    //           placeholder="Select a job status"
    //           optionFilterProp="children"
    //           filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    //         >
    //           <Option value="">Select a status</Option>
    //           {intakeStatusArray &&
    //             intakeStatusArray.map((intakeStatus) => {
    //               return (
    //                 <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={intakeStatus.id}>
    //                   {`${intakeStatus.title}${
    //                     intakeStatus.description !== '' && intakeStatus.description !== null
    //                       ? ` - ${intakeStatus.description}`
    //                       : ''
    //                   }`}
    //                 </Option>
    //               );
    //             })}
    //         </Select>
    //       </Form.Item>
    //     );
    //   },
    // },
    {
      title: 'Actions',
      dataIndex: 'operation',
      width: '8rem',
      render: (_: any, record: TTaskTableState) => {
        // const editable = isEditing(record);
        return (
          <>
            {taskTableState && taskTableState.length >= 1 ? (
              <>
                {(record as any)[`taskId${record.key}`] === undefined ? (
                  // this is for normal delete
                  <Button
                    type="link"
                    danger
                    title="Delete"
                    onClick={() => {
                      if (taskTableState === null) return;
                      const dataSource = [...taskTableState];
                      setTaskTableState(dataSource.filter((item) => item.key !== record.key.toString()));
                    }}
                  >
                    <i className="far fa-trash-alt"></i>
                  </Button>
                ) : (
                  // this is for api delete
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => {
                      if (intake_id === null || intake_id === undefined) return;
                      handleDelete(intake_id, parseInt((record as any)[`taskId${record.key}`]));
                    }}
                  >
                    <Button type="link" danger title="Delete">
                      <i className="far fa-trash-alt"></i>
                    </Button>
                  </Popconfirm>
                )}
              </>
            ) : null}
          </>
        );
      },
    },
  ];

  /* ========================================================== */
  // Methods
  /* ========================================================== */

  const handleDelete = (intake_id: number, taskId: number) => {
    onDeleteTask(intake_id, taskId);
  };

  const handleAdd = () => {
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
    setTaskTableState(tempArray);
    setCount(count + 1);
  };

  /* ========================================================== */
  // Components
  /* ========================================================== */

  /* ========================================================= */
  // useEffect
  /* ========================================================= */
  // useEffect(() => {
  //   if (serviceTasksArray && editingKey !== '') {
  //     setServiceTaskDropdown((prevState) => {
  //       return {
  //         ...prevState,
  //         [editingKey]: { ...prevState[editingKey], serviceTaskDropdownArray: serviceTasksArray },
  //       };
  //     });
  //   }
  // }, [editingKey, serviceTasksArray, setServiceTaskDropdown]);

  console.log(taskTableState);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for Tasks
  /* ----------------------------------------------------- */
  useEffect(() => {
    if (crud === 'create') {
      console.log('create');
      // when create no need to prefill the table, jz straight add a new empty row
      let tempArray: any[] = [];
      /** A function that stores desired keys and values into a tempArray */
      tempArray.push({
        key: 0,
        [`assign${0}`]: [],
        [`taskType${0}`]: '',
        [`taskTitle${0}`]: '',
        [`taskStatus${0}`]: '',
        [`taskDescription${0}`]: '',
      });
      setCount(1);
      // update the state with tempArray
      setTaskTableState(tempArray);
    }
  }, [crud, setCount, setTaskTableState]);

  useEffect(() => {
    if (crud === 'update' && intakeStatusArray && intakeStatusArray !== undefined) {
      let tempArray: any[] = [];
      let tempDict: any = {};
      /** A function that stores desired keys and values into a tempArray */
      const storeValue = (task: IReceivedIntakeJobsObj, index: number) => {
        let newAssignArray: number[] = [];
        task.assigned_to.forEach((user) => newAssignArray.push(user.user_id));
        // using string to extract the id
        let filteredStatus = intakeStatusArray.filter((status) => status.title === task.status);

        tempArray.push({
          key: index,
          [`taskId${index}`]: task.id,
          [`assign${index}`]: newAssignArray,
          [`taskTitle${index}`]: task.service_task.id,
          [`taskTitleString${index}`]: task.service_task.title,
          [`taskStatus${index}`]: filteredStatus[0].id,
          [`taskDescription${index}`]: task.description,
          [`taskType${index}`]: task.service_task.service_type.id,
        });

        // prefill the service type task dict to keep track of the service task dropdowns
        if (
          serviceTypeTaskDict &&
          Object.keys(serviceTypeTaskDict).length > 0 &&
          Object.keys(serviceTypeTaskDict).includes(task.service_task.service_type.id.toString()) &&
          'serviceTasksArray' in serviceTypeTaskDict[task.service_task.service_type.id]
        ) {
          tempDict[index] = {};
          tempDict[index]['serviceTaskDropdownArray'] =
            serviceTypeTaskDict[task.service_task.service_type.id].serviceTasksArray;
          // setServiceTaskDropdown((prevState) => {
          //   return {
          //     ...prevState,
          //     [index]: {
          //       ...prevState[index],
          //       serviceTaskDropdownArray: serviceTypeTaskDict[task.service_task.service_type.id].serviceTasksArray,
          //     },
          //   };
          // });
        }
      };

      if (specificIntakeJobsObj) {
        // Execute function "storeValue" for every array index
        specificIntakeJobsObj.jobs.map(storeValue);
        setCount(specificIntakeJobsObj.jobs.length);
      }

      // update the state with tempArray
      setTaskTableState(tempArray);
      setServiceTaskDropdown(tempDict);
    }
  }, [
    crud,
    intakeStatusArray,
    antdForm,
    setCount,
    setTaskTableState,
    serviceTypeTaskDict,
    specificIntakeJobsObj,
    setServiceTaskDropdown,
  ]);

  useEffect(() => {
    if (incomingSpecificIntakeData === null) return;
    if (crud === 'update' && intakeStatusArray && intakeStatusArray !== undefined) {
      let tempArray: any[] = [];
      let tempDict: any = {};
      /** A function that stores desired keys and values into a tempArray */
      const storeValue = (task: IReceivedIntakeJobsObj, index: number) => {
        let newAssignArray: number[] = [];
        task.assigned_to.forEach((user) => newAssignArray.push(user.user_id));
        // using string to extract the id
        let filteredStatus = intakeStatusArray.filter((status) => status.title === task.status);

        tempArray.push({
          key: index,
          [`taskId${index}`]: task.id,
          [`assign${index}`]: newAssignArray,
          [`taskTitle${index}`]: task.service_task.id,
          [`taskTitleString${index}`]: task.service_task.title,
          [`taskStatus${index}`]: filteredStatus[0].id,
          [`taskDescription${index}`]: task.description,
          [`taskType${index}`]: task.service_task.service_type.id,
        });

        // prefill the service type task dict to keep track of the service task dropdowns
        if (
          serviceTypeTaskDict &&
          Object.keys(serviceTypeTaskDict).length > 0 &&
          Object.keys(serviceTypeTaskDict).includes(task.service_task.service_type.id.toString()) &&
          'serviceTasksArray' in serviceTypeTaskDict[task.service_task.service_type.id]
        ) {
          tempDict[index] = {};
          tempDict[index]['serviceTaskDropdownArray'] =
            serviceTypeTaskDict[task.service_task.service_type.id].serviceTasksArray;
          // setServiceTaskDropdown((prevState) => {
          //   return {
          //     ...prevState,
          //     [index]: {
          //       ...prevState[index],
          //       serviceTaskDropdownArray: serviceTypeTaskDict[task.service_task.service_type.id].serviceTasksArray,
          //     },
          //   };
          // });
        }
      };
      incomingSpecificIntakeData.jobs.map(storeValue);
      setCount(incomingSpecificIntakeData.jobs.length);
      setIncomingSpecificIntakeData(null);
      // update the state with tempArray
      setTaskTableState(tempArray);
      setServiceTaskDropdown(tempDict);
    }
  }, [
    crud,
    intakeStatusArray,
    antdForm,
    setCount,
    setTaskTableState,
    serviceTypeTaskDict,
    setServiceTaskDropdown,
    incomingSpecificIntakeData,
    setIncomingSpecificIntakeData,
  ]);

  useEffect(() => {
    if (crud !== 'update' || taskTableState === null || taskTableState.length < 1) return;
    taskTableState.forEach((row: any) => {
      antdForm.setFieldsValue({
        [`assign${row.key}`]: row[`assign${row.key}`],
        [`taskType${row.key}`]: row[`taskType${row.key}`],
        [`taskTitle${row.key}`]: row[`taskTitle${row.key}`],
        [`taskStatus${row.key}`]: row[`taskStatus${row.key}`],
        [`taskDescription${row.key}`]: row[`taskDescription${row.key}`],
      });
    });
  }, [antdForm, crud, taskTableState]);

  return (
    <>
      <Form
        form={antdForm}
        // onValuesChange={(value) => {
        //   // check if brand id is chosen
        //   if (typeof value.taskType === 'number') {
        //     // call get series array
        //     onGetServiceTasks(value.taskType);
        //   }
        // }}
        onKeyDown={(e) => {
          if (antdForm !== undefined) handleKeyDown(e, antdForm);
        }}
        onFinish={(values) => {
          if (onFinish !== undefined) onFinish(values);
        }}
      >
        {(crud === 'update' && specificIntakeJobsObj && serviceTypeTaskDict) ||
        (crud === 'create' && serviceTypeTaskDict) ? (
          <>
            <div className="flex-align-center">
              {/* The rest of the form items */}
              <Form.Item
                className="make__form-item task__form-input-left"
                label="Registration No."
                name="registrationNumber"
                rules={[{ required: true, message: 'Input Registration Number here!' }]}
              >
                <Input placeholder="Type Registration No. here, e.g. DCG1199" />
              </Form.Item>
              <Form.Item
                label=""
                name="pickup"
                valuePropName="checked"
                className="make__form-item task__form-input--checkbox"
              >
                <Checkbox>Ready for Pick Up</Checkbox>
              </Form.Item>
            </div>

            {/* Bay */}
            <Form.Item
              className="make__form-item task__form-input-left"
              label="Bay"
              name="bay"
              rules={[{ required: false }]}
            >
              <Input placeholder="Type Bay here" />
            </Form.Item>

            {/* Description */}
            <Form.Item
              label="Description"
              name="description"
              className="make__form-item task__form-input-left"
              rules={[{ required: false }]}
            >
              <TextArea placeholder="Type Description here" />
            </Form.Item>

            {/* ================================================== */}
            {/* intake Status */}
            {/* ================================================== */}
            <Form.Item
              label="Intake Status"
              name="intakeStatus"
              className="make__form-item task__form-input-left"
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `Please choose a intake status!`,
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select an intake status"
                optionFilterProp="children"
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

            {/* ========================================= */}
            {/* Assigned to Ids */}
            {/* ========================================= */}
            <Form.Item
              label="Assignees"
              name="assign"
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `Please choose a user!`,
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Please select mechanics"
                optionFilterProp="children"
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
                        {`${user.first_name} ${user.last_name} - ${user.roles.title}`}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>

            {/* Add this part for update modal form only */}
            {crud === 'update' && (
              <>
                <Form.Item hidden name="intakeId" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </>
            )}

            {taskTableState && (
              <Table
                bordered
                // components={{
                //   body: {
                //     cell: EditableCell,
                //   },
                // }}
                // className="make__table"
                scroll={{ x: '89rem', y: 'auto' }}
                dataSource={taskTableState}
                columns={taskColumns}
                // columns={mergedColumns}
                // rowClassName="editable-row"
                // columns={convertHeader(taskColumns, setTaskColumns)}
                pagination={false}
              />
            )}
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button onClick={() => handleAdd()} type="primary" style={{ marginBottom: 16 }}>
                Add a row
              </Button>
            </div>
          </>
        ) : (
          <div className="task__loading-outerdiv">
            <div className="task__loading">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </Form>
    </>
  );
};

interface StateProps {
  serviceTasksArray?: TReceivedServiceTaskObj[] | null;
  intakeStatusArray?: TReceivedIntakeStatusObj[] | null;
  usersByRolesArray?: TReceivedUserInfoObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
  specificIntakeJobsObj?: TReceivedSpecificIntakeJobsObj | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    intakeStatusArray: state.dashboard.intakeStatusArray,
    usersByRolesArray: state.task.usersByRolesArray,
    serviceTasksArray: state.dashboard.serviceTasksArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
    specificIntakeJobsObj: state.task.specificIntakeJobsObj,
  };
};

interface DispatchProps {
  onDeleteTask: typeof actions.deleteTask;
  onGetServiceTasks: typeof actions.getServiceTasks;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onDeleteTask: (intake_id, task_id) => dispatch(actions.deleteTask(intake_id, task_id)),
    onGetServiceTasks: (service_type_id) => dispatch(actions.getServiceTasks(service_type_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskFormItems);

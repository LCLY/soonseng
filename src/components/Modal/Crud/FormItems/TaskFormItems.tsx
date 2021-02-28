import React, { useEffect } from 'react';
import 'src/containers/TaskPage/TaskPage.scss';
/* components */
/* 3rd party lib */
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { FormInstance } from 'antd/lib/form';
import { Button, Checkbox, Form, Input, Popconfirm, Select, Table, Tooltip, Typography } from 'antd';
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
import { TReceivedJobStatusObj, TReceivedServiceTaskObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';

const { TextArea } = Input;
const { Option } = Select;

/* Util */
interface TaskFormItemsProps {
  crud: 'create' | 'update' | 'delete';
  /** The form instance from antd  */
  antdForm: FormInstance<any>;
  intake_id?: number;
  /** onFinish method when user click ok*/
  onFinish: (values: any) => void;
  taskTableState: TTaskTableState[] | null;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setTaskTableState: React.Dispatch<React.SetStateAction<TTaskTableState[] | null>>;
  serviceTypeTaskDict: TServiceTypeTaskDict | null;
  setServiceTypeTaskDict: React.Dispatch<React.SetStateAction<TServiceTypeTaskDict | null>>;
  serviceTaskDropdown: IServiceTaskDropdown;
  setServiceTaskDropdown: React.Dispatch<React.SetStateAction<IServiceTaskDropdown>>;
  editingKey: string;
  setEditingKey: React.Dispatch<React.SetStateAction<string>>;
}

type Props = TaskFormItemsProps & StateProps & DispatchProps;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  // inputType: 'textarea' | 'select';
  record: TTaskTableState;
  index: number;
  children: React.ReactNode;
}

const TaskFormItems: React.FC<Props> = ({
  crud,
  count,
  editingKey,
  setEditingKey,
  antdForm,
  setCount,
  onFinish,
  taskTableState,
  setTaskTableState,
  // onGetServiceTasks,
  jobStatusArray,
  serviceTasksArray,
  serviceTypesArray,
  usersByRolesArray,
  serviceTaskDropdown,
  serviceTypeTaskDict,
  specificIntakeJobsObj,
  setServiceTaskDropdown,
}) => {
  /* ================================================================== */
  // State
  /* ================================================================== */

  const isEditing = (record: TTaskTableState) => record.key === editingKey;

  /* ===================================== */
  /* task table column initialization */
  /* ===================================== */
  const taskColumns = [
    {
      key: 'taskType',
      title: 'Service Type',
      className: 'body__table-header--title',
      dataIndex: 'taskType',
      width: 'auto',
      ellipsis: true,
      editable: true,
      // sorter: (a: TTaskTableState, b: TTaskTableState) => a.taskType.localeCompare(b.taskType),
    },
    {
      key: 'taskTitle',
      title: 'Service Task',
      className: 'body__table-header--title',
      dataIndex: 'taskTitle',
      width: 'auto',
      ellipsis: true,
      editable: true,
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
    },
    {
      key: 'assign',
      title: 'Assigned',
      className: 'body__table-header--title',
      dataIndex: 'assign',
      width: 'auto',
      ellipsis: true,
      editable: true,
      // sorter: (a: TTaskTableState, b: TTaskTableState) => a.assign.localeCompare(b.assign),
    },
    {
      key: 'taskStatus',
      title: 'Status',
      className: 'body__table-header--title',
      dataIndex: 'taskStatus',
      width: 'auto',
      ellipsis: true,
      editable: true,
      sorter: (a: TTaskTableState, b: TTaskTableState) => a.taskStatus.localeCompare(b.taskStatus),
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      render: (_: any, record: TTaskTableState) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Typography.Link onClick={() => cancel()} style={{ marginRight: 8 }}>
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <>
            <Button
              className="make__brand-btn--edit"
              type="link"
              disabled={editingKey !== ''}
              title="Edit"
              onClick={() => edit(record)}
            >
              <i className="far fa-edit"></i>
            </Button>

            {taskTableState && taskTableState.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <Button type="link" danger title="Delete">
                  <i className="far fa-trash-alt"></i>
                </Button>
              </Popconfirm>
            ) : null}
          </>
        );
      },
    },
  ];

  /* ========================================================== */
  // Methods
  /* ========================================================== */

  const filterArrayDataIndex = (fullArray: any[], recordId: number) => {
    let filteredArray = fullArray.filter((task) => task.id === recordId);
    if (filteredArray.length > 0) {
      return filteredArray[0].title;
    } else {
      return <>-</>;
    }
  };

  const handleDelete = (key: React.Key) => {
    if (taskTableState === null) return;
    const dataSource = [...taskTableState];
    setTaskTableState(dataSource.filter((item) => item.key !== key));
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

  const edit = (record: Partial<TTaskTableState> & { key: React.Key }) => {
    antdForm.setFieldsValue({
      taskType: record.taskType,
      taskTitle: record.taskTitle,
      taskStatus: record.taskStatus,
      taskDescription: record.taskDescription,
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    if (taskTableState === null) return;
    try {
      const row = (await antdForm.validateFields()) as TTaskTableState;

      const newData = [...taskTableState];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setTaskTableState(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setTaskTableState(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const mergedColumns = taskColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TTaskTableState) => ({
        record,
        // inputType: col.dataIndex === 'description' ? 'textarea' : 'select',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  /* ========================================================== */
  // Components
  /* ========================================================== */

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    // inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let inputNode = null;
    // inputType === 'textarea' ? <TextArea placeholder=""/> : <Input />;
    let displayElement = null;

    switch (dataIndex) {
      /* =================================================================================== */
      // Task Type
      /* =================================================================================== */

      case 'taskType':
        inputNode = (
          <Select
            showSearch
            placeholder="Select a Job Type"
            optionFilterProp="children"
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value: number) => {
              if (serviceTypeTaskDict) {
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
        );

        if (serviceTypesArray !== null && serviceTypesArray !== undefined) {
          displayElement = filterArrayDataIndex(
            serviceTypesArray,
            parseInt((record as any)[`${dataIndex}${record.key}`]),
          );
        } else {
          displayElement = <>-</>;
        }
        break;
      /* =================================================================================== */
      // Task Title
      /* =================================================================================== */
      case 'taskTitle':
        if (editingKey === record.key && Object.keys(serviceTaskDropdown).includes(record.key.toString())) {
          let dropdownArrayExist = Object.keys(serviceTaskDropdown[editingKey]).length > 0;
          let dropdownArray = serviceTaskDropdown[editingKey].serviceTaskDropdownArray;
          inputNode = (
            <Select
              showSearch
              placeholder="Select a Task title"
              optionFilterProp="children"
              filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={(e) =>
                setServiceTaskDropdown({
                  ...serviceTaskDropdown,
                  [editingKey]: { ...serviceTaskDropdown[editingKey], serviceTask: e.toString() },
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
          );
        } else {
          inputNode = (
            <Select
              showSearch
              disabled={true}
              placeholder="Select a service task"
              optionFilterProp="children"
              filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="">Select a Task</Option>
            </Select>
          );
        }

        if (
          Object.keys(serviceTaskDropdown).includes(record.key.toString()) &&
          Object.keys(serviceTaskDropdown[record.key]).includes('serviceTask') &&
          Object.keys(serviceTaskDropdown[record.key]).includes('serviceTaskDropdownArray')
        ) {
          let tempArray = serviceTaskDropdown[record.key].serviceTaskDropdownArray;
          if (tempArray !== null) {
            let filteredArray = tempArray.filter(
              (task) => task.id.toString() === serviceTaskDropdown[record.key].serviceTask.toString(),
            );
            if (filteredArray.length > 0) {
              displayElement = filteredArray[0].title;
              // displayElement = serviceTaskDropdown[record.key].taskTitle;
            }
          }
          // displayElement = filterArrayDataIndex(serviceTasksArray, parseInt(record[dataIndex]));
        } else {
          if (crud === 'create') {
            displayElement = <>-</>;
          } else if (crud === 'update') {
            displayElement = (record as any)[`taskTitleString${record.key}`];
          }
        }
        break;
      /* =================================================================================== */
      // Task Description
      /* =================================================================================== */

      case 'taskDescription':
        inputNode = <Input placeholder="Type description here" />;
        if ((record as any)[`${dataIndex}${record.key}`] !== undefined) {
          displayElement =
            (record as any)[`${dataIndex}${record.key}`] === '' ? '-' : (record as any)[`${dataIndex}${record.key}`];
        } else {
          displayElement = <>-</>;
        }
        break;
      /* =================================================================================== */
      // Task Status
      /* =================================================================================== */
      case 'taskStatus':
        inputNode = (
          <Select
            showSearch
            placeholder="Select a job status"
            optionFilterProp="children"
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="">Select a status</Option>
            {jobStatusArray &&
              jobStatusArray.map((jobStatus) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={jobStatus.id}>
                    {`${jobStatus.title}${
                      jobStatus.description !== '' && jobStatus.description !== null
                        ? ` - ${jobStatus.description}`
                        : ''
                    }`}
                  </Option>
                );
              })}
          </Select>
        );
        if (jobStatusArray !== null && jobStatusArray !== undefined) {
          displayElement = filterArrayDataIndex(jobStatusArray, parseInt((record as any)[`${dataIndex}${record.key}`]));
        } else {
          displayElement = <>-</>;
        }
        break;
      /* =================================================================================== */
      // Task Status
      /* =================================================================================== */
      case 'assign':
        inputNode = (
          <Select
            mode="multiple"
            placeholder="Please select mechanics"
            optionFilterProp="children"
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {usersByRolesArray &&
              usersByRolesArray.map((user) => {
                return (
                  <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={parseInt(user.id.toString())}>
                    {`${user.first_name} ${user.last_name} - ${user.roles.title}`}
                  </Option>
                );
              })}
          </Select>
        );

        //get the username values using the ids
        if (usersByRolesArray !== null && usersByRolesArray !== undefined) {
          let arrayOfUserIds = (record as any)[`${dataIndex}${record.key}`];
          if (arrayOfUserIds !== undefined) {
            let userResultArray = usersByRolesArray.filter((user) => arrayOfUserIds.includes(user.id));

            if (userResultArray.length === 0) {
              displayElement = <>-</>;
            } else {
              displayElement = (
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
            }
          } else {
            displayElement = <>-</>;
          }
        } else {
          displayElement = <>-</>;
        }
        break;
      default:
        displayElement = children;
        break;
    }
    return (
      <td {...restProps}>
        {editing ? (
          <>
            <Form.Item
              name={`${dataIndex}${record.key}`}
              style={{ margin: 0 }}
              rules={[
                {
                  required: title === 'Description' ? false : true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
            {crud === 'update' && dataIndex === 'taskType' && (
              <Form.Item hidden required name={`taskId${record.key}`}>
                <Input />
              </Form.Item>
            )}
          </>
        ) : (
          <>{displayElement}</>
        )}
      </td>
    );
  };

  /* ========================================================= */
  // useEffect
  /* ========================================================= */
  useEffect(() => {
    if (serviceTasksArray && editingKey !== '') {
      setServiceTaskDropdown((prevState) => {
        return {
          ...prevState,
          [editingKey]: { ...prevState[editingKey], serviceTaskDropdownArray: serviceTasksArray },
        };
      });
    }
  }, [editingKey, serviceTasksArray, setServiceTaskDropdown]);

  /* ----------------------------------------------------- */
  // initialize/populate the state of data array for Tasks
  /* ----------------------------------------------------- */
  useEffect(() => {
    if (crud === 'create') {
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
    if (crud === 'update' && jobStatusArray && jobStatusArray !== undefined) {
      let tempArray: any[] = [];
      let tempDict: any = {};
      /** A function that stores desired keys and values into a tempArray */
      const storeValue = (task: IReceivedIntakeJobsObj, index: number) => {
        let newAssignArray: number[] = [];
        task.assigned_to.forEach((user) => newAssignArray.push(user.user_id));
        // using string to extract the id
        let filteredStatus = jobStatusArray.filter((status) => status.title === task.status);

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
    jobStatusArray,
    antdForm,
    setCount,
    setTaskTableState,
    serviceTypeTaskDict,
    setServiceTaskDropdown,
    specificIntakeJobsObj,
  ]);

  useEffect(() => {
    if (crud === 'update') {
      if (taskTableState) {
        // do comething
        // console.log(taskTableState);
        taskTableState.forEach((row) => {
          antdForm.setFieldsValue({
            [`assign${row.key}`]: row.assign,
            [`taskType${row.key}`]: row.taskType,
            [`taskTitle${row.key}`]: row.taskTitle,
            [`taskStatus${row.key}`]: row.taskStatus,
            [`taskDescription${row.key}`]: row.taskDescription,
          });
        });
      }
    }
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
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                // className="make__table"
                scroll={{ x: '89rem', y: 'auto' }}
                dataSource={taskTableState}
                columns={mergedColumns}
                rowClassName="editable-row"
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
  jobStatusArray?: TReceivedJobStatusObj[] | null;
  usersByRolesArray?: TReceivedUserInfoObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
  specificIntakeJobsObj?: TReceivedSpecificIntakeJobsObj | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    jobStatusArray: state.dashboard.jobStatusArray,
    usersByRolesArray: state.task.usersByRolesArray,
    serviceTasksArray: state.dashboard.serviceTasksArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
    specificIntakeJobsObj: state.task.specificIntakeJobsObj,
  };
};

interface DispatchProps {
  onGetServiceTasks: typeof actions.getServiceTasks;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetServiceTasks: (service_type_id) => dispatch(actions.getServiceTasks(service_type_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskFormItems);

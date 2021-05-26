import React, { useState, useEffect, useCallback, useRef, useContext, MutableRefObject } from 'react';
import { RootState } from 'src';
import './UpdateSpecificIntake.scss';
/* components */
import MobileServiceTable from '../MobileServiceTable/MobileServiceTable';
/* 3rd party lib */
import gsap from 'gsap';
import moment from 'moment';
import { Popconfirm, Table, Radio, Tooltip, Form, Button, Input, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
/* Util */
import { Dispatch, AnyAction } from 'redux';
import { IServiceTaskDropdown } from '../TaskPage';
import { ActionCableContext } from 'src/index';
import * as actions from 'src/store/actions/index';
import { TReceivedUserInfoObj } from 'src/store/types/auth';
import { useWindowDimensions } from 'src/shared/HandleWindowResize';
import { TReceivedIntakeStatusObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';
import {
  IIntakeJobsFormData,
  IIntakeLogs,
  IJobFormData,
  IReceivedIntakeJobsObj,
  TReceivedSpecificIntakeJobsObj,
  TServiceTypeTaskDict,
} from 'src/store/types/task';
import { IServiceTableChildState, TServiceTableState } from '../CreateSpecificIntake/CreateSpecificIntake';

const { Option } = Select;
interface UpdateSpecificIntakeProps {
  serviceTypeTaskDict: TServiceTypeTaskDict | null;
  setServiceTypeTaskDict: React.Dispatch<React.SetStateAction<TServiceTypeTaskDict | null>>;
  serviceTaskDropdown: IServiceTaskDropdown;
  setServiceTaskDropdown: React.Dispatch<React.SetStateAction<IServiceTaskDropdown>>;
  inEditMode: boolean;
  setInEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  beforeDeleteState: TUpdateTaskTableState[] | null;
  setBeforeDeleteState: React.Dispatch<React.SetStateAction<TUpdateTaskTableState[] | null>>;
  setShowMobileHistoryLogs: React.Dispatch<React.SetStateAction<boolean>>;
  setStartLogsAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<'main' | 'update' | 'create'>>;
}

export type IUpdateTaskTableChildState = {
  key: string;
  taskId: string;
  taskTime: number;
  taskType: string;
  taskTitle: string;
  taskDescription: string;
};

export type TUpdateTaskTableState = {
  key: number;
  taskId: string;
  taskType: string;
  taskTitle: string;
  taskTitleString?: string;
  taskDescription: string;
};

type Props = UpdateSpecificIntakeProps & StateProps & DispatchProps;

const UpdateSpecificIntake: React.FC<Props> = ({
  loading,
  auth_token,
  inEditMode,
  userInfoObj,
  setCurrentPage,
  setInEditMode,
  onGetServiceTypes,
  usersByRolesArray,
  intakeStatusArray,
  serviceTypesArray,
  serviceTypeTaskDict,
  specificIntakeJobsObj,
  serviceTaskDropdown,
  // beforeDeleteState,
  setServiceTaskDropdown,
  onDeleteIntakeSummary,
  setStartLogsAnimation,
  onUpdateIntakeSummary,
  setBeforeDeleteState,
  onSetSpecificIntakeLogs,
  setShowMobileHistoryLogs,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const { width } = useWindowDimensions();

  const [updateIntakeJobsForm] = Form.useForm();
  const [clickedUpdate, setClickedUpdate] = useState(false); //boolean to keep track if user has clicked update
  const [updateServiceTableState, setUpdateServiceTableState] = useState<TServiceTableState>({});
  const [incomingSpecificIntakeData, setIncomingSpecificIntakeData] =
    useState<TReceivedSpecificIntakeJobsObj | null>(null);
  const [showSubmitPopconfirm, setShowSubmitPopconfirm] = useState(false);
  const [currentIntakeStatus, setCurrentIntakeStatus] = useState(0);

  const [currentSpecificIntakeJobsObj, setCurrentSpecificIntakeJobsObj] =
    useState<TReceivedSpecificIntakeJobsObj | null>(null);
  const cableApp = useContext(ActionCableContext);
  const cableRef = useRef() as MutableRefObject<any>;

  const baysList = ['1', '2', '3', '4', '5', '6', '7', '8'];
  /* ================================================== */
  /*  method */
  /* ================================================== */

  const goBackToIntakes = useCallback(() => {
    setCurrentPage('main');
    // onSetSpecificIntakeLogs(null);
    gsap.to('.task__table-div', {
      duration: 1,
      ease: 'ease',
      x: '0',
    });
  }, [setCurrentPage]);

  const handleAdd = () => {
    if (updateServiceTableState === null) return;
    let uniqueKey = uuidv4();
    const newData: any = {
      key: uniqueKey,
      [`taskType${uniqueKey}`]: '',
      [`taskTime${uniqueKey}`]: '',
      [`taskTitle${uniqueKey}`]: '',
      [`taskDescription${uniqueKey}`]: '',
    };
    let tempState = { ...updateServiceTableState };
    tempState[uniqueKey] = newData;
    setUpdateServiceTableState(tempState);
  };

  const roleFilter = (arrayChild: TReceivedIntakeStatusObj) => {
    let role = userInfoObj?.roles.title.toLowerCase();
    let filterResult = null;
    switch (role) {
      case 'Mechanic'.toLowerCase():
        filterResult =
          arrayChild.title.toLowerCase().includes('In Progress'.toLowerCase()) ||
          arrayChild.title.toLowerCase().includes('On Hold'.toLowerCase());
        break;
      case 'Service Advisor'.toLowerCase():
        filterResult = !arrayChild.title.toLowerCase().includes('Ordering Spareparts'.toLowerCase());
        break;
      case 'Superadmin'.toLowerCase():
        filterResult = arrayChild;
        break;
      case 'Sparepart Specialist'.toLowerCase():
        filterResult = arrayChild.title.toLowerCase().includes('Ordering Spareparts'.toLowerCase());
        break;
      default:
    }
    return filterResult;
  };

  const uniqueFilter = (parentArray: TReceivedIntakeStatusObj, i: number) => {
    if (intakeStatusArray === null || intakeStatusArray === undefined) return;

    let roleFiltered = intakeStatusArray.filter(roleFilter);
    return roleFiltered.findIndex((child: TReceivedIntakeStatusObj) => child['title'] === parentArray['title']) === i;
  };

  const onUpdateIntakeAndJobsFinish = (values: {
    [key: string]: any;
    bay: string;
    pickup: boolean;
    description: string;
    assign: number[];
    intakeId: string;
    intakeStatus: number;
    intakeUpdateDescription: string;
  }) => {
    if (userInfoObj === null || userInfoObj === undefined) return;
    let resultJobs: IJobFormData[] = [];

    Object.values(updateServiceTableState).forEach((task: IServiceTableChildState) => {
      let taskObj = {
        id: (task as any)[`taskId${task.key}`],
        service_task_id: values[`taskTitle${task.key}`],
        description: values[`taskDescription${task.key}`],
        duration: values[`taskTime${task.key}`],
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
      logs: { title: '', description: values.intakeUpdateDescription, user_id: userInfoObj.id },
    };
    onUpdateIntakeSummary(parseInt(values.intakeId), intakeJobsFormData);
  };

  const tagRender = (props: any) => {
    if (usersByRolesArray === null || usersByRolesArray === undefined) return <></>;
    let userResultArray = usersByRolesArray.filter((user) => props.value === user.id);
    //
    return (
      <div className="flex-align-center">
        {userResultArray.map((user) => {
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
      className: 'updatespecificintake__table-header',
      dataIndex: 'taskType',
      width: '15rem',
      ellipsis: true,
      editable: true,
      // sorter: (a: TUpdateTaskTableState, b: TUpdateTaskTableState) => a.taskType.localeCompare(b.taskType),

      render: (_text: any, record: TUpdateTaskTableState) => {
        if (serviceTypesArray === null || serviceTypesArray === undefined) return;
        let filteredServiceTypes = serviceTypesArray.filter(
          (child) => child.id === (record as any)[`taskType${record.key}`],
        );

        return (
          <>
            {inEditMode ? (
              <>
                <Form.Item
                  // label="Service Type"
                  name={`taskType${record.key}`}
                  className="updatespecificintake__form-item--task"
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
                    className="updatespecificintake__select updatespecificintake__select--task"
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
                <Form.Item hidden required name={`taskId${record.key}`}>
                  <Input />
                </Form.Item>
              </>
            ) : (
              <div className="updatespecificintake__table-column">
                {filteredServiceTypes.length > 0 ? filteredServiceTypes[0].title : ''}
              </div>
            )}
          </>
        );
      },
    },
    {
      key: 'taskTitle',
      title: 'Service Task',
      className: 'updatespecificintake__table-header',
      dataIndex: 'taskTitle',
      width: 'auto',
      ellipsis: true,
      editable: true,
      render: (_text: any, record: TUpdateTaskTableState) => {
        let serviceTaskId = (record as any)[`taskTitle${record.key}`];

        if (!inEditMode && serviceTypeTaskDict) {
          let taskTypeId = (record as any)[`taskType${record.key}`];
          let serviceTaskTitle = serviceTypeTaskDict[taskTypeId].serviceTasksArray.filter(
            (child) => child.id === serviceTaskId,
          )[0].title;
          return <div className="updatespecificintake__table-column">{serviceTaskTitle}</div>;
        }
        if (record.key !== undefined && Object.keys(serviceTaskDropdown).includes(record.key.toString())) {
          let dropdownArrayExist = Object.keys(serviceTaskDropdown[record.key]).length > 0;
          let dropdownArray = serviceTaskDropdown[record.key].serviceTaskDropdownArray;
          return (
            <Form.Item
              // label="Service Type"
              name={`taskTitle${record.key}`}
              className="updatespecificintake__form-item--task"
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
                optionFilterProp="children"
                placeholder="Select a Task title"
                className="updatespecificintake__select updatespecificintake__select--task"
                filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="">Select a Task</Option>
                {dropdownArrayExist &&
                  dropdownArray !== null &&
                  dropdownArray.map((task) => {
                    return (
                      <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={task.id}>
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
              className="updatespecificintake__form-item--task"
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
                placeholder="Select a Task title"
                className="updatespecificintake__select updatespecificintake__select--task updatespecificintake__select--disabled"
              >
                <Option value="">Select a Task</Option>
              </Select>
            </Form.Item>
          );
        }
      },
    },
    {
      key: 'taskTime',
      title: 'Time',
      className: 'createspecificintake__table-header',
      dataIndex: 'taskTime',
      width: 'auto',
      ellipsis: true,
      editable: true,
      // sorter: (a: TserviceTableState, b: TserviceTableState) => a.taskDescription.localeCompare(b.taskDescription),
      render: (_text: any, record: IServiceTableChildState) => {
        let serviceTypeTitle = '';
        // first check if the serviceTaskDropdown object has this key
        if (Object.keys(serviceTaskDropdown).includes(record.key.toString())) {
          // then check whether the service type obj exist
          if (
            serviceTaskDropdown[record.key].serviceType !== null ||
            serviceTaskDropdown[record.key].serviceType !== undefined
          ) {
            // if exist, get the title of the serviceType
            serviceTypeTitle = serviceTaskDropdown[record.key].serviceType.title;
          }
        }

        let serviceTypeIsNotRepair = serviceTypeTitle.toLowerCase() !== 'Repair'.toLowerCase();
        let serviceTask = serviceTaskDropdown[record.key].serviceTaskTitle;
        // @TODO undefined
        console.log('SERVICE TASK', serviceTask);
        return (
          <>
            {inEditMode ? (
              <Form.Item
                // label="Description"
                className="createspecificintake__form-item--task"
                name={`taskTime${record.key}`}
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Estimated time required, default is 0',
                  },
                ]}
              >
                <Input
                  disabled={serviceTypeIsNotRepair || serviceTask.toLowerCase() === 'Others'.toLowerCase()}
                  type="number"
                  className={`createspecificintake__form-input ${
                    serviceTypeIsNotRepair ? 'createspecificintake__form-input--disabled' : ''
                  }`}
                  placeholder="Estimate time here"
                />
              </Form.Item>
            ) : (
              <div>{(record as any)[`taskTime${record.key}`]} hr (s)</div>
            )}
          </>
        );
      },
    },
    {
      key: 'taskDescription',
      title: 'Description',
      className: 'updatespecificintake__table-header',
      dataIndex: 'taskDescription',
      width: 'auto',
      ellipsis: true,
      editable: true,
      // sorter: (a: TUpdateTaskTableState, b: TUpdateTaskTableState) => a.taskDescription.localeCompare(b.taskDescription),
      render: (_text: any, record: TUpdateTaskTableState) => {
        return (
          <>
            {!inEditMode ? (
              <div className="updatespecificintake__table-column updatespecificintake__table-column--desc">
                {(record as any)[`taskDescription${record.key}`] === '' ||
                (record as any)[`taskDescription${record.key}`] === null
                  ? '-'
                  : (record as any)[`taskDescription${record.key}`]}
              </div>
            ) : (
              <Form.Item
                // label="Description"
                className="updatespecificintake__form-item--task"
                name={`taskDescription${record.key}`}
                style={{ margin: 0 }}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input className="updatespecificintake__form-input" placeholder="Type description here" />
              </Form.Item>
            )}
          </>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      width: '8rem',
      render: (_: any, record: TUpdateTaskTableState) => {
        // const editable = isEditing(record);
        return (
          <>
            {updateServiceTableState && Object.values(updateServiceTableState).length >= 1 ? (
              <>
                {/* {(record as any)[`taskId${record.key}`] === undefined ? ( */}
                {/* // this is for normal delete */}
                <Button
                  type="link"
                  danger
                  title="Delete"
                  onClick={() => {
                    if (updateServiceTableState === null) return;
                    // const dataSource = [...updateServiceTableState];
                    // // setCount(count - 1);
                    // setUpdateServiceTableState(dataSource.filter((item) => item.key !== record.key));

                    const dataSource = { ...updateServiceTableState };
                    delete dataSource[record.key];
                    setUpdateServiceTableState(dataSource);
                  }}
                >
                  <i className="far fa-trash-alt"></i>
                </Button>
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

  useEffect(() => {
    // if user is not logged in, then he shouldnt be able to edit
    if (auth_token === null) {
      setInEditMode(false);
    }
  }, [auth_token, setInEditMode]);

  useEffect(() => {
    if (specificIntakeJobsObj === undefined || specificIntakeJobsObj === null) return;
    setCurrentIntakeStatus(specificIntakeJobsObj.intake_status.id);
    setCurrentSpecificIntakeJobsObj(specificIntakeJobsObj);
    onSetSpecificIntakeLogs(specificIntakeJobsObj.intake_logs);
  }, [specificIntakeJobsObj, onSetSpecificIntakeLogs]);

  useEffect(() => {
    if (currentSpecificIntakeJobsObj && specificIntakeJobsObj) {
      let usersId: number[] = [];
      currentSpecificIntakeJobsObj.intake_users.forEach((child) => usersId.push(child.user.id));

      updateIntakeJobsForm.setFieldsValue({
        assign: usersId,
        bay: currentSpecificIntakeJobsObj.bay,
        intakeId: currentSpecificIntakeJobsObj.id,
        pickup: currentSpecificIntakeJobsObj.pick_up,
        description: currentSpecificIntakeJobsObj.description,
        intakeStatus: currentSpecificIntakeJobsObj.intake_status.id,
        registrationNumber: currentSpecificIntakeJobsObj.registration,
      });
    }
  }, [currentSpecificIntakeJobsObj, specificIntakeJobsObj, updateIntakeJobsForm]);

  useEffect(() => {
    if (updateServiceTableState === null || Object.values(updateServiceTableState).length < 1) return;
    Object.values(updateServiceTableState).forEach((row: any) => {
      // updating the form thats not related to the task table
      updateIntakeJobsForm.setFieldsValue({
        [`assign${row.key}`]: row[`assign${row.key}`],
        [`taskId${row.key}`]: row[`taskId${row.key}`],
        [`taskType${row.key}`]: row[`taskType${row.key}`],
        [`taskTime${row.key}`]: row[`taskTime${row.key}`],
        [`taskTitle${row.key}`]: row[`taskTitle${row.key}`],
        [`taskStatus${row.key}`]: row[`taskStatus${row.key}`],
        [`taskDescription${row.key}`]: row[`taskDescription${row.key}`],
      });
    });
  }, [updateIntakeJobsForm, updateServiceTableState]);

  useEffect(() => {
    let tempTableState: TServiceTableState = {};
    let tempDict: any = {};
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (task: IReceivedIntakeJobsObj) => {
      let uniqueKey = uuidv4();
      (tempTableState as any)[uniqueKey] = {
        key: uniqueKey,
        [`taskId${uniqueKey}`]: task.id,
        [`taskTitle${uniqueKey}`]: task.service_task.id,
        [`taskTime${uniqueKey}`]: task.service_task.duration,
        [`taskDescription${uniqueKey}`]: task.description,
        [`taskType${uniqueKey}`]: task.service_task.service_type.id,
      };

      // prefill the service type task dict to keep track of the service task dropdowns
      if (
        serviceTypeTaskDict &&
        Object.keys(serviceTypeTaskDict).length > 0 &&
        Object.keys(serviceTypeTaskDict).includes(task.service_task.service_type.id.toString()) &&
        'serviceTasksArray' in serviceTypeTaskDict[task.service_task.service_type.id]
      ) {
        if (serviceTypesArray === null || serviceTypesArray === undefined) return;
        let serviceTypeObj = serviceTypesArray.filter((st) => st.id === task.service_task.service_type.id)[0];

        tempDict[uniqueKey] = {};
        tempDict[uniqueKey]['serviceType'] = serviceTypeObj;
        tempDict[uniqueKey]['serviceTaskId'] = task.service_task.id;
        tempDict[uniqueKey]['serviceTaskTitle'] = task.service_task.title;
        tempDict[uniqueKey]['serviceTaskDropdownArray'] =
          serviceTypeTaskDict[task.service_task.service_type.id].serviceTasksArray;
      }
    };

    if (currentSpecificIntakeJobsObj && specificIntakeJobsObj) {
      // Execute function "storeValue" for every array index
      currentSpecificIntakeJobsObj.jobs.map(storeValue);
    }

    // update the state with tempArray
    setUpdateServiceTableState(tempTableState);
    setServiceTaskDropdown(tempDict);
  }, [
    intakeStatusArray,
    serviceTypesArray,
    specificIntakeJobsObj,
    serviceTypeTaskDict,
    setServiceTaskDropdown,
    setUpdateServiceTableState,
    currentSpecificIntakeJobsObj,
  ]);

  useEffect(() => {
    if (incomingSpecificIntakeData) {
      setCurrentSpecificIntakeJobsObj(incomingSpecificIntakeData);
      onSetSpecificIntakeLogs(incomingSpecificIntakeData.intake_logs);

      // if user is an admin that has clicked update, then swap the screen back
      if (clickedUpdate) {
        setClickedUpdate(false); //reset
        goBackToIntakes(); //animate back to homescreen
      }
      setIncomingSpecificIntakeData(null);
    }
  }, [goBackToIntakes, onSetSpecificIntakeLogs, clickedUpdate, incomingSpecificIntakeData]);

  useEffect(() => {
    if (specificIntakeJobsObj === undefined || specificIntakeJobsObj === null) return;
    const channel = cableApp.cable.subscriptions.create(
      { channel: 'JobMonitoringChannel', intake_id: specificIntakeJobsObj.id },
      {
        connected: () => console.log('Specific intake connected'),
        received: (res: any) => {
          if (res.action === 'destroy') {
            goBackToIntakes();
          } else {
            updateIntakeJobsForm.setFieldsValue({ intakeUpdateDescription: '' });
            setIncomingSpecificIntakeData(res.data);
          }
        },
      },
    );

    cableRef.current = channel;
  }, [cableRef, updateIntakeJobsForm, goBackToIntakes, specificIntakeJobsObj, cableApp.cable.subscriptions]);

  useEffect(() => {
    const executeSubmit = (event: any) => {
      // check if pop confirm is opened, then only detect key down
      if (event.key === 'Enter' && showSubmitPopconfirm) {
        //Do whatever when esc is pressed
        updateIntakeJobsForm.submit();
      }
    };
    document.addEventListener('keydown', executeSubmit, false);
    return () => {
      document.removeEventListener('keydown', executeSubmit, false);
    };
  }, [updateIntakeJobsForm, showSubmitPopconfirm]);

  /* ================================================== */
  /* ================================================== */

  return (
    <>
      {typeof currentSpecificIntakeJobsObj === 'object' && currentSpecificIntakeJobsObj && specificIntakeJobsObj ? (
        <Form
          className="updatespecificintake__form"
          form={updateIntakeJobsForm}
          onFieldsChange={(e) => {
            if (updateServiceTableState === null) return;
            let tempTaskTableState = { ...updateServiceTableState };

            let labelName = e[0].name.toString();
            let currentValue = e[0].value;
            let indexKey = '';
            // basically getting the index Key
            let taskType = 'taskType';
            let taskTime = 'taskTime';
            let taskTitle = 'taskTitle';
            let taskDescription = 'taskDescription';

            const updateTaskTableState = (labelName: string, indexKey: string, changedCurrentValue: any) => {
              let formItemsObject = tempTaskTableState[indexKey];
              let result = { ...formItemsObject, [labelName]: changedCurrentValue };
              (tempTaskTableState as any)[indexKey] = result;
              setUpdateServiceTableState(tempTaskTableState);
            };

            if (labelName.includes(taskType)) {
              indexKey = labelName.substring(taskType.length);
              updateTaskTableState(labelName, indexKey, currentValue);
            } else if (labelName.includes(taskTitle)) {
              indexKey = labelName.substring(taskTitle.length);
              updateTaskTableState(labelName, indexKey, currentValue);
            } else if (labelName.includes(taskDescription)) {
              indexKey = labelName.substring(taskDescription.length);
              updateTaskTableState(labelName, indexKey, currentValue);
            } else if (labelName.includes(taskTime)) {
              indexKey = labelName.substring(taskTime.length);
              updateTaskTableState(labelName, indexKey, currentValue);
            }

            if (labelName.includes('taskType') && currentValue !== '') {
              let serviceTypeId = currentValue;
              if (serviceTypesArray === null || serviceTypesArray === undefined) return;
              let serviceTypeObj = serviceTypesArray.filter((st) => st.id === serviceTypeId)[0];

              if (serviceTypeTaskDict) {
                setServiceTaskDropdown({
                  ...serviceTaskDropdown,
                  [indexKey]: {
                    serviceTaskId: '', //when a new service type is chosen, the service task shouold be reset
                    serviceType: serviceTypeObj,
                    serviceTaskTitle: '',
                    serviceTaskDropdownArray: serviceTypeTaskDict[currentValue].serviceTasksArray,
                  },
                });
              }

              // this is because when user change the type, the service task and time should be reset back to empty value
              updateIntakeJobsForm.setFieldsValue({
                [`taskTitle${indexKey}`]: '',
                [`taskTime${indexKey}`]: '',
                [`taskDescription${indexKey}`]: '',
              });
            }

            if (labelName.includes('taskTitle')) {
              let taskTitleString = '';
              // get title string through task Id
              if (serviceTypeTaskDict) {
                taskTitleString = serviceTypeTaskDict[currentValue].serviceTasksArray.filter(
                  (child) => child.id === currentValue,
                )[0].title;
              }

              setServiceTaskDropdown({
                ...serviceTaskDropdown,
                [indexKey]: {
                  ...serviceTaskDropdown[indexKey],
                  serviceTaskId: currentValue,
                  serviceTaskTitle: taskTitleString,
                },
              });

              // get the taskdropdown from the object/dict
              let taskDropdown = serviceTaskDropdown[indexKey].serviceTaskDropdownArray;
              if (taskDropdown) {
                // filter using service task id and get the service task object
                let filteredServiceTask = taskDropdown.filter((child) => child.id === currentValue);
                // set the duration to the form item for taskTime
                updateIntakeJobsForm.setFieldsValue({ [`taskTime${indexKey}`]: filteredServiceTask[0].duration });

                let formItemsObject = tempTaskTableState[indexKey];

                let result = { ...formItemsObject, [`taskTime${indexKey}`]: filteredServiceTask[0].duration };
                (tempTaskTableState as any)[indexKey] = result;
                setUpdateServiceTableState(tempTaskTableState);
              }
            }
          }}
          onFinish={(values) => {
            onUpdateIntakeAndJobsFinish(values);
          }}
        >
          <Form.Item hidden name="intakeId" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <div className="updatespecificintake__outerdiv">
            <div className="updatespecificintake__nav-outerdiv">
              <div className="flex-align-center">
                <div
                  className="updatespecificintake__back"
                  onClick={() => {
                    // setInEditMode(false);
                    setBeforeDeleteState(null);
                    goBackToIntakes();
                  }}
                >
                  <i className="fas fa-arrow-circle-left" /> <div className="updatespecificintake__back-text">Back</div>
                </div>
              </div>

              <div className="flex-align-center">
                {/* {inEditMode && <div style={{ marginRight: '1rem' }}>(Editing)</div>} */}
                <>
                  <div
                    className="updatespecificintake__button-logs"
                    onClick={() => {
                      setStartLogsAnimation(true);
                      setShowMobileHistoryLogs(true);
                    }}
                  >
                    <i className="fas fa-clipboard-list"></i>
                  </div>

                  {inEditMode && (
                    <Popconfirm
                      title={
                        <div className="updatespecificintake__popconfirm-content">
                          Sure to delete Intake for {currentSpecificIntakeJobsObj.registration}?
                        </div>
                      }
                      onConfirm={() => onDeleteIntakeSummary(currentSpecificIntakeJobsObj.id)}
                    >
                      <span className="updatespecificintake__button-task updatespecificintake__button-task--delete">
                        <i className="fas fa-trash-alt"></i>
                        <span className="updatespecificintake__button-task--delete-text">
                          &nbsp;&nbsp;Delete Intake
                        </span>
                      </span>
                    </Popconfirm>
                  )}
                </>
              </div>
            </div>
            <section className="updatespecificintake__section-top">
              {/* =============================================== */}
              {/* REGISTRATION */}
              {/* =============================================== */}
              <div className="updatespecificintake__row--registration">
                {inEditMode ? (
                  <div className="updatespecificintake__div-registration">
                    <div style={{ width: '100%' }}>
                      <Form.Item
                        className="updatespecificintake__form-item--registration"
                        name="registrationNumber"
                        rules={[{ required: true, message: 'Input Registration Number here!' }]}
                      >
                        <Input
                          placeholder="e.g. DCG1199"
                          className="updatespecificintake__form-item--registration-input"
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item
                        name="bay"
                        className="updatespecificintake__form-item--bay"
                        rules={[{ required: false, message: 'Select a bay!' }]}
                      >
                        <Select className="updatespecificintake__select--bay">
                          <Option value="">Select a Bay</Option>
                          {baysList.map((child) => (
                            <Option value={child} key={uuidv4()}>
                              BAY {child}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                ) : (
                  <div className="updatespecificintake__registration-outerdiv--normaluser">
                    <Tooltip title={currentSpecificIntakeJobsObj.registration}>
                      <div className="updatespecificintake__registration-div">
                        {currentSpecificIntakeJobsObj.registration}
                      </div>
                    </Tooltip>
                    <div className="updatespecificintake__bay-div ">
                      {currentSpecificIntakeJobsObj.bay === '' ||
                      currentSpecificIntakeJobsObj.bay === null ||
                      currentSpecificIntakeJobsObj.bay === undefined
                        ? '-'
                        : `Bay ${currentSpecificIntakeJobsObj.bay}`}
                    </div>
                  </div>
                )}
              </div>

              {/* DIV WRAPPING ALL 3 FORMITEMS */}
              <div className="updatespecificintake__box-outerdiv">
                {/* ==================================================== */}
                {/* Intake Status */}
                {/* ==================================================== */}
                <div className="updatespecificintake__box updatespecificintake__box--status">
                  <Tooltip title="Intake Status">
                    <div className="updatespecificintake__box-left">
                      <i className="fas fa-tasks updatespecificintake__box-icon"></i>
                    </div>
                  </Tooltip>
                  <div className="updatespecificintake__box-right">
                    {/* {inEditMode ? (
                      <Form.Item
                        name="intakeStatus"
                        style={{ margin: 0 }}
                        className="updatespecificintake__form-item--intake"
                        rules={[
                          {
                            required: true,
                            message: `Please choose a status!`,
                          },
                        ]}
                      >
                        <Select placeholder="Select an intake status" className="updatespecificintake__select">
                          <Option value="">Select a status</Option>
                          {intakeStatusArray &&
                            intakeStatusArray.filter(uniqueFilter).map((intakeStatus) => {
                              return (
                                <Option style={{ textTransform: 'capitalize' }} key={uuidv4()} value={intakeStatus.id}>
                                  {intakeStatus.title}
                                </Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                    ) : (
                      <>
                        {typeof currentSpecificIntakeJobsObj === 'object'
                          ? currentSpecificIntakeJobsObj.intake_status.title
                          : ''}
                      </>
                    )} */}

                    {typeof currentSpecificIntakeJobsObj === 'object'
                      ? currentSpecificIntakeJobsObj.intake_status.title
                      : ''}
                  </div>
                </div>

                {/* ==================================================== */}
                {/* Intake Time - only show if user is not in mobile mode or user is in mobile mode but not sign in*/}
                {/* ==================================================== */}
                {width >= 576 || (!inEditMode && width <= 576) ? (
                  <div className="updatespecificintake__box updatespecificintake__box--dock">
                    <Tooltip title="Docked Date & Time">
                      <div className="updatespecificintake__box-left">
                        <i className="fas fa-clock updatespecificintake__box-icon"></i>
                      </div>
                    </Tooltip>

                    <div className="updatespecificintake__box-right">
                      <div className="updatespecificintake__box-right--time">
                        <div className="updatespecificintake__box-right--time-left">
                          {moment(currentSpecificIntakeJobsObj.created_at).format('YYYY-MM-DD')}
                        </div>
                        <div>{moment(currentSpecificIntakeJobsObj.created_at).format('HH:mm')}</div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* ==================================================== */}
                {/* Intake Users */}
                {/* ==================================================== */}
                <div className="updatespecificintake__box updatespecificintake__box--users">
                  <Tooltip
                    title={
                      currentSpecificIntakeJobsObj.intake_users.length > 0 ? (
                        <ol>
                          {currentSpecificIntakeJobsObj.intake_users.map((child) => (
                            <li key={`assignees${child.id}`} className="task__table-assignees">
                              {child.user.first_name}&nbsp;
                              {child.user.last_name ? child.user.last_name : ''}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        'Task Assignees'
                      )
                    }
                  >
                    <div className="updatespecificintake__box-left">
                      <i className="fas fa-users updatespecificintake__box-icon"></i>
                    </div>
                  </Tooltip>
                  <div className="updatespecificintake__box-right updatespecificintake__box-right--users">
                    {inEditMode && !userInfoObj?.roles.title.toLowerCase().includes('Mechanic'.toLowerCase()) ? (
                      <Form.Item name="assign" className="updatespecificintake__form-item--users" style={{ margin: 0 }}>
                        <Select
                          mode="multiple"
                          placeholder="Please select mechanics"
                          optionFilterProp="children"
                          className="updatespecificintake__select"
                          tagRender={(props) => tagRender(props)}
                          filterOption={(input, option) =>
                            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
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
                    ) : (
                      <>
                        {/* show this either in mechanic or normal user view */}

                        <div>
                          {/* {currentSpecificIntakeJobsObj.intake_users.length > 0
                          ? currentSpecificIntakeJobsObj.intake_users.map((child) => (
                              <div key={uuidv4()}>
                                {child.user.first_name} {child.user.last_name}
                              </div>
                            ))
                          : '-'} */}
                          {currentSpecificIntakeJobsObj.intake_users.length > 0 ? (
                            <Tooltip
                              title={
                                currentSpecificIntakeJobsObj.intake_users.length > 0 ? (
                                  <ol>
                                    {currentSpecificIntakeJobsObj.intake_users.map((child) => (
                                      <li key={`assignees${child.id}`} className="task__table-assignees">
                                        {child.user.first_name}&nbsp;
                                        {child.user.last_name ? child.user.last_name : ''}
                                      </li>
                                    ))}
                                  </ol>
                                ) : (
                                  'Task Assignees'
                                )
                              }
                            >
                              <i className="fas fa-user"></i> x {currentSpecificIntakeJobsObj.intake_users.length}
                            </Tooltip>
                          ) : (
                            '-'
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <section className="updatespecificintake__section-statusbutton">
                <Radio.Group defaultValue={currentIntakeStatus} buttonStyle="solid">
                  {intakeStatusArray &&
                    intakeStatusArray
                      .filter(roleFilter)
                      .filter(uniqueFilter)
                      .map((intakeStatus) => {
                        return (
                          <React.Fragment key={uuidv4()}>
                            <Radio.Button
                              onClick={(e: any) => setCurrentIntakeStatus(e.target.value)}
                              value={intakeStatus.id}
                            >
                              {intakeStatus.title}
                            </Radio.Button>
                          </React.Fragment>
                        );
                      })}
                </Radio.Group>
              </section>

              <section className="updatespecificintake__section-description">
                {inEditMode ? (
                  <div className="updatespecificintake__section-description-outerdiv">
                    <span className="updatespecificintake__section-description-text">Description:</span>
                    <Form.Item
                      // label="Description"
                      name={`description`}
                      className="updatespecificintake__form-item--task"
                      style={{ margin: 0, width: '100%' }}
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Input
                        className="updatespecificintake__form-input updatespecificintake__form-input--intakedesc"
                        placeholder="Type description here"
                      />
                    </Form.Item>
                  </div>
                ) : (
                  <>
                    {currentSpecificIntakeJobsObj && (
                      <>
                        {currentSpecificIntakeJobsObj.description !== null &&
                          currentSpecificIntakeJobsObj.description !== undefined && (
                            <div className="updatespecificintake__section-description-outerdiv">
                              <span className="updatespecificintake__section-description-text">Description:</span>
                              <div className="updatespecificintake__section-description-div">
                                {currentSpecificIntakeJobsObj.description === ''
                                  ? '-'
                                  : currentSpecificIntakeJobsObj.description}
                              </div>
                            </div>
                          )}
                      </>
                    )}
                  </>
                )}
              </section>
            </section>

            <section className="updatespecificintake__section-bottom">
              <div>
                <div className="updatespecificintake__section-bottom-title-div">
                  <div className="updatespecificintake__section-bottom-title">List of Services</div>
                  {inEditMode && (
                    <div className="updatespecificintake__add-div">
                      <span className="updatespecificintake__add-button" onClick={() => handleAdd()}>
                        <i className="fas fa-plus-square"></i>&nbsp;&nbsp;Add service
                      </span>
                    </div>
                  )}
                </div>
                {updateServiceTableState && (
                  <>
                    {width >= 576 ? (
                      <Table
                        bordered
                        className="updatespecificintake__table"
                        scroll={{ y: 300 }}
                        dataSource={Object.values(updateServiceTableState)}
                        columns={
                          inEditMode
                            ? (taskColumnsSettings as any)
                            : (taskColumnsSettings.filter((child) => child.title !== 'Actions') as any)
                        } //remove actions when its in edit mode
                        pagination={false}
                      />
                    ) : (
                      <MobileServiceTable
                        handleAdd={handleAdd}
                        auth_token={auth_token}
                        intakeJobsForm={updateIntakeJobsForm}
                        serviceTaskDropdown={serviceTaskDropdown}
                        setServiceTaskDropdown={setServiceTaskDropdown}
                        serviceTypeTaskDict={serviceTypeTaskDict}
                        serviceTableState={updateServiceTableState}
                        setServiceTableState={setUpdateServiceTableState}
                      />
                    )}
                  </>
                )}
              </div>
              {inEditMode && (
                <>
                  <div className="updatespecificintake__button-div-bottom">
                    <div className="updatespecificintake__lastupdated-div">
                      Last Updated: {moment(currentSpecificIntakeJobsObj.updated_at).format('YYYY-MM-DD  HH:mm')}
                    </div>
                    <Popconfirm
                      visible={showSubmitPopconfirm}
                      onVisibleChange={(e) => setShowSubmitPopconfirm(e)}
                      placement="topRight"
                      title={
                        <>
                          <div>Additional Update Note</div>
                          <Form.Item
                            className="updatespecificintake__form-item make__form-item"
                            name="intakeUpdateDescription"
                            rules={[{ required: false }]}
                          >
                            <Input placeholder="Type note here" />
                          </Form.Item>
                        </>
                      }
                      onConfirm={() => {
                        updateIntakeJobsForm.submit();
                        setClickedUpdate(true);
                      }}
                      onCancel={() => setShowSubmitPopconfirm(false)}
                      okText="Continue"
                      okButtonProps={{ htmlType: 'submit' }}
                      cancelText="Cancel"
                    >
                      <Button
                        onClick={() => setShowSubmitPopconfirm(true)}
                        loading={loading !== undefined && loading}
                        className="updatespecificintake__button-task updatespecificintake__button-task--save"
                      >
                        Update
                      </Button>
                    </Popconfirm>
                  </div>
                </>
              )}
            </section>
          </div>
        </Form>
      ) : (
        <div className="updatespecificintake__loading-outerdiv">
          <div className="updatespecificintake__loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

interface StateProps {
  loading?: boolean;
  auth_token?: string | null;
  userInfoObj?: TReceivedUserInfoObj | null;
  specificIntakeLogs?: IIntakeLogs[] | null;
  specificIntakeJobsObj?: TReceivedSpecificIntakeJobsObj | null;
  intakeStatusArray?: TReceivedIntakeStatusObj[] | null;
  usersByRolesArray?: TReceivedUserInfoObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.task.loading,
    auth_token: state.auth.auth_token,
    userInfoObj: state.auth.userInfoObj,
    specificIntakeJobsObj: state.task.specificIntakeJobsObj,
    intakeStatusArray: state.dashboard.intakeStatusArray,
    usersByRolesArray: state.task.usersByRolesArray,
    specificIntakeLogs: state.task.specificIntakeLogs,
    serviceTypesArray: state.dashboard.serviceTypesArray,
  };
};

interface DispatchProps {
  onClearTaskState: typeof actions.clearTaskState;
  onGetServiceTypes: typeof actions.getServiceTypes;
  onDeleteIntakeSummary: typeof actions.deleteIntakeSummary;
  onUpdateIntakeSummary: typeof actions.updateIntakeSummary;
  onSetSpecificIntakeLogs: typeof actions.setSpecificIntakeLogs;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetServiceTypes: () => dispatch(actions.getServiceTypes()),
    onClearTaskState: () => dispatch(actions.clearTaskState()),
    onDeleteIntakeSummary: (intake_id) => dispatch(actions.deleteIntakeSummary(intake_id)),
    onUpdateIntakeSummary: (intake_id, intakeJobsFormData) =>
      dispatch(actions.updateIntakeSummary(intake_id, intakeJobsFormData)),
    onSetSpecificIntakeLogs: (specificIntakeLogs) => dispatch(actions.setSpecificIntakeLogs(specificIntakeLogs)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSpecificIntake);

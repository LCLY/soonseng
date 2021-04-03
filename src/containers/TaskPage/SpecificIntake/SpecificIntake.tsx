import React, { useState, useEffect, useRef, useContext, MutableRefObject } from 'react';
import { RootState } from 'src';
import './SpecificIntake.scss';
/* components */
/* 3rd party lib */
import gsap from 'gsap';
import moment from 'moment';
import { Popconfirm, Table, Tooltip, Form, Button, Checkbox, Input, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
/* Util */
import { Dispatch, AnyAction } from 'redux';
import { IServiceTaskDropdown } from '../TaskPage';
import { handleKeyDown } from 'src/shared/Utils';
import { ActionCableContext } from 'src/index';
import * as actions from 'src/store/actions/index';
import { TReceivedUserInfoObj } from 'src/store/types/auth';
import { TReceivedIntakeStatusObj, TReceivedServiceTypesObj } from 'src/store/types/dashboard';
import {
  IIntakeJobsFormData,
  IJobFormData,
  IReceivedIntakeJobsObj,
  TReceivedSpecificIntakeJobsObj,
  TServiceTypeTaskDict,
} from 'src/store/types/task';

const { Option } = Select;

interface SpecificIntakeProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  serviceTypeTaskDict: TServiceTypeTaskDict | null;
  setServiceTypeTaskDict: React.Dispatch<React.SetStateAction<TServiceTypeTaskDict | null>>;
  serviceTaskDropdown: IServiceTaskDropdown;
  setServiceTaskDropdown: React.Dispatch<React.SetStateAction<IServiceTaskDropdown>>;
  inEditMode: boolean;
  setInEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = SpecificIntakeProps & StateProps & DispatchProps;

const SpecificIntake: React.FC<Props> = ({
  count,
  setCount,
  loading,
  onDeleteTask,
  inEditMode,
  setInEditMode,
  onGetServiceTypes,
  usersByRolesArray,
  intakeStatusArray,
  serviceTypesArray,
  serviceTypeTaskDict,
  specificIntakeJobsObj,
  serviceTaskDropdown,
  setServiceTaskDropdown,
  onDeleteIntakeSummary,
  onUpdateIntakeSummary,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  type TUpdateTaskTableState = {
    key: number;
    taskId: string;
    taskType: string;
    taskTitle: string;
    taskTitleString?: string;
    taskDescription: string;
  };

  const [typing, setTyping] = useState<{ isTyping: boolean; typingTimeout: any }>({
    isTyping: false,
    typingTimeout: null,
  });
  const updateCustomizedFieldHandler = (
    formItemsObject: any,
    tempTaskTableState: any,
    labelName: string,
    value: string,
    rowIndex: number,
  ) => {
    if (typing.typingTimeout) {
      clearTimeout(typing.typingTimeout);
    }
    setTyping({
      ...typing,
      isTyping: false,
      typingTimeout: setTimeout(function () {
        // after 3 seconds, send target value to backend
        let result = { ...formItemsObject, [labelName]: value };
        (tempTaskTableState as any)[rowIndex] = result;

        setUpdateTaskTableState(tempTaskTableState);
      }, 500),
    });
  };

  const [updateIntakeJobsForm] = Form.useForm();
  const [originalTaskArraylength, setOriginalTaskArraylength] = useState(0);
  const [updateTaskTableState, setUpdateTaskTableState] = useState<TUpdateTaskTableState[] | null>(null);
  const [incomingSpecificIntakeData, setIncomingSpecificIntakeData] = useState<TReceivedSpecificIntakeJobsObj | null>(
    null,
  );

  const [
    currentSpecificIntakeJobsObj,
    setCurrentSpecificIntakeJobsObj,
  ] = useState<TReceivedSpecificIntakeJobsObj | null>(null);
  const cableApp = useContext(ActionCableContext);
  const cableRef = useRef() as MutableRefObject<any>;

  const baysList = ['1', '2', '3', '4', '5', '6', '7', '8'];
  /* ================================================== */
  /*  method */
  /* ================================================== */

  const handleAdd = () => {
    if (updateTaskTableState === null) return;
    const newData: any = {
      key: count,
      [`taskType${count}`]: '',
      [`taskTitle${count}`]: '',
      [`taskTitleString${count}`]: '',
      [`taskDescription${count}`]: '',
    };
    let tempArray = [...updateTaskTableState];
    tempArray.push(newData);
    setUpdateTaskTableState(tempArray);
    setCount(count + 1);
  };

  const onUpdateIntakeAndJobsFinish = (values: {
    [key: string]: any;
    bay: string;
    pickup: boolean;
    description: string;
    assign: number[];
    intakeId: string;
    intakeStatus: number;
  }) => {
    let resultJobs: IJobFormData[] = [];

    (updateTaskTableState as any).forEach((task: any, index: number) => {
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
        assigned_to_ids: values.assign,
      },
      jobs: resultJobs,
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

  const handleDelete = (intake_id: number, taskId: number) => {
    onDeleteTask(intake_id, taskId);
  };

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
      className: 'specificintake__table-header',
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
                  className="specificintake__form-item--task"
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
                    className="specificintake__select specificintake__select--task"
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
                      updateIntakeJobsForm.setFieldsValue({ [`taskTitle${record.key}`]: '' });
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
                <Form.Item hidden required name={`taskId${record.key}`}>
                  <Input />
                </Form.Item>
              </>
            ) : (
              <div className="specificintake__table-column">
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
      className: 'specificintake__table-header',
      dataIndex: 'taskTitle',
      width: '18rem',
      ellipsis: true,
      editable: true,
      render: (_text: any, record: TUpdateTaskTableState) => {
        let serviceTaskTitle = (record as any)[`taskTitleString${record.key}`];

        if (!inEditMode) {
          return <div className="specificintake__table-column">{serviceTaskTitle}</div>;
        }

        if (Object.keys(serviceTaskDropdown).includes(record.key.toString())) {
          let dropdownArrayExist = Object.keys(serviceTaskDropdown[record.key]).length > 0;
          let dropdownArray = serviceTaskDropdown[record.key].serviceTaskDropdownArray;
          return (
            <Form.Item
              // label="Service Type"
              name={`taskTitle${record.key}`}
              className="specificintake__form-item--task"
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
                className="specificintake__select specificintake__select--task"
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
              className="specificintake__form-item--task"
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
                className="specificintake__select specificintake__select--task specificintake__select--disabled"
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
      className: 'specificintake__table-header',
      dataIndex: 'taskDescription',
      width: 'auto',
      ellipsis: true,
      editable: true,
      // sorter: (a: TUpdateTaskTableState, b: TUpdateTaskTableState) => a.taskDescription.localeCompare(b.taskDescription),
      render: (_text: any, record: TUpdateTaskTableState) => {
        return (
          <>
            {!inEditMode ? (
              <div className="specificintake__table-column">
                {(record as any)[`taskDescription${record.key}`] === '' ||
                (record as any)[`taskDescription${record.key}`] === null
                  ? '-'
                  : (record as any)[`taskDescription${record.key}`]}
              </div>
            ) : (
              <Form.Item
                // label="Description"
                className="specificintake__form-item--task"
                name={`taskDescription${record.key}`}
                style={{ margin: 0 }}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input className="specificintake__form-input" placeholder="Type description here" />
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
            {updateTaskTableState && updateTaskTableState.length >= 1 ? (
              <>
                {(record as any)[`taskId${record.key}`] === undefined ? (
                  // this is for normal delete
                  <Button
                    type="link"
                    danger
                    title="Delete"
                    onClick={() => {
                      if (updateTaskTableState === null) return;
                      const dataSource = [...updateTaskTableState];
                      // setCount(count - 1);
                      setUpdateTaskTableState(dataSource.filter((item) => item.key !== record.key));
                    }}
                  >
                    <i className="far fa-trash-alt"></i>
                  </Button>
                ) : (
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
                )}
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
    if (specificIntakeJobsObj) {
      setCurrentSpecificIntakeJobsObj(specificIntakeJobsObj);
    }
  }, [specificIntakeJobsObj]);

  useEffect(() => {
    if (currentSpecificIntakeJobsObj) {
      let usersId: number[] = [];
      currentSpecificIntakeJobsObj.intake_users.forEach((child) => usersId.push(child.user.id));

      updateIntakeJobsForm.setFieldsValue({
        assign: usersId,
        bay: currentSpecificIntakeJobsObj.bay,
        intakeId: currentSpecificIntakeJobsObj.id,
        pickup: currentSpecificIntakeJobsObj.pick_up,
        intakeStatus: currentSpecificIntakeJobsObj.intake_status.id,
        registrationNumber: currentSpecificIntakeJobsObj.registration,
      });
    }
  }, [currentSpecificIntakeJobsObj, updateIntakeJobsForm]);

  useEffect(() => {
    if (updateTaskTableState === null || updateTaskTableState.length < 1) return;
    updateTaskTableState.forEach((row: any) => {
      // updating the form thats not related to the task table
      updateIntakeJobsForm.setFieldsValue({
        [`assign${row.key}`]: row[`assign${row.key}`],
        [`taskId${row.key}`]: row[`taskId${row.key}`],
        [`taskType${row.key}`]: row[`taskType${row.key}`],
        [`taskTitle${row.key}`]: row[`taskTitle${row.key}`],
        [`taskStatus${row.key}`]: row[`taskStatus${row.key}`],
        [`taskDescription${row.key}`]: row[`taskDescription${row.key}`],
      });
    });
  }, [updateIntakeJobsForm, updateTaskTableState]);

  useEffect(() => {
    let tempArray: any[] = [];
    let tempDict: any = {};
    /** A function that stores desired keys and values into a tempArray */
    const storeValue = (task: IReceivedIntakeJobsObj, index: number) => {
      tempArray.push({
        key: index,
        [`taskId${index}`]: task.id,
        [`taskTitle${index}`]: task.service_task.id,
        [`taskTitleString${index}`]: task.service_task.title,
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
      }
    };

    if (currentSpecificIntakeJobsObj) {
      // Execute function "storeValue" for every array index
      currentSpecificIntakeJobsObj.jobs.map(storeValue);
      setOriginalTaskArraylength(currentSpecificIntakeJobsObj.jobs.length);
      setCount(currentSpecificIntakeJobsObj.jobs.length);
    }

    // update the state with tempArray
    setUpdateTaskTableState(tempArray);
    setServiceTaskDropdown(tempDict);
  }, [
    setCount,
    intakeStatusArray,
    setUpdateTaskTableState,
    serviceTypeTaskDict,
    currentSpecificIntakeJobsObj,
    setServiceTaskDropdown,
  ]);

  useEffect(() => {
    if (incomingSpecificIntakeData) {
      setCurrentSpecificIntakeJobsObj(incomingSpecificIntakeData);
    }
  }, [incomingSpecificIntakeData]);

  useEffect(() => {
    if (specificIntakeJobsObj === undefined || specificIntakeJobsObj === null) return;
    const channel = cableApp.cable.subscriptions.create(
      { channel: 'JobMonitoringChannel', intake_id: specificIntakeJobsObj.id },
      {
        connected: () => console.log('specific intake connected'),
        received: (res: any) => setIncomingSpecificIntakeData(res.data),
      },
    );

    cableRef.current = channel;
  }, [cableRef, specificIntakeJobsObj, cableApp.cable.subscriptions]);

  /* ================================================== */
  /* ================================================== */

  return (
    <>
      {currentSpecificIntakeJobsObj ? (
        <Form
          className="specificintake__form"
          form={updateIntakeJobsForm}
          onKeyDown={(e) => {
            handleKeyDown(e, updateIntakeJobsForm);
          }}
          onFieldsChange={(e) => {
            if (updateTaskTableState === null) return;
            let tempTaskTableState = [...updateTaskTableState];

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

            if (labelName.includes('taskDescription')) {
              // add buffer so it wont force rerender on every keystroke
              updateCustomizedFieldHandler(formItemsObject, tempTaskTableState, labelName, currentValue, rowIndex);
            } else {
              let result = { ...formItemsObject, [labelName]: currentValue };
              (tempTaskTableState as any)[rowIndex] = result;
              // normally update the state
              setUpdateTaskTableState(tempTaskTableState);
            }
          }}
          onFinish={(values) => {
            onUpdateIntakeAndJobsFinish(values);
          }}
        >
          <Form.Item hidden name="intakeId" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <div className="specificintake__outerdiv">
            <div className="specificintake__nav-outerdiv">
              <div className="flex-align-center">
                <div
                  className="specificintake__back"
                  onClick={() => {
                    setInEditMode(false);
                    gsap.to('.task__table-div', {
                      duration: 1,
                      ease: 'ease',
                      x: '0',
                    });
                  }}
                >
                  <i className="fas fa-arrow-circle-left" /> <div className="specificintake__back-text">Back</div>
                </div>
              </div>

              <div className="flex-align-center">
                {inEditMode && <div style={{ marginRight: '1rem' }}>(Editing)</div>}
                {!inEditMode && (
                  <>
                    <Popconfirm
                      title={`Sure to delete Intake for ${currentSpecificIntakeJobsObj.registration}?`}
                      onConfirm={() => onDeleteIntakeSummary(currentSpecificIntakeJobsObj.id)}
                    >
                      <span className="specificintake__button-task specificintake__button-task--delete">
                        <i className="fas fa-trash-alt"></i>
                      </span>
                    </Popconfirm>

                    <span
                      className="specificintake__button-task specificintake__button-task--edit"
                      onClick={() => setInEditMode(true)}
                    >
                      <i className="fas fa-pen"></i>
                    </span>
                  </>
                )}
                {inEditMode && (
                  <>
                    <span
                      className="specificintake__button-task specificintake__button-task--cancel"
                      onClick={() => {
                        // when user is trying to cancel everything
                        // restore the array to original
                        if (updateTaskTableState === null) return;
                        let tempArray = [...updateTaskTableState];
                        setUpdateTaskTableState(tempArray.slice(0, originalTaskArraylength));
                        setInEditMode(false);
                      }}
                    >
                      Cancel
                    </span>

                    <Button
                      loading={loading !== undefined && loading}
                      className="specificintake__button-task specificintake__button-task--save"
                      onClick={() => updateIntakeJobsForm.submit()}
                    >
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>
            <section className="specificintake__section-top">
              <div className="specificintake__row--registration">
                <div className="flex">
                  {inEditMode ? (
                    <Form.Item
                      className="specificintake__form-item--registration"
                      name="registrationNumber"
                      rules={[{ required: true, message: 'Input Registration Number here!' }]}
                    >
                      <Input placeholder="e.g. DCG1199" className="specificintake__form-item--registration-input" />
                    </Form.Item>
                  ) : (
                    <div className="specificintake__registration-div">{currentSpecificIntakeJobsObj.registration}</div>
                  )}

                  {inEditMode ? (
                    <div>
                      <Form.Item
                        name="bay"
                        className="specificintake__form-item--bay"
                        rules={[{ required: true, message: 'Select a bay!' }]}
                      >
                        <Select className="specificintake__select--bay">
                          {baysList.map((child) => (
                            <Option value={child} key={uuidv4()}>
                              {child}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  ) : (
                    <div className="specificintake__bay-div">
                      {currentSpecificIntakeJobsObj.bay === '' ||
                      currentSpecificIntakeJobsObj.bay === null ||
                      currentSpecificIntakeJobsObj.bay === undefined
                        ? '-'
                        : currentSpecificIntakeJobsObj.bay}
                    </div>
                  )}
                </div>
                {inEditMode ? (
                  <div className="flex-align-center">
                    <Form.Item label="" name="pickup" valuePropName="checked" className="specificintake__form-checkbox">
                      <Checkbox>Ready for Pick Up</Checkbox>
                    </Form.Item>
                  </div>
                ) : (
                  <div className="specificintake__pickup-div">
                    Ready to Pick Up:
                    <div
                      className={`specificintake__pickup-circle ${
                        currentSpecificIntakeJobsObj.pick_up
                          ? 'specificintake__pickup-circle--green'
                          : 'specificintake__pickup-circle--red'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
              <div className="specificintake__box-outerdiv">
                {/* ==================================================== */}
                {/* Intake Status */}
                {/* ==================================================== */}
                <div className="specificintake__box specificintake__box--status">
                  <Tooltip title="Intake Status">
                    <div className="specificintake__box-left">
                      <i className="fas fa-tasks specificintake__box-icon"></i>
                    </div>
                  </Tooltip>
                  <div className="specificintake__box-right">
                    {inEditMode ? (
                      <Form.Item
                        name="intakeStatus"
                        style={{ margin: 0 }}
                        className="specificintake__form-item--intake"
                        rules={[
                          {
                            required: true,
                            message: `Please choose a status!`,
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select a job status"
                          optionFilterProp="children"
                          className="specificintake__select"
                          filterOption={(input, option) =>
                            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
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
                    ) : (
                      <> {currentSpecificIntakeJobsObj.intake_status.title}</>
                    )}
                  </div>
                </div>

                {/* ==================================================== */}
                {/* Intake Time */}
                {/* ==================================================== */}
                <div className="specificintake__box specificintake__box--dock">
                  <Tooltip title="Docked Date & Time">
                    <div className="specificintake__box-left">
                      <i className="fas fa-clock specificintake__box-icon"></i>
                    </div>
                  </Tooltip>

                  <div className="specificintake__box-right">
                    <div>
                      <div>{moment(currentSpecificIntakeJobsObj.created_at).format('YYYY-MM-DD')}</div>
                      <div>{moment(currentSpecificIntakeJobsObj.created_at).format('HH:mm A')}</div>
                    </div>
                  </div>
                </div>

                {/* ==================================================== */}
                {/* Intake Users */}
                {/* ==================================================== */}
                <div className="specificintake__box specificintake__box--users">
                  <Tooltip title="Task Assignees">
                    <div className="specificintake__box-left">
                      <i className="fas fa-users specificintake__box-icon"></i>
                    </div>
                  </Tooltip>
                  <div className="specificintake__box-right specificintake__box-right--users">
                    {inEditMode ? (
                      <Form.Item name="assign" className="specificintake__form-item--users" style={{ margin: 0 }}>
                        <Select
                          mode="multiple"
                          placeholder="Please select mechanics"
                          optionFilterProp="children"
                          className="specificintake__select"
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
                                  {`${user.first_name} ${user.last_name} - ${user.roles.title}`}
                                </Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                    ) : (
                      <div>
                        {currentSpecificIntakeJobsObj.intake_users.length > 0
                          ? currentSpecificIntakeJobsObj.intake_users.map((child) => (
                              <div key={uuidv4()}>
                                {child.user.first_name} {child.user.last_name}
                              </div>
                            ))
                          : '-'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="specificintake__lastupdated-div">
                Last Updated: {moment(currentSpecificIntakeJobsObj.updated_at).format('YYYY-MM-DD HH:mm A')}
              </div>
            </section>
            <section className="specificintake__section-bottom">
              <div className="specificintake__section-bottom-title">List of Services</div>
              {updateTaskTableState && (
                <Table
                  bordered
                  // components={{
                  //   body: {
                  //     cell: EditableCell,
                  //   },
                  // }}
                  className="specificintake__table"
                  scroll={{ y: 300 }}
                  dataSource={updateTaskTableState}
                  columns={
                    inEditMode
                      ? (taskColumnsSettings as any)
                      : (taskColumnsSettings.filter((child) => child.title !== 'Actions') as any)
                  } //remove actions when its in edit mode
                  // columns={mergedColumns}
                  // rowClassName="editable-row"
                  // columns={convertHeader(taskColumns, setTaskColumns)}
                  pagination={false}
                />
              )}
              {inEditMode && (
                <div className="specificintake__add-div">
                  <Button onClick={() => handleAdd()} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
                  </Button>
                </div>
              )}
            </section>
          </div>
        </Form>
      ) : (
        <div className="specificintake__loading-outerdiv">
          <div className="specificintake__loading">
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
  specificIntakeJobsObj?: TReceivedSpecificIntakeJobsObj | null;
  intakeStatusArray?: TReceivedIntakeStatusObj[] | null;
  usersByRolesArray?: TReceivedUserInfoObj[] | null;
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
}
const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    loading: state.task.loading,
    specificIntakeJobsObj: state.task.specificIntakeJobsObj,
    intakeStatusArray: state.dashboard.intakeStatusArray,
    usersByRolesArray: state.task.usersByRolesArray,
    serviceTypesArray: state.dashboard.serviceTypesArray,
  };
};

interface DispatchProps {
  onDeleteTask: typeof actions.deleteTask;
  onClearTaskState: typeof actions.clearTaskState;
  onGetServiceTypes: typeof actions.getServiceTypes;
  onDeleteIntakeSummary: typeof actions.deleteIntakeSummary;
  onUpdateIntakeSummary: typeof actions.updateIntakeSummary;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetServiceTypes: () => dispatch(actions.getServiceTypes()),
    onClearTaskState: () => dispatch(actions.clearTaskState()),
    onDeleteTask: (intake_id, task_id) => dispatch(actions.deleteTask(intake_id, task_id)),
    onDeleteIntakeSummary: (intake_id) => dispatch(actions.deleteIntakeSummary(intake_id)),
    onUpdateIntakeSummary: (intake_id, intakeJobsFormData) =>
      dispatch(actions.updateIntakeSummary(intake_id, intakeJobsFormData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecificIntake);

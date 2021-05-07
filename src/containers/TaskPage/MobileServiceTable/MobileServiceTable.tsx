import React, { useState } from 'react';
import './MobileServiceTable.scss';
/* components */
/* 3rd party lib */
import gsap from 'gsap';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { ScheduleOutlined } from '@ant-design/icons';
import { Form, message, Select, Input, Modal, Empty } from 'antd';
/* Util */
import { RootState } from 'src';
import { IServiceTaskDropdown } from '../TaskPage';
import { TServiceTypeTaskDict } from 'src/store/types/task';
import { TReceivedServiceTypesObj } from 'src/store/types/dashboard';
import { IServiceTableChildState, TServiceTableState } from '../CreateSpecificIntake/CreateSpecificIntake';

const { Option } = Select;
interface MobileServiceTableProps {
  handleAdd: () => void;
  intakeJobsForm: any;
  auth_token?: string | null;
  serviceTableState: TServiceTableState;
  serviceTaskDropdown: IServiceTaskDropdown;
  serviceTypeTaskDict: TServiceTypeTaskDict | null;
  setServiceTaskDropdown: React.Dispatch<React.SetStateAction<IServiceTaskDropdown>>;
  setServiceTableState: React.Dispatch<React.SetStateAction<TServiceTableState>>;
}

type Props = MobileServiceTableProps & StateProps;

const MobileServiceTable: React.FC<Props> = ({
  handleAdd,
  auth_token,
  intakeJobsForm,
  serviceTableState,
  serviceTypesArray,
  serviceTaskDropdown,
  serviceTypeTaskDict,
  setServiceTableState,
  setServiceTaskDropdown,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const [showAddService, setShowAddService] = useState(false);

  const disappearAnimation = (index: number, taskChild: IServiceTableChildState, dataSource: TServiceTableState) => {
    gsap.to(`.mobileservice__row-${index}`, {
      x: '150%',
      duration: 0.25,
      height: 0,
      onComplete: () => {
        let tempServiceTaskDropdown = { ...serviceTaskDropdown };
        delete tempServiceTaskDropdown[taskChild.key]; //remove the object once deleted if not the new key will have issue
        setServiceTaskDropdown(tempServiceTaskDropdown);

        let copiedObj = { ...dataSource };
        delete copiedObj[taskChild.key];
        setServiceTableState(copiedObj);
      },
    });
  };

  /* ================================================== */
  /*  component */
  /* ================================================== */

  const ServiceTaskFormItem = ({ record }: { record: IServiceTableChildState }) => {
    if (Object.keys(serviceTaskDropdown).includes(record.key.toString())) {
      let dropdownArrayExist = Object.keys(serviceTaskDropdown[record.key]).length > 0;
      let dropdownArray = serviceTaskDropdown[record.key].serviceTaskDropdownArray;

      return (
        <Form.Item
          // label="Service Type"
          name={`taskTitle${record.key}`}
          className="createspecificintake__form-item--task mobileservice__form-item"
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please choose a service task!`,
            },
          ]}
        >
          <Select
            placeholder="Select a Task title"
            className="createspecificintake__select createspecificintake__select--task mobileservice__input"
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
          className="createspecificintake__form-item--task mobileservice__form-item"
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
            className="createspecificintake__select createspecificintake__select--task createspecificintake__select--disabled mobileservice__input"
          >
            <Option value="">Select a Task</Option>
          </Select>
        </Form.Item>
      );
    }
  };

  const TaskTimeFormItem = ({ record }: { record: IServiceTableChildState }) => {
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

    return (
      <>
        <Form.Item
          // label="Description"
          className="createspecificintake__form-item--task mobileservice__form-item"
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
            disabled={serviceTypeIsNotRepair}
            type="number"
            className={`createspecificintake__form-input mobileservice__input ${
              serviceTypeIsNotRepair ? 'createspecificintake__form-input--disabled' : ''
            }`}
            placeholder="Estimate time here"
          />
        </Form.Item>
      </>
    );
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <Modal
        className="mobileservice__modal"
        title="Manage Service"
        visible={showAddService}
        okText="Done"
        onCancel={() => setShowAddService(false)}
        onOk={() => {
          let showError = false;
          for (var i = 0; i < Object.values(serviceTableState).length; i++) {
            let arrayItemKey = Object.values(serviceTableState)[i].key;

            let object = serviceTableState[arrayItemKey] as any;
            if (
              object[`taskType${arrayItemKey}`] === '' ||
              object[`taskTitle${arrayItemKey}`] === '' ||
              object[`taskTime${arrayItemKey}`] === ''
            ) {
              // if either of these fields are empty do something
              showError = true;
              break;
            }
          }
          if (showError) {
            message.error('Fill up the required fields!');
          } else {
            setShowAddService(false);
          }
        }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div className="mobileservice__modal-top">
          <div>Total jobs: {Object.values(serviceTableState).length}</div>
          {auth_token && (
            <span className="mobileservice__button-add" onClick={() => handleAdd()}>
              <i className="fas fa-plus-square"></i>&nbsp;&nbsp;Add service
            </span>
          )}
        </div>

        <div className="mobileservice__modal-body">
          {Object.values(serviceTableState).length === 0 ? (
            <Empty />
          ) : (
            Object.values(serviceTableState).map((taskChild, index) => (
              <React.Fragment key={`mobiletask${taskChild.key}`}>
                {auth_token ? (
                  <div className={`mobileservice__row-div-parent mobileservice__row-${index}`}>
                    <div className="mobileservice__row-number">{index + 1}</div>
                    <div className="mobileservice__row-div">
                      {/* ============================================================ */}
                      {/* Service Type */}
                      {/* ============================================================ */}
                      <div className="mobileservice__form-row">
                        <div className="mobileservice__form-row-label">Type:</div>
                        {auth_token ? (
                          <Form.Item
                            // label="Service Type"
                            name={`taskType${taskChild.key}`}
                            className="createspecificintake__form-item--task mobileservice__form-item"
                            style={{ margin: 0 }}
                            rules={[
                              {
                                required: true,
                                message: `Please choose a service type!`,
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select a Job Type"
                              className="createspecificintake__select createspecificintake__select--task mobileservice__input"
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
                        ) : (
                          <div>
                            {serviceTypesArray !== null &&
                              serviceTypesArray !== undefined &&
                              serviceTypesArray?.filter(
                                (child) => child.id === (taskChild as any)[`taskType${taskChild.key}`],
                              )[0].title}
                          </div>
                        )}
                      </div>

                      {/* ============================================================ */}
                      {/* Service Task */}
                      {/* ============================================================ */}
                      <div className="mobileservice__form-row">
                        <div className="mobileservice__form-row-label">Task:</div>
                        <ServiceTaskFormItem record={taskChild} />
                      </div>

                      {/* ============================================================ */}
                      {/* Task Time */}
                      {/* ============================================================ */}
                      <div className="mobileservice__form-row">
                        <div className="mobileservice__form-row-label">Time:</div>
                        <TaskTimeFormItem record={taskChild} />
                      </div>
                      {/* ============================================================ */}
                      {/* Description */}
                      {/* ============================================================ */}
                      <div className="mobileservice__form-row">
                        <div className="mobileservice__form-row-label">Desc:</div>
                        <Form.Item
                          // label="Description"
                          className="createspecificintake__form-item--task mobileservice__form-item"
                          name={`taskDescription${taskChild.key}`}
                          style={{ margin: 0 }}
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                        >
                          <Input
                            className="createspecificintake__form-input mobileservice__input"
                            placeholder="Type description here"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    {/* only show if login */}
                    {auth_token && (
                      <div
                        className="mobileservice__button-delete"
                        onClick={() => {
                          if (serviceTableState === null) return;
                          const dataSource = { ...serviceTableState };
                          // reset all the values whenever delete occurs
                          intakeJobsForm.setFieldsValue({
                            [`taskTitle${taskChild.key}`]: '',
                            [`taskType${taskChild.key}`]: '',
                            [`taskDescription${taskChild.key}`]: '',
                            [`taskTime${taskChild.key}`]: '',
                          });
                          disappearAnimation(index, taskChild, dataSource);
                        }}
                      >
                        <i className="far fa-trash-alt"></i>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mobileservice__service-div">
                    {/* div for service when user is not logged in */}
                    <div className="mobileservice__service-index">{index + 1}</div>
                    <div className="mobileservice__service-top">
                      <div className="mobileservice__service-type">
                        <span className="mobileservice__service-label">Service Type:</span>
                        <span className="mobileservice__service-content">
                          {serviceTypesArray !== null &&
                            serviceTypesArray !== undefined &&
                            serviceTypesArray?.filter(
                              (child) => child.id === (taskChild as any)[`taskType${taskChild.key}`],
                            )[0].title}
                        </span>
                      </div>
                      <div className="mobileservice__service-clock">
                        <i className="fas fa-user-clock"></i>
                        <div className="mobileservice__service-clock-hours">
                          {(taskChild as any)[`taskTime${taskChild.key}`]} hrs
                        </div>
                      </div>
                    </div>

                    <div className="mobileservice__service-task">
                      <span className="mobileservice__service-label">Service Task:</span>
                      <span className="mobileservice__service-content">
                        {serviceTaskDropdown &&
                          serviceTaskDropdown[taskChild.key].serviceTaskDropdownArray &&
                          (serviceTaskDropdown as any)[taskChild.key].serviceTaskDropdownArray.filter(
                            (child: any) => child.id === (taskChild as any)[`taskTitle${taskChild.key}`],
                          )[0].title}
                      </span>
                    </div>
                    <div className="mobileservice__service-description">
                      <span className="mobileservice__service-label">Description:</span>
                      <div className="mobileservice__service-content mobileservice__service-content--desc">
                        {(taskChild as any)[`taskDescription${taskChild.key}`] === ''
                          ? '-'
                          : (taskChild as any)[`taskDescription${taskChild.key}`]}
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))
          )}
        </div>
      </Modal>
      {Object.values(serviceTableState).length > 0 ? (
        <div className="mobileservice__table-div">
          <div onClick={() => setShowAddService(true)} className="mobileservice__task-button">
            <section>
              <div className="mobileservice__task-innerdiv">
                <ScheduleOutlined className="mobileservice__task-icon" /> x
                <span className="mobileservice__task-text">{Object.values(serviceTableState).length}</span>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                {Object.values(serviceTableState).length} task added,
                <span>{auth_token ? ' click to edit' : ' click to view more'}</span>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="mobileservice__table-div mobileservice__table-div--empty">
          <Empty
            description={
              <span className="mobileservice__button-add" onClick={() => setShowAddService(true)}>
                <i className="fas fa-plus-square"></i>&nbsp;&nbsp;Add service
              </span>
            }
          />
        </div>
      )}
    </>
  );
};

interface StateProps {
  serviceTypesArray?: TReceivedServiceTypesObj[] | null;
}

const mapStateToProps = (state: RootState): StateProps | void => {
  return {
    serviceTypesArray: state.dashboard.serviceTypesArray,
  };
};

export default connect(mapStateToProps, null)(MobileServiceTable);

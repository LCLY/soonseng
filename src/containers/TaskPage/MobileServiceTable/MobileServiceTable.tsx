import React, { useEffect } from 'react';
import './MobileServiceTable.scss';
/* components */
/* 3rd party lib */
import gsap from 'gsap';
import { v4 as uuidv4 } from 'uuid';
import { Form, Select, Input, Empty } from 'antd';
/* Util */
import { TServiceTypeTaskDict } from 'src/store/types/task';
import { TCreateTaskTableState } from '../CreateSpecificIntake/CreateSpecificIntake';
import { IServiceTaskDropdown } from '../TaskPage';

const { Option } = Select;
interface MobileServiceTableProps {
  createTaskTableState: TCreateTaskTableState[];
  serviceTaskDropdown: IServiceTaskDropdown;
  serviceTypeTaskDict: TServiceTypeTaskDict | null;
  setCreateTaskTableState: React.Dispatch<React.SetStateAction<TCreateTaskTableState[]>>;
}

type Props = MobileServiceTableProps;

const MobileServiceTable: React.FC<Props> = ({
  createTaskTableState,
  serviceTaskDropdown,
  serviceTypeTaskDict,
  setCreateTaskTableState,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const disappearAnimation = (index: number, taskChild: TCreateTaskTableState, dataSource: TCreateTaskTableState[]) => {
    gsap.to(`.mobileservice__row-${index}`, {
      x: '150%',
      duration: 0.5,
      height: 0,
      onComplete: () => setCreateTaskTableState(dataSource.filter((item) => item.key !== taskChild.key)),
    });
  };

  /* ================================================== */
  /*  component */
  /* ================================================== */

  const ServiceTaskFormItem = ({ record }: { record: TCreateTaskTableState }) => {
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
            showSearch
            placeholder="Select a Task title"
            optionFilterProp="children"
            className="createspecificintake__select createspecificintake__select--task mobileservice__input"
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
            showSearch
            placeholder="Select a Task title"
            optionFilterProp="children"
            className="createspecificintake__select createspecificintake__select--task createspecificintake__select--disabled mobileservice__input"
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="">Select a Task</Option>
          </Select>
        </Form.Item>
      );
    }
  };

  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  useEffect(() => {
    // if (createTaskTableState.length === 0) {
    //   gsap.to('.mobileservice__table-div', { height: 'auto' });
    // } else {
    //   if (Object.keys(createTaskTableState).length > 2) {
    //     gsap.to('.mobileservice__table-div', { height: '40rem' });
    //   } else {
    //     gsap.to('.mobileservice__table-div', { height: '14rem' });
    //   }
    // }
  }, [createTaskTableState]);

  /* ================================================== */
  /* ================================================== */
  return (
    <div className="mobileservice__table-div">
      {createTaskTableState.length > 0 ? (
        createTaskTableState.map((taskChild, index) => (
          <div className={`mobileservice__row-div-parent mobileservice__row-${index}`} key={taskChild.key}>
            <div className="mobileservice__row-number">{index + 1}</div>
            <div className="mobileservice__row-div">
              <div className="mobileservice__form-row">
                <div className="mobileservice__form-row-label">Type:</div>
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
                    showSearch
                    placeholder="Select a Job Type"
                    optionFilterProp="children"
                    className="createspecificintake__select createspecificintake__select--task mobileservice__input"
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
              </div>
              <div className="mobileservice__form-row">
                <div className="mobileservice__form-row-label">Task:</div> <ServiceTaskFormItem record={taskChild} />
              </div>
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
              <div className="mobileservice__form-row">
                <div className="mobileservice__form-row-label">Time:</div>
                <Form.Item
                  // label="Description"
                  className="createspecificintake__form-item--task mobileservice__form-item"
                  name={`taskTime${taskChild.key}`}
                  style={{ margin: 0 }}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input
                    className="createspecificintake__form-input mobileservice__input"
                    placeholder="Type time here"
                  />
                </Form.Item>
              </div>
            </div>

            <div
              className="mobileservice__button-delete"
              onClick={() => {
                if (createTaskTableState === null) return;
                const dataSource = [...createTaskTableState];
                // setCount(count - 1);
                disappearAnimation(index, taskChild, dataSource);
              }}
            >
              <i className="far fa-trash-alt"></i>
            </div>
          </div>
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default MobileServiceTable;

import React, { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import './IntakeJobsModal.scss';
/* components */
import TaskFormItems from '../Crud/FormItems/TaskFormItems';
/* 3rd party lib */
import { Modal } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
/* Util */
import { ActionCableContext } from 'src/index';
import { TServiceTypeTaskDict } from 'src/store/types/task';
import { IServiceTaskDropdown, TTaskTableState } from 'src/containers/TaskPage/TaskPage';

interface IntakeJobsModalProps {
  taskTableState: TTaskTableState[] | null;
  setTaskTableState: React.Dispatch<React.SetStateAction<TTaskTableState[] | null>>;
  /** The title of the modal on top  */
  modalTitle: string;
  modalWidth?: number;
  /** boolean to know if this modal is for dashboard or other place */
  isDashboard?: boolean;
  /** To show or hide the modal  */
  visible: boolean;
  /** for spinner of the modal to show loading  */
  loading: boolean;
  /** The form instance from antd  */
  antdForm?: FormInstance<any>;
  /** index key to change the show modal's boolean  */
  indexKey: string;
  /** warning text when user tries to delete, type text after "You are deleting [maybe a series title here]"  */
  warningText?: string;
  /** Backup text jz incase something's wrong*/
  backupWarningText?: string;
  showModal: {
    [key: string]: boolean;
  };
  setShowModal: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  /** custom delete text component jz incase need to overrwite the whole content*/
  customDeleteTextComponent?: React.ReactNode;
  customDeleteButtonText?: string | null;
  /** onFinish method when user click ok*/
  onFinish?: (values: any) => void;
  /** onDelete method when user is deleting*/
  onDelete?: () => void;
  /** crud method - create | update | delete */
  crud: 'create' | 'update' | 'delete';
  intake_id?: number | null;
  editingKey: string;
  setEditingKey: React.Dispatch<React.SetStateAction<string>>;
  serviceTypeTaskDict: TServiceTypeTaskDict;
  setServiceTypeTaskDict: React.Dispatch<React.SetStateAction<TServiceTypeTaskDict | null>>;
  serviceTaskDropdown: IServiceTaskDropdown;
  setServiceTaskDropdown: React.Dispatch<React.SetStateAction<IServiceTaskDropdown>>;
}

type Props = IntakeJobsModalProps;

const IntakeJobsModal: React.FC<Props> = ({
  crud,
  intake_id,
  modalTitle,
  visible,
  indexKey,
  antdForm,
  loading,
  count,
  setCount,
  editingKey,
  setEditingKey,
  showModal,
  warningText,
  modalWidth = 520,
  backupWarningText = 'this item',
  onFinish,
  onDelete,
  setShowModal,
  taskTableState,
  setTaskTableState,
  serviceTypeTaskDict,
  serviceTaskDropdown,
  setServiceTaskDropdown,
  setServiceTypeTaskDict,
  customDeleteButtonText,
  customDeleteTextComponent,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  const [incomingData, setIncomingData] = useState<any | null>(null);
  const cableApp = useContext(ActionCableContext);
  const cableRef = useRef() as MutableRefObject<any>;
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    if (intake_id === undefined || intake_id === null) return;
    const channel = cableApp.cable.subscriptions.create(
      { channel: 'JobMonitoringChannel', intake_id: intake_id },
      {
        connected: () => console.log('specific intake connected'),
        received: (res: any) => setIncomingData(res.data),
      },
    );

    cableRef.current = channel;
  }, [cableRef, intake_id, cableApp.cable.subscriptions]);

  console.log('specific intake incomingdata', incomingData);
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      {crud === 'delete' ? (
        <Modal
          title={
            <div className="dashboard__delete-header">
              <ExclamationCircleOutlined className="dashboard__delete-icon" />
              {modalTitle}
            </div>
          }
          visible={visible}
          onOk={() => {
            if (onDelete !== undefined) onDelete();
          }}
          onCancel={() => setShowModal({ ...showModal, [indexKey]: false })}
          okText={customDeleteButtonText ? customDeleteButtonText : 'Yes, delete it'}
          confirmLoading={loading}
          cancelText="Cancel"
        >
          {customDeleteTextComponent ? (
            customDeleteTextComponent
          ) : (
            <>
              You are deleting&nbsp;
              <>
                {warningText === '' || warningText === null || warningText === undefined ? (
                  <>{backupWarningText}</>
                ) : (
                  <span className="dashboard__delete-message">{`${warningText}`}</span>
                )}
              </>
              , this action is permanent. Are you sure?
            </>
          )}
        </Modal>
      ) : (
        <Modal
          className="catalog__modal"
          centered
          width={modalWidth}
          title={modalTitle}
          visible={visible}
          onOk={() => {
            if (antdForm !== undefined) {
              antdForm.submit();
            }
          }}
          confirmLoading={loading}
          onCancel={() => {
            if (antdForm === undefined) return;
            setEditingKey('');
            setTaskTableState(null);
            setServiceTaskDropdown({});
            setCount(0);
            if (crud === 'create') {
              antdForm.resetFields();
            }
            setShowModal({ ...showModal, [indexKey]: false }); //close modal on cancel
          }}
        >
          {onFinish !== undefined && antdForm !== undefined && (
            <TaskFormItems
              crud={crud}
              count={count}
              setCount={setCount}
              antdForm={antdForm}
              onFinish={onFinish}
              editingKey={editingKey}
              setEditingKey={setEditingKey}
              serviceTaskDropdown={serviceTaskDropdown}
              setServiceTaskDropdown={setServiceTaskDropdown}
              taskTableState={taskTableState}
              serviceTypeTaskDict={serviceTypeTaskDict}
              setServiceTypeTaskDict={setServiceTypeTaskDict}
              setTaskTableState={setTaskTableState}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default IntakeJobsModal;

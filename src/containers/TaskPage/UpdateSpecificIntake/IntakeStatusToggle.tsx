import React, { useState } from 'react';
/* components */
/* 3rd party lib */
import { Popconfirm, Form, Input, Radio } from 'antd';
/* Util */
import { AppActions } from 'src/store/types';
import { TReceivedUserInfoObj } from 'src/store/types/auth';
import { TReceivedIntakeStatusObj } from 'src/store/types/dashboard';
import { TReceivedSpecificIntakeJobsObj } from 'src/store/types/task';

interface IntakeStatusToggleProps {
  showPopConfirm: boolean;
  goBackToIntakes: () => any;
  //   intakeStatusDescription: string;
  currentIntakeStatus: number;
  intakeStatus: TReceivedIntakeStatusObj;
  userInfoObj?: TReceivedUserInfoObj | null;
  currentSpecificIntakeJobsObj: TReceivedSpecificIntakeJobsObj;
  setStatusUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPopConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentIntakeStatus: React.Dispatch<React.SetStateAction<number>>;
  //   setIntakeStatusDescription: React.Dispatch<React.SetStateAction<string>>;
  onSetToggleIntakeStatus: (intake_id: number, intake_status_id: number, description: string) => AppActions;
}

type Props = IntakeStatusToggleProps;

const IntakeStatusToggle: React.FC<Props> = ({
  userInfoObj,
  intakeStatus,
  goBackToIntakes,
  //   showPopConfirm,
  setStatusUpdate,
  //   setShowPopConfirm,
  //   currentIntakeStatus,
  setCurrentIntakeStatus,
  onSetToggleIntakeStatus,
  //   intakeStatusDescription,
  //   setIntakeStatusDescription,
  currentSpecificIntakeJobsObj,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [intakeStatusDescription, setIntakeStatusDescription] = useState('');
  //   const [showPopConfirm, setShowPopConfirm] = useState(false);
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  return (
    <Radio.Button value={intakeStatus.id}>
      <Popconfirm
        //   visible={currentIntakeStatus === currentSpecificIntakeJobsObj.intake_status.id ? false : showPopConfirm}
        title={
          <>
            <div>Status Update Description</div>
            <Form.Item className="updatespecificintake__form-item make__form-item" rules={[{ required: false }]}>
              <Input
                placeholder="Type description here"
                value={intakeStatusDescription}
                onChange={(e) => setIntakeStatusDescription(e.target.value)}
              />
            </Form.Item>
          </>
        }
        onConfirm={() => {
          if (userInfoObj !== undefined && userInfoObj !== null) {
            setStatusUpdate(true);
            goBackToIntakes();
            setCurrentIntakeStatus(intakeStatus.id);
            onSetToggleIntakeStatus(currentSpecificIntakeJobsObj.id, intakeStatus.id, intakeStatusDescription);
          }
        }}
        onCancel={() => {
          setStatusUpdate(false);
          setIntakeStatusDescription('');
        }}
        okText="Confirm"
        cancelText="Cancel"
      >
        {intakeStatus.title}
      </Popconfirm>
    </Radio.Button>
  );
};

export default IntakeStatusToggle;

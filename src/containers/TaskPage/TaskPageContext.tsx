import { createContext } from 'react';
import { IIntakeDict } from './TaskPage';
import { TReceivedIntakeSummaryObj } from 'src/store/types/task';

interface IIncomingData {
  data: TReceivedIntakeSummaryObj;
  action: string;
}

interface MobileTaskTableProps {
  intakeDict: IIntakeDict | null;
  updateIntakeJobsForm: any;
  goToUpdateSpecificIntake: () => void;
  onGetSpecificIntakeJobs: (key: number) => void;
  incomingData: IIncomingData | null;
  setIncomingData: React.Dispatch<React.SetStateAction<IIncomingData | null>>;
}

export const TaskPageContext = createContext<MobileTaskTableProps | null>(null);

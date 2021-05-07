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
  // checkItemsHeight: () => void;
  goToUpdateSpecificIntake: () => void;
  onGetSpecificIntakeJobs: (key: number) => void;
  incomingData: IIncomingData | null;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  setIncomingData: React.Dispatch<React.SetStateAction<IIncomingData | null>>;
}

export const TaskPageContext = createContext<MobileTaskTableProps | null>(null);

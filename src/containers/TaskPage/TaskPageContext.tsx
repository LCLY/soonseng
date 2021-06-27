import { createContext } from 'react';
import { IIntakeDict } from './TaskPage';
import { AppActions } from 'src/store/types';
import { TReceivedUserInfoObj } from 'src/store/types/auth';
import { TReceivedIntakeSummaryObj } from 'src/store/types/task';

interface IIncomingData {
  data: TReceivedIntakeSummaryObj;
  action: string;
}

interface MobileTaskTableProps {
  filterText: string;
  // checkItemsHeight: () => void;
  intakeDict: IIntakeDict | null;
  updateIntakeJobsForm: any;
  goToUpdateSpecificIntake: () => void;
  onGetSpecificIntakeJobs: (key: number) => void;
  incomingData: IIncomingData | null;
  onSetToggleUserAssign: (intake_id: number) => AppActions;
  userInfoObj?: TReceivedUserInfoObj | null;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  setIncomingData: React.Dispatch<React.SetStateAction<IIncomingData | null>>;
}

export const TaskPageContext = createContext<MobileTaskTableProps | null>(null);

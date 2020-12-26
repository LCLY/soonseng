import { createContext } from 'react';
import { TyreSectionProps } from './StepSections/TyreSection';
import { LengthSectionProps } from './StepSections/LengthSection';
import { BodySectionProps } from './StepSections/BodySection';
import { OverviewComponentProps } from './StepSections/OverviewComponent';
import { BodyMakeSectionProps } from './StepSections/BodyMakeSection';
import { AccessorySectionProps } from './StepSections/AccessorySection';

export const SalesPageContext = createContext<
  | (TyreSectionProps &
      LengthSectionProps &
      BodySectionProps &
      OverviewComponentProps &
      BodyMakeSectionProps &
      AccessorySectionProps)
  | null
>(null);

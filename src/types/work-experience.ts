import { Moment } from 'moment';

// Types
import { Company } from './company';

export enum EmploymentTypes {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  SELF_EMPLOYED = 'self_employed',
  FREELANCE = 'freelance',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  APPRENTICESHIP = 'apprenticeship',
  SEASONAL = 'seasonal',
}

export interface WorkExperience {
  _id: string;
  title: string;
  employmentType: EmploymentTypes;
  company: Company;
  location: string;
  current: boolean;
  startDate: Moment | Date | string;
  endDate: Moment | Date | string;
  description: string;
}

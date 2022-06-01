import { Moment } from 'moment';

// Types
import { GraphQLModel, GraphQLModelResponse } from './graphql';
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

interface BaseWorkExperience {
  position: string;
  type: EmploymentTypes;
  company: GraphQLModelResponse<Company>;
  location: string;
  is_current: boolean;
  start_date: Moment | Date | string;
  end_date: Moment | Date | string;
  description: string;
}

export interface WorkExperience extends GraphQLModel<BaseWorkExperience> {}

import { Moment } from 'moment';

// Types
import { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import { School } from './school';

interface IBaseEducation {
  school: IGraphQLModelResponse<School>;
  degree: string | null;
  field: string;
  start_date: Moment | Date | string;
  end_date: Moment | Date | string;
  grade: string;
  description: string;
}

export interface IEducation extends IGraphQLModel<BaseEducation> {}

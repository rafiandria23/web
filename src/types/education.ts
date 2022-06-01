import { Moment } from 'moment';

// Types
import { GraphQLModel, GraphQLModelResponse } from './graphql';
import { School } from './school';

interface BaseEducation {
  school: GraphQLModelResponse<School>;
  degree: string | null;
  field: string;
  start_date: Moment | Date | string;
  end_date: Moment | Date | string;
  grade: string;
  description: string;
}

export interface Education extends GraphQLModel<BaseEducation> {}

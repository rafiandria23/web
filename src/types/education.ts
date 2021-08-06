import { Moment } from 'moment';

// Types
import { School } from './school';

export interface Education {
  _id: string;
  school: School;
  degree: string;
  field: string;
  startDate: Moment | Date | string;
  endDate: Moment | Date | string;
  grade: string;
  description: string;
}

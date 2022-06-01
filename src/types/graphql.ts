import { Moment } from 'moment';

export interface GraphQLModelBaseAttributes {
  createdAt: Moment | Date | string;
  updatedAt: Moment | Date | string;
}

export interface GraphQLModel<T> {
  id: string;
  attributes: T & GraphQLModelBaseAttributes;
}

export interface GraphQLModelResponse<T> {
  data: T;
}

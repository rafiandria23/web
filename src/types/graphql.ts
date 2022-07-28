import { Moment } from 'moment';

// Types
import { IPagination } from '@/types';

export interface IGraphQLModelBaseAttributes {
  createdAt: Moment | Date | string;
  updatedAt: Moment | Date | string;
}

export interface IGraphQLModel<T> {
  id: string;
  attributes: T & IGraphQLModelBaseAttributes;
}

export interface IGraphQLModelResponseMeta {
  pagination: IPagination;
}

export interface IGraphQLModelResponse<T> {
  meta: IGraphQLModelResponseMeta;
  data: T;
}

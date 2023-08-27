import type { Dayjs } from 'dayjs';

import type { DateTime } from './datetime';
import type { IPagination } from './page';

export interface IGraphQLModelBaseAttributes {
  publishedAt: DateTime;
  createdAt: DateTime;
  updatedAt: DateTime;
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

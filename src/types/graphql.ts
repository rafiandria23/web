import type { Dayjs } from 'dayjs';

import type { IPagination } from '@/types/page';

export interface IGraphQLModelBaseAttributes {
  publishedAt: Dayjs | Date | string;
  createdAt: Dayjs | Date | string;
  updatedAt: Dayjs | Date | string;
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

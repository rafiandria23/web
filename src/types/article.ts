import { Moment } from 'moment';

// Types
import { UploadFile } from '.';
import { Tag } from './tag';

export interface Article {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover: UploadFile;
  tags: Tag[];
  published_at: Moment | Date | string;
  createdAt: Moment | Date | string;
  updatedAt: Moment | Date | string;
}

// Types
import { UploadFile } from './';
import { Tag } from './tag';

export interface Project {
  _id: string;
  title: string;
  overview: string;
  link: string;
  description: string;
  cover: UploadFile;
  tags: Tag[];
}

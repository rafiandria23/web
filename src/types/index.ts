import { Moment } from 'moment';

export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface UploadFile {
  _id: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: string;
  url: string;
  previewUrl: string;
  provider: string;
  createdAt: Moment | Date | string;
  updatedAt: Moment | Date | string;
}

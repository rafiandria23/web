// Types
import { UploadFile } from '.';

export interface School {
  _id: string;
  name: string;
  logo: UploadFile | null;
  link: string;
}

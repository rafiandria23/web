// Types
import { UploadFile } from '.';
import { WorkExperience } from './work-experience';

export interface Company {
  _id: string;
  name: string;
  logo: UploadFile;
  link: string;
  workExperiences: WorkExperience[];
}

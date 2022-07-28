// Types
import { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import { FileUpload } from './file';
import { WorkExperience } from './work-experience';

interface IBaseCompany {
  name: string;
  logo: IGraphQLModelResponse<FileUpload | null>;
  link: string;
  work_experiences: IGraphQLModelResponse<WorkExperience[]>;
}

export interface ICompany extends IGraphQLModel<BaseCompany> {}

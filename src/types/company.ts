// Types
import { GraphQLModel, GraphQLModelResponse } from './graphql';
import { FileUpload } from './file';
import { WorkExperience } from './work-experience';

interface BaseCompany {
  name: string;
  logo: GraphQLModelResponse<FileUpload | null>;
  link: string;
  work_experiences: GraphQLModelResponse<WorkExperience[]>;
}

export interface Company extends GraphQLModel<BaseCompany> {}

// Types
import { GraphQLModel, GraphQLModelResponse } from './graphql';
import { FileUpload } from './file';

interface BaseSchool {
  name: string;
  logo: GraphQLModelResponse<FileUpload | null>;
  link: string;
}

export interface School extends GraphQLModel<BaseSchool> {}

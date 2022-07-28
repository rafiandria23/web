// Types
import { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import { FileUpload } from './file';

interface IBaseSchool {
  name: string;
  logo: IGraphQLModelResponse<FileUpload | null>;
  link: string;
}

export interface ISchool extends IGraphQLModel<BaseSchool> {}

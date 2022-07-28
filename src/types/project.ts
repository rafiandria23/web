// Types
import { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import { FileUpload } from './file';
import { Tag } from './tag';

interface IBaseProject {
  title: string;
  slug: string;
  overview: string;
  link: string;
  description: string;
  cover: IGraphQLModelResponse<FileUpload>;
  tags: IGraphQLModelResponse<Tag[]>;
}

export interface IProject extends IGraphQLModel<BaseProject> {}

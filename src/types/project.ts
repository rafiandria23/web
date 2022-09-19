// Types
import { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import { IFileUpload } from './file';
import { ITag } from './tag';

interface IBaseProject {
  title: string;
  slug: string;
  overview: string;
  link: string;
  description: string;
  cover: IGraphQLModelResponse<IFileUpload>;
  tags: IGraphQLModelResponse<ITag[]>;
}

export interface IProject extends IGraphQLModel<IBaseProject> {}

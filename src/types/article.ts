// Types
import { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import { IFileUpload } from './file';
import { ITag } from './tag';

interface IBaseArticle {
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail: IGraphQLModelResponse<IFileUpload>;
  cover: IGraphQLModelResponse<IFileUpload>;
  tags: IGraphQLModelResponse<ITag[]>;
}

export interface IArticle extends IGraphQLModel<IBaseArticle> {}

import type { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import type { IFileUpload } from './file';
import type { ITag } from './tag';

interface IBaseArticle {
  title: string;
  slug: string;
  overview: string;
  content: string;
  thumbnail: IGraphQLModelResponse<IFileUpload>;
  cover: IGraphQLModelResponse<IFileUpload>;
  tags: IGraphQLModelResponse<ITag[]>;
}

export interface IArticle extends IGraphQLModel<IBaseArticle> {}

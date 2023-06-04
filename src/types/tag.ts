import type { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import type { IProject } from './project';
import type { IArticle } from './article';

interface IBaseTag {
  name: string;
  slug: string;
  projects: IGraphQLModelResponse<IProject[]>;
  articles: IGraphQLModelResponse<IArticle[]>;
}

export interface ITag extends IGraphQLModel<IBaseTag> {}

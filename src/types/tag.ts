// Types
import { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import { IProject } from './project';
import { IArticle } from './article';

interface IBaseTag {
  name: string;
  slug: string;
  projects: IGraphQLModelResponse<IProject[]>;
  articles: IGraphQLModelResponse<IArticle[]>;
}

export interface ITag extends IGraphQLModel<IBaseTag> {}

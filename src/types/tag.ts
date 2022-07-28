// Types
import { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import { Project } from './project';
import { Article } from './article';

interface IBaseTag {
  name: string;
  slug: string;
  projects: IGraphQLModelResponse<Project[]>;
  articles: IGraphQLModelResponse<Article[]>;
}

export interface ITag extends IGraphQLModel<BaseTag> {}

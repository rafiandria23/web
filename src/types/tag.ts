// Types
import { GraphQLModel, GraphQLModelResponse } from './graphql';
import { Project } from './project';
import { Article } from './article';

interface BaseTag {
  name: string;
  slug: string;
  projects: GraphQLModelResponse<Project[]>;
  articles: GraphQLModelResponse<Article[]>;
}

export interface Tag extends GraphQLModel<BaseTag> {}

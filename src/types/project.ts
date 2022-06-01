// Types
import { GraphQLModel, GraphQLModelResponse } from './graphql';
import { FileUpload } from './file';
import { Tag } from './tag';

interface BaseProject {
  title: string;
  slug: string;
  overview: string;
  link: string;
  description: string;
  cover: GraphQLModelResponse<FileUpload>;
  tags: Tag[];
}

export interface Project extends GraphQLModel<BaseProject> {}

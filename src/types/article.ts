// Types
import { GraphQLModel, GraphQLModelResponse } from './graphql';
import { FileUpload } from './file';
import { Tag } from './tag';

interface BaseArticle {
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail: GraphQLModelResponse<FileUpload>;
  cover: GraphQLModelResponse<FileUpload>;
  tags: GraphQLModelResponse<Tag[]>;
}

export interface Article extends GraphQLModel<BaseArticle> {}

import type { IGraphQLModel } from './graphql';

interface IBaseTag {
  name: string;
  overview: string;
  slug: string;
  color: string;
}

export interface ITag extends IGraphQLModel<IBaseTag> {}

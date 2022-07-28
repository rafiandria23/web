// Types
import { IGraphQLModel } from './graphql';

interface IBaseFileUpload {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: string;
  url: string;
  previewUrl: string;
  provider: string;
}

export interface IFileUpload extends IGraphQLModel<IBaseFileUpload> {}

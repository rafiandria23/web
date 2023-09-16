// Constants
import { FileFormat } from '@/constants/file';

import type { IGraphQLModel } from './graphql';

export interface IFIleFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

interface IBaseFile {
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
  formats: Record<FileFormat, IFIleFormat>;
}

export interface IFileUpload extends IGraphQLModel<IBaseFile> {}

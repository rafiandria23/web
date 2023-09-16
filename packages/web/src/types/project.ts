// Constants
import { ProjectStatus } from '@/constants/project';

import type { IGraphQLModel, IGraphQLModelResponse } from './graphql';
import type { IFileUpload } from './file';
import type { ITag } from './tag';

interface IBaseProject {
  title: string;
  overview: string;
  link: string;
  thumbnail: IGraphQLModelResponse<IFileUpload>;
  status: ProjectStatus;
  tags: IGraphQLModelResponse<ITag[]>;
}

export interface IProject extends IGraphQLModel<IBaseProject> {}

// Types
import { IGraphQLModel, IGraphQLModelResponse } from './graphql';

interface IBaseSkill {
  name: string;
}

export interface ISkill extends IGraphQLModel<IBaseSkill> {}

interface IBaseSkillCategory {
  name: string;
  skills: IGraphQLModelResponse<ISkill[]>;
}

export interface ISkillCategory extends IGraphQLModel<IBaseSkillCategory> {}

// Types
import { IGraphQLModel, IGraphQLModelResponse } from './graphql';

export enum SkillLevels {
  NOVICE = 'novice',
  ADVANCED_BEGINNER = 'advanced_beginner',
  COMPETENT = 'competent',
  PROFICIENT = 'proficient',
  EXPERT = 'expert',
}

interface IBaseSkill {
  name: string;
  level: SkillLevels;
}

export interface ISkill extends IGraphQLModel<BaseSkill> {}

interface IBaseSkillType {
  name: string;
  skills: IGraphQLModelResponse<Skill[]>;
}

export interface ISkillType extends IGraphQLModel<BaseSkillType> {}

// Types
import { GraphQLModel, GraphQLModelResponse } from './graphql';

export enum SkillLevels {
  NOVICE = 'novice',
  ADVANCED_BEGINNER = 'advanced_beginner',
  COMPETENT = 'competent',
  PROFICIENT = 'proficient',
  EXPERT = 'expert',
}

interface BaseSkill {
  name: string;
  level: SkillLevels;
}

export interface Skill extends GraphQLModel<BaseSkill> {}

interface BaseSkillType {
  name: string;
  skills: GraphQLModelResponse<Skill[]>;
}

export interface SkillType extends GraphQLModel<BaseSkillType> {}

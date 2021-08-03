export enum SkillLevels {
  NOVICE = 'novice',
  ADVANCED_BEGINNER = 'advanced_beginner',
  COMPETENT = 'competent',
  PROFICIENT = 'proficient',
  EXPERT = 'expert',
}

export interface Skill {
  _id: string;
  name: string;
  level: SkillLevels;
}

export interface SkillType {
  _id: string;
  name: string;
  skills: Skill[];
}

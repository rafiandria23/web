// Types
import { SkillLevels, Skill } from '@/types/skill';

export default function getSkillProgress(skill: Skill): number {
  switch (skill.attributes.level) {
    case SkillLevels.NOVICE:
      return 20;

    case SkillLevels.ADVANCED_BEGINNER:
      return 40;

    case SkillLevels.COMPETENT:
      return 60;

    case SkillLevels.PROFICIENT:
      return 80;

    case SkillLevels.EXPERT:
      return 100;

    default:
      return 0;
  }
}

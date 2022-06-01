// Types
import { SkillLevels, Skill } from '@/types/skill';

export default function getSkillLevel(skill: Skill): string {
  switch (skill.attributes.level) {
    case SkillLevels.NOVICE:
      return 'Novice';

    case SkillLevels.ADVANCED_BEGINNER:
      return 'Advanced Beginner';

    case SkillLevels.COMPETENT:
      return 'Competent';

    case SkillLevels.PROFICIENT:
      return 'Proficient';

    case SkillLevels.EXPERT:
      return 'Expert';

    default:
      return '';
  }
}

import update from 'immutability-helper';

// Types
import { SkillType, SkillLevels } from '@/types/skill';

export default function sortSkills(skillTypes: SkillType[]): SkillType[] {
  const levelNumbers: { level: SkillLevels; number: number }[] = [];

  Object.values(SkillLevels).forEach((level, number) =>
    levelNumbers.push({
      level,
      number,
    }),
  );

  const result = skillTypes.map((skillType) => {
    const sortedSkills = [...skillType.attributes.skills.data].sort(
      (s1, s2) => {
        const s1Number = levelNumbers.find(
          (levelNumber) => levelNumber.level === s1.attributes.level,
        )!.number;
        const s2Number = levelNumbers.find(
          (levelNumber) => levelNumber.level === s2.attributes.level,
        )!.number;

        return s2Number - s1Number;
      },
    );

    return update(skillType, {
      attributes: {
        skills: {
          data: {
            $set: sortedSkills,
          },
        },
      },
    });
  });

  return result;
}

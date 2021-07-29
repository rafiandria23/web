import moment from 'moment';
import update from 'immutability-helper';

// Types
import { Company } from '@/types/company';

export default function sortWorkExperiences(companies: Company[]): Company[] {
  const result = companies.map((company) => {
    const sortedWorkExperiences = [...company.workExperiences].sort(
      (we1, we2) => {
        if (we1.current && we2.current) {
          if (moment(we2.startDate).isAfter(moment(we1.startDate))) {
            return -1;
          }

          return 1;
        }

        if (we1.current || we2.current) {
          if (we1.current) {
            return -1;
          }

          if (we2.current) {
            return 1;
          }
        }

        if (moment(we2.startDate).isAfter(moment(we1.startDate))) {
          return -1;
        }

        return 0;
      },
    );

    return update(company, {
      workExperiences: {
        $set: sortedWorkExperiences,
      },
    });
  });

  return result.sort((comp1, comp2) => {
    if (
      moment(
        comp1.workExperiences[comp1.workExperiences.length - 1].startDate,
      ).isBefore(
        moment(
          comp2.workExperiences[comp2.workExperiences.length - 1].startDate,
        ),
      )
    ) {
      return 1;
    }

    return -1;
  });
}

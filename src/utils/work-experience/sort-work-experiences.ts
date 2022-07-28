import moment from 'moment';
import update from 'immutability-helper';

// Types
import { Company } from '@/types/company';

export default function sortWorkExperiences(companies: Company[]): Company[] {
  const result = companies.map((company) => {
    const sortedWorkExperiences = [
      ...company.attributes.work_experiences.data,
    ].sort((we1, we2) => {
      if (we1.attributes.is_current && we2.attributes.is_current) {
        if (
          moment(we2.attributes.start_date).isAfter(
            moment(we1.attributes.start_date),
          )
        ) {
          return -1;
        }

        return 1;
      }

      if (we1.attributes.is_current || we2.attributes.is_current) {
        if (we1.attributes.is_current) {
          return -1;
        }

        if (we2.attributes.is_current) {
          return 1;
        }
      }

      if (
        moment(we2.attributes.start_date).isAfter(
          moment(we1.attributes.start_date),
        )
      ) {
        return -1;
      }

      return 0;
    });

    return update(company, {
      attributes: {
        work_experiences: {
          data: {
            $set: sortedWorkExperiences,
          },
        },
      },
    });
  });

  return result.sort((c1, c2) => {
    if (
      moment(
        c1.attributes.work_experiences.data[
          c1.attributes.work_experiences.data.length - 1
        ]?.attributes.start_date,
      ).isBefore(
        moment(
          c2.attributes.work_experiences.data[
            c2.attributes.work_experiences.data.length - 1
          ]?.attributes.start_date,
        ),
      )
    ) {
      return 1;
    }

    return -1;
  });

  return result;
}

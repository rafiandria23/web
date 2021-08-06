import moment from 'moment';
import update from 'immutability-helper';

// Types
import { Education } from '@/types/education';

export default function sortEducations(educations: Education[]): Education[] {
  return [...educations].sort((e1, e2) => {
    if (moment(e1.startDate).isBefore(moment(e2.startDate))) {
      return 1;
    }

    return -1;
  });
}

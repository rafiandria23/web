import { FC, CSSProperties } from 'react';
import Image from 'next/image';
import { makeStyles, createStyles } from '@mui/styles';
import {
  useMediaQuery,
  useTheme,
  Theme,
  Grid,
  Typography,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import moment from 'moment';

// Types
import { Company } from '@/types/company';
import { WorkExperience, EmploymentTypes } from '@/types/work-experience';

// Utils
import { isOdd } from '@/utils';
import { sortWorkExperiences } from '@/utils/work-experience';
import { getPublicID, getBlurredImageURL } from '@/utils/cloudinary';

interface WorkExperienceTimelineProps {
  companies: Company[];
}

const WorkExperienceTimeline: FC<WorkExperienceTimelineProps> = ({
  companies,
}) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();

  const renderEmploymentType = (type: EmploymentTypes): string => {
    switch (type) {
      case EmploymentTypes.FULL_TIME:
        return 'Full-Time';

      case EmploymentTypes.PART_TIME:
        return 'Part-Time';

      case EmploymentTypes.SELF_EMPLOYED:
        return 'Self-Employed';

      case EmploymentTypes.FREELANCE:
        return 'Freelance';

      case EmploymentTypes.CONTRACT:
        return 'Contract';

      case EmploymentTypes.INTERNSHIP:
        return 'Internship';

      case EmploymentTypes.APPRENTICESHIP:
        return 'Apprenticeship';

      case EmploymentTypes.SEASONAL:
        return 'Seasonal';

      default:
        return '';
    }
  };

  const renderEmploymentPeriod = (workExperience: WorkExperience): string => {
    const start_date = moment(workExperience.attributes.start_date).format(
      'MMM YYYY',
    );

    if (workExperience.attributes.is_current) {
      return `${start_date} - Present`;
    }

    const endDate = moment(workExperience.attributes.end_date).format(
      'MMM YYYY',
    );

    return `${start_date} - ${endDate}`;
  };

  return (
    <Timeline
      className={classes.wrapper}
      position={matchesSM ? 'alternate' : 'left'}
    >
      {sortWorkExperiences(companies).map((company, idx) => {
        return (
          <TimelineItem className={classes.item} key={company.id}>
            <TimelineSeparator>
              <TimelineDot
                variant='outlined'
                color={theme.palette.mode === 'light' ? 'primary' : 'inherit'}
              />
              {idx !== companies.length - 1 ? <TimelineConnector /> : null}
            </TimelineSeparator>
            <TimelineContent>
              <Grid
                className={classes.content}
                container
                direction='column'
                justifyContent='center'
                alignItems='stretch'
              >
                <Grid
                  className={classes.company}
                  item
                  container
                  direction={
                    matchesSM
                      ? isOdd(idx + 1)
                        ? 'row'
                        : 'row-reverse'
                      : undefined
                  }
                  wrap='nowrap'
                  justifyContent='flex-start'
                  alignItems='center'
                >
                  {company.attributes.logo.data !== null && (
                    <Grid
                      item
                      className={
                        matchesSM
                          ? isOdd(idx + 1)
                            ? classes.logoOdd
                            : classes.logoEven
                          : classes.logo
                      }
                    >
                      <Image
                        src={getPublicID(
                          company.attributes.logo.data.attributes.url,
                        )}
                        alt={company.attributes.name}
                        width={40}
                        height={40}
                        placeholder='blur'
                        blurDataURL={getBlurredImageURL(
                          company.attributes.logo.data.attributes.url,
                        )}
                      />
                    </Grid>
                  )}

                  <Grid item>
                    <Typography className={classes.name} variant='subtitle1'>
                      {company.attributes.name}
                    </Typography>
                  </Grid>
                </Grid>
                {company.attributes.work_experiences.data.map(
                  (workExperience) => (
                    <Grid
                      className={classes.workExperience}
                      key={workExperience.id}
                      item
                    >
                      <Typography
                        className={classes.position}
                        variant='subtitle2'
                      >
                        {workExperience.attributes.position}
                      </Typography>

                      <Typography variant='subtitle2'>
                        {renderEmploymentType(workExperience.attributes.type)}
                      </Typography>

                      <Typography variant='subtitle2'>
                        {renderEmploymentPeriod(workExperience)}
                      </Typography>
                    </Grid>
                  ),
                )}
              </Grid>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default WorkExperienceTimeline;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {
      // width: '100%',
    },
    content: {
      marginTop: theme.spacing(-1.5),
      marginBottom: theme.spacing(3),
    },
    company: {
      height: 40,
      marginBottom: theme.spacing(1),
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
    },
    item: {
      [theme.breakpoints.down('xs')]: {
        '&::before': {
          content: 'none',
        } as CSSProperties,
      },
    },
    workExperience: {
      margin: theme.spacing(1, 0),
    },
    position: {
      fontWeight: theme.typography.fontWeightBold,
    },
    logo: {
      '&::after': {
        marginLeft: theme.spacing(2),
        content: `""`,
      } as CSSProperties,
    },
    logoOdd: {
      '&::after': {
        marginLeft: theme.spacing(2),
        content: `""`,
      } as CSSProperties,
    },
    logoEven: {
      '&::before': {
        marginRight: theme.spacing(2),
        content: `""`,
      } as CSSProperties,
    },
  }),
);

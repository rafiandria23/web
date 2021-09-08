import { FC, CSSProperties } from 'react';
import Image from 'next/image';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@material-ui/lab';
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
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
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
    const startDate = moment(workExperience.startDate).format('MMM YYYY');

    if (workExperience.current) {
      return `${startDate} - Present`;
    }

    const endDate = moment(workExperience.endDate).format('MMM YYYY');

    return `${startDate} - ${endDate}`;
  };

  return (
    <Timeline
      className={classes.wrapper}
      align={matches ? 'alternate' : 'left'}
    >
      {sortWorkExperiences(companies).map((company, idx) => {
        return (
          <TimelineItem className={classes.item} key={company._id}>
            <TimelineSeparator>
              <TimelineDot
                variant='outlined'
                color={theme.palette.type === 'light' ? 'primary' : 'inherit'}
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
                    matches
                      ? isOdd(idx + 1)
                        ? 'row'
                        : 'row-reverse'
                      : undefined
                  }
                  wrap='nowrap'
                  justifyContent='flex-start'
                  alignItems='center'
                >
                  {company.logo && (
                    <Grid
                      item
                      className={
                        matches
                          ? isOdd(idx + 1)
                            ? classes.logoOdd
                            : classes.logoEven
                          : classes.logo
                      }
                    >
                      <Image
                        src={getPublicID(company.logo.url)}
                        alt={company.name}
                        width={40}
                        height={40}
                        placeholder='blur'
                        blurDataURL={getBlurredImageURL(company.logo.url)}
                      />
                    </Grid>
                  )}

                  <Grid item>
                    <Typography className={classes.name} variant='subtitle1'>
                      {company.name}
                    </Typography>
                  </Grid>
                </Grid>
                {company.workExperiences.map((workExperience) => (
                  <Grid
                    className={classes.workExperience}
                    key={workExperience._id}
                    item
                  >
                    <Typography
                      className={classes.position}
                      variant='subtitle2'
                    >
                      {workExperience.title}
                    </Typography>

                    <Typography variant='subtitle2'>
                      {renderEmploymentType(workExperience.employmentType)}
                    </Typography>

                    <Typography variant='subtitle2'>
                      {renderEmploymentPeriod(workExperience)}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default WorkExperienceTimeline;

const useStyles = makeStyles((theme) =>
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

import { FC, CSSProperties } from 'react';
import Image from 'next/image';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
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
import { Education } from '@/types/education';

// Utils
import { sortEducations } from '@/utils/education';
import { getPublicID, getBlurredImageURL } from '@/utils/cloudinary';

interface EducationTimelineProps {
  educations: Education[];
}

const EducationTimeline: FC<EducationTimelineProps> = ({ educations }) => {
  const theme = useTheme();
  const classes = useStyles();

  const renderEducationPeriod = (education: Education): string => {
    const startDate = moment(education.startDate).format('YYYY');
    const endDate = moment(education.endDate).format('YYYY');

    return `${startDate} - ${endDate}`;
  };

  return (
    <Timeline className={classes.wrapper} align='left'>
      {sortEducations(educations).map((education, idx) => {
        return (
          <TimelineItem className={classes.item} key={education._id}>
            <TimelineSeparator>
              <TimelineDot
                variant='outlined'
                color={theme.palette.type === 'light' ? 'primary' : 'inherit'}
              />
              {idx !== educations.length - 1 ? <TimelineConnector /> : null}
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
                  className={classes.education}
                  item
                  container
                  wrap='nowrap'
                  justifyContent='flex-start'
                  alignItems='center'
                >
                  {education.school.logo !== null && (
                    <Grid item className={classes.logo}>
                      <Image
                        src={getPublicID(education.school.logo.url)}
                        alt={education.school.name}
                        width={40}
                        height={40}
                        placeholder='blur'
                        blurDataURL={getBlurredImageURL(
                          education.school.logo.url,
                        )}
                      />
                    </Grid>
                  )}

                  <Grid item>
                    <Typography className={classes.name} variant='subtitle1'>
                      {education.school.name}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography className={classes.degree} variant='subtitle2'>
                    {education.degree}
                  </Typography>

                  <Typography variant='subtitle2'>{education.field}</Typography>

                  {education.grade !== null && (
                    <Typography variant='subtitle2'>
                      {education.grade}
                    </Typography>
                  )}

                  <Typography variant='subtitle2'>
                    {renderEducationPeriod(education)}
                  </Typography>
                </Grid>
              </Grid>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default EducationTimeline;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      width: '100%',
    },
    content: {
      marginTop: theme.spacing(-1.5),
      marginBottom: theme.spacing(3),
    },
    education: {
      height: 40,
      marginBottom: theme.spacing(1),
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
    },
    item: {
      '&::before': {
        content: 'none',
      } as CSSProperties,
    },
    degree: {
      fontWeight: theme.typography.fontWeightBold,
    },
    logo: {
      '&::after': {
        marginLeft: theme.spacing(2),
        content: `""`,
      } as CSSProperties,
    },
  }),
);
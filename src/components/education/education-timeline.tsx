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
import { Education } from '@/types/education';

// Utils
import { isOdd } from '@/utils';
import { sortEducations } from '@/utils/education';
import { getPublicID, getBlurredImageURL } from '@/utils/cloudinary';

interface EducationTimelineProps {
  educations: Education[];
}

const EducationTimeline: FC<EducationTimelineProps> = ({ educations }) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();

  const renderEducationPeriod = (education: Education): string => {
    const start_date = moment(education.attributes.start_date).format('YYYY');
    const endDate = moment(education.attributes.end_date).format('YYYY');

    return `${start_date} - ${endDate}`;
  };

  return (
    <Timeline
      className={classes.wrapper}
      position={matchesSM ? 'alternate' : 'left'}
    >
      {sortEducations(educations).map((education, idx) => {
        return (
          <TimelineItem className={classes.item} key={education.id}>
            <TimelineSeparator>
              <TimelineDot
                variant='outlined'
                color={theme.palette.mode === 'light' ? 'primary' : 'inherit'}
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
                  {education.attributes.school.data.attributes.logo.data !==
                    null && (
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
                          education.attributes.school.data.attributes.logo.data
                            .attributes.url,
                        )}
                        alt={education.attributes.school.data.attributes.name}
                        width={40}
                        height={40}
                        placeholder='blur'
                        blurDataURL={getBlurredImageURL(
                          education.attributes.school.data.attributes.logo.data
                            .attributes.url,
                        )}
                      />
                    </Grid>
                  )}

                  <Grid item>
                    <Typography className={classes.name} variant='subtitle1'>
                      {education.attributes.school.data.attributes.name}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography className={classes.degree} variant='subtitle2'>
                    {education.attributes.degree}
                  </Typography>

                  <Typography variant='subtitle2'>
                    {education.attributes.field}
                  </Typography>

                  {education.attributes.grade !== null && (
                    <Typography variant='subtitle2'>
                      {education.attributes.grade}
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

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {
      // width: '100%',
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
      [theme.breakpoints.down('xs')]: {
        '&::before': {
          content: 'none',
        } as CSSProperties,
      },
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

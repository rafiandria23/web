import { FC } from 'react';
import Image from 'next/image';
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

interface IEducationTimelineProps {
  educations: Education[];
}

const EducationTimeline: FC<IEducationTimelineProps> = ({ educations }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const renderEducationPeriod = (education: Education): string => {
    const start_date = moment(education.attributes.start_date).format('YYYY');
    const endDate = moment(education.attributes.end_date).format('YYYY');

    return `${start_date} - ${endDate}`;
  };

  return (
    <Timeline position={isSmallScreen ? 'right' : 'alternate'}>
      {sortEducations(educations).map((education, idx) => (
        <TimelineItem
          key={education.id}
          sx={{
            ...(isSmallScreen && {
              '&::before': {
                content: 'none',
              },
            }),
          }}
        >
          <TimelineSeparator>
            <TimelineDot
              variant='outlined'
              color={theme.palette.mode === 'light' ? 'primary' : undefined}
            />
            {idx !== educations.length - 1 ? <TimelineConnector /> : null}
          </TimelineSeparator>
          <TimelineContent>
            <Grid
              container
              direction='column'
              justifyContent='center'
              alignItems='stretch'
              sx={{
                mt: theme.spacing(-1.5),
                mb: theme.spacing(3),
              }}
            >
              <Grid
                item
                container
                direction={
                  isSmallScreen ? 'row' : isOdd(idx + 1) ? 'row' : 'row-reverse'
                }
                wrap='nowrap'
                justifyContent='flex-start'
                alignItems='center'
                sx={{
                  height: 60,
                  marginBottom: theme.spacing(1),
                }}
              >
                {education.attributes.school.data.attributes.logo.data !==
                  null && (
                  <Grid
                    item
                    sx={{
                      ...(isSmallScreen && {
                        '&::after': {
                          marginLeft: theme.spacing(2),
                          content: `""`,
                        },
                      }),
                      ...(!isSmallScreen &&
                        isOdd(idx + 1) && {
                          '&::after': {
                            marginLeft: theme.spacing(2),
                            content: `""`,
                          },
                        }),
                      ...(!isSmallScreen &&
                        !isOdd(idx + 1) && {
                          '&::before': {
                            marginRight: theme.spacing(2),
                            content: `""`,
                          },
                        }),
                    }}
                  >
                    <Image
                      src={getPublicID(
                        education.attributes.school.data.attributes.logo.data
                          .attributes.url,
                      )}
                      alt={education.attributes.school.data.attributes.name}
                      width={60}
                      height={60}
                      placeholder='blur'
                      blurDataURL={getBlurredImageURL(
                        education.attributes.school.data.attributes.logo.data
                          .attributes.url,
                      )}
                    />
                  </Grid>
                )}

                <Grid item>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    {education.attributes.school.data.attributes.name}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Typography
                  variant='subtitle2'
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
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
      ))}
    </Timeline>
  );
};

export default EducationTimeline;

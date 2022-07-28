import { FC } from 'react';
import Image from 'next/image';
import { useTheme, useMediaQuery, Grid, Typography } from '@mui/material';
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

interface IWorkExperienceTimelineProps {
  companies: Company[];
}

const WorkExperienceTimeline: FC<IWorkExperienceTimelineProps> = ({
  companies,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Timeline position={isSmallScreen ? 'right' : 'alternate'}>
      {sortWorkExperiences(companies).map((company, idx) => (
        <TimelineItem
          key={company.id}
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
            {idx !== companies.length - 1 ? <TimelineConnector /> : null}
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
                  mb: theme.spacing(1),
                }}
              >
                {company.attributes.logo.data !== null && (
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
                        company.attributes.logo.data.attributes.url,
                      )}
                      alt={company.attributes.name}
                      width={60}
                      height={60}
                      placeholder='blur'
                      blurDataURL={getBlurredImageURL(
                        company.attributes.logo.data.attributes.url,
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
                    {company.attributes.name}
                  </Typography>
                </Grid>
              </Grid>
              {company.attributes.work_experiences.data.map(
                (workExperience) => (
                  <Grid
                    key={workExperience.id}
                    item
                    sx={{
                      m: theme.spacing(1, 0),
                    }}
                  >
                    <Typography
                      variant='subtitle2'
                      sx={{
                        fontWeight: theme.typography.fontWeightBold,
                      }}
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
      ))}
    </Timeline>
  );
};

export default WorkExperienceTimeline;

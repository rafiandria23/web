import { FC } from 'react';
import Image from 'next/image';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@material-ui/lab';

// Types
import { Company } from '@/types/company';

// Utils
import { sortWorkExperiences } from '@/utils/work-experience';
import { getPublicID, getBlurredImageURL } from '@/utils/cloudinary';

interface WorkExperienceTimelineProps {
  companies: Company[];
}

const WorkExperienceTimeline: FC<WorkExperienceTimelineProps> = ({
  companies,
}) => {
  const classes = useStyles();

  return (
    <Timeline className={classes.wrapper} align='alternate'>
      {sortWorkExperiences(companies).map((company, idx) => {
        return (
          <TimelineItem key={company._id}>
            <TimelineSeparator>
              <TimelineDot variant='outlined' color='primary' />
              {idx !== companies.length - 1 ? <TimelineConnector /> : null}
            </TimelineSeparator>
            <TimelineContent>
              <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='stretch'
              >
                <Grid
                  item
                  container
                  wrap='nowrap'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  {company.logo && (
                    <Grid item>
                      <Image
                        src={getPublicID(company.logo.url)}
                        alt={company.name}
                        width={56}
                        height={56}
                        placeholder='blur'
                        blurDataURL={getBlurredImageURL(company.logo.url)}
                      />
                    </Grid>
                  )}

                  <Grid item>
                    <Typography className={classes.name}>
                      {company.name}
                    </Typography>
                  </Grid>
                </Grid>
                {company.workExperiences.map((workExperience) => (
                  <Grid key={workExperience._id} item>
                    <Typography>{workExperience.title}</Typography>
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
    wrapper: {},
    name: {
      fontWeight: theme.typography.fontWeightBold,
    },
  }),
);

import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button, Typography } from '@material-ui/core';
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons';

// Types
import { Project } from '@/types/project';

// Utils
import { getPublicID, getBlurredImageURL } from '@/utils/cloudinary';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Paper className={classes.paper} variant={`outlined`}>
      <Grid
        className={classes.wrapper}
        container
        direction={`column`}
        justifyContent={`center`}
        alignItems={`stretch`}
      >
        {project.cover && (
          <Grid item container justifyContent={`center`}>
            <Grid item>
              <Image
                src={getPublicID(project.cover.url)}
                alt={project.title}
                width={project.cover.width}
                height={project.cover.height}
                placeholder='blur'
                blurDataURL={getBlurredImageURL(project.cover.url)}
              />
            </Grid>
          </Grid>
        )}

        <Grid item>
          <Typography className={classes.title} variant={`h6`} gutterBottom>
            {project.title}
          </Typography>

          <Typography className={classes.overview} variant={`body2`}>
            {project.overview}
          </Typography>
        </Grid>

        <Grid item>
          <Button
            className={classes.button}
            fullWidth
            variant={`text`}
            size={`small`}
            onClick={() =>
              router.push({
                pathname: `/projects/${project.slug}`,
              })
            }
            endIcon={<ArrowForwardIcon />}
          >
            {`View Project`}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProjectCard;

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {},
    wrapper: {
      padding: theme.spacing(0.5, 1),
      '& > *': {
        margin: theme.spacing(0.8, 0),
      },
    },
    title: {},
    overview: {},
    button: {},
  }),
);

import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ButtonBase, Grid, Typography } from '@material-ui/core';

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
    <ButtonBase
      className={classes.wrapper}
      onClick={() =>
        router.push({
          pathname: `/projects/${project.slug}`,
        })
      }
    >
      <Grid
        className={classes.card}
        container
        direction={`column`}
        justifyContent={`space-between`}
        alignItems={`stretch`}
      >
        {project.cover && (
          <Grid item container justifyContent='center' alignItems='center'>
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
          <Typography
            className={classes.title}
            variant='h6'
            component='h2'
            align='center'
            gutterBottom
          >
            {project.title}
          </Typography>

          <Typography
            className={classes.overview}
            variant='caption'
            align='left'
            paragraph
          >
            {project.overview}
          </Typography>
        </Grid>
      </Grid>
    </ButtonBase>
  );
};

export default ProjectCard;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      width: '100%',
    },
    card: {
      '& > *': {
        margin: theme.spacing(1, 0),
      },
    },
    title: {},
    overview: {},
    button: {},
  }),
);

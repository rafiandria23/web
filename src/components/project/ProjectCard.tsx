import { FC } from 'react';
import Image from 'next/image';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, ButtonBase, Typography, Link } from '@mui/material';

// Types
import type { IProject } from '@/types/project';

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Link href={project.attributes.link} target='_blank'>
        <ButtonBase
          focusRipple
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '100%',
          }}
        >
          {/* <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${project.attributes.thumbnail.data.attributes.url})`,
          }}
        /> */}
          <Image
            // className={classes.imageSrc}
            src={project.attributes.thumbnail.data.attributes.url}
            alt={project.attributes.title}
            width={project.attributes.thumbnail.data.attributes.width}
            height={project.attributes.thumbnail.data.attributes.height}
            placeholder='blur'
            blurDataURL={project.attributes.thumbnail.data.attributes.url}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              className={classes.imageTitle}
              component='span'
              variant='subtitle1'
              color='inherit'
              align='center'
            >
              {project.attributes.title}
              <br />
              <Typography component='span' variant='caption' color='inherit'>
                {project.attributes.overview}
              </Typography>
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      </Link>
    </div>
  );
};

export default ProjectCard;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      minHeight: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        minHeight: 150,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
        theme.spacing(1) + 6
      }px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }),
);
import type { FC } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  useTheme,
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  // CardActions,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';

// Types
import type { IProject } from '@/types/project';

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  const theme = useTheme();

  return (
    // <div className={classes.wrapper}>
    //   <Link href={project.attributes.link} target='_blank'>
    //     <ButtonBase
    //       focusRipple
    //       className={classes.image}
    //       focusVisibleClassName={classes.focusVisible}
    //       style={{
    //         width: '100%',
    //       }}
    //     >
    //       {/* <span
    //       className={classes.imageSrc}
    //       style={{
    //         backgroundImage: `url(${project.attributes.thumbnail.data.attributes.url})`,
    //       }}
    //     /> */}
    //       <Image
    //         // className={classes.imageSrc}
    //         src={project.attributes.thumbnail.data.attributes.url}
    //         alt={project.attributes.title}
    //         width={project.attributes.thumbnail.data.attributes.width}
    //         height={project.attributes.thumbnail.data.attributes.height}
    //         placeholder='blur'
    //         blurDataURL={project.attributes.thumbnail.data.attributes.url}
    //       />
    //       <span className={classes.imageBackdrop} />
    //       <span className={classes.imageButton}>
    //         <Typography
    //           className={classes.imageTitle}
    //           component='span'
    //           variant='subtitle1'
    //           color='inherit'
    //           align='center'
    //         >
    //           {project.attributes.title}
    //           <br />
    //           <Typography component='span' variant='caption' color='inherit'>
    //             {project.attributes.overview}
    //           </Typography>
    //           <span className={classes.imageMarked} />
    //         </Typography>
    //       </span>
    //     </ButtonBase>
    //   </Link>
    // </div>

    <NextLink href={project.attributes.link} passHref>
      <Card>
        <CardActionArea
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant='h5' gutterBottom>
                {project.attributes.title}
              </Typography>

              <Typography variant='body2' color={theme.palette.text.secondary}>
                {project.attributes.overview}
              </Typography>
            </CardContent>

            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <Typography
                variant='overline'
                component='p'
                align='left'
                sx={{
                  textTransform: 'none',
                  color: theme.palette.text.secondary,
                }}
              >
                {dayjs(project.attributes.updatedAt).format('MMM D, YYYY')}
              </Typography>
            </Box>
          </Box>

          <CardMedia>
            <Image
              src={project.attributes.thumbnail.data.attributes.url}
              alt={project.attributes.title}
              width={project.attributes.thumbnail.data.attributes.width}
              height={project.attributes.thumbnail.data.attributes.height}
              placeholder='blur'
              blurDataURL={project.attributes.thumbnail.data.attributes.url}
              style={{
                display: 'block',
                objectFit: 'cover',
                width: theme.spacing(40),
                height: theme.spacing(40),
              }}
            />
          </CardMedia>
        </CardActionArea>
      </Card>
    </NextLink>
  );
};

export default ProjectCard;

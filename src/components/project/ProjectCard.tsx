import type { FC } from 'react';
import { memo } from 'react';
import NextLink from 'next/link';
import {
  Typography,
  CardActionArea,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';

// Types
import type { IProject } from '@/types/project';

// Constants
import { DateTimeFormat } from '@/constants/datetime';

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  return (
    <Card>
      <CardActionArea
        LinkComponent={NextLink}
        href={project.attributes.link}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
        }}
      >
        <Box component='article' display='flex' flexDirection='column'>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component='h3' variant='h6' gutterBottom>
              {project.attributes.title}
            </Typography>

            <Typography
              variant='body2'
              display='block'
              color='text.secondary'
              paragraph
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {project.attributes.overview}
            </Typography>
          </CardContent>

          <Box display='flex' alignItems='center' pl={1} pb={1}>
            <Typography
              variant='overline'
              align='left'
              color='text.secondary'
              paragraph
            >
              {dayjs(project.attributes.updatedAt).format(
                DateTimeFormat['MMM D, YYYY'],
              )}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default memo(ProjectCard);

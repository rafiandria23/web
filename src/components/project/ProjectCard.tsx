import type { FC } from 'react';
import NextLink from 'next/link';
import {
  useTheme,
  Typography,
  CardActionArea,
  Card,
  CardContent,
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
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;

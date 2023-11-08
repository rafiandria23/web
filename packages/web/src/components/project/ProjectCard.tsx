'use client';

import type { FC } from 'react';
import { memo } from 'react';
import NextLink from 'next/link';
import {
  Typography,
  CardActionArea,
  Card,
  CardContent,
  Stack,
  Box,
} from '@mui/material';

// Types
import type { IProject } from '@/types/project';

// Components
import { ProjectStatusChip } from '.';

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  return (
    <Card>
      <CardActionArea LinkComponent={NextLink} href={project.attributes.link}>
        <Stack component='article' direction='row'>
          <CardContent component={Stack}>
            <Typography component='h3' variant='h6' gutterBottom>
              {project.attributes.title}
            </Typography>

            <Typography
              variant='body2'
              display='block'
              color='text.secondary'
              paragraph
            >
              {project.attributes.overview}
            </Typography>

            <Box flexGrow={1} />

            <ProjectStatusChip status={project.attributes.status} />
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default memo(ProjectCard);

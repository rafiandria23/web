import type { FC } from 'react';
import { memo } from 'react';
import { Grid } from '@mui/material';

// Types
import type { IProject } from '@/types/project';

// Components
import { ProjectCard } from '@/components/project';

interface IProjectListProps {
  projects: IProject[];
}

const ProjectList: FC<IProjectListProps> = ({ projects }) => {
  return (
    <Grid
      item
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      component='div'
    >
      {projects.map((project) => (
        <Grid key={project.id} item>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(ProjectList);

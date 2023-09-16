import type { FC } from 'react';
import type { Metadata } from 'next';

// Client Page
import ProjectsClientPage from './client';

const ProjectsPage: FC = () => {
  return <ProjectsClientPage />;
};

export default ProjectsPage;

export const metadata: Metadata = {
  title: 'My Projects',
  description: "The latest projects I've been involved in so far!",
};

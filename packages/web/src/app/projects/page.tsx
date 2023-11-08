import type { FC } from 'react';
import type { Metadata } from 'next';

// Client Page
import ProjectsClientPage from './client-page';

const ProjectsPage: FC = () => {
  return <ProjectsClientPage />;
};

export default ProjectsPage;

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'Projects I have been working on.',
};

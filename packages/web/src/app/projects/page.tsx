import type { FC } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Client Page
const ProjectsClientPage = dynamic(() => import('./client-page'));

const ProjectsPage: FC = () => {
  return <ProjectsClientPage />;
};

export default ProjectsPage;

export const metadata: Metadata = {
  title: 'My Projects',
  description: "The latest projects I've been involved in so far!",
};

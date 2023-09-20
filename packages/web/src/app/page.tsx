import type { FC } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Client Page
const HomeClientPage = dynamic(() => import('./client-page'));

const HomePage: FC = () => {
  return <HomeClientPage />;
};

export default HomePage;

export const metadata: Metadata = {
  description: 'Software engineer and lifetime learner.',
};

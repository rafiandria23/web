import type { FC } from 'react';
import type { Metadata } from 'next';

// Client Page
import HomeClientPage from './client-page';

const HomePage: FC = () => {
  return <HomeClientPage />;
};

export default HomePage;

export const metadata: Metadata = {
  description: 'Software engineer and lifetime learner.',
};

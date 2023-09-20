import type { FC } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Client Page
const BlogClientPage = dynamic(() => import('./client-page'));

const BlogPage: FC = () => {
  return <BlogClientPage />;
};

export default BlogPage;

export const metadata: Metadata = {
  title: 'My Blog',
  description: "The latest articles I've written so far!",
};

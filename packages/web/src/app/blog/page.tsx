import type { FC } from 'react';
import type { Metadata } from 'next';

// Client Page
import BlogClientPage from './client-page';

const BlogPage: FC = () => {
  return <BlogClientPage />;
};

export default BlogPage;

export const metadata: Metadata = {
  title: 'My Blog',
  description: "The latest articles I've written so far!",
};

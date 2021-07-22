import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

// Components
import { Layout } from '@/components';

const NotFoundPage: NextPage = () => {
  return (
    <Layout>
      <NextSeo title='404: Not found' />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

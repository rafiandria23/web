import { NextPage } from 'next';
import { ErrorProps } from 'next/error';
import { NextSeo } from 'next-seo';

// Components
import { Layout } from '@/components/shared/layout';

interface INotFoundErrorPageProps extends ErrorProps {}

const NotFoundErrorPage: NextPage<INotFoundErrorPageProps> = () => {
  return (
    <Layout>
      <NextSeo title='404: Not found' />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundErrorPage;

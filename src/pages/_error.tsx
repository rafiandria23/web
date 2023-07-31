import { NextPage } from 'next';
import { ErrorProps } from 'next/error';
import { NextSeo } from 'next-seo';

// Components
import { Layout } from '@/components/shared/layout';

interface IErrorPageProps extends ErrorProps {}

const ErrorPage: NextPage<IErrorPageProps> = ({ statusCode }) => {
  switch (statusCode) {
    case 404:
      return (
        <Layout>
          <NextSeo title='404: Not found' />
          <h1>Not Found</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Layout>
      );

    default:
      return (
        <Layout>
          <NextSeo title={'500: Internal Server Error'} />
          <h1>Internal Server Error</h1>
        </Layout>
      );
  }
};

export default ErrorPage;

ErrorPage.getInitialProps = (ctx) => {
  if (ctx.res) {
    return {
      statusCode: ctx.res.statusCode,
      title: ctx.res.statusMessage,
    };
  }

  return {
    statusCode: 500,
    title: 'Internal Server Error',
  };
};

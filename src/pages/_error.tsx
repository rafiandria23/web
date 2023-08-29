import { NextPage } from 'next';
import { ErrorProps } from 'next/error';
import { NextSeo } from 'next-seo';
import { useTheme, Container, Stack, Typography } from '@mui/material';

// Components
import { Layout } from '@/components/shared/layout';

const notFoundErrorStatusCode = 404;

export interface IErrorPageProps extends ErrorProps {}

const ErrorPage: NextPage<IErrorPageProps> = ({ statusCode }) => {
  const theme = useTheme();

  if (statusCode === notFoundErrorStatusCode) {
    return (
      <>
        <NextSeo title='404: Not found' />

        <Layout>
          <Container component={Stack}>
            <Typography component='h1' variant='h3' gutterBottom>
              Not Found
            </Typography>

            <Typography
              component='p'
              variant='h6'
              color={theme.palette.primary.contrastText}
              paragraph
            >
              You just hit a route that doesn&#39;t exist... the sadness.
            </Typography>
          </Container>
        </Layout>
      </>
    );
  }

  return (
    <>
      <NextSeo title='500: Internal Server Error' />

      <Layout>
        <Container component={Stack}>
          <Typography component='h1' variant='h3' gutterBottom>
            Internal Server Error
          </Typography>
        </Container>
      </Layout>
    </>
  );
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

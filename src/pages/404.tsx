import { NextPage } from 'next';
import { ErrorProps } from 'next/error';

// Pages
import ErrorPage from './_error';

const statusCode = 404;

export interface INotFoundErrorPageProps extends ErrorProps {}

const NotFoundErrorPage: NextPage<INotFoundErrorPageProps> = () => {
  return <ErrorPage statusCode={statusCode} />;
};

export default NotFoundErrorPage;

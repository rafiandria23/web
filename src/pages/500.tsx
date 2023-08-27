import { NextPage } from 'next';
import { ErrorProps } from 'next/error';

// Pages
import ErrorPage from './_error';

const statusCode = 500;

export interface IInternalServerErrorPageProps extends ErrorProps {}

const InternalServerErrorPage: NextPage<IInternalServerErrorPageProps> = () => {
  return <ErrorPage statusCode={statusCode} />;
};

export default InternalServerErrorPage;

import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import moment from 'moment';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fileds: ISitemapField[] = [
    {
      loc: 'https://rafiandria23.me',
      lastmod: moment().toISOString(),
    },
    {
      loc: 'https://rafiandria23.me/projects',
      lastmod: moment().toISOString(),
    },
    {
      loc: 'https://rafiandria23.me/blog',
      lastmod: moment().toISOString(),
    },
  ];

  return getServerSideSitemap(ctx, fileds);
};

// eslint-disable-next-line
export default () => {};

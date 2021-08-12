import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import moment from 'moment';

const HOST = 'https://rafiandria23.me';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fileds: ISitemapField[] = [
    {
      loc: HOST,
      lastmod: moment().toISOString(),
    },
    {
      loc: `${HOST}/projects`,
      lastmod: moment().toISOString(),
    },
    {
      loc: `${HOST}/projects/tags`,
      lastmod: moment().toISOString(),
    },
    {
      loc: `${HOST}/blog`,
      lastmod: moment().toISOString(),
    },
    {
      loc: `${HOST}/blog/tags`,
      lastmod: moment().toISOString(),
    },
  ];

  return getServerSideSitemap(ctx, fileds);
};

// eslint-disable-next-line
export default () => {};

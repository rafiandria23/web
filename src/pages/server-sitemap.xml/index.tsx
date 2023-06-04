import type { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import dayjs from 'dayjs';

const HOST = 'https://rafiandria23.tech';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const now = dayjs().toISOString();

  const fields: ISitemapField[] = [
    {
      loc: HOST,
      lastmod: now,
    },
    {
      loc: `${HOST}/projects`,
      lastmod: now,
    },
    {
      loc: `${HOST}/projects/tags`,
      lastmod: now,
    },
    {
      loc: `${HOST}/blog`,
      lastmod: now,
    },
    {
      loc: `${HOST}/blog/tags`,
      lastmod: now,
    },
  ];

  return getServerSideSitemap(ctx, fields);
};

// eslint-disable-next-line
export default () => {};

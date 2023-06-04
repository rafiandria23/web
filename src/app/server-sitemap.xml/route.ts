import type { ISitemapField } from 'next-sitemap';
import { getServerSideSitemap } from 'next-sitemap';
import dayjs from 'dayjs';

const HOST = 'https://rafiandria23.tech';

export async function GET() {
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

  return getServerSideSitemap(fields);
}

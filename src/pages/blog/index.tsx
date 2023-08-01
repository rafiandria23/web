import type { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import type { PaginationRenderItemParams } from '@mui/material';
import {
  useTheme,
  Grid,
  Container,
  Typography,
  Pagination,
  PaginationItem,
} from '@mui/material';

// GraphQL
import { client } from '@/graphql';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { IArticle } from '@/types/article';
import type { ITag } from '@/types/tag';

// Constants
import { PaginationDefaults } from '@/constants';

// Components
import { Layout } from '@/components/shared/layout';
import { ArticleCard } from '@/components/article';

export interface IBlogPageProps {
  pagination: IPagination;
  articles: IArticle[];
  tags: ITag[];
}

const BlogPage: NextPage<IBlogPageProps> = ({ pagination, articles }) => {
  const theme = useTheme();

  const additionalLinkTags = [
    {
      rel: 'canonical',
      href: 'https://rafiandria23.tech/blog',
    },
    {
      rel: 'next',
      href: `https://rafiandria23.tech/blog?page=${pagination.page! + 1}`,
    },
  ];

  if (pagination.page! > 1) {
    additionalLinkTags.push({
      rel: 'prev',
      href: `https://rafiandria23.tech/blog?page=${pagination.page! - 1}`,
    });
  }

  const paginationItem = (props: PaginationRenderItemParams) => (
    <NextLink href={`/blog?page=${props.page}`} passHref>
      <PaginationItem {...props} />
    </NextLink>
  );

  return (
    <>
      <NextSeo title='Blog' additionalLinkTags={additionalLinkTags} />

      <Layout elevate>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{
            bgcolor: theme.palette.primary.light,
          }}
        >
          <Grid component={Container} item>
            <Typography
              variant='h3'
              component='h1'
              gutterBottom
              color={theme.palette.primary.contrastText}
              fontWeight={theme.typography.fontWeightBold}
            >
              My Blog
            </Typography>

            <Typography
              variant='h6'
              component='p'
              paragraph
              color={theme.palette.primary.contrastText}
            >
              Check out my latest articles!
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction='column'
          justifyContent='space-evenly'
          alignItems='center'
          component={Container}
          gap={4}
        >
          {articles.map((article) => (
            <Grid key={article.id} item>
              <ArticleCard article={article} />
            </Grid>
          ))}

          <Grid item>
            <Pagination
              shape='rounded'
              color='primary'
              size='large'
              count={pagination.pageCount}
              page={pagination.page}
              renderItem={paginationItem}
              hidePrevButton={pagination.page === 1}
              hideNextButton={pagination.page === pagination.pageCount}
            />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  IBlogPageProps,
  {
    page?: string;
  }
> = async ({ query }) => {
  const { data } = await client.query<
    {
      articles: IGraphQLModelResponse<IArticle[]>;
      tags: IGraphQLModelResponse<ITag[]>;
    },
    IPagination
  >({
    variables: {
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: parseInt(String(query?.page ?? PaginationDefaults.PAGE)),
    },
    query: gql`
      query ($pageSize: Int!, $page: Int!) {
        articles(pagination: { pageSize: $pageSize, page: $page }) {
          meta {
            pagination {
              total
              pageSize
              pageCount
              page
            }
          }

          data {
            id
            attributes {
              title
              overview
              thumbnail {
                data {
                  id
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
              cover {
                data {
                  id
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
              slug
              tags {
                data {
                  id
                  attributes {
                    name
                    slug
                  }
                }
              }
              content
              publishedAt
            }
          }
        }

        tags {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      pagination: data.articles.meta.pagination,
      articles: data.articles.data,
      tags: data.tags.data,
    },
  };
};

export default BlogPage;

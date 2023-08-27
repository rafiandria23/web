import { useCallback } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import type { PaginationRenderItemParams } from '@mui/material';
import {
  useTheme,
  Container,
  Grid,
  Stack,
  Typography,
  Pagination,
  PaginationItem,
} from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { IArticle } from '@/types/article';
import type { ITag } from '@/types/tag';

// Constants
import { PaginationDefaults } from '@/constants/page';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components/shared/layout';
import { ArticleCard } from '@/components/article';

export interface IBlogPageProps {
  pagination: IPagination;
  tags: ITag[];
  articles: IArticle[];
}

const BlogPage: NextPage<IBlogPageProps> = ({ pagination, articles }) => {
  const router = useRouter();
  const theme = useTheme();

  const handlePaginationChange = useCallback(
    (newPage: number | null) => {
      return async () => {
        await router.push({
          pathname: '/blog',
          query: {
            page: newPage ? newPage : PaginationDefaults.PAGE,
          },
        });
      };
    },
    [router],
  );

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
    <PaginationItem onChange={handlePaginationChange(props.page)} {...props} />
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
              component='h1'
              variant='h3'
              color={theme.palette.primary.contrastText}
              gutterBottom
            >
              My Blog
            </Typography>

            <Typography
              component='p'
              variant='h6'
              color={theme.palette.primary.contrastText}
              paragraph
            >
              Check out my latest articles!
            </Typography>
          </Grid>
        </Grid>

        <Grid
          component={Container}
          container
          gap={{
            xs: 3,
            xl: 3,
          }}
        >
          {articles.map((article) => (
            <Grid key={article.id} item xs={12} xl={5.87}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>

        <Stack component={Container} direction='row' justifyContent='center'>
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
        </Stack>
      </Layout>
    </>
  );
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps<
  IBlogPageProps,
  {
    page?: string;
  }
> = async ({ query }) => {
  const { data } = await client.query<
    {
      tags: IGraphQLModelResponse<ITag[]>;
      articles: IGraphQLModelResponse<IArticle[]>;
    },
    IPagination
  >({
    variables: {
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: parseInt(String(query?.page ?? PaginationDefaults.PAGE)),
    },
    query: gql`
      query ($pageSize: Int!, $page: Int!) {
        tags {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }

        articles(
          pagination: { pageSize: $pageSize, page: $page }
          sort: ["publishedAt:DESC"]
        ) {
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
                    formats
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
      }
    `,
  });

  return {
    props: {
      pagination: data.articles.meta.pagination,
      tags: data.tags.data,
      articles: data.articles.data,
    },
  };
};

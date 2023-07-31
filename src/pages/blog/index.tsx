import type { NextPage, GetStaticProps } from 'next';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
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

interface IBlogPageProps {
  pagination: IPagination;
  articles: IArticle[];
  tags: ITag[];
}

const BlogPage: NextPage<IBlogPageProps> = ({ articles }) => {
  const theme = useTheme();

  return (
    <>
      <NextSeo
        title='Blog'
        additionalLinkTags={[
          {
            rel: 'canonical',
            href: '',
          },
          {
            rel: 'prev',
            href: '',
          },
          {
            rel: 'next',
            href: '',
          },
        ]}
      />

      <Layout elevate>
        <Grid
          container
          direction='column'
          justifyContent='space-evenly'
          alignItems='stretch'
          component={Container}
          sx={{
            bgcolor: theme.palette.primary.light,
            p: theme.spacing(4),
            [theme.breakpoints.up('md')]: {
              p: theme.spacing(4, 8),
            },
            '& > *': {
              width: '100%',
            },
          }}
        >
          <Grid item>
            <Typography
              variant='h2'
              component='h1'
              gutterBottom
              color={theme.palette.primary.contrastText}
              sx={{
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              My Blog
            </Typography>
          </Grid>

          <Grid item>
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
          alignItems='stretch'
          component={Container}
          gap={4}
          sx={{
            p: theme.spacing(4),
            [theme.breakpoints.up('md')]: {
              p: theme.spacing(4, 8),
            },
            '& > *': {
              width: '100%',
            },
          }}
        >
          {articles.map((article) => (
            <Grid key={article.id} item>
              <ArticleCard article={article} />
            </Grid>
          ))}

          <Grid item>
            <Pagination
              color='primary'
              // count={PaginationDefaults.total}
              page={PaginationDefaults.PAGE}
              renderItem={(props) => (
                <NextLink href={`/blog?page=${props.page}`} passHref>
                  <PaginationItem {...props} />
                </NextLink>
              )}
            />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  IBlogPageProps,
  { page: string }
> = async ({ params }) => {
  const { data } = await client.query<
    {
      articles: IGraphQLModelResponse<IArticle[]>;
      tags: IGraphQLModelResponse<ITag[]>;
    },
    IPagination
  >({
    variables: {
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: parseInt(String(params?.page)) || PaginationDefaults.PAGE,
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
    revalidate: 1,
  };
};

export default BlogPage;

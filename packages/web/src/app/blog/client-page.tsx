'use client';

import type { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useTheme, Container, Grid, Typography, Skeleton } from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { IArticle } from '@/types/article';
import type { ITag } from '@/types/tag';

// Constants
import { PaginationDefaults } from '@/constants/page';

// Components
import { ArticleCard } from '@/components/article';

const query = gql`
  query ($pageSize: Int!, $page: Int!) {
    tags(
      pagination: { pageSize: $pageSize, page: $page }
      sort: ["updatedAt:DESC"]
    ) {
      data {
        id
        attributes {
          name
          slug
          color
        }
      }
    }

    articles(
      pagination: { pageSize: $pageSize, page: $page }
      sort: ["updatedAt:DESC"]
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
              attributes {
                formats
              }
            }
          }
          slug
          updatedAt
        }
      }
    }
  }
`;

const BlogClientPage: FC = () => {
  const theme = useTheme();
  const { data, loading } = useQuery<
    {
      tags: IGraphQLModelResponse<ITag[]>;
      articles: IGraphQLModelResponse<IArticle[]>;
    },
    IPagination
  >(query, {
    variables: {
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: PaginationDefaults.PAGE,
    },
  });

  return (
    <>
      {/* Blog Hero Section */}
      <Grid
        component='section'
        container
        justifyContent='center'
        alignItems='center'
        bgcolor='primary.light'
      >
        <Grid component={Container} item>
          <Typography
            component='h1'
            variant='h3'
            color='primary.contrastText'
            gutterBottom
          >
            My Blog
          </Typography>

          <Typography
            component='p'
            variant='h6'
            color='primary.contrastText'
            paragraph
          >
            Check out my latest articles!
          </Typography>
        </Grid>
      </Grid>

      {/* Articles Section */}
      <Container component='section'>
        <Grid
          container
          gap={{
            xs: 3,
            xl: 3,
          }}
        >
          {loading
            ? Array.from({ length: PaginationDefaults.PAGE_SIZE }).map(
                (_, idx) => (
                  <Grid
                    key={`article-skeleton-${idx + 1}`}
                    item
                    xs={12}
                    xl={5.87}
                  >
                    <Skeleton height={theme.spacing(20)} />
                  </Grid>
                ),
              )
            : data?.articles.data.map((article) => (
                <Grid key={article.id} item xs={12} xl={5.87}>
                  <ArticleCard article={article} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </>
  );
};

export default BlogClientPage;

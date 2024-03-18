'use client';

import _ from 'lodash';
import type { FC, ReactNode } from 'react';
import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import type { PaginationRenderItemParams as MuiPaginationRenderItemParams } from '@mui/material';
import {
  useTheme,
  Container,
  Grid,
  Typography,
  Skeleton,
  Pagination as MuiPagination,
  PaginationItem as MuiPaginationItem,
} from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { IArticle } from '@/types/article';
import type { ITag } from '@/types/tag';

// Constants
import { RADIX } from '@/constants';
import { Pagination } from '@/constants/page';

// Components
const ArticleCard = dynamic(
  () => import('@/components/article').then((mod) => mod.ArticleCard),
  {
    ssr: false,
  },
);

const query = gql`
  query ($pageSize: Int, $page: Int, $tagSlug: String) {
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
      filters: { tags: { slug: { eq: $tagSlug } } }
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

const BlogPage: FC = () => {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const { data, loading } = useQuery<
    {
      tags: IGraphQLModelResponse<ITag[]>;
      articles: IGraphQLModelResponse<IArticle[]>;
    },
    IPagination & { tagSlug?: string }
  >(query, {
    variables: {
      pageSize: Pagination.PAGE_SIZE,
      page: _.defaultTo(
        parseInt(searchParams.get('page') as string, RADIX),
        undefined,
      ),
      tagSlug: _.defaultTo(searchParams.get('tag'), undefined),
    },
  });

  const renderPaginationItem = useCallback<
    (item: MuiPaginationRenderItemParams) => ReactNode
  >(
    (item) => {
      const clonedSearchParams = new URLSearchParams(searchParams);

      clonedSearchParams.set('page', String(_.defaultTo(item.page, 1)));

      return (
        <MuiPaginationItem
          component={NextLink}
          href={`blog?${clonedSearchParams.toString()}`}
          {...item}
        />
      );
    },
    [searchParams],
  );

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
            variant='h4'
            color='primary.contrastText'
            gutterBottom
          >
            My Blog
          </Typography>

          <Typography variant='body1' color='primary.contrastText' paragraph>
            Articles I have written.
          </Typography>
        </Grid>
      </Grid>

      {/* Articles Section */}
      <Container component='section'>
        <Grid container rowGap={6}>
          <Grid
            item
            container
            gap={{
              xs: 3,
              xl: 3,
            }}
          >
            {loading
              ? Array.from({ length: Pagination.PAGE_SIZE }).map((_, idx) => (
                  <Grid
                    key={`article-skeleton-${idx + 1}`}
                    item
                    xs={12}
                    xl={5.87}
                  >
                    <Skeleton height={theme.spacing(20)} />
                  </Grid>
                ))
              : data?.articles.data.map((article) => (
                  <Grid key={article.id} item xs={12} xl={5.87}>
                    <ArticleCard article={article} />
                  </Grid>
                ))}
          </Grid>

          <Grid item xs={4}>
            {loading ? (
              <Skeleton variant='rounded' height={theme.spacing(4)} />
            ) : (
              <MuiPagination
                variant='outlined'
                color='primary'
                count={data?.articles.meta.pagination.pageCount}
                page={data?.articles.meta.pagination.page}
                renderItem={renderPaginationItem}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BlogPage;

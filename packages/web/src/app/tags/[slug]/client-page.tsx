'use client';

import _ from 'lodash';
import type { FC } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import {
  useTheme,
  Container,
  Grid,
  Typography,
  Skeleton,
  Pagination,
  PaginationItem,
} from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { ITag } from '@/types/tag';
import type { IArticle } from '@/types/article';

// Constants
import { RADIX } from '@/constants';
import { PaginationDefaults } from '@/constants/page';

// Components
const ArticleCard = dynamic(
  () => import('@/components/article').then((mod) => mod.ArticleCard),
  {
    ssr: false,
  },
);

const query = gql`
  query ($slug: String!, $pageSize: Int!, $page: Int!) {
    articles(
      filters: { tags: { slug: { eq: $slug } } }
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

export interface ITagClientPageProps {
  tag: ITag;
}

const TagClientPage: FC<ITagClientPageProps> = ({ tag }) => {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const { data, loading } = useQuery<
    {
      articles: IGraphQLModelResponse<IArticle[]>;
    },
    { slug: ITag['attributes']['slug'] } & IPagination
  >(query, {
    variables: {
      slug: tag.attributes.slug,
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: _.defaultTo(
        parseInt(searchParams.get('page') as string, RADIX),
        PaginationDefaults.PAGE,
      ),
    },
  });

  return (
    <>
      {/* Tag Hero Section */}
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
            {tag.attributes.name}
          </Typography>

          <Typography variant='body1' color='primary.contrastText' paragraph>
            {tag.attributes.overview}
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

          <Grid item xs={4}>
            {loading ? (
              <Skeleton variant='rounded' height={theme.spacing(4)} />
            ) : (
              <Pagination
                variant='outlined'
                color='primary'
                count={data?.articles.meta.pagination.pageCount}
                page={data?.articles.meta.pagination.page}
                renderItem={(item) => (
                  <PaginationItem
                    component={NextLink}
                    href={item.page === 1 ? '/blog' : `/blog?page=${item.page}`}
                    {...item}
                  />
                )}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TagClientPage;

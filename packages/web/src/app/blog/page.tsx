import type { FC } from 'react';
import type { Metadata } from 'next';
import { gql } from '@apollo/client';
import { Container, Grid, Typography } from '@mui/material';

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
import { ArticleCard } from '@/components/article';

const BlogPage: FC = async () => {
  const { articles } = await getData();

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
          {articles.map((article) => (
            <Grid key={article.id} item xs={12} xl={5.87}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default BlogPage;

export interface IBlogPageData {
  pagination: IPagination;
  tags: ITag[];
  articles: IArticle[];
}

async function getData(): Promise<IBlogPageData> {
  const { data } = await client.query<
    {
      tags: IGraphQLModelResponse<ITag[]>;
      articles: IGraphQLModelResponse<IArticle[]>;
    },
    IPagination
  >({
    variables: {
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: PaginationDefaults.PAGE,
    },
    query: gql`
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
    `,
  });

  return {
    pagination: data.articles.meta.pagination,
    tags: data.tags.data,
    articles: data.articles.data,
  };
}

export const metadata: Metadata = {
  title: 'My Blog',
  description: "The latest articles I've written so far!",
};

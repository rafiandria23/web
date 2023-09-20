'use client';

import type { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  useTheme,
  Container,
  Box,
  Grid,
  Stack,
  Typography,
  Skeleton,
} from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { ITag } from '@/types/tag';
import type { IProject } from '@/types/project';
import type { IArticle } from '@/types/article';

// Constants
import { PaginationDefaults } from '@/constants/page';

// Components
import { ArticleCard } from '@/components/article';
import { ProjectCard } from '@/components/project';

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

    projects(
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
          link
          thumbnail {
            data {
              attributes {
                formats
              }
            }
          }
          status
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
  const theme = useTheme();
  const { data, loading } = useQuery<
    {
      articles: IGraphQLModelResponse<IArticle[]>;
      projects: IGraphQLModelResponse<IProject[]>;
    },
    { slug: ITag['attributes']['slug'] } & IPagination
  >(query, {
    variables: {
      slug: tag.attributes.slug,
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: PaginationDefaults.PAGE,
    },
  });

  return (
    <>
      {/* Tag Hero Section */}
      <Box component='section' bgcolor='primary.light'>
        <Stack component={Container} spacing={2}>
          <Typography
            component='h1'
            variant='h3'
            color='primary.contrastText'
            gutterBottom
          >
            {tag.attributes.name}
          </Typography>

          <Typography
            component='p'
            variant='h6'
            color='primary.contrastText'
            paragraph
          >
            {tag.attributes.overview}
          </Typography>
        </Stack>
      </Box>

      {/* Articles Section */}
      <Container component='section'>
        <Stack spacing={8}>
          <Typography
            component='h2'
            variant='h4'
            textAlign={{
              xs: 'left',
              xl: 'right',
            }}
            gutterBottom
          >
            Articles
          </Typography>

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
        </Stack>
      </Container>

      {/* Projects Section */}
      <Box component='section' bgcolor='primary.light'>
        <Stack component={Container} spacing={8}>
          <Typography
            component='h2'
            variant='h4'
            textAlign='left'
            color='primary.contrastText'
            gutterBottom
          >
            Projects
          </Typography>

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
                      key={`project-skeleton-${idx + 1}`}
                      item
                      xs={12}
                      xl={5.87}
                    >
                      <Skeleton height={theme.spacing(20)} />
                    </Grid>
                  ),
                )
              : data?.projects.data.map((project) => (
                  <Grid key={project.id} item xs={12} xl={5.87}>
                    <ProjectCard project={project} />
                  </Grid>
                ))}
          </Grid>
        </Stack>
      </Box>
    </>
  );
};

export default TagClientPage;

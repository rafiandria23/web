import type { FC } from 'react';
import type { Metadata } from 'next';
import { gql } from '@apollo/client';
import { Container, Box, Grid, Stack, Typography } from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { ITag } from '@/types/tag';
import type { IProject } from '@/types/project';
import type { IArticle } from '@/types/article';

// Constants
import { PaginationDefaults } from '@/constants/page';

// GraphQL
import { client } from '@/graphql';

// Components
import { ArticleCard } from '@/components/article';
import { ProjectCard } from '@/components/project';

export interface ITagsPageProps {
  params: {
    slug: ITag['attributes']['slug'];
  };
}

const TagsPage: FC<ITagsPageProps> = async ({ params }) => {
  const { tag, articles, projects } = await getData(params.slug);

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
            {articles.map((article) => (
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
            {projects.map((project) => (
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

export default TagsPage;

export interface ITagsPageData {
  tag: ITag;
  articles: IArticle[];
  projects: IProject[];
}

async function getData(
  slug: ITag['attributes']['slug'],
): Promise<ITagsPageData> {
  const { data } = await client.query<
    {
      tags: IGraphQLModelResponse<ITag[]>;
      articles: IGraphQLModelResponse<IArticle[]>;
      projects: IGraphQLModelResponse<IProject[]>;
    },
    { slug: ITag['attributes']['slug'] } & IPagination
  >({
    variables: {
      slug,
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: PaginationDefaults.PAGE,
    },
    query: gql`
      query ($slug: String!, $pageSize: Int!, $page: Int!) {
        tags(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              name
              overview
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

        projects(
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
    `,
  });

  return {
    tag: data.tags.data[0],
    articles: data.articles.data,
    projects: data.projects.data,
  };
}

export async function generateMetadata({
  params,
}: ITagsPageProps): Promise<Metadata> {
  const { slug } = params;

  const { data } = await client.query<
    {
      tags: IGraphQLModelResponse<ITag[]>;
    },
    { slug: ITag['attributes']['slug'] } & IPagination
  >({
    variables: {
      slug,
    },
    query: gql`
      query ($slug: String!) {
        tags(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              name
              overview
            }
          }
        }
      }
    `,
  });

  const tag = data.tags.data[0];

  return {
    title: tag.attributes.name,
    description: tag.attributes.overview,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: tag.attributes.name,
      description: tag.attributes.overview,
      images: [],
    },
    twitter: {
      title: tag.attributes.name,
      description: tag.attributes.overview,
      images: [],
    },
  };
}

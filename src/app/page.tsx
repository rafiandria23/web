import type { FC } from 'react';
import type { Metadata } from 'next';
import { gql } from '@apollo/client';
import { Grid, Stack, Box, Container, Typography } from '@mui/material';

// Types
import type { IPagination } from '@/types/page';
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IArticle } from '@/types/article';
import type { IProject } from '@/types/project';

// Constants
import { PaginationDefaults } from '@/constants/page';

// GraphQL
import { client } from '@/graphql';

// Components
import { ArticleCard } from '@/components/article';
import { ProjectCard } from '@/components/project';

const HomePage: FC = async () => {
  const { articles, projects } = await getData();

  return (
    <>
      {/* Introduction Section */}
      <Box
        sx={{
          bgcolor: 'primary.light',
        }}
      >
        <Stack component={Container} spacing={2}>
          <Typography
            component='h1'
            variant='h3'
            textAlign='center'
            color='primary.contrastText'
            gutterBottom
          >
            Hey, I&apos;m Adam.
          </Typography>

          <Typography
            component='p'
            variant='h6'
            textAlign='center'
            color='primary.contrastText'
            paragraph
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            vulputate ex id quam malesuada efficitur. Ut id nisi eget sapien
            iaculis laoreet.
          </Typography>
        </Stack>
      </Box>

      {/* Latest Articles Section */}
      <Stack component={Container} spacing={8}>
        <Typography
          component='h2'
          variant='h4'
          textAlign={{
            xs: 'left',
            xl: 'right',
          }}
          gutterBottom
        >
          Latest Articles
        </Typography>

        <Grid
          container
          gap={{
            xs: 3,
            xl: 3,
          }}
        >
          {articles.map((article) => (
            <Grid key={article.id} item xs={12} xl={3.83}>
              <ArticleCard article={article} overview={false} />
            </Grid>
          ))}
        </Grid>
      </Stack>

      {/* Latest Projects Section */}
      <Box sx={{ bgcolor: 'primary.light' }}>
        <Stack component={Container} spacing={8}>
          <Typography
            component='h2'
            variant='h4'
            textAlign='left'
            color='primary.contrastText'
            gutterBottom
          >
            Latest Projects
          </Typography>

          <Grid
            container
            gap={{
              xs: 3,
              xl: 3,
            }}
          >
            {projects.map((project) => (
              <Grid key={project.id} item xs={12} xl={3.83}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    </>
  );
};

export default HomePage;

export interface IHomePageData {
  articles: IArticle[];
  projects: IProject[];
}

async function getData(): Promise<IHomePageData> {
  const { data } = await client.query<
    {
      articles: IGraphQLModelResponse<IArticle[]>;
      projects: IGraphQLModelResponse<IProject[]>;
    },
    IPagination
  >({
    variables: {
      pageSize: 6,
      page: PaginationDefaults.PAGE,
    },
    query: gql`
      query ($pageSize: Int!, $page: Int!) {
        articles(
          pagination: { pageSize: $pageSize, page: $page }
          sort: ["updatedAt:DESC"]
        ) {
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
    articles: data.articles.data,
    projects: data.projects.data,
  };
}

export const metadata: Metadata = {
  title: 'Welcome!',
  description: 'Software engineer and lifetime learner.',
};

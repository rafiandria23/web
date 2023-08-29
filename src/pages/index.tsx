import type { NextPage, GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import {
  useTheme,
  Grid,
  Stack,
  Box,
  Container,
  Typography,
} from '@mui/material';

// Types
import type { IPagination } from '@/types/page';
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IArticle } from '@/types/article';
import type { IProject } from '@/types/project';
import type { ITag } from '@/types/tag';

// Constants
import { PaginationDefaults } from '@/constants/page';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components/shared/layout';
import { ArticleCard } from '@/components/article';
import { ProjectCard } from '@/components/project';

interface IHomePageProps {
  articles: IArticle[];
  projects: IProject[];
  tags: ITag[];
}

const HomePage: NextPage<IHomePageProps> = ({ articles, projects }) => {
  const theme = useTheme();

  return (
    <>
      <NextSeo
        title='Welcome!'
        description='Software Engineer & Lifetime Learner'
      />

      <Layout elevate>
        {/* Introduction Section */}
        <Box
          sx={{
            bgcolor: theme.palette.primary.light,
          }}
        >
          <Stack component={Container} spacing={2}>
            <Typography
              component='h1'
              variant='h3'
              textAlign='center'
              color={theme.palette.primary.contrastText}
              gutterBottom
            >
              Hey, I&apos;m Adam.
            </Typography>

            <Typography
              component='p'
              variant='h6'
              textAlign='center'
              color={theme.palette.primary.contrastText}
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
        <Box sx={{ bgcolor: theme.palette.primary.light }}>
          <Stack component={Container} spacing={8}>
            <Typography
              component='h2'
              variant='h4'
              textAlign='left'
              color={theme.palette.primary.contrastText}
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
      </Layout>
    </>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<
  IHomePageProps
> = async () => {
  const { data } = await client.query<
    {
      articles: IGraphQLModelResponse<IArticle[]>;
      projects: IGraphQLModelResponse<IProject[]>;
      tags: IGraphQLModelResponse<ITag[]>;
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
          sort: ["publishedAt:DESC"]
        ) {
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
              publishedAt
            }
          }
        }

        projects(
          pagination: { pageSize: $pageSize, page: $page }
          sort: ["publishedAt:DESC"]
        ) {
          data {
            id
            attributes {
              title
              overview
              link
              thumbnail {
                data {
                  id
                  attributes {
                    formats
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
              status
              publishedAt
            }
          }
        }

        tags(
          pagination: { pageSize: $pageSize, page: $page }
          sort: ["publishedAt:DESC"]
        ) {
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
      articles: data.articles.data,
      projects: data.projects.data,
      tags: data.tags.data,
    },
  };
};

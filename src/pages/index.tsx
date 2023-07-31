import { memo } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { useTheme, Grid, Container, Typography } from '@mui/material';

// Types
import type { IPagination } from '@/types/page';
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IArticle } from '@/types/article';
import type { IProject } from '@/types/project';
import type { ITag } from '@/types/tag';

// Constants
import { PaginationDefaults } from '@/constants';

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
        <Grid
          item
          container
          justifyContent='center'
          sx={{
            bgcolor: theme.palette.primary.light,
          }}
        >
          <Grid item component={Container}>
            <Typography
              variant='h2'
              component='h1'
              gutterBottom
              color={theme.palette.primary.contrastText}
              fontWeight={theme.typography.fontWeightBold}
              textAlign='center'
            >
              Hey, I&apos;m Adam.
            </Typography>

            <Typography
              variant='h6'
              component='p'
              paragraph
              color={theme.palette.primary.contrastText}
              textAlign='center'
            >
              Software Engineer from Bogor, Indonesia. I develop web, mobile,
              and desktop applications to help businesses grow online.
            </Typography>
          </Grid>
        </Grid>

        {/* Latest Articles Section */}
        <Grid item container component={Container} spacing={2}>
          {articles.map((article) => (
            <Grid key={article.id} item>
              <ArticleCard
                article={article}
                sx={{
                  maxWidth: 345,
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Latest Projects Section */}
        <Grid
          item
          container
          justifyContent='center'
          sx={{ bgcolor: theme.palette.primary.light }}
        >
          <Grid item container component={Container}>
            {projects.map((project) => (
              <Grid key={project.id} item>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<IHomePageProps> = async () => {
  const { data } = await client.query<
    {
      articles: IGraphQLModelResponse<IArticle[]>;
      projects: IGraphQLModelResponse<IProject[]>;
      tags: IGraphQLModelResponse<ITag[]>;
    },
    IPagination
  >({
    variables: {
      pageSize: 5,
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
                    url
                    width
                    height
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
    revalidate: 1,
  };
};

export default memo(HomePage);

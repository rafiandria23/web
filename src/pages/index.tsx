import type { NextPage, GetServerSideProps } from 'next';
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
          alignItems='center'
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              vulputate ex id quam malesuada efficitur. Ut id nisi eget sapien
              iaculis laoreet. Cras sit amet rhoncus augue, vel vestibulum est.
              Sed ut dolor at metus tempus faucibus eget in lorem. Maecenas
              placerat luctus justo, id blandit diam congue sit amet. Donec
              vitae tortor vel nisi hendrerit commodo nec nec sem. Vivamus sem
              eros, mattis gravida enim sit amet, blandit varius felis. Nam
              mollis ultricies ante ut tempus. In non commodo orci. Cras et nisi
              sit amet risus cursus eleifend. Donec ut suscipit lacus, id
              volutpat nibh. Pellentesque sed rutrum dui. Proin magna est,
              maximus ut mauris nec, suscipit semper dolor. In facilisis ipsum a
              mollis fringilla. Quisque vel ipsum tincidunt, varius velit ac,
              aliquam nibh. Nam imperdiet, risus eu pharetra hendrerit, massa
              lectus laoreet ipsum, ut molestie velit felis in ex.
            </Typography>
          </Grid>
        </Grid>

        {/* Latest Articles Section */}
        <Grid item container component={Container} spacing={2}>
          {articles.map((article) => (
            <Grid key={article.id} item>
              <ArticleCard article={article} />
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
      pageSize: PaginationDefaults.PAGE_SIZE / 2,
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
  };
};

export default HomePage;

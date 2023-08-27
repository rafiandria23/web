import { useState, useMemo } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import {
  useTheme,
  Container,
  Box,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPageProps, IPagination } from '@/types/page';
import type { ITag } from '@/types/tag';
import type { IProject } from '@/types/project';
import type { IArticle } from '@/types/article';

// Constants
import { PaginationDefaults } from '@/constants/page';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components/shared/layout';
import { ArticleCard } from '@/components/article';
import { ProjectCard } from '@/components/project';

export interface ITagsPageProps extends IPageProps {
  tag: ITag;
  articles: IArticle[];
  projects: IProject[];
}

const TagsPage: NextPage<ITagsPageProps> = (props) => {
  const { tag } = props;

  const theme = useTheme();

  const [articles] = useState(props.articles);
  const [projects] = useState(props.projects);

  const additionalLinkTags = useMemo(() => {
    return [
      {
        rel: 'canonical',
        href: `https://rafiandria23.tech/tags/${tag.attributes.slug}`,
      },
    ];
  }, [tag]);

  return (
    <>
      <NextSeo
        title={tag.attributes.name}
        description={tag.attributes.overview}
        additionalLinkTags={additionalLinkTags}
      />

      <Layout elevate>
        {/* Tag Hero Section */}
        <Box
          sx={{
            bgcolor: theme.palette.primary.light,
          }}
        >
          <Stack component={Container} spacing={2}>
            <Typography
              component='h1'
              variant='h3'
              color={theme.palette.primary.contrastText}
              gutterBottom
            >
              {tag.attributes.name}
            </Typography>

            <Typography
              component='p'
              variant='h6'
              color={theme.palette.primary.contrastText}
              paragraph
            >
              {tag.attributes.overview}
            </Typography>
          </Stack>
        </Box>

        {/* Related Articles Section */}
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
            {tag.attributes.name} Articles
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

        {/* Related Projects Section */}
        <Box sx={{ bgcolor: theme.palette.primary.light }}>
          <Stack component={Container} spacing={8}>
            <Typography
              component='h2'
              variant='h4'
              textAlign='left'
              color={theme.palette.primary.contrastText}
              gutterBottom
            >
              {tag.attributes.name} Projects
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
      </Layout>
    </>
  );
};

export default TagsPage;

export const getServerSideProps: GetServerSideProps<
  ITagsPageProps,
  {
    slug: ITag['attributes']['slug'];
  }
> = async ({ params }) => {
  const slug = String(params?.slug);
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
            id
            attributes {
              name
              overview
            }
          }
        }

        articles(
          pagination: { pageSize: $pageSize, page: $page }
          sort: ["publishedAt:DESC"]
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
              content
              publishedAt
            }
          }
        }

        projects(
          pagination: { pageSize: $pageSize, page: $page }
          sort: ["publishedAt:DESC"]
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
                  id
                  attributes {
                    formats
                  }
                }
              }
              status
              tags {
                data {
                  id
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  if (!data.tags.data.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tag: data.tags.data[0],
      articles: data.articles.data,
      projects: data.projects.data,
    },
  };
};

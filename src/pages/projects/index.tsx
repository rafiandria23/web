import type { NextPage, GetServerSideProps } from 'next';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import type { PaginationRenderItemParams } from '@mui/material';
import {
  useTheme,
  Container,
  Grid,
  Stack,
  Typography,
  Pagination,
  PaginationItem,
} from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { IProject } from '@/types/project';

// Constants
import { PaginationDefaults } from '@/constants/page';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components/shared/layout';
import { ProjectCard } from '@/components/project';

interface IProjectsPageProps {
  pagination: IPagination;
  projects: IProject[];
}

const ProjectsPage: NextPage<IProjectsPageProps> = ({
  pagination,
  projects,
}) => {
  const router = useRouter();
  const theme = useTheme();

  const handlePaginationChange = useCallback(
    (newPage: number | null) => {
      return async () => {
        await router.push({
          pathname: '/projects',
          query: {
            page: newPage ? newPage : PaginationDefaults.PAGE,
          },
        });
      };
    },
    [router],
  );

  const additionalLinkTags = [
    {
      rel: 'canonical',
      href: 'https://rafiandria23.tech/projects',
    },
    {
      rel: 'next',
      href: `https://rafiandria23.tech/projects?page=${pagination.page! + 1}`,
    },
  ];

  if (pagination.page! > 1) {
    additionalLinkTags.push({
      rel: 'prev',
      href: `https://rafiandria23.tech/projects?page=${pagination.page! - 1}`,
    });
  }

  const paginationItem = (props: PaginationRenderItemParams) => (
    <PaginationItem onChange={handlePaginationChange(props.page)} {...props} />
  );

  return (
    <>
      <NextSeo title='Projects' additionalLinkTags={additionalLinkTags} />

      <Layout elevate>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{
            bgcolor: theme.palette.primary.light,
          }}
        >
          <Grid component={Container} item>
            <Typography
              component='h1'
              variant='h3'
              color={theme.palette.primary.contrastText}
              gutterBottom
            >
              My Projects
            </Typography>

            <Typography
              component='p'
              variant='h6'
              color={theme.palette.primary.contrastText}
              paragraph
            >
              Check out my latest projects!
            </Typography>
          </Grid>
        </Grid>

        <Grid
          component={Container}
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

        <Stack component={Container} direction='row' justifyContent='center'>
          <Pagination
            shape='rounded'
            color='primary'
            size='large'
            count={pagination.pageCount}
            page={pagination.page}
            renderItem={paginationItem}
            hidePrevButton={pagination.page === 1}
            hideNextButton={pagination.page === pagination.pageCount}
          />
        </Stack>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  IProjectsPageProps,
  {
    page?: string;
  }
> = async ({ query }) => {
  const { data } = await client.query<
    {
      projects: IGraphQLModelResponse<IProject[]>;
    },
    IPagination
  >({
    variables: {
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: parseInt(String(query?.page ?? PaginationDefaults.PAGE)),
    },
    query: gql`
      query ($pageSize: Int!, $page: Int!) {
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

  return {
    props: {
      pagination: data.projects.meta.pagination,
      projects: data.projects.data,
    },
  };
};

export default ProjectsPage;

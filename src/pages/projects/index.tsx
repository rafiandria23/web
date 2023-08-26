import type { NextPage, GetServerSideProps } from 'next';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import type { PaginationRenderItemParams } from '@mui/material';
import {
  useTheme,
  Grid,
  Container,
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

  const handleNavigate = useCallback(
    (url: string) => {
      return async () => {
        await router.push(url);
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
    <PaginationItem
      onChange={handleNavigate(`/projects?page=${props.page}`)}
      {...props}
    />
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
              gutterBottom
              color={theme.palette.primary.contrastText}
            >
              My Projects
            </Typography>

            <Typography
              component='p'
              variant='h6'
              paragraph
              color={theme.palette.primary.contrastText}
            >
              Check out my latest projects!
            </Typography>
          </Grid>
        </Grid>

        <Grid
          component={Container}
          container
          direction='column'
          justifyContent='space-evenly'
          alignItems='center'
          gap={4}
        >
          {projects.map((project) => (
            <Grid key={project.id} item>
              <ProjectCard project={project} />
            </Grid>
          ))}

          <Grid item>
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
          </Grid>
        </Grid>
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
        projects(pagination: { pageSize: $pageSize, page: $page }) {
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
                    url
                    width
                    height
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

'use client';

import _ from 'lodash';
import type { FC } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import {
  useTheme,
  Container,
  Grid,
  Typography,
  Skeleton,
  Pagination,
  PaginationItem,
} from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { IProject } from '@/types/project';

// Constants
import { RADIX } from '@/constants';
import { PaginationDefaults } from '@/constants/page';

// Components
const ProjectCard = dynamic(
  () => import('@/components/project').then((mod) => mod.ProjectCard),
  {
    ssr: false,
  },
);

const query = gql`
  query ($pageSize: Int!, $page: Int!) {
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
`;

const ProjectsClientPage: FC = () => {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const { data, loading } = useQuery<
    {
      projects: IGraphQLModelResponse<IProject[]>;
    },
    IPagination
  >(query, {
    variables: {
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: _.defaultTo(
        parseInt(searchParams.get('page') as string, RADIX),
        PaginationDefaults.PAGE,
      ),
    },
  });

  return (
    <>
      {/* Projects Hero  Section*/}
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
            variant='h4'
            color='primary.contrastText'
            gutterBottom
          >
            My Projects
          </Typography>

          <Typography variant='body1' color='primary.contrastText' paragraph>
            Projects I have been working on.
          </Typography>
        </Grid>
      </Grid>

      {/* Projects Section */}
      <Container component='section'>
        <Grid container rowGap={6}>
          <Grid
            item
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

          <Grid item xs={4}>
            {loading ? (
              <Skeleton variant='rounded' height={theme.spacing(4)} />
            ) : (
              <Pagination
                variant='outlined'
                color='primary'
                count={data?.projects.meta.pagination.pageCount}
                page={data?.projects.meta.pagination.page}
                renderItem={(item) => (
                  <PaginationItem
                    component={NextLink}
                    href={
                      item.page === 1
                        ? '/projects'
                        : `/projects?page=${item.page}`
                    }
                    {...item}
                  />
                )}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProjectsClientPage;

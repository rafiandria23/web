'use client';

import type { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useTheme, Container, Grid, Typography, Skeleton } from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { IProject } from '@/types/project';

// Constants
import { PaginationDefaults } from '@/constants/page';

// Components
import { ProjectCard } from '@/components/project';

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
  const theme = useTheme();
  const { data, loading } = useQuery<
    {
      projects: IGraphQLModelResponse<IProject[]>;
    },
    IPagination
  >(query, {
    variables: {
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: PaginationDefaults.PAGE,
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
            variant='h3'
            color='primary.contrastText'
            gutterBottom
          >
            My Projects
          </Typography>

          <Typography
            component='p'
            variant='h6'
            color='primary.contrastText'
            paragraph
          >
            Check out my latest projects!
          </Typography>
        </Grid>
      </Grid>

      {/* Projects Section */}
      <Container component='section'>
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
      </Container>
    </>
  );
};

export default ProjectsClientPage;

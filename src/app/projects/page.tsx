import type { FC } from 'react';
import type { Metadata } from 'next';
import { gql } from '@apollo/client';
import { Container, Grid, Typography } from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPagination } from '@/types/page';
import type { IProject } from '@/types/project';

// Constants
import { PaginationDefaults } from '@/constants/page';

// GraphQL
import { client } from '@/graphql';

// Components
import { ProjectCard } from '@/components/project';

const ProjectsPage: FC = async () => {
  const { projects } = await getData();

  return (
    <>
      {/* Projects Hero  Section*/}
      <Grid
        component='section'
        container
        justifyContent='center'
        alignItems='center'
        sx={{
          bgcolor: 'primary.light',
        }}
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
          {projects.map((project) => (
            <Grid key={project.id} item xs={12} xl={5.87}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ProjectsPage;

export interface IProjectsPageData {
  pagination: IPagination;
  projects: IProject[];
}

async function getData(): Promise<IProjectsPageData> {
  const { data } = await client.query<
    {
      projects: IGraphQLModelResponse<IProject[]>;
    },
    IPagination
  >({
    variables: {
      pageSize: PaginationDefaults.PAGE_SIZE,
      page: PaginationDefaults.PAGE,
    },
    query: gql`
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
    `,
  });

  return {
    pagination: data.projects.meta.pagination,
    projects: data.projects.data,
  };
}

export const metadata: Metadata = {
  title: 'My Projects',
  description: "The latest projects I've been involved in so far!",
};

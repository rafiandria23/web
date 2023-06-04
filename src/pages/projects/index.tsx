import type { CSSProperties } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@mui/styles';
import {
  useMediaQuery,
  useTheme,
  Theme,
  Grid,
  Typography,
  Divider,
} from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IProject } from '@/types/project';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { ProjectCard } from '@/components/project';

interface IProjectsPageProps {
  projects: IProject[];
}

const ProjectsPage: NextPage<IProjectsPageProps> = ({ projects }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <>
      <NextSeo
        title='My Projects'
        description="Projects I'm currently doing or already done, ranging from Back-End, Front-End, to Full-Stack"
      />

      <Layout>
        <Grid
          className={classes.wrapper}
          container
          direction='column'
          justifyContent='flex-start'
          alignItems='stretch'
        >
          <Grid item>
            <Typography
              className={classes.title}
              component='h1'
              variant='h5'
              gutterBottom
            >
              My Projects
            </Typography>
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <Grid
            className={classes.list}
            item
            container
            direction='row'
            wrap='wrap'
            justifyContent={isSmallScreen ? 'flex-start' : 'space-evenly'}
            alignItems={isSmallScreen ? 'center' : 'stretch'}
            spacing={2}
          >
            {projects !== undefined && projects.length > 0
              ? projects.map((project) => {
                  return (
                    <Grid item key={project.id}>
                      <ProjectCard project={project} />
                    </Grid>
                  );
                })
              : ''}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<IProjectsPageProps> = async () => {
  const { data } = await client.query<{
    projects: IGraphQLModelResponse<IProject[]>;
  }>({
    query: gql`
      query {
        projects {
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
      projects: data.projects.data,
    },
    revalidate: 1,
  };
};

export default ProjectsPage;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
      } as CSSProperties,
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    list: {
      marginTop: theme.spacing(2),
    },
  }),
);

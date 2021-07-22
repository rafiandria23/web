import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

// Types
import { Project } from '@/types/project';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { ProjectCard } from '@/components/project';

interface ProjectsPageProps {
  projects: Project[];
}

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  const classes = useStyles();

  return (
    <>
      <NextSeo
        title={`My Projects`}
        description={`All the projects I'm currently doing or already done, ranging from Back-End, Front-End, to Full-Stack`}
      />

      <Layout footer={false}>
        <Grid
          className={classes.wrapper}
          container
          direction={`column`}
          justifyContent={`flex-start`}
          alignItems={`stretch`}
          spacing={1}
        >
          <Grid item>
            <Typography
              className={classes.title}
              variant={`h4`}
              component={`h1`}
              gutterBottom
            >
              {`My Projects`}
            </Typography>
          </Grid>

          <Grid
            className={classes.list}
            item
            container
            direction={`column`}
            justifyContent={`space-evenly`}
            alignItems={`stretch`}
          >
            {projects !== undefined && projects.length > 0
              ? projects.map((project) => {
                  return (
                    <Grid item key={project._id}>
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

ProjectsPage.getInitialProps = async () => {
  const { data } = await client.query<{ projects: Project[] }>({
    query: gql`
      query {
        projects {
          _id
          title
          overview
          cover {
            url
            width
            height
          }
          tags {
            id
            name
          }
        }
      }
    `,
  });

  return {
    projects: data.projects,
  };
};

export default ProjectsPage;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      minHeight: '100vh',
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(2, 1),
    },
    title: {
      color: theme.palette.primary.contrastText,
      fontWeight: theme.typography.fontWeightBold,
    },
    list: {
      '& > *': {
        margin: theme.spacing(1, 0),
      },
    },
  }),
);

import {
  NextPage,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
} from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';

// Types
import { Tag } from '@/types/tag';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { ProjectCard } from '@/components/project';

interface ProjectTagsPageProps {
  tag: Tag;
}

const ProjectTagsPage: NextPage<ProjectTagsPageProps> = ({ tag }) => {
  const classes = useStyles();

  return (
    <>
      <NextSeo
        title={tag.name}
        description={`Project that are made with ${tag.name}`}
      />

      <Layout>
        <Grid
          className={classes.wrapper}
          container
          direction={`column`}
          justifyContent={`flex-start`}
          alignItems={`stretch`}
        >
          <Grid item>
            <Typography
              className={classes.title}
              component={`h1`}
              variant={`h5`}
              gutterBottom
            >
              {`${tag.name} Projects`}
            </Typography>
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <Grid
            className={classes.list}
            item
            container
            direction={`row`}
            wrap={`wrap`}
            justifyContent={`space-evenly`}
            alignItems={`stretch`}
          >
            {tag.projects !== undefined && tag.projects.length > 0
              ? tag.projects.map((project) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ tags: Tag[] }>({
    query: gql`
      query {
        tags {
          slug
        }
      }
    `,
  });

  const slugs: GetStaticPathsResult['paths'] = data.tags.map((tag) => ({
    params: {
      slug: tag.slug,
    },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ProjectTagsPageProps,
  { slug: Tag['slug'] }
> = async ({ params }) => {
  const slug = params?.slug;
  const { data } = await client.query<{ tags: Tag[] }>({
    query: gql`
      query ($slug: String!) {
        tags(where: { slug: $slug }) {
          name
          projects {
            _id
            title
            slug
            overview
            cover {
              url
              width
              height
            }
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });

  return {
    props: {
      tag: data.tags[0],
    },
    revalidate: 1,
  };
};

export default ProjectTagsPage;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      padding: theme.spacing(2),
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    list: {
      marginTop: theme.spacing(2),
      '& > *': {
        width: '100%',
        margin: theme.spacing(1.5, 0),
      },
    },
  }),
);

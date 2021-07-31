import {
  NextPage,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
} from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Chip, Button } from '@material-ui/core';
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';

// Types
import { Project } from '@/types/project';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import markdownComponents from '@/components/markdown';

// Utils
import { getPublicID, getBlurredImageURL } from '@/utils/cloudinary';

interface ProjectPageProps {
  project: Project | null;
}

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  const router = useRouter();
  const classes = useStyles();

  return project !== null ? (
    <>
      <NextSeo title={project.title} description={project.overview} />

      <Layout>
        <Grid
          className={classes.wrapper}
          component='article'
          container
          direction={`column`}
          justifyContent={`space-between`}
          alignItems={`stretch`}
        >
          <Grid
            className={classes.header}
            item
            container
            direction={`column`}
            justifyContent={`center`}
            alignItems={`stretch`}
          >
            <Grid item container justifyContent={`center`}>
              <Grid item>
                <Image
                  src={getPublicID(project.cover.url)}
                  alt={project.title}
                  width={project.cover.width}
                  height={project.cover.height}
                  placeholder='blur'
                  blurDataURL={getBlurredImageURL(project.cover.url)}
                />
              </Grid>
            </Grid>

            <Grid item>
              <Typography
                className={classes.title}
                variant={`h4`}
                component={`h1`}
                align={`center`}
                gutterBottom
              >
                {project.title}
              </Typography>

              <Typography
                className={classes.overview}
                variant={`subtitle1`}
                component={`h2`}
                align={`center`}
                paragraph
              >
                {project.overview}
              </Typography>
            </Grid>

            <Grid item>
              <Button
                className={classes.button}
                fullWidth
                variant={`outlined`}
                endIcon={<OpenInNewIcon />}
                href={project.link}
                target={`_blank`}
              >{`Visit Project`}</Button>
            </Grid>
          </Grid>

          <Grid className={classes.description} item>
            <ReactMarkdown components={markdownComponents}>
              {project.description}
            </ReactMarkdown>
          </Grid>

          <Grid className={classes.tags} item container>
            {project.tags.length > 0 &&
              project.tags.map((tag) => (
                <Grid item key={tag._id}>
                  <Chip
                    className={classes.tag}
                    label={tag.name}
                    clickable
                    onClick={() =>
                      router.push({
                        pathname: `/tags/${tag.slug}`,
                      })
                    }
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Layout>
    </>
  ) : (
    <></>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ projects: Project[] }>({
    query: gql`
      query {
        projects {
          slug
        }
      }
    `,
  });

  const slugs: GetStaticPathsResult['paths'] = data.projects.map((project) => ({
    params: {
      slug: project.slug,
    },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ProjectPageProps,
  { slug: Project['slug'] }
> = async ({ params }) => {
  const slug = params?.slug;
  const { data } = await client.query<{ projects: Project[] }>({
    query: gql`
      query ($slug: String!) {
        projects(where: { slug: $slug }) {
          _id
          title
          slug
          overview
          link
          cover {
            url
            width
            height
          }
          description
          tags {
            _id
            name
            slug
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
      project: data.projects[0],
    },
    revalidate: 1,
  };
};

export default ProjectPage;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {},
    header: {
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(2, 1),
      '& > *': {
        margin: theme.spacing(0.8, 0),
      },
    },
    title: {
      color: theme.palette.primary.contrastText,
      fontWeight: theme.typography.fontWeightBold,
    },
    overview: {
      color: theme.palette.primary.contrastText,
    },
    description: {
      padding: theme.spacing(2, 1),
    },
    tags: {
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    tag: {
      color: theme.palette.text.secondary,
    },
    button: {
      color: theme.palette.primary.contrastText,
      borderColor: theme.palette.primary.contrastText,
    },
  }),
);

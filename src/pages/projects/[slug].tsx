import { CSSProperties } from 'react';
import {
  NextPage,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
} from 'next';
import NextLink from 'next/link';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@mui/styles';
import {
  useMediaQuery,
  useTheme,
  Theme,
  Grid,
  Hidden,
  Typography,
  Chip,
  Tooltip,
  Button,
  IconButton,
} from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
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
  project: Project;
}

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <NextSeo
        title={project.title}
        description={project.overview}
        openGraph={{
          images: [
            {
              url: project.cover.url,
            },
          ],
        }}
      />

      <Layout elevate>
        <Grid
          className={classes.header}
          container
          direction={matchesMD ? 'row-reverse' : 'column'}
          wrap='nowrap'
          justifyContent={matchesMD ? 'space-between' : 'center'}
          alignItems={matchesMD ? 'center' : 'stretch'}
        >
          <Grid item container justifyContent='center' md={4}>
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

          <Grid item md={4}>
            <Typography
              className={classes.title}
              variant='h4'
              component='h1'
              align={matchesMD ? 'left' : 'center'}
              gutterBottom
            >
              {project.title}{' '}
              <Hidden smDown>
                <Tooltip title='Visit Project'>
                  <IconButton
                    className={classes.button}
                    href={project.link}
                    target={`_blank`}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
              </Hidden>
            </Typography>

            <Typography
              className={classes.overview}
              variant='subtitle1'
              component='h2'
              align={matchesMD ? 'left' : 'center'}
              paragraph
            >
              {project.overview}
            </Typography>
          </Grid>

          <Hidden mdUp>
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
          </Hidden>
        </Grid>

        <ReactMarkdown
          className={classes.description}
          components={markdownComponents}
        >
          {project.description}
        </ReactMarkdown>

        <Grid className={classes.tags} container>
          {project.tags.length > 0 &&
            project.tags.map((tag) => (
              <Grid item key={tag._id}>
                <NextLink href={`/projects/tags/${tag.slug}`} passHref>
                  <Chip
                    className={classes.tag}
                    component='a'
                    label={tag.name}
                    clickable
                  />
                </NextLink>
              </Grid>
            ))}
        </Grid>
      </Layout>
    </>
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

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    header: {
      backgroundColor: theme.palette.primary.light,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4, 8),
      } as CSSProperties,
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
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
      } as CSSProperties,
    },
    tags: {
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
      } as CSSProperties,
      '& > *': {
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
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

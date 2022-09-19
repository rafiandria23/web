import {
  NextPage,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
} from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@mui/styles';
import {
  useMediaQuery,
  Theme,
  useTheme,
  Grid,
  Typography,
  Divider,
} from '@mui/material';

// Types
import { IGraphQLModelResponse } from '@/types/graphql';
import { Tag } from '@/types/tag';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { ProjectCard } from '@/components/project';

interface IProjectTagsPageProps {
  tag: Tag | null;
}

const ProjectTagsPage: NextPage<IProjectTagsPageProps> = ({ tag }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return tag !== null ? (
    <>
      <NextSeo
        title={tag.attributes.name}
        description={`Projects that are made with ${tag.attributes.name}`}
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
              {`${tag.attributes.name} Projects`}
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
            {tag.attributes.projects !== undefined &&
            tag.attributes.projects.data.length > 0
              ? tag.attributes.projects.data.map((project) => {
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
  ) : (
    <></>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ tags: IGraphQLModelResponse<Tag[]> }>({
    query: gql`
      query {
        tags {
          data {
            id
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  const slugs: GetStaticPathsResult['paths'] = data.tags.data.map((tag) => ({
    params: {
      slug: tag.attributes.slug,
    },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ProjectTagsPageProps,
  { slug: Tag['attributes']['slug'] }
> = async ({ params }) => {
  const slug = String(params?.slug);
  const { data } = await client.query<
    { tags: IGraphQLModelResponse<Tag[]> },
    { slug: Tag['attributes']['slug'] }
  >({
    variables: {
      slug,
    },
    query: gql`
      query ($slug: String!) {
        tags(filters: { slug: { eq: $slug } }) {
          data {
            id
            attributes {
              name
              projects {
                data {
                  id
                  attributes {
                    title
                    slug
                    overview
                    cover {
                      data {
                        id
                        attributes {
                          url
                          width
                          height
                        }
                      }
                    }
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
      tag: data.tags.data && data.tags.data[0] ? data.tags.data[0] : null,
    },
    revalidate: 1,
  };
};

export default ProjectTagsPage;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {},
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    list: {
      marginTop: theme.spacing(2),
    },
  }),
);

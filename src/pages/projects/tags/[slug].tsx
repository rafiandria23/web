import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
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
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { ITag } from '@/types/tag';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components/shared/layout';
import { ProjectCard } from '@/components/project';

export interface IProjectTagsPageProps {
  tag: ITag;
}

const ProjectTagsPage: NextPage<IProjectTagsPageProps> = ({ tag }) => {
  const router = useRouter();
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.up('xs'));
  const classes = useStyles();

  if (router.isFallback) {
    return (
      <Layout>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

  return (
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
            <Typography component='h1' variant='h5' gutterBottom>
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
            justifyContent={isXS ? 'flex-start' : 'space-evenly'}
            alignItems={isXS ? 'center' : 'stretch'}
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
  );
};

export const getServerSideProps: GetServerSideProps<
  IProjectTagsPageProps,
  { slug: ITag['attributes']['slug'] }
> = async ({ params }) => {
  const slug = String(params?.slug);
  const { data } = await client.query<
    { tags: IGraphQLModelResponse<ITag[]> },
    { slug: ITag['attributes']['slug'] }
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
                    overview
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
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  if (!data.tags.data.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tag: data.tags.data[0],
    },
  };
};

export default ProjectTagsPage;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {},
    list: {
      marginTop: theme.spacing(2),
    },
  }),
);

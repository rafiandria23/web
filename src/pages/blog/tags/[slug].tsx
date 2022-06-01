import {
  NextPage,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
} from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, Grid, Typography, Divider } from '@mui/material';

// Types
import { PageInitialProps } from '@/types';
import { GraphQLModelResponse } from '@/types/graphql';
import { Tag } from '@/types/tag';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { ArticleCard } from '@/components/article';

interface ArticleTagsPageProps extends PageInitialProps {
  tag: Tag | null;
}

const ArticleTagsPage: NextPage<ArticleTagsPageProps> = ({ tag }) => {
  const classes = useStyles();

  return tag !== null ? (
    <>
      <NextSeo
        title={tag.attributes.name}
        description={`Articles that are related to ${tag.attributes.name}`}
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
              {`${tag.attributes.name} Articles`}
            </Typography>
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <Grid
            className={classes.list}
            item
            container
            direction='column'
            justifyContent='space-evenly'
            alignItems='stretch'
            spacing={4}
          >
            {tag.attributes.articles !== undefined &&
            tag.attributes.articles.data.length > 0
              ? tag.attributes.articles.data.map((article) => {
                  return (
                    <Grid item key={article.id}>
                      <ArticleCard article={article} />
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </Grid>
      </Layout>
    </>
  ) : (
    <></>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ tags: GraphQLModelResponse<Tag[]> }>({
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
  ArticleTagsPageProps,
  { slug: Tag['attributes']['slug'] }
> = async ({ params }) => {
  const slug = String(params?.slug);
  const { data } = await client.query<
    { tags: GraphQLModelResponse<Tag[]> },
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
              articles {
                data {
                  id
                  attributes {
                    title
                    slug
                    summary
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
                    createdAt
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

export default ArticleTagsPage;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {
      padding: theme.spacing(2),
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    list: {
      marginTop: theme.spacing(1),
      '& > *': {
        margin: theme.spacing(1.5, 0),
      },
    },
  }),
);

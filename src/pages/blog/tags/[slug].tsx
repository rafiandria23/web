import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, Grid, Typography, Divider } from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPageProps } from '@/types/page';
import type { ITag } from '@/types/tag';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components/shared/layout';
import { ArticleCard } from '@/components/article';

export interface IArticleTagsPageProps extends IPageProps {
  tag: ITag;
}

const ArticleTagsPage: NextPage<IArticleTagsPageProps> = ({ tag }) => {
  const router = useRouter();
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
  );
};

export const getServerSideProps: GetServerSideProps<
  IArticleTagsPageProps,
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
              articles {
                data {
                  id
                  attributes {
                    title
                    slug
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
                    publishedAt
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

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
import { PageInitialProps } from '@/types';
import { Tag } from '@/types/tag';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { ArticleCard } from '@/components/article';

interface ArticleTagsPageProps extends PageInitialProps {
  tag: Tag;
}

const ArticleTagsPage: NextPage<ArticleTagsPageProps> = ({ tag }) => {
  const classes = useStyles();

  return (
    <>
      <NextSeo
        title={tag.name}
        description={`Articles that are related to ${tag.name}`}
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
              {`${tag.name} Articles`}
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
            {tag.articles !== undefined && tag.articles.length > 0
              ? tag.articles.map((article) => {
                  return (
                    <Grid item key={article._id}>
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
  ArticleTagsPageProps,
  { slug: Tag['slug'] }
> = async ({ params }) => {
  const slug = params?.slug;
  const { data } = await client.query<{ tags: Tag[] }>({
    query: gql`
      query ($slug: String!) {
        tags(where: { slug: $slug }) {
          name
          articles {
            _id
            title
            slug
            summary
            cover {
              url
              width
              height
            }
            published_at
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

export default ArticleTagsPage;

const useStyles = makeStyles((theme) =>
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

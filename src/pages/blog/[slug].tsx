import {
  NextPage,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
} from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Chip } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

// Types
import { PageInitialProps } from '@/types';
import { Article } from '@/types/article';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import markdownComponents from '@/components/markdown';

interface ArticlePageProps extends PageInitialProps {
  article: Article | null;
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  const router = useRouter();
  const classes = useStyles();

  return article !== null ? (
    <>
      <NextSeo title={article.title} description={article.summary} />

      <Layout>
        <Grid
          className={classes.wrapper}
          component='article'
          container
          direction={`column`}
          justifyContent={`space-between`}
          alignItems={`stretch`}
        >
          <Grid className={classes.header} item container direction='column'>
            <Grid item>
              <Typography
                className={classes.title}
                variant={`h4`}
                component={`h1`}
                align={`left`}
                gutterBottom
              >
                {article.title}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant={`caption`}
                component={`p`}
                align={`left`}
                color='textSecondary'
              >
                {moment(article.createdAt).format('MMMM D, YYYY')}
              </Typography>
            </Grid>
          </Grid>

          <Grid className={classes.content} item>
            <ReactMarkdown components={markdownComponents}>
              {article.content}
            </ReactMarkdown>
          </Grid>

          <Grid
            className={classes.tags}
            item
            container
            direction={`row`}
            wrap={`wrap`}
            justifyContent={`flex-start`}
          >
            {article.tags.length > 0 &&
              article.tags.map((tag) => (
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
  const { data } = await client.query<{ articles: Article[] }>({
    query: gql`
      query {
        articles {
          slug
        }
      }
    `,
  });

  const slugs: GetStaticPathsResult['paths'] = data.articles.map((article) => ({
    params: {
      slug: article.slug,
    },
  }));

  return {
    paths: slugs,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  { slug: Article['slug'] }
> = async ({ params }) => {
  const slug = params?.slug;
  const { data } = await client.query<{ articles: Article[] }>({
    query: gql`
      query ($slug: String!) {
        articles(where: { slug: $slug }) {
          _id
          title
          slug
          summary
          cover {
            url
            width
            height
          }
          content
          tags {
            _id
            name
            slug
          }
          published_at
        }
      }
    `,
    variables: {
      slug,
    },
  });

  return {
    props: {
      article: data.articles[0],
    },
  };
};

export default ArticlePage;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      padding: theme.spacing(2, 1),
      '& > *': {
        margin: theme.spacing(0.8, 0),
      },
    },
    header: {
      '& > *': {
        margin: theme.spacing(0.4, 0),
      },
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    content: {},
    tags: {
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    tag: {
      color: theme.palette.text.secondary,
    },
  }),
);

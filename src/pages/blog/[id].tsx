import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Chip, Divider } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

// Types
import { Article } from '@/types/article';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import markdownComponents from '@/components/markdown';

interface ArticlePageProps {
  article: Article;
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <>
      <NextSeo title={article.title} description={article.summary} />

      <Layout footer={false}>
        <Grid
          className={classes.wrapper}
          container
          direction={`column`}
          justifyContent={`space-between`}
          alignItems={`stretch`}
        >
          <Grid className={classes.header} item container>
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
                className={classes.date}
                variant={`caption`}
                component={`p`}
                align={`left`}
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

          <Grid item>
            <Divider />
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
                    label={tag.name}
                    size={`small`}
                    clickable
                    onClick={() =>
                      router.push({
                        pathname: `/tags/${tag._id}`,
                      })
                    }
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

ArticlePage.getInitialProps = async ({ query }) => {
  const { id } = query;
  const { data } = await client.query<{ article: Article }>({
    query: gql`
      query ($id: ID!) {
        article(id: $id) {
          _id
          title
          summary
          cover {
            url
          }
          content
          tags {
            id
            name
          }
          published_at
        }
      }
    `,
    variables: {
      id,
    },
  });

  return {
    article: data.article,
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
        margin: theme.spacing(0, 0.4),
      },
    },
    date: {
      color: theme.palette.grey[500],
    },
  }),
);

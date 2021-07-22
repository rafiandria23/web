import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

// Types
import { Article } from '@/types/article';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { ArticleCard } from '@/components/article';

interface BlogPageProps {
  articles: Article[];
}

const BlogPage: NextPage<BlogPageProps> = ({ articles }) => {
  const classes = useStyles();

  return (
    <>
      <NextSeo title={`Blog`} />

      <Layout footer={false}>
        <Grid
          className={classes.wrapper}
          container
          direction={`column`}
          justifyContent={`flex-start`}
          alignItems={`stretch`}
          spacing={1}
        >
          <Grid item>
            <Typography
              className={classes.title}
              variant={`h4`}
              component={`h1`}
              gutterBottom
            >
              {`My Blog`}
            </Typography>
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
            {articles !== undefined && articles.length > 0
              ? articles.map((article) => {
                  return (
                    <Grid item key={article._id}>
                      <ArticleCard article={article} />
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

BlogPage.getInitialProps = async () => {
  const { data } = await client.query<{ articles: Article[] }>({
    query: gql`
      query {
        articles {
          _id
          title
          summary
          cover {
            url
            width
            height
          }
          tags {
            _id
            name
          }
          published_at
        }
      }
    `,
  });

  return {
    articles: data.articles,
  };
};

export default BlogPage;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      minHeight: '100vh',
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(2, 1),
    },
    title: {
      color: theme.palette.primary.contrastText,
      fontWeight: theme.typography.fontWeightBold,
    },
    list: {
      '& > *': {
        margin: theme.spacing(1, 0),
      },
    },
  }),
);

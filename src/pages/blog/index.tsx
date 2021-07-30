import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';

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

      <Layout>
        <Grid
          className={classes.wrapper}
          container
          direction={`column`}
          justifyContent={`flex-start`}
          alignItems={`stretch`}
        >
          <Grid item>
            <Typography
              className={classes.title}
              component={`h1`}
              variant={`h5`}
              gutterBottom
            >
              {`My Blog`}
            </Typography>
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <Grid
            className={classes.list}
            item
            container
            direction={`column`}
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

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const { data } = await client.query<{ articles: Article[] }>({
    query: gql`
      query {
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
    props: {
      articles: data.articles,
    },
    revalidate: 10,
  };
};

export default BlogPage;

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

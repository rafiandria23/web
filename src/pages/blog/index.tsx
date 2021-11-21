import { CSSProperties } from 'react';
import { NextPage, GetStaticProps } from 'next';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Hidden, Grid, Typography, Divider, Chip } from '@material-ui/core';

// Types
import { Article } from '@/types/article';
import { Tag } from '@/types/tag';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { ArticleCard } from '@/components/article';

interface BlogPageProps {
  articles: Article[];
  tags: Tag[];
}

const BlogPage: NextPage<BlogPageProps> = ({ articles, tags }) => {
  const classes = useStyles();

  return (
    <>
      <NextSeo title='Blog' />

      <Layout>
        <Hidden mdUp>
          <Grid
            className={classes.wrapper}
            container
            direction='column'
            justifyContent='flex-start'
            alignItems='stretch'
          >
            <Grid item>
              <Typography
                className={classes.bold}
                component='h1'
                variant='h5'
                gutterBottom
              >
                My Blog
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
              {articles !== undefined && articles.length > 0
                ? articles.map((article) => {
                    return (
                      <Grid item key={article._id}>
                        <ArticleCard article={article} />
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </Hidden>

        <Hidden smDown>
          <Grid
            className={classes.wrapper}
            container
            direction='row'
            wrap='nowrap'
            md={12}
          >
            <Grid
              className={classes.listContainer}
              item
              container
              direction='column'
              md={8}
            >
              <Grid item>
                <Typography
                  className={classes.bold}
                  component='h1'
                  variant='h4'
                  gutterBottom
                >
                  My Blog
                </Typography>
              </Grid>

              <Grid
                className={classes.list}
                item
                container
                direction='column'
                justifyContent='space-evenly'
                alignItems='stretch'
              >
                {articles !== undefined && articles.length > 0
                  ? articles.map((article) => {
                      return (
                        <Grid item key={article._id}>
                          <ArticleCard article={article} />
                        </Grid>
                      );
                    })
                  : null}
              </Grid>
            </Grid>

            <Grid item>
              <Divider orientation='vertical' />
            </Grid>

            <Grid
              className={classes.tagsContainer}
              item
              container
              direction='column'
              md={4}
            >
              <Grid item>
                <Typography
                  className={classes.bold}
                  component='h2'
                  variant='h6'
                  gutterBottom
                >
                  All Tags
                </Typography>
              </Grid>

              <Grid className={classes.tags} item container>
                {tags.length > 0 &&
                  tags.map((tag) => (
                    <Grid item key={tag._id}>
                      <NextLink href={`/blog/tags/${tag.slug}`} passHref>
                        <Chip
                          className={classes.tag}
                          component='a'
                          clickable
                          label={tag.name}
                        />
                      </NextLink>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const { data } = await client.query<{ articles: Article[]; tags: Tag[] }>({
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

        tags {
          _id
          name
        }
      }
    `,
  });

  return {
    props: {
      articles: data.articles,
      tags: data.tags,
    },
    revalidate: 1,
  };
};

export default BlogPage;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4, 8),
      } as CSSProperties,
    },
    bold: {
      fontWeight: theme.typography.fontWeightBold,
    },
    listContainer: {
      paddingRight: theme.spacing(8),
    },
    list: {
      marginTop: theme.spacing(1),
      '& > *': {
        margin: theme.spacing(1.5, 0),
      } as CSSProperties,
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(4),
        '& > *': {
          margin: theme.spacing(4, 0),
        },
      } as CSSProperties,
    },
    tagsContainer: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(4),
      } as CSSProperties,
    },
    tags: {
      marginTop: theme.spacing(2),
      '& > *': {
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
      } as CSSProperties,
    },
    tag: {
      color: theme.palette.text.secondary,
    },
  }),
);

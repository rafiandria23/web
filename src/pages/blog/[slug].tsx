import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { useTheme, Container, Grid, Typography, Chip } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPageProps } from '@/types/page';
import type { IArticle } from '@/types/article';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components/shared/layout';
import {
  components as mdComponents,
  remarkPlugins,
  rehypePlugins,
} from '@/components/markdown';

export interface IArticlePageProps extends IPageProps {
  article: IArticle;
}

const ArticlePage: NextPage<IArticlePageProps> = ({ article }) => {
  const router = useRouter();
  const theme = useTheme();

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
        title={article.attributes.title}
        description={article.attributes.overview}
        openGraph={{
          images: [
            {
              url: article.attributes.cover.data.attributes.url,
            },
          ],
        }}
      />

      <Layout>
        <Container component='article'>
          <Grid
            container
            direction='column'
            justifyContent='space-between'
            alignItems='stretch'
          >
            <Grid item container direction='column'>
              <Grid item>
                <Typography
                  variant='h3'
                  component='h1'
                  fontWeight={theme.typography.fontWeightBold}
                >
                  {article.attributes.title}
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  variant='caption'
                  component='p'
                  align='left'
                  color='textSecondary'
                  gutterBottom
                >
                  {dayjs(article.attributes.updatedAt).format('MMMM D, YYYY')}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <ReactMarkdown
                components={mdComponents}
                remarkPlugins={remarkPlugins}
                rehypePlugins={rehypePlugins}
              >
                {article.attributes.content}
              </ReactMarkdown>
            </Grid>

            <Grid
              item
              container
              direction='row'
              wrap='wrap'
              justifyContent='flex-start'
            >
              {article.attributes.tags.data.length > 0 &&
                article.attributes.tags.data.map((tag) => (
                  <Grid item key={tag.id}>
                    <NextLink
                      href={`/blog/tags/${tag.attributes.slug}`}
                      passHref
                    >
                      <Chip label={tag.attributes.name} clickable />
                    </NextLink>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  IArticlePageProps,
  { slug: IArticle['attributes']['slug'] }
> = async ({ params }) => {
  const slug = String(params?.slug);
  const { data } = await client.query<
    { articles: IGraphQLModelResponse<IArticle[]> },
    { slug: IArticle['attributes']['slug'] }
  >({
    variables: {
      slug,
    },
    query: gql`
      query ($slug: String!) {
        articles(filters: { slug: { eq: $slug } }) {
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
              content
              tags {
                data {
                  id
                  attributes {
                    name
                    slug
                  }
                }
              }
              publishedAt
            }
          }
        }
      }
    `,
  });

  if (!data.articles.data.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: data.articles.data[0],
    },
  };
};

export default ArticlePage;

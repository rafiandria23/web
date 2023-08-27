import type { NextPage, GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { Container, Stack } from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPageProps } from '@/types/page';
import type { IArticle } from '@/types/article';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components/shared/layout';
import { ArticleHeader, ArticleContent } from '@/components/article';

export interface IArticlePageProps extends IPageProps {
  article: IArticle;
}

const ArticlePage: NextPage<IArticlePageProps> = ({ article }) => {
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
          <Stack spacing={4}>
            <ArticleHeader article={article} />

            <ArticleContent article={article} />
          </Stack>
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
                    formats
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
                    color
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

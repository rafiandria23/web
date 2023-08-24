import type { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { useTheme, Container, Stack, Typography, Chip } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPageProps } from '@/types/page';
import type { IArticle } from '@/types/article';

// Constants
import { DateTimeFormat } from '@/constants/datetime';

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
  const theme = useTheme();

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
            <Stack>
              <Typography
                variant='caption'
                color={theme.palette.text.secondary}
                paragraph
              >
                {dayjs(article.attributes.updatedAt).format(
                  DateTimeFormat['MMM D, YYYY'],
                )}
              </Typography>

              <Typography
                component='h1'
                variant='h3'
                fontWeight={theme.typography.fontWeightBold}
                gutterBottom
              >
                {article.attributes.title}
              </Typography>

              {article.attributes.tags.data.length > 0 && (
                <Stack direction='row' spacing={1}>
                  {article.attributes.tags.data.map((tag) => (
                    <NextLink
                      key={tag.id}
                      href={`/blog/tags/${tag.attributes.slug}`}
                      passHref
                    >
                      <Chip
                        variant='outlined'
                        color='info'
                        label={tag.attributes.name}
                        clickable
                      />
                    </NextLink>
                  ))}
                </Stack>
              )}
            </Stack>

            <ReactMarkdown
              components={mdComponents}
              remarkPlugins={remarkPlugins}
              rehypePlugins={rehypePlugins}
            >
              {article.attributes.content}
            </ReactMarkdown>
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

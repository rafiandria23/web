import type { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import {
  useTheme,
  Container,
  Stack,
  Grid,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
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
          <Stack>
            <Stack>
              <Typography
                component='h1'
                variant='h3'
                fontWeight={theme.typography.fontWeightBold}
                gutterBottom
              >
                {article.attributes.title}
              </Typography>

              <Typography
                variant='caption'
                color={theme.palette.text.secondary}
                paragraph
              >
                {dayjs(article.attributes.updatedAt).format(
                  DateTimeFormat['MMM D, YYYY'],
                )}
              </Typography>
            </Stack>

            <Divider flexItem />

            <ReactMarkdown
              components={mdComponents}
              remarkPlugins={remarkPlugins}
              rehypePlugins={rehypePlugins}
            >
              {article.attributes.content}
            </ReactMarkdown>

            <Grid
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

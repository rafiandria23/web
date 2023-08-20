import type { NextPage, GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { Grid, Typography, Divider } from '@mui/material';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IPageProps } from '@/types/page';
import type { ITag } from '@/types/tag';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components/shared/layout';
import { ArticleCard } from '@/components/article';

export interface IArticleTagsPageProps extends IPageProps {
  tag: ITag;
}

const ArticleTagsPage: NextPage<IArticleTagsPageProps> = ({ tag }) => {
  return (
    <>
      <NextSeo
        title={tag.attributes.name}
        description={`Articles that are related to ${tag.attributes.name}`}
      />

      <Layout>
        <Grid
          container
          direction='column'
          justifyContent='flex-start'
          alignItems='stretch'
        >
          <Grid item>
            <Typography component='h1' variant='h5' gutterBottom>
              {`${tag.attributes.name} Articles`}
            </Typography>
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <Grid
            item
            container
            direction='column'
            justifyContent='space-evenly'
            alignItems='stretch'
            spacing={4}
          >
            {tag.attributes.articles !== undefined &&
            tag.attributes.articles.data.length > 0
              ? tag.attributes.articles.data.map((article) => {
                  return (
                    <Grid item key={article.id}>
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

export default ArticleTagsPage;

export const getServerSideProps: GetServerSideProps<
  IArticleTagsPageProps,
  { slug: ITag['attributes']['slug'] }
> = async ({ params }) => {
  const slug = String(params?.slug);
  const { data } = await client.query<
    { tags: IGraphQLModelResponse<ITag[]> },
    { slug: ITag['attributes']['slug'] }
  >({
    variables: {
      slug,
    },
    query: gql`
      query ($slug: String!) {
        tags(filters: { slug: { eq: $slug } }) {
          data {
            id
            attributes {
              name
              articles {
                data {
                  id
                  attributes {
                    title
                    slug
                    overview
                    thumbnail {
                      data {
                        id
                        attributes {
                          url
                          width
                          height
                        }
                      }
                    }
                    publishedAt
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  if (!data.tags.data.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tag: data.tags.data[0],
    },
  };
};

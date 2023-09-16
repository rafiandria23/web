import type { FC } from 'react';
import type { Metadata } from 'next';
import { gql } from '@apollo/client';
import { getCldOgImageUrl } from 'next-cloudinary';

// Types
import type { IGraphQLModelResponse } from '@/types/graphql';
import type { IArticle } from '@/types/article';

// GraphQL
import { client } from '@/graphql';

// Components
import { ArticleHeader, ArticleBody } from '@/components/article';

export interface IArticlePageProps {
  params: {
    slug: IArticle['attributes']['slug'];
  };
}

const ArticlePage: FC<IArticlePageProps> = async ({ params }) => {
  const { article } = await getData(params.slug);

  return (
    <>
      {/* Article Header Section */}
      <ArticleHeader article={article} />

      {/* Article Body Section */}
      <ArticleBody article={article} />
    </>
  );
};

export default ArticlePage;

export interface IArticlePageData {
  article: IArticle;
}

async function getData(
  slug: IArticle['attributes']['slug'],
): Promise<IArticlePageData> {
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
            attributes {
              title
              slug
              overview
              cover {
                data {
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
              updatedAt
            }
          }
        }
      }
    `,
  });

  return {
    article: data.articles.data[0],
  };
}

export async function generateMetadata({
  params,
}: IArticlePageProps): Promise<Metadata> {
  const { slug } = params;

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
            attributes {
              title
              slug
              overview
              thumbnail {
                data {
                  attributes {
                    formats
                  }
                }
              }
              tags {
                data {
                  attributes {
                    name
                  }
                }
              }
              publishedAt
              updatedAt
            }
          }
        }
      }
    `,
  });

  const article = data.articles.data[0];

  return {
    title: article.attributes.title,
    description: article.attributes.overview,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      publishedTime: article.attributes.publishedAt as string,
      modifiedTime: article.attributes.updatedAt as string,
      tags: article.attributes.tags.data.map((tag) => tag.attributes.name),
      images: [
        {
          url: getCldOgImageUrl({
            src: article.attributes.thumbnail.data.attributes.formats.thumbnail
              .url,
          }),
          secureUrl: getCldOgImageUrl({
            src: article.attributes.thumbnail.data.attributes.formats.thumbnail
              .url,
          }),
          alt: article.attributes.title,
          width:
            article.attributes.thumbnail.data.attributes.formats.thumbnail
              .width,
          height:
            article.attributes.thumbnail.data.attributes.formats.thumbnail
              .height,
        },
      ],
    },
    twitter: {
      title: article.attributes.title,
      description: article.attributes.overview,
      images: [
        {
          url: getCldOgImageUrl({
            src: article.attributes.thumbnail.data.attributes.formats.thumbnail
              .url,
          }),
          secureUrl: getCldOgImageUrl({
            src: article.attributes.thumbnail.data.attributes.formats.thumbnail
              .url,
          }),
          alt: article.attributes.title,
          width:
            article.attributes.thumbnail.data.attributes.formats.thumbnail
              .width,
          height:
            article.attributes.thumbnail.data.attributes.formats.thumbnail
              .height,
        },
      ],
    },
  };
}
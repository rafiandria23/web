'use client';

import type { FC } from 'react';
import { memo } from 'react';
import { Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';

// Types
import type { IArticle } from '@/types/article';

// Components
import {
  components as mdComponents,
  remarkPlugins,
  rehypePlugins,
} from '@/components/markdown';

export interface IArticleBodyProps {
  article: IArticle;
}

const ArticleBody: FC<IArticleBodyProps> = ({ article }) => {
  return (
    <Container component='article'>
      <ReactMarkdown
        components={mdComponents}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
      >
        {article.attributes.content}
      </ReactMarkdown>
    </Container>
  );
};

export default memo(ArticleBody);

import type { FC } from 'react';
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

// Types
import type { IArticle } from '@/types/article';

// Components
import {
  components as mdComponents,
  remarkPlugins,
  rehypePlugins,
} from '@/components/markdown';

export interface IArticleContentProps {
  article: IArticle;
}

const ArticleContent: FC<IArticleContentProps> = ({ article }) => {
  return (
    <ReactMarkdown
      components={mdComponents}
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
    >
      {article.attributes.content}
    </ReactMarkdown>
  );
};

export default memo(ArticleContent);

import type { FC } from 'react';
import { memo } from 'react';
import { Grid } from '@mui/material';

// Types
import type { IArticle } from '@/types/article';

// Components
import { ArticleCard } from '@/components/article';

interface IArticleListProps {
  articles: IArticle[];
}

const ArticleList: FC<IArticleListProps> = ({ articles }) => {
  return (
    <Grid
      item
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      component='div'
    >
      {articles.map((article) => (
        <Grid key={article.id} item>
          <ArticleCard article={article} />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(ArticleList);

import type { FC } from 'react';
import { memo } from 'react';
import { useTheme, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

// Types
import type { IArticle } from '@/types/article';

// Constants
import { DateTimeFormat } from '@/constants/datetime';

// Components
import { TagChip } from '@/components/tag';

export interface IArticleHeaderProps {
  article: IArticle;
}

const ArticleHeader: FC<IArticleHeaderProps> = ({ article }) => {
  const theme = useTheme();

  return (
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
            <TagChip key={tag.id} tag={tag} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(ArticleHeader);

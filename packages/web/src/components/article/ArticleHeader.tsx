import type { FC } from 'react';
import { memo } from 'react';
import { Box, Stack, Container, Typography } from '@mui/material';
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
  return (
    <Box component='section' bgcolor='primary.light'>
      <Stack component={Container}>
        <Typography variant='overline' color='primary.contrastText' paragraph>
          {dayjs(article.attributes.updatedAt).format(
            DateTimeFormat['MMM D, YYYY'],
          )}
        </Typography>

        <Typography
          component='h1'
          variant='h3'
          color='primary.contrastText'
          gutterBottom
        >
          {article.attributes.title}
        </Typography>

        {article.attributes.tags.data.length > 0 && (
          <Stack
            direction='row'
            flexWrap='wrap'
            useFlexGap
            spacing={{
              xs: 1,
              xl: 2,
            }}
          >
            {article.attributes.tags.data.map((tag) => (
              <TagChip
                key={tag.id}
                tag={tag}
                url={`/blog?tag=${tag.attributes.slug}`}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default memo(ArticleHeader);

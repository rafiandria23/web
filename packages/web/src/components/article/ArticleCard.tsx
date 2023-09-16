'use client';

import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  useTheme,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Tooltip,
} from '@mui/material';
import dayjs from 'dayjs';

// Types
import type { IArticle } from '@/types/article';

// Constants
import { ScreenSize } from '@/constants/screen';
import { DateTimeFormat } from '@/constants/datetime';

// Hooks
import { useScreenSize } from '@/hooks/screen';

// Components
import { Image } from '@/components/utils';

interface IArticleCardProps {
  article: IArticle;
  overview?: boolean;
}

const ArticleCard: FC<IArticleCardProps> = ({ article, overview = true }) => {
  const router = useRouter();
  const theme = useTheme();
  const screenSize = useScreenSize();

  const handleNavigate = useCallback(
    (slug: string) => {
      return () => {
        router.push(`/blog/${slug}`);
      };
    },
    [router],
  );

  return (
    <Tooltip title={article.attributes.title}>
      <Card>
        <CardActionArea onClick={handleNavigate(article.attributes.slug)}>
          <Stack component='article' direction='row'>
            <CardContent component={Stack}>
              <Typography
                component='h3'
                variant='h6'
                gutterBottom
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {article.attributes.title}
              </Typography>

              {overview && (
                <Typography
                  variant='body2'
                  display='block'
                  color='text.secondary'
                  paragraph
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {article.attributes.overview}
                </Typography>
              )}

              <Box flexGrow={1} />

              <Typography
                variant='overline'
                align='left'
                color='text.secondary'
                paragraph
              >
                {dayjs(article.attributes.updatedAt).format(
                  DateTimeFormat['MMM D, YYYY'],
                )}
              </Typography>
            </CardContent>

            <Box flexGrow={1} />

            <CardMedia>
              <Image
                src={
                  article.attributes.thumbnail.data.attributes.formats.thumbnail
                    .url
                }
                alt={article.attributes.title}
                width={
                  article.attributes.thumbnail.data.attributes.formats.thumbnail
                    .width
                }
                height={
                  article.attributes.thumbnail.data.attributes.formats.thumbnail
                    .height
                }
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  width:
                    screenSize === ScreenSize.LARGE
                      ? theme.spacing(15)
                      : theme.spacing(10),
                  height:
                    screenSize === ScreenSize.LARGE
                      ? theme.spacing(15)
                      : theme.spacing(10),
                }}
              />
            </CardMedia>
          </Stack>
        </CardActionArea>
      </Card>
    </Tooltip>
  );
};

export default memo(ArticleCard);

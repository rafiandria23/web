import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
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

interface IArticleCardProps {
  article: IArticle;
  overview?: boolean;
}

const ArticleCard: FC<IArticleCardProps> = ({ article, overview = true }) => {
  const router = useRouter();
  const theme = useTheme();
  const screenSize = useScreenSize();

  const handleNavigate = useCallback(
    (url: string) => {
      return async () => {
        await router.push(url);
      };
    },
    [router],
  );

  return (
    <Tooltip title={article.attributes.title}>
      <Card>
        <CardActionArea
          onClick={handleNavigate(`/blog/${article.attributes.slug}`)}
        >
          <Stack direction='row'>
            <CardContent component={Stack}>
              <Typography
                component='h2'
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
                  textAlign='justify'
                  color={theme.palette.text.secondary}
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
                paragraph
                sx={{
                  textTransform: 'none',
                  color: theme.palette.text.secondary,
                }}
              >
                {dayjs(article.attributes.updatedAt).format(
                  DateTimeFormat['MMM D, YYYY'],
                )}
              </Typography>
            </CardContent>

            <Box flexGrow={1} />

            <CardMedia>
              <NextImage
                src={article.attributes.thumbnail.data.attributes.url}
                alt={article.attributes.title}
                width={article.attributes.thumbnail.data.attributes.width}
                height={article.attributes.thumbnail.data.attributes.height}
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

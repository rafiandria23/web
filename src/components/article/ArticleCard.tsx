import type { FC } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  useTheme,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import dayjs from 'dayjs';

// Types
import type { IArticle } from '@/types/article';

// Constants
import { ScreenSize } from '@/constants/screen';

// Custom Hooks
import { useScreenSize } from '@/hooks/screen';

interface IArticleCardProps {
  article: IArticle;
  overview?: boolean;
}

const ArticleCard: FC<IArticleCardProps> = ({ article, overview = true }) => {
  const theme = useTheme();
  const screenSize = useScreenSize();

  return (
    <Card>
      <CardActionArea
        LinkComponent={NextLink}
        href={`/blog/${article.attributes.slug}`}
      >
        <Stack direction='row'>
          <CardContent component={Stack}>
            <Typography variant='h5' gutterBottom>
              {article.attributes.title}
            </Typography>

            {overview && (
              <Typography
                variant='body2'
                gutterBottom
                color={theme.palette.text.secondary}
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {article.attributes.overview}
              </Typography>
            )}

            <Box flexGrow={1} />

            <Typography
              variant='overline'
              component='p'
              align='left'
              sx={{
                textTransform: 'none',
                color: theme.palette.text.secondary,
              }}
            >
              {dayjs(article.attributes.updatedAt).format('MMM D, YYYY')}
            </Typography>
          </CardContent>

          <CardMedia>
            <Image
              src={article.attributes.thumbnail.data.attributes.url}
              alt={article.attributes.title}
              width={article.attributes.thumbnail.data.attributes.width}
              height={article.attributes.thumbnail.data.attributes.height}
              style={{
                display: 'block',
                objectFit: 'cover',
                width:
                  screenSize === ScreenSize.LARGE
                    ? theme.spacing(40)
                    : theme.spacing(15),
                height:
                  screenSize === ScreenSize.LARGE
                    ? theme.spacing(40)
                    : theme.spacing(15),
              }}
            />
          </CardMedia>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default ArticleCard;

import type { FC } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import type { SxProps, Theme } from '@mui/material';
import {
  useTheme,
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';

// Types
import type { IArticle } from '@/types/article';

interface IArticleCardProps {
  article: IArticle;
  sx?: SxProps<Theme>;
}

const ArticleCard: FC<IArticleCardProps> = ({ article, sx }) => {
  const theme = useTheme();

  return (
    <NextLink href={`/blog/${article.attributes.slug}`} passHref>
      <CardActionArea>
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant='h5' gutterBottom>
                {article.attributes.title}
              </Typography>

              <Typography variant='body2' color={theme.palette.text.secondary}>
                {article.attributes.overview}
              </Typography>
            </CardContent>

            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
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
            </Box>
          </Box>

          <CardMedia>
            <Image
              src={article.attributes.thumbnail.data.attributes.url}
              alt={article.attributes.title}
              width={article.attributes.thumbnail.data.attributes.width}
              height={article.attributes.thumbnail.data.attributes.height}
              placeholder='blur'
              blurDataURL={article.attributes.thumbnail.data.attributes.url}
              style={{
                // display: 'block',
                objectFit: 'cover',
                width: theme.spacing(40),
                height: theme.spacing(40),
              }}
            />
          </CardMedia>
        </Card>
      </CardActionArea>
    </NextLink>
  );
};

export default ArticleCard;

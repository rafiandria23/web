import type { FC } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  useTheme,
  useMediaQuery,
  // Hidden,
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';

// Types
import type { IArticle } from '@/types/article';

interface IArticleCardProps {
  article: IArticle;
}

const ArticleCard: FC<IArticleCardProps> = ({ article }) => {
  const theme = useTheme();
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <Card>
      <CardActionArea
        LinkComponent={NextLink}
        href={`/blog/${article.attributes.slug}`}
      >
        <Box
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
              style={{
                display: 'block',
                objectFit: 'cover',
                width: xlUp ? theme.spacing(40) : theme.spacing(15),
                height: xlUp ? theme.spacing(40) : theme.spacing(15),
              }}
            />
          </CardMedia>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ArticleCard;

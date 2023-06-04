import type { FC } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  useTheme,
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import dayjs from 'dayjs';

// Types
import type { IArticle } from '@/types/article';

interface IArticleCardProps {
  article: IArticle;
}

const ArticleCard: FC<IArticleCardProps> = ({ article }) => {
  const theme = useTheme();

  return (
    <NextLink href={`/blog/${article.attributes.slug}`} passHref>
      <CardActionArea>
        <Card>
          <CardMedia>
            <Image
              src={article.attributes.thumbnail.data.attributes.url}
              alt={article.attributes.title}
              width={article.attributes.thumbnail.data.attributes.width}
              height={article.attributes.thumbnail.data.attributes.height}
              objectFit='contain'
              placeholder='blur'
              blurDataURL={article.attributes.thumbnail.data.attributes.url}
            />
          </CardMedia>

          <CardContent>
            <Typography variant='h5' gutterBottom>
              {article.attributes.title}
            </Typography>
            <Typography variant='body2' color={theme.palette.text.secondary}>
              {article.attributes.overview}
            </Typography>
          </CardContent>

          <CardActions
            sx={{
              px: theme.spacing(2),
            }}
          >
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
          </CardActions>
        </Card>
      </CardActionArea>
    </NextLink>
  );
};

export default ArticleCard;

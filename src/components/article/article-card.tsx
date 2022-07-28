import { FC } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  // useMediaQuery,
  useTheme,
  Typography,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import moment from 'moment';

// Types
import { IArticle } from '@/types/article';

//  Utils
import { getPublicID, getBlurredImageURL } from '@/utils/cloudinary';

interface IArticleCardProps {
  article: IArticle;
}

const ArticleCard: FC<IArticleCardProps> = ({ article }) => {
  const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <NextLink href={`/blog/${article.attributes.slug}`} passHref>
      <CardActionArea>
        <Card>
          <CardMedia>
            <Image
              src={getPublicID(article.attributes.cover.data.attributes.url)}
              alt={article.attributes.title}
              width={article.attributes.cover.data.attributes.width}
              height={article.attributes.cover.data.attributes.height}
              objectFit='contain'
              placeholder='blur'
              blurDataURL={getBlurredImageURL(
                article.attributes.cover.data.attributes.url,
              )}
            />
          </CardMedia>

          <CardContent>
            <Typography variant='h5' gutterBottom>
              {article.attributes.title}
            </Typography>
            <Typography variant='body2' color={theme.palette.text.secondary}>
              {article.attributes.summary}
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
              {moment(article.attributes.updatedAt).format('MMM D, YYYY')}
            </Typography>
          </CardActions>
        </Card>
      </CardActionArea>
    </NextLink>
  );
};

export default ArticleCard;

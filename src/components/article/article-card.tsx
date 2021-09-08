import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  useMediaQuery,
  ButtonBase,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import moment from 'moment';

// Types
import { Article } from '@/types/article';

//  Utils
import { getPublicID, getBlurredImageURL } from '@/utils/cloudinary';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();

  return (
    <ButtonBase
      className={classes.wrapper}
      onClick={() =>
        router.push({
          pathname: `/blog/${article.slug}`,
        })
      }
    >
      <Grid container wrap='nowrap'>
        <Grid item container direction='column'>
          <Grid item>
            <Typography
              className={classes.title}
              variant='h6'
              component='h2'
              align='left'
              gutterBottom
            >
              {article.title}
            </Typography>

            <Hidden xsDown>
              <Typography
                className={classes.summary}
                variant='caption'
                align='left'
                paragraph
              >
                {article.summary}
              </Typography>
            </Hidden>
          </Grid>

          <Grid item>
            <Typography
              className={classes.date}
              variant={`overline`}
              component={`p`}
              align={`left`}
            >
              {moment(article.createdAt).format('MMM D')}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={3} container justifyContent='flex-end'>
          <Grid item>
            <Image
              src={getPublicID(article.cover.url)}
              alt={article.title}
              width={article.cover.width}
              height={article.cover.width}
              placeholder='blur'
              blurDataURL={getBlurredImageURL(article.cover.url)}
            />
          </Grid>
        </Grid>
      </Grid>
    </ButtonBase>
  );
};

export default ArticleCard;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      width: '100%',
    },
    title: {},
    summary: {},
    date: {
      textTransform: 'none',
      color: theme.palette.text.secondary,
    },
  }),
);

import { FC } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { makeStyles, createStyles } from '@mui/styles';
import {
  // useMediaQuery,
  useTheme,
  Theme,
  ButtonBase,
  Grid,
  Hidden,
  Typography,
} from '@mui/material';
import moment from 'moment';

// Types
import { Article } from '@/types/article';

//  Utils
import { getPublicID, getBlurredImageURL } from '@/utils/cloudinary';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const theme = useTheme();
  // const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();

  return (
    <NextLink href={`/blog/${article.slug}`} passHref>
      <ButtonBase className={classes.wrapper}>
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
                {moment(article.published_at).format('MMM D')}
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
    </NextLink>
  );
};

export default ArticleCard;

const useStyles = makeStyles<Theme>((theme) =>
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

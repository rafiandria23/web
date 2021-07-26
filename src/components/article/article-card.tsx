import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ButtonBase, Grid, Typography } from '@material-ui/core';
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
  const classes = useStyles();

  return (
    <ButtonBase
      onClick={() =>
        router.push({
          pathname: `/blog/${article.slug}`,
        })
      }
    >
      <Grid
        container
        direction={`row-reverse`}
        wrap={`nowrap`}
        justifyContent={`space-between`}
        alignItems={`stretch`}
        spacing={1}
      >
        <Grid item xs={3}>
          <Image
            src={getPublicID(article.cover.url)}
            alt={article.title}
            width={article.cover.width}
            height={article.cover.height}
            placeholder='blur'
            blurDataURL={getBlurredImageURL(article.cover.url)}
          />
        </Grid>

        <Grid
          item
          xs={9}
          container
          direction={`column`}
          justifyContent={`center`}
          alignItems={`stretch`}
        >
          <Grid item>
            <Typography
              className={classes.title}
              variant='h6'
              align='left'
              gutterBottom
            >
              {article.title}
            </Typography>

            {/* <Typography
              className={classes.summary}
              variant='caption'
              align='left'
              paragraph
            >
              {article.summary}
            </Typography> */}
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
      </Grid>
    </ButtonBase>
  );
};

export default ArticleCard;

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {},
    summary: {},
    date: {
      textTransform: 'none',
      color: theme.palette.text.secondary,
    },
  }),
);

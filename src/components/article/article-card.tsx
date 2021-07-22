import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import moment from 'moment';

// Types
import { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
      onClick={() =>
        router.push({
          pathname: `/blog/${article._id}`,
        })
      }
    >
      <Grid
        className={classes.wrapper}
        container
        direction={`row-reverse`}
        wrap={`nowrap`}
        justifyContent={`space-between`}
        alignItems={`stretch`}
      >
        <Grid item>
          <Image
            src={article.cover.url}
            alt={article.title}
            width={100}
            height={100}
          />
        </Grid>

        <Grid
          item
          container
          direction={`column`}
          justifyContent={`center`}
          alignItems={`stretch`}
        >
          <Grid item>
            <Typography
              className={classes.title}
              variant={`subtitle1`}
              align={`left`}
              gutterBottom
            >
              {article.title}
            </Typography>

            <Typography
              className={classes.summary}
              variant={`caption`}
              align={`left`}
              paragraph
            >
              {article.summary}
            </Typography>
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
    </Paper>
  );
};

export default ArticleCard;

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1, 0.5),
    },
    wrapper: {
      '& > *': {
        margin: theme.spacing(0, 0.8),
      },
    },
    title: {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightBold,
    },
    summary: {
      color: theme.palette.text.primary,
    },
    date: {
      color: theme.palette.grey[500],
    },
  }),
);

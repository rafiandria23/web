import { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

// Types
import { Article } from '@/types/article';

// Components
import { ArticleCard } from '@/components/article';

interface LatestArticlesBannerProps {
  articles: Article[];
}

const LatestArticlesBanner: FC<LatestArticlesBannerProps> = ({ articles }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      classes={{ container: classes.wrapper }}
      direction={`column`}
      justifyContent={`center`}
      alignItems={`center`}
      component={`section`}
    >
      <Grid item classes={{ root: classes.title }}>
        <Typography variant={`h2`} color={`secondary`} gutterBottom>
          Latest Articles
        </Typography>
      </Grid>
      <Grid
        container
        alignItems={`stretch`}
        justifyContent={`space-evenly`}
        component={`section`}
      >
        {articles.map((article) => {
          return (
            <Grid item key={article._id}>
              <ArticleCard article={article} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default LatestArticlesBanner;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.primary.main,
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    title: {
      paddingBottom: theme.spacing(8),
    },
  }),
);

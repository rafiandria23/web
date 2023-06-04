import { FC } from 'react';
import Image from 'next/image';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, Grid, Typography } from '@mui/material';

// Types
import type { IArticle } from '@/types/article';

interface IArticleHeaderProps {
  article: IArticle;
}

const ArticleHeader: FC<IArticleHeaderProps> = ({ article }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      classes={{ container: classes.projectPageWrapper }}
      direction='column'
      justifyContent='space-around'
      alignItems='center'
      component='section'
    >
      <Grid item>
        <Typography variant='h2' classes={{ root: classes.projectName }}>
          {article.attributes.title}
        </Typography>
      </Grid>
      <Grid item>
        <Image
          src={article.attributes.cover.data.attributes.url}
          alt={article.attributes.title}
          layout='fill'
        />
      </Grid>
    </Grid>
  );
};

export default ArticleHeader;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    projectPageWrapper: {
      backgroundColor: theme.palette.primary.main,
    },
    projectName: {
      color: theme.palette.secondary.main,
      fontWeight: 'bolder',
    },
  }),
);

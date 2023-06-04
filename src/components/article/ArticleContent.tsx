import { memo, FC } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';

// Components
import markdownComponents from '@/components/markdown';

interface IArticleContentProps {
  content: string;
}

const ArticleContent: FC<IArticleContentProps> = ({ content }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      classes={{ container: classes.wrapper }}
      direction='column'
      justifyContent='space-around'
      alignItems='stretch'
      component='section'
    >
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </Grid>
  );
};

export default memo(ArticleContent);

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {
      paddingLeft: theme.spacing(20),
      paddingRight: theme.spacing(20),
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
  }),
);

import { FC, useEffect } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';

// Config
import { CMS_URI } from '@/config';

interface PostContentProps {
  content: string;
}

const PostContent: FC<PostContentProps> = ({ content }: PostContentProps) => {
  const classes = useStyles();

  useEffect(() => {
    content.split('/uploads/').join(`${CMS_URI}/uploads/`);
  }, [content]);

  return (
    <Grid
      container
      classes={{ container: classes.wrapper }}
      direction={`column`}
      justifyContent={`space-around`}
      alignItems={`stretch`}
      component={`section`}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Grid>
  );
};

export default PostContent;

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

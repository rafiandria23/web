import { makeStyles, createStyles } from '@mui/styles';
import { useTheme, Theme, Link, Typography } from '@mui/material';
import { Components } from 'react-markdown/lib/ast-to-react';

const Anchor: Components['a'] = ({ href, children }) => {
  const theme = useTheme();

  return (
    <Link color='secondary' href={href} target='_blank'>
      {children}
    </Link>
  );
};

const Heading1: Components['h1'] = (props) => {
  return (
    <Typography
      variant='h1'
      component='h1'
      align='left'
      gutterBottom
      color='textPrimary'
    >
      {props.children}
    </Typography>
  );
};

const Heading2: Components['h2'] = (props) => {
  return (
    <Typography
      variant='h2'
      component='h2'
      align='left'
      gutterBottom
      color='textPrimary'
    >
      {props.children}
    </Typography>
  );
};

const Heading3: Components['h3'] = (props) => {
  return (
    <Typography
      variant='h3'
      component='h3'
      align='left'
      gutterBottom
      color='textPrimary'
    >
      {props.children}
    </Typography>
  );
};

const Heading4: Components['h4'] = (props) => {
  return (
    <Typography
      variant='h4'
      component='h4'
      align='left'
      gutterBottom
      color='textPrimary'
    >
      {props.children}
    </Typography>
  );
};

const Heading5: Components['h5'] = (props) => {
  return (
    <Typography
      variant='h5'
      component='h5'
      align='left'
      gutterBottom
      color='textPrimary'
    >
      {props.children}
    </Typography>
  );
};

const Heading6: Components['h6'] = (props) => {
  return (
    <Typography
      // classes={{ root: classes.markdownParagraph }}
      variant='h6'
      component='p'
      align='left'
      gutterBottom
      paragraph
      color='textPrimary'
    >
      {props.children}
    </Typography>
  );
};

const Paragraph: Components['p'] = (props) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.paragraph}
      variant='body1'
      component='p'
      align='left'
      gutterBottom
      paragraph
      color='textPrimary'
    >
      {props.children}
    </Typography>
  );
};

const components: Components = {
  a: Anchor,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  p: Paragraph,
};

export default components;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    paragraph: {
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

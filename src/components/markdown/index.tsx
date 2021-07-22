import { FC, HTMLProps, DetailedHTMLProps, AnchorHTMLAttributes } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link, Typography } from '@material-ui/core';
import { Components } from 'react-markdown/src/ast-to-react';

const Anchor: FC<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = ({ href, children }) => {
  return (
    <Link href={href} target={`_blank`}>
      {children}
    </Link>
  );
};

const Heading1: FC<HTMLProps<HTMLHeadingElement>> = (props) => {
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

const Heading2: FC<HTMLProps<HTMLHeadingElement>> = (props) => {
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

const Heading3: FC<HTMLProps<HTMLHeadingElement>> = (props) => {
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

const Heading4: FC<HTMLProps<HTMLHeadingElement>> = (props) => {
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

const Heading5: FC<HTMLProps<HTMLHeadingElement>> = (props) => {
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

const Heading6: FC<HTMLProps<HTMLHeadingElement>> = (props) => {
  return (
    <Typography
      // classes={{ root: classes.markdownParagraph }}
      variant={`h6`}
      component={`p`}
      align={`left`}
      gutterBottom
      paragraph
      color={`textPrimary`}
    >
      {props.children}
    </Typography>
  );
};

const Paragraph: FC<HTMLProps<HTMLParagraphElement>> = (props) => {
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

const useStyles = makeStyles((theme) =>
  createStyles({
    paragraph: {
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

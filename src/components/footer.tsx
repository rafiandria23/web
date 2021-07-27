import { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const Footer: FC = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.wrapper}
      container
      justifyContent='center'
      alignItems='center'
    >
      <Grid item>
        <Typography
          className={classes.copyright}
          variant='subtitle2'
          component='p'
        >
          Copyright &copy; 2020 Adam Rafiandri.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      padding: theme.spacing(1, 0),
      background: theme.palette.primary.light,
    },
    copyright: {
      color: theme.palette.primary.contrastText,
    },
  }),
);

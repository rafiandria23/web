import { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import moment from 'moment';

const Footer: FC = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.wrapper}
      component='footer'
      container
      justifyContent='center'
      alignItems='center'
    >
      <Grid item>
        <Typography
          className={classes.copyright}
          variant='subtitle1'
          component='p'
        >
          Copyright &copy; {moment().format('YYYY')} Adam Rafiandri.
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

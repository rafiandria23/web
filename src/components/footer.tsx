import { FC } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, Container, Grid, Typography } from '@mui/material';
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
        <Container>
          <Typography
            className={classes.copyright}
            variant='subtitle1'
            component='p'
          >
            Copyright &copy; {moment().format('YYYY')} Adam Rafiandri.
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Footer;

const useStyles = makeStyles<Theme>((theme) =>
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

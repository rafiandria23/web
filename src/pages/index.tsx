import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

// Components
import { Layout } from '@/components';

const HomePage: NextPage = () => {
  const classes = useStyles();

  return (
    <>
      <NextSeo
        title={`Home`}
        description={`Adam Rafiandri is a Software Engineer who's passionate about Computer Science`}
      />

      <Layout>
        <Grid
          container
          className={classes.wrapper}
          direction={`column`}
          justifyContent={`space-evenly`}
          alignItems={`center`}
        >
          <Grid item>
            <Typography
              className={classes.title}
              variant={`h2`}
              component={`h1`}
              gutterBottom
            >
              {`Hey, I'm Adam.`}
            </Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.text} variant={`h6`} paragraph>
              {`Software engineer from Bogor, Indonesia. I create web, mobile,
                and desktop applications to help businesses grow online.`}
            </Typography>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default HomePage;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(2, 1),
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.contrastText,
    },
    text: {
      color: theme.palette.primary.contrastText,
    },
  }),
);

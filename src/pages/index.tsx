import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

// Types
import { Company } from '@/types/company';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { WorkExperienceTimeline } from '@/components/work-experience';

interface HomePageProps {
  companies: Company[];
}

const HomePage: NextPage<HomePageProps> = ({ companies }) => {
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
          direction={`column`}
          justifyContent={`space-evenly`}
          alignItems={`center`}
        >
          {/* Introduction */}
          <Grid
            container
            className={classes.introduction}
            direction={`column`}
            justifyContent={`space-evenly`}
            alignItems={`center`}
          >
            <Grid item>
              <Typography
                className={clsx(classes.title, classes.introductionTitle)}
                variant={`h2`}
                component={`h1`}
                gutterBottom
              >
                {`Hey, I'm Adam.`}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                className={classes.text}
                variant={`h6`}
                component='p'
                paragraph
              >
                {`Software engineer from Bogor, Indonesia. I create web, mobile,
                and desktop applications to help businesses grow online.`}
              </Typography>
            </Grid>
          </Grid>

          {/* Work Experiences */}
          <Grid
            className={classes.workExperiences}
            item
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
          >
            <Grid item>
              <Typography
                className={classes.title}
                variant='h5'
                component='h2'
                align='left'
                gutterBottom
              >
                Work Experiences
              </Typography>
            </Grid>

            <Grid item>
              <WorkExperienceTimeline companies={companies} />
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const { data } = await client.query<{ companies: Company[] }>({
    query: gql`
      query {
        companies {
          _id
          name
          logo {
            url
            width
            height
          }
          link
          workExperiences {
            _id
            title
            employmentType
            company {
              _id
            }
            location
            current
            startDate
            endDate
            description
          }
        }
      }
    `,
  });

  return {
    props: {
      companies: data.companies,
    },
    revalidate: 10,
  };
};

export default HomePage;

const useStyles = makeStyles((theme) =>
  createStyles({
    introduction: {
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(2, 1),
    },
    introductionTitle: {
      color: theme.palette.primary.contrastText,
    },
    workExperiences: {
      padding: theme.spacing(2, 1),
      '& > *': {
        width: '100%',
      },
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    text: {
      color: theme.palette.primary.contrastText,
    },
  }),
);

import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

// Types
import { Company } from '@/types/company';
import { SkillType } from '@/types/skill';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { WorkExperienceTimeline } from '@/components/work-experience';
import { SkillProgressList } from '@/components/skill';

interface HomePageProps {
  companies: Company[];
  skillTypes: SkillType[];
}

const HomePage: NextPage<HomePageProps> = ({ companies, skillTypes }) => {
  const theme = useTheme();
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
            className={clsx(classes.banner, classes.coloredBanner)}
            item
            container
            component='section'
            direction={`column`}
            justifyContent={`space-evenly`}
            alignItems={`center`}
          >
            <Grid item>
              <Typography
                className={clsx(classes.title, classes.text)}
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
            className={clsx(classes.banner, classes.workExperienceBanner)}
            item
            container
            component='section'
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

          {/* Skill Progress */}
          <Grid
            className={clsx(
              classes.banner,
              classes.coloredBanner,
              classes.skillProgressBanner,
            )}
            item
            container
            component='section'
            direction={`column`}
            justifyContent={`space-evenly`}
            alignItems={`flex-start`}
          >
            <Grid item>
              <Typography
                className={clsx(classes.title, classes.text)}
                variant='h5'
                component='h2'
                align='left'
                gutterBottom
              >
                Skills
              </Typography>
            </Grid>

            <Grid item>
              <SkillProgressList skillTypes={skillTypes} />
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const { data } = await client.query<{
    companies: Company[];
    skillTypes: SkillType[];
  }>({
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

        skillTypes {
          _id
          name
          skills {
            _id
            name
            level
          }
        }
      }
    `,
  });

  return {
    props: {
      companies: data.companies,
      skillTypes: data.skillTypes,
    },
    revalidate: 10,
  };
};

export default HomePage;

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    text: {
      color: theme.palette.primary.contrastText,
    },
    banner: {
      padding: theme.spacing(2, 1),
    },
    coloredBanner: {
      backgroundColor: theme.palette.primary.light,
    },
    introductionBanner: {},
    workExperienceBanner: {
      '& > *': {
        width: '100%',
      },
    },
    skillProgressBanner: {},
  }),
);

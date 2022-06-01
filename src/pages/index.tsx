import { CSSProperties } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import { makeStyles, createStyles } from '@mui/styles';
import {
  useMediaQuery,
  useTheme,
  Theme,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import clsx from 'clsx';

// Types
import { GraphQLModelResponse } from '@/types/graphql';
import { Company } from '@/types/company';
import { SkillType } from '@/types/skill';
import { Education } from '@/types/education';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { WorkExperienceTimeline } from '@/components/work-experience';
import { SkillProgressList, SkillTabs } from '@/components/skill';
import { EducationTimeline } from '@/components/education';

interface HomePageProps {
  companies: Company[];
  skillTypes: SkillType[];
  educations: Education[];
}

const HomePage: NextPage<HomePageProps> = ({
  companies,
  skillTypes,
  educations,
}) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();

  return (
    <>
      <NextSeo
        title={`Adam Rafiandri's Personal Web`}
        description={`Adam Rafiandri is a Software Engineer who's passionate about Computer Science`}
      />

      <Layout elevate>
        {/* Introduction */}
        <Grid
          className={clsx(
            classes.banner,
            classes.coloredBanner,
            classes.introductionBanner,
          )}
          container
          direction='column'
          justifyContent='space-evenly'
          alignItems='stretch'
        >
          <Grid item>
            <Container>
              <Typography
                className={clsx(classes.title, classes.text)}
                variant='h2'
                component='h1'
                gutterBottom
              >
                Hey, I&apos;m Adam
              </Typography>
            </Container>
          </Grid>

          <Grid item>
            <Container>
              <Typography
                className={classes.text}
                variant='h6'
                component='p'
                paragraph
              >
                Software engineer from Bogor, Indonesia. I develop web, mobile,
                and desktop applications to help businesses grow online.
              </Typography>
            </Container>
          </Grid>
        </Grid>

        {/* Work Experiences */}
        <Grid
          className={clsx(classes.banner, classes.workExperienceBanner)}
          container
          component={Container}
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item>
            <Typography
              className={classes.title}
              variant='h5'
              component='h2'
              align={matchesSM ? 'center' : 'left'}
              gutterBottom
            >
              Work Experiences
            </Typography>
          </Grid>

          <Grid item>
            <WorkExperienceTimeline companies={companies} />
          </Grid>
        </Grid>

        {/* Skills */}
        <Grid
          className={clsx(
            classes.banner,
            classes.coloredBanner,
            classes.skillsBanner,
          )}
          container
          component={Container}
          direction={`column`}
          justifyContent={`space-evenly`}
          alignItems={`flex-start`}
        >
          <Grid item>
            <Typography
              className={clsx(classes.title, classes.text)}
              variant='h5'
              component='h2'
              align={matchesSM ? 'center' : 'left'}
              gutterBottom
            >
              Skills
            </Typography>
          </Grid>

          <Grid item>
            {matchesSM ? (
              <SkillTabs skillTypes={skillTypes} />
            ) : (
              <SkillProgressList skillTypes={skillTypes} />
            )}
          </Grid>
        </Grid>

        {/* Educations */}
        <Grid
          className={clsx(classes.banner, classes.educationBanner)}
          container
          component={Container}
          direction={`column`}
          justifyContent={`space-evenly`}
          alignItems={`flex-start`}
        >
          <Grid item>
            <Typography
              className={clsx(classes.title)}
              variant='h5'
              component='h2'
              align={matchesSM ? 'center' : 'left'}
              gutterBottom
            >
              Educations
            </Typography>
          </Grid>

          <Grid item>
            <EducationTimeline educations={educations} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const { data } = await client.query<{
    companies: GraphQLModelResponse<Company[]>;
    skillTypes: GraphQLModelResponse<SkillType[]>;
    educations: GraphQLModelResponse<Education[]>;
  }>({
    query: gql`
      query {
        companies {
          data {
            id
            attributes {
              name
              logo {
                data {
                  id
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
              link
              work_experiences {
                data {
                  id
                  attributes {
                    position
                    type
                    location
                    is_current
                    start_date
                    end_date
                    description
                  }
                }
              }
            }
          }
        }

        skillTypes {
          data {
            id
            attributes {
              name
              skills {
                data {
                  id
                  attributes {
                    name
                    level
                    slug
                  }
                }
              }
            }
          }
        }

        educations {
          data {
            id
            attributes {
              degree
              field
              start_date
              end_date
              grade
              description
              school {
                data {
                  id
                  attributes {
                    name
                    logo {
                      data {
                        id
                        attributes {
                          url
                          width
                          height
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      companies: data.companies.data,
      skillTypes: data.skillTypes.data,
      educations: data.educations.data,
    },
    revalidate: 1,
  };
};

export default HomePage;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    text: {
      color: theme.palette.primary.contrastText,
    },
    banner: {
      padding: theme.spacing(2, 1),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4, 8),
      } as CSSProperties,
      '& > *': {
        width: '100%',
      },
    },
    coloredBanner: {
      backgroundColor: theme.palette.primary.light,
    },
    introductionBanner: {
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
      } as CSSProperties,
    },
    workExperienceBanner: {},
    skillsBanner: {},
    educationBanner: {},
  }),
);

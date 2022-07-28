import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { gql } from '@apollo/client';
import {
  useMediaQuery,
  useTheme,
  Container,
  Grid,
  Typography,
} from '@mui/material';

// Types
import { IGraphQLModelResponse } from '@/types/graphql';
import { ICompany } from '@/types/company';
import { ISkillType } from '@/types/skill';
import { IEducation } from '@/types/education';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { WorkExperienceTimeline } from '@/components/work-experience';
import { SkillTabs } from '@/components/skill';
import { EducationTimeline } from '@/components/education';

interface IHomePageProps {
  companies: ICompany[];
  skillTypes: ISkillType[];
  educations: IEducation[];
}

const HomePage: NextPage<IHomePageProps> = ({
  companies,
  skillTypes,
  educations,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <NextSeo
        title="Adam Rafiandri's Personal Web"
        description="Adam Rafiandri is a Software Engineer who's passionate about science and technology."
      />

      <Layout elevate>
        {/* Introduction */}
        <Grid
          container
          direction='column'
          justifyContent='space-evenly'
          alignItems='stretch'
          component={Container}
          sx={{
            bgcolor: theme.palette.primary.light,
            p: theme.spacing(2, 1),
            [theme.breakpoints.up('md')]: {
              p: theme.spacing(4, 8),
            },
            '& > *': {
              width: '100%',
            },
          }}
        >
          <Grid item>
            <Typography
              variant='h2'
              component='h1'
              gutterBottom
              color={theme.palette.primary.contrastText}
              sx={{
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              Hey, I&apos;m Adam.
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant='h6'
              component='p'
              paragraph
              color={theme.palette.primary.contrastText}
            >
              Software Engineer from Bogor, Indonesia. I develop web, mobile,
              and desktop applications to help businesses grow online.
            </Typography>
          </Grid>
        </Grid>

        {/* Work Experiences */}
        <Grid
          container
          component={Container}
          direction='column'
          justifyContent='space-between'
          alignItems='start'
          sx={{
            p: theme.spacing(2, 1),
            [theme.breakpoints.up('md')]: {
              p: theme.spacing(4, 8),
            },
            '& > *': {
              width: '100%',
            },
          }}
        >
          <Grid item>
            <Typography
              variant='h5'
              component='h2'
              align={isSmallScreen ? 'left' : 'center'}
              gutterBottom
              sx={{
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              Work Experiences
            </Typography>
          </Grid>

          <Grid item>
            <WorkExperienceTimeline companies={companies} />
          </Grid>
        </Grid>

        {/* Educations */}
        <Grid
          container
          component={Container}
          direction='column'
          justifyContent='space-between'
          alignItems='start'
          sx={{
            p: theme.spacing(2, 1),
            [theme.breakpoints.up('md')]: {
              p: theme.spacing(4, 8),
            },
            '& > *': {
              width: '100%',
            },
          }}
        >
          <Grid item>
            <Typography
              variant='h5'
              component='h2'
              align={isSmallScreen ? 'left' : 'center'}
              gutterBottom
              sx={{
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              Educations
            </Typography>
          </Grid>

          <Grid item>
            <EducationTimeline educations={educations} />
          </Grid>
        </Grid>

        {/* Skills */}
        <Grid
          container
          component={Container}
          direction='column'
          justifyContent='space-evenly'
          alignItems='flex-start'
          sx={{
            p: theme.spacing(2, 1),
            [theme.breakpoints.up('md')]: {
              p: theme.spacing(4, 8),
            },
            '& > *': {
              width: '100%',
            },
          }}
        >
          <Grid item>
            <Typography
              variant='h5'
              component='h2'
              align={isSmallScreen ? 'left' : 'center'}
              gutterBottom
              sx={{
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              Skills
            </Typography>
          </Grid>

          <Grid item>
            <SkillTabs skillTypes={skillTypes} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<IHomePageProps> = async () => {
  const { data } = await client.query<{
    companies: IGraphQLModelResponse<ICompany[]>;
    skillTypes: IGraphQLModelResponse<ISkillType[]>;
    educations: IGraphQLModelResponse<IEducation[]>;
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
    revalidate: 60,
  };
};

export default HomePage;

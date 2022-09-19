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
import { ISkillCategory } from '@/types/skill';

// GraphQL
import { client } from '@/graphql';

// Components
import { Layout } from '@/components';
import { SkillTabs } from '@/components/skill';

interface IHomePageProps {
  skillCategories: ISkillCategory[];
}

const HomePage: NextPage<IHomePageProps> = ({ skillCategories }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <NextSeo
        title='Adam Rafiandri'
        description='Software Engineer & Lifetime Learner'
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
            <SkillTabs skillCategories={skillCategories} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<IHomePageProps> = async () => {
  const { data } = await client.query<{
    skillCategories: IGraphQLModelResponse<ISkillCategory[]>;
  }>({
    query: gql`
      query {
        skillCategories {
          data {
            id
            attributes {
              name
              skills {
                data {
                  id
                  attributes {
                    name
                    slug
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
      skillCategories: data.skillCategories.data,
    },
    revalidate: 1,
  };
};

export default HomePage;

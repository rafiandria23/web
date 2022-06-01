import { FC, useState, useEffect, CSSProperties, ChangeEvent } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import {
  Theme,
  Grid,
  Tabs,
  Tab,
  Typography,
  LinearProgress,
} from '@mui/material';
import clsx from 'clsx';

// Types
import { SkillType } from '@/types/skill';

// Utils
import { sortSkills, getSkillProgress, getSkillLevel } from '@/utils/skill';

// Components
import { TabPanel } from '@/components';

export interface SkillTabsProps {
  skillTypes: SkillType[];
}

const SkillTabs: FC<SkillTabsProps> = ({ skillTypes }) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState<SkillType['attributes']['name']>('');

  useEffect(() => {
    if (skillTypes.length > 0) {
      setTabValue(skillTypes[0].attributes.name);
    }
  }, [skillTypes]);

  const handleChangeTab = (
    _: ChangeEvent<{}>,
    newTabValue: SkillType['attributes']['name'],
  ) => {
    setTabValue(newTabValue);
  };

  const sortedSkills = sortSkills(skillTypes);

  return (
    <div className={classes.wrapper}>
      <Tabs
        className={classes.tabs}
        variant='scrollable'
        orientation='vertical'
        textColor='secondary'
        value={tabValue}
        onChange={handleChangeTab}
      >
        {sortedSkills.map((skillType) => (
          <Tab
            key={skillType.id}
            classes={{
              root: classes.tab,
            }}
            value={skillType.attributes.name}
            label={skillType.attributes.name}
          />
        ))}
      </Tabs>

      {sortedSkills.map((skillType) => (
        <TabPanel
          className={classes.tabPanel}
          key={skillType.id}
          index={skillType.attributes.name}
          value={tabValue}
        >
          <Grid item container>
            {skillType.attributes.skills.data.map((skill) => (
              <Grid key={skill.id} item container direction='column'>
                <Grid item>
                  <Typography
                    className={clsx(classes.text, classes.title)}
                    variant='subtitle1'
                    align='left'
                    gutterBottom
                  >
                    {skill.attributes.name}
                  </Typography>
                </Grid>

                <Grid item>
                  <LinearProgress
                    className={classes.progress}
                    variant='determinate'
                    color='secondary'
                    value={getSkillProgress(skill)}
                  />
                </Grid>

                <Grid item container wrap='nowrap' justifyContent='flex-end'>
                  <Typography
                    className={clsx(classes.text)}
                    variant='subtitle2'
                    align='right'
                  >
                    {getSkillLevel(skill)}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}
    </div>
  );
};

export default SkillTabs;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {
      flexGrow: 1,
      display: 'flex',
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab: {
      color: theme.palette.primary.contrastText,
    },
    tabPanel: {
      width: '100%',
    },
    skillTypeWrapper: {},
    text: {
      color: theme.palette.primary.contrastText,
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    progress: {
      height: theme.spacing(1.25),
    },
  }),
);

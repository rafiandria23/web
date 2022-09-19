import { FC, useState, useEffect, ChangeEvent } from 'react';
import { useTheme, Box, Grid, Tabs, Tab, Typography } from '@mui/material';

// Types
import { ISkillCategory } from '@/types/skill';

// Components
import { TabPanel } from '@/components';

export interface ISkillTabsProps {
  skillCategories: ISkillCategory[];
}

const SkillTabs: FC<ISkillTabsProps> = ({ skillCategories }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] =
    useState<ISkillCategory['attributes']['name']>('Front-End');

  useEffect(() => {
    if (skillCategories.length > 0) {
      setTabValue(skillCategories[0].attributes.name);
    }
  }, [skillCategories]);

  const handleChangeTab = (
    _: ChangeEvent<{}>,
    newTabValue: ISkillCategory['attributes']['name'],
  ) => {
    setTabValue(newTabValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant='scrollable'
          indicatorColor='primary'
          textColor='primary'
          value={tabValue}
          onChange={handleChangeTab}
        >
          {skillCategories.map((skillCategory) => (
            <Tab
              key={skillCategory.id}
              value={skillCategory.attributes.name}
              label={skillCategory.attributes.name}
              sx={{
                ':root': {
                  color: theme.palette.primary.contrastText,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {skillCategories.map((skillCategory) => (
        <TabPanel
          key={skillCategory.id}
          index={skillCategory.attributes.name}
          value={tabValue}
        >
          <Grid item container>
            {skillCategory.attributes.skills.data.map((skill) => (
              <Grid key={skill.id} item container direction='column'>
                <Grid item>
                  <Typography
                    variant='subtitle1'
                    align='left'
                    gutterBottom
                    color={
                      theme.palette.mode === 'light' ? 'primary' : undefined
                    }
                  >
                    {skill.attributes.name}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}
    </Box>
  );
};

export default SkillTabs;

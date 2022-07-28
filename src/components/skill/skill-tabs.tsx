import { FC, useState, useEffect, ChangeEvent } from 'react';
import {
  useTheme,
  Theme,
  Box,
  Grid,
  Tabs,
  Tab,
  Typography,
  LinearProgress,
} from '@mui/material';

// Types
import { SkillType } from '@/types/skill';

// Utils
import { sortSkills, getSkillProgress, getSkillLevel } from '@/utils/skill';

// Components
import { TabPanel } from '@/components';

export interface ISkillTabsProps {
  skillTypes: SkillType[];
}

const SkillTabs: FC<ISkillTabsProps> = ({ skillTypes }) => {
  const theme = useTheme();
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant='scrollable'
          indicatorColor='primary'
          textColor='primary'
          value={tabValue}
          onChange={handleChangeTab}
        >
          {sortedSkills.map((skillType) => (
            <Tab
              key={skillType.id}
              value={skillType.attributes.name}
              label={skillType.attributes.name}
              sx={{
                ':root': {
                  color: theme.palette.primary.contrastText,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {sortedSkills.map((skillType) => (
        <TabPanel
          key={skillType.id}
          index={skillType.attributes.name}
          value={tabValue}
        >
          <Grid item container>
            {skillType.attributes.skills.data.map((skill) => (
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

                <Grid item>
                  <LinearProgress
                    variant='determinate'
                    color='primary'
                    value={getSkillProgress(skill)}
                    sx={{
                      height: theme.spacing(1.25),
                    }}
                  />
                </Grid>

                <Grid item container wrap='nowrap' justifyContent='flex-end'>
                  <Typography
                    variant='subtitle2'
                    align='right'
                    color={
                      theme.palette.mode === 'light' ? 'primary' : undefined
                    }
                  >
                    {getSkillLevel(skill)}
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

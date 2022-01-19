import { FC, CSSProperties } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, Grid, Typography, LinearProgress } from '@mui/material';
import clsx from 'clsx';

// Types
import { SkillType } from '@/types/skill';

// Utils
import { sortSkills, getSkillProgress, getSkillLevel } from '@/utils/skill';

export interface SkillProgressListProps {
  skillTypes: SkillType[];
}

const SkillProgressList: FC<SkillProgressListProps> = ({ skillTypes }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.wrapper}
      container
      direction='column'
      justifyContent='space-evenly'
      alignItems='stretch'
    >
      {sortSkills(skillTypes).map((skillType) => (
        <Grid
          key={skillType._id}
          className={classes.skillTypeWrapper}
          item
          container
          direction='column'
          justifyContent='space-between'
          alignItems='stretch'
        >
          <Grid item>
            <Typography
              className={clsx(classes.text, classes.title)}
              variant='h6'
              component='h3'
              align='center'
            >
              {skillType.name}
            </Typography>
          </Grid>

          <Grid item container>
            {skillType.skills.map((skill) => (
              <Grid key={skill._id} item container direction='column'>
                <Grid item>
                  <Typography
                    className={clsx(classes.text, classes.title)}
                    variant='subtitle1'
                    align='left'
                    gutterBottom
                  >
                    {skill.name}
                  </Typography>
                </Grid>

                <Grid item>
                  <LinearProgress
                    className={classes.progress}
                    variant='determinate'
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
        </Grid>
      ))}
    </Grid>
  );
};

export default SkillProgressList;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {
      '& > *': {
        margin: theme.spacing(1, 0),
      } as CSSProperties,
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

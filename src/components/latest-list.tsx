import { FC } from 'react';
import { Typography, Grid } from '@material-ui/core';

// Types
import { Article } from '@/types/article';
import { Project } from '@/types/project';

// Components
import { LatestCard } from '@/components';

interface LatestListProps {
  title: string;
  data: Article[] | Project[];
  type: 'article' | 'project';
}

const LatestList: FC<LatestListProps> = ({ title, data, type }) => {
  return (
    <Grid
      container
      direction={`column`}
      justifyContent={`space-between`}
      alignItems={`center`}
    >
      <Grid item>
        <Typography gutterBottom variant={`h3`} component={`h3`}>
          {title}
        </Typography>
      </Grid>

      <Grid
        item
        container
        direction={`row`}
        justifyContent={`center`}
        alignItems={`center`}
        component={`div`}
      >
        {type === `article` && (data as Article[]).length > 0
          ? (data as Article[]).map((article) => (
              <Grid key={article._id} item>
                <LatestCard data={article} type={type} />
              </Grid>
            ))
          : type === `project` && (data as Project[]).length > 0
          ? (data as Project[]).map((project) => (
              <Grid key={project._id} item>
                <LatestCard data={project} type={type} />
              </Grid>
            ))
          : ''}
      </Grid>
    </Grid>
  );
};

export default LatestList;

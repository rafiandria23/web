import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Collapse,
  Typography,
  Button,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

// Types
import { Article } from '@/types/article';
import { Project } from '@/types/project';
import { Tag } from '@/types/tag';

interface LatestCardProps {
  data: Article | Project;
  type: 'article' | 'project';
}

const LatestCard: FC<LatestCardProps> = ({ data, type }) => {
  const router = useRouter();
  const classes = useStyles();
  const [showTags, setShowTags] = useState<boolean>(false);

  return (
    <Card classes={{ root: classes.latestCardWrapper }}>
      <CardActionArea>
        {data.cover && (
          <CardMedia
            classes={{ root: classes.latestCardCover }}
            image={data.cover.url}
            title={
              type === 'article'
                ? (data as Article).title
                : (data as Project).title
            }
            component={`img`}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant={`h4`} component={`h2`}>
            {type === `article`
              ? (data as Article).title
              : (data as Project).title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions classes={{ root: classes.latestCardActionsWrapper }}>
        <Button
          size={`medium`}
          color={`primary`}
          variant={`outlined`}
          onClick={() =>
            type === `article`
              ? router.push({
                  pathname: `/projects/${(data as Article).slug}`,
                })
              : router.push({
                  pathname: `/projects/${(data as Project).slug}`,
                })
          }
        >
          {type === `article` ? `Read More` : `Explore!`}
        </Button>
        <IconButton
          className={clsx(classes.showTags, {
            [classes.showTagsOpen]: showTags,
          })}
          onClick={() => setShowTags(!showTags)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse
        in={showTags}
        timeout={`auto`}
        unmountOnExit
        classes={{ entered: classes.showTagsCollapseEntered }}
      >
        <CardContent>
          {data.tags.length &&
            data.tags.map((tag: Tag) => (
              <Chip
                classes={{ root: classes.tagChip }}
                key={tag._id}
                label={tag.name.toUpperCase()}
                clickable
                onClick={() =>
                  router.push({
                    pathname: `/tags/${tag.slug}`,
                  })
                }
              />
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default LatestCard;

const useStyles = makeStyles((theme) =>
  createStyles({
    latestCardWrapper: {
      maxWidth: 345,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    latestCardCover: {},
    latestCardActionsWrapper: {
      padding: theme.spacing(2),
    },
    showTags: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    showTagsOpen: {
      transform: 'rotate(180deg)',
    },
    showTagsCollapseEntered: {
      position: 'relative',
    },
    tagChip: {
      margin: theme.spacing(1),
    },
  }),
);

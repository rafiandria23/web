import { FC, useState } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Theme,
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
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

// Types
import { Article } from '@/types/article';
import { Project } from '@/types/project';
import { Tag } from '@/types/tag';

interface ILatestCardProps {
  data: Article | Project;
  type: 'article' | 'project';
}

const LatestCard: FC<ILatestCardProps> = ({ data, type }) => {
  const classes = useStyles();
  const [showTags, setShowTags] = useState<boolean>(false);

  return (
    <Card classes={{ root: classes.latestCardWrapper }}>
      <CardActionArea>
        {data.attributes.cover && (
          <CardMedia
            classes={{ root: classes.latestCardCover }}
            image={data.attributes.cover.data.attributes.url}
            title={
              type === 'article'
                ? (data as Article).attributes.title
                : (data as Project).attributes.title
            }
            component='img'
          />
        )}

        <CardContent>
          <Typography gutterBottom variant='h4' component='h2'>
            {type === `article`
              ? (data as Article).attributes.title
              : (data as Project).attributes.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions classes={{ root: classes.latestCardActionsWrapper }}>
        <NextLink
          href={
            type === 'article'
              ? `/blog/${(data as Article).attributes.slug}`
              : `/projects/${(data as Project).attributes.slug}`
          }
          passHref
        >
          <Button size='medium' color='primary' variant='outlined'>
            {type === `article` ? `Read More` : `Explore!`}
          </Button>
        </NextLink>
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
        timeout='auto'
        unmountOnExit
        classes={{ entered: classes.showTagsCollapseEntered }}
      >
        <CardContent>
          {data.attributes.tags.data.map((tag) => (
            <NextLink
              key={tag.id}
              href={`/tags/${tag.attributes.slug}`}
              passHref
            >
              <Chip
                classes={{ root: classes.tagChip }}
                component='a'
                label={tag.attributes.name.toUpperCase()}
                clickable
              />
            </NextLink>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default LatestCard;

const useStyles = makeStyles<Theme>((theme) =>
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

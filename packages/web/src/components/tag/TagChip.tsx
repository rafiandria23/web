'use client';

import type { FC } from 'react';
import { memo } from 'react';
import NextLink from 'next/link';
import { Chip } from '@mui/material';
import { TagOutlined as TagIcon } from '@mui/icons-material';

// Types
import type { ITag } from '@/types/tag';

export interface ITagChipProps {
  tag: ITag;
  url: string;
}

const TagChip: FC<ITagChipProps> = ({ tag, url }) => {
  return (
    <Chip
      component={NextLink}
      color='primary'
      size='small'
      clickable
      href={url}
      label={tag.attributes.name}
      icon={<TagIcon color='inherit' htmlColor={tag.attributes.color} />}
    />
  );
};

export default memo(TagChip);

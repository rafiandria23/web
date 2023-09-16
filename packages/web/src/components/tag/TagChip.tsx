'use client';

import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Chip } from '@mui/material';
import { Tag as TagIcon } from '@mui/icons-material';

// Types
import type { ITag } from '@/types/tag';

interface ITagChipProps {
  tag: ITag;
}

const TagChip: FC<ITagChipProps> = ({ tag }) => {
  const router = useRouter();

  const handleNavigate = useCallback(
    (slug: string) => {
      return () => {
        router.push(`/tags/${slug}`);
      };
    },
    [router],
  );

  return (
    <Chip
      clickable
      color='primary'
      label={tag.attributes.name}
      icon={<TagIcon color='inherit' htmlColor={tag.attributes.color} />}
      onClick={handleNavigate(tag.attributes.slug)}
    />
  );
};

export default memo(TagChip);

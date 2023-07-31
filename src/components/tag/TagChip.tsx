import type { FC } from 'react';
import NextLink from 'next/link';
import { Chip } from '@mui/material';

// Types
import type { ITag } from '@/types/tag';

interface ITagChipProps {
  tag: ITag;
}

const TagChip: FC<ITagChipProps> = ({ tag }) => {
  return (
    <NextLink href={`/blog/tags/${tag.attributes.slug}`} passHref>
      <Chip label={tag.attributes.name} clickable />
    </NextLink>
  );
};

export default TagChip;

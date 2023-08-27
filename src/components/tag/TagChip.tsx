import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Chip } from '@mui/material';

// Types
import type { ITag } from '@/types/tag';

interface ITagChipProps {
  tag: ITag;
}

const TagChip: FC<ITagChipProps> = ({ tag }) => {
  const router = useRouter();

  const handleNavigate = useCallback(
    (slug: string) => {
      return async () => {
        await router.push({
          pathname: `/blogs/tags/${slug}`,
        });
      };
    },
    [router],
  );

  return (
    <Chip
      variant='outlined'
      color='info'
      clickable
      label={tag.attributes.name}
      onClick={handleNavigate(tag.attributes.slug)}
    />
  );
};

export default memo(TagChip);

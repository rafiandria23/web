import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useTheme, Chip } from '@mui/material';

// Types
import type { ITag } from '@/types/tag';

interface ITagChipProps {
  tag: ITag;
}

const TagChip: FC<ITagChipProps> = ({ tag }) => {
  const router = useRouter();
  const theme = useTheme();

  const handleNavigate = useCallback(
    (slug: string) => {
      return async () => {
        await router.push({
          pathname: `/tags/${slug}`,
        });
      };
    },
    [router],
  );
  return (
    <Chip
      variant='outlined'
      clickable
      label={tag.attributes.name}
      onClick={handleNavigate(tag.attributes.slug)}
      sx={{
        borderColor: tag.attributes.color,
        color: tag.attributes.color,
        '&:hover': {
          bgcolor: `${tag.attributes.color} !important`,
          color: theme.palette.getContrastText(tag.attributes.color),
        },
      }}
    />
  );
};

export default memo(TagChip);

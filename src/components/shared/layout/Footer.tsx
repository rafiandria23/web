import { memo, FC, useMemo } from 'react';
import { useTheme, Container, Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

// Constants
import { DateTimeFormat } from '@/constants/datetime';

const Footer: FC = () => {
  const now = useMemo(() => dayjs(), []);
  const theme = useTheme();

  return (
    <Box
      component='footer'
      sx={{
        bgcolor: theme.palette.primary.light,
        p: theme.spacing(2, 0),
      }}
    >
      <Stack component={Container} direction='row'>
        <Typography
          variant='subtitle2'
          component='p'
          color={theme.palette.primary.contrastText}
        >
          &copy; {now.format(DateTimeFormat.YYYY)}. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default memo(Footer);

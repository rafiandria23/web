'use client';

import type { FC } from 'react';
import { Box, Stack, Container, Typography } from '@mui/material';

const NotFoundPage: FC = () => {
  return (
    <Box bgcolor='primary.light'>
      <Stack component={Container} spacing={2}>
        <Typography
          component='h1'
          variant='h3'
          textAlign='center'
          color='primary.contrastText'
          gutterBottom
        >
          Page not found!
        </Typography>
      </Stack>
    </Box>
  );
};

export default NotFoundPage;

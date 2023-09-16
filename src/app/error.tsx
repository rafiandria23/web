'use client';

import type { Metadata } from 'next';
import { Box, Stack, Container, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: 'Error',
  description: 'Oops! Something went wrong.',
};

export default function ErrorPage() {
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
          Oops! Something went wrong.
        </Typography>
      </Stack>
    </Box>
  );
}

'use client';

import type { Metadata } from 'next';
import { Stack, Container, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: 'Error',
  description: 'Oops! Something went wrong.',
};

export default function ErrorPage() {
  return (
    <Stack component={Container}>
      <Typography component='h1' variant='h3' gutterBottom>
        Oops! Something went wrong.
      </Typography>
    </Stack>
  );
}

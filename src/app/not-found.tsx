'use client';

import type { Metadata } from 'next';
import { Box, Stack, Container, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: 'Page not found!',
  description: 'Page not found!',
};

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.light',
      }}
    >
      <Stack component={Container} spacing={2}>
        <Typography component='h1' variant='h3' gutterBottom>
          Page not found!
        </Typography>
      </Stack>
    </Box>
  );
}

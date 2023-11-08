'use client';

import type { FC } from 'react';
import { memo } from 'react';
import type { SnackbarKey } from 'notistack';
import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { CloseOutlined as CloseIcon } from '@mui/icons-material';

export interface ISnackbarActionProps {
  key: SnackbarKey;
}

const SnackbarAction: FC<ISnackbarActionProps> = ({ key }) => {
  const { closeSnackbar } = useSnackbar();

  const handleClose = () => {
    closeSnackbar(key);
  };

  return (
    <IconButton color='inherit' onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  );
};

export default memo(SnackbarAction);

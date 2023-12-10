'use client';

import type { FC } from 'react';
import { memo, useMemo } from 'react';
import type { ChipProps } from '@mui/material';
import { Chip } from '@mui/material';
import {
  LightbulbOutlined as LightBulbIcon,
  DeveloperBoardOutlined as DeveloperBoardIcon,
  KeyboardOutlined as KeyboardIcon,
  CloudOutlined as CloudIcon,
  QuestionMarkOutlined as QuestionMarkIcon,
} from '@mui/icons-material';

// Types
import type { IProject } from '@/types/project';

// Constants
import { ThemeMode } from '@/constants/theme';
import { ProjectStatus } from '@/constants/project';

// Hooks
import { useAppSelector } from '@/hooks/redux';

export interface IProjectStatusChipProps {
  status: IProject['attributes']['status'];
}

const ProjectStatusChip: FC<IProjectStatusChipProps> = ({ status }) => {
  const { scheme } = useAppSelector((s) => s.theme);
  const finalStatus = useMemo<{
    label: string;
    color: ChipProps['color'];
    icon: ChipProps['icon'];
  }>(() => {
    switch (status) {
      case ProjectStatus.VALIDATING_IDEA:
        return {
          label: 'Validating Idea',
          color: 'warning',
          icon: <LightBulbIcon />,
        };

      case ProjectStatus.PROTOTYPING:
        return {
          label: 'Prototyping',
          color: 'secondary',
          icon: <DeveloperBoardIcon />,
        };

      case ProjectStatus.IN_DEVELOPMENT:
        return {
          label: 'In Development',
          color: 'success',
          icon: <KeyboardIcon />,
        };

      case ProjectStatus.RELEASED:
        return {
          label: 'Released',
          color: scheme === ThemeMode.DARK ? 'default' : 'primary',
          icon: <CloudIcon />,
        };

      default:
        return {
          label: 'Unknown',
          color: 'error',
          icon: <QuestionMarkIcon />,
        };
    }
  }, [status, scheme]);

  return <Chip variant='outlined' size='small' {...finalStatus} />;
};

export default memo(ProjectStatusChip);

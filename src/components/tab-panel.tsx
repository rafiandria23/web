import { FC, ReactNode, HTMLProps } from 'react';
import { useTheme, Box } from '@mui/material';

export interface ITabPanelProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  index: string | number;
  value: TabPanelProps['index'];
}

const TabPanel: FC<ITabPanelProps> = ({ children, index, value, ...rest }) => {
  const theme = useTheme();

  return (
    <div role='tabpanel' hidden={index !== value} {...rest}>
      {index === value && (
        <Box
          sx={{
            p: theme.spacing(4),
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;

import { FC, ReactNode, HTMLProps } from 'react';
import { Box } from '@material-ui/core';

export interface TabPanelProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  index: string | number;
  value: TabPanelProps['index'];
}

const TabPanel: FC<TabPanelProps> = ({ children, index, value, ...rest }) => {
  return (
    <div role='tabpanel' hidden={index !== value} {...rest}>
      {index === value && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabPanel;

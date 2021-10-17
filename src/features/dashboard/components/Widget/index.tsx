// libs
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
// others
import './style.scss';

export interface WidgetProps {
  title: string;
  children: any;
}

const Widget: React.FC<WidgetProps> = ({ title, children }) => {
  return (
    <Paper elevation={1} className="widget-wrapper">
      <Typography variant="button">{title}</Typography>

      <Box mt={2}>{children}</Box>
    </Paper>
  );
};

export default Widget;

// libs
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
// others
import './style.scss';

interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ icon, label, value }) => {
  return (
    <Paper elevation={1} className="statistic-item-wrapper">
      <Box>{icon}</Box>

      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="h5">{label}</Typography>
      </Box>
    </Paper>
  );
};

export default StatisticItem;

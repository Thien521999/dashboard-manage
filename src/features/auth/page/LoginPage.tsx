// libs
import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
// others
import './style.scss';
import { useHistory } from 'react-router';

export const LoginPage = () => {
  const history = useHistory();

  const handleLoginClick = () => {
    localStorage.setItem('access_token', 'abcdefghjjklmno');
    history.push('/admin');
  };

  return (
    <div className="login-paper-wrapper">
      <Paper elevation={2}>
        <Box p={3}>
          <Typography variant="h5" component="h1" sx={{ color: 'purple' }}>
            Student Management
          </Typography>

          <Box mt={4}>
            <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
              Fake login
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

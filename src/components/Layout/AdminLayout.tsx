// libs
import { Box } from '@mui/material';
import Header from 'components/Header';
import SideBar from 'components/SideBar';
import Dashboard from 'features/dashboard';
import Student from 'features/student';
import React from 'react';
import { Route, Switch } from 'react-router';
// others
import './style.scss';

export const AdminLayout = () => {
  return (
    <Box className="admin_layout-wrapper">
      <Box className="header">
        <Header />
      </Box>
      <Box className="sidebar">
        <SideBar />
      </Box>
      <Box className="main">
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>
          <Route path="/admin/students">
            <Student />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
};

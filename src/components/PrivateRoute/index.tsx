// libs
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export const PrivateRoute = (props: RouteProps) => {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) {
    return <Redirect from="" to="/login" />;
  }
  return <Route {...props} />;
};

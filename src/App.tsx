import { AdminLayout } from 'components/Layout';
import NotFound from 'components/NotFound';
import { PrivateRoute } from 'components/PrivateRoute';
import { LoginPage } from 'features/auth/page/LoginPage';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect from="/" to="/login" exact />

        <Route path="/login">
          <LoginPage />
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>

        <Route path="/login">
          <NotFound />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;

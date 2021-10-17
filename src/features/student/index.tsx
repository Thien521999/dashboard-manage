import { Box } from '@mui/system';
import { useAppDispatch } from 'app/hooks';
import { fetchCityList } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';
// others
import './style.scss';

const Student = () => {
  const match = useRouteMatch();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const action = fetchCityList();
      await dispatch(action);
    })();
  }, [dispatch]);

  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPage />
        </Route>
        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>
        <Route path={`${match.path}/:studentId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </Box>
  );
};

export default Student;

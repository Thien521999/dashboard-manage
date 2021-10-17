import { Button, Pagination, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import StudentFilter from 'features/student/components/StudentFilter';
import StudentTable from 'features/student/components/StudentTable';
import { fetchStudentList } from 'features/student/studentSlice';
import { City } from 'models';
import React, { useEffect, useState } from 'react';
// others
import './style.scss';

const ListPage = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const { data: studentList } = useAppSelector((state: any) => state.student?.listStudent);

  const { data: cityList } = useAppSelector((state: any) => state.city?.cityList);

  const cityMap = cityList?.reduce((map: { [key: string]: City }, city: any) => {
    map[city?.code] = city;
    return map;
  }, {});

  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 15,
  });

  const [initPagination, setInitPagination] = useState({
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setFilter((prevFilters) => ({
      ...filter,
      _page: page,
    }));

    setIsLoading(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const action = fetchStudentList(filter);
        const resultAction = await dispatch(action);
        const dataRes: any = unwrapResult(resultAction);

        setIsLoading(false);
        setInitPagination(dataRes?.pagination);
      } catch (error) {
        throw new Error('failed to fetch student list');
      }
    })();
  }, [dispatch, filter]);

  const handleSearchChange = (newFilter: any) => {
    setFilter(newFilter);
  };

  const handleFilterChange = (newFilter: any) => {
    setFilter(newFilter);
  };

  return (
    <Box className="list-page-wrapper">
      {/* loading */}
      {isLoading && <LinearProgress className="loading" />}

      <Box className="title-list-page">
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>

      {/* filter student */}
      <Box mb={3}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onchange={handleFilterChange}
        />
      </Box>

      {/* Student Table */}
      <StudentTable studentList={studentList} cityMap={cityMap} />

      {/* Pagination */}
      <Box my={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Pagination
          color="primary"
          count={Math.ceil(initPagination?._totalRows / initPagination?._limit)}
          page={initPagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ListPage;

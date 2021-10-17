import FemaleIcon from '@mui/icons-material/Female';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import MaleIcon from '@mui/icons-material/Male';
import { Grid, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';

import {
  fetchHighestStudentList,
  fetchLowestStudentList,
  fetchRankingByCityList,
  fetchStatistics,
} from './dashboardSlice';
// others
import './style.scss';

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const statistics = useAppSelector((state) => state.dashboard.statistics);
  const highestStudentList = useAppSelector((state) => state.dashboard.highestStudentList);
  const lowestStudentList = useAppSelector((state) => state.dashboard.lowestStudentList);
  const rankingByCityList = useAppSelector((state) => state.dashboard.rankingByCityList);

  useEffect(() => {
    (async () => {
      const action1 = fetchHighestStudentList();

      const action2 = fetchLowestStudentList();

      const action3 = fetchStatistics();

      const action4 = fetchRankingByCityList();

      await Promise.all([
        dispatch(action1),
        dispatch(action2),
        dispatch(action3),
        dispatch(action4),
      ]);
      // const [highestStudentList, lowestStudentList, statistics, cityList] = await Promise.all([
      //   dispatch(action1),
      //   dispatch(action2),
      //   dispatch(action3),
      //   dispatch(action4),
      // ]);

      setIsLoading(false);
    })();
  }, [dispatch]);

  return (
    <Box className="dashboard-wrapper">
      {/* Loading */}
      {isLoading && <LinearProgress className="loading" />}

      {/* Statistic Section */}
      <Grid container spacing={3} className="statistic">
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<MaleIcon sx={{ fontSize: '30px', color: 'primary.main' }} />}
            label="male"
            value={statistics?.maleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<FemaleIcon sx={{ fontSize: '30px', color: 'primary.main' }} />}
            label="female"
            value={statistics?.femaleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<HighQualityIcon sx={{ fontSize: '30px', color: 'primary.main' }} />}
            label="mark >=8"
            value={statistics?.highMarkCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<FilterVintageIcon sx={{ fontSize: '30px', color: 'primary.main' }} />}
            label="mark <= 5"
            value={statistics?.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* All student ranking */}
      <Box mt={4}>
        <Typography variant="h4">All student</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Ranking by city */}
      <Box mt={4}>
        <Typography variant="h4">Ranking by city</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking: any) => (
              <Grid item key={ranking.cityId} xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

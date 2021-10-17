import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListParams, ListResponse, Student } from 'models';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface DashboardState {
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: [];
}

const initialState = {
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

export const fetchHighestStudentList = createAsyncThunk(
  'dashboard/fetchHighestStudentList',
  async () => {
    const params: ListParams = {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
    };

    const dataRes = await studentApi.getAll(params);
    return dataRes?.data;
  }
);

export const fetchLowestStudentList = createAsyncThunk(
  'dashboard/fetchLowestStudentList',
  async () => {
    const params: ListParams = {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'asc',
    };

    const dataRes = await studentApi.getAll(params);
    return dataRes?.data;
  }
);

export const fetchStatistics = createAsyncThunk('dashboard/fetchStatistics', async () => {
  const listMalePros = studentApi.getAll({ _page: 1, _limit: 1, gender: 'male' });
  const listFemalePros = studentApi.getAll({ _page: 1, _limit: 1, gender: 'female' });
  const listHighestStudentPros = studentApi.getAll({ _page: 1, _limit: 1, mark_gte: 8 });
  const listLowerStudentPros = studentApi.getAll({ _page: 1, _limit: 1, mark_lte: 5 });

  const responseList = await Promise.all([
    listMalePros,
    listFemalePros,
    listHighestStudentPros,
    listLowerStudentPros,
  ]);

  const statisticList = responseList.map((x) => x?.pagination?._totalRows);

  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;
  

  return {maleCount, femaleCount, highMarkCount, lowMarkCount};
});

export const fetchRankingByCityList = createAsyncThunk(
  'dashboard/fetchRankingByCityList',
  async () => {
    // fetch all city
    const { data: cityList }:ListResponse<City> = await cityApi.getAll();

    // fetch ranking by city
    const callList = cityList.map((x) => 
      studentApi.getAll({
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc',
        city: x.code,
      })
    );

    const responseList: Array<ListResponse<Student>> =await Promise.all(callList);
    

    const rankingByCityLists: Array<RankingByCity> = responseList.map((x, idx) => ({
        cityId: cityList[idx].code,
        cityName: cityList[idx].name,
        rankingList: x.data
    }))
    
    return rankingByCityLists;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHighestStudentList.fulfilled, (state, action: PayloadAction<any>) => {
      state.highestStudentList = action.payload;
    });
    builder.addCase(fetchLowestStudentList.fulfilled, (state, action: PayloadAction<any>) => {
      state.lowestStudentList = action.payload;
    });
    builder.addCase(fetchStatistics.fulfilled, (state, action: PayloadAction<any>) => {
      state.statistics = action.payload;
    });
    builder.addCase(fetchRankingByCityList.fulfilled, (state, action: PayloadAction<any>) => {        
      state.rankingByCityList = action.payload;
    });
  },
});

const { reducer } = dashboardSlice;
// export const {} = actions;

export default reducer;

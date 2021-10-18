import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';

export const fetchCityList = createAsyncThunk('city/fetchCityList', async () => {
  try {
    const dataRes:ListResponse<City> = await cityApi.getAll();
  
    localStorage.setItem('cityList', JSON.stringify(dataRes));
      
    return dataRes;
  } catch (error) {
    console.log("Failed to fetch city list");
    
  }
});

const initialState = {
  cityList: JSON.stringify(localStorage.getItem('cityList')) || [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCityList.fulfilled, (state, action: PayloadAction<any>) => {
      state.cityList = action.payload;
    });
  },
});

const { reducer } = citySlice;



export default reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams } from 'models';

export const fetchStudentList = createAsyncThunk('student/fetchStudentList', async (params: ListParams) => {
  const dataRes = await studentApi.getAll(params);
  localStorage.setItem('studentList', JSON.stringify(dataRes?.data));

  return dataRes;
});

const initialState = {
  listStudent: JSON.parse(localStorage.getItem('studentList')!) ||  [],
  
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudentList.fulfilled, (state, action: PayloadAction<any>) => {
      state.listStudent = action.payload;
    });
    
  },
});

const { reducer } = studentSlice;

export default reducer;

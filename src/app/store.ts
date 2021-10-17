import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import studentReducer from '../features/student/studentSlice';
import cityReducer from '../features/city/citySlice';

const rootReducer = {
  counter: counterReducer,
  auth: authReducer,
  dashboard : dashboardReducer,
  student: studentReducer,
  city: cityReducer,
}

export const store = configureStore({
  reducer:rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

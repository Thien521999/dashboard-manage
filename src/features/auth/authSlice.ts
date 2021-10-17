import {  createSlice } from '@reduxjs/toolkit';
import {User} from "models";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface AuthState {
    currentUser?: User;
}

const initialState: AuthState = {
    currentUser: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login(state, action: PayloadAction<LoginPayload>) {
    //     state.logging = true;
    // },
    // loginSuccess(state, action: PayloadAction<User>) {
    //     state.isLoggedIn = true;
    //     state.logging = false;
    //     state.currentUser = action.payload;
    // },
    // loginFailed(state, action: PayloadAction<string>) {
    //     state.logging = false;
    // },
    logout(state) {
        localStorage.removeItem("access_token");
    },
  },
});

const {actions, reducer} = authSlice;
export const { logout} = actions;

export default reducer



import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    error: '',
    loggedIn : !!localStorage.getItem('token')
  },
  reducers: {
    loginSuccess(state, action) {
      localStorage.setItem('token', action.payload.access);
      state.error = '';
      state.loggedIn = true;
    },

    loginFailed(state, _) {
      state.error = 'Tên đăng nhập hoặc mật khẩu không đúng';
    },

    logOut(state, _) {
      state.loggedIn = false;
      state.error = '';
    },

    clearError(state, _) {
      state.error = '';
    }
  }
});

export const {
  loginSuccess,
  loginFailed,
  logOut,
  clearError
} = loginSlice.actions;

export default loginSlice.reducer;

export function login(username, password) {
  return async dispatch => {
    axios.post('/api/token', { username: username, password: password })
      .then(result => {
        dispatch(loginSuccess(result.data));
      }).catch(e => dispatch(loginFailed()));
  }
}
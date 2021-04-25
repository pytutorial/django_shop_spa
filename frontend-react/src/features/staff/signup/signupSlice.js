import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {loginSuccess} from "../login/loginSlice";

const signupSlice = createSlice({
  name: 'signupSlice',
  initialState: {
    error: '',    
    signedUp: false,
  },

  reducers: {
    
    signupFailed(state, action) {
      state.error = action.payload.error;
    },

    clearError(state, _) {
      state.error = '';
    },

    setError(state, action) {
      state.error = action.payload.error;
    }
  }
});

export const {
  signupFailed,
  clearError,
  setError
} = signupSlice.actions;

export default signupSlice.reducer;

export function signup(username, password) {
  return async dispatch => {
    axios.post('/api/signup', { username: username, password: password })
      .then(_ => {
        axios.post('/api/token', { username: username, password: password }).then(result => {          
          dispatch(loginSuccess(result.data));
        });        
      }).catch(e => dispatch(signupFailed(e.response.data)));
  }
}
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from 'router_history';

const categoryFormSlice = createSlice({
  name: 'categoryFormSlice',
  initialState: {
    category: {},
    errors: {},
  },

  reducers: {
    setState(state, action) {
      for(let key in action.payload){
        state[key] = action.payload[key];
      }
    }
  }
});

export const {
  setState
} = categoryFormSlice.actions;

export default categoryFormSlice.reducer;

export function initPage(id) {
  return dispatch => {
    dispatch(setState({category: {}, errors: {}}));
    if(id) {
      axios.get(`/api/category/${id}`).then(result => {
        dispatch(setState({category: result.data}));
      });
    }
  }
}

export function saveCategory(id, data) {
  return dispatch => {
    
    dispatch(setState({errors: {}}));
    
    if(!id) {
      axios.post('/api/category/', data)
        .then(_ => {
          history.push('/staff');

        }).catch(e => {
          dispatch(setState({errors: e.response?.data}));
        });

      }else {
        axios.put(`/api/category/${id}/`, data)
        .then(_ => {
          history.push('/staff');

        }).catch(e => {
          dispatch(setState({errors: e.response?.data}));
        });
    }
  }
}
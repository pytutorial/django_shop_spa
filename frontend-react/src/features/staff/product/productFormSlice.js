import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from 'router_history';

const productFormSlice = createSlice({
  name: 'productFormSlice',
  initialState: {
    product: {},
    errors: {},
    categoryList: []
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
} = productFormSlice.actions;

export default productFormSlice.reducer;

export function initPage(id) {
  return dispatch => {
    dispatch(setState({product: {}, errors: {}}));

    axios.get('/api/category/').then(result => {
      dispatch(setState({categoryList: result.data}));
    });

    if (id) {
      axios.get(`/api/product/${id}`).then(result => {
        dispatch(setState({product: result.data}));
      });
    }
  }
}

export function saveProduct(id, data) {
  return dispatch => {
    const headers = { "Content-Type": "multipart/form-data" };
    
    dispatch(setState({errors: {}}));

    if(!id) {
      axios.post('/api/product/', data, {headers})
        .then(_ => {
          history.push('/staff/product/');

        }).catch(e => {
          dispatch(setState({errors: e.response.data}));
        });
      }else {
        axios.put(`/api/product/${id}/`, data, {headers})
        .then(_ => {
          history.push('/staff/product');

        }).catch(e => {
          dispatch(setState({errors: e.response.data}));
        });
      }
  }
}
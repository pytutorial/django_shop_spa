import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from 'router_history';

const orderProductSlice = createSlice({
  name: 'orderProductSlice',

  initialState: {
    loading: true,
    product: {},
    errors: {}
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
} = orderProductSlice.actions;

export default orderProductSlice.reducer;

export function initPage(id) {
  return dispatch => {
    dispatch(setState({product: {}, errors: {}, loading: true}));

    axios.get(`/api/product/${id}`).then(result =>
      dispatch(setState({product: result.data, loading: false}))
    );
  }
}

export function orderProduct(id, data) {
  return dispatch => {

    dispatch(setState({errors: {}}));
    
    axios.post(`/api/order-product/${id}`, data).then(_ => {
      history.push('/thank-you');

    }).catch((e) => {
      dispatch(setState({errors: e.response.data}));
    });
  }
}
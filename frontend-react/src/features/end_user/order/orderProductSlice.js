import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const orderProductSlice = createSlice({
  name: 'orderProductSlice',

  initialState: {
    id: null,
    product: null,    
    saved: false
  },

  reducers: {

    fetchProductSuccess(state, action) {
      state.product = action.payload || {};
      state.id = state.product.id;
    },

    clearData(state, _) {
      state.product = {};
      state.save = false;
    },

    clearErrors(state, _) {
      state.errors = {}
    },

    orderProductSuccess(state, _) {
      state.saved = true;
    },

    orderProductFail(state, action) {
      state.errors = action.payload || {};
    },
  }
});

export const {
  fetchProductSuccess,
  clearData,
  clearErrors,
  orderProductSuccess,
  orderProductFail,
} = orderProductSlice.actions;

export default orderProductSlice.reducer;

export function fetchProduct(id) {
  return async dispatch => {
    axios.get(`/api/product/${id}`).then(result => {
      dispatch(fetchProductSuccess(result.data));
    });
  }
}

export function orderProduct(id, data) {  
  return async dispatch => {
    
    axios.post(`/api/order-product/${id}`, data)
      .then(result => {
        dispatch(orderProductSuccess(result.data));

      }).catch(e => {        
        dispatch(orderProductFail(e.response.data));
      });

  }
}
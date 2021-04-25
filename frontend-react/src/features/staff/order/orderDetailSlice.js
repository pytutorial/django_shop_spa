import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const orderDetailSlice = createSlice({
  name: 'orderDetailSlice',
  initialState: {
    order: {},
    error: '',
    saved: false
  },

  reducers: {
    confirmOrderSuccess(state, _) {
      state.saved = true;
    },

    confirmOrderFail(state, action) {
      state.error = action.payload.error;
    },

    cancelOrderSuccess(state, _) {
      state.saved = true;
    },

    cancelOrderFail(state, action) {
      state.error = action.payload.error;
    },

    fetchOrderSuccess(state, action) {      
      state.order = action.payload || {};      
    },

    clearError(state, _) {
      state.error = '';
    },

    clearData(state, _) {
      state.saved = false;
      state.error = '';
      state.order = {};
    }
  }
});

export const {
  confirmOrderSuccess,
  confirmOrderFail,
  cancelOrderSuccess,
  cancelOrderFail,
  fetchOrderSuccess,
  clearError,
  clearData,
} = orderDetailSlice.actions;

export default orderDetailSlice.reducer;

export function confirmOrder(id, data) {  
  return async dispatch => {
    
    axios.post(`/api/order/confirm/${id}`, data)
      .then(result => {
        dispatch(confirmOrderSuccess(result.data))

      }).catch(e =>
        dispatch(confirmOrderFail(e.toString()))
      );
  }
}

export function cancelOrder(id, data) {  
  return async dispatch => {
    
    axios.post(`/api/order/cancel/${id}`, data)
      .then(result => {
        dispatch(cancelOrderSuccess(result.data))

      }).catch(e =>
        dispatch(cancelOrderFail(e.toString()))
      );
  }
}

export function fetchOrder(id) {
  return async dispatch => {
    axios.get(`/api/order/${id}`).then(result => {
      dispatch(fetchOrderSuccess(result.data));
    });
  }
}
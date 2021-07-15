import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from 'router_history';

const orderDetailSlice = createSlice({
  name: 'orderDetailSlice',
  initialState: {
    order: {},
    error: '',
    loading: true
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
} = orderDetailSlice.actions;

export default orderDetailSlice.reducer;

export function initPage(id) {
  return dispatch => {
    dispatch(setState({order:{}, error: ''}));
    
    axios.get(`/api/order/${id}`).then(result => {
      dispatch(setState({order: result.data}));
    });
  }
}

export function confirmOrder(id) {
  return dispatch => {
    if(!window.confirm('Xác nhận đơn hàng này đã được giao?')) {
      return;
    }

    dispatch(setState({error: ''}));

    axios.post(`/api/order/confirm/${id}`)
      .then(_ => {
        history.push('/staff/order');

      }).catch(e =>
        dispatch(setState({error: e.toString()}))
      );
  }
};

export function cancelOrder(id) {
  return dispatch => {
    if(!window.confirm('Hủy đơn hàng này ?')) {
      return;
    }

    dispatch(setState({error: ''}));

    axios.post(`/api/order/cancel/${id}`)
      .then(_ => {
        history.push('/staff/order');

      }).catch(e =>
        dispatch(setState({error: e.toString()}))
      );
  }
};
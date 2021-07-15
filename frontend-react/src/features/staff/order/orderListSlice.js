import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {PAGE_SIZE} from "utils/Constants";

const orderListSlice = createSlice({
  name: 'orderListSlice',
  initialState: {
    items: [],
    keyword: '',    
    page: 1,
    total: 0,
    error: '',
    loading: true,
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
} = orderListSlice.actions;

export default orderListSlice.reducer;

export function searchOrder(keyword, page) {
  return async (dispatch, getState) => {
    const state = getState().orderList;

    keyword = keyword != null ? keyword: state.keyword;
    page = page != null? page: state.page;
    const start = (page-1) * PAGE_SIZE;

    dispatch(setState({loading: true, total: 0, items: []}));

    try {
      let result = await axios.get(`/api/order/count?keyword=${keyword}`);
      let total = result?.data?.count || 0;
      
      result = await axios.get(`/api/order/search?keyword=${keyword}&start=${start}&count=${PAGE_SIZE}`);
      let items = result.data || [];
      dispatch(setState({total, items, keyword, page, loading: false }));
    }catch(e) {
      console(e);
    }
  }
}

export function setPage(page) {
  return (dispatch, getState) => {
    const state = getState().orderList;
    dispatch(searchOrder(state.keyword, page));
  }
}
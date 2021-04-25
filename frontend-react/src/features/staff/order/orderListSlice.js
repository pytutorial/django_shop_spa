import { createSlice } from '@reduxjs/toolkit';
import {PAGE_SIZE} from "utils/Constants";
import axios from 'axios';

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
    fetchOrderListSuccess(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;      
      state.loading = false;     
    },

    setPage(state, action) {      
      state.page = action.payload;      
    },

    setSearchParams(state, action) {
      state.keyword = action.payload.keyword;
      state.page = 1;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    clearError(state, _) {
      state.error = '';
    }
  }
});

export const {
  fetchOrderListSuccess,
  setPage,
  setSearchParams,
  setLoading,
  setError,
  clearError,
} = orderListSlice.actions;

export default orderListSlice.reducer;

export function fetchOrderList(page) {
  return async (dispatch, getState) => {
    const state = getState().orderList;

    axios.get(`/api/order/count?keyword=${state.keyword}`).then(result => {
      const total = result.data.count || 0;
      let page = state.page;      
      const numPage = Math.ceil(total / PAGE_SIZE);
      if(page < 1) page = 1;
      if(page > numPage) page = numPage;

      const start = (page-1) * PAGE_SIZE;

      let url = '/api/order/search?' +
                `keyword=${state.keyword}&` +
                `start=${start}&count=${PAGE_SIZE}`;

      axios.get(url).then(result => {
        const items = result.data;
        dispatch(fetchOrderListSuccess({
          items: items, 
          total: total,
          page: page
        }))
      });
      
    }).catch(e => dispatch(setError({error : e.toString()})));
  }
}
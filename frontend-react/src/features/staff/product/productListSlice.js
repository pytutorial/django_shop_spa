import { createSlice } from '@reduxjs/toolkit';
import {PAGE_SIZE} from "utils/Constants";
import axios from 'axios';

const productListSlice = createSlice({
  name: 'productListSlice',
  initialState: {
    items: null,    
    name: '',
    page: 1,
    total: 0,
    error: '',
    loading: true
  },

  reducers: {
    fetchProductListSuccess(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.loading = false;
    },

    setPage(state, action) {      
      state.page = action.payload;
    },

    setSearchParams(state, action) {
      state.name = action.payload.name;
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
  fetchProductListSuccess,  
  setPage, 
  setSearchParams,
  setLoading,
  setError,
  clearError,
} = productListSlice.actions;

export default productListSlice.reducer;

export function fetchProductList() {
  return async (dispatch, getState) => {
    const state = getState().productList;    

    axios.get(`/api/product/count?name=${state.name}`).then(result => {
      const total = result.data.count || 0;
      
      let page = state.page;      
      const numPage = Math.ceil(total / PAGE_SIZE);
      if(page < 1) page = 1;
      if(page > numPage) page = numPage;

      const start = (page-1) * PAGE_SIZE;
      
      let url = '/api/product/search?' +
                `name=${state.name}&` +
                `start=${start}&count=${PAGE_SIZE}`;

      axios.get(url).then(result => {
        const items = result.data;
        dispatch(fetchProductListSuccess({
          items: items, 
          total: total,
          page: page
        }))
      });

    });
  }
}

export function deleteProduct(id) {
  return async (dispatch) => {    
    axios.delete(`/api/product/${id}`).then(_ => {      
      dispatch(fetchProductList());
    }).catch(e => dispatch(setError(e.toString())));    
  } 
}
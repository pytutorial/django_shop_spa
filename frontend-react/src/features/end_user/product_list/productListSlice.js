import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {PAGE_SIZE} from "utils/Constants";

const productListSliceUser = createSlice({
  name: 'productListSliceUser',
  initialState: {
    items: null, 
    page: 1,
    total: 0,   
    categoryList: [],
    name: '',
    categoryId: '',
    priceRangeId: '',
    error: '',
    loading: true
  },

  reducers: {
    setSearchParams(state, action) {
      state.page = 1;
      state.name = action.payload.name;
      state.categoryId = action.payload.categoryId;
      state.priceRangeId = action.payload.priceRangeId;
    },

    fetchProductListSuccess(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.loading = false;
    },

    fetchCategoryListSuccess(state, action) {
      state.categoryList = action.payload;
    },

    setPage(state, action) {
      state.page = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    clearError(state, _) {
      state.error = null;
    }
  }
});

export const {
  setSearchParams,
  fetchProductListSuccess,
  fetchCategoryListSuccess,
  setPage,
  setLoading,
  setError,
  clearError,
} = productListSliceUser.actions;

export default productListSliceUser.reducer;

export function fetchProductList() {
  
  return async (dispatch, getState) => {
    const state = getState().productListUser;    

    axios.get(`/api/product/count?name=${state.name}`).then(result => {
      const total = result.data.count || 0;
      
      let page = state.page;      
      const numPage = Math.ceil(total / PAGE_SIZE);
      if(page < 1) page = 1;
      if(page > numPage) page = numPage;

      const start = (page-1) * PAGE_SIZE;
      
      let url = '/api/product/search?' +
                `&categoryId=${state.categoryId}` + 
                `&priceRangeId=${state.priceRangeId}` +
                `&name=${state.name}` +
                `&start=${start}&count=${PAGE_SIZE}`;

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

export function fetchCategoryList() {
  return dispatch => {
    axios.get('/api/category/').then(result => {
      dispatch(fetchCategoryListSuccess(result.data));
    });
  }
}
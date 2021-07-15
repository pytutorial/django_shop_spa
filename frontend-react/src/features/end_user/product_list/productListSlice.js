import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

import {PAGE_SIZE} from "utils/Constants";

const productListSlice = createSlice({
  name: 'productListSliceUser',
  initialState: {
    items: [],    
    keyword: '',
    categoryId: '',
    priceRangeId: '',
    page: 1,
    total: 0,
    loading: true,
    error: ''
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
} = productListSlice.actions;

export default productListSlice.reducer;

export function searchProduct(keyword, categoryId, priceRangeId, page) {
  return async (dispatch, getState) => {
    console.log({keyword, categoryId, priceRangeId, page});
    const state = getState().productListUser;
    keyword = keyword != null ? keyword: state.keyword;
    categoryId = categoryId != null? categoryId: state.categoryId;
    priceRangeId =  priceRangeId != null? priceRangeId: state.priceRangeId;

    page = page != null? page: state.page;
    const start = (page-1) * PAGE_SIZE;

    dispatch(setState({loading: true, total: 0, items: []}));

    try {
      let countUrl = `/api/product/count?name=${keyword}` + 
                        `&categoryId=${categoryId}` + 
                        `&priceRangeId=${priceRangeId}`;

      let result = await axios.get(countUrl);
      let total = result?.data?.count || 0;
      
      let searchUrl = `/api/product/search?name=${keyword}` + 
                        `&categoryId=${categoryId}` + 
                        `&priceRangeId=${priceRangeId}` +
                        `&start=${start}&count=${PAGE_SIZE}`;  

      result = await axios.get(searchUrl);
      let items = result.data || [];
      console.log(items);
      dispatch(
        setState({
          total, 
          items, 
          keyword, 
          categoryId, 
          priceRangeId, 
          page, 
          loading: false 
        })
      );

    }catch(e) {
      console.log(e);
    }
  };
}

export function setPage(page) {
  return (dispatch, getState) => {
    const state = getState().productListUser;
    dispatch(searchProduct(state.keyword, state.categoryId, state.priceRangeId, page));
  }
}

export function initPage() {
  return dispatch => {
    axios.get('/api/category/').then(result => {
      dispatch(setState({categoryList: result.data}));
    });
    dispatch(searchProduct());
  }
}
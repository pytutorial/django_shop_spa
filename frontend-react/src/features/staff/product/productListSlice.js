import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {PAGE_SIZE} from "utils/Constants";

const productListSlice = createSlice({
  name: 'productListSlice',
  initialState: {
    items: [],    
    keyword: '',
    page: 1,
    total: 0,
    loading: true,
    error: '',
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
  setState,
} = productListSlice.actions;

export default productListSlice.reducer;

export function searchProduct(keyword, page) {
  return async (dispatch, getState) => {
    const state = getState().productList;

    keyword = keyword != null ? keyword: state.keyword;
    page = page != null? page: state.page;
    const start = (page-1) * PAGE_SIZE;

    dispatch(setState({loading: true, total: 0, items: []}));

    try {
      let result = await axios.get(`/api/product/count?name=${keyword}`);
      let total = result?.data?.count || 0;
      
      result = await axios.get(`/api/product/search?name=${keyword}&start=${start}&count=${PAGE_SIZE}`);
      let items = result.data || [];
      dispatch(setState({total, items, keyword, page, loading: false }));
    }catch(e) {
      console(e);
    }
  }
};

export function setPage(page) {
  return (dispatch, getState) => {
    const state = getState().productList;
    dispatch(searchProduct(state.keyword, page));
  }
}

export function deleteProduct(id) {

  return (dispatch, getState) => {
    
    if(window.confirm('Bạn có muốn xóa sản phẩm này?')) {
      axios.delete(`/api/product/${id}`).then(_ => {    
        const state = getState().productList;
        const pageOffset = (state.page > 1 && state.total === (state.page-1) * PAGE_SIZE + 1) ? 1 : 0;
        dispatch(searchProduct(state.keyword, state.page - pageOffset));
      }).catch(e => setState({error: e.toString()}));    
    }
  }

} 
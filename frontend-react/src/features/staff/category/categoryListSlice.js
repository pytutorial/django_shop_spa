import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {PAGE_SIZE} from "utils/Constants";

const categoryListSlice = createSlice({
  name: 'categoryListSlice',

  initialState: {
    items: [],    
    keyword: '',
    page: 1,
    total: 0,
    loading: true,
    error: ''
  },

  reducers:{
    setState(state, action) {
      for(let key in action.payload){
        state[key] = action.payload[key];
      }
    }
  }
});

export const {
  setState
} = categoryListSlice.actions;

export default categoryListSlice.reducer;

export function searchCategory(keyword, page) {
  return async (dispatch, getState) => {
    const state = getState().categoryList;
    keyword = keyword != null ? keyword: state.keyword;
    page = page != null? page: state.page;
    const start = (page-1) * PAGE_SIZE;

    dispatch(setState({loading: true, total: 0, items: []}));

    try {
      let result = await axios.get(`/api/category/count?name=${keyword}`);
      let total = result?.data?.count || 0;
      
      result = await axios.get(`/api/category/search?name=${keyword}&start=${start}&count=${PAGE_SIZE}`);
      let items = result.data || [];
      dispatch(setState({total, items, page, keyword, loading: false }));
    }catch(e) {
      console(e);
    }
  }
}

export function setPage(page) {
  return (dispatch, getState) => {
    const state = getState().categoryList;
    dispatch(searchCategory(state.keyword, page));
  }
}

export function deleteCategory(id) {
  return (dispatch, getState) => {
    if(window.confirm('Bạn có muốn xóa nhóm sản phẩm này?')) {

      axios.delete(`/api/category/${id}`).then(_ => {
        const state = getState().categoryList;
        const pageOffset = (state.page > 1 && state.total === (state.page-1) * PAGE_SIZE + 1) ? 1 : 0;
        dispatch(searchCategory(state.keyword, state.page - pageOffset));
      }).catch(e => 
        dispatch(setState({error: e.toString()}))
      );
      
    }
  }
}
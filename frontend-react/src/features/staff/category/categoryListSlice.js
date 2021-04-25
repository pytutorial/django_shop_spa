import { createSlice } from '@reduxjs/toolkit';
import {PAGE_SIZE} from "utils/Constants";
import axios from 'axios';

const categoryListSlice = createSlice({
  name: 'categoryListSlice',
  initialState: {
    items: [],
    name: '',
    page: 1,
    total: 0,
    error: '',
    loading: true,
  },

  reducers: {
    fetchCategoryListSuccess(state, action) {
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

    setError(state, action) {
      state.error = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    clearError(state, _) {
      state.error = '';
    }
  }
});

export const {
  fetchCategoryListSuccess,
  setPage,
  setSearchParams,  
  setLoading,
  setError,
  clearError,
} = categoryListSlice.actions;

export default categoryListSlice.reducer;

export function fetchCategoryList() {
  return async (dispatch, getState) => {
    const state = getState().categoryList;
    
    axios.get(`/api/category/count?name=${state.name}`).then(result => {
      const total = result.data.count || 0;
  
      let page = state.page;     
      const numPage = Math.ceil(total / PAGE_SIZE);
      if(page < 1) page = 1;
      if(page > numPage) page = numPage;

      const start = (page-1) * PAGE_SIZE;
      
      let url = '/api/category/search?' +
                `name=${state.name}&` +
                `start=${start}&count=${PAGE_SIZE}`;

      axios.get(url).then(result => {
        const items = result.data;
        dispatch(fetchCategoryListSuccess({
          items: items, 
          total: total,
          page: page
        }))
      });

    });    
  }
}

export function deleteCategory(id) {
  return async dispatch => {
    
    axios.delete(`/api/category/${id}`).then(_ => {      
      dispatch(fetchCategoryList());

    }).catch(e => dispatch(setError(e.toString())));    
  } 
}
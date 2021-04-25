import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productFormSlice = createSlice({
  name: 'productFormSlice',
  initialState: {
    errors: {},
    product: {},
    categoryList: null,
    saved: false
  },

  reducers: {
    saveProductSuccess(state, _) {
      state.saved = true;
    },

    saveProductFail(state, action) {
      state.errors = action.payload || {};
    },

    fetchProductSuccess(state, action) {      
      state.product = action.payload || {};      
    },

    fetchCategoryListSuccess(state, action) {
      state.categoryList = action.payload || [];
    },

    setErrors(state, action) {
      state.errors = action.payload.errors;
    },

    clearErrors(state, _) {
      state.errors = {};
    },

    clearData(state, _) {
      state.errors = {};
      state.saved = false;
      state.product = {};
    }
  }
});

export const {
  saveProductSuccess,
  saveProductFail,
  fetchProductSuccess,
  fetchCategoryListSuccess,
  setErrors,
  clearErrors,
  clearData,
} = productFormSlice.actions;

export default productFormSlice.reducer;

export function saveProduct(id, data) {  
  return async dispatch => {
    const headers = { "Content-Type": "multipart/form-data" };
    
    if (!id) {
      axios.post('/api/product/', data, {headers})
        .then(result => {
          dispatch(saveProductSuccess(result.data));

        }).catch(e => {        
          dispatch(saveProductFail(e.response.data));
        })

    } else {
      axios.patch(`/api/product/${id}/`, data, {headers})
        .then(result => {
          dispatch(saveProductSuccess(result.data));

        }).catch(e => {
          dispatch(saveProductFail(e.response.data));
        })
    }
  }
}

export function fetchProduct(id) {
  return async dispatch => {
    axios.get(`/api/product/${id}`).then(result => {
      dispatch(fetchProductSuccess(result.data));
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
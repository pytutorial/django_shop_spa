import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productDetailSlice = createSlice({
  name: 'productDetailSlice',
  initialState: {
    id: null,
    product: null,    
  },

  reducers: {

    fetchProductSuccess(state, action) {
      state.product = action.payload || {};
      state.id = state.product.id;
    },

    clearData(state, _) {
      state.product = {};
    }
  }
});

export const {
  fetchProductSuccess,
  clearData,
} = productDetailSlice.actions;

export default productDetailSlice.reducer;

export function fetchProduct(id) {
  return async dispatch => {
    axios.get(`/api/product/${id}`).then(result => {
      dispatch(fetchProductSuccess(result.data));
    });
  }
}
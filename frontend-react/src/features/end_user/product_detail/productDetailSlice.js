import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productDetailSlice = createSlice({
  name: 'productDetailSlice',
  initialState: {
    loading: true,
    product: null
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
} = productDetailSlice.actions;

export default productDetailSlice.reducer;

export function initPage(id) {
  return dispatch => {
    dispatch(setState({loading: true}));

    axios.get(`/api/product/${id}`).then(result => 
      dispatch(setState({product: result.data, loading: false}))
    )
  }
}
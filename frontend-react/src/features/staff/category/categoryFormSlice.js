import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categoryFormSlice = createSlice({
  name: 'categoryFormSlice',
  initialState: {
    errors: {},
    category: {},
    saved: false
  },

  reducers: {
    saveCategorySuccess(state, _) {
      state.saved = true;
    },

    saveCategoryFail(state, action) {
      state.errors = action.payload || {};
    },

    fetchCategorySuccess(state, action) {      
      state.category = action.payload || {};      
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
      state.category = {};
    }
  }
});

export const {
  saveCategorySuccess,
  saveCategoryFail,
  fetchCategorySuccess,
  setErrors,
  clearErrors,
  clearData,
} = categoryFormSlice.actions;

export default categoryFormSlice.reducer;

export function saveCategory(id, data) {  
  return async dispatch => {
    
    if (!id) {
      axios.post('/api/category/', data)
        .then(result => {
          dispatch(saveCategorySuccess(result.data));

        }).catch(e => {        
          dispatch(saveCategoryFail(e.response.data));
        })

    } else {
      axios.put(`/api/category/${id}/`, data)
        .then(result => {
          dispatch(saveCategorySuccess(result.data));

        }).catch(e => {
          dispatch(saveCategoryFail(e.response.data));
        })
    }
  }
}

export function fetchCategory(id) {
  return async dispatch => {
    axios.get(`/api/category/${id}`).then(result => {
      dispatch(fetchCategorySuccess(result.data));
    });
  }
}
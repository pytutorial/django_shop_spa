import { combineReducers,  createSlice} from '@reduxjs/toolkit';

import loginReducer from 'features/staff/login/loginSlice';
import signupReducer from 'features/staff/signup/signupSlice';

import categoryListReducer from 'features/staff/category/categoryListSlice';
import categoryFormReducer from 'features/staff/category/categoryFormSlice';
import productListReducer from 'features/staff/product/productListSlice';
import productFormReducer from 'features/staff/product/productFormSlice';
import orderListReducer from 'features/staff/order/orderListSlice';
import orderDetailReducer from 'features/staff/order/orderDetailSlice';

import productListUserReducer from 'features/end_user/product_list/productListSlice';
import productDetailReducer from 'features/end_user/product_detail/productDetailSlice';
import orderProductReducer from 'features/end_user/order/orderProductSlice';

const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    page: 0
  },
  reducers : {
    setPage(state, action) {
      state.page = action.payload.page;
    }
  }
});

const rootReducer = combineReducers({
  app: appSlice.reducer,

  // staff
  login: loginReducer,
  signup: signupReducer,
  
  categoryList: categoryListReducer,
  categoryForm: categoryFormReducer,
  productList: productListReducer,
  productForm: productFormReducer,
  orderList: orderListReducer,
  orderDetail: orderDetailReducer,

  // end user
  productListUser: productListUserReducer,
  productDetail: productDetailReducer,
  orderProduct: orderProductReducer,
});

export default rootReducer;
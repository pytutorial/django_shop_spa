import { combineReducers } from 'redux';

import categoryListReducer from 'features/staff/category/categoryListReducer';
import categoryFormReducer from 'features/staff/category/categoryFormReducer';
import productListReducer from 'features/staff/product/productListReducer';
import productFormReducer from 'features/staff/product/productFormReducer';
import orderListReducer from 'features/staff/order/orderListReducer';
import orderDetailReducer from 'features/staff/order/orderDetailReducer';

import productListUserReducer from 'features/end_user/product_list/productListReducer';
import productDetailReducer from 'features/end_user/product_detail/productDetailReducer';
import orderProductReducer from 'features/end_user/order/orderProductReducer';

const rootReducer = combineReducers({
  // staff
  categoryList: categoryListReducer,
  categoryForm: categoryFormReducer,
  productList: productListReducer,
  productForm: productFormReducer,
  orderList: orderListReducer,
  orderDetail: orderDetailReducer,
 
  // end user
  productListUser: productListUserReducer,
  productDetail: productDetailReducer,
  orderProduct: orderProductReducer
})

export default rootReducer;
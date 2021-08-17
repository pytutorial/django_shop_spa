import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/views/staff/Login';
import Signup from '@/views/staff/Signup';
import CategoryList from '@/views/staff/category/CategoryList';
import CategoryForm from '@/views/staff/category/CategoryForm';
import ProductList from '@/views/staff/product/ProductList';
import ProductForm from '@/views/staff/product/ProductForm';
import OrderList from '@/views/staff/order/OrderList';
import OrderDetail from '@/views/staff/order/OrderDetail';

import ProductListUser from '@/views/end_user/ProductList';
import ProductDetail from '@/views/end_user/ProductDetail';
import OrderProduct from '@/views/end_user/OrderProduct';
import ThankYou from '@/views/end_user/ThankYou';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductListUser
    },
    {
      path: '/view-product/:id',
      name: 'viewProduct',
      component: ProductDetail
    },
    {
      path: '/order-product/:id',
      name: 'orderProduct',
      component: OrderProduct
    },
    {
      path: '/thank-you',
      name: 'thankYou',
      component: ThankYou
    },
    
    {
      path: '/staff',
      name: 'staffHome',
      component: CategoryList
    },
  
    {
      path: '/staff/login',
      name: 'login',
      component: Login
    },
  
    {
      path: '/staff/signup',
      name: 'signup',
      component: Signup
    },
    
    {
      path: '/staff/category/create',
      name: 'categoryCreate',
      component: CategoryForm
    },
    {
      path: '/staff/category/update/:id',
      name: 'updateCategory',
      component: CategoryForm
    },
    {
      path: '/staff/product',
      name: 'productList',
      component: ProductList
    },
    {
      path: '/staff/product/create',
      name: 'productCreate',
      component: ProductForm
    },
    {
      path: '/staff/product/update/:id',
      name: 'updateProduct',
      component: ProductForm
    },
    {
      path: '/staff/order',
      name: 'orderList',
      component: OrderList
    },
    {
      path: '/staff/order/view-detail/:id',
      name: 'orderDetail',
      component: OrderDetail
    }
  ]
})

export default router;
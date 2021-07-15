import React from "react";
import { Switch, Route, Link, withRouter, useLocation, useHistory } from "react-router-dom";

import LoginPage from "features/staff/login/LoginPage";
import SignupPage from "features/staff/signup/SignupPage";
import CategoryListPage from "features/staff/category/CategoryListPage";
import CategoryFormPage from "features/staff/category/CategoryFormPage";

import ProductListPage from "features/staff/product/ProductListPage";
import ProductFormPage from "features/staff/product/ProductFormPage";

import OrderListPage from "features/staff/order/OrderListPage";
import OrderDetailPage from "features/staff/order/OrderDetailPage";

function AppStaff() {
  
  const history = useHistory();
  const loc = useLocation();
  const loggedIn = localStorage.getItem('token');
  const pathname = loc.pathname;

  let page = 0;
  
  if(!loggedIn) {
    if(pathname === '/staff/signup') {
      return <SignupPage/>;
    }else {
      return <LoginPage/>;
    }
  }

  if(pathname.startsWith('/staff/product')) {
    page = 1;

  }else if(pathname.startsWith('/staff/order')) {
    page = 2;
  }

  const logOut = () => {
    localStorage.removeItem('token');
    history.push('/staff/login');
  }

  return (
    <>
      <div className="navbar navbar-expand-lg navbar-dark bg-primary p-0">
        <div className="navbar-nav">
          <Link to="/staff" className={"nav-item nav-link " + ((page==0)? "active": "")}>
            Quản lý nhóm sản phẩm
          </Link>
          <Link to="/staff/product" className={"nav-item nav-link " + ((page==1)? "active": "")}>
            Quản lý sản phẩm
          </Link>
          <Link to="/staff/order" className={"nav-item nav-link " + ((page==2)? "active": "")}>
            Quản lý đơn hàng
          </Link>
        </div>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle p-0" data-toggle="dropdown" href="#">
              <img className="rounded-circle" style={{width: "60px"}} src="https://raw.githubusercontent.com/pytutorial/html_samples/master/css_bootstrap/user.svg"
                alt="" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="#">
                Thông tin tài khoản
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href={void(0)} 
                onClick={() => logOut()}
              >
                Đăng xuất
              </a>
            </div>
          </li>
        </ul>
      </div>

      <Switch>
        {/** ===================== Category ========================== */}

        <Route path="/staff/category/create">
          <CategoryFormPage/>
        </Route>

        <Route path="/staff/category/update/:id">
          <CategoryFormPage/>
        </Route>

        <Route path="/staff" exact={true}>
          <CategoryListPage/>
        </Route>

        {/** ===================== Product ========================== */}

        <Route path="/staff/product/create">
          <ProductFormPage/>
        </Route>

        <Route path="/staff/product/update/:id">
          <ProductFormPage/>
        </Route>

        <Route path="/staff/product" exact={true}>
          <ProductListPage/>
        </Route>

        {/** ===================== Order ========================== */}

        <Route path="/staff/order/view-detail/:id">
          <OrderDetailPage/>
        </Route>

        <Route path="/staff/order" exact={true}>
          <OrderListPage/>
        </Route>

      </Switch>
    </>
  );
}

export default withRouter(AppStaff);
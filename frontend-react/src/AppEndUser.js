import React, { useEffect } from "react";
import { Switch, Route, Link, withRouter, useLocation, useHistory } from "react-router-dom";

import ProductListPage from "features/end_user/product_list/ProductListPage";
import ProductDetailPage from "features/end_user/product_detail/ProductDetailPage";
import OrderProduct from "features/end_user/order/OrderProduct";
import ThankYou from "features/end_user/thank_you/ThankYou";

function AppEndUser() {
  return (
    <>
      <div className="bg-primary">
        <div className="container">
          <nav className="navbar navbar-expand navbar-dark bg-primary p-0">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Sản phẩm</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={void(0)}>Liên hệ</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
        
      <Switch>
        <Route path="/" exact={true}>
          <ProductListPage />
        </Route>

        <Route path="/view-product/:id">
          <ProductDetailPage />
        </Route>

        <Route path="/order-product/:id">
          <OrderProduct />
        </Route>

        <Route path="/thank-you">
          <ThankYou />
        </Route>
      </Switch>      
    </>
  );
}

export default withRouter(AppEndUser);

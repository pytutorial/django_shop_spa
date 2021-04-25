import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from "react-router-dom";
import { fetchProduct } from "./productDetailSlice";
import {clearData as clearOrderData} from "../order/orderProductSlice";

import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(globalState => globalState.productDetail) || {};
  const product = state.product || {};
  const { id } = useParams();

  useEffect(() => dispatch(fetchProduct(id)), []);

  const orderProduct = (id) => {
    dispatch(clearOrderData());
    history.push(`/order-product/${id}`);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-6">
          {product.image && 
            <img className='product-detail-image' src={product.image} />
          }
        </div>

        <div className="col-6 mt-5">
          <div className='product-detail-title'>{product.name}</div>
          <br />
          <table className="table">
            <tbody>
              <tr>
                <td>Hãng sản xuất:</td>
                <td>{product.categoryName}</td>
              </tr>
              <tr>
                <td>Giá bán:</td>
                <td><b>{product.price} ₫</b></td>
              </tr>
            </tbody>
          </table>
          <br />
          <Link className="btn btn-secondary mr-2" to="/">Quay lại</Link>
          <button className="btn btn-primary" onClick={() => orderProduct(product.id)}>Mua hàng</button>
        </div>
      </div>
    </div>
  )
}

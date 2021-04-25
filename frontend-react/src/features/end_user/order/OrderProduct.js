import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from "react-router-dom";
import { fetchProduct, orderProduct, clearErrors } from "./orderProductSlice";

export default function OrderProduct() {
  const dispatch = useDispatch();
  const state = useSelector(globalState => globalState.orderProduct) || {};

  const { id } = useParams();

  useEffect(() => dispatch(fetchProduct(id)), []);

  const onOrderProduct = (e) => {
    e.preventDefault();
    dispatch(clearErrors());
    const data = new FormData(document.getElementById('fmt'));
    dispatch(orderProduct(id, data));
  }

  const product = state.product || {};
  const errors = state.errors || {};
  const saved = state.saved;

  if(saved) {
    return <Redirect to='/thank-you' />;
  }

  return (
    <div className="container mt-5 mb-5">
      <form id="fmt" onSubmit={onOrderProduct}>
        <h4>Đặt mua hàng trực tuyến</h4>
        <table className="table table-form">
          <tbody>
            <tr>
              <th colSpan="2">
                <h5>Thông tin sản phẩm</h5>
              </th>
            </tr>
            <tr>
              <th style={{width: "30%"}}>Tên sản phẩm:</th>
              <td>{product.name}</td>
            </tr>
            <tr>
              <th>Đơn giá:</th>
              <td>{product.price} ₫</td>
            </tr>
            <tr>
              <th>Số lượng:</th>
              <td>
                <div style={{ width: "50px" }}>
                  <input type="number" defaultValue={1} min="1" className="form-control" name="qty" />
                </div>
                <ul style={{ color: "red" }}>
                  {errors['qty'] && errors['qty'].map(e => <li>{e}</li>)}
                </ul>
              </td>
            </tr>
            <tr>
              <th colSpan="2">
                <h5>Thông tin người mua hàng</h5>
              </th>
            </tr>
            <tr>
              <th>Họ và tên:</th>
              <td>
                <input className="form-control" name="customerName" />
                <ul style={{ color: "red" }}>
                  {errors['customerName'] && errors['customerName'].map(e => <li>{e}</li>)}
                </ul>
              </td>
            </tr>
            <tr>
              <th>Số điện thoại:</th>
              <td>
                <input className="form-control" name="customerPhone" />
                <ul style={{ color: "red" }}>
                  {errors['customerPhone'] && errors['customerPhone'].map(e => <li>{e}</li>)}
                </ul>
              </td>
            </tr>
            <tr>
              <th>Địa chỉ:</th>
              <td>
                <input className="form-control" name="customerAddress" />
                <ul style={{ color: "red" }}>
                  {errors['customerAddress'] && errors['customerAddress'].map(e => <li>{e}</li>)}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">
          Đặt mua
          </button>
      </form>
    </div>
  )
}
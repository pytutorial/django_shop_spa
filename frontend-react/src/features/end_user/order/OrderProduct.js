import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';

import { SLICE_NAME } from "./orderProductReducer";
import { useSliceSelector, useSliceStore } from "utils/Helper";
import ErrorList from "components/ErrorList";

export default function OrderProductPage() {
  const { id } = useParams();
  const[product, errors] = useSliceSelector(SLICE_NAME, ['product', 'errors']);
  const store = useSliceStore(SLICE_NAME);
  const history = useHistory();

  useEffect(() => {
    store.setState({product: {}, loading: true});

    axios.get(`/api/product/${id}`).then(result => {
      store.setState({
        product: result.data,
        loading: false
      })
    });
  }, [id]);

  const orderProduct = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));
    store.setState({errors: {}});

    axios.post(`/api/order-product/${id}`, data).then(_ => {
      history.push('/thank-you');

    }).catch((e) => {
      store.setState({errors: e.response.data});
    });
  }

  return (
    <div className="container mt-5 mb-5">
      <form id="fmt" onSubmit={orderProduct}>
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
                <ErrorList errors={errors.qty}/>
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
                <ErrorList errors={errors.customerName}/>
              </td>
            </tr>
            <tr>
              <th>Số điện thoại:</th>
              <td>
                <input className="form-control" name="customerPhone" />
                <ErrorList errors={errors.customerPhone}/>
              </td>
            </tr>
            <tr>
              <th>Địa chỉ:</th>
              <td>
                <input className="form-control" name="customerAddress" />
                <ErrorList errors={errors.customerAddress}/>
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